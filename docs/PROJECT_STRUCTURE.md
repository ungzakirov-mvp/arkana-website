# Project Structure

## Directory Map

```
arkana-website/
├── app/
├── components/
├── lib/
├── public/
├── docs/
├── proxy.ts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── .env.local          (not committed)
└── .gitignore
```

---

## `app/` — Routes and Metadata

Every subfolder in `app/` with a `page.tsx` becomes a URL route. Route files are Server Components unless explicitly marked `"use client"`.

```
app/
├── layout.tsx                  Root layout applied to all pages
├── page.tsx                    / (homepage)
├── globals.css                 CSS variables, Tailwind reset, utility classes
├── icon.png                    Favicon (App Router: /favicon.ico equivalent)
├── apple-icon.png              Apple touch icon
├── robots.ts                   Generates /robots.txt
├── sitemap.ts                  Generates /sitemap.xml
│
├── actions/
│   └── contact.ts              Server Action: form submission handler
│
├── about/page.tsx              /about
├── blog/
│   ├── page.tsx                /blog
│   └── [slug]/page.tsx         /blog/:slug (dynamic)
├── cases/page.tsx              /cases
├── contact/page.tsx            /contact
├── goarkan/page.tsx            /goarkan
├── pricing/page.tsx            /pricing
├── privacy/page.tsx            /privacy
└── services/
    ├── page.tsx                /services
    ├── it-outsourcing/page.tsx /services/it-outsourcing
    ├── itsm/page.tsx           /services/itsm
    ├── infrastructure/page.tsx /services/infrastructure
    └── managed-it/page.tsx     /services/managed-it
```

### Naming Conventions — `app/`

- Folder name = URL segment (kebab-case).
- `page.tsx` is the route entry point; it exports `metadata` and renders the section component.
- `[slug]` is a dynamic segment; receives `params: { slug: string }` prop.
- Server Actions live in `app/actions/` with `"use server"` directive at the top of the file.

---

## `components/` — UI Components

```
components/
├── canvas/
│   └── ArkanaCore.tsx          Three.js/R3F 3D logo animation (homepage only)
│
├── home/
│   ├── HomeCTA.tsx             Homepage call-to-action band
│   ├── HomeCalculator.tsx      ROI calculator section
│   ├── HomeCases.tsx           Case studies carousel
│   ├── HomeComparison.tsx      Before/after comparison table
│   ├── HomeContact.tsx         Homepage contact section
│   ├── HomeHero.tsx            Above-the-fold hero with 3D canvas
│   ├── HomeJourney.tsx         Client journey timeline
│   ├── HomePlatform.tsx        GoARKAN platform preview tabs
│   ├── HomePricing.tsx         Pricing plans section
│   ├── HomeProcess.tsx         4-step onboarding process
│   └── HomeTrust.tsx           Social proof: stats + client logos
│
├── layout/
│   ├── Navigation.tsx          Global pill navigation bar
│   └── Footer.tsx              Global footer with contacts from GoARKAN
│
├── providers/
│   └── ThemeLanguageProvider.tsx  React Context: theme (dark/light) + lang (ru/en/uz)
│
├── sections/
│   ├── AboutPage.tsx           /about page content (client component)
│   ├── BlogPage.tsx            /blog page content (client component)
│   ├── CasesPage.tsx           /cases page content (client component)
│   ├── ContactCTA.tsx          Reusable CTA band (used on service pages + About)
│   ├── ContactPageSection.tsx  /contact page form (client component)
│   ├── GoArkanPage.tsx         /goarkan page content (client component)
│   ├── ServicesPage.tsx        /services page content (client component)
│   └── [Hero/Platform/etc].tsx Legacy section files (used in older page shells)
│
└── ui/
    ├── badge.tsx               <Badge> pill chip
    ├── button.tsx              <Button> with variants
    ├── card.tsx                <Card> container
    ├── FloatingCard.tsx        Glassmorphism floating card animation
    ├── Orb.tsx                 Animated gradient orb background
    └── separator.tsx           <Separator> horizontal rule
```

### Naming Conventions — `components/`

- **PascalCase** for all component files and exports.
- `Home*` prefix = used only on the homepage.
- `*Page` suffix in `sections/` = the full page content for an inner route.
- `*Section` suffix = a sub-section used within a page.
- UI primitives in `ui/` are reusable building blocks with no page-specific logic.

---

## `lib/` — Shared Logic

```
lib/
├── animation.ts       Framer Motion Variants: fadeUp, fadeIn, scaleIn, slideLeft,
│                      staggerContainer. Easing: EASE_SPRING, EASE_SMOOTH.
│
├── arkana-state.ts    Module-level singleton: arkanaCoreState { phase, phaseProgress,
│                      mouseNX, mouseNY }. GSAP writes, R3F useFrame reads each tick.
│                      Avoids React re-renders on animation frames.
│
├── cms-api.ts         GoARKAN API client. All data-fetching functions (getSettings,
│                      getPricing, getCases, getBlog, etc.) plus submitLead() with
│                      Resend email fallback. Also exports TypeScript interfaces for
│                      all GoARKAN data shapes.
│
├── i18n.ts            Complete translation dictionary for ru/en/uz. Covers nav,
│                      hero, all homepage sections, footer. Used by
│                      ThemeLanguageProvider and individual components.
│
├── ratelimit.ts       Upstash Redis rate limiter. 5 submissions per IP per hour,
│                      sliding window. Gracefully degrades when env vars are absent
│                      (allows all in local dev).
│
├── seo.ts             Schema.org JSON-LD objects: organizationSchema,
│                      localBusinessSchema, service schemas, plus builder functions
│                      buildArticleSchema(), buildBreadcrumbSchema(), buildFaqSchema().
│                      Also exports SITE_URL constant.
│
└── utils.ts           cn(...classes) — merges Tailwind classes using clsx +
                       tailwind-merge. Standard utility.
```

---

## `public/` — Static Assets

Files in `public/` are served at the root URL (`/`).

```
public/
├── logo-3d.png         Primary ARKANA logo (657×464 px, used as favicon + nav)
├── og-image.png        Open Graph share image (1200×630 px)
└── …                   Other images referenced by components
```

**Note**: `app/icon.png` and `app/apple-icon.png` are copies of `logo-3d.png` placed in the `app/` directory. Next.js App Router uses these files as the browser favicon and Apple touch icon automatically.

---

## `proxy.ts` — Security Middleware

Not a Next.js middleware file in the usual sense — it exports a `proxy()` function that sets security headers. It is referenced from `middleware.ts` (if present) or used directly. Contains the full CSP policy, HSTS, `X-Frame-Options`, and Permissions-Policy configuration.

---

## `globals.css` — Design System Tokens

CSS custom properties (variables) defined on `:root` and `[data-theme="light"]`:

| Variable | Usage |
|---|---|
| `--ark-bg` | Page background |
| `--ark-surface` | Card and nav backgrounds |
| `--ark-card` | Elevated card background |
| `--ark-card-border` | Card border colour |
| `--ark-text` | Primary text |
| `--ark-text-muted` | Secondary text |
| `--ark-text-sub` | Tertiary/body text |
| `--ark-text-hint` | Labels and badges |
| `--ark-text-heading` | Headings |
| `--ark-accent` | Primary accent colour (indigo `#6366f1`) |

All component inline styles reference these variables. Do not hardcode colours.
