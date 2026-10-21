import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { BUSINESS_EMAIL } from "@/lib/business-info"

const KETIKNOTA_PLAY_URL = "https://play.google.com/store/apps/details?id=com.ketiknota.app"

export const metadata: Metadata = {
  title: "KetikNota — Aplikasi Invoice & Penagihan WhatsApp untuk UMKM",
  description:
    "Bikin invoice dan penawaran dalam hitungan detik, tagih lewat WhatsApp, catat DP sampai lunas. Aplikasi Android gratis untuk usaha jasa, UMKM, dan freelancer.",
  alternates: { canonical: "https://www.nehandev.com/ketiknota" }
}

const features = [
  { title: "Tagih lewat WhatsApp", desc: "Tombol \"Tagih\" membuka WhatsApp dengan pesan yang sudah terisi: nomor invoice, sisa tagihan, jatuh tempo, dan rekening kamu." },
  { title: "Invoice & penawaran satu layar", desc: "Pilih klien, atur jumlah barang/jasa, selesai. Diskon dan PPN dihitung otomatis; penawaran bisa diubah jadi invoice sekali tekan." },
  { title: "DP sampai lunas", desc: "Minta DP di awal, catat termin dan pelunasan lewat transfer, QRIS, atau tunai. Kwitansi PDF dengan cap LUNAS siap dikirim." },
  { title: "Rekening & QRIS di PDF", desc: "Simpan beberapa rekening bank/e-wallet dan gambar QRIS, tampil rapi di kotak \"Cara bayar\"." },
  { title: "Bisa offline", desc: "PDF tetap bisa dibuat tanpa sinyal. Data tersinkron otomatis begitu online lagi." },
  { title: "Arus kas sederhana", desc: "Lihat uang masuk, piutang berjalan, dan catat pengeluaran untuk laporan arus kas." }
]

const shots = [
  { src: "/images/ketiknota/01-home.jpg", alt: "Beranda KetikNota menampilkan tagihan yang belum masuk" },
  { src: "/images/ketiknota/02-form.jpg", alt: "Form pembuatan invoice di KetikNota" },
  { src: "/images/ketiknota/04-detail.jpg", alt: "Detail invoice dengan tombol tagih lewat WhatsApp" },
  { src: "/images/ketiknota/06-reports.jpg", alt: "Laporan arus kas KetikNota" }
]

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "KetikNota",
  operatingSystem: "Android",
  applicationCategory: "BusinessApplication",
  description: "Aplikasi invoice, penawaran, dan penagihan WhatsApp untuk UMKM dan freelancer di Indonesia.",
  url: "https://www.nehandev.com/ketiknota",
  offers: { "@type": "Offer", price: "0", priceCurrency: "IDR" }
}

export default function KetikNotaPage() {
  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen">
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <span className="text-sm font-semibold tracking-widest uppercase text-[#4C9A2A]">Aplikasi Android · KetikNota</span>
            <h1
              className="mt-3 uppercase leading-[0.9] text-foreground"
              style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(48px, 7vw, 88px)" }}
            >
              Invoice rapi, tagih lewat WhatsApp
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              KetikNota bantu usaha jasa, UMKM, dan freelancer menagih lebih cepat: bikin invoice dalam hitungan detik,
              kirim lewat WhatsApp, lalu pantau siapa yang sudah bayar dan siapa yang perlu diingatkan.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={KETIKNOTA_PLAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-[#4C9A2A] px-6 py-3 font-semibold text-white hover:opacity-90"
              >
                Dapatkan di Google Play
              </a>
              <Link href="/ketiknota/privacy-policy" className="inline-flex items-center px-2 py-3 font-medium text-foreground underline underline-offset-4">
                Kebijakan privasi
              </Link>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Gratis untuk mulai · tanpa iklan · sedang dalam pengujian terbuka</p>

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
              <h2 className="text-2xl font-bold text-foreground">Gratis, dengan paket Pro nanti</h2>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                Paket Gratis mencakup hingga 20 invoice terkirim per bulan dan penawaran tanpa batas. Paket Pro (segera) menambah
                laporan arus kas lengkap, ekspor CSV, pengingat tagihan otomatis, logo usaha, dan invoice tanpa batas.
              </p>
              <p className="mt-4 text-base text-muted-foreground">
                Pertanyaan atau masukan? Hubungi <a className="underline underline-offset-4" href={`mailto:${BUSINESS_EMAIL}`}>{BUSINESS_EMAIL}</a>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
