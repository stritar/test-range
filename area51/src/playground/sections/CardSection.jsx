import { Card } from '../../components/Card/Card';
import styles from './Section.module.css';

export function CardSection() {
  return (
    <div className={styles.root}>
      <div className={styles.group}>
        <p className={styles.groupLabel}>Default</p>
        <div className={styles.row}>
          <Card icon="placeholder" heading="Heading" />
          <Card icon="text" heading="With Text Icon" />
          <Card icon="image" heading="With Image Icon" />
        </div>
      </div>
    </div>
  );
}
