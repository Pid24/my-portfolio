import type { Metadata } from "next";
import ProjectsSection from "@/components/projects/ProjectsSection";

export const metadata: Metadata = {
  title: "Projects — Rofid Nasif Annafie",
  description: "Kumpulan proyek pilihan: Laravel, e-commerce, landing page, payment gateway.",
  openGraph: {
    title: "Projects — Rofid Nasif Annafie",
    description: "Kumpulan proyek pilihan.",
    type: "website",
  },
};

export default function ProjectsPage() {
  return <ProjectsSection />;
}
