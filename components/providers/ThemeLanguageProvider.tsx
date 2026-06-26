"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Lang, translations, Translations } from "@/lib/i18n";

type Theme = "dark" | "light";

interface AppCtx {
  theme: Theme;
  toggleTheme: () => void;
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const Ctx = createContext<AppCtx>({} as AppCtx);

export function ThemeLanguageProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [lang, setLangState] = useState<Lang>("ru");

  useEffect(() => {
    const savedTheme = (localStorage.getItem("ark-theme") as Theme) || "dark";
    const savedLang = (localStorage.getItem("ark-lang") as Lang) || "ru";
    setTheme(savedTheme);
    setLangState(savedLang);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("ark-theme", next);
      document.documentElement.setAttribute("data-theme", next);
      return next;
    });
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("ark-lang", l);
    document.documentElement.lang = l === "uz" ? "uz" : l === "en" ? "en" : "ru";
  }, []);

  return (
    <Ctx.Provider value={{ theme, toggleTheme, lang, setLang, t: translations[lang] }}>
      {children}
    </Ctx.Provider>
  );
}

export const useApp = () => useContext(Ctx);
