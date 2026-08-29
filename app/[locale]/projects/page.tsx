import type { Metadata } from "next"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { ProjectsSection } from "@/components/ui/projects-section"
import { getPathname } from "@/i18n/navigation"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nehandev.com"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const url = `${siteUrl}${getPathname({ locale, href: "/projects" })}`

  const title = locale === "en" ? "Portfolio" : "Portofolio"
  const description =
    locale === "en"
      ? "NehanDev's portfolio — real projects built for Indonesian local businesses: restaurant, travel, and hotel websites, calendar apps, and digital tools."
      : "Portofolio NehanDev — proyek nyata yang dibangun untuk bisnis lokal Indonesia: website restoran, travel, penginapan, aplikasi kalender, dan tools digital."

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        id: `${siteUrl}${getPathname({ locale: "id", href: "/projects" })}`,
        en: `${siteUrl}${getPathname({ locale: "en", href: "/projects" })}`,
        "x-default": `${siteUrl}${getPathname({ locale: "id", href: "/projects" })}`
      }
    },
    openGraph: {
      title: `${title} | NehanDev`,
      description:
        locale === "en"
          ? "Real projects built for Indonesian local businesses by NehanDev."
          : "Proyek nyata yang dibangun untuk bisnis lokal Indonesia oleh NehanDev.",
      url
    }
  }
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params
  return (
    <>
      <Header />
      <main className="min-h-screen pt-8">
        <h1 className="sr-only">{locale === "en" ? "NehanDev Portfolio" : "Portofolio NehanDev"}</h1>
        <ProjectsSection />
      </main>
      <Footer />
    </>
  )
}
