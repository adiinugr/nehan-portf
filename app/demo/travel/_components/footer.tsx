import Link from "next/link"
import { Phone, Mail } from "lucide-react"
import { destinations } from "../data"
import { GREEN, GOLD, SANS, SERIF } from "./tokens"

function IgIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function TravelFooter() {
  return (
    <footer className="py-14 px-6" style={{ backgroundColor: "#111", fontFamily: SANS }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
          <div className="max-w-xs">
            <p className="text-xl font-bold mb-3" style={{ fontFamily: SERIF, color: "#f5f5f0" }}>
              Jelajah<span style={{ color: GOLD }}>Nusantara</span>
            </p>
            <p className="text-sm leading-relaxed text-gray-400">
              Agen perjalanan wisata domestik terpercaya. Kami membawa Anda menikmati keajaiban Indonesia.
            </p>
          </div>
          <div className="flex gap-14 flex-wrap">
            <div>
              <p className="text-sm font-bold text-white mb-4">Destinasi</p>
              {destinations.slice(0, 5).map((d) => (
                <Link key={d.name} href={`/demo/travel/paket?dest=${encodeURIComponent(d.name)}`}
                  className="block text-sm text-gray-400 mb-2 hover:text-gray-200 transition-colors">
                  {d.name}
                </Link>
              ))}
            </div>
            <div>
              <p className="text-sm font-bold text-white mb-4">Navigasi</p>
              {[
                { label: "Beranda", href: "/demo/travel" },
                { label: "Semua Destinasi", href: "/demo/travel/destinasi" },
                { label: "Semua Paket", href: "/demo/travel/paket" },
                { label: "Kontak", href: "/demo/travel/kontak" },
              ].map(({ label, href }) => (
                <Link key={label} href={href}
                  className="block text-sm text-gray-400 mb-2 hover:text-gray-200 transition-colors">
                  {label}
                </Link>
              ))}
            </div>
            <div>
              <p className="text-sm font-bold text-white mb-4">Kontak</p>
              <p className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <Phone className="w-3.5 h-3.5" />+62 895-335-501192
              </p>
              <p className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <Mail className="w-3.5 h-3.5" />info@jelajahnusantara.id
              </p>
              <p className="flex items-center gap-2 text-sm text-gray-400">
                <IgIcon className="w-3.5 h-3.5" />@jelajahnusantara
              </p>
            </div>
          </div>
        </div>
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <p>© 2025 Jelajah Nusantara. Hak cipta dilindungi.</p>
          <p>Website oleh{" "}
            <a href="https://nehandev.com" className="font-bold hover:text-white transition-colors"
              style={{ color: "#818cf8" }}>NehanDev</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
