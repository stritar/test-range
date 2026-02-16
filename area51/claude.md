When implementing UI from Figma MCP, follow these rules strictly:
No Assumptions
If a property (padding, margin, border, radius, shadow, gap, state, etc.) is not explicitly defined in Figma MCP, do not add it.
Absence of a value means no value — not a default.
No Inferred Styling
Do not introduce borders, paddings, background colors, hover states, focus states, disabled states, or transitions unless they are explicitly present in Figma MCP.
Do not “complete” a design based on common UI conventions.
No Pattern-Based Additions
Even if a component is commonly known to have certain states (e.g., buttons having hover/focus, inputs having error states), do not implement those states unless they exist in Figma MCP.
No System Defaults
Do not apply framework defaults (e.g., Shadcn, Tailwind, browser defaults) if they are not explicitly represented in Figma MCP.
Override or remove defaults if necessary to match Figma exactly.
Strict Visual Parity
Implementation must reflect only what exists in Figma MCP — nothing more, nothing less.
If something appears incomplete in Figma MCP, treat it as intentionally incomplete rather than filling gaps.

When implementing icons from Figma:
Do Not Modify SVGs
Leave SVG files exactly as they are.
Do not edit paths, attributes, structure, or formatting.
Do not add inline styles.
Respect currentColor
All SVG icons contain fill="currentColor".
This means the icon inherits its color from the parent component.
Do not replace currentColor with a hardcoded color value.
Do not add explicit fill, stroke, or color styles to the SVG unless explicitly defined in Figma.
No Inline Coloring
Do not set color directly on the SVG element.
Color must always be controlled by the parent component via CSS.
Strict Asset Matching
If the icon used in the inspected Figma design exists in the /assets/icons folder, use that exact file.
If the icon does not exist in the assets folder, fallback to:
/assets/icons/placeholder.svg
Do not create new SVG files.
Do not import third-party icon libraries as substitutes.
No Assumptions
Do not substitute “similar-looking” icons.
Do not attempt to recreate missing icons manually.
Implementation must reflect the existing asset system exactly — no modifications, no assumptions, no replacements.