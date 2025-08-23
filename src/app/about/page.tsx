// app/about/page.tsx
import type { Metadata } from "next";
import AboutContent from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About — Rofid Nasif Annafie",
  description: "Tentang Rofid Nasif Annafie, Software Engineer yang fokus pada web modern, performa, dan UX.",
};

export default function AboutPage() {
  return (
    <main id="main">
      <AboutContent />
    </main>
  );
}
