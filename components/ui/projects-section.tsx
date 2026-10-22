"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { ProjectCard } from "@/components/ui/project-card"

const projects = [
  {
    title: "Koreksia",
    descriptionKey: "koreksia",
    image: "/images/koreksia-v2.png",
    technologies: ["Flutter", "Firebase", "Isar"],
    liveUrl: "https://play.google.com/store/apps/details?id=com.koreksia.app"
  },
  {
    title: "Analogis",
    descriptionKey: "analogis",
    image: "/images/analogis.png",
    technologies: ["React Native", "Firebase", "MathJax"],
    liveUrl: "https://play.google.com/store/apps/details?id=com.analogissmp"
  },
  {
    title: "KetikNota",
    descriptionKey: "ketiknota",
    image: "/images/ketiknota.png",
    technologies: ["Flutter", "Firebase"],
    liveUrl: "https://play.google.com/store/apps/details?id=com.ketiknota.app"
  },
  {
    title: "Habit Flare",
    descriptionKey: "habitflare",
    image: "/images/habitflare.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    liveUrl: "https://habitflare.com"
  },
  {
    title: "Hijri Guide",
    descriptionKey: "hijriguide",
    image: "/images/hijriguide.png",
    technologies: ["React", "Node.js", "MongoDB"],
    liveUrl: "https://hijriguide.com"
  },
  {
    title: "Kalender Muslim",
    descriptionKey: "kalendermuslim",
    image: "/images/kalendermuslim.png",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS"],
    liveUrl: "https://kalendermuslim.com"
  },
  {
    title: "Multi Gen Tool",
    descriptionKey: "multigentool",
    image: "/images/multigentool.png",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS"],
    liveUrl: "https://multigentool.com"
  },
  {
    title: "Pintar MTK",
    descriptionKey: "pintarmtk",
    image: "/images/pintarmtk.png",
    technologies: ["WordPress"],
    liveUrl: "https://pintarmtk.com"
  },
  {
    title: "Weton Jawa",
    descriptionKey: "wetonjawa",
    image: "/images/wetonjawa.png",
    technologies: ["Next.js", "Tailwind CSS"],
    liveUrl: "https://wetonjawa.com"
  },
  {
    title: "ILM Models",
    descriptionKey: "ilmmodels",
    image: "/images/ilmmodels.png",
    technologies: ["Next.js", "Tailwind CSS"],
    liveUrl: "https://ilmmodels.com"
  }
]


export function ProjectsSection() {
  const t = useTranslations("projects")

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
              {t("label")}
            </p>
            <h2
              className="uppercase leading-[0.9]"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(48px, 7vw, 96px)",
                color: "#f1f5f9",
              }}
            >
              {t("title")}
            </h2>
          </div>
          <p
            className="max-w-xs text-base leading-relaxed md:text-right"
            style={{ color: "#64748b" }}
          >
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Uniform grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              {...project}
              description={t(`descriptions.${project.descriptionKey}`)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
