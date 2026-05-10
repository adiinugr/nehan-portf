"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { MoveRight, CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/language-context"

function Hero() {
  const { t } = useLanguage()
  const [titleNumber, setTitleNumber] = useState(0)
  const words = [...t.hero.words] as string[]

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === words.length - 1 ? 0 : prev + 1))
    }, 2200)
    return () => clearTimeout(timeoutId)
  }, [titleNumber, words.length])

  return (
    <section className="relative w-full overflow-hidden">
      {/* Dot grid background */}
      <div className="absolute inset-0 hero-dot-grid opacity-100" />

      {/* Glowing orbs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-indigo-600/12 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-20 -right-20 w-[380px] h-[380px] bg-violet-600/8 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      <div className="relative container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-8 py-28 lg:py-44 text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 text-xs font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              {t.hero.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center gap-2"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-4xl">
              {t.hero.headline1}
            </h1>
            <div className="flex items-center gap-3 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-foreground">{t.hero.headline2}</span>
              <span className="relative inline-flex h-[1.1em] w-[260px] md:w-[360px] lg:w-[440px] overflow-hidden justify-start">
                {words.map((word, index) => (
                  <motion.span
                    key={word}
                    className="absolute text-primary"
                    initial={{ opacity: 0, y: 40 }}
                    transition={{ type: "spring", stiffness: 60, damping: 12 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : { y: titleNumber > index ? -50 : 50, opacity: 0 }
                    }
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 hover:bg-primary/5"
            >
              <Link href="/contact">
                <CalendarDays className="w-4 h-4" />
                {t.hero.cta1}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="gap-2 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
            >
              <Link href="/projects">
                {t.hero.cta2}
                <MoveRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
          >
            <div className="w-px h-10 bg-gradient-to-b from-transparent via-border to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export { Hero }
