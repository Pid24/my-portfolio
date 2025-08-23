"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Instagram, Twitter, Github, Linkedin, Facebook, ArrowUp } from "lucide-react";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/piddddz/", Icon: Instagram, hex: "#E4405F" },
  { label: "Twitter", href: "https://x.com/rfdzna", Icon: Twitter, hex: "#1DA1F2" },
  { label: "GitHub", href: "https://github.com/Pid24", Icon: Github, hex: "#181717" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rofid/", Icon: Linkedin, hex: "#0A66C2" },
  { label: "Facebook", href: "https://www.facebook.com/rofidnasif.annafie.14/", Icon: Facebook, hex: "#1877F2" },
] as const;

export default function Footer({ year }: { year: number }) {
  const reduce = useReducedMotion();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer
      className="relative w-screen mx-[calc(50%-50vw)] overflow-hidden bg-gradient-to-b from-background to-background/60"
      style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--foreground)/0.06) 1px, transparent 0)",
        backgroundSize: "24px 24px",
      }}
      aria-labelledby="footer-heading"
    >
      {/* top gradient divider */}
      <div className="relative h-px w-full overflow-hidden">
        <motion.span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent"
          style={{ backgroundSize: "200% 100%" }}
          animate={reduce ? undefined : { backgroundPositionX: ["0%", "200%", "0%"] }}
          transition={reduce ? undefined : { duration: 6, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-25"
        style={{ backgroundImage: "conic-gradient(from 180deg at 50% 50%, #8b5cf6, #22d3ee, #60a5fa, #8b5cf6)" }}
        animate={reduce ? {} : { y: [0, -16, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full blur-3xl opacity-20"
        style={{ backgroundImage: "radial-gradient(closest-side, rgba(99,102,241,0.55), transparent)" }}
        animate={reduce ? {} : { y: [0, 14, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
      />

      {/* content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-6 py-12 md:py-16">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>

        {/* brand + socials (2 kolom, konsisten) */}
        <div className="grid gap-10 md:grid-cols-2 md:gap-12 items-start">
          <div>
            <p className="text-lg font-semibold tracking-tight bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent">Rofid Nasif Annafie</p>
            <p className="mt-2 text-sm text-foreground/70">Laravel-first engineer. E-commerce, landing page, & payment gateway dengan performa dan UX yang rapi.</p>
          </div>

          <div className="md:justify-self-end">
            <p className="text-sm font-medium text-foreground/70 mb-3">Find me</p>
            <ul className="flex flex-wrap items-center gap-2">
              {socials.map(({ label, href, Icon, hex }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    style={{ ["--brand" as any]: hex }}
                    className={[
                      "group inline-grid place-items-center w-10 h-10 rounded-xl border",
                      "text-foreground/60 transition-all",
                      "hover:text-[var(--brand)] hover:border-[var(--brand)] hover:bg-[var(--brand)]/10",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/50",
                      "hover:translate-y-[-1px] hover:shadow-sm",
                    ].join(" ")}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-10 flex flex-col-reverse items-center justify-between gap-4 border-t border-foreground/10 pt-6 text-sm md:flex-row">
          <p className="text-foreground/60">
            © {year} <span className="font-medium">Rofid Nasif Annafie</span> • All rights reserved.
          </p>

          <AnimatePresence>
            {true && ( // tombol muncul kondisional via state; initial SSR = false -> sama dengan client
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-foreground/5 transition-colors"
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 8, opacity: 0 }}
              >
                <ArrowUp className="h-4 w-4" />
                Back to top
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </footer>
  );
}
