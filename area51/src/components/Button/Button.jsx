import { Icon } from '../Icon/Icon';
import styles from './Button.module.css';

/**
 * Button component.
 *
 * @param {'primary'|'secondary'|'outline'|'destructive'} [variant='primary'] - Visual variant
 * @param {'small'|'medium'|'large'} [size='medium'] - Size
 * @param {string} [iconLeft] - Icon name for left slot
 * @param {string} [iconRight] - Icon name for right slot
 * @param {boolean} [disabled=false] - Disabled state
 * @param {string} [className] - Additional class names
 * @param {React.ReactNode} children - Button label text
 */
export function Button({
  variant = 'primary',
  size = 'medium',
  iconLeft,
  iconRight,
  disabled = false,
  className = '',
  children,
  ...rest
}) {
  const rootClass = [
    styles.root,
    styles[`root--${variant}`],
    styles[`root--${size}`],
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={rootClass}
      disabled={disabled}
      {...rest}
    >
      {iconLeft && <Icon name={iconLeft} size="sm" ariaLabel="" />}
      <span className={styles.label}>
        <span className={styles.text}>{children}</span>
      </span>
      {iconRight && <Icon name={iconRight} size="sm" ariaLabel="" />}
    </button>
  );
}
