# Performance Findings — nehandev.com (mobile, PageSpeed Insights / Lighthouse)

| Metric | Value | Status |
|---|---|---|
| Performance score | 71/100 | Needs improvement |
| Accessibility | 96/100 | Good |
| Best Practices | 96/100 | Good |
| SEO (Lighthouse) | 100/100 | Good |
| First Contentful Paint | 3.0 s | Needs improvement |
| **Largest Contentful Paint** | **5.1 s** | **Poor** (good is ≤2.5s) |
| Total Blocking Time | 90 ms | Good |
| Cumulative Layout Shift | 0 | Good |
| Speed Index | 5.5 s | Needs improvement |

No CrUX (real-user) field data is available yet — insufficient Chrome traffic volume for this origin — so the above is lab data only.

## PARTIALLY ADDRESSED (2026-08-29, commit `3bd6042`): LCP was more than double the "good" threshold
5.1s firmly placed the homepage in Google's "poor" bucket for the ranking-relevant Core Web Vitals metric. Lighthouse's opportunities pointed at:
- Render-blocking requests (~150ms potential savings)
- Unused JavaScript (~450ms / 69 KiB potential savings)
- Legacy JavaScript polyfills (~11 KiB)

**Root cause found:** the homepage has no hero image — the LCP candidate is the hero's headline text (`components/ui/animated-hero.tsx`), which was wrapped in Framer Motion with `initial={{ opacity: 0 }}`. The browser can't count text as "painted" for LCP purposes while it's at `opacity: 0`, so the largest above-the-fold content was effectively invisible until JS hydrated and the fade-in animation completed.

**Fix applied:** removed the opacity fade on the hero's badge/headline/subtitle+CTA wrappers, keeping the slide-up (`y`-transform) motion. **Not yet re-measured against production** — this needs a fresh PageSpeed Insights run after deploy to confirm the actual LCP improvement.

**Still open:** no deep JS bundle audit was done (unused JS / legacy polyfills / render-blocking requests remain as Lighthouse flagged them). Worth revisiting once the hero fix's real-world impact is measured.

## Low: Insufficient color contrast
One accessibility audit failed: background/foreground contrast ratio below WCAG threshold somewhere on the homepage. Worth a quick pass with Lighthouse's element callouts since it affects both accessibility and (indirectly) engagement/SEO signals.
