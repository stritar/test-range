import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { ImageCard } from '../components/ImageCard';
import { Button } from '../components/Button';
import { Tooltip } from '../components/Tooltip';
import { ToolbarIconButton } from '../components/ToolbarIconButton';
import { Logo } from '../components/Logo/Logo';
import styles from './ThumbEditor.module.css';

// Auto-detected at build time — drop any image into src/assets/img-pool/ and it appears here automatically.
const imageModules = import.meta.glob('../assets/img-pool/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default',
});
const IMAGE_POOL = Object.entries(imageModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, url]) => url);

const CANVAS_W = 744;
const CANVAS_H = 400;
const CANVAS_PADDING = 32;
const START_FONT_SIZE = 60;
const MIN_FONT_SIZE = 12;

// ── Step 1: tokenize contenteditable innerHTML ────────────────────────────────
// Produces a flat array of { text, weight } and { newline: true } markers,
// matching the brand.embeddable.com tokenizeEditorHtml() approach.
function tokenizeHtml(html) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  const tokens = [];

  const ensureNewline = () => {
    if (tokens.length && !tokens[tokens.length - 1].newline) {
      tokens.push({ newline: true });
    }
  };

  const walk = (node, weight) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const value = node.nodeValue || '';
      const parts = value.split(/\n/);
      parts.forEach((part, i) => {
        if (part !== '') tokens.push({ text: part, weight });
        if (i < parts.length - 1) tokens.push({ newline: true });
      });
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;

    const tag = node.tagName.toLowerCase();
    if (tag === 'br') { ensureNewline(); return; }
    if (tag === 'div') ensureNewline();

    const isBold = weight === 700
      || tag === 'b'
      || tag === 'strong'
      || node.style?.fontWeight === 'bold'
      || parseInt(node.style?.fontWeight) >= 600;

    for (const child of node.childNodes) {
      walk(child, isBold ? 700 : weight);
    }
  };

  for (const child of wrapper.childNodes) walk(child, 200);
  return tokens;
}

// ── Step 2: split each text token into individual word/space tokens ───────────
function expandTokens(tokens) {
  const expanded = [];
  tokens.forEach((token) => {
    if (token.newline) { expanded.push({ newline: true }); return; }
    token.text.split(/(\s+)/).forEach((part) => {
      if (part !== '') expanded.push({ text: part, weight: token.weight });
    });
  });
  return expanded;
}

// ── Step 3: layout tokens into lines with word-wrap + char-level breaking ─────
// Exact port of brand.embeddable.com layoutTokens().
function layoutTokens(ctx, tokens, maxWidth, size) {
  const lineHeight = size * 1.1;
  const lines = [];
  let line = [];
  let lineWidth = 0;

  const measure = (text, weight) => {
    ctx.font = `${weight} ${size}px "Campton", sans-serif`;
    return ctx.measureText(text).width;
  };

  // Binary-search: longest character prefix that fits within limit
  const breakWord = (text, weight, limit) => {
    const parts = [];
    let remaining = text;
    while (remaining.length) {
      let lo = 1, hi = remaining.length, best = 1;
      while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (measure(remaining.slice(0, mid), weight) <= limit) { best = mid; lo = mid + 1; }
        else hi = mid - 1;
      }
      parts.push(remaining.slice(0, best));
      remaining = remaining.slice(best);
    }
    return parts;
  };

  const pushLine = () => { lines.push(line); line = []; lineWidth = 0; };

  tokens.forEach((token) => {
    if (token.newline) { pushLine(); return; }

    const { text, weight } = token;
    if (text.trim() === '' && lineWidth === 0) return; // skip leading spaces

    const w = measure(text, weight);
    const exceeds = lineWidth + w > maxWidth && line.length > 0 && text.trim() !== '';

    if (exceeds) {
      pushLine();
      if (text.trim() === '') return;
    }

    if (w > maxWidth && text.trim() !== '') {
      if (line.length) pushLine();
      breakWord(text, weight, maxWidth).forEach((piece, i, arr) => {
        line.push({ text: piece, weight });
        lineWidth += measure(piece, weight);
        if (i < arr.length - 1) pushLine();
      });
      return;
    }

    line.push({ text, weight });
    lineWidth += w;
  });

  if (line.length) lines.push(line);
  return { lines, lineHeight };
}

// ── Step 4: shrink font size until all lines fit ──────────────────────────────
function fitText(ctx, tokens, maxWidth, maxHeight) {
  let size = START_FONT_SIZE;
  while (size >= MIN_FONT_SIZE) {
    const { lines, lineHeight } = layoutTokens(ctx, tokens, maxWidth, size);
    if (lines.length * lineHeight <= maxHeight) return { size, lines, lineHeight };
    size -= 2;
  }
  const { lines, lineHeight } = layoutTokens(ctx, tokens, maxWidth, MIN_FONT_SIZE);
  return { size: MIN_FONT_SIZE, lines, lineHeight };
}

// ── Canvas drawing ────────────────────────────────────────────────────────────
function drawPass(ctx, lines, size, lineHeight, fillStyle, shadowColor, shadowBlur) {
  ctx.save();
  ctx.fillStyle = fillStyle;
  ctx.textBaseline = 'top';
  ctx.shadowColor = shadowColor;
  ctx.shadowBlur = shadowBlur;

  let y = CANVAS_PADDING;
  lines.forEach((segs) => {
    let x = CANVAS_PADDING;
    segs.forEach((seg) => {
      ctx.font = `${seg.weight} ${size}px "Campton", sans-serif`;
      ctx.fillText(seg.text, x, y);
      x += ctx.measureText(seg.text).width;
    });
    y += lineHeight;
  });

  ctx.restore();
}

function redrawCanvas(canvas, imgEl, html) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

  // Image (cover-crop) or placeholder
  if (imgEl) {
    const ir = imgEl.naturalWidth / imgEl.naturalHeight;
    const cr = CANVAS_W / CANVAS_H;
    let sx, sy, sw, sh;
    if (ir > cr) {
      sh = imgEl.naturalHeight; sw = sh * cr;
      sx = (imgEl.naturalWidth - sw) / 2; sy = 0;
    } else {
      sw = imgEl.naturalWidth; sh = sw / cr;
      sx = 0; sy = (imgEl.naturalHeight - sh) / 2;
    }
    ctx.drawImage(imgEl, sx, sy, sw, sh, 0, 0, CANVAS_W, CANVAS_H);
  } else {
    ctx.fillStyle = '#f0f1f5';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
  }

  // Text pipeline
  const raw = tokenizeHtml(html || '');
  const tokens = expandTokens(raw);
  if (!tokens.some(t => !t.newline && t.text?.trim())) return;

  const maxW = CANVAS_W - CANVAS_PADDING * 2;
  const maxH = CANVAS_H - CANVAS_PADDING * 2;
  const { size, lines, lineHeight } = fitText(ctx, tokens, maxW, maxH);

  // 5 white glow passes + 1 dark text pass (brand.embeddable.com exact)
  drawPass(ctx, lines, size, lineHeight, 'rgba(255,255,255,1)',    'rgba(255,255,255,1)', 4);
  drawPass(ctx, lines, size, lineHeight, 'rgba(255,255,255,1)',    'rgba(255,255,255,1)', 12);
  drawPass(ctx, lines, size, lineHeight, 'rgba(255,255,255,0.95)', 'rgba(255,255,255,1)', 28);
  drawPass(ctx, lines, size, lineHeight, 'rgba(255,255,255,0.9)',  'rgba(255,255,255,1)', 56);
  drawPass(ctx, lines, size, lineHeight, 'rgba(255,255,255,0.8)',  'rgba(255,255,255,1)', 88);
  drawPass(ctx, lines, size, lineHeight, '#242933',                'transparent',         0);
}

export function ThumbEditor() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isBold, setIsBold] = useState(false);
  const [editorHtml, setEditorHtml] = useState('');
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const canvasRef = useRef(null);
  const editorRef = useRef(null);
  const loadedImages = useRef({});

  // Preload both Campton weights; once ready, trigger a redraw via state.
  // The extra rAF after the Promise gives Safari time to make the font
  // available to canvas (it resolves fonts.load() slightly early).
  useEffect(() => {
    Promise.all([
      document.fonts.load('200 60px "Campton"'),
      document.fonts.load('700 60px "Campton"'),
    ]).then(() => {
      requestAnimationFrame(() => setFontsLoaded(true));
    });
  }, []);

  // Preload all pool images; auto-select the first one
  useEffect(() => {
    IMAGE_POOL.forEach((src, i) => {
      const img = new Image();
      img.onload = () => {
        loadedImages.current[i] = img;
        if (i === 0) setSelectedIndex(0);
      };
      img.src = src;
    });
  }, []);

  // Redraw whenever selection, text, or font readiness changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = selectedIndex !== null ? loadedImages.current[selectedIndex] ?? null : null;
    redrawCanvas(canvas, img, editorHtml);
  }, [selectedIndex, editorHtml, fontsLoaded]);

  // Keep bold button state in sync with caret/selection
  useEffect(() => {
    const sync = () => setIsBold(document.queryCommandState('bold'));
    document.addEventListener('selectionchange', sync);
    return () => document.removeEventListener('selectionchange', sync);
  }, []);

  function handleBoldClick() {
    editorRef.current?.focus();
    document.execCommand('bold');
    // Sync HTML state after execCommand changes DOM
    setEditorHtml(editorRef.current?.innerHTML ?? '');
  }

  function handleEditorInput() {
    setEditorHtml(editorRef.current?.innerHTML ?? '');
  }

  async function handleExport() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Wait for fonts before rendering at export quality
    await document.fonts.ready;
    await Promise.all([
      document.fonts.load('200 60px "Campton"'),
      document.fonts.load('700 60px "Campton"'),
    ]);

    const img = selectedIndex !== null ? loadedImages.current[selectedIndex] ?? null : null;
    redrawCanvas(canvas, img, editorHtml);

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'blog-thumb.png';
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <Link to="/" className={styles.logoLink}>
          <Logo type="full" theme="light" />
        </Link>
      </header>

      <main className={styles.cards}>
        <Card icon="image" heading="Select an image" className={styles.selectCard}>
          <div className={styles.imageGrid}>
            {IMAGE_POOL.map((src, i) => (
              <ImageCard
                key={src}
                src={src}
                alt={`Image ${i + 1}`}
                selected={i === selectedIndex}
                onClick={() => setSelectedIndex(i)}
                className={styles.imageCardItem}
              />
            ))}
          </div>
        </Card>

        <Card icon="text" heading="Add text" className={styles.addTextCard}>
          <div className={styles.previewContainer}>
            <canvas
              ref={canvasRef}
              width={CANVAS_W}
              height={CANVAS_H}
              className={styles.canvas}
            />
          </div>

          <div className={styles.footer}>
            <Tooltip label="Bold" shortcut="⌘B">
              <ToolbarIconButton
                icon="bold"
                ariaLabel="Bold"
                selected={isBold}
                onClick={handleBoldClick}
              />
            </Tooltip>

            <div
              ref={editorRef}
              className={styles.editor}
              contentEditable
              suppressContentEditableWarning
              onInput={handleEditorInput}
              data-placeholder="Type your blog title…"
              spellCheck={false}
            />

            <Button
              variant="primary"
              size="large"
              iconLeft="download-image"
              className={styles.exportButton}
              onClick={handleExport}
            >
              Export PNG
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
