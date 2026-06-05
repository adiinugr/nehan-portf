"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Link from "next/link"
import {
  MapPin, Phone, Mail, Instagram, Star, Users, Shield, Clock,
  ChevronRight, Menu, X, Plane, Mountain, Waves, Camera
} from "lucide-react"

const WA_LINK = "https://wa.me/6281234567890?text=Halo%2C%20saya%20ingin%20tanya%20tentang%20paket%20wisata"

// ─── Data ───────────────────────────────────────────────

const destinations = [
  {
    name: "Bali",
    tagline: "Pulau Surga",
    duration: "3–7 Hari",
    price: "Rp 1.800.000",
    gradient: "from-orange-400 via-amber-500 to-yellow-600",
    emoji: "🌅",
  },
  {
    name: "Raja Ampat",
    tagline: "Surga Bawah Laut",
    duration: "5–8 Hari",
    price: "Rp 4.500.000",
    gradient: "from-cyan-500 via-teal-600 to-blue-800",
    emoji: "🐠",
  },
  {
    name: "Labuan Bajo",
    tagline: "Tanah Komodo",
    duration: "4–6 Hari",
    price: "Rp 3.200.000",
    gradient: "from-violet-500 via-purple-600 to-indigo-800",
    emoji: "🦎",
  },
  {
    name: "Lombok",
    tagline: "Mutiara Nusa Tenggara",
    duration: "3–5 Hari",
    price: "Rp 2.100.000",
    gradient: "from-emerald-400 via-teal-500 to-cyan-700",
    emoji: "🏖️",
  },
  {
    name: "Gunung Bromo",
    tagline: "Lautan Pasir Magis",
    duration: "2–3 Hari",
    price: "Rp 950.000",
    gradient: "from-orange-600 via-red-700 to-stone-800",
    emoji: "🌋",
  },
  {
    name: "Wakatobi",
    tagline: "Taman Laut Dunia",
    duration: "5–7 Hari",
    price: "Rp 5.200.000",
    gradient: "from-sky-400 via-cyan-500 to-teal-600",
    emoji: "🤿",
  },
]

const packages = [
  {
    name: "Paket Hemat",
    badge: "Terlaris",
    price: "Rp 1.500.000",
    per: "/ orang",
    color: "from-teal-500 to-cyan-600",
    features: [
      "Transportasi PP dari kota asal",
      "Akomodasi 2★–3★",
      "Makan 3x sehari",
      "Tour guide lokal",
      "Tiket destinasi utama",
    ],
    cta: "Pesan Sekarang",
  },
  {
    name: "Paket Standar",
    badge: "Populer",
    price: "Rp 2.800.000",
    per: "/ orang",
    color: "from-amber-500 to-orange-600",
    highlight: true,
    features: [
      "Semua di Paket Hemat +",
      "Akomodasi 3★–4★",
      "Free welcome drink",
      "Dokumentasi foto & video",
      "Asuransi perjalanan",
      "Free 1 aktivitas tambahan",
    ],
    cta: "Pesan Sekarang",
  },
  {
    name: "Paket Premium",
    badge: "All Inclusive",
    price: "Rp 5.500.000",
    per: "/ orang",
    color: "from-violet-500 to-purple-700",
    features: [
      "Semua di Paket Standar +",
      "Akomodasi 4★–5★",
      "Private tour guide",
      "Spa & wellness session",
      "Airport transfer VIP",
      "Aktivitas unlimited",
    ],
    cta: "Pesan Sekarang",
  },
]

const testimonials = [
  {
    name: "Sari Dewi",
    origin: "Jakarta",
    text: "Perjalanan ke Raja Ampat bersama Jelajah Nusantara benar-benar luar biasa! Semua terorganisir dengan rapi, guide-nya ramah dan berpengetahuan luas. Pasti akan kembali!",
    rating: 5,
    destination: "Raja Ampat",
  },
  {
    name: "Budi Santoso",
    origin: "Surabaya",
    text: "Paket Standar ke Bali sangat worth it. Hotelnya bagus, makanan enak, dan itinerary-nya padat tapi tidak melelahkan. Rekomen banget untuk keluarga!",
    rating: 5,
    destination: "Bali",
  },
  {
    name: "Rini Ayu",
    origin: "Bandung",
    text: "Baru pertama kali solo traveling dan milih Jelajah Nusantara — keputusan terbaik! Tim mereka sangat membantu dari awal sampai akhir perjalanan ke Labuan Bajo.",
    rating: 5,
    destination: "Labuan Bajo",
  },
]

const whyUs = [
  { icon: Shield, title: "Terpercaya & Berlisensi", desc: "Terdaftar di ASITA dan memiliki izin resmi sebagai agen perjalanan." },
  { icon: Users, title: "10.000+ Wisatawan Puas", desc: "Ribuan pelanggan telah mempercayakan perjalanan mereka kepada kami sejak 2015." },
  { icon: Clock, title: "Layanan 24 Jam", desc: "Tim kami siap membantu Anda kapan saja, termasuk saat dalam perjalanan." },
  { icon: Camera, title: "Dokumentasi Gratis", desc: "Setiap paket termasuk dokumentasi foto profesional sebagai kenang-kenangan." },
]

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
  })
}

// ─── Component ───────────────────────────────────────────

export default function TravelDemo() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div style={{ fontFamily: "'Syne', system-ui, sans-serif", color: "#1a1a2e" }}>

      {/* ── HEADER ── */}
      <header
        className="sticky z-50 w-full transition-all duration-300"
        style={{
          top: "0",
          backgroundColor: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
          boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.08)" : "none",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <div className="container mx-auto px-5 flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#0d6e7a,#0ea5b5)" }}>
              <Plane className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg" style={{ color: scrolled ? "#0d6e7a" : "#ffffff" }}>
              Jelajah<span style={{ color: "#f59e0b" }}>Nusantara</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {["Destinasi", "Paket", "Tentang", "Kontak"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="transition-colors hover:opacity-70"
                style={{ color: scrolled ? "#374151" : "rgba(255,255,255,0.85)" }}
              >{item}</a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 rounded-full text-sm font-bold text-white transition-transform hover:scale-105"
              style={{ background: "linear-gradient(135deg,#f59e0b,#ea580c)" }}
            >
              Booking Sekarang
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: scrolled ? "#374151" : "#ffffff" }}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white px-5 py-4 flex flex-col gap-3 shadow-lg">
            {["Destinasi", "Paket", "Tentang", "Kontak"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="text-gray-700 font-medium py-1"
                onClick={() => setMenuOpen(false)}
              >{item}</a>
            ))}
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="mt-2 px-4 py-2.5 rounded-full text-sm font-bold text-white text-center"
              style={{ background: "linear-gradient(135deg,#f59e0b,#ea580c)" }}
            >Booking Sekarang</a>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          minHeight: "92vh",
          background: "linear-gradient(135deg, #061c21 0%, #0d4f5c 40%, #0e7490 70%, #164e63 100%)",
        }}
      >
        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle,#f59e0b,transparent)" }} />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle,#22d3ee,transparent)" }} />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

        <div className="relative container mx-auto px-5 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold mb-6"
              style={{ backgroundColor: "rgba(245,158,11,0.2)", color: "#fcd34d", border: "1px solid rgba(245,158,11,0.3)" }}>
              <MapPin className="w-3.5 h-3.5" />
              Agen Perjalanan Terpercaya Sejak 2015
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-black uppercase leading-none mb-6"
            style={{
              fontFamily: "var(--font-bebas, 'Bebas Neue', sans-serif)",
              fontSize: "clamp(56px, 10vw, 140px)",
              textShadow: "0 4px 40px rgba(0,0,0,0.3)"
            }}
          >
            Jelajahi Keindahan
            <br />
            <span style={{ color: "#fbbf24" }}>Nusantara</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            Dari Sabang sampai Merauke — kami siap membawa Anda menikmati keajaiban Indonesia dengan paket wisata terbaik.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#destinasi"
              className="px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105 hover:shadow-xl"
              style={{ background: "linear-gradient(135deg,#f59e0b,#ea580c)", color: "#fff", boxShadow: "0 8px 32px rgba(245,158,11,0.4)" }}
            >
              Lihat Destinasi
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", backdropFilter: "blur(8px)" }}
            >
              Konsultasi Gratis →
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 flex flex-wrap justify-center gap-8"
          >
            {[["10.000+", "Wisatawan Puas"], ["50+", "Destinasi"], ["9 Tahun", "Pengalaman"], ["4.9/5", "Rating"]].map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-black" style={{ color: "#fbbf24", fontFamily: "var(--font-bebas,'Bebas Neue',sans-serif)" }}>{val}</div>
                <div className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full" style={{ display: "block" }}>
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* ── DESTINASI ── */}
      <section id="destinasi" className="py-24 px-5" style={{ backgroundColor: "#f9fafb" }}>
        <div className="container mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#0d6e7a" }}>Destinasi</span>
            <h2 className="mt-2 font-black uppercase leading-none"
              style={{ fontFamily: "var(--font-bebas,'Bebas Neue',sans-serif)", fontSize: "clamp(40px,6vw,80px)", color: "#0a1628" }}>
              Destinasi Populer
            </h2>
            <p className="mt-3 text-base max-w-md mx-auto" style={{ color: "#6b7280" }}>
              Pilihan destinasi terfavorit wisatawan Indonesia — dari pantai tropis hingga pegunungan eksotis.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {destinations.map((dest, i) => (
              <motion.div
                key={dest.name}
                variants={fadeUp} custom={i * 0.08} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
                style={{ height: "260px" }}
              >
                {/* Gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${dest.gradient} transition-transform duration-700 group-hover:scale-110`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Emoji */}
                <div className="absolute top-5 right-5 text-4xl">{dest.emoji}</div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-sm font-medium mb-0.5" style={{ color: "rgba(255,255,255,0.75)" }}>{dest.tagline}</p>
                  <h3 className="text-2xl font-black text-white"
                    style={{ fontFamily: "var(--font-bebas,'Bebas Neue',sans-serif)" }}>
                    {dest.name}
                  </h3>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                      <Clock className="w-3.5 h-3.5 inline mr-1" />{dest.duration}
                    </span>
                    <span className="text-sm font-bold text-white">
                      Mulai {dest.price}
                    </span>
                  </div>
                </div>

                {/* Hover CTA */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full font-bold text-sm"
                    style={{ backgroundColor: "#f59e0b", color: "#fff" }}
                    onClick={e => e.stopPropagation()}
                  >
                    Tanya Paket →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAKET ── */}
      <section id="paket" className="py-24 px-5 bg-white">
        <div className="container mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#0d6e7a" }}>Paket Wisata</span>
            <h2 className="mt-2 font-black uppercase leading-none"
              style={{ fontFamily: "var(--font-bebas,'Bebas Neue',sans-serif)", fontSize: "clamp(40px,6vw,80px)", color: "#0a1628" }}>
              Pilih Paket Anda
            </h2>
            <p className="mt-3 text-base max-w-md mx-auto" style={{ color: "#6b7280" }}>
              Semua paket bisa dikustomisasi sesuai kebutuhan dan budget Anda.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                variants={fadeUp} custom={i * 0.1} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="rounded-2xl overflow-hidden flex flex-col relative"
                style={{
                  boxShadow: pkg.highlight ? "0 20px 60px rgba(245,158,11,0.2)" : "0 4px 20px rgba(0,0,0,0.06)",
                  border: pkg.highlight ? "2px solid #f59e0b" : "1px solid #f0f0f0",
                  transform: pkg.highlight ? "scale(1.03)" : "scale(1)"
                }}
              >
                {/* Header */}
                <div className={`bg-gradient-to-br ${pkg.color} p-6 text-white`}>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-black" style={{ fontFamily: "var(--font-bebas,'Bebas Neue',sans-serif)", fontSize: "28px" }}>
                      {pkg.name}
                    </h3>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/20">{pkg.badge}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black">{pkg.price}</span>
                    <span className="text-sm opacity-80">{pkg.per}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="p-6 flex flex-col flex-1 bg-white">
                  <ul className="space-y-3 flex-1">
                    {pkg.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "#374151" }}>
                        <span className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                          style={{ backgroundColor: "#dcfce7", color: "#16a34a", fontSize: "10px", fontWeight: "bold" }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={WA_LINK} target="_blank" rel="noopener noreferrer"
                    className="mt-6 block text-center py-3 rounded-xl font-bold text-base transition-all hover:scale-105"
                    style={pkg.highlight
                      ? { background: "linear-gradient(135deg,#f59e0b,#ea580c)", color: "#fff" }
                      : { backgroundColor: "#f9fafb", color: "#0d6e7a", border: "1px solid #e5e7eb" }}
                  >
                    {pkg.cta}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-sm mt-8" style={{ color: "#9ca3af" }}>
            Harga belum termasuk biaya penerbangan. Hubungi kami untuk penawaran custom.
          </p>
        </div>
      </section>

      {/* ── KENAPA KAMI ── */}
      <section className="py-24 px-5" style={{ backgroundColor: "#f0fdff" }}>
        <div className="container mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#0d6e7a" }}>Keunggulan</span>
            <h2 className="mt-2 font-black uppercase leading-none"
              style={{ fontFamily: "var(--font-bebas,'Bebas Neue',sans-serif)", fontSize: "clamp(40px,6vw,80px)", color: "#0a1628" }}>
              Kenapa Pilih Kami?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                variants={fadeUp} custom={i * 0.1} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="rounded-2xl p-6 bg-white shadow-sm text-center"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "linear-gradient(135deg,#e0f7fa,#b2ebf2)", color: "#0d6e7a" }}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: "#0a1628" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONI ── */}
      <section className="py-24 px-5 bg-white">
        <div className="container mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#0d6e7a" }}>Testimoni</span>
            <h2 className="mt-2 font-black uppercase leading-none"
              style={{ fontFamily: "var(--font-bebas,'Bebas Neue',sans-serif)", fontSize: "clamp(40px,6vw,80px)", color: "#0a1628" }}>
              Kata Mereka
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeUp} custom={i * 0.1} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="rounded-2xl p-6 flex flex-col gap-4"
                style={{ backgroundColor: "#f9fafb", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-base leading-relaxed flex-1" style={{ color: "#374151" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-3" style={{ borderTop: "1px solid #e5e7eb" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white"
                    style={{ background: "linear-gradient(135deg,#0d6e7a,#0ea5b5)" }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: "#0a1628" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: "#9ca3af" }}>{t.origin} · {t.destination}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section
        className="py-24 px-5 text-white text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#061c21 0%,#0d4f5c 50%,#0e7490 100%)" }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%,#f59e0b 0%,transparent 60%),radial-gradient(circle at 80% 50%,#22d3ee 0%,transparent 60%)" }} />
        <div className="relative container mx-auto max-w-2xl">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            <Waves className="w-10 h-10 mx-auto mb-4 text-amber-400" />
            <h2 className="font-black uppercase leading-none mb-4"
              style={{ fontFamily: "var(--font-bebas,'Bebas Neue',sans-serif)", fontSize: "clamp(40px,6vw,72px)" }}>
              Siap Mulai <span style={{ color: "#fbbf24" }}>Petualangan</span> Anda?
            </h2>
            <p className="text-base mb-8" style={{ color: "rgba(255,255,255,0.8)" }}>
              Hubungi kami sekarang dan dapatkan konsultasi perjalanan gratis. Kami bantu wujudkan liburan impian Anda!
            </p>
            <a
              href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg,#f59e0b,#ea580c)", color: "#fff", boxShadow: "0 8px 32px rgba(245,158,11,0.4)" }}
            >
              Chat WhatsApp Sekarang
              <ChevronRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="kontak" className="py-12 px-5" style={{ backgroundColor: "#0a1628", color: "#94a3b8" }}>
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-10 mb-8">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#0d6e7a,#0ea5b5)" }}>
                  <Plane className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg" style={{ color: "#f1f5f9" }}>
                  Jelajah<span style={{ color: "#f59e0b" }}>Nusantara</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed">
                Agen perjalanan wisata domestik terpercaya. Wujudkan liburan impian Anda bersama kami.
              </p>
            </div>

            <div className="flex gap-12">
              <div>
                <p className="text-sm font-bold text-white mb-3">Destinasi</p>
                {["Bali", "Raja Ampat", "Labuan Bajo", "Lombok", "Bromo"].map(d => (
                  <p key={d} className="text-sm mb-2">{d}</p>
                ))}
              </div>
              <div>
                <p className="text-sm font-bold text-white mb-3">Kontak</p>
                <div className="flex items-center gap-2 text-sm mb-2"><Phone className="w-3.5 h-3.5" /><span>+62 812-3456-7890</span></div>
                <div className="flex items-center gap-2 text-sm mb-2"><Mail className="w-3.5 h-3.5" /><span>info@jelajahnusantara.id</span></div>
                <div className="flex items-center gap-2 text-sm"><Instagram className="w-3.5 h-3.5" /><span>@jelajahnusantara</span></div>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p>© 2025 Jelajah Nusantara. Hak cipta dilindungi.</p>
            <p>
              Website oleh{" "}
              <a href="https://nehandev.com" className="font-bold hover:text-white transition-colors" style={{ color: "#818cf8" }}>
                NehanDev
              </a>
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}
