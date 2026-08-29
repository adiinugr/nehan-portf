# Content Quality & Images Findings — nehandev.com

## Content

**What works:**
- Legal business name, address, phone, and email are all present and consistent (`lib/business-info.ts` centralizes these — good practice, recently added per commit history).
- 7 blog posts covering relevant local-business topics (hotel, travel, restaurant, tech tutorials) in a healthy Indonesian/English mix, with reasonable read-time metadata.
- Sitewide bilingual (EN/ID) support via `useLanguage()`.

**Medium: Thin content on a couple of standalone pages.** `/education` and `/contact` render roughly 130 words of visible body copy each (excluding shared nav/footer) — on the lighter side for standalone indexed pages. `/education` in particular showcases a real product (CBT Pro) and could support more depth (feature detail, screenshots with descriptive copy, a case-study angle) rather than reusing the compact homepage teaser section as the entire page.

**Medium: Inconsistent brand voice/positioning across surfaces** (also flagged under On-Page): homepage copy has pivoted to Indonesian, UMKM-focused messaging, but default OG/Twitter/JSON-LD copy sitewide still reads the older English "Professional Web Development Solutions" pitch. This is a content-consistency issue as much as a technical one — anyone encountering the brand via a shared link, schema-driven snippet, or social card gets a different pitch than the one on the page itself.

## Images

- All 12 `<img>` elements on the homepage have non-empty `alt` attributes — good.
- OG social preview image (`/og-image-nehan.png`) resolves correctly (200, PNG, 128KB).
- Not independently verified: image formats/compression on interior pages (`/demo/*`, blog post bodies) — spot-check recommended, though `next/image` is used per repo conventions and should auto-serve modern formats (WebP/AVIF) where applicable.
