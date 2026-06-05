// ── Types ────────────────────────────────────────────────────────
export type PackageAddon = {
  id: string
  name: string
  price: number
  priceLabel: string
}

export type ItineraryDay = {
  day: string
  title: string
  activities: string[]
}

export type TravelPackage = {
  id: string
  label: string
  dates: string
  name: string
  tagline: string
  price: number
  priceLabel: string
  img: string
  rating: number
  reviews: number
  dest: string
  region: string
  days: number
  nights: number
  seats: number
  maxGuests: number
  minPax: number
  departures: string[]
  includes: string[]
  excludes: string[]
  itinerary: ItineraryDay[]
  addOns: PackageAddon[]
  meetingPoint: string
  difficulty: "Mudah" | "Sedang" | "Menantang"
  category: string[]
  featured?: boolean
}

export type Destination = {
  id: string
  name: string
  region: string
  tagline: string
  days: string
  img: string
  wide: boolean
}

// ── Helpers ──────────────────────────────────────────────────────
export function formatRupiah(n: number): string {
  return "Rp " + n.toLocaleString("id-ID")
}

// ── Global Add-Ons ───────────────────────────────────────────────
export const GLOBAL_ADDONS: PackageAddon[] = [
  { id: "photo", name: "Dokumentasi Foto & Video", price: 200000, priceLabel: "Rp 200.000" },
  { id: "insurance", name: "Asuransi Perjalanan", price: 75000, priceLabel: "Rp 75.000" },
  { id: "tshirt", name: "Kaos Peserta", price: 100000, priceLabel: "Rp 100.000" },
  { id: "extra-meal", name: "Upgrade Full Board", price: 150000, priceLabel: "Rp 150.000" },
]

// ── Images ───────────────────────────────────────────────────────
const L = (name: string) => `/images/demo/travel/${name}.jpg`

const IMGS = {
  bali: L("bali"),
  raja: L("raja-ampat"),
  bromo: L("bromo"),
  lombok: L("lombok"),
  labuan: L("labuan-bajo"),
  wakatobi: L("wakatobi"),
  yogya: L("yogyakarta"),
  belitung: L("belitung"),
  malang: L("malang"),
  flores: L("flores"),
  toraja: L("toraja"),
  komodo: L("komodo"),
  toba: L("danau-toba"),
  nusapenida: L("nusa-penida"),
  bunaken: L("bunaken"),
  derawan: L("derawan"),
}

// ── Destinations ─────────────────────────────────────────────────
export const destinations: Destination[] = [
  { id: "bali", name: "Bali", region: "Bali", tagline: "Pulau Surga", days: "3–7 Hari", img: IMGS.bali, wide: true },
  { id: "raja-ampat", name: "Raja Ampat", region: "Papua Barat", tagline: "Surga Bawah Laut", days: "5–8 Hari", img: IMGS.raja, wide: false },
  { id: "bromo", name: "Bromo", region: "Jawa Timur", tagline: "Lautan Pasir Magis", days: "2–3 Hari", img: IMGS.bromo, wide: false },
  { id: "lombok", name: "Lombok", region: "Nusa Tenggara Barat", tagline: "Mutiara NTB", days: "3–5 Hari", img: IMGS.lombok, wide: false },
  { id: "yogyakarta", name: "Yogyakarta", region: "D.I. Yogyakarta", tagline: "Kota Budaya & Sejarah", days: "3–5 Hari", img: IMGS.yogya, wide: false },
  { id: "labuan-bajo", name: "Labuan Bajo", region: "Nusa Tenggara Timur", tagline: "Tanah Komodo", days: "4–6 Hari", img: IMGS.labuan, wide: true },
  { id: "belitung", name: "Belitung", region: "Kep. Bangka Belitung", tagline: "Granit & Pasir Putih", days: "3–4 Hari", img: IMGS.belitung, wide: false },
  { id: "wakatobi", name: "Wakatobi", region: "Sulawesi Tenggara", tagline: "Taman Laut Terbaik Dunia", days: "5–7 Hari", img: IMGS.wakatobi, wide: false },
  { id: "malang", name: "Malang", region: "Jawa Timur", tagline: "Kota Apel & Alam Pegunungan", days: "2–3 Hari", img: IMGS.malang, wide: false },
  { id: "flores", name: "Flores", region: "Nusa Tenggara Timur", tagline: "Danau Tiga Warna Kelimutu", days: "4–6 Hari", img: IMGS.flores, wide: false },
  { id: "toraja", name: "Toraja", region: "Sulawesi Selatan", tagline: "Ritual Leluhur & Budaya Unik", days: "4–6 Hari", img: IMGS.toraja, wide: false },
  { id: "danau-toba", name: "Danau Toba", region: "Sumatera Utara", tagline: "Danau Vulkanik Terbesar Dunia", days: "3–5 Hari", img: IMGS.toba, wide: false },
  { id: "nusa-penida", name: "Nusa Penida", region: "Bali", tagline: "Kelingking Beach & Manta Ray", days: "2–3 Hari", img: IMGS.nusapenida, wide: false },
  { id: "bunaken", name: "Bunaken", region: "Sulawesi Utara", tagline: "Surga Menyelam Bawah Laut", days: "3–5 Hari", img: IMGS.bunaken, wide: false },
  { id: "derawan", name: "Derawan", region: "Kalimantan Timur", tagline: "Penyu & Ubur-Ubur Tanpa Sengat", days: "3–4 Hari", img: IMGS.derawan, wide: false },
]

// ── Packages ─────────────────────────────────────────────────────
export const packages: TravelPackage[] = [
  // ── BALI ──
  {
    id: "bali-3d",
    label: "03 Hari",
    dates: "Tersedia setiap Sabtu",
    name: "Bali Express Package",
    tagline: "3 hari penuh kejutan di Pulau Dewata",
    price: 1800000,
    priceLabel: "Rp 1.800.000",
    img: IMGS.bali,
    rating: 4.8,
    reviews: 128,
    dest: "Bali",
    region: "Bali",
    days: 3,
    nights: 2,
    seats: 4,
    maxGuests: 15,
    minPax: 4,
    departures: ["14 Jun", "21 Jun", "28 Jun", "5 Jul", "12 Jul", "19 Jul"],
    includes: ["Hotel 3★", "Makan 3×", "Tour guide", "Tiket masuk", "Transport lokal"],
    excludes: ["Tiket pesawat", "Pengeluaran pribadi", "Tip guide"],
    itinerary: [
      { day: "Hari 1", title: "Tiba & Bali Selatan", activities: ["Jemput di Bandara Ngurah Rai", "Check-in hotel 3★ di Kuta", "Pura Tanah Lot saat sunset", "Makan malam di restoran tepi pantai"] },
      { day: "Hari 2", title: "Ubud & Budaya", activities: ["Monkey Forest Ubud", "Museum Puri Lukisan", "Tegallalang Rice Terrace", "Kunjungi pengrajin perak Celuk"] },
      { day: "Hari 3", title: "Pantai & Kepulangan", activities: ["Sarapan & check-out", "Pantai Seminyak (foto & santai)", "Belanja oleh-oleh di Kuta", "Antar ke Bandara Ngurah Rai"] },
    ],
    addOns: GLOBAL_ADDONS,
    meetingPoint: "Bandara Ngurah Rai, Denpasar (Terminal Kedatangan Domestik)",
    difficulty: "Mudah",
    category: ["Budaya", "Alam", "Relaksasi"],
    featured: true,
  },
  {
    id: "bali-7d",
    label: "07 Hari",
    dates: "20 Jun – 27 Jun",
    name: "Bali Full Experience",
    tagline: "Eksplorasi Bali dari ujung ke ujung",
    price: 2800000,
    priceLabel: "Rp 2.800.000",
    img: IMGS.bali,
    rating: 4.9,
    reviews: 213,
    dest: "Bali",
    region: "Bali",
    days: 7,
    nights: 6,
    seats: 2,
    maxGuests: 12,
    minPax: 4,
    departures: ["20 Jun", "4 Jul", "18 Jul", "1 Agu"],
    includes: ["Hotel 4★", "Makan 3×", "Tour guide", "Tiket masuk", "Transport", "Dokumentasi", "Asuransi"],
    excludes: ["Tiket pesawat", "Pengeluaran pribadi"],
    itinerary: [
      { day: "Hari 1–2", title: "Bali Selatan & Kuta", activities: ["Arrival & check-in hotel 4★", "Tanah Lot & Uluwatu Temple", "Kecak Fire Dance show", "Free time di Seminyak Beach"] },
      { day: "Hari 3–4", title: "Ubud & Pedalaman", activities: ["Tegallalang Rice Terrace", "Ubud Monkey Forest", "Craft village tour (Celuk, Mas, Batubulan)", "Cooking class masakan Bali"] },
      { day: "Hari 5–6", title: "Bali Utara & Timur", activities: ["Danau Batur & Gunung Batur", "Pura Besakih (Pura Terbesar)", "Tirta Gangga Water Palace", "Pantai Pasir Putih Virgin"] },
      { day: "Hari 7", title: "Kepulangan", activities: ["Sarapan & check-out", "Belanja terakhir di Kuta", "Antar ke Bandara"] },
    ],
    addOns: GLOBAL_ADDONS,
    meetingPoint: "Bandara Ngurah Rai, Denpasar",
    difficulty: "Mudah",
    category: ["Budaya", "Alam", "Relaksasi"],
  },

  // ── RAJA AMPAT ──
  {
    id: "raja-5d",
    label: "05 Hari",
    dates: "22 Jun – 27 Jun",
    name: "Raja Ampat Diving Package",
    tagline: "Selami keajaiban bawah laut Papua Barat",
    price: 4500000,
    priceLabel: "Rp 4.500.000",
    img: IMGS.raja,
    rating: 4.9,
    reviews: 94,
    dest: "Raja Ampat",
    region: "Papua Barat",
    days: 5,
    nights: 4,
    seats: 6,
    maxGuests: 10,
    minPax: 2,
    departures: ["22 Jun", "6 Jul", "20 Jul", "3 Agu"],
    includes: ["Resort tepi laut", "Full board", "Snorkeling gear", "Speed boat", "Asuransi", "Tour guide"],
    excludes: ["Tiket pesawat ke Sorong", "Tip dive master", "Pengeluaran pribadi"],
    itinerary: [
      { day: "Hari 1", title: "Tiba – Transfer ke Resort", activities: ["Jemput di Bandara DEO Sorong", "Speed boat ke resort (±2 jam)", "Briefing snorkeling & orientasi", "Welcome dinner di tepi laut"] },
      { day: "Hari 2–3", title: "Eksplorasi Perairan", activities: ["Snorkeling/diving di Misool", "Pulau Pianemo (viewpoint ikonik)", "Wayag Island lagoon", "Night snorkeling (guided)"] },
      { day: "Hari 4", title: "Budaya & Alam Darat", activities: ["Desa nelayan tradisional", "Trekking hutan bakau", "Sunset dari Bukit Penyematan"] },
      { day: "Hari 5", title: "Kepulangan", activities: ["Sarapan pagi", "Speed boat kembali ke Sorong", "Antar ke Bandara DEO"] },
    ],
    addOns: [
      GLOBAL_ADDONS[0],
      GLOBAL_ADDONS[1],
      { id: "scuba", name: "Scuba Diving (sertifikat req.)", price: 500000, priceLabel: "Rp 500.000" },
    ],
    meetingPoint: "Bandara DEO Sorong, Papua Barat",
    difficulty: "Sedang",
    category: ["Bahari", "Alam", "Petualangan"],
    featured: true,
  },

  // ── BROMO ──
  {
    id: "bromo-2d",
    label: "02 Hari",
    dates: "Tersedia setiap weekend",
    name: "Bromo Sunrise Tour",
    tagline: "Sunrise terbaik di lautan pasir magis",
    price: 950000,
    priceLabel: "Rp 950.000",
    img: IMGS.bromo,
    rating: 4.7,
    reviews: 310,
    dest: "Bromo",
    region: "Jawa Timur",
    days: 2,
    nights: 1,
    seats: 8,
    maxGuests: 20,
    minPax: 2,
    departures: ["15 Jun", "22 Jun", "29 Jun", "6 Jul", "13 Jul", "20 Jul", "27 Jul"],
    includes: ["Penginapan 1 malam", "Jeep 4WD", "Tour guide", "Makan pagi"],
    excludes: ["Tiket masuk TNBTS", "Kuda sewaan (opsional)", "Tiket perjalanan"],
    itinerary: [
      { day: "Hari 1", title: "Tiba & Persiapan", activities: ["Jemput di Malang / Surabaya", "Check-in penginapan Cemoro Lawang", "Makan malam bersama", "Briefing perjalanan subuh"] },
      { day: "Hari 2", title: "Sunrise Bromo", activities: ["Bangun 02.30 WIB", "Jeep ke Penanjakan I (viewpoint)", "Sunrise spektakuler di atas Bromo", "Turun ke lautan pasir & kawah Bromo", "Sarapan & check-out, antar balik"] },
    ],
    addOns: GLOBAL_ADDONS,
    meetingPoint: "Terminal Arjosari Malang atau Stasiun Gubeng Surabaya",
    difficulty: "Sedang",
    category: ["Alam", "Petualangan"],
  },

  // ── LOMBOK ──
  {
    id: "lombok-4d",
    label: "04 Hari",
    dates: "Tersedia setiap Jumat",
    name: "Lombok Island Hopping",
    tagline: "Pantai kristal & Gili yang memukau",
    price: 2100000,
    priceLabel: "Rp 2.100.000",
    img: IMGS.lombok,
    rating: 4.8,
    reviews: 167,
    dest: "Lombok",
    region: "Nusa Tenggara Barat",
    days: 4,
    nights: 3,
    seats: 5,
    maxGuests: 12,
    minPax: 4,
    departures: ["20 Jun", "27 Jun", "4 Jul", "11 Jul", "18 Jul"],
    includes: ["Hotel 3★", "Boat trip Gili", "Snorkeling", "Makan 3×", "Tour guide", "Transport"],
    excludes: ["Tiket pesawat", "Pengeluaran pribadi", "Sewa motor (opsional)"],
    itinerary: [
      { day: "Hari 1", title: "Tiba & Pantai Selatan", activities: ["Jemput di Bandara Lombok (LOP)", "Check-in hotel", "Pantai Kuta Lombok & Tanjung Aan", "Makan malam seafood lokal"] },
      { day: "Hari 2", title: "Gili Air & Gili Meno", activities: ["Boat trip ke Gili Air", "Snorkeling di spot kura-kura", "Lunch di Gili Meno", "Sunset di Gili Air, kembali malam"] },
      { day: "Hari 3", title: "Rinjani Foothills & Budaya", activities: ["Desa Sade (desa Sasak tradisional)", "Air terjun Benang Stokel", "Kerajinan tenun Sukarara"] },
      { day: "Hari 4", title: "Kepulangan", activities: ["Sarapan & check-out", "Pantai Senggigi terakhir", "Antar ke Bandara LOP"] },
    ],
    addOns: GLOBAL_ADDONS,
    meetingPoint: "Bandara Internasional Lombok (LOP), Praya",
    difficulty: "Mudah",
    category: ["Bahari", "Alam", "Budaya"],
  },

  // ── LABUAN BAJO ──
  {
    id: "labuan-5d",
    label: "05 Hari",
    dates: "25 Jun – 30 Jun",
    name: "Labuan Bajo Komodo Tour",
    tagline: "Bertemu komodo & selami Pink Beach",
    price: 3200000,
    priceLabel: "Rp 3.200.000",
    img: IMGS.labuan,
    rating: 4.9,
    reviews: 142,
    dest: "Labuan Bajo",
    region: "Nusa Tenggara Timur",
    days: 5,
    nights: 4,
    seats: 3,
    maxGuests: 12,
    minPax: 2,
    departures: ["25 Jun", "9 Jul", "23 Jul", "6 Agu"],
    includes: ["Hotel 3★", "Kapal LiveAboard", "Diving/Snorkeling", "Makan 3×", "Asuransi", "Tour guide"],
    excludes: ["Tiket pesawat", "Biaya SIMAKSI Komodo", "Pengeluaran pribadi"],
    itinerary: [
      { day: "Hari 1", title: "Tiba di Labuan Bajo", activities: ["Jemput di Bandara Komodo (LBJ)", "Check-in hotel & orientasi", "Sunset di Bukit Sylvia", "Makan malam seafood di pelabuhan"] },
      { day: "Hari 2", title: "Pulau Komodo & Rinca", activities: ["Boarding kapal LiveAboard", "Trekking Pulau Komodo (lihat komodo)", "Snorkeling di Crystal Rock", "Overnight di kapal (sunset cruise)"] },
      { day: "Hari 3", title: "Pink Beach & Manta Point", activities: ["Snorkeling di Manta Point", "Pink Beach — pasir merah muda", "Mendaki Pulau Padar (viewpoint ikonik)"] },
      { day: "Hari 4–5", title: "Pulau Kanawa & Kepulangan", activities: ["Snorkeling Pulau Kanawa", "Walking tour kota Labuan Bajo", "Antar ke Bandara Komodo"] },
    ],
    addOns: [
      GLOBAL_ADDONS[0], GLOBAL_ADDONS[1],
      { id: "scuba", name: "Scuba Diving (Open Water)", price: 450000, priceLabel: "Rp 450.000" },
      GLOBAL_ADDONS[2],
    ],
    meetingPoint: "Bandara Komodo (LBJ), Labuan Bajo",
    difficulty: "Sedang",
    category: ["Bahari", "Alam", "Petualangan"],
    featured: true,
  },

  // ── YOGYAKARTA ──
  {
    id: "yogya-3d",
    label: "03 Hari",
    dates: "Tersedia setiap Selasa & Sabtu",
    name: "Jogja Heritage Tour",
    tagline: "Warisan budaya Jawa yang megah & bersejarah",
    price: 1500000,
    priceLabel: "Rp 1.500.000",
    img: IMGS.yogya,
    rating: 4.7,
    reviews: 201,
    dest: "Yogyakarta",
    region: "D.I. Yogyakarta",
    days: 3,
    nights: 2,
    seats: 10,
    maxGuests: 20,
    minPax: 4,
    departures: ["17 Jun", "21 Jun", "24 Jun", "28 Jun", "1 Jul", "5 Jul", "8 Jul"],
    includes: ["Hotel 3★", "Makan 3×", "Tiket masuk semua objek", "Tour guide", "Transport AC"],
    excludes: ["Tiket pesawat/kereta", "Pengeluaran pribadi", "Oleh-oleh"],
    itinerary: [
      { day: "Hari 1", title: "Tiba & Kota Jogja", activities: ["Jemput di Bandara YIA / Stasiun Tugu", "Keraton Yogyakarta & Museum", "Tamansari Water Castle", "Jalan Malioboro malam"] },
      { day: "Hari 2", title: "Borobudur & Prambanan", activities: ["Sunrise di Candi Borobudur (berangkat 04.30)", "Teras puncak Borobudur", "Kompleks Candi Prambanan", "Pertunjukan Sendratari Ramayana (opsional)"] },
      { day: "Hari 3", title: "Merapi & Kepulangan", activities: ["Lava Tour Merapi dengan Jeep", "Museum Sisa Hartaku", "Makan siang gudeg asli Jogja", "Antar ke Bandara / Stasiun"] },
    ],
    addOns: GLOBAL_ADDONS,
    meetingPoint: "Bandara YIA Kulonprogo atau Stasiun Tugu Yogyakarta",
    difficulty: "Mudah",
    category: ["Budaya", "Sejarah"],
  },
  {
    id: "yogya-5d",
    label: "05 Hari",
    dates: "Tersedia setiap Senin",
    name: "Jogja & Sekitar Lengkap",
    tagline: "Budaya, alam, dan kuliner Jawa Tengah dalam 5 hari",
    price: 2400000,
    priceLabel: "Rp 2.400.000",
    img: IMGS.yogya,
    rating: 4.8,
    reviews: 89,
    dest: "Yogyakarta",
    region: "D.I. Yogyakarta",
    days: 5,
    nights: 4,
    seats: 6,
    maxGuests: 16,
    minPax: 4,
    departures: ["16 Jun", "23 Jun", "30 Jun", "7 Jul", "14 Jul"],
    includes: ["Hotel 3★", "Makan 3×", "Semua tiket masuk", "Tour guide senior", "Transport AC"],
    excludes: ["Tiket pesawat/kereta", "Pengeluaran pribadi"],
    itinerary: [
      { day: "Hari 1–2", title: "Yogyakarta Kota", activities: ["Keraton, Tamansari, Malioboro", "Workshop membatik", "Borobudur sunrise tour", "Prambanan kompleks"] },
      { day: "Hari 3", title: "Gunung Merapi", activities: ["Lava Tour Jeep Merapi", "Museum Gunung Merapi", "Kaliurang wisata alam"] },
      { day: "Hari 4", title: "Dieng Plateau", activities: ["Telaga Warna & Kawah Sikidang", "Candi Arjuna", "Bukit Sikunir sunrise (opsional)"] },
      { day: "Hari 5", title: "Pantai Selatan & Kepulangan", activities: ["Pantai Parangtritis", "Gumuk Pasir Parangkusumo", "Antar ke Bandara / Stasiun"] },
    ],
    addOns: GLOBAL_ADDONS,
    meetingPoint: "Bandara YIA Kulonprogo atau Stasiun Tugu Yogyakarta",
    difficulty: "Mudah",
    category: ["Budaya", "Alam", "Sejarah"],
  },

  // ── BELITUNG ──
  {
    id: "belitung-3d",
    label: "03 Hari",
    dates: "Tersedia setiap Jumat",
    name: "Belitung Island Escape",
    tagline: "Pasir putih, granit raksasa, & laut kristal",
    price: 1800000,
    priceLabel: "Rp 1.800.000",
    img: IMGS.belitung,
    rating: 4.8,
    reviews: 156,
    dest: "Belitung",
    region: "Kep. Bangka Belitung",
    days: 3,
    nights: 2,
    seats: 7,
    maxGuests: 15,
    minPax: 4,
    departures: ["20 Jun", "27 Jun", "4 Jul", "11 Jul", "18 Jul"],
    includes: ["Hotel tepi laut", "Boat island hopping", "Makan 3×", "Snorkeling gear", "Tour guide"],
    excludes: ["Tiket pesawat", "Pengeluaran pribadi"],
    itinerary: [
      { day: "Hari 1", title: "Tiba & Pulau Lengkuas", activities: ["Jemput di Bandara H.A.S. Hanandjoeddin", "Check-in hotel tepi laut", "Island hopping ke Pulau Lengkuas", "Naik mercusuar abad 18, snorkeling"] },
      { day: "Hari 2", title: "Pantai & Pulau Eksotis", activities: ["Pulau Pasir (gosong pasir di tengah laut)", "Pantai Tanjung Tinggi (latar film Laskar Pelangi)", "Pantai Tanjung Kelayang", "Sunset cruise"] },
      { day: "Hari 3", title: "Kota & Kepulangan", activities: ["Museum Kata Andrea Hirata", "Belanja oleh-oleh khas Belitung", "Makan seafood terakhir", "Antar ke Bandara"] },
    ],
    addOns: GLOBAL_ADDONS,
    meetingPoint: "Bandara H.A.S. Hanandjoeddin, Tanjung Pandan",
    difficulty: "Mudah",
    category: ["Bahari", "Alam", "Relaksasi"],
  },

  // ── MALANG ──
  {
    id: "malang-3d",
    label: "03 Hari",
    dates: "Tersedia setiap Kamis & Sabtu",
    name: "Malang Batu Explorer",
    tagline: "Alam, wisata keluarga & kuliner Jawa Timur",
    price: 1200000,
    priceLabel: "Rp 1.200.000",
    img: IMGS.malang,
    rating: 4.6,
    reviews: 244,
    dest: "Malang",
    region: "Jawa Timur",
    days: 3,
    nights: 2,
    seats: 9,
    maxGuests: 20,
    minPax: 4,
    departures: ["19 Jun", "22 Jun", "26 Jun", "29 Jun", "3 Jul", "6 Jul", "10 Jul"],
    includes: ["Hotel 3★", "Makan 3×", "Transport AC", "Tiket masuk", "Tour guide"],
    excludes: ["Tiket pesawat/kereta", "Pengeluaran pribadi"],
    itinerary: [
      { day: "Hari 1", title: "Tiba & Kota Malang", activities: ["Jemput di Bandara Abdul Rachman Saleh", "Coban Rondo Waterfall", "Museum Brawijaya", "Wisata kuliner Jalan Ijen malam"] },
      { day: "Hari 2", title: "Kota Batu & Wisata Alam", activities: ["Kebun Apel Batu (petik apel sendiri)", "Jatim Park / Museum Satwa", "Selecta taman bunga", "Makan malam di Alun-alun Batu"] },
      { day: "Hari 3", title: "Air Panas & Kepulangan", activities: ["Coban Pelangi waterfall", "Pemandian air panas Cangar", "Oleh-oleh khas Malang (keripik apel, bakpao)", "Antar ke Bandara / Stasiun"] },
    ],
    addOns: GLOBAL_ADDONS,
    meetingPoint: "Bandara Abdul Rachman Saleh Malang atau Stasiun Malang Kota Baru",
    difficulty: "Mudah",
    category: ["Alam", "Keluarga", "Kuliner"],
  },

  // ── FLORES ──
  {
    id: "flores-5d",
    label: "05 Hari",
    dates: "1 Jul – 6 Jul",
    name: "Flores Overland Adventure",
    tagline: "Danau tiga warna, adat Manggarai, & laut biru",
    price: 3800000,
    priceLabel: "Rp 3.800.000",
    img: IMGS.flores,
    rating: 4.8,
    reviews: 67,
    dest: "Flores",
    region: "Nusa Tenggara Timur",
    days: 5,
    nights: 4,
    seats: 5,
    maxGuests: 10,
    minPax: 2,
    departures: ["1 Jul", "15 Jul", "1 Agu", "15 Agu"],
    includes: ["Penginapan lokal & homestay", "Full board", "4WD overland", "Tour guide lokal", "Asuransi"],
    excludes: ["Tiket pesawat ke Ende / Labuan Bajo", "Pengeluaran pribadi"],
    itinerary: [
      { day: "Hari 1", title: "Tiba di Ende", activities: ["Tiba di Bandara H. Hasan Aroeboesman Ende", "Check-in penginapan", "Pantai lokal & orientasi"] },
      { day: "Hari 2", title: "Danau Kelimutu", activities: ["Berangkat subuh ke Kelimutu", "Sunrise di atas 3 danau berwarna", "Desa Wolowaru (tenun tradisional)", "Pantai Koka"] },
      { day: "Hari 3", title: "Ruteng & Lingko", activities: ["Overland menuju Ruteng", "Sawah Lingko (spider web rice field)", "Desa Adat Todo"] },
      { day: "Hari 4–5", title: "Bajawa & Kepulangan", activities: ["Desa Adat Bena (Bajawa)", "Pemandian air panas Soa", "Gunung Inerie viewpoint", "Transfer ke bandara pilihan"] },
    ],
    addOns: [GLOBAL_ADDONS[0], GLOBAL_ADDONS[1], GLOBAL_ADDONS[2]],
    meetingPoint: "Bandara H. Hasan Aroeboesman Ende, Flores",
    difficulty: "Menantang",
    category: ["Alam", "Budaya", "Petualangan"],
  },

  // ── TORAJA ──
  {
    id: "toraja-5d",
    label: "05 Hari",
    dates: "5 Jul – 10 Jul",
    name: "Toraja Cultural Journey",
    tagline: "Ritual leluhur & keindahan alam Sulawesi Selatan",
    price: 3400000,
    priceLabel: "Rp 3.400.000",
    img: IMGS.toraja,
    rating: 4.9,
    reviews: 53,
    dest: "Toraja",
    region: "Sulawesi Selatan",
    days: 5,
    nights: 4,
    seats: 4,
    maxGuests: 8,
    minPax: 2,
    departures: ["5 Jul", "2 Agu", "6 Sep"],
    includes: ["Hotel & guesthouse lokal", "Full board", "Transport 4WD", "Tour guide berlisensi", "Asuransi"],
    excludes: ["Tiket pesawat ke Makassar", "Biaya upacara adat (jika ada)", "Pengeluaran pribadi"],
    itinerary: [
      { day: "Hari 1", title: "Makassar – Rantepao", activities: ["Tiba di Bandara Sultan Hasanuddin Makassar", "Berkendara ke Rantepao (8 jam)", "Check-in hotel, orientasi kota"] },
      { day: "Hari 2", title: "Desa Adat & Tongkonan", activities: ["Desa adat Ke'te Kesu", "Rumah tongkonan & lumbung padi", "Kuburan tebing Lemo"] },
      { day: "Hari 3", title: "Londa & Sawah Toraja", activities: ["Gua pemakaman Londa", "Kuburan bayi Kambira", "Sawah terasering Batutumonga"] },
      { day: "Hari 4–5", title: "Pasar & Kepulangan", activities: ["Pasar kerbau Bolu (setiap Selasa)", "Desa pengrajin tenun Sa'dan", "Perjalanan kembali ke Makassar & bandara"] },
    ],
    addOns: [GLOBAL_ADDONS[0], GLOBAL_ADDONS[1], GLOBAL_ADDONS[2]],
    meetingPoint: "Bandara Sultan Hasanuddin, Makassar (dijemput di sini)",
    difficulty: "Sedang",
    category: ["Budaya", "Sejarah", "Petualangan"],
  },

  // ── WAKATOBI ──
  {
    id: "wakatobi-6d",
    label: "06 Hari",
    dates: "8 Jul – 14 Jul",
    name: "Wakatobi Diving Paradise",
    tagline: "Dive di taman laut terbaik di dunia",
    price: 5200000,
    priceLabel: "Rp 5.200.000",
    img: IMGS.wakatobi,
    rating: 5.0,
    reviews: 41,
    dest: "Wakatobi",
    region: "Sulawesi Tenggara",
    days: 6,
    nights: 5,
    seats: 4,
    maxGuests: 8,
    minPax: 2,
    departures: ["8 Jul", "5 Agu", "2 Sep"],
    includes: ["Resort tepi laut", "Full board", "2 dive/hari (sertifikat req.)", "Snorkeling", "Speed boat", "Asuransi"],
    excludes: ["Tiket pesawat ke Wangi-wangi", "Tip dive master", "Pengeluaran pribadi"],
    itinerary: [
      { day: "Hari 1", title: "Tiba di Wakatobi", activities: ["Penerbangan ke Bandara Matahora Wangi-wangi", "Transfer ke resort", "Orientasi dive & briefing", "Snorkeling sore"] },
      { day: "Hari 2–4", title: "Diving Premium", activities: ["2× dive/hari di Pinnacle, Cornucopia, Roma Wall", "Night dive (1 kali)", "Fish ID session bersama dive master"] },
      { day: "Hari 5–6", title: "Pulau Hoga & Kepulangan", activities: ["Snorkeling di House Reef", "Desa nelayan tradisional Bajo", "Sunset perpisahan", "Transfer ke Bandara Matahora"] },
    ],
    addOns: [
      GLOBAL_ADDONS[0], GLOBAL_ADDONS[1],
      { id: "advanced-dive", name: "Advanced Open Water Course", price: 1200000, priceLabel: "Rp 1.200.000" },
    ],
    meetingPoint: "Bandara Matahora, Wangi-wangi, Wakatobi",
    difficulty: "Sedang",
    category: ["Bahari", "Petualangan", "Alam"],
    featured: true,
  },

  // ── KOMODO ──
  {
    id: "komodo-3d",
    label: "03 Hari",
    dates: "Tersedia setiap Rabu",
    name: "Komodo Weekend Getaway",
    tagline: "3 hari bersama Komodo & Pink Beach",
    price: 2500000,
    priceLabel: "Rp 2.500.000",
    img: IMGS.komodo,
    rating: 4.8,
    reviews: 98,
    dest: "Labuan Bajo",
    region: "Nusa Tenggara Timur",
    days: 3,
    nights: 2,
    seats: 6,
    maxGuests: 10,
    minPax: 2,
    departures: ["18 Jun", "25 Jun", "2 Jul", "9 Jul", "16 Jul", "23 Jul"],
    includes: ["Hotel 3★ + 1 malam kapal", "Makan 3×", "Boat trip", "Snorkeling gear", "Asuransi", "Tour guide"],
    excludes: ["Tiket pesawat", "SIMAKSI Taman Nasional Komodo", "Pengeluaran pribadi"],
    itinerary: [
      { day: "Hari 1", title: "Tiba & Sunset Labuan Bajo", activities: ["Jemput di Bandara Komodo", "Naik perahu ke Bukit Sylvia", "Sunset spektakuler", "Makan malam di pelabuhan"] },
      { day: "Hari 2", title: "Komodo, Pink Beach & Padar", activities: ["Trekking Pulau Komodo (lihat komodo)", "Snorkeling di Pink Beach", "Mendaki Pulau Padar (360° view)", "Menginap di atas kapal"] },
      { day: "Hari 3", title: "Pulau Bidadari & Kepulangan", activities: ["Snorkeling pagi di Pulau Bidadari", "Check-out kapal & sarapan", "Antar ke Bandara Komodo (LBJ)"] },
    ],
    addOns: [
      GLOBAL_ADDONS[0], GLOBAL_ADDONS[1],
      { id: "underwater-cam", name: "Kamera Underwater Rental", price: 150000, priceLabel: "Rp 150.000" },
    ],
    meetingPoint: "Bandara Komodo (LBJ), Labuan Bajo",
    difficulty: "Sedang",
    category: ["Alam", "Bahari", "Petualangan"],
  },

  // ── DANAU TOBA ──
  {
    id: "toba-3d",
    label: "03 Hari",
    dates: "Tersedia setiap Senin & Jumat",
    name: "Danau Toba Explorer",
    tagline: "Jelajah kaldera vulkanik terbesar di dunia",
    price: 1400000,
    priceLabel: "Rp 1.400.000",
    img: IMGS.toba,
    rating: 4.7,
    reviews: 118,
    dest: "Danau Toba",
    region: "Sumatera Utara",
    days: 3,
    nights: 2,
    seats: 8,
    maxGuests: 18,
    minPax: 4,
    departures: ["16 Jun", "20 Jun", "23 Jun", "27 Jun", "30 Jun", "4 Jul", "7 Jul"],
    includes: ["Penginapan di Pulau Samosir", "Makan 3×", "Kapal feri", "Tour guide", "Transport"],
    excludes: ["Tiket pesawat ke Silangit", "Pengeluaran pribadi", "Oleh-oleh"],
    itinerary: [
      { day: "Hari 1", title: "Tiba & Penyeberangan ke Samosir", activities: ["Jemput di Bandara Silangit (DTB)", "Perjalanan ke Pelabuhan Ajibata", "Feri menyeberang ke Pulau Samosir", "Check-in penginapan tepi danau", "Menikmati sunset di Danau Toba"] },
      { day: "Hari 2", title: "Budaya Batak & Alam Samosir", activities: ["Desa adat Tomok (Makam Raja Sidabutar)", "Museum Huta Bolon Simanindo", "Pertunjukan tari Sigale-gale", "Tuk Tuk village & belanja tenun ulos", "Berenang di Danau Toba sore hari"] },
      { day: "Hari 3", title: "Sipiso-piso & Kepulangan", activities: ["Air Terjun Sipiso-piso (viewpoint spektakuler)", "Pasar Karo di Kabanjahe", "Makan siang masakan Batak (babi panggang & arsik)", "Antar ke Bandara Silangit"] },
    ],
    addOns: GLOBAL_ADDONS,
    meetingPoint: "Bandara Silangit (DTB), Tapanuli Utara",
    difficulty: "Mudah",
    category: ["Alam", "Budaya", "Relaksasi"],
  },

  // ── NUSA PENIDA ──
  {
    id: "nusapenida-2d",
    label: "02 Hari",
    dates: "Tersedia setiap hari",
    name: "Nusa Penida Day Tour",
    tagline: "Kelingking Beach, Broken Beach & manta ray",
    price: 850000,
    priceLabel: "Rp 850.000",
    img: IMGS.nusapenida,
    rating: 4.8,
    reviews: 387,
    dest: "Nusa Penida",
    region: "Bali",
    days: 2,
    nights: 1,
    seats: 9,
    maxGuests: 20,
    minPax: 2,
    departures: ["Setiap hari tersedia", "Berangkat dari Sanur pukul 07.00"],
    includes: ["Fast boat PP", "Penginapan 1 malam", "Jeep lokal", "Snorkeling gear", "Tour guide", "Makan siang"],
    excludes: ["Tiket masuk objek wisata", "Pengeluaran pribadi", "Tip guide"],
    itinerary: [
      { day: "Hari 1", title: "West Nusa Penida", activities: ["Fast boat dari Pantai Sanur (07.00)", "Kelingking Beach & T-Rex viewpoint", "Angel's Billabong (natural infinity pool)", "Broken Beach (Pasih Uwug)", "Snorkeling di Crystal Bay", "Check-in penginapan"] },
      { day: "Hari 2", title: "East & Manta Point", activities: ["Snorkeling bersama Manta Ray di Manta Point", "Atuh Beach (pasir putih tersembunyi)", "Diamond Beach (tebing ikonik)", "Fast boat kembali ke Sanur (16.00)"] },
    ],
    addOns: [GLOBAL_ADDONS[0], GLOBAL_ADDONS[1], { id: "scuba-nusa", name: "Scuba Diving 1 Tank", price: 350000, priceLabel: "Rp 350.000" }],
    meetingPoint: "Pantai Sanur, Bali (dekat dermaga fast boat)",
    difficulty: "Mudah",
    category: ["Bahari", "Alam", "Relaksasi"],
    featured: true,
  },

  // ── BUNAKEN ──
  {
    id: "bunaken-4d",
    label: "04 Hari",
    dates: "Tersedia setiap Rabu & Sabtu",
    name: "Bunaken Diving Paradise",
    tagline: "Wall diving legendaris di jantung Coral Triangle",
    price: 2800000,
    priceLabel: "Rp 2.800.000",
    img: IMGS.bunaken,
    rating: 4.9,
    reviews: 74,
    dest: "Bunaken",
    region: "Sulawesi Utara",
    days: 4,
    nights: 3,
    seats: 5,
    maxGuests: 10,
    minPax: 2,
    departures: ["18 Jun", "22 Jun", "25 Jun", "29 Jun", "2 Jul", "6 Jul", "9 Jul"],
    includes: ["Resort di Pulau Bunaken", "Full board", "2 dive/hari (sertifikat req.)", "Snorkeling", "Kapal ke pulau", "Asuransi"],
    excludes: ["Tiket pesawat ke Manado", "Tip dive master", "Sertifikasi diving (jika belum punya)"],
    itinerary: [
      { day: "Hari 1", title: "Manado – Pulau Bunaken", activities: ["Jemput di Bandara Sam Ratulangi Manado", "Kapal ke Pulau Bunaken (±35 menit)", "Check-in resort & orientasi", "Snorkeling sore di house reef", "Briefing dive plan untuk besok"] },
      { day: "Hari 2–3", title: "Wall Diving & Snorkeling", activities: ["2 dive/hari di Lekuan I, II, III (wall dive legendaris)", "Snorkeling di Bunaken Timur", "Night dive di terumbu karang (1 kali)", "Fish ID & briefing marine biology", "Free time di pantai resort"] },
      { day: "Hari 4", title: "Manado Tua & Kepulangan", activities: ["Snorkeling pagi di Pulau Manado Tua", "Makan siang seafood terakhir", "Kapal balik ke Manado", "Antar ke Bandara Sam Ratulangi"] },
    ],
    addOns: [
      GLOBAL_ADDONS[0], GLOBAL_ADDONS[1],
      { id: "nitrox", name: "Nitrox Fills (per dive)", price: 80000, priceLabel: "Rp 80.000" },
      { id: "padi-course", name: "PADI Open Water Course", price: 2500000, priceLabel: "Rp 2.500.000" },
    ],
    meetingPoint: "Bandara Sam Ratulangi (MDC), Manado, Sulawesi Utara",
    difficulty: "Sedang",
    category: ["Bahari", "Petualangan", "Alam"],
  },

  // ── DERAWAN ──
  {
    id: "derawan-3d",
    label: "03 Hari",
    dates: "Tersedia setiap Selasa & Sabtu",
    name: "Derawan Island Hopping",
    tagline: "Penyu hijau, ubur-ubur danau, & laut tosca",
    price: 2200000,
    priceLabel: "Rp 2.200.000",
    img: IMGS.derawan,
    rating: 4.8,
    reviews: 91,
    dest: "Derawan",
    region: "Kalimantan Timur",
    days: 3,
    nights: 2,
    seats: 6,
    maxGuests: 12,
    minPax: 2,
    departures: ["17 Jun", "21 Jun", "24 Jun", "28 Jun", "1 Jul", "5 Jul", "8 Jul"],
    includes: ["Penginapan di Pulau Derawan", "Makan 3×", "Speedboat island hopping", "Snorkeling gear", "Tour guide lokal"],
    excludes: ["Tiket pesawat ke Berau", "Pengeluaran pribadi", "Tip guide"],
    itinerary: [
      { day: "Hari 1", title: "Tiba & Pulau Derawan", activities: ["Jemput di Bandara Kalimarau Berau", "Speedboat ke Pulau Derawan (±1.5 jam)", "Check-in penginapan tepi laut", "Snorkeling sore di house reef Derawan", "Menyaksikan penyu bertelur di malam hari (musiman)"] },
      { day: "Hari 2", title: "Kakaban & Sangalaki", activities: ["Pulau Kakaban — berenang di danau ubur-ubur tanpa sengat (Danau Kakaban)", "Snorkeling di tubir karang Kakaban", "Pulau Sangalaki — habitat peneluran penyu hijau & manta ray", "Sunset perahu di antara pulau"] },
      { day: "Hari 3", title: "Maratua & Kepulangan", activities: ["Island hopping ke Pulau Maratua (laguna tersembunyi)", "Snorkeling di Blue Lagoon Maratua", "Speedboat kembali ke Berau", "Antar ke Bandara Kalimarau"] },
    ],
    addOns: [GLOBAL_ADDONS[0], GLOBAL_ADDONS[1], GLOBAL_ADDONS[2]],
    meetingPoint: "Bandara Kalimarau (BEJ), Berau, Kalimantan Timur",
    difficulty: "Mudah",
    category: ["Bahari", "Alam", "Petualangan"],
    featured: true,
  },
]
