"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronRight, ExternalLink } from "lucide-react"
import { useTranslations } from "next-intl"

type Step = { title: string; desc: string }
type TrustPoint = { title: string; desc: string }

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const }
  })
}

// Fixed, representative student-status grid for the dashboard mockup —
// not real data, just illustrating the three states CBT Pro tracks live.
const STUDENT_STATUSES: Array<"done" | "active" | "flagged"> = [
  "done", "done", "active", "done", "done", "active", "done", "flagged",
  "done", "active", "done", "done", "active", "done", "done", "active",
  "done", "done", "active", "done", "done", "done", "active", "done"
]

const STATUS_COLOR: Record<(typeof STUDENT_STATUSES)[number], string> = {
  done: "#10b981",
  active: "#6366f1",
  flagged: "#ef4444"
}

export function EducationDetailSection() {
  const t = useTranslations("educationDetail")
  const tMockup = useTranslations("education.mockup")
  const steps = t.raw("process.steps") as Step[]
  const points = t.raw("trust.points") as TrustPoint[]

  return (
    <>
      {/* ── PROCESS ── */}
      <section className="py-24 bg-muted/40">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mb-14 max-w-xl"
          >
            <span className="text-sm font-semibold tracking-widest uppercase text-[#4f46e5]">
              {t("process.label")}
            </span>
            <h2
              className="mt-3 uppercase leading-[0.9] text-foreground"
              style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(40px, 6vw, 80px)" }}
            >
              {t("process.title")}
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              {t("process.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="relative flex flex-col gap-3 rounded-2xl bg-background p-6 shadow-sm"
              >
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full w-fit"
                  style={{ backgroundColor: "rgba(99,102,241,0.12)", color: "#4f46e5" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-bold text-base text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                {i < steps.length - 1 && (
                  <ChevronRight
                    className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 hidden md:block"
                    style={{ color: "#d1d5db" }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE DASHBOARD MOCKUP ── */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <span className="text-sm font-semibold tracking-widest uppercase text-[#4f46e5]">
                {t("dashboard.eyebrow")}
              </span>
              <h2
                className="mt-3 uppercase leading-[0.9] text-foreground"
                style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(40px, 6vw, 80px)" }}
              >
                {t("dashboard.title")}
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-md">
                {t("dashboard.subtitle")}
              </p>
            </motion.div>

            {/* Signature element: stylized live dashboard */}
            <motion.div
              variants={fadeUp} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="order-1 lg:order-2 relative"
            >
              <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-3xl scale-90" />
              <div
                className="relative rounded-2xl p-5 shadow-2xl shadow-primary/10"
                style={{ backgroundColor: "#0f1420" }}
              >
                {/* Header row */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-red-400">Live</span>
                  </div>
                  <span className="text-sm font-medium" style={{ color: "#94a3b8" }}>
                    {tMockup("label")}
                  </span>
                </div>

                {/* Stat chips */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="rounded-xl p-3" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
                    <p className="text-2xl font-bold text-white">32</p>
                    <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>{tMockup("studentsOnline")}</p>
                  </div>
                  <div className="rounded-xl p-3" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
                    <p className="text-2xl font-bold text-white">78%</p>
                    <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>{tMockup("examProgress")}</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 rounded-full mb-5 overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                  <div className="h-full rounded-full" style={{ width: "78%", backgroundColor: "#6366f1" }} />
                </div>

                {/* Student status grid */}
                <div className="grid grid-cols-8 gap-1.5 mb-5">
                  {STUDENT_STATUSES.map((status, i) => (
                    <span
                      key={i}
                      className="w-full aspect-square rounded-md"
                      style={{ backgroundColor: STATUS_COLOR[status] }}
                    />
                  ))}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                  <span className="flex items-center gap-1.5 text-xs" style={{ color: "#94a3b8" }}>
                    <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: STATUS_COLOR.done }} />
                    {tMockup("autoGraded")}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs" style={{ color: "#94a3b8" }}>
                    <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: STATUS_COLOR.active }} />
                    {t("dashboard.legendActive")}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs" style={{ color: "#94a3b8" }}>
                    <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: STATUS_COLOR.flagged }} />
                    {t("dashboard.legendFlagged")}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <section className="py-24 bg-muted/40">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mb-14 max-w-xl"
          >
            <span className="text-sm font-semibold tracking-widest uppercase text-[#4f46e5]">
              {t("trust.label")}
            </span>
            <h2
              className="mt-3 uppercase leading-[0.9] text-foreground"
              style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(40px, 6vw, 80px)" }}
            >
              {t("trust.title")}
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              {t("trust.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {points.map((point, i) => (
              <motion.div
                key={point.title}
                variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="rounded-2xl bg-background p-6 shadow-sm"
              >
                <h3 className="font-bold text-base text-foreground mb-2">{point.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{point.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-2xl">
            <h2
              className="uppercase leading-[0.9] text-foreground"
              style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(40px, 6vw, 72px)" }}
            >
              {t("closingCta.title")}
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-md">
              {t("closingCta.subtitle")}
            </p>
            <div className="mt-8">
              <Link
                href="https://cbtpro.id"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-base bg-primary text-white transition-all hover:scale-105 shadow-md shadow-primary/20"
              >
                {t("closingCta.cta")}
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
