import { cloneElement, useId } from 'react';
import styles from './Tooltip.module.css';

/**
 * Tooltip wrapper — shows a tooltip bubble above the trigger child on hover.
 *
 * @param {string} label - Main tooltip text
 * @param {string} [shortcut] - Optional keyboard shortcut (displayed in secondary color)
 * @param {React.ReactElement} children - Single trigger element
 * @param {string} [className] - Additional class names for the root wrapper
 */
export function Tooltip({ label, shortcut, children, className = '' }) {
  const tooltipId = useId();

  const rootClass = [styles.root, className].filter(Boolean).join(' ');

  return (
    <span className={rootClass}>
      <span id={tooltipId} className={styles.bubble} role="tooltip">
        <span className={styles.label}>{label}</span>
        {shortcut && <span className={styles.shortcut}>{shortcut}</span>}
      </span>
      {cloneElement(children, { 'aria-describedby': tooltipId })}
    </span>
  );
}
