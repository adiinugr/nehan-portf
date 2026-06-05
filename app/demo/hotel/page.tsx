"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import {
  MapPin,
  Phone,
  Mail,
  Star,
  Users,
  Wifi,
  Coffee,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Menu,
  X,
  Car,
  Utensils,
  BedDouble,
  Check,
  Clock,
  Plane,
  Snowflake,
  Mountain,
  Bath,
  CalendarDays,
} from "lucide-react"

// ── WA ──────────────────────────────────────────────────────────
const NEHAN_WA = "62895335501192"
const wa = (msg: string) =>
  `https://wa.me/${NEHAN_WA}?text=${encodeURIComponent(msg)}`
const WA_GENERAL = wa(
  "Halo NehanDev, saya tertarik membuat website hotel/villa seperti demo Villa Sejuk Puncak untuk bisnis saya."
)
const waRoom = (name: string) =>
  wa(
    `Halo NehanDev, saya ingin informasi lebih lanjut tentang demo website hotel. Saya tertarik dengan kamar "${name}". Bisakah website seperti ini dibuat untuk penginapan saya?`
  )

// ── Images ───────────────────────────────────────────────────────
const IMG = {
  hero: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=2000&q=85&fit=crop",
  deluxe:
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80&fit=crop",
  suite:
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900&q=80&fit=crop",
  cottage:
    "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=900&q=80&fit=crop",
  villa:
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=900&q=80&fit=crop",
  g1: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&q=75&fit=crop",
  g2: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=700&q=75&fit=crop",
  g3: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=700&q=75&fit=crop",
  g4: "https://images.unsplash.com/photo-1439853949212-36089f63a4bd?w=700&q=75&fit=crop",
  g5: "https://images.unsplash.com/photo-1502920514313-52581002a659?w=700&q=75&fit=crop",
}

// ── Calendar ─────────────────────────────────────────────────────
type DayStatus = "available" | "booked" | "limited" | "past" | "today"
type CalDay = { day: number; status: DayStatus }

const TODAY_REF = { year: 2026, month: 6, day: 6 }
const BOOKED_DATES: Record<string, number[]> = {
  "2026-6": [7, 8, 13, 14, 20, 21, 22, 29, 30],
  "2026-7": [5, 6, 12, 13, 19, 20, 26, 27],
  "2026-8": [2, 3, 9, 10, 16, 17],
}
const LIMITED_DATES: Record<string, number[]> = {
  "2026-6": [9, 15, 23, 28],
  "2026-7": [4, 11, 18, 25],
  "2026-8": [4, 11, 18, 25],
}

function buildCalendar(year: number, month: number): CalDay[] {
  const key = `${year}-${month}`
  const booked = BOOKED_DATES[key] ?? []
  const limited = LIMITED_DATES[key] ?? []
  const firstDow = new Date(year, month - 1, 1).getDay()
  const daysInMonth = new Date(year, month, 0).getDate()
  const startOffset = (firstDow + 6) % 7

  const cells: CalDay[] = Array.from({ length: startOffset }, () => ({
    day: 0,
    status: "past" as DayStatus,
  }))

  for (let d = 1; d <= daysInMonth; d++) {
    const isPast =
      year < TODAY_REF.year ||
      (year === TODAY_REF.year && month < TODAY_REF.month) ||
      (year === TODAY_REF.year && month === TODAY_REF.month && d < TODAY_REF.day)
    const isToday =
      year === TODAY_REF.year &&
      month === TODAY_REF.month &&
      d === TODAY_REF.day

    let status: DayStatus = "available"
    if (isToday) status = "today"
    else if (isPast) status = "past"
    else if (booked.includes(d)) status = "booked"
    else if (limited.includes(d)) status = "limited"

    cells.push({ day: d, status })
  }

  while (cells.length % 7 !== 0) cells.push({ day: 0, status: "past" })
  return cells
}

function getMonthInfo(offset: number) {
  let m = 6 + offset
  let y = 2026
  while (m > 12) {
    m -= 12
    y++
  }
  while (m < 1) {
    m += 12
    y--
  }
  return { year: y, month: m }
}

const MONTHS_ID = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
]
const DAYS_ID = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"]

// ── Room Data ────────────────────────────────────────────────────
type Room = {
  id: string
  name: string
  subtitle: string
  area: number
  guests: number
  beds: string
  price: number
  priceLabel: string
  img: string
  view: string
  highlights: string[]
  badge?: string
}

const rooms: Room[] = [
  {
    id: "deluxe",
    name: "Deluxe Mountain View",
    subtitle: "Kenyamanan Sempurna",
    area: 28,
    guests: 2,
    beds: "1 King Bed",
    price: 850000,
    priceLabel: "Rp 850.000",
    img: IMG.deluxe,
    view: "Pemandangan Gunung Langsung",
    highlights: ["AC & Pemanas", "Hot Shower", "TV LED 42\"", "Minibar"],
  },
  {
    id: "suite",
    name: "Superior Suite",
    subtitle: "Kemewahan Tak Terlupakan",
    area: 48,
    guests: 2,
    beds: "1 King Bed + Sofa Bed",
    price: 1450000,
    priceLabel: "Rp 1.450.000",
    img: IMG.suite,
    view: "Panoramic Valley View",
    highlights: [
      "Bathtub & Rain Shower",
      "Living Room Area",
      "Smart TV 55\"",
      "Mini Bar Premium",
    ],
    badge: "Terpopuler",
  },
  {
    id: "cottage",
    name: "Family Cottage",
    subtitle: "Sempurna untuk Keluarga",
    area: 72,
    guests: 4,
    beds: "2 Queen Beds",
    price: 2100000,
    priceLabel: "Rp 2.100.000",
    img: IMG.cottage,
    view: "Garden & Mountain View",
    highlights: ["2 Kamar Tidur", "Teras Pribadi", "Dapur Mini", "Ruang Keluarga"],
  },
  {
    id: "villa",
    name: "Presidential Villa",
    subtitle: "Puncak Kemewahan",
    area: 125,
    guests: 8,
    beds: "3 Kamar Tidur",
    price: 4500000,
    priceLabel: "Rp 4.500.000",
    img: IMG.villa,
    view: "360° Gunung & Lembah",
    highlights: [
      "Private Swimming Pool",
      "Full Kitchen",
      "3 Kamar Tidur",
      "Home Theater",
    ],
    badge: "Eksklusif",
  },
]

// ── Testimonials ─────────────────────────────────────────────────
const testimonials = [
  {
    name: "Dewi Rahayu",
    role: "Tamu dari Bandung",
    room: "Superior Suite",
    text: "Pengalaman menginap yang luar biasa. Pemandangan dari jendela kamar begitu memukau, dan pelayanannya sangat personal dan hangat. Kami pasti akan kembali!",
    rating: 5,
  },
  {
    name: "Arif Mahmud",
    role: "Tamu dari Jakarta",
    room: "Presidential Villa",
    text: "Kami merayakan anniversary di sini dan tidak bisa lebih puas. Private pool-nya sempurna, makanan lezat, dan tim staf selalu siap membantu kapanpun dibutuhkan.",
    rating: 5,
  },
  {
    name: "Nina Kurniawati",
    role: "Tamu dari Surabaya",
    room: "Family Cottage",
    text: "Cocok sekali untuk liburan keluarga. Anak-anak senang dengan kebun yang luas, orang tua bisa istirahat total. Udara pegunungan yang segar bikin betah berlama-lama!",
    rating: 5,
  },
]

// ── Facilities ───────────────────────────────────────────────────
const facilities = [
  { icon: Wifi, label: "Free WiFi", sub: "Di seluruh area" },
  { icon: Utensils, label: "Restoran & Kafe", sub: "Buka 06.00–22.00" },
  { icon: Car, label: "Parkir Gratis", sub: "Area luas & aman" },
  { icon: Plane, label: "Antar-Jemput", sub: "Bandara terdekat" },
  { icon: Coffee, label: "Sarapan Gratis", sub: "Menu lokal & barat" },
  { icon: Snowflake, label: "AC & Pemanas", sub: "Semua kamar" },
  { icon: Clock, label: "Layanan 24 Jam", sub: "Front desk & CS" },
  { icon: Mountain, label: "Tur Alam", sub: "Paket hiking & wisata" },
]

// ── FAQ ──────────────────────────────────────────────────────────
const faqItems = [
  {
    q: "Apakah sarapan sudah termasuk dalam harga?",
    a: "Ya, sarapan sudah termasuk untuk semua tipe kamar. Deluxe & Suite untuk 2 orang, Family Cottage untuk 4 orang, dan Presidential Villa mendapatkan full board (3× makan sehari).",
  },
  {
    q: "Bagaimana cara melakukan reservasi?",
    a: "Klik tombol 'Booking via WhatsApp' di halaman ini. Tim kami akan konfirmasi ketersediaan dalam 30 menit dan memandu proses pembayaran DP 50% untuk mengamankan tanggal Anda.",
  },
  {
    q: "Apakah ada fasilitas kolam renang?",
    a: "Presidential Villa dilengkapi private pool eksklusif. Untuk tamu Deluxe Room, Superior Suite, dan Family Cottage, tersedia kolam renang semi-privat yang bisa dipesan untuk slot waktu tertentu.",
  },
  {
    q: "Apakah anak-anak boleh menginap?",
    a: "Tentu saja! Anak di bawah 5 tahun gratis tanpa sarapan. Usia 5–12 tahun dikenakan 50% harga dewasa. Tersedia tempat tidur bayi dan perlengkapan anak atas permintaan.",
  },
  {
    q: "Bagaimana kebijakan pembatalan?",
    a: "Pembatalan lebih dari 7 hari: refund 100%. Pembatalan 3–7 hari: refund 50%. Kurang dari 3 hari: tidak ada refund. Kami sarankan membeli asuransi perjalanan.",
  },
  {
    q: "Apakah tersedia layanan antar-jemput?",
    a: "Ya, tersedia antar-jemput dari Bandara Husein Sastranegara dan Stasiun Bandung. Biaya Rp 250.000 per perjalanan. Pesan minimal H-1 keberangkatan.",
  },
]

// ── Animation ────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

// ── Design Tokens ────────────────────────────────────────────────
const CREAM = "#faf5ed"
const DARK = "#1a0c07"
const DARK2 = "#231007"
const GOLD = "#c9a553"
const STONE = "#a07848"
const SERIF = "var(--font-cormorant, 'Georgia', serif)"
const SANS = "var(--font-jost, sans-serif)"

// ── Sub-component: Calendar Month ────────────────────────────────
function CalendarMonth({
  year,
  month,
}: {
  year: number
  month: number
}) {
  const cells = buildCalendar(year, month)

  const statusStyle = (s: DayStatus): React.CSSProperties => {
    if (s === "past" || s === "today")
      return {
        color: s === "today" ? "#fff" : "#6b5a4e",
        backgroundColor: s === "today" ? GOLD : "transparent",
        fontWeight: s === "today" ? 700 : 400,
        borderRadius: "50%",
        cursor: s === "today" ? "default" : "default",
        opacity: s === "past" ? 0.35 : 1,
      }
    if (s === "booked")
      return {
        color: "#9b3a2f",
        backgroundColor: "#fde8e4",
        borderRadius: "6px",
        textDecoration: "line-through",
        cursor: "not-allowed",
      }
    if (s === "limited")
      return {
        color: "#92400e",
        backgroundColor: "#fef3c7",
        borderRadius: "6px",
        fontWeight: 600,
        cursor: "pointer",
      }
    return {
      color: "#1a3320",
      backgroundColor: "#e8f5eb",
      borderRadius: "6px",
      fontWeight: 500,
      cursor: "pointer",
    }
  }

  return (
    <div>
      <p
        className="text-center text-base font-semibold mb-4"
        style={{ fontFamily: SERIF, color: CREAM, fontSize: "1.15rem" }}
      >
        {MONTHS_ID[month - 1]} {year}
      </p>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS_ID.map((d) => (
          <div
            key={d}
            className="text-center text-xs font-bold pb-1"
            style={{ color: "#9c8878" }}
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, i) => (
          <div
            key={i}
            className="aspect-square flex items-center justify-center text-xs transition-opacity"
            style={cell.day === 0 ? { opacity: 0 } : statusStyle(cell.status)}
          >
            {cell.day > 0 ? cell.day : ""}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────
export default function HotelDemo() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [calOffset, setCalOffset] = useState(0)
  const [heroGuests, setHeroGuests] = useState(2)
  const [heroCheckin, setHeroCheckin] = useState("")
  const [heroCheckout, setHeroCheckout] = useState("")

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const month1 = getMonthInfo(calOffset)
  const month2 = getMonthInfo(calOffset + 1)

  return (
    <div style={{ fontFamily: SANS, color: DARK, backgroundColor: "#fff" }}>

      {/* ── HEADER ── */}
      <header
        className="fixed top-[40px] left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(26,12,7,0.97)" : "transparent",
          boxShadow: scrolled ? "0 1px 32px rgba(0,0,0,0.3)" : "none",
          backdropFilter: scrolled ? "blur(20px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex h-16 items-center justify-between">
          <div className="flex flex-col leading-none">
            <span
              className="font-bold tracking-tight text-xl"
              style={{ fontFamily: SERIF, color: "#fff", letterSpacing: "0.02em" }}
            >
              Villa Sejuk
              <span style={{ color: GOLD, fontStyle: "italic" }}> Puncak</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.4)" }}>
              Luxury Mountain Retreat
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {["Kamar", "Kalender", "Galeri", "Fasilitas", "Kontak"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="transition-opacity hover:opacity-60"
                style={{ color: scrolled ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.9)" }}
              >
                {item}
              </a>
            ))}
          </nav>

          <a
            href={WA_GENERAL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: GOLD, color: DARK }}
          >
            Reservasi
          </a>

          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: "#fff" }}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {menuOpen && (
          <div
            className="md:hidden px-6 py-4 flex flex-col gap-4 shadow-xl"
            style={{ backgroundColor: DARK }}
          >
            {["Kamar", "Kalender", "Galeri", "Fasilitas", "Kontak"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium"
                style={{ color: "rgba(255,255,255,0.8)" }}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <a
              href={WA_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 rounded-full text-sm font-bold text-center"
              style={{ backgroundColor: GOLD, color: DARK }}
            >
              Reservasi Sekarang
            </a>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[700px] flex flex-col justify-end overflow-hidden">
        <Image
          src={IMG.hero}
          alt="Villa Sejuk Puncak"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(0,0,0,0.25) 0%, rgba(20,8,3,0.55) 50%, rgba(20,8,3,0.82) 100%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 pb-24 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <p
              className="text-xs font-bold uppercase tracking-[0.3em] mb-5"
              style={{ color: GOLD }}
            >
              ✦ Mountain Retreat Sejak 2015 · Puncak, Jawa Barat
            </p>
            <h1
              className="text-5xl md:text-7xl font-bold text-white leading-[1.0] max-w-2xl mb-5"
              style={{ fontFamily: SERIF }}
            >
              Di mana langit
              <br />
              <em style={{ color: GOLD }}>menyentuh</em> tanah.
            </h1>
            <p className="text-lg max-w-md" style={{ color: "rgba(255,255,255,0.72)" }}>
              4 tipe penginapan eksklusif di atas ketinggian 1.400 mdpl.
              Pemandangan tak terlupakan, pelayanan bintang lima.
            </p>
          </motion.div>

          {/* Booking widget */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex flex-col md:flex-row gap-0 rounded-2xl overflow-hidden shadow-2xl max-w-2xl"
            style={{ backgroundColor: "rgba(26,12,7,0.9)", backdropFilter: "blur(20px)", border: "1px solid rgba(201,165,83,0.2)" }}
          >
            {/* Check-in */}
            <div className="flex-1 px-5 py-4 flex items-center gap-3 border-b md:border-b-0 md:border-r" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <CalendarDays className="w-4 h-4 shrink-0" style={{ color: GOLD }} />
              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Check-in</p>
                <input
                  type="date"
                  value={heroCheckin}
                  onChange={(e) => setHeroCheckin(e.target.value)}
                  className="text-sm font-medium bg-transparent outline-none w-full cursor-pointer"
                  style={{ color: "rgba(255,255,255,0.85)", colorScheme: "dark" }}
                />
              </div>
            </div>
            {/* Check-out */}
            <div className="flex-1 px-5 py-4 flex items-center gap-3 border-b md:border-b-0 md:border-r" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <CalendarDays className="w-4 h-4 shrink-0" style={{ color: GOLD }} />
              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Check-out</p>
                <input
                  type="date"
                  value={heroCheckout}
                  onChange={(e) => setHeroCheckout(e.target.value)}
                  className="text-sm font-medium bg-transparent outline-none w-full cursor-pointer"
                  style={{ color: "rgba(255,255,255,0.85)", colorScheme: "dark" }}
                />
              </div>
            </div>
            {/* Guests */}
            <div className="flex-1 px-5 py-4 flex items-center gap-3 border-b md:border-b-0 md:border-r" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <Users className="w-4 h-4 shrink-0" style={{ color: GOLD }} />
              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Tamu</p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setHeroGuests((g) => Math.max(1, g - 1))}
                    className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-sm transition-opacity hover:opacity-70"
                    style={{ backgroundColor: GOLD + "33", color: GOLD }}
                  >−</button>
                  <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
                    {heroGuests} tamu
                  </span>
                  <button
                    type="button"
                    onClick={() => setHeroGuests((g) => Math.min(10, g + 1))}
                    className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-sm transition-opacity hover:opacity-70"
                    style={{ backgroundColor: GOLD + "33", color: GOLD }}
                  >+</button>
                </div>
              </div>
            </div>
            {/* CTA */}
            <button
              type="button"
              onClick={() =>
                document.getElementById("kamar")?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-7 py-4 font-bold text-sm transition-all hover:opacity-90 flex items-center justify-center gap-2 whitespace-nowrap"
              style={{ backgroundColor: GOLD, color: DARK }}
            >
              Cek Kamar
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-4 gap-px rounded-t-2xl overflow-hidden shadow-2xl"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              {[
                ["5.000+", "Tamu Puas"],
                ["09+", "Tahun Berpengalaman"],
                ["4", "Tipe Kamar"],
                ["4.9", "Rating Tamu"],
              ].map(([v, l]) => (
                <div
                  key={l}
                  className="px-6 py-5 text-center"
                  style={{ backgroundColor: "rgba(26,12,7,0.85)", backdropFilter: "blur(12px)" }}
                >
                  <p className="text-2xl font-bold" style={{ fontFamily: SERIF, color: GOLD }}>
                    {v}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {l}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── KAMAR ── */}
      <section id="kamar" className="py-24" style={{ backgroundColor: DARK }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: GOLD }}>
              Pilihan Kamar
            </p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight" style={{ fontFamily: SERIF }}>
                Empat tipe kamar,<br />
                <em style={{ color: GOLD }}>satu standar</em> kemewahan.
              </h2>
              <p className="text-base max-w-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                Setiap kamar dirancang untuk memberikan pengalaman menginap yang tak terlupakan.
              </p>
            </div>
          </motion.div>

          {/* First 2 rooms — editorial alternating layout */}
          <div className="flex flex-col gap-6 mb-6">
            {rooms.slice(0, 2).map((room, i) => (
              <motion.div
                key={room.id}
                variants={fadeUp}
                custom={i * 0.1}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="group grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 4px 40px rgba(0,0,0,0.4)" }}
              >
                {/* Image */}
                <div
                  className={`relative h-64 lg:h-80 overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <Image
                    src={room.img}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                  {room.badge && (
                    <div className="absolute top-4 left-4">
                      <span
                        className="text-xs font-bold px-3 py-1 rounded-full"
                        style={{ backgroundColor: GOLD, color: DARK }}
                      >
                        {room.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div
                  className={`p-8 flex flex-col justify-center ${i % 2 === 1 ? "lg:order-1" : ""}`}
                  style={{ backgroundColor: DARK2 }}
                >
                  <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: STONE }}>
                    {room.view}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-1" style={{ fontFamily: SERIF }}>
                    {room.name}
                  </h3>
                  <p className="text-sm italic mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {room.subtitle}
                  </p>

                  <div className="flex items-center gap-5 mb-5 text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                    <span className="flex items-center gap-1.5">
                      <BedDouble className="w-3.5 h-3.5" style={{ color: GOLD }} />
                      {room.beds}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" style={{ color: GOLD }} />
                      Maks. {room.guests} tamu
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Bath className="w-3.5 h-3.5" style={{ color: GOLD }} />
                      {room.area} m²
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {room.highlights.map((h) => (
                      <span
                        key={h}
                        className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: GOLD + "18", color: GOLD }}
                      >
                        <Check className="w-2.5 h-2.5" />
                        {h}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Mulai dari</p>
                      <p className="text-2xl font-bold" style={{ fontFamily: SERIF, color: GOLD }}>
                        {room.priceLabel}
                      </p>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>/ malam · sudah termasuk sarapan</p>
                    </div>
                    <a
                      href={waRoom(room.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:opacity-90"
                      style={{ backgroundColor: GOLD, color: DARK }}
                    >
                      Booking WA <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Last 2 rooms — 2-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rooms.slice(2).map((room, i) => (
              <motion.div
                key={room.id}
                variants={fadeUp}
                custom={i * 0.1}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="group rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 4px 40px rgba(0,0,0,0.4)" }}
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={room.img}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-5">
                    <p className="text-xs font-medium mb-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>
                      {room.view}
                    </p>
                    <h3 className="text-xl font-bold text-white" style={{ fontFamily: SERIF }}>
                      {room.name}
                    </h3>
                  </div>
                  {room.badge && (
                    <div className="absolute top-4 right-4">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: GOLD, color: DARK }}>
                        {room.badge}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6" style={{ backgroundColor: DARK2 }}>
                  <div className="flex items-center gap-4 mb-4 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                    <span className="flex items-center gap-1.5">
                      <BedDouble className="w-3.5 h-3.5" style={{ color: GOLD }} />
                      {room.beds}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" style={{ color: GOLD }} />
                      Maks. {room.guests}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Bath className="w-3.5 h-3.5" style={{ color: GOLD }} />
                      {room.area} m²
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {room.highlights.slice(0, 3).map((h) => (
                      <span
                        key={h}
                        className="text-xs px-2.5 py-1 rounded-full flex items-center gap-1"
                        style={{ backgroundColor: GOLD + "18", color: GOLD }}
                      >
                        <Check className="w-2.5 h-2.5" />
                        {h}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Mulai dari</p>
                      <p className="text-xl font-bold" style={{ fontFamily: SERIF, color: GOLD }}>
                        {room.priceLabel}
                        <span className="text-xs font-normal" style={{ color: "rgba(255,255,255,0.35)" }}> /malam</span>
                      </p>
                    </div>
                    <a
                      href={waRoom(room.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-90"
                      style={{ backgroundColor: GOLD, color: DARK }}
                    >
                      Booking <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KALENDER KETERSEDIAAN ── */}
      <section id="kalender" className="py-24" style={{ backgroundColor: CREAM }}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: STONE }}>
              Ketersediaan
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-3" style={{ fontFamily: SERIF, color: DARK }}>
              Cek Ketersediaan Kamar
            </h2>
            <p className="text-base max-w-md mx-auto leading-relaxed" style={{ color: "#6b5a4e" }}>
              Pastikan tanggal liburan Anda masih tersedia sebelum menghubungi kami.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={0.1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="rounded-2xl p-8"
            style={{ backgroundColor: DARK, boxShadow: "0 8px 48px rgba(26,12,7,0.3)" }}
          >
            {/* Navigation */}
            <div className="flex items-center justify-between mb-8">
              <button
                type="button"
                onClick={() => setCalOffset((o) => Math.max(-1, o - 1))}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
                style={{ backgroundColor: GOLD + "22", color: GOLD }}
                disabled={calOffset <= 0}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" style={{ color: GOLD }} />
                <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {MONTHS_ID[month1.month - 1]} – {MONTHS_ID[month2.month - 1]} {month2.year}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setCalOffset((o) => Math.min(3, o + 1))}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
                style={{ backgroundColor: GOLD + "22", color: GOLD }}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* 2 months on desktop, 1 on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <CalendarMonth year={month1.year} month={month1.month} />
              <div className="hidden md:block">
                <CalendarMonth year={month2.year} month={month2.month} />
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              {[
                { color: "#e8f5eb", text: "#1a3320", label: "Tersedia" },
                { color: "#fef3c7", text: "#92400e", label: "Terbatas" },
                { color: "#fde8e4", text: "#9b3a2f", label: "Penuh" },
                { color: GOLD, text: DARK, label: "Hari Ini" },
              ].map(({ color, text, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: color, color: text }}
                  >
                    8
                  </div>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <p className="text-sm mb-4" style={{ color: "#6b5a4e" }}>
              Tanggal yang Anda inginkan tersedia? Segera amankan!
            </p>
            <a
              href={WA_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm transition-all hover:opacity-90"
              style={{ backgroundColor: DARK, color: GOLD, border: `1.5px solid ${GOLD}` }}
            >
              Hubungi via WhatsApp <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── GALERI ── */}
      <section id="galeri" className="py-24" style={{ backgroundColor: DARK }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: GOLD }}>
              Galeri
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: SERIF }}>
              Sekilas Villa Sejuk <em style={{ color: GOLD }}>Puncak</em>
            </h2>
          </motion.div>

          {/* Desktop masonry-style grid */}
          <motion.div
            variants={fadeUp}
            custom={0.1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="hidden md:grid grid-cols-3 gap-4"
            style={{ height: "600px" }}
          >
            <div className="row-span-2 relative rounded-2xl overflow-hidden group">
              <Image src={IMG.g1} alt="Galeri 1" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="33vw" />
            </div>
            <div className="relative rounded-xl overflow-hidden group">
              <Image src={IMG.g2} alt="Galeri 2" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="33vw" />
            </div>
            <div className="relative rounded-xl overflow-hidden group">
              <Image src={IMG.g3} alt="Galeri 3" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="33vw" />
            </div>
            <div className="relative rounded-xl overflow-hidden group">
              <Image src={IMG.g4} alt="Galeri 4" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="33vw" />
            </div>
            <div className="relative rounded-xl overflow-hidden group">
              <Image src={IMG.g5} alt="Galeri 5" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="33vw" />
            </div>
          </motion.div>

          {/* Mobile grid */}
          <div className="grid md:hidden grid-cols-2 gap-3">
            {[IMG.g1, IMG.g2, IMG.g3, IMG.g4].map((img, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i * 0.08}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="relative rounded-xl overflow-hidden h-44 group"
              >
                <Image src={img} alt={`Galeri ${i + 1}`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="50vw" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FASILITAS ── */}
      <section id="fasilitas" className="py-24" style={{ backgroundColor: CREAM }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: STONE }}>
              Fasilitas
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-3" style={{ fontFamily: SERIF, color: DARK }}>
              Semua yang Anda Butuhkan
            </h2>
            <p className="text-base max-w-sm mx-auto" style={{ color: "#6b5a4e" }}>
              Fasilitas lengkap untuk kenyamanan maksimal selama menginap.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {facilities.map((fac, i) => (
              <motion.div
                key={fac.label}
                variants={fadeUp}
                custom={i * 0.07}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-col items-center text-center p-6 rounded-2xl group transition-all hover:-translate-y-1 duration-300"
                style={{ backgroundColor: "#fff", boxShadow: "0 2px 16px rgba(26,12,7,0.07)" }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-colors group-hover:scale-110 duration-300"
                  style={{ backgroundColor: STONE + "18", color: STONE }}
                >
                  <fac.icon className="w-5 h-5" />
                </div>
                <p className="font-semibold text-sm mb-1" style={{ color: DARK, fontFamily: SERIF }}>
                  {fac.label}
                </p>
                <p className="text-xs" style={{ color: "#9c8878" }}>{fac.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONI ── */}
      <section className="py-24" style={{ backgroundColor: DARK }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: GOLD }}>
              Testimoni
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: SERIF }}>
              Kata Para Tamu Kami
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
                className="p-7 rounded-2xl flex flex-col gap-5"
                style={{ backgroundColor: DARK2, border: "1px solid rgba(201,165,83,0.12)" }}
              >
                <div>
                  <p
                    className="text-5xl font-bold leading-none mb-3"
                    style={{ fontFamily: SERIF, color: GOLD, opacity: 0.4 }}
                  >
                    "
                  </p>
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-base leading-relaxed italic" style={{ color: "rgba(255,255,255,0.72)" }}>
                    {t.text}
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ backgroundColor: GOLD + "33", color: GOLD, fontFamily: SERIF }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-white" style={{ fontFamily: SERIF }}>
                      {t.name}
                    </p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {t.role} · {t.room}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24" style={{ backgroundColor: CREAM }}>
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: STONE }}>
              FAQ
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-3" style={{ fontFamily: SERIF, color: DARK }}>
              Pertanyaan Umum
            </h2>
            <p className="text-base" style={{ color: "#6b5a4e" }}>
              Jawaban atas pertanyaan yang paling sering ditanyakan.
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
                style={{ boxShadow: "0 2px 12px rgba(26,12,7,0.07)" }}
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-base" style={{ fontFamily: SERIF, color: DARK }}>
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                    style={{ color: STONE }}
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
                      <p className="px-5 pb-5 text-base leading-relaxed" style={{ color: "#6b5a4e" }}>
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
            <p className="text-sm mb-4" style={{ color: "#6b5a4e" }}>
              Masih ada pertanyaan lain?
            </p>
            <a
              href={WA_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white transition-all hover:opacity-90"
              style={{ backgroundColor: DARK }}
            >
              Tanya via WhatsApp <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── KONTAK + MAPS ── */}
      <section id="kontak" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: STONE }}>
                Hubungi Kami
              </p>
              <h2 className="text-4xl font-bold mb-5" style={{ fontFamily: SERIF, color: DARK }}>
                Lokasi & Kontak
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#6b5a4e" }}>
                Terletak di ketinggian 1.400 mdpl, hanya 2 jam dari pusat kota Bandung.
                Hubungi kami untuk reservasi atau informasi lebih lanjut.
              </p>

              <div className="flex flex-col gap-5">
                {[
                  { icon: MapPin, label: "Alamat", val: "Jl. Raya Puncak No. 12, Cipanas, Cianjur, Jawa Barat 43254" },
                  { icon: Phone, label: "WhatsApp", val: "+62 895-335-501192" },
                  { icon: Mail, label: "Email", val: "info@villasejukpuncak.id" },
                  { icon: Clock, label: "Check-in / Check-out", val: "Check-in 14.00 · Check-out 12.00" },
                ].map(({ icon: Icon, label, val }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: STONE + "18", color: STONE }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-medium" style={{ color: "#9c8878" }}>{label}</p>
                      <p className="text-base font-medium" style={{ color: DARK }}>{val}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={WA_GENERAL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full font-bold text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: DARK, color: GOLD }}
              >
                Konsultasi Gratis via WhatsApp <ChevronRight className="w-4 h-4" />
              </a>
            </motion.div>

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
                title="Lokasi Villa Sejuk Puncak"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.0!2d107.026!3d-6.706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNDInMjEuNiJTIDEwN8KwMDEnMzMuNiJF!5e0!3m2!1sen!2sid!4v1"
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
      <section className="py-28 relative overflow-hidden" style={{ backgroundColor: DARK }}>
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: `url(${IMG.hero})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse at center, ${GOLD}15 0%, transparent 70%)` }}
        />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-5" style={{ color: GOLD }}>
              ✦ Reservasi Sekarang
            </p>
            <h2
              className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight"
              style={{ fontFamily: SERIF }}
            >
              Waktunya beristirahat,
              <br />
              <em style={{ color: GOLD }}>dengan cara terbaik.</em>
            </h2>
            <p className="text-lg mb-10 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
              Hubungi kami sekarang dan dapatkan konsultasi penginapan gratis.
              Kamar terbatas — amankan tanggal Anda.
            </p>
            <a
              href={WA_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: GOLD, color: DARK, boxShadow: `0 8px 32px ${GOLD}40` }}
            >
              Chat WhatsApp Sekarang <ChevronRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-14 px-6" style={{ backgroundColor: "#120800" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
            <div className="max-w-xs">
              <p className="text-xl font-bold mb-1" style={{ fontFamily: SERIF, color: "#f5f0e8" }}>
                Villa Sejuk<span style={{ color: GOLD, fontStyle: "italic" }}> Puncak</span>
              </p>
              <p className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>
                Luxury Mountain Retreat
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#8c7a6a" }}>
                Penginapan premium di ketinggian Puncak, Jawa Barat. Menawarkan ketenangan alam dan kemewahan dalam satu paket.
              </p>
            </div>

            <div className="flex gap-14">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Kamar
                </p>
                {rooms.map((r) => (
                  <p key={r.id} className="text-sm mb-2" style={{ color: "#8c7a6a" }}>
                    {r.name}
                  </p>
                ))}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Kontak
                </p>
                <p className="flex items-center gap-2 text-sm mb-2" style={{ color: "#8c7a6a" }}>
                  <Phone className="w-3.5 h-3.5" />
                  +62 895-335-501192
                </p>
                <p className="flex items-center gap-2 text-sm mb-2" style={{ color: "#8c7a6a" }}>
                  <Mail className="w-3.5 h-3.5" />
                  info@villasejukpuncak.id
                </p>
                <p className="flex items-center gap-2 text-sm" style={{ color: "#8c7a6a" }}>
                  <MapPin className="w-3.5 h-3.5" />
                  Cipanas, Cianjur
                </p>
              </div>
            </div>
          </div>

          <div
            className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)", color: "#6b5a4e" }}
          >
            <p>© 2025 Villa Sejuk Puncak. Hak cipta dilindungi.</p>
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
