# On-Page SEO Findings — nehandev.com

## RESOLVED (2026-08-29, commit `cad44e6`): 7 indexed URLs share one identical title/description/canonical (all point to home)

`/demo/travel`, `/demo/hotel`, `/demo/barbershop`, `/demo/rental`, `/demo/travel/destinasi`, `/demo/travel/paket`, `/demo/travel/kontak` are all in `public/sitemap-0.xml`, but each is a client component (`"use client"` at the top of `app/demo/*/page.tsx`), and Next.js App Router **cannot export `metadata` from a client component**. Result, verified live for every one of the 7 URLs:
- `<title>NehanDev | Professional Web Development Solutions</title>` (the site-wide default)
- `<link rel="canonical" href="https://www.nehandev.com">` (the homepage)

The canonical tag is actively telling Google "this page is a duplicate of the homepage, index that instead" — these demo showcases (real portfolio work) are functionally invisible to search despite being linked from `/layanan` and listed in the sitemap.

**Fix:** convert each `app/demo/*/page.tsx` to a server component wrapper that exports its own `metadata` (title, description, `alternates.canonical`) and renders the interactive UI from a child client component — the pattern already used correctly on `/projects`, `/education`, `/contact`, `/blog`.

## RESOLVED (2026-08-29, commit `3bd6042`): Duplicated "| NehanDev" suffix in title tags on 4 pages

Root layout (`app/layout.tsx:47-49`) sets:
```ts
title: { default: "NehanDev | Professional Web Development Solutions", template: "%s | NehanDev" }
```
But these pages already include `"| NehanDev"` in their own `title`, so the template appends it a second time:
| Page | Live `<title>` |
|---|---|
| `/projects` | `Portofolio | NehanDev | NehanDev` |
| `/education` | `Education Technology | NehanDev | NehanDev` |
| `/contact` | `Kontak | NehanDev | NehanDev` |
| `/blog` | `Blog | NehanDev | NehanDev` |

**Fix:** in each page's `metadata.title`, drop the trailing `"| NehanDev"` (e.g. `"Portofolio"` not `"Portofolio | NehanDev"`) and let the layout template add it once.

## RESOLVED (2026-08-29, commit `cad44e6`): `/layanan` (the main services/commercial page) has no page-specific metadata at all

`app/layanan/page.tsx` starts with `"use client"`, so — same root cause as the demo pages — it cannot export `metadata`. Live, it serves the site-wide default title, description, OG tags, and canonical (`https://www.nehandev.com`, not `/layanan`). This is arguably the most commercially important page on the site (it's the services/pricing page linked from primary nav) and it is currently indistinguishable from the homepage to Google.

**Fix:** same pattern as the demo pages — split into a server component that exports `metadata` with `alternates.canonical: "https://www.nehandev.com/layanan"`, wrapping the existing client UI.

## RESOLVED (2026-08-29, commit `3bd6042`): Missing `<h1>` on 3 indexed pages

Live H1 count: `/projects` → 0, `/education` → 0, `/contact` → 0 (vs. 1 on `/` and `/blog`). Both `/projects` and `/education` reuse section components (e.g. `components/ui/education-section.tsx:56`) that only render an `<h2>` — fine when embedded under the homepage's `<h1>`, but these components are also used as the entire content of their own standalone pages, leaving those pages with no top-level heading.

**Fix:** add a page-level `<h1>` to `/projects`, `/education`, and `/contact` (or promote the existing section heading to `<h1>` when rendered standalone).

## RESOLVED (2026-08-29, commit `d0c1348`): Stale English copy vs. the site's actual Indonesian-first positioning

The homepage `<title>` and meta description are Indonesian and UMKM-focused (`"NehanDev | Solusi Digital untuk Usaha Lokal"` / `"Kami bantu UMKM dan bisnis kecil..."`), but the root layout's `openGraph.title`, `twitter.title`, and the JSON-LD `description` all still read the old English positioning: `"NehanDev | Professional Web Development Solutions"` / `"Transform your digital vision into reality..."` (`app/layout.tsx:76,84,164`). Anyone sharing the homepage link on WhatsApp/Facebook/X/LinkedIn sees the old English pitch, not the current Indonesian one.

**Fix:** update the default `openGraph`/`twitter`/JSON-LD copy in `app/layout.tsx` to match the current Indonesian positioning (or make it locale-aware).
