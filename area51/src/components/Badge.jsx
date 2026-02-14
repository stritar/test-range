import { useState } from "react";

export default function Badge({ children, style, ...rest }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--badge-font-family)",
        fontSize: "var(--badge-font-size)",
        fontWeight: "var(--badge-font-weight)",
        lineHeight: "var(--badge-line-height)",
        color: "var(--badge-color)",
        background: isHovered ? "var(--badge-background--hover)" : "var(--badge-background)",
        borderRadius: "var(--badge-border-radius)",
        padding:
          "var(--badge-padding-up) var(--badge-padding-right) var(--badge-padding-down) var(--badge-padding-left)",
        boxSizing: "border-box",
        transition:
          "background var(--motion-hover-duration) var(--core-motion-ease-standard)",
        ...style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...rest}
    >
      {children}
    </span>
  );
}
