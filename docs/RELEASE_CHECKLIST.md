# Release Checklist

Use this checklist before every production release. Work through each section in order.

---

## 1. Build Verification

- [ ] `npm run build` completes with zero errors
- [ ] `npm run lint` returns zero ESLint errors or warnings
- [ ] TypeScript compilation shows no type errors (included in build step)
- [ ] No `console.log` debug statements in source files

---

## 2. Environment Variables

- [ ] `RESEND_API_KEY` is set in Vercel Production
- [ ] `CONTACT_TO_EMAIL` is set to `info@arkana.uz`
- [ ] `NEXT_PUBLIC_BASE_URL` is set to `https://arkana.uz`
- [ ] `UPSTASH_REDIS_REST_URL` is set (rate limiting active)
- [ ] `UPSTASH_REDIS_REST_TOKEN` is set
- [ ] Analytics IDs set (if applicable): `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_YANDEX_METRIKA_ID`
- [ ] Verification codes set (if applicable): `NEXT_PUBLIC_GOOGLE_SITE_VERIFY`, `NEXT_PUBLIC_YANDEX_VERIFICATION`

---

## 3. Contact Form

- [ ] Form renders correctly on `/contact`
- [ ] Submit with all required fields → success message appears
- [ ] Email arrives at `info@arkana.uz` (check inbox within 60 seconds)
- [ ] Email `from` shows `ARKANA Website <noreply@arkana.uz>`
- [ ] Submit with empty required fields → validation errors shown
- [ ] Submit with invalid email → error shown for email field
- [ ] Phone field is optional (no asterisk, no error if empty)
- [ ] Honeypot field is not visible to users

---

## 4. Navigation

- [ ] Logo links to `/`
- [ ] Services dropdown opens on click, shows all 5 links
- [ ] All desktop nav links work: Pricing, GoARKAN, Cases, Blog, Contact
- [ ] CTA button links to `/contact`
- [ ] Mobile hamburger opens/closes correctly
- [ ] Mobile menu has lang switcher + CTA
- [ ] Nav background darkens on scroll

---

## 5. Language Switcher

- [ ] RU → EN → UZ switching works without page reload
- [ ] Language preference persists after page reload (localStorage)
- [ ] CTA button width does not shift layout when switching languages
- [ ] Nav labels update correctly in all three languages
- [ ] Page content updates when switching languages (About, Services, etc.)
- [ ] Language state is preserved when navigating between pages

---

## 6. Theme Toggle

- [ ] Dark mode is the default
- [ ] Theme toggle switches between dark and light
- [ ] Theme preference persists after page reload
- [ ] All pages display correctly in both light and dark modes

---

## 7. Routing — All Pages Load

- [ ] `/` — Homepage
- [ ] `/about` — About page
- [ ] `/services` — Services overview
- [ ] `/services/it-outsourcing`
- [ ] `/services/itsm`
- [ ] `/services/infrastructure`
- [ ] `/services/managed-it`
- [ ] `/pricing` — Pricing page
- [ ] `/goarkan` — GoARKAN platform page
- [ ] `/cases` — Cases page
- [ ] `/blog` — Blog index
- [ ] `/blog/it-outsourcing-vs-staff` — Sample blog post
- [ ] `/contact` — Contact page
- [ ] `/privacy` — Privacy policy

---

## 8. SEO and Metadata

- [ ] Page `<title>` matches expected value for each route
- [ ] `<meta name="description">` is present on all pages
- [ ] `<link rel="canonical">` is correct for each page
- [ ] Open Graph tags present (check with [opengraph.xyz](https://opengraph.xyz) or similar)
- [ ] Twitter card tags present
- [ ] `/sitemap.xml` returns 200 and lists all 18 URLs
- [ ] `/robots.txt` allows `/` and disallows `/api/`
- [ ] Structured data present in page source (`<script type="application/ld+json">`)
- [ ] Google verification meta tag present (if `NEXT_PUBLIC_GOOGLE_SITE_VERIFY` set)
- [ ] Yandex verification meta tag present (if `NEXT_PUBLIC_YANDEX_VERIFICATION` set)

---

## 9. Analytics

- [ ] GA4 script loads (if `NEXT_PUBLIC_GA_ID` set) — check in browser DevTools → Network
- [ ] Yandex.Metrika script loads (if `NEXT_PUBLIC_YANDEX_METRIKA_ID` set)
- [ ] No analytics script loads in development (unless env vars explicitly set)

---

## 10. Favicon and Brand

- [ ] Browser tab shows ARKANA logo (not the Next.js triangle)
- [ ] Apple touch icon is correct
- [ ] Navigation logo renders correctly (dark and light mode)
- [ ] OG image renders in social share previews

---

## 11. Responsive Design

- [ ] Homepage renders correctly at 375px (mobile)
- [ ] Homepage renders correctly at 768px (tablet)
- [ ] Homepage renders correctly at 1280px (desktop)
- [ ] Navigation collapses to hamburger on mobile
- [ ] No horizontal scroll on any breakpoint
- [ ] Contact form is usable on mobile

---

## 12. Performance (Baseline)

- [ ] Lighthouse score ≥ 85 Performance (desktop)
- [ ] Largest Contentful Paint < 2.5 seconds
- [ ] No Cumulative Layout Shift from nav language switching
- [ ] 3D canvas (ArkanaCore) loads without blocking LCP

---

## 13. GoARKAN Connectivity Check

- [ ] If GoARKAN accessible: pricing section shows real plan data
- [ ] If GoARKAN inaccessible: pricing section shows empty state (no crash)
- [ ] Footer shows contact data (or fallback if GoARKAN down)
- [ ] Lead submission works via email fallback when GoARKAN is down (test manually)

---

## 14. Final Smoke Test

- [ ] Open homepage in incognito browser
- [ ] Switch language to EN
- [ ] Navigate to `/services` — content in English
- [ ] Navigate to `/contact` — form in English
- [ ] Submit the form
- [ ] Confirm success message appears
- [ ] Confirm email received at `info@arkana.uz`
- [ ] Switch to dark mode — all pages look correct
- [ ] Switch to UZ — navigation and content update

---

## Sign-off

| Check | Status | Date | By |
|---|---|---|---|
| Build passes | | | |
| Forms tested | | | |
| SEO verified | | | |
| Responsive checked | | | |
| Analytics active | | | |
| Production deployed | | | |
