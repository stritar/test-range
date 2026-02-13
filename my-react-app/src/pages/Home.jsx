import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

const cards = [
  { id: 1, tag: "Design", title: "Design System", description: "Components, tokens, and docs for consistent UI." },
  { id: 2, tag: "Build", title: "React Playground", description: "Practice components and state with small exercises." },
  { id: 3, tag: "Learn", title: "Frontend Basics", description: "HTML, CSS, JS fundamentals and patterns." },
  { id: 4, tag: "Ship", title: "Mini Dashboard", description: "Navbar + cards + interactions (filters next)." },
  { id: 5, tag: "Data", title: "API Fetch", description: "Load data and render lists safely." },
  { id: 6, tag: "Polish", title: "UI Refinement", description: "Spacing, typography, and layout improvements." },
];

export default function Home() {
  const [active, setActive] = useState("home");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return cards;

    return cards.filter((c) => {
      return (
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tag.toLowerCase().includes(q)
      );
    });
  }, [search]);

  const activeTitle =
    active === "home" ? "Dashboard" : active === "projects" ? "Projects" : "Settings";

  const activeDescription =
    active === "home"
      ? "Navbar + reusable cards + search + selection."
      : active === "projects"
      ? "This is just state-based navigation (no router yet)."
      : "Later we can add preferences / toggles here.";

  return (
    <div style={styles.page}>
      <Navbar
        active={active}
        onNavigate={(key) => {
          setActive(key);
          setSelectedId(null);
        }}
        search={search}
        onSearch={setSearch}
      />

      <main style={styles.main}>
        <section style={styles.hero}>
          <h1 style={styles.h1}>{activeTitle}</h1>
          <p style={styles.p}>{activeDescription}</p>

          {selectedId && (
            <div style={styles.banner}>
              Selected card ID: <b>{selectedId}</b>
              <button
                style={styles.clear}
                onClick={() => setSelectedId(null)}
              >
                Clear
              </button>
            </div>
          )}
        </section>

        <section style={styles.grid}>
          {filtered.map((c) => (
            <Card
              key={c.id}
              tag={c.tag}
              title={c.title}
              description={c.description}
              selected={c.id === selectedId}
              onOpen={() => setSelectedId(c.id)}
            />
          ))}
        </section>

        {filtered.length === 0 && (
          <p style={styles.empty}>No cards match “{search}”.</p>
        )}
      </main>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#fafafa" },
  main: { maxWidth: 1100, margin: "0 auto", padding: "24px" },
  hero: { padding: "10px 0 18px" },
  h1: { margin: 0, fontSize: 28 },
  p: { margin: "8px 0 0", opacity: 0.75 },
  banner: {
    marginTop: 12,
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.10)",
    background: "white",
    display: "flex",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  clear: {
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px solid rgba(0,0,0,0.12)",
    background: "white",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 16,
  },
  empty: { marginTop: 16, opacity: 0.7 },
};
