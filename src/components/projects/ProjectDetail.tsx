"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Play,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Layers,
} from "lucide-react";
import type { Project } from "@/data/projects";

/* ============================================================
   helpers
   ============================================================ */
function isExternalUrl(href: string) {
  return /^https?:\/\//i.test(href) || href.startsWith("//");
}

/* ============================================================
   ProjectDetail
   ============================================================ */
export default function ProjectDetail({ project: p }: { project: Project }) {
  const reduce = useReducedMotion();
  const cs = p.caseStudy;

  // gallery state — combine cover + extra gallery images
  const galleryImages = [p.cover, ...(cs?.gallery ?? [])];
  const [galleryIdx, setGalleryIdx] = useState(0);

  // animation variants
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: reduce ? 0 : 0.07 } },
  } as const;
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 14 },
    show: { opacity: 1, y: 0, transition: { type: "spring", damping: 20, duration: reduce ? 0 : undefined } },
  } as const;

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
      {/* blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-30"
        style={{ backgroundImage: "conic-gradient(from 180deg at 50% 50%, #8b5cf6, #22d3ee, #60a5fa, #8b5cf6)" }}
        animate={reduce ? {} : { y: [0, -16, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full blur-3xl opacity-20"
        style={{ backgroundImage: "radial-gradient(closest-side, rgba(99,102,241,0.5), transparent)" }}
        animate={reduce ? {} : { y: [0, 14, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
      />

      {/* content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-5xl px-4 md:px-6 py-12 md:py-16"
      >
        {/* ── breadcrumb ── */}
        <motion.div variants={item} className="mb-6 flex items-center justify-between gap-4 flex-wrap">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-foreground/5 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Semua Projects
          </Link>

          {p.period && (
            <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs text-foreground/70">
              <Calendar className="h-3.5 w-3.5" />
              {p.period}
            </span>
          )}
        </motion.div>

        {/* ── hero cover ── */}
        <motion.div variants={item} className="relative overflow-hidden rounded-2xl border shadow-lg">
          <div className="relative aspect-[21/9] w-full">
            <Image
              src={p.cover}
              alt={p.title}
              fill
              priority
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>

          {/* category badge overlay */}
          <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
            <Layers className="h-3.5 w-3.5" />
            {p.category}
          </span>
        </motion.div>

        {/* ── title & meta ── */}
        <motion.div variants={item} className="mt-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">
              {p.title}
            </span>
          </h1>
          <p className="mt-3 text-base md:text-lg text-foreground/70 max-w-3xl leading-relaxed">{p.excerpt}</p>
        </motion.div>

        {/* ── stack badges ── */}
        <motion.div variants={item} className="mt-5 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span
              key={s}
              className="rounded-xl border px-3 py-1.5 text-xs font-medium text-foreground/80 bg-foreground/[0.03]"
            >
              {s}
            </span>
          ))}
        </motion.div>

        {/* ── CTA links ── */}
        <motion.div variants={item} className="mt-6 flex flex-wrap items-center gap-3">
          {p.links?.live && p.links.live !== "#" && (
            <a
              href={p.links.live}
              target={isExternalUrl(p.links.live) ? "_blank" : undefined}
              rel={isExternalUrl(p.links.live) ? "noopener noreferrer" : undefined}
              className="group inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium shadow-sm border bg-primary text-primary-foreground hover:shadow-md hover:translate-y-[-1px] transition-all"
            >
              <ExternalLink className="h-4 w-4" />
              Live Preview
            </a>
          )}
          {p.links?.github && (
            <a
              href={p.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-medium hover:bg-foreground/5 transition-colors"
            >
              <Github className="h-4 w-4" />
              Source Code
            </a>
          )}
          {p.links?.youtube && (
            <a
              href={p.links.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 text-red-500 px-5 py-3 text-sm font-medium hover:bg-red-500/20 transition-colors"
            >
              <Play className="h-4 w-4" />
              Demo Video
            </a>
          )}
        </motion.div>

        {/* ──────── Case Study ──────── */}
        {cs && (
          <>
            {/* ── divider ── */}
            <motion.div variants={item} className="my-10 md:my-14">
              <div className="relative h-px w-full overflow-hidden">
                <motion.span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent"
                  style={{ backgroundSize: "200% 100%" }}
                  animate={reduce ? undefined : { backgroundPositionX: ["0%", "200%", "0%"] }}
                  transition={reduce ? undefined : { duration: 6, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <h2 className="mt-8 text-2xl md:text-3xl font-bold tracking-tight text-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">
                  Case Study
                </span>
              </h2>
              <p className="mt-2 text-sm text-foreground/60 text-center">
                Bagaimana proyek ini dibangun, tantangan yang dihadapi, dan solusi yang diterapkan.
              </p>
            </motion.div>

            {/* ── problem & solution cards ── */}
            <motion.div variants={item} className="grid md:grid-cols-2 gap-4 md:gap-6">
              {/* Problem */}
              <div className="rounded-2xl border bg-background/60 p-5 md:p-6">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  The Problem
                </div>
                <p className="text-sm md:text-base text-foreground/80 leading-relaxed">{cs.problem}</p>
              </div>

              {/* Solution */}
              <div className="rounded-2xl border bg-background/60 p-5 md:p-6">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  The Solution
                </div>
                <p className="text-sm md:text-base text-foreground/80 leading-relaxed">{cs.solution}</p>
              </div>
            </motion.div>

            {/* ── features list ── */}
            {cs.features && cs.features.length > 0 && (
              <motion.div variants={item} className="mt-8 md:mt-10">
                <h3 className="text-lg md:text-xl font-semibold tracking-tight mb-4">Key Features</h3>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {cs.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 rounded-xl border bg-background/60 p-3 md:p-4 text-sm text-foreground/80"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* ── gallery carousel ── */}
            {galleryImages.length > 1 && (
              <motion.div variants={item} className="mt-8 md:mt-10">
                <h3 className="text-lg md:text-xl font-semibold tracking-tight mb-4">Gallery</h3>
                <div className="relative overflow-hidden rounded-2xl border bg-background/60">
                  <div className="relative aspect-[16/10]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={galleryIdx}
                        className="absolute inset-0"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        <Image
                          src={galleryImages[galleryIdx]}
                          alt={`${p.title} screenshot ${galleryIdx + 1}`}
                          fill
                          sizes="(min-width: 1024px) 1024px, 100vw"
                          className="object-cover"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* nav buttons */}
                  <button
                    onClick={() => setGalleryIdx((i) => (i - 1 + galleryImages.length) % galleryImages.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 inline-grid place-items-center h-10 w-10 rounded-full border bg-background/80 backdrop-blur hover:bg-foreground/10 transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setGalleryIdx((i) => (i + 1) % galleryImages.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 inline-grid place-items-center h-10 w-10 rounded-full border bg-background/80 backdrop-blur hover:bg-foreground/10 transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  {/* dots */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {galleryImages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setGalleryIdx(i)}
                        className={[
                          "h-2 rounded-full transition-all",
                          i === galleryIdx ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/70",
                        ].join(" ")}
                        aria-label={`View image ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── youtube embed ── */}
            {cs.youtubeId && (
              <motion.div variants={item} className="mt-8 md:mt-10">
                <h3 className="text-lg md:text-xl font-semibold tracking-tight mb-4">Demo Video</h3>
                <div className="relative overflow-hidden rounded-2xl border aspect-video">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${cs.youtubeId}`}
                    title={`${p.title} demo video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            )}
          </>
        )}

        {/* ── bottom nav ── */}
        <motion.div variants={item} className="mt-12 md:mt-16 flex justify-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-medium hover:bg-foreground/5 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Kembali ke Projects
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
