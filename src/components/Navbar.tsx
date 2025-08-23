"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, useScroll, LayoutGroup } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  // { label: "Blog", href: "/blog" }, // dihapus
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Gate: render setelah client mount (hindari hydration mismatch)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Placeholder sebelum mounted agar layout stabil
  if (!mounted) {
    return (
      <>
        <motion.div className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-indigo-500 via-cyan-400 to-violet-500" />
        <header className="sticky top-0 z-50 h-16 w-screen mx-[calc(50%-50vw)] bg-background/30" />
      </>
    );
  }

  return (
    <>
      {/* progress bar atas */}
      <motion.div className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-indigo-500 via-cyan-400 to-violet-500" style={{ scaleX: scrollYProgress }} />

      <header
        className={[
          "sticky top-0 z-50 w-screen mx-[calc(50%-50vw)]",
          "supports-[backdrop-filter]:backdrop-blur transition-colors",
          scrolled ? "bg-background/70 border-b border-foreground/10 shadow-[0_8px_24px_-20px_rgba(0,0,0,0.4)]" : "bg-background/30",
        ].join(" ")}
        role="banner"
      >
        <div className="relative mx-auto h-16 max-w-5xl px-4 md:px-6 flex items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" className="inline-flex items-center">
            <span className="text-lg md:text-xl font-semibold tracking-tight bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent">Rofid</span>
          </Link>

          {/* Right: Theme toggle + Mobile toggle */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button className="md:hidden inline-flex items-center justify-center rounded-xl border px-3 py-2 text-sm" aria-expanded={open} aria-controls="mobile-nav" aria-label="Toggle menu" onClick={() => setOpen((s) => !s)}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Center nav: benar-benar center viewport */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden md:block -translate-x-1/2 -translate-y-1/2">
            <div className="pointer-events-auto">
              <DesktopNav pathname={pathname} />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-40 bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.2 }} aria-hidden onClick={() => setOpen(false)} />
            <motion.nav
              id="mobile-nav"
              role="navigation"
              aria-label="Mobile"
              className="fixed left-0 right-0 top-0 z-50 origin-top rounded-b-2xl border-b border-foreground/10 bg-background/95 supports-[backdrop-filter]:backdrop-blur"
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            >
              {/* Theme toggle di sheet */}
              <div className="flex justify-end px-4 pt-3 pb-1">
                <ThemeToggle />
              </div>

              <ul className="mx-auto max-w-5xl px-4 md:px-6 pb-4 flex flex-col gap-1">
                {NAV_ITEMS.map((item, i) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <motion.li key={item.href} initial={{ x: -8, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -8, opacity: 0 }} transition={{ delay: (reduce ? 0 : 0.035) * i }}>
                      <Link href={item.href} className={["block rounded-xl px-3 py-3 text-base border transition-colors", active ? "bg-primary/10 text-primary border-primary/20" : "border-transparent hover:bg-foreground/5"].join(" ")}>
                        {item.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ================== subcomponents ================== */

function DesktopNav({ pathname }: { pathname: string }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const reduce = useReducedMotion();

  return (
    <LayoutGroup id="nav">
      <ul className="relative flex items-center gap-4 md:gap-6">
        {NAV_ITEMS.map((item) => {
          const active = isActive(pathname, item.href);
          const isShown = hovered === item.href || active;

          return (
            <li key={item.href} className="relative" onMouseEnter={() => setHovered(item.href)} onMouseLeave={() => setHovered(null)}>
              {/* shared moving pill — initial={false} agar SSR/CSR konsisten */}
              {isShown && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-xl border border-foreground/10 bg-foreground/[0.06]" transition={{ type: "spring", stiffness: 380, damping: 30 }} initial={false} />}

              <Link href={item.href} className="group relative inline-flex items-center rounded-xl px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors" aria-current={active ? "page" : undefined}>
                <span className="relative">
                  {item.label}
                  {isShown && <motion.span layoutId="nav-underline" className="absolute -bottom-1 left-0 h-[2px] w-full rounded bg-gradient-to-r from-indigo-500 to-cyan-400" initial={false} transition={{ duration: reduce ? 0 : 0.18 }} />}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </LayoutGroup>
  );
}

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}
