import { useTheme } from "../../theme/ThemeContext";
import styles from "./ThemeToggle.module.css";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <span className={styles.icon} aria-hidden>
        {theme === "light" ? "☀️" : "🌙"}
      </span>
      {theme === "light" ? "Light" : "Dark"}
    </button>
  );
}
