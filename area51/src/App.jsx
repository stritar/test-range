import Button from "./components/Button.jsx";
import Card from "./components/Card.jsx";
import Icon from "./components/Icon.jsx";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--sem-space---md)",
        background: "var(--shell-background)",
      }}
    >
      <Icon name="text" ariaLabel="Text" />
      <div style={{ display: "flex", gap: "var(--sem-space---sm)" }}>
        <Button>Submit</Button>
        <Button disabled>Submit</Button>
      </div>
      <Card style={{ maxWidth: 360 }}>
        <Card.Header>Card header</Card.Header>
        <Card.Body>
          <p style={{ margin: 0, fontSize: "var(--core-font-size--body)", color: "var(--sem-text--neutral)" }}>
            Card body content. All styles use --card-* and --card-header-* variables.
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}
