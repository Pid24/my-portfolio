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
        style={{ backgroundImage: "conic-gradient(from 180deg at 50% 50%, #8b5cf6, #22d3ee, #60a5fa, #8b5cf6)" }}
        animate={reduce ? {} : { y: [0, -18, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full blur-3xl opacity-20"
        style={{ backgroundImage: "radial-gradient(closest-side, rgba(99,102,241,0.55), transparent)" }}
        animate={reduce ? {} : { y: [0, 16, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
      />

      {/* CONTENT container */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-6 py-16 md:py-24">
        {/* Header */}
        <motion.div initial={reduce ? undefined : { opacity: 0, y: 8 }} animate={reduce ? undefined : { opacity: 1, y: 0 }} transition={{ type: "spring", damping: 20 }} className="mb-10 md:mb-14">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">About</span>
          </h1>
          <p className="mt-2 text-foreground/70">Kenalan singkat tentang saya.</p>
        </motion.div>

        {/* Grid: foto kiri, teks kanan */}
        <motion.div variants={container} initial="hidden" animate="show" className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Foto (kiri) + slideshow + glow */}
          <motion.div variants={item} className="order-1 relative">
            <div className="relative rounded-3xl p-1 bg-gradient-to-tr from-indigo-500/70 via-cyan-400/70 to-violet-500/70 shadow-xl">
              <div className="rounded-2xl overflow-hidden bg-background">
                <div className="relative h-[380px] w-full md:h-[460px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={photos[photoIndex]}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <Image src={photos[photoIndex]} alt={`Foto ${PROFILE.name}`} fill priority={photoIndex === 0} sizes="(min-width: 768px) 520px, 100vw" className="object-cover" style={{ objectPosition: "center 20%" }} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Glow di belakang frame */}
            <motion.div
              aria-hidden
              className="absolute inset-0 -z-10 blur-2xl opacity-40"
              style={{
                backgroundImage: "radial-gradient(60% 60% at 50% 40%, rgba(129,140,248,0.45), transparent), radial-gradient(40% 40% at 30% 80%, rgba(34,211,238,0.35), transparent)",
              }}
              animate={reduce ? {} : { opacity: [0.35, 0.55, 0.35] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Teks (kanan) + badge + tombol CV */}
          <motion.div variants={item} className="order-2">
            <div className="inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs md:text-sm">Tersedia untuk remote & freelance</span>
            </div>

            <h2 className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight">{PROFILE.name}</h2>
            <p className="mt-1 text-foreground/70">{PROFILE.role}</p>

            {/* Deskripsi profesional */}
            <div className="mt-6 space-y-4 text-foreground/80 leading-relaxed">
              <p>
                Saya Software Engineer dengan fokus utama pada <strong>Laravel</strong> untuk aplikasi back-end yang andal dan terukur. Saya banyak mengerjakan proyek komersial berbasis Laravel: perancangan arsitektur REST API,
                autentikasi/otorisasi, queue & job processing, caching, testing, hingga deployment yang rapi.
              </p>
              <p>
                Di sisi produk, saya terbiasa membangun <strong>e-commerce</strong> (katalog, cart, checkout, promo, manajemen pesanan) serta integrasi <strong>payment gateway</strong> populer. Saya juga mengerjakan{" "}
                <strong>landing page</strong> yang cepat, responsif, dan SEO-friendly—targetkan skor Lighthouse & Core Web Vitals yang solid.
              </p>
              <p>
                Untuk front-end, saya nyaman dengan <strong>TypeScript/Next.js</strong> dan <strong>Tailwind CSS</strong>, menjaga aksesibilitas, performa, dan DX tim. Saya senang menulis kode bersih, dokumentasi ringkas, dan keputusan
                teknis yang terukur dampaknya.
              </p>
            </div>

            {/* Tombol Download CV */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={PROFILE.cv}
                download
                className="group inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm md:text-base font-medium shadow-sm border bg-primary text-primary-foreground hover:shadow-md hover:translate-y-[-1px] transition-all"
                aria-label="Unduh CV (PDF)"
              >
                <Download className="h-4 w-4 transition-transform group-hover:scale-110" />
                Unduh CV (PDF)
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
