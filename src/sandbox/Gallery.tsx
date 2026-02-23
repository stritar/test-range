import type { ComponentEntry } from "./registry";
import styles from "./Gallery.module.css";

interface GalleryProps {
  entries: ComponentEntry[];
  selectedName: string | null;
  onSelect: (entry: ComponentEntry) => void;
}

export function Gallery({ entries, selectedName, onSelect }: GalleryProps) {
  if (entries.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No components registered yet.</p>
        <p className={styles.hint}>
          Add entries to <code>registry.ts</code> to get started.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {entries.map((entry) => {
        const Component = entry.component;
        const isSelected = entry.name === selectedName;
        return (
          <button
            key={entry.name}
            className={`${styles.card} ${isSelected ? styles.selected : ""}`}
            onClick={() => onSelect(entry)}
          >
            <div className={styles.thumb}>
              <div className={styles.thumbInner}>
                <Component {...entry.defaults} />
              </div>
            </div>
            <div className={styles.info}>
              <span className={styles.name}>{entry.name}</span>
              {entry.description && (
                <span className={styles.desc}>{entry.description}</span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
