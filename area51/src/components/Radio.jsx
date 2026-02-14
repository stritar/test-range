export default function Radio({
  checked = false,
  disabled = false,
  name,
  value,
  onChange,
  "aria-label": ariaLabel,
  ...rest
}) {
  const outlineColor = disabled
    ? "var(--radio-outline-color--disabled)"
    : "var(--radio-outline-color)";
  const backgroundColor = disabled
    ? "var(--radio-background--disabled)"
    : "var(--radio-background)";
  const indicatorColor = disabled
    ? "var(--radio-indicator-color--disabled)"
    : "var(--radio-indicator-color--selected)";

  const handleClick = (e) => {
    if (disabled) return;
    e.preventDefault();
    onChange?.(e);
  };

  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "var(--radio-width)",
        height: "var(--radio-height)",
        cursor: disabled ? "not-allowed" : "pointer",
        flexShrink: 0,
      }}
      onClick={handleClick}
      {...rest}
    >
      <input
        type="radio"
        checked={checked}
        disabled={disabled}
        name={name}
        value={value}
        tabIndex={disabled ? -1 : 0}
        aria-label={ariaLabel}
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          opacity: 0,
          margin: 0,
          padding: 0,
        }}
      />
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "var(--radio-width)",
          height: "var(--radio-height)",
          borderRadius: "var(--radio-border-radius)",
          border: "2px solid",
          borderColor: outlineColor,
          background: backgroundColor,
          boxSizing: "border-box",
        }}
      >
        {checked && (
          <span
            style={{
              width: "var(--radio-indicator-size)",
              height: "var(--radio-indicator-size)",
              borderRadius: "var(--radio-border-radius)",
              background: indicatorColor,
            }}
          />
        )}
      </span>
    </label>
  );
}
