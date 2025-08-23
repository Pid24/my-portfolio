// server component (tanpa "use client")
export default function SeoJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rofid Nasif Annafie",
    jobTitle: "Software Engineer",
    url: "https://your-domain.com",
    sameAs: ["https://github.com/Pid24", "https://www.linkedin.com/in/rofid/"],
  };

  const site = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rofid Nasif Annafie",
    url: "https://your-domain.com",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(site) }} />
    </>
  );
}
