"use client"

import { motion } from "framer-motion"
import { ExternalLink, Shield, Zap, MonitorCheck, BrainCircuit } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n/language-context"

const featureIcons = {
  questionTypes: Zap,
  antiCheat: Shield,
  realtime: MonitorCheck,
  ai: BrainCircuit
}

export function EducationSection() {
  const { t } = useLanguage()
  const ed = t.education

  const featureKeys = ["questionTypes", "antiCheat", "realtime", "ai"] as const

  return (
    <section id="education" className="py-24 relative overflow-hidden">

      <div className="relative container mx-auto px-4">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-primary">
            {ed.label}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            {/* Badge */}
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary uppercase tracking-wider">
              {ed.badge}
            </span>

            {/* Title */}
            <div>
              <h2
                className="uppercase leading-[0.9] text-foreground mb-2"
                style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(48px, 6vw, 80px)" }}
              >
                {ed.title}
              </h2>
              <h3 className="text-xl md:text-2xl font-semibold text-primary">
                {ed.titleHighlight}
              </h3>
            </div>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              {ed.subtitle}
            </p>

            {/* Feature grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featureKeys.map((key, i) => {
                const Icon = featureIcons[key]
                const feature = ed.features[key]
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                    className="flex items-start gap-3 rounded-xl bg-background shadow-sm p-4"
                  >
                    <div className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-foreground">{feature.title}</p>
                      <p className="text-base text-muted-foreground mt-0.5">{feature.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <div>
              <Button
                asChild
                size="lg"
                className="gap-2 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25"
              >
                <Link href="https://cbtpro.id" target="_blank" rel="noopener noreferrer">
                  {ed.cta}
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right: Screenshot */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            {/* Glow behind image */}
            <div className="absolute inset-0 bg-primary/15 rounded-3xl blur-3xl scale-90" />

            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/20">
              <Image
                src="/images/cbtpro.png"
                alt="CBTPro — Platform Ujian Online Anti-Curang"
                width={620}
                height={420}
                className="w-full h-auto"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
