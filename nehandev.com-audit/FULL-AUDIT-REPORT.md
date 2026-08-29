# SEO Audit — nehandev.com

**Date:** 2026-08-29
**Business type detected:** Digital agency / local-service business — web development for Indonesian UMKM (small/local businesses: restaurants, travel agencies, hotels), plus a secondary EdTech product (CBT Pro) and a portfolio/blog.

## Executive Summary

**SEO Health Score: 56 / 100** (Needs Improvement)

The site itself is technically well-built (Next.js 15, clean Lighthouse SEO=100, good CLS, alt text everywhere, a real blog with legal business info centralized). But a specific, repeated architectural mistake — several important pages being client components (`"use client"`) that therefore cannot export Next.js `metadata` — has quietly knocked out on-page SEO for 8 of the site's most important URLs, including the main services page and every portfolio demo. Combine that with a sitemap-generation conflict serving Google a worse, stale sitemap than the one already coded correctly, and a business-schema block that's invisible to non-JS crawlers, and the picture is: good bones, several fixable but high-impact gaps.

### Top 5 Critical/High Issues
1. **7 `/demo/*` URLs (real portfolio work) are duplicate-content clones of the homepage** — identical title, description, and a canonical tag pointing at the homepage, because they're client components with no metadata export.
2. **`/layanan`, the main services page, has zero page-specific metadata** for the same reason — it's indistinguishable from the homepage to search engines.
3. **Two competing sitemaps**: a well-configured native `app/sitemap.ts` is dead code; the live sitemap actually served is `next-sitemap`'s flatter, worse output, which even lists `sitemap.xml` itself as a page.
4. **Title tags read "X | NehanDev | NehanDev"** on `/projects`, `/education`, `/contact`, `/blog` — a template double-application bug.
5. **The homepage's core business schema (ProfessionalService/address/services) only loads after JS hydration** — invisible to non-JS crawlers, which increasingly matters for AI answer engines (GPTBot, ClaudeBot, PerplexityBot).

### Top 5 Quick Wins
1. Remove the trailing `"| NehanDev"` from 4 page titles (4-line fix).
2. Switch the homepage JSON-LD `<Script>` from `afterInteractive` to `beforeInteractive` (matches the pattern already done correctly on blog posts).
3. Fix the apex-domain redirect to skip its insecure HTTP hop.
4. Swap the Article schema's SVG logo for the PNG favicon that already exists in the project.
5. Delete `next-sitemap` and its stale, self-referencing static sitemap files.

---

## Technical SEO — Score: 55/100
See `findings/technical.md`. Headline issue: two sitemap systems, the worse one wins in production; a minor insecure redirect hop on the apex domain. robots.txt and HTTPS are otherwise healthy.

## On-Page SEO — Score: 40/100 (weakest category)
See `findings/on-page.md`. Headline issues: 7 demo URLs and `/layanan` have no real metadata (client-component limitation); duplicated title suffixes on 4 pages; missing H1 on 3 pages; stale English default social copy vs. the site's current Indonesian positioning.

## Schema & Structured Data — Score: 55/100
See `findings/schema.md`. Headline issue: homepage's business schema is JS-gated and invisible to non-JS crawlers (blog posts already do this correctly — same fix applies). Also: address not fully structured, Article logo is SVG.

## Performance (Core Web Vitals) — Score: 60/100
See `findings/performance.md`. Mobile Lighthouse: 71/100 performance, LCP 5.1s (poor), FCP 3.0s. CLS is perfect (0). No CrUX field data yet (traffic volume too low for Chrome UX Report eligibility).

## AI Search Readiness (GEO) — Score: 50/100
Biggest gap is the same JS-gated schema issue above — the single fix (beforeInteractive) improves both Schema and GEO scores. No `llms.txt` (low priority, optional).

## Content Quality — Score: 68/100
See `findings/content-and-images.md`. Business/legal info is solid and consistent; blog has healthy cadence and relevant topics. `/education` and `/contact` are thin (~130 words); default copy in a few places doesn't match the site's current Indonesian-first positioning.

## Images — Score: 80/100
All homepage images have alt text; OG image resolves correctly. Interior-page images (demo pages, blog bodies) weren't individually audited in this pass.

---

## Methodology Note
This audit was performed directly (page fetches, a headless-Chromium render for JS-dependent schema verification, PageSpeed Insights/Lighthouse, and direct inspection of the site's own source code to confirm root causes) rather than via the full 15-subagent delegation, since nehandev.com is a small (~15-page) single-site property where a full parallel-crawl fleet would mostly duplicate this same direct inspection. Every finding above was verified against either a live HTTP response or the actual source file/line responsible — file:line references are in each findings doc for anyone implementing the fixes.

Full findings detail: `findings/technical.md`, `findings/on-page.md`, `findings/schema.md`, `findings/performance.md`, `findings/content-and-images.md`.
Prioritized fix list: `ACTION-PLAN.md`.
