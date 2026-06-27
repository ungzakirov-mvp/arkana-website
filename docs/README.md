# ARKANA Website — Technical Overview

The ARKANA website is the public marketing presence for ARKANA, an IT outsourcing company based in Tashkent, Uzbekistan. The site serves three audiences simultaneously — Russian, Uzbek, and English speakers — with client-side language switching and no URL changes per locale.

All dynamic data (pricing, case studies, contacts, FAQ, blog) is fetched from the **GoARKAN** internal CRM platform. When GoARKAN is unreachable, the site serves cached ISR content and falls back to email delivery for lead submissions.

---

## Technology Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.9 |
| Language | TypeScript | ^5 |
| UI Runtime | React | 19.2.4 |
| Styling | Tailwind CSS v4 | ^4 |
| Animation | Framer Motion | ^12 |
| Animation | GSAP | ^3.15 |
| 3D Canvas | Three.js + React Three Fiber | ^0.184 / ^9.6 |
| Validation | Zod | ^4 |
| Email | Resend SDK | ^6 |
| Rate Limiting | Upstash Redis + Ratelimit | ^1.38 / ^2.0 |
| Icons | Lucide React | ^1.21 |
| Deployment | Vercel | — |
| CMS / CRM | GoARKAN (internal) | private LAN |

---

## Quick Start

### Prerequisites

- Node.js ≥ 20
- npm ≥ 10 (or pnpm / yarn)
- Access to `.env.local` (see [ENVIRONMENT.md](ENVIRONMENT.md))

### Install

```bash
cd arkana-website
npm install
```

### Run locally

```bash
npm run dev
# → http://localhost:3000
```

GoARKAN (`http://192.168.112.11`) is only reachable from the office LAN. On a remote machine all CMS fetches return `null` and pages render with empty data sections. This is expected behaviour — see [KNOWN_LIMITATIONS.md](KNOWN_LIMITATIONS.md).

### Production build

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

---

## Repository Structure

```
arkana-website/
├── app/                    # Next.js App Router — routes and metadata
│   ├── layout.tsx          # Root layout: Navigation, Footer, providers, SEO, analytics
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Design tokens (CSS variables), Tailwind base
│   ├── icon.png            # Browser tab favicon (App Router convention)
│   ├── apple-icon.png      # Apple touch icon
│   ├── robots.ts           # /robots.txt generation
│   ├── sitemap.ts          # /sitemap.xml generation
│   ├── actions/
│   │   └── contact.ts      # Server Action: form validation → GoARKAN → Resend fallback
│   ├── about/
│   ├── blog/
│   ├── cases/
│   ├── contact/
│   ├── goarkan/
│   ├── pricing/
│   ├── privacy/
│   └── services/
│       ├── page.tsx
│       ├── it-outsourcing/
│       ├── itsm/
│       ├── infrastructure/
│       └── managed-it/
├── components/
│   ├── canvas/             # Three.js / R3F 3D components
│   ├── home/               # Section components used only on the homepage
│   ├── layout/             # Navigation + Footer (rendered on every page)
│   ├── providers/          # ThemeLanguageProvider (React Context)
│   ├── sections/           # Page-level client components for inner pages
│   └── ui/                 # Atomic UI primitives (badge, button, card…)
├── lib/
│   ├── animation.ts        # Framer Motion variants and easing constants
│   ├── arkana-state.ts     # Module-level mutable state for GSAP ↔ R3F sync
│   ├── cms-api.ts          # GoARKAN API client + Resend email fallback
│   ├── i18n.ts             # Full translation dictionary (ru / en / uz)
│   ├── ratelimit.ts        # Upstash Redis rate-limiter (5 req / IP / hour)
│   ├── seo.ts              # Schema.org JSON-LD builders and SEO helpers
│   └── utils.ts            # cn() Tailwind class merge utility
├── proxy.ts                # Security headers middleware (CSP, HSTS, etc.)
├── public/                 # Static assets served at /
│   ├── logo-3d.png
│   ├── og-image.png
│   └── …
├── docs/                   # ← You are here
├── .env.local              # Local overrides (never committed)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Useful Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build (runs TypeScript + Next.js compile) |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint |

---

## Further Reading

| Document | Topic |
|---|---|
| [ARCHITECTURE.md](ARCHITECTURE.md) | System design, data flow, component model |
| [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) | Every folder and naming convention |
| [COMPONENTS.md](COMPONENTS.md) | Component catalogue with props and usage |
| [ROUTING.md](ROUTING.md) | Route table, metadata, dynamic routes |
| [CMS_INTEGRATION.md](CMS_INTEGRATION.md) | GoARKAN data fetching and ISR |
| [GOARKAN_INTEGRATION.md](GOARKAN_INTEGRATION.md) | Lead flow and API endpoints |
| [FORMS.md](FORMS.md) | Contact form, validation, rate limiting |
| [SEO.md](SEO.md) | Metadata, structured data, sitemap |
| [ENVIRONMENT.md](ENVIRONMENT.md) | All environment variables |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Vercel deployment guide |
| [RELEASE_CHECKLIST.md](RELEASE_CHECKLIST.md) | Pre-release verification steps |
| [MAINTENANCE.md](MAINTENANCE.md) | Day-to-day content and configuration updates |
| [TROUBLESHOOTING.md](TROUBLESHOOTING.md) | Common issues and fixes |
| [KNOWN_LIMITATIONS.md](KNOWN_LIMITATIONS.md) | Current constraints and pending work |
| [CHANGELOG.md](CHANGELOG.md) | Release history |
