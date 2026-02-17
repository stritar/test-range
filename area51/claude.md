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
Icon matching is based on name:
If the icon name from Figma (e.g., icon='text') matches an icon file name in /assets/icons (e.g., text.svg), use that exact file.
Icon name matching is case-sensitive and must be an exact match (without the .svg extension).
If the icon name does not match any existing file in the assets folder, fallback to:
/assets/icons/placeholder.svg
Do not create new SVG files.
Do not import third-party icon libraries as substitutes.
No Assumptions
Do not substitute “similar-looking” icons.
Do not attempt to recreate missing icons manually.
Implementation must reflect the existing asset system exactly — no modifications, no assumptions, no replacements.

Color Inheritance Pattern
When implementing components with child elements:
Check if multiple child components share the same color value.
If children share the same color, define the color on the parent component instead of duplicating it on each child.
This allows children to inherit the color naturally, ensuring consistency and reducing duplication.
Example Pattern:
If an icon and a heading within a card header both need to be blue:
❌ Wrong: Define color: blue; on both .icon and .heading
✅ Correct: Define color: blue; on .header (parent), let children inherit
Icons with currentColor Support:
All icons use fill="currentColor" in their SVG.
Icons must have color: inherit; in their CSS (e.g., .root { color: inherit; }).
This ensures icons automatically match the color of their parent context.
Implementation Priority:
First check if children share colors → define on parent.
Only define color on individual children if they need different colors from each other.
This pattern ensures maintainability, consistency, and proper utilization of CSS inheritance.

When implementing components that include interactive states (e.g., hover, pressed, active):
State Detection
If Figma defines a hover, pressed, active, or similar interactive state, it must be implemented.
Do not invent states that are not defined in Figma MCP.
Use Animation Variables
Any transition between default → hover → pressed (or similar) must use an existing motion/transition variable.
Do not hardcode transition durations, easing, or timing values.
Do not use arbitrary values like 200ms ease.
Appropriate Variable Assignment
Assign the correct semantic motion variable (e.g., --motion-fast, --motion-interactive, etc., depending on the system).
The variable used must match the type of interaction (micro-interaction vs structural transition).
No Inline Transitions
Do not define inline transition properties unless they reference a design token variable.
All animation timing must be token-driven.
Strict Parity
If Figma defines a visual state change but does not define motion behavior, use the standard interactive motion variable from the design system.
Do not introduce custom animations beyond what is required for the defined state change.
All interactive transitions must be token-based, consistent, and system-driven — never ad-hoc.

Variable Governance Rules (No Variable Creation Policy)
No New Variables
Do not create new CSS variables, design tokens, or motion tokens.
Do not invent semantic names (e.g., --color-primary-hover, --spacing-card, --motion-fast) if they do not already exist in the system.
Do not “improve” or “normalize” missing tokens.
Use Existing Tokens Only
Only use variables that are already defined in the design system.
If a required value does not have an existing token, do not fabricate one.
Missing Variable Reporting (Required)
After completing an implementation, include a section titled:
⚠ Missing Design Tokens
List:
The property needing a token (e.g., hover background color)
The component affected
The exact value currently required (from Figma)
The type of token that is missing (color / spacing / radius / motion / etc.)
Temporary Values
If implementation requires a value and no token exists:
Use the explicit raw value from Figma (no assumptions).
Clearly flag it in the Missing Design Tokens section.
No Silent Decisions
Never silently introduce a variable.
Never assume a naming convention.
Never extend the token system independently.
The system is token-authoritative. If a token does not exist, implementation must expose the gap — not solve it autonomously.

## Breakpoints and layout

- **Source of truth:** Breakpoints and layout tokens are in `src/styles/design-tokens/core.css` (from Figma Mode 1 tokens).
- **Usage:** Use only these variables for responsive behavior. Media queries must use the breakpoint variables (e.g. `min-width: var(--core-breakpoint--md)`). Do not add new breakpoints or layout values.
- **Grid:** Column count, margin, and gutter are per breakpoint: `--core-layout-columns--*`, `--core-layout-margin--*`, `--core-layout-gutter--*`. Do not hardcode column counts or grid spacing.
- **Missing tokens:** If a breakpoint or layout value is needed and no token exists, list it in ⚠ Missing Design Tokens — do not add it yourself.

## Development workflow

Icon Usage Rule (Strict)
When rendering or referencing icons:
Never create, generate, invent, or approximate an icon.
Never substitute with a similar icon.
Never draw inline SVGs as replacements.
Never guess icon names.
Never modify or remix existing icons.
If the requested icon does not exist exactly in the /assets/icons directory (or the approved icon source), you must use:
/assets/icons/placeholder.svg
This rule has no exceptions.
If an icon cannot be found:
Use /assets/icons/placeholder.svg
Do not explain.
Do not attempt alternatives.
Do not generate a new icon.
The system must strictly rely only on existing, approved icon assets.

When implementing designs from Figma:
All Figma properties must be fully readable and unambiguous.
All layout, spacing, typography, color, state, and component properties must be clearly defined.
No assumptions may be made.
No inferred values may be used.
No fallback styling may be invented.
If any Figma property cannot be fully read, parsed, or confidently interpreted, the system must:
Abort the process immediately.
Produce no output.
Do not guess or approximate missing values.
Do not partially render the component.
Implementation must only proceed when the Figma specification is 100% complete and unambiguous.