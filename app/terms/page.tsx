import type { Metadata } from "next"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"

export const metadata: Metadata = {
  title: "Syarat & Ketentuan | NehanDev",
  description: "Syarat dan ketentuan penggunaan layanan NehanDev.",
  alternates: { canonical: "https://www.nehandev.com/terms" }
}

const sections = [
  {
    title: "Penerimaan Syarat",
    content: `Dengan menggunakan layanan atau situs web NehanDev, Anda menyetujui untuk terikat oleh syarat dan ketentuan ini. Jika Anda tidak setuju dengan salah satu ketentuan, mohon untuk tidak menggunakan layanan kami.`
  },
  {
    title: "Deskripsi Layanan",
    content: `NehanDev menyediakan layanan pengembangan web profesional yang mencakup:

• Perancangan dan pengembangan website untuk UMKM dan bisnis lokal
• Pembuatan website restoran, travel, penginapan, dan sejenisnya
• Company profile, landing page, dan toko online
• Konsultasi digital dan strategi konten

Ruang lingkup spesifik setiap proyek ditetapkan dalam perjanjian terpisah antara NehanDev dan klien.`
  },
  {
    title: "Kewajiban Klien",
    content: `Sebagai klien, Anda bertanggung jawab untuk:

• Memberikan informasi, konten, dan aset yang diperlukan tepat waktu
• Memberikan umpan balik dan persetujuan sesuai jadwal yang disepakati
• Memastikan bahwa konten yang Anda berikan tidak melanggar hak pihak ketiga
• Membayar tagihan sesuai dengan ketentuan pembayaran yang disepakati`
  },
  {
    title: "Hak Kekayaan Intelektual",
    content: `Setelah pelunasan penuh, Anda memperoleh hak kepemilikan penuh atas desain dan kode sumber yang dikembangkan khusus untuk proyek Anda.

NehanDev mempertahankan hak untuk:
• Menampilkan proyek yang telah selesai dalam portofolio kami
• Menggunakan nama klien sebagai referensi dengan seizin Anda
• Menggunakan kembali komponen kode generik yang tidak unik untuk proyek Anda`
  },
  {
    title: "Pembayaran dan Ketentuan",
    content: `Ketentuan pembayaran umumnya meliputi:

• Uang muka 50% sebelum pengerjaan dimulai
• Pelunasan 50% setelah proyek selesai dan disetujui
• Keterlambatan pembayaran lebih dari 14 hari dapat menyebabkan penundaan pengerjaan

Detail pembayaran akan ditetapkan dalam perjanjian proyek individual.`
  },
  {
    title: "Garansi dan Dukungan",
    content: `NehanDev menyediakan:

• Garansi perbaikan bug selama 30 hari setelah peluncuran (tidak termasuk permintaan fitur baru)
• Dukungan teknis dasar melalui email untuk masalah yang timbul dari kode yang kami kembangkan

Garansi tidak mencakup masalah yang disebabkan oleh modifikasi pihak ketiga atau masalah hosting.`
  },
  {
    title: "Batasan Tanggung Jawab",
    content: `NehanDev tidak bertanggung jawab atas kerugian tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan layanan kami. Tanggung jawab maksimal kami terbatas pada jumlah yang telah Anda bayarkan kepada kami untuk layanan yang bersangkutan.`
  },
  {
    title: "Pengakhiran Layanan",
    content: `Salah satu pihak dapat mengakhiri perjanjian layanan dengan pemberitahuan tertulis 14 hari sebelumnya. Dalam hal pengakhiran:

• Klien membayar untuk pekerjaan yang telah diselesaikan hingga tanggal pengakhiran
• NehanDev menyerahkan semua aset dan kode yang telah dibuat hingga tanggal tersebut`
  },
  {
    title: "Hukum yang Berlaku",
    content: `Syarat dan ketentuan ini tunduk pada hukum Republik Indonesia. Setiap perselisihan akan diselesaikan melalui musyawarah, dan jika tidak tercapai kesepakatan, melalui pengadilan yang berwenang di Indonesia.`
  },
  {
    title: "Hubungi Kami",
    content: `Untuk pertanyaan tentang syarat dan ketentuan ini:

Email: contact@nehandev.com
Instagram: @nehandev`
  }
]

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-3xl">
            {/* Header */}
            <div className="mb-16">
              <span className="text-sm font-semibold tracking-widest uppercase text-primary">Legal</span>
              <h1
                className="mt-3 uppercase leading-[0.9] text-foreground"
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(48px, 7vw, 80px)",
                }}
              >
                Syarat &amp; Ketentuan
              </h1>
              <p className="mt-4 text-base text-muted-foreground">
                Terakhir diperbarui: 1 Juni 2026
              </p>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                Syarat dan ketentuan berikut mengatur penggunaan layanan NehanDev. Harap baca dengan seksama sebelum menggunakan layanan kami.
              </p>
            </div>

            {/* Content */}
            <div className="space-y-10">
              {sections.map((section, i) => (
                <div key={i}>
                  <h2 className="text-xl font-bold text-foreground mb-3">
                    {i + 1}. {section.title}
                  </h2>
                  <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
