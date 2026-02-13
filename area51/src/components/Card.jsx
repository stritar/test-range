import Icon from "./Icon.jsx";

export function CardHeader({ children, ...rest }) {
  return (
    <div
      role="banner"
      className="card-header"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--card-header-gap)",
        fontFamily: "var(--card-header-font-family)",
        fontSize: "var(--card-header-font-size)",
        fontWeight: "var(--card-header-font-weight)",
        lineHeight: "var(--card-header-line-height)",
        color: "var(--card-header-color)",
        boxSizing: "border-box",
      }}
      {...rest}
    >
      <Icon
        name="image"
        size="var(--card-header-icon-size)"
        color="var(--card-header-color)"
        aria-hidden
      />
      {children}
    </div>
  );
}

export function CardBody({ children, ...rest }) {
  return (
    <div className="card-body" style={{ boxSizing: "border-box" }} {...rest}>
      {children}
    </div>
  );
}

export default function Card({ children, style, ...rest }) {
  return (
    <article
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--card-gap)",
        background: "var(--card-background)",
        borderRadius: "var(--card-border-radius)",
        padding: "var(--card-padding)",
        boxShadow: "var(--card-shadow)",
        boxSizing: "border-box",
        ...style,
      }}
      {...rest}
    >
      {children}
    </article>
  );
}

Card.Header = CardHeader;
Card.Body = CardBody;
