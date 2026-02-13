import { useId } from "react";
import textSvgRaw from "../assets/icons/text.svg?raw";
import imageSvgRaw from "../assets/icons/image.svg?raw";

const iconMap = {
  text: textSvgRaw,
  image: imageSvgRaw,
};

function prepareSvg(svgString, uniqueId) {
  return svgString
    .replace(/\bfill="[^"]*"/g, 'fill="currentColor"')
    .replace(/\bstroke="[^"]*"/g, 'stroke="currentColor"')
    .replace(/\bwidth="16"\s+height="16"/, 'width="100%" height="100%"')
    .replace(/\bwidth="16"/, 'width="100%"')
    .replace(/\bheight="16"/, 'height="100%"')
    .replace(/clip0_47_2617/g, uniqueId);
}

export default function Icon({
  name,
  size,
  ariaLabel,
  color,
  ...props
}) {
  const raw = iconMap[name];
  const id = useId();
  if (!raw) return null;

  const svgHtml = prepareSvg(raw, `clip_${id.replace(/:/g, "")}`);

  const style = {
    display: "inline-flex",
    lineHeight: 0,
    width: size ?? "var(--icon-width)",
    height: size ?? "var(--icon-height)",
    color: color ?? "var(--icon-color)",
  };

  return (
    <span
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      style={style}
      dangerouslySetInnerHTML={{ __html: svgHtml }}
      {...props}
    />
  );
}
