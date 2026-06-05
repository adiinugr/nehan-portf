"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CalendarDays, MoveRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/language-context"


function Hero() {
  const { t } = useLanguage()
  const [wordIndex, setWordIndex] = useState(0)
  const words = [...t.hero.words] as string[]

  useEffect(() => {
    const id = setTimeout(() => {
      setWordIndex((prev) => (prev === words.length - 1 ? 0 : prev + 1))
    }, 2200)
    return () => clearTimeout(id)
  }, [wordIndex, words.length])

  return (
    <section className="relative w-full overflow-hidden">
      {/* Dot grid */}
      <div className="absolute inset-0 hero-dot-grid opacity-100" />
      {/* Glow orbs */}
      <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-violet-600/8 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" style={{ animationDelay: "2s" }} />

      <div className="relative container mx-auto px-4 pt-28 pb-0">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 text-sm font-medium text-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            {t.hero.badge}
          </span>
        </motion.div>

        {/* Headline — Bebas Neue, left-aligned, massive */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <h1
            className="uppercase leading-[0.88] tracking-tight text-foreground"
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(64px, 11vw, 160px)",
            }}
          >
            <span className="block">{t.hero.headline1}</span>
            <span className="block">
              <span>{t.hero.headline2} </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  className="inline-block text-primary"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {words[wordIndex].toUpperCase()}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>
        </motion.div>

        {/* Subtitle + CTAs — side by side */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-8 max-w-4xl"
        >
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-md">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Button asChild size="lg" variant="outline" className="gap-2 hover:bg-primary/5">
              <Link href="https://wa.me/62895335501192" target="_blank" rel="noopener noreferrer">
                <CalendarDays className="w-4 h-4" />
                {t.hero.cta1}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="gap-2 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25"
            >
              <Link href="#portfolio">
                {t.hero.cta2}
                <MoveRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

    </section>
  )
}

export { Hero }
