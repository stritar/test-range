/**
 * Icon registry: raw SVG content per name.
 * ClipPath ids are made unique per render by Icon.jsx.
 */
import textSvg from '../../assets/icons/text.svg?raw';
import placeholderSvg from '../../assets/icons/placeholder.svg?raw';
import imageSvg from '../../assets/icons/image.svg?raw';

const icons = {
  text: textSvg,
  placeholder: placeholderSvg,
  image: imageSvg,
};

const sizeAttrs = /(width|height)="[^"]+"/g;

/**
 * Returns SVG markup with size set to 100% (to fill wrapper) and optional unique id for clipPath.
 */
export function getIconSvg(name, uniqueId = '') {
  const raw = icons[name];
  if (!raw) return '';

  let svg = raw.replace(sizeAttrs, '$1="100%"');

  if (uniqueId) {
    const idMatch = svg.match(/id="([^"]+)"/);
    if (idMatch) {
      const oldId = idMatch[1];
      svg = svg.replace(new RegExp(`id="${oldId}"`, 'g'), `id="${uniqueId}"`);
      svg = svg.replace(new RegExp(`url\\(#${oldId}\\)`, 'g'), `url(#${uniqueId})`);
    }
  }

  return svg;
}

export const iconNames = Object.keys(icons);
