# Schema / Structured Data Findings — nehandev.com

## RESOLVED (2026-08-29): Homepage's business schema (ProfessionalService) was invisible to non-JS crawlers

`app/layout.tsx:154` injected the site's main JSON-LD block via `<Script id="schema-structured-data" strategy="afterInteractive">`. Verified live: the raw HTML response (`curl`) contained **no** literal `<script type="application/ld+json">` tag; it only appeared after full JS execution.

This mattered because many crawlers relevant to "AI search readiness" (GPTBot, ClaudeBot, PerplexityBot, and most non-Google SEO/social tools) **do not execute JavaScript**.

**Correction to the original diagnosis:** the fix is not simply switching to `strategy="beforeInteractive"`. Testing showed `next/script`'s `<Script>` component renders via a JS bootstrap array (`self.__next_s.push(...)`) **regardless of strategy** — `beforeInteractive` included — never as a literal `<script type="application/ld+json">` tag. This was also true of `app/blog/[slug]/page.tsx`'s Article schema, which this doc originally (incorrectly) cited as "already correct" — it had the identical latent issue.

**Actual fix applied:** replaced `next/script`'s `<Script>` with a plain native `<script type="application/ld+json" dangerouslySetInnerHTML={...} />` in both `app/layout.tsx` and `app/blog/[slug]/page.tsx`. Verified: both now render as literal, parseable JSON-LD in the raw (no-JS) server response.

## Medium: `PostalAddress` is not fully structured

The `address` object (`app/layout.tsx:165`) puts the entire address — including city, region, and postal code — into a single `streetAddress` string, with only `addressCountry` broken out:
```json
"address": { "@type": "PostalAddress", "streetAddress": "Alexandria Hills, Blok AH5-08, Damarsi, Buduran, Sidoarjo 61252, Jawa Timur", "addressCountry": "ID" }
```
Google's structured data guidelines expect `addressLocality`, `addressRegion`, and `postalCode` as separate properties for full Local Business eligibility.

## Low: Article schema `publisher.logo` uses an SVG

`app/blog/[slug]/page.tsx:81` sets `publisher.logo.url` to `favicon.svg`. Google's Article rich-result guidelines call for a raster image (PNG/JPG, ideally ≥112×112px) for `logo` — SVG is not guaranteed to validate. A PNG favicon already exists in the project (`favicons/web-app-manifest-512x512.png`, used elsewhere) and should be reused here.

## Info: Blog posts share one generic `image`
Every blog post's Article schema uses the same sitewide `og-image-nehan.png` rather than a post-specific image, reducing distinctiveness for rich results/Discover.
