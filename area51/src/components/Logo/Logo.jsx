import symbolLightSvg from '../../assets/logo/logo-symbol-light.svg?raw';
import wordmarkLightSvg from '../../assets/logo/logo-wordmark-light.svg?raw';
import styles from './Logo.module.css';

const types = ['symbol', 'wordmark', 'full'];

// Replace fixed dimensions with 100% so the SVG fills its CSS container.
// Done at module level — runs once, not on every render.
function prepareSymbol(raw) {
  return raw
    .replace('width="32"', 'width="100%"')
    .replace('height="32"', 'height="100%"');
}

const svgs = {
  light: {
    symbol: prepareSymbol(symbolLightSvg),
    // Wordmark keeps its explicit width/height so its internal clipPath
    // coordinate space stays intact — only needs display:block via CSS.
    wordmark: wordmarkLightSvg,
  },
};

/**
 * Logo component — symbol, wordmark, or full lockup.
 *
 * @param {'symbol'|'wordmark'|'full'} [type='full'] - Logo variant
 * @param {'light'} [theme='light'] - Color theme (dark coming later)
 * @param {string} [className] - Additional class names
 */
export function Logo({ type = 'full', theme = 'light', className = '', ...rest }) {
  const safeType = types.includes(type) ? type : 'full';
  const safeTheme = svgs[theme] ? theme : 'light';
  const rootClass = [styles.root, styles[`root--${safeType}`], className].filter(Boolean).join(' ');

  const showSymbol = safeType === 'symbol' || safeType === 'full';
  const showWordmark = safeType === 'wordmark' || safeType === 'full';

  return (
    <div className={rootClass} {...rest}>
      {showSymbol && (
        <div
          className={styles.symbol}
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: svgs[safeTheme].symbol }}
        />
      )}
      {showWordmark && (
        <div
          className={styles.wordmark}
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: svgs[safeTheme].wordmark }}
        />
      )}
    </div>
  );
}
