import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/data/projects";
import ProjectDetail from "@/components/projects/ProjectDetail";

type Props = { params: Promise<{ slug: string }> };

function findProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return {};

  return {
    title: `${project.title} — Rofid Nasif Annafie`,
    description: project.excerpt,
    openGraph: {
      title: `${project.title} — Rofid Nasif Annafie`,
      description: project.excerpt,
      type: "article",
      images: [{ url: project.cover, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Rofid Nasif Annafie`,
      description: project.excerpt,
      images: [project.cover],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
