Rofid Nasif Annafie — Portfolio

Personal website & portfolio dibangun dengan Next.js (App Router), TypeScript, Tailwind CSS, dan Framer Motion. Fokus pada performa, animasi halus, serta kemudahan deploy ke shared hosting melalui static export.

🌐 Live Demo: rofid-dev.my.id

✨ Fitur Utama

Hero Section
Modern dengan marquee tech stack (ikon berubah warna saat hover).

Navigasi
Navbar animasi (underline & pill) + theme toggle (light/dark).

Projects

Featured Projects di beranda

Halaman /projects dengan search, filter by stack, sort, dan load more

About
Slideshow foto & copy profesional.

Contact
WhatsApp integration (otomatis isi pesan).

Splash Screens

BootSplash (overlay saat refresh)

PageTransition (transisi antar halaman)

SEO Dasar
Next Metadata (OpenGraph & Twitter card).

Static Export
Siap upload ke hPanel/cPanel tanpa Node server.

🛠️ Tech Stack

Next.js 15
 (App Router, output: "export")

TypeScript

Tailwind CSS

Framer Motion

next-themes (theme toggle)

lucide-react (ikon)

simple-icons (ikon tech stack)

📁 Struktur Direktori (ringkas)
src/
  app/
    (routes)        -> page.tsx per halaman (/, /about, /projects, /contact)
    layout.tsx      -> Navbar, BootSplash, PageTransition, Footer, ThemeProvider
    globals.css
  components/
    Navbar.tsx
    Footer.tsx
    ThemeProvider.tsx
    ThemeToggle.tsx
    HeroSection.tsx
    splash/
      BootSplash.tsx
      PageTransition.tsx
    home/
      ProjectsHighlight.tsx
    projects/
      ProjectsSection.tsx
    contact/
      WhatsAppContact.tsx
  data/
    projects.ts     -> sumber data proyek
public/
  images/           -> cover project, og image, foto, favicon

🚀 Jalankan Lokal
# 1) Install dependencies
npm install

# 2) Development mode
npm run dev

# 3) Production build (static export otomatis ke folder `out/`)
npm run build


⚡ Catatan: sudah dikonfigurasi output: "export" via next.config.ts. Hasil build siap upload ke shared hosting.

📦 Deploy ke Shared Hosting (hPanel / cPanel)

Jalankan npm run build → output ada di folder out/

Zip folder out/ → upload ke public_html (atau sub-folder domain)

Extract di server → pastikan file index.html, _next/*, images/* tersedia

Selesai ✅

Update situs = build ulang → upload ulang isi folder out/ (overwrite).

✍️ Tambah / Ubah Project

Simpan cover di public/images/ (PNG/JPG).

Tambah/ubah item di src/data/projects.ts:

export const PROJECTS = [
  {
    slug: "setu-umkm",
    title: "Setu UMKM",
    excerpt: "Custom e-commerce Laravel dengan Midtrans, voucher & ongkir.",
    cover: "/images/setu-umkm.png",
    stack: ["Laravel", "PHP", "Tailwind", "MySQL"],
    category: "E-commerce",
    period: "2023",
    featured: true,
  },
  // ...
];


Jalankan npm run dev untuk cek → npm run build → upload out/.

🔄 Git Workflow

.gitignore sudah mengecualikan:

node_modules/

.next/

out/

.env*

Workflow standar:

git add -A
git commit -m "update: UI/UX & content"
git push

⚙️ Konfigurasi SEO

Di app/layout.tsx:

metadataBase, openGraph, twitter

Gambar default OG: public/images/og-default.png

👉 robots.txt & sitemap belum disertakan agar static export lebih mudah. Bisa ditambahkan kemudian bila perlu.

🧩 Scripts
{
  "dev": "next dev",
  "build": "next build --turbopack",
  "start": "next start"
}

✅ Roadmap Singkat

 Project detail page per slug

 Animasi tambahan di Projects (hover 3D / parallax)

 Analytics (Plausible / GA4)

 Peningkatan aksesibilitas (a11y) & Lighthouse score

📄 Lisensi

MIT © 2025 Rofid Nasif Annafie
