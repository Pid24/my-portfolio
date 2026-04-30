"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Download } from "lucide-react";

const PROFILE = {
  name: "Rofid Nasif Annafie",
  role: "Software Engineer",
  photos: ["/images/pid.jpg", "/images/pid-2.jpg", "/images/pid-3.jpg"], // siapkan minimal 2 foto
  cv: "/docs/pid-cv.pdf", // letakkan file PDF di /public/docs
} as const;

export default function AboutContent() {
  const reduce = useReducedMotion();

  // Animasi (matching hero)
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } } as const;
  const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { type: "spring", damping: 20 } } } as const;

  // Slideshow 2 detik
  const photos = useMemo(() => (PROFILE.photos?.length ? PROFILE.photos : ["/images/pid.jpg"]), []);
  const [photoIndex, setPhotoIndex] = useState(0);
  useEffect(() => {
    if (reduce || photos.length <= 1) return;
    const id = setInterval(() => setPhotoIndex((i) => (i + 1) % photos.length), 2000);
    return () => clearInterval(id);
  }, [photos.length, reduce]);

  // Fetch GitHub Stats
  const [ghStats, setGhStats] = useState<{ followers: number; public_repos: number } | null>(null);
  useEffect(() => {
    fetch("https://api.github.com/users/Pid24")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.message) {
          setGhStats({ followers: data.followers, public_repos: data.public_repos });
        }
      })
      .catch((err) => console.error("Error fetching GitHub stats:", err));
  }, []);

  return (
    /* FULL-BLEED background */
    <section
      className="
        relative w-screen mx-[calc(50%-50vw)] overflow-hidden
        bg-gradient-to-b from-background to-background/60
      "
      style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--foreground)/0.06) 1px, transparent 0)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-30"
        style={{ backgroundImage: "conic-gradient(from 180deg at 50% 50%, #f59e0b, #14b8a6, #C8E63F, #f59e0b)" }}
        animate={reduce ? {} : { y: [0, -18, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full blur-3xl opacity-20"
        style={{ backgroundImage: "radial-gradient(closest-side, rgba(200,230,63,0.4), transparent)" }}
        animate={reduce ? {} : { y: [0, 16, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
      />

      {/* CONTENT container */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-6 py-16 md:py-24">
        {/* Grid: foto kiri, teks kanan */}
        <motion.div variants={container} initial="hidden" animate="show" className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Foto (kiri) + slideshow + glow */}
          <motion.div variants={item} className="order-1 relative flex justify-center">
            <div className="relative rounded-full p-1 bg-gradient-to-tr from-amber-500/70 via-accent/70 to-teal-500/70 shadow-xl">
              <div className="rounded-full overflow-hidden bg-background">
                <div className="relative aspect-square w-[280px] md:w-[340px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={photos[photoIndex]}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <Image src={photos[photoIndex]} alt={`Foto ${PROFILE.name}`} fill priority={photoIndex === 0} sizes="(min-width: 768px) 340px, 280px" className="object-cover" style={{ objectPosition: "center 20%" }} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
            {/* decorative asset: cross/plus — top right */}
            <motion.div aria-hidden className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-10 h-10 md:w-12 md:h-12" animate={reduce ? {} : { rotate: [0, 90, 0] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}>
              <Image src="/images/asset-2.png" alt="" fill className="object-contain dark:invert" />
            </motion.div>

            {/* Glow di belakang frame */}
            <motion.div
              aria-hidden
              className="absolute inset-0 -z-10 blur-2xl opacity-40 rounded-full"
              style={{
                backgroundImage: "radial-gradient(60% 60% at 50% 40%, rgba(245,158,11,0.45), transparent), radial-gradient(40% 40% at 30% 80%, rgba(20,184,166,0.35), transparent)",
              }}
              animate={reduce ? {} : { opacity: [0.35, 0.55, 0.35] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Teks (kanan) */}
          <motion.div variants={item} className="order-2">
            <h1 className="text-5xl md:text-6xl font-serif tracking-tight text-accent mb-6">about.</h1>

            {/* Deskripsi profesional singkat */}
            <div className="text-foreground/80 leading-relaxed">
              <p>Saya Software Engineer yang bersemangat membangun produk digital yang andal dan terukur. Fokus utama saya ada pada pengembangan back-end dan optimasi performa aplikasi.</p>
            </div>

            {/* Timeline */}
            <div className="mt-10 space-y-8">
              <div className="relative pl-5">
                <div className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-foreground"></div>
                <h3 className="text-sm font-bold text-foreground mb-2">Back-End & Architecture</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Fokus pada <strong>Laravel</strong> untuk aplikasi back-end. Berpengalaman merancang arsitektur REST API, autentikasi, queue & job processing, caching, hingga deployment yang rapi.
                </p>
              </div>

              <div className="relative pl-5">
                <div className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-foreground"></div>
                <h3 className="text-sm font-bold text-foreground mb-2">E-commerce & Integration</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Terbiasa membangun sistem e-commerce kompleks (katalog, cart, checkout, manajemen pesanan) serta mengintegrasikan berbagai <strong>payment gateway</strong> populer di Indonesia.
                </p>
              </div>

              <div className="relative pl-5">
                <div className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-foreground"></div>
                <h3 className="text-sm font-bold text-foreground mb-2">Front-End & Optimization</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Nyaman menggunakan <strong>TypeScript, Next.js, dan Tailwind CSS</strong> untuk membangun antarmuka yang cepat, responsif, dan menargetkan skor Lighthouse yang solid.
                </p>
              </div>
            </div>

            {/* Tombol Download CV */}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={PROFILE.cv}
                download
                className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold shadow-sm border-2 border-foreground bg-accent text-foreground hover:shadow-md hover:translate-y-[-1px] transition-all"
                aria-label="Unduh CV (PDF)"
              >
                Unduh Resume
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* GitHub Stats Section */}
        <motion.div variants={item} initial="hidden" animate="show" className="mt-20 border-t border-foreground/10 pt-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-serif tracking-tight">
              <span className="text-foreground">Coding Activity</span>
            </h3>
            <p className="mt-2 text-foreground/70">Statistik live langsung dari GitHub saya.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Stats Cards (Left) */}
            <div className="md:col-span-4 flex flex-col gap-4">
              <div className="flex-1 rounded-2xl border bg-background/60 p-6 flex flex-col items-center justify-center text-center shadow-sm backdrop-blur">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-500 to-accent">{ghStats ? ghStats.public_repos : "..."}</span>
                <span className="mt-3 text-xs font-bold text-foreground/60 uppercase tracking-widest">Public Repos</span>
              </div>
              <div className="flex-1 rounded-2xl border bg-background/60 p-6 flex flex-col items-center justify-center text-center shadow-sm backdrop-blur">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-accent">{ghStats ? ghStats.followers : "..."}</span>
                <span className="mt-3 text-xs font-bold text-foreground/60 uppercase tracking-widest">Followers</span>
              </div>
            </div>

            {/* Contribution Graph (Right) */}
            <div className="md:col-span-8 rounded-2xl border bg-background/60 p-6 flex flex-col items-center justify-center shadow-sm backdrop-blur overflow-hidden">
              <span className="text-xs font-bold text-foreground/60 uppercase tracking-widest mb-6">Contributions (1 Tahun Terakhir)</span>
              <div className="w-full overflow-x-auto pb-4 flex justify-start md:justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://ghchart.rshah.org/8b5cf6/Pid24" alt="Pid24's Github chart" className="min-w-[650px] w-full max-w-[800px] opacity-90 dark:invert dark:hue-rotate-180 mix-blend-multiply dark:mix-blend-screen" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
