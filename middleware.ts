import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

// See i18n/routing.ts for why localeDetection is disabled.
export default createMiddleware(routing)

// Only the 5 bilingual pages (and their /en/... counterparts) go through
// locale negotiation. Everything else (/blog, /demo/*, /privacy-policy,
// /terms, /api/*, static assets) must bypass this middleware entirely —
// they stay single-language, untouched.
export const config = {
  matcher: [
    "/",
    "/en",
    "/layanan",
    "/en/layanan",
    "/projects",
    "/en/projects",
    "/education",
    "/en/education",
    "/contact",
    "/en/contact"
  ]
}
