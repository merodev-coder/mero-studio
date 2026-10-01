import type { Profile, Project, TechGroup, StaticAppId, AppMeta } from "./types";

export const PROFILE: Profile = {
  name: "Ammar Altanany",
  role: "Full-stack developer",
  city: "Cairo, Egypt",
  email: "merodev1310@gmail.com",
  phone: "+20 101 704 4628",
  github: "https://github.com/merodev-coder",
  cv: "/assets/Ammar_Altanany_CV.pdf",
};

export const PROJECTS: Project[] = [
  {
    id: "probot",
    file: "Probot.proj",
    name: "Probot",
    kind: "Discord bot · 1-year contract",
    status: "private",
    summary:
      "I worked as a full-stack developer on Probot, a Discord bot, for a full year. The contract ran from September 2025 and finished at the start of September 2026.",
    points: [
      "One-year full-stack contract on a live Discord bot, completed at the start of September 2026.",
      "Built and maintained bot features and backend services across the stack, working with Discord API events, commands and data storage.",
      "Shipped features and fixes to a bot running in production.",
    ],
    stack: ["Discord bot", "Full-stack", "Node.js", "Discord API"],
    links: [],
  },
  {
    id: "discordguard",
    file: "DiscordGuard-Core.proj",
    name: "DiscordGuard-Core",
    kind: "Security bot",
    status: "repo",
    summary:
      "A production-grade Discord security bot that spots raids, scam messages and phishing links in real time. Event intake and event processing are split into two services, so heavy traffic can't stall the bot's connection to Discord.",
    points: [
      "Gateway service only ingests events and writes them to a Redis Stream in under 1 ms, which prevents heartbeat drops under load.",
      "Worker pools with consumer groups run the detection layers: a Redis rolling-window rate limiter, a link resolver that follows redirect chains to expose hidden phishing URLs, and an AI semantic scanner (embeddings, with a local regex fallback).",
      "Raid protection detects machine-speed admin actions and triggers an automatic lockdown.",
      "Bans and mutes run through the Discord API; every incident is logged permanently to MongoDB, with per-server thresholds, whitelists and daily stats.",
      "Zod-validated config, graceful shutdown, Vitest tests, Docker Compose and a Turborepo monorepo.",
    ],
    stack: ["TypeScript", "Node.js", "discord.js", "Redis Streams", "MongoDB", "Zod", "Vitest", "Docker"],
    links: [{ label: "View on GitHub", url: "https://github.com/merodev-coder/DiscordGuard-Core", hot: true }],
  },
  {
    id: "goflow",
    file: "GoFlow.proj",
    name: "GoFlow",
    kind: "Distributed task queue",
    status: "repo",
    summary:
      "A self-hosted background job system written in Go. You send a job over a REST API, and a pool of workers runs it, retries it if it fails, and reports on it. Several instances can run side by side without processing the same job twice.",
    points: [
      "Worker pool scales up and down automatically based on live queue depth and processing latency.",
      "Fault tolerance: exponential backoff with jitter, a dead-letter queue for failed jobs, and panic recovery that never crashes the host process.",
      "Redis-based distributed locking (SET NX PX) plus idempotency keys prevent duplicate execution across instances.",
      "Versioned REST API (/api/v1) with API-key auth, health and readiness probes, delayed jobs, and manual replay of dead-lettered jobs.",
      "PostgreSQL audit log for the full job lifecycle, 7 Prometheus metrics and a 6-panel Grafana dashboard.",
      "One command starts the whole stack (app, Redis, Postgres, Prometheus, Grafana) with Docker Compose.",
    ],
    stack: ["Go", "Redis Streams", "PostgreSQL", "Fiber", "Docker", "Prometheus", "Grafana", "Zap"],
    links: [{ label: "View on GitHub", url: "https://github.com/merodev-coder/GoFlow", hot: true }],
  },
  {
    id: "edgy",
    file: "Edgy-Ticket.proj",
    name: "Edgy-Ticket",
    kind: "Support ticket bot · Freelance",
    status: "repo",
    summary:
      "A customer-support ticket bot for Discord, built and deployed for a client. Members open a ticket and get a private channel with the support team; when it closes, a transcript is saved.",
    points: [
      "Dynamic channel creation for each ticket.",
      "Real-time transcript generation.",
      "Secure permission handling so only the right people see each ticket.",
      "Persistent storage for logs and analytics.",
    ],
    stack: ["Node.js", "Discord.js", "MongoDB"],
    links: [{ label: "View on GitHub", url: "https://github.com/merodev-coder/Edgy-ticket", hot: true }],
  },
  {
    id: "luxor",
    file: "luxorandaswan.com.proj",
    name: "Luxor and Aswan Travel",
    kind: "Client website · Travel",
    status: "live",
    summary:
      "The website of an Egyptian tour operator selling private Egypt tours, luxury Nile cruises and tailor-made trips. Visitors compare packages and cruise ships, then enquire through a custom-quote form or WhatsApp.",
    points: [
      "Package and cruise listing pages with prices, durations and highlights.",
      "Destination pages for Egypt, Jordan, Dubai, Morocco, Oman, Turkey and African safaris.",
      "Available in 7 languages: English, French, German, Spanish, Italian, Portuguese and Russian.",
      "Built for conversion: tailor-made quote form, WhatsApp and Viber contact, guest reviews and TripAdvisor awards.",
    ],
    stack: ["Landing pages", "SEO", "Multilingual", "Lead generation"],
    links: [{ label: "Visit live site", url: "https://www.luxorandaswan.com/", hot: true }],
  },
  {
    id: "imeo",
    file: "imeo-eg.net.proj",
    name: "IMEO Engineering",
    kind: "Client website · Corporate",
    status: "live",
    summary:
      "The company website of an integrated mechanical engineering consultancy in Egypt. It presents their services, clients, project galleries by industry and country, and a careers page.",
    points: [
      "Service pages covering engineering design, tender documents, site supervision and project management.",
      "Project sections by industry (petroleum, aviation, food and beverage) and photo galleries by country.",
      "Client testimonials, careers page and contact page.",
      "Runs on WordPress so the team can update content themselves.",
    ],
    stack: ["WordPress", "Corporate site", "Content workflow"],
    links: [{ label: "Visit live site", url: "https://imeo-eg.net/", hot: true }],
  },
  {
    id: "kimo",
    file: "kimostore.net.proj",
    name: "Kimo Store",
    kind: "E-commerce · Electronics",
    status: "live",
    summary:
      "A large online electronics store for the Egyptian market, selling computers, laptops, phones, home appliances, networking gear and CCTV systems, with showrooms in Cairo and Alexandria.",
    points: [
      "Catalogue with thousands of products, deep category menus, search, wishlist and compare.",
      "English and Arabic storefront.",
      "Hot-deals sections with discounts and countdowns, promo codes and installment options.",
      "Runs on Shopify, with iOS and Android apps alongside the website.",
    ],
    stack: ["Shopify", "E-commerce", "Bilingual EN / AR"],
    links: [{ label: "Visit live site", url: "https://kimostore.net/", hot: true }],
  },
  {
    id: "whatsapp-ai",
    file: "whatsapp-ai-agent.proj",
    name: "WhatsApp AI Agent",
    kind: "AI customer service",
    status: "private",
    summary:
      "A fully custom-coded AI agent (no low-code tools like n8n) that answers customer WhatsApp messages in real time. One deployment serves many companies, and each is trained with its own business knowledge.",
    points: [
      "Multi-tenant architecture: the agent can be trained and customised per client company.",
      "Two-way messaging through the WhatsApp Business API.",
      "LLM pipeline with prompt and context management for accurate, low-latency replies.",
    ],
    stack: ["Node.js", "WhatsApp Business API", "LLM", "MongoDB"],
    links: [],
  },
  {
    id: "ultimate-bot",
    file: "ultimate-bot.proj",
    name: "Ultimate Bot",
    kind: "High-concurrency Discord bot",
    status: "private",
    summary:
      "A Discord bot in Go, tuned for low latency and small CPU and memory use. It leans on Go's lightweight concurrency to handle webhooks and WebSocket payloads under simulated high load.",
    points: [
      "Goroutine-based processing of webhook and WebSocket events.",
      "Optimised for reduced CPU and memory footprint.",
      "Tested under simulated high load.",
    ],
    stack: ["Go", "DiscordGo"],
    links: [],
  },
  {
    id: "awesome",
    file: "awesome-claude-code.link",
    name: "Awesome Claude Code",
    kind: "Bookmarked resource",
    status: "repo",
    summary:
      "A community-curated list of commands, CLAUDE.md files, CLI tools and workflows for Claude Code. It's part of the reading list behind how I work with AI-assisted development.",
    points: [
      "Not my repository: it's maintained by its own community.",
      "Linked here because I build with AI coding tools and care about doing it well.",
    ],
    stack: ["AI-assisted dev", "Claude Code", "Workflows"],
    links: [{ label: "Open the list", url: "https://github.com/hesreallyhim/awesome-claude-code", hot: true }],
  },
];

export const TECH: TechGroup[] = [
  { group: "Frontend", level: 90, items: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "Tailwind CSS", "Responsive design"] },
  {
    group: "Backend & databases",
    level: 88,
    items: ["Node.js", "Express.js", "Go", "PHP", "SQL", "PostgreSQL", "MongoDB", "Mongoose", "Redis (Streams, caching, Pub/Sub)"],
  },
  {
    group: "Marketing & CMS",
    level: 82,
    items: ["WordPress", "HubSpot", "SEO", "Landing page optimisation", "Web analytics", "Email marketing", "WhatsApp Business API automation"],
  },
  {
    group: "DevOps & infrastructure",
    level: 78,
    items: ["Docker", "Docker Compose", "Git", "GitHub", "Prometheus", "Grafana", "Performance optimisation", "Troubleshooting"],
  },
];

/** Static (non-project) apps shown on the desktop, in display order. */
export const STATIC_APPS: Record<StaticAppId, AppMeta> = {
  about: { title: "about-me.txt", icon: "doc", width: 620, height: 560 },
  experience: { title: "experience.log", icon: "log", width: 680, height: 600, flush: true },
  tech: { title: "tech-stack.sys", icon: "sys", width: 700, height: 560 },
  projects: { title: "C:/Projects", icon: "folder", width: 700, height: 520, flush: true },
  contact: { title: "contact.sh", icon: "term", width: 640, height: 440, flush: true },
  snake: { title: "snake.exe", icon: "game", width: 400, height: 540, flush: true },
  cv: { title: "Ammar_Altanany_CV.pdf", icon: "pdf", width: 760, height: 620, flush: true },
};

export const DESKTOP_ORDER: StaticAppId[] = ["about", "experience", "tech", "projects", "contact", "snake", "cv"];

export function findProject(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}
