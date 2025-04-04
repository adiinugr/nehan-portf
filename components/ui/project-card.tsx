"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
}

export function ProjectCard({
  title,
  description,
  image,
  liveUrl
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-lg bg-background p-2 shadow-lg transition-colors"
    >
      <div className="aspect-video relative overflow-hidden rounded-md">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 text-primary">{title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>

        <div className="flex gap-4">
          {liveUrl && (
            <Button
              size="sm"
              asChild
              className="bg-primary hover:bg-primary/90"
            >
              <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </Link>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
