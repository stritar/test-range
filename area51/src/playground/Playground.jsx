import { ButtonSection } from './sections/ButtonSection';
import { CardSection } from './sections/CardSection';
import { LogoSection } from './sections/LogoSection';
import { TextFieldSection } from './sections/TextFieldSection';
import styles from './Playground.module.css';

const sections = [
  { id: 'button', label: 'Button' },
  { id: 'card', label: 'Card' },
  { id: 'logo', label: 'Logo' },
  { id: 'textfield', label: 'TextField' },
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
        <section id="button" className={styles.section}>
          <h2 className={styles.sectionTitle}>Button</h2>
          <ButtonSection />
        </section>

        <section id="card" className={styles.section}>
          <h2 className={styles.sectionTitle}>Card</h2>
          <CardSection />
        </section>

        <section id="logo" className={styles.section}>
          <h2 className={styles.sectionTitle}>Logo</h2>
          <LogoSection />
        </section>

        <section id="textfield" className={styles.section}>
          <h2 className={styles.sectionTitle}>TextField</h2>
          <TextFieldSection />
        </section>
      </main>
    </div>
  );
}
