import { useId, useState } from 'react';
import { Icon } from '../Icon/Icon';
import styles from './TextField.module.css';

/**
 * TextField component.
 *
 * @param {'small'|'medium'|'large'} [size='medium'] - Size
 * @param {'default'|'error'|'success'} [status='default'] - Validation status
 * @param {string} [label] - Label text
 * @param {string} [placeholder] - Placeholder text
 * @param {string} [helperText] - Helper / error / success message below the input
 * @param {string} [iconLeft] - Icon name for leading slot (single-line only)
 * @param {string} [iconRight] - Icon name for trailing slot (single-line only)
 * @param {boolean} [disabled=false] - Disabled state
 * @param {string} [value] - Controlled value (for "filled" visual demo)
 * @param {boolean} [multiline=false] - Renders a textarea instead of an input
 * @param {number} [maxLength] - Enables character counter when set
 * @param {string} [className] - Additional class names
 */
export function TextField({
  size = 'medium',
  status = 'default',
  label,
  placeholder = 'Placeholder',
  helperText,
  iconLeft,
  iconRight,
  disabled = false,
  value,
  multiline = false,
  maxLength,
  className = '',
  ...rest
}) {
  const uid = useId();
  const initialCount = value ? value.length : 0;
  const [charCount, setCharCount] = useState(initialCount);

  const overLimit = maxLength !== undefined && charCount > maxLength;

  const rootClass = [
    styles.root,
    styles[`root--${size}`],
    styles[`root--${status}`],
    multiline ? styles['root--multiline'] : null,
    className,
  ].filter(Boolean).join(' ');

  const hasFooter = helperText || maxLength !== undefined;

  const sharedInputProps = {
    id: uid,
    className: styles.input,
    placeholder,
    disabled,
    value,
    readOnly: value !== undefined,
    onChange: (e) => setCharCount(e.target.value.length),
  };

  return (
    <div className={rootClass}>
      {label && (
        <label className={styles.label} htmlFor={uid}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        {!multiline && iconLeft && (
          <span className={styles.iconLeft}>
            <Icon name={iconLeft} size="sm" ariaLabel="" />
          </span>
        )}
        {multiline ? (
          <textarea
            {...sharedInputProps}
            maxLength={maxLength}
            {...rest}
          />
        ) : (
          <input
            {...sharedInputProps}
            maxLength={maxLength}
            {...rest}
          />
        )}
        {!multiline && iconRight && (
          <span className={styles.iconRight}>
            <Icon name={iconRight} size="sm" ariaLabel="" />
          </span>
        )}
      </div>
      {hasFooter && (
        <div className={styles.footer}>
          {helperText
            ? <p className={styles.helper}>{helperText}</p>
            : <span />
          }
          {maxLength !== undefined && (
            <p className={[styles.counter, overLimit ? styles['counter--over'] : null].filter(Boolean).join(' ')}>
              {charCount}&nbsp;/&nbsp;{maxLength}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
