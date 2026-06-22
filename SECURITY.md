# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| Latest (`main` branch) | ✅ Yes |

## Reporting a Vulnerability

**Please do not open a public GitHub issue for security vulnerabilities.**

If you discover a security vulnerability in this project, please report it responsibly:

1. **Email:** [info@arkana.uz](mailto:info@arkana.uz)
   - Subject: `[SECURITY] Brief description`
   - Encrypt with PGP if the vulnerability is severe (key available on request)

2. **GitHub Private Vulnerability Reporting** (preferred):
   - Navigate to the **Security** tab of this repository
   - Click **"Report a vulnerability"**
   - Fill in the form

### What to include

- Description of the vulnerability
- Steps to reproduce
- Potential impact assessment
- Any suggested mitigations (optional)

### Response timeline

| Stage | Target |
|-------|--------|
| Acknowledgement | Within 48 hours |
| Initial assessment | Within 5 business days |
| Fix or mitigation plan | Within 30 days for critical, 90 days for others |
| Public disclosure | Coordinated with reporter |

## Security Measures

This project implements the following security controls:

- **Content Security Policy** via Next.js proxy middleware
- **Strict Transport Security** (HSTS) with 2-year max-age and preload
- **Rate limiting** on contact form via Upstash (5 requests/IP/hour)
- **Input validation** via Zod v4 on all form fields (server-side)
- **Honeypot field** for bot detection
- **Dependency scanning** via Dependabot (weekly) and CodeQL (weekly)
- **No third-party analytics scripts** — no tracking by default
- **All external links** use `rel="noopener noreferrer"`

## Out of Scope

The following are intentionally not in scope for this project:

- Attacks requiring physical access
- Social engineering of ARKANA staff
- Denial-of-service attacks (rate limiting handles basic cases; DDoS protection is via Vercel/Cloudflare)
- Issues in third-party services (Resend, Upstash, Vercel) — report those to the respective vendors

## Recognition

We appreciate responsible disclosure. Reporters of valid security issues will be acknowledged in the project changelog (unless anonymity is requested).
