import placeholderSrc from '../../assets/images/image-card-placeholder.png';
import { ImageCard } from '../../components/ImageCard/ImageCard';
import styles from './Section.module.css';

export function ImageCardSection() {
  return (
    <div className={styles.root}>
      <div className={styles.group}>
        <p className={styles.groupLabel}>Default</p>
        <div className={styles.row}>
          <ImageCard src={placeholderSrc} alt="Placeholder" />
        </div>
      </div>

      <div className={styles.group}>
        <p className={styles.groupLabel}>Selected</p>
        <div className={styles.row}>
          <ImageCard src={placeholderSrc} alt="Placeholder" selected />
        </div>
      </div>

      <div className={styles.group}>
        <p className={styles.groupLabel}>Disabled</p>
        <div className={styles.row}>
          <ImageCard src={placeholderSrc} alt="Placeholder" disabled />
        </div>
      </div>
    </div>
  );
}
