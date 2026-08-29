# Technical SEO Findings — nehandev.com

## RESOLVED (2026-08-29, commit `cad44e6`): Two competing sitemap systems, static one wins, serves stale/wrong data

The project has **both**:
1. `app/sitemap.ts` — Next.js native sitemap route, well-configured (differentiated `priority`/`changeFrequency` per page, e.g. home=1.0, /layanan=0.9, /projects=0.8; excludes `/demo/*`).
2. `next-sitemap` (configured in `next-sitemap.config.js`, run as a `postbuild` step per `package.json`), which writes **static** `public/sitemap.xml` + `public/sitemap-0.xml` with a flat `priority: 0.7` / `changefreq: weekly` for every URL.

Static files in `public/` are served ahead of the dynamic `app/sitemap.ts` route, so **the flat next-sitemap output is what Google actually receives** — the differentiated priorities in `app/sitemap.ts` are dead code. Verified live at `https://www.nehandev.com/sitemap-0.xml`.

Consequences observed in the live sitemap:
- It lists `https://www.nehandev.com/sitemap.xml` itself as an indexable page (with a `<priority>`), a next-sitemap artifact — sitemaps should never list themselves as content.
- It includes all `/demo/*` pages (see on-page findings — these all canonicalize to the homepage), directly contradicting the canonical signal and wasting crawl budget.
- The version committed to git (`public/sitemap.xml`) points to `http://localhost:3000/sitemap-0.xml` — stale from a local build, only correct in production because the host's build step regenerates it with the right env var. Committing generated sitemap/robots files is fragile.

**Recommendation:** Remove `next-sitemap` (delete `next-sitemap.config.js`, the `postbuild` script, and stop tracking `public/sitemap.xml` / `public/sitemap-0.xml` / `public/robots.txt`). Rely solely on `app/sitemap.ts` (already correct) and add an `app/robots.ts` for the same reason.

## High: Insecure redirect hop before reaching the canonical HTTPS URL

`curl -IL https://nehandev.com` shows:
```
https://nehandev.com/  → 301 → http://www.nehandev.com/   (downgrades to HTTP)
http://www.nehandev.com/ → 301 → https://www.nehandev.com/ (back to HTTPS)
```
Two redirect hops instead of one, and one of them is unencrypted. Should redirect apex → `https://www.nehandev.com/` directly in a single hop.

## Info: robots.txt and indexability are otherwise healthy
- `robots.txt` allows all crawling except `/api/`, correctly points to the sitemap.
- HTTPS is enforced at the end of the chain; no mixed content observed.
- No `llms.txt` (optional — Google ignores it, but increasingly checked by AI answer engines).
