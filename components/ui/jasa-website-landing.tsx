"use client"

import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { motion } from "framer-motion"
import Link from "next/link"
import { ExternalLink, ChevronRight, AlertCircle, CheckCircle2 } from "lucide-react"
import { BUSINESS_WHATSAPP_URL } from "@/lib/business-info"
import { getJasaWebsiteJsonLd, type JasaWebsiteNiche } from "@/lib/data/jasa-website-niches"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }
  })
}

export function JasaWebsiteLanding({ niche }: { niche: JasaWebsiteNiche }) {
  const whatsappHref = `${BUSINESS_WHATSAPP_URL}?text=${encodeURIComponent(niche.hero.whatsappPrefill)}`
  const { service, faqPage } = getJasaWebsiteJsonLd(niche)

  return (
    <>
      <script
        id={`service-schema-${niche.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
      <script
        id={`faq-schema-${niche.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
      <Header />
      <main className="min-h-screen">

        {/* ── HERO ── */}
        <section className="py-16 md:py-20 bg-white overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-sm font-semibold tracking-widest uppercase text-[#4f46e5]">
                  {niche.hero.eyebrow}
                </span>
                <h1
                  className="mt-3 uppercase leading-[0.9] text-foreground"
                  style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(44px, 6vw, 84px)" }}
                >
                  {niche.hero.titleLine1}
                  <br />
                  <span style={{ color: niche.accent }}>{niche.hero.titleHighlight}</span>{" "}
                  {niche.hero.titleLine2}
                </h1>
                <p className="mt-5 text-base text-muted-foreground max-w-lg leading-relaxed">
                  {niche.hero.subtitle}
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-base bg-primary text-white transition-all hover:scale-105 shadow-md shadow-primary/20"
                  >
                    Konsultasi Gratis via WhatsApp
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  {niche.demoLive && (
                    <Link
                      href={niche.demoHref}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-base bg-muted text-foreground transition-all hover:bg-muted/80"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Lihat Demo Live
                    </Link>
                  )}
                </div>
              </motion.div>

              {/* Browser mockup visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${niche.gradient} shadow-xl h-72 sm:h-96`}
              >
                <div className="absolute top-0 inset-x-0 h-8 flex items-center px-4 gap-1.5" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                  <span className="ml-3 text-xs truncate flex-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                    nehandev.com{niche.demoHref}
                  </span>
                </div>
                <div className="absolute inset-0 flex flex-col gap-3 px-8 pt-16 pb-8">
                  <div className="h-6 rounded w-2/3" style={{ backgroundColor: "rgba(255,255,255,0.9)" }} />
                  <div className="h-3.5 rounded w-1/2" style={{ backgroundColor: "rgba(255,255,255,0.45)" }} />
                  <div className="flex gap-3 mt-3">
                    {[38, 26, 22].map((w, j) => (
                      <div key={j} className="h-9 rounded-lg" style={{ width: `${w}%`, backgroundColor: "rgba(255,255,255,0.22)" }} />
                    ))}
                  </div>
                  <div className="mt-auto grid grid-cols-3 gap-3">
                    {[0, 1, 2].map(j => (
                      <div key={j} className="rounded-lg" style={{ height: 64, backgroundColor: "rgba(255,255,255,0.14)" }} />
                    ))}
                  </div>
                </div>
                {niche.demoLive && (
                  <div className="absolute top-11 right-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-green-500 text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />LIVE
                    </span>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── PAIN POINTS ── */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="mb-12 max-w-xl"
            >
              <span className="text-sm font-semibold tracking-widest uppercase text-[#4f46e5]">Masalah Umum</span>
              <h2
                className="mt-3 uppercase leading-[0.9] text-foreground"
                style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(36px, 5vw, 64px)" }}
              >
                Yang Sering Dialami {niche.name}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {niche.painPoints.map((point, i) => (
                <motion.div
                  key={point.title}
                  variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
                  className="flex gap-3 p-6 rounded-2xl bg-background shadow-sm"
                >
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: niche.accent }} />
                  <div>
                    <p className="font-semibold text-base text-foreground">{point.title}</p>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{point.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
            >
              <div>
                <span className="text-sm font-semibold tracking-widest uppercase text-[#4f46e5]">Yang Anda Dapatkan</span>
                <h2
                  className="mt-3 uppercase leading-[0.9] text-foreground"
                  style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(36px, 5vw, 64px)" }}
                >
                  Fitur Website {niche.name}
                </h2>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {niche.features.map((f, i) => (
                <motion.div
                  key={f.title}
                  variants={fadeUp} custom={i * 0.6} initial="hidden" whileInView="show" viewport={{ once: true }}
                  className="flex gap-3 p-5 rounded-xl bg-muted/40"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-base text-foreground">{f.title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="mb-10"
            >
              <span className="text-sm font-semibold tracking-widest uppercase text-[#4f46e5]">FAQ</span>
              <h2
                className="mt-3 uppercase leading-[0.9] text-foreground"
                style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(36px, 5vw, 64px)" }}
              >
                Pertanyaan yang Sering Ditanyakan
              </h2>
            </motion.div>

            <div className="flex flex-col gap-3">
              {niche.faq.map((item, i) => (
                <motion.details
                  key={item.q}
                  variants={fadeUp} custom={i * 0.5} initial="hidden" whileInView="show" viewport={{ once: true }}
                  className="group rounded-xl bg-background p-5 shadow-sm open:shadow-md transition-shadow"
                >
                  <summary className="flex items-center justify-between gap-4 cursor-pointer font-semibold text-base text-foreground list-none">
                    {item.q}
                    <ChevronRight className="w-4 h-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                </motion.details>
              ))}
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
                style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(36px, 5vw, 64px)" }}
              >
                Siap Punya Website {niche.name}?
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-md">
                Konsultasi gratis, tidak ada kewajiban. Ceritakan kebutuhan usaha Anda dan kami bantu tentukan solusi yang paling tepat.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-base bg-primary text-white transition-all hover:scale-105 shadow-md shadow-primary/20"
                >
                  Chat WhatsApp Sekarang
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-base bg-muted text-foreground transition-all hover:bg-muted/80"
                >
                  Kirim Pesan
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
