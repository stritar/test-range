import { Card } from './components/Card/Card';
import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.container}>
      <Card className={styles.card} />
    </div>
  );
}
