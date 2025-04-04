"use client"

import { ProjectCard } from "@/components/ui/project-card"

const projects = [
  {
    title: "Habit Flare - Habit Tracker",
    description:
      "A full-stack habit tracker built with Next.js, TypeScript, and Tailwind CSS. Features include user authentication, habit tracking, and progress tracking.",
    image: "/images/habitflare.png",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL"
    ],
    liveUrl: "https://habitflare.com"
  },
  {
    title: "Hijri Guide - Hijri Calendar",
    description:
      "A hijri calendar application built with Next.js, TypeScript, and Tailwind CSS. Features include user authentication, hijri calendar, and lunar phase tracking.",
    image: "/images/hijriguide.png",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
    liveUrl: "https://hijriguide.com"
  },
  {
    title: "Kalender Muslim - Islamic Calendar",
    description:
      "A modern Islamic calendar application built with Next.js, TypeScript, and Tailwind CSS. Features include hijri calendar, lunar phase tracking, and prayer times.",
    image: "/images/kalendermuslim.png",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS"],
    liveUrl: "https://kalendermuslim.com"
  },
  {
    title: "Multi Gen Tool - All in one generate tool",
    description:
      "A all in one generate tool application built with Next.js, TypeScript, and Tailwind CSS. Features include generate text, image, video, and audio.",
    image: "/images/multigentool.png",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS"],
    liveUrl: "https://multigentool.com"
  }
]

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-primary">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto md:text-lg">
            Here are some of my recent projects that showcase my skills and
            experience in web development.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}
