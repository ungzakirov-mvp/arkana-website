# Maintenance Guide

## Updating Pricing

**Source of truth**: GoARKAN admin panel → Subscription Plans

1. Log in to GoARKAN.
2. Navigate to **Plans → Subscription Plans**.
3. Update price, features, name, or description.
4. Set `website_show_contact_sales = true` for plans that should show "Contact us" instead of a price.
5. Changes appear on `arkana.uz/pricing` within **1 hour** (ISR revalidate: 3600 s).

To force an immediate update, trigger a Vercel redeploy:
```bash
npx vercel --prod
```

---

## Updating Contacts

**Source of truth**: GoARKAN → Website Settings → Contacts

1. Log in to GoARKAN.
2. Navigate to **Website → Settings**.
3. Update phones, emails, Telegram, WhatsApp, or address.
4. Changes appear in the Footer within **15 minutes** (ISR revalidate: 900 s).

Do not edit contacts in any component file — they are not hardcoded.

---

## Adding a Blog Post

**Source of truth**: GoARKAN → CMS → Blog Posts

1. Log in to GoARKAN.
2. Navigate to **Website → Blog → New Post**.
3. Fill in: slug (URL-safe, e.g. `why-outsource-it`), title, excerpt, tags, cover image.
4. Write body content in Markdown.
5. Set `published_at` to the desired publish date and `status = published`.
6. The post appears on `arkana.uz/blog` within **30 minutes**.
7. The direct URL is `arkana.uz/blog/{slug}`.

**Note**: Blog content is currently Russian-only. No translation infrastructure exists for blog posts.

Also update `app/sitemap.ts` to include the new slug:
```ts
{ url: `${BASE}/blog/your-new-slug`, lastModified: now, changeFrequency: m, priority: 0.6 },
```

---

## Adding a New Page

1. Create the directory and `page.tsx`:
   ```
   app/new-page/page.tsx
   ```

2. In `page.tsx`, export `metadata` and render a component:
   ```tsx
   import type { Metadata } from "next";
   import { NewPageSection } from "@/components/sections/NewPageSection";

   export const metadata: Metadata = {
     title: "Page Title",
     description: "...",
     alternates: { canonical: "/new-page" },
   };

   export default function NewPage() {
     return <NewPageSection />;
   }
   ```

3. Create `components/sections/NewPageSection.tsx` as a Client Component with `"use client"` and the COPY pattern for trilingual content.

4. Add the route to `app/sitemap.ts`.

5. Add a navigation link if needed (in `Navigation.tsx` and `Footer.tsx`).

---

## Adding a New Service Sub-Page

Service sub-pages follow a fixed structure. Copy an existing one (`app/services/infrastructure/page.tsx`) and modify:

1. Update `metadata` (title, description, canonical, og)
2. Update the `included` array (checklist items)
3. Update the hero heading and body text
4. Import and inject the correct service schema from `lib/seo.ts`
5. Update `buildBreadcrumbSchema` with the new page name and URL
6. Add the route to `app/sitemap.ts`
7. Add the link to `SERVICE_LINKS` in `Navigation.tsx`
8. Add the link to `components/sections/ServicesPage.tsx`

---

## Updating Translations

**For global translations** (navigation, homepage sections, footer):

Edit `lib/i18n.ts`. The file contains a `translations` object with `ru`, `en`, and `uz` keys.

**For page-specific translations** (About, Services, Blog, etc.):

Each client component in `components/sections/` has a local `COPY` object. Edit the `ru`, `en`, and `uz` entries directly in the component file.

---

## Updating the Resend API Key

1. Log in to [resend.com](https://resend.com).
2. Go to **API Keys** → Create a new key with **Send access**.
3. In Vercel: **Settings → Environment Variables** → update `RESEND_API_KEY`.
4. Trigger a redeploy.
5. Test by submitting the contact form and confirming email delivery to `info@arkana.uz`.

---

## Rotating Upstash Redis Credentials

1. Log in to [upstash.com](https://upstash.com).
2. Select the Redis database → **Details** → regenerate REST token.
3. Update `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in Vercel.
4. Trigger a redeploy.

---

## Deployment Workflow

For all code changes:

```
1. Make changes locally
2. Test: npm run dev
3. Build check: npm run build
4. git add / git commit / git push origin main
5. Vercel auto-deploys from main branch
6. Monitor Vercel dashboard for build status
7. Run smoke test after deploy (see RELEASE_CHECKLIST.md)
```

For content-only changes (pricing, contacts, blog):
- Update in GoARKAN — no code deploy needed.
- Wait for ISR revalidation interval or trigger a redeploy.

---

## Monitoring

No automated monitoring is configured. Recommended additions:

- **Uptime**: UptimeRobot or Vercel's built-in checks on `https://arkana.uz`
- **Error tracking**: Sentry (Next.js integration available, not installed)
- **Core Web Vitals**: Google Search Console → Core Web Vitals report
- **Analytics**: GA4 dashboard + Yandex.Metrika dashboard

---

## Dependency Updates

Run monthly or when a security vulnerability is reported:

```bash
npm outdated               # see what's behind
npm update                 # update within semver ranges
npm audit                  # check for vulnerabilities
npm audit fix              # auto-fix safe updates
```

For major version upgrades (e.g., Next.js 17), test thoroughly on a branch before merging to `main`.
