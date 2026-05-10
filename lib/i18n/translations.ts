export type Language = "en" | "id"

export const translations = {
  en: {
    nav: {
      projects: "Projects",
      education: "Education",
      blog: "Blog",
      contact: "Contact",
      cta: "Get in Touch"
    },
    hero: {
      badge: "Available for New Projects",
      headline1: "We build solutions",
      headline2: "that are",
      words: ["innovative", "responsive", "scalable", "modern", "custom"],
      subtitle:
        "Transforming your digital vision into reality. At NehanDev, we create beautiful, high-performance websites and applications tailored to your business needs and goals.",
      cta1: "Schedule Consultation",
      cta2: "View Our Work"
    },
    projects: {
      label: "Portfolio",
      title: "Featured Projects",
      subtitle:
        "Recent work that showcases our expertise in building modern, high-performance web applications.",
      liveDemo: "Live Demo"
    },
    education: {
      label: "Education Technology",
      badge: "New Platform",
      title: "CBT Pro",
      titleHighlight: "Anti-Cheat Online Exam Platform",
      subtitle:
        "Designed specifically for Indonesian teachers. Create questions with AI, schedule exams, and monitor students in real-time — all in one platform.",
      features: {
        questionTypes: { title: "3 Question Types", desc: "MCSA, MCMA & True/False" },
        antiCheat: { title: "Kiosk Anti-Cheat", desc: "Fully locked Android mode" },
        realtime: { title: "Real-Time Monitoring", desc: "Live student status via WebSocket" },
        ai: { title: "AI Question Generator", desc: "Create dozens of questions in seconds" }
      },
      cta: "Visit cbtpro.id",
      mockup: {
        label: "Live Exam Dashboard",
        studentsOnline: "Students Online",
        examProgress: "Exam Progress",
        autoGraded: "Auto-Graded",
        activeExam: "Active Exam"
      }
    },
    blog: {
      label: "Insights",
      title: "Latest from the Blog",
      subtitle:
        "Technical deep-dives, tutorials, and thoughts on web development and education technology.",
      readMore: "Read Article",
      viewAll: "View All Posts",
      minRead: "min read"
    },
    contact: {
      label: "Contact",
      title: "Let's Build Together",
      subtitle:
        "Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you within 24 hours.",
      responseTime: "Typically replies within 24 hours",
      info: {
        title: "Contact Information",
        email: "Email",
        instagram: "Instagram",
        youtube: "YouTube"
      },
      form: {
        name: "Name",
        namePlaceholder: "Your name",
        email: "Email",
        emailPlaceholder: "your.email@example.com",
        subject: "Subject",
        subjectPlaceholder: "What's this about?",
        message: "Message",
        messagePlaceholder: "Tell us about your project...",
        submit: "Send Message",
        sending: "Sending...",
        required: "Required"
      },
      success: {
        title: "Message Sent!",
        desc: "Thank you for reaching out. We'll get back to you within 24 hours.",
        again: "Send Another Message"
      },
      error: "Please fill out all required fields"
    },
    footer: {
      copyright: "All rights reserved.",
      tagline: "Professional Web Development Solutions.",
      links: { blog: "Blog", projects: "Projects", contact: "Contact" }
    }
  },
  id: {
    nav: {
      projects: "Proyek",
      education: "Pendidikan",
      blog: "Blog",
      contact: "Kontak",
      cta: "Hubungi Kami"
    },
    hero: {
      badge: "Tersedia untuk Proyek Baru",
      headline1: "Kami membangun solusi",
      headline2: "yang",
      words: ["inovatif", "responsif", "skalabel", "modern", "kustom"],
      subtitle:
        "Mewujudkan visi digital Anda menjadi kenyataan. Di NehanDev, kami menciptakan website dan aplikasi berkinerja tinggi yang disesuaikan dengan kebutuhan dan tujuan bisnis Anda.",
      cta1: "Jadwalkan Konsultasi",
      cta2: "Lihat Portofolio"
    },
    projects: {
      label: "Portofolio",
      title: "Proyek Unggulan",
      subtitle:
        "Karya terbaru yang menunjukkan keahlian kami dalam membangun aplikasi web modern dan berkinerja tinggi.",
      liveDemo: "Demo Langsung"
    },
    education: {
      label: "Teknologi Pendidikan",
      badge: "Platform Baru",
      title: "CBT Pro",
      titleHighlight: "Platform Ujian Online Anti-Curang",
      subtitle:
        "Dirancang khusus untuk guru Indonesia. Buat soal dengan AI, jadwalkan ujian, dan pantau siswa secara real-time — semua dalam satu platform.",
      features: {
        questionTypes: { title: "3 Tipe Soal", desc: "MCSA, MCMA & Benar/Salah" },
        antiCheat: { title: "Kiosk Anti-Curang", desc: "Mode Android terkunci penuh" },
        realtime: { title: "Monitoring Real-Time", desc: "Status siswa live via WebSocket" },
        ai: { title: "Generate Soal AI", desc: "Buat puluhan soal dalam detik" }
      },
      cta: "Kunjungi cbtpro.id",
      mockup: {
        label: "Dashboard Ujian Live",
        studentsOnline: "Siswa Online",
        examProgress: "Progress Ujian",
        autoGraded: "Dikoreksi Otomatis",
        activeExam: "Ujian Aktif"
      }
    },
    blog: {
      label: "Wawasan",
      title: "Artikel Terbaru",
      subtitle:
        "Pembahasan teknis mendalam, tutorial, dan pemikiran seputar pengembangan web dan teknologi pendidikan.",
      readMore: "Baca Artikel",
      viewAll: "Lihat Semua Artikel",
      minRead: "menit baca"
    },
    contact: {
      label: "Kontak",
      title: "Mari Berkolaborasi",
      subtitle:
        "Punya proyek yang ingin dikerjakan? Kami senang mendengarnya. Kirimkan pesan dan kami akan membalas dalam 24 jam.",
      responseTime: "Biasanya membalas dalam 24 jam",
      info: {
        title: "Informasi Kontak",
        email: "Email",
        instagram: "Instagram",
        youtube: "YouTube"
      },
      form: {
        name: "Nama",
        namePlaceholder: "Nama Anda",
        email: "Email",
        emailPlaceholder: "email.anda@contoh.com",
        subject: "Subjek",
        subjectPlaceholder: "Perihal apa?",
        message: "Pesan",
        messagePlaceholder: "Ceritakan tentang proyek Anda...",
        submit: "Kirim Pesan",
        sending: "Mengirim...",
        required: "Wajib diisi"
      },
      success: {
        title: "Pesan Terkirim!",
        desc: "Terima kasih telah menghubungi kami. Kami akan membalas dalam 24 jam.",
        again: "Kirim Pesan Lain"
      },
      error: "Mohon lengkapi semua field yang wajib diisi"
    },
    footer: {
      copyright: "Hak cipta dilindungi.",
      tagline: "Solusi Pengembangan Web Profesional.",
      links: { blog: "Blog", projects: "Proyek", contact: "Kontak" }
    }
  }
}

export type Translations = typeof translations.en
