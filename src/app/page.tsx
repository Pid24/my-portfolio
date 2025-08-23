import type { Metadata } from "next";
import { HeroSection } from "@/components/HeroSection";
import ProjectsHighlight from "@/components/home/ProjectsHighlight";

export const metadata: Metadata = {
  title: "Rofid Nasif Annafie — Software Engineer",
  description: "Portfolio Rofid Nasif Annafie.",
  openGraph: {
    title: "Rofid Nasif Annafie — Software Engineer",
    description: "Portfolio Rofid Nasif Annafie.",
    type: "website",
    url: "https://example.com/",
    images: [{ url: "/images/pid.jpg", width: 1200, height: 630, alt: "Rofid Nasif Annafie" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rofid Nasif Annafie — Software Engineer",
    description: "Portfolio Rofid Nasif Annafie.",
    images: ["/images/pid.jpg"],
  },
};

// Opsional: paksa dinamis supaya loader sering muncul saat initial load
// export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <>
      <HeroSection />
      <ProjectsHighlight /> {/* ⬅️ highlight tampil di beranda */}
    </>
  );
}
