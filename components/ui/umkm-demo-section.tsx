"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ExternalLink, Clock } from "lucide-react"

const demos = [
  {
    name: "Travel & Wisata",
    brand: "Jelajah Nusantara",
    desc: "Website agen travel lengkap — destinasi, paket wisata, testimoni, dan booking WhatsApp.",
    href: "/demo/travel",
    live: true,
    gradient: "from-cyan-500 via-teal-600 to-blue-800",
    accent: "#0ea5e9",
    features: ["Katalog destinasi", "Paket wisata 3 tier", "Galeri foto", "WhatsApp booking"],
    browser: [
      { w: "40%", c: "#0ea5e9" }, { w: "25%", c: "#0ea5e9aa" }, { w: "30%", c: "#0ea5e944" }
    ]
  },
  {
    name: "Hotel & Penginapan",
    brand: "Villa Sejuk Puncak",
    desc: "Website hotel premium dengan showcase kamar, galeri, harga, dan sistem reservasi langsung.",
    href: "/demo/hotel",
    live: true,
    gradient: "from-amber-700 via-yellow-800 to-stone-900",
    accent: "#d97706",
    features: ["Showcase kamar", "Galeri foto", "Sistem reservasi", "Direct booking"],
    browser: [
      { w: "35%", c: "#d97706" }, { w: "20%", c: "#d97706aa" }, { w: "28%", c: "#d9770644" }
    ]
  },
  {
    name: "Barbershop",
    brand: "Kings Barbershop",
    desc: "Website barbershop maskulin dan modern — layanan, harga, booking online, dan galeri hasil kerja.",
    href: "/demo/barbershop",
    live: false,
    gradient: "from-zinc-800 via-neutral-900 to-black",
    accent: "#ef4444",
    features: ["Daftar layanan & harga", "Booking online", "Galeri potongan", "Lokasi & jam buka"],
    browser: [
      { w: "38%", c: "#ef4444" }, { w: "22%", c: "#ef4444aa" }, { w: "32%", c: "#ef444444" }
    ]
  },
  {
    name: "Rental Mobil",
    brand: "FastRide Rental",
    desc: "Website rental kendaraan dinamis — armada, harga sewa, cek ketersediaan, dan pemesanan mudah.",
    href: "/demo/rental",
    live: false,
    gradient: "from-slate-700 via-gray-800 to-zinc-900",
    accent: "#f97316",
    features: ["Katalog armada", "Harga & paket sewa", "Cek ketersediaan", "Pemesanan online"],
    browser: [
      { w: "42%", c: "#f97316" }, { w: "28%", c: "#f97316aa" }, { w: "20%", c: "#f9731644" }
    ]
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
}

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
}

export function UmkmDemoSection() {
  return (
    <section className="py-24 bg-muted/40">
      <div className="container mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <span className="text-sm font-semibold tracking-widest uppercase text-primary">
              Demo Website UMKM
            </span>
            <h2
              className="mt-3 uppercase leading-[0.9] text-foreground"
              style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(48px, 7vw, 96px)" }}
            >
              Lihat Hasilnya
            </h2>
          </div>
          <p className="text-base text-muted-foreground max-w-xs leading-relaxed md:text-right">
            Contoh nyata website yang bisa kami bangun untuk bisnis Anda.
          </p>
        </motion.div>

        {/* Demo grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {demos.map((demo) => (
            <motion.div
              key={demo.name}
              variants={item}
              className="group flex flex-col rounded-2xl overflow-hidden bg-background shadow-sm hover:shadow-md hover:shadow-black/8 transition-all duration-300"
            >
              {/* Browser mockup preview */}
              <div className="relative overflow-hidden" style={{ height: 180 }}>
                {/* Browser chrome */}
                <div className="absolute top-0 left-0 right-0 h-7 z-10 flex items-center px-3 gap-1.5"
                  style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
                  <span className="w-2 h-2 rounded-full bg-red-400/80" />
                  <span className="w-2 h-2 rounded-full bg-yellow-400/80" />
                  <span className="w-2 h-2 rounded-full bg-green-400/80" />
                  <span className="ml-2 text-[9px] font-medium truncate flex-1"
                    style={{ color: "rgba(255,255,255,0.5)" }}>
                    nehandev.com{demo.href}
                  </span>
                </div>

                {/* Gradient "website" preview */}
                <div className={`absolute inset-0 bg-gradient-to-br ${demo.gradient}`} />
                <div className="absolute inset-0 flex flex-col gap-2 px-4 pt-10 pb-4">
                  {/* Fake headline bar */}
                  <div className="h-4 rounded-sm w-3/4" style={{ backgroundColor: "rgba(255,255,255,0.9)" }} />
                  <div className="h-2.5 rounded-sm w-1/2" style={{ backgroundColor: "rgba(255,255,255,0.5)" }} />
                  <div className="mt-2 flex gap-2">
                    {demo.browser.map((b, i) => (
                      <div key={i} className="h-6 rounded-md"
                        style={{ width: b.w, backgroundColor: b.c }} />
                    ))}
                  </div>
                  <div className="mt-1 flex gap-1.5">
                    {[55, 40, 50, 45].map((w, i) => (
                      <div key={i} className="h-1.5 rounded-full"
                        style={{ width: `${w}%`, backgroundColor: "rgba(255,255,255,0.25)" }} />
                    ))}
                  </div>
                  {/* Fake cards row */}
                  <div className="mt-auto flex gap-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="flex-1 rounded-lg"
                        style={{ height: 40, backgroundColor: "rgba(255,255,255,0.12)" }} />
                    ))}
                  </div>
                </div>

                {/* Live/Coming soon badge */}
                <div className="absolute top-9 right-3 z-10">
                  {demo.live ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "#22c55e", color: "#fff" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      LIVE
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "rgba(0,0,0,0.5)", color: "rgba(255,255,255,0.8)" }}>
                      <Clock className="w-2.5 h-2.5" />
                      Segera
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">{demo.name}</p>
                <h3 className="font-bold text-base text-foreground mb-2">{demo.brand}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{demo.desc}</p>

                {/* Feature tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {demo.features.map(f => (
                    <span key={f} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {f}
                    </span>
                  ))}
                </div>

                {demo.live ? (
                  <Link
                    href={demo.href}
                    className="inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 bg-primary text-white"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Lihat Demo
                  </Link>
                ) : (
                  <button
                    disabled
                    className="inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-muted text-muted-foreground cursor-not-allowed"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    Segera Hadir
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-base text-muted-foreground mt-10"
        >
          Ingin tipe website lain?{" "}
          <Link href="/contact" className="text-primary font-semibold hover:underline">
            Konsultasi gratis dengan kami →
          </Link>
        </motion.p>

      </div>
    </section>
  )
}
