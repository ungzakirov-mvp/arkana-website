# Forms

## Contact Form

**Location**: `/contact`  
**Component**: `components/sections/ContactPageSection.tsx`  
**Server Action**: `app/actions/contact.ts`

The only form on the website. It collects a lead and submits it to GoARKAN CRM, falling back to Resend email if GoARKAN is unavailable.

---

## Fields

| Field | Type | Required | Validation |
|---|---|---|---|
| `name` | text | Yes | 2–100 chars, letters/spaces/hyphens/apostrophes only (`\p{L}\s\-'.`) |
| `company` | text | Yes | 1–200 chars |
| `email` | email | Yes | Valid email format, max 254 chars, lowercased |
| `phone` | tel | No | Max 30 chars, digits/spaces/`+-()`  |
| `message` | textarea | No | Max 2000 chars |
| `website` | hidden | — | Honeypot — must be empty |

---

## Validation

Validation runs in the Server Action using **Zod v4**:

```ts
const ContactSchema = z.object({
  name:    z.string().min(2).max(100).regex(/^[\p{L}\s\-'.]+$/u),
  company: z.string().min(1).max(200),
  email:   z.string().email().max(254).toLowerCase(),
  phone:   z.string().max(30).regex(/^[\d\s+\-()\s]*$/).optional().or(z.literal("")),
  message: z.string().max(2000).optional().or(z.literal("")),
  website: z.literal("", { error: "Bot detected" }),  // honeypot
});
```

Validation errors are returned per-field and displayed inline next to the relevant input.

---

## Spam Protection

### 1. Honeypot field

A hidden `<input name="website" />` field is included in the form. It is visually hidden with CSS (`display: none`). Bots that auto-fill all fields will populate it. If the server receives a non-empty `website` value, it returns `{ status: "spam" }` immediately, without processing.

```ts
if (honeypot && honeypot !== "") return { status: "spam" };
```

### 2. Rate limiting

5 submissions per IP address per hour, using a sliding window via Upstash Redis.

If the rate limit is exceeded, the form returns `{ status: "rate_limited", resetAt: "ISO string" }` and the UI shows a message telling the user when they can try again.

Rate limiting is a no-op in local development when `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are not set — all submissions are allowed.

---

## Form States

The form uses React's `useActionState` hook to manage state transitions:

| State | Trigger | UI |
|---|---|---|
| `idle` | Initial | Empty form, submit button enabled |
| `loading` | Submitting | Button disabled with spinner |
| `success` | Successful submission | Success message, form hidden |
| `error` | Validation or server error | Field-level errors shown, form remains |
| `rate_limited` | Rate limit exceeded | Message with retry time, form hidden |
| `spam` | Honeypot triggered | Silent success (do not reveal to bot) |

---

## Error Handling

**Validation errors**: per-field error messages displayed below each input in Russian. The form scrolls to the first error field.

**Server error**: a generic "Не удалось отправить заявку. Попробуйте позже или напишите на info@arkana.uz" message is shown.

**GoARKAN unavailable**: transparent to the user. Resend email fallback activates. User sees success.

**Resend unavailable**: both channels failed. User sees the generic error message and is directed to email `info@arkana.uz` directly.

---

## Email Fallback

When GoARKAN is unreachable, the Server Action calls `_sendLeadEmail()` in `lib/cms-api.ts`:

- **From**: `ARKANA Website <noreply@arkana.uz>` (Resend verified domain)
- **To**: `CONTACT_TO_EMAIL` env var (default: `info@arkana.uz`)
- **Reply-To**: the lead's email address
- **Subject**: `Новая заявка: {name} — {company}`
- **Body**: HTML table with all form fields
- **Footer note**: "Заявка получена через резервный канал (GoARKAN недоступен). Создайте лид вручную."

---

## UTM and Attribution

When a lead is submitted, the Server Action reads the `referer` header and passes it as `landing_page` to GoARKAN. UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`) are not currently extracted from URL parameters — this is a future improvement.

---

## Future Improvements

- Extract and pass UTM parameters from the current URL (client-side, before form submit)
- Add `interested_in` field based on which service page the user came from
- Add `plan_slug` pre-selection when CTA on a pricing card is clicked
- Add field-level debounced validation (currently only server-side)
- Add CAPTCHA as a third layer if bot traffic increases significantly
