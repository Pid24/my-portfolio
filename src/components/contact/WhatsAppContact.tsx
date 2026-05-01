"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Phone, Github, Linkedin, Mail } from "lucide-react";

export default function WhatsAppContact() {
  const reduce = useReducedMotion();

  // Animasi container
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } } as const;
  const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { type: "spring", damping: 20 } } } as const;

  return (
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
      {/* blobs dekoratif */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-25"
        style={{ backgroundImage: "conic-gradient(from 180deg at 50% 50%, #f59e0b, #14b8a6, #C8E63F, #f59e0b)" }}
        animate={reduce ? {} : { y: [0, -16, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full blur-3xl opacity-20"
        style={{ backgroundImage: "radial-gradient(closest-side, rgba(200,230,63,0.4), transparent)" }}
        animate={reduce ? {} : { y: [0, 14, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-6 py-16 md:py-24">
        {/* Header */}
        <motion.div initial={reduce ? undefined : { opacity: 0, y: 8 }} animate={reduce ? undefined : { opacity: 1, y: 0 }} transition={{ type: "spring", damping: 20 }} className="mb-10 md:mb-14">
          <h1 className="text-5xl md:text-6xl font-serif tracking-tight text-accent">contact.</h1>
        </motion.div>

        {/* Grid */}
        <motion.div variants={container} initial="hidden" animate="show" className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Kiri: Gambar estetik editorial */}
          <motion.div variants={item} className="relative aspect-[4/3] w-full overflow-hidden bg-muted/20 p-2 border border-foreground/10">
            <div className="relative w-full h-full overflow-hidden">
              <Image src="/images/contact-bg.png" alt="Contact representation" fill className="object-cover transition-transform duration-700 hover:scale-105" />
            </div>
            {/* asset garis di ujung */}
            <div className="absolute -bottom-4 -right-4 w-12 h-8">
              <Image src="/images/asset-1.png" alt="" fill className="object-contain dark:invert" />
            </div>
          </motion.div>

          {/* Kanan: Teks & Kontak */}
          <motion.div variants={item} className="flex flex-col justify-center space-y-8 py-2 md:py-6">
            <div className="text-foreground/80 leading-relaxed text-base md:text-lg">
              <p>Mari bangun sesuatu yang hebat bersama. Tertarik untuk mendiskusikan proyek, kolaborasi, atau sekadar menyapa? Jangan ragu untuk menghubungi saya.</p>
            </div>

            <div className="space-y-4 font-medium text-base">
              <a href="mailto:rnasifannafie@gmail.com" className="group inline-flex items-center gap-4 hover:text-accent transition-colors w-fit">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 group-hover:border-accent group-hover:bg-accent/10 transition-colors">
                  <Mail className="h-4 w-4" />
                </span>
                Email
              </a>

              <a href="https://wa.me/6281381629551" target="_blank" rel="noreferrer" className="group flex items-center gap-4 hover:text-accent transition-colors w-fit">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 group-hover:border-accent group-hover:bg-accent/10 transition-colors">
                  <Phone className="h-4 w-4" />
                </span>
                WhatsApp
              </a>

              <a href="https://github.com/Pid24" target="_blank" rel="noreferrer" className="group flex items-center gap-4 hover:text-accent transition-colors w-fit">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 group-hover:border-accent group-hover:bg-accent/10 transition-colors">
                  <Github className="h-4 w-4" />
                </span>
                GitHub
              </a>

              <a href="https://linkedin.com/in/rofid" target="_blank" rel="noreferrer" className="group flex items-center gap-4 hover:text-accent transition-colors w-fit">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 group-hover:border-accent group-hover:bg-accent/10 transition-colors">
                  <Linkedin className="h-4 w-4" />
                </span>
                LinkedIn
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
