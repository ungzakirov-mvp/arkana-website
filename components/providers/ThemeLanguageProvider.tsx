"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Lang, translations, Translations } from "@/lib/i18n";

interface AppCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const Ctx = createContext<AppCtx>({} as AppCtx);

export function ThemeLanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");

  useEffect(() => {
    const saved = (localStorage.getItem("ark-lang") as Lang) || "ru";
    const valid: Lang[] = ["ru", "uz", "en", "zh"];
    const resolved: Lang = valid.includes(saved) ? saved : "ru";
    setLangState(resolved);
    document.documentElement.lang = resolved;
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("ark-lang", l);
    document.documentElement.lang = l;
  }, []);

  return (
    <Ctx.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </Ctx.Provider>
  );
}

export const useApp = () => useContext(Ctx);
