"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, BookOpen } from "lucide-react";
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

// cek apakah external (biar bisa open in new tab + rel proper)
function isExternalUrl(href: string) {
  return /^https?:\/\//i.test(href) || href.startsWith("//");
}

export default function ProjectsSection({ initialProjects = PROJECTS, pageTitle = "Projects", pageSubtitle = "Cari proyek atau urutkan sesuai kebutuhan." }: Props) {
  const reduce = useReducedMotion();

  // state
  const [query, setQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("recent");
  const [visible, setVisible] = useState(6);

  // reset pagination saat search/sort berubah
  useEffect(() => setVisible(6), [query, sortMode]);

  // filtering & sorting
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    // buat indexed array agar bisa pakai index sebagai tiebreaker
    const indexed = initialProjects.map((p, i) => ({ p, i }));

    const res = indexed.filter(({ p }) => {
      return q.length === 0 || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.stack.join(" ").toLowerCase().includes(q);
    });

    // sorting
    if (sortMode === "recent") {
      // urutkan berdasarkan tahun (terbaru), tiebreaker: index terbesar = ditambahkan paling akhir = paling baru
      res.sort((a, b) => yearOf(b.p.period) - yearOf(a.p.period) || b.i - a.i);
    } else {
      res.sort((a, b) => a.p.title.localeCompare(b.p.title));
    }

    return res.map(({ p }) => p);
  }, [initialProjects, query, sortMode]);

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
          <h1 id="projects-heading" className="text-2xl md:text-3xl font-serif tracking-tight">
            <span className="text-foreground">{pageTitle}</span>
          </h1>
          <p className="mt-2 text-sm text-foreground/70">{pageSubtitle}</p>
        </div>

        {/* Controls: Search + Sort */}
        <div className="mb-6 flex items-center gap-2">
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

        {/* Count */}
        <div className="mb-4 text-sm text-foreground/60">
          Menampilkan <strong>{shown.length}</strong> dari <strong>{filtered.length}</strong> proyek
          {query ? " (hasil pencarian)" : ""}.
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border p-8 text-center text-foreground/70">Tidak ada hasil. Coba hapus filter atau ubah kata kunci.</div>
        ) : (
          <>
            <motion.ul variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {shown.map((p, i) => {
                return (
                  <motion.li key={p.slug} variants={item}>
                    <article className="group relative h-full overflow-hidden rounded-2xl border bg-background/60">
                      {/* cover */}
                      <Link href={`/projects/${p.slug}`} className="block relative aspect-[16/10] overflow-hidden">
                        <Image src={p.cover} alt={p.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" priority={i < 2} />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>

                      {/* body */}
                      <div className="p-4 md:p-5">
                        <Link href={`/projects/${p.slug}`} className="hover:underline decoration-foreground/30 underline-offset-2">
                          <h3 className="text-base md:text-lg font-semibold tracking-tight">{p.title}</h3>
                        </Link>
                        <p className="mt-1 text-sm text-foreground/70 line-clamp-2">{p.excerpt}</p>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {p.stack.slice(0, 5).map((s) => (
                            <span key={s} className="rounded-lg border px-2 py-0.5 text-[11px] text-foreground/70">
                              {s}
                            </span>
                          ))}
                          {p.stack.length > 5 && <span className="text-[11px] text-foreground/50">+{p.stack.length - 5}</span>}
                        </div>

                        {/* CTA Links */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Link
                            href={`/projects/${p.slug}`}
                            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-accent/30 bg-accent/10 text-foreground px-3 py-2 text-sm font-medium hover:bg-accent/20 transition"
                          >
                            <BookOpen className="h-3.5 w-3.5" />
                            Detail
                          </Link>
                          {p.links?.live && p.links.live !== "#" && (
                            <a
                              href={p.links.live}
                              target={isExternalUrl(p.links.live) ? "_blank" : undefined}
                              rel={isExternalUrl(p.links.live) ? "noopener noreferrer" : undefined}
                              className="inline-flex items-center justify-center rounded-xl border px-3 py-2 text-sm font-medium hover:bg-foreground/5 transition"
                              aria-label={`Open live preview for ${p.title}`}
                            >
                              Live
                            </a>
                          )}
                          {p.links?.youtube && (
                            <a
                              href={p.links.youtube}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-500 px-3 py-2 text-sm font-medium hover:bg-red-500/20 transition"
                              aria-label={`Watch demo for ${p.title}`}
                            >
                              Demo Video
                            </a>
                          )}
                          {p.links?.github && (
                            <a
                              href={p.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center rounded-xl border px-3 py-2 text-sm font-medium hover:bg-foreground/5 transition"
                              aria-label={`View source code for ${p.title}`}
                            >
                              Source Code
                            </a>
                          )}
                        </div>
                      </div>

                      {/* hover ring */}
                      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-accent/0 group-hover:ring-2 group-hover:ring-accent/30 transition-all" />
                    </article>
                  </motion.li>
                );
              })}
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
