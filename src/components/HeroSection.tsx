"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";

type CSSVars = React.CSSProperties & { ["--speed"]?: string };

const PROFILE = {
  name: "Rofid Nasif Annafie",
  role: "Quality Assurance Engineer",
  phrases: [
    "Ensuring software quality through precision testing",
    "Manual Testing · API Automation · Bug Reporting",
    "Finding bugs before your users do",
  ],
  photoUrl: "/images/pid.jpg",
  photos: ["/images/pid.jpg"],
  links: { github: "https://github.com/Pid24", linkedin: "https://www.linkedin.com/in/rofid/", cv: "/docs/pid-cv.pdf", contact: "#contact" },
} as const;

const QA_TOOLS: ReadonlyArray<string> = [
  "Postman",
  "Manual Testing",
  "API Testing",
  "Black-Box Testing",
  "Bug Reporting",
  "Test Cases",
  "GitHub",
  "JavaScript",
  "SDLC",
  "Regression Testing",
];

function hashString(s: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function HeroSection() {
  const reduce = useReducedMotion();

  const phrases = useMemo(() => (PROFILE.phrases?.length ? PROFILE.phrases : ["Build modern & responsive web"]), []);
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
    ? "radial-gradient(60% 60% at 50% 40%, rgba(245,158,11,0.35), transparent), radial-gradient(40% 40% at 30% 80%, rgba(20,184,166,0.30), transparent)"
    : "radial-gradient(60% 60% at 50% 40%, rgba(200,230,63,0.30), transparent), radial-gradient(40% 40% at 30% 80%, rgba(245,158,11,0.25), transparent)";

  return (
    <main
      className="relative w-full overflow-hidden bg-gradient-to-b from-background to-background/60"
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

      {/* wrapper */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center place-items-center md:place-items-start pt-24 md:pt-32 pb-14">
        {/* text */}
        <motion.section variants={container} initial="hidden" animate="show" className="order-1 w-full">
          <div className="max-w-xl">
            <motion.h1 variants={itemUp} className="text-3xl sm:text-4xl lg:text-6xl font-serif leading-tight tracking-tight">
              <span className="text-foreground">{PROFILE.name}</span>
            </motion.h1>

            <motion.p variants={itemUp} className="mt-2 text-base sm:text-lg text-muted-foreground">
              {PROFILE.role}
            </motion.p>

            <div className="mt-4 h-7 sm:h-8 relative" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.p key={index} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }} className="text-sm sm:text-base text-foreground/80">
                  {phrases[index]}
                </motion.p>
              </AnimatePresence>
            </div>

            <motion.div variants={itemUp} className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={PROFILE.links.contact}
                className="group inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold shadow-sm border-2 border-foreground bg-accent text-foreground hover:shadow-md hover:translate-y-[-1px] transition-all"
                aria-label="Hubungi saya"
              >
                Hubungi Saya
              </a>
            </motion.div>

            <motion.div variants={itemUp} className="mt-7 w-full">
              <p className="text-xs font-medium text-foreground/70 mb-2">QA Ecosystem</p>
              <QaMarquee items={QA_TOOLS} />
            </motion.div>
          </div>
        </motion.section>

        {/* photo — circular with decorative assets */}
        <section className="order-2 w-full flex items-center justify-center md:justify-end">
          <motion.div initial={{ opacity: 0, scale: 0.98, rotate: -1 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ type: "spring", damping: 20 }} whileHover={{ y: -3 }} className="relative mx-auto md:mx-0">
            {/* circular photo */}
            <div className="relative rounded-full p-[6px] bg-gradient-to-tr from-amber-500/60 via-accent/60 to-teal-500/60 shadow-xl mx-auto">
              <div className="rounded-full overflow-hidden bg-background">
                <div className="relative aspect-square w-[260px] sm:w-[280px] md:w-[320px] mx-auto">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={photos[photoIndex]}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 0.985 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.015 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                    >
                      <Image
                        src={photos[photoIndex]}
                        alt={`Foto ${PROFILE.name}`}
                        fill
                        priority={photoIndex === 0}
                        sizes="(min-width:1024px) 320px, (min-width:640px) 280px, 260px"
                        className="object-cover"
                        style={{ objectPosition: "center 20%" }}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* decorative asset: cross/plus — top right */}
            <motion.div
              aria-hidden
              className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-10 h-10 md:w-12 md:h-12"
              animate={reduce ? {} : { rotate: [0, 90, 0] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            >
              <Image src="/images/asset-2.png" alt="" fill className="object-contain dark:invert" />
            </motion.div>

            {/* decorative asset: lines — bottom right */}
            <motion.div
              aria-hidden
              className="absolute -bottom-2 -right-6 md:-bottom-4 md:-right-8 w-16 h-10 md:w-20 md:h-12"
              animate={reduce ? {} : { y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <Image src="/images/asset-1.png" alt="" fill className="object-contain dark:invert" />
            </motion.div>

            <motion.div
              aria-hidden
              className="absolute inset-0 -z-10 blur-2xl opacity-35 rounded-full"
              style={{ backgroundImage: glowBg }}
              animate={reduce ? {} : { opacity: [0.3, 0.55, 0.3] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
          </motion.div>
        </section>
      </div>
    </main>
  );
}

/* ========= QA Tools Marquee ========= */
function QaMarquee({ items, speed = 28 }: { items: ReadonlyArray<string>; speed?: number }) {
  const reduce = useReducedMotion();
  const trackStyle: CSSVars | undefined = reduce ? undefined : { ["--speed"]: `${speed}s` };

  return (
    <div
      className="relative overflow-hidden rounded-xl border bg-background/60"
      style={{
        WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className={`flex w-max gap-2 py-2 px-2 ${reduce ? "" : "marquee"}`}
        style={trackStyle}
        onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
          if (!reduce) e.currentTarget.style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          if (!reduce) (e.currentTarget as HTMLDivElement).style.animationPlayState = "running";
        }}
      >
        {[...items, ...items].map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="inline-flex items-center h-10 rounded-lg border bg-background px-3 text-xs font-medium text-foreground/70 whitespace-nowrap select-none"
          >
            {label}
          </span>
        ))}
      </div>

      <style jsx global>{`
        @keyframes _marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee {
          animation: _marquee var(--speed, 28s) linear infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
