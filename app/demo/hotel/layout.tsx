import type { Metadata } from "next"
import { Cormorant_Garamond, Jost } from "next/font/google"

export const metadata: Metadata = {
  title: "Demo Website Hotel & Penginapan — Villa Sejuk Puncak",
  description:
    "Contoh website hotel premium dari NehanDev: showcase kamar, galeri properti, harga transparan, dan reservasi langsung.",
  alternates: { canonical: "https://www.nehandev.com/demo/hotel" },
  openGraph: {
    title: "Demo Website Hotel & Penginapan — Villa Sejuk Puncak | NehanDev",
    description: "Contoh website hotel premium: showcase kamar, galeri properti, harga transparan, dan reservasi langsung.",
    url: "https://www.nehandev.com/demo/hotel"
  }
}

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
})

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
})

export default function HotelDemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${cormorant.variable} ${jost.variable}`}>{children}</div>
  )
}
