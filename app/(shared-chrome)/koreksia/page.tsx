import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { BUSINESS_EMAIL } from "@/lib/business-info"

const KOREKSIA_PLAY_URL = "https://play.google.com/store/apps/details?id=com.koreksia.app"

export const metadata: Metadata = {
  title: "Koreksia — Aplikasi Koreksi Lembar Jawaban dan Soal AI untuk Guru",
  description:
    "Buat soal dengan AI, cetak bersama lembar jawabannya, lalu koreksi cukup dengan kamera HP. Nilai keluar dalam hitungan detik, tanpa perangkat untuk siswa. Aplikasi Android untuk guru.",
  alternates: { canonical: "https://www.nehandev.com/koreksia" }
}

const features = [
  { title: "Koreksi dengan kamera HP", desc: "Arahkan kamera ke lembar jawaban. Lembar terdeteksi otomatis dan nilai muncul dalam hitungan detik. Siswa tidak perlu perangkat apa pun." },
  { title: "Soal dibuat AI, kamu yang menyaring", desc: "Tulis topik dan jumlah soal, AI menyusun draf. Kamu periksa dan ubah dulu sebelum disimpan." },
  { title: "Lembar jawaban ikut tercetak", desc: "Ekspor ujian ke PDF lengkap dengan lembar jawaban yang bisa dipindai. Tipe soal: pilihan ganda, pilihan ganda kompleks, benar/salah, dan menjodohkan." },
  { title: "Paket soal acak", desc: "Buat Paket A sampai D dengan urutan soal berbeda supaya siswa sulit menyontek." },
  { title: "Rekap nilai dan analisis butir", desc: "Lihat nilai per kelas, ekspor ke PDF, dan cek soal mana yang paling banyak salah." },
  { title: "Bisa offline", desc: "Memindai tetap jalan tanpa sinyal. Bank soal bisa dibagikan antar-HP lewat berkas, dan data bisa dicadangkan ke akun." }
]

const shots = [
  { src: "/images/koreksia/01-dashboard.jpg", alt: "Beranda Koreksia dengan ujian dan kelas" },
  { src: "/images/koreksia/02-scan.jpg", alt: "Memindai lembar jawaban dengan kamera di Koreksia" },
  { src: "/images/koreksia/03-ai.jpg", alt: "Membuat soal dengan AI di Koreksia" },
  { src: "/images/koreksia/04-rekap.jpg", alt: "Rekap nilai kelas di Koreksia" }
]

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Koreksia",
  operatingSystem: "Android",
  applicationCategory: "EducationalApplication",
  description: "Aplikasi untuk guru: buat soal dengan AI, cetak lembar jawaban, dan koreksi dengan kamera HP.",
  url: "https://www.nehandev.com/koreksia",
  offers: { "@type": "Offer", price: "0", priceCurrency: "IDR" }
}

export default function KoreksiaPage() {
  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen">
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <span className="text-sm font-semibold tracking-widest uppercase text-[#047857]">Aplikasi Android untuk guru · Koreksia</span>
            <h1
              className="mt-3 uppercase leading-[0.9] text-foreground"
              style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(48px, 7vw, 88px)" }}
            >
              Koreksi satu kelas cukup dengan kamera HP
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Koreksia membantu guru membuat soal dengan AI, mencetaknya bersama lembar jawaban, lalu mengoreksi
              jawaban siswa dengan memotretnya. Nilai langsung masuk rekap kelas.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={KOREKSIA_PLAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-[#047857] px-6 py-3 font-semibold text-white hover:opacity-90"
              >
                Dapatkan di Google Play
              </a>
              <Link href="/koreksia/privacy-policy" className="inline-flex items-center px-2 py-3 font-medium text-foreground underline underline-offset-4">
                Kebijakan privasi
              </Link>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Gratis untuk dipakai saat ini · dibuat oleh seorang guru</p>

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
              <h2 className="text-2xl font-bold text-foreground">Dibuat oleh guru, untuk guru</h2>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                Koreksia dikembangkan oleh Adi Nugroho, guru SMAN 10 Surabaya, supaya mengoreksi ujian tidak lagi
                menghabiskan malam. Hasil pindai sebaiknya tetap dicek, terutama untuk lembar yang lecek atau terisi kurang tebal.
              </p>
              <p className="mt-4 text-base text-muted-foreground">
                Saran fitur atau kendala? Hubungi <a className="underline underline-offset-4" href={`mailto:${BUSINESS_EMAIL}`}>{BUSINESS_EMAIL}</a>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
