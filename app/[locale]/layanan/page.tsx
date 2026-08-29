"use client"

import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { motion } from "framer-motion"
import Link from "next/link"
import { Link as LocaleLink } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import {
  ExternalLink, Clock, CheckCircle2, MessageCircle,
  Palette, Code2, Rocket, ChevronRight
} from "lucide-react"
import { BUSINESS_WHATSAPP_URL } from "@/lib/business-info"

// ─── Structural data (not translated — icons, colors, routes, gradients) ──

const demoMeta = [
  { href: "/demo/travel", live: true, gradient: "from-cyan-500 via-teal-600 to-blue-800" },
  { href: "/demo/hotel", live: true, gradient: "from-amber-700 via-yellow-800 to-stone-900" },
  { href: "/demo/barbershop", live: true, gradient: "from-zinc-800 via-neutral-900 to-black" },
  { href: "/demo/rental", live: true, gradient: "from-slate-700 via-gray-800 to-zinc-900" }
]

const stepMeta = [
  { icon: MessageCircle, color: "#6366f1" },
  { icon: Palette, color: "#8b5cf6" },
  { icon: Code2, color: "#06b6d4" },
  { icon: Rocket, color: "#10b981" }
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }
  })
}

type Demo = { name: string; brand: string; desc: string; tags: string[] }
type Deliverable = { title: string; desc: string }
type Step = { title: string; desc: string; duration: string }

// ─── Page ───────────────────────────────────────────────────────

export default function LayananPage() {
  const t = useTranslations("layanan")

  const demos = t.raw("demos") as Demo[]
  const deliverables = t.raw("deliverables") as Deliverable[]
  const steps = t.raw("steps") as Step[]

  return (
    <>
      <Header />
      <main className="min-h-screen">

        {/* ── HERO ── */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-semibold tracking-widest uppercase text-primary">
                {t("hero.label")}
              </span>
              <h1
                className="mt-3 uppercase leading-[0.9] text-foreground"
                style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(56px, 8vw, 110px)" }}
              >
                {t("hero.titleLine1")}
                <br />
                <span className="text-primary">{t("hero.titleHighlight")}</span> {t("hero.titleLine1Suffix")}
              </h1>
              <p className="mt-5 text-base text-muted-foreground max-w-xl leading-relaxed">
                {t("hero.subtitle")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── DEMO PORTFOLIO ── */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="mb-12"
            >
              <span className="text-sm font-semibold tracking-widest uppercase text-primary">{t("demosSection.label")}</span>
              <h2
                className="mt-3 uppercase leading-[0.9] text-foreground"
                style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(40px, 6vw, 80px)" }}
              >
                {t("demosSection.title")}
              </h2>
              <p className="mt-3 text-base text-muted-foreground max-w-md leading-relaxed">
                {t("demosSection.subtitle")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {demos.map((demo, i) => {
                const meta = demoMeta[i]
                return (
                  <motion.div
                    key={demo.name}
                    variants={fadeUp} custom={i * 0.1} initial="hidden" whileInView="show" viewport={{ once: true }}
                    className="group rounded-2xl overflow-hidden bg-background shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    {/* Preview */}
                    <div className={`relative h-44 bg-gradient-to-br ${meta.gradient} overflow-hidden`}>
                      {/* Browser chrome */}
                      <div className="absolute top-0 inset-x-0 h-7 flex items-center px-3 gap-1.5"
                        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                        <span className="w-2 h-2 rounded-full bg-red-400/70" />
                        <span className="w-2 h-2 rounded-full bg-yellow-400/70" />
                        <span className="w-2 h-2 rounded-full bg-green-400/70" />
                        <span className="ml-2 text-[9px] truncate flex-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                          nehandev.com{meta.href}
                        </span>
                      </div>
                      {/* Fake content */}
                      <div className="absolute inset-0 flex flex-col gap-2 px-5 pt-10 pb-4">
                        <div className="h-4 rounded w-2/3" style={{ backgroundColor: "rgba(255,255,255,0.85)" }} />
                        <div className="h-2.5 rounded w-1/2" style={{ backgroundColor: "rgba(255,255,255,0.4)" }} />
                        <div className="flex gap-2 mt-2">
                          {[38, 26, 22].map((w, j) => (
                            <div key={j} className="h-6 rounded-lg" style={{ width: `${w}%`, backgroundColor: "rgba(255,255,255,0.2)" }} />
                          ))}
                        </div>
                        <div className="mt-auto grid grid-cols-3 gap-2">
                          {[0, 1, 2].map(j => (
                            <div key={j} className="rounded-lg" style={{ height: 42, backgroundColor: "rgba(255,255,255,0.12)" }} />
                          ))}
                        </div>
                      </div>
                      {/* Badge */}
                      <div className="absolute top-9 right-3">
                        {meta.live ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500 text-white">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />LIVE
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: "rgba(0,0,0,0.45)", color: "rgba(255,255,255,0.75)" }}>
                            <Clock className="w-2.5 h-2.5" />{t("demoCard.soon")}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">{demo.name}</p>
                      <h3 className="font-bold text-lg text-foreground mb-2">{demo.brand}</h3>
                      <p className="text-base text-muted-foreground leading-relaxed mb-4">{demo.desc}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {demo.tags.map(tag => (
                          <span key={tag} className="text-sm px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground">{tag}</span>
                        ))}
                      </div>
                      {meta.live ? (
                        <Link href={meta.href}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary text-white transition-all hover:scale-105">
                          <ExternalLink className="w-3.5 h-3.5" />{t("demoCard.viewDemo")}
                        </Link>
                      ) : (
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-muted text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" />{t("demoCard.comingSoon")}
                        </span>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── YANG ANDA DAPATKAN ── */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
            >
              <div>
                <span className="text-sm font-semibold tracking-widest uppercase text-primary">{t("deliverablesSection.label")}</span>
                <h2
                  className="mt-3 uppercase leading-[0.9] text-foreground"
                  style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(40px, 6vw, 80px)" }}
                >
                  {t("deliverablesSection.title")}
                </h2>
              </div>
              <p className="text-base text-muted-foreground max-w-xs leading-relaxed md:text-right">
                {t("deliverablesSection.subtitle")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {deliverables.map(({ title, desc }, i) => (
                <motion.div
                  key={title}
                  variants={fadeUp} custom={i * 0.07} initial="hidden" whileInView="show" viewport={{ once: true }}
                  className="flex gap-3 p-5 rounded-xl bg-muted/40"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-base text-foreground">{title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ALUR PEMESANAN ── */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="mb-14"
            >
              <span className="text-sm font-semibold tracking-widest uppercase text-primary">{t("processSection.label")}</span>
              <h2
                className="mt-3 uppercase leading-[0.9] text-foreground"
                style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(40px, 6vw, 80px)" }}
              >
                {t("processSection.titleLine1")}
                <br />{t("processSection.titleLine2")}
              </h2>
              <p className="mt-4 text-base text-muted-foreground max-w-md leading-relaxed">
                {t("processSection.subtitle")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl">
              {steps.map((step, i) => {
                const meta = stepMeta[i]
                const Icon = meta.icon
                const number = String(i + 1).padStart(2, "0")
                return (
                  <motion.div
                    key={number}
                    variants={fadeUp} custom={i * 0.1} initial="hidden" whileInView="show" viewport={{ once: true }}
                    className="relative flex flex-col gap-4 rounded-2xl bg-background p-6 shadow-sm"
                  >
                    {/* Step number watermark */}
                    <div
                      className="absolute top-3 right-4 font-black leading-none select-none pointer-events-none"
                      style={{ fontFamily: "var(--font-bebas)", fontSize: "64px", color: `${meta.color}14` }}
                    >
                      {number}
                    </div>

                    {/* Icon */}
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${meta.color}18`, color: meta.color }}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: `${meta.color}15`, color: meta.color }}>
                        {step.duration}
                      </span>
                      <h3 className="font-bold text-base text-foreground mt-2 mb-1">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>

                    {/* Connector arrow (hidden on last) */}
                    {i < steps.length - 1 && (
                      <ChevronRight
                        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 hidden md:block"
                        style={{ color: "#d1d5db" }}
                      />
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="max-w-2xl"
            >
              <h2
                className="uppercase leading-[0.9] text-foreground"
                style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(40px, 6vw, 72px)" }}
              >
                {t("finalCta.title")}
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-md">
                {t("finalCta.subtitle")}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`${BUSINESS_WHATSAPP_URL}?text=${encodeURIComponent(t("finalCta.whatsappPrefill"))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-base bg-primary text-white transition-all hover:scale-105 shadow-md shadow-primary/20"
                >
                  {t("finalCta.whatsappCta")}
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <LocaleLink
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-base bg-muted text-foreground transition-all hover:bg-muted/80"
                >
                  {t("finalCta.messageCta")}
                </LocaleLink>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
