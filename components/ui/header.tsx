"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LanguageToggle } from "@/components/ui/language-toggle"
import { useLanguage } from "@/lib/i18n/language-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()
  const pathname = usePathname()

  const navLinks = [
    { href: "/layanan", label: t.nav.services },
    { href: "/projects", label: t.nav.portfolio },
    { href: "/blog", label: t.nav.blog },
    { href: "/contact", label: t.nav.contact }
  ]

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false
    return href === "/" ? pathname === "/" : pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 h-16 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-4xl" style={{ fontFamily: "var(--font-yellowtail)" }}>
            <span className="text-primary">Nehan</span>
            <span className="text-foreground">Dev</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`relative px-3 py-1.5 text-base rounded-md transition-colors ${
                  isActive(href)
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive(href) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-md bg-primary/15 border border-primary/40"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <Button
            asChild
            size="sm"
            className="hidden md:inline-flex bg-primary hover:bg-primary/90 text-white"
          >
            <Link href="https://wa.me/62895335501192" target="_blank" rel="noopener noreferrer">{t.nav.cta}</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-16 left-0 right-0 bg-white shadow-sm md:hidden"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-1">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive(href)
                      ? "text-foreground bg-primary/15 border border-primary/40"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <Button
                asChild
                className="mt-3 bg-primary hover:bg-primary/90 text-white w-full"
              >
                <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                  {t.nav.cta}
                </Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
