// data/projects.ts

export type CaseStudy = {
  problem: string;
  solution: string;
  features?: string[];
  gallery?: string[]; // paths ke screenshot, e.g. "/images/projects/anime-hub-1.png"
  youtubeId?: string; // YouTube video ID untuk embed
};

export type Project = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string; // contoh: "/projects/toko-x.webp"
  stack: string[]; // ["Laravel","Tailwind","MySQL"]
  category: "E-commerce" | "Landing Page" | "Payment Gateway" | "Laravel" | "Booking" | "Streaming" | "AI Assistant";
  period?: string;
  links?: { live?: string; github?: string; youtube?: string };
  featured?: boolean; // dipakai untuk highlight di Home
  highlights?: string[];
  caseStudy?: CaseStudy;
};

export const PROJECTS: Project[] = [
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
      features: [
        "UI Netflix-like dengan baris konten horizontal yang smooth",
        "Arsitektur multi-provider fallback untuk streaming API",
        "Server-side rendering dengan Next.js App Router",
        "Lazy loading gambar untuk performa optimal",
        "Navbar glassmorphism dengan responsive hamburger menu",
        "Search anime dengan hasil real-time",
        "Dark mode by default dengan design yang modern",
      ],
      gallery: [],
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
    featured: true,
    caseStudy: {
      problem:
        "Membuat asisten AI lokal yang benar-benar 'sadar' dengan apa yang terjadi di layar komputer adalah tantangan besar. Masalah utamanya: model vision lokal seperti LLaVA membutuhkan VRAM yang sangat besar (8GB+) yang melebihi kapasitas GPU laptop biasa. Selain itu, mengintegrasikan voice command, text-to-speech, dan system automation dalam satu pipeline yang responsif tanpa lag sangat kompleks — setiap komponen harus bekerja secara asinkron tanpa mengganggu satu sama lain.",
      solution:
        "Solusinya adalah arsitektur hybrid: otak utama menggunakan Ollama (model lokal) untuk reasoning umum yang privat dan offline, sementara fitur Screen Awareness di-offload ke Google Gemini Vision API (cloud) untuk analisis visual. Dengan pendekatan ini, laptop dengan VRAM terbatas tetap bisa melakukan vision analysis tanpa bottleneck. Voice pipeline dibangun dengan Vosk (speech-to-text offline) dan EdgeTTS (text-to-speech) yang keduanya ringan. System automation menggunakan Python subprocess dan pyautogui untuk mengontrol aplikasi, membuka file, dan menjalankan perintah sistem secara langsung.",
      features: [
        "Screen Awareness — bisa menganalisis konten layar secara real-time",
        "Hybrid AI: Ollama (lokal/privat) + Gemini Vision (cloud) ",
        "Voice Command dengan Vosk (offline speech recognition)",
        "Text-to-Speech natural dengan EdgeTTS",
        "System Automation — buka aplikasi, kontrol volume, manage file",
        "GUI desktop modern dengan tkinter",
        "Privacy-first: reasoning utama tetap offline",
      ],
      gallery: [],
    },
  },
];
