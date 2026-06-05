"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  MapPin, Star, Clock, ChevronRight, Search,
  Calendar, Wallet, Users, ChevronDown, ArrowRight,
} from "lucide-react"
import { packages, destinations } from "./data"
import { TravelHeader } from "./_components/header"
import { TravelFooter } from "./_components/footer"
import { PackageCard } from "./_components/package-card"
import { GREEN, GOLD, BG, SERIF, SANS, fadeUp } from "./_components/tokens"

// ── Static content ────────────────────────────────────────────────
const howSteps = [
  { n: "01", title: "Temukan Destinasi", desc: "Pilih destinasi impian dari ratusan pilihan wisata Indonesia dan filter sesuai budget." },
  { n: "02", title: "Pilih Paket", desc: "Klik 'Pesan Tiket', pilih tanggal keberangkatan, jumlah peserta, dan add-on yang diinginkan." },
  { n: "03", title: "Konfirmasi via WA", desc: "Klik 'Pesan via WhatsApp' — pesan otomatis terisi lengkap. Tim kami konfirmasi dalam 30 menit." },
  { n: "04", title: "DP & Berangkat!", desc: "Lakukan DP 50% untuk amankan kursi Anda. Kami siap 24 jam selama perjalanan." },
]

const testimonials = [
  { name: "Sarah Rahmawati", role: "Traveler · Jakarta", dest: "Raja Ampat", text: "Perjalanan ke Raja Ampat bersama Jelajah Nusantara luar biasa! Semua terorganisir rapi dan guide-nya sangat berpengetahuan luas. Pasti balik lagi!", rating: 5 },
  { name: "Budi Santoso", role: "Fotografer · Surabaya", dest: "Bromo", text: "Paket Bromo sunrise sangat worth it. Spot foto terbaik, waktu tepat, dan pemandangan yang tak terlupakan. Jeep-nya nyaman, guide responsif.", rating: 5 },
  { name: "Citra Dewi", role: "Content Creator · Bandung", dest: "Bali", text: "Itinerary Bali-nya padat tapi tidak melelahkan. Tim support sangat responsif, bahkan saat saya tiba-tiba minta perubahan jadwal mendadak.", rating: 5 },
]

const faqItems = [
  { q: "Apakah harga sudah termasuk tiket pesawat?", a: "Harga paket belum termasuk tiket pesawat PP dari kota asal. Tim kami siap membantu pencarian tiket terbaik jika diperlukan. Hubungi kami untuk paket all-in termasuk penerbangan." },
  { q: "Bagaimana cara melakukan pembayaran?", a: "Pembayaran dapat dilakukan via transfer bank (BCA, Mandiri, BNI) atau QRIS. Down payment 50% untuk konfirmasi booking, sisa 50% dilunasi H-7 keberangkatan." },
  { q: "Apakah ada kebijakan pembatalan?", a: "Pembatalan lebih dari 14 hari sebelum keberangkatan: refund 75%. Pembatalan 7–14 hari: refund 50%. Kurang dari 7 hari: tidak ada refund. Kami sarankan membeli asuransi perjalanan." },
  { q: "Berapa minimal peserta per grup?", a: "Paket open trip minimal 4 peserta. Untuk private trip tersedia minimum 2 orang dengan biaya yang disesuaikan. Hubungi kami untuk penawaran private tour." },
]

const featuredDests = destinations.slice(0, 4)
const featuredPkgs = [
  ...packages.filter((p) => p.featured),
  ...packages.filter((p) => !p.featured),
].slice(0, 6)

const NEHAN_WA = "62895335501192"
const WA_GENERAL = `https://wa.me/${NEHAN_WA}?text=${encodeURIComponent("Halo NehanDev, saya tertarik membuat website travel seperti demo ini untuk bisnis saya.")}`

export default function TravelHomePage() {
  const router = useRouter()
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [heroDate, setHeroDate] = useState("")
  const [heroBudget, setHeroBudget] = useState("Semua")
  const [heroPeserta, setHeroPeserta] = useState(2)

  function handleSearch() {
    const params = new URLSearchParams()
    if (heroBudget !== "Semua") params.set("price", heroBudget)
    const url = `/demo/travel/paket${params.toString() ? `?${params}` : ""}`
    router.push(url)
  }

  return (
    <div style={{ fontFamily: SANS, color: "#1a1a1a", backgroundColor: "#fff" }}>
      <TravelHeader transparent />

      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[700px] flex flex-col justify-end overflow-hidden">
        <Image src="/images/demo/travel/hero.jpg" alt="Indonesia" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom,rgba(0,0,0,0.45) 0%,rgba(0,0,0,0.35) 35%,rgba(0,0,0,0.72) 100%)" }} />
        <div className="relative max-w-7xl mx-auto px-6 pb-28 w-full">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.75)" }}>
              Agen Perjalanan Terpercaya Sejak 2015
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] max-w-3xl mb-6" style={{ fontFamily: SERIF }}>
              Keajaiban alam dan pesona budaya{" "}
              <em style={{ color: GOLD }}>Indonesia.</em>
            </h1>
            <p className="text-lg mb-10" style={{ color: "rgba(255,255,255,0.8)", maxWidth: "500px" }}>
              {packages.length} paket wisata tersedia — dari Sabang sampai Merauke.
            </p>
          </motion.div>

          {/* Hero search bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-4 flex flex-col md:flex-row gap-3 max-w-2xl">
            <div className="flex items-center gap-3 flex-1 px-3">
              <Calendar className="w-4 h-4 shrink-0" style={{ color: GREEN }} />
              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Tanggal</p>
                <input type="date" value={heroDate} onChange={(e) => setHeroDate(e.target.value)}
                  className="text-sm font-medium text-gray-700 bg-transparent outline-none w-full cursor-pointer"
                  style={{ colorScheme: "light" }} />
              </div>
            </div>
            <div className="hidden md:block w-px bg-gray-200 my-1" />
            <div className="flex items-center gap-3 flex-1 px-3">
              <Wallet className="w-4 h-4 shrink-0" style={{ color: GREEN }} />
              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Budget</p>
                <select value={heroBudget} onChange={(e) => setHeroBudget(e.target.value)}
                  className="text-sm font-medium text-gray-700 bg-transparent outline-none w-full cursor-pointer">
                  <option value="Semua">Semua harga</option>
                  <option value="< Rp 1jt">&lt; Rp 1jt</option>
                  <option value="Rp 1–3jt">Rp 1–3jt</option>
                  <option value="Rp 3–5jt">Rp 3–5jt</option>
                  <option value="> Rp 5jt">&gt; Rp 5jt</option>
                </select>
              </div>
            </div>
            <div className="hidden md:block w-px bg-gray-200 my-1" />
            <div className="flex items-center gap-3 flex-1 px-3">
              <Users className="w-4 h-4 shrink-0" style={{ color: GREEN }} />
              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Peserta</p>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setHeroPeserta((p) => Math.max(1, p - 1))}
                    className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-sm leading-none"
                    style={{ backgroundColor: GREEN + "22", color: GREEN }}>−</button>
                  <span className="text-sm font-medium text-gray-700">{heroPeserta} orang</span>
                  <button type="button" onClick={() => setHeroPeserta((p) => Math.min(20, p + 1))}
                    className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-sm leading-none"
                    style={{ backgroundColor: GREEN + "22", color: GREEN }}>+</button>
                </div>
              </div>
            </div>
            <button type="button" onClick={handleSearch}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: GREEN }}>
              <Search className="w-4 h-4" /> Cari
            </button>
          </motion.div>
        </div>

        {/* Stats strip */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-4 gap-px bg-gray-200 rounded-t-2xl overflow-hidden shadow-xl">
              {[["10.000+", "Total Pelanggan"], ["09+", "Tahun Pengalaman"], [packages.length + "+", "Paket Wisata"], ["5.0", "Rating"]].map(([v, l]) => (
                <div key={l} className="bg-white px-6 py-5 text-center">
                  <p className="text-2xl font-bold" style={{ fontFamily: SERIF, color: GREEN }}>{v}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{l}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DESTINASI PREVIEW ── */}
      <section className="py-24" style={{ backgroundColor: BG }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: GREEN }}>Destinasi Unggulan</p>
              <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: SERIF }}>Wisata Indonesia</h2>
            </div>
            <Link href="/demo/travel/destinasi"
              className="flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
              style={{ color: GREEN }}>
              Lihat Semua Destinasi <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredDests.map((dest, i) => (
              <motion.div key={dest.name} variants={fadeUp} custom={i * 0.08} initial="hidden" whileInView="show"
                viewport={{ once: true }}
                className="relative group overflow-hidden rounded-2xl cursor-pointer"
                style={{ height: "240px" }}
                onClick={() => router.push(`/demo/travel/paket?dest=${encodeURIComponent(dest.name)}`)}>
                <Image src={dest.img} alt={dest.name} fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-xs font-medium mb-0.5" style={{ color: "rgba(255,255,255,0.7)" }}>
                    <MapPin className="w-3 h-3 inline mr-1" />{dest.region}
                  </p>
                  <h3 className="text-lg font-bold text-white" style={{ fontFamily: SERIF }}>{dest.name}</h3>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-white"
                    style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)" }}>
                    <Clock className="w-3 h-3 inline mr-1" />{dest.days}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-4 py-2 rounded-full text-xs font-bold text-white" style={{ backgroundColor: GREEN }}>
                    Lihat Paket →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} custom={0.4} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mt-6 text-center">
            <Link href="/demo/travel/destinasi"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border-2 transition-all hover:opacity-70"
              style={{ borderColor: GREEN, color: GREEN }}>
              Lihat Semua {destinations.length} Destinasi <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── PAKET PREVIEW ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: GREEN }}>Paket Pilihan</p>
              <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: SERIF }}>Paket Terpopuler</h2>
            </div>
            <Link href="/demo/travel/paket"
              className="flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
              style={{ color: GREEN }}>
              Lihat Semua {packages.length} Paket <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPkgs.map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} index={i} />
            ))}
          </div>

          <motion.div variants={fadeUp} custom={0.6} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mt-10 text-center">
            <Link href="/demo/travel/paket"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: GREEN }}>
              Lihat Semua Paket Wisata <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── CARA KERJA ── */}
      <section className="py-24" style={{ backgroundColor: BG }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="relative h-[520px] rounded-3xl overflow-hidden">
              <Image src="/images/demo/travel/how-it-works.jpg" alt="Cara Kerja" fill className="object-cover" sizes="50vw" />
            </motion.div>
            <motion.div variants={fadeUp} custom={0.1} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GREEN }}>Cara Kerja</p>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: SERIF }}>
                Satu klik untuk <em style={{ color: GOLD }}>Anda.</em>
              </h2>
              <p className="text-base text-gray-500 leading-relaxed mb-10">
                Mulai perjalanan impian Anda dengan cara yang mudah, cepat, dan terpercaya.
              </p>
              <div className="flex flex-col gap-7">
                {howSteps.map((s, i) => (
                  <motion.div key={s.n} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex items-start gap-5">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-sm"
                      style={{ backgroundColor: GREEN, color: "#fff" }}>
                      {s.n}
                    </div>
                    <div>
                      <h4 className="font-bold text-base mb-1" style={{ fontFamily: SERIF }}>{s.title}</h4>
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
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: GREEN }}>Testimoni</p>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: SERIF }}>Kata Pelanggan Kami</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} variants={fadeUp} custom={i * 0.1} initial="hidden" whileInView="show"
                viewport={{ once: true }} className="rounded-2xl p-6 flex flex-col gap-4" style={{ backgroundColor: BG }}>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-base text-gray-600 leading-relaxed flex-1 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid #e5e7eb" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white" style={{ backgroundColor: GREEN }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ fontFamily: SERIF }}>{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role} · {t.dest}</p>
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
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12 text-center">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: GREEN }}>FAQ</p>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: SERIF }}>Pertanyaan Umum</h2>
          </motion.div>
          <div className="flex flex-col gap-3">
            {faqItems.map((item, i) => (
              <motion.div key={i} variants={fadeUp} custom={i * 0.06} initial="hidden" whileInView="show"
                viewport={{ once: true }} className="rounded-2xl overflow-hidden bg-white"
                style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
                <button className="w-full flex items-center justify-between p-5 text-left gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-semibold text-base" style={{ fontFamily: SERIF }}>{item.q}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                    style={{ color: GREEN }} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                      <p className="px-5 pb-5 text-base text-gray-600 leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          <motion.div variants={fadeUp} custom={0.5} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-8 text-center">
            <Link href="/demo/travel/kontak"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white"
              style={{ backgroundColor: GREEN }}>
              Lihat Halaman Kontak Lengkap <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 relative overflow-hidden" style={{ backgroundColor: GREEN }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url(/images/demo/travel/hero.jpg)", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative max-w-7xl mx-auto px-6 text-center text-white">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="text-4xl md:text-6xl font-bold mb-4" style={{ fontFamily: SERIF }}>
              Siap Memulai <em style={{ color: GOLD }}>Petualangan?</em>
            </h2>
            <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.8)" }}>
              Hubungi kami sekarang dan dapatkan konsultasi perjalanan gratis. Wujudkan liburan impian Anda!
            </p>
            <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105"
              style={{ backgroundColor: GOLD, color: "#1a1a1a", boxShadow: `0 8px 32px rgba(201,168,76,0.4)` }}>
              Chat WhatsApp Sekarang <ChevronRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      <TravelFooter />
    </div>
  )
}
