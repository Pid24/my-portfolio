"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Search } from "lucide-react";
import { PROJECTS, type Project } from "@/data/projects";

type Props = {
  initialProjects?: Project[];
  pageTitle?: string;
  pageSubtitle?: string;
};

type SortMode = "recent" | "az";

// util kecil: ambil angka tahun pertama dari period, mis. "2023", "2023–2024"
function yearOf(p?: string) {
  if (!p) return 0;
  const m = p.match(/\d{4}/);
  return m ? parseInt(m[0], 10) : 0;
}

export default function ProjectsSection({ initialProjects = PROJECTS, pageTitle = "Projects", pageSubtitle = "Filter berdasarkan Tech Stack. Cari proyek atau stack favoritmu." }: Props) {
  const reduce = useReducedMotion();

  // derive stacks unik (alfabet)
  const stacks = useMemo(() => {
    const set = new Set<string>();
    initialProjects.forEach((p) => p.stack.forEach((s) => set.add(s)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [initialProjects]);

  // state
  const [query, setQuery] = useState("");
  const [activeStacks, setActiveStacks] = useState<Set<string>>(new Set());
  const [sortMode, setSortMode] = useState<SortMode>("recent");
  const [visible, setVisible] = useState(6);

  // reset pagination saat filter/search/sort berubah
  useEffect(() => setVisible(6), [query, activeStacks, sortMode]);

  // filtering
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    // filter text + stack (OR untuk stack)
    const res = initialProjects.filter((p) => {
      const passQuery = q.length === 0 || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.stack.join(" ").toLowerCase().includes(q);

      const passStacks = activeStacks.size === 0 || p.stack.some((s) => activeStacks.has(s)); // OR

      return passQuery && passStacks;
    });

    // sorting
    if (sortMode === "recent") {
      res.sort((a, b) => yearOf(b.period) - yearOf(a.period) || a.title.localeCompare(b.title));
    } else {
      res.sort((a, b) => a.title.localeCompare(b.title));
    }

    return res;
  }, [initialProjects, query, activeStacks, sortMode]);

  const shown = filtered.slice(0, visible);

  // animasi
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: reduce ? 0 : 0.06 } },
  } as const;

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", damping: 20, duration: reduce ? 0 : undefined } },
  } as const;

  // toggle chip stack
  function toggleStack(s: string) {
    setActiveStacks((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });
  }

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
      aria-labelledby="projects-heading"
    >
      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-6 py-12 md:py-16">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 id="projects-heading" className="text-2xl md:text-3xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">{pageTitle}</span>
          </h1>
          <p className="mt-2 text-sm text-foreground/70">{pageSubtitle}</p>
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
          {/* Chips Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {stacks.map((s) => {
              const active = activeStacks.has(s);
              return (
                <button
                  key={s}
                  onClick={() => toggleStack(s)}
                  className={["rounded-xl border px-3 py-1.5 text-sm transition-all", active ? "border-primary/30 bg-primary/10 text-primary" : "border-foreground/10 hover:bg-foreground/5 text-foreground/80"].join(" ")}
                  aria-pressed={active}
                >
                  {s}
                </button>
              );
            })}
            {activeStacks.size > 0 && (
              <button onClick={() => setActiveStacks(new Set())} className="rounded-xl border px-3 py-1.5 text-sm text-foreground/70 hover:bg-foreground/5">
                Reset
              </button>
            )}
          </div>

          {/* Search + Sort */}
          <div className="md:ml-auto flex items-center gap-2">
            <label className="group relative block">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/50" />
              <input
                value={query}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                placeholder="Cari proyek / stack…"
                className="pl-10 pr-3 h-10 w-full md:w-72 rounded-xl border bg-background placeholder:text-foreground/50"
                aria-label="Search projects"
              />
              <span className="sr-only">Search projects</span>
            </label>

            <select value={sortMode} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortMode(e.target.value as SortMode)} className="h-10 rounded-xl border bg-background px-3 text-sm" aria-label="Urutkan">
              <option value="recent">Terbaru</option>
              <option value="az">A-Z</option>
            </select>
          </div>
        </div>

        {/* Count */}
        <div className="mb-4 text-sm text-foreground/60">
          Menampilkan <strong>{shown.length}</strong> dari <strong>{filtered.length}</strong> proyek
          {activeStacks.size > 0 || query ? " (hasil filter)" : ""}.
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border p-8 text-center text-foreground/70">Tidak ada hasil. Coba hapus filter atau ubah kata kunci.</div>
        ) : (
          <>
            <motion.ul variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {shown.map((p) => (
                <motion.li key={p.slug} variants={item}>
                  <article className="group relative h-full overflow-hidden rounded-2xl border bg-background/60">
                    {/* cover */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={p.cover} alt={p.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" priority={false} />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* body */}
                    <div className="p-4 md:p-5">
                      <h3 className="text-base md:text-lg font-semibold tracking-tight">{p.title}</h3>
                      <p className="mt-1 text-sm text-foreground/70 line-clamp-2">{p.excerpt}</p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {p.stack.slice(0, 5).map((s) => (
                          <span key={s} className="rounded-lg border px-2 py-0.5 text-[11px] text-foreground/70">
                            {s}
                          </span>
                        ))}
                        {p.stack.length > 5 && <span className="text-[11px] text-foreground/50">+{p.stack.length - 5}</span>}
                      </div>
                    </div>

                    {/* hover ring */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-indigo-400/0 group-hover:ring-2 group-hover:ring-indigo-400/30 transition-all" />
                  </article>
                </motion.li>
              ))}
            </motion.ul>

            {/* Load more */}
            {visible < filtered.length && (
              <div className="mt-8 flex justify-center">
                <button onClick={() => setVisible((v) => v + 6)} className="rounded-xl border px-4 py-2 text-sm hover:bg-foreground/5 transition">
                  Lihat lebih banyak
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
