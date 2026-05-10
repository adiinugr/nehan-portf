import type { Metadata } from "next"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { ContactSection } from "@/components/ui/contact-section"

export const metadata: Metadata = {
  title: "Contact | NehanDev",
  description:
    "Get in touch with NehanDev. We're available for web development projects, consultations, and collaborations. Typically replies within 24 hours.",
  alternates: { canonical: "https://www.nehandev.com/contact" },
  openGraph: {
    title: "Contact | NehanDev",
    description: "Get in touch with NehanDev — available for new projects.",
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
