# Figma MCP Tools — LLM Usage Guidelines

Use these guidelines to decide **when** and **how** to use each Figma MCP tool.

---

## 1. `get_design_context`

**When to use**
- You need **exact design specs** to implement UI: colors, border radius, spacing, typography, etc.
- You are building or changing a **screen, component, or design system** from Figma.
- You have a Figma node ID (or URL with `node-id=`) and need the full design payload.

**How to use**
- Prefer this over `get_metadata` when you need **implementation-ready data** (e.g. React + Tailwind snippets with values like `rounded-[5px]`, `bg-[#84c194]`).
- Pass `nodeId` when you have it (e.g. from a URL like `?node-id=1-2` → use `1:2`).
- Set `clientLanguages` and `clientFrameworks` from the current codebase (e.g. `typescript`, `react`).
- Set `artifactType` when clear: `WEB_PAGE_OR_APP_SCREEN`, `COMPONENT_WITHIN_A_WEB_PAGE_OR_APP_SCREEN`, `REUSABLE_COMPONENT`, or `DESIGN_SYSTEM`.
- Set `taskType` when clear: `CREATE_ARTIFACT`, `CHANGE_ARTIFACT`, or `DELETE_ARTIFACT`.
- **Parse the entire tool result.** The full payload (exact specs, code snippets) is in the same response; do not assume it’s missing if you see an “IMPORTANT” line.
- **After calling this tool, you MUST call `get_screenshot`** as indicated in the tool output. Treat this as a required two-step flow for design work.

**Pitfall to avoid**
- Do not “fall back” to the screenshot just because you see a short or partial message. The MCP returns exact properties in the full response; read the whole result before concluding that specs are missing.

---

## 2. `get_screenshot`

**When to use**
- **Always** after calling `get_design_context` (mandatory follow-up).
- You need a **visual reference** of the selected node for layout, hierarchy, or visual QA.
- You want to confirm or double-check how the design looks when the text output is ambiguous.

**How to use**
- Call it in the same flow as `get_design_context`; do not skip it after design context.
- Use the same `nodeId` (or none for current selection) as in `get_design_context`.
- Use the screenshot together with the design context: context gives exact values, screenshot gives spatial/visual clarity.

---

## 3. `get_metadata`

**When to use**
- You need a **structural overview** only: node IDs, layer types, names, positions, sizes.
- You are exploring the document or page (e.g. page id `0:1`) before drilling into a specific node with `get_design_context`.
- You want to see the tree of frames/components without full design payload.

**How to use**
- Prefer **`get_design_context`** when you need specs or code; use `get_metadata` only when you need structure/navigation.
- Use the returned node IDs as input to `get_design_context` or `get_screenshot` for detailed work.

---

## 4. `get_variable_defs`

**When to use**
- You need **design tokens / variables**: colors, typography, spacing, etc., as reusable values (e.g. `{'icon/default/secondary': '#949494'`).
- You are implementing a design system or theming and need the variable map for a node (or the selection).

**How to use**
- Call with the same `nodeId` (or omit for current selection) as the design you’re implementing.
- Use the returned map in code (e.g. CSS variables, theme objects, Tailwind config) rather than inferring values from screenshots.

---

## 5. `create_design_system_rules`

**When to use**
- You want to **generate or document design system rules** for the current repo (e.g. for Cursor rules or style guides).
- You need a prompt or template to derive rules from the current Figma/design context.

**How to use**
- Call with `clientLanguages` and `clientFrameworks` matching the project.
- Use the returned prompt/content to create or update design system documentation or rules; do not use for one-off node specs (use `get_design_context` for that).

---

## 6. `get_figjam`

**When to use**
- The file is a **FigJam board** (e.g. URL like `https://figma.com/board/...`), not a normal Figma design file.
- You need to generate or understand UI/content from a FigJam node (stickies, shapes, etc.).

**How to use**
- Only use for FigJam files; for normal Figma design files use `get_design_context` and `get_screenshot`.
- Extract `nodeId` from the board URL the same way (`?node-id=1-2` → `1:2`).
- Use `includeImagesOfNodes` as needed for visual context.

---

## Quick reference

| Goal | Primary tool | Follow-up |
|------|----------------|-----------|
| Implement UI from Figma (exact specs + code) | `get_design_context` | **Always** `get_screenshot` |
| Explore document structure | `get_metadata` | Optionally `get_design_context` on a node |
| Design tokens / variables | `get_variable_defs` | — |
| Design system rules for repo | `create_design_system_rules` | — |
| FigJam board content | `get_figjam` | — |

---

## Critical rule

**After every `get_design_context` call:**
1. Parse the **entire** tool result for specs and code before assuming anything is missing.
2. **Always** call `get_screenshot` in the same flow; do not treat design context as complete without the screenshot step.
