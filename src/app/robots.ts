import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://rofid-dev.my.id;"; // ganti domainmu
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${base}/sitemap.xml`,
  };
}
