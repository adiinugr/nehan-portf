# Schema / Structured Data Findings — nehandev.com

## RESOLVED (2026-08-29): Homepage's business schema (ProfessionalService) was invisible to non-JS crawlers

`app/layout.tsx:154` injected the site's main JSON-LD block via `<Script id="schema-structured-data" strategy="afterInteractive">`. Verified live: the raw HTML response (`curl`) contained **no** literal `<script type="application/ld+json">` tag; it only appeared after full JS execution.

This mattered because many crawlers relevant to "AI search readiness" (GPTBot, ClaudeBot, PerplexityBot, and most non-Google SEO/social tools) **do not execute JavaScript**.

**Correction to the original diagnosis:** the fix is not simply switching to `strategy="beforeInteractive"`. Testing showed `next/script`'s `<Script>` component renders via a JS bootstrap array (`self.__next_s.push(...)`) **regardless of strategy** — `beforeInteractive` included — never as a literal `<script type="application/ld+json">` tag. This was also true of `app/blog/[slug]/page.tsx`'s Article schema, which this doc originally (incorrectly) cited as "already correct" — it had the identical latent issue.

**Actual fix applied:** replaced `next/script`'s `<Script>` with a plain native `<script type="application/ld+json" dangerouslySetInnerHTML={...} />` in both `app/layout.tsx` and `app/blog/[slug]/page.tsx`. Verified: both now render as literal, parseable JSON-LD in the raw (no-JS) server response.

## RESOLVED (2026-08-29, commit `d0c1348`): `PostalAddress` was not fully structured

The `address` object previously put the entire address — including city, region, and postal code — into a single `streetAddress` string, with only `addressCountry` broken out. Split into `streetAddress`/`addressLocality`/`addressRegion`/`postalCode` (new `BUSINESS_STREET_ADDRESS`/`BUSINESS_CITY`/`BUSINESS_REGION`/`BUSINESS_POSTAL_CODE` in `lib/business-info.ts`), matching Google's structured data guidance for Local Business eligibility.

## RESOLVED (2026-08-29, commit `d0c1348`): Article schema `publisher.logo` used an SVG

Swapped `publisher.logo.url` from `favicon.svg` to the existing `web-app-manifest-512x512.png` — same asset already used for the homepage ProfessionalService schema's logo.

## Info: Blog posts share one generic `image`
Every blog post's Article schema uses the same sitewide `og-image-nehan.png` rather than a post-specific image, reducing distinctiveness for rich results/Discover.
