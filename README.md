# Avalook

Marketing / portfolio site for **Avalook**, a Vietnam-based creative IP studio.
Built with **TanStack Start** (React 19 + Vite 7), styled with the original
Avalook CSS, and deployable to Cloudflare.

## Run it locally (offline)

You only need [Node.js](https://nodejs.org) 20+ installed. After the first
`npm install`, everything runs fully offline.

```bash
npm install      # once — downloads dependencies
npm run dev      # start the dev server
```

Then open **http://localhost:8080** in your browser. The page hot-reloads as you
edit files.

### Other commands

```bash
npm run build    # production build (outputs to dist/)
npm run lint     # eslint
npm run format   # prettier
```

## Project structure

```
src/
  data/         # All site content as typed data — the single place a future
                # backend/CMS will plug into (projects, posts, profiles, team…)
  components/
    site/       # Shared UI: header, footer, hero slider, cards, page shell…
    home/       # Home-only sections (team carousel, activities, announcements)
  routes/       # File-based routes (TanStack Router) — each reads from src/data
  routeTree.gen.ts   # auto-generated, do not edit
public/
  css/          # Original Avalook stylesheets (unchanged)
  assets/, media/    # Images and videos
```

### Adding content

Content lives in `src/data/*`. To add a blog post, append an entry to
`src/data/posts.ts`; to add a project, edit `src/data/projects.ts`. Routes and
components render straight from those files, so this is exactly the seam where a
database/API can later replace the static arrays.
