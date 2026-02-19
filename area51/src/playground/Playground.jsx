import { CardSection } from './sections/CardSection';
import { LogoSection } from './sections/LogoSection';
import styles from './Playground.module.css';

const sections = [
  { id: 'card', label: 'Card' },
  { id: 'logo', label: 'Logo' },
];

export function Playground() {
  return (
    <div className={styles.layout}>
      <nav className={styles.nav}>
        <p className={styles.navTitle}>Playground</p>
        <ul className={styles.navList}>
          {sections.map(({ id, label }) => (
            <li key={id}>
              <a className={styles.navLink} href={`#${id}`}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main className={styles.main}>
        <section id="card" className={styles.section}>
          <h2 className={styles.sectionTitle}>Card</h2>
          <CardSection />
        </section>

        <section id="logo" className={styles.section}>
          <h2 className={styles.sectionTitle}>Logo</h2>
          <LogoSection />
        </section>
      </main>
    </div>
  );
}
