"use client"

import type { Metadata } from "next"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  ExternalLink, Clock, CheckCircle2, MessageCircle,
  Palette, Code2, Rocket, ChevronRight
} from "lucide-react"

// ─── Data ──────────────────────────────────────────────────────

const demos = [
  {
    name: "Travel & Wisata",
    brand: "Jelajah Nusantara",
    desc: "Website agen travel lengkap dengan katalog destinasi, paket wisata, testimoni pelanggan, dan booking via WhatsApp.",
    href: "/demo/travel",
    live: true,
    gradient: "from-cyan-500 via-teal-600 to-blue-800",
    tags: ["Katalog destinasi", "Paket wisata", "Galeri", "WhatsApp booking"],
  },
  {
    name: "Hotel & Penginapan",
    brand: "Villa Sejuk Puncak",
    desc: "Website hotel premium dengan showcase kamar, galeri properti, harga transparan, dan reservasi langsung.",
    href: "/demo/hotel",
    live: true,
    gradient: "from-amber-700 via-yellow-800 to-stone-900",
    tags: ["Showcase kamar", "Galeri foto", "Harga & fasilitas", "Direct booking"],
  },
  {
    name: "Barbershop",
    brand: "Kings Barbershop",
    desc: "Website barbershop modern dan maskulin dengan daftar layanan, harga, booking online, dan galeri hasil kerja.",
    href: "/demo/barbershop",
    live: false,
    gradient: "from-zinc-800 via-neutral-900 to-black",
    tags: ["Layanan & harga", "Booking online", "Galeri", "Jam operasional"],
  },
  {
    name: "Rental Kendaraan",
    brand: "FastRide Rental",
    desc: "Website rental mobil/motor dengan katalog armada, tarif sewa, cek ketersediaan, dan pemesanan mudah.",
    href: "/demo/rental",
    live: false,
    gradient: "from-slate-700 via-gray-800 to-zinc-900",
    tags: ["Katalog armada", "Tarif sewa", "Ketersediaan", "Pemesanan online"],
  },
]

const deliverables = [
  { title: "Desain Custom", desc: "Desain unik sesuai identitas dan industri bisnis Anda — bukan template generik." },
  { title: "Mobile Responsive", desc: "Tampil sempurna di semua perangkat: HP, tablet, dan desktop." },
  { title: "SEO Dasar", desc: "Optimasi agar website Anda mudah ditemukan di Google oleh calon pelanggan." },
  { title: "WhatsApp Integration", desc: "Tombol WhatsApp langsung di website untuk memudahkan calon pelanggan menghubungi Anda." },
  { title: "Formulir Kontak", desc: "Form pemesanan atau pertanyaan yang langsung masuk ke email Anda." },
  { title: "Google Maps", desc: "Integrasi peta lokasi bisnis agar pelanggan mudah menemukan Anda." },
  { title: "2x Revisi", desc: "Dua putaran revisi desain gratis hingga Anda puas dengan hasilnya." },
  { title: "Panduan Pengelolaan", desc: "Dokumentasi cara update konten website secara mandiri setelah selesai." },
]

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Konsultasi Gratis",
    desc: "Chat via WhatsApp, ceritakan bisnis dan kebutuhan Anda. Kami akan rekomendasikan solusi yang paling tepat.",
    duration: "Hari 1",
    color: "#6366f1",
  },
  {
    number: "02",
    icon: Palette,
    title: "Desain & Review",
    desc: "Kami buat mockup desain website. Anda review dan berikan masukan. Revisi hingga Anda puas.",
    duration: "Hari 2–5",
    color: "#8b5cf6",
  },
  {
    number: "03",
    icon: Code2,
    title: "Pengembangan",
    desc: "Website dikembangkan sesuai desain yang sudah disetujui. Semua fitur dites dengan teliti.",
    duration: "Hari 6–12",
    color: "#06b6d4",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Tayang!",
    desc: "Website live dan siap diakses. Kami bantu setup domain dan hosting, plus panduan pengelolaan.",
    duration: "Hari 13–14",
    color: "#10b981",
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }
  })
}

// ─── Page ───────────────────────────────────────────────────────

export default function LayananPage() {
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
                Layanan Kami
              </span>
              <h1
                className="mt-3 uppercase leading-[0.9] text-foreground"
                style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(56px, 8vw, 110px)" }}
              >
                Website yang
                <br />
                <span className="text-primary">Bekerja</span> untuk Bisnis Anda
              </h1>
              <p className="mt-5 text-base text-muted-foreground max-w-xl leading-relaxed">
                Kami spesialis website untuk UMKM dan bisnis lokal Indonesia — dari restoran, travel, hotel, hingga rental kendaraan. Lihat sendiri hasilnya di bawah.
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
              <span className="text-sm font-semibold tracking-widest uppercase text-primary">Demo Website</span>
              <h2
                className="mt-3 uppercase leading-[0.9] text-foreground"
                style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(40px, 6vw, 80px)" }}
              >
                Lihat Contoh Nyatanya
              </h2>
              <p className="mt-3 text-base text-muted-foreground max-w-md leading-relaxed">
                Demo website lengkap yang sudah kami bangun — bisa langsung dicoba.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {demos.map((demo, i) => (
                <motion.div
                  key={demo.name}
                  variants={fadeUp} custom={i * 0.1} initial="hidden" whileInView="show" viewport={{ once: true }}
                  className="group rounded-2xl overflow-hidden bg-background shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {/* Preview */}
                  <div className={`relative h-44 bg-gradient-to-br ${demo.gradient} overflow-hidden`}>
                    {/* Browser chrome */}
                    <div className="absolute top-0 inset-x-0 h-7 flex items-center px-3 gap-1.5"
                      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                      <span className="w-2 h-2 rounded-full bg-red-400/70" />
                      <span className="w-2 h-2 rounded-full bg-yellow-400/70" />
                      <span className="w-2 h-2 rounded-full bg-green-400/70" />
                      <span className="ml-2 text-[9px] truncate flex-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                        nehandev.com{demo.href}
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
                        {[0,1,2].map(j => (
                          <div key={j} className="rounded-lg" style={{ height: 42, backgroundColor: "rgba(255,255,255,0.12)" }} />
                        ))}
                      </div>
                    </div>
                    {/* Badge */}
                    <div className="absolute top-9 right-3">
                      {demo.live ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500 text-white">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />LIVE
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: "rgba(0,0,0,0.45)", color: "rgba(255,255,255,0.75)" }}>
                          <Clock className="w-2.5 h-2.5" />Segera
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
                      {demo.tags.map(t => (
                        <span key={t} className="text-sm px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground">{t}</span>
                      ))}
                    </div>
                    {demo.live ? (
                      <Link href={demo.href}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary text-white transition-all hover:scale-105">
                        <ExternalLink className="w-3.5 h-3.5" />Lihat Demo Langsung
                      </Link>
                    ) : (
                      <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-muted text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />Demo Segera Hadir
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
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
                <span className="text-sm font-semibold tracking-widest uppercase text-primary">Termasuk</span>
                <h2
                  className="mt-3 uppercase leading-[0.9] text-foreground"
                  style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(40px, 6vw, 80px)" }}
                >
                  Yang Anda Dapatkan
                </h2>
              </div>
              <p className="text-base text-muted-foreground max-w-xs leading-relaxed md:text-right">
                Semua yang dibutuhkan untuk hadir secara profesional di internet.
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
              <span className="text-sm font-semibold tracking-widest uppercase text-primary">Alur Pemesanan</span>
              <h2
                className="mt-3 uppercase leading-[0.9] text-foreground"
                style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(40px, 6vw, 80px)" }}
              >
                Dari Nol ke Website
                <br />Hanya 14 Hari
              </h2>
              <p className="mt-4 text-base text-muted-foreground max-w-md leading-relaxed">
                Proses yang simpel, transparan, dan cepat — tanpa jargon teknis.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl">
              {steps.map((step, i) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.number}
                    variants={fadeUp} custom={i * 0.1} initial="hidden" whileInView="show" viewport={{ once: true }}
                    className="relative flex flex-col gap-4 rounded-2xl bg-background p-6 shadow-sm"
                  >
                    {/* Step number watermark */}
                    <div
                      className="absolute top-3 right-4 font-black leading-none select-none pointer-events-none"
                      style={{ fontFamily: "var(--font-bebas)", fontSize: "64px", color: `${step.color}14` }}
                    >
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${step.color}18`, color: step.color }}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: `${step.color}15`, color: step.color }}>
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
                Siap Mulai?
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-md">
                Konsultasi gratis, tidak ada kewajiban. Ceritakan bisnis Anda dan kami bantu tentukan website yang paling tepat.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="https://wa.me/62895335501192?text=Halo%20NehanDev%2C%20saya%20ingin%20konsultasi%20website%20untuk%20bisnis%20saya"
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
