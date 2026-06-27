# Component Catalogue

## Layout Components

### `Navigation` — `components/layout/Navigation.tsx`

**Type**: Client Component  
**Renders on**: Every page (via `app/layout.tsx`)

The global pill-style navigation bar. Floated above page content with a glassmorphism backdrop that darkens on scroll.

**Features**:
- Logo link → `/`
- Services dropdown with trilingual labels and direct links to all service sub-pages
- Nav links: Pricing, GoARKAN, Cases, Blog, Contact
- Language switcher: RU / EN / UZ buttons (sets `localStorage["ark-lang"]`)
- Theme toggle (dark/light, sets `localStorage["ark-theme"]`)
- CTA button → `/contact` (fixed `minWidth: 164px` to prevent layout shift on lang change)
- Mobile hamburger menu (visible below `md` breakpoint)

**State**: reads `theme`, `lang`, `setLang`, `toggleTheme` from `useApp()`.  
**No props.**

---

### `Footer` — `components/layout/Footer.tsx`

**Type**: Server Component  
**Renders on**: Every page (via `app/layout.tsx`)

**Props**:
```ts
settings: SiteSettings | null
```

Renders contact details, social links, service navigation, and copyright from `SiteSettings` fetched in `app/layout.tsx`. Falls back gracefully when `settings` is `null` (GoARKAN unavailable) — shows static fallback values.

---

### `ThemeLanguageProvider` — `components/providers/ThemeLanguageProvider.tsx`

**Type**: Client Component (React Context Provider)  
**Renders on**: Every page (wraps children in `app/layout.tsx`)

Provides global app context:

```ts
interface AppCtx {
  theme: "dark" | "light";
  toggleTheme: () => void;
  lang: "ru" | "en" | "uz";
  setLang: (l: Lang) => void;
  t: Translations;       // full i18n object for current lang
}
```

Reads initial values from `localStorage` on mount (after hydration). Sets `data-theme` attribute on `<html>` to trigger CSS variable switching.

**Hook**: `export const useApp = () => useContext(Ctx)` — import and call from any client component.

---

## Homepage Components (`components/home/`)

All homepage components are Client Components. They receive no props — they read `useApp()` for language.

| Component | Section | Notes |
|---|---|---|
| `HomeHero` | Above the fold | Includes `ArkanaCore` 3D canvas, stats, two CTA buttons |
| `HomeTrust` | Social proof | Stat counters + client logo marquee |
| `HomePlatform` | GoARKAN preview | Tab switcher showing platform screenshots |
| `HomePricing` | Pricing plans | Fetches from GoARKAN via ISR; shows "Contact us" if GoARKAN down |
| `HomeCases` | Case studies | Card carousel; fetches from GoARKAN |
| `HomeProcess` | How we work | 4-step timeline |
| `HomeCTA` | Call to action | Final CTA band |
| `HomeCalculator` | ROI calculator | Client-side interactive calculator |
| `HomeComparison` | In-house vs ARKANA | Feature comparison table |
| `HomeJourney` | Client journey | Animated timeline |
| `HomeContact` | Contact shortcut | Embedded mini contact form |

---

## Section Components (`components/sections/`)

These are the full-page content components for inner routes. Each is a Client Component rendered by its corresponding Server Component shell in `app/`.

### `AboutPage`

**Route**: `/about`  
**Props**: none  
Trilingual content: company story, team, values, GoARKAN card, CTA band. Team section renders `ContactCTA` at the bottom.

### `ServicesPage`

**Route**: `/services`  
**Props**: none  
Grid of 4 service cards (IT Outsourcing, Cybersecurity, Infrastructure, ITSM) with trilingual copy and links to sub-pages.

### `BlogPage`

**Route**: `/blog`  
**Props**: none  
Hardcoded blog post list with category filter. Blog post content is Russian-only. Category filter label adapts to the current language.

### `CasesPage`

**Route**: `/cases`  
**Props**: none  
Case study showcase with metrics. Currently hardcoded; designed to accept GoARKAN data.

### `GoArkanPage`

**Route**: `/goarkan`  
**Props**: none  
Platform feature overview, module cards, demo request CTA.

### `ContactPageSection`

**Route**: `/contact`  
**Props**: none  
Contact form wired to the `submitContact` Server Action. Handles all form states: idle, loading, success, error, rate_limited, spam. Includes map/address block.

### `ContactCTA`

**Reusable** — used on: About, all 4 service sub-pages.  
**Props**: none  
Two-button CTA band with trilingual copy. Links to `/contact` (primary) and `/cases` (secondary).

---

## Canvas Components (`components/canvas/`)

### `ArkanaCore` — `components/canvas/ArkanaCore.tsx`

**Type**: Client Component  
**Used in**: `HomeHero`

Three.js + React Three Fiber 3D rendering of the ARKANA logo. Uses GSAP for scroll-driven phase transitions. Reads/writes `arkanaCoreState` (module-level singleton in `lib/arkana-state.ts`) to avoid React re-renders on each animation frame.

**Phases**: `0` = hero centered, `1` = shifted right (services section), `2` = compressed (map), `3` = hidden.

---

## UI Primitives (`components/ui/`)

Thin wrappers around standard HTML elements with design-system styling applied. All accept standard HTML props via spread.

| Component | Tag | Key Props |
|---|---|---|
| `Badge` | `<span>` | `variant?: "default" \| "outline"` |
| `Button` | `<button>` | `variant?: "default" \| "outline" \| "ghost"`, `size?` |
| `Card` | `<div>` | standard div props |
| `Separator` | `<hr>` | `orientation?: "horizontal" \| "vertical"` |
| `FloatingCard` | `<div>` | Framer Motion animated; `delay?`, `children` |
| `Orb` | `<div>` | `size?`, `color?`, `opacity?`, `blur?` |

---

## Common Patterns

### Trilingual COPY pattern

Every client component that renders text defines its translations locally:

```tsx
const COPY: Record<string, { badge: string; h1: string }> = {
  ru: { badge: "Заголовок", h1: "Текст" },
  en: { badge: "Heading", h1: "Text" },
  uz: { badge: "Sarlavha", h1: "Matn" },
};

function MyComponent() {
  const { lang } = useApp();
  const c = COPY[lang] ?? COPY.ru;
  ...
}
```

The `?? COPY.ru` fallback ensures Russian is always shown if an unknown language value somehow reaches the component.

### Server shell + Client content pattern

When a route needs both SEO metadata and localised content:

```tsx
// app/about/page.tsx — Server Component
import { AboutPage } from "@/components/sections/AboutPage";
export const metadata: Metadata = { title: "О компании | ARKANA" };
export default function About() { return <AboutPage />; }

// components/sections/AboutPage.tsx — Client Component
"use client";
export function AboutPage() {
  const { lang } = useApp();
  ...
}
```
