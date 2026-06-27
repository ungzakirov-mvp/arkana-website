# Deployment

## Local Development

```bash
# 1. Clone the repository
git clone https://github.com/ungzakirov-mvp/arkana-website.git
cd arkana-website

# 2. Install dependencies
npm install

# 3. Create local environment file
cp .env.example .env.local   # if .env.example exists
# or create .env.local manually — see ENVIRONMENT.md

# 4. Start the dev server
npm run dev
# → http://localhost:3000
```

The dev server supports Hot Module Replacement (HMR). Changes to components take effect immediately without a full reload.

**GoARKAN connectivity**: The CMS API at `http://192.168.112.11` is only reachable from the Tashkent office network. Outside the office, all GoARKAN fetches return `null` and pages render with empty content sections. This is expected behaviour.

---

## Production Build

Run a production build locally to catch TypeScript errors and build failures before pushing:

```bash
npm run build
# Output: .next/ directory

npm run start
# Serves the production build on http://localhost:3000
```

A successful `npm run build` output looks like:

```
✓ Compiled successfully
✓ Generating static pages
Route (app)                     Size    First Load JS
┌ ○ /                          ...
├ ○ /about                     ...
...
```

If TypeScript errors or missing imports exist, the build will fail with a clear error message.

---

## Vercel Deployment

### Initial Setup

1. Push the repository to GitHub.
2. Log in to Vercel → New Project → Import from GitHub → select `arkana-website`.
3. Framework Preset: **Next.js** (auto-detected).
4. Root Directory: leave blank (or `arkana-website/` if repo root differs).
5. Set environment variables under **Settings → Environment Variables** — see [ENVIRONMENT.md](ENVIRONMENT.md) for the full list.
6. Click **Deploy**.

### Automatic Deployments

Vercel is configured to auto-deploy on every push to the `main` branch.

| Branch | Environment | URL |
|---|---|---|
| `main` | Production | `arkana.uz` |
| Pull requests | Preview | `arkana-website-pr-N.vercel.app` |

### Manual Redeploy

To redeploy without a code change (e.g., after updating an env var):

```bash
# Via Vercel CLI
npx vercel --prod

# Or via Vercel dashboard
# Deployments → Latest → Redeploy
```

---

## Domain Configuration

Production domain: **arkana.uz**

DNS is configured via the domain registrar. Required DNS records:

| Type | Name | Value |
|---|---|---|
| `A` | `@` | `76.76.21.21` (Vercel) |
| `CNAME` | `www` | `cname.vercel-dns.com` |

Vercel provisions and auto-renews TLS certificates via Let's Encrypt. No manual SSL configuration is required.

---

## Environment Variables on Vercel

Variables must be added in Vercel project settings:

1. Go to **Project → Settings → Environment Variables**.
2. Add each variable. Scope to **Production** for sensitive keys; **All Environments** for config.
3. After adding or changing variables, trigger a redeploy for changes to take effect.

Variables prefixed `NEXT_PUBLIC_` are embedded in the client bundle at build time. Changing them requires a redeploy.

---

## Caching and ISR

Vercel automatically caches Next.js ISR responses at the Edge. The `revalidate` values in `lib/cms-api.ts` control how often GoARKAN data is refreshed:

| Content | Revalidate |
|---|---|
| Site settings | 15 min |
| Pricing, cases | 1 hr |
| Blog | 30 min |

**On-demand revalidation**: Not currently implemented. If you need to force-refresh a cached page immediately after updating content in GoARKAN, call:

```
POST https://arkana.uz/api/revalidate?secret=...&path=/pricing
```

This requires implementing `app/api/revalidate/route.ts` (not yet in the codebase).

---

## Build Output

Next.js produces a `.next/` directory. Vercel handles serving it. No manual build output configuration is needed.

Static pages (routes with no dynamic data) are pre-rendered at build time. ISR pages are cached at the Edge and revalidated on demand.

---

## Rollback Procedure

If a bad deployment goes to production:

1. Go to Vercel **Deployments** tab.
2. Find the last known good deployment (green checkmark).
3. Click **...** → **Redeploy** → **Promote to Production**.

This instantly promotes the previous build to production without rebuilding. DNS and edge cache do not need to change.

---

## Vercel CLI

```bash
# Install
npm install -g vercel

# Login
vercel login

# Deploy to production manually
vercel --prod

# List environment variables
vercel env ls

# Add an environment variable
vercel env add RESEND_API_KEY production

# Pull environment variables to .env.local
vercel env pull
```

---

## Health Checks

After a deployment, verify:

1. Homepage loads: `https://arkana.uz/`
2. Contact form submits (check `info@arkana.uz` inbox)
3. `/sitemap.xml` returns valid XML
4. `/robots.txt` returns correct rules
5. Page source shows structured data (`<script type="application/ld+json">`)

Automated health checks are not configured. See [RELEASE_CHECKLIST.md](RELEASE_CHECKLIST.md) for a full manual smoke test.
