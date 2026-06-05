import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, Star, CheckCircle, AlertCircle, ArrowRight } from "lucide-react"
import { type TravelPackage, formatRupiah } from "../data"
import { GREEN, SERIF, fadeUp } from "./tokens"

const diffBg: Record<string, string> = { Mudah: "#e8f5eb", Sedang: "#fff3cd", Menantang: "#fde8e4" }
const diffText: Record<string, string> = { Mudah: "#1a5c2a", Sedang: "#7d5a00", Menantang: "#9b3a2f" }

export function PackageCard({ pkg, index = 0 }: { pkg: TravelPackage; index?: number }) {
  return (
    <motion.div variants={fadeUp} custom={index * 0.06} initial="hidden" whileInView="show"
      viewport={{ once: true }} className="group rounded-2xl overflow-hidden bg-white"
      style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.08)" }}>

      {/* Photo */}
      <div className="relative h-48 overflow-hidden">
        <Image src={pkg.img} alt={pkg.name} fill
          className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: GREEN }}>
            {pkg.label}
          </span>
          {pkg.seats <= 3 && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-500 text-white flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />Tersisa {pkg.seats}!
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{ backgroundColor: diffBg[pkg.difficulty] || "#f3f4f6", color: diffText[pkg.difficulty] || "#4b5563" }}>
            {pkg.difficulty}
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="text-xs font-medium text-white/80">{pkg.dates}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2 gap-2">
          <h3 className="font-bold text-base leading-tight" style={{ fontFamily: SERIF }}>{pkg.name}</h3>
          <div className="flex items-center gap-1 text-xs text-gray-500 shrink-0">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold">{pkg.rating}</span>
            <span>({pkg.reviews})</span>
          </div>
        </div>

        <p className="text-xs text-gray-400 mb-3 flex items-center gap-1">
          <MapPin className="w-3 h-3" />{pkg.region}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {pkg.includes.slice(0, 3).map((inc) => (
            <span key={inc} className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1"
              style={{ backgroundColor: "#f0faf7", color: GREEN }}>
              <CheckCircle className="w-2.5 h-2.5" />{inc}
            </span>
          ))}
          {pkg.includes.length > 3 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
              +{pkg.includes.length - 3} lagi
            </span>
          )}
        </div>

        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 mb-1.5">Keberangkatan tersedia:</p>
          <div className="flex flex-wrap gap-1.5">
            {pkg.departures.slice(0, 4).map((d, idx) => (
              <span key={d} className="text-xs px-2.5 py-1 rounded-lg font-medium"
                style={{ backgroundColor: idx === 0 ? GREEN : "#f3f4f6", color: idx === 0 ? "#fff" : "#4b5563" }}>
                {d}
              </span>
            ))}
            {pkg.departures.length > 4 && (
              <span className="text-xs px-2.5 py-1 rounded-lg font-medium bg-gray-100 text-gray-500">
                +{pkg.departures.length - 4} lagi
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">Mulai dari</p>
            <p className="text-lg font-bold" style={{ color: GREEN, fontFamily: SERIF }}>
              {formatRupiah(pkg.price)}
            </p>
            <p className="text-xs text-gray-400">/ orang</p>
          </div>
          <Link href={`/demo/travel/${pkg.id}`}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: GREEN }}>
            Pesan Tiket <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
