"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import {
  Star, Users, BedDouble, MapPin, Check, Wifi, Car, Coffee,
  Utensils, Waves, Flame, Bike, Clock, Plus, Minus,
  MessageCircle, Phone, Mail, Menu, X, ChevronDown,
  ChevronUp, ArrowRight, ChevronRight,
} from "lucide-react"

// ── WA ────────────────────────────────────────────────────────────
const WA       = "62895335501192"
const waLink   = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`
const WA_DEMO  = waLink("Halo NehanDev! Saya tertarik membuat website penginapan seperti demo Tepi Kali untuk bisnis saya.")

// ── Tokens ────────────────────────────────────────────────────────
const GREEN  = "#3a6648"
const LGREEN = "#edf2ee"
const DARK   = "#1a1a1a"
const CREAM  = "#faf9f6"
const GRAY   = "#6b6b6b"
const LGRAY  = "#a8a8a8"
const BORDER = "#e5e5e0"
const WHITE  = "#ffffff"
const SANS   = "var(--font-jost, sans-serif)"
const SERIF  = "var(--font-cormorant, 'Georgia', serif)"

const rp  = (n: number) => "Rp " + n.toLocaleString("id-ID")
const today = new Date().toISOString().split("T")[0]

// ── Types ─────────────────────────────────────────────────────────
type Room  = { id: string; name: string; tagline: string; desc: string; price: number; img: string; beds: string; capacity: number; size: string; view: string; badge?: string; highlights: string[] }
type Addon = { id: string; emoji: string; name: string; price: number; perPerson: boolean; label: string }

// ── Data ──────────────────────────────────────────────────────────
const ROOMS: Room[] = [
  { id: "tenda-riverside", name: "Tenda Riverside",  tagline: "Tidur ditemani gemericik sungai",     desc: "Tenda glamping premium di tepi sungai berbatu. Kasur queen, lampu lentera, dan suara air yang menenangkan sepanjang malam.",                                 price: 450000,  img: "/images/demo/hotel/glamping-sungai.jpg", beds: "1 Queen Bed",  capacity: 2, size: "20 m²", view: "Tepi Sungai",      badge: "Terpopuler", highlights: ["Riverside deck", "Queen bed", "Outdoor shower", "Hammock & lentera"] },
  { id: "kamar-sawah",     name: "Kamar Sawah",      tagline: "Bangun dengan hamparan padi menghijau",desc: "Kamar cozy bergaya rustic dengan jendela besar menghadap sawah. Material kayu daur ulang, pencahayaan hangat, dan AC untuk kenyamanan malam.",                price: 380000,  img: "/images/demo/hotel/kamar-sawah.jpg",    beds: "1 Queen Bed",  capacity: 2, size: "24 m²", view: "Sawah & Gunung",   highlights: ["Sawah view", "Queen bed", "Hot shower", "AC + kipas"] },
  { id: "joglo-suite",     name: "Joglo Suite",      tagline: "Mewah dengan sentuhan arsitektur Jawa",desc: "Suite bergaya Joglo dengan plafon tinggi, kayu jati asli, dan teras pribadi menghadap kebun dan sungai. Dilengkapi bathtub outdoor.",                      price: 680000,  img: "/images/demo/hotel/joglo-suite.webp",  beds: "1 King Bed",   capacity: 2, size: "42 m²", view: "Kebun & Sungai",   badge: "Best Value", highlights: ["Teras pribadi", "King bed", "Bathtub outdoor", "Smart TV"] },
  { id: "pondok-kayu",     name: "Pondok Kayu",      tagline: "Cottage luas untuk keluarga kecil",   desc: "Pondok kayu dengan 2 kamar tidur, ruang tamu, dapur kecil, dan teras luas. Ideal untuk keluarga atau rombongan kecil yang ingin privasi penuh.",           price: 1100000, img: "/images/demo/hotel/rumah-kayu.jpg",    beds: "2 Kamar Tidur",capacity: 5, size: "65 m²", view: "Kebun & Sungai",   badge: "Keluarga",   highlights: ["2 kamar tidur", "Dapur mini", "Teras luas", "Area BBQ privat"] },
]

const ADDONS: Addon[] = [
  { id: "breakfast", emoji: "🍳", name: "Sarapan lokal",           price: 45000,  perPerson: true,  label: "Rp 45.000/orang" },
  { id: "bbq",       emoji: "🔥", name: "Paket BBQ malam",         price: 175000, perPerson: false, label: "Rp 175.000/sesi" },
  { id: "romantic",  emoji: "🌸", name: "Dekorasi romantis",       price: 220000, perPerson: false, label: "Rp 220.000" },
  { id: "cycling",   emoji: "🚲", name: "Sepeda + tur sawah pagi", price: 45000,  perPerson: true,  label: "Rp 45.000/orang" },
  { id: "bonfire",   emoji: "✨", name: "Bonfire & marshmallow",   price: 95000,  perPerson: false, label: "Rp 95.000/malam" },
]

const FACILITIES = [
  { icon: Wifi,     label: "WiFi Kencang",       sub: "Seluruh area, gratis" },
  { icon: Waves,    label: "Kolam Alami",         sub: "Air sungai jernih, 07–20 WIB" },
  { icon: Coffee,   label: "Sarapan Lokal",       sub: "Add-on, menu harian berganti" },
  { icon: Car,      label: "Parkir Luas",         sub: "Gratis, 15 kendaraan" },
  { icon: Utensils, label: "Dapur Bersama",       sub: "Peralatan lengkap, 24 jam" },
  { icon: Flame,    label: "Area BBQ & Bonfire",  sub: "Kayu bakar tersedia" },
  { icon: Bike,     label: "Sepeda Gratis",       sub: "1 jam/hari per unit" },
  { icon: Clock,    label: "Check-in Fleksibel",  sub: "Konfirmasi via WhatsApp" },
]

const REVIEWS = [
  { initials: "RB", name: "Risa & Bagas",     origin: "Semarang",    unit: "Tenda Riverside", date: "Nov 2024", text: "Tidur di tepi sungai dengan suara air gemericik adalah pengalaman yang belum pernah kami rasakan. Dekorasi romantisnya sempurna untuk anniversary kami!" },
  { initials: "AW", name: "Arya Wibowo",      origin: "Jakarta",     unit: "Kamar Sawah",     date: "Okt 2024", text: "Workation paling produktif yang pernah saya lakukan. WiFi kencang, udara segar, sawah di depan mata. Lebih fokus dari kafé mana pun." },
  { initials: "KS", name: "Keluarga Santoso", origin: "Solo",        unit: "Pondok Kayu",     date: "Sep 2024", text: "Anak-anak sangat excited bermain di sungai dan sepedaan di sawah. BBQ malamnya jadi momen keluarga paling berkesan tahun ini." },
]

const PHOTOS = [
  "/images/demo/hotel/hero.jpg",
  "/images/demo/hotel/kamar-sawah.jpg",
  "/images/demo/hotel/glamping-sungai.jpg",
  "/images/demo/hotel/joglo-suite.webp",
  "/images/demo/hotel/rumah-kayu.jpg",
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:  (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] } }),
}

// ── Page ──────────────────────────────────────────────────────────
export default function HotelDemo() {
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [scrolled,   setScrolled]    = useState(false)
  const [drawerRoom, setDrawerRoom]  = useState<Room | null>(null)
  const [checkin,    setCheckin]     = useState("")
  const [checkout,   setCheckout]    = useState("")
  const [guests,     setGuests]      = useState(2)
  const [addons,     setAddons]      = useState<string[]>([])
  const [showAddons, setShowAddons]  = useState(false)

  // Bug fix 1: scroll listener
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  // Bug fix 1: reset overflow on unmount in case drawer is open
  useEffect(() => {
    return () => { document.body.style.overflow = "" }
  }, [])

  // Bug fix 3: Escape key closes drawer
  useEffect(() => {
    if (!drawerRoom) return
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") closeDrawer() }
    window.addEventListener("keydown", fn)
    return () => window.removeEventListener("keydown", fn)
  }, [drawerRoom])

  function openDrawer(room: Room) {
    setDrawerRoom(room)
    setGuests(g => Math.min(g, room.capacity))
    setAddons([])
    setShowAddons(false)
    document.body.style.overflow = "hidden"
  }
  function closeDrawer() {
    setDrawerRoom(null)
    document.body.style.overflow = ""
  }

  // Bug fix 2: reset checkout when checkin is changed to same or later date
  function handleCheckin(date: string) {
    setCheckin(date)
    if (checkout && date >= checkout) setCheckout("")
  }

  // Bug fix 3: min checkout = day after checkin (no same-day checkout)
  const checkoutMin = useMemo(() => {
    if (!checkin) return today
    const d = new Date(checkin)
    d.setDate(d.getDate() + 1)
    return d.toISOString().split("T")[0]
  }, [checkin])

  const nights = useMemo(() => {
    if (!checkin || !checkout) return 0
    return Math.max(0, Math.round((new Date(checkout).getTime() - new Date(checkin).getTime()) / 86400000))
  }, [checkin, checkout])

  const addonsTotal = useMemo(() =>
    ADDONS.filter(a => addons.includes(a.id))
      .reduce((s, a) => s + (a.perPerson ? a.price * guests : a.price), 0),
    [addons, guests]
  )

  function buildMsg(room: Room) {
    const fmt  = (d: string) => d ? new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "(belum dipilih)"
    const nl   = nights > 0 ? `${nights} malam` : "(belum ditentukan)"
    const al   = ADDONS.filter(a => addons.includes(a.id)).map(a => `  • ${a.emoji} ${a.name}: ${rp(a.perPerson ? a.price * guests : a.price)}`).join("\n")
    const base = nights > 0 ? room.price * nights : 0
    // Bug fix 5: total only shows when dates are filled
    const totalStr = nights > 0 ? rp(base + addonsTotal) : "(isi tanggal dulu)"
    return `Halo Tepi Kali Glamping! 🌿\n\nSaya ingin memesan:\n🏕️ Unit    : ${room.name}\n📅 Check-in: ${fmt(checkin)}\n📅 Checkout: ${fmt(checkout)}\n🌙 Durasi  : ${nl}\n👥 Tamu    : ${guests} orang${addons.length > 0 ? `\n\n🎁 Add-On:\n${al}` : ""}\n\n💰 Estimasi:\n  • ${room.name} × ${nl}: ${base > 0 ? rp(base) : "-"}${addonsTotal > 0 ? `\n  • Add-on: ${rp(addonsTotal)}` : ""}\n  • *Total: ${totalStr}*\n\nMohon konfirmasi ketersediaan. Terima kasih! 🙏`
  }

  return (
    <div style={{ fontFamily: SANS, backgroundColor: WHITE, color: DARK }}>

      {/* ── HEADER ──────────────────────────────────────────────── */}
      <header
        className="fixed top-[40px] left-0 right-0 z-50 flex flex-col transition-all duration-300"
        style={{
          backgroundColor: scrolled ? WHITE : "transparent",
          borderBottom:    scrolled ? `1px solid ${BORDER}` : "none",
          boxShadow:       scrolled ? "0 1px 16px rgba(0,0,0,0.06)" : "none",
        }}>
        {/* Nav row — fixed 60px, inline styles to avoid Tailwind conflicts */}
        <div style={{ height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: "1280px", width: "100%", margin: "0 auto", padding: "0 24px" }}>
          <a href="/demo/hotel" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: GREEN }}>
              <Waves className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold" style={{ fontFamily: SERIF, color: scrolled ? DARK : WHITE }}>
              Tepi<em style={{ color: scrolled ? GREEN : "#a8d4b4" }}>Kali</em>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {[["Unit", "#unit"], ["Fasilitas", "#fasilitas"], ["Galeri", "#galeri"], ["Testimoni", "#testimoni"]].map(([l, h]) => (
              <a key={l} href={h}
                className="text-sm font-semibold uppercase tracking-wider transition-opacity hover:opacity-60"
                style={{ color: scrolled ? DARK : WHITE, fontSize: "11px" }}>{l}</a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href={WA_DEMO} target="_blank" rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: scrolled ? GREEN : "rgba(255,255,255,0.2)", border: scrolled ? "none" : "1px solid rgba(255,255,255,0.5)" }}>
              Pesan Sekarang
            </a>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(v => !v)}
            style={{ color: scrolled ? DARK : WHITE }}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu — stacks below nav row */}
        {menuOpen && (
          <div className="md:hidden px-6 pb-5 pt-2 flex flex-col gap-1 bg-white" style={{ borderTop: `1px solid ${BORDER}` }}>
            {[["Unit", "#unit"], ["Fasilitas", "#fasilitas"], ["Galeri", "#galeri"], ["Testimoni", "#testimoni"]].map(([l, h]) => (
              <a key={l} href={h} onClick={() => setMenuOpen(false)}
                className="py-3 text-sm font-semibold border-b"
                style={{ color: DARK, borderColor: BORDER }}>{l}</a>
            ))}
            <a href={WA_DEMO} target="_blank" rel="noopener noreferrer"
              className="mt-3 py-3 rounded-full text-sm font-bold text-white text-center"
              style={{ backgroundColor: GREEN }}>
              Pesan Sekarang
            </a>
          </div>
        )}
      </header>

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative flex items-center" style={{ height: "100svh", minHeight: "620px" }}>
        <Image src="/images/demo/hotel/hero.jpg" alt="Tepi Kali Glamping" fill priority
          className="object-cover" sizes="100vw" />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.65) 100%)" }} />

        <div className="relative w-full max-w-[1280px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>

            {/* Location badge */}
            <div className="flex items-center gap-1.5 mb-5">
              <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.15)", color: WHITE, border: "1px solid rgba(255,255,255,0.3)", backdropFilter: "blur(8px)" }}>
                <MapPin className="w-3 h-3" /> Mungkid, Magelang
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.15)", color: WHITE, border: "1px solid rgba(255,255,255,0.3)", backdropFilter: "blur(8px)" }}>
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> 4.9 · 127 ulasan
              </span>
            </div>

            {/* Title */}
            <h1 style={{ fontFamily: SERIF, color: WHITE, fontSize: "clamp(42px, 8vw, 88px)", lineHeight: 1.0, letterSpacing: "-0.02em", fontWeight: 700, marginBottom: "20px" }}>
              Menginap di alam,<br />
              <em style={{ color: "#b8dfc4", fontStyle: "italic" }}>bukan sekadar tidur.</em>
            </h1>

            <p className="max-w-lg mb-8 text-base md:text-lg" style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>
              Glamping & retreat tepi sungai di Magelang. 4 tipe unit, kolam alami, dan langit berbintang yang tidak akan Anda lupakan.
            </p>

            <div className="flex flex-wrap gap-3">
              <a href="#unit"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: GREEN }}>
                Lihat Unit <ArrowRight className="w-4 h-4" />
              </a>
              <a href={WA_DEMO} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold transition-all hover:bg-white/25"
                style={{ backgroundColor: "rgba(255,255,255,0.12)", color: WHITE, border: "1px solid rgba(255,255,255,0.4)", backdropFilter: "blur(8px)" }}>
                <MessageCircle className="w-4 h-4" /> Tanya Dulu
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
          <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}
            className="w-px h-8 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.3)" }} />
        </motion.div>
      </section>

      {/* ── STATS STRIP ─────────────────────────────────────────── */}
      <section style={{ backgroundColor: DARK }}>
        <div className="max-w-[1280px] mx-auto px-6 py-5">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-6">
            {[
              { val: "4 Tipe Unit",    sub: "Riverside · Sawah · Joglo · Cottage" },
              { val: "4.9 / 5.0",      sub: "Rating rata-rata dari 127 tamu" },
              { val: "20 Menit",       sub: "Jarak ke Candi Borobudur" },
              { val: "Buka 24 Jam",    sub: "Host selalu siap dihubungi" },
            ].map(s => (
              <div key={s.val} className="text-center md:text-left">
                <p className="font-bold text-base" style={{ color: WHITE }}>{s.val}</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ backgroundColor: CREAM }}>
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: GREEN }}>Tentang Kami</p>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(32px,4vw,52px)", lineHeight: 1.1, letterSpacing: "-0.02em", color: DARK, marginBottom: "24px", fontWeight: 700 }}>
              Bukan sekadar glamping —<br />
              <em style={{ color: GREEN }}>ini pengalaman.</em>
            </h2>
            <p className="text-base leading-relaxed mb-5" style={{ color: GRAY }}>
              Tepi Kali Glamping berdiri di lahan 2.000 m² di pinggiran sungai berbatu Magelang, dikelilingi hamparan sawah dan kebun bambu alami. Setiap unit dibangun menggunakan material lokal — bambu, kayu daur ulang, dan batu sungai — oleh pengrajin dari desa setempat.
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: GRAY }}>
              Tidak ada televisi di unit kami, karena suara sungai, kicau burung, dan langit berbintang adalah hiburan terbaik yang bisa kami tawarkan.
            </p>
            {/* Host card */}
            <div className="flex items-center gap-4 p-4 rounded-2xl" style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}` }}>
              <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0">
                <Image src="/images/demo/hotel/host.jpg" alt="Mas Danu" fill className="object-cover" sizes="56px" />
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: DARK }}>Mas Danu</p>
                <p className="text-xs" style={{ color: LGRAY }}>Host & pemilik · Magelang sejak 2019</p>
              </div>
              <a href={WA_DEMO} target="_blank" rel="noopener noreferrer"
                className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white shrink-0"
                style={{ backgroundColor: "#25D366" }}>
                <MessageCircle className="w-3.5 h-3.5" /> Chat
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} custom={0.1} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="relative">
            <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <Image src="/images/demo/hotel/joglo-suite.webp" alt="Joglo Suite" fill className="object-cover" sizes="50vw" />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-5 -left-5 px-5 py-4 rounded-2xl hidden md:block"
              style={{ backgroundColor: WHITE, boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: `1px solid ${BORDER}` }}>
              <div className="flex items-center gap-2 mb-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="font-bold text-sm" style={{ color: DARK }}>127 tamu puas</p>
              <p className="text-xs" style={{ color: LGRAY }}>sejak 2019</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ROOMS ───────────────────────────────────────────────── */}
      <section id="unit" className="py-24 px-6" style={{ scrollMarginTop: "100px" }}>
        <div className="max-w-[1280px] mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GREEN }}>Unit Kami</p>
              <h2 style={{ fontFamily: SERIF, fontSize: "clamp(32px,4vw,52px)", lineHeight: 1.1, letterSpacing: "-0.02em", color: DARK, fontWeight: 700 }}>
                Pilih pengalaman<br />yang Anda inginkan
              </h2>
            </div>
            <p className="text-sm max-w-xs" style={{ color: GRAY }}>
              Dari tenda tepi sungai hingga suite joglo — setiap unit punya ceritanya sendiri.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ROOMS.map((room, i) => (
              <motion.article key={room.id}
                variants={fadeUp} custom={i * 0.08} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="group rounded-3xl overflow-hidden flex flex-col"
                style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}`, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                {/* Photo */}
                <div className="relative overflow-hidden shrink-0" style={{ height: "220px" }}>
                  <Image src={room.img} alt={room.name} fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  {room.badge && (
                    <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full"
                      style={{ backgroundColor: GREEN, color: WHITE }}>{room.badge}</span>
                  )}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <p className="text-white/70 text-xs flex items-center gap-1 mb-0.5">
                        <MapPin className="w-3 h-3" />{room.view}
                      </p>
                      <p className="text-white font-bold text-lg leading-none" style={{ fontFamily: SERIF }}>{room.name}</p>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col p-5">
                  <p className="text-sm mb-3 flex-1" style={{ color: GRAY }}>{room.tagline}</p>
                  <div className="flex items-center gap-3 text-xs mb-4" style={{ color: LGRAY }}>
                    <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5" />{room.beds}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />Maks {room.capacity}</span>
                  </div>
                  <div className="flex items-center justify-between pt-4"
                    style={{ borderTop: `1px solid ${BORDER}` }}>
                    <div>
                      <span className="font-bold text-base" style={{ color: DARK }}>{rp(room.price)}</span>
                      <span className="text-xs" style={{ color: LGRAY }}> /malam</span>
                    </div>
                    <button onClick={() => openDrawer(room)}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold text-white transition-all hover:opacity-90 active:scale-95"
                      style={{ backgroundColor: GREEN }}>
                      Pesan <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FACILITIES ──────────────────────────────────────────── */}
      <section id="fasilitas" className="py-24 px-6" style={{ backgroundColor: CREAM, scrollMarginTop: "100px" }}>
        <div className="max-w-[1280px] mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GREEN }}>Fasilitas</p>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(32px,4vw,52px)", lineHeight: 1.1, letterSpacing: "-0.02em", color: DARK, fontWeight: 700 }}>
              Semua yang Anda butuhkan<br />sudah tersedia
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {FACILITIES.map((f, i) => (
              <motion.div key={f.label}
                variants={fadeUp} custom={i * 0.06} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="flex flex-col gap-4 p-6 rounded-2xl"
                style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: LGREEN }}>
                  <f.icon className="w-5 h-5" style={{ color: GREEN }} />
                </div>
                <div>
                  <p className="font-bold text-sm mb-1" style={{ color: DARK }}>{f.label}</p>
                  <p className="text-xs leading-relaxed" style={{ color: LGRAY }}>{f.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ─────────────────────────────────────────────── */}
      <section id="galeri" className="py-24 px-6" style={{ scrollMarginTop: "100px" }}>
        <div className="max-w-[1280px] mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GREEN }}>Galeri</p>
              <h2 style={{ fontFamily: SERIF, fontSize: "clamp(28px,3.5vw,44px)", lineHeight: 1.1, letterSpacing: "-0.02em", color: DARK, fontWeight: 700 }}>
                Lihat sendiri keindahannya
              </h2>
            </div>
          </motion.div>

          {/* 2-row grid: big hero + 1 right | 3 equal bottom */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {PHOTOS.map((src, i) => (
              <motion.div key={i}
                variants={fadeUp} custom={i * 0.06} initial="hidden" whileInView="show" viewport={{ once: true }}
                className={`relative overflow-hidden rounded-2xl group cursor-pointer ${i === 0 ? "col-span-2 md:col-span-2" : ""}`}
                style={{ height: i < 2 ? "360px" : "220px" }}>
                <Image src={src} alt={`Galeri ${i + 1}`} fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="50vw" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────── */}
      <section id="testimoni" className="py-24 px-6" style={{ backgroundColor: CREAM, scrollMarginTop: "100px" }}>
        <div className="max-w-[1280px] mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mb-14 text-center">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GREEN }}>Testimoni</p>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(32px,4vw,52px)", lineHeight: 1.1, letterSpacing: "-0.02em", color: DARK, fontWeight: 700, marginBottom: "12px" }}>
              Kata mereka yang sudah merasakan
            </h2>
            <div className="flex items-center justify-center gap-1.5">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
              <span className="ml-2 font-semibold text-sm" style={{ color: DARK }}>4.9</span>
              <span className="text-sm" style={{ color: LGRAY }}>dari 127 ulasan terverifikasi</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <motion.div key={r.name}
                variants={fadeUp} custom={i * 0.08} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="flex flex-col p-7 rounded-2xl"
                style={{ backgroundColor: WHITE, border: `1px solid ${BORDER}` }}>
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-base leading-relaxed flex-1 mb-6" style={{ color: DARK, fontStyle: "italic" }}>
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="pt-5 flex items-center gap-3" style={{ borderTop: `1px solid ${BORDER}` }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={{ backgroundColor: GREEN }}>{r.initials}</div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: DARK }}>{r.name}</p>
                    <p className="text-xs" style={{ color: LGRAY }}>{r.origin} · {r.date} · {r.unit}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATION + CTA ──────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GREEN }}>Lokasi</p>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(28px,3.5vw,44px)", lineHeight: 1.1, letterSpacing: "-0.02em", color: DARK, fontWeight: 700, marginBottom: "20px" }}>
              Temukan kami
            </h2>
            <div className="rounded-2xl overflow-hidden mb-6" style={{ height: "300px", border: `1px solid ${BORDER}` }}>
              <iframe title="Lokasi Tepi Kali"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.0!2d110.217!3d-7.574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMzQnMjYuNCJTIDExMMKwMTMnMDEuMiJF!5e0!3m2!1sen!2sid!4v1"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" />
            </div>
            <div className="flex flex-col gap-3 text-sm" style={{ color: GRAY }}>
              <p className="flex items-start gap-3"><MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: GREEN }} />Jl. Kali Jernih No. 3, Mungkid, Magelang, Jawa Tengah 56511</p>
              <p className="flex items-center gap-3"><Phone className="w-4 h-4 shrink-0" style={{ color: GREEN }} />+62 895-335-501192</p>
              <p className="flex items-center gap-3"><Mail className="w-4 h-4 shrink-0" style={{ color: GREEN }} />hello@tepikali.id</p>
              <p className="flex items-center gap-3"><Clock className="w-4 h-4 shrink-0" style={{ color: GREEN }} />Check-in 14.00 · Check-out 11.00 WIB</p>
            </div>
          </motion.div>

          {/* CTA card */}
          <motion.div variants={fadeUp} custom={0.1} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden flex flex-col justify-end p-10"
            style={{ minHeight: "420px" }}>
            <Image src="/images/demo/hotel/glamping-sungai.jpg" alt="CTA" fill className="object-cover" sizes="50vw" />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 100%)" }} />
            <div className="relative">
              <h3 style={{ fontFamily: SERIF, fontSize: "32px", color: WHITE, fontWeight: 700, lineHeight: 1.2, marginBottom: "12px" }}>
                Siap untuk malam yang berbeda?
              </h3>
              <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>
                Pesan sekarang dan dapatkan konfirmasi dalam 1 jam.
              </p>
              <a href={WA_DEMO} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: GREEN }}>
                <MessageCircle className="w-4 h-4" /> Hubungi via WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer className="px-6 pt-16 pb-8" style={{ backgroundColor: "#111111" }}>
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-12 pb-12"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: GREEN }}>
                  <Waves className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold" style={{ fontFamily: SERIF, color: WHITE }}>
                  Tepi<em style={{ color: "#a8d4b4" }}>Kali</em>
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                Glamping & retreat tepi sungai di Magelang. Alam, kesederhanaan, dan ketenangan dalam satu tempat.
              </p>
            </div>
            <div className="flex flex-wrap gap-12 text-sm">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>Unit</p>
                {ROOMS.map(r => (
                  <button key={r.id} onClick={() => openDrawer(r)}
                    className="block mb-2.5 text-left hover:opacity-70 transition-opacity"
                    style={{ color: "rgba(255,255,255,0.5)" }}>{r.name}</button>
                ))}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>Navigasi</p>
                {[["Unit", "#unit"], ["Fasilitas", "#fasilitas"], ["Galeri", "#galeri"], ["Testimoni", "#testimoni"]].map(([l, h]) => (
                  <a key={l} href={h} className="block mb-2.5 hover:opacity-70 transition-opacity"
                    style={{ color: "rgba(255,255,255,0.5)" }}>{l}</a>
                ))}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>Kontak</p>
                <p className="mb-2.5 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>+62 895-335-501192</p>
                <p className="mb-2.5 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>hello@tepikali.id</p>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Mungkid, Magelang</p>
              </div>
            </div>
          </div>
          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs"
            style={{ color: "rgba(255,255,255,0.2)" }}>
            <p>© 2025 Tepi Kali Glamping. Hak cipta dilindungi.</p>
            <p>Website oleh <a href="https://nehandev.com" className="font-bold hover:text-white transition-colors"
              style={{ color: "#818cf8" }}>NehanDev</a></p>
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
        {drawerRoom && (
          <>
            <motion.div key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[200]"
              style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(3px)" }}
              onClick={closeDrawer} />

            <motion.div key="drawer"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-[210] flex flex-col bg-white"
              style={{ width: "min(460px, 100vw)", boxShadow: "-4px 0 48px rgba(0,0,0,0.18)" }}
              onClick={e => e.stopPropagation()}>

              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-4 shrink-0"
                style={{ borderBottom: `1px solid ${BORDER}` }}>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: LGRAY }}>Pesan Unit</p>
                  <p className="font-bold text-lg" style={{ fontFamily: SERIF, color: DARK }}>{drawerRoom.name}</p>
                </div>
                <button onClick={closeDrawer}
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                  style={{ color: DARK }}>
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Room image */}
              <div className="relative shrink-0" style={{ height: "210px" }}>
                <Image src={drawerRoom.img} alt={drawerRoom.name} fill className="object-cover" sizes="460px" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                  <div>
                    <p className="text-white/75 text-xs mb-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />{drawerRoom.view}
                    </p>
                    <p className="text-white font-bold text-2xl" style={{ fontFamily: SERIF }}>
                      {rp(drawerRoom.price)}<span className="text-sm font-normal opacity-70"> /malam</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/70 text-xs">{drawerRoom.beds}</p>
                    <p className="text-white/70 text-xs">{drawerRoom.size} · Maks {drawerRoom.capacity} tamu</p>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="px-6 py-4 shrink-0 flex flex-wrap gap-2" style={{ borderBottom: `1px solid ${BORDER}` }}>
                {drawerRoom.highlights.map(h => (
                  <span key={h} className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full font-medium"
                    style={{ backgroundColor: LGREEN, color: GREEN }}>
                    <Check className="w-3 h-3" />{h}
                  </span>
                ))}
              </div>

              {/* Form */}
              <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">

                {/* Dates */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: LGRAY }}>Tanggal Menginap</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Check In",  val: checkin,  min: today,       set: handleCheckin },
                      { label: "Check Out", val: checkout, min: checkoutMin,  set: setCheckout },
                    ].map(f => (
                      <div key={f.label} className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold" style={{ color: GRAY }}>{f.label}</label>
                        <input type="date" min={f.min} value={f.val}
                          onChange={e => f.set(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl text-sm font-medium outline-none cursor-pointer"
                          style={{ border: `1.5px solid ${f.val ? GREEN : BORDER}`, color: DARK, colorScheme: "light" }} />
                      </div>
                    ))}
                  </div>
                  {nights > 0 && (
                    <div className="mt-2 text-xs font-semibold text-center py-2 rounded-lg"
                      style={{ backgroundColor: LGREEN, color: GREEN }}>
                      {nights} malam · estimasi {rp(drawerRoom.price * nights)}
                    </div>
                  )}
                </div>

                {/* Guests */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: LGRAY }}>Jumlah Tamu</p>
                  <div className="flex items-center justify-between px-4 py-3.5 rounded-xl"
                    style={{ border: `1.5px solid ${BORDER}` }}>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: DARK }}>{guests} Tamu</p>
                      <p className="text-xs" style={{ color: LGRAY }}>Maks. {drawerRoom.capacity} orang/unit</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setGuests(g => Math.max(1, g - 1))}
                        className="w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors"
                        style={{ borderColor: guests <= 1 ? BORDER : GREEN, color: guests <= 1 ? LGRAY : GREEN }}>
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-5 text-center font-bold" style={{ color: DARK }}>{guests}</span>
                      <button onClick={() => setGuests(g => Math.min(drawerRoom.capacity, g + 1))}
                        className="w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors"
                        style={{ borderColor: guests >= drawerRoom.capacity ? BORDER : GREEN, color: guests >= drawerRoom.capacity ? LGRAY : GREEN }}>
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Add-ons */}
                <div>
                  <button onClick={() => setShowAddons(v => !v)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors hover:bg-gray-50"
                    style={{ border: `1.5px solid ${BORDER}` }}>
                    <span className="text-sm font-semibold" style={{ color: DARK }}>
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
                        <div className="mt-2 rounded-xl p-3 flex flex-col gap-1.5"
                          style={{ backgroundColor: CREAM, border: `1px solid ${BORDER}` }}>
                          {ADDONS.map(a => {
                            const on = addons.includes(a.id)
                            return (
                              <button key={a.id} onClick={() => setAddons(p => on ? p.filter(x => x !== a.id) : [...p, a.id])}
                                className="flex items-center justify-between py-2 px-1 rounded-lg hover:bg-white/80 transition-colors text-left">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all"
                                    style={{ borderColor: on ? GREEN : BORDER, backgroundColor: on ? GREEN : "transparent" }}>
                                    {on && <Check className="w-2.5 h-2.5 text-white" />}
                                  </div>
                                  <span className="text-sm" style={{ color: DARK }}>{a.emoji} {a.name}</span>
                                </div>
                                <span className="text-xs shrink-0 ml-2" style={{ color: GRAY }}>{a.label}</span>
                              </button>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Price summary */}
                {(nights > 0 || addonsTotal > 0) && (
                  <div className="rounded-xl p-4" style={{ backgroundColor: LGREEN, border: `1px solid #c8ddd0` }}>
                    <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GREEN }}>Estimasi Biaya</p>
                    <div className="flex flex-col gap-2 text-sm">
                      {nights > 0 && (
                        <div className="flex justify-between">
                          <span style={{ color: DARK }}>{rp(drawerRoom.price)} × {nights} malam</span>
                          <span className="font-semibold" style={{ color: DARK }}>{rp(drawerRoom.price * nights)}</span>
                        </div>
                      )}
                      {ADDONS.filter(a => addons.includes(a.id)).map(a => (
                        <div key={a.id} className="flex justify-between">
                          <span style={{ color: DARK }}>{a.emoji} {a.name}</span>
                          <span className="font-semibold" style={{ color: DARK }}>{rp(a.perPerson ? a.price * guests : a.price)}</span>
                        </div>
                      ))}
                      <div className="flex justify-between font-bold text-base pt-2"
                        style={{ borderTop: `1px solid #c8ddd0`, color: DARK }}>
                        <span>Total Estimasi</span>
                        <span style={{ color: GREEN }}>{rp((nights > 0 ? drawerRoom.price * nights : 0) + addonsTotal)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer footer */}
              <div className="px-6 py-4 shrink-0" style={{ borderTop: `1px solid ${BORDER}` }}>
                <a href={waLink(buildMsg(drawerRoom))} target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base text-white transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ backgroundColor: GREEN, boxShadow: `0 4px 16px rgba(58,102,72,0.35)` }}>
                  <MessageCircle className="w-5 h-5" /> Pesan via WhatsApp
                </a>
                <p className="text-center text-xs mt-2" style={{ color: LGRAY }}>
                  Tidak ada biaya sampai pesanan dikonfirmasi
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
