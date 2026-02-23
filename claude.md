# Project Rules

## CSS Variables — Figma Only

When implementing a component from a Figma design, **only** use CSS custom properties (`var(--...)`) that are visible on the component in Figma's inspect panel. Never invent, guess, or create your own variable names.

If the Figma design references variables that do not yet exist in the codebase, **stop implementation immediately** and ask the user to provide the missing variable definitions before continuing.

## Icon Name Matching

When a Figma design includes an icon:

1. Check the icon's name in Figma.
2. Look for a matching SVG file in `src/assets/icons/` (including any icons added during the current session).
3. If a match exists, import and use that file.
4. If **no match is found**, import and use `src/assets/icons/placeholder.svg` as a fallback.

Never leave a broken import or omit an icon from the implementation.
