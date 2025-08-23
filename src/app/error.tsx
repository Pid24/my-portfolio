"use client";

import Link from "next/link";
import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    // bisa kirim ke logger/analytics di sini
    console.error(error);
  }, [error]);

  return (
    <main
      className="
        relative min-h-[calc(100vh-4rem)] w-screen mx-[calc(50%-50vw)]
        overflow-hidden bg-gradient-to-b from-background to-background/60
        pt-12 md:pt-16
      "
      style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--foreground)/0.06) 1px, transparent 0)",
        backgroundSize: "24px 24px",
      }}
      role="alert"
      aria-live="assertive"
    >
      {/* blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl opacity-30"
        style={{ backgroundImage: "conic-gradient(from 180deg at 50% 50%, #8b5cf6, #22d3ee, #60a5fa, #8b5cf6)" }}
        animate={reduce ? {} : { rotate: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-25"
        style={{ backgroundImage: "radial-gradient(closest-side, rgba(99,102,241,0.55), transparent)" }}
        animate={reduce ? {} : { y: [0, -16, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />

      {/* content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-6 py-12 md:py-20 grid place-items-center text-center">
        {/* glitchy title */}
        <div className="relative inline-block">
          <motion.h1 className="text-3xl md:text-5xl font-extrabold tracking-tight" initial={reduce ? {} : { y: -8, opacity: 0 }} animate={reduce ? {} : { y: 0, opacity: 1 }} transition={{ type: "spring", damping: 18 }}>
            Something went wrong
          </motion.h1>

          {/* glitch layers */}
          {!reduce && (
            <>
              <motion.span
                aria-hidden
                className="absolute inset-0 -z-10 text-3xl md:text-5xl font-extrabold tracking-tight text-indigo-500/50"
                animate={{ x: [-1, 1, -1] }}
                transition={{ duration: 0.22, repeat: Infinity, repeatType: "reverse" }}
              >
                Something went wrong
              </motion.span>
              <motion.span
                aria-hidden
                className="absolute inset-0 -z-10 text-3xl md:text-5xl font-extrabold tracking-tight text-cyan-400/60"
                animate={{ x: [1, -1, 1] }}
                transition={{ duration: 0.27, repeat: Infinity, repeatType: "reverse" }}
              >
                Something went wrong
              </motion.span>
            </>
          )}
        </div>

        <p className="mt-3 text-foreground/70 max-w-xl">Maaf, terjadi kendala saat memuat halaman ini. Kamu bisa coba memuat ulang atau kembali ke beranda.</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button onClick={reset} className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm md:text-base font-medium shadow-sm border bg-primary text-primary-foreground hover:shadow-md hover:translate-y-[-1px] transition-all">
            Coba lagi
          </button>
          <Link href="/" className="inline-flex items-center rounded-2xl px-5 py-3 text-sm md:text-base font-medium border hover:bg-foreground/5 transition-colors">
            Kembali ke Beranda
          </Link>
        </div>

        {error?.digest && (
          <p className="mt-6 text-xs text-foreground/50 select-all">
            Error ID: <span className="font-mono">{error.digest}</span>
          </p>
        )}
      </div>
    </main>
  );
}
