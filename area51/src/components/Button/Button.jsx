import { Icon } from '../Icon/Icon';
import styles from './Button.module.css';

/**
 * Button component with flexible icon placement and size variants.
 *
 * @param {string} [size='medium'] - Button size: 'small', 'medium', 'large'
 * @param {string} [variant='primary'] - Button variant (currently only 'primary')
 * @param {string|null} [iconLeft=null] - Icon name for left position
 * @param {string|null} [iconRight=null] - Icon name for right position
 * @param {boolean} [disabled=false] - Whether the button is disabled
 * @param {string} [children] - Button label text
 * @param {string} [className] - Additional class names
 */
export function Button({
  size = 'medium',
  variant = 'primary',
  iconLeft = null,
  iconRight = null,
  disabled = false,
  children = 'Button label',
  className = '',
  ...rest
}) {
  const rootClass = [
    styles.root,
    styles[`root--${size}`],
    styles[`root--${variant}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const labelClass = [styles.label, styles[`label--${size}`]]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={rootClass} disabled={disabled} {...rest}>
      {iconLeft && <Icon name={iconLeft} size="sm" ariaLabel="" />}
      <span className={labelClass}>{children}</span>
      {iconRight && <Icon name={iconRight} size="sm" ariaLabel="" />}
    </button>
  );
}
