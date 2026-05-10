"use client"

import Link from "next/link"
import { Github, Linkedin, Instagram, Youtube } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export function Footer() {
  const { t } = useLanguage()
  const ft = t.footer

  return (
    <footer className="border-t border-border/40 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <Link href="/" className="font-bold text-lg tracking-tight">
              <span className="text-primary">Nehan</span>
              <span className="text-foreground">Dev</span>
            </Link>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} NehanDev. {ft.copyright} {ft.tagline}
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-5 text-sm text-muted-foreground">
            <Link href="/blog" className="hover:text-primary transition-colors">
              {ft.links.blog}
            </Link>
            <Link href="/projects" className="hover:text-primary transition-colors">
              {ft.links.projects}
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              {ft.links.contact}
            </Link>
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {[
              { href: "https://github.com/adiinugr", icon: Github, label: "GitHub" },
              { href: "https://linkedin.com/in/adiinugr", icon: Linkedin, label: "LinkedIn" },
              { href: "https://instagram.com/nehandev", icon: Instagram, label: "Instagram" },
              { href: "https://youtube.com/@nehandev", icon: Youtube, label: "YouTube" }
            ].map(({ href, icon: Icon, label }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
