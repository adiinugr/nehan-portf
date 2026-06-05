import type { Metadata } from "next"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"

export const metadata: Metadata = {
  title: "Kebijakan Privasi | NehanDev",
  description: "Kebijakan privasi NehanDev — bagaimana kami mengumpulkan, menggunakan, dan melindungi data Anda.",
  alternates: { canonical: "https://www.nehandev.com/privacy-policy" }
}

const sections = [
  {
    title: "Informasi yang Kami Kumpulkan",
    content: `Kami mengumpulkan informasi yang Anda berikan secara langsung kepada kami, termasuk:

• Nama dan alamat email saat Anda menghubungi kami melalui formulir kontak
• Informasi proyek dan kebutuhan bisnis yang Anda sampaikan
• Data penggunaan situs web melalui cookie dan analitik (anonim)

Kami tidak menjual, menyewakan, atau membagikan informasi pribadi Anda kepada pihak ketiga tanpa persetujuan eksplisit Anda.`
  },
  {
    title: "Penggunaan Informasi",
    content: `Informasi yang kami kumpulkan digunakan untuk:

• Merespons pertanyaan dan permintaan layanan Anda
• Memberikan penawaran dan informasi proyek yang relevan
• Meningkatkan kualitas layanan dan pengalaman pengguna situs
• Mengirimkan pembaruan terkait proyek yang sedang berjalan`
  },
  {
    title: "Keamanan Data",
    content: `Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang wajar untuk melindungi informasi pribadi Anda dari akses tidak sah, pengungkapan, perubahan, atau penghapusan. Namun, tidak ada metode transmisi data melalui internet yang 100% aman.`
  },
  {
    title: "Cookie",
    content: `Situs ini menggunakan cookie untuk meningkatkan pengalaman pengguna. Cookie adalah file teks kecil yang disimpan di perangkat Anda. Anda dapat menonaktifkan cookie melalui pengaturan browser, namun beberapa fitur situs mungkin tidak berfungsi optimal.`
  },
  {
    title: "Tautan Pihak Ketiga",
    content: `Situs kami dapat berisi tautan ke situs web pihak ketiga. Kami tidak bertanggung jawab atas praktik privasi atau konten situs-situs tersebut. Kami menyarankan Anda membaca kebijakan privasi setiap situs yang Anda kunjungi.`
  },
  {
    title: "Hak Anda",
    content: `Anda memiliki hak untuk:

• Mengakses informasi pribadi yang kami simpan tentang Anda
• Meminta koreksi data yang tidak akurat
• Meminta penghapusan data pribadi Anda
• Mencabut persetujuan pemrosesan data kapan saja

Untuk menggunakan hak-hak tersebut, hubungi kami di contact@nehandev.com.`
  },
  {
    title: "Perubahan Kebijakan",
    content: `Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan material akan diberitahukan melalui situs web atau email. Penggunaan berkelanjutan atas layanan kami setelah perubahan berlaku dianggap sebagai penerimaan Anda atas kebijakan yang diperbarui.`
  },
  {
    title: "Hubungi Kami",
    content: `Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami:

Email: contact@nehandev.com
Instagram: @nehandev`
  }
]

export default function PrivacyPolicyPage() {
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
                Kebijakan Privasi
              </h1>
              <p className="mt-4 text-base text-muted-foreground">
                Terakhir diperbarui: 1 Juni 2026
              </p>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                NehanDev ("kami", "kita") berkomitmen untuk melindungi privasi Anda. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda saat menggunakan layanan kami di nehandev.com.
              </p>
            </div>

            {/* Content */}
            <div className="space-y-10">
              {sections.map((section, i) => (
                <div key={i}>
                  <h2
                    className="text-xl font-bold text-foreground mb-3"
                  >
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
