import type { PropControl } from "./registry";
import styles from "./PropControls.module.css";

interface PropControlsProps {
  controls: Record<string, PropControl>;
  values: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

export function PropControls({ controls, values, onChange }: PropControlsProps) {
  const entries = Object.entries(controls);

  if (entries.length === 0) {
    return <p className={styles.empty}>No controls available</p>;
  }

  return (
    <div className={styles.panel}>
      <h3 className={styles.heading}>Controls</h3>
      <div className={styles.grid}>
        {entries.map(([key, ctrl]) => (
          <label key={key} className={styles.field}>
            <span className={styles.label}>{ctrl.label}</span>
            {renderInput(ctrl, values[key], (v) => onChange(key, v))}
          </label>
        ))}
      </div>
    </div>
  );
}

function renderInput(
  ctrl: PropControl,
  value: unknown,
  onChange: (v: unknown) => void,
) {
  switch (ctrl.type) {
    case "text":
      return (
        <input
          className={styles.input}
          type="text"
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "number":
      return (
        <input
          className={styles.input}
          type="number"
          value={(value as number) ?? 0}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      );
    case "boolean":
      return (
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
        />
      );
    case "select":
      return (
        <select
          className={styles.input}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
        >
          {ctrl.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    default:
      return null;
  }
}
