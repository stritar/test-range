import TestTile from "./components/TestTile.jsx";
import FigmaRectangle from "./components/FigmaRectangle.jsx";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--sem-background--neutral)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--sem-space---md)",
          alignItems: "center",
        }}
      >
        <TestTile />
        <FigmaRectangle width="320px" />
      </div>
    </div>
  );
}
