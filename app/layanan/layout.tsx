import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Layanan",
  description:
    "Jasa pembuatan website untuk restoran, travel, hotel, penginapan, barbershop, dan rental kendaraan. Desain custom, mobile responsive, SEO dasar, dan integrasi WhatsApp.",
  alternates: { canonical: "https://www.nehandev.com/layanan" },
  openGraph: {
    title: "Layanan | NehanDev",
    description:
      "Jasa pembuatan website untuk bisnis lokal Indonesia: restoran, travel, hotel, barbershop, dan rental kendaraan.",
    url: "https://www.nehandev.com/layanan"
  }
}

export default function LayananLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
