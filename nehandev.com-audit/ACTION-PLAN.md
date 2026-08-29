# Action Plan — nehandev.com SEO Fixes

## Phase 1: Critical Fixes (Week 1)

- [ ] **Give `/demo/travel`, `/demo/hotel`, `/demo/barbershop`, `/demo/rental` (+ `/demo/travel/destinasi`, `/paket`, `/kontak`) real metadata.** Each `app/demo/*/page.tsx` is `"use client"` and cannot export `metadata`. Split into: a server `page.tsx` that exports `metadata` (unique title, description, `alternates: { canonical: "https://www.nehandev.com/demo/..." }`) and renders a new client child component holding the current interactive UI.
- [ ] **Do the same for `app/layanan/page.tsx`** — currently zero page-specific metadata; canonical currently resolves to the homepage instead of `/layanan`.
- [ ] **Remove `next-sitemap`**: delete `next-sitemap.config.js`, remove its `postbuild` script from `package.json`, stop tracking `public/sitemap.xml`, `public/sitemap-0.xml`, `public/robots.txt` (add to `.gitignore` or just delete since `app/sitemap.ts` already handles the sitemap correctly). Add `app/robots.ts` so robots.txt is generated the same native way.

## Phase 2: High-Impact Improvements (Weeks 2-3)

- [ ] Remove the trailing `"| NehanDev"` from `metadata.title` in `app/projects/page.tsx`, `app/education/page.tsx`, `app/contact/page.tsx`, `app/blog/page.tsx` (root layout's `template: "%s | NehanDev"` already appends it).
- [ ] Change `app/layout.tsx`'s JSON-LD `<Script strategy="afterInteractive">` to `strategy="beforeInteractive"` with `dangerouslySetInnerHTML` (mirror the working pattern in `app/blog/[slug]/page.tsx:93-98`).
- [ ] Add a page-level `<h1>` to `/projects`, `/education`, `/contact` (currently 0 each).
- [ ] Fix the apex redirect: `https://nehandev.com` should redirect straight to `https://www.nehandev.com` in one hop, not via `http://www.nehandev.com`.
- [ ] Investigate mobile LCP (5.1s, "poor"): identify the LCP element, confirm image `priority`/font preload on it, audit for unused JS (Framer Motion usage is a likely first place to check).

## Phase 3: Content & Authority (Month 2)

- [ ] Update `app/layout.tsx`'s default `openGraph`/`twitter` title+description and the JSON-LD `description` to match the site's current Indonesian-first "Solusi Digital untuk Usaha Lokal" positioning (currently stale English copy).
- [ ] Expand `/education` page content (currently ~130 words) — more product depth on CBT Pro, screenshots with descriptive copy, a mini case study.
- [ ] Split the JSON-LD `PostalAddress` into `addressLocality`/`addressRegion`/`postalCode` instead of one `streetAddress` string.
- [ ] Swap Article schema's `publisher.logo.url` from `favicon.svg` to `favicons/web-app-manifest-512x512.png`.
- [ ] Fix the one flagged color-contrast accessibility issue (Lighthouse Accessibility audit).

## Phase 4: Monitoring & Iteration (Ongoing)

- [ ] Re-run PageSpeed Insights after the LCP work to confirm improvement.
- [ ] After the metadata fixes ship, check Google Search Console for `/demo/*` and `/layanan` indexation status (these have likely been suppressed as duplicates and may need a manual "request indexing" nudge once fixed).
- [ ] Consider adding `llms.txt` once the above is live (low priority, optional convention for AI answer engines).
