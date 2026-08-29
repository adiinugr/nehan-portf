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

## High: LCP is more than double the "good" threshold
5.1s firmly places the homepage in Google's "poor" bucket for the ranking-relevant Core Web Vitals metric. Lighthouse's opportunities point at:
- Render-blocking requests (~150ms potential savings)
- Unused JavaScript (~450ms / 69 KiB potential savings)
- Legacy JavaScript polyfills (~11 KiB)

**Recommendation:** identify the LCP element (likely the hero image/heading) and confirm it's prioritized (`priority` on the `next/image`, preloaded font, no render-blocking script ahead of it in `<head>`); audit bundle for unused JS (candidate: Framer Motion is used for every section's animations — verify it's not fully loaded on first paint).

## Low: Insufficient color contrast
One accessibility audit failed: background/foreground contrast ratio below WCAG threshold somewhere on the homepage. Worth a quick pass with Lighthouse's element callouts since it affects both accessibility and (indirectly) engagement/SEO signals.
