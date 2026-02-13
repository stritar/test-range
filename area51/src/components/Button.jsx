export default function Button({
  children = "label",
  onClick,
  type = "button",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      data-node-id="93:192"
      style={{
        fontFamily: "var(--button-label-font-family)",
        fontWeight: "var(--button-label-font-weight)",
        fontSize: "var(--button-label-font-size)",
        lineHeight: "var(--button-label-line-height)",
        color: disabled
          ? "var(--button-label-color--disabled)"
          : "var(--button-label-color)",
        background: disabled
          ? "var(--button-background--disabled)"
          : "var(--button-background)",
        border: "none",
        borderRadius: "var(--button-border-radius)",
        padding: "var(--button-padding-top) 0 var(--button-padding-bottom) 0",
        cursor: disabled ? "not-allowed" : "pointer",
        transition:
          "background var(--motion-hover-duration) var(--core-motion-ease-standard), color var(--motion-hover-duration) var(--core-motion-ease-standard)",
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = "var(--button-background--hover)";
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = "var(--button-background)";
      }}
      onMouseDown={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = "var(--button-background--pressed)";
      }}
      onMouseUp={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = "var(--button-background--hover)";
      }}
    >
      <span
        style={{
          display: "inline-block",
          paddingLeft: "var(--button-label-padding-left)",
          paddingRight: "var(--button-label-padding-right)",
        }}
      >
        {children}
      </span>
    </button>
  );
}
