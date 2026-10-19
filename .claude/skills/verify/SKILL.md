---
name: verify
description: Prove a change to the RoadCorp website works by running it and looking at the result. Run before each commit of app or component changes, and before calling a task done.
---

# Verify the RoadCorp website

Done means evidence: report the commands you ran and what you observed. "It compiles" or "lint passes" is not proof the behaviour changed.

## 1. Run it
- Start the dev server with the `roadcorp-dev` preview (`.claude/launch.json`, port 3200) and open `/`.
- Check the browser console and the server log for errors.

## 2. Check what the change touched
| Area | What to observe |
|---|---|
| Hero (`components/hero.tsx`, `components/roadcorp-mark.tsx`) | The horizon mark renders with the Raidho-rune R and the ROADCORP wordmark; never dropped or replaced |
| Project list (`components/project-list.tsx`) | Every project renders with its link; links resolve |
| Footer (`components/footer.tsx`) | The mark, the year, and the contact link `mailto:contact@theroadcorp.com` with its aria-label |
| Metadata (`app/layout.tsx`, `app/opengraph-image.tsx`, `app/icon.svg`) | `<title>`, description and OG image respond (`/opengraph-image`); favicon loads |
| Styles (`app/globals.css`) | Light and dark mode both render; phone width (375 px) has no horizontal scroll |

Check the rows your change touched, plus the page as a whole at desktop and phone width.

## 3. Qualify the build
`pnpm build` must pass for any change to app code, styles or configuration (AGENTS.md).

## Proof standards
- Look at the real page, not a proxy: read the rendered text, inspect the element, take a screenshot.
- Quote each command and its result in the done report.
- For a new check, break the behaviour once and confirm the check catches it.
- If a check fails, suspect the observation (wrong port, stale server) before the code.
