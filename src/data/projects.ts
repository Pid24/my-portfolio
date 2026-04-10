// data/projects.ts
export type Project = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string; // contoh: "/projects/toko-x.webp"
  stack: string[]; // ["Laravel","Tailwind","MySQL"]
  category: "E-commerce" | "Landing Page" | "Payment Gateway" | "Laravel" | "Booking" | "Streaming";
  period?: string;
  links?: { live?: string; github?: string };
  featured?: boolean; // dipakai untuk highlight di Home
  highlights?: string[];
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
    links: { live: "https://anime-hubs.vercel.app/" },
    featured: false,
  },
];
