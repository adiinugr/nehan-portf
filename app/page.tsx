import type { Metadata } from "next"
import { Header } from "@/components/ui/header"
import { Hero } from "@/components/ui/animated-hero"
import { ServicesSection } from "@/components/ui/services-section"
import { UmkmDemoSection } from "@/components/ui/umkm-demo-section"
import { HowItWorksSection } from "@/components/ui/how-it-works-section"
import { ProjectsSection } from "@/components/ui/projects-section"
import { EducationSection } from "@/components/ui/education-section"
import { TestimonialsSection } from "@/components/ui/testimonials-section"
import { BlogPreviewSection } from "@/components/ui/blog-preview-section"
import { ContactSection } from "@/components/ui/contact-section"
import { Footer } from "@/components/ui/footer"
import { getRecentPosts } from "@/lib/blog"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nehandev.com"

export const metadata: Metadata = {
  title: "NehanDev | Solusi Digital untuk Usaha Lokal",
  description:
    "Kami bantu UMKM dan bisnis kecil hadir secara digital — website profesional untuk restoran, travel, penginapan, dan lebih banyak lagi.",
  alternates: { canonical: siteUrl }
}

export default function Home() {
  const recentPosts = getRecentPosts(3)

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ServicesSection />
      <UmkmDemoSection />
      <HowItWorksSection />
      <ProjectsSection />
      <EducationSection />
      <TestimonialsSection />
      <BlogPreviewSection posts={recentPosts} />
      <ContactSection />
      <Footer />
    </main>
  )
}
