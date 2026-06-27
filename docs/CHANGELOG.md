# Changelog

## RC2 — 2026-06-27

**Release Candidate 2. Production-ready. Focused on bug fixes, SEO hardening, and documentation.**

### Bug Fixes

- **Language switcher layout jump**: CTA button in navigation now has `minWidth: 164px` and `whiteSpace: nowrap`, preventing layout reflow when switching between RU/EN/UZ languages. Root cause was CTA text length varying from "Получить предложение" (long) to "Taklif olish" (short).
- **About and Services pages were RU-only**: Pages were Server Components that could not use `useApp()` hook. Converted to server shell + client component pattern (`AboutPage.tsx`, `ServicesPage.tsx`). All three languages now work correctly.
- **Phone field asterisk mismatch**: Contact form showed `Телефон *` (indicating required) but phone was optional in Zod validation. Removed the asterisk in all three language variants.
- **Contact form email destination**: Form submissions were going to `ung.zakirov@gmail.com` instead of `info@arkana.uz`. Fixed `CONTACT_TO_EMAIL` env var in Vercel.
- **Missing sitemap entries**: `/about` and all four service sub-pages were absent from `/sitemap.xml`. Added 5 missing entries.
- **Blog category filter reset on lang change**: When switching language, the category filter label changed (e.g., "Все" → "All") but the selected category state retained the old value. Fixed by using `allLabel` variable consistently for both initialisation and comparison.

### SEO

- **Favicon**: Replaced default Next.js triangle (▲) with ARKANA logo. Added `app/icon.png` and `app/apple-icon.png` (App Router convention).
- **Schema.org**: Complete rewrite of `lib/seo.ts`. Added `Organization` with telephone and dual `contactPoint`, `LocalBusiness`/`ProfessionalService` with `areaServed` (City + Country), `hasOfferCatalog`, `priceRange`.
- **Structured data on inner pages**: Added `Article` + `BreadcrumbList` schemas on all blog post pages. Added `BreadcrumbList` on all four service sub-pages.
- **Analytics infrastructure**: GA4 and Yandex.Metrika loading code added to `app/layout.tsx`. Scripts only load when env vars `NEXT_PUBLIC_GA_ID` and `NEXT_PUBLIC_YANDEX_METRIKA_ID` are set.
- **Search console verification**: `metadata.verification.google` and `.yandex` wired to env vars.
- **hreflang**: Added `alternates.languages` with ru/en/uz/x-default all pointing to `SITE_URL`.
- **Robots**: Added `max-image-preview: "large"` and `max-snippet: -1` for Google.
- **Keywords**: Expanded to 11 targeted keywords.

### Email / Lead Flow

- **Resend sender domain**: Updated from `onboarding@resend.dev` to `noreply@arkana.uz` (verified domain).
- **New Resend API key**: Updated to key provisioned 2026-06-27.
- **Email destination**: Fixed `CONTACT_TO_EMAIL` on Vercel to `info@arkana.uz`.

### Documentation

- Created `/docs` directory with 16 documentation files covering all aspects of the codebase, deployment, maintenance, and known limitations.

---

## RC1 — 2026-06 (initial release candidate)

**Full website launch. All pages built and deployed.**

### Milestones

- **Project scaffolding**: Next.js 16 App Router, TypeScript, Tailwind CSS v4, React 19.
- **Design system**: CSS custom properties for theming, dark/light mode, font setup (Inter + Nacelle), global utility classes.
- **Homepage**: 11 sections — Hero (with Three.js 3D canvas), Trust, WhyARKANA, Services, Platform preview, Process, Pricing, Cases, Calculator, CTA, Contact.
- **Inner pages**: About, Services overview, 4 service sub-pages, Pricing, GoARKAN, Cases, Blog, Contact, Privacy.
- **Multilingual**: Full RU/EN/UZ support via client-side language switching. Translations in `lib/i18n.ts` and per-component `COPY` objects.
- **GoARKAN integration**: `lib/cms-api.ts` with ISR fetching for all content types. Lead submission with Resend email fallback.
- **Contact form**: Zod validation, honeypot spam protection, Upstash Redis rate limiting (5/IP/hr), Server Action with GoARKAN → Resend fallback chain.
- **Security**: CSP, HSTS, X-Frame-Options, Permissions-Policy in `proxy.ts` middleware.
- **SEO foundation**: Metadata, Open Graph, Twitter cards, canonical URLs, sitemap, robots.txt, Schema.org JSON-LD on all pages.
- **Vercel deployment**: GitHub → Vercel CI/CD pipeline. Production on `arkana.uz`.
