"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PROJECTS } from "@/data/projects";

// Ambil angka tahun pertama dari string period, mis. "2024", "2023–2024", "2025/ongoing"
function yearOf(p?: string) {
  if (!p) return 0;
  const m = p.match(/\d{4}/);
  return m ? parseInt(m[0], 10) : 0;
}

export default function ProjectsHighlight() {
  // Sorting helper: terbaru dulu; tie-breaker judul biar stabil
  const sortByRecent = (a: (typeof PROJECTS)[number], b: (typeof PROJECTS)[number]) => yearOf(b.period) - yearOf(a.period) || a.title.localeCompare(b.title);

  // Jika semua period gagal diparse (semua 0), fallback ke urutan dibalik
  const hasValidYear = PROJECTS.some((p) => yearOf(p.period) > 0);
  const latest = hasValidYear ? [...PROJECTS].sort(sortByRecent) : [...PROJECTS].reverse();

  // Ambil 3 terbaru
  const cards = latest.slice(0, 3);

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
      aria-labelledby="latest-projects"
    >
      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-6 py-12 md:py-16">
        <div className="mb-6 md:mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 id="latest-projects" className="text-2xl md:text-3xl font-bold tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">Latest Projects</span>
            </h2>
            <p className="mt-2 text-sm text-foreground/70">Tiga proyek paling baru.</p>
          </div>

          <Link href="/projects" className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-foreground/5 transition">
            Lihat semua projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <motion.ul variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10% 0% -10% 0%" }} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {cards.map((p) => (
            <motion.li key={p.slug} variants={item}>
              <article className="group relative h-full overflow-hidden rounded-2xl border bg-background/60">
                {/* cover */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={p.cover} alt={p.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* body */}
                <div className="p-4 md:p-5">
                  <h3 className="text-base md:text-lg font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-1 text-sm text-foreground/70 line-clamp-2">{p.excerpt}</p>

                  {/* badges */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 4).map((s) => (
                      <span key={s} className="rounded-lg border px-2 py-0.5 text-[11px] text-foreground/70">
                        {s}
                      </span>
                    ))}
                    {p.stack.length > 4 && <span className="text-[11px] text-foreground/50">+{p.stack.length - 4}</span>}
                  </div>
                </div>

                {/* hover ring */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-indigo-400/0 group-hover:ring-2 group-hover:ring-indigo-400/30 transition-all" />
              </article>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
