import { TextFieldIsolation } from './components/TextFieldIsolation';
import styles from './Isolation.module.css';

/**
 * Isolation page — clean, chrome-free environment for Figma MCP import.
 * Each component is rendered in all variants/states as a standalone frame.
 * Do not add navigation, sidebars, or decorative layout to this page.
 */
export function Isolation() {
  return (
    <div className={styles.page}>
      <TextFieldIsolation />
    </div>
  );
}
