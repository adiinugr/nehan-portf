"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import {
  Star, MapPin, Check, Clock, Scissors, Award, Instagram,
  MessageCircle, Phone, Mail, Menu, X, ChevronDown, ChevronUp,
  ArrowRight, ChevronRight, Navigation, Sparkles, Users,
} from "lucide-react"

// ── WA ────────────────────────────────────────────────────────────
const WA            = "62895335501192"
const waLink        = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`
const WA_DEMO       = waLink("Halo NehanDev! Saya tertarik membuat website barbershop seperti demo Kings untuk bisnis saya.")
const WA_KONSULTASI = waLink("Halo Kings Barbershop! Saya mau konsultasi dulu — gaya rambut apa yang cocok buat bentuk wajah saya?")

// ── Tokens ────────────────────────────────────────────────────────
const INK     = "#0c0c0d"
const CARD    = "#18181b"
const CARD2   = "#212124"
const RED     = "#ef4444"
const REDDIM  = "rgba(239,68,68,0.12)"
const CREAM   = "#f3f1ec"
const GRAY    = "#9b9b9f"
const LGRAY   = "#6c6c70"
const BORDER  = "rgba(255,255,255,0.08)"
const BORDER2 = "rgba(255,255,255,0.16)"
const WHITE   = "#ffffff"
const DISPLAY = "var(--font-anton, sans-serif)"
const SANS    = "var(--font-work-sans, sans-serif)"

const rp    = (n: number) => "Rp " + n.toLocaleString("id-ID")
const today = new Date().toISOString().split("T")[0]

const ADDRESS   = "Jl. Boulevard Raya No. 88, Kelapa Gading, Jakarta Utara"
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Kings Barbershop, " + ADDRESS)}`

// ── Types ─────────────────────────────────────────────────────────
type Service = { id: string; name: string; tagline: string; desc: string; price: number; duration: string; img: string; badge?: string; includes: string[] }
type Addon   = { id: string; emoji: string; name: string; price: number; label: string }
type Barber  = { id: string; name: string; role: string; specialty: string; experience: string; img: string }

// ── Data ──────────────────────────────────────────────────────────
const SERVICES: Service[] = [
  { id: "klasik", name: "Potongan Klasik",   tagline: "Rapi & presisi tiap saat",  desc: "Konsultasi gaya, potong sesuai bentuk wajah, cuci rambut, dan styling akhir dengan produk premium.",                 price: 35000,  duration: "30 menit", img: "/images/demo/barbershop/service-klasik.jpg", badge: "Terpopuler", includes: ["Konsultasi gaya", "Cuci rambut", "Styling produk", "Garansi rapi 2 minggu"] },
  { id: "shave",  name: "Signature Shave",   tagline: "Potong + cukur ala raja",   desc: "Potong rambut, rapikan jenggot dengan pisau cukur tradisional, hot towel hangat, dan minyak jenggot premium.",          price: 65000,  duration: "50 menit", img: "/images/demo/barbershop/service-shave.jpg",  badge: "Best Value", includes: ["Potong rambut", "Cukur jenggot tradisional", "Hot towel treatment", "Minyak jenggot"] },
  { id: "king",   name: "The King Package",  tagline: "Relaksasi level eksekutif", desc: "Paket lengkap: potong, cukur, creambath, pijat kepala & bahu, ditutup minuman pilihan — total relaksasi.",          price: 150000, duration: "90 menit", img: "/images/demo/barbershop/service-king.jpg",   badge: "Premium",    includes: ["Potong & cukur", "Creambath rileks", "Pijat kepala & bahu", "Minuman premium"] },
  { id: "anak",   name: "Potongan Si Kecil", tagline: "Sabar, ramah, hasil kekinian", desc: "Potongan rambut khusus anak di bawah 12 tahun, ditangani barber yang sabar dan komunikatif dengan orang tua.",     price: 30000,  duration: "25 menit", img: "/images/demo/barbershop/service-anak.jpg",   includes: ["Untuk usia di bawah 12 th", "Gaya kekinian", "Ditemani tontonan", "Stiker hadiah"] },
]

const ADDONS: Addon[] = [
  { id: "cuci-pijat",   emoji: "💆", name: "Cuci + Pijat Kepala",      price: 25000,  label: "Rp 25.000" },
  { id: "hot-towel",    emoji: "🧖", name: "Hot Towel Treatment",      price: 35000,  label: "Rp 35.000" },
  { id: "cukur-bersih", emoji: "🪒", name: "Cukur Bersih Tradisional", price: 40000,  label: "Rp 40.000" },
  { id: "semir",        emoji: "🎨", name: "Semir Rambut",             price: 150000, label: "Rp 150.000" },
  { id: "styling",      emoji: "✨", name: "Styling Produk Premium",   price: 20000,  label: "Rp 20.000" },
]

const BARBERS: Barber[] = [
  { id: "rama",  name: "Rama 'Razor' Aditya", role: "Senior Barber", specialty: "Fade & pompadour modern", experience: "8 tahun pengalaman", img: "/images/demo/barbershop/barber-rama.jpg" },
  { id: "bagas", name: "Bagas Saputra",       role: "Master Barber", specialty: "Classic cut & jenggot",   experience: "6 tahun pengalaman", img: "/images/demo/barbershop/barber-bagas.jpg" },
  { id: "yoga",  name: "Yoga Pratama",        role: "Style Barber",  specialty: "Tren & gaya kekinian",    experience: "3 tahun pengalaman", img: "/images/demo/barbershop/barber-yoga.jpg" },
]

const TIME_SLOTS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"]

const PORTFOLIO = {
  style: "Skin Fade + Beard Sculpting",
  before: "/images/demo/barbershop/before-1.jpg",
  after: "/images/demo/barbershop/after-1.jpg",
}

const REVIEWS = [
  { initials: "BK", name: "Bayu Kurniawan", origin: "Jakarta Selatan", service: "Signature Shave",  date: "Mei 2025", text: "Potongannya presisi banget, sesuai sama referensi yang aku kasih. Cukur jenggotnya halus, nggak ada yang kelewat. Bakal balik lagi pasti." },
  { initials: "FR", name: "Fajar & Reza",   origin: "Bandung",         service: "The King Package", date: "Apr 2025", text: "Pijat kepala & bahunya juara, bikin ngantuk parah! Worth banget buat self-reward abis seminggu kerja keras. Recommended buat healing." },
  { initials: "DH", name: "Dimas Hutama",   origin: "Jakarta Barat",   service: "Potongan Klasik",  date: "Jun 2025", text: "Udah langganan setahun lebih, hasilnya konsisten rapi tiap kali. Barbernya enak diajak diskusi gaya rambut yang cocok buat aku." },
]

const IG_FEED = [
  "/images/demo/barbershop/service-shave.jpg",
  "/images/demo/barbershop/after-1.jpg",
  "/images/demo/barbershop/barber-rama.jpg",
  "/images/demo/barbershop/barber-bagas.jpg",
  "/images/demo/barbershop/service-king.jpg",
  "/images/demo/barbershop/interior.jpg",
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] } }),
}

// ── Page ──────────────────────────────────────────────────────────
export default function BarbershopDemo() {
  const [menuOpen,      setMenuOpen]      = useState(false)
  const [scrolled,      setScrolled]      = useState(false)
  const [drawerService, setDrawerService] = useState<Service | null>(null)
  const [barberId,      setBarberId]      = useState<string>("any")
  const [date,          setDate]          = useState("")
  const [time,          setTime]          = useState("")
  const [addons,        setAddons]        = useState<string[]>([])
  const [showAddons,    setShowAddons]    = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  useEffect(() => {
    return () => { document.body.style.overflow = "" }
  }, [])

  useEffect(() => {
    if (!drawerService) return
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") closeDrawer() }
    window.addEventListener("keydown", fn)
    return () => window.removeEventListener("keydown", fn)
  }, [drawerService])

  function openDrawer(service: Service) {
    setDrawerService(service)
    setBarberId("any")
    setDate("")
    setTime("")
    setAddons([])
    setShowAddons(false)
    document.body.style.overflow = "hidden"
  }
  function closeDrawer() {
    setDrawerService(null)
    document.body.style.overflow = ""
  }

  const addonsTotal = useMemo(() =>
    ADDONS.filter(a => addons.includes(a.id)).reduce((s, a) => s + a.price, 0),
    [addons]
  )

  function buildMsg(service: Service) {
    const fmt    = (d: string) => d ? new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "(belum dipilih)"
    const barber = barberId === "any" ? "Siapapun yang tersedia" : (BARBERS.find(b => b.id === barberId)?.name ?? "Siapapun yang tersedia")
    const al     = ADDONS.filter(a => addons.includes(a.id)).map(a => `  • ${a.emoji} ${a.name}: ${rp(a.price)}`).join("\n")
    const total  = service.price + addonsTotal
    return `Halo Kings Barbershop! 💈\n\nSaya ingin booking:\n✂️ Layanan : ${service.name}\n👤 Barber  : ${barber}\n📅 Tanggal : ${fmt(date)}\n🕐 Jam     : ${time || "(belum dipilih)"}${addons.length > 0 ? `\n\n🎁 Tambahan:\n${al}` : ""}\n\n💰 Estimasi:\n  • ${service.name}: ${rp(service.price)}${addonsTotal > 0 ? `\n  • Tambahan: ${rp(addonsTotal)}` : ""}\n  • *Total: ${rp(total)}*\n\nMohon konfirmasi ketersediaan jadwal saya. Terima kasih! 🙏`
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
          <a href="/demo/barbershop" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: RED }}>
              <Scissors className="w-4 h-4 text-white" />
            </div>
            <span style={{ fontFamily: DISPLAY, fontSize: "23px", letterSpacing: "0.06em", color: WHITE }}>
              KINGS<span style={{ color: RED }}>.</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {[["Layanan", "#layanan"], ["Barber", "#barber"], ["Galeri", "#galeri"], ["Lokasi", "#lokasi"]].map(([l, h]) => (
              <a key={l} href={h}
                className="font-semibold uppercase transition-colors hover:text-white"
                style={{ color: GRAY, fontSize: "11px", letterSpacing: "0.16em" }}>{l}</a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href={WA_DEMO} target="_blank" rel="noopener noreferrer"
              className="px-5 py-2.5 rounded text-sm font-bold text-white transition-all hover:opacity-85 active:scale-95"
              style={{ backgroundColor: RED, letterSpacing: "0.02em" }}>
              Booking Sekarang
            </a>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(v => !v)} style={{ color: WHITE }}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-6 pb-5 pt-2 flex flex-col gap-1" style={{ backgroundColor: INK, borderTop: `1px solid ${BORDER}` }}>
            {[["Layanan", "#layanan"], ["Barber", "#barber"], ["Galeri", "#galeri"], ["Lokasi", "#lokasi"]].map(([l, h]) => (
              <a key={l} href={h} onClick={() => setMenuOpen(false)}
                className="py-3 text-sm font-semibold border-b"
                style={{ color: CREAM, borderColor: BORDER }}>{l}</a>
            ))}
            <a href={WA_DEMO} target="_blank" rel="noopener noreferrer"
              className="mt-3 py-3 rounded text-sm font-bold text-white text-center"
              style={{ backgroundColor: RED }}>
              Booking Sekarang
            </a>
          </div>
        )}
      </header>

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative flex items-end" style={{ height: "100svh", minHeight: "640px" }}>
        <Image src="/images/demo/barbershop/hero.jpg" alt="Kings Barbershop" fill priority
          className="object-cover" sizes="100vw" />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(12,12,13,0.35) 0%, rgba(12,12,13,0.55) 55%, rgba(12,12,13,0.97) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(12,12,13,0.7) 0%, transparent 55%)" }} />

        <div className="relative w-full max-w-[1280px] mx-auto px-6 pb-20">
          <motion.div initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>

            <div className="flex items-center gap-1.5 mb-6">
              <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded"
                style={{ backgroundColor: "rgba(255,255,255,0.06)", color: CREAM, border: `1px solid ${BORDER2}` }}>
                <MapPin className="w-3 h-3" style={{ color: RED }} /> Kelapa Gading, Jakarta Utara
              </span>
              <span className="hidden sm:flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded"
                style={{ backgroundColor: "rgba(255,255,255,0.06)", color: CREAM, border: `1px solid ${BORDER2}` }}>
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> 4.9 · 238 ulasan Google
              </span>
            </div>

            <h1 style={{ fontFamily: DISPLAY, color: WHITE, fontSize: "clamp(46px, 9vw, 104px)", lineHeight: 0.98, letterSpacing: "0.01em", marginBottom: "22px", textTransform: "uppercase" }}>
              Tampil tajam,<br />
              <span style={{ color: RED }}>setiap hari.</span>
            </h1>

            <p className="max-w-lg mb-9 text-base md:text-lg" style={{ color: "rgba(243,241,236,0.7)", lineHeight: 1.65 }}>
              Barbershop modern dengan barber profesional, produk grooming premium, dan sistem booking tanpa antre — supaya waktu Anda nggak terbuang sia-sia.
            </p>

            <div className="flex flex-wrap gap-3">
              <a href="#layanan"
                className="flex items-center gap-2 px-7 py-3.5 rounded text-sm font-bold text-white transition-all hover:opacity-85 active:scale-95"
                style={{ backgroundColor: RED }}>
                Booking Sekarang <ArrowRight className="w-4 h-4" />
              </a>
              <a href={WA_KONSULTASI} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-3.5 rounded text-sm font-bold transition-all hover:bg-white/10"
                style={{ backgroundColor: "rgba(255,255,255,0.04)", color: WHITE, border: `1px solid ${BORDER2}` }}>
                <MessageCircle className="w-4 h-4" /> Konsultasi Gaya Dulu
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
              { val: "8+ Tahun",      sub: "Beroperasi di Kelapa Gading" },
              { val: "4.9 / 5.0",     sub: "Rating dari 238 ulasan Google" },
              { val: "3 Barber Pro",  sub: "Bersertifikat & berpengalaman" },
              { val: "Buka 7 Hari",   sub: "Setiap hari, 10.00–21.00 WIB" },
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
              <Image src="/images/demo/barbershop/interior.jpg" alt="Interior Kings Barbershop" fill className="object-cover" sizes="50vw" />
            </div>
            <div className="absolute -bottom-6 -right-6 px-5 py-4 rounded-xl hidden md:block"
              style={{ backgroundColor: CARD, boxShadow: "0 16px 48px rgba(0,0,0,0.5)", border: `1px solid ${BORDER2}` }}>
              <div className="flex items-center gap-2 mb-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="font-bold text-sm" style={{ color: WHITE }}>238 klien puas</p>
              <p className="text-xs" style={{ color: LGRAY }}>sejak 2017</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} custom={0.1} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="order-1 lg:order-2">
            <p className="text-xs font-bold uppercase mb-4" style={{ color: RED, letterSpacing: "0.2em" }}>Tentang Kami</p>
            <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(34px,4.2vw,54px)", lineHeight: 1.05, letterSpacing: "0.01em", color: WHITE, marginBottom: "24px", textTransform: "uppercase" }}>
              Bukan sekadar potong rambut —<br />
              <span style={{ color: RED }}>ini ritual percaya diri.</span>
            </h2>
            <p className="text-base leading-relaxed mb-5" style={{ color: GRAY }}>
              Kings Barbershop berdiri sejak 2017 di Kelapa Gading, lahir dari kecintaan pada craft potong rambut tradisional yang dipadukan gaya modern. Setiap barber kami dilatih langsung — bukan sekadar bisa motong, tapi paham bentuk wajah, tekstur rambut, dan gaya hidup klien.
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: GRAY }}>
              Kami percaya 30–90 menit di kursi barber bukan cuma soal hasil yang rapi, tapi juga waktu untuk healing — ngobrol santai, kopi gratis, dan pulang dengan rasa percaya diri yang baru.
            </p>
            <div className="flex items-center gap-4 p-4 rounded-xl" style={{ backgroundColor: CARD, border: `1px solid ${BORDER}` }}>
              <div className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0 font-bold text-white"
                style={{ backgroundColor: RED, fontFamily: DISPLAY, fontSize: "17px", letterSpacing: "0.04em" }}>
                KH
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: WHITE }}>Kevin Halim</p>
                <p className="text-xs" style={{ color: LGRAY }}>Founder & Master Barber · sejak 2017</p>
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

      {/* ── SERVICES & PRICING ──────────────────────────────────── */}
      <section id="layanan" className="py-24 px-6" style={{ backgroundColor: CARD, scrollMarginTop: "100px" }}>
        <div className="max-w-[1280px] mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase mb-3" style={{ color: RED, letterSpacing: "0.2em" }}>Layanan & Harga</p>
              <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(34px,4.2vw,54px)", lineHeight: 1.05, letterSpacing: "0.01em", color: WHITE, textTransform: "uppercase" }}>
                Harga jelas,<br />tanpa nebak-nebak
              </h2>
            </div>
            <p className="text-sm max-w-xs" style={{ color: GRAY }}>
              Setiap layanan kami jelaskan apa saja yang Anda dapat — supaya Anda tahu persis nilai yang dibayar.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((s, i) => (
              <motion.article key={s.id}
                variants={fadeUp} custom={i * 0.08} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="group rounded-2xl overflow-hidden flex flex-col"
                style={{ backgroundColor: INK, border: `1px solid ${BORDER}` }}>
                <div className="relative overflow-hidden shrink-0" style={{ height: "190px" }}>
                  <Image src={s.img} alt={s.name} fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  {s.badge && (
                    <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded"
                      style={{ backgroundColor: RED, color: WHITE, letterSpacing: "0.04em" }}>{s.badge}</span>
                  )}
                  <p className="absolute bottom-4 left-4 right-4 text-white font-bold text-lg leading-tight" style={{ fontFamily: DISPLAY, textTransform: "uppercase", letterSpacing: "0.01em" }}>
                    {s.name}
                  </p>
                </div>

                <div className="flex-1 flex flex-col p-5">
                  <p className="text-sm font-semibold mb-1.5" style={{ color: RED }}>{s.tagline}</p>
                  <p className="text-sm mb-4 flex-1" style={{ color: GRAY, lineHeight: 1.6 }}>{s.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {s.includes.map(h => (
                      <span key={h} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded"
                        style={{ backgroundColor: REDDIM, color: "#fca5a5" }}>
                        <Check className="w-3 h-3" />{h}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4" style={{ borderTop: `1px solid ${BORDER}` }}>
                    <div>
                      <span className="font-bold text-base" style={{ color: WHITE }}>{rp(s.price)}</span>
                      <span className="flex items-center gap-1 text-xs mt-0.5" style={{ color: LGRAY }}>
                        <Clock className="w-3 h-3" />{s.duration}
                      </span>
                    </div>
                    <button onClick={() => openDrawer(s)}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded text-xs font-bold text-white transition-all hover:opacity-85 active:scale-95"
                      style={{ backgroundColor: RED }}>
                      Booking <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── BARBER PROFILES ─────────────────────────────────────── */}
      <section id="barber" className="py-24 px-6" style={{ scrollMarginTop: "100px" }}>
        <div className="max-w-[1280px] mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-14 text-center max-w-xl mx-auto">
            <p className="text-xs font-bold uppercase mb-3" style={{ color: RED, letterSpacing: "0.2em" }}>Kenalan Dulu</p>
            <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(34px,4.2vw,54px)", lineHeight: 1.05, letterSpacing: "0.01em", color: WHITE, marginBottom: "12px", textTransform: "uppercase" }}>
              Tangan ahli di balik tiap potongan
            </h2>
            <p className="text-sm" style={{ color: GRAY }}>
              Pilih barber favorit Anda saat booking — atau biarkan kami carikan yang paling pas.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {BARBERS.map((b, i) => (
              <motion.div key={b.id}
                variants={fadeUp} custom={i * 0.08} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="group rounded-2xl overflow-hidden"
                style={{ backgroundColor: CARD, border: `1px solid ${BORDER}` }}>
                <div className="relative overflow-hidden" style={{ height: "300px" }}>
                  <Image src={b.img} alt={b.name} fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" sizes="33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />
                  <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded"
                    style={{ backgroundColor: "rgba(12,12,13,0.7)", color: RED, border: `1px solid ${BORDER2}`, letterSpacing: "0.06em", backdropFilter: "blur(6px)" }}>
                    {b.role.toUpperCase()}
                  </span>
                </div>
                <div className="p-5">
                  <p className="font-bold text-lg mb-1" style={{ fontFamily: DISPLAY, color: WHITE, letterSpacing: "0.01em" }}>{b.name}</p>
                  <p className="text-sm mb-3" style={{ color: RED }}>{b.specialty}</p>
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: LGRAY }}>
                    <Award className="w-3.5 h-3.5" />{b.experience}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER GALLERY ──────────────────────────────── */}
      <section id="galeri" className="py-24 px-6" style={{ backgroundColor: CARD, scrollMarginTop: "100px" }}>
        <div className="max-w-[1280px] mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-14">
            <p className="text-xs font-bold uppercase mb-3" style={{ color: RED, letterSpacing: "0.2em" }}>Hasil Kerja</p>
            <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(34px,4.2vw,54px)", lineHeight: 1.05, letterSpacing: "0.01em", color: WHITE, textTransform: "uppercase" }}>
              Sebelum & sesudah —<br />lihat sendiri bedanya
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} custom={0.1} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="rounded-2xl overflow-hidden max-w-3xl mx-auto mb-16" style={{ border: `1px solid ${BORDER}` }}>
            <div className="grid grid-cols-2">
              <div className="relative" style={{ height: "420px" }}>
                <Image src={PORTFOLIO.before} alt={`${PORTFOLIO.style} — sebelum`} fill className="object-cover" sizes="50vw" />
                <span className="absolute top-5 left-5 text-xs font-bold px-3 py-1.5 rounded"
                  style={{ backgroundColor: "rgba(12,12,13,0.75)", color: GRAY, letterSpacing: "0.1em", backdropFilter: "blur(6px)" }}>SEBELUM</span>
              </div>
              <div className="relative" style={{ height: "420px" }}>
                <Image src={PORTFOLIO.after} alt={`${PORTFOLIO.style} — sesudah`} fill className="object-cover" sizes="50vw" />
                <span className="absolute top-5 left-5 text-xs font-bold px-3 py-1.5 rounded"
                  style={{ backgroundColor: RED, color: WHITE, letterSpacing: "0.1em" }}>SESUDAH</span>
              </div>
            </div>
            <div className="px-6 py-5 flex items-center justify-between" style={{ backgroundColor: INK }}>
              <p className="font-bold text-base" style={{ fontFamily: DISPLAY, color: WHITE, letterSpacing: "0.01em" }}>{PORTFOLIO.style}</p>
              <span className="flex items-center gap-1.5 text-xs" style={{ color: LGRAY }}>
                <Sparkles className="w-3.5 h-3.5" style={{ color: RED }} />by Kings Barbershop
              </span>
            </div>
          </motion.div>

          {/* ── INSTAGRAM FEED ────────────────────────────────────── */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase mb-3" style={{ color: RED, letterSpacing: "0.2em" }}>Update Terbaru</p>
              <h3 style={{ fontFamily: DISPLAY, fontSize: "clamp(26px,3vw,36px)", lineHeight: 1.1, letterSpacing: "0.01em", color: WHITE, textTransform: "uppercase" }}>
                Gaya terbaru di Instagram kami
              </h3>
            </div>
            <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: GRAY }}>
              <Instagram className="w-4 h-4" style={{ color: RED }} />
              @kingsbarbershop.id · 12,4K pengikut
            </span>
          </motion.div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2.5">
            {IG_FEED.map((src, i) => (
              <motion.div key={i}
                variants={fadeUp} custom={i * 0.05} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="relative overflow-hidden rounded-lg group cursor-pointer" style={{ aspectRatio: "1/1" }}>
                <Image src={src} alt={`Instagram post ${i + 1}`} fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="16vw" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors duration-300">
                  <Instagram className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mb-14 text-center">
            <p className="text-xs font-bold uppercase mb-3" style={{ color: RED, letterSpacing: "0.2em" }}>Testimoni</p>
            <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(34px,4.2vw,54px)", lineHeight: 1.05, letterSpacing: "0.01em", color: WHITE, marginBottom: "16px", textTransform: "uppercase" }}>
              Kata mereka yang sudah duduk di kursi kami
            </h2>
            <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full"
              style={{ backgroundColor: CARD, border: `1px solid ${BORDER}` }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A10.99 10.99 0 0 0 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09a6.6 6.6 0 0 1-.35-2.09c0-.73.13-1.43.35-2.09V7.07H2.18A10.99 10.99 0 0 0 1 12c0 1.77.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="font-bold text-sm" style={{ color: WHITE }}>4.9</span>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
              </div>
              <span className="text-sm" style={{ color: LGRAY }}>238 ulasan Google</span>
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
                    style={{ backgroundColor: RED }}>{r.initials}</div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: WHITE }}>{r.name}</p>
                    <p className="text-xs" style={{ color: LGRAY }}>{r.origin} · {r.date} · {r.service}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOYALTY PROGRAM ─────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ backgroundColor: CARD }}>
        <div className="max-w-[1280px] mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="rounded-2xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-center overflow-hidden relative"
            style={{ backgroundColor: INK, border: `1px solid ${BORDER2}` }}>
            <div className="absolute -right-24 -top-24 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ backgroundColor: RED }} />
            <div className="relative">
              <p className="text-xs font-bold uppercase mb-3" style={{ color: RED, letterSpacing: "0.2em" }}>Kings Loyalty Club</p>
              <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(30px,3.6vw,46px)", lineHeight: 1.1, letterSpacing: "0.01em", color: WHITE, marginBottom: "16px", textTransform: "uppercase" }}>
                Cukur 5x,<br /><span style={{ color: RED }}>gratis 1x.</span>
              </h2>
              <p className="text-sm leading-relaxed max-w-md" style={{ color: GRAY }}>
                Setiap kali selesai potong, minta admin men-cap kartu member Anda — fisik atau digital lewat WhatsApp. Kumpulkan 5 cap dan kunjungan ke-6 jadi gratis untuk layanan Potongan Klasik.
              </p>
            </div>
            <div className="relative flex flex-col gap-5">
              <div className="flex items-center gap-3 flex-wrap">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: i < 3 ? RED : "transparent", border: `2px ${i < 3 ? "solid" : "dashed"} ${i < 3 ? RED : BORDER2}` }}>
                    {i < 3 ? <Check className="w-5 h-5 text-white" /> : <Scissors className="w-4 h-4" style={{ color: LGRAY }} />}
                  </div>
                ))}
                <ArrowRight className="w-4 h-4 hidden sm:block" style={{ color: LGRAY }} />
                <div className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: REDDIM, border: `2px dashed ${RED}` }}>
                  <Sparkles className="w-5 h-5" style={{ color: RED }} />
                </div>
              </div>
              <p className="text-xs" style={{ color: LGRAY }}>Contoh progres: 3 dari 5 cap terkumpul — 2 kunjungan lagi menuju gratis ✂️</p>
              <a href={WA_DEMO} target="_blank" rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 px-6 py-3 rounded text-sm font-bold text-white transition-all hover:opacity-85"
                style={{ backgroundColor: RED }}>
                Daftar Member Gratis <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── LOCATION + CTA ──────────────────────────────────────── */}
      <section id="lokasi" className="py-24 px-6" style={{ scrollMarginTop: "100px" }}>
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="text-xs font-bold uppercase mb-3" style={{ color: RED, letterSpacing: "0.2em" }}>Lokasi</p>
            <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(30px,3.6vw,46px)", lineHeight: 1.1, letterSpacing: "0.01em", color: WHITE, marginBottom: "20px", textTransform: "uppercase" }}>
              Datang langsung ke kursi kami
            </h2>
            <div className="rounded-2xl overflow-hidden mb-5" style={{ height: "300px", border: `1px solid ${BORDER}` }}>
              <iframe title="Lokasi Kings Barbershop"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d106.906!3d-6.157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMDknMjUuMiJTIDEwNsKwNTQnMjEuNiJF!5e0!3m2!1sen!2sid!4v1"
                width="100%" height="100%" style={{ border: 0, filter: "grayscale(0.4) invert(0.92) contrast(0.9)" }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" />
            </div>
            <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mb-6 px-5 py-3 rounded text-sm font-bold text-white transition-all hover:opacity-85"
              style={{ backgroundColor: RED }}>
              <Navigation className="w-4 h-4" /> Buka di Google Maps
            </a>
            <div className="flex flex-col gap-3 text-sm" style={{ color: GRAY }}>
              <p className="flex items-start gap-3"><MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: RED }} />{ADDRESS}</p>
              <p className="flex items-center gap-3"><Phone className="w-4 h-4 shrink-0" style={{ color: RED }} />+62 895-335-501192</p>
              <p className="flex items-center gap-3"><Mail className="w-4 h-4 shrink-0" style={{ color: RED }} />halo@kingsbarbershop.id</p>
              <p className="flex items-center gap-3"><Clock className="w-4 h-4 shrink-0" style={{ color: RED }} />Setiap hari · 10.00–21.00 WIB</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} custom={0.1} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden flex flex-col justify-end p-10"
            style={{ minHeight: "440px" }}>
            <Image src="/images/demo/barbershop/service-shave.jpg" alt="Booking sekarang" fill className="object-cover" sizes="50vw" />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(0deg, rgba(12,12,13,0.95) 0%, rgba(12,12,13,0.4) 60%, rgba(12,12,13,0.1) 100%)" }} />
            <div className="relative">
              <p className="text-xs font-bold uppercase mb-3" style={{ color: RED, letterSpacing: "0.2em" }}>Tanpa Antre</p>
              <h3 style={{ fontFamily: DISPLAY, fontSize: "32px", color: WHITE, lineHeight: 1.15, marginBottom: "14px", textTransform: "uppercase", letterSpacing: "0.01em" }}>
                Jadwalkan kursi Anda sekarang
              </h3>
              <p className="text-sm mb-6" style={{ color: "rgba(243,241,236,0.65)" }}>
                Pilih layanan, barber favorit, dan jam yang Anda mau — kami konfirmasi dalam hitungan menit lewat WhatsApp.
              </p>
              <a href="#layanan"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded text-sm font-bold text-white transition-all hover:opacity-85"
                style={{ backgroundColor: RED }}>
                <Users className="w-4 h-4" /> Pilih Layanan & Booking
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
                <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: RED }}>
                  <Scissors className="w-4 h-4 text-white" />
                </div>
                <span style={{ fontFamily: DISPLAY, fontSize: "22px", letterSpacing: "0.06em", color: WHITE }}>
                  KINGS<span style={{ color: RED }}>.</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: LGRAY }}>
                Barbershop modern di Kelapa Gading. Potongan presisi, perawatan premium, dan pengalaman yang bikin Anda balik lagi.
              </p>
            </div>
            <div className="flex flex-wrap gap-12 text-sm">
              <div>
                <p className="text-xs font-bold uppercase mb-4" style={{ color: LGRAY, letterSpacing: "0.16em" }}>Layanan</p>
                {SERVICES.map(s => (
                  <button key={s.id} onClick={() => openDrawer(s)}
                    className="block mb-2.5 text-left transition-opacity hover:opacity-70"
                    style={{ color: GRAY }}>{s.name}</button>
                ))}
              </div>
              <div>
                <p className="text-xs font-bold uppercase mb-4" style={{ color: LGRAY, letterSpacing: "0.16em" }}>Navigasi</p>
                {[["Layanan", "#layanan"], ["Barber", "#barber"], ["Galeri", "#galeri"], ["Lokasi", "#lokasi"]].map(([l, h]) => (
                  <a key={l} href={h} className="block mb-2.5 transition-opacity hover:opacity-70" style={{ color: GRAY }}>{l}</a>
                ))}
              </div>
              <div>
                <p className="text-xs font-bold uppercase mb-4" style={{ color: LGRAY, letterSpacing: "0.16em" }}>Kontak</p>
                <p className="mb-2.5 text-sm" style={{ color: GRAY }}>+62 895-335-501192</p>
                <p className="mb-2.5 text-sm" style={{ color: GRAY }}>halo@kingsbarbershop.id</p>
                <p className="text-sm" style={{ color: GRAY }}>Kelapa Gading, Jakarta Utara</p>
              </div>
            </div>
          </div>
          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs" style={{ color: "rgba(243,241,236,0.25)" }}>
            <p>© 2025 Kings Barbershop. Hak cipta dilindungi.</p>
            <p>Website oleh <a href="https://nehandev.com" className="font-bold transition-colors hover:text-white" style={{ color: "#fca5a5" }}>NehanDev</a></p>
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
        {drawerService && (
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
                  <p className="text-xs font-bold uppercase" style={{ color: LGRAY, letterSpacing: "0.16em" }}>Booking Layanan</p>
                  <p className="font-bold text-lg" style={{ fontFamily: DISPLAY, color: WHITE, letterSpacing: "0.01em" }}>{drawerService.name}</p>
                </div>
                <button onClick={closeDrawer}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                  style={{ color: CREAM }}>
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Service image + price */}
              <div className="relative shrink-0" style={{ height: "180px" }}>
                <Image src={drawerService.img} alt={drawerService.name} fill className="object-cover" sizes="460px" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                  <p className="text-white font-bold text-2xl" style={{ fontFamily: DISPLAY, letterSpacing: "0.01em" }}>
                    {rp(drawerService.price)}
                  </p>
                  <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded" style={{ backgroundColor: "rgba(12,12,13,0.6)", color: CREAM, backdropFilter: "blur(6px)" }}>
                    <Clock className="w-3.5 h-3.5" />{drawerService.duration}
                  </span>
                </div>
              </div>

              {/* Form */}
              <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">

                {/* Barber */}
                <div>
                  <p className="text-xs font-bold uppercase mb-3" style={{ color: LGRAY, letterSpacing: "0.16em" }}>Pilih Barber</p>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => setBarberId("any")}
                      className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-left transition-colors"
                      style={{ border: `1.5px solid ${barberId === "any" ? RED : BORDER}`, backgroundColor: barberId === "any" ? REDDIM : "transparent" }}>
                      <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: CARD2 }}>
                        <Users className="w-4 h-4" style={{ color: barberId === "any" ? RED : LGRAY }} />
                      </div>
                      <div>
                        <p className="font-semibold text-sm" style={{ color: WHITE }}>Siapapun yang tersedia</p>
                        <p className="text-xs" style={{ color: LGRAY }}>Dijadwalkan oleh tim kami</p>
                      </div>
                    </button>
                    {BARBERS.map(b => {
                      const on = barberId === b.id
                      return (
                        <button key={b.id} onClick={() => setBarberId(b.id)}
                          className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-left transition-colors"
                          style={{ border: `1.5px solid ${on ? RED : BORDER}`, backgroundColor: on ? REDDIM : "transparent" }}>
                          <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0">
                            <Image src={b.img} alt={b.name} fill className="object-cover" sizes="36px" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm" style={{ color: WHITE }}>{b.name}</p>
                            <p className="text-xs" style={{ color: LGRAY }}>{b.specialty}</p>
                          </div>
                          {on && <Check className="w-4 h-4 ml-auto shrink-0" style={{ color: RED }} />}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Date */}
                <div>
                  <p className="text-xs font-bold uppercase mb-3" style={{ color: LGRAY, letterSpacing: "0.16em" }}>Tanggal Kunjungan</p>
                  <input type="date" min={today} value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl text-sm font-medium outline-none cursor-pointer"
                    style={{ border: `1.5px solid ${date ? RED : BORDER}`, backgroundColor: CARD2, color: CREAM, colorScheme: "dark" }} />
                </div>

                {/* Time slots */}
                <div>
                  <p className="text-xs font-bold uppercase mb-3" style={{ color: LGRAY, letterSpacing: "0.16em" }}>Jam Kedatangan</p>
                  <div className="grid grid-cols-5 gap-2">
                    {TIME_SLOTS.map(t => {
                      const on = time === t
                      return (
                        <button key={t} onClick={() => setTime(t)}
                          className="py-2.5 rounded-lg text-xs font-bold transition-colors"
                          style={{ border: `1.5px solid ${on ? RED : BORDER}`, backgroundColor: on ? RED : "transparent", color: on ? WHITE : GRAY }}>
                          {t}
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
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                        <div className="mt-2 rounded-xl p-3 flex flex-col gap-1.5" style={{ backgroundColor: CARD2, border: `1px solid ${BORDER}` }}>
                          {ADDONS.map(a => {
                            const on = addons.includes(a.id)
                            return (
                              <button key={a.id} onClick={() => setAddons(p => on ? p.filter(x => x !== a.id) : [...p, a.id])}
                                className="flex items-center justify-between py-2 px-1 rounded-lg transition-colors hover:bg-white/5 text-left">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all"
                                    style={{ borderColor: on ? RED : BORDER2, backgroundColor: on ? RED : "transparent" }}>
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
                <div className="rounded-xl p-4" style={{ backgroundColor: REDDIM, border: `1px solid rgba(239,68,68,0.3)` }}>
                  <p className="text-xs font-bold uppercase mb-3" style={{ color: RED, letterSpacing: "0.16em" }}>Estimasi Biaya</p>
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex justify-between">
                      <span style={{ color: CREAM }}>{drawerService.name}</span>
                      <span className="font-semibold" style={{ color: CREAM }}>{rp(drawerService.price)}</span>
                    </div>
                    {ADDONS.filter(a => addons.includes(a.id)).map(a => (
                      <div key={a.id} className="flex justify-between">
                        <span style={{ color: CREAM }}>{a.emoji} {a.name}</span>
                        <span className="font-semibold" style={{ color: CREAM }}>{rp(a.price)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between font-bold text-base pt-2" style={{ borderTop: `1px solid rgba(239,68,68,0.3)`, color: WHITE }}>
                      <span>Total Estimasi</span>
                      <span style={{ color: RED }}>{rp(drawerService.price + addonsTotal)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Drawer footer */}
              <div className="px-6 py-4 shrink-0" style={{ borderTop: `1px solid ${BORDER}` }}>
                <a href={waLink(buildMsg(drawerService))} target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base text-white transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ backgroundColor: RED, boxShadow: `0 4px 16px rgba(239,68,68,0.35)` }}>
                  <MessageCircle className="w-5 h-5" /> Booking via WhatsApp
                </a>
                <p className="text-center text-xs mt-2" style={{ color: LGRAY }}>
                  Tidak ada biaya sampai jadwal Anda dikonfirmasi
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
