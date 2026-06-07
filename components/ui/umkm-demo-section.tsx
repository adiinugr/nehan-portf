"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Clock } from "lucide-react"

const demos = [
  {
    name: "Travel & Wisata",
    brand: "Jelajah Nusantara",
    desc: "Website agen travel lengkap — destinasi, paket wisata, testimoni, dan booking WhatsApp.",
    href: "/demo/travel",
    live: true,
    image: "/images/demo-travel.png",
    accent: "#0ea5e9",
    features: [
      "Katalog destinasi",
      "Paket wisata 3 tier",
      "Galeri foto",
      "WhatsApp booking"
    ]
  },
  {
    name: "Hotel & Penginapan",
    brand: "Villa Sejuk Puncak",
    desc: "Website hotel premium dengan showcase kamar, galeri, harga, dan sistem reservasi langsung.",
    href: "/demo/hotel",
    live: true,
    image: "/images/demo-hotel.png",
    accent: "#d97706",
    features: [
      "Showcase kamar",
      "Galeri foto",
      "Sistem reservasi",
      "Direct booking"
    ]
  },
  {
    name: "Barbershop",
    brand: "Kings Barbershop",
    desc: "Website barbershop maskulin dan modern — layanan, harga, booking online, dan galeri hasil kerja.",
    href: "/demo/barbershop",
    live: true,
    image: "/images/demo-barbershop.png",
    accent: "#ef4444",
    features: [
      "Daftar layanan & harga",
      "Booking online",
      "Galeri potongan",
      "Lokasi & jam buka"
    ]
  },
  {
    name: "Rental Mobil",
    brand: "FastRide Rental",
    desc: "Website rental kendaraan dinamis — armada, harga sewa, cek ketersediaan, dan pemesanan mudah.",
    href: "/demo/rental",
    live: true,
    image: "/images/demo-rental.png",
    accent: "#f97316",
    features: [
      "Katalog armada",
      "Harga & paket sewa",
      "Cek ketersediaan",
      "Pemesanan online"
    ]
  }
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
}

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
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
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(48px, 7vw, 96px)"
              }}
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
                <div
                  className="absolute top-0 left-0 right-0 h-7 z-10 flex items-center px-3 gap-1.5"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.6)",
                    backdropFilter: "blur(4px)"
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-red-400/80" />
                  <span className="w-2 h-2 rounded-full bg-yellow-400/80" />
                  <span className="w-2 h-2 rounded-full bg-green-400/80" />
                  <span
                    className="ml-2 text-[9px] font-medium truncate flex-1"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    nehandev.com{demo.href}
                  </span>
                </div>

                {/* Real screenshot preview */}
                <Image
                  src={demo.image}
                  alt={`Tampilan website demo ${demo.brand}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                />

                {/* Brand-tinted depth gradient for cohesion + badge legibility */}
                <div
                  className="absolute inset-0 mix-blend-multiply opacity-40"
                  style={{
                    background: `linear-gradient(to bottom right, ${demo.accent}55, transparent 55%)`
                  }}
                />
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/55 to-transparent" />

                {/* Live/Coming soon badge */}
                <div className="absolute top-9 right-3 z-10">
                  {demo.live ? (
                    <span
                      className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "#22c55e", color: "#fff" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      LIVE
                    </span>
                  ) : (
                    <span
                      className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: "rgba(0,0,0,0.5)",
                        color: "rgba(255,255,255,0.8)"
                      }}
                    >
                      <Clock className="w-2.5 h-2.5" />
                      Segera
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                  {demo.name}
                </p>
                <h3 className="font-bold text-base text-foreground mb-2">
                  {demo.brand}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                  {demo.desc}
                </p>

                {/* Feature tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {demo.features.map((f) => (
                    <span
                      key={f}
                      className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-muted-foreground"
                    >
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
          <Link
            href="/contact"
            className="text-primary font-semibold hover:underline"
          >
            Konsultasi gratis dengan kami →
          </Link>
        </motion.p>
      </div>
    </section>
  )
}
