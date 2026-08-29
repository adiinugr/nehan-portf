# International / Bilingual SEO Findings — nehandev.com

Not covered in the original 2026-08-29 audit; investigated 2026-08-29 in response to a direct question about the site's EN/ID bilingual SEO.

## RESOLVED (2026-08-29, commit `1a13963`): Sitewide hreflang tags were broken — all pointed to the bare homepage

`app/layout.tsx` emitted `hreflang="en"`, `"id"`, and `"x-default"` alternates on **every page**, all resolving to the same URL: `https://www.nehandev.com`. Verified live before the fix: `/projects`, `/layanan`, `/education` all emitted identical hreflang tags pointing at the homepage instead of themselves. `/layanan` and `/demo/hotel` (both metadata-less client components at the time) emitted these tags **twice** — once from the root `metadata.alternates.languages` field, once from hardcoded `<link>` tags in the same layout's JSX `<head>`.

hreflang entries that all resolve to one identical URL don't tell Google anything usable — there's no way to serve "the Indonesian version" vs "the English version" when there's only one URL. This is invalid per Google's hreflang guidance and would likely show as a warning (or be silently ignored) in Search Console's International Targeting report.

**Fix applied:** removed `alternates.languages` from the root metadata and the hardcoded JSX `<link rel="alternate">` tags entirely. Per Google's own guidance, omitting hreflang is preferable to emitting broken/uninformative hreflang. Verified 0 alternate tags remain on any page post-fix, including no more duplication on `/layanan`/`/demo/hotel`.

## RESOLVED (2026-08-29, commit `1a13963`): `<html lang="en">` didn't match the actual default rendered content

Root layout hardcoded `<html lang="en">`, but `LanguageProvider` (`lib/i18n/language-context.tsx`) defaults to `"id"` and that's what's actually server-rendered (confirmed: homepage body text is Indonesian, "Solusi Digital untuk Usaha Lokal"). The correct `lang="id"` was only ever applied client-side, post-hydration, via a `useEffect`. Search engines and screen readers reading the initial HTML saw an `en` document that was actually Indonesian text.

**Fix applied:** changed the hardcoded attribute to `<html lang="id">`, matching the actual default. The client-side `useEffect` in `LanguageProvider` still correctly updates this when a user toggles to English.

## Open / not fixed: English content is not indexable by search engines at all

**This is the core structural issue and was explicitly left unaddressed per user decision (quick, low-risk fixes only for now).**

The EN/ID toggle (`useLanguage()`) is entirely client-side — React state seeded from `localStorage`, with no distinct URL per language (no `/en/` path prefix, no query param, no subdomain, no `Accept-Language`-based content negotiation). Since every page has exactly one URL, and the default language state is `"id"`, **Google and every other crawler can only ever discover and index the Indonesian version of every page.** The English strings in `lib/i18n/translations.ts` currently provide zero organic-search value — they're only reachable by a visitor who has already landed on the site and manually clicks the language toggle.

Blog posts (`content/blog/*.mdx`) don't have this problem — each post is its own URL with a fixed `lang` (from frontmatter), not toggled — that part of the site's i18n is implemented correctly.

**If English-language search visibility matters** (e.g. targeting clients outside Indonesia, or Indonesian users searching in English), the real fix requires a genuine per-locale URL structure — e.g. Next.js's built-in i18n routing, or a library like `next-intl`, giving each language its own crawlable path (`/en/...` vs default) with real hreflang tags pointing between them. This is a meaningfully larger change (touches routing across every page) and should be scoped as its own project, not folded into the SEO audit's quick-fix passes.
