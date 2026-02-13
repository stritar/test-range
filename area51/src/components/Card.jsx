export default function Card({ title, description, tag, onOpen, selected }) {
    return (
      <article
        onClick={onOpen}
        style={{
          ...styles.card,
          border: selected
            ? "2px solid rgba(0,0,0,0.35)"
            : "1px solid rgba(0,0,0,0.08)",
          transform: selected ? "translateY(-2px)" : "none",
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") onOpen?.();
        }}
      >
        <div style={styles.topRow}>
          <span style={styles.tag}>{tag}</span>
        </div>
  
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.desc}>{description}</p>
  
        <div style={styles.footer}>
          <button
            style={styles.cta}
            onClick={(e) => {
              e.stopPropagation(); // prevent card click triggering twice
              onOpen?.();
            }}
          >
            Open
          </button>
        </div>
      </article>
    );
  }
  
  const styles = {
    card: {
      borderRadius: 16,
      padding: 16,
      background: "white",
      boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      cursor: "pointer",
      transition: "transform 120ms ease",
    },
    topRow: { display: "flex", justifyContent: "flex-start" },
    tag: {
      fontSize: 12,
      padding: "4px 10px",
      borderRadius: 999,
      border: "1px solid rgba(0,0,0,0.10)",
      background: "rgba(0,0,0,0.02)",
    },
    title: { margin: 0, fontSize: 16 },
    desc: { margin: 0, opacity: 0.75, lineHeight: 1.4 },
    footer: { marginTop: 8, display: "flex", justifyContent: "flex-end" },
    cta: {
      padding: "8px 12px",
      borderRadius: 12,
      border: "1px solid rgba(0,0,0,0.12)",
      background: "white",
      cursor: "pointer",
    },
  };
  