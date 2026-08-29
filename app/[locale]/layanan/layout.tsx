import type { Metadata } from "next"
import { getPathname } from "@/i18n/navigation"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nehandev.com"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const url = `${siteUrl}${getPathname({ locale, href: "/layanan" })}`

  const title = locale === "en" ? "Services" : "Layanan"
  const description =
    locale === "en"
      ? "Website services for restaurants, travel agencies, hotels, barbershops, and vehicle rentals. Custom design, mobile responsive, basic SEO, and WhatsApp integration."
      : "Jasa pembuatan website untuk restoran, travel, hotel, penginapan, barbershop, dan rental kendaraan. Desain custom, mobile responsive, SEO dasar, dan integrasi WhatsApp."

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        id: `${siteUrl}${getPathname({ locale: "id", href: "/layanan" })}`,
        en: `${siteUrl}${getPathname({ locale: "en", href: "/layanan" })}`,
        "x-default": `${siteUrl}${getPathname({ locale: "id", href: "/layanan" })}`
      }
    },
    openGraph: {
      title: `${title} | NehanDev`,
      description:
        locale === "en"
          ? "Website services for Indonesian local businesses: restaurants, travel, hotels, barbershops, and vehicle rentals."
          : "Jasa pembuatan website untuk bisnis lokal Indonesia: restoran, travel, hotel, barbershop, dan rental kendaraan.",
      url
    }
  }
}

export default function LayananLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
