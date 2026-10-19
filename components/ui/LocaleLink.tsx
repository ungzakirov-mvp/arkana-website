"use client";

import NextLink from "next/link";
import { forwardRef, type ComponentProps } from "react";
import { useApp } from "@/components/providers/ThemeLanguageProvider";
import { localizePath } from "@/lib/locale";

/** next/link, который добавляет языковой префикс к внутренним ссылкам: "/pricing" → "/uz/pricing". */
const LocaleLink = forwardRef<HTMLAnchorElement, ComponentProps<typeof NextLink>>(function LocaleLink({ href, ...rest }, ref) {
  const { lang } = useApp();
  const h = typeof href === "string" ? localizePath(href, lang) : href;
  return <NextLink ref={ref} href={h} {...rest} />;
});

export default LocaleLink;
