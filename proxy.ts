import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Prevent pages from leaking origin via Referer header to third parties
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // HSTS — 2 years, include subdomains, preload-ready
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );

  // Prevent MIME-type sniffing
  response.headers.set("X-Content-Type-Options", "nosniff");

  // Block all framing (redundant with CSP frame-ancestors but belt-and-suspenders)
  response.headers.set("X-Frame-Options", "DENY");

  // Cross-Origin Opener Policy — isolate the browsing context from cross-origin openers
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");

  // Cross-Origin Resource Policy — only same-origin can embed our resources
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");

  // Restrict browser feature access
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), serial=()"
  );

  // Remove Server header leakage (Vercel strips this, but be explicit)
  response.headers.delete("X-Powered-By");

  // Content Security Policy
  // NOTE: 'unsafe-inline' for script-src is required by Next.js static export
  // (hydration data is injected as inline <script> tags).
  // 'unsafe-eval' is intentionally excluded — Next.js production builds don't need it.
  // A nonce-based strict-dynamic CSP would require SSR mode; documented as upgrade path.
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https:",
    "connect-src 'self'",
    "frame-src 'none'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "manifest-src 'self'",
    "worker-src 'self' blob:",
    "upgrade-insecure-requests",
  ]
    .join("; ");

  response.headers.set("Content-Security-Policy", csp);

  return response;
}

export const config = {
  // Apply to all routes except static files and Next.js internals
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
