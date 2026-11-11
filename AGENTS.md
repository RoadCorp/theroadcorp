# RoadCorp instructions

Use mise and pnpm with the committed versions. [package.json](package.json) owns commands; [biome.jsonc](biome.jsonc) owns formatting and lint rules through its Ultracite preset. Do not copy the preset's rule catalog into instruction files.

For website work, use `pnpm dev`; check code with `pnpm lint` and qualify the completed application candidate with `pnpm build`. No test script is configured. Documentation-only edits need formatting and reference checks.

Olympus/Hermes skills and operations tooling live in the private RoadCorp/olympians repository under `roadcorp/`, and the active plan and task tracker are in the RoadCorp Notion teamspace: inspect their specific contracts when changing them. A local edit does not update a running agent or establish runtime health; verify the installed configuration and effects for any requested rollout. Preserve account identity, task ownership, privacy, and recovery behavior.

## Design

- **Tokens:** [app/globals.css](app/globals.css) is the only source. The night-sky palette (`--sky`, `--ground`, `--ink`, `--haze`, `--line`) sits in `:root`, the shadcn semantic tokens map onto it, and `@theme inline` exposes them to Tailwind. Style with token utilities (`bg-background`, `text-muted-foreground`); add a token there before using a new colour, and keep raw hex out of components. The site has one dark theme and no light mode.
- **Type:** Overpass through `next/font` (`--font-overpass`, used as `font-sans`).
- **Components:** shadcn/ui, style `new-york` on Radix ([components.json](components.json)), icons from lucide. Add primitives with the shadcn CLI. Avenews uses `base-nova` on Base UI on purpose; do not convert either project to match the other.
- **Mark:** [components/roadcorp-mark.tsx](components/roadcorp-mark.tsx) is the logo's source geometry, and the icons and OG image are generated from it. The Raidho rune (ᚱ) inside the ring is the mark's heart: never drop or replace it. The wordmark is ROADCORP; in text, write RoadCorp.
- **Assets:** project thumbnails live in `public/projects/<slug>.png|svg` and render through `next/image`. Keep source files and large media out of the repo.
- **AI imagery:** the site uses none. Adding any needs Rafa's approval; it must not depict a real person or imitate a real brand, and the commit records the tool and prompt. Label it visibly when it shows realistic people, places or events (EU AI Act Art. 50).
- **Proof:** visual changes go through the `verify` skill, at phone and desktop width.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
