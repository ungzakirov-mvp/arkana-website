import type { Metadata } from "next";
import { LANGS, OG_LOCALE, HREFLANG, localizePath, isLang, type Lang } from "@/lib/locale";
import { SITE_URL } from "@/lib/seo";

export type MetaText = { title: string; description: string };
export type MetaByLang = { ru: MetaText; uz: MetaText; en: MetaText; zh?: MetaText };

/**
 * Метаданные страницы на нужном языке + canonical и hreflang на все языковые версии.
 * onlyRu: страница существует только на русском (статьи блога) — canonical всегда на RU, без hreflang.
 */
export function buildMeta(langParam: string, path: string, t: MetaByLang, opts: { onlyRu?: boolean; absoluteTitle?: boolean } = {}): Metadata {
  const lang: Lang = isLang(langParam) ? langParam : "ru";
  const m = (t as Record<string, MetaText | undefined>)[lang] ?? (lang === "zh" ? t.en : t.ru);
  const url = localizePath(path, opts.onlyRu ? "ru" : lang);
  const languages: Record<string, string> = {};
  if (!opts.onlyRu) {
    for (const l of LANGS) languages[HREFLANG[l]] = localizePath(path, l);
    languages["x-default"] = localizePath(path, "ru");
  }
  return {
    title: opts.absoluteTitle ? { absolute: m.title } : m.title,
    description: m.description,
    alternates: { canonical: url, ...(opts.onlyRu ? {} : { languages }) },
    openGraph: {
      type: "website",
      siteName: "ARKANA",
      title: m.title,
      description: m.description,
      url: `${SITE_URL}${url === "/" ? "" : url}`,
      locale: OG_LOCALE[lang],
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "ARKANA" }],
    },
  };
}

/** Тексты метаданных статических страниц. */
export const PAGE_META: Record<string, MetaByLang> = {
  "/": {
    ru: { title: "IT-аутсорсинг в Ташкенте — обслуживание компьютеров и сетей | ARKANA", description: "IT-аутсорсинг для бизнеса в Ташкенте: обслуживание компьютеров по подписке, выезд компьютерного мастера, сети и серверы, ЭЦП и Didox, цифровой офис GoARKAN, Telegram-боты." },
    uz: { title: "Toshkentda IT autsorsing — kompyuter va tarmoqlarga xizmat | ARKANA", description: "Toshkentda biznes uchun IT autsorsing: obuna bo'yicha kompyuter xizmati, kompyuter ustasini chaqirish, tarmoq va serverlar, ERI va Didox, GoARKAN raqamli ofisi, Telegram-botlar." },
    en: { title: "IT outsourcing in Tashkent — computer and network support | ARKANA", description: "IT outsourcing for businesses in Tashkent: subscription IT support, on-site technicians, networks and servers, e-signature and Didox, the GoARKAN digital office and Telegram bots." },
    zh: { title: "塔什干IT外包 — 电脑与网络运维 | ARKANA", description: "面向塔什干企业的IT外包：订阅式电脑运维、上门服务、网络与服务器、电子签名与Didox、GoARKAN数字办公室及Telegram机器人。" },
  },
  "/pricing": {
    ru: { title: "Услуги и тарифы IT-обслуживания в Ташкенте", description: "IT-аутсорсинг в Ташкенте: подписка START, BUSINESS, ENTERPRISE, выезд компьютерного мастера, сети и серверы, GoARKAN, Telegram-боты. Расчёт стоимости за 1 рабочий день." },
    uz: { title: "Toshkentda IT xizmat tariflari va xizmatlar", description: "Toshkentda IT autsorsing: START, BUSINESS, ENTERPRISE obunasi, kompyuter ustasini chaqirish, tarmoq va serverlar, GoARKAN, Telegram-botlar. Narx hisobi 1 ish kunida." },
    en: { title: "IT support services and plans in Tashkent", description: "IT outsourcing in Tashkent: START, BUSINESS, ENTERPRISE subscriptions, on-site technicians, networks and servers, GoARKAN and Telegram bots. A quote within one business day." },
  },
  "/services": {
    ru: { title: "IT-услуги для бизнеса в Ташкенте", description: "IT-обслуживание по подписке, выезд компьютерного мастера, E-IMZO и Didox, сети и серверы, Telegram-боты и цифровой офис GoARKAN. Один договор, акт и счёт по каждой работе." },
    uz: { title: "Toshkentda biznes uchun IT xizmatlar", description: "Obuna bo'yicha IT xizmat, kompyuter ustasini chaqirish, E-IMZO va Didox, tarmoq va serverlar, Telegram-botlar va GoARKAN raqamli ofisi. Bitta shartnoma." },
    en: { title: "IT services for business in Tashkent", description: "Subscription IT support, on-site technicians, E-IMZO and Didox, networks and servers, Telegram bots and the GoARKAN digital office. One contract, an act and invoice for every job." },
  },
  "/goarkan": {
    ru: { title: "GoARKAN — цифровой офис: заявки, учёт техники, ЭДО", description: "GoARKAN — цифровой офис компании: Service Desk с Telegram-ботом, учёт техники и лицензий, склад, договоры, документооборот с электронной подписью и дашборд руководителя." },
    uz: { title: "GoARKAN — raqamli ofis: arizalar, texnika hisobi, EHA", description: "GoARKAN — kompaniya raqamli ofisi: Telegram-botli Service Desk, texnika va litsenziyalar hisobi, ombor, shartnomalar, elektron imzoli hujjat aylanishi va rahbar paneli." },
    en: { title: "GoARKAN — digital office: requests, assets, e-docs", description: "GoARKAN is your company's digital office: Service Desk with a Telegram bot, asset and licence records, stock, contracts, e-docs with electronic signature and a management dashboard." },
  },
  "/cases": {
    ru: { title: "Кейсы ARKANA — IT-проекты в Ташкенте", description: "Проекты ARKANA и нашей команды: IT-инфраструктура, сети, мониторинг и цифровизация для компаний в Узбекистане." },
    uz: { title: "ARKANA keyslari — Toshkentdagi IT loyihalar", description: "ARKANA va jamoamiz loyihalari: O'zbekistondagi kompaniyalar uchun IT infratuzilma, tarmoqlar, monitoring va raqamlashtirish." },
    en: { title: "ARKANA case studies — IT projects in Tashkent", description: "Projects by ARKANA and our team: IT infrastructure, networks, monitoring and digitalisation for companies in Uzbekistan." },
  },
  "/about": {
    ru: { title: "О компании ARKANA — IT-аутсорсинг в Ташкенте", description: "ARKANA — IT-аутсорсинг для бизнеса в Ташкенте: обслуживание компьютеров и сетей, проекты, цифровой офис GoARKAN и Telegram-боты. Договор, акт и счёт по каждой работе." },
    uz: { title: "ARKANA haqida — Toshkentda IT autsorsing", description: "ARKANA — Toshkentda biznes uchun IT autsorsing: kompyuter va tarmoqlarga xizmat, loyihalar, GoARKAN raqamli ofisi va Telegram-botlar." },
    en: { title: "About ARKANA — IT outsourcing in Tashkent", description: "ARKANA provides IT outsourcing for businesses in Tashkent: computer and network support, projects, the GoARKAN digital office and Telegram bots." },
  },
  "/blog": {
    ru: { title: "Блог ARKANA — IT для бизнеса в Ташкенте", description: "Статьи ARKANA про IT для бизнеса: аутсорсинг или свой сисадмин, Microsoft 365, серверы, безопасность и экономия на IT." },
    uz: { title: "ARKANA blogi — biznes uchun IT", description: "Biznes uchun IT haqida maqolalar: autsorsing yoki o'z administratori, Microsoft 365, serverlar, xavfsizlik." },
    en: { title: "ARKANA blog — IT for business", description: "Articles on IT for business: outsourcing vs in-house, Microsoft 365, servers, security and saving on IT." },
  },
  "/contact": {
    ru: { title: "Контакты ARKANA — оставить заявку", description: "Позвоните +998 99 998 17 77, напишите в Telegram @arkana_uz или оставьте заявку — пришлём расчёт в течение рабочего дня. Ташкент, Бозсув МФЙ, Хаким-заде 71." },
    uz: { title: "ARKANA kontaktlari — ariza qoldirish", description: "+998 99 998 17 77 ga qo'ng'iroq qiling, Telegram @arkana_uz ga yozing yoki ariza qoldiring — bir ish kunida hisob yuboramiz. Toshkent, Bo'zsuv MFY, Hakimzoda 71." },
    en: { title: "Contact ARKANA — leave a request", description: "Call +998 99 998 17 77, message @arkana_uz on Telegram or leave a request — we send a quote within one business day. Tashkent, Bozsuv MFY, 71 Hakimzoda St." },
  },
  "/privacy": {
    ru: { title: "Политика конфиденциальности", description: "Как ARKANA обрабатывает и защищает данные, которые вы оставляете на arkana.uz." },
    uz: { title: "Maxfiylik siyosati", description: "ARKANA arkana.uz saytida qoldirgan ma'lumotlaringizni qanday qayta ishlaydi va himoya qiladi." },
    en: { title: "Privacy policy", description: "How ARKANA processes and protects the data you leave on arkana.uz." },
  },
};
