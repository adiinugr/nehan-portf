export type NicheFaq = { q: string; a: string }

export type JasaWebsiteNiche = {
  slug: string
  /** Used in meta title/H1, e.g. "Barbershop" */
  name: string
  /** e.g. "barbershop" — lowercase, for inline sentence use */
  nameLower: string
  accent: string
  gradient: string
  demoHref: string
  demoLive: boolean
  metaTitle: string
  metaDescription: string
  hero: {
    eyebrow: string
    titleLine1: string
    titleHighlight: string
    titleLine2: string
    subtitle: string
    whatsappPrefill: string
  }
  painPoints: { title: string; desc: string }[]
  features: { title: string; desc: string }[]
  faq: NicheFaq[]
}

const baseFaq: NicheFaq[] = [
  {
    q: "Berapa lama proses pembuatan website?",
    a: "Rata-rata 7–14 hari kerja tergantung kompleksitas fitur yang dibutuhkan, mulai dari konsultasi sampai website live."
  },
  {
    q: "Apakah saya bisa update konten sendiri setelah website selesai?",
    a: "Bisa. Kami sertakan panduan pengelolaan sederhana agar Anda bisa mengubah teks, harga, atau foto sendiri tanpa perlu memanggil developer lagi."
  },
  {
    q: "Apakah harga sudah termasuk domain dan hosting?",
    a: "Komponen biaya kami jelaskan secara terbuka saat konsultasi — termasuk apakah domain/hosting tahun pertama tercakup atau terpisah, supaya tidak ada biaya tersembunyi di kemudian hari."
  },
  {
    q: "Apakah website ini akan muncul di pencarian Google?",
    a: "SEO dasar sudah termasuk sejak awal pembuatan — struktur halaman, kecepatan loading, dan meta data dioptimasi agar website punya fondasi yang baik untuk ditemukan di Google."
  }
]

export const jasaWebsiteNiches: Record<string, JasaWebsiteNiche> = {
  "jasa-website-barbershop": {
    slug: "jasa-website-barbershop",
    name: "Barbershop",
    nameLower: "barbershop",
    accent: "#ef4444",
    gradient: "from-zinc-800 via-neutral-900 to-black",
    demoHref: "/demo/barbershop",
    demoLive: true,
    metaTitle: "Jasa Pembuatan Website Barbershop Profesional",
    metaDescription:
      "Jasa pembuatan website barbershop dengan booking online, galeri hasil potongan, dan SEO lokal agar muncul saat orang cari 'barbershop terdekat'. Konsultasi gratis.",
    hero: {
      eyebrow: "Jasa Website Barbershop",
      titleLine1: "Barbershop Anda",
      titleHighlight: "Ditemukan",
      titleLine2: "Bukan Cuma di Followers",
      subtitle:
        "Website khusus barbershop dengan booking online, galeri hasil potongan, dan struktur yang membantu Anda muncul saat calon pelanggan mencari \"barbershop terdekat\" di Google.",
      whatsappPrefill: "Halo NehanDev, saya tertarik jasa pembuatan website barbershop."
    },
    painPoints: [
      {
        title: "Booking Numpuk di DM",
        desc: "Chat masuk dari berbagai kanal, jadwal dicatat manual, dan rawan bentrok saat ramai."
      },
      {
        title: "Tidak Muncul di Google Maps",
        desc: "Calon pelanggan baru di sekitar lokasi Anda tidak menemukan usaha Anda saat mencari \"cukur rambut terdekat\"."
      },
      {
        title: "Bergantung Penuh pada Algoritma Instagram",
        desc: "Reach turun, followers tidak lihat postingan, dan promosi jadi sia-sia."
      }
    ],
    features: [
      { title: "Booking Online", desc: "Pelanggan pilih jam dan kapster favorit tanpa perlu chat dulu." },
      { title: "Galeri Hasil Potongan", desc: "Showcase before-after yang meyakinkan calon pelanggan baru." },
      { title: "Harga & Layanan Jelas", desc: "Daftar layanan dan harga tampil transparan, mengurangi keraguan." },
      { title: "SEO Lokal", desc: "Struktur halaman dioptimasi agar mendukung pencarian \"barbershop terdekat\"." },
      { title: "Lokasi & Jam Buka", desc: "Peta lokasi dan jam operasional yang selalu mudah ditemukan." },
      { title: "Integrasi WhatsApp", desc: "Tombol booking langsung terhubung ke WhatsApp usaha Anda." }
    ],
    faq: [
      ...baseFaq,
      {
        q: "Apakah website ini bisa menerima booking online, bukan cuma tampilan?",
        a: "Bisa — kami sertakan halaman booking sederhana yang menampilkan jam kosong, sehingga pelanggan bisa pesan sendiri tanpa menunggu balasan chat Anda."
      }
    ]
  },

  "jasa-website-rental-mobil": {
    slug: "jasa-website-rental-mobil",
    name: "Rental Mobil",
    nameLower: "rental mobil",
    accent: "#f97316",
    gradient: "from-slate-700 via-gray-800 to-zinc-900",
    demoHref: "/demo/rental",
    demoLive: true,
    metaTitle: "Jasa Pembuatan Website Rental Mobil",
    metaDescription:
      "Jasa pembuatan website rental mobil dengan katalog armada, cek ketersediaan, dan booking online — agar order tidak lari ke kompetitor. Konsultasi gratis.",
    hero: {
      eyebrow: "Jasa Website Rental Mobil",
      titleLine1: "Order Rental Mobil",
      titleHighlight: "Tanpa Ribet",
      titleLine2: "Cek dan Pesan Sendiri",
      subtitle:
        "Website rental mobil dengan katalog armada, harga transparan, dan cek ketersediaan tanggal — supaya calon pelanggan tidak perlu chat berkali-kali hanya untuk tahu mobil kosong atau tidak.",
      whatsappPrefill: "Halo NehanDev, saya tertarik jasa pembuatan website rental mobil."
    },
    painPoints: [
      {
        title: "Double Booking Lewat Chat Manual",
        desc: "Beberapa pelanggan pesan mobil yang sama di jam yang sama karena ketersediaan dicek manual."
      },
      {
        title: "Calon Pelanggan Pindah ke Kompetitor",
        desc: "Tanpa info harga dan armada yang jelas, calon penyewa memilih rental lain yang lebih transparan."
      },
      {
        title: "Sulit Dipercaya Pelanggan Baru",
        desc: "Tanpa jejak digital resmi, rental terasa berisiko untuk penyewaan nilai besar atau jangka panjang."
      }
    ],
    features: [
      { title: "Katalog Armada", desc: "Foto asli tiap unit lengkap dengan spesifikasi dan kapasitas." },
      { title: "Harga & Paket Sewa", desc: "Tarif harian/mingguan tampil jelas tanpa perlu tanya dulu." },
      { title: "Cek Ketersediaan", desc: "Pelanggan pilih tanggal, langsung tahu mobil mana yang kosong." },
      { title: "Pemesanan via WhatsApp", desc: "Tombol pesan yang otomatis mengisi detail mobil dan tanggal." },
      { title: "Testimoni Pelanggan", desc: "Membangun kepercayaan untuk penyewa baru atau luar kota." },
      { title: "Mobile Responsive", desc: "Order tetap lancar diakses lewat HP kapan saja." }
    ],
    faq: [
      ...baseFaq,
      {
        q: "Apakah sistem bisa cek ketersediaan mobil secara otomatis?",
        a: "Bisa — kami bangun sistem sederhana yang menampilkan mobil mana yang kosong di tanggal yang dipilih pelanggan, mengurangi risiko double booking."
      }
    ]
  },

  "jasa-website-hotel-penginapan": {
    slug: "jasa-website-hotel-penginapan",
    name: "Hotel & Penginapan",
    nameLower: "hotel dan penginapan",
    accent: "#d97706",
    gradient: "from-amber-700 via-yellow-800 to-stone-900",
    demoHref: "/demo/hotel",
    demoLive: true,
    metaTitle: "Jasa Pembuatan Website Hotel & Penginapan",
    metaDescription:
      "Jasa pembuatan website hotel dan penginapan dengan showcase kamar, reservasi langsung, dan desain premium — kurangi ketergantungan komisi OTA. Konsultasi gratis.",
    hero: {
      eyebrow: "Jasa Website Hotel & Penginapan",
      titleLine1: "Reservasi Langsung,",
      titleHighlight: "Tanpa",
      titleLine2: "Potongan Komisi OTA",
      subtitle:
        "Website hotel dan penginapan dengan showcase kamar, galeri properti, dan reservasi langsung — membangun kanal booking sendiri di luar Traveloka atau Booking.com.",
      whatsappPrefill: "Halo NehanDev, saya tertarik jasa pembuatan website hotel/penginapan."
    },
    painPoints: [
      {
        title: "Komisi OTA Menggerus Margin",
        desc: "Setiap booking lewat OTA umumnya terpotong komisi 15–20%, menggerus keuntungan penginapan kecil."
      },
      {
        title: "Tidak Punya Data Tamu Sendiri",
        desc: "Kontak dan preferensi tamu tersimpan di sistem OTA, bukan di tangan Anda."
      },
      {
        title: "Kalah Bersaing dari Segi Kepercayaan",
        desc: "Tanpa website resmi, calon tamu ragu memesan langsung dan tetap kembali lewat OTA."
      }
    ],
    features: [
      { title: "Showcase Kamar", desc: "Galeri foto tiap tipe kamar lengkap dengan fasilitas dan harga." },
      { title: "Reservasi Langsung", desc: "Tamu bisa booking langsung ke Anda, bukan lewat OTA." },
      { title: "Harga Transparan", desc: "Tarif per malam tampil jelas tanpa biaya tersembunyi." },
      { title: "Galeri Properti", desc: "Foto area umum, fasilitas, dan lingkungan sekitar penginapan." },
      { title: "Testimoni Tamu", desc: "Bukti sosial yang menggantikan sistem review di OTA." },
      { title: "Integrasi WhatsApp", desc: "Konfirmasi booking cepat langsung lewat WhatsApp." }
    ],
    faq: [
      ...baseFaq,
      {
        q: "Apakah reservasi langsung bisa menggantikan OTA sepenuhnya?",
        a: "Tidak sepenuhnya menggantikan — OTA tetap berguna menjangkau tamu baru. Tapi website reservasi langsung mengurangi ketergantungan komisi, terutama untuk tamu berulang."
      }
    ]
  },

  "jasa-website-travel-wisata": {
    slug: "jasa-website-travel-wisata",
    name: "Travel & Wisata",
    nameLower: "travel dan wisata",
    accent: "#0ea5e9",
    gradient: "from-cyan-500 via-teal-600 to-blue-800",
    demoHref: "/demo/travel",
    demoLive: true,
    metaTitle: "Jasa Pembuatan Website Travel & Wisata",
    metaDescription:
      "Jasa pembuatan website agen travel dan wisata dengan katalog destinasi, paket wisata, dan booking WhatsApp — agar muncul di pencarian Google. Konsultasi gratis.",
    hero: {
      eyebrow: "Jasa Website Travel & Wisata",
      titleLine1: "Paket Wisata Anda",
      titleHighlight: "Ditemukan",
      titleLine2: "Calon Wisatawan di Google",
      subtitle:
        "Website agen travel dengan katalog destinasi, paket wisata, dan testimoni pelanggan — dirancang agar muncul saat orang mencari paket wisata di Google, bukan hanya mengandalkan Instagram.",
      whatsappPrefill: "Halo NehanDev, saya tertarik jasa pembuatan website travel/wisata."
    },
    painPoints: [
      {
        title: "Kalah Bersaing dengan Marketplace Wisata",
        desc: "Agen travel lokal sulit ditemukan karena tertutup platform besar di hasil pencarian."
      },
      {
        title: "WhatsApp Dibanjiri Pertanyaan Berulang",
        desc: "Calon pelanggan menanyakan hal yang sama tentang itinerary dan harga berkali-kali."
      },
      {
        title: "Sulit Terlihat Profesional",
        desc: "Tanpa website, calon wisatawan ragu melakukan pembayaran di muka untuk paket wisata."
      }
    ],
    features: [
      { title: "Katalog Destinasi", desc: "Halaman khusus tiap destinasi lengkap dengan info dan foto." },
      { title: "Paket Wisata Bertingkat", desc: "Beberapa pilihan paket dengan harga dan fasilitas berbeda." },
      { title: "Galeri Foto", desc: "Dokumentasi perjalanan yang membangun kepercayaan calon peserta." },
      { title: "Testimoni Peserta", desc: "Ulasan nyata dari peserta trip sebelumnya." },
      { title: "Booking via WhatsApp", desc: "Peserta bisa tanya dan booking langsung dari halaman paket." },
      { title: "SEO Destinasi", desc: "Struktur halaman mendukung pencarian nama destinasi dan kota." }
    ],
    faq: [
      ...baseFaq,
      {
        q: "Apakah website bisa menampilkan banyak paket wisata dan destinasi sekaligus?",
        a: "Bisa — struktur katalog dibuat dinamis sehingga Anda bisa menambah destinasi atau paket baru sendiri tanpa perlu membuat halaman dari nol setiap kali."
      }
    ]
  }
}

export const jasaWebsiteNicheList = Object.values(jasaWebsiteNiches)

const siteUrl = "https://www.nehandev.com"

export function getJasaWebsiteJsonLd(niche: JasaWebsiteNiche) {
  const url = `${siteUrl}/layanan/${niche.slug}`

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": `Jasa Pembuatan Website ${niche.name}`,
    "name": niche.metaTitle,
    "description": niche.metaDescription,
    "provider": {
      "@type": "Organization",
      "name": "NehanDev",
      "url": siteUrl
    },
    "areaServed": "ID",
    "url": url
  }

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": niche.faq.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a }
    }))
  }

  return { service, faqPage }
}
