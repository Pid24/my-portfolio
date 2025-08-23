"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Smartphone, Clipboard, Check, QrCode, MessageSquare, ExternalLink } from "lucide-react";

const PHONE = "6281234567890"; // ⬅️ GANTI: nomor WhatsApp kamu tanpa '+'

// Chips
const PROJECT_TYPES = ["E-commerce", "Landing Page", "Company Profile", "Marketplace", "Lainnya"] as const;
const BUDGETS = ["500rb–1jt", "1–3jt", "3–5jt", "5–10jt", "10jt++", "Diskusikan dulu"] as const;
const TIMELINES = ["Secepatnya", "1–2 minggu", "1 bulan", "Diskusikan dulu"] as const;

// Helpers
function buildMessage(opts: { name?: string; projectType?: string; budget?: string; timeline?: string; note?: string; includeRef?: boolean; refUrl?: string }) {
  const { name, projectType, budget, timeline, note, includeRef, refUrl } = opts;
  const line1 = `Halo Rofid${name ? `, saya ${name}` : ""}.`;
  const line2 = `Saya butuh ${projectType || "project"}` + `${budget ? ` (budget ${budget}` : ""}` + `${timeline ? `${budget ? ", " : " ("}timeline ${timeline}` : ""}` + `${budget || timeline ? ")" : ""}.`;
  const line3 = "Detail singkat:";
  const line4 = note?.trim() || "-";
  const line5 = includeRef && refUrl ? `— Dikirim dari ${refUrl}` : "";
  return [line1, line2, "", line3, line4, line5].filter(Boolean).join("\n");
}

function waMeUrl(text: string) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
}

function buildWhatsAppUrl(text: string) {
  const encoded = encodeURIComponent(text.trim());
  if (typeof window !== "undefined") {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) return `whatsapp://send?phone=${PHONE}&text=${encoded}`;
  }
  return `https://web.whatsapp.com/send?phone=${PHONE}&text=${encoded}`;
}
function buildWhatsAppWebUrl(text: string) {
  return `https://web.whatsapp.com/send?phone=${PHONE}&text=${encodeURIComponent(text.trim())}`;
}

export default function WhatsAppContact() {
  const reduce = useReducedMotion();

  // Prefill dari query + ref URL
  const [refUrl, setRefUrl] = useState<string | undefined>(undefined);
  useEffect(() => {
    try {
      const sp = new URLSearchParams(window.location.search);
      const type = sp.get("type");
      const budget = sp.get("budget");
      const timeline = sp.get("timeline");
      if (type && PROJECT_TYPES.includes(type as any)) setProjectType(type as any);
      if (budget && BUDGETS.includes(budget as any)) setBudget(budget as any);
      if (timeline && TIMELINES.includes(timeline as any)) setTimeline(timeline as any);
      setRefUrl(window.location.href);
    } catch {}
  }, []);

  // Form state
  const [name, setName] = useState("");
  const [projectType, setProjectType] = useState<(typeof PROJECT_TYPES)[number] | undefined>();
  const [budget, setBudget] = useState<(typeof BUDGETS)[number] | undefined>();
  const [timeline, setTimeline] = useState<(typeof TIMELINES)[number] | undefined>();
  const [note, setNote] = useState("");
  const [includeRef, setIncludeRef] = useState(false);

  // Actions state
  const [copyOk, setCopyOk] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const message = useMemo(() => buildMessage({ name, projectType, budget, timeline, note, includeRef, refUrl }), [name, projectType, budget, timeline, note, includeRef, refUrl]);
  const url = useMemo(() => buildWhatsAppUrl(message), [message]);
  const urlWaMe = useMemo(() => waMeUrl(message), [message]);
  const urlWebQuick = useMemo(() => buildWhatsAppWebUrl("Halo Rofid, saya ingin berdiskusi."), []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText("+" + PHONE);
      setCopyOk(true);
      setTimeout(() => setCopyOk(false), 1400);
    } catch {}
  }

  function handleOpen() {
    setSubmitting(true);
    const a = document.createElement("a");
    a.href = url;
    a.rel = "noreferrer";
    a.target = "_self";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => setSubmitting(false), 900);
  }

  // Animasi container
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
    >
      {/* blobs dekoratif */}
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

      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-6 py-16 md:py-24">
        {/* Header */}
        <motion.div initial={reduce ? undefined : { opacity: 0, y: 8 }} animate={reduce ? undefined : { opacity: 1, y: 0 }} transition={{ type: "spring", damping: 20 }} className="mb-10 md:mb-14">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">Contact</span>
          </h1>
          <p className="mt-2 text-foreground/70">Chat langsung via WhatsApp.</p>
        </motion.div>

        {/* Grid */}
        <motion.div variants={container} initial="hidden" animate="show" className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Kiri: Info cepat */}
          <motion.aside variants={item} className="space-y-6">
            <div className="rounded-2xl border p-4 md:p-5 bg-background/60">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5" />
                <div>
                  <p className="text-sm text-foreground/60">Nomor WhatsApp</p>
                  <p className="font-medium tracking-tight">+{PHONE}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button onClick={handleCopy} className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-foreground/5 transition-colors">
                  {copyOk ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                  {copyOk ? "Tersalin" : "Salin nomor"}
                </button>

                <a href={urlWebQuick} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-foreground/5 transition-colors">
                  <ExternalLink className="h-4 w-4" />
                  Buka WhatsApp Web
                </a>

                <button onClick={() => setShowQR(true)} className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-foreground/5 transition-colors">
                  <QrCode className="h-4 w-4" />
                  Tampilkan QR
                </button>
              </div>
            </div>

            <ul className="text-sm text-foreground/70 space-y-2">
              <li>
                Zona waktu: <strong>WIB (UTC+7)</strong>
              </li>
              <li>Respons: biasanya &lt; 24 jam kerja</li>
            </ul>
          </motion.aside>

          {/* Kanan: Builder WA */}
          <motion.section variants={item} className="rounded-2xl border p-4 md:p-6 bg-background/60">
            <div className="grid gap-4">
              {/* Nama */}
              <div>
                <label htmlFor="name" className="text-sm font-medium">
                  Nama
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Nama lengkap"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full rounded-xl border bg-transparent px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
                />
              </div>

              {/* Jenis proyek */}
              <div>
                <p className="text-sm font-medium">Jenis proyek</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {PROJECT_TYPES.map((t) => {
                    const active = projectType === t;
                    return (
                      <button
                        key={t}
                        onClick={() => setProjectType(active ? undefined : t)}
                        className={["rounded-xl border px-3 py-1.5 text-sm transition-all", active ? "bg-indigo-500/10 border-indigo-500/30 text-foreground" : "hover:bg-foreground/5"].join(" ")}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget (revisi) */}
              <div>
                <p className="text-sm font-medium">Estimasi budget</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {BUDGETS.map((t) => {
                    const active = budget === t;
                    return (
                      <button
                        key={t}
                        onClick={() => setBudget(active ? undefined : t)}
                        className={["rounded-xl border px-3 py-1.5 text-sm transition-all", active ? "bg-cyan-500/10 border-cyan-500/30 text-foreground" : "hover:bg-foreground/5"].join(" ")}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <p className="text-sm font-medium">Timeline</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {TIMELINES.map((t) => {
                    const active = timeline === t;
                    return (
                      <button
                        key={t}
                        onClick={() => setTimeline(active ? undefined : t)}
                        className={["rounded-xl border px-3 py-1.5 text-sm transition-all", active ? "bg-violet-500/10 border-violet-500/30 text-foreground" : "hover:bg-foreground/5"].join(" ")}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pesan */}
              <div>
                <label htmlFor="note" className="text-sm font-medium">
                  Pesan
                </label>
                <textarea
                  id="note"
                  rows={6}
                  placeholder="Ceritakan kebutuhanmu singkat: scope, referensi, deadline, dll."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="mt-2 w-full rounded-xl border bg-transparent px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
                />
              </div>

              {/* Opsi tambahan */}
              <div className="flex flex-wrap items-center gap-4">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="checkbox" className="h-4 w-4 rounded border" checked={includeRef} onChange={(e) => setIncludeRef(e.target.checked)} />
                  Sertakan link halaman ini
                </label>
              </div>

              {/* Preview */}
              <div className="rounded-xl border bg-foreground/[0.03] px-3 py-3 text-sm text-foreground/80 whitespace-pre-wrap">{message}</div>

              {/* Actions */}
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <button
                  disabled={submitting}
                  onClick={handleOpen}
                  className={[
                    "group inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium shadow-sm border",
                    "bg-primary text-primary-foreground hover:shadow-md hover:translate-y-[-1px] transition-all",
                    submitting ? "opacity-80 cursor-not-allowed" : "",
                  ].join(" ")}
                  aria-live="polite"
                >
                  <MessageSquare className="h-4 w-4" />
                  {submitting ? "Membuka WhatsApp…" : "Chat di WhatsApp"}
                </button>

                <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm hover:bg-foreground/5 transition-colors">
                  <ExternalLink className="h-4 w-4" />
                  Buka di tab baru
                </a>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>

      {/* Modal QR */}
      <AnimatePresence>
        {showQR && (
          <motion.div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowQR(false)}>
            <motion.div
              className="relative w-full max-w-sm rounded-2xl border bg-background p-6"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-base font-semibold mb-2">Scan untuk chat</h3>
              <p className="text-sm text-foreground/70 mb-4">Pindai QR di bawah untuk membuka WhatsApp.</p>
              <div className="grid place-items-center">
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(urlWaMe)}`} alt="QR WhatsApp" className="rounded-xl border" width={220} height={220} />
              </div>
              <div className="mt-5 flex justify-end">
                <button onClick={() => setShowQR(false)} className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-foreground/5 transition-colors">
                  Tutup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
