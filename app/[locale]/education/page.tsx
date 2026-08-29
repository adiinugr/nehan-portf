import type { Metadata } from "next"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { EducationSection } from "@/components/ui/education-section"
import { getPathname } from "@/i18n/navigation"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nehandev.com"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const url = `${siteUrl}${getPathname({ locale, href: "/education" })}`

  const title = locale === "en" ? "Education Technology" : "Teknologi Pendidikan"
  const description =
    locale === "en"
      ? "CBT Pro — Anti-cheat online exam platform built for Indonesian teachers. Create questions with AI, schedule exams, and monitor students in real-time."
      : "CBT Pro — Platform ujian online anti-curang untuk guru Indonesia. Buat soal dengan AI, jadwalkan ujian, dan pantau siswa secara real-time."

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        id: `${siteUrl}${getPathname({ locale: "id", href: "/education" })}`,
        en: `${siteUrl}${getPathname({ locale: "en", href: "/education" })}`,
        "x-default": `${siteUrl}${getPathname({ locale: "id", href: "/education" })}`
      }
    },
    openGraph: {
      title: `${title} | NehanDev`,
      description:
        locale === "en"
          ? "CBT Pro — Anti-cheat online exam platform built for Indonesian teachers."
          : "CBT Pro — Platform ujian online anti-curang untuk guru Indonesia.",
      url
    }
  }
}

export default async function EducationPage({ params }: Props) {
  const { locale } = await params
  return (
    <>
      <Header />
      <main className="min-h-screen pt-8">
        <h1 className="sr-only">
          {locale === "en" ? "Education Technology — CBT Pro by NehanDev" : "Teknologi Pendidikan — CBT Pro oleh NehanDev"}
        </h1>
        <EducationSection />
      </main>
      <Footer />
    </>
  )
}
