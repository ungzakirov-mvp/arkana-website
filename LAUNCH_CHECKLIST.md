# ARKANA Website — Launch Checklist

> Estimated total time: 3–4 hours for a first-time deployment.
> Work through each section in order. Do not skip items marked **[BLOCKING]**.

---

## Phase 1 — Prerequisites (Before You Touch Vercel)

### 1.1 Third-Party Accounts

- [ ] **[BLOCKING]** Create [Resend](https://resend.com) account — free tier handles 100 emails/day, 3,000/month
  - Add and verify your domain: `arkana.uz`
  - Generate an API key with **Sending access** only (not Full access)
  - Store the key: `RESEND_API_KEY=re_...`
- [ ] **[BLOCKING]** Create [Upstash](https://console.upstash.com) account — free tier is sufficient
  - Create a Redis database → Region: `eu-west-1` (closest to Tashkent)
  - Copy the REST URL and Token from the database dashboard
  - Store: `UPSTASH_REDIS_REST_URL=...` and `UPSTASH_REDIS_REST_TOKEN=...`
- [ ] Create [Vercel](https://vercel.com) account (if not already)
  - Connect GitHub account

### 1.2 Domain Readiness

- [ ] Confirm you control the DNS for `arkana.uz`
- [ ] Confirm your domain registrar allows custom DNS records (A, CNAME, TXT)
- [ ] Know your registrar's propagation time (usually 1–48 hours for `.uz` domains)

---

## Phase 2 — Resend Domain Verification

1. Log in to [resend.com/domains](https://resend.com/domains)
2. Click **Add Domain** → enter `arkana.uz`
3. Resend will give you DNS records to add:

| Type | Name | Value | Purpose |
|------|------|-------|---------|
| MX | `send.arkana.uz` | Resend MX | Email routing |
| TXT | `resend._domainkey.arkana.uz` | DKIM key | Prevent spoofing |
| TXT | `arkana.uz` | SPF record | Sender authorization |

4. Add these records at your DNS registrar
5. Click **Verify** in Resend — can take up to 30 minutes
6. Status must show **Verified** before emails will send

- [ ] MX record added
- [ ] DKIM TXT record added
- [ ] SPF TXT record added
- [ ] Domain shows **Verified** in Resend dashboard

---

## Phase 3 — Vercel Deployment

### 3.1 Import Project

1. [vercel.com/new](https://vercel.com/new) → Import from GitHub → `ungzakirov-mvp/arkana-website`
2. Framework: **Next.js** (auto-detected)
3. Root Directory: `arkana-website` (if monorepo) or `/` (if repo root is the project)
4. Build Command: `npm run build` (auto-detected)
5. Output Directory: `.next` (auto-detected)

### 3.2 Environment Variables

Set all of the following in Vercel → Project → Settings → Environment Variables:

**Set for Environment: Production only** (do not expose to Preview unless needed)

| Variable | Value | Environment |
|----------|-------|-------------|
| `NEXT_PUBLIC_BASE_URL` | `https://arkana.uz` | Production |
| `RESEND_API_KEY` | `re_...` | Production |
| `CONTACT_TO_EMAIL` | `info@arkana.uz` | Production |
| `UPSTASH_REDIS_REST_URL` | `https://...upstash.io` | Production |
| `UPSTASH_REDIS_REST_TOKEN` | `AX...` | Production |

For Preview deployments (optional — for testing email flow):
| Variable | Value | Environment |
|----------|-------|-------------|
| `NEXT_PUBLIC_BASE_URL` | `https://preview.arkana.uz` | Preview |
| `RESEND_API_KEY` | `re_...` (same or separate test key) | Preview |
| `CONTACT_TO_EMAIL` | `your-personal@email.com` | Preview |
| `UPSTASH_REDIS_REST_URL` | (same Upstash DB, separate prefix auto-handles isolation) | Preview |
| `UPSTASH_REDIS_REST_TOKEN` | (same) | Preview |

- [ ] All production env vars set
- [ ] Clicked **Save**

### 3.3 First Deploy

1. Click **Deploy**
2. Wait for build to complete (~2–3 minutes)
3. Vercel will assign a URL like `arkana-website-xxx.vercel.app`
4. Open that URL and verify the homepage loads

- [ ] Build succeeds (green checkmark)
- [ ] Homepage loads on `*.vercel.app` URL
- [ ] Navigation works (Services, About, Contact)
- [ ] Contact form visible

---

## Phase 4 — DNS & Domain Setup

### 4.1 Add Custom Domain in Vercel

1. Vercel → Project → Settings → Domains
2. Add `arkana.uz`
3. Add `www.arkana.uz` (set redirect: www → apex)
4. Vercel shows required DNS records

### 4.2 Configure DNS at Registrar

**Option A — Vercel Nameservers (recommended, simplest):**
Update nameservers at your registrar to:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```
Vercel manages all DNS. Automatic SSL. No further action needed.

**Option B — Keep existing nameservers (manual records):**

| Type | Name | Value |
|------|------|-------|
| A | `arkana.uz` | `76.76.21.21` |
| CNAME | `www.arkana.uz` | `cname.vercel-dns.com` |

> Note: Some `.uz` domain registrars require A records, not CNAME, for apex domains.
> Use `76.76.21.21` (Vercel's IP) if CNAME is not supported at the apex.

### 4.3 Verify Propagation

```bash
# Check A record
nslookup arkana.uz

# Check from multiple locations
dig arkana.uz +short
```

- [ ] DNS records added
- [ ] `arkana.uz` resolves to Vercel IP
- [ ] `www.arkana.uz` redirects to `arkana.uz`

---

## Phase 5 — SSL Verification

Vercel provisions SSL automatically via Let's Encrypt. After DNS propagates:

1. Vercel → Project → Settings → Domains
2. Both `arkana.uz` and `www.arkana.uz` show a green **Valid Configuration** badge
3. Padlock icon visible in browser address bar

Verify HSTS is set correctly:
```bash
curl -I https://arkana.uz | grep -i strict
# Expected: strict-transport-security: max-age=63072000; includeSubDomains; preload
```

- [ ] SSL certificate issued (green in Vercel)
- [ ] `https://arkana.uz` loads without certificate warning
- [ ] HTTP to HTTPS redirect works: `http://arkana.uz` → `https://arkana.uz`
- [ ] HSTS header present with correct value

**HSTS Preload (optional but recommended):**
After the site has been live for 30+ days with HSTS confirmed working:
Submit at [hstspreload.org](https://hstspreload.org) — takes weeks to propagate to browsers.

---

## Phase 6 — Email Flow Verification

### 6.1 Test Internal Notification

1. Go to `https://arkana.uz/contact`
2. Fill in the form with real data (your own name + a test email you control)
3. Submit

- [ ] Form shows success state ("We will be in touch within 4 hours.")
- [ ] Internal notification email arrives at `info@arkana.uz` within 2 minutes
  - Subject: `New contact: [Name] @ [Company]`
  - Reply-To header is set to the submitter's email
- [ ] Reply to the notification email goes to the submitter (not to noreply)

### 6.2 Test Confirmation Email

- [ ] Confirmation email arrives at the submitter's address within 2 minutes
  - Subject: `We received your message — ARKANA`
  - Content looks correct
  - No broken links

### 6.3 Test Rate Limiting

Submit the form 6 times in quick succession:

- [ ] First 5 submissions: succeed normally
- [ ] 6th submission: returns friendly error message with reset time
- [ ] After 1 hour: form accepts submissions again

### 6.4 Test Spam Protection

Submit with the browser DevTools open:
1. Open DevTools → Elements
2. Find the hidden `<div>` with `style="display: none"` containing the `website` input
3. Temporarily make it visible and fill it with text
4. Submit

- [ ] Form shows success state (silent spam rejection)
- [ ] No email received at `info@arkana.uz`

---

## Phase 7 — Security Verification

### 7.1 Security Headers

Use [securityheaders.com](https://securityheaders.com):

1. Enter `https://arkana.uz`
2. Click **Scan**

- [ ] Score: **A** or **A+**
- [ ] `Content-Security-Policy` present and valid
- [ ] `Strict-Transport-Security` present
- [ ] `X-Content-Type-Options: nosniff` present
- [ ] `X-Frame-Options: DENY` present
- [ ] `Referrer-Policy` present
- [ ] `Permissions-Policy` present
- [ ] `Cross-Origin-Opener-Policy` present
- [ ] `Cross-Origin-Resource-Policy` present

### 7.2 CSP Compatibility

Open browser DevTools → Console on each page:

- [ ] `/` — no CSP violation errors
- [ ] `/services` — no CSP violation errors
- [ ] `/contact` — no CSP violation errors
- [ ] `/about` — no CSP violation errors
- [ ] `/services/it-outsourcing` — no CSP violation errors

### 7.3 SSL Labs

Use [ssllabs.com/ssltest](https://www.ssllabs.com/ssltest/):

- [ ] Grade: **A** or **A+**
- [ ] No deprecated TLS versions (TLS 1.0, 1.1)
- [ ] HSTS present

---

## Phase 8 — Performance Verification

### 8.1 Lighthouse (Chrome DevTools)

Run Lighthouse on `https://arkana.uz` in **Incognito mode**:

**Targets:**
| Category | Target |
|----------|--------|
| Performance | ≥ 90 |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 95 |
| SEO | ≥ 95 |

- [ ] Performance ≥ 90
- [ ] Accessibility ≥ 95
- [ ] Best Practices ≥ 95
- [ ] SEO ≥ 95

### 8.2 Core Web Vitals

Check [pagespeed.web.dev](https://pagespeed.web.dev):

| Metric | Target | Threshold |
|--------|--------|-----------|
| LCP (Largest Contentful Paint) | < 2.5s | Good |
| FID / INP | < 200ms | Good |
| CLS (Cumulative Layout Shift) | < 0.1 | Good |

- [ ] LCP < 2.5s on mobile
- [ ] LCP < 1.5s on desktop
- [ ] CLS < 0.1 (no layout shifts)
- [ ] No render-blocking resources

### 8.3 Mobile Testing

Open `https://arkana.uz` on a physical mobile device or Chrome DevTools → Device Mode:

- [ ] Navigation hamburger menu opens and closes
- [ ] Hero section renders correctly
- [ ] Services tabs are scrollable
- [ ] Contact form is usable (inputs don't zoom iOS Safari)
- [ ] Footer is readable
- [ ] No horizontal scroll on any page

---

## Phase 9 — Content Verification

### 9.1 Replace All Placeholders

Search for placeholder content and replace before launch:

- [ ] Phone number: `+998 — — — — — —` → real number in:
  - `components/layout/Navigation.tsx` (mobile menu)
  - `components/layout/Footer.tsx`
  - `components/sections/ContactCTA.tsx`
- [ ] Calendly link: `https://calendly.com` → `https://calendly.com/arkana/30min`
  - `components/sections/ContactCTA.tsx`
- [ ] Client logos: Replace placeholder pills in `components/sections/Trust.tsx`
- [ ] Testimonials: Replace `[Client Name]` / `[Company]` with real content
- [ ] Team section in `app/about/page.tsx` — add real team photos and bios
- [ ] OG image: Add `public/og-image.png` (1200×630px)
- [ ] Favicon: Add `app/favicon.ico`

### 9.2 SEO Check

- [ ] Page titles are unique on every route
- [ ] Meta descriptions are unique and under 160 characters
- [ ] `sitemap.xml` returns valid XML: `https://arkana.uz/sitemap.xml`
- [ ] `robots.txt` accessible: `https://arkana.uz/robots.txt`
- [ ] `robots.txt` does not block any public pages
- [ ] Submit sitemap to Google Search Console

### 9.3 Link Check

- [ ] All internal navigation links work
- [ ] Service sub-pages load (IT Outsourcing, Managed IT, Infrastructure, ITSM)
- [ ] Footer links work
- [ ] `/platform` redirect → `https://goarkan.uz` works
- [ ] No 404 errors in browser console

---

## Phase 10 — Analytics Setup (Optional but Recommended)

**Recommendation: Plausible Analytics** — privacy-first, no cookies, GDPR-compliant.

1. Create account at [plausible.io](https://plausible.io)
2. Add site: `arkana.uz`
3. Install script:

In `app/layout.tsx`, add inside `<head>`:
```tsx
<Script
  defer
  data-domain="arkana.uz"
  src="https://plausible.io/js/script.js"
  strategy="afterInteractive"
/>
```

4. Set env var: `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=arkana.uz`
5. Also add to CSP in `proxy.ts`:
   - `script-src`: add `https://plausible.io`
   - `connect-src`: add `https://plausible.io`

- [ ] Analytics script added (if desired)
- [ ] CSP updated to allow analytics domains
- [ ] Test event firing in Plausible dashboard

---

## Phase 11 — GitHub Repository Security

Complete immediately after first push:

- [ ] Secret scanning enabled: GitHub → Settings → Security → Secret scanning → **Enable**
- [ ] Push protection enabled: Secret scanning → "Push protection" → **Enable**
- [ ] Dependabot enabled: Settings → Security → Dependabot → **Enable**
  - `.github/dependabot.yml` is already committed ✓
- [ ] CodeQL scanning: `.github/workflows/codeql.yml` is committed ✓ — verify it runs on first push
- [ ] CI workflow: `.github/workflows/ci.yml` is committed ✓
- [ ] Branch protection on `main`:
  1. Settings → Branches → Add rule
  2. Pattern: `main`
  3. ✅ Require pull request before merging (1 approval)
  4. ✅ Require status checks: `Build & Type Check`
  5. ✅ Restrict who can push to main
- [ ] Vercel Preview Protection: Project → Settings → Deployment Protection → **Enable**

---

## Phase 12 — Backup & Rollback Plan

### Backup Strategy

| Asset | Backup Method | Frequency |
|-------|--------------|-----------|
| Source code | GitHub (`main` branch) | Every commit |
| Environment variables | 1Password / secure vault | Manual — after any change |
| Resend domain DNS records | Screenshot / exported config | Before any DNS change |

### Rollback Plan

**If the new deployment breaks production:**

**Option A — Instant rollback via Vercel (< 1 minute):**
1. Vercel → Project → Deployments
2. Find the last known-good deployment
3. Click the `...` menu → **Promote to Production**
4. Production traffic switches immediately — no DNS change needed

**Option B — Git revert (if bad code was merged):**
```bash
git revert HEAD           # creates a revert commit
git push origin main      # triggers new Vercel deployment
```
Vercel auto-deploys on push to `main`. New deploy takes ~2–3 minutes.

**Option C — Emergency DNS fallback (if Vercel itself has an incident):**
1. Point DNS A record to a static hosting provider (Cloudflare Pages, Netlify)
2. Upload the exported static build (`npm run build && next export`)
3. DNS propagation: ~5–30 minutes depending on TTL

> **Pre-launch action:** Set DNS TTL to 300 seconds (5 minutes) 24 hours before launch.
> After launch is confirmed stable (48 hours), increase TTL to 3600+ for performance.

### Contact Escalation

| Issue | Contact |
|-------|---------|
| Vercel outage | [vercel-status.com](https://www.vercel-status.com) |
| Resend outage | [resend.com/status](https://resend.com/status) |
| Upstash outage | [status.upstash.com](https://status.upstash.com) |
| DNS issue | Your registrar's support |

---

## Sign-Off

Complete all **[BLOCKING]** items before going live. Non-blocking items can be completed post-launch.

| Phase | Status | Sign-off |
|-------|--------|---------|
| 1 — Prerequisites | ☐ | |
| 2 — Resend Domain | ☐ | |
| 3 — Vercel Deployment | ☐ | |
| 4 — DNS Setup | ☐ | |
| 5 — SSL Verification | ☐ | |
| 6 — Email Flow | ☐ | |
| 7 — Security Verification | ☐ | |
| 8 — Performance | ☐ | |
| 9 — Content | ☐ | |
| 10 — Analytics | ☐ (optional) | |
| 11 — GitHub Security | ☐ | |
| 12 — Backup & Rollback | ☐ | |

**Go/No-Go Decision:** _______________  
**Launch Date:** _______________  
**Deployed By:** _______________
