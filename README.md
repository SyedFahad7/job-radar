# Job radar · DevRel

Public, static job board for **Syed Fahad** — intern, junior, and mid Developer Relations roles. Dark editorial console. No auth. Seeded from a dated sweep, not invented listings.

## Run locally

```bash
npm install
npm run dev
```

App: [http://127.0.0.1:47291](http://127.0.0.1:47291)

```bash
npm run build
npm start
```

## Deploy on Vercel

1. Import this repo in [Vercel](https://vercel.com/new).
2. Framework preset: **Next.js**. Root directory: repo root.
3. No environment variables.
4. Deploy. The board is static-friendly (`generateStaticParams` for every job and sweep).

Every push to the connected branch rebuilds the seed into HTML.

## Data

| File | What |
| --- | --- |
| `data/jobs.json` | Full seed: `fx`, `lastSweepDate`, `sweeps[]`, `jobs[]` |

Keep the seed field names. Every job **must** have a `sweepId` that matches a sweep `id`.

URL slugs are generated at build time from `company` + `title` (collisions get a location suffix). Example: `sarvam-ai-developer-relations-engineer-developer-advocate`.

## How to add a sweep

Do **not** rewrite history. Append.

1. Add a sweep record to `sweeps`:

```json
{
  "id": "2026-09-12-second",
  "label": "Second sweep",
  "surfacedAt": "2026-09-12",
  "windowStart": "2026-08-30",
  "windowEnd": "2026-09-12",
  "notes": "Roles first seen after 29 Aug 2026."
}
```

- `windowStart` = day after the previous sweep’s `windowEnd`
- `windowEnd` = the prompt / search date

2. Append **new** jobs to `jobs`, each with `"sweepId": "2026-09-12-second"`. Leave earlier jobs untouched (you may update their `status` to `CLOSED` or `OPEN (STALE)` if a later pass confirms it).
3. Set `lastSweepDate` to the new surfaced date. Refresh `fx` if you convert salaries.
4. Redeploy.

Status values: `OPEN`, `OPEN (STALE)`, `CLOSED`.  
Flags: `ok` (shown as **core**), `senior-leaning`, `stale`, `marketplace`, `manager-title`.

## Stack

Next.js App Router, TypeScript, Tailwind CSS. Filters live in the query string so a detail page can return to the same bearing.
