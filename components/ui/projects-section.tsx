"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/lib/i18n/language-context"
import { ProjectCard } from "@/components/ui/project-card"

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
  },
  {
    title: "Weton Jawa",
    description:
      "Aplikasi perhitungan weton Jawa lengkap dengan kalender Jawa, tafsir weton, dan informasi hari baik berbasis tradisi Jawa.",
    image: "/images/wetonjawa.png",
    technologies: ["Next.js", "Tailwind CSS"],
    liveUrl: "https://wetonjawa.com"
  },
  {
    title: "ILM Models",
    description:
      "Platform talent management agency untuk model profesional, dilengkapi dengan portofolio model, booking, dan manajemen agensi.",
    image: "/images/ilmmodels.png",
    technologies: ["Next.js", "Tailwind CSS"],
    liveUrl: "https://ilmmodels.com"
  }
]


export function ProjectsSection() {
  const { t } = useLanguage()

  return (
    <section
      id="portfolio"
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: "#0b0d17" }}
    >
      {/* Ambient violet glow at top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 flex flex-col md:flex-row md:items-end gap-6 justify-between"
        >
          <div>
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-3"
              style={{ color: "#818cf8" }}
            >
              {t.projects.label}
            </p>
            <h2
              className="uppercase leading-[0.9]"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(48px, 7vw, 96px)",
                color: "#f1f5f9",
              }}
            >
              {t.projects.title}
            </h2>
          </div>
          <p
            className="max-w-xs text-base leading-relaxed md:text-right"
            style={{ color: "#64748b" }}
          >
            {t.projects.subtitle}
          </p>
        </motion.div>

        {/* Uniform grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              {...project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
