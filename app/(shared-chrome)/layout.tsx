import { NextIntlClientProvider } from "next-intl"
import defaultMessages from "@/messages/id.json"

// /blog, /blog/[slug], /privacy-policy, /terms render the shared
// Header/Footer, which now read translations via next-intl — but these
// pages are single-language (Indonesian) and not part of the bilingual
// [locale] routing, so they get a fixed "id" provider here rather than
// inheriting one from the true root layout. Scoping it to this route
// group (not the root layout) keeps /demo/* — which renders its own
// separate header/footer and never touches next-intl — unaffected and
// still statically rendered.
export default function SharedChromeLayout({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider locale="id" messages={defaultMessages}>
      {children}
    </NextIntlClientProvider>
  )
}
