# CLAUDE.md — Avalook project guide

Avalook is a marketing / portfolio site built with **TanStack Start (React 19 +
Vite 7)**, styled with the original Avalook CSS in `public/css/*`, deployable to
Cloudflare. Run locally with `npm run dev` → http://localhost:8080.

## Architecture
- `src/data/*` — all content as typed data (projects, posts, profiles, team,
  recruitment, site config). **This is the single seam for the future backend/CMS** —
  add/edit content here, never hardcode it in components.
- `src/components/site/*` — shared UI (header, footer, hero, cards, page shell…).
- `src/components/home/*` — home-only sections.
- `src/routes/*` — file-based routes; **`src/routeTree.gen.ts` is auto-generated, never edit it.**
- Styling lives in `public/css/` (`base`, `layout`, `components`, `animations`,
  `section-backgrounds`, `responsive`). Keep using these classes — do not add a
  parallel styling system (no inline design systems, no new CSS frameworks).

## ⭐ GOLDEN RULE — responsive consistency (ALWAYS follow)
Every change MUST look correct and stay consistent across **all** viewports —
treat this as a hard requirement, not a nice-to-have:

- **Desktop / laptop** (≥ ~1180px)
- **Tablet** (~640–1180px)
- **Mobile / phone** (~390–430px)

When you touch layout / CSS / a component:
1. **Update every breakpoint, not just one.** Breakpoints live in
   `public/css/components.css` (container queries `@container pcard …` and
   `@media …`) and `public/css/responsive.css`. `responsive.css` loads last, so
   its rules win on mobile — fix it there too or your change won't apply.
2. **Never** let content overflow, get clipped/cut off, or leave large empty
   gaps on any viewport. If a section has a variable number of items, make the
   layout collapse cleanly (no reserved empty cells).
3. **Always verify with screenshots at desktop + tablet + mobile** before
   calling a visual change done:
   ```bash
   CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
   "$CHROME" --headless=new --hide-scrollbars --window-size=1440,1500 \
     --screenshot=/tmp/desktop.png http://localhost:8080/<route>
   # repeat with 834,1700 (tablet) and 390,2600 (mobile)
   ```

## Commands
```bash
npm run dev      # local dev server (offline) → http://localhost:8080
npm run build    # production build
npx tsc --noEmit # typecheck
npm run lint
```
