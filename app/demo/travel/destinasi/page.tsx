"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { MapPin, Clock, Search, X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { destinations } from "../data"
import { TravelHeader } from "../_components/header"
import { TravelFooter } from "../_components/footer"
import { GREEN, GOLD, BG, SANS, SERIF, fadeUp } from "../_components/tokens"

const PER_PAGE = 9

const allRegions = ["Semua", ...Array.from(new Set(destinations.map((d) => d.region)))]

function Pagination({ current, total, onChange }: { current: number; total: number; onChange: (p: number) => void }) {
  if (total <= 1) return null
  return (
    <div className="flex items-center justify-center gap-2 mt-10" style={{ fontFamily: SANS }}>
      <button onClick={() => onChange(current - 1)} disabled={current === 1}
        className="w-9 h-9 rounded-full flex items-center justify-center border transition-all disabled:opacity-30"
        style={{ borderColor: "#e5e7eb", color: "#374151" }}>
        <ChevronLeft className="w-4 h-4" />
      </button>
      {Array.from({ length: total }).map((_, i) => (
        <button key={i} onClick={() => onChange(i + 1)}
          className="w-9 h-9 rounded-full font-semibold text-sm transition-all"
          style={{
            backgroundColor: current === i + 1 ? GREEN : "transparent",
            color: current === i + 1 ? "#fff" : "#374151",
            border: current === i + 1 ? "none" : "1px solid #e5e7eb",
          }}>
          {i + 1}
        </button>
      ))}
      <button onClick={() => onChange(current + 1)} disabled={current === total}
        className="w-9 h-9 rounded-full flex items-center justify-center border transition-all disabled:opacity-30"
        style={{ borderColor: "#e5e7eb", color: "#374151" }}>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}

export default function DestinasiPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [filterRegion, setFilterRegion] = useState("Semua")
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      if (filterRegion !== "Semua" && d.region !== filterRegion) return false
      if (search && !d.name.toLowerCase().includes(search.toLowerCase()) &&
        !d.region.toLowerCase().includes(search.toLowerCase()) &&
        !d.tagline.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [search, filterRegion])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  function handleChange() {
    setPage(1)
  }

  return (
    <div style={{ fontFamily: SANS, color: "#1a1a1a", backgroundColor: "#fff" }}>
      <TravelHeader />

      {/* ── PAGE HERO ── */}
      <section className="pt-32 pb-16 relative overflow-hidden" style={{ backgroundColor: GREEN }}>
        <div className="absolute inset-0 opacity-15"
          style={{ backgroundImage: "url(/images/demo/travel/hero.jpg)", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.7)" }}>
              Jelajah Nusantara
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: SERIF }}>
              Semua Destinasi
            </h1>
            <p className="text-base mb-0 max-w-lg" style={{ color: "rgba(255,255,255,0.8)" }}>
              {destinations.length} destinasi wisata terbaik Indonesia siap untuk dijelajahi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="py-16" style={{ backgroundColor: BG }}>
        <div className="max-w-7xl mx-auto px-6">

          {/* Filter & Search */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="flex flex-wrap gap-3 mb-10 p-4 rounded-2xl bg-white shadow-sm items-center">

            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5 flex-1 min-w-[200px]">
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input type="text" placeholder="Cari destinasi atau wilayah..." value={search}
                onChange={(e) => { setSearch(e.target.value); handleChange() }}
                className="text-sm outline-none flex-1 bg-transparent placeholder:text-gray-400" />
              {search && (
                <button onClick={() => { setSearch(""); handleChange() }} className="text-gray-400 hover:text-gray-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <select value={filterRegion}
              onChange={(e) => { setFilterRegion(e.target.value); handleChange() }}
              className="text-sm rounded-xl px-4 py-2.5 outline-none cursor-pointer font-medium bg-gray-50 border-0"
              style={{ color: filterRegion !== "Semua" ? GREEN : "#6b7280" }}>
              {allRegions.map((r) => (
                <option key={r} value={r}>{r === "Semua" ? "Semua Wilayah" : r}</option>
              ))}
            </select>

            <span className="text-sm text-gray-400 ml-auto">
              {filtered.length} destinasi ditemukan
            </span>
          </motion.div>

          {/* Grid */}
          {paginated.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>Tidak ada destinasi yang cocok.</p>
              <button onClick={() => { setSearch(""); setFilterRegion("Semua"); setPage(1) }}
                className="mt-3 text-sm underline" style={{ color: GREEN }}>
                Reset filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map((dest, i) => (
                <motion.div key={dest.id} variants={fadeUp} custom={i * 0.07} initial="hidden" whileInView="show"
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer bg-white shadow-sm hover:shadow-md transition-shadow"
                  style={{ height: "300px" }}
                  onClick={() => router.push(`/demo/travel/paket?dest=${encodeURIComponent(dest.name)}`)}>
                  <Image src={dest.img} alt={dest.name} fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                  {/* Top badge */}
                  <div className="absolute top-4 left-4">
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full text-white"
                      style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)" }}>
                      <Clock className="w-3 h-3 inline mr-1" />{dest.days}
                    </span>
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-xs font-medium mb-1" style={{ color: "rgba(255,255,255,0.7)" }}>
                      <MapPin className="w-3 h-3 inline mr-1" />{dest.region}
                    </p>
                    <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: SERIF }}>{dest.name}</h3>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{dest.tagline}</p>
                  </div>

                  {/* Hover CTA */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white"
                      style={{ backgroundColor: GREEN }}>
                      Lihat Paket <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <Pagination current={page} total={totalPages} onChange={setPage} />
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: SERIF }}>Tidak menemukan destinasi yang cocok?</h3>
            <p className="text-base text-gray-500">Konsultasikan dengan tim kami, kami bisa membuat itinerary custom sesuai keinginan Anda.</p>
          </div>
          <Link href="/demo/travel/kontak"
            className="shrink-0 flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white transition-all hover:opacity-90"
            style={{ backgroundColor: GREEN }}>
            Konsultasi Custom Trip <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <TravelFooter />
    </div>
  )
}
