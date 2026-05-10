import type { Metadata } from "next"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { ProjectsSection } from "@/components/ui/projects-section"

export const metadata: Metadata = {
  title: "Projects | NehanDev",
  description:
    "Explore NehanDev's portfolio of web development projects — modern web applications, tools, and digital solutions built with Next.js, React, and TypeScript.",
  alternates: { canonical: "https://www.nehandev.com/projects" },
  openGraph: {
    title: "Projects | NehanDev",
    description: "Explore our portfolio of modern web applications and digital solutions.",
    url: "https://www.nehandev.com/projects"
  }
}

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-8">
        <ProjectsSection />
      </main>
      <Footer />
    </>
  )
}
