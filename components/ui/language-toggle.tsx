"use client"

import { useLocale } from "next-intl"
import { Link, usePathname } from "@/i18n/navigation"

// Only these 5 pages have a real translated counterpart in the other
// language. Everywhere else (/blog, /demo/*, /privacy-policy, /terms),
// there is no per-page equivalent, so the toggle falls back to that
// locale's homepage instead of trying to translate the current page.
const BILINGUAL_PATHS = new Set(["/", "/layanan", "/projects", "/education", "/contact"])

export function LanguageToggle() {
  const locale = useLocale()
  const pathname = usePathname()
  const targetPath = BILINGUAL_PATHS.has(pathname) ? pathname : "/"

  return (
    <div className="flex items-center gap-0.5 text-sm font-medium">
      <Link
        href={targetPath}
        locale="en"
        className={`px-2 py-1 rounded transition-colors ${
          locale === "en"
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        EN
      </Link>
      <span className="text-border">|</span>
      <Link
        href={targetPath}
        locale="id"
        className={`px-2 py-1 rounded transition-colors ${
          locale === "id"
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        ID
      </Link>
    </div>
  )
}
