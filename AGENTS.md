# RoadCorp instructions

Use mise and pnpm with the committed versions. [package.json](package.json) owns commands; [biome.jsonc](biome.jsonc) owns formatting and lint rules through its Ultracite preset. Do not copy the preset's rule catalog into instruction files.

For website work, use `pnpm dev`; check code with `pnpm lint` and qualify the completed application candidate with `pnpm build`. No test script is configured. Documentation-only edits need formatting and reference checks.

Olympus/Hermes skills and operations tooling live in the private RoadCorp/olympians repository under `roadcorp/`, and the active plan and task tracker are in the RoadCorp Notion teamspace: inspect their specific contracts when changing them. A local edit does not update a running agent or establish runtime health; verify the installed configuration and effects for any requested rollout. Preserve account identity, task ownership, privacy, and recovery behavior.
