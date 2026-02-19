import { Button } from '../../components/Button/Button';
import styles from './Section.module.css';

export function ButtonSection() {
  return (
    <div className={styles.root}>
      <div className={styles.group}>
        <p className={styles.groupLabel}>Sizes</p>
        <div className={styles.row}>
          <Button size="small" iconLeft="placeholder" iconRight="placeholder">Small</Button>
          <Button size="medium" iconLeft="placeholder" iconRight="placeholder">Medium</Button>
        </div>
      </div>

      <div className={styles.group}>
        <p className={styles.groupLabel}>Icon Variations (Medium)</p>
        <div className={styles.row}>
          <Button size="medium" iconLeft="placeholder" iconRight="placeholder">Both Icons</Button>
          <Button size="medium" iconLeft="placeholder">Left Icon</Button>
          <Button size="medium" iconRight="placeholder">Right Icon</Button>
          <Button size="medium">Label Only</Button>
        </div>
      </div>

      <div className={styles.group}>
        <p className={styles.groupLabel}>States (Medium)</p>
        <div className={styles.row}>
          <Button size="medium" iconLeft="placeholder" iconRight="placeholder">Default</Button>
          <Button size="medium" iconLeft="placeholder" iconRight="placeholder" disabled>Disabled</Button>
        </div>
      </div>
    </div>
  );
}
