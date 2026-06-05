import type { Metadata } from "next"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { ServicesSection } from "@/components/ui/services-section"
import { HowItWorksSection } from "@/components/ui/how-it-works-section"
import { ContactSection } from "@/components/ui/contact-section"

export const metadata: Metadata = {
  title: "Layanan | NehanDev",
  description:
    "Solusi digital untuk UMKM dan bisnis lokal — website restoran, travel, penginapan, company profile, landing page, dan toko online.",
  alternates: { canonical: "https://www.nehandev.com/layanan" }
}

export default function LayananPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <ServicesSection />
        <HowItWorksSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
