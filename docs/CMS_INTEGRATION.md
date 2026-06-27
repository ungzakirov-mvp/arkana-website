# CMS Integration

The GoARKAN platform serves as the headless CMS for the ARKANA website. All content that changes over time — pricing, case studies, contacts, FAQ, blog posts — is fetched from GoARKAN via its public website API.

The website itself stores **no content**. There is no database, no static JSON files, and no hardcoded pricing. The only exception is blog posts in `components/sections/BlogPage.tsx`, which are currently hardcoded as a fallback (see [KNOWN_LIMITATIONS.md](KNOWN_LIMITATIONS.md)).

---

## Content Types

| Content | API Path | Revalidate | Fallback |
|---|---|---|---|
| Site settings | `/api/public/website/settings` | 900 s | `null` (footer shows static defaults) |
| Pricing plans | `/api/public/website/pricing` | 3600 s | `[]` (empty pricing section) |
| Case studies | `/api/public/website/cases` | 3600 s | `[]` (empty cases section) |
| Client logos | `/api/public/website/clients` | 3600 s | `[]` (no logo bar) |
| Team members | `/api/public/website/team` | 3600 s | `[]` (no team section) |
| FAQ items | `/api/public/website/faq` | 3600 s | `[]` (no FAQ section) |
| Blog list | `/api/public/website/blog` | 1800 s | `{ total: 0, items: [] }` |
| Blog post | `/api/public/website/blog/:slug` | 1800 s | `null` (post not found state) |
| Homepage bundle | `/api/public/website/homepage` | 900 s | `null` (all sections empty) |

---

## How Fetching Works

All requests go through the `apiFetch<T>()` helper in `lib/cms-api.ts`:

```ts
async function apiFetch<T>(path, params?, revalidate = 3600): Promise<T | null>
```

It constructs a URL using `GOARKAN_API_URL` env var (default: `http://192.168.112.11`), appends query parameters, and calls Next.js `fetch()` with:

```ts
{ headers: { "X-Tenant-Domain": "arkana.uz" }, next: { revalidate } }
```

On any error (network failure, non-2xx response, timeout), it logs to `console.error` and returns `null`. The calling page renders an empty state.

---

## ISR Behaviour

Next.js caches each `fetch()` response keyed by URL + headers. The `revalidate` value tells Next.js when to check for fresh data.

**Timeline for a settings fetch (revalidate: 900)**:

```
t=0:    First request after deploy → GoARKAN called → response cached
t=1–899: Subsequent requests → served from cache, no GoARKAN call
t=900:  Cache is "stale" → Next.js serves stale data THEN triggers background revalidation
t=901:  GoARKAN called in background → if successful, cache updated
t=902+: Fresh data served
```

**If GoARKAN is unreachable at t=900**:
- Next.js keeps serving the stale (t=0) response.
- Revalidation is attempted again at t=1800, t=2700, etc.
- Users always see the last successfully fetched data.

This means: as long as GoARKAN was available at least once after deploy, its data remains visible even during extended outages.

---

## Site Settings

`SiteSettings` is the most important data object. It drives:

- Footer contact details (phones, emails, Telegram, WhatsApp, address)
- Working hours
- Social media links
- Copyright text
- Announcement banner (when `announcement_enabled: true`)

The `getSettings()` call runs in `app/layout.tsx`:

```ts
const siteSettings = await getSettings("ru");
```

The result is passed as a prop to `<Footer settings={siteSettings} />`.

**Note**: Settings are fetched with language `"ru"`. Because most settings are language-neutral (phones, emails), this is sufficient. If i18n settings are needed in the future, this call can be parameterised by the server-rendered language.

---

## Pricing Plans

Pricing plans are managed entirely in GoARKAN's subscription plan database. The `getPricing()` function fetches and enriches the raw plan data:

- `price_label`: Formatted price string localised per language (`от X сум` / `from X UZS` / `X so'mdan`)
- `cta_label`: `"Начать"` or `"Связаться"` depending on `website_show_contact_sales`
- `services`: Derived chips from `ticket_limit_monthly` and `max_workstations`

**To update pricing**: change the plan in GoARKAN. The site reflects changes within the next ISR cycle (up to 1 hour).

---

## Blog

Blog posts are stored in GoARKAN with the following fields:

```ts
interface BlogPostFull {
  slug: string;
  title: string;
  excerpt: string;
  cover_url?: string;
  tags: string[];
  published_at: string;
  body_md: string;        // Markdown content
  seo_title?: string;
  seo_desc?: string;
  og_image?: string;
}
```

Blog post body is rendered as Markdown. The current blog page (`components/sections/BlogPage.tsx`) uses a hardcoded post list as a fallback. The dynamic route `app/blog/[slug]/page.tsx` fetches the full post from GoARKAN.

**To add a blog post**: create it in GoARKAN CMS. The blog list auto-updates within 30 minutes.

---

## FAQ

FAQ items are fetched per-page via `getFaq(lang, page)`. The `page` parameter is a slug like `"global"`, `"pricing"`, etc. Currently, FAQ is not rendered on the website pages (it's implemented in `lib/cms-api.ts` but no page currently calls it). This is available for future use.

---

## What Happens When GoARKAN Is Unavailable

1. **ISR cache hit**: If GoARKAN was reachable during the last revalidation, the cached response is served. Users see no difference.

2. **ISR cache miss (first deploy, or cache expired)**: `apiFetch` returns `null`. Each component handles this:
   - `Footer`: shows hardcoded fallback contacts
   - `HomePricing`: shows empty pricing section or "contact us" fallback message
   - `HomeCases`: shows empty section
   - `BlogPage`: shows hardcoded post list

3. **Lead submission**: GoARKAN is tried first. On failure, Resend email is sent to `info@arkana.uz`. See [GOARKAN_INTEGRATION.md](GOARKAN_INTEGRATION.md) for details.

---

## Updating Contacts

Contacts (phone, email, address) are in GoARKAN site settings. To update:

1. Log in to GoARKAN admin panel.
2. Navigate to Website Settings → Contacts.
3. Update the relevant fields.
4. Changes appear on the website within 15 minutes (ISR revalidate: 900).

Do not hardcode contacts in any component. All contact information flows from `SiteSettings`.
