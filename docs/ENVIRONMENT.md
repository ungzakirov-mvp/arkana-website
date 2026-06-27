# Environment Variables

All environment variables are configured in Vercel project settings. For local development, copy them to `.env.local` (never commit this file).

---

## Required for Production

These variables must be set in Vercel before deploying to production.

### `RESEND_API_KEY`

**Required**: Yes  
**Purpose**: Authenticates the Resend SDK for sending lead notification emails.  
**Used in**: `lib/cms-api.ts` → `_sendLeadEmail()`  
**Format**: `re_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`  
**Note**: Get from [resend.com/api-keys](https://resend.com/api-keys). The domain `arkana.uz` must be verified in Resend. Current key active as of 2026-06-27.

```
RESEND_API_KEY=re_DhLkaVJg_...
```

---

### `CONTACT_TO_EMAIL`

**Required**: Yes (has fallback)  
**Purpose**: Email address that receives lead notification emails when GoARKAN is unavailable.  
**Used in**: `lib/cms-api.ts` → `_sendLeadEmail()`  
**Default**: `info@arkana.uz`  
**Format**: Single email address

```
CONTACT_TO_EMAIL=info@arkana.uz
```

---

### `NEXT_PUBLIC_BASE_URL`

**Required**: Yes  
**Purpose**: The canonical base URL of the site, used in sitemap, robots, SEO metadata, and structured data.  
**Used in**: `lib/seo.ts`, `app/sitemap.ts`, `app/robots.ts`  
**Default**: `https://arkana.uz`  
**Format**: Full URL without trailing slash

```
NEXT_PUBLIC_BASE_URL=https://arkana.uz
```

---

## GoARKAN Connection

### `GOARKAN_API_URL`

**Required**: No (has fallback — but ISR data will be empty without this)  
**Purpose**: Base URL of the GoARKAN backend API.  
**Used in**: `lib/cms-api.ts`  
**Default**: `http://192.168.112.11`  
**Note**: The default private LAN address is not reachable from Vercel. Set this to a public URL when GoARKAN gets a public endpoint.

```
GOARKAN_API_URL=http://192.168.112.11
```

### `GOARKAN_TENANT_DOMAIN`

**Required**: No (has fallback)  
**Purpose**: Tenant identifier sent as `X-Tenant-Domain` header to GoARKAN.  
**Used in**: `lib/cms-api.ts`  
**Default**: `arkana.uz`

```
GOARKAN_TENANT_DOMAIN=arkana.uz
```

---

## Rate Limiting

### `UPSTASH_REDIS_REST_URL`

**Required**: Yes (for production rate limiting)  
**Purpose**: REST endpoint for Upstash Redis, used by the contact form rate limiter.  
**Used in**: `lib/ratelimit.ts`  
**Note**: Without this, rate limiting is disabled (all form submissions are allowed). This is acceptable for local dev but must be set in production.

```
UPSTASH_REDIS_REST_URL=https://your-instance.upstash.io
```

### `UPSTASH_REDIS_REST_TOKEN`

**Required**: Yes (for production rate limiting)  
**Purpose**: Authentication token for Upstash Redis.  
**Used in**: `lib/ratelimit.ts`

```
UPSTASH_REDIS_REST_TOKEN=AXxxxxxxxxxxxxxxxxxxxx
```

---

## Analytics

### `NEXT_PUBLIC_GA_ID`

**Required**: No  
**Purpose**: Google Analytics 4 Measurement ID. When set, the GA4 script is injected.  
**Used in**: `app/layout.tsx`  
**Format**: `G-XXXXXXXXXX`  
**Note**: Get from Google Analytics → Admin → Data Streams → Measurement ID.

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### `NEXT_PUBLIC_YANDEX_METRIKA_ID`

**Required**: No  
**Purpose**: Yandex.Metrika counter ID. When set, the Metrika script is injected.  
**Used in**: `app/layout.tsx`  
**Format**: 8-digit number

```
NEXT_PUBLIC_YANDEX_METRIKA_ID=12345678
```

---

## Search Engine Verification

### `NEXT_PUBLIC_GOOGLE_SITE_VERIFY`

**Required**: No  
**Purpose**: Google Search Console verification code. Injected as `<meta name="google-site-verification">`.  
**Used in**: `app/layout.tsx` → `metadata.verification.google`  
**Format**: String from Google Search Console → Settings → Ownership verification → HTML tag method

```
NEXT_PUBLIC_GOOGLE_SITE_VERIFY=abc123...
```

### `NEXT_PUBLIC_YANDEX_VERIFICATION`

**Required**: No  
**Purpose**: Yandex Webmaster verification code. Injected as `<meta name="yandex-verification">`.  
**Used in**: `app/layout.tsx` → `metadata.verification.yandex`  
**Format**: String from Yandex Webmaster → Site verification → Meta tag method

```
NEXT_PUBLIC_YANDEX_VERIFICATION=abc123...
```

---

## Environment Summary

| Variable | Required | Default | Secret |
|---|---|---|---|
| `RESEND_API_KEY` | **Yes** | — | Yes |
| `CONTACT_TO_EMAIL` | No | `info@arkana.uz` | No |
| `NEXT_PUBLIC_BASE_URL` | **Yes** | `https://arkana.uz` | No |
| `GOARKAN_API_URL` | No | `http://192.168.112.11` | No |
| `GOARKAN_TENANT_DOMAIN` | No | `arkana.uz` | No |
| `UPSTASH_REDIS_REST_URL` | **Yes (prod)** | — | Yes |
| `UPSTASH_REDIS_REST_TOKEN` | **Yes (prod)** | — | Yes |
| `NEXT_PUBLIC_GA_ID` | No | — | No |
| `NEXT_PUBLIC_YANDEX_METRIKA_ID` | No | — | No |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFY` | No | — | No |
| `NEXT_PUBLIC_YANDEX_VERIFICATION` | No | — | No |

---

## Security Notes

- Variables prefixed `NEXT_PUBLIC_` are exposed to the browser. Never put secrets in `NEXT_PUBLIC_` variables.
- `RESEND_API_KEY`, `UPSTASH_REDIS_REST_URL`, and `UPSTASH_REDIS_REST_TOKEN` are server-only secrets. They are not prefixed with `NEXT_PUBLIC_` and are never sent to the client.
- Never commit `.env.local` to version control. It is listed in `.gitignore`.
- Rotate `RESEND_API_KEY` if it is ever exposed. The current key was provisioned 2026-06-27.

---

## Local Development `.env.local`

Minimal setup for local development without rate limiting or analytics:

```bash
# Required
RESEND_API_KEY=re_YOUR_KEY_HERE
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Optional — GoARKAN unreachable from outside office LAN
# GOARKAN_API_URL=http://192.168.112.11

# Omit to disable rate limiting locally
# UPSTASH_REDIS_REST_URL=
# UPSTASH_REDIS_REST_TOKEN=
```
