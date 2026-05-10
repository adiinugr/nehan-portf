import type { Metadata } from "next"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { EducationSection } from "@/components/ui/education-section"

export const metadata: Metadata = {
  title: "Education Technology | NehanDev",
  description:
    "CBT Pro — Anti-cheat online exam platform built for Indonesian teachers. Create questions with AI, schedule exams, and monitor students in real-time.",
  alternates: { canonical: "https://www.nehandev.com/education" },
  openGraph: {
    title: "Education Technology | NehanDev",
    description:
      "CBT Pro — Anti-cheat online exam platform built for Indonesian teachers.",
    url: "https://www.nehandev.com/education"
  }
}

export default function EducationPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-8">
        <EducationSection />
      </main>
      <Footer />
    </>
  )
}
