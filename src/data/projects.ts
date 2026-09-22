export type CaseStudy = {
  problem: string;
  solution: string;
  features?: string[];
  gallery?: string[];
  youtubeId?: string;
};

export type Project = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  stack: string[];
  category:
    | "E-commerce"
    | "Landing Page"
    | "Payment Gateway"
    | "Laravel"
    | "Booking"
    | "Streaming"
    | "AI Assistant"
    | "E-Learning"
    | "Manual QA"
    | "API Automation";
  period?: string;
  links?: { live?: string; github?: string; youtube?: string };
  featured?: boolean;
  highlights?: string[];
  caseStudy?: CaseStudy;
};

export const PROJECTS: Project[] = [
  {
    slug: "qa-portfolio-zalora",
    title: "Zalora E-Commerce: Core Functional & UI/UX Testing",
    excerpt:
      "Pengujian fungsional dan UI/UX menyeluruh pada platform e-commerce Zalora, mencakup modul Search, Filter, dan Cart menggunakan pendekatan Black-Box Testing.",
    cover: "",
    stack: ["Manual Testing", "Bug Reporting", "Test Cases", "GitHub"],
    category: "Manual QA",
    period: "2026",
    links: { github: "https://github.com/Pid24/qa-portfolio-zalora" },
    featured: true,
    caseStudy: {
      problem:
        "Platform e-commerce seperti Zalora memiliki alur pengguna yang kompleks — mulai dari pencarian produk, filter berdasarkan ukuran/harga/merek, hingga proses penambahan item ke keranjang. Tanpa pengujian yang sistematis dan terdokumentasi, bug pada alur-alur kritis ini dapat langsung berdampak pada konversi dan pengalaman pengguna. Tantangan utamanya adalah merancang test case yang komprehensif dan dapat direproduksi untuk modul-modul tersebut, lalu melaporkan bug secara jelas dan terstruktur agar bisa ditindaklanjuti oleh tim developer.",
      solution:
        "Menggunakan pendekatan Black-Box Testing, saya merancang dan mengeksekusi serangkaian test case terstruktur tanpa akses ke kode sumber. Setiap test case mencakup precondition, langkah-langkah, expected result, dan actual result. Bug yang ditemukan didokumentasikan dengan detail — termasuk langkah reproduksi, screenshot, severity, dan prioritas — menggunakan format standar yang disimpan di GitHub. Pengujian difokuskan pada tiga modul utama: Search (keyword matching, empty state, special characters), Filter (kombinasi filter, reset filter, responsivitas), dan Cart (add/remove item, quantity update, persistence).",
      features: [
        "Test Case Design untuk modul Search, Filter, dan Cart",
        "Black-Box & Equivalence Partitioning Testing",
        "Bug Report terstruktur dengan severity & priority",
        "Boundary Value Analysis pada input field",
        "UI/UX consistency check cross-browser",
        "Dokumentasi hasil testing di GitHub",
      ],
      gallery: [],
    },
  },
  {
    slug: "api-automation-reqres",
    title: "Reqres API Automation Testing",
    excerpt:
      "Automation testing untuk REST API publik Reqres.in, mencakup validasi operasi CRUD, assertions status code, schema response, dan response time menggunakan Postman & JavaScript.",
    cover: "",
    stack: ["Postman", "JavaScript", "JSON", "API Testing"],
    category: "API Automation",
    period: "2026",
    links: {
      github: "https://github.com/Pid24/qa-portfolio-zalora/tree/main/api-testing",
    },
    featured: true,
    caseStudy: {
      problem:
        "Memvalidasi keandalan sebuah REST API secara manual sangat tidak efisien dan rawan human error — terutama ketika endpoint yang diuji berjumlah banyak dan perlu dijalankan berulang kali saat regression testing. Tantangannya adalah membangun suite automation yang mampu memverifikasi kebenaran response (status code, schema, data), mengidentifikasi regresi secara cepat, dan menghasilkan laporan yang mudah dibaca tim QA maupun developer.",
      solution:
        "Menggunakan Postman sebagai platform utama dengan test scripts berbasis JavaScript, saya membangun collection automation untuk REST API Reqres.in yang mencakup seluruh siklus CRUD. Setiap request dilengkapi assertions otomatis: validasi HTTP status code (200, 201, 400, 404), response time threshold (< 2000ms), schema validation menggunakan JSON Schema, dan konsistensi data. Collection diorganisir per resource (Users, Auth) dengan environment variable untuk konfigurasi base URL dan token. Hasilnya dapat dijalankan ulang setiap saat via Collection Runner atau Newman (CLI) untuk pipeline CI.",
      features: [
        "CRUD Operations: GET, POST, PUT, PATCH, DELETE",
        "HTTP Status Code Assertions (200, 201, 400, 404)",
        "Response Time Validation (threshold < 2000ms)",
        "JSON Schema Validation pada setiap response",
        "Authentication flow testing (Login & Register)",
        "Environment Variables untuk multi-environment support",
        "Negative testing: invalid payload & unauthorized access",
        "Collection Runner & Newman-ready untuk CI pipeline",
      ],
      gallery: [],
    },
  },
  {
    slug: "anime-hub",
    title: "AnimeHub",
    excerpt: "Web streaming anime, baris konten ala netflix, dan navbar modern,",
    cover: "/images/anime-hub.png",
    stack: ["Nextjs", "Tailwind"],
    category: "Streaming",
    period: "2025",
    links: { live: "https://anime-hubs.vercel.app/", github: "https://github.com/Pid24/anime-hub" },
    featured: false,
    caseStudy: {
      problem:
        "Membangun platform streaming anime yang modern bukan hal mudah. Tantangan utamanya adalah bagaimana menyajikan katalog anime yang luas dengan UI/UX sekelas Netflix — termasuk baris konten horizontal yang bisa di-scroll, navbar yang responsif, serta performa yang tetap snappy meskipun me-render banyak poster gambar. Selain itu, integrasi dengan API anime pihak ketiga yang tidak selalu stabil menambah kompleksitas, karena perlu mekanisme fallback agar user tidak melihat halaman kosong.",
      solution:
        "Saya membangun AnimeHub menggunakan Next.js dengan App Router untuk mendapatkan keuntungan server-side rendering dan routing yang clean. Untuk tampilan Netflix-like, saya mengimplementasikan baris konten horizontal dengan scroll smooth dan lazy loading pada gambar poster agar performa tetap optimal. Navbar didesain dengan efek glassmorphism dan hamburger menu yang responsif. Untuk mengatasi ketidakstabilan API, saya merancang arsitektur multi-provider fallback — jika satu provider gagal, sistem otomatis mencoba provider alternatif (AnimeKai, Hianime, AnimePahe) sehingga user experience tetap seamless.",
      features: [],
      gallery: ["/images/anime-hub-1.png", "/images/anime-hub-2.png", "/images/anime-hub-3.png"],
    },
  },
  {
    slug: "milicia-assistant",
    title: "Milicia Assistant",
    excerpt: "Local Assistant dengan screen awareness, sistem control dan voice command.",
    cover: "/images/milicia.png",
    stack: ["Python", "Ollama", "Gemini Vision", "Vosk", "EdgeTTS"],
    category: "AI Assistant",
    period: "2026",
    links: {
      github: "https://github.com/Pid24/milicia-assistant",
    },
    featured: false,
    caseStudy: {
      problem:
        "Membuat asisten AI lokal yang benar-benar 'sadar' dengan apa yang terjadi di layar komputer adalah tantangan besar. Masalah utamanya: model vision lokal seperti LLaVA membutuhkan VRAM yang sangat besar (8GB+) yang melebihi kapasitas GPU laptop biasa. Selain itu, mengintegrasikan voice command, text-to-speech, dan system automation dalam satu pipeline yang responsif tanpa lag sangat kompleks — setiap komponen harus bekerja secara asinkron tanpa mengganggu satu sama lain.",
      solution:
        "Solusinya adalah arsitektur hybrid: otak utama menggunakan Ollama (model lokal) untuk reasoning umum yang privat dan offline, sementara fitur Screen Awareness di-offload ke Google Gemini Vision API (cloud) untuk analisis visual. Dengan pendekatan ini, laptop dengan VRAM terbatas tetap bisa melakukan vision analysis tanpa bottleneck. Voice pipeline dibangun dengan Vosk (speech-to-text offline) dan EdgeTTS (text-to-speech) yang keduanya ringan. System automation menggunakan Python subprocess dan pyautogui untuk mengontrol aplikasi, membuka file, dan menjalankan perintah sistem secara langsung.",
      features: [],
      gallery: [],
    },
  },
  {
    slug: "pkumi-compro",
    title: "PKU MI",
    excerpt:
      "Website company profile Pendidikan Kader Ulama Masjid Istiqlal dengan panel admin untuk manajemen konten.",
    cover: "/images/pkumi.png",
    stack: ["Nextjs", "Laravel", "Tailwind"],
    category: "Landing Page",
    period: "2026",
    links: { live: "https://pku.miftadigital.cloud/" },
    featured: false,
    caseStudy: {
      problem:
        "Pendidikan Kader Ulama Masjid Istiqlal (PKUMI) membutuhkan website company profile yang informatif dan mudah dikelola. Tantangannya adalah membangun frontend yang cepat dan SEO-friendly, sekaligus terintegrasi dengan backend Laravel yang menyediakan CMS/admin panel untuk mengelola konten secara dinamis — seperti berita, galeri, dan informasi program.",
      solution:
        "Saya bertanggung jawab di sisi frontend, khususnya pada integrasi data melalui API fetching dari backend Laravel. Menggunakan Next.js untuk rendering yang cepat dan SEO-optimal, serta Tailwind CSS untuk styling yang konsisten. Setiap halaman di-fetch dari REST API Laravel sehingga konten bisa diperbarui langsung melalui admin panel tanpa perlu deploy ulang frontend.",
      features: [],
      gallery: ["/images/pkumi-1.png", "/images/pkumi-2.png"],
    },
  },
  {
    slug: "cbt-toafl",
    title: "CBT TOAFL",
    excerpt:
      "Platform ujian online untuk TOAFL dan TOEFL dengan sistem berbasis sesi, pembayaran per tes, randomisasi soal, auto-save, dan pengaturan hasil per sesi.",
    cover: "/images/cbt.png",
    stack: ["Next.js", "Laravel", "MySQL"],
    category: "E-Learning",
    period: "2026",
    links: { live: "https://cat.miftadigital.cloud/" },
    featured: false,
    caseStudy: {
      problem:
        "Mengembangkan platform ujian online (CBT) yang reliabel dengan fitur lengkap seperti integrasi pembayaran per tes, sistem berbasis sesi, randomisasi soal, dan auto-save. Tantangan utamanya adalah menjaga reliabilitas dan integritas ujian melalui fitur anti-cheat (fullscreen enforcement, tab switch detection, disable copy-paste), serta sinkronisasi state yang aman antara client (Next.js) dan backend (Laravel) selama ujian berlangsung secara real-time.",
      solution:
        "Sistem dibangun menggunakan Next.js 14 untuk frontend dan Laravel untuk backend REST API. Frontend menerapkan arsitektur state management yang solid dengan TanStack Query untuk handling data dashboard, profil, dan history. Ujian berjalan dengan sistem heartbeat dan auto-save ke backend, didukung timer berbasis remaining_seconds dari server. Keamanan ujian (anti-cheat) diimplementasikan di sisi client-side dengan mendeteksi visibilitychange, melarang konteks menu, dan membatasi navigasi. Sistem autentikasi dikawal dari server-side middleware.",
      features: [
        "Auth Flow Lengkap dengan Role Check & Account Status",
        "Payment Proof Upload & History Real API",
        "Exam Engine Terintegrasi (Auto-save, randomisasi soal, navigasi, timer)",
        "Anti-Cheat Features (Fullscreen, Tab switch detection, Disable Right Click)",
        "Audio Player dengan Play Count Limit",
        "Server-Side Middleware & Global UI States (Loading, Error Boundary)",
      ],
      gallery: ["/images/cbt-1.png", "/images/cbt-2.png", "/images/cbt-3.png", "/images/cbt-4.png", "/images/cbt-5.png"],
    },
  },
];
