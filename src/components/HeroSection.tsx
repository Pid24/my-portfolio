"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import {
  siPhp,
  siJavascript,
  siPython,
  siLaravel,
  siPostgresql,
  siMysql,
  siTailwindcss,
  siBootstrap,
  siTypescript,
  siNodedotjs, // Node.js
} from "simple-icons/icons";

/* ========= Types ========= */
type SimpleIcon = {
  title: string;
  slug: string;
  hex: string;
  path: string;
};

type CSSVars = React.CSSProperties & {
  ["--brand"]?: string;
  ["--speed"]?: string;
};

/* ========= CONFIG ========= */
const PROFILE = {
  name: "Rofid Nasif Annafie",
  role: "Software Engineer",
  phrases: ["Building modern & responsive websites", "Clean code, blazing-fast performance", "UI/UX that's a joy to use"],
  photoUrl: "/images/pid.jpg",
  photos: ["/images/pid.jpg"],
  links: {
    github: "https://github.com/Pid24",
    linkedin: "https://www.linkedin.com/in/rofid/",
    cv: "/docs/pid-cv.pdf",
    contact: "#contact",
  },
} as const;

const TECHS: ReadonlyArray<{ icon: SimpleIcon; href: string }> = [
  { icon: siPhp as unknown as SimpleIcon, href: "https://www.php.net/" },
  { icon: siJavascript as unknown as SimpleIcon, href: "https://developer.mozilla.org/docs/Web/JavaScript" },
  { icon: siNodedotjs as unknown as SimpleIcon, href: "https://nodejs.org/" },
  { icon: siTypescript as unknown as SimpleIcon, href: "https://www.typescriptlang.org/" },
  { icon: siPython as unknown as SimpleIcon, href: "https://www.python.org/" },
  { icon: siLaravel as unknown as SimpleIcon, href: "https://laravel.com/" },
  { icon: siPostgresql as unknown as SimpleIcon, href: "https://www.postgresql.org/" },
  { icon: siMysql as unknown as SimpleIcon, href: "https://www.mysql.com/" },
  { icon: siTailwindcss as unknown as SimpleIcon, href: "https://tailwindcss.com/" },
  { icon: siBootstrap as unknown as SimpleIcon, href: "https://getbootstrap.com/" },
];

/* ========= Utils ========= */
function hashString(s: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/* ========= Component ========= */
export function HeroSection() {
  const reduce = useReducedMotion();

  const phrases = useMemo(() => (PROFILE.phrases?.length ? PROFILE.phrases : ["Membangun web modern & responsif"]), []);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % phrases.length), 2400);
    return () => clearInterval(id);
  }, [phrases.length]);

  const photos = useMemo(() => (PROFILE.photos?.length ? PROFILE.photos : [PROFILE.photoUrl]).filter(Boolean), []);
  const [photoIndex, setPhotoIndex] = useState(0);
  useEffect(() => {
    if (photos.length <= 1) return;
    const id = setInterval(() => setPhotoIndex((i) => (i + 1) % photos.length), 3000);
    return () => clearInterval(id);
  }, [photos.length]);

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } } as const;
  const itemUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { type: "spring", damping: 20 } } } as const;

  const stableSeed = useMemo(() => hashString(`${PROFILE.name}|${PROFILE.photoUrl}`), []);
  const flip = (stableSeed & 1) === 0;
  const glowBg = flip
    ? "radial-gradient(60% 60% at 50% 40%, rgba(56,189,248,0.4), transparent), radial-gradient(40% 40% at 30% 80%, rgba(168,85,247,0.35), transparent)"
    : "radial-gradient(60% 60% at 50% 40%, rgba(129,140,248,0.45), transparent), radial-gradient(40% 40% at 30% 80%, rgba(34,211,238,0.35), transparent)";

  return (
    <main
      className="
        relative min-h-screen w-screen overflow-hidden
        bg-gradient-to-b from-background to-background/60
        mx-[calc(50%-50vw)]
      "
      style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--foreground)/0.06) 1px, transparent 0)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* Decorative blobs */}
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

      {/* Content wrapper */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-6 grid md:grid-cols-2 gap-10 items-center pt-24 md:pt-36 pb-16">
        {/* Left: Text */}
        <motion.section variants={container} initial="hidden" animate="show" className="order-2 md:order-1">
          <div className="max-w-xl">
            <motion.h1 variants={itemUp} className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">{PROFILE.name}</span>
            </motion.h1>

            <motion.p variants={itemUp} className="mt-3 text-lg md:text-xl text-muted-foreground">
              {PROFILE.role}
            </motion.p>

            {/* Dynamic phrases */}
            <div className="mt-6 h-8 md:h-10 relative" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.p key={index} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }} className="text-base md:text-lg text-foreground/80">
                  {phrases[index]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* CTA */}
            <motion.div variants={itemUp} className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={PROFILE.links.contact}
                className="group inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm md:text-base font-medium shadow-sm border bg-primary text-primary-foreground hover:shadow-md hover:translate-y-[-1px] transition-all"
                aria-label="Hubungi saya"
              >
                Hubungi Saya
                <ArrowRight className="size-4 md:size-5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </motion.div>

            {/* Tech stack (marquee kanan → kiri) */}
            <motion.div variants={itemUp} className="mt-8">
              <p className="text-xs font-medium text-foreground/70 mb-3">Tech stack</p>
              <TechMarquee items={TECHS} />
            </motion.div>
          </div>
        </motion.section>

        {/* Right: Photo */}
        <section className="order-1 md:order-2 relative flex items-center justify-center">
          <motion.div initial={{ opacity: 0, scale: 0.95, rotate: -2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ type: "spring", damping: 20 }} whileHover={{ y: -4 }} className="relative">
            <div className="relative rounded-3xl p-1 bg-gradient-to-tr from-indigo-500/70 via-cyan-400/70 to-violet-500/70 shadow-xl">
              <div className="rounded-2xl overflow-hidden bg-background">
                <div className="relative h-[360px] w-[280px] md:h-[480px] md:w-[360px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={photos[photoIndex]}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <Image src={photos[photoIndex]} alt={`Foto ${PROFILE.name}`} fill priority={photoIndex === 0} sizes="(min-width: 768px) 360px, 280px" className="object-cover" style={{ objectPosition: "center 20%" }} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Glow belakang frame */}
            <motion.div
              aria-hidden
              className="absolute inset-0 -z-10 blur-2xl opacity-40"
              style={{ backgroundImage: glowBg }}
              animate={reduce ? {} : { opacity: [0.35, 0.55, 0.35] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
          </motion.div>
        </section>
      </div>
    </main>
  );
}

/* ========= Tech Marquee ========= */
function TechMarquee({
  items,
  speed = 22, // detik
}: {
  items: ReadonlyArray<{ icon: SimpleIcon; href: string }>;
  speed?: number;
}) {
  const reduce = useReducedMotion();

  const trackStyle: CSSVars | undefined = reduce ? undefined : { ["--speed"]: `${speed}s` };

  return (
    <div className="relative overflow-hidden rounded-xl border bg-background/60">
      {/* track 2x supaya loop mulus */}
      <div
        className={`flex w-max gap-2 py-2 px-2 ${reduce ? "" : "marquee"}`}
        style={trackStyle}
        onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
          if (!reduce) e.currentTarget.style.animationPlayState = "paused";
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
          if (!reduce) e.currentTarget.style.animationPlayState = "running";
        }}
      >
        {[...items, ...items].map((t, i) => {
          const brandStyle: CSSVars = { ["--brand"]: `#${t.icon.hex}` };
          return (
            <a
              key={`${t.icon.slug}-${i}`}
              href={t.href}
              target="_blank"
              rel="noreferrer"
              aria-label={t.icon.title}
              style={brandStyle}
              className={[
                "group inline-grid place-items-center w-10 h-10 rounded-lg border bg-background",
                "text-foreground/60 transition-all",
                "hover:text-[var(--brand)] hover:border-[var(--brand)] hover:bg-[var(--brand)]/10",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/50",
              ].join(" ")}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" role="img" aria-hidden="true" className="transition-colors">
                <path d={t.icon.path} fill="currentColor" />
              </svg>
              <span className="sr-only">{t.icon.title}</span>
            </a>
          );
        })}
      </div>

      {/* fade kiri/kanan */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-background to-transparent" />

      {/* keyframes global */}
      <style jsx global>{`
        @keyframes _marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .marquee {
          animation: _marquee var(--speed, 22s) linear infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
