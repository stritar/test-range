export default function Navbar({ active, onNavigate, search, onSearch }) {
    const linkStyle = (key) => ({
      ...styles.link,
      opacity: active === key ? 1 : 0.75,
      fontWeight: active === key ? 700 : 500,
    });
  
    return (
      <header style={styles.header}>
        <div style={styles.brand} onClick={() => onNavigate("home")}>
          My App
        </div>
  
        <nav style={styles.nav}>
          <button style={linkStyle("home")} onClick={() => onNavigate("home")}>
            Home
          </button>
          <button
            style={linkStyle("projects")}
            onClick={() => onNavigate("projects")}
          >
            Projects
          </button>
          <button
            style={linkStyle("settings")}
            onClick={() => onNavigate("settings")}
          >
            Settings
          </button>
        </nav>
  
        <div style={styles.right}>
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search cards…"
            style={styles.input}
          />
          <button style={styles.button}>Sign in</button>
        </div>
      </header>
    );
  }
  
  const styles = {
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      padding: "16px 24px",
      borderBottom: "1px solid rgba(0,0,0,0.08)",
      position: "sticky",
      top: 0,
      background: "white",
      zIndex: 10,
    },
    brand: { fontWeight: 800, letterSpacing: 0.2, cursor: "pointer" },
    nav: { display: "flex", gap: 10 },
    link: {
      appearance: "none",
      border: "1px solid rgba(0,0,0,0.08)",
      background: "white",
      borderRadius: 999,
      padding: "8px 12px",
      cursor: "pointer",
    },
    right: { display: "flex", alignItems: "center", gap: 10 },
    input: {
      width: 220,
      padding: "9px 12px",
      borderRadius: 12,
      border: "1px solid rgba(0,0,0,0.12)",
      outline: "none",
    },
    button: {
      padding: "8px 12px",
      borderRadius: 10,
      border: "1px solid rgba(0,0,0,0.12)",
      background: "white",
      cursor: "pointer",
    },
  };
  