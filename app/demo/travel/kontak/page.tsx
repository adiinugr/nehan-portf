"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Send, User, MessageSquare, ChevronRight } from "lucide-react"
import { TravelHeader } from "../_components/header"
import { TravelFooter } from "../_components/footer"
import { GREEN, GOLD, BG, SANS, SERIF, NEHAN_WA, fadeUp } from "../_components/tokens"

function IgIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

const officeInfo = [
  { icon: MapPin, label: "Alamat Kantor", val: "Jl. Raya Kuta No. 88, Kuta, Bali 80361" },
  { icon: Phone, label: "WhatsApp / Telepon", val: "+62 895-335-501192" },
  { icon: Mail, label: "Email", val: "info@jelajahnusantara.id" },
  { icon: IgIcon, label: "Instagram", val: "@jelajahnusantara" },
]

const hours = [
  { day: "Senin – Jumat", time: "08.00 – 20.00 WIB" },
  { day: "Sabtu – Minggu", time: "09.00 – 18.00 WIB" },
  { day: "Hari Libur Nasional", time: "Tutup (WA tetap aktif)" },
]

const meetingPoints = [
  { city: "Bali", loc: "Kantor Pusat – Jl. Raya Kuta No. 88" },
  { city: "Jakarta", loc: "Meeting Point Stasiun Gambir" },
  { city: "Surabaya", loc: "Meeting Point Bandara Juanda T2" },
  { city: "Makassar", loc: "Meeting Point Bandara Hasanuddin" },
]

export default function KontakPage() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [dest, setDest] = useState("")
  const [msg, setMsg] = useState("")

  function handleSend(e: React.FormEvent) {
    e.preventDefault()
    const text = [
      `Halo Jelajah Nusantara! Saya ingin bertanya tentang paket wisata.`,
      ``,
      `*Nama:* ${name}`,
      `*No. HP:* ${phone}`,
      `*Destinasi Minat:* ${dest || "-"}`,
      `*Pesan:* ${msg || "-"}`,
    ].join("\n")
    window.open(`https://wa.me/${NEHAN_WA}?text=${encodeURIComponent(text)}`, "_blank")
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
              Hubungi Kami
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: SERIF }}>
              Mulai Perjalanan<br />
              <em style={{ color: GOLD }}>Anda Hari Ini</em>
            </h1>
            <p className="text-base max-w-lg" style={{ color: "rgba(255,255,255,0.8)" }}>
              Tim Jelajah Nusantara siap membantu merencanakan perjalanan impian Anda. Konsultasi gratis, respon cepat.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-20" style={{ backgroundColor: BG }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* ── LEFT: Info ── */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* Contact cards */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-5" style={{ fontFamily: SERIF }}>Informasi Kontak</h2>
                <div className="flex flex-col gap-4">
                  {officeInfo.map(({ icon: Icon, label, val }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: "#f0faf7", color: GREEN }}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-medium">{label}</p>
                        <p className="text-sm font-medium text-gray-800">{val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Hours */}
              <motion.div variants={fadeUp} custom={0.1} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-base font-bold mb-4 flex items-center gap-2" style={{ fontFamily: SERIF }}>
                  <Clock className="w-4 h-4" style={{ color: GREEN }} />Jam Operasional
                </h3>
                <div className="flex flex-col gap-3">
                  {hours.map((h) => (
                    <div key={h.day} className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">{h.day}</p>
                      <p className="text-sm font-semibold" style={{ color: GREEN }}>{h.time}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4" style={{ borderTop: "1px solid #f0f0f0" }}>
                  <p className="text-xs text-gray-500">
                    WhatsApp aktif 24 jam untuk keperluan darurat selama perjalanan.
                  </p>
                </div>
              </motion.div>

              {/* Meeting points */}
              <motion.div variants={fadeUp} custom={0.15} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-base font-bold mb-4 flex items-center gap-2" style={{ fontFamily: SERIF }}>
                  <MapPin className="w-4 h-4" style={{ color: GREEN }} />Meeting Point Utama
                </h3>
                <div className="flex flex-col gap-3">
                  {meetingPoints.map((mp) => (
                    <div key={mp.city} className="flex items-start gap-3">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md mt-0.5 shrink-0"
                        style={{ backgroundColor: GREEN + "15", color: GREEN }}>{mp.city}</span>
                      <p className="text-sm text-gray-600">{mp.loc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT: Form + Map ── */}
            <div className="lg:col-span-3 flex flex-col gap-8">
              {/* Inquiry form */}
              <motion.div variants={fadeUp} custom={0.05} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-2" style={{ fontFamily: SERIF }}>Kirim Pertanyaan</h2>
                <p className="text-sm text-gray-500 mb-6">
                  Isi form di bawah dan klik kirim — pesan Anda langsung dikirim via WhatsApp ke tim kami.
                </p>

                <form onSubmit={handleSend} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                        Nama Lengkap *
                      </label>
                      <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3">
                        <User className="w-4 h-4 text-gray-400 shrink-0" />
                        <input type="text" required placeholder="Nama Anda" value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="text-sm outline-none flex-1 bg-transparent placeholder:text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                        Nomor WhatsApp *
                      </label>
                      <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3">
                        <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                        <input type="tel" required placeholder="08xx-xxxx-xxxx" value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="text-sm outline-none flex-1 bg-transparent placeholder:text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                      Destinasi yang Diminati
                    </label>
                    <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3">
                      <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                      <input type="text" placeholder="Contoh: Bali, Labuan Bajo, Raja Ampat..." value={dest}
                        onChange={(e) => setDest(e.target.value)}
                        className="text-sm outline-none flex-1 bg-transparent placeholder:text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                      Pesan / Pertanyaan
                    </label>
                    <div className="flex items-start gap-2 bg-gray-50 rounded-xl px-4 py-3">
                      <MessageSquare className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                      <textarea placeholder="Ceritakan rencana perjalanan Anda atau ajukan pertanyaan..." value={msg}
                        onChange={(e) => setMsg(e.target.value)} rows={4}
                        className="text-sm outline-none flex-1 bg-transparent placeholder:text-gray-400 resize-none" />
                    </div>
                  </div>

                  <button type="submit"
                    className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: GREEN }}>
                    <Send className="w-4 h-4" /> Kirim via WhatsApp
                  </button>
                </form>
              </motion.div>

              {/* Map */}
              <motion.div variants={fadeUp} custom={0.1} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm" style={{ height: "320px" }}>
                <iframe
                  title="Lokasi Jelajah Nusantara"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.063!2d115.167!3d-8.721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwNDMnMTUuNiJTIDExNcKwMTAnMDEuMiJF!5e0!3m2!1sen!2sid!4v1"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WA CTA ── */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GREEN }}>Respon Cepat</p>
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: SERIF }}>
              Lebih suka langsung chat?
            </h2>
            <p className="text-base text-gray-500 mb-8">
              Tim kami merespons dalam waktu kurang dari 30 menit pada jam operasional.
            </p>
            <a href={`https://wa.me/${NEHAN_WA}?text=${encodeURIComponent("Halo Jelajah Nusantara, saya ingin konsultasi paket wisata.")}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105"
              style={{ backgroundColor: GREEN, color: "#fff", boxShadow: `0 8px 32px ${GREEN}40` }}>
              Chat WhatsApp Sekarang <ChevronRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      <TravelFooter />
    </div>
  )
}
