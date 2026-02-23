import styles from "./SampleButton.module.css";

interface SampleButtonProps {
  label?: string;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
}

export function SampleButton({
  label = "Button",
  variant = "primary",
  disabled = false,
}: SampleButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
