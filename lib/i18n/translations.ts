export type Language = "en" | "id"

export const translations = {
  en: {
    nav: {
      services: "Services",
      portfolio: "Portfolio",
      blog: "Blog",
      contact: "Contact",
      cta: "Free Consultation"
    },
    hero: {
      badge: "Open for New Projects",
      headline1: "Website that works",
      headline2: "for your",
      words: ["restaurant", "travel", "hotel", "UMKM", "business"],
      subtitle:
        "We help local businesses build a strong digital presence — professional, fast, and built to attract real customers.",
      cta1: "Free Consultation",
      cta2: "View Portfolio"
    },
    services: {
      label: "Services",
      title: "What We Build",
      subtitle: "Tailored digital solutions for every type of local business.",
      items: [
        {
          icon: "UtensilsCrossed",
          title: "Restaurant & Café",
          desc: "Digital menu, reservation system, and business profile that attracts walk-in and online customers."
        },
        {
          icon: "Plane",
          title: "Travel & Tourism",
          desc: "Tour packages, booking, destination gallery — everything your travel business needs online."
        },
        {
          icon: "BedDouble",
          title: "Hotel & Accommodation",
          desc: "Room showcase, gallery, and reservation contacts to increase direct bookings."
        },
        {
          icon: "Building2",
          title: "Company Profile",
          desc: "Professional business presentation that builds trust with potential clients and partners."
        },
        {
          icon: "Megaphone",
          title: "Landing Page",
          desc: "High-conversion promotional pages for your products, services, or campaigns."
        },
        {
          icon: "ShoppingBag",
          title: "Online Store",
          desc: "Product catalog and ordering system to expand your business reach digitally."
        }
      ]
    },
    howItWorks: {
      label: "How It Works",
      title: "Simple. Fast. Ready.",
      subtitle: "From first conversation to a live website — in just 3 steps.",
      steps: [
        {
          number: "01",
          title: "Free Consultation",
          desc: "Tell us about your business and what you need. No tech jargon, just a simple conversation."
        },
        {
          number: "02",
          title: "Design & Build",
          desc: "We design and develop your website in 7–14 days. You review and approve at every stage."
        },
        {
          number: "03",
          title: "Live & Growing",
          desc: "Your website goes live, SEO-ready, and built to bring customers to your door."
        }
      ]
    },
    testimonials: {
      label: "Testimonials",
      title: "Trusted by Local Businesses",
      subtitle: "What our clients say after working with NehanDev.",
      items: [
        {
          name: "Budi Santoso",
          role: "Owner, Warung Makan Bu Budi",
          text: "Our restaurant now has a digital menu that customers can scan directly. Orders increased 30% in the first month."
        },
        {
          name: "Rina Lestari",
          role: "Founder, Rina Tour & Travel",
          text: "The website looks very professional. Our tour packages are now booked online without WhatsApp chats one by one."
        },
        {
          name: "Ahmad Fauzi",
          role: "Manager, Villa Sejuk Puncak",
          text: "Direct bookings increased significantly. Guests say they found us through our website. Worth every penny."
        }
      ]
    },
    projects: {
      label: "Portfolio",
      title: "Our Work",
      subtitle: "Real projects built for real businesses.",
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
        "Have a project in mind? Send us a message and we'll get back to you within 24 hours.",
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
      tagline: "Digital Solutions for Local Businesses.",
      links: { services: "Services", blog: "Blog", portfolio: "Portfolio", contact: "Contact", privacy: "Privacy Policy", terms: "Terms & Conditions" },
      sections: { pages: "Pages", legal: "Legal", follow: "Follow Us" }
    }
  },
  id: {
    nav: {
      services: "Layanan",
      portfolio: "Portofolio",
      blog: "Blog",
      contact: "Kontak",
      cta: "Konsultasi Gratis"
    },
    hero: {
      badge: "Buka untuk Proyek Baru",
      headline1: "Website yang bekerja",
      headline2: "untuk bisnis",
      words: ["restoran", "travel", "penginapan", "UMKM", "Anda"],
      subtitle:
        "Kami bantu UMKM dan bisnis kecil hadir secara digital — website profesional, cepat, dan siap menarik pelanggan.",
      cta1: "Konsultasi Gratis",
      cta2: "Lihat Portofolio"
    },
    services: {
      label: "Layanan",
      title: "Yang Kami Bangun",
      subtitle: "Solusi digital yang disesuaikan untuk setiap jenis usaha lokal.",
      items: [
        {
          icon: "UtensilsCrossed",
          title: "Restoran & Kafe",
          desc: "Menu digital, sistem reservasi, dan profil usaha yang menarik pelanggan datang langsung maupun online."
        },
        {
          icon: "Plane",
          title: "Travel & Wisata",
          desc: "Paket wisata, booking, galeri destinasi — semua yang dibutuhkan bisnis travel Anda secara online."
        },
        {
          icon: "BedDouble",
          title: "Hotel & Penginapan",
          desc: "Showcase kamar, galeri, dan kontak reservasi untuk meningkatkan direct booking."
        },
        {
          icon: "Building2",
          title: "Company Profile",
          desc: "Presentasi bisnis yang profesional dan meyakinkan untuk klien dan mitra potensial."
        },
        {
          icon: "Megaphone",
          title: "Landing Page",
          desc: "Halaman promosi konversi tinggi untuk produk, layanan, atau kampanye Anda."
        },
        {
          icon: "ShoppingBag",
          title: "Toko Online",
          desc: "Katalog produk dan sistem pemesanan untuk memperluas jangkauan bisnis Anda secara digital."
        }
      ]
    },
    howItWorks: {
      label: "Cara Kerja",
      title: "Simpel. Cepat. Siap.",
      subtitle: "Dari obrolan pertama sampai website tayang — hanya 3 langkah.",
      steps: [
        {
          number: "01",
          title: "Konsultasi Gratis",
          desc: "Ceritakan bisnis dan kebutuhan Anda. Tidak perlu paham teknologi, cukup ngobrol santai."
        },
        {
          number: "02",
          title: "Desain & Bangun",
          desc: "Kami rancang dan kembangkan website dalam 7–14 hari. Anda review dan setujui setiap tahap."
        },
        {
          number: "03",
          title: "Tayang & Berkembang",
          desc: "Website Anda tayang, siap di-SEO, dan dibangun untuk mendatangkan pelanggan."
        }
      ]
    },
    testimonials: {
      label: "Testimoni",
      title: "Dipercaya Usaha Lokal",
      subtitle: "Apa yang dikatakan klien kami setelah bekerja sama dengan NehanDev.",
      items: [
        {
          name: "Budi Santoso",
          role: "Pemilik, Warung Makan Bu Budi",
          text: "Sekarang restoran kami punya menu digital yang bisa discan langsung. Pesanan naik 30% di bulan pertama."
        },
        {
          name: "Rina Lestari",
          role: "Founder, Rina Tour & Travel",
          text: "Website-nya terlihat sangat profesional. Paket wisata kami sekarang bisa dipesan online tanpa harus chat WA satu-satu."
        },
        {
          name: "Ahmad Fauzi",
          role: "Manager, Villa Sejuk Puncak",
          text: "Direct booking meningkat signifikan. Tamu bilang menemukan kami dari website. Worth it banget."
        }
      ]
    },
    projects: {
      label: "Portofolio",
      title: "Hasil Kerja Kami",
      subtitle: "Proyek nyata yang dibangun untuk bisnis nyata.",
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
        "Punya proyek yang ingin dikerjakan? Kirimkan pesan dan kami akan membalas dalam 24 jam.",
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
      tagline: "Solusi Digital untuk Usaha Lokal.",
      links: { services: "Layanan", blog: "Blog", portfolio: "Portofolio", contact: "Kontak", privacy: "Kebijakan Privasi", terms: "Syarat & Ketentuan" },
      sections: { pages: "Halaman", legal: "Legal", follow: "Ikuti Kami" }
    }
  }
}

export type Translations = typeof translations.en
