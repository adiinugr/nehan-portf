"use client"

import Link from "next/link"
import { Link as LocaleLink } from "@/i18n/navigation"
import { Github, Linkedin, Instagram, Youtube } from "lucide-react"
import { useTranslations } from "next-intl"
import {
  BUSINESS_NAME,
  BUSINESS_ADDRESS,
  BUSINESS_EMAIL,
  BUSINESS_PHONE,
  BUSINESS_WHATSAPP_URL
} from "@/lib/business-info"

export function Footer() {
  const t = useTranslations("footer")

  const linkClass = "text-base transition-colors hover:text-[#818cf8]"
  const labelClass = "text-sm font-semibold uppercase tracking-wider mb-1"

  return (
    <footer className="py-12" style={{ backgroundColor: "#0b0d17" }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-2 max-w-xs">
            <LocaleLink href="/" className="text-2xl" style={{ fontFamily: "var(--font-yellowtail)" }}>
              <span style={{ color: "#818cf8" }}>Nehan</span>
              <span style={{ color: "#f1f5f9" }}>Dev</span>
            </LocaleLink>
            <p className="text-base leading-relaxed" style={{ color: "#94a3b8" }}>
              {t("tagline")}
            </p>
            <div className="mt-3 flex flex-col gap-1 text-sm" style={{ color: "#64748b" }}>
              <p className="font-medium" style={{ color: "#94a3b8" }}>{BUSINESS_NAME}</p>
              <p>{BUSINESS_ADDRESS}</p>
              <a href={`mailto:${BUSINESS_EMAIL}`} className="w-fit transition-colors hover:text-[#818cf8]">
                {BUSINESS_EMAIL}
              </a>
              <a
                href={BUSINESS_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit transition-colors hover:text-[#818cf8]"
              >
                {BUSINESS_PHONE}
              </a>
            </div>
          </div>

          {/* Nav links — 2 columns */}
          <div className="flex gap-16">
            <nav className="flex flex-col gap-3">
              <p className={labelClass} style={{ color: "#94a3b8" }}>{t("sections.pages")}</p>
              <LocaleLink href="/layanan" className={linkClass} style={{ color: "#94a3b8" }}>{t("links.services")}</LocaleLink>
              <LocaleLink href="/projects" className={linkClass} style={{ color: "#94a3b8" }}>{t("links.portfolio")}</LocaleLink>
              <Link href="/blog" className={linkClass} style={{ color: "#94a3b8" }}>{t("links.blog")}</Link>
              <LocaleLink href="/contact" className={linkClass} style={{ color: "#94a3b8" }}>{t("links.contact")}</LocaleLink>
            </nav>
            <nav className="flex flex-col gap-3">
              <p className={labelClass} style={{ color: "#94a3b8" }}>{t("sections.legal")}</p>
              <Link href="/privacy-policy" className={linkClass} style={{ color: "#94a3b8" }}>{t("links.privacy")}</Link>
              <Link href="/terms" className={linkClass} style={{ color: "#94a3b8" }}>{t("links.terms")}</Link>
            </nav>
          </div>

          {/* Social icons */}
          <div className="flex flex-col gap-3">
            <p className={labelClass} style={{ color: "#94a3b8" }}>{t("sections.follow")}</p>
            <div className="flex items-center gap-4">
              {[
                { href: "https://github.com/adiinugr", icon: Github, label: "GitHub" },
                { href: "https://linkedin.com/in/adiinugr", icon: Linkedin, label: "LinkedIn" },
                { href: "https://instagram.com/nehandev", icon: Instagram, label: "Instagram" },
                { href: "https://youtube.com/@ngodingnekat", icon: Youtube, label: "YouTube" }
              ].map(({ href, icon: Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="transition-colors hover:text-[#818cf8]"
                  style={{ color: "#64748b" }}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-base" style={{ color: "#64748b" }}>
            © {new Date().getFullYear()} {BUSINESS_NAME}. {t("copyright")}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className={linkClass} style={{ color: "#64748b" }}>{t("links.privacy")}</Link>
            <Link href="/terms" className={linkClass} style={{ color: "#64748b" }}>{t("links.terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
