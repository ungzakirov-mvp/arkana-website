"use client";

import { createContext, useContext, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Lang, translations, Translations } from "@/lib/i18n";
import { localizePath } from "@/lib/locale";

interface AppCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const Ctx = createContext<AppCtx>({} as AppCtx);

/**
 * Язык приходит из URL (app/[lang]) — сервер сразу отдаёт HTML на нужном языке.
 * Смена языка = переход на ту же страницу в другом языке + cookie для следующих заходов.
 */
export function ThemeLanguageProvider({ children, lang }: { children: React.ReactNode; lang: Lang }) {
  const router = useRouter();

  const setLang = useCallback((l: Lang) => {
    if (l === lang) return;
    try { document.cookie = `ark-lang=${l}; path=/; max-age=31536000; samesite=lax`; } catch { /* ignore */ }
    const { pathname, search, hash } = window.location;
    router.push(localizePath(pathname, l) + search + hash);
  }, [lang, router]);

  return (
    <Ctx.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </Ctx.Provider>
  );
}

export const useApp = () => useContext(Ctx);
