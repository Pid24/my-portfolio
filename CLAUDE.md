# CLAUDE.md — Web Portfolio (my-portfolio)

## Project Overview

Personal portfolio website for **Rofid Nasif Annafie** (Software Engineer). The goal is to showcase skills, completed projects, and professional identity to potential clients or employers.

**Live URL:** [rofid-dev.my.id](https://rofid-dev.my.id)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, Static Export) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React, Simple Icons |
| Theming | next-themes |
| Fonts | DM Serif Display (headings), Inter (body) via Next.js `localFont` / Google Fonts |

---

## Design System

### Color Tokens

All colors are defined as CSS custom properties in `src/app/globals.css`.

| Token | Light Mode | Dark Mode | Purpose |
|---|---|---|---|
| `--background` | `#F5F0E6` (warm cream) | `#1a1a2e` (deep navy) | Page background |
| `--foreground` | `#1a1a2e` | `#e8e2d6` | Default text |
| `--accent` | `#C8E63F` (lime) | `#C8E63F` (lime) | Headings, highlights, active states |
| `--muted-foreground` | `#5c5a6f` | `#8a8698` | Subtle/secondary text |
| `--border` | `#d4cfc3` | `#3a3a5c` | Borders, dividers |

### Typography

- **Headings (h1, h2, h3):** `font-serif` class → `DM Serif Display`. Always lowercase with a period (e.g., `about.`, `contact.`). Color: `text-accent`.
- **Body:** `font-sans` → `Inter`. Color: `text-foreground/80`.
- **Heading scale:** Large editorial headings use `text-5xl md:text-6xl`.

### Decorative Assets

- `public/images/asset-1.png` → Horizontal lines (garis). Used in hero section only.
- `public/images/asset-2.png` → Cross/plus symbol. Used in hero section and about page photo.

### Animation Conventions

- All animations via **Framer Motion**.
- Always check `useReducedMotion()` — if true, skip all animations.
- Page elements: `staggerChildren: 0.08`, `type: "spring"`, `damping: 20`.
- Decorative blob/glow elements: looping `repeat: Infinity` animations.

---

## Folder Structure

```
my-portfolio/
├── public/
│   ├── images/          # Photos, project covers, decorative assets, og image
│   └── docs/            # CV PDF
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── layout.tsx   # Root layout (Navbar, Footer, ThemeProvider, Splash screens)
│   │   ├── page.tsx     # Homepage (/)
│   │   ├── about/       # /about page
│   │   ├── projects/    # /projects and /projects/[slug] pages
│   │   ├── contact/     # /contact page
│   │   ├── globals.css  # Design tokens (CSS custom properties + Tailwind base)
│   │   ├── error.tsx    # Global error boundary
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ThemeProvider.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── FloatingContact.tsx
│   │   ├── SeoJsonLd.tsx
│   │   ├── about/
│   │   │   └── AboutContent.tsx
│   │   ├── contact/
│   │   │   └── WhatsAppContact.tsx
│   │   ├── home/
│   │   │   └── ProjectsHighlight.tsx  # "latest projects." section on homepage
│   │   ├── projects/
│   │   │   ├── ProjectsSection.tsx    # Full projects list with filters
│   │   │   └── ProjectDetail.tsx      # Per-project case study page
│   │   ├── splash/
│   │   │   ├── BootSplash.tsx         # Full-page overlay on first load
│   │   │   ├── LoadingSplash.tsx      # Skeleton/loading UI
│   │   │   └── PageTransition.tsx     # Framer Motion route transition wrapper
│   │   └── ui/
│   │       └── button.tsx             # Shared button primitive
│   ├── data/
│   │   └── projects.ts  # Single source of truth for all project data
│   └── lib/
│       └── utils.ts     # Utility functions (e.g., cn() for class merging)
```

---

## Implemented Features

- [x] **Hero Section** — Name, role, rotating subtitle phrases, tech-stack marquee with branded icon colors on hover.
- [x] **Photo Slideshow** — Circular profile photo with animated crossfade in Hero and About.
- [x] **Decorative Assets** — `asset-2.png` (cross) with rotation animation around the profile photo in both Hero and About.
- [x] **Navbar** — Centered desktop nav with animated active-pill + underline. Sticky + blur on scroll. Mobile sheet menu. Dark/Light toggle. Scroll progress bar.
- [x] **Latest Projects Section** — Homepage preview of 3 featured projects.
- [x] **Full Projects Page** — Grid of all projects with text search, tag filter, sort (newest/oldest), and load-more pagination.
- [x] **Project Detail Page** — Per-slug case study with cover image, tech stack badges, case study content (problem, solution, gallery, YouTube embed).
- [x] **About Page** — Circular photo, editorial `about.` heading in the text column, timeline-style skills list, CV download button, live GitHub coding activity stats.
- [x] **Contact Page** — Editorial layout with AI-generated desk setup photo and clean icon-based links (Email, WhatsApp, GitHub, LinkedIn).
- [x] **Dark / Light Mode** — Full token-based theming via CSS custom properties. Persisted via `next-themes`.
- [x] **Boot Splash Screen** — Animated overlay shown once on initial page load.
- [x] **Page Transitions** — Smooth Framer Motion fade between routes.
- [x] **Footer** — Minimal: name, professional tagline, copyright, and scroll-to-top button.
- [x] **Static Export** — `output: "export"` configured. Build generates `out/` for direct upload to shared hosting (cPanel/hPanel).
- [x] **SEO** — `metadata` (title, description, OpenGraph, Twitter card) configured per page in `layout.tsx`. JSON-LD structured data via `SeoJsonLd.tsx`.
- [x] **Error & Not Found Pages** — Custom styled `error.tsx` and `not-found.tsx`.
- [x] **Reduced Motion** — All animations respect `prefers-reduced-motion` via `useReducedMotion()`.

---

## Coding Rules

1. **Minimal comments.** Only comment when the logic is genuinely non-obvious. Do not comment every line or describe what the code clearly already says.
2. **Ask before running if the prompt is ambiguous.** If the task or design intent is unclear, ask for clarification first. Do not assume and execute.
3. **Consistent editorial heading style.** All page-level `h1` headings must be: lowercase, followed by a period, `font-serif`, `text-5xl md:text-6xl`, `text-accent`. Example: `about.`, `contact.`, `projects.`
4. **Single source of truth for project data.** All project content lives in `src/data/projects.ts`. Never hardcode project info in components.
5. **No orphaned imports.** Remove unused imports immediately.
6. **Reduced motion first.** Every Framer Motion animation must be guarded with `if (reduce) return {}` or equivalent.
