"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function NotFound() {
  const reduce = useReducedMotion();

  return (
    <main
      id="main"
      className="
        relative min-h-[calc(100vh-4rem)] w-screen mx-[calc(50%-50vw)]
        overflow-hidden bg-gradient-to-b from-background to-background/60
        pt-12 md:pt-16
      "
      style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--foreground)/0.06) 1px, transparent 0)",
        backgroundSize: "24px 24px",
      }}
      aria-labelledby="nf-title"
    >
      {/* blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full blur-3xl opacity-30"
        style={{ backgroundImage: "conic-gradient(from 180deg at 50% 50%, #8b5cf6, #22d3ee, #60a5fa, #8b5cf6)" }}
        animate={reduce ? {} : { y: [0, -18, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-25"
        style={{ backgroundImage: "radial-gradient(closest-side, rgba(99,102,241,0.55), transparent)" }}
        animate={reduce ? {} : { y: [0, 16, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
      />

      {/* center */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-6 py-12 md:py-20 grid place-items-center text-center">
        {/* 404 animated */}
        <div className="relative">
          <motion.h1
            id="nf-title"
            className="text-[20vw] md:text-9xl font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400 drop-shadow-sm"
            initial={reduce ? {} : { scale: 0.9, opacity: 0 }}
            animate={reduce ? {} : { scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 18 }}
          >
            404
          </motion.h1>

          {/* halo ring */}
          <motion.span
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full blur-2xl opacity-30"
            style={{ backgroundImage: "radial-gradient(60% 60% at 50% 40%, rgba(56,189,248,0.4), transparent)" }}
            animate={reduce ? {} : { opacity: [0.25, 0.45, 0.25] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          />
        </div>

        <p className="mt-4 text-base md:text-lg text-foreground/70">Halaman yang kamu cari tidak ditemukan.</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm md:text-base font-medium shadow-sm border bg-primary text-primary-foreground hover:shadow-md hover:translate-y-[-1px] transition-all"
            aria-label="Kembali ke beranda"
          >
            Kembali ke Beranda
          </Link>
          <Link href="/projects" className="inline-flex items-center rounded-2xl px-5 py-3 text-sm md:text-base font-medium border hover:bg-foreground/5 transition-colors">
            Lihat Projects
          </Link>
        </div>
      </div>
    </main>
  );
}
