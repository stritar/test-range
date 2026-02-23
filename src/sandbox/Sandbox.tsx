import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { registry, type ComponentEntry } from "./registry";
import { Gallery } from "./Gallery";
import { Stage } from "./Stage";
import { PropControls } from "./PropControls";
import styles from "./Sandbox.module.css";

export function Sandbox() {
  const [selected, setSelected] = useState<ComponentEntry | null>(null);
  const [propOverrides, setPropOverrides] = useState<Record<string, unknown>>(
    {},
  );
  const prevName = useRef<string | null>(null);

  useEffect(() => {
    if (selected?.name !== prevName.current) {
      setPropOverrides({});
      prevName.current = selected?.name ?? null;
    }
  }, [selected]);

  const effectiveProps = useMemo(() => {
    if (!selected) return {};
    const base = { ...selected.defaults };
    for (const [k, v] of Object.entries(propOverrides)) {
      if (v !== undefined) base[k] = v;
    }
    return base;
  }, [selected, propOverrides]);

  const handleChange = useCallback((key: string, value: unknown) => {
    setPropOverrides((prev) => ({ ...prev, [key]: value }));
  }, []);

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h1 className={styles.title}>Components</h1>
          <span className={styles.count}>{registry.length}</span>
        </div>
        <Gallery
          entries={registry}
          selectedName={selected?.name ?? null}
          onSelect={setSelected}
        />
      </aside>
      <main className={styles.main}>
        <Stage entry={selected} effectiveProps={effectiveProps} />
      </main>
      {selected && (
        <aside className={styles.rightSidebar}>
          <PropControls
            controls={selected.controls}
            values={{ ...selected.defaults, ...propOverrides }}
            onChange={handleChange}
          />
        </aside>
      )}
    </div>
  );
}
