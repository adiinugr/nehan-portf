import type { Metadata } from "next"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { BUSINESS_NAME, BUSINESS_EMAIL } from "@/lib/business-info"

export const metadata: Metadata = {
  title: "Kebijakan Privasi Analogis",
  description: "Kebijakan privasi aplikasi Analogis — data yang dikumpulkan dari siswa, cara kami melindunginya, dan cara menghapus akun.",
  alternates: { canonical: "https://www.nehandev.com/analogis/privacy-policy" }
}

const sections = [
  {
    title: "Tentang Kebijakan Ini",
    content: `Analogis adalah aplikasi Android untuk belajar matematika SMP dan SMA secara interaktif: materi langkah demi langkah, soal latihan, AKM, dan berpikir kritis. Analogis dikembangkan dan dioperasikan oleh ${BUSINESS_NAME} ("kami").

Kebijakan ini khusus menjelaskan data yang diproses oleh aplikasi Analogis, terpisah dari kebijakan privasi umum situs nehandev.com.`
  },
  {
    title: "Informasi yang Kami Kumpulkan",
    content: `• Data akun: nama dan alamat email. Anda bisa mendaftar dengan email dan kata sandi (kata sandi disimpan terenkripsi oleh Firebase Authentication dan tidak bisa kami lihat), atau masuk dengan akun Google (kami menerima nama dan alamat email dari Google, tanpa kata sandi Google Anda).
• Akun tamu: Anda bisa mencoba aplikasi tanpa mendaftar. Akun tamu tidak meminta nama atau email; aplikasi memberi nama acak seorang ilmuwan matematika dan membuat ID pengguna anonim.
• Data belajar: kelas yang dipilih, pelajaran yang sudah selesai, skor, XP, streak, target harian, dan lencana. Data ini dipakai supaya progres tersimpan dan bisa dilanjutkan di perangkat lain.

Kami tidak mengumpulkan lokasi, kontak, foto, mikrofon, nomor telepon, atau ID iklan. Aplikasi Analogis tidak menampilkan iklan dan tidak memakai alat analitik maupun pelacakan.`
  },
  {
    title: "Penyimpanan dan Keamanan Data",
    content: `Data disimpan di Google Firebase (Authentication dan Cloud Firestore) dan dikirim lewat koneksi terenkripsi (HTTPS). Aturan akses di server membatasi setiap akun hanya bisa membaca dan mengubah data belajarnya sendiri. Kami menerapkan langkah keamanan teknis yang wajar, namun tidak ada metode transmisi data lewat internet yang 100% aman.`
  },
  {
    title: "Berbagi dengan Pihak Ketiga",
    content: `Kami hanya memakai Google Firebase sebagai penyedia layanan untuk autentikasi akun (termasuk Masuk dengan Google) dan penyimpanan data belajar.

Kami tidak menjual, menyewakan, atau membagikan data Anda kepada pihak lain, dan tidak ada broker data atau jaringan iklan yang terhubung ke aplikasi ini.`
  },
  {
    title: "Pengguna Anak dan Remaja",
    content: `Analogis ditujukan untuk siswa SMP dan SMA, sehingga sebagian penggunanya berusia di bawah 18 tahun. Kami hanya mengumpulkan data yang dibutuhkan agar aplikasi berfungsi, tanpa iklan dan tanpa pelacakan. Orang tua atau wali dapat meminta kami menghapus akun anaknya melalui email di bawah.`
  },
  {
    title: "Hak Anda",
    content: `Sebagai pengguna terdaftar, Anda dapat:

• Melihat data belajar Anda kapan saja di tab Profil aplikasi.
• Menghapus akun beserta seluruh data terkait lewat menu "Hapus akun" di Profil aplikasi.
• Menghubungi kami di ${BUSINESS_EMAIL} untuk pertanyaan atau permintaan lain terkait data Anda.`
  },
  {
    title: "Cara Menghapus Akun & Data",
    content: `Lewat aplikasi (disarankan): buka Analogis → Profil → Hapus akun, lalu konfirmasi (akun email mengetik kata sandi, akun Google memilih ulang akun Google-nya). Akun dan seluruh data belajar (nama, email, kelas, progres, skor, XP, streak, dan lencana) langsung dihapus permanen.

Akun tamu: data akun tamu dihapus otomatis saat Anda keluar dari akun tamu, atau lewat menu Hapus akun yang sama.

Tanpa menginstal aplikasi: kirim email ke ${BUSINESS_EMAIL} dari alamat email akun Analogis Anda, dengan subjek "Hapus Akun Analogis". Kami akan menghapus akun dan seluruh data terkait paling lambat 7 hari setelah memverifikasi identitas pengirim. Tidak ada data yang kami simpan setelah akun dihapus.`
  },
  {
    title: "Perubahan Kebijakan",
    content: `Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Versi terbaru selalu dimuat di halaman ini beserta tanggal pembaruannya. Penggunaan berkelanjutan atas aplikasi Analogis setelah perubahan berlaku dianggap sebagai penerimaan Anda atas kebijakan yang diperbarui.`
  },
  {
    title: "Hubungi Kami",
    content: `Jika Anda memiliki pertanyaan tentang kebijakan privasi aplikasi Analogis ini, silakan hubungi kami:

${BUSINESS_NAME}
Aplikasi: Analogis
Email: ${BUSINESS_EMAIL}`
  }
]

export default function AnalogisPrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-3xl">
            {/* Header */}
            <div className="mb-16">
              <span className="text-sm font-semibold tracking-widest uppercase text-[#4f46e5]">Legal · Analogis</span>
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
                Terakhir diperbarui: 16 Oktober 2026
              </p>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                Kebijakan ini berlaku untuk aplikasi Android <strong>Analogis</strong>, dikembangkan oleh {BUSINESS_NAME} (&ldquo;kami&rdquo;, &ldquo;kita&rdquo;). Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data Anda saat menggunakan aplikasi Analogis.
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
