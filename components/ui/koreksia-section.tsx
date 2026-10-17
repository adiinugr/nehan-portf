"use client"

import { motion } from "framer-motion"
import { ExternalLink, ScanLine, WifiOff, Shuffle, BrainCircuit } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"

export const KOREKSIA_PLAY_URL = "https://play.google.com/store/apps/details?id=com.koreksia.app"

const featureIcons = {
  scan: ScanLine,
  offline: WifiOff,
  paket: Shuffle,
  ai: BrainCircuit
}

type Feature = { title: string; desc: string }

const featureKeys = ["scan", "offline", "paket", "ai"] as const

export function KoreksiaSection() {
  const t = useTranslations("koreksia")
  const features = t.raw("features") as Record<keyof typeof featureIcons, Feature>

  return (
    <section id="koreksia" className="py-24 relative overflow-hidden">
      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: App preview (Koreksia's own near-black and emerald) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative order-2 lg:order-1"
          >
            <div
              className="absolute inset-0 rounded-3xl blur-3xl scale-90"
              style={{ backgroundColor: "rgba(16,185,129,0.14)" }}
            />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
              <Image
                src="/images/koreksia.png"
                alt={t("imageAlt")}
                width={1024}
                height={500}
                className="w-full h-auto"
              />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-6 order-1 lg:order-2"
          >
            <span
              className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold"
              style={{ backgroundColor: "rgba(16,185,129,0.12)", color: "#047857" }}
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#10B981" }} />
              {t("badge")}
            </span>

            <div>
              <h2
                className="uppercase leading-[0.9] text-foreground mb-2"
                style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(48px, 6vw, 80px)" }}
              >
                {t("title")}
              </h2>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground/80">
                {t("titleHighlight")}
              </h3>
            </div>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              {t("subtitle")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featureKeys.map((key) => {
                const Icon = featureIcons[key]
                const feature = features[key]
                return (
                  <div
                    key={key}
                    className="flex items-start gap-3 rounded-xl bg-background shadow-sm p-4"
                  >
                    <div
                      className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: "rgba(16,185,129,0.12)" }}
                    >
                      <Icon className="w-4 h-4" style={{ color: "#047857" }} />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-foreground">{feature.title}</p>
                      <p className="text-base text-muted-foreground mt-0.5">{feature.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div>
              <Link
                href={KOREKSIA_PLAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-semibold text-white transition-colors hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ backgroundColor: "#18181B", outlineColor: "#10B981" }}
              >
                {t("cta")}
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
