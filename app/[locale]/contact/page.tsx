import type { Metadata } from "next"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { ContactSection } from "@/components/ui/contact-section"
import { getPathname } from "@/i18n/navigation"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nehandev.com"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const url = `${siteUrl}${getPathname({ locale, href: "/contact" })}`

  const title = locale === "en" ? "Contact" : "Kontak"
  const description =
    locale === "en"
      ? "Contact NehanDev for a free consultation on your business website. Chat directly on WhatsApp — usually replies within minutes."
      : "Hubungi NehanDev untuk konsultasi gratis pembuatan website bisnis Anda. Chat langsung via WhatsApp — biasanya membalas dalam hitungan menit."

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        id: `${siteUrl}${getPathname({ locale: "id", href: "/contact" })}`,
        en: `${siteUrl}${getPathname({ locale: "en", href: "/contact" })}`,
        "x-default": `${siteUrl}${getPathname({ locale: "id", href: "/contact" })}`
      }
    },
    openGraph: {
      title: `${title} | NehanDev`,
      description:
        locale === "en"
          ? "Free consultation for your business website. Chat on WhatsApp now."
          : "Konsultasi gratis pembuatan website untuk bisnis Anda. Chat via WhatsApp sekarang.",
      url
    }
  }
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  return (
    <>
      <Header />
      <main className="min-h-screen pt-8">
        <h1 className="sr-only">{locale === "en" ? "Contact NehanDev" : "Kontak NehanDev"}</h1>
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
