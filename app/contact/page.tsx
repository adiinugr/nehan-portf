import type { Metadata } from "next"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { ContactSection } from "@/components/ui/contact-section"

export const metadata: Metadata = {
  title: "Kontak | NehanDev",
  description:
    "Hubungi NehanDev untuk konsultasi gratis pembuatan website bisnis Anda. Chat langsung via WhatsApp — biasanya membalas dalam hitungan menit.",
  alternates: { canonical: "https://www.nehandev.com/contact" },
  openGraph: {
    title: "Kontak | NehanDev",
    description: "Konsultasi gratis pembuatan website untuk bisnis Anda. Chat via WhatsApp sekarang.",
    url: "https://www.nehandev.com/contact"
  }
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-8">
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
