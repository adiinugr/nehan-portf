import type { Metadata } from "next"
import { Oswald, Manrope } from "next/font/google"

export const metadata: Metadata = {
  title: "Demo Website Rental Kendaraan — FastRide Rental",
  description:
    "Contoh website rental mobil/motor dari NehanDev: katalog armada, tarif sewa, cek ketersediaan, dan pemesanan mudah.",
  alternates: { canonical: "https://www.nehandev.com/demo/rental" },
  openGraph: {
    title: "Demo Website Rental Kendaraan — FastRide Rental | NehanDev",
    description: "Contoh website rental mobil/motor: katalog armada, tarif sewa, cek ketersediaan, dan pemesanan mudah.",
    url: "https://www.nehandev.com/demo/rental"
  }
}

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
})

export default function RentalDemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${oswald.variable} ${manrope.variable}`}>{children}</div>
  )
}
