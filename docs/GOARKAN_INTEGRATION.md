# GoARKAN Integration

## Overview

GoARKAN is the internal CRM and ITSM platform developed by ARKANA. The website integrates with GoARKAN for two purposes:

1. **Content delivery**: pricing, cases, blog, settings (see [CMS_INTEGRATION.md](CMS_INTEGRATION.md))
2. **Lead capture**: form submissions are POSTed directly into the GoARKAN CRM

---

## Connection

| Parameter | Value |
|---|---|
| Base URL | `http://192.168.112.11` (private LAN) |
| Environment variable | `GOARKAN_API_URL` |
| Tenant header | `X-Tenant-Domain: arkana.uz` |
| Tenant env var | `GOARKAN_TENANT_DOMAIN` |
| Authentication | No API key required for public endpoints |
| Timeout (leads) | 8 seconds |

**The private LAN address (`192.168.112.11`) is only reachable from the Tashkent office network. Vercel cannot connect to this address.** Until GoARKAN has a public endpoint (VPN tunnel, reverse proxy, or public IP), all Vercel-side GoARKAN calls fail gracefully and the Resend email fallback handles lead delivery.

---

## API Endpoints Used

### Content Endpoints (GET)

All content endpoints are read-only and require no request body. They respect the `lang` query parameter.

| Endpoint | Function | Description |
|---|---|---|
| `GET /api/public/website/settings` | `getSettings(lang)` | Brand, contacts, SEO, analytics config |
| `GET /api/public/website/pricing` | `getPricing(lang)` | Subscription plans |
| `GET /api/public/website/cases` | `getCases(lang)` | Published case studies |
| `GET /api/public/website/clients` | `getClients()` | Client logos (language-neutral) |
| `GET /api/public/website/team` | `getTeam(lang)` | Team members with show_on_website flag |
| `GET /api/public/website/faq` | `getFaq(lang, page)` | FAQ items scoped to a page |
| `GET /api/public/website/blog` | `getBlog(lang, opts)` | Blog list with pagination |
| `GET /api/public/website/blog/:slug` | `getBlogPost(slug, lang)` | Single blog post with body_md |
| `GET /api/public/website/homepage` | `getHomepageData(lang)` | Bundled homepage fetch (avoids waterfall) |

**Common query parameters**:
- `lang`: `"ru"` | `"en"` | `"uz"`
- `page` (FAQ): page slug, e.g. `"global"`, `"pricing"`
- `limit`, `offset` (blog): pagination

---

### Lead Endpoint (POST)

```
POST /api/public/website/leads
Content-Type: application/json
X-Tenant-Domain: arkana.uz
```

**Request body** (`LeadInput`):

```json
{
  "name": "Иван Иванов",
  "company": "ООО Ромашка",
  "email": "ivan@example.com",
  "phone": "+998 90 123 45 67",
  "message": "Нас интересует IT-аутсорсинг",
  "plan_slug": "basic",
  "interested_in": "IT Outsourcing",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "tashkent-it",
  "utm_content": "ad-variant-a",
  "landing_page": "https://arkana.uz/contact",
  "referrer": "https://google.com"
}
```

All fields except `name`, `company`, and `email` are optional.

**Successful response**:
```json
{ "ok": true, "lead_id": 1234, "message": "Lead created" }
```

**Rate limit response** (HTTP 429):
```json
{ "ok": false, "error": "rate_limited" }
```

**Error response** (HTTP 4xx/5xx):
```json
{ "ok": false, "detail": "Validation error message" }
```

---

### Analytics Endpoint (POST)

```
POST /api/public/website/analytics
Content-Type: application/json
X-Tenant-Domain: arkana.uz
```

**Request body**:

```json
{
  "session_id": "uuid-v4",
  "event_type": "page_view",
  "page_slug": "/services/it-outsourcing",
  "referrer": "https://google.com",
  "utm_source": "google",
  "utm_medium": "organic",
  "utm_campaign": ""
}
```

This is a cookieless analytics endpoint. Errors are silently swallowed — analytics failure must never block the user.

---

## Lead Submission Flow

```
submitContact() Server Action
  │
  ├── 1. Honeypot check
  ├── 2. Upstash rate limit (5/IP/hr)
  ├── 3. Zod validation
  │
  ▼
submitLead() in lib/cms-api.ts
  │
  ├─► POST /api/public/website/leads    (primary — GoARKAN)
  │       │
  │       ├── HTTP 200: return { ok: true, lead_id }
  │       ├── HTTP 429: return { ok: false, error: "rate_limited" }
  │       └── Error/timeout:
  │
  └─► Resend email fallback
          │
          ├── Sends HTML email to CONTACT_TO_EMAIL (info@arkana.uz)
          ├── From: ARKANA Website <noreply@arkana.uz>
          ├── Subject: "Новая заявка: {name} — {company}"
          ├── Reply-To: {lead email}
          └── Footer note: "GoARKAN was unavailable. Create lead manually in CRM."
```

**Important**: The fallback is notification-only. The team must manually create the CRM record in GoARKAN when a lead arrives via email.

---

## GoARKAN CRM Flow (When Reachable)

```
Website POST → GoARKAN /api/public/website/leads
                        │
                        ├── Creates Lead record in CRM
                        ├── Assigns to Sales Queue
                        ├── Triggers internal notification to assigned manager
                        └── Manager receives task in GoARKAN dashboard
```

The website does not handle what happens inside GoARKAN after a successful lead submission. Lead routing, assignment, and follow-up are managed by GoARKAN.

---

## Making GoARKAN Publicly Accessible

Currently, GoARKAN is not reachable from Vercel. Options to fix this:

**Option 1 — Reverse proxy (Recommended)**  
Run nginx or Caddy on a public server that forwards to `192.168.112.11`. Point `GOARKAN_API_URL` to the public server. The public server requires TLS for Vercel to trust the connection.

**Option 2 — VPN tunnel**  
Establish a WireGuard or OpenVPN tunnel between the Vercel function execution region and the office network. Technically complex; not recommended unless GoARKAN moves to a dedicated server.

**Option 3 — Cloud deployment**  
Deploy GoARKAN on a cloud VPS (e.g., VK Cloud, Timeweb Cloud) with a public IP and SSL. Change `GOARKAN_API_URL` to the new address.

Once GoARKAN is accessible, all ISR fetches on Vercel will succeed and the email fallback will only activate during actual GoARKAN outages.

---

## Multi-Tenant Architecture

GoARKAN is designed as a multi-tenant platform. The `X-Tenant-Domain` header identifies which tenant's data to serve. The ARKANA website always sends `X-Tenant-Domain: arkana.uz`.

The `GOARKAN_TENANT_DOMAIN` env var controls this header. If ARKANA ever operates multiple domains (e.g., for sub-brands), each domain can have its own deployment with a different tenant header.
