# PROJECT_OVERVIEW.md — my-portfolio

Dokumentasi lengkap isi project **Website Portfolio QA — Rofid Nasif Annafie**.  
Live: [rofid-dev.my.id](https://rofid-dev.my.id)

> Portfolio ini menampilkan kompetensi sebagai **Quality Assurance Engineer** — mencakup Manual Testing, API Automation Testing, dan dokumentasi QA yang terstruktur.

---

## Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | Next.js 15 (App Router, Static Export) |
| Bahasa | TypeScript |
| Styling | Tailwind CSS v4 |
| Animasi | Framer Motion |
| Ikon | Lucide React |
| Theming | next-themes (dark/light mode) |
| Font | DM Serif Display (heading), Inter (body) |

---

## Struktur Folder

```
my-portfolio/
├── public/
│   ├── images/              # Foto profil, cover proyek, aset dekoratif
│   └── docs/                # File CV PDF
├── src/
│   ├── app/                 # Next.js App Router (halaman & layout)
│   ├── components/          # Semua komponen UI
│   ├── data/                # Data statis (daftar proyek)
│   └── lib/                 # Fungsi utilitas
├── CLAUDE.md                # Panduan coding untuk AI
├── PROJECT_OVERVIEW.md      # File ini
├── package.json
├── next.config.ts
└── ecosystem.config.js      # Konfigurasi PM2 (untuk deploy)
```

---

## Halaman (Routes)

| Route | File | Keterangan |
|---|---|---|
| `/` | `src/app/page.tsx` | Homepage — Hero + Latest QA Projects |
| `/about` | `src/app/about/page.tsx` | Halaman About + QA skills + CV |
| `/projects` | `src/app/projects/page.tsx` | Daftar semua proyek (QA tampil pertama) |
| `/projects/[slug]` | `src/app/projects/[slug]/page.tsx` | Detail per proyek (case study) |
| `/contact` | `src/app/contact/page.tsx` | Halaman kontak |

---

## Komponen

### Global
| File | Fungsi |
|---|---|
| `Navbar.tsx` | Navbar sticky dengan scroll progress bar, active pill, dark/light toggle, mobile sheet menu |
| `Footer.tsx` | Footer minimal — nama, tagline, copyright, tombol scroll-to-top |
| `HeroSection.tsx` | Hero homepage — nama, role **QA Engineer**, rotating QA phrases, marquee QA tools (pill text) |
| `ThemeProvider.tsx` | Wrapper `next-themes` untuk dark/light mode |
| `ThemeToggle.tsx` | Tombol toggle dark/light mode |
| `FloatingContact.tsx` | Tombol kontak mengambang |
| `SeoJsonLd.tsx` | JSON-LD structured data untuk SEO |

### Per Halaman
| File | Fungsi |
|---|---|
| `about/AboutContent.tsx` | Halaman About — foto circular, QA skills timeline (Test Case, Bug Tracking, API Automation, SDLC), tombol download CV |
| `contact/WhatsAppContact.tsx` | Link WhatsApp di halaman Contact |
| `home/ProjectsHighlight.tsx` | Seksi "latest projects." di Homepage — 2 proyek QA featured |
| `projects/ProjectsSection.tsx` | Daftar semua proyek dengan search, sort, load-more. QA projects selalu muncul pertama |
| `projects/ProjectDetail.tsx` | Halaman detail proyek — cover/placeholder, tech stack, case study lengkap |

### Splash / Transisi
| File | Fungsi |
|---|---|
| `splash/BootSplash.tsx` | Overlay animasi penuh layar di first load |
| `splash/LoadingSplash.tsx` | Skeleton loading UI |
| `splash/PageTransition.tsx` | Framer Motion route transition wrapper |

### UI Primitif
| File | Fungsi |
|---|---|
| `ui/button.tsx` | Komponen Button bersama (`class-variance-authority`) |

---

## Data Proyek (`src/data/projects.ts`)

Single source of truth untuk semua data proyek. **2 proyek QA featured** + 4 proyek web dev (tidak featured):

### ⭐ QA Projects (Featured)

| Slug | Judul | Kategori | Stack | Featured |
|---|---|---|---|---|
| `qa-portfolio-zalora` | Zalora E-Commerce: Core Functional & UI/UX Testing | Manual QA | Manual Testing, Bug Reporting, Test Cases, GitHub | ✅ |
| `api-automation-reqres` | Reqres API Automation Testing | API Automation | Postman, JavaScript, JSON, API Testing | ✅ |

### Web Dev Projects (Tidak Featured)

| Slug | Judul | Kategori | Stack | Featured |
|---|---|---|---|---|
| `anime-hub` | AnimeHub | Streaming | Next.js, Tailwind | — |
| `milicia-assistant` | Milicia Assistant | AI Assistant | Python, Ollama, Gemini Vision | — |
| `pkumi-compro` | PKU MI | Landing Page | Next.js, Laravel, Tailwind | — |
| `cbt-toafl` | CBT TOAFL | E-Learning | Next.js, Laravel, MySQL | — |

### Tipe Project
```typescript
type Project = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;           // kosong ("") untuk proyek tanpa cover image → tampil placeholder CSS
  stack: string[];
  category: "Manual QA" | "API Automation" | "E-Learning" | "Streaming" | ...;
  period?: string;
  links?: { live?: string; github?: string; youtube?: string };
  featured?: boolean;      // true = tampil di homepage + urutan pertama di /projects
  caseStudy?: CaseStudy;   // problem, solution, features, gallery, youtubeId
};
```

---

## QA Ecosystem (Hero Marquee)

Label pill-text yang ditampilkan di marquee Hero Section:
`Postman` · `Manual Testing` · `API Testing` · `Black-Box Testing` · `Bug Reporting` · `Test Cases` · `GitHub` · `JavaScript` · `SDLC` · `Regression Testing`

---

## Skills Timeline (Halaman About)

| Skill | Deskripsi |
|---|---|
| Test Case Design & Execution | Black-Box Testing, Equivalence Partitioning, Boundary Value Analysis |
| Bug Tracking & Reporting | Dokumentasi terstruktur: severity, priority, langkah reproduksi |
| API Testing & Automation | Postman + JS scripts, Newman CLI, CI-ready collection |
| SDLC & Logical Precision | Pemahaman SDLC penuh; background developer sebagai keunggulan |

---

## Aset Publik (`public/images/`)

| File | Digunakan di |
|---|---|
| `pid.jpg`, `pid-2.jpg`, `pid-3.jpg` | Slideshow foto profil (Hero & About) |
| `asset-1.png` | Garis horizontal dekoratif (Hero) |
| `asset-2.png` | Simbol cross/plus dekoratif (Hero & About) |
| `contact-bg.png` | Background foto halaman Contact |
| `anime-hub.png` + `anime-hub-1~3.png` | Cover & gallery proyek AnimeHub |
| `milicia.png` | Cover proyek Milicia Assistant |
| `pkumi.png` + `pkumi-1~2.png` | Cover & gallery proyek PKU MI |
| `cbt.png` + `cbt-1~4.png` | Cover & gallery proyek CBT TOAFL |

> Proyek QA (`qa-portfolio-zalora`, `api-automation-reqres`) tidak memiliki cover image.  
> Tampilkan otomatis sebagai **gradient placeholder** dengan label kategori.

---

## Fitur yang Sudah Ada

- [x] Hero Section dengan rotating QA phrases dan marquee QA tools (pill text)
- [x] Photo slideshow profil (crossfade animasi)
- [x] QA Skills Timeline di halaman About (4 skill QA utama)
- [x] Proyek QA tampil pertama di halaman Projects (sort by featured)
- [x] Cover placeholder CSS untuk proyek tanpa gambar
- [x] Navbar — active pill, scroll progress, mobile menu, dark/light toggle
- [x] Halaman Projects — search, filter, sort, load-more
- [x] Project Detail — case study lengkap per proyek
- [x] Dark / Light Mode — token-based, persisten
- [x] Boot Splash Screen — animasi overlay di first load
- [x] Page Transitions — Framer Motion fade antar route
- [x] Static Export — build generate folder `out/`
- [x] SEO — metadata, OpenGraph, Twitter Card, JSON-LD
- [x] Error page & Not Found page custom
- [x] Reduced Motion — semua animasi respek `prefers-reduced-motion`

---

## Scripts

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Jalankan dev server (localhost:3000) |
| `npm run build` | Build production + generate folder `out/` |
| `npm run start` | Jalankan production server |
| `npm run lint` | Jalankan ESLint |

---

## Deploy

Static Export (`output: "export"` di `next.config.ts`).  
Setelah `npm run build`, folder `out/` bisa langsung diupload ke hosting shared (cPanel/hPanel).
