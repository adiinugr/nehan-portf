import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { BUSINESS_EMAIL } from "@/lib/business-info"

const ANALOGIS_PLAY_URL = "https://play.google.com/store/apps/details?id=com.analogissmp"

export const metadata: Metadata = {
  title: "Analogis — Belajar Matematika SMP & SMA Kurikulum Merdeka",
  description:
    "Materi matematika SMP dan SMA dalam pelajaran pendek: penjelasan, contoh, lalu soal yang langsung dikoreksi dan dibahas. Ada latihan AKM. Gratis dan tanpa iklan.",
  alternates: { canonical: "https://www.nehandev.com/analogis" }
}

const features = [
  { title: "Pelajaran pendek, bisa dicicil", desc: "Setiap bab dipecah jadi pelajaran singkat: penjelasan, contoh, lalu soal. Cukup beberapa menit sehari." },
  { title: "Langsung dikoreksi dan dibahas", desc: "Salah di mana langsung kelihatan, lengkap dengan pembahasan langkah demi langkah." },
  { title: "Sesuai Kurikulum Merdeka", desc: "Materi SMP kelas 7, 8, 9 dan SMA kelas 10. Tingkat kesulitan naik perlahan, dari konsep dasar sampai soal cerita." },
  { title: "Latihan campuran dan AKM", desc: "Ulangi satu bab sekaligus sebelum ulangan, atau coba soal numerasi gaya AKM dengan tabel dan diagram." },
  { title: "Rumus dan gambar yang jelas", desc: "Pecahan, pangkat, akar, dan grafik tampil rapi, dibantu ilustrasi garis bilangan, bangun ruang, dan diagram." },
  { title: "XP, streak, dan lencana", desc: "Kumpulkan poin dan jaga belajar harian. Coba dulu sebagai tamu, simpan progres dengan akun Google kapan saja." }
]

const shots = [
  { src: "/images/analogis/01.jpg", alt: "Beranda Analogis dengan materi yang sedang dipelajari" },
  { src: "/images/analogis/03.jpg", alt: "Penjelasan konsep matematika dengan ilustrasi di Analogis" },
  { src: "/images/analogis/05.jpg", alt: "Soal pilihan ganda yang langsung dikoreksi dan dibahas di Analogis" },
  { src: "/images/analogis/07.jpg", alt: "Layar selesai belajar dengan XP, streak, dan lencana di Analogis" }
]

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Analogis: Matematika SMP & SMA",
  operatingSystem: "Android",
  applicationCategory: "EducationalApplication",
  description: "Aplikasi belajar matematika SMP dan SMA dengan materi interaktif, latihan soal, dan latihan AKM.",
  url: "https://www.nehandev.com/analogis",
  offers: { "@type": "Offer", price: "0", priceCurrency: "IDR" }
}

export default function AnalogisPage() {
  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen">
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <span className="text-sm font-semibold tracking-widest uppercase text-[#2B4BB8]">Aplikasi Android · Analogis</span>
            <h1
              className="mt-3 uppercase leading-[0.9] text-foreground"
              style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(48px, 7vw, 88px)" }}
            >
              Belajar matematika SMP &amp; SMA, sedikit demi sedikit
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Analogis memecah materi matematika jadi pelajaran pendek yang bisa dicicil tiap hari. Soal langsung
              dikoreksi dan dibahas, jadi kamu tahu salahnya di mana saat itu juga.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={ANALOGIS_PLAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-[#2B4BB8] px-6 py-3 font-semibold text-white hover:opacity-90"
              >
                Dapatkan di Google Play
              </a>
              <Link href="/analogis/privacy-policy" className="inline-flex items-center px-2 py-3 font-medium text-foreground underline underline-offset-4">
                Kebijakan privasi
              </Link>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Gratis · tanpa iklan · bisa dicoba tanpa daftar</p>

            <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
              {shots.map((s) => (
                <Image key={s.src} src={s.src} alt={s.alt} width={720} height={1280} className="h-auto w-full rounded-2xl border border-border shadow-lg" />
              ))}
            </div>

            <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <div key={f.title}>
                  <h2 className="text-xl font-bold text-foreground">{f.title}</h2>
                  <p className="mt-2 text-base text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-20 rounded-2xl border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground">Untuk siswa, guru, dan orang tua</h2>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                Analogis tidak memakai iklan dan tidak melacak penggunaan dengan analitik. Materi terus ditambah, dan
                kamu bisa melaporkan soal yang keliru lewat ulasan Play Store atau email.
              </p>
              <p className="mt-4 text-base text-muted-foreground">
                Saran atau pertanyaan? Hubungi <a className="underline underline-offset-4" href={`mailto:${BUSINESS_EMAIL}`}>{BUSINESS_EMAIL}</a>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
