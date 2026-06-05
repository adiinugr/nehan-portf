"use client"

import { useState, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Search, X, SlidersHorizontal, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { packages, destinations } from "../data"
import { TravelHeader } from "../_components/header"
import { TravelFooter } from "../_components/footer"
import { PackageCard } from "../_components/package-card"
import { GREEN, BG, SANS, SERIF, fadeUp } from "../_components/tokens"

const PER_PAGE = 9
const allDests = ["Semua", ...Array.from(new Set(packages.map((p) => p.dest)))]
const allDays = ["Semua", "1–3 Hari", "4–5 Hari", "6+ Hari"]
const allPrices = ["Semua", "< Rp 1jt", "Rp 1–3jt", "Rp 3–5jt", "> Rp 5jt"]
const allDiff = ["Semua", "Mudah", "Sedang", "Menantang"]

function Pagination({ current, total, onChange }: { current: number; total: number; onChange: (p: number) => void }) {
  if (total <= 1) return null
  const pages = Array.from({ length: total }, (_, i) => i + 1)
  return (
    <div className="flex items-center justify-center gap-2 mt-10" style={{ fontFamily: SANS }}>
      <button onClick={() => onChange(current - 1)} disabled={current === 1}
        className="w-9 h-9 rounded-full flex items-center justify-center border transition-all disabled:opacity-30"
        style={{ borderColor: "#e5e7eb", color: "#374151" }}>
        <ChevronLeft className="w-4 h-4" />
      </button>
      {pages.map((p) => (
        <button key={p} onClick={() => onChange(p)}
          className="w-9 h-9 rounded-full font-semibold text-sm transition-all"
          style={{
            backgroundColor: current === p ? GREEN : "transparent",
            color: current === p ? "#fff" : "#374151",
            border: current === p ? "none" : "1px solid #e5e7eb",
          }}>
          {p}
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

function PaketContent() {
  const searchParams = useSearchParams()

  const [filterDest, setFilterDest] = useState(searchParams.get("dest") || "Semua")
  const [filterDays, setFilterDays] = useState("Semua")
  const [filterPrice, setFilterPrice] = useState(searchParams.get("price") || "Semua")
  const [filterDiff, setFilterDiff] = useState("Semua")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const hasFilter = filterDest !== "Semua" || filterDays !== "Semua" ||
    filterPrice !== "Semua" || filterDiff !== "Semua" || search !== ""

  function resetFilters() {
    setFilterDest("Semua")
    setFilterDays("Semua")
    setFilterPrice("Semua")
    setFilterDiff("Semua")
    setSearch("")
    setPage(1)
  }

  function updateFilter<T>(setter: (v: T) => void) {
    return (v: T) => { setter(v); setPage(1) }
  }

  const filtered = useMemo(() => {
    return packages.filter((p) => {
      if (filterDest !== "Semua" && p.dest !== filterDest) return false
      if (filterDays !== "Semua") {
        if (filterDays === "1–3 Hari" && p.days > 3) return false
        if (filterDays === "4–5 Hari" && (p.days < 4 || p.days > 5)) return false
        if (filterDays === "6+ Hari" && p.days < 6) return false
      }
      if (filterPrice !== "Semua") {
        if (filterPrice === "< Rp 1jt" && p.price >= 1000000) return false
        if (filterPrice === "Rp 1–3jt" && (p.price < 1000000 || p.price > 3000000)) return false
        if (filterPrice === "Rp 3–5jt" && (p.price < 3000000 || p.price > 5000000)) return false
        if (filterPrice === "> Rp 5jt" && p.price <= 5000000) return false
      }
      if (filterDiff !== "Semua" && p.difficulty !== filterDiff) return false
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) &&
        !p.dest.toLowerCase().includes(search.toLowerCase()) &&
        !p.region.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [filterDest, filterDays, filterPrice, filterDiff, search])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <>
      {/* ── FILTER BAR ── */}
      <section className="py-8" style={{ backgroundColor: BG }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" animate="show"
            className="flex flex-wrap gap-3 p-4 rounded-2xl bg-white shadow-sm items-center">
            <div className="flex items-center gap-2 mr-1">
              <SlidersHorizontal className="w-4 h-4" style={{ color: GREEN }} />
              <span className="text-sm font-semibold text-gray-600">Filter:</span>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 flex-1 min-w-[180px]">
              <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <input type="text" placeholder="Cari paket atau destinasi..." value={search}
                onChange={(e) => updateFilter(setSearch)(e.target.value)}
                className="text-sm outline-none flex-1 bg-transparent placeholder:text-gray-400" />
              {search && (
                <button onClick={() => updateFilter(setSearch)("")} className="text-gray-400 hover:text-gray-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dropdowns */}
            {[
              { label: "Destinasi", opts: allDests, val: filterDest, set: updateFilter(setFilterDest) },
              { label: "Durasi", opts: allDays, val: filterDays, set: updateFilter(setFilterDays) },
              { label: "Budget", opts: allPrices, val: filterPrice, set: updateFilter(setFilterPrice) },
              { label: "Tingkat", opts: allDiff, val: filterDiff, set: updateFilter(setFilterDiff) },
            ].map(({ label, opts, val, set }) => (
              <select key={label} value={val} onChange={(e) => set(e.target.value)}
                className="text-sm bg-gray-50 rounded-xl px-3 py-2 outline-none cursor-pointer font-medium"
                style={{ color: val !== "Semua" ? GREEN : "#6b7280" }}>
                {opts.map((o) => (
                  <option key={o} value={o}>{o === "Semua" ? `${label}: Semua` : o}</option>
                ))}
              </select>
            ))}

            {hasFilter && (
              <button onClick={resetFilters}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors hover:opacity-80"
                style={{ backgroundColor: "#fee2e2", color: "#dc2626" }}>
                <X className="w-3.5 h-3.5" /> Reset
              </button>
            )}

            <span className="text-sm text-gray-400 ml-auto hidden md:block">
              {filtered.length} paket ditemukan
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── PACKAGE GRID ── */}
      <section className="pb-20" style={{ backgroundColor: BG }}>
        <div className="max-w-7xl mx-auto px-6">
          {paginated.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-base">Tidak ada paket yang cocok dengan filter.</p>
              <button onClick={resetFilters} className="mt-3 text-sm underline" style={{ color: GREEN }}>
                Reset semua filter
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Menampilkan <span className="font-semibold text-gray-700">{(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)}</span> dari <span className="font-semibold text-gray-700">{filtered.length}</span> paket
                </p>
                {hasFilter && filterDest !== "Semua" && (
                  <span className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{ backgroundColor: GREEN + "15", color: GREEN }}>
                    Destinasi: {filterDest}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginated.map((pkg, i) => (
                  <PackageCard key={pkg.id} pkg={pkg} index={i} />
                ))}
              </div>

              <Pagination current={page} total={totalPages} onChange={setPage} />
            </>
          )}
        </div>
      </section>
    </>
  )
}

export default function PaketPage() {
  return (
    <div style={{ fontFamily: SANS, color: "#1a1a1a", backgroundColor: "#fff" }}>
      <TravelHeader />

      {/* ── PAGE HERO ── */}
      <section className="pt-32 pb-16 bg-white" style={{ borderBottom: "1px solid #f0f0f0" }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GREEN }}>
              Jelajah Nusantara
            </p>
            <div className="flex flex-col md:flex-row md:items-end gap-4 justify-between">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold" style={{ fontFamily: SERIF }}>
                  Semua Paket Wisata
                </h1>
                <p className="text-base text-gray-500 mt-3 max-w-lg">
                  {packages.length} paket tersedia — filter berdasarkan destinasi, durasi, budget, dan tingkat kesulitan.
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <div className="text-center px-5 py-3 rounded-xl" style={{ backgroundColor: BG }}>
                  <p className="text-2xl font-bold" style={{ fontFamily: SERIF, color: GREEN }}>{packages.length}</p>
                  <p className="text-xs text-gray-500">Paket</p>
                </div>
                <div className="text-center px-5 py-3 rounded-xl" style={{ backgroundColor: BG }}>
                  <p className="text-2xl font-bold" style={{ fontFamily: SERIF, color: GREEN }}>{destinations.length}</p>
                  <p className="text-xs text-gray-500">Destinasi</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Suspense fallback={
        <div className="py-20 text-center text-gray-400" style={{ backgroundColor: BG }}>
          <div className="w-8 h-8 mx-auto rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: GREEN, borderTopColor: "transparent" }} />
        </div>
      }>
        <PaketContent />
      </Suspense>

      {/* ── CTA STRIP ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: SERIF }}>Ingin paket yang lebih custom?</h3>
            <p className="text-base text-gray-500">Tim kami bisa merancang itinerary sesuai kebutuhan dan budget spesifik Anda.</p>
          </div>
          <a href={`https://wa.me/62895335501192?text=${encodeURIComponent("Halo Jelajah Nusantara, saya ingin konsultasi paket wisata custom.")}`}
            target="_blank" rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white transition-all hover:opacity-90"
            style={{ backgroundColor: GREEN }}>
            Diskusi Custom Trip <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <TravelFooter />
    </div>
  )
}
