# Known Limitations

This document honestly describes the current constraints, trade-offs, and pending work in the ARKANA website. Each item includes context and a recommended resolution path.

---

## 1. GoARKAN API Not Reachable from Vercel

**Status**: Active limitation  
**Impact**: High — all CMS data (pricing, cases, contacts, blog) is not served from GoARKAN on the live site. ISR returns `null` for all data fetches. Pages display fallback/empty states.

**Root cause**: GoARKAN is deployed on a private LAN at `http://192.168.112.11` (Tashkent office). Vercel's serverless functions run in public cloud infrastructure and cannot reach private LAN addresses.

**Resolution**: Deploy GoARKAN behind a public endpoint:
- Option A: Nginx reverse proxy on a public VPS with TLS
- Option B: Move GoARKAN deployment to a cloud VPS
- Option C: VPN tunnel between Vercel and the office network (complex)

Until resolved: all ISR data returns `null`, the email fallback handles all lead submissions, and static content is used where GoARKAN data would otherwise appear.

---

## 2. Blog Content Available Only in Russian

**Status**: By design (pending content creation)  
**Impact**: Medium — English and Uzbek users see blog posts with Russian titles and content

**Root cause**: No English or Uzbek blog content exists. The blog section was built with Russian content only. The category filter UI adapts to the current language, but post bodies do not.

**Resolution**: Create translated blog posts in GoARKAN for EN and UZ languages. The API already supports `lang` parameter for blog endpoints. Once content exists, `BlogPage.tsx` needs to be updated to pass `lang` to the blog fetch.

---

## 3. Favicon Not Square

**Status**: Minor cosmetic issue  
**Impact**: Low — favicon may appear slightly cropped in some browser tabs

**Root cause**: `public/logo-3d.png` (and the copies in `app/icon.png`) is 657×464 pixels — not square. Browser tabs and Apple touch icons expect a square image. Next.js scales it, which can cause slight cropping.

**Resolution**: Create a square variant of the logo (512×512 or 192×192) and replace `app/icon.png`, `app/apple-icon.png`, and the `icons` entries in `app/layout.tsx`. A square version with transparent background and centered logo is ideal.

---

## 4. No Static Fallback for Pricing

**Status**: Active limitation  
**Impact**: Medium — the `/pricing` page shows an empty section when GoARKAN is unavailable

**Root cause**: By architectural decision, pricing is never hardcoded. The design intent is that pricing is always live from GoARKAN.

**Resolution**: Either:
- A: Fix GoARKAN connectivity (see #1) — preferred
- B: Add a minimal static fallback pricing array in `HomePricing.tsx` as a last resort, clearly marked as "indicative" and linking to `/contact` for accurate pricing

---

## 5. No Analytics Data Collected

**Status**: Pending configuration  
**Impact**: Medium — no visibility into traffic, user behaviour, or lead conversion

**Root cause**: `NEXT_PUBLIC_GA_ID` and `NEXT_PUBLIC_YANDEX_METRIKA_ID` env vars are not set in the Vercel production environment.

**Resolution**:
1. Create GA4 property in Google Analytics → get Measurement ID (`G-XXXXXXXXXX`)
2. Create counter in Yandex.Metrika → get counter ID
3. Add both to Vercel env vars
4. Redeploy

---

## 6. No Search Engine Verification

**Status**: Pending configuration  
**Impact**: Medium — Google Search Console and Yandex Webmaster cannot verify ownership

**Root cause**: `NEXT_PUBLIC_GOOGLE_SITE_VERIFY` and `NEXT_PUBLIC_YANDEX_VERIFICATION` env vars are not set.

**Resolution**: Complete domain verification in both platforms and add the codes to Vercel env vars. Alternatively, use DNS TXT record verification (does not require code changes).

---

## 7. No Custom 404 Page

**Status**: Minor  
**Impact**: Low — users hitting invalid URLs see the default Next.js 404 page, which is unstyled and does not match the ARKANA design

**Resolution**: Create `app/not-found.tsx` with the standard navigation, a friendly message, and a link back to the homepage.

---

## 8. Blog Post Sitemap Entries Are Hardcoded

**Status**: Active limitation  
**Impact**: Low — new blog posts are not automatically added to `/sitemap.xml`

**Root cause**: `app/sitemap.ts` lists 6 blog post URLs statically. New posts added in GoARKAN are not reflected until a developer manually adds them.

**Resolution**: Update `app/sitemap.ts` to dynamically fetch blog slugs from GoARKAN:

```ts
const posts = await getBlog("ru", { limit: 100 });
const blogEntries = posts.items.map((p) => ({
  url: `${BASE}/blog/${p.slug}`,
  lastModified: p.published_at ? new Date(p.published_at) : now,
  changeFrequency: m,
  priority: 0.6,
}));
```

This requires GoARKAN to be publicly accessible (see #1).

---

## 9. No On-Demand ISR Revalidation

**Status**: Minor  
**Impact**: Low — content updates in GoARKAN take up to 1 hour to appear on the live site

**Root cause**: No `revalidateTag()` or `revalidatePath()` webhook is implemented.

**Resolution**: Implement `app/api/revalidate/route.ts` and configure GoARKAN to POST to it when content changes:

```ts
// app/api/revalidate/route.ts
export async function POST(request: Request) {
  const { path, secret } = await request.json();
  if (secret !== process.env.REVALIDATE_SECRET) return Response.json({ error: "Unauthorized" }, { status: 401 });
  revalidatePath(path);
  return Response.json({ revalidated: true });
}
```

---

## 10. UTM Parameters Not Passed to GoARKAN

**Status**: Minor  
**Impact**: Low — lead attribution data is incomplete in GoARKAN CRM

**Root cause**: The Server Action reads the `referer` header but does not extract `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` from the URL.

**Resolution**: Add a hidden form field populated client-side from `window.location.search` before form submission. Pass the extracted UTM values to `submitLead()`.

---

## 11. No Error Tracking / Alerting

**Status**: Pending setup  
**Impact**: Medium — production errors are only visible in Vercel function logs, which are not monitored

**Resolution**: Integrate Sentry for Next.js:

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

Add `SENTRY_DSN` to Vercel env vars.

---

## 12. Lead UTM Data Not Collected from Homepage CTAs

**Status**: Minor  
**Impact**: Low — leads from specific homepage sections (hero, pricing CTA, etc.) have no attribution

**Resolution**: When homepage CTA buttons are clicked, store the source section in sessionStorage, then read it in the contact form and pass as `interested_in` to `submitLead()`.
