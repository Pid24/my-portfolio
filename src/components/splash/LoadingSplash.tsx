"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function LoadingSplash() {
  const reduce = useReducedMotion();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-background" role="status" aria-live="polite" aria-busy="true">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--foreground)/0.05) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <motion.div
        aria-hidden
        className="absolute -top-20 -right-10 h-[40rem] w-[40rem] rounded-[40%] blur-3xl opacity-30"
        style={{ background: "conic-gradient(from 180deg at 50% 50%, #8b5cf6, #22d3ee, #60a5fa, #8b5cf6)" }}
        animate={reduce ? undefined : { rotate: [0, 20, 0], borderRadius: ["40% 60% 55% 45% / 45% 45% 55% 55%", "60% 40% 45% 55% / 50% 60% 40% 50%", "40% 60% 55% 45% / 45% 45% 55% 55%"], scale: [1, 1.05, 1] }}
        transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-24 -left-16 h-[36rem] w-[36rem] rounded-[45%] blur-3xl opacity-25"
        style={{ background: "radial-gradient(closest-side, rgba(99,102,241,0.45), transparent)" }}
        animate={reduce ? undefined : { y: [0, 24, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
      />
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-6">
        <div className="relative h-32 w-32">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500/40 to-cyan-400/40 p-[2px] shadow-[0_0_50px_-10px_rgba(99,102,241,0.45)]">
            <div className="h-full w-full rounded-full bg-background/70 backdrop-blur-md ring-1 ring-foreground/10" />
          </div>
          <motion.div aria-hidden className="absolute inset-0" style={{ transformOrigin: "50% 50%" }} animate={reduce ? undefined : { rotate: [0, 360] }} transition={{ duration: 12, ease: "linear", repeat: Infinity }}>
            <div className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_12px_2px_rgba(99,102,241,0.5)]" style={{ transform: "translate(-50%, -50%) translateX(56px)" }} />
          </motion.div>
          <motion.div aria-hidden className="absolute inset-0" style={{ transformOrigin: "50% 50%" }} animate={reduce ? undefined : { rotate: [0, -360] }} transition={{ duration: 18, ease: "linear", repeat: Infinity }}>
            <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_2px_rgba(34,211,238,0.45)]" style={{ transform: "translate(-50%, -50%) translateX(44px)" }} />
          </motion.div>
          <motion.div aria-hidden className="absolute inset-0" style={{ transformOrigin: "50% 50%" }} animate={reduce ? undefined : { rotate: [0, 360] }} transition={{ duration: 24, ease: "linear", repeat: Infinity }}>
            <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_8px_2px_rgba(96,165,250,0.45)]" style={{ transform: "translate(-50%, -50%) translateX(32px)" }} />
          </motion.div>
          <div className="absolute inset-0 grid place-items-center">
            <div className="h-3 w-3 rounded-full bg-foreground/70" />
          </div>
        </div>
        <motion.p className="text-sm text-foreground/70" initial={reduce ? false : { opacity: 0.5 }} animate={reduce ? undefined : { opacity: [0.5, 1, 0.5] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
          Loading…
        </motion.p>
      </div>
    </div>
  );
}
