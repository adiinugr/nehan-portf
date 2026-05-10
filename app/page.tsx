import type { Metadata } from "next"
import { Header } from "@/components/ui/header"
import { Hero } from "@/components/ui/animated-hero"
import { ProjectsSection } from "@/components/ui/projects-section"
import { EducationSection } from "@/components/ui/education-section"
import { BlogPreviewSection } from "@/components/ui/blog-preview-section"
import { ContactSection } from "@/components/ui/contact-section"
import { Footer } from "@/components/ui/footer"
import { getRecentPosts } from "@/lib/blog"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nehandev.com"

export const metadata: Metadata = {
  title: "NehanDev | Professional Web Development Solutions",
  description:
    "Transform your digital vision into reality with NehanDev. We create beautiful, high-performance websites and applications tailored to your business needs.",
  alternates: { canonical: siteUrl }
}

export default function Home() {
  const recentPosts = getRecentPosts(3)

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ProjectsSection />
      <EducationSection />
      <BlogPreviewSection posts={recentPosts} />
      <ContactSection />
      <Footer />
    </main>
  )
}
