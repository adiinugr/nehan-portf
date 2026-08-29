import type { Metadata } from "next"
import { Playfair_Display, DM_Sans } from "next/font/google"

export const metadata: Metadata = {
  title: "Demo Website Travel & Wisata — Jelajah Nusantara",
  description:
    "Contoh website agen travel dari NehanDev: katalog destinasi, paket wisata, testimoni pelanggan, dan booking via WhatsApp.",
  alternates: { canonical: "https://www.nehandev.com/demo/travel" },
  openGraph: {
    title: "Demo Website Travel & Wisata — Jelajah Nusantara | NehanDev",
    description: "Contoh website agen travel: katalog destinasi, paket wisata, testimoni pelanggan, dan booking via WhatsApp.",
    url: "https://www.nehandev.com/demo/travel"
  }
}

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
})

export default function TravelDemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${playfair.variable} ${dmSans.variable}`} style={{ fontFamily: "var(--font-dm-sans, sans-serif)" }}>
      {children}
    </div>
  )
}
