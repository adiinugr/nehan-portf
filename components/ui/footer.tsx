"use client"

import Link from "next/link"
import { Github, Linkedin, Instagram, Youtube } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export function Footer() {
  const { t } = useLanguage()
  const ft = t.footer

  const linkClass = "text-base transition-colors hover:text-[#818cf8]"
  const labelClass = "text-sm font-semibold uppercase tracking-wider mb-1"

  return (
    <footer className="py-12" style={{ backgroundColor: "#0b0d17" }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-2 max-w-xs">
            <Link href="/" className="text-2xl" style={{ fontFamily: "var(--font-yellowtail)" }}>
              <span style={{ color: "#818cf8" }}>Nehan</span>
              <span style={{ color: "#f1f5f9" }}>Dev</span>
            </Link>
            <p className="text-base leading-relaxed" style={{ color: "#94a3b8" }}>
              {ft.tagline}
            </p>
          </div>

          {/* Nav links — 2 columns */}
          <div className="flex gap-16">
            <nav className="flex flex-col gap-3">
              <p className={labelClass} style={{ color: "#94a3b8" }}>Halaman</p>
              <Link href="/layanan" className={linkClass} style={{ color: "#94a3b8" }}>{ft.links.services}</Link>
              <Link href="/projects" className={linkClass} style={{ color: "#94a3b8" }}>{ft.links.portfolio}</Link>
              <Link href="/blog" className={linkClass} style={{ color: "#94a3b8" }}>{ft.links.blog}</Link>
              <Link href="/contact" className={linkClass} style={{ color: "#94a3b8" }}>{ft.links.contact}</Link>
            </nav>
            <nav className="flex flex-col gap-3">
              <p className={labelClass} style={{ color: "#94a3b8" }}>Legal</p>
              <Link href="/privacy-policy" className={linkClass} style={{ color: "#94a3b8" }}>{ft.links.privacy}</Link>
              <Link href="/terms" className={linkClass} style={{ color: "#94a3b8" }}>{ft.links.terms}</Link>
            </nav>
          </div>

          {/* Social icons */}
          <div className="flex flex-col gap-3">
            <p className={labelClass} style={{ color: "#94a3b8" }}>Ikuti Kami</p>
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
            © {new Date().getFullYear()} NehanDev. {ft.copyright}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className={linkClass} style={{ color: "#64748b" }}>{ft.links.privacy}</Link>
            <Link href="/terms" className={linkClass} style={{ color: "#64748b" }}>{ft.links.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
