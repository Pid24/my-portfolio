// app/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";

import BootSplash from "@/components/splash/BootSplash";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/splash/PageTransition";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import FloatingContact from "@/components/FloatingContact";

// ====== CONFIG: domain & default OG ======
const siteUrl = "https://rofid-dev.my.id";
const ogImage = "/images/og-default.png";

const serifFont = DM_Serif_Display({ weight: "400", variable: "--font-serif", subsets: ["latin"], display: "swap" });
const sansFont = Inter({ variable: "--font-sans", subsets: ["latin"], display: "swap" });

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

export default function RootLayout({ children }: { children: ReactNode }) {
  const year = new Date().getFullYear();

  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${serifFont.variable} ${sansFont.variable} font-sans antialiased overflow-x-clip`}>
        <ThemeProvider>
          {/* Splash saat refresh */}
          <BootSplash minDuration={900} />

          {/* Navbar full-bleed */}
          <Navbar />

          {/* Transition setiap ganti route */}
          <PageTransition minDuration={700} />

          {/* Konten halaman */}
          {children}

          {/* Tombol kontak mengambang (mobile only) */}
          <FloatingContact />

          {/* Footer */}
          <Footer year={year} />
        </ThemeProvider>
      </body>
    </html>
  );
}
