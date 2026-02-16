import { useId } from 'react';
import { getIconSvg, iconNames } from './iconRegistry';
import styles from './Icon.module.css';

const sizes = ['xs', 'sm', 'md'];

/**
 * Renders an icon by name with semantic size. Color inherits (currentColor).
 *
 * @param {string} name - Icon name (e.g. 'text', 'placeholder', 'image')
 * @param {'xs'|'sm'|'md'} [size='md'] - Semantic size
 * @param {string} [ariaLabel] - If set, icon is meaningful (role="img"); otherwise decorative (aria-hidden)
 * @param {string} [className] - Extra class names
 */
export function Icon({ name, size = 'md', ariaLabel, className = '', ...rest }) {
  const uniqueId = useId();
  const safeSize = sizes.includes(size) ? size : 'md';
  const svg = getIconSvg(name, uniqueId);

  if (!svg) {
    return null;
  }

  const isDecorative = ariaLabel == null || ariaLabel === '';
  const rootClass = [styles.root, styles[`root--${safeSize}`], className].filter(Boolean).join(' ');

  return (
    <span
      className={rootClass}
      role={isDecorative ? undefined : 'img'}
      aria-label={isDecorative ? undefined : ariaLabel}
      aria-hidden={isDecorative ? true : undefined}
      dangerouslySetInnerHTML={{ __html: svg }}
      {...rest}
    />
  );
}

export { iconNames };
