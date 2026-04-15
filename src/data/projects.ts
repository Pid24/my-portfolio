// data/projects.ts
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
  },
];
