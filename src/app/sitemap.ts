import type { MetadataRoute } from "next";
import { PROJECTS } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://rofid-dev.my.id"; // ganti domainmu

  const staticPages = ["/", "/about", "/projects", "/contact"].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: p === "/" ? 1 : 0.7,
  }));

  const projectPages = PROJECTS.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...projectPages];
}
