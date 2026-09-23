export type CaseStudy = {
  problem: string;
  solution: string;
  features?: string[];
  gallery?: string[];
  youtubeId?: string;
};

export type Project = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  stack: string[];
  category:
    | "E-commerce"
    | "Landing Page"
    | "Payment Gateway"
    | "Laravel"
    | "Booking"
    | "Streaming"
    | "AI Assistant"
    | "E-Learning"
    | "Manual QA"
    | "API Automation";
  period?: string;
  links?: { live?: string; github?: string; youtube?: string };
  featured?: boolean;
  highlights?: string[];
  caseStudy?: CaseStudy;
};

export const PROJECTS: Project[] = [
  {
    slug: "qa-portfolio-zalora",
    title: "Zalora E-Commerce: Core Functional & UI/UX Testing",
    excerpt:
      "Comprehensive functional and UI/UX testing on the Zalora e-commerce platform, covering the Search, Filter, and Cart modules using a Black-Box Testing approach.",
    cover: "",
    stack: ["Manual Testing", "Bug Reporting", "Test Cases", "GitHub"],
    category: "Manual QA",
    period: "2026",
    links: { github: "https://github.com/Pid24/qa-portfolio-zalora" },
    featured: true,
    caseStudy: {
      problem:
        "E-commerce platforms like Zalora have complex user flows — from product search and filtering by size/price/brand to the process of adding items to the cart. Without systematic, well-documented testing, bugs in these critical flows can directly impact conversion rates and user experience. The main challenge was designing comprehensive and reproducible test cases for these modules, then reporting bugs clearly and in a structured format so they can be acted upon by the development team.",
      solution:
        "Using a Black-Box Testing approach, I designed and executed a series of structured test cases without access to the source code. Each test case includes preconditions, steps, expected results, and actual results. Bugs found were documented in detail — including reproduction steps, screenshots, severity, and priority — using a standard format stored on GitHub. Testing focused on three core modules: Search (keyword matching, empty state, special characters), Filter (filter combinations, filter reset, responsiveness), and Cart (add/remove items, quantity update, persistence).",
      features: [
        "Test Case Design for Search, Filter, and Cart modules",
        "Black-Box & Equivalence Partitioning Testing",
        "Structured Bug Reports with severity & priority",
        "Boundary Value Analysis on input fields",
        "UI/UX consistency check across browsers",
        "Testing documentation on GitHub",
      ],
      gallery: [],
    },
  },
  {
    slug: "api-automation-reqres",
    title: "Reqres API Automation Testing",
    excerpt:
      "Automation testing for the public Reqres.in REST API, covering CRUD operation validation, status code assertions, response schema validation, and response time testing using Postman & JavaScript.",
    cover: "",
    stack: ["Postman", "JavaScript", "JSON", "API Testing"],
    category: "API Automation",
    period: "2026",
    links: {
      github: "https://github.com/Pid24/qa-api-automation-reqres",
    },
    featured: true,
    caseStudy: {
      problem:
        "Validating the reliability of a REST API manually is highly inefficient and prone to human error — especially when the number of endpoints being tested is large and needs to be re-executed repeatedly during regression testing. The challenge was to build an automation suite capable of verifying response correctness (status codes, schema, data), quickly identifying regressions, and generating reports that are easy for both QA and developer teams to read.",
      solution:
        "Using Postman as the primary platform with JavaScript-based test scripts, I built an automation collection for the Reqres.in REST API covering the full CRUD lifecycle. Each request includes automated assertions: HTTP status code validation (200, 201, 400, 404), response time threshold (< 2000ms), schema validation using JSON Schema, and data consistency. The collection is organized per resource (Users, Auth) with environment variables for base URL and token configuration. Results can be re-run at any time via Collection Runner or Newman (CLI) for CI pipeline integration.",
      features: [
        "CRUD Operations: GET, POST, PUT, PATCH, DELETE",
        "HTTP Status Code Assertions (200, 201, 400, 404)",
        "Response Time Validation (threshold < 2000ms)",
        "JSON Schema Validation on every response",
        "Authentication flow testing (Login & Register)",
        "Environment Variables for multi-environment support",
        "Negative testing: invalid payload & unauthorized access",
        "Collection Runner & Newman-ready for CI pipeline",
      ],
      gallery: [],
    },
  },
  {
    slug: "anime-hub",
    title: "AnimeHub",
    excerpt: "Anime streaming web app with Netflix-style content rows and a modern navbar.",
    cover: "/images/anime-hub.png",
    stack: ["Nextjs", "Tailwind"],
    category: "Streaming",
    period: "2025",
    links: { live: "https://anime-hubs.vercel.app/", github: "https://github.com/Pid24/anime-hub" },
    featured: false,
    caseStudy: {
      problem:
        "Building a modern anime streaming platform is no easy task. The main challenge was delivering a vast anime catalog with a Netflix-class UI/UX — including horizontally scrollable content rows, a responsive navbar, and snappy performance even when rendering many poster images. On top of that, integrating with third-party anime APIs that aren't always stable added complexity, requiring a fallback mechanism so users never see a blank page.",
      solution:
        "I built AnimeHub using Next.js with the App Router to leverage server-side rendering and clean routing. For the Netflix-like layout, I implemented horizontal content rows with smooth scrolling and lazy loading on poster images to keep performance optimal. The navbar was designed with a glassmorphism effect and a responsive hamburger menu. To handle API instability, I architected a multi-provider fallback system — if one provider fails, the system automatically tries an alternative (AnimeKai, Hianime, AnimePahe) so the user experience remains seamless.",
      features: [],
      gallery: ["/images/anime-hub-1.png", "/images/anime-hub-2.png", "/images/anime-hub-3.png"],
    },
  },
  {
    slug: "milicia-assistant",
    title: "Milicia Assistant",
    excerpt: "A local AI assistant with screen awareness, system control, and voice commands.",
    cover: "/images/milicia.png",
    stack: ["Python", "Ollama", "Gemini Vision", "Vosk", "EdgeTTS"],
    category: "AI Assistant",
    period: "2026",
    links: {
      github: "https://github.com/Pid24/milicia-assistant",
    },
    featured: false,
    caseStudy: {
      problem:
        "Building a local AI assistant that is truly 'aware' of what's happening on screen is a major challenge. The primary issue: local vision models like LLaVA require very large VRAM (8GB+) that exceeds the capacity of a typical laptop GPU. Additionally, integrating voice commands, text-to-speech, and system automation into a single responsive pipeline without lag is highly complex — every component must work asynchronously without interfering with the others.",
      solution:
        "The solution was a hybrid architecture: the core brain uses Ollama (local model) for general reasoning that stays private and offline, while Screen Awareness is offloaded to the Google Gemini Vision API (cloud) for visual analysis. With this approach, laptops with limited VRAM can still perform vision analysis without bottlenecks. The voice pipeline was built with Vosk (offline speech-to-text) and EdgeTTS (text-to-speech), both of which are lightweight. System automation uses Python subprocess and pyautogui to control applications, open files, and execute system commands directly.",
      features: [],
      gallery: [],
    },
  },
  {
    slug: "pkumi-compro",
    title: "PKU MI",
    excerpt:
      "Company profile website for Pendidikan Kader Ulama Masjid Istiqlal with an admin panel for content management.",
    cover: "/images/pkumi.png",
    stack: ["Nextjs", "Laravel", "Tailwind"],
    category: "Landing Page",
    period: "2026",
    links: { live: "https://pku.miftadigital.cloud/" },
    featured: false,
    caseStudy: {
      problem:
        "Pendidikan Kader Ulama Masjid Istiqlal (PKUMI) needed an informative and easy-to-manage company profile website. The challenge was building a fast, SEO-friendly frontend while integrating it with a Laravel backend that provides a CMS/admin panel for dynamically managing content — such as news, gallery, and program information.",
      solution:
        "I was responsible for the frontend side, specifically data integration via API fetching from the Laravel backend. Using Next.js for fast, SEO-optimal rendering, and Tailwind CSS for consistent styling. Each page is fetched from the Laravel REST API so content can be updated directly through the admin panel without redeploying the frontend.",
      features: [],
      gallery: ["/images/pkumi-1.png", "/images/pkumi-2.png"],
    },
  },
  {
    slug: "cbt-toafl",
    title: "CBT TOAFL",
    excerpt:
      "An online exam platform for TOAFL and TOEFL with a session-based system, per-test payment, question randomization, auto-save, and per-session result management.",
    cover: "/images/cbt.png",
    stack: ["Next.js", "Laravel", "MySQL"],
    category: "E-Learning",
    period: "2026",
    links: { live: "https://cat.miftadigital.cloud/" },
    featured: false,
    caseStudy: {
      problem:
        "Developing a reliable online exam (CBT) platform with full features such as per-test payment integration, session-based system, question randomization, and auto-save. The main challenge was maintaining exam reliability and integrity through anti-cheat features (fullscreen enforcement, tab switch detection, disable copy-paste), as well as ensuring safe state synchronization between the client (Next.js) and backend (Laravel) during the exam in real time.",
      solution:
        "The system was built using Next.js 14 for the frontend and Laravel for the backend REST API. The frontend implements a solid state management architecture with TanStack Query for handling dashboard data, profiles, and history. Exams run with a heartbeat and auto-save system to the backend, backed by a server-side remaining_seconds timer. Exam security (anti-cheat) is implemented on the client side by detecting visibilitychange events, blocking the context menu, and restricting navigation. Authentication is guarded by server-side middleware.",
      features: [
        "Complete Auth Flow with Role Check & Account Status",
        "Payment Proof Upload & Real API History",
        "Integrated Exam Engine (Auto-save, question randomization, navigation, timer)",
        "Anti-Cheat Features (Fullscreen, Tab switch detection, Disable Right Click)",
        "Audio Player with Play Count Limit",
        "Server-Side Middleware & Global UI States (Loading, Error Boundary)",
      ],
      gallery: ["/images/cbt-1.png", "/images/cbt-2.png", "/images/cbt-3.png", "/images/cbt-4.png", "/images/cbt-5.png"],
    },
  },
];
