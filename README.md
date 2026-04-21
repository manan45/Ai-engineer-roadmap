# Atlas — Frontier AI Engineering Roadmap Dashboard

A Next.js dashboard for the April 19, 2026 Atlas curriculum (6 tracks + Track 5.5 + 5 appendices). Every URL is sourced verbatim from the source document.

- Search across all topics and resources
- Per-topic / per-week completion state (stored locally in your browser)
- **Server-side link-status cache** on the filesystem (7-day TTL), pre-warmed at build time
- Deployable to Netlify in one step

---

## Stack

- Next.js 14 App Router, React 18, TypeScript strict
- Tailwind CSS
- Server-side link cache in `lib/linkCache.ts`
  - Baseline: `.cache/link-status.json` (committed, refreshed at build)
  - Runtime writes on Netlify: `/tmp/atlas-link-cache/link-status.json` (merged with baseline at read time)
- API route: `app/api/link-status/route.ts` (GET snapshot, POST refresh)

---

## Local development

```bash
npm install
npm run warm-cache   # one-time: probe all ~400 URLs, writes .cache/link-status.json
npm run dev          # http://localhost:3000
```

Build locally:

```bash
npm run build && npm start
```

---

## Deploy to Netlify

1. Push this repo to GitHub.
2. In Netlify, "Add new site" → "Import from Git" → select the repo.
3. Netlify auto-detects `netlify.toml`:
   - Build command: `npm run warm-cache && npm run build`
   - Publish dir: `.next`
   - Plugin: `@netlify/plugin-nextjs`
4. Deploy. First build takes ~2 minutes (warm-cache ~80s for 398 URLs + Next build).

**Cache behaviour on Netlify:**
- Build time → `warm-cache` probes every URL and writes the baseline to `.cache/link-status.json` (shipped with the function bundle).
- Runtime → `/api/link-status` reads the baseline and merges any per-deploy updates that have been written to `/tmp`. Writes go to `/tmp/atlas-link-cache/` (only writable location on Netlify Functions).
- From the UI → "Check links" in the top bar POSTs to `/api/link-status` in batches of 60 to refresh stale entries.

---

## Project layout

```
app/
  api/link-status/route.ts   # GET/POST link-status JSON
  Dashboard.tsx              # client shell (search, progress, refresh)
  layout.tsx
  page.tsx                   # server entry; reads initial cache snapshot
  globals.css
components/
  TopBar.tsx  Sidebar.tsx
  TrackSection.tsx  TopicCard.tsx  LinkItem.tsx
  AppendixA.tsx ... AppendixE.tsx
data/
  curriculum.ts              # every exact link from the source curriculum
lib/
  linkCache.ts               # filesystem cache with baseline + /tmp merge
scripts/
  warm-cache.ts              # probes every URL and writes .cache/link-status.json
.cache/
  link-status.json           # warmed baseline (committed)
netlify.toml
```

---

## Refreshing the baseline cache

- Manually:

  ```bash
  npm run warm-cache
  ```

  Only entries older than 7 days (or missing) are re-probed. Delete `.cache/link-status.json` to force a full refresh.

- Automatically on every Netlify deploy (already wired in `netlify.toml`).

---

## Notes

- The dashboard is the entire curriculum — 6 tracks + Track 5.5 + Appendices A–E — rendered as interactive cards with per-topic checkmarks.
- Progress (which topics you marked "Done") is stored in `localStorage` under `atlas.done.<topic-id>`. Clear site data to reset.
- When a link goes red, hover the dot for the status code / error message; click "Check links" in the top bar to re-probe.
