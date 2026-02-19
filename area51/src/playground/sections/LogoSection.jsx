import { Logo } from '../../components/Logo/Logo';
import styles from './Section.module.css';

export function LogoSection() {
  return (
    <div className={styles.root}>
      <div className={styles.group}>
        <p className={styles.groupLabel}>Types</p>
        <div className={styles.row}>
          <Logo type="full" />
          <Logo type="symbol" />
          <Logo type="wordmark" />
        </div>
      </div>
    </div>
  );
}
