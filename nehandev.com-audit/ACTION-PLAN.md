# Action Plan — nehandev.com SEO Fixes

## Phase 1: Critical Fixes (Week 1) — Done, commit `cad44e6`

- [x] **Give `/demo/travel`, `/demo/hotel`, `/demo/barbershop`, `/demo/rental` (+ `/demo/travel/destinasi`, `/paket`, `/kontak`) real metadata.** Implemented as new/updated `layout.tsx` server components alongside each existing client `page.tsx`, each exporting its own title, description, and self-referencing `alternates.canonical`.
- [x] **Do the same for `app/layanan/page.tsx`** — added `app/layanan/layout.tsx` with page-specific metadata and canonical.
- [x] **Removed `next-sitemap`**: deleted `next-sitemap.config.js`, the `postbuild` script, the dependency, and the tracked `public/sitemap.xml`/`sitemap-0.xml`/`robots.txt`. Added `app/robots.ts` (native, mirrors `app/sitemap.ts`).

## Phase 2: High-Impact Improvements (Weeks 2-3) — Mostly done, commit `3bd6042`

- [x] Removed the trailing `"| NehanDev"` from `metadata.title` in `app/projects/page.tsx`, `app/education/page.tsx`, `app/contact/page.tsx`, `app/blog/page.tsx`.
- [x] **Fixed JSON-LD crawler visibility — with a correction to the original diagnosis.** The original plan said "switch `next/script` strategy to `beforeInteractive`." That alone doesn't work: **all** `next/script` strategies (including `beforeInteractive`) render via a JS bootstrap (`self.__next_s.push(...)`), never as a literal `<script type="application/ld+json">` tag — so a non-JS-executing crawler still can't parse it, regardless of strategy. The actual fix was replacing `next/script`'s `<Script>` with a plain `<script type="application/ld+json" dangerouslySetInnerHTML={...} />`. Applied to both `app/layout.tsx` (homepage ProfessionalService schema) and `app/blog/[slug]/page.tsx` (Article schema, which had the same latent issue despite being cited as "already correct" in the original audit). Verified both now appear as literal, parseable JSON-LD in raw (no-JS) HTML.
- [x] Added a page-level `<h1>` (visually hidden, `sr-only`) to `/projects`, `/education`, `/contact`.
- [x] Investigated mobile LCP: root cause found in `components/ui/animated-hero.tsx` — the hero badge/headline/subtitle+CTA all faded in from Framer Motion `initial={{ opacity: 0 }}`, so the browser couldn't count this above-the-fold text as painted until JS hydrated and the animation finished. Removed the opacity fade (kept the slide-up `y`-transform) after confirming with the user, since it's a visible (if subtle) design change. **Not yet re-measured against production** — PageSpeed Insights only reflects the deployed site, so confirm the LCP improvement after this deploys (see Phase 4).
- [ ] **Not done — infrastructure-level, outside this repo:** the apex redirect (`https://nehandev.com` → `http://www.nehandev.com` → `https://www.nehandev.com`) is configured wherever DNS/nginx routing lives for this domain, not in the Next.js app. Needs a change on the host/reverse-proxy, not a code change.
- [ ] **Partially done:** the hero fix removes one concrete render-blocking-on-visibility issue, but no deep JS bundle audit (tree-shaking, code-splitting opportunities) was performed. Worth a follow-up pass once the hero fix's impact on the 71/100 Lighthouse score is measured live.

## Phase 3: Content & Authority (Month 2) — Done, commits `d0c1348`, `5f35605`, `ee2dcba`

- [x] Updated `app/layout.tsx`'s default `openGraph`/`twitter` title+description and the JSON-LD `description` to match the site's current Indonesian-first "Solusi Digital untuk Usaha Lokal" positioning.
- [x] Expanded `/education` from ~130 to ~380 words per locale — added `components/ui/education-detail-section.tsx`: a real 4-step exam workflow, a live-exam-dashboard mockup (built around message keys that existed but were never wired into any component), an Indonesian-school-specific trust section, and a closing CTA. Both `messages/id.json` and `messages/en.json` updated.
- [x] Split the JSON-LD `PostalAddress` into `streetAddress`/`addressLocality`/`addressRegion`/`postalCode` (new granular env vars in `lib/business-info.ts`, with fallback defaults).
- [x] Swapped Article schema's `publisher.logo.url` from `favicon.svg` to `favicons/web-app-manifest-512x512.png`.
- [x] Fixed the flagged color-contrast failures (verified with actual WCAG contrast-ratio math, not guessed): the sitewide "eyebrow label" pattern (10 files, was 4.46:1 against white, now 6.29:1 via a scoped darker shade — brand `--primary` itself untouched), and the footer's muted-text tier (was 4.07:1 against the dark footer background, now 5.53:1).
- [x] **Bonus, found during this pass:** `/privacy-policy` and `/terms` had the same title double-suffix bug fixed elsewhere in Phase 2 but missed on these two — fixed.

## Phase 4: Monitoring & Iteration (Ongoing)

- [ ] **After this deploys**, re-run PageSpeed Insights to confirm the LCP fix actually moved the needle (was 5.1s/71 mobile).
- [ ] After deploy, check Google Search Console for `/demo/*` and `/layanan` indexation status (these have likely been suppressed as duplicates and may need a manual "request indexing" nudge now that they have real metadata).
- [ ] Consider adding `llms.txt` once the above is live (low priority, optional convention for AI answer engines).
