import { NextResponse, type NextRequest } from "next/server";

/**
 * 1. Языковые URL. Все страницы лежат в app/[lang]:
 *    /pricing      → (rewrite) /ru/pricing   — русский без префикса в адресе
 *    /uz/pricing   → как есть
 *    /ru/pricing   → 308 на /pricing (один адрес на страницу)
 *    Если человек раньше выбрал язык (cookie ark-lang), заход на русский адрес уводит его на свой язык.
 *    Ботам и запросам без cookie всегда отдаётся запрошенный адрес.
 * 2. Заголовки безопасности и CSP — на все ответы.
 */

const PREFIXED = ["uz", "en", "zh"];

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";

  // /ru/... → без префикса
  if (first === "ru") {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return secure(NextResponse.redirect(url, 308));
  }

  // /uz/..., /en/..., /zh/... — отдаём как есть
  if (PREFIXED.includes(first)) return secure(NextResponse.next());

  // Русский адрес: если человек выбрал другой язык — уводим на него (только обычный заход в браузере)
  const pref = request.cookies.get("ark-lang")?.value;
  const isDocument = request.method === "GET" && (request.headers.get("accept") ?? "").includes("text/html") && !request.headers.get("rsc");
  if (pref && PREFIXED.includes(pref) && isDocument) {
    const url = request.nextUrl.clone();
    url.pathname = `/${pref}${pathname === "/" ? "" : pathname}`;
    return secure(NextResponse.redirect(url, 307));
  }

  // Внутренняя перезапись на русскую версию
  const url = request.nextUrl.clone();
  url.pathname = `/ru${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return secure(NextResponse.rewrite(url));
}

function secure(response: NextResponse) {
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=()");
  response.headers.delete("X-Powered-By");

  // 'unsafe-inline' нужен для inline-скриптов Next.js; домены Метрики и GA — чтобы аналитика работала.
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://mc.yandex.ru https://yastatic.net https://www.googletagmanager.com",
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https://mc.yandex.ru https://mc.yandex.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
    "frame-src https://mc.yandex.ru https://mc.yandex.com",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "manifest-src 'self'",
    "worker-src 'self' blob:",
    "upgrade-insecure-requests",
  ].join("; ");
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  // Всё, кроме API, внутренних файлов Next.js и статики с расширением (картинки, видео, robots, sitemap, иконки)
  matcher: ["/((?!api|_next/static|_next/image|.*\\.[a-zA-Z0-9]+$).*)"],
};
