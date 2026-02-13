import FigmaButton from "./components/FigmaButton.jsx";

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
      <FigmaButton>Submit</FigmaButton>,
      <FigmaButton disabled>Submit</FigmaButton>,
    </div>
  );
}
