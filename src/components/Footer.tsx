"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

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
          className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/60 to-transparent"
          style={{ backgroundSize: "200% 100%" }}
          animate={reduce ? undefined : { backgroundPositionX: ["0%", "200%", "0%"] }}
          transition={reduce ? undefined : { duration: 6, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* blobs */}
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

      {/* content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-6 py-12 md:py-16">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>

        {/* brand */}
        <div className="flex flex-col items-center text-center">
          <div>
            <p className="text-lg font-serif tracking-tight text-foreground">Rofid Nasif Annafie</p>
            <p className="mt-2 text-sm text-foreground/70">Building reliable digital products, from architecture to pixel-perfect interfaces.</p>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-10 flex flex-col-reverse items-center justify-between gap-4 border-t border-foreground/10 pt-6 text-sm md:flex-row">
          <p className="text-foreground/60">
            © {year} <span className="font-medium">Rofid Nasif Annafie</span> • All rights reserved.
          </p>

          <AnimatePresence>
            {showTop && (
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
