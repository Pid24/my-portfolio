# Rofid Nasif Annafie — Portfolio

A professional, high-performance personal portfolio built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. 

This portfolio is designed with an **Editorial Minimalist** aesthetic, featuring a warm cream and navy color palette, elegant serif typography (`DM Serif Display`), and subtle, refined animations.

🌐 **Live Demo:** [rofid-dev.my.id](https://rofid-dev.my.id)

---

## ✨ Design & Architecture

- **Editorial Aesthetic:** Clean, magazine-like layouts emphasizing typography, whitespace, and high-quality visuals over heavy UI components.
- **Typography:** `DM Serif Display` for elegant, lowercase headings with a distinct lime accent (`#C8E63F`), paired with `Inter` for highly readable body text.
- **Performance First:** Next.js static export configured out of the box, ensuring blazing-fast load times and easy deployment to shared hosting (cPanel/hPanel).
- **Fluid Animations:** Powered by Framer Motion for smooth page transitions, staggered layout reveals, and subtle micro-interactions.

## 🚀 Key Features

- **Dynamic Hero Section:** Minimalist introduction with interactive, rotating tech-stack marquee.
- **Projects Showcase:** Clean grid layout for filtering and sorting projects, complete with detailed case study pages (`/projects/[slug]`).
- **Editorial About Page:** Timeline-style professional history and live GitHub coding activity stats.
- **Elegant Contact Page:** Minimalist, editorial contact interface with sleek social integrations.
- **Seamless Dark/Light Mode:** Carefully curated tokens for both a warm cream "light" mode and a deep navy "dark" mode.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router, Static Export)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React & Simple Icons

---

## 📦 Getting Started (Local Development)

1. **Clone & Install Dependencies**
   ```bash
   git clone https://github.com/Pid24/my-portfolio.git
   cd my-portfolio
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

3. **Production Build**
   ```bash
   npm run build
   ```
   This will generate a static HTML/CSS/JS export in the `out/` directory, ready for deployment.

---

## 🚀 Deployment (Shared Hosting / cPanel)

Because this project uses Next.js `output: "export"`, deploying to shared hosting is incredibly simple:

1. Run `npm run build` locally.
2. Zip the contents of the generated `out/` directory.
3. Upload the `.zip` file to your server's `public_html` directory (or specific domain folder) via File Manager.
4. Extract the `.zip` file.
5. Your site is now live! ✅

---

## ✍️ Content Management

To add or modify projects, simply edit the data array in `src/data/projects.ts` and drop your images into the `public/images/` directory.

```typescript
export const PROJECTS = [
  {
    slug: "project-name",
    title: "Project Name",
    excerpt: "Short description for the project.",
    cover: "/images/project-cover.png",
    stack: ["Next.js", "Tailwind", "Laravel"],
    category: "E-commerce",
    period: "2024",
  },
  // ...
];
```

---

## 📄 License

MIT © 2026 Rofid Nasif Annafie
