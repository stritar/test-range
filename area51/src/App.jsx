import { Button } from './components/Button/Button';
import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.container}>
      <div className={styles.demo}>
        <h2>Button Sizes</h2>
        <div className={styles.buttonRow}>
          <Button size="small" iconLeft="placeholder" iconRight="placeholder">
            Small
          </Button>
          <Button size="medium" iconLeft="placeholder" iconRight="placeholder">
            Medium
          </Button>
        </div>

        <h2>Icon Variations (Medium)</h2>
        <div className={styles.buttonRow}>
          <Button size="medium" iconLeft="placeholder" iconRight="placeholder">
            Both Icons
          </Button>
          <Button size="medium" iconLeft="placeholder">
            Left Icon
          </Button>
          <Button size="medium" iconRight="placeholder">
            Right Icon
          </Button>
          <Button size="medium">Label Only</Button>
        </div>

        <h2>States (Medium)</h2>
        <div className={styles.buttonRow}>
          <Button size="medium" iconLeft="placeholder" iconRight="placeholder">
            Default
          </Button>
          <Button size="medium" iconLeft="placeholder" iconRight="placeholder" disabled>
            Disabled
          </Button>
        </div>
      </div>
    </div>
  );
}
