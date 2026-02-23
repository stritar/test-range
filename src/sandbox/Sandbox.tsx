import { useState } from "react";
import { registry, type ComponentEntry } from "./registry";
import { Gallery } from "./Gallery";
import { Stage } from "./Stage";
import styles from "./Sandbox.module.css";

export function Sandbox() {
  const [selected, setSelected] = useState<ComponentEntry | null>(null);

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
        <Stage entry={selected} />
      </main>
    </div>
  );
}
