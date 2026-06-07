"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import {
  Star, MapPin, Check, Clock, Car, Award, Users, Fuel, Gauge,
  MessageCircle, Phone, Mail, Menu, X, ChevronDown, ChevronUp,
  ArrowRight, ChevronRight, Navigation, Sparkles, ShieldCheck,
  KeyRound, Search, FileCheck2, Compass, Headset,
} from "lucide-react"

// ── WA ────────────────────────────────────────────────────────────
const WA            = "62895335501192"
const waLink        = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`
const WA_DEMO       = waLink("Halo NehanDev! Saya tertarik membuat website rental mobil seperti demo FastRide untuk bisnis saya.")
const WA_KONSULTASI = waLink("Halo FastRide Rental! Saya mau tanya-tanya dulu — unit apa yang cocok buat rencana perjalanan saya?")

// ── Tokens ────────────────────────────────────────────────────────
const INK     = "#0b0d10"
const CARD    = "#15181d"
const CARD2   = "#1d2128"
const ORANGE  = "#f97316"
const ORDIM   = "rgba(249,115,22,0.12)"
const CREAM   = "#f2f1ed"
const GRAY    = "#9a9da5"
const LGRAY   = "#6b6e76"
const BORDER  = "rgba(255,255,255,0.07)"
const BORDER2 = "rgba(255,255,255,0.15)"
const WHITE   = "#ffffff"
const DISPLAY = "var(--font-oswald, sans-serif)"
const SANS    = "var(--font-manrope, sans-serif)"

const rp    = (n: number) => "Rp " + n.toLocaleString("id-ID")
const today = new Date().toISOString().split("T")[0]

const ADDRESS   = "Jl. Laksda Adisucipto No. 88, Sleman, Yogyakarta"
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("FastRide Rental, " + ADDRESS)}`

// ── Types ─────────────────────────────────────────────────────────
type Vehicle  = { id: string; name: string; tagline: string; desc: string; price: number; capacity: string; transmission: string; fuel: string; img: string; badge?: string; includes: string[] }
type Addon    = { id: string; emoji: string; name: string; price: number; label: string }
type Driver   = { id: string; name: string; role: string; specialty: string; experience: string; img: string }
type Location = { id: string; name: string; detail: string }

// ── Data ──────────────────────────────────────────────────────────
const FLEET: Vehicle[] = [
  { id: "agya",     name: "Toyota Agya 1.2 G",        tagline: "Lincah & irit di tengah kota",      desc: "City car hemat BBM yang gesit untuk rute dalam kota — pas buat 1–4 orang dengan bawaan ringkas.",                  price: 350000,  capacity: "4 penumpang", transmission: "Automatic", fuel: "1:18 km/liter", img: "/images/demo/rental/fleet-agya.png",     badge: "Paling Hemat", includes: ["BBM full tangki", "Asuransi dasar (TLO)", "Bantuan darurat 24 jam", "Cek 50-titik sebelum serah terima"] },
  { id: "avanza",   name: "Toyota Avanza 1.5 G",      tagline: "Lapang buat keluarga & rombongan",  desc: "MPV 7-seater dengan kabin luas dan AC dingin merata — andalan untuk liburan keluarga atau perjalanan grup.",        price: 450000,  capacity: "7 penumpang", transmission: "Automatic", fuel: "1:14 km/liter", img: "/images/demo/rental/fleet-avanza.webp",   badge: "Terpopuler",   includes: ["BBM full tangki", "Asuransi dasar (TLO)", "Bantuan darurat 24 jam", "Cek 50-titik sebelum serah terima"] },
  { id: "fortuner", name: "Toyota Fortuner VRZ",      tagline: "Tangguh di kota maupun luar kota",  desc: "SUV bertenaga dengan ground clearance tinggi — nyaman untuk jarak jauh, jalan menanjak, atau gaya yang lebih tegas.", price: 850000,  capacity: "7 penumpang", transmission: "Automatic", fuel: "1:9 km/liter",  img: "/images/demo/rental/fleet-fortuner.jpg", badge: "Best Value",   includes: ["BBM full tangki", "Asuransi dasar (TLO)", "Bantuan darurat 24 jam", "Cek 50-titik sebelum serah terima"] },
  { id: "alphard",  name: "Toyota Alphard Transformer", tagline: "Kemewahan untuk momen penting",   desc: "Van VIP dengan captain seat dan kabin senyap — pilihan tepat untuk jemput tamu, acara resmi, atau perjalanan eksekutif.", price: 1750000, capacity: "6 penumpang", transmission: "Automatic", fuel: "1:7 km/liter",  img: "/images/demo/rental/fleet-alphard.webp",  badge: "Premium",      includes: ["BBM full tangki", "Asuransi all-risk", "Sopir & bensin opsional", "Cek 50-titik sebelum serah terima"] },
]

const ADDONS: Addon[] = [
  { id: "gps",        emoji: "🧭", name: "GPS Navigasi",          price: 35000, label: "Rp 35.000/hari" },
  { id: "kursi-anak", emoji: "👶", name: "Kursi Anak (Child Seat)", price: 40000, label: "Rp 40.000/hari" },
  { id: "asuransi",   emoji: "🛡️", name: "Asuransi All Risk",     price: 75000, label: "Rp 75.000/hari" },
  { id: "wifi",       emoji: "📶", name: "WiFi Portable",         price: 50000, label: "Rp 50.000/hari" },
]

const DRIVERS: Driver[] = [
  { id: "slamet", name: "Pak Slamet Widodo",  role: "Senior Driver",   specialty: "Hafal seluruh rute Yogyakarta & sekitarnya", experience: "12 tahun pengalaman", img: "/images/demo/rental/driver-slamet.jpg" },
  { id: "yanto",  name: "Pak Yanto Prasetyo", role: "Driver Wisata",   specialty: "Spesialis trip luar kota & destinasi wisata", experience: "8 tahun pengalaman",  img: "/images/demo/rental/driver-yanto.jpg" },
  { id: "dedi",   name: "Pak Dedi Kurniawan", role: "Driver Eksekutif", specialty: "Perjalanan bisnis & acara formal",            experience: "6 tahun pengalaman",  img: "/images/demo/rental/driver-dedi.jpg" },
]

const LOCATIONS: Location[] = [
  { id: "kantor",  name: "Kantor FastRide",        detail: "Jl. Laksda Adisucipto No. 88, Sleman" },
  { id: "bandara", name: "Bandara YIA / Adisutjipto", detail: "Jemput langsung di area kedatangan" },
  { id: "stasiun", name: "Stasiun Tugu / Lempuyangan", detail: "Jemput langsung di pintu keluar stasiun" },
  { id: "antar",   name: "Antar ke Lokasi Kamu",   detail: "Hotel / alamat custom — biaya antar menyesuaikan jarak" },
]

const DRIVER_FEE = 150000

const STEPS = [
  { icon: Search,     title: "Pilih Mobil & Tanggal",   desc: "Cek armada yang tersedia, lalu tentukan tanggal ambil & kembali sesuai rencana perjalananmu." },
  { icon: MessageCircle, title: "Konfirmasi via WhatsApp", desc: "Kirim detail booking — tim kami balas dalam hitungan menit dengan rincian harga & ketersediaan unit." },
  { icon: FileCheck2, title: "Verifikasi Dokumen",       desc: "Siapkan KTP & SIM aktif untuk verifikasi singkat saat pengambilan unit di lokasi." },
  { icon: KeyRound,   title: "Ambil Unit & Jalan!",      desc: "Terima kunci, cek kondisi mobil bareng tim kami, lalu langsung gas ke tujuanmu." },
]

const GUARANTEES = [
  { icon: ShieldCheck, text: "Cek 50 titik sebelum serah terima" },
  { icon: Car,         text: "Unit pengganti gratis jika ada kendala dalam 24 jam" },
  { icon: Headset,     text: "Bantuan darurat siaga setiap saat" },
  { icon: Sparkles,    text: "Tanpa biaya tersembunyi — harga di awal, harga di akhir" },
]

const REVIEWS = [
  { initials: "AR", name: "Andika Ramadhan",  origin: "Jakarta",   unit: "Toyota Avanza",   date: "Mei 2025", text: "Mobilnya bersih dan wangi pas diambil, AC dingin banget buat perjalanan ke Borobudur sama keluarga. Proses booking di WA juga gercep, nggak pakai ribet." },
  { initials: "KW", name: "Kevin & Winda",    origin: "Surabaya",  unit: "Toyota Fortuner", date: "Apr 2025", text: "Dipakai buat road trip ke Dieng, mesinnya enak banget di tanjakan. Sopirnya ramah dan ngerti spot foto bagus. Recommended banget pokoknya!" },
  { initials: "SH", name: "Sari Handayani",   origin: "Bandung",   unit: "Toyota Alphard",  date: "Jun 2025", text: "Sewa buat acara kantor, mobilnya mewah dan rapi banget. Driver eksekutifnya on-time dan sopan — bikin tamu kami terkesan sejak turun dari mobil." },
]

const GALLERY = [
  "/images/demo/rental/fleet-agya.png",
  "/images/demo/rental/fleet-avanza.webp",
  "/images/demo/rental/gallery-roadtrip.jpg",
  "/images/demo/rental/fleet-fortuner.jpg",
  "/images/demo/rental/gallery-handover.jpg",
  "/images/demo/rental/fleet-alphard.webp",
]

const COVERAGE = ["Kota Yogyakarta", "Sleman & Bantul", "Bandara YIA & Adisutjipto", "Magelang (Borobudur)", "Klaten (Prambanan)", "Kulon Progo & Gunungkidul"]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] } }),
}

// ── Page ──────────────────────────────────────────────────────────
export default function RentalDemo() {
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [scrolled,    setScrolled]    = useState(false)
  const [drawerCar,   setDrawerCar]   = useState<Vehicle | null>(null)
  const [driveMode,   setDriveMode]   = useState<"sendiri" | "sopir">("sendiri")
  const [driverId,    setDriverId]    = useState<string>("any")
  const [pickupDate,  setPickupDate]  = useState("")
  const [returnDate,  setReturnDate]  = useState("")
  const [locationId,  setLocationId]  = useState<string>(LOCATIONS[0].id)
  const [addons,      setAddons]      = useState<string[]>([])
  const [showAddons,  setShowAddons]  = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  useEffect(() => {
    return () => { document.body.style.overflow = "" }
  }, [])

  useEffect(() => {
    if (!drawerCar) return
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") closeDrawer() }
    window.addEventListener("keydown", fn)
    return () => window.removeEventListener("keydown", fn)
  }, [drawerCar])

  function openDrawer(car: Vehicle) {
    setDrawerCar(car)
    setDriveMode("sendiri")
    setDriverId("any")
    setPickupDate("")
    setReturnDate("")
    setLocationId(LOCATIONS[0].id)
    setAddons([])
    setShowAddons(false)
    document.body.style.overflow = "hidden"
  }
  function closeDrawer() {
    setDrawerCar(null)
    document.body.style.overflow = ""
  }

  const days = useMemo(() => {
    if (!pickupDate || !returnDate) return 1
    const diff = (new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / 86400000
    return Math.max(1, Math.round(diff))
  }, [pickupDate, returnDate])

  const addonsTotal = useMemo(() =>
    ADDONS.filter(a => addons.includes(a.id)).reduce((s, a) => s + a.price, 0) * days,
    [addons, days]
  )
  const driverFee = driveMode === "sopir" ? DRIVER_FEE * days : 0

  function buildMsg(car: Vehicle) {
    const fmt      = (d: string) => d ? new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "(belum dipilih)"
    const mode     = driveMode === "sopir" ? "Dengan sopir" : "Lepas kunci (sendiri)"
    const driver   = driveMode === "sopir" ? (driverId === "any" ? "Siapapun yang tersedia" : (DRIVERS.find(d => d.id === driverId)?.name ?? "Siapapun yang tersedia")) : null
    const location = LOCATIONS.find(l => l.id === locationId)?.name ?? LOCATIONS[0].name
    const al       = ADDONS.filter(a => addons.includes(a.id)).map(a => `  • ${a.emoji} ${a.name} × ${days} hari: ${rp(a.price * days)}`).join("\n")
    const carTotal = car.price * days
    const total    = carTotal + driverFee + addonsTotal
    return `Halo FastRide Rental! 🚗\n\nSaya ingin sewa:\n🚘 Unit     : ${car.name}\n🧭 Mode     : ${mode}${driver ? `\n🧑‍✈️ Sopir    : ${driver}` : ""}\n📅 Ambil    : ${fmt(pickupDate)}\n📅 Kembali  : ${fmt(returnDate)} (${days} hari)\n📍 Lokasi   : ${location}${addons.length > 0 ? `\n\n🎁 Tambahan:\n${al}` : ""}\n\n💰 Estimasi:\n  • ${car.name} × ${days} hari: ${rp(carTotal)}${driverFee > 0 ? `\n  • Sopir × ${days} hari: ${rp(driverFee)}` : ""}${addonsTotal > 0 ? `\n  • Tambahan: ${rp(addonsTotal)}` : ""}\n  • *Total: ${rp(total)}*\n\nMohon konfirmasi ketersediaan unit untuk tanggal saya. Terima kasih! 🙏`
  }

  return (
    <div style={{ fontFamily: SANS, backgroundColor: INK, color: CREAM }}>

      {/* ── HEADER ──────────────────────────────────────────────── */}
      <header
        className="fixed top-[40px] left-0 right-0 z-50 flex flex-col transition-all duration-300"
        style={{
          backgroundColor: scrolled ? INK : "transparent",
          borderBottom:    scrolled ? `1px solid ${BORDER}` : "none",
          boxShadow:       scrolled ? "0 1px 24px rgba(0,0,0,0.5)" : "none",
        }}>
        <div style={{ height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: "1280px", width: "100%", margin: "0 auto", padding: "0 24px" }}>
          <a href="/demo/rental" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: ORANGE }}>
              <Car className="w-4 h-4 text-white" />
            </div>
            <span style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "22px", letterSpacing: "0.02em", color: WHITE }}>
              FAST<span style={{ color: ORANGE }}>RIDE</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {[["Armada", "#armada"], ["Sopir", "#sopir"], ["Cara Sewa", "#cara-sewa"], ["Lokasi", "#lokasi"]].map(([l, h]) => (
              <a key={l} href={h}
                className="font-semibold uppercase transition-colors hover:text-white"
                style={{ color: GRAY, fontSize: "11px", letterSpacing: "0.16em" }}>{l}</a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href={WA_DEMO} target="_blank" rel="noopener noreferrer"
              className="px-5 py-2.5 rounded text-sm font-bold text-white transition-all hover:opacity-85 active:scale-95"
              style={{ backgroundColor: ORANGE, letterSpacing: "0.02em" }}>
              Sewa Sekarang
            </a>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(v => !v)} style={{ color: WHITE }}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-6 pb-5 pt-2 flex flex-col gap-1" style={{ backgroundColor: INK, borderTop: `1px solid ${BORDER}` }}>
            {[["Armada", "#armada"], ["Sopir", "#sopir"], ["Cara Sewa", "#cara-sewa"], ["Lokasi", "#lokasi"]].map(([l, h]) => (
              <a key={l} href={h} onClick={() => setMenuOpen(false)}
                className="py-3 text-sm font-semibold border-b"
                style={{ color: CREAM, borderColor: BORDER }}>{l}</a>
            ))}
            <a href={WA_DEMO} target="_blank" rel="noopener noreferrer"
              className="mt-3 py-3 rounded text-sm font-bold text-white text-center"
              style={{ backgroundColor: ORANGE }}>
              Sewa Sekarang
            </a>
          </div>
        )}
      </header>

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative flex items-end" style={{ height: "100svh", minHeight: "640px" }}>
        <Image src="/images/demo/rental/hero.jpg" alt="FastRide Rental" fill priority
          className="object-cover" sizes="100vw" />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(11,13,16,0.4) 0%, rgba(11,13,16,0.6) 55%, rgba(11,13,16,0.97) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(11,13,16,0.7) 0%, transparent 55%)" }} />

        <div className="relative w-full max-w-[1280px] mx-auto px-6 pb-20">
          <motion.div initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>

            <div className="flex items-center gap-1.5 mb-6 flex-wrap">
              <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded"
                style={{ backgroundColor: "rgba(255,255,255,0.06)", color: CREAM, border: `1px solid ${BORDER2}` }}>
                <MapPin className="w-3 h-3" style={{ color: ORANGE }} /> Yogyakarta & sekitarnya
              </span>
              <span className="hidden sm:flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded"
                style={{ backgroundColor: "rgba(255,255,255,0.06)", color: CREAM, border: `1px solid ${BORDER2}` }}>
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> 4.8 · 312 ulasan Google
              </span>
            </div>

            <h1 style={{ fontFamily: DISPLAY, fontWeight: 700, color: WHITE, fontSize: "clamp(44px, 8.5vw, 100px)", lineHeight: 1.0, letterSpacing: "0.01em", marginBottom: "22px", textTransform: "uppercase" }}>
              Sewa mobil,<br />
              <span style={{ color: ORANGE }}>tanpa drama.</span>
            </h1>

            <p className="max-w-lg mb-9 text-base md:text-lg" style={{ color: "rgba(242,241,237,0.7)", lineHeight: 1.65 }}>
              Armada terawat, harga transparan, dan booking dalam hitungan menit — langsung lewat WhatsApp, tanpa antre ke kantor.
            </p>

            <div className="flex flex-wrap gap-3">
              <a href="#armada"
                className="flex items-center gap-2 px-7 py-3.5 rounded text-sm font-bold text-white transition-all hover:opacity-85 active:scale-95"
                style={{ backgroundColor: ORANGE }}>
                Lihat Armada <ArrowRight className="w-4 h-4" />
              </a>
              <a href={WA_KONSULTASI} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-3.5 rounded text-sm font-bold transition-all hover:bg-white/10"
                style={{ backgroundColor: "rgba(255,255,255,0.04)", color: WHITE, border: `1px solid ${BORDER2}` }}>
                <MessageCircle className="w-4 h-4" /> Tanya Dulu via WA
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS STRIP ─────────────────────────────────────────── */}
      <section style={{ backgroundColor: CARD, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-[1280px] mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { val: "6+ Tahun",      sub: "Melayani sewa mobil di Yogyakarta" },
              { val: "4.8 / 5.0",     sub: "Rating dari 312 ulasan Google" },
              { val: "40+ Unit",      sub: "Armada terawat & siap jalan" },
              { val: "Layanan 24 Jam", sub: "Siap kapan pun kamu butuh" },
            ].map(s => (
              <div key={s.val}>
                <p className="font-bold text-base" style={{ fontFamily: DISPLAY, letterSpacing: "0.02em", color: WHITE }}>{s.val}</p>
                <p className="text-xs mt-1" style={{ color: LGRAY }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <Image src="/images/demo/rental/about.jpg" alt="Armada FastRide Rental" fill className="object-cover" sizes="50vw" />
            </div>
            <div className="absolute -bottom-6 -right-6 px-5 py-4 rounded-xl hidden md:block"
              style={{ backgroundColor: CARD, boxShadow: "0 16px 48px rgba(0,0,0,0.5)", border: `1px solid ${BORDER2}` }}>
              <div className="flex items-center gap-2 mb-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="font-bold text-sm" style={{ color: WHITE }}>312 perjalanan lancar</p>
              <p className="text-xs" style={{ color: LGRAY }}>sejak 2018</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} custom={0.1} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="order-1 lg:order-2">
            <p className="text-xs font-bold uppercase mb-4" style={{ color: ORANGE, letterSpacing: "0.2em" }}>Tentang Kami</p>
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "clamp(34px,4.2vw,54px)", lineHeight: 1.05, letterSpacing: "0.01em", color: WHITE, marginBottom: "24px", textTransform: "uppercase" }}>
              Bukan sekadar sewa mobil —<br />
              <span style={{ color: ORANGE }}>ini partner perjalananmu.</span>
            </h2>
            <p className="text-base leading-relaxed mb-5" style={{ color: GRAY }}>
              FastRide Rental berdiri sejak 2018 di Yogyakarta, melayani wisatawan, mahasiswa, dan pelaku bisnis yang butuh kendaraan andal tanpa proses ribet. Setiap unit kami cek 50-titik sebelum penyerahan — supaya perjalananmu lancar dari awal sampai akhir.
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: GRAY }}>
              Kami percaya sewa mobil harusnya simpel: pilih unit, tentukan tanggal, dan biar kami yang urus sisanya. Booking via WhatsApp, bayar saat ambil unit, dan tim kami siap membantu 24 jam kalau ada kendala di jalan.
            </p>
            <div className="flex items-center gap-4 p-4 rounded-xl" style={{ backgroundColor: CARD, border: `1px solid ${BORDER}` }}>
              <div className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0 font-bold text-white"
                style={{ backgroundColor: ORANGE, fontFamily: DISPLAY, fontSize: "17px", letterSpacing: "0.04em" }}>
                AF
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: WHITE }}>Ahmad Fauzan</p>
                <p className="text-xs" style={{ color: LGRAY }}>Founder & Fleet Manager · sejak 2018</p>
              </div>
              <a href={WA_DEMO} target="_blank" rel="noopener noreferrer"
                className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded text-xs font-bold text-white shrink-0 transition-opacity hover:opacity-85"
                style={{ backgroundColor: "#25D366" }}>
                <MessageCircle className="w-3.5 h-3.5" /> Chat
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FLEET & PRICING ─────────────────────────────────────── */}
      <section id="armada" className="py-24 px-6" style={{ backgroundColor: CARD, scrollMarginTop: "100px" }}>
        <div className="max-w-[1280px] mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase mb-3" style={{ color: ORANGE, letterSpacing: "0.2em" }}>Armada & Tarif</p>
              <h2 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "clamp(34px,4.2vw,54px)", lineHeight: 1.05, letterSpacing: "0.01em", color: WHITE, textTransform: "uppercase" }}>
                Tarif jelas,<br />tanpa nego dadakan
              </h2>
            </div>
            <p className="text-sm max-w-xs" style={{ color: GRAY }}>
              Setiap unit kami jelaskan spesifikasi dan fasilitasnya — supaya kamu tahu persis apa yang kamu bayar.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FLEET.map((v, i) => (
              <motion.article key={v.id}
                variants={fadeUp} custom={i * 0.08} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="group rounded-2xl overflow-hidden flex flex-col"
                style={{ backgroundColor: INK, border: `1px solid ${BORDER}` }}>
                <div className="relative overflow-hidden shrink-0" style={{ height: "190px" }}>
                  <Image src={v.img} alt={v.name} fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  {v.badge && (
                    <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded"
                      style={{ backgroundColor: ORANGE, color: WHITE, letterSpacing: "0.04em" }}>{v.badge}</span>
                  )}
                  <p className="absolute bottom-4 left-4 right-4 text-white font-bold text-lg leading-tight" style={{ fontFamily: DISPLAY, textTransform: "uppercase", letterSpacing: "0.01em" }}>
                    {v.name}
                  </p>
                </div>

                <div className="flex-1 flex flex-col p-5">
                  <p className="text-sm font-semibold mb-1.5" style={{ color: ORANGE }}>{v.tagline}</p>
                  <p className="text-sm mb-4 flex-1" style={{ color: GRAY, lineHeight: 1.6 }}>{v.desc}</p>
                  <div className="flex flex-wrap gap-3 mb-5 text-xs" style={{ color: LGRAY }}>
                    <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" style={{ color: ORANGE }} />{v.capacity}</span>
                    <span className="flex items-center gap-1.5"><Gauge className="w-3.5 h-3.5" style={{ color: ORANGE }} />{v.transmission}</span>
                    <span className="flex items-center gap-1.5"><Fuel className="w-3.5 h-3.5" style={{ color: ORANGE }} />{v.fuel}</span>
                  </div>
                  <div className="flex items-center justify-between pt-4" style={{ borderTop: `1px solid ${BORDER}` }}>
                    <div>
                      <span className="font-bold text-base" style={{ color: WHITE }}>{rp(v.price)}</span>
                      <span className="text-xs block mt-0.5" style={{ color: LGRAY }}>per hari</span>
                    </div>
                    <button onClick={() => openDrawer(v)}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded text-xs font-bold text-white transition-all hover:opacity-85 active:scale-95"
                      style={{ backgroundColor: ORANGE }}>
                      Sewa <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── DRIVERS ─────────────────────────────────────────────── */}
      <section id="sopir" className="py-24 px-6" style={{ scrollMarginTop: "100px" }}>
        <div className="max-w-[1280px] mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-14 text-center max-w-xl mx-auto">
            <p className="text-xs font-bold uppercase mb-3" style={{ color: ORANGE, letterSpacing: "0.2em" }}>Nggak Mau Nyetir?</p>
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "clamp(34px,4.2vw,54px)", lineHeight: 1.05, letterSpacing: "0.01em", color: WHITE, marginBottom: "12px", textTransform: "uppercase" }}>
              Biar sopir kami yang bawa
            </h2>
            <p className="text-sm" style={{ color: GRAY }}>
              Pilih sopir favoritmu saat booking — atau biarkan kami carikan yang paling pas dengan rencana perjalananmu.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {DRIVERS.map((d, i) => (
              <motion.div key={d.id}
                variants={fadeUp} custom={i * 0.08} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="group rounded-2xl overflow-hidden"
                style={{ backgroundColor: CARD, border: `1px solid ${BORDER}` }}>
                <div className="relative overflow-hidden" style={{ height: "300px" }}>
                  <Image src={d.img} alt={d.name} fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" sizes="33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />
                  <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded"
                    style={{ backgroundColor: "rgba(11,13,16,0.7)", color: ORANGE, border: `1px solid ${BORDER2}`, letterSpacing: "0.06em", backdropFilter: "blur(6px)" }}>
                    {d.role.toUpperCase()}
                  </span>
                </div>
                <div className="p-5">
                  <p className="font-bold text-lg mb-1" style={{ fontFamily: DISPLAY, color: WHITE, letterSpacing: "0.01em" }}>{d.name}</p>
                  <p className="text-sm mb-3" style={{ color: ORANGE }}>{d.specialty}</p>
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: LGRAY }}>
                    <Award className="w-3.5 h-3.5" />{d.experience}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CARA SEWA ───────────────────────────────────────────── */}
      <section id="cara-sewa" className="py-24 px-6" style={{ backgroundColor: CARD, scrollMarginTop: "100px" }}>
        <div className="max-w-[1280px] mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-14 text-center max-w-xl mx-auto">
            <p className="text-xs font-bold uppercase mb-3" style={{ color: ORANGE, letterSpacing: "0.2em" }}>Prosesnya Gampang</p>
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "clamp(34px,4.2vw,54px)", lineHeight: 1.05, letterSpacing: "0.01em", color: WHITE, marginBottom: "12px", textTransform: "uppercase" }}>
              Empat langkah, langsung jalan
            </h2>
            <p className="text-sm" style={{ color: GRAY }}>
              Dari pilih unit sampai pegang kunci — semuanya bisa kelar dalam hitungan menit.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div key={s.title}
                  variants={fadeUp} custom={i * 0.08} initial="hidden" whileInView="show" viewport={{ once: true }}
                  className="relative p-6 rounded-2xl"
                  style={{ backgroundColor: INK, border: `1px solid ${BORDER}` }}>
                  <span className="absolute top-5 right-5 font-bold text-3xl" style={{ fontFamily: DISPLAY, color: BORDER2 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: ORDIM }}>
                    <Icon className="w-5 h-5" style={{ color: ORANGE }} />
                  </div>
                  <p className="font-bold text-base mb-2" style={{ fontFamily: DISPLAY, color: WHITE, letterSpacing: "0.01em" }}>{s.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: GRAY }}>{s.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── GARANSI / TRUST ─────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="rounded-2xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-center overflow-hidden relative"
            style={{ backgroundColor: CARD, border: `1px solid ${BORDER2}` }}>
            <div className="absolute -right-24 -top-24 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ backgroundColor: ORANGE }} />
            <div className="relative">
              <p className="text-xs font-bold uppercase mb-3" style={{ color: ORANGE, letterSpacing: "0.2em" }}>Garansi FastRide</p>
              <h2 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "clamp(30px,3.6vw,46px)", lineHeight: 1.1, letterSpacing: "0.01em", color: WHITE, marginBottom: "16px", textTransform: "uppercase" }}>
                Mobil bermasalah?<br /><span style={{ color: ORANGE }}>Kami ganti, gratis.</span>
              </h2>
              <p className="text-sm leading-relaxed max-w-md" style={{ color: GRAY }}>
                Setiap unit lolos cek 50-titik sebelum diserahkan. Tapi kalau dalam 24 jam pertama ada kendala teknis di luar kendalimu, kami kirim unit pengganti — gratis, tanpa drama, tanpa biaya tambahan.
              </p>
            </div>
            <div className="relative flex flex-col gap-3">
              {GUARANTEES.map((g, i) => {
                const Icon = g.icon
                return (
                  <div key={i} className="flex items-center gap-3.5 p-4 rounded-xl" style={{ backgroundColor: INK, border: `1px solid ${BORDER}` }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: ORDIM }}>
                      <Icon className="w-4.5 h-4.5" style={{ color: ORANGE }} />
                    </div>
                    <p className="text-sm font-medium" style={{ color: CREAM }}>{g.text}</p>
                  </div>
                )
              })}
              <a href={WA_DEMO} target="_blank" rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 px-6 py-3 mt-1 rounded text-sm font-bold text-white transition-all hover:opacity-85"
                style={{ backgroundColor: ORANGE }}>
                Pelajari Garansi <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── GALERI ARMADA + AREA LAYANAN ────────────────────────── */}
      <section className="py-24 px-6" style={{ backgroundColor: CARD }}>
        <div className="max-w-[1280px] mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-14">
            <p className="text-xs font-bold uppercase mb-3" style={{ color: ORANGE, letterSpacing: "0.2em" }}>Galeri Armada</p>
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "clamp(34px,4.2vw,54px)", lineHeight: 1.05, letterSpacing: "0.01em", color: WHITE, textTransform: "uppercase" }}>
              Lihat unit kami beraksi
            </h2>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-2.5 mb-16">
            {GALLERY.map((src, i) => (
              <motion.div key={i}
                variants={fadeUp} custom={i * 0.05} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="relative overflow-hidden rounded-lg group cursor-pointer" style={{ aspectRatio: "1/1" }}>
                <Image src={src} alt={`Galeri armada ${i + 1}`} fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="16vw" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors duration-300">
                  <Car className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── AREA LAYANAN ──────────────────────────────────────── */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="rounded-2xl p-8 md:p-10" style={{ backgroundColor: INK, border: `1px solid ${BORDER}` }}>
            <div className="flex items-start gap-4 mb-7">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: ORDIM }}>
                <Compass className="w-5 h-5" style={{ color: ORANGE }} />
              </div>
              <div>
                <p className="font-bold text-lg mb-1" style={{ fontFamily: DISPLAY, color: WHITE, letterSpacing: "0.01em" }}>Area layanan kami</p>
                <p className="text-sm" style={{ color: GRAY }}>Antar-jemput unit tersedia di seluruh titik berikut — dan sekitarnya.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {COVERAGE.map(c => (
                <span key={c} className="flex items-center gap-2 text-sm px-4 py-3 rounded-xl"
                  style={{ backgroundColor: CARD2, color: CREAM, border: `1px solid ${BORDER}` }}>
                  <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: ORANGE }} />{c}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────── */}
      <section id="testimoni" className="py-24 px-6" style={{ scrollMarginTop: "100px" }}>
        <div className="max-w-[1280px] mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mb-14 text-center">
            <p className="text-xs font-bold uppercase mb-3" style={{ color: ORANGE, letterSpacing: "0.2em" }}>Testimoni</p>
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "clamp(34px,4.2vw,54px)", lineHeight: 1.05, letterSpacing: "0.01em", color: WHITE, marginBottom: "16px", textTransform: "uppercase" }}>
              Kata mereka yang sudah jalan bareng kami
            </h2>
            <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full"
              style={{ backgroundColor: CARD, border: `1px solid ${BORDER}` }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A10.99 10.99 0 0 0 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09a6.6 6.6 0 0 1-.35-2.09c0-.73.13-1.43.35-2.09V7.07H2.18A10.99 10.99 0 0 0 1 12c0 1.77.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="font-bold text-sm" style={{ color: WHITE }}>4.8</span>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
              </div>
              <span className="text-sm" style={{ color: LGRAY }}>312 ulasan Google</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <motion.div key={r.name}
                variants={fadeUp} custom={i * 0.08} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="flex flex-col p-7 rounded-2xl"
                style={{ backgroundColor: CARD, border: `1px solid ${BORDER}` }}>
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-base leading-relaxed flex-1 mb-6" style={{ color: CREAM, fontStyle: "italic" }}>
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="pt-5 flex items-center gap-3" style={{ borderTop: `1px solid ${BORDER}` }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={{ backgroundColor: ORANGE }}>{r.initials}</div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: WHITE }}>{r.name}</p>
                    <p className="text-xs" style={{ color: LGRAY }}>{r.origin} · {r.date} · {r.unit}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATION + CTA ──────────────────────────────────────── */}
      <section id="lokasi" className="py-24 px-6" style={{ scrollMarginTop: "100px" }}>
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="text-xs font-bold uppercase mb-3" style={{ color: ORANGE, letterSpacing: "0.2em" }}>Lokasi</p>
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "clamp(30px,3.6vw,46px)", lineHeight: 1.1, letterSpacing: "0.01em", color: WHITE, marginBottom: "20px", textTransform: "uppercase" }}>
              Datang langsung ke kantor kami
            </h2>
            <div className="rounded-2xl overflow-hidden mb-5" style={{ height: "300px", border: `1px solid ${BORDER}` }}>
              <iframe title="Lokasi FastRide Rental"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.0!2d110.391!3d-7.781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNDYnNTEuNiJTIDExMMKwMjMnMjcuNiJF!5e0!3m2!1sen!2sid!4v1"
                width="100%" height="100%" style={{ border: 0, filter: "grayscale(0.4) invert(0.92) contrast(0.9)" }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" />
            </div>
            <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mb-6 px-5 py-3 rounded text-sm font-bold text-white transition-all hover:opacity-85"
              style={{ backgroundColor: ORANGE }}>
              <Navigation className="w-4 h-4" /> Buka di Google Maps
            </a>
            <div className="flex flex-col gap-3 text-sm" style={{ color: GRAY }}>
              <p className="flex items-start gap-3"><MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: ORANGE }} />{ADDRESS}</p>
              <p className="flex items-center gap-3"><Phone className="w-4 h-4 shrink-0" style={{ color: ORANGE }} />+62 895-335-501192</p>
              <p className="flex items-center gap-3"><Mail className="w-4 h-4 shrink-0" style={{ color: ORANGE }} />halo@fastriderental.id</p>
              <p className="flex items-center gap-3"><Clock className="w-4 h-4 shrink-0" style={{ color: ORANGE }} />Setiap hari · 06.00–22.00 WIB · darurat siaga 24 jam</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} custom={0.1} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden flex flex-col justify-end p-10"
            style={{ minHeight: "440px" }}>
            <Image src="/images/demo/rental/fleet-fortuner.jpg" alt="Sewa sekarang" fill className="object-cover" sizes="50vw" />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(0deg, rgba(11,13,16,0.95) 0%, rgba(11,13,16,0.4) 60%, rgba(11,13,16,0.1) 100%)" }} />
            <div className="relative">
              <p className="text-xs font-bold uppercase mb-3" style={{ color: ORANGE, letterSpacing: "0.2em" }}>Tanpa Antre</p>
              <h3 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "32px", color: WHITE, lineHeight: 1.15, marginBottom: "14px", textTransform: "uppercase", letterSpacing: "0.01em" }}>
                Pesan unitmu sekarang
              </h3>
              <p className="text-sm mb-6" style={{ color: "rgba(242,241,237,0.65)" }}>
                Pilih mobil, tanggal, dan mode berkendara yang kamu mau — kami konfirmasi dalam hitungan menit lewat WhatsApp.
              </p>
              <a href="#armada"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded text-sm font-bold text-white transition-all hover:opacity-85"
                style={{ backgroundColor: ORANGE }}>
                <Car className="w-4 h-4" /> Pilih Unit & Sewa
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer className="px-6 pt-16 pb-8" style={{ backgroundColor: CARD, borderTop: `1px solid ${BORDER}` }}>
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-12 pb-12" style={{ borderBottom: `1px solid ${BORDER}` }}>
            <div className="max-w-xs">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: ORANGE }}>
                  <Car className="w-4 h-4 text-white" />
                </div>
                <span style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "21px", letterSpacing: "0.02em", color: WHITE }}>
                  FAST<span style={{ color: ORANGE }}>RIDE</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: LGRAY }}>
                Rental mobil modern di Yogyakarta. Armada terawat, harga transparan, dan booking yang bikin perjalananmu tetap lancar.
              </p>
            </div>
            <div className="flex flex-wrap gap-12 text-sm">
              <div>
                <p className="text-xs font-bold uppercase mb-4" style={{ color: LGRAY, letterSpacing: "0.16em" }}>Armada</p>
                {FLEET.map(v => (
                  <button key={v.id} onClick={() => openDrawer(v)}
                    className="block mb-2.5 text-left transition-opacity hover:opacity-70"
                    style={{ color: GRAY }}>{v.name}</button>
                ))}
              </div>
              <div>
                <p className="text-xs font-bold uppercase mb-4" style={{ color: LGRAY, letterSpacing: "0.16em" }}>Navigasi</p>
                {[["Armada", "#armada"], ["Sopir", "#sopir"], ["Cara Sewa", "#cara-sewa"], ["Lokasi", "#lokasi"]].map(([l, h]) => (
                  <a key={l} href={h} className="block mb-2.5 transition-opacity hover:opacity-70" style={{ color: GRAY }}>{l}</a>
                ))}
              </div>
              <div>
                <p className="text-xs font-bold uppercase mb-4" style={{ color: LGRAY, letterSpacing: "0.16em" }}>Kontak</p>
                <p className="mb-2.5 text-sm" style={{ color: GRAY }}>+62 895-335-501192</p>
                <p className="mb-2.5 text-sm" style={{ color: GRAY }}>halo@fastriderental.id</p>
                <p className="text-sm" style={{ color: GRAY }}>Sleman, Yogyakarta</p>
              </div>
            </div>
          </div>
          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs" style={{ color: "rgba(242,241,237,0.25)" }}>
            <p>© 2025 FastRide Rental. Hak cipta dilindungi.</p>
            <p>Website oleh <a href="https://nehandev.com" className="font-bold transition-colors hover:text-white" style={{ color: "#fdba74" }}>NehanDev</a></p>
          </div>
        </div>
      </footer>

      {/* ── WA FLOAT ────────────────────────────────────────────── */}
      <motion.a href={WA_DEMO} target="_blank" rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.4 }}
        className="hidden lg:flex fixed bottom-6 right-5 z-[150] items-center gap-2 px-4 py-3 rounded-full font-bold text-sm text-white transition-all hover:scale-105"
        style={{ backgroundColor: "#25D366", boxShadow: "0 4px 20px rgba(37,211,102,0.4)" }}>
        <MessageCircle className="w-4 h-4" /> Chat WA
      </motion.a>

      {/* ── BOOKING DRAWER ──────────────────────────────────────── */}
      <AnimatePresence>
        {drawerCar && (
          <>
            <motion.div key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[200]"
              style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(3px)" }}
              onClick={closeDrawer} />

            <motion.div key="drawer"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-[210] flex flex-col"
              style={{ width: "min(460px, 100vw)", boxShadow: "-4px 0 48px rgba(0,0,0,0.5)", backgroundColor: INK, color: CREAM }}
              onClick={e => e.stopPropagation()}>

              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-4 shrink-0" style={{ borderBottom: `1px solid ${BORDER}` }}>
                <div>
                  <p className="text-xs font-bold uppercase" style={{ color: LGRAY, letterSpacing: "0.16em" }}>Sewa Unit</p>
                  <p className="font-bold text-lg" style={{ fontFamily: DISPLAY, color: WHITE, letterSpacing: "0.01em" }}>{drawerCar.name}</p>
                </div>
                <button onClick={closeDrawer}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                  style={{ color: CREAM }}>
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Car image + price */}
              <div className="relative shrink-0" style={{ height: "180px" }}>
                <Image src={drawerCar.img} alt={drawerCar.name} fill className="object-cover" sizes="460px" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                  <div>
                    <p className="text-white font-bold text-2xl" style={{ fontFamily: DISPLAY, letterSpacing: "0.01em" }}>
                      {rp(drawerCar.price)}
                    </p>
                    <p className="text-xs" style={{ color: "rgba(242,241,237,0.7)" }}>per hari</p>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded" style={{ backgroundColor: "rgba(11,13,16,0.6)", color: CREAM, backdropFilter: "blur(6px)" }}>
                    <Users className="w-3.5 h-3.5" />{drawerCar.capacity}
                  </span>
                </div>
              </div>

              {/* Form */}
              <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">

                {/* Drive mode */}
                <div>
                  <p className="text-xs font-bold uppercase mb-3" style={{ color: LGRAY, letterSpacing: "0.16em" }}>Mode Berkendara</p>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button onClick={() => setDriveMode("sendiri")}
                      className="flex flex-col items-start gap-2 px-4 py-3.5 rounded-xl text-left transition-colors"
                      style={{ border: `1.5px solid ${driveMode === "sendiri" ? ORANGE : BORDER}`, backgroundColor: driveMode === "sendiri" ? ORDIM : "transparent" }}>
                      <KeyRound className="w-4 h-4" style={{ color: driveMode === "sendiri" ? ORANGE : LGRAY }} />
                      <span className="font-semibold text-sm" style={{ color: WHITE }}>Lepas Kunci</span>
                      <span className="text-xs" style={{ color: LGRAY }}>Kamu yang nyetir sendiri</span>
                    </button>
                    <button onClick={() => setDriveMode("sopir")}
                      className="flex flex-col items-start gap-2 px-4 py-3.5 rounded-xl text-left transition-colors"
                      style={{ border: `1.5px solid ${driveMode === "sopir" ? ORANGE : BORDER}`, backgroundColor: driveMode === "sopir" ? ORDIM : "transparent" }}>
                      <Users className="w-4 h-4" style={{ color: driveMode === "sopir" ? ORANGE : LGRAY }} />
                      <span className="font-semibold text-sm" style={{ color: WHITE }}>Dengan Sopir</span>
                      <span className="text-xs" style={{ color: LGRAY }}>+{rp(DRIVER_FEE)}/hari</span>
                    </button>
                  </div>
                </div>

                {/* Driver picker (conditional) */}
                <AnimatePresence>
                  {driveMode === "sopir" && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}>
                      <p className="text-xs font-bold uppercase mb-3" style={{ color: LGRAY, letterSpacing: "0.16em" }}>Pilih Sopir</p>
                      <div className="flex flex-col gap-2">
                        <button onClick={() => setDriverId("any")}
                          className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-left transition-colors"
                          style={{ border: `1.5px solid ${driverId === "any" ? ORANGE : BORDER}`, backgroundColor: driverId === "any" ? ORDIM : "transparent" }}>
                          <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: CARD2 }}>
                            <Users className="w-4 h-4" style={{ color: driverId === "any" ? ORANGE : LGRAY }} />
                          </div>
                          <div>
                            <p className="font-semibold text-sm" style={{ color: WHITE }}>Siapapun yang tersedia</p>
                            <p className="text-xs" style={{ color: LGRAY }}>Dijadwalkan oleh tim kami</p>
                          </div>
                        </button>
                        {DRIVERS.map(d => {
                          const on = driverId === d.id
                          return (
                            <button key={d.id} onClick={() => setDriverId(d.id)}
                              className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-left transition-colors"
                              style={{ border: `1.5px solid ${on ? ORANGE : BORDER}`, backgroundColor: on ? ORDIM : "transparent" }}>
                              <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0">
                                <Image src={d.img} alt={d.name} fill className="object-cover" sizes="36px" />
                              </div>
                              <div>
                                <p className="font-semibold text-sm" style={{ color: WHITE }}>{d.name}</p>
                                <p className="text-xs" style={{ color: LGRAY }}>{d.specialty}</p>
                              </div>
                              {on && <Check className="w-4 h-4 ml-auto shrink-0" style={{ color: ORANGE }} />}
                            </button>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase mb-3" style={{ color: LGRAY, letterSpacing: "0.16em" }}>Ambil</p>
                    <input type="date" min={today} value={pickupDate}
                      onChange={e => { setPickupDate(e.target.value); if (returnDate && e.target.value > returnDate) setReturnDate("") }}
                      className="w-full px-3.5 py-3 rounded-xl text-sm font-medium outline-none cursor-pointer"
                      style={{ border: `1.5px solid ${pickupDate ? ORANGE : BORDER}`, backgroundColor: CARD2, color: CREAM, colorScheme: "dark" }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase mb-3" style={{ color: LGRAY, letterSpacing: "0.16em" }}>Kembali</p>
                    <input type="date" min={pickupDate || today} value={returnDate}
                      onChange={e => setReturnDate(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl text-sm font-medium outline-none cursor-pointer"
                      style={{ border: `1.5px solid ${returnDate ? ORANGE : BORDER}`, backgroundColor: CARD2, color: CREAM, colorScheme: "dark" }} />
                  </div>
                </div>
                {pickupDate && returnDate && (
                  <p className="-mt-2.5 text-xs flex items-center gap-1.5" style={{ color: ORANGE }}>
                    <Clock className="w-3.5 h-3.5" /> Durasi sewa: {days} hari
                  </p>
                )}

                {/* Pickup location */}
                <div>
                  <p className="text-xs font-bold uppercase mb-3" style={{ color: LGRAY, letterSpacing: "0.16em" }}>Lokasi Pengambilan</p>
                  <div className="flex flex-col gap-2">
                    {LOCATIONS.map(l => {
                      const on = locationId === l.id
                      return (
                        <button key={l.id} onClick={() => setLocationId(l.id)}
                          className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-left transition-colors"
                          style={{ border: `1.5px solid ${on ? ORANGE : BORDER}`, backgroundColor: on ? ORDIM : "transparent" }}>
                          <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: CARD2 }}>
                            <MapPin className="w-4 h-4" style={{ color: on ? ORANGE : LGRAY }} />
                          </div>
                          <div>
                            <p className="font-semibold text-sm" style={{ color: WHITE }}>{l.name}</p>
                            <p className="text-xs" style={{ color: LGRAY }}>{l.detail}</p>
                          </div>
                          {on && <Check className="w-4 h-4 ml-auto shrink-0" style={{ color: ORANGE }} />}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Add-ons */}
                <div>
                  <button onClick={() => setShowAddons(v => !v)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors hover:bg-white/5"
                    style={{ border: `1.5px solid ${BORDER}` }}>
                    <span className="text-sm font-semibold" style={{ color: WHITE }}>
                      🎁 Layanan Tambahan {addons.length > 0 ? `(${addons.length} dipilih)` : ""}
                    </span>
                    {showAddons
                      ? <ChevronUp className="w-4 h-4" style={{ color: LGRAY }} />
                      : <ChevronDown className="w-4 h-4" style={{ color: LGRAY }} />}
                  </button>
                  <AnimatePresence>
                    {showAddons && (
                      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}>
                        <div className="mt-2 rounded-xl p-3 flex flex-col gap-1.5" style={{ backgroundColor: CARD2, border: `1px solid ${BORDER}` }}>
                          {ADDONS.map(a => {
                            const on = addons.includes(a.id)
                            return (
                              <button key={a.id} onClick={() => setAddons(p => on ? p.filter(x => x !== a.id) : [...p, a.id])}
                                className="flex items-center justify-between py-2 px-1 rounded-lg transition-colors hover:bg-white/5 text-left">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all"
                                    style={{ borderColor: on ? ORANGE : BORDER2, backgroundColor: on ? ORANGE : "transparent" }}>
                                    {on && <Check className="w-2.5 h-2.5 text-white" />}
                                  </div>
                                  <span className="text-sm" style={{ color: CREAM }}>{a.emoji} {a.name}</span>
                                </div>
                                <span className="text-xs shrink-0 ml-2" style={{ color: LGRAY }}>{a.label}</span>
                              </button>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Price summary */}
                <div className="rounded-xl p-4" style={{ backgroundColor: ORDIM, border: `1px solid rgba(249,115,22,0.3)` }}>
                  <p className="text-xs font-bold uppercase mb-3" style={{ color: ORANGE, letterSpacing: "0.16em" }}>Estimasi Biaya</p>
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex justify-between">
                      <span style={{ color: CREAM }}>{drawerCar.name} × {days} hari</span>
                      <span className="font-semibold" style={{ color: CREAM }}>{rp(drawerCar.price * days)}</span>
                    </div>
                    {driverFee > 0 && (
                      <div className="flex justify-between">
                        <span style={{ color: CREAM }}>🧑‍✈️ Sopir × {days} hari</span>
                        <span className="font-semibold" style={{ color: CREAM }}>{rp(driverFee)}</span>
                      </div>
                    )}
                    {ADDONS.filter(a => addons.includes(a.id)).map(a => (
                      <div key={a.id} className="flex justify-between">
                        <span style={{ color: CREAM }}>{a.emoji} {a.name} × {days} hari</span>
                        <span className="font-semibold" style={{ color: CREAM }}>{rp(a.price * days)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between font-bold text-base pt-2" style={{ borderTop: `1px solid rgba(249,115,22,0.3)`, color: WHITE }}>
                      <span>Total Estimasi</span>
                      <span style={{ color: ORANGE }}>{rp(drawerCar.price * days + driverFee + addonsTotal)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Drawer footer */}
              <div className="px-6 py-4 shrink-0" style={{ borderTop: `1px solid ${BORDER}` }}>
                <a href={waLink(buildMsg(drawerCar))} target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base text-white transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ backgroundColor: ORANGE, boxShadow: `0 4px 16px rgba(249,115,22,0.35)` }}>
                  <MessageCircle className="w-5 h-5" /> Sewa via WhatsApp
                </a>
                <p className="text-center text-xs mt-2" style={{ color: LGRAY }}>
                  Tidak ada biaya sampai pesananmu dikonfirmasi
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
