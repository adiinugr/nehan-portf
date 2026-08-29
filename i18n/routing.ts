import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["id", "en"],
  defaultLocale: "id",
  localePrefix: "as-needed",
  // Unprefixed URLs (/, /layanan, /projects, /education, /contact) must
  // always serve Indonesian, regardless of the visitor's Accept-Language
  // header. Without this, next-intl's default behavior 307-redirects an
  // unprefixed URL to /en/... whenever a browser reports an English
  // preference and has no locale cookie yet -- which breaks the point of
  // keeping these URLs stable/unprefixed, and Google explicitly advises
  // against redirecting based on perceived user language (it can make
  // Googlebot see inconsistent content at the same URL over time).
  // English is only reachable by explicitly navigating to /en/... (the
  // language toggle) or typing it directly.
  localeDetection: false
})
