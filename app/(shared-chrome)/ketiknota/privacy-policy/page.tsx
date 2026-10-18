import type { Metadata } from "next"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { BUSINESS_NAME, BUSINESS_EMAIL } from "@/lib/business-info"

export const metadata: Metadata = {
  title: "Kebijakan Privasi KetikNota",
  description: "Kebijakan privasi aplikasi KetikNota — data apa yang kami simpan untuk membuat invoice, penawaran, dan catatan pembayaran, serta cara menghapus akun.",
  alternates: { canonical: "https://www.nehandev.com/ketiknota/privacy-policy" }
}

const sections = [
  {
    title: "Tentang Kebijakan Ini",
    content: `KetikNota adalah aplikasi Android untuk pelaku usaha dan penyedia jasa di Indonesia — membuat invoice dan penawaran, mencatat pembayaran, mengirim tagihan lewat WhatsApp, dan melihat laporan sederhana. KetikNota dikembangkan dan dioperasikan oleh ${BUSINESS_NAME} ("kami").

Kebijakan ini khusus menjelaskan data yang diproses oleh aplikasi KetikNota, terpisah dari kebijakan privasi umum situs nehandev.com.`
  },
  {
    title: "Informasi yang Kami Kumpulkan",
    content: `• Data akun: alamat email (jika mendaftar dengan email/kata sandi atau Google Sign-In). Jika Anda memakai mode Tamu, akun dibuat tanpa email atau nama.
• Profil usaha: nama usaha, informasi rekening bank yang Anda tulis, prefiks nomor invoice, dan tarif pajak.
• Data klien yang Anda masukkan: nama, nomor WhatsApp, alamat, dan email klien.
• Data produk/jasa: nama, harga, dan satuan.
• Dokumen: invoice dan penawaran (item, nominal, diskon, pajak, tanggal jatuh tempo, nomor dokumen) serta catatan pembayaran (nominal, metode, tanggal).
• Catatan pemakaian kuota bulanan paket Gratis (jumlah invoice terkirim, bukan isinya).
• Laporan kerusakan & statistik pemakaian: jika aplikasi berhenti tiba-tiba, kami menerima laporan teknis (jenis kesalahan, model perangkat, versi Android, versi aplikasi, dan pengenal instalasi) lewat Firebase Crashlytics. Kami juga mencatat peristiwa pemakaian umum lewat Firebase Analytics (misalnya "invoice dikirim" atau "pembayaran dicatat") untuk memahami fitur mana yang berguna. Isi invoice, nama klien, nominal, dan nomor WhatsApp tidak pernah dimasukkan ke laporan ini.

Kami tidak mengakses kontak HP, lokasi, kamera, mikrofon, atau SMS Anda, dan aplikasi KetikNota tidak menampilkan iklan.`
  },
  {
    title: "WhatsApp",
    content: `Tombol "Tagih" dan "Kirim ke WhatsApp" hanya membuka aplikasi WhatsApp di perangkat Anda dengan pesan yang sudah terisi. Pesan dikirim oleh Anda sendiri dari akun WhatsApp Anda. KetikNota tidak mengirim pesan atas nama Anda, tidak membaca percakapan, dan tidak terhubung ke akun WhatsApp Anda.`
  },
  {
    title: "Penyimpanan Data",
    content: `Data Anda disimpan di Google Firebase (Cloud Firestore) di pusat data Jakarta, supaya bisa dibuka kembali saat Anda berganti HP. Salinan sementara juga disimpan di perangkat Anda agar aplikasi tetap bisa dipakai saat offline; salinan ini tersinkron otomatis saat kembali online.

PDF invoice dan kwitansi dibuat di perangkat Anda dan hanya dibagikan ke pihak yang Anda pilih sendiri.`
  },
  {
    title: "Mode Tamu",
    content: `Mode Tamu memungkinkan Anda memakai KetikNota tanpa mendaftar. Data mode Tamu terikat pada akun anonim di perangkat tersebut: jika Anda keluar, menghapus aplikasi, atau menghapus data aplikasi sebelum menyimpan akun (menautkan ke Google atau email), data tersebut tidak dapat dipulihkan.`
  },
  {
    title: "Berbagi dengan Pihak Ketiga",
    content: `Kami hanya membagikan data ke penyedia layanan yang menjalankan aplikasi ini:

• Google Firebase — autentikasi akun, penyimpanan data (Cloud Firestore), fungsi server untuk penomoran dokumen dan rekap pembayaran (Cloud Functions), laporan kerusakan (Crashlytics), dan statistik pemakaian (Analytics).
• Google Play — distribusi aplikasi dan, bila tersedia, pembayaran langganan. Kami tidak menerima maupun menyimpan nomor kartu atau detail pembayaran Anda.

Kami tidak menjual atau menyewakan data Anda kepada pihak ketiga, dan tidak ada broker data atau jaringan iklan yang terhubung ke aplikasi ini.`
  },
  {
    title: "Keamanan Data",
    content: `Data dikirim lewat koneksi terenkripsi. Aturan akses pada penyimpanan cloud kami membatasi setiap akun hanya bisa membaca dan menulis datanya sendiri, dan nomor invoice serta status pembayaran ditetapkan oleh server sehingga tidak bisa diubah sembarangan. Kami menerapkan langkah keamanan teknis yang wajar, namun tidak ada metode transmisi data lewat internet yang 100% aman.`
  },
  {
    title: "Data Klien Anda",
    content: `Data klien (nama, nomor WhatsApp, alamat, email) dimasukkan oleh Anda untuk keperluan penagihan usaha Anda sendiri. Anda bertanggung jawab memastikan bahwa Anda berhak menyimpan dan menghubungi klien tersebut. Kami memperlakukan data klien dengan tingkat perlindungan yang sama seperti data pribadi lain dalam kebijakan ini, dan tidak pernah menghubungi klien Anda.`
  },
  {
    title: "Penyimpanan & Penghapusan",
    content: `Data disimpan selama akun Anda aktif. Saat akun dihapus, profil usaha, klien, produk, invoice, penawaran, catatan pembayaran, dan akun login Anda dihapus permanen dari server kami dan tidak dapat dipulihkan.`
  },
  {
    title: "Hak Anda",
    content: `Sebagai pengguna, Anda dapat:

• Melihat dan mengubah profil usaha, klien, dan produk kapan saja di dalam aplikasi.
• Menghapus akun beserta seluruh data terkait lewat menu "Hapus akun" di aplikasi.
• Menghubungi kami di ${BUSINESS_EMAIL} untuk pertanyaan atau permintaan lain terkait data Anda.`
  },
  {
    title: "Cara Menghapus Akun & Data",
    content: `Lewat aplikasi (disarankan): buka KetikNota → Akun → Hapus akun, lalu konfirmasi. Proses ini menghapus akun dan seluruh data Anda dari server kami secara permanen.

Tanpa menginstal aplikasi: kirim email ke ${BUSINESS_EMAIL} dari alamat email akun KetikNota Anda, dengan subjek "Hapus Akun KetikNota". Kami akan memproses permintaan penghapusan akun dan seluruh data terkait dalam waktu wajar setelah memverifikasi identitas pengirim.`
  },
  {
    title: "Pengguna",
    content: `KetikNota ditujukan untuk pelaku usaha dan penyedia jasa dewasa, bukan untuk anak-anak.`
  },
  {
    title: "Perubahan Kebijakan",
    content: `Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan material akan diberitahukan melalui aplikasi atau email. Penggunaan berkelanjutan atas aplikasi KetikNota setelah perubahan berlaku dianggap sebagai penerimaan Anda atas kebijakan yang diperbarui.`
  },
  {
    title: "Hubungi Kami",
    content: `Jika Anda memiliki pertanyaan tentang kebijakan privasi aplikasi KetikNota ini, silakan hubungi kami:

${BUSINESS_NAME}
Aplikasi: KetikNota
Email: ${BUSINESS_EMAIL}`
  }
]

export default function KetikNotaPrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-3xl">
            {/* Header */}
            <div className="mb-16">
              <span className="text-sm font-semibold tracking-widest uppercase text-[#4C9A2A]">Legal · KetikNota</span>
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
                Terakhir diperbarui: 18 Oktober 2026
              </p>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                Kebijakan ini berlaku untuk aplikasi Android <strong>KetikNota</strong>, dikembangkan oleh {BUSINESS_NAME} (&ldquo;kami&rdquo;, &ldquo;kita&rdquo;). Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data Anda saat menggunakan aplikasi KetikNota.
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
