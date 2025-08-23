// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import BootSplash from "@/components/splash/BootSplash";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/splash/PageTransition";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";

// ====== CONFIG: ganti sesuai domain & og default ======
const siteUrl = "https://rofid-dev.my.id"; // ← ganti ke domain kamu
const ogImage = "/images/og-default.png"; // ← siapkan di /public/images

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rofid Nasif Annafie — Software Engineer",
    template: "%s — Rofid Nasif Annafie",
  },
  description: "Portfolio Rofid Nasif Annafie.",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "Rofid Nasif Annafie",
    title: "Rofid Nasif Annafie — Software Engineer",
    description: "Portfolio Rofid Nasif Annafie.",
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Rofid Nasif Annafie" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rofid Nasif Annafie — Software Engineer",
    description: "Portfolio Rofid Nasif Annafie.",
    images: [ogImage],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const year = new Date().getFullYear();

  // JSON-LD (inline, server-rendered)
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rofid Nasif Annafie",
    jobTitle: "Software Engineer",
    url: siteUrl,
    sameAs: ["https://github.com/Pid24", "https://www.linkedin.com/in/rofid/"],
  };

  const siteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rofid Nasif Annafie",
    url: siteUrl,
  };

  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-clip`}>
        <ThemeProvider>
          {/* Splash saat refresh */}
          <BootSplash minDuration={900} />

          {/* Navbar full-bleed */}
          <Navbar />

          {/* Transition setiap ganti route */}
          <PageTransition minDuration={700} />

          {/* JSON-LD inline */}
          <script
            type="application/ld+json"
            // @ts-expect-error: Next allows this for JSON-LD
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
          />
          <script
            type="application/ld+json"
            // @ts-expect-error: Next allows this for JSON-LD
            dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }}
          />

          {/* Konten halaman */}
          {children}

          {/* Footer */}
          <Footer year={year} />
        </ThemeProvider>
      </body>
    </html>
  );
}
