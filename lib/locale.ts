/**
 * Языковые URL: русский на корне (/pricing), остальные с префиксом (/uz/pricing, /en/pricing, /zh/pricing).
 * Внутри приложения все страницы лежат в app/[lang]; proxy.ts переписывает /x → /ru/x.
 */
export const LANGS = ["ru", "uz", "en", "zh"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "ru";
export const PREFIXED: Lang[] = ["uz", "en", "zh"];

export const isLang = (v: string | undefined | null): v is Lang => !!v && (LANGS as readonly string[]).includes(v);

/** Убирает языковой префикс: /uz/pricing → /pricing, /uz → / */
export function stripLang(path: string): string {
  const m = path.match(/^\/(ru|uz|en|zh)(?=\/|$)/);
  if (!m) return path || "/";
  const rest = path.slice(m[0].length);
  return rest === "" ? "/" : rest;
}

/** Добавляет префикс языка к внутреннему пути: ("/pricing", "uz") → "/uz/pricing"; ru → без префикса. */
export function localizePath(path: string, lang: Lang | string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const clean = stripLang(path);
  if (lang === DEFAULT_LANG || !isLang(lang)) return clean;
  if (clean === "/") return `/${lang}`;
  if (clean.startsWith("/#") || clean.startsWith("/?")) return `/${lang}${clean.slice(1)}`;
  return `/${lang}${clean}`;
}

export const OG_LOCALE: Record<Lang, string> = { ru: "ru_RU", uz: "uz_UZ", en: "en_US", zh: "zh_CN" };
export const HREFLANG: Record<Lang, string> = { ru: "ru", uz: "uz", en: "en", zh: "zh" };
