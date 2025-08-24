Rofid Nasif Annafie — Portfolio

Personal website & portfolio built with Next.js (App Router), TypeScript, Tailwind CSS, dan Framer Motion. Fokus pada performa, animasi halus, dan kemudahan deploy ke shared hosting (static export).

🌐 Live: https://rofid-dev.my.id

✨ Fitur Utama

Hero modern dengan marquee tech stack (ikon berubah warna saat hover)

Navbar animasi (underline & pill) + Theme Toggle (light/dark)

Projects:

Featured Projects di beranda

Halaman /projects dengan search, filter by stack, sort, dan load more

About dengan slideshow foto & copy yang profesional

Contact via WhatsApp (otomatis isi pesan)

Splash screens:

BootSplash (overlay saat refresh)

PageTransition (transisi tiap pindah route)

SEO dasar via Next Metadata (OpenGraph, Twitter card)

Static export siap upload ke hPanel/CPANEL

🛠️ Tech Stack

Next.js 15 (App Router, output: "export")

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
    projects.ts     -> sumber data proyek (judul, slug, cover, stack, dll)
public/
  images/           -> semua gambar (cover project, og image, foto, favicon)

🚀 Jalankan Lokal
# 1) Install deps
npm install

# 2) Development
npm run dev

# 3) Production build (static export otomatis ke folder `out/`)
npm run build


Catatan: Project sudah dikonfigurasi static export via next.config.ts (output: "export"). Hasil build siap upload ke hosting tanpa Node server.

📦 Deploy ke Shared Hosting (hPanel / cPanel)

npm run build → output ada di folder out/

Zip folder out/ (klik kanan → 7-Zip → Add to archive… → format zip)

Upload ZIP ke File Manager → public_html (atau sub-folder domain)

Extract ZIP di server → pastikan file index.html, _next/*, images/*, docs/* ada di root domain/subdomain

Selesai ✅

Update situs = build ulang → upload ulang isi out/ (overwrite).

✍️ Cara Menambah / Mengubah Project

Simpan cover gambar di public/images/ (PNG/JPG bebas)

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


Jalankan npm run dev untuk cek tampilan, lalu npm run build + upload out/.

🔄 Git Workflow (aman dari “Source Control 10K”)

.gitignore sudah mengecualikan:

node_modules/

.next/

out/

.env*

Perintah standar:

git add -A
git commit -m "update: UI/UX & content"
git push

⚙️ Konfigurasi SEO

Di app/layout.tsx:

metadataBase, openGraph, twitter

Gambar OG default: public/images/og-default.png

Opsional: robots.txt & sitemap tidak disertakan untuk memudahkan static export. Jika butuh SEO lanjut, bisa ditambah belakangan dengan konfigurasi yang kompatibel static export.

🧩 Scripts
{
  "dev": "next dev",
  "build": "next build --turbopack",
  "start": "next start"
}

✅ Roadmap Singkat

 Project detail page per slug (opsional)

 Animasi tambahan di Projects (hover 3D / parallax)

 Analytics (Plausible/GA4)

 Better a11y & Lighthouse tuning

📄 Lisensi

MIT © 2025 Rofid Nasif Annafie
