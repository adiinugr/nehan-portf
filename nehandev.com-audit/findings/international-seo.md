# International / Bilingual SEO Findings — nehandev.com

Not covered in the original 2026-08-29 audit; investigated 2026-08-29 in response to a direct question about the site's EN/ID bilingual SEO.

## RESOLVED (2026-08-29, commit `1a13963`): Sitewide hreflang tags were broken — all pointed to the bare homepage

`app/layout.tsx` emitted `hreflang="en"`, `"id"`, and `"x-default"` alternates on **every page**, all resolving to the same URL: `https://www.nehandev.com`. Verified live before the fix: `/projects`, `/layanan`, `/education` all emitted identical hreflang tags pointing at the homepage instead of themselves. `/layanan` and `/demo/hotel` (both metadata-less client components at the time) emitted these tags **twice** — once from the root `metadata.alternates.languages` field, once from hardcoded `<link>` tags in the same layout's JSX `<head>`.

hreflang entries that all resolve to one identical URL don't tell Google anything usable — there's no way to serve "the Indonesian version" vs "the English version" when there's only one URL. This is invalid per Google's hreflang guidance and would likely show as a warning (or be silently ignored) in Search Console's International Targeting report.

**Fix applied:** removed `alternates.languages` from the root metadata and the hardcoded JSX `<link rel="alternate">` tags entirely. Per Google's own guidance, omitting hreflang is preferable to emitting broken/uninformative hreflang. Verified 0 alternate tags remain on any page post-fix, including no more duplication on `/layanan`/`/demo/hotel`.

## RESOLVED (2026-08-29, commit `1a13963`): `<html lang="en">` didn't match the actual default rendered content

Root layout hardcoded `<html lang="en">`, but `LanguageProvider` (`lib/i18n/language-context.tsx`) defaults to `"id"` and that's what's actually server-rendered (confirmed: homepage body text is Indonesian, "Solusi Digital untuk Usaha Lokal"). The correct `lang="id"` was only ever applied client-side, post-hydration, via a `useEffect`. Search engines and screen readers reading the initial HTML saw an `en` document that was actually Indonesian text.

**Fix applied:** changed the hardcoded attribute to `<html lang="id">`, matching the actual default. The client-side `useEffect` in `LanguageProvider` still correctly updates this when a user toggles to English.

## RESOLVED (2026-08-29, commit `5a7dcf3`): English content is now indexable by search engines

**This was the core structural issue, fixed the same day after further discussion with the user.**

Implemented real, crawlable `/en/...` URLs for the 5 pages with translatable content (`/`, `/layanan`, `/projects`, `/education`, `/contact`) using `next-intl`, with Indonesian staying unprefixed (`localePrefix: "as-needed"` — no URL disruption to existing indexed Indonesian pages) and English under `/en/...`. Each page now has a `generateMetadata` producing a self-referencing canonical and a **valid** hreflang pair pointing at two real, distinct URLs (unlike the earlier sitewide-broken hreflang, which pointed everything at one URL regardless of language).

`/blog`, `/blog/[slug]`, `/demo/*`, `/privacy-policy`, `/terms` were deliberately left out of this restructuring (confirmed with the user) — they stay single-language (Indonesian) at their existing URLs. `middleware.ts`'s matcher is scoped narrowly to only the 5 in-scope paths and their `/en/...` counterparts so these routes are never touched by locale negotiation.

**`/layanan` had zero English content before this** (100% hardcoded Indonesian, not wired to the translation system). English copy for its demos/features/process sections was drafted as part of this work (`messages/en.json`, `layanan` namespace) — **this is first-pass copy and should get a human review pass before being considered final**, since it's real business marketing copy.

**Known trade-off accepted:** making `/blog`, `/privacy-policy`, `/terms` render correctly still required wrapping them (via a new `app/(shared-chrome)/` route group — a URL-invisible layout-scoping mechanism, not a URL change) in a `NextIntlClientProvider` so the shared Header/Footer could call `useTranslations()`. This causes those 3 routes (not `/blog/[slug]`, which is still statically generated) to render dynamically instead of statically — a minor performance trade-off, not a content or URL change. `/demo/*` remains fully static and unaffected (it uses its own separate header/footer, untouched).

## Info: found (not fixed) — same double-title-suffix bug exists on `/privacy-policy` and `/terms`

While regression-testing the pages above, both `/privacy-policy` and `/terms` were found to render `<title>X | NehanDev | NehanDev</title>` — the identical bug fixed on `/projects`/`/education`/`/contact`/`/blog` earlier the same day (2026-08-29, commit `3bd6042`), just never applied to these two pages. Left unfixed since it's outside this task's scope, but the fix is the same one-line pattern (drop the trailing `"| NehanDev"` from the page's `metadata.title`).
