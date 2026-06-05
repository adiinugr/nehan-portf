import type { Metadata } from "next"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { ProjectsSection } from "@/components/ui/projects-section"

export const metadata: Metadata = {
  title: "Portofolio | NehanDev",
  description:
    "Portofolio NehanDev — proyek nyata yang dibangun untuk bisnis lokal Indonesia: website restoran, travel, penginapan, aplikasi kalender, dan tools digital.",
  alternates: { canonical: "https://www.nehandev.com/projects" },
  openGraph: {
    title: "Portofolio | NehanDev",
    description: "Proyek nyata yang dibangun untuk bisnis lokal Indonesia oleh NehanDev.",
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
