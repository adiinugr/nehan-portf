"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  MapPin, Phone, Mail, Instagram, Star, Users, Shield, Clock,
  ChevronRight, Menu, X, Search, Calendar, Wallet, ArrowRight
} from "lucide-react"

const WA = "https://wa.me/6281234567890?text=Halo%2C%20saya%20ingin%20tanya%20tentang%20paket%20wisata"

// ── Images (Unsplash) ─────────────────────────────────────────
const IMG = {
  hero:     "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1800&q=85&fit=crop",
  bali:     "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80&fit=crop",
  raja:     "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&q=80&fit=crop",
  labuan:   "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=800&q=80&fit=crop",
  lombok:   "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&q=80&fit=crop",
  bromo:    "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&q=80&fit=crop",
  wakatobi: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80&fit=crop",
  howItWorks: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&q=80&fit=crop",
}

// ── Data ──────────────────────────────────────────────────────
const destinations = [
  { name: "Bali", region: "Bali", tagline: "Pulau Surga", days: "3–7 Hari", img: IMG.bali, wide: true },
  { name: "Raja Ampat", region: "Papua Barat", tagline: "Surga Bawah Laut", days: "5–8 Hari", img: IMG.raja, wide: false },
  { name: "Bromo", region: "Jawa Timur", tagline: "Lautan Pasir Magis", days: "2–3 Hari", img: IMG.bromo, wide: false },
  { name: "Lombok", region: "Nusa Tenggara Barat", tagline: "Mutiara Nusa Tenggara", days: "3–5 Hari", img: IMG.lombok, wide: false },
  { name: "Labuan Bajo", region: "Nusa Tenggara Timur", tagline: "Tanah Komodo", days: "4–6 Hari", img: IMG.labuan, wide: true },
]

const packages = [
  {
    label: "07 Days", dates: "20 Aug – 27 Aug",
    name: "Bali Tour Package", price: "Rp 2.800.000",
    img: IMG.bali, rating: 4.8, reviews: 128,
  },
  {
    label: "05 Days", dates: "22 Aug – 27 Aug",
    name: "Raja Ampat Package", price: "Rp 4.500.000",
    img: IMG.raja, rating: 4.9, reviews: 94,
  },
  {
    label: "03 Days", dates: "25 Aug – 27 Aug",
    name: "Bromo Solo Package", price: "Rp 1.200.000",
    img: IMG.bromo, rating: 4.7, reviews: 210,
  },
]

const howSteps = [
  { n: "01", title: "Temukan Destinasi", desc: "Pilih destinasi impian dari ratusan pilihan wisata Indonesia." },
  { n: "02", title: "Pesan Paket", desc: "Pilih paket yang sesuai budget dan durasi perjalanan Anda." },
  { n: "03", title: "Lakukan Pembayaran", desc: "Bayar via transfer atau QRIS dengan aman dan mudah." },
  { n: "04", title: "Berangkat!", desc: "Nikmati perjalanan impian Anda bersama Jelajah Nusantara." },
]

const testimonials = [
  { name: "Sarah Rahmawati", role: "Traveler · Jakarta", text: "Perjalanan ke Raja Ampat bersama Jelajah Nusantara luar biasa! Semua terorganisir rapi dan guide-nya sangat berpengetahuan luas.", rating: 5, img: "" },
  { name: "Budi Santoso", role: "Fotografer · Surabaya", text: "Paket Bromo sunrise yang ditawarkan sangat worth it. Spot foto terbaik, waktu tepat, dan pemandangan yang tak terlupakan.", rating: 5, img: "" },
  { name: "Citra Dewi", role: "Content Creator · Bandung", text: "Itinerary Bali-nya padat tapi tidak melelahkan. Tim support sangat responsif, bahkan saat saya tiba-tiba minta perubahan jadwal.", rating: 5, img: "" },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
  })
}

// ── Component ─────────────────────────────────────────────────
export default function TravelDemo() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const FONT_SERIF = "var(--font-playfair, 'Georgia', serif)"
  const FONT_SANS  = "var(--font-dm-sans, sans-serif)"
  const GREEN      = "#2b5d4f"
  const GOLD       = "#c9a84c"
  const BG         = "#f7f6f2"

  return (
    <div style={{ fontFamily: FONT_SANS, color: "#1a1a1a", backgroundColor: "#ffffff" }}>

      {/* ── HEADER ── */}
      <header
        className="fixed top-[40px] left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
          boxShadow: scrolled ? "0 1px 24px rgba(0,0,0,0.07)" : "none",
          backdropFilter: scrolled ? "blur(16px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex h-16 items-center justify-between">
          <span className="font-bold text-lg tracking-tight" style={{ fontFamily: FONT_SERIF, color: scrolled ? "#1a1a1a" : "#ffffff" }}>
            Jelajah<span style={{ color: GOLD }}>Nusantara</span>
          </span>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {["Destinasi", "Paket", "Tentang", "Kontak"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="transition-opacity hover:opacity-60"
                style={{ color: scrolled ? "#374151" : "rgba(255,255,255,0.9)" }}>
                {item}
              </a>
            ))}
          </nav>

          <a href={WA} target="_blank" rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: GREEN }}>
            Booking Sekarang
          </a>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: scrolled ? "#1a1a1a" : "#ffffff" }}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white px-6 py-4 flex flex-col gap-4 shadow-lg">
            {["Destinasi", "Paket", "Tentang", "Kontak"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-gray-700"
                onClick={() => setMenuOpen(false)}>{item}</a>
            ))}
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="py-2.5 rounded-full text-sm font-bold text-white text-center"
              style={{ backgroundColor: GREEN }}>Booking Sekarang</a>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[700px] flex flex-col justify-end overflow-hidden">
        {/* Full-bleed photo */}
        <Image
          src={IMG.hero}
          alt="Jelajahi Keindahan Indonesia"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.6) 100%)" }} />

        {/* Text */}
        <div className="relative max-w-7xl mx-auto px-6 pb-32 w-full">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.8)" }}>
              Agen Perjalanan Terpercaya Sejak 2015
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] max-w-3xl mb-6"
              style={{ fontFamily: FONT_SERIF }}>
              Keajaiban alam dan pesona budaya{" "}
              <em style={{ color: GOLD }}>Indonesia.</em>
            </h1>
            <p className="text-lg text-white/80 max-w-xl mb-10">
              Menjelajahi Indonesia adalah petualangan yang tak terlupakan.
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-4 flex flex-col md:flex-row gap-3 max-w-2xl"
          >
            <div className="flex items-center gap-3 flex-1 px-3">
              <Calendar className="w-4 h-4 shrink-0" style={{ color: GREEN }} />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Tanggal</p>
                <p className="text-sm font-medium text-gray-700">Pilih tanggal</p>
              </div>
            </div>
            <div className="hidden md:block w-px bg-gray-200 my-1" />
            <div className="flex items-center gap-3 flex-1 px-3">
              <Wallet className="w-4 h-4 shrink-0" style={{ color: GREEN }} />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Budget</p>
                <p className="text-sm font-medium text-gray-700">Semua harga</p>
              </div>
            </div>
            <div className="hidden md:block w-px bg-gray-200 my-1" />
            <div className="flex items-center gap-3 flex-1 px-3">
              <Users className="w-4 h-4 shrink-0" style={{ color: GREEN }} />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Peserta</p>
                <p className="text-sm font-medium text-gray-700">2 orang</p>
              </div>
            </div>
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: GREEN }}
            >
              <Search className="w-4 h-4" />
              Cari
            </button>
          </motion.div>
        </div>

        {/* Stats strip */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-4 gap-px bg-gray-200 rounded-t-2xl overflow-hidden shadow-xl"
            >
              {[
                ["10M+", "Total Pelanggan"],
                ["09+", "Tahun Pengalaman"],
                ["12K", "Destinasi"],
                ["5.0", "Rating Rata-rata"],
              ].map(([val, label]) => (
                <div key={label} className="bg-white px-6 py-5 text-center">
                  <p className="text-2xl font-bold" style={{ fontFamily: FONT_SERIF, color: GREEN }}>{val}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DESTINASI ── */}
      <section id="destinasi" className="py-24" style={{ backgroundColor: BG }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: GREEN }}>Lokasi Terbaik</p>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight" style={{ fontFamily: FONT_SERIF }}>
                Wisata Indonesia
              </h2>
            </div>
            <p className="text-base text-gray-500 max-w-xs leading-relaxed">
              Keindahan alam yang luar biasa, budaya yang kaya, dan keramahan masyarakat lokal.
            </p>
          </motion.div>

          {/* Masonry grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {destinations.map((dest, i) => (
              <motion.div
                key={dest.name}
                variants={fadeUp} custom={i * 0.08} initial="hidden" whileInView="show" viewport={{ once: true }}
                className={`relative group overflow-hidden rounded-2xl cursor-pointer ${dest.wide ? "md:col-span-2" : ""}`}
                style={{ height: dest.wide ? "320px" : "240px" }}
              >
                <Image
                  src={dest.img}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes={dest.wide ? "66vw" : "33vw"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-xs font-medium text-white/70 mb-1">
                    <MapPin className="w-3 h-3 inline mr-1" />{dest.region}
                  </p>
                  <h3 className="text-xl font-bold text-white" style={{ fontFamily: FONT_SERIF }}>{dest.name}</h3>
                  <p className="text-sm text-white/70">{dest.tagline}</p>
                </div>

                {/* Duration badge */}
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                    style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)" }}>
                    <Clock className="w-3 h-3 inline mr-1" />{dest.days}
                  </span>
                </div>

                {/* Hover CTA */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href={WA} target="_blank" rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: GREEN }}
                    onClick={e => e.stopPropagation()}>
                    Lihat Paket →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAKET WISATA ── */}
      <section id="paket" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: GREEN }}>Paket Wisata</p>
              <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: FONT_SERIF }}>
                Destinasi Wisata Kami
              </h2>
            </div>
            <p className="text-base text-gray-500 max-w-xs leading-relaxed">
              Paket wisata menawarkan perpaduan unik keindahan alam dan kekayaan budaya.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                variants={fadeUp} custom={i * 0.1} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="group rounded-2xl overflow-hidden bg-white cursor-pointer"
                style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.08)" }}
              >
                {/* Photo */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={pkg.img}
                    alt={pkg.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* Duration & dates badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                      style={{ backgroundColor: GREEN }}>{pkg.label}</span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="text-xs font-medium text-white/80">{pkg.dates}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-base" style={{ fontFamily: FONT_SERIF }}>{pkg.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-semibold">{pkg.rating}</span>
                      <span>({pkg.reviews})</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <p className="text-xs text-gray-400">Mulai dari</p>
                      <p className="text-lg font-bold" style={{ color: GREEN, fontFamily: FONT_SERIF }}>{pkg.price}</p>
                    </div>
                    <a href={WA} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90"
                      style={{ backgroundColor: GREEN }}>
                      Pesan <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24" style={{ backgroundColor: BG }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Photo */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="relative h-[520px] rounded-3xl overflow-hidden"
            >
              <Image
                src={IMG.howItWorks}
                alt="Cara Kerja"
                fill
                className="object-cover"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>

            {/* Steps */}
            <motion.div
              variants={fadeUp} custom={0.1} initial="hidden" whileInView="show" viewport={{ once: true }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GREEN }}>Cara Kerja</p>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: FONT_SERIF }}>
                Satu klik untuk{" "}
                <em style={{ color: GOLD }}>Anda.</em>
              </h2>
              <p className="text-base text-gray-500 leading-relaxed mb-10">
                Mulai perjalanan impian Anda dengan cara yang mudah, cepat, dan terpercaya.
              </p>

              <div className="flex flex-col gap-7">
                {howSteps.map((s, i) => (
                  <motion.div
                    key={s.n}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex items-start gap-5"
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-sm text-white"
                      style={{ backgroundColor: i === 0 ? GREEN : "#e5e7eb", color: i === 0 ? "#fff" : "#9ca3af" }}>
                      {s.n}
                    </div>
                    <div>
                      <h4 className="font-bold text-base mb-1" style={{ fontFamily: FONT_SERIF }}>{s.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONI ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: GREEN }}>Testimoni</p>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: FONT_SERIF }}>
              Kata Pelanggan Kami
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeUp} custom={i * 0.1} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="rounded-2xl p-6 flex flex-col gap-4"
                style={{ backgroundColor: BG }}
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-base text-gray-600 leading-relaxed flex-1 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid #e5e7eb" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white"
                    style={{ backgroundColor: GREEN }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ fontFamily: FONT_SERIF }}>{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-28 relative overflow-hidden"
        style={{ backgroundColor: GREEN }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url(${IMG.bali})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative max-w-7xl mx-auto px-6 text-center text-white">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-4" style={{ fontFamily: FONT_SERIF }}>
              Siap Memulai{" "}
              <em style={{ color: GOLD }}>Petualangan?</em>
            </h2>
            <p className="text-lg text-white/80 max-w-xl mx-auto mb-10">
              Hubungi kami sekarang dan dapatkan konsultasi perjalanan gratis. Wujudkan liburan impian Anda!
            </p>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105"
              style={{ backgroundColor: GOLD, color: "#1a1a1a", boxShadow: `0 8px 32px rgba(201,168,76,0.4)` }}>
              Chat WhatsApp Sekarang
              <ChevronRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="kontak" className="py-14 px-6" style={{ backgroundColor: "#111" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
            <div className="max-w-xs">
              <p className="text-xl font-bold mb-3" style={{ fontFamily: FONT_SERIF, color: "#f5f5f0" }}>
                Jelajah<span style={{ color: GOLD }}>Nusantara</span>
              </p>
              <p className="text-sm leading-relaxed text-gray-400">
                Agen perjalanan domestik terpercaya. Kami membawa Anda menikmati keajaiban Indonesia.
              </p>
            </div>
            <div className="flex gap-14">
              <div>
                <p className="text-sm font-bold text-white mb-4">Destinasi</p>
                {["Bali", "Raja Ampat", "Labuan Bajo", "Lombok", "Bromo"].map(d => (
                  <p key={d} className="text-sm text-gray-400 mb-2">{d}</p>
                ))}
              </div>
              <div>
                <p className="text-sm font-bold text-white mb-4">Kontak</p>
                <p className="flex items-center gap-2 text-sm text-gray-400 mb-2"><Phone className="w-3.5 h-3.5" />+62 812-3456-7890</p>
                <p className="flex items-center gap-2 text-sm text-gray-400 mb-2"><Mail className="w-3.5 h-3.5" />info@jelajahnusantara.id</p>
                <p className="flex items-center gap-2 text-sm text-gray-400"><Instagram className="w-3.5 h-3.5" />@jelajahnusantara</p>
              </div>
            </div>
          </div>
          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <p>© 2025 Jelajah Nusantara. Hak cipta dilindungi.</p>
            <p>Website oleh{" "}
              <a href="https://nehandev.com" className="font-bold transition-colors hover:text-white" style={{ color: "#818cf8" }}>
                NehanDev
              </a>
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}
