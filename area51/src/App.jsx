import { Card } from './components/Card/Card';
import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.container}>
      <Card 
        className={styles.cardTall} 
        icon="placeholder" 
        heading="Card one" 
      />
      <Card 
        className={styles.card} 
        icon="image" 
        heading="Card two" 
      />
      <Card 
        className={styles.card} 
        icon="text" 
        heading="Card three" 
      />
    </div>
  );
}
