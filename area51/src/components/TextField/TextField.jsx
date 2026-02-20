import { useId, useState } from 'react';
import { Icon } from '../Icon/Icon';
import styles from './TextField.module.css';

/**
 * TextField component. Renders a labeled input or textarea with optional
 * icons, helper text, validation states, and character counter.
 *
 * @param {'small'|'medium'} [size='medium'] - Size variant
 * @param {'error'|'success'} [status] - Validation state
 * @param {string} [label] - Label text shown above the input
 * @param {string} [placeholder] - Placeholder text
 * @param {string} [helperText] - Helper / validation message below the input
 * @param {string} [iconLeft] - Icon name for the left slot
 * @param {string} [iconRight] - Icon name for the right slot
 * @param {boolean} [disabled=false] - Disabled state
 * @param {string} [value] - Controlled value
 * @param {boolean} [multiline=false] - Renders a <textarea> instead of <input>
 * @param {number} [maxLength] - Max character count; shows counter when set
 * @param {Function} [onChange] - Change handler
 */
export function TextField({
  size = 'medium',
  status,
  label,
  placeholder,
  helperText,
  iconLeft,
  iconRight,
  disabled = false,
  value,
  multiline = false,
  maxLength,
  onChange,
  ...rest
}) {
  const id = useId();
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(isControlled ? value : '');
  const currentValue = isControlled ? value : internalValue;
  const charCount = currentValue?.length ?? 0;

  const handleChange = (e) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e);
  };

  const rootClass = [
    styles.root,
    styles[`root--${size}`],
    status && styles[`root--${status}`],
    multiline && styles['root--multiline'],
    disabled && styles['root--disabled'],
  ].filter(Boolean).join(' ');

  const sharedInputProps = {
    id,
    className: styles.input,
    placeholder,
    disabled,
    value: currentValue,
    onChange: handleChange,
    ...rest,
  };

  const hasStatusIcon = status === 'error' || status === 'success';
  const showCounter = multiline && maxLength !== undefined;
  const showFooter = helperText || showCounter;

  return (
    <div className={rootClass}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.inputWrapper}>
        {iconLeft && <Icon name={iconLeft} size="sm" ariaLabel="" />}
        {multiline ? (
          <textarea {...sharedInputProps} />
        ) : (
          <input {...sharedInputProps} />
        )}
        {iconRight && <Icon name={iconRight} size="sm" ariaLabel="" />}
      </div>

      {showFooter && (
        <div className={styles.footer}>
          <div className={styles.footerLeft}>
            {hasStatusIcon && (
              <Icon
                name={status}
                size="xs"
                ariaLabel={status === 'error' ? 'Error' : 'Success'}
              />
            )}
            {helperText && (
              <span className={styles.helperText}>{helperText}</span>
            )}
          </div>
          {showCounter && (
            <span className={[
              styles.counter,
              charCount > maxLength && styles['counter--over'],
            ].filter(Boolean).join(' ')}>
              {charCount} / {maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
