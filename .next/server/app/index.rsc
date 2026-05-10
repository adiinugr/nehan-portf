1:"$Sreact.fragment"
2:I[9304,["177","static/chunks/app/layout-a4600c61098f5667.js"],"ThemeProvider"]
3:I[939,["177","static/chunks/app/layout-a4600c61098f5667.js"],"LanguageProvider"]
4:I[7555,[],""]
5:I[1295,[],""]
6:I[9243,["177","static/chunks/app/layout-a4600c61098f5667.js"],""]
8:I[8318,["231","static/chunks/231-2733b6d2e2e16246.js","603","static/chunks/603-9a2fadf165ee3cfe.js","602","static/chunks/602-08816dd0c86f6d81.js","539","static/chunks/539-93bbdc4771c375eb.js","653","static/chunks/653-dcf0b54ec8fa445b.js","974","static/chunks/app/page-74e9980fc43d63df.js"],"Header"]
9:I[1018,["231","static/chunks/231-2733b6d2e2e16246.js","603","static/chunks/603-9a2fadf165ee3cfe.js","602","static/chunks/602-08816dd0c86f6d81.js","539","static/chunks/539-93bbdc4771c375eb.js","653","static/chunks/653-dcf0b54ec8fa445b.js","974","static/chunks/app/page-74e9980fc43d63df.js"],"Hero"]
a:I[6221,["231","static/chunks/231-2733b6d2e2e16246.js","603","static/chunks/603-9a2fadf165ee3cfe.js","602","static/chunks/602-08816dd0c86f6d81.js","539","static/chunks/539-93bbdc4771c375eb.js","653","static/chunks/653-dcf0b54ec8fa445b.js","974","static/chunks/app/page-74e9980fc43d63df.js"],"ProjectsSection"]
b:I[9653,["231","static/chunks/231-2733b6d2e2e16246.js","603","static/chunks/603-9a2fadf165ee3cfe.js","602","static/chunks/602-08816dd0c86f6d81.js","539","static/chunks/539-93bbdc4771c375eb.js","653","static/chunks/653-dcf0b54ec8fa445b.js","974","static/chunks/app/page-74e9980fc43d63df.js"],"EducationSection"]
c:I[4921,["231","static/chunks/231-2733b6d2e2e16246.js","603","static/chunks/603-9a2fadf165ee3cfe.js","602","static/chunks/602-08816dd0c86f6d81.js","539","static/chunks/539-93bbdc4771c375eb.js","653","static/chunks/653-dcf0b54ec8fa445b.js","974","static/chunks/app/page-74e9980fc43d63df.js"],"BlogPreviewSection"]
10:I[6539,["231","static/chunks/231-2733b6d2e2e16246.js","603","static/chunks/603-9a2fadf165ee3cfe.js","602","static/chunks/602-08816dd0c86f6d81.js","539","static/chunks/539-93bbdc4771c375eb.js","653","static/chunks/653-dcf0b54ec8fa445b.js","974","static/chunks/app/page-74e9980fc43d63df.js"],"ContactSection"]
11:I[9549,["231","static/chunks/231-2733b6d2e2e16246.js","603","static/chunks/603-9a2fadf165ee3cfe.js","602","static/chunks/602-08816dd0c86f6d81.js","539","static/chunks/539-93bbdc4771c375eb.js","653","static/chunks/653-dcf0b54ec8fa445b.js","974","static/chunks/app/page-74e9980fc43d63df.js"],"Footer"]
12:I[9665,[],"OutletBoundary"]
15:I[9665,[],"ViewportBoundary"]
17:I[9665,[],"MetadataBoundary"]
19:I[6614,[],""]
:HL["/_next/static/media/7b0b24f36b1a6d0b-s.p.woff2","font",{"crossOrigin":"","type":"font/woff2"}]
:HL["/_next/static/css/128366848094c226.css","style"]
7:T6b4,
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "NehanDev",
              "url": "https://www.nehandev.com",
              "logo": "https://www.nehandev.com/favicons/web-app-manifest-512x512.png",
              "image": "https://www.nehandev.com/og-image-nehan.png",
              "description": "Transform your digital vision into reality with NehanDev. We create beautiful, high-performance websites and applications tailored to your business needs.",
              "address": { "@type": "PostalAddress", "addressCountry": "ID" },
              "email": "contact@nehandev.com",
              "sameAs": [
                "https://instagram.com/nehandev",
                "https://youtube.com/@nehandev",
                "https://github.com/nehandev",
                "https://linkedin.com/in/nehandev"
              ],
              "priceRange": "$$",
              "openingHours": "Mo-Fr 09:00-17:00",
              "makesOffer": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Web Development",
                    "description": "Custom website and web application development using Next.js, React, TypeScript"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Education Technology",
                    "description": "Online exam platforms and educational software for Indonesian schools"
                  }
                }
              ]
            }
          d:Td43,
Online exams have a cheating problem. Students can easily switch to messaging apps, search for answers online, or share screens with friends. When we set out to build CBT Pro for Indonesian schools, we knew anti-cheat had to be a first-class feature — not an afterthought.

Here's how we approached the technical challenges.

## The Core Problem: Browser-Based Exams Are Inherently Leaky

Traditional web-based exam platforms run in a standard browser. Even with JavaScript tricks to detect tab switching, students can:

- Use a second device
- Screenshot questions and share them
- Open another app while the exam timer runs

The fundamental issue is that the browser doesn't own the entire device experience.

## Our Solution: Android Kiosk Mode

Rather than trying to patch browser-based security, we built a dedicated Android client that locks the device into a single-purpose exam mode.

When a student starts an exam:

1. The app requests **Device Policy Manager** permissions
2. It pins itself to the foreground using `startLockTask()`
3. The back button, home button, and recents are all disabled
4. Screen recording and screenshots are blocked at the OS level
5. The device cannot connect to other apps until the exam is explicitly ended by the teacher

This is the same technology used by kiosk apps in banks and airports. It's not a workaround — it's the correct tool for the job.

```kotlin
// Simplified kiosk lock example
val dpm = getSystemService(DEVICE_POLICY_SERVICE) as DevicePolicyManager
if (dpm.isDeviceOwnerApp(packageName)) {
    dpm.setLockTaskPackages(adminComponent, arrayOf(packageName))
    startLockTask()
}
```

## Real-Time Monitoring with WebSockets

Knowing a student is in kiosk mode is good. Knowing *what they're doing in real-time* is better.

We built a WebSocket-based monitoring system that streams student status to the teacher dashboard every 3 seconds. The payload includes:

- Current question number
- Time spent on each question
- Whether the device has been idle for too long
- Submission status

The teacher sees a live grid of all students — green means active and answering, yellow means idle, red means a potential issue.

## AI Question Generation

One of the most time-consuming parts of running exams is creating questions. We integrated an AI question generation system that takes a topic, grade level, and difficulty, then produces a full set of MCSA, MCMA, and True/False questions in seconds.

Teachers can review, edit, and approve questions before publishing. The AI handles the tedious first draft; the teacher adds the pedagogical judgment.

## Lessons Learned

Building for the Indonesian education market taught us a few things:

**Offline resilience matters.** Internet connectivity is inconsistent. We built exam answers to sync locally first, then push to the server when connectivity is restored.

**Teachers are not tech-savvy by default.** Every feature needed a simple, guided UI. Complex configuration was moved behind "advanced" menus.

**Security theater is not security.** Adding dozens of JavaScript hooks to detect cheating creates a false sense of security. Hardware-level lockdown is the only real solution.

CBT Pro is now live at [cbtpro.id](https://cbtpro.id). If you're building for the education sector, the lessons here apply broadly — think about the real threat model, not just the convenient one.
e:Tb98,
Ujian online semakin populer di sekolah-sekolah Indonesia. Namun, memilih platform yang tepat bukan perkara mudah. Ada begitu banyak pilihan — dari Google Forms yang gratis hingga platform berbayar dengan fitur canggih. Bagaimana cara memilih yang benar-benar sesuai kebutuhan?

Berikut panduan praktis yang bisa langsung Anda terapkan.

## 1. Prioritaskan Keamanan Anti-Curang

Ini adalah faktor nomor satu yang sering diabaikan. Ujian online tanpa sistem anti-curang sama seperti ujian di ruangan tanpa pengawas.

Pertanyaan yang perlu Anda tanyakan ke vendor:

- Apakah platform mengunci perangkat saat ujian berlangsung?
- Bisakah siswa membuka aplikasi lain?
- Apakah ada deteksi jika siswa meninggalkan halaman ujian?

**Platform yang baik** harus mampu mengunci perangkat siswa sepenuhnya, bukan hanya menampilkan peringatan ketika tab berpindah.

## 2. Kemudahan Penggunaan untuk Guru

Seorang guru SD yang tidak terbiasa dengan teknologi harus bisa membuat ujian dalam waktu kurang dari 10 menit. Jika platform membutuhkan pelatihan panjang, artinya desainnya terlalu rumit.

Cek hal-hal berikut:
- Seberapa cepat proses membuat soal baru?
- Apakah ada import soal dari Word atau Excel?
- Bisakah soal digunakan ulang di ujian berikutnya?

## 3. Koreksi Otomatis dan Laporan Nilai

Mengoreksi 30 lembar jawaban secara manual bisa memakan waktu berjam-jam. Platform yang baik harus:

- Mengoreksi semua tipe soal pilihan ganda secara otomatis
- Menghasilkan laporan nilai per siswa dalam format yang bisa diekspor
- Menampilkan statistik soal mana yang paling banyak salah dijawab

Informasi terakhir ini sangat berharga untuk mengevaluasi materi pelajaran.

## 4. Stabilitas Koneksi dan Mode Offline

Jaringan internet di Indonesia tidak selalu stabil, terutama di daerah terpencil. Platform ujian yang baik harus bisa:

- Menyimpan jawaban siswa secara lokal jika koneksi terputus
- Sinkronisasi otomatis saat koneksi kembali
- Tidak kehilangan progress ujian saat listrik padam sejenak

## 5. Dukungan Teknis dalam Bahasa Indonesia

Saat ada masalah teknis di tengah ujian, Anda butuh bantuan cepat. Pastikan platform yang Anda pilih memiliki:

- Customer support dalam bahasa Indonesia
- Dokumentasi yang mudah dipahami
- Respon time yang cepat (idealnya kurang dari 2 jam di hari kerja)

## Rekomendasi untuk Sekolah Indonesia

Berdasarkan kriteria di atas, **CBT Pro** dirancang khusus untuk menjawab kebutuhan guru Indonesia. Fitur kiosk anti-curang berbasis Android, koreksi otomatis, dan generate soal dengan AI membuatnya menjadi pilihan yang komprehensif.

Coba gratis di [cbtpro.id](https://cbtpro.id) dan rasakan perbedaannya.

## Kesimpulan

Memilih platform ujian online bukan soal fitur paling banyak atau harga paling murah. Yang terpenting adalah: apakah platform ini membuat proses ujian lebih jujur, lebih mudah, dan lebih efisien bagi guru dan siswa Anda?

Jawaban dari tiga pertanyaan itu yang seharusnya menjadi dasar keputusan Anda.
f:Tf09,
When we designed the teacher dashboard for CBT Pro, the first question was: how do teachers know what students are doing during a live exam?

The naive answer is polling — every few seconds, the client asks the server "what's the status of each student?" This works, but it doesn't scale and creates a choppy, laggy experience. With 30 students in a class all polling every 3 seconds, you're looking at 600 requests per minute per classroom.

We went with WebSockets instead. Here's how we architected it.

## Why WebSockets Over HTTP Polling

WebSockets maintain a persistent, bidirectional connection between client and server. Once established, either side can push data at any time without the overhead of a new HTTP request.

For exam monitoring, this means:

- Student clients push status updates when something changes (question answered, idle state, connection drop)
- The server fans those updates out to the teacher's dashboard in near real-time
- Connection overhead happens once, not hundreds of times per session

The latency difference is significant: polling typically introduces 1-5 seconds of delay; WebSockets deliver updates in under 200ms.

## Architecture Overview

We used a hub-and-spoke model:

```
Student Device → WebSocket Server → Teacher Dashboard
     (spoke)         (hub)              (spoke)
```

Each exam session gets a dedicated "room" on the WebSocket server. Students join the room when they start the exam; the teacher joins as an observer.

The server maintains in-memory state for each room:

```typescript
interface ExamRoom {
  examId: string
  students: Map<string, StudentState>
  teacherSocket: WebSocket | null
}

interface StudentState {
  studentId: string
  name: string
  currentQuestion: number
  answeredCount: number
  lastActivity: Date
  status: 'active' | 'idle' | 'submitted' | 'disconnected'
}
```

## Handling Disconnections Gracefully

Network drops are common on mobile devices. We needed to handle them without marking a student as "cheating."

Our approach:

1. Student app detects connection loss
2. Answers continue to save locally (SQLite on Android)
3. App attempts reconnection with exponential backoff
4. On reconnect, the app sends a `RESUME` event with the last-known server state
5. Server reconciles the state and notifies the teacher

```typescript
// Client reconnection logic
const reconnect = (examId: string, studentId: string) => {
  ws.send(JSON.stringify({
    type: 'RESUME',
    examId,
    studentId,
    lastSyncTimestamp: getLastSync()
  }))
}
```

## Scaling Considerations

A single WebSocket server works fine for a school deployment. But if you're building for district-wide or national scale, you need to think about horizontal scaling.

The challenge: WebSocket connections are stateful. A teacher's dashboard connected to Server A can't receive updates from students connected to Server B without a shared message bus.

We use **Redis Pub/Sub** as the fan-out mechanism:

- Each WebSocket server subscribes to exam room channels in Redis
- When any server receives a student update, it publishes to Redis
- All servers receive the message and forward it to any connected observers in that room

This lets us run multiple WebSocket servers behind a load balancer without sticky sessions.

## Performance in Practice

During a 30-student exam, our WebSocket server handles approximately:

- **30 incoming messages/minute** (student heartbeats)
- **150 push messages/minute** (status updates to teacher)
- **~2KB/minute** total payload per student

At this scale, a single Node.js server with `ws` handles thousands of concurrent exam sessions comfortably.

The real lesson: choose your protocol based on the interaction pattern. For request-response, use HTTP. For persistent, low-latency streams like exam monitoring, WebSockets are the right tool.
0:{"P":null,"b":"74z8YhJHVTcXbI3J2m8Pq","p":"","c":["",""],"i":false,"f":[[["",{"children":["__PAGE__",{}]},"$undefined","$undefined",true],["",["$","$1","c",{"children":[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/128366848094c226.css","precedence":"next","crossOrigin":"$undefined","nonce":"$undefined"}]],["$","html",null,{"lang":"en","suppressHydrationWarning":true,"children":[["$","head",null,{"children":[["$","link",null,{"rel":"alternate","hrefLang":"en","href":"https://www.nehandev.com"}],["$","link",null,{"rel":"alternate","hrefLang":"id","href":"https://www.nehandev.com"}],["$","link",null,{"rel":"alternate","hrefLang":"x-default","href":"https://www.nehandev.com"}],["$","meta",null,{"name":"msapplication-config","content":"/favicons/browserconfig.xml"}],["$","meta",null,{"name":"msapplication-TileColor","content":"#6366F1"}],["$","meta",null,{"name":"msapplication-TileImage","content":"/favicons/ms-icon-144x144.png"}]]}],["$","body",null,{"className":"__variable_ed3508","children":[["$","$L2",null,{"attribute":"class","defaultTheme":"dark","enableSystem":true,"disableTransitionOnChange":true,"children":["$","$L3",null,{"children":["$","$L4",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":404}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],[]],"forbidden":"$undefined","unauthorized":"$undefined"}]}]}],["$","$L6",null,{"id":"schema-structured-data","type":"application/ld+json","strategy":"afterInteractive","children":"$7"}]]}]]}]]}],{"children":["__PAGE__",["$","$1","c",{"children":[["$","main",null,{"className":"min-h-screen","children":[["$","$L8",null,{}],["$","$L9",null,{}],["$","$La",null,{}],["$","$Lb",null,{}],["$","$Lc",null,{"posts":[{"slug":"building-anti-cheat-exam-platform","title":"Building an Anti-Cheat Online Exam Platform: The Technical Challenge","date":"2025-04-20","category":"EdTech","lang":"en","excerpt":"The technical challenges of building a tamper-proof online exam system for Indonesian schools — from kiosk mode implementation to WebSocket real-time monitoring.","readTime":"6","author":"NehanDev","content":"$d"},{"slug":"cara-memilih-platform-ujian-online","title":"Cara Memilih Platform Ujian Online yang Tepat untuk Sekolah Anda","date":"2025-04-15","category":"Pendidikan","lang":"id","excerpt":"Panduan lengkap untuk guru dan kepala sekolah dalam memilih platform ujian online yang aman, mudah digunakan, dan sesuai kebutuhan siswa di Indonesia.","readTime":"5","author":"NehanDev","content":"$e"},{"slug":"websocket-realtime-monitoring","title":"Real-Time Student Monitoring with WebSockets: A Developer's Guide","date":"2025-04-10","category":"Tech","lang":"en","excerpt":"How we implemented WebSocket-based live monitoring for online exams — tracking 30+ concurrent students without killing server performance.","readTime":"7","author":"NehanDev","content":"$f"}]}],["$","$L10",null,{}],["$","$L11",null,{}]]}],"$undefined",null,["$","$L12",null,{"children":["$L13","$L14",null]}]]}],{},null,false]},null,false],["$","$1","h",{"children":[null,["$","$1","9IPC2-LEtLZ9InYhROdvR",{"children":[["$","$L15",null,{"children":"$L16"}],["$","meta",null,{"name":"next-size-adjust","content":""}]]}],["$","$L17",null,{"children":"$L18"}]]}],false]],"m":"$undefined","G":["$19","$undefined"],"s":false,"S":true}
16:[["$","meta","0",{"charSet":"utf-8"}],["$","meta","1",{"name":"viewport","content":"width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes"}],["$","meta","2",{"name":"theme-color","content":"#6366F1"}]]
13:null
14:null
18:[["$","title","0",{"children":"NehanDev | Professional Web Development Solutions"}],["$","meta","1",{"name":"description","content":"Transform your digital vision into reality with NehanDev. We create beautiful, high-performance websites and applications tailored to your business needs."}],["$","link","2",{"rel":"author","href":"https://www.nehandev.com"}],["$","meta","3",{"name":"author","content":"NehanDev"}],["$","link","4",{"rel":"manifest","href":"/favicons/site.webmanifest","crossOrigin":"$undefined"}],["$","meta","5",{"name":"keywords","content":"web development,web design,frontend development,React,Next.js,portfolio,professional websites,jasa pembuatan website,web developer Indonesia,pengembangan web"}],["$","meta","6",{"name":"creator","content":"NehanDev"}],["$","meta","7",{"name":"publisher","content":"NehanDev"}],["$","meta","8",{"name":"category","content":"Technology"}],["$","link","9",{"rel":"canonical","href":"https://nehandev.com"}],["$","meta","10",{"name":"format-detection","content":"telephone=no, address=no, email=no"}],["$","meta","11",{"property":"og:title","content":"NehanDev | Professional Web Development Solutions"}],["$","meta","12",{"property":"og:description","content":"Transform your digital vision into reality with NehanDev. We create beautiful, high-performance websites and applications tailored to your business needs."}],["$","meta","13",{"property":"og:url","content":"https://www.nehandev.com"}],["$","meta","14",{"property":"og:site_name","content":"NehanDev"}],["$","meta","15",{"property":"og:locale","content":"en_US"}],["$","meta","16",{"property":"og:image","content":"https://www.nehandev.com/og-image-nehan.png"}],["$","meta","17",{"property":"og:image:width","content":"1200"}],["$","meta","18",{"property":"og:image:height","content":"630"}],["$","meta","19",{"property":"og:image:alt","content":"NehanDev - Professional Web Development"}],["$","meta","20",{"property":"og:locale:alternate","content":"id_ID"}],["$","meta","21",{"property":"og:type","content":"website"}],["$","meta","22",{"name":"twitter:card","content":"summary_large_image"}],["$","meta","23",{"name":"twitter:site","content":"@nehandev"}],["$","meta","24",{"name":"twitter:creator","content":"@nehandev"}],["$","meta","25",{"name":"twitter:title","content":"NehanDev | Professional Web Development Solutions"}],["$","meta","26",{"name":"twitter:description","content":"Transform your digital vision into reality with NehanDev. We create beautiful, high-performance websites and applications tailored to your business needs."}],["$","meta","27",{"name":"twitter:image","content":"https://www.nehandev.com/og-image-nehan.png"}],["$","link","28",{"rel":"icon","href":"/favicons/favicon.svg","type":"image/svg+xml"}],["$","link","29",{"rel":"icon","href":"/favicons/favicon.ico"}],["$","link","30",{"rel":"icon","href":"/favicons/favicon-32x32.png","sizes":"32x32","type":"image/png"}],["$","link","31",{"rel":"icon","href":"/favicons/favicon-96x96.png","sizes":"96x96","type":"image/png"}],["$","link","32",{"rel":"apple-touch-icon","href":"/favicons/apple-touch-icon.png"}],["$","link","33",{"rel":"apple-touch-icon","href":"/favicons/apple-icon-180x180.png","sizes":"180x180","type":"image/png"}],["$","link","34",{"rel":"mask-icon","href":"/favicons/favicon.svg","color":"#6366F1"}]]
