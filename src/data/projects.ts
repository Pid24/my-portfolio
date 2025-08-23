// data/projects.ts
export type Project = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string; // contoh: "/projects/toko-x.webp"
  stack: string[]; // ["Laravel","Tailwind","MySQL"]
  category: "E-commerce" | "Landing Page" | "Payment Gateway" | "Laravel";
  period?: string;
  links?: { live?: string; github?: string };
  featured?: boolean; // dipakai untuk highlight di Home
  highlights?: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "setu-umkm",
    title: "Setu UMKM",
    excerpt: "Marketplace UMKM Kelurahan Setu dengan transaksi langsung ke penjual, verifikasi admin, dan pembayaran Midtrans.",
    cover: "/images/setu-umkm.png",
    stack: ["Laravel", "Bootstrap", "MySQL"],
    category: "E-commerce",
    period: "2023",
    links: { live: "#", github: "#" },
    featured: true,
  },
  {
    slug: "atraindes-apothecary",
    title: "Atraindes Apothecary",
    excerpt: "Apotek online mobile—pencarian instan, kategori obat, dan order tracking.",
    cover: "/images/atraindes-apotek.png",
    stack: ["Laravel", "Tailwind", "MySQL"],
    category: "Landing Page",
    period: "2024",
    links: { live: "#", github: "#" },
    featured: true,
  },
  {
    slug: "atraindes-ticket",
    title: "Atraindes Ticket",
    excerpt: "Aplikasi tiket wisata—discover, kategori, bookings, rewards, dan gateway pembayaran reusable untuk Laravel.",
    cover: "/images/atraindes-tiket.png",
    stack: ["Laravel", "Tailwind", "MySQL"],
    category: "Payment Gateway",
    period: "2024",
    links: { github: "#" },
    featured: true,
  },
  {
    slug: "md-music-studio",
    title: "MD Music Studio",
    excerpt: "Website studio musik dengan pemesanan jadwal, manajemen ruangan & CMS promosi.",
    cover: "/images/md-music-studio.png",
    stack: ["Laravel", "Tailwind", "MySQL"],
    category: "Laravel",
    period: "2024",
    links: { live: "#" },
    featured: false,
  },
];
