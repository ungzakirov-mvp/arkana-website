# Architecture

## Overview

The ARKANA website is a **Next.js 16 App Router** application deployed on **Vercel**. It is a marketing site — not a full-stack application — and the primary backend is the **GoARKAN** internal platform running on a private LAN.

```
Browser
  │
  ▼
Vercel CDN  (Edge network, global PoP)
  │
  ├─► Static assets    (images, fonts, CSS)          — served from CDN
  ├─► Next.js RSC      (server components, ISR)      — Vercel Functions
  ├─► Server Actions   (contact form)                — Vercel Functions
  └─► /sitemap.xml
      /robots.txt
```

---

## Next.js App Router

The project uses the **App Router** (`app/` directory), not the Pages Router. Key implications:

- Every file in `app/` is a **Server Component** by default.
- Components that need browser APIs, React state, or event handlers must add `"use client"` as the first line.
- `export const metadata` in a page file is the Next.js way to set `<title>`, `<meta>`, and Open Graph tags. This only works in Server Components.
- Data fetching happens at the server level using `fetch()` with `next: { revalidate }` for ISR.

---

## Component Hierarchy

```
app/layout.tsx  (Server Component — root layout)
  │
  ├── ThemeLanguageProvider  (Client)  — React Context for theme + lang
  │     │
  │     ├── Navigation        (Client)  — pill nav, lang switcher, theme toggle
  │     │
  │     ├── <page content>
  │     │     ├── Homepage: HomeSections[]  (Client)
  │     │     ├── About:    AboutPage       (Client)
  │     │     ├── Services: ServicesPage    (Client)
  │     │     └── …other pages
  │     │
  │     └── Footer            (Server)  — contacts from GoARKAN settings
  │
  └── Analytics scripts (GA4, Yandex.Metrika) — inline/Script tags
```

---

## Client vs Server Components

The critical rule: **metadata can only be exported from Server Components**.

This creates a dual-component pattern for pages that need both localised content and SEO metadata:

```
app/about/page.tsx          ← Server Component: exports metadata, renders AboutPage
components/sections/AboutPage.tsx  ← Client Component: useApp(), trilingual COPY
```

The Server Component acts as a thin shell. All UI logic lives in the Client Component.

**Server Components** (no `"use client"`):
- `app/layout.tsx`
- `app/*/page.tsx` (all route shells)
- `components/layout/Footer.tsx`

**Client Components** (`"use client"` at top):
- `components/providers/ThemeLanguageProvider.tsx`
- `components/layout/Navigation.tsx`
- All `components/home/Home*.tsx`
- All `components/sections/*.tsx`
- `components/canvas/ArkanaCore.tsx`

---

## Localisation (i18n)

Language switching is entirely **client-side**. There is no URL-based routing per locale (no `/ru/`, `/en/`, `/uz/` paths).

**State**: `ThemeLanguageProvider` holds `lang: "ru" | "en" | "uz"` in React state.  
**Persistence**: `localStorage.setItem("ark-lang", lang)` — survives page reload.  
**Hook**: `const { lang } = useApp()` — any client component can read the current language.

**Translation pattern** used in every client component:

```tsx
const COPY: Record<string, { title: string; body: string }> = {
  ru: { title: "Заголовок", body: "Текст" },
  en: { title: "Title", body: "Text" },
  uz: { title: "Sarlavha", body: "Matn" },
};

export function MyComponent() {
  const { lang } = useApp();
  const c = COPY[lang] ?? COPY.ru;  // ru is always the fallback
  return <h1>{c.title}</h1>;
}
```

**Global translations** for navigation, footer, and homepage sections are in `lib/i18n.ts` as a typed `translations` object. The `ThemeLanguageProvider` exposes `t: Translations` from context.

**hreflang**: Since all three locales share the same URL, all four hreflang entries (ru, en, uz, x-default) point to `https://arkana.uz`. This is valid per Google guidelines.

---

## ISR (Incremental Static Regeneration)

All GoARKAN data fetches use `next: { revalidate: N }` in the `fetch()` options. This means:

1. First request after deploy: Next.js fetches from GoARKAN and caches the response.
2. Subsequent requests within `N` seconds: served from cache, no GoARKAN call.
3. After `N` seconds: Next.js serves the stale cache while revalidating in the background.
4. If GoARKAN is unreachable during revalidation: Next.js keeps serving the last successful response.

| Data type | Revalidate interval |
|---|---|
| Site settings | 900 s (15 min) |
| Pricing plans | 3600 s (1 hr) |
| Case studies | 3600 s (1 hr) |
| FAQ | 3600 s (1 hr) |
| Blog list | 1800 s (30 min) |
| Blog post | 1800 s (30 min) |
| Homepage bundle | 900 s (15 min) |

---

## GoARKAN Integration

GoARKAN is the internal CRM/ITSM platform at `http://192.168.112.11` (private LAN, Tashkent office).

The website calls GoARKAN for:
- Website settings (contacts, brand, SEO overrides)
- Pricing plans
- Case studies
- Client logos
- Team members
- FAQ
- Blog posts
- Lead submission

**Critical constraint**: GoARKAN is **not reachable from Vercel**. Vercel runs in a public cloud; `192.168.112.11` is a private address. This means:

- All ISR fetches return `null` on Vercel — pages display the empty fallback state.
- Lead submissions fall back to Resend email (`noreply@arkana.uz` → `info@arkana.uz`).

To fix this, GoARKAN needs a public endpoint. See [KNOWN_LIMITATIONS.md](KNOWN_LIMITATIONS.md) and [GOARKAN_INTEGRATION.md](GOARKAN_INTEGRATION.md).

---

## Lead Flow

```
User fills contact form
        │
        ▼
Server Action: submitContact()
        │
        ├─ 1. Honeypot check (bot filter)
        ├─ 2. Rate limit check (Upstash Redis, 5/IP/hr)
        ├─ 3. Zod validation
        │
        ▼
submitLead() in lib/cms-api.ts
        │
        ├─► GoARKAN POST /api/public/website/leads   (primary)
        │       └── If ok: return {ok:true, lead_id}
        │       └── If 429: return rate_limited
        │       └── If error/unreachable:
        │
        └─► Resend email to info@arkana.uz           (fallback)
                └── If ok: return {ok:true}
                └── If error: return {ok:false, error}
```

---

## Security Headers

`proxy.ts` exports a middleware function applied to all routes (except static files). Headers set:

- `Content-Security-Policy` — blocks inline eval, restricts origins
- `Strict-Transport-Security` — 2-year HSTS with preload
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Resource-Policy: same-origin`
- `Permissions-Policy` — denies camera, mic, geolocation, payment, USB, Bluetooth, serial
- Removes `X-Powered-By`

---

## Deployment Architecture

```
GitHub (main branch)
        │
        ▼ push triggers
Vercel CI
        ├─ npm install
        ├─ npm run build  (TypeScript + Next.js)
        └─ Deploy to Vercel Edge Network
                │
                ├── Static assets    → Vercel CDN
                ├── Server functions → Vercel Serverless (Node 20)
                └── Environment vars → Vercel project settings
```

Production domain: `arkana.uz`  
Vercel project: `arkana-website`  
Branch → environment mapping: `main` → Production
