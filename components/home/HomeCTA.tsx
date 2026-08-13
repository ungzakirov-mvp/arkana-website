"use client";

import { useApp } from "@/components/providers/ThemeLanguageProvider";

const COPY = {
  ru: { rights: "Все права защищены.", city: "Ташкент, Узбекистан" },
  uz: { rights: "Barcha huquqlar himoyalangan.", city: "Toshkent, O'zbekiston" },
  en: { rights: "All rights reserved.", city: "Tashkent, Uzbekistan" },
  zh: { rights: "版权所有。", city: "乌兹别克斯坦·塔什干" },
} as const;

export function HomeCTA() {
  const { lang } = useApp();
  const c = COPY[lang] ?? COPY.ru;

  return (
    <footer style={{
      position: "relative", zIndex: 2,
      padding: "48px clamp(20px,4vw,64px)",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: 16, fontSize: 13, color: "#748078",
      borderTop: "1px solid rgba(238,242,238,0.06)",
    }}>
      <span>© {new Date().getFullYear()} ARKANA. {c.rights}</span>
      <span>{c.city}</span>
    </footer>
  );
}
