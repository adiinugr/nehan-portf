# Content Quality & Images Findings — nehandev.com

## Content

**What works:**
- Legal business name, address, phone, and email are all present and consistent (`lib/business-info.ts` centralizes these — good practice, recently added per commit history).
- 7 blog posts covering relevant local-business topics (hotel, travel, restaurant, tech tutorials) in a healthy Indonesian/English mix, with reasonable read-time metadata.
- Sitewide bilingual (EN/ID) support, now via real per-locale URLs (next-intl) rather than a client-side toggle — see `international-seo.md`.

**RESOLVED (2026-08-29, commit `ee2dcba`): Thin content on `/education`.** Was ~130 words; added a new detail section (4-step exam workflow, a live-dashboard mockup, an Indonesia-specific trust section, closing CTA) taking it to ~380 words per locale. `/contact` was left as-is — a contact page doesn't need the same depth.

**RESOLVED (2026-08-29, commit `d0c1348`): Inconsistent brand voice/positioning across surfaces** (also flagged under On-Page) — default OG/Twitter/JSON-LD copy updated to match the site's actual Indonesian-first positioning.

## Images

- All 12 `<img>` elements on the homepage have non-empty `alt` attributes — good.
- OG social preview image (`/og-image-nehan.png`) resolves correctly (200, PNG, 128KB).
- Not independently verified: image formats/compression on interior pages (`/demo/*`, blog post bodies) — spot-check recommended, though `next/image` is used per repo conventions and should auto-serve modern formats (WebP/AVIF) where applicable.
