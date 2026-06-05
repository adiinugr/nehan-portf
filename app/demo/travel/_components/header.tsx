"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { GREEN, GOLD, SANS, SERIF, WA_GENERAL } from "./tokens"

const NAV = [
  { label: "Destinasi", href: "/demo/travel/destinasi" },
  { label: "Paket", href: "/demo/travel/paket" },
  { label: "Kontak", href: "/demo/travel/kontak" },
]

export function TravelHeader({ transparent = false }: { transparent?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(!transparent)
  const pathname = usePathname()

  useEffect(() => {
    if (!transparent) { setScrolled(true); return }
    const fn = () => setScrolled(window.scrollY > 80)
    fn()
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [transparent])

  const dark = transparent && !scrolled

  return (
    <header
      className="fixed top-[40px] left-0 right-0 z-50 transition-all duration-300"
      style={{
        fontFamily: SANS,
        backgroundColor: dark ? "transparent" : "rgba(255,255,255,0.97)",
        boxShadow: dark ? "none" : "0 1px 24px rgba(0,0,0,0.08)",
        backdropFilter: dark ? "none" : "blur(16px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex h-16 items-center justify-between">
        <Link href="/demo/travel" className="font-bold text-2xl tracking-tight"
          style={{ fontFamily: SERIF, color: dark ? "#fff" : "#1a1a1a" }}>
          Jelajah<span style={{ color: GOLD }}>Nusantara</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {NAV.map(({ label, href }) => {
            const active = pathname === href
            return (
              <Link key={label} href={href} className="transition-colors hover:opacity-60"
                style={{ color: dark ? "rgba(255,255,255,0.9)" : active ? GREEN : "#374151", fontWeight: active ? 700 : 500 }}>
                {label}
              </Link>
            )
          })}
        </nav>

        <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ backgroundColor: GREEN }}>
          Booking Sekarang
        </a>

        <button className="md:hidden p-1" onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: dark ? "#fff" : "#1a1a1a" }}>
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white px-6 py-4 flex flex-col gap-4 shadow-lg">
          {NAV.map(({ label, href }) => (
            <Link key={label} href={href} className="text-sm font-medium text-gray-700"
              onClick={() => setMenuOpen(false)}>{label}</Link>
          ))}
          <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer"
            className="py-2.5 rounded-full text-sm font-bold text-white text-center"
            style={{ backgroundColor: GREEN }}>
            Booking Sekarang
          </a>
        </div>
      )}
    </header>
  )
}
