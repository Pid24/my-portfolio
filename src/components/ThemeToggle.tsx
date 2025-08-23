"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // hindari hydration mismatch
  if (!mounted) {
    return <span className="inline-block w-9 h-9 rounded-xl border" aria-hidden />;
  }

  const isDark = (theme === "system" ? resolvedTheme : theme) === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      title="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={["relative inline-flex items-center justify-center", "w-9 h-9 rounded-xl border", "transition-all hover:translate-y-[-1px] hover:shadow-sm", "bg-background"].join(" ")}
    >
      <AnimatePresence initial={false} mode="wait">
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="grid place-items-center"
          >
            <Moon className="w-5 h-5" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="grid place-items-center"
          >
            <Sun className="w-5 h-5" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
