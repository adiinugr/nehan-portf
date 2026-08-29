# Schema / Structured Data Findings — nehandev.com

## High: Homepage's business schema (ProfessionalService) is invisible to non-JS crawlers

`app/layout.tsx:154` injects the site's main JSON-LD block via `<Script id="schema-structured-data" strategy="afterInteractive">`. `afterInteractive` scripts run only after the page hydrates client-side — verified live: the raw HTML response (`curl`) contains **no** `<script type="application/ld+json">` tag at all; it only appears after full JS execution (confirmed with a headless-Chromium render, where the block correctly resolves with valid `ProfessionalService`/`Offer`/`PostalAddress` data).

This matters because many crawlers relevant to "AI search readiness" (GPTBot, ClaudeBot, PerplexityBot, and most non-Google SEO/social tools) **do not execute JavaScript** and will never see this schema — the site's core business identity (name, address, services, contact) is effectively absent from GEO/AI-crawler visibility, even though Googlebot (which does render JS) picks it up fine.

Contrast with `app/blog/[slug]/page.tsx:93-98`, which does this correctly: `strategy="beforeInteractive"` + `dangerouslySetInnerHTML`, confirmed present in the raw (non-JS) HTML response. The fix is to apply the same pattern to the homepage schema — or better, drop `next/script` entirely for JSON-LD and render a plain `<script type="application/ld+json" dangerouslySetInnerHTML={...}>` directly in the server component.

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
