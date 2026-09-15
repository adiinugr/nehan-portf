import type { Metadata } from "next"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { BUSINESS_NAME, BUSINESS_EMAIL } from "@/lib/business-info"

export const metadata: Metadata = {
  title: "Kebijakan Privasi Koreksia",
  description: "Kebijakan privasi aplikasi Koreksia — cara kami mengumpulkan, menggunakan, dan melindungi data guru dan siswa, termasuk cara menghapus akun.",
  alternates: { canonical: "https://www.nehandev.com/koreksia/privacy-policy" }
}

const sections = [
  {
    title: "Tentang Kebijakan Ini",
    content: `Koreksia adalah aplikasi Android untuk guru di Indonesia — membuat soal ujian, mencetak Lembar Jawaban OMR, dan mengoreksi hasil ujian otomatis lewat kamera. Koreksia dikembangkan dan dioperasikan oleh ${BUSINESS_NAME} ("kami").

Kebijakan ini khusus menjelaskan data yang diproses oleh aplikasi Koreksia, terpisah dari kebijakan privasi umum situs nehandev.com.`
  },
  {
    title: "Informasi yang Kami Kumpulkan",
    content: `• Data akun: nama, alamat email, dan nama sekolah — saat Anda mendaftar dengan email/kata sandi atau Google Sign-In.
• Data yang Anda masukkan tentang siswa untuk keperluan penilaian: nama siswa, NISN, nomor absen, dan nama kelas.
• Data ujian: judul ujian, soal, kunci jawaban, dan hasil koreksi tiap siswa.
• Catatan pemakaian kuota harian pembuatan soal dengan AI (jumlah pemakaian, bukan isi soal).

Kami tidak mengumpulkan data lokasi, kontak, mikrofon, atau SMS, dan aplikasi Koreksia tidak menampilkan iklan apa pun.`
  },
  {
    title: "Foto Kamera (Lembar Jawaban & Soal)",
    content: `Foto yang diambil kamera untuk memindai Lembar Jawaban, serta foto ilustrasi yang Anda tambahkan pada soal, disimpan **hanya di perangkat Anda sendiri**. Foto-foto ini tidak pernah diunggah ke server kami atau pihak ketiga mana pun.`
  },
  {
    title: "Cadangan Data (Cloud Backup)",
    content: `Data kelas, siswa, ujian, soal, dan hasil koreksi dicadangkan secara otomatis ke penyimpanan cloud (Google Firebase) supaya tidak hilang jika perangkat Anda rusak, hilang, atau diganti. Cadangan ini hanya bisa diakses oleh akun Anda sendiri — bukan oleh guru lain, dan bukan oleh kami secara manual dalam operasional biasa.`
  },
  {
    title: "Penggunaan Fitur AI (Google Gemini)",
    content: `Saat Anda memakai fitur "Buat Soal dengan AI", hanya informasi topik/materi, jenjang kelas, tingkat kesulitan, kurikulum acuan, dan jumlah soal yang diminta yang dikirim ke Google Gemini untuk menghasilkan draf soal.

Tidak ada nama siswa, NISN, atau data pribadi siswa lain yang pernah dikirim ke Gemini atau pihak ketiga mana pun. Setiap soal hasil AI selalu ditinjau oleh Anda sebelum disimpan ke bank soal.`
  },
  {
    title: "Berbagi dengan Pihak Ketiga",
    content: `Kami hanya membagikan data ke penyedia layanan yang menjalankan aplikasi ini:

• Google Firebase — penyimpanan cadangan data dan autentikasi akun.
• Google Gemini — pembuatan draf soal AI (lihat bagian di atas soal data apa yang dikirim).

Kami tidak menjual atau menyewakan data Anda kepada pihak ketiga, dan tidak ada broker data atau jaringan iklan yang terhubung ke aplikasi ini.`
  },
  {
    title: "Keamanan Data",
    content: `Aturan akses pada penyimpanan cloud kami membatasi setiap akun hanya bisa membaca dan menulis datanya sendiri. Kami menerapkan langkah keamanan teknis yang wajar untuk melindungi data dari akses tidak sah, namun tidak ada metode transmisi data lewat internet yang 100% aman.`
  },
  {
    title: "Data Siswa (Bukan Pengguna Aplikasi)",
    content: `Koreksia ditujukan untuk digunakan oleh guru dewasa dalam menjalankan tugas mengajar — bukan digunakan langsung oleh siswa/anak. Data siswa (nama, NISN, nomor absen) dimasukkan oleh guru sebagai bagian dari pencatatan nilai kelas, dan diperlakukan dengan tingkat perlindungan yang sama seperti data pribadi lain yang dijelaskan dalam kebijakan ini.`
  },
  {
    title: "Hak Anda",
    content: `Sebagai pengguna terdaftar, Anda dapat:

• Mengekspor seluruh data Anda kapan saja lewat menu "Ekspor Data Saya" di Profil aplikasi (satu file berisi data kelas, siswa, ujian, soal, dan hasil koreksi).
• Menghapus akun beserta seluruh data terkait lewat menu "Hapus Akun" di Profil aplikasi.
• Menghubungi kami di ${BUSINESS_EMAIL} untuk pertanyaan atau permintaan lain terkait data Anda.`
  },
  {
    title: "Cara Menghapus Akun & Data",
    content: `Lewat aplikasi (disarankan): buka Koreksia → Profil → Akun & Privasi → Hapus Akun, lalu ikuti langkah verifikasi yang diminta. Proses ini menghapus cadangan cloud, akun, dan seluruh data lokal di perangkat Anda secara permanen.

Tanpa menginstal aplikasi: kirim email ke ${BUSINESS_EMAIL} dari alamat email akun Koreksia Anda, dengan subjek "Hapus Akun Koreksia". Kami akan memproses permintaan penghapusan akun dan seluruh data terkait dalam waktu wajar setelah memverifikasi identitas pengirim.`
  },
  {
    title: "Perubahan Kebijakan",
    content: `Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan material akan diberitahukan melalui aplikasi atau email. Penggunaan berkelanjutan atas aplikasi Koreksia setelah perubahan berlaku dianggap sebagai penerimaan Anda atas kebijakan yang diperbarui.`
  },
  {
    title: "Hubungi Kami",
    content: `Jika Anda memiliki pertanyaan tentang kebijakan privasi aplikasi Koreksia ini, silakan hubungi kami:

${BUSINESS_NAME}
Aplikasi: Koreksia
Email: ${BUSINESS_EMAIL}`
  }
]

export default function KoreksiaPrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-3xl">
            {/* Header */}
            <div className="mb-16">
              <span className="text-sm font-semibold tracking-widest uppercase text-[#4f46e5]">Legal · Koreksia</span>
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
                Terakhir diperbarui: 15 September 2026
              </p>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                Kebijakan ini berlaku untuk aplikasi Android <strong>Koreksia</strong>, dikembangkan oleh {BUSINESS_NAME} (&ldquo;kami&rdquo;, &ldquo;kita&rdquo;). Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data Anda saat menggunakan aplikasi Koreksia.
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
