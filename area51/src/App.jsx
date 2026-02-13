import Button from "./components/Button.jsx";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--shell-background)",
      }}
    >
      <Button>Submit</Button>
      <Button disabled>Submit</Button>
    </div>
  );
}
