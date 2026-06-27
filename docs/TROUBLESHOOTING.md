# Troubleshooting

---

## GoARKAN Is Unavailable

**Symptom**: Pricing section is empty, footer shows no contact details, case studies don't load.

**Explanation**: GoARKAN at `http://192.168.112.11` is only reachable from the Tashkent office LAN. Vercel cannot connect to it. All content fetches return `null` and components render empty fallback states.

**Fix**:
1. Confirm GoARKAN is running: access `http://192.168.112.11` from the office network.
2. If running, the issue is network reachability from Vercel. GoARKAN needs a public endpoint. See [GOARKAN_INTEGRATION.md](GOARKAN_INTEGRATION.md) → "Making GoARKAN Publicly Accessible".
3. If GoARKAN is down: restart the GoARKAN service, wait for ISR to revalidate, or trigger a Vercel redeploy.

**Immediate workaround**: The website still functions — the contact form falls back to Resend email, and ISR serves the last cached data.

---

## Lead Not Created in GoARKAN

**Symptom**: User submits contact form, receives success message, but no lead appears in GoARKAN CRM.

**Most likely cause**: GoARKAN was unreachable (see above). The lead was delivered via Resend email instead.

**Check**:
1. Check `info@arkana.uz` inbox for the notification email.
2. The email subject is `Новая заявка: {name} — {company}`.
3. The email footer states "Заявка получена через резервный канал (GoARKAN недоступен)."
4. Create the CRM record manually in GoARKAN.

**If neither channel worked**:
1. Check Vercel function logs: Vercel → Project → Functions → `app/actions/contact.ts`.
2. Look for `[cms-api] submitLead → ALL channels failed` in the logs.
3. Check `RESEND_API_KEY` is set and valid in Vercel.
4. Check that `arkana.uz` domain is verified in Resend.

---

## Email Not Delivered

**Symptom**: Contact form shows success, but no email arrives at `info@arkana.uz`.

**Check in order**:
1. **Spam folder** — Resend emails can end up in spam if the domain reputation is low.
2. **Resend dashboard** → Emails → filter by `noreply@arkana.uz` — check delivery status and any bounces.
3. **CONTACT_TO_EMAIL env var** — verify it is `info@arkana.uz` in Vercel, not a stale value.
4. **RESEND_API_KEY** — verify the key is active and has "Send" permission in Resend.
5. **Domain verification** — confirm `arkana.uz` is verified under Resend → Domains.
6. **Vercel function logs** — look for `[cms-api] _sendLeadEmail → Resend SDK error`.

---

## Language Not Switching

**Symptom**: Clicking RU / EN / UZ has no effect; page stays in the same language.

**Check**:
1. Confirm `ThemeLanguageProvider` wraps the entire app in `app/layout.tsx`. It must be the parent of all content.
2. Confirm the component is a Client Component (`"use client"` at top of `ThemeLanguageProvider.tsx`).
3. Open browser DevTools → Application → Local Storage → `localhost:3000` (or `arkana.uz`) → check `ark-lang` key.
4. If the key doesn't update when clicking the button, check for JavaScript errors in the Console.
5. Confirm `Navigation.tsx` calls `setLang(l)` from `useApp()`.

**Note**: If the user has localStorage disabled (rare), language switching still works for the session but does not persist across reloads.

---

## Language Switcher Jumps / Layout Shifts

**Symptom**: Nav shifts horizontally when switching languages.

**Fix**: The CTA button in `Navigation.tsx` has `minWidth: 164, whiteSpace: "nowrap"` to prevent layout shift. If shift appears again, check that these styles are present on the `<Link href="/contact">` element.

If nav labels themselves cause shift (labels have different lengths in different languages), add `minWidth` to the specific nav link container.

---

## Images Not Loading

**Symptom**: Logo, OG image, or blog cover images appear broken.

**Check**:
1. Static images in `public/` — verify the file exists at the expected path.
2. `next/image` remote domains — check `next.config.ts` for `images.remotePatterns`. GoARKAN image URLs must be whitelisted.
3. GoARKAN unavailable — `cover_url` fields return `null`, component should gracefully skip the image.
4. CSP header — the Content Security Policy in `proxy.ts` allows `img-src 'self' data: blob: https:`. If images come from a non-HTTPS source, they will be blocked.

---

## Build Failures

**Symptom**: `npm run build` fails with errors.

**Common causes**:

| Error | Fix |
|---|---|
| `Type error: ...` | Fix the TypeScript type error in the indicated file |
| `Module not found: '@/lib/seo'` | Verify the file exists; check for typos in the import path |
| `Cannot find name 'useApp'` | Add `"use client"` to the component; ensure the import is from `@/components/providers/ThemeLanguageProvider` |
| `Error: ENOENT: public/logo-3d.png` | Ensure the file exists in `public/` |
| Next.js version mismatch | Run `npm install` to resolve dependencies |

Run `npm run lint` first — it often catches the same issues faster than a full build.

---

## Hydration Mismatch Errors

**Symptom**: `Error: Hydration failed because the initial UI does not match what was rendered on the server`.

**Most common cause**: Theme or language is read from `localStorage` on the client but the server renders with defaults. The pattern in `ThemeLanguageProvider` handles this by setting state only inside `useEffect` (after hydration), and `app/layout.tsx` sets `suppressHydrationWarning` on `<html>`.

**If hydration errors appear**:
1. Confirm `suppressHydrationWarning` is on `<html>` in `app/layout.tsx`.
2. Confirm the inline theme script (in `<head>`) sets `data-theme` before React hydrates.
3. Do not read `localStorage` or `window` directly in a Server Component — only in `useEffect`.
4. Do not conditionally render content based on `window` existence without a client guard.

---

## Environment Variable Errors

**Symptom**: Build warning `RESEND_API_KEY is not set` or contact form always fails.

**Fix**:
1. Verify the variable is set in Vercel → Settings → Environment Variables.
2. Check the environment scope — Production variables are not available in Preview deployments unless explicitly scoped.
3. `NEXT_PUBLIC_*` variables are embedded at build time. After changing them, trigger a new build.
4. Non-public variables (server-only) are available at runtime — no rebuild needed for these.

**Local development**: Run `vercel env pull` to download current Vercel env vars to `.env.local`:
```bash
npx vercel env pull .env.local
```

---

## Rate Limit Issues

**Symptom**: Users report "too many requests" errors from the contact form; legitimate users are blocked.

**Check**:
1. Upstash dashboard → Redis → Monitor — check request volume.
2. Current limit: 5 submissions per IP per hour (sliding window).
3. If the limit needs adjustment, edit `lib/ratelimit.ts` → `Ratelimit.slidingWindow(5, "1 h")`.

**If a legitimate user is blocked**:
- They can try again after the reset time shown in the form.
- You can clear the rate limit for a specific IP by deleting the key in Upstash Redis console: `arkana:contact:{ip}`.

---

## 3D Canvas Not Rendering

**Symptom**: The ARKANA 3D logo on the homepage does not appear; console shows WebGL errors.

**Expected behaviour**: The canvas only renders on devices with WebGL support. It degrades gracefully — the page is fully functional without it.

**Check**:
1. Verify the browser supports WebGL: visit [webglreport.com](https://webglreport.com).
2. Check browser console for Three.js or React Three Fiber errors.
3. The `ArkanaCore` component is wrapped in `Suspense` in `HomeHero` — a loading state is shown while Three.js initialises.
