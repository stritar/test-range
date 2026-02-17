import { Icon } from '../Icon/Icon';
import styles from './Badge.module.css';

/**
 * Badge component with icon.
 *
 * @param {string} [icon='placeholder'] - Icon name to display
 * @param {string} [className] - Additional class names
 */
export function Badge({ icon = 'placeholder', className = '', ...rest }) {
  const rootClass = [styles.root, className].filter(Boolean).join(' ');

  return (
    <div className={rootClass} {...rest}>
      <Icon name={icon} size="sm" ariaLabel="" />
    </div>
  );
}
