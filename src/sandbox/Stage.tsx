import type { ComponentEntry } from "./registry";
import { ResizableBox } from "./ResizableBox";
import styles from "./Stage.module.css";

interface StageProps {
  entry: ComponentEntry | null;
  effectiveProps: Record<string, unknown>;
}

export function Stage({ entry, effectiveProps }: StageProps) {
  if (!entry) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>Select a component from the gallery</p>
      </div>
    );
  }

  const Component = entry.component;

  return (
    <div className={styles.stage}>
      <div className={styles.preview}>
        <ResizableBox>
          <Component {...effectiveProps} />
        </ResizableBox>
      </div>
    </div>
  );
}
