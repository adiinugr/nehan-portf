"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Star,
  Users,
  Clock,
  ChevronRight,
  Menu,
  X,
  Search,
  Calendar,
  Wallet,
  ArrowRight,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  SlidersHorizontal
} from "lucide-react"

// ── NehanDev WA ───────────────────────────────────────────────
const NEHAN_WA = "62895335501192"
const wa = (msg: string) =>
  `https://wa.me/${NEHAN_WA}?text=${encodeURIComponent(msg)}`
const WA_GENERAL = wa(
  "Halo NehanDev, saya tertarik membuat website travel seperti demo ini untuk bisnis saya."
)
const waPackage = (name: string) =>
  wa(
    `Halo NehanDev, saya ingin demo website travel. Saya tertarik dengan contoh paket "${name}". Bisakah website seperti ini dibuat untuk bisnis saya?`
  )

// ── Images (local) ───────────────────────────────────────────
const IMG = {
  hero: "/images/demo/travel/hero.jpg",
  bali: "/images/demo/travel/bali.jpg",
  raja: "/images/demo/travel/raja-ampat.jpg",
  labuan: "/images/demo/travel/labuan-bajo.jpg",
  lombok: "/images/demo/travel/lombok.jpg",
  bromo: "/images/demo/travel/bromo.jpg",
  wakatobi: "/images/demo/travel/wakatobi.jpg",
  howItWorks: "/images/demo/travel/how-it-works.jpg"
}

// ── Data ──────────────────────────────────────────────────────
const destinations = [
  {
    name: "Bali",
    region: "Bali",
    tagline: "Pulau Surga",
    days: "3–7 Hari",
    img: IMG.bali,
    wide: true
  },
  {
    name: "Raja Ampat",
    region: "Papua Barat",
    tagline: "Surga Bawah Laut",
    days: "5–8 Hari",
    img: IMG.raja,
    wide: false
  },
  {
    name: "Bromo",
    region: "Jawa Timur",
    tagline: "Lautan Pasir Magis",
    days: "2–3 Hari",
    img: IMG.bromo,
    wide: false
  },
  {
    name: "Lombok",
    region: "Nusa Tenggara Barat",
    tagline: "Mutiara NTB",
    days: "3–5 Hari",
    img: IMG.lombok,
    wide: false
  },
  {
    name: "Labuan Bajo",
    region: "Nusa Tenggara Timur",
    tagline: "Tanah Komodo",
    days: "4–6 Hari",
    img: IMG.labuan,
    wide: true
  }
]

type Package = {
  id: string
  label: string
  dates: string
  name: string
  price: number
  priceLabel: string
  img: string
  rating: number
  reviews: number
  dest: string
  days: number
  seats: number
  departures: string[]
  includes: string[]
}
const packages: Package[] = [
  {
    id: "bali-3d",
    label: "03 Hari",
    dates: "Tersedia setiap Sabtu",
    name: "Bali Express Package",
    price: 1800000,
    priceLabel: "Rp 1.800.000",
    img: IMG.bali,
    rating: 4.8,
    reviews: 128,
    dest: "Bali",
    days: 3,
    seats: 4,
    departures: ["14 Jun", "21 Jun", "28 Jun", "5 Jul"],
    includes: ["Hotel 3★", "Makan 3x", "Tour guide", "Tiket masuk"]
  },
  {
    id: "bali-7d",
    label: "07 Hari",
    dates: "20 Jun – 27 Jun",
    name: "Bali Full Experience",
    price: 2800000,
    priceLabel: "Rp 2.800.000",
    img: IMG.bali,
    rating: 4.9,
    reviews: 213,
    dest: "Bali",
    days: 7,
    seats: 2,
    departures: ["20 Jun", "4 Jul", "18 Jul"],
    includes: [
      "Hotel 4★",
      "Makan 3x",
      "Tour guide",
      "Tiket masuk",
      "Dokumentasi",
      "Asuransi"
    ]
  },
  {
    id: "raja-5d",
    label: "05 Hari",
    dates: "22 Jun – 27 Jun",
    name: "Raja Ampat Diving Package",
    price: 4500000,
    priceLabel: "Rp 4.500.000",
    img: IMG.raja,
    rating: 4.9,
    reviews: 94,
    dest: "Raja Ampat",
    days: 5,
    seats: 6,
    departures: ["22 Jun", "6 Jul", "20 Jul"],
    includes: [
      "Resort tepi laut",
      "Full board",
      "Snorkeling gear",
      "Speed boat",
      "Asuransi"
    ]
  },
  {
    id: "bromo-2d",
    label: "02 Hari",
    dates: "Tersedia setiap weekend",
    name: "Bromo Sunrise Tour",
    price: 950000,
    priceLabel: "Rp 950.000",
    img: IMG.bromo,
    rating: 4.7,
    reviews: 310,
    dest: "Bromo",
    days: 2,
    seats: 8,
    departures: ["15 Jun", "22 Jun", "29 Jun", "6 Jul", "13 Jul"],
    includes: ["Penginapan 1 malam", "Jeep 4WD", "Tour guide", "Makan pagi"]
  },
  {
    id: "lombok-4d",
    label: "04 Hari",
    dates: "Tersedia setiap Jumat",
    name: "Lombok Island Hopping",
    price: 2100000,
    priceLabel: "Rp 2.100.000",
    img: IMG.lombok,
    rating: 4.8,
    reviews: 167,
    dest: "Lombok",
    days: 4,
    seats: 5,
    departures: ["20 Jun", "27 Jun", "4 Jul", "11 Jul"],
    includes: [
      "Hotel 3★",
      "Boat trip Gili",
      "Snorkeling",
      "Makan 3x",
      "Tour guide"
    ]
  },
  {
    id: "labuan-5d",
    label: "05 Hari",
    dates: "25 Jun – 30 Jun",
    name: "Labuan Bajo Komodo Tour",
    price: 3200000,
    priceLabel: "Rp 3.200.000",
    img: IMG.labuan,
    rating: 4.9,
    reviews: 142,
    dest: "Labuan Bajo",
    days: 5,
    seats: 3,
    departures: ["25 Jun", "9 Jul", "23 Jul"],
    includes: [
      "Hotel 3★",
      "Kapal LiveAboard",
      "Diving/Snorkeling",
      "Makan 3x",
      "Asuransi"
    ]
  }
]

const faqItems = [
  {
    q: "Apakah harga sudah termasuk tiket pesawat?",
    a: "Harga paket belum termasuk tiket pesawat PP dari kota asal Anda. Tim kami siap membantu pencarian tiket terbaik jika diperlukan. Hubungi kami untuk paket all-in termasuk penerbangan."
  },
  {
    q: "Bagaimana cara melakukan pembayaran?",
    a: "Pembayaran dapat dilakukan via transfer bank (BCA, Mandiri, BNI) atau QRIS. Down payment 50% untuk konfirmasi booking, sisa 50% dilunasi H-7 keberangkatan."
  },
  {
    q: "Apakah ada kebijakan pembatalan?",
    a: "Pembatalan lebih dari 14 hari sebelum keberangkatan: refund 75%. Pembatalan 7–14 hari sebelumnya: refund 50%. Kurang dari 7 hari: tidak ada refund. Kami sarankan untuk membeli asuransi perjalanan."
  },
  {
    q: "Berapa minimal peserta per grup?",
    a: "Paket open trip minimal 4 peserta. Untuk private trip, tersedia untuk minimum 2 orang dengan biaya yang disesuaikan. Hubungi kami untuk penawaran private tour."
  },
  {
    q: "Apakah anak-anak bisa ikut?",
    a: "Ya, anak-anak di bawah 3 tahun gratis (tidak termasuk tiket masuk). Usia 3–12 tahun mendapat potongan 25% dari harga dewasa. Beberapa destinasi memiliki batasan usia tersendiri."
  },
  {
    q: "Apa yang harus dibawa?",
    a: "Kami akan memberikan packing list lengkap setelah booking dikonfirmasi. Secara umum: pakaian kasual, sunscreen, sandal, obat pribadi, dan kamera. Untuk trip diving/snorkeling tersedia rental equipment."
  }
]

const howSteps = [
  {
    n: "01",
    title: "Temukan Destinasi",
    desc: "Pilih destinasi impian dari ratusan pilihan wisata Indonesia dan filter sesuai budget."
  },
  {
    n: "02",
    title: "Pesan Paket",
    desc: "Klik Tanya via WhatsApp, tim kami akan konfirmasi ketersediaan dalam 1 jam."
  },
  {
    n: "03",
    title: "Lakukan Pembayaran",
    desc: "DP 50% via transfer atau QRIS untuk mengamankan kursi Anda."
  },
  {
    n: "04",
    title: "Berangkat!",
    desc: "Nikmati perjalanan impian Anda. Kami di sini 24 jam jika ada bantuan."
  }
]

const testimonials = [
  {
    name: "Sarah Rahmawati",
    role: "Traveler · Jakarta",
    dest: "Raja Ampat",
    text: "Perjalanan ke Raja Ampat bersama Jelajah Nusantara luar biasa! Semua terorganisir rapi dan guide-nya sangat berpengetahuan luas. Pasti balik lagi!",
    rating: 5
  },
  {
    name: "Budi Santoso",
    role: "Fotografer · Surabaya",
    dest: "Bromo",
    text: "Paket Bromo sunrise sangat worth it. Spot foto terbaik, waktu tepat, dan pemandangan yang tak terlupakan. Jeep-nya nyaman, guide responsif.",
    rating: 5
  },
  {
    name: "Citra Dewi",
    role: "Content Creator · Bandung",
    dest: "Bali",
    text: "Itinerary Bali-nya padat tapi tidak melelahkan. Tim support sangat responsif, bahkan saat saya tiba-tiba minta perubahan jadwal mendadak.",
    rating: 5
  }
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }
  })
}

// ── Component ─────────────────────────────────────────────────
export default function TravelDemo() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [filterDest, setFilterDest] = useState("Semua")
  const [filterDays, setFilterDays] = useState("Semua")
  const [filterPrice, setFilterPrice] = useState("Semua")
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const allDests = [
    "Semua",
    ...Array.from(new Set(packages.map((p) => p.dest)))
  ]
  const allDays = ["Semua", "1–3 Hari", "4–5 Hari", "6+ Hari"]
  const allPrices = ["Semua", "< Rp 1jt", "Rp 1–3jt", "> Rp 3jt"]

  const filtered = useMemo(() => {
    return packages.filter((p) => {
      if (filterDest !== "Semua" && p.dest !== filterDest) return false
      if (filterDays !== "Semua") {
        if (filterDays === "1–3 Hari" && p.days > 3) return false
        if (filterDays === "4–5 Hari" && (p.days < 4 || p.days > 5))
          return false
        if (filterDays === "6+ Hari" && p.days < 6) return false
      }
      if (filterPrice !== "Semua") {
        if (filterPrice === "< Rp 1jt" && p.price >= 1000000) return false
        if (
          filterPrice === "Rp 1–3jt" &&
          (p.price < 1000000 || p.price > 3000000)
        )
          return false
        if (filterPrice === "> Rp 3jt" && p.price <= 3000000) return false
      }
      if (
        search &&
        !p.name.toLowerCase().includes(search.toLowerCase()) &&
        !p.dest.toLowerCase().includes(search.toLowerCase())
      )
        return false
      return true
    })
  }, [filterDest, filterDays, filterPrice, search])

  const GREEN = "#2b5d4f"
  const GOLD = "#c9a84c"
  const BG = "#f7f6f2"
  const SERIF = "var(--font-playfair, 'Georgia', serif)"
  const SANS = "var(--font-dm-sans, sans-serif)"

  return (
    <div
      style={{ fontFamily: SANS, color: "#1a1a1a", backgroundColor: "#fff" }}
    >
      {/* ── HEADER ── */}
      <header
        className="fixed top-[40px] left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
          boxShadow: scrolled ? "0 1px 24px rgba(0,0,0,0.08)" : "none",
          backdropFilter: scrolled ? "blur(16px)" : "none"
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex h-16 items-center justify-between">
          <span
            className="font-bold text-2xl tracking-tight"
            style={{ fontFamily: SERIF, color: scrolled ? "#1a1a1a" : "#fff" }}
          >
            Jelajah<span style={{ color: GOLD }}>Nusantara</span>
          </span>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {["Destinasi", "Paket", "Kontak"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="transition-opacity hover:opacity-60"
                style={{
                  color: scrolled ? "#374151" : "rgba(255,255,255,0.9)"
                }}
              >
                {item}
              </a>
            ))}
          </nav>
          <a
            href={WA_GENERAL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: GREEN }}
          >
            Booking Sekarang
          </a>
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: scrolled ? "#1a1a1a" : "#fff" }}
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white px-6 py-4 flex flex-col gap-4 shadow-lg">
            {["Destinasi", "Paket", "Kontak"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <a
              href={WA_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 rounded-full text-sm font-bold text-white text-center"
              style={{ backgroundColor: GREEN }}
            >
              Booking Sekarang
            </a>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[700px] flex flex-col justify-end overflow-hidden">
        <Image
          src={IMG.hero}
          alt="Indonesia"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom,rgba(0,0,0,0.45) 0%,rgba(0,0,0,0.35) 35%,rgba(0,0,0,0.72) 100%)"
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 pb-28 w-full">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              Agen Perjalanan Terpercaya Sejak 2015
            </p>
            <h1
              className="text-5xl md:text-7xl font-bold text-white leading-[1.05] max-w-3xl mb-6"
              style={{ fontFamily: SERIF }}
            >
              Keajaiban alam dan pesona budaya{" "}
              <em style={{ color: GOLD }}>Indonesia.</em>
            </h1>
            <p
              className="text-lg mb-10"
              style={{ color: "rgba(255,255,255,0.8)", maxWidth: "500px" }}
            >
              Menjelajahi Indonesia adalah petualangan yang tak terlupakan.
            </p>
          </motion.div>
          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-4 flex flex-col md:flex-row gap-3 max-w-2xl"
          >
            <div className="flex items-center gap-3 flex-1 px-3">
              <Calendar className="w-4 h-4 shrink-0" style={{ color: GREEN }} />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Tanggal
                </p>
                <p className="text-sm font-medium text-gray-700">
                  Pilih tanggal
                </p>
              </div>
            </div>
            <div className="hidden md:block w-px bg-gray-200 my-1" />
            <div className="flex items-center gap-3 flex-1 px-3">
              <Wallet className="w-4 h-4 shrink-0" style={{ color: GREEN }} />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Budget
                </p>
                <p className="text-sm font-medium text-gray-700">Semua harga</p>
              </div>
            </div>
            <div className="hidden md:block w-px bg-gray-200 my-1" />
            <div className="flex items-center gap-3 flex-1 px-3">
              <Users className="w-4 h-4 shrink-0" style={{ color: GREEN }} />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Peserta
                </p>
                <p className="text-sm font-medium text-gray-700">2 orang</p>
              </div>
            </div>
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white"
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
                ["10.000+", "Total Pelanggan"],
                ["09+", "Tahun Pengalaman"],
                ["50+", "Destinasi"],
                ["5.0", "Rating"]
              ].map(([v, l]) => (
                <div key={l} className="bg-white px-6 py-5 text-center">
                  <p
                    className="text-2xl font-bold"
                    style={{ fontFamily: SERIF, color: GREEN }}
                  >
                    {v}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{l}</p>
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
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
          >
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: GREEN }}
              >
                Lokasi Terbaik
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold"
                style={{ fontFamily: SERIF }}
              >
                Wisata Indonesia
              </h2>
            </div>
            <p className="text-base text-gray-500 max-w-xs leading-relaxed">
              Keindahan alam luar biasa, budaya kaya, dan keramahan masyarakat
              lokal.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {destinations.map((dest, i) => (
              <motion.div
                key={dest.name}
                variants={fadeUp}
                custom={i * 0.08}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className={`relative group overflow-hidden rounded-2xl cursor-pointer ${dest.wide ? "md:col-span-2" : ""}`}
                style={{ height: dest.wide ? "300px" : "220px" }}
              >
                <Image
                  src={dest.img}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes={dest.wide ? "66vw" : "33vw"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p
                    className="text-xs font-medium mb-1"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    <MapPin className="w-3 h-3 inline mr-1" />
                    {dest.region}
                  </p>
                  <h3
                    className="text-xl font-bold text-white"
                    style={{ fontFamily: SERIF }}
                  >
                    {dest.name}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    {dest.tagline}
                  </p>
                </div>
                <div className="absolute top-4 left-4">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.45)",
                      backdropFilter: "blur(8px)"
                    }}
                  >
                    <Clock className="w-3 h-3 inline mr-1" />
                    {dest.days}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={waPackage(dest.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: GREEN }}
                    onClick={(e) => e.stopPropagation()}
                  >
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
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8"
          >
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: GREEN }}
              >
                Paket Wisata
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold"
                style={{ fontFamily: SERIF }}
              >
                Pilih Paket Anda
              </h2>
            </div>
            <p className="text-base text-gray-500 max-w-xs leading-relaxed">
              Semua paket bisa dikustomisasi sesuai kebutuhan dan budget Anda.
            </p>
          </motion.div>

          {/* Filter bar */}
          <motion.div
            variants={fadeUp}
            custom={0.1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 mb-8 p-4 rounded-2xl"
            style={{ backgroundColor: BG }}
          >
            <div className="flex items-center gap-2 mr-2">
              <SlidersHorizontal className="w-4 h-4" style={{ color: GREEN }} />
              <span className="text-sm font-semibold text-gray-600">
                Filter:
              </span>
            </div>
            {/* Search */}
            <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 shadow-sm flex-1 min-w-[160px]">
              <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Cari paket..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-sm outline-none flex-1 bg-transparent placeholder:text-gray-400"
              />
            </div>
            {/* Destination filter */}
            {[
              {
                label: "Destinasi",
                opts: allDests,
                val: filterDest,
                set: setFilterDest
              },
              {
                label: "Durasi",
                opts: allDays,
                val: filterDays,
                set: setFilterDays
              },
              {
                label: "Budget",
                opts: allPrices,
                val: filterPrice,
                set: setFilterPrice
              }
            ].map(({ label, opts, val, set }) => (
              <select
                key={label}
                value={val}
                onChange={(e) => set(e.target.value)}
                className="text-sm bg-white rounded-xl px-3 py-2 shadow-sm outline-none cursor-pointer font-medium"
                style={{ color: val !== "Semua" ? GREEN : "#6b7280" }}
              >
                {opts.map((o) => (
                  <option key={o} value={o}>
                    {o === "Semua" ? `${label}: Semua` : o}
                  </option>
                ))}
              </select>
            ))}
          </motion.div>

          {/* Package grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.length === 0 ? (
              <div className="col-span-3 text-center py-16 text-gray-400">
                <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-base">
                  Tidak ada paket yang cocok. Coba ubah filter.
                </p>
              </div>
            ) : (
              filtered.map((pkg, i) => (
                <motion.div
                  key={pkg.id}
                  variants={fadeUp}
                  custom={i * 0.08}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="group rounded-2xl overflow-hidden bg-white"
                  style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.08)" }}
                >
                  {/* Photo */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={pkg.img}
                      alt={pkg.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                        style={{ backgroundColor: GREEN }}
                      >
                        {pkg.label}
                      </span>
                      {pkg.seats <= 3 && (
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-500 text-white flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Tersisa {pkg.seats} kursi!
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="text-xs font-medium text-white/80">
                        {pkg.dates}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <h3
                        className="font-bold text-base leading-tight"
                        style={{ fontFamily: SERIF }}
                      >
                        {pkg.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-gray-500 shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-semibold">{pkg.rating}</span>
                        <span>({pkg.reviews})</span>
                      </div>
                    </div>

                    {/* Includes */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {pkg.includes.slice(0, 3).map((inc) => (
                        <span
                          key={inc}
                          className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1"
                          style={{ backgroundColor: "#f0faf7", color: GREEN }}
                        >
                          <CheckCircle className="w-2.5 h-2.5" />
                          {inc}
                        </span>
                      ))}
                      {pkg.includes.length > 3 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                          +{pkg.includes.length - 3} lagi
                        </span>
                      )}
                    </div>

                    {/* Departures */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-500 mb-1.5">
                        Keberangkatan tersedia:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {pkg.departures.map((d, idx) => (
                          <span
                            key={d}
                            className="text-xs px-2.5 py-1 rounded-lg font-medium"
                            style={{
                              backgroundColor: idx === 0 ? GREEN : "#f3f4f6",
                              color: idx === 0 ? "#fff" : "#4b5563"
                            }}
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-400">Mulai dari</p>
                        <p
                          className="text-lg font-bold"
                          style={{ color: GREEN, fontFamily: SERIF }}
                        >
                          {pkg.priceLabel}
                        </p>
                        <p className="text-xs text-gray-400">/ orang</p>
                      </div>
                      <a
                        href={waPackage(pkg.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90"
                        style={{ backgroundColor: GREEN }}
                      >
                        Tanya WA <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24" style={{ backgroundColor: BG }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="relative h-[520px] rounded-3xl overflow-hidden"
            >
              <Image
                src={IMG.howItWorks}
                alt="Cara Kerja"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </motion.div>
            <motion.div
              variants={fadeUp}
              custom={0.1}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: GREEN }}
              >
                Cara Kerja
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold leading-tight mb-4"
                style={{ fontFamily: SERIF }}
              >
                Satu klik untuk <em style={{ color: GOLD }}>Anda.</em>
              </h2>
              <p className="text-base text-gray-500 leading-relaxed mb-10">
                Mulai perjalanan impian Anda dengan cara yang mudah, cepat, dan
                terpercaya.
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
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-sm"
                      style={{
                        backgroundColor: i === 0 ? GREEN : "#e5e7eb",
                        color: i === 0 ? "#fff" : "#9ca3af"
                      }}
                    >
                      {s.n}
                    </div>
                    <div>
                      <h4
                        className="font-bold text-base mb-1"
                        style={{ fontFamily: SERIF }}
                      >
                        {s.title}
                      </h4>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {s.desc}
                      </p>
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
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-12"
          >
            <p
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: GREEN }}
            >
              Testimoni
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: SERIF }}
            >
              Kata Pelanggan Kami
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                custom={i * 0.1}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="rounded-2xl p-6 flex flex-col gap-4"
                style={{ backgroundColor: BG }}
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-base text-gray-600 leading-relaxed flex-1 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div
                  className="flex items-center gap-3 pt-4"
                  style={{ borderTop: "1px solid #e5e7eb" }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white"
                    style={{ backgroundColor: GREEN }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm"
                      style={{ fontFamily: SERIF }}
                    >
                      {t.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {t.role} · {t.dest}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24" style={{ backgroundColor: BG }}>
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <p
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: GREEN }}
            >
              FAQ
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: SERIF }}
            >
              Pertanyaan Umum
            </h2>
            <p className="mt-3 text-base text-gray-500">
              Jawaban untuk pertanyaan yang paling sering ditanyakan.
            </p>
          </motion.div>
          <div className="flex flex-col gap-3">
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i * 0.06}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden bg-white"
                style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span
                    className="font-semibold text-base"
                    style={{ fontFamily: SERIF }}
                  >
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                    style={{ color: GREEN }}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-base text-gray-600 leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          <motion.div
            variants={fadeUp}
            custom={0.5}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <p className="text-base text-gray-500 mb-4">
              Masih ada pertanyaan lain?
            </p>
            <a
              href={WA_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white"
              style={{ backgroundColor: GREEN }}
            >
              Tanya Langsung via WhatsApp <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── GOOGLE MAPS & KONTAK ── */}
      <section id="kontak" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Info */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: GREEN }}
              >
                Hubungi Kami
              </p>
              <h2
                className="text-4xl font-bold mb-6"
                style={{ fontFamily: SERIF }}
              >
                Kantor & Meeting Point
              </h2>
              <p className="text-base text-gray-500 leading-relaxed mb-8">
                Kunjungi kantor kami atau hubungi lewat WhatsApp untuk
                konsultasi perjalanan gratis.
              </p>
              <div className="flex flex-col gap-5">
                {[
                  {
                    icon: MapPin,
                    label: "Alamat",
                    val: "Jl. Raya Kuta No. 88, Kuta, Bali 80361"
                  },
                  { icon: Phone, label: "WhatsApp", val: "+62 895-335-501192" },
                  {
                    icon: Mail,
                    label: "Email",
                    val: "info@jelajahnusantara.id"
                  },
                  {
                    icon: Instagram,
                    label: "Instagram",
                    val: "@jelajahnusantara"
                  }
                ].map(({ icon: Icon, label, val }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "#f0faf7", color: GREEN }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">
                        {label}
                      </p>
                      <p className="text-base font-medium text-gray-800">
                        {val}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href={WA_GENERAL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full font-bold text-sm text-white"
                style={{ backgroundColor: GREEN }}
              >
                Konsultasi Gratis via WhatsApp{" "}
                <ChevronRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Google Maps embed */}
            <motion.div
              variants={fadeUp}
              custom={0.1}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-lg"
              style={{ height: "420px" }}
            >
              <iframe
                title="Lokasi Jelajah Nusantara"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.063!2d115.167!3d-8.721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwNDMnMTUuNiJTIDExNcKwMTAnMDEuMiJF!5e0!3m2!1sen!2sid!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-28 relative overflow-hidden"
        style={{ backgroundColor: GREEN }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${IMG.hero})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 text-center text-white">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2
              className="text-4xl md:text-6xl font-bold mb-4"
              style={{ fontFamily: SERIF }}
            >
              Siap Memulai <em style={{ color: GOLD }}>Petualangan?</em>
            </h2>
            <p
              className="text-lg mb-10 max-w-xl mx-auto"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              Hubungi kami sekarang dan dapatkan konsultasi perjalanan gratis.
              Wujudkan liburan impian Anda!
            </p>
            <a
              href={WA_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105"
              style={{
                backgroundColor: GOLD,
                color: "#1a1a1a",
                boxShadow: `0 8px 32px rgba(201,168,76,0.4)`
              }}
            >
              Chat WhatsApp Sekarang <ChevronRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-14 px-6" style={{ backgroundColor: "#111" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
            <div className="max-w-xs">
              <p
                className="text-xl font-bold mb-3"
                style={{ fontFamily: SERIF, color: "#f5f5f0" }}
              >
                Jelajah<span style={{ color: GOLD }}>Nusantara</span>
              </p>
              <p className="text-sm leading-relaxed text-gray-400">
                Agen perjalanan wisata domestik terpercaya. Kami membawa Anda
                menikmati keajaiban Indonesia.
              </p>
            </div>
            <div className="flex gap-14">
              <div>
                <p className="text-sm font-bold text-white mb-4">Destinasi</p>
                {["Bali", "Raja Ampat", "Labuan Bajo", "Lombok", "Bromo"].map(
                  (d) => (
                    <p key={d} className="text-sm text-gray-400 mb-2">
                      {d}
                    </p>
                  )
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-white mb-4">Kontak</p>
                <p className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                  <Phone className="w-3.5 h-3.5" />
                  +62 895-335-501192
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                  <Mail className="w-3.5 h-3.5" />
                  info@jelajahnusantara.id
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-400">
                  <Instagram className="w-3.5 h-3.5" />
                  @jelajahnusantara
                </p>
              </div>
            </div>
          </div>
          <div
            className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <p>© 2025 Jelajah Nusantara. Hak cipta dilindungi.</p>
            <p>
              Website oleh{" "}
              <a
                href="https://nehandev.com"
                className="font-bold hover:text-white transition-colors"
                style={{ color: "#818cf8" }}
              >
                NehanDev
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
