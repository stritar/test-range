import { useState } from "react";

export default function Radio({
  checked = false,
  disabled = false,
  name,
  value,
  onChange,
  "aria-label": ariaLabel,
  ...rest
}) {
  const [isHovered, setIsHovered] = useState(false);

  const outlineColor = disabled
    ? "var(--radio-outline-color--disabled)"
    : checked
      ? "var(--radio-outline-color--selected)"
      : isHovered
        ? "var(--radio-outline-color--hover)"
        : "var(--radio-outline-color)";
  const backgroundColor = disabled
    ? "var(--radio-background--disabled)"
    : checked
      ? "var(--radio-background)"
      : isHovered
        ? "var(--radio-background--hover)"
        : "var(--radio-background)";
  const showIndicator = checked || (isHovered && !disabled);
  const indicatorColor = disabled
    ? "var(--radio-indicator-color--disabled)"
    : checked
      ? "var(--radio-indicator-color--selected)"
      : "var(--radio-indicator-color--hover)";

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
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
          transition:
            "border-color var(--radio-transition-duration) var(--radio-transition-easing), background var(--radio-transition-duration) var(--radio-transition-easing)",
        }}
      >
        {showIndicator && (
          <span
            style={{
              width: "var(--radio-indicator-size)",
              height: "var(--radio-indicator-size)",
              borderRadius: "var(--radio-border-radius)",
              background: indicatorColor,
              transition:
                "background var(--radio-transition-duration) var(--radio-transition-easing)",
            }}
          />
        )}
      </span>
    </label>
  );
}
