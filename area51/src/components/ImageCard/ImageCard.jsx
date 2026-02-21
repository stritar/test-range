import styles from './ImageCard.module.css';

/**
 * ImageCard component — a rounded thumbnail card containing a full-bleed image.
 * Dimensions are driven by the image's natural proportions, capped by --image-card-max-width.
 *
 * @param {string} [src] - Image source URL. Renders a styled placeholder when omitted.
 * @param {string} [alt=''] - Image alt text
 * @param {boolean} [disabled=false] - Reduces opacity to --image-card-opacity--disabled
 * @param {string} [className] - Additional class names
 */
export function ImageCard({ src, alt = '', disabled = false, className = '', ...rest }) {
  const rootClass = [styles.root, disabled && styles.disabled, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClass} aria-disabled={disabled || undefined} {...rest}>
      {src ? (
        <img className={styles.image} src={src} alt={alt} />
      ) : (
        <div className={styles.placeholder} aria-hidden="true" />
      )}
    </div>
  );
}
