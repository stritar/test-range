import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ComponentEntry } from "./registry";
import { ResizableBox } from "./ResizableBox";
import { PropControls } from "./PropControls";
import styles from "./Stage.module.css";

interface StageProps {
  entry: ComponentEntry | null;
}

export function Stage({ entry }: StageProps) {
  const [propOverrides, setPropOverrides] = useState<Record<string, unknown>>({});
  const prevName = useRef<string | null>(null);

  useEffect(() => {
    if (entry?.name !== prevName.current) {
      setPropOverrides({});
      prevName.current = entry?.name ?? null;
    }
  }, [entry]);

  const effectiveProps = useMemo(() => {
    if (!entry) return {};
    const base = { ...entry.defaults };
    for (const [k, v] of Object.entries(propOverrides)) {
      if (v !== undefined) base[k] = v;
    }
    return base;
  }, [entry, propOverrides]);

  const handleChange = useCallback((key: string, value: unknown) => {
    setPropOverrides((prev) => ({ ...prev, [key]: value }));
  }, []);

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
      <PropControls
        controls={entry.controls}
        values={{ ...entry.defaults, ...propOverrides }}
        onChange={handleChange}
      />
    </div>
  );
}
