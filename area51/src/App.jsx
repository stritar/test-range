import { useState } from "react";
import Badge from "./components/Badge.jsx";
import Button from "./components/Button.jsx";
import Card from "./components/Card.jsx";
import Icon from "./components/Icon.jsx";
import Radio from "./components/Radio.jsx";

export default function App() {
  const [selected, setSelected] = useState(null);

  const handleRadioChange = (value) => {
    setSelected((prev) => (prev === value ? null : value));
  };

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
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--sem-space---sm)", alignItems: "center" }}>
        <Badge>Label</Badge>
        <Badge>Label</Badge>
      </div>
      <div style={{ display: "flex", gap: "var(--sem-space---sm)" }}>
        <Button>Submit</Button>
        <Button disabled>Submit</Button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--sem-space---sm)", alignItems: "center" }}>
        <Radio
          name="demo"
          value="one"
          checked={selected === "one"}
          onChange={() => handleRadioChange("one")}
          aria-label="Option one"
        />
        <Radio
          name="demo"
          value="two"
          checked={selected === "two"}
          onChange={() => handleRadioChange("two")}
          aria-label="Option two"
        />
        <Radio name="demo" disabled aria-label="Disabled" />
        <Radio name="demo" checked disabled aria-label="Disabled selected" />
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
