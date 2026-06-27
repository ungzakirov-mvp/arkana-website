# Routing

## Route Table

| Route | File | Purpose | SEO Title |
|---|---|---|---|
| `/` | `app/page.tsx` | Homepage | IT-аутсорсинг в Ташкенте \| ARKANA |
| `/about` | `app/about/page.tsx` | Company overview | О компании ARKANA \| Технологический партнёр |
| `/services` | `app/services/page.tsx` | Services overview | Услуги \| ARKANA — Технологический партнёр |
| `/services/it-outsourcing` | `app/services/it-outsourcing/page.tsx` | IT Outsourcing service | IT-аутсорсинг для бизнеса \| ARKANA |
| `/services/itsm` | `app/services/itsm/page.tsx` | IT Service Management | IT Service Management \| GoARKAN \| ARKANA |
| `/services/infrastructure` | `app/services/infrastructure/page.tsx` | Infrastructure management | Управление IT-инфраструктурой \| ARKANA |
| `/services/managed-it` | `app/services/managed-it/page.tsx` | Cybersecurity | Кибербезопасность для бизнеса \| ARKANA |
| `/pricing` | `app/pricing/page.tsx` | Pricing plans | Тарифы \| ARKANA |
| `/goarkan` | `app/goarkan/page.tsx` | GoARKAN platform overview | GoARKAN — ITSM-платформа \| ARKANA |
| `/cases` | `app/cases/page.tsx` | Case studies | Кейсы \| ARKANA |
| `/blog` | `app/blog/page.tsx` | Blog index | Блог \| ARKANA |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Blog post detail | *post.title* \| ARKANA |
| `/contact` | `app/contact/page.tsx` | Contact form | Контакты \| ARKANA |
| `/privacy` | `app/privacy/page.tsx` | Privacy policy | Политика конфиденциальности \| ARKANA |

---

## Dynamic Routes

### `/blog/[slug]`

File: `app/blog/[slug]/page.tsx`

The `slug` parameter maps to a blog post. Data is fetched from GoARKAN via `getBlogPost(slug)`. If the post is not found (`null` returned), the page renders a "not found" state — it does **not** call `notFound()`, so the response returns 200 with an empty state.

To add `generateStaticParams()` (pre-render known slugs at build time), update the file with:

```tsx
export async function generateStaticParams() {
  const posts = await getBlog("ru", { limit: 100 });
  return posts.items.map((p) => ({ slug: p.slug }));
}
```

This is not currently implemented — blog pages are rendered on-demand and cached via ISR.

---

## SEO Metadata

Every route exports a `metadata` object from its Server Component `page.tsx`:

```tsx
export const metadata: Metadata = {
  title: "Page Title",
  description: "...",
  alternates: { canonical: "/route-path" },
  openGraph: { title: "...", description: "...", url: "/route-path" },
};
```

The root `app/layout.tsx` defines:
- `metadata.title.template: "%s | ARKANA"` — page titles are appended automatically
- Default `description`, `keywords`, `openGraph`, `twitter` for pages that don't override them
- `alternates.canonical: SITE_URL`
- `alternates.languages: { ru, en, uz, "x-default" }` — all pointing to `SITE_URL`
- `robots: { index: true, follow: true, googleBot: { … } }`
- `verification.google` and `verification.yandex` (from env vars)

---

## 404 Handling

Next.js App Router serves a default 404 page for routes that don't match any `page.tsx`. There is no custom `not-found.tsx` file currently — the Next.js default is used.

To add a custom 404 page, create `app/not-found.tsx`:

```tsx
export default function NotFound() {
  return <div>404 — Page not found</div>;
}
```

---

## Protected Routes

There are no protected routes on this website. All pages are publicly accessible. Authentication and protected areas exist in the GoARKAN application, not on the marketing site.

---

## Navigation Link Reference

The `Navigation` component uses a hardcoded list of links:

```
Services (dropdown) → /services, /services/it-outsourcing, /services/itsm,
                       /services/infrastructure, /services/managed-it
Pricing             → /pricing
GoARKAN             → /goarkan
Cases               → /cases
Blog                → /blog
Contact             → /contact
```

The footer links to: `/services`, `/services/it-outsourcing`, `/services/itsm`, `/services/infrastructure`, `/services/managed-it`, `/about`, `/contact`, `/privacy`.

---

## Sitemap

Generated at `/sitemap.xml` by `app/sitemap.ts`. All 18 entries are hardcoded with `changeFrequency` and `priority` values appropriate to content update frequency.

To add a new page to the sitemap, add an entry in `app/sitemap.ts`:

```ts
{ url: `${BASE}/new-page`, lastModified: now, changeFrequency: m, priority: 0.7 },
```
