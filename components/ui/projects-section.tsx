"use client"

import { ProjectCard } from "@/components/ui/project-card"
import { useLanguage } from "@/lib/i18n/language-context"

const projects = [
  {
    title: "Habit Flare",
    description:
      "A full-stack habit tracker built with Next.js, TypeScript, and Tailwind CSS. Features user authentication, habit tracking, and progress analytics.",
    image: "/images/habitflare.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    liveUrl: "https://habitflare.com"
  },
  {
    title: "Hijri Guide",
    description:
      "A hijri calendar application with user authentication, lunar phase tracking, and Islamic date conversions for everyday use.",
    image: "/images/hijriguide.png",
    technologies: ["React", "Node.js", "MongoDB"],
    liveUrl: "https://hijriguide.com"
  },
  {
    title: "Kalender Muslim",
    description:
      "A modern Islamic calendar application featuring hijri calendar, lunar phase tracking, and prayer times for Muslim users.",
    image: "/images/kalendermuslim.png",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS"],
    liveUrl: "https://kalendermuslim.com"
  },
  {
    title: "Multi Gen Tool",
    description:
      "An all-in-one content generation tool supporting text, image, video, and audio generation powered by modern AI APIs.",
    image: "/images/multigentool.png",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS"],
    liveUrl: "https://multigentool.com"
  },
  {
    title: "Pintar MTK",
    description:
      "A mathematics learning blog built on WordPress, providing problem sets, step-by-step solutions, and downloadable PDF materials.",
    image: "/images/pintarmtk.png",
    technologies: ["WordPress"],
    liveUrl: "https://pintarmtk.com"
  }
]

export function ProjectsSection() {
  const { t } = useLanguage()

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <p className="text-sm font-medium text-primary mb-3 uppercase tracking-widest">
            {t.projects.label}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.projects.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl text-base md:text-lg">
            {t.projects.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
