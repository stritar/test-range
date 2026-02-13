export default function FigmaHeading({ children = "Test AaBbCc" }) {
  return (
    <p
      data-node-id="92:191"
      style={{
        fontFamily: "var(--core-font-family--hero)",
        fontWeight: "var(--core-font-weight--bold)",
        fontSize: "var(--core-font-size--h1)",
        lineHeight: "var(--core-line-height--h1)",
        color: "var(--sem-text--neutral)",
        margin: 0,
      }}
    >
      {children}
    </p>
  );
}

