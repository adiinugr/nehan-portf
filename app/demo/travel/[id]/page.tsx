"use client"

import { useState, useMemo } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Users,
  Clock,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  Tag,
  BedDouble,
  Mountain,
  Phone,
  User,
  MessageSquare,
  Plus,
  Minus
} from "lucide-react"
import { packages, formatRupiah, type PackageAddon } from "../data"

// ── WA ───────────────────────────────────────────────────────────
const NEHAN_WA = "62895335501192"
const wa = (msg: string) =>
  `https://wa.me/${NEHAN_WA}?text=${encodeURIComponent(msg)}`
const WA_HELP = wa(
  "Halo Jelajah Nusantara, saya butuh bantuan untuk memesan paket wisata."
)

// ── Design tokens ────────────────────────────────────────────────
const GREEN = "#2b5d4f"
const GOLD = "#c9a84c"
const BG = "#f7f6f2"
const SERIF = "var(--font-playfair, 'Georgia', serif)"
const SANS = "var(--font-dm-sans, sans-serif)"

const difficultyColor = {
  Mudah: { bg: "#e8f5eb", text: "#1a5c2a" },
  Sedang: { bg: "#fff3cd", text: "#7d5a00" },
  Menantang: { bg: "#fde8e4", text: "#9b3a2f" }
}

export default function TravelOrderPage() {
  const params = useParams()
  const id = params?.id as string
  const pkg = packages.find((p) => p.id === id)

  const [departure, setDeparture] = useState(pkg?.departures[0] ?? "")
  const [guests, setGuests] = useState(pkg?.minPax ?? 2)
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [notes, setNotes] = useState("")
  const [openItinerary, setOpenItinerary] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const toggleAddon = (id: string) =>
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    )

  const baseTotal = useMemo(() => (pkg ? pkg.price * guests : 0), [pkg, guests])

  const addonsTotal = useMemo(() => {
    if (!pkg) return 0
    return pkg.addOns
      .filter((a) => selectedAddons.includes(a.id))
      .reduce((sum, a) => sum + a.price * guests, 0)
  }, [pkg, selectedAddons, guests])

  const grandTotal = baseTotal + addonsTotal

  function buildWAMessage() {
    if (!pkg) return ""
    const addonLines = pkg.addOns
      .filter((a) => selectedAddons.includes(a.id))
      .map(
        (a) =>
          `✅ ${a.name} (${guests}× ${a.priceLabel} = ${formatRupiah(a.price * guests)})`
      )
      .join("\n")

    const addonsSection =
      selectedAddons.length > 0 ? `\n🎁 *Add-On:*\n${addonLines}\n` : ""

    const addonsBreakdown = pkg.addOns
      .filter((a) => selectedAddons.includes(a.id))
      .map(
        (a) =>
          `- ${a.name}: ${guests}× ${a.priceLabel} = ${formatRupiah(a.price * guests)}`
      )
      .join("\n")

    return `Halo Jelajah Nusantara! 🌴

Saya ingin memesan paket wisata:

📦 *PAKET:* ${pkg.name}
📍 Destinasi: ${pkg.dest}, ${pkg.region}
⏱ Durasi: ${pkg.days} Hari ${pkg.nights} Malam
📊 Tingkat: ${pkg.difficulty}
${addonsSection}
📅 *Tanggal Keberangkatan:* ${departure}
👥 *Jumlah Peserta:* ${guests} orang
📍 Meeting Point: ${pkg.meetingPoint}

💰 *RINCIAN HARGA:*
- Harga Paket: ${guests}× ${pkg.priceLabel} = ${formatRupiah(baseTotal)}
${addonsBreakdown ? addonsBreakdown + "\n" : ""}- *Total Estimasi: ${formatRupiah(grandTotal)}*

👤 Nama Pemesan: ${name || "(belum diisi)"}
📱 No. HP/WA: ${phone || "(belum diisi)"}
${notes ? `📝 Catatan: ${notes}` : ""}

Mohon konfirmasi ketersediaan. Terima kasih! 🙏`
  }

  if (!pkg) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ backgroundColor: BG, fontFamily: SANS }}
      >
        <AlertCircle className="w-12 h-12 text-gray-400" />
        <p className="text-lg font-semibold text-gray-600">
          Paket tidak ditemukan
        </p>
        <Link
          href="/demo/travel"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white"
          style={{ backgroundColor: GREEN }}
        >
          <ChevronLeft className="w-4 h-4" /> Kembali ke Daftar Paket
        </Link>
      </div>
    )
  }

  const diff = difficultyColor[pkg.difficulty]

  return (
    <div style={{ fontFamily: SANS, backgroundColor: BG, minHeight: "100vh" }}>
      {/* ── Header ── */}
      <header
        className="sticky top-[40px] left-0 right-0 z-50 bg-white border-b border-gray-100"
        style={{ boxShadow: "0 1px 12px rgba(0,0,0,0.06)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <Link
            href="/demo/travel"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Kembali ke Daftar Paket</span>
            <span className="sm:hidden">Kembali</span>
          </Link>

          <span
            className="font-bold text-xl tracking-tight"
            style={{ fontFamily: SERIF, color: GREEN }}
          >
            Jelajah<span style={{ color: GOLD }}>Nusantara</span>
          </span>

          <a
            href={WA_HELP}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-75"
            style={{ color: GREEN }}
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Butuh Bantuan?</span>
          </a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* ── LEFT: Package Detail ── */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* Image + badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden"
            style={{ height: "240px" }}
          >
            <Image
              src={pkg.img}
              alt={pkg.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p
                className="text-xs font-medium mb-1"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                <MapPin className="w-3 h-3 inline mr-1" />
                {pkg.region}
              </p>
              <h1
                className="text-xl font-bold text-white leading-tight"
                style={{ fontFamily: SERIF }}
              >
                {pkg.name}
              </h1>
              <p
                className="text-sm mt-0.5"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                {pkg.tagline}
              </p>
            </div>
            <div className="absolute top-3 left-3 flex gap-2">
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                style={{ backgroundColor: GREEN }}
              >
                {pkg.label}
              </span>
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: diff.bg, color: diff.text }}
              >
                {pkg.difficulty}
              </span>
            </div>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="rounded-2xl bg-white p-5"
            style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
          >
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="flex flex-col items-center gap-1 text-center">
                <Clock className="w-4 h-4" style={{ color: GREEN }} />
                <p className="text-xs text-gray-400">Durasi</p>
                <p className="text-sm font-bold text-gray-800">
                  {pkg.days}H/{pkg.nights}M
                </p>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <Users className="w-4 h-4" style={{ color: GREEN }} />
                <p className="text-xs text-gray-400">Maks. Peserta</p>
                <p className="text-sm font-bold text-gray-800">
                  {pkg.maxGuests} orang
                </p>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <p className="text-xs text-gray-400">Rating</p>
                <p className="text-sm font-bold text-gray-800">
                  {pkg.rating} ({pkg.reviews})
                </p>
              </div>
            </div>

            <div
              className="flex items-start gap-2 pt-4"
              style={{ borderTop: "1px solid #f0ece5" }}
            >
              <MapPin
                className="w-4 h-4 shrink-0 mt-0.5"
                style={{ color: GREEN }}
              />
              <div>
                <p className="text-xs text-gray-400 font-medium">
                  Meeting Point
                </p>
                <p className="text-sm text-gray-700">{pkg.meetingPoint}</p>
              </div>
            </div>
          </motion.div>

          {/* Includes / Excludes */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="rounded-2xl bg-white p-5"
            style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
          >
            <p className="text-sm font-bold mb-3" style={{ color: GREEN }}>
              Sudah Termasuk
            </p>
            <div className="flex flex-col gap-1.5 mb-4">
              {pkg.includes.map((inc) => (
                <div
                  key={inc}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <CheckCircle
                    className="w-3.5 h-3.5 shrink-0"
                    style={{ color: GREEN }}
                  />
                  {inc}
                </div>
              ))}
            </div>
            <p className="text-sm font-bold mb-3 text-gray-500">
              Belum Termasuk
            </p>
            <div className="flex flex-col gap-1.5">
              {pkg.excludes.map((exc) => (
                <div
                  key={exc}
                  className="flex items-center gap-2 text-sm text-gray-500"
                >
                  <XCircle className="w-3.5 h-3.5 shrink-0 text-gray-300" />
                  {exc}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Itinerary accordion */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="rounded-2xl bg-white overflow-hidden"
            style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
          >
            <button
              type="button"
              onClick={() => setOpenItinerary(!openItinerary)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <span className="text-sm font-bold" style={{ color: GREEN }}>
                Itinerary Perjalanan
              </span>
              <ChevronRight
                className={`w-4 h-4 transition-transform duration-300 ${openItinerary ? "rotate-90" : ""}`}
                style={{ color: GREEN }}
              />
            </button>
            {openItinerary && (
              <div className="px-5 pb-5 flex flex-col gap-5">
                {pkg.itinerary.map((day, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: GREEN + "18", color: GREEN }}
                      >
                        {day.day}
                      </span>
                      <p className="text-sm font-semibold text-gray-800">
                        {day.title}
                      </p>
                    </div>
                    <ul className="flex flex-col gap-1 pl-2">
                      {day.activities.map((act, j) => (
                        <li
                          key={j}
                          className="text-sm text-gray-600 flex items-start gap-2"
                        >
                          <span
                            className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: GOLD }}
                          />
                          {act}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* ── RIGHT: Order Form ── */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-3"
        >
          <div
            className="rounded-2xl bg-white p-6 sticky top-24"
            style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.08)" }}
          >
            <h2
              className="text-2xl font-bold mb-1"
              style={{ fontFamily: SERIF, color: GREEN }}
            >
              Detail Pemesanan
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Isi detail di bawah ini, lalu klik "Pesan via WhatsApp" untuk
              konfirmasi.
            </p>

            <div className="flex flex-col gap-6">
              {/* 1. Tanggal */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <Calendar className="w-4 h-4" style={{ color: GREEN }} />
                  Pilih Tanggal Keberangkatan
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {pkg.departures.map((dep) => (
                    <button
                      key={dep}
                      type="button"
                      onClick={() => setDeparture(dep)}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium border transition-all"
                      style={{
                        backgroundColor: departure === dep ? GREEN : "#fff",
                        color: departure === dep ? "#fff" : "#374151",
                        borderColor: departure === dep ? GREEN : "#e5e7eb"
                      }}
                    >
                      {dep}
                    </button>
                  ))}
                </div>
                {pkg.seats <= 3 && (
                  <p className="mt-2 text-xs flex items-center gap-1 text-red-600">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Hanya tersisa {pkg.seats} kursi untuk keberangkatan
                    terdekat!
                  </p>
                )}
              </div>

              {/* 2. Peserta */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <Users className="w-4 h-4" style={{ color: GREEN }} />
                  Jumlah Peserta
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setGuests((g) => Math.max(pkg.minPax, g - 1))
                    }
                    className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-200 transition-colors hover:border-gray-400"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span
                    className="text-lg font-bold w-8 text-center"
                    style={{ color: GREEN }}
                  >
                    {guests}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setGuests((g) => Math.min(pkg.maxGuests, g + 1))
                    }
                    className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-200 transition-colors hover:border-gray-400"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="text-sm text-gray-500">
                    orang (min. {pkg.minPax}, maks. {pkg.maxGuests})
                  </span>
                </div>
              </div>

              {/* 3. Add-Ons */}
              {pkg.addOns.length > 0 && (
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <Tag className="w-4 h-4" style={{ color: GREEN }} />
                    Tambahan (Opsional)
                  </label>
                  <div className="flex flex-col gap-2">
                    {pkg.addOns.map((addon: PackageAddon) => (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddon(addon.id)}
                        className="flex items-center justify-between p-3.5 rounded-xl border text-left transition-all"
                        style={{
                          backgroundColor: selectedAddons.includes(addon.id)
                            ? GREEN + "0c"
                            : "#fff",
                          borderColor: selectedAddons.includes(addon.id)
                            ? GREEN
                            : "#e5e7eb"
                        }}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-5 h-5 rounded flex items-center justify-center border transition-colors"
                            style={{
                              backgroundColor: selectedAddons.includes(addon.id)
                                ? GREEN
                                : "#fff",
                              borderColor: selectedAddons.includes(addon.id)
                                ? GREEN
                                : "#d1d5db"
                            }}
                          >
                            {selectedAddons.includes(addon.id) && (
                              <CheckCircle className="w-3.5 h-3.5 text-white" />
                            )}
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {addon.name}
                          </span>
                        </div>
                        <span
                          className="text-sm font-semibold"
                          style={{ color: GREEN }}
                        >
                          {addon.priceLabel}
                          <span className="text-xs font-normal text-gray-400">
                            /orang
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Data pemesan */}
              <div>
                <p className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                  <User className="w-4 h-4" style={{ color: GREEN }} />
                  Data Pemesan
                  <span className="text-xs font-normal text-gray-400">
                    (Opsional, bisa diisi di WA)
                  </span>
                </p>
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Contoh: Andi Prasetyo"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-green-600 transition-colors bg-gray-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">
                      Nomor WhatsApp
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="08xxxxxxxxxx"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-green-600 transition-colors bg-gray-50 focus:bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">
                      Catatan Khusus
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Alergi makanan, permintaan khusus, dll."
                        rows={3}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-green-600 transition-colors bg-gray-50 focus:bg-white resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Price summary */}
              <div className="rounded-2xl p-4" style={{ backgroundColor: BG }}>
                <p className="text-sm font-bold text-gray-700 mb-3">
                  Ringkasan Harga
                </p>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Harga paket ({guests} orang)
                    </span>
                    <span className="font-semibold">
                      {formatRupiah(baseTotal)}
                    </span>
                  </div>
                  {pkg.addOns
                    .filter((a) => selectedAddons.includes(a.id))
                    .map((a: PackageAddon) => (
                      <div key={a.id} className="flex justify-between">
                        <span className="text-gray-600">
                          {a.name} ({guests}×)
                        </span>
                        <span className="font-semibold">
                          {formatRupiah(a.price * guests)}
                        </span>
                      </div>
                    ))}
                  <div
                    className="flex justify-between pt-2 mt-1 text-base font-bold"
                    style={{ borderTop: "1px dashed #d1cfc8", color: GREEN }}
                  >
                    <span>Total Estimasi</span>
                    <span>{formatRupiah(grandTotal)}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    * Harga estimasi, sudah termasuk semua item di atas.
                    Konfirmasi harga final via WhatsApp.
                  </p>
                </div>
              </div>

              {/* 6. CTA */}
              <a
                href={wa(buildWAMessage())}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setSubmitted(true)}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base text-white transition-all hover:opacity-90 hover:scale-[1.01]"
                style={{
                  backgroundColor: GREEN,
                  boxShadow: `0 6px 24px ${GREEN}40`
                }}
              >
                Pesan via WhatsApp
                <ChevronRight className="w-5 h-5" />
              </a>

              {submitted && (
                <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 rounded-xl px-4 py-3">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  Pesan diteruskan ke WhatsApp! Tim kami akan konfirmasi dalam
                  30 menit.
                </div>
              )}

              <p className="text-center text-xs text-gray-400">
                Dengan memesan, Anda setuju dengan{" "}
                <span className="underline cursor-pointer">
                  syarat & ketentuan
                </span>{" "}
                Jelajah Nusantara.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
