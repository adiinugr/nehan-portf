"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/language-context"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl?: string
  index?: number
}

export function ProjectCard({
  title,
  description,
  image,
  technologies,
  liveUrl,
  index = 0,
}: ProjectCardProps) {
  const { t } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
      style={{
        backgroundColor: "#1a1f35",
        boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 8px 32px rgba(0,0,0,0.5)"
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 1px 3px rgba(0,0,0,0.4)"
      }}
    >
      {/* Image */}
      <div className="p-5" style={{ backgroundColor: "#1e2235" }}>
        <div className="relative aspect-[25/14] overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {liveUrl && (
          <div className="absolute inset-0 flex items-end justify-start p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
            <Link
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors"
              style={{ backgroundColor: "rgba(255,255,255,0.95)", color: "#0f172a" }}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {t.projects.liveDemo}
            </Link>
          </div>
        )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3
          className="font-bold mb-2 transition-colors duration-200 group-hover:text-[#818cf8] text-base"
          style={{ color: "#e2e8f0" }}
        >
          {title}
        </h3>
        <p
          className="mb-4 flex-1 leading-relaxed text-sm line-clamp-2"
          style={{ color: "#94a3b8" }}
        >
          {description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-sm px-2.5 py-0.5 rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "#64748b" }}
            >
              {tech}
            </span>
          ))}
          {technologies.length > 3 && (
            <span
              className="text-sm px-2.5 py-0.5 rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "#64748b" }}
            >
              +{technologies.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
