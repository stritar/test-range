import { Button } from '../../components/Button';
import styles from './Section.module.css';

export function ButtonSection() {
  return (
    <div className={styles.root}>

      <div className={styles.group}>
        <p className={styles.groupLabel}>Sizes</p>
        <div className={styles.row}>
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
        </div>
      </div>

      <div className={styles.group}>
        <p className={styles.groupLabel}>Variants</p>
        <div className={styles.row}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>

      <div className={styles.group}>
        <p className={styles.groupLabel}>Icon left</p>
        <div className={styles.row}>
          <Button variant="primary" iconLeft="placeholder">Primary</Button>
          <Button variant="secondary" iconLeft="placeholder">Secondary</Button>
          <Button variant="outline" iconLeft="placeholder">Outline</Button>
          <Button variant="destructive" iconLeft="placeholder">Destructive</Button>
        </div>
      </div>

      <div className={styles.group}>
        <p className={styles.groupLabel}>Icon right</p>
        <div className={styles.row}>
          <Button variant="primary" iconRight="placeholder">Primary</Button>
          <Button variant="secondary" iconRight="placeholder">Secondary</Button>
          <Button variant="outline" iconRight="placeholder">Outline</Button>
          <Button variant="destructive" iconRight="placeholder">Destructive</Button>
        </div>
      </div>

      <div className={styles.group}>
        <p className={styles.groupLabel}>Both icons</p>
        <div className={styles.row}>
          <Button variant="primary" iconLeft="placeholder" iconRight="placeholder">Primary</Button>
          <Button variant="secondary" iconLeft="placeholder" iconRight="placeholder">Secondary</Button>
          <Button variant="outline" iconLeft="placeholder" iconRight="placeholder">Outline</Button>
          <Button variant="destructive" iconLeft="placeholder" iconRight="placeholder">Destructive</Button>
        </div>
      </div>

      <div className={styles.group}>
        <p className={styles.groupLabel}>Disabled</p>
        <div className={styles.row}>
          <Button variant="primary" disabled>Primary</Button>
          <Button variant="secondary" disabled>Secondary</Button>
          <Button variant="outline" disabled>Outline</Button>
          <Button variant="destructive" disabled>Destructive</Button>
        </div>
      </div>

    </div>
  );
}
