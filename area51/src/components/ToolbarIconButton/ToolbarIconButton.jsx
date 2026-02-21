import { Icon } from '../Icon/Icon';
import styles from './ToolbarIconButton.module.css';

/**
 * ToolbarIconButton — icon-only button for WYSIWYG / contextual toolbars.
 *
 * @param {string} icon - Icon name from the icon registry (e.g. 'bold')
 * @param {boolean} [selected=false] - Whether the button is in a selected/active state
 * @param {string} [ariaLabel] - Accessible label (required for icon-only buttons)
 * @param {Function} [onClick] - Click handler
 * @param {string} [className] - Additional class names
 */
export function ToolbarIconButton({
  icon,
  selected = false,
  ariaLabel,
  onClick,
  className = '',
  ...rest
}) {
  const rootClass = [
    styles.root,
    selected && styles['root--selected'],
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={rootClass}
      aria-pressed={selected}
      aria-label={ariaLabel}
      onClick={onClick}
      {...rest}
    >
      <Icon name={icon} size="xs" ariaLabel="" />
    </button>
  );
}
