import { Icon } from '../Icon/Icon';
import styles from './Card.module.css';

/**
 * Card component with an icon and heading.
 *
 * @param {string} [icon='placeholder'] - Icon name to display
 * @param {string} [heading='Heading'] - Heading text
 * @param {string} [className] - Additional class names
 * @param {React.ReactNode} [children] - Optional content rendered below the header
 */
export function Card({ icon = 'placeholder', heading = 'Heading', className = '', children, ...rest }) {
  const rootClass = [styles.root, className].filter(Boolean).join(' ');

  return (
    <div className={rootClass} {...rest}>
      <div className={styles.header}>
        <Icon name={icon} size="sm" ariaLabel="" />
        <p className={styles.heading}>{heading}</p>
      </div>
      {children}
    </div>
  );
}
