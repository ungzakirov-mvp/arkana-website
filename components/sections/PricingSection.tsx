"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle2, X, ArrowRight,
  ShieldCheck, EqualNot, RefreshCw, LayoutGrid, ChevronDown,
} from "lucide-react";
import { useApp } from "@/components/providers/ThemeLanguageProvider";
import { type Plan } from "@/lib/cms-api";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── Static subtitles ─────────────────────────────────────────────── */
const SUBTITLES: Record<string, Record<string, string>> = {
  ru: { start: "Малый бизнес", operations: "Растущий бизнес", enterprise: "Крупный бизнес" },
  en: { start: "Small business", operations: "Growing business", enterprise: "Large business" },
  uz: { start: "Kichik biznes", operations: "O'suvchi biznes", enterprise: "Yirik biznes" },
};

/* ─── Feature table (plan details, display-only) ───────────────────── */
const PLAN_FEATURES: Record<string, Record<string, { label: string; value: boolean | string }[]>> = {
  ru: {
    start: [
      { label: "Service Desk (GoARKAN)", value: true },
      { label: "SLA — реакция",           value: "2 часа" },
      { label: "SLA — решение",           value: "8 часов" },
      { label: "Мониторинг серверов 24/7", value: true },
      { label: "Резервное копирование",   value: true },
      { label: "Антивирус и обновления",  value: true },
      { label: "Поддержка Microsoft 365", value: "базовая" },
      { label: "Именной инженер",         value: false },
      { label: "Обслуживание серверов",   value: false },
      { label: "Кибербезопасность",       value: false },
      { label: "Анализ инфраструктуры",   value: "раз в год" },
    ],
    operations: [
      { label: "Service Desk (GoARKAN)", value: true },
      { label: "SLA — реакция",           value: "1 час" },
      { label: "SLA — решение",           value: "4 часа" },
      { label: "Мониторинг серверов 24/7", value: true },
      { label: "Резервное копирование",   value: true },
      { label: "Антивирус и обновления",  value: true },
      { label: "Поддержка Microsoft 365", value: "полная" },
      { label: "Именной инженер",         value: true },
      { label: "Обслуживание серверов",   value: true },
      { label: "Кибербезопасность",       value: "базовая" },
      { label: "Анализ инфраструктуры",   value: "раз в квартал" },
    ],
    enterprise: [
      { label: "Service Desk (GoARKAN)", value: true },
      { label: "Индивидуальный SLA",      value: true },
      { label: "Приоритетная реакция",    value: "≤ 30 мин" },
      { label: "Мониторинг серверов 24/7", value: true },
      { label: "Резервное копирование",   value: true },
      { label: "Антивирус и обновления",  value: true },
      { label: "Поддержка Microsoft 365", value: "полная" },
      { label: "Выделенная команда",      value: true },
      { label: "Обслуживание серверов",   value: true },
      { label: "Кибербезопасность",       value: "расширенная" },
      { label: "Анализ инфраструктуры",   value: "ежемесячно" },
    ],
  },
  en: {
    start: [
      { label: "Service Desk (GoARKAN)", value: true },
      { label: "SLA — response",          value: "2 hours" },
      { label: "SLA — resolution",        value: "8 hours" },
      { label: "Server monitoring 24/7",  value: true },
      { label: "Backup",                  value: true },
      { label: "Antivirus & updates",     value: true },
      { label: "Microsoft 365 support",   value: "basic" },
      { label: "Dedicated engineer",      value: false },
      { label: "Server maintenance",      value: false },
      { label: "Cybersecurity",           value: false },
      { label: "Infrastructure analysis", value: "once a year" },
    ],
    operations: [
      { label: "Service Desk (GoARKAN)", value: true },
      { label: "SLA — response",          value: "1 hour" },
      { label: "SLA — resolution",        value: "4 hours" },
      { label: "Server monitoring 24/7",  value: true },
      { label: "Backup",                  value: true },
      { label: "Antivirus & updates",     value: true },
      { label: "Microsoft 365 support",   value: "full" },
      { label: "Dedicated engineer",      value: true },
      { label: "Server maintenance",      value: true },
      { label: "Cybersecurity",           value: "basic" },
      { label: "Infrastructure analysis", value: "quarterly" },
    ],
    enterprise: [
      { label: "Service Desk (GoARKAN)", value: true },
      { label: "Custom SLA",              value: true },
      { label: "Priority response",       value: "≤ 30 min" },
      { label: "Server monitoring 24/7",  value: true },
      { label: "Backup",                  value: true },
      { label: "Antivirus & updates",     value: true },
      { label: "Microsoft 365 support",   value: "full" },
      { label: "Dedicated team",          value: true },
      { label: "Server maintenance",      value: true },
      { label: "Cybersecurity",           value: "advanced" },
      { label: "Infrastructure analysis", value: "monthly" },
    ],
  },
  uz: {
    start: [
      { label: "Service Desk (GoARKAN)", value: true },
      { label: "SLA — javob",             value: "2 soat" },
      { label: "SLA — hal qilish",        value: "8 soat" },
      { label: "Serverlarni 24/7 kuzatish", value: true },
      { label: "Zaxira nusxa",            value: true },
      { label: "Antivirus va yangilanishlar", value: true },
      { label: "Microsoft 365 qo'llab-quvvatlash", value: "asosiy" },
      { label: "Shaxsiy muhandis",        value: false },
      { label: "Server xizmati",          value: false },
      { label: "Kiberxavfsizlik",         value: false },
      { label: "Infratuzilma tahlili",    value: "yiliga bir marta" },
    ],
    operations: [
      { label: "Service Desk (GoARKAN)", value: true },
      { label: "SLA — javob",             value: "1 soat" },
      { label: "SLA — hal qilish",        value: "4 soat" },
      { label: "Serverlarni 24/7 kuzatish", value: true },
      { label: "Zaxira nusxa",            value: true },
      { label: "Antivirus va yangilanishlar", value: true },
      { label: "Microsoft 365 qo'llab-quvvatlash", value: "to'liq" },
      { label: "Shaxsiy muhandis",        value: true },
      { label: "Server xizmati",          value: true },
      { label: "Kiberxavfsizlik",         value: "asosiy" },
      { label: "Infratuzilma tahlili",    value: "har chorakda" },
    ],
    enterprise: [
      { label: "Service Desk (GoARKAN)", value: true },
      { label: "Individual SLA",          value: true },
      { label: "Ustuvor javob",           value: "≤ 30 daq" },
      { label: "Serverlarni 24/7 kuzatish", value: true },
      { label: "Zaxira nusxa",            value: true },
      { label: "Antivirus va yangilanishlar", value: true },
      { label: "Microsoft 365 qo'llab-quvvatlash", value: "to'liq" },
      { label: "Ajratilgan jamoa",        value: true },
      { label: "Server xizmati",          value: true },
      { label: "Kiberxavfsizlik",         value: "kengaytirilgan" },
      { label: "Infratuzilma tahlili",    value: "har oyda" },
    ],
  },
};

/* ─── Copy ─────────────────────────────────────────────────────────── */
const COPY: Record<string, {
  badge: string;
  h1: string;
  sub: string;
  popular: string;
  currency: string;
  contactSales: string;
  ctaPrefix: string;
  customTitle: string;
  customBody: string;
  customCta: string;
  benefitsTitle: string;
  benefits: { title: string; desc: string }[];
  faqTitle: string;
  faqs: { q: string; a: string }[];
  conditionsTitle: string;
  conditions: string[];
}> = {
  ru: {
    badge: "Тарифы",
    h1: "Выберите уровень IT,\nкоторый нужен вашему бизнесу.",
    sub: "Каждый тариф включает работу по SLA, доступ к GoARKAN и сопровождение вашей IT-инфраструктуры. Отличается только объём обслуживания и доступные ресурсы.",
    popular: "Популярный выбор",
    currency: "сум/мес",
    contactSales: "Связаться с отделом продаж",
    ctaPrefix: "Начать с",
    customTitle: "Нестандартные требования?",
    customBody: "Более 100 рабочих мест, специфическая инфраструктура, несколько офисов? Составим индивидуальное предложение.",
    customCta: "Обсудить условия",
    benefitsTitle: "Что входит в каждый тариф",
    benefits: [
      { title: "Работа по SLA", desc: "Все обязательства закреплены договором." },
      { title: "Прозрачные условия", desc: "Без скрытых платежей и неожиданных расходов." },
      { title: "Гибкие тарифы", desc: "При росте бизнеса тариф можно изменить." },
      { title: "Отчётность в GoARKAN", desc: "Все выполненные работы фиксируются в системе." },
    ],
    faqTitle: "Важная информация о тарифах",
    faqs: [
      { q: "Что входит в тариф?", a: "Тариф включает фиксированный объём услуг в месяц: заявки от сотрудников, удалённую поддержку, мониторинг и доступ к платформе GoARKAN. Точный состав зависит от выбранного плана." },
      { q: "Что считается одной заявкой?", a: "Одна заявка — одно обращение от сотрудника: поломка, настройка, вопрос, удалённая помощь или выезд специалиста. Каждое обращение регистрируется в GoARKAN и закрывается отдельно." },
      { q: "Что входит в удалённую поддержку?", a: "Удалённое подключение к компьютеру сотрудника для диагностики, настройки или установки программного обеспечения. Одна сессия — одно подключение, независимо от продолжительности." },
      { q: "Что не входит в тариф?", a: "Закупка оборудования и лицензий, разработка программного обеспечения, крупные проектные работы (внедрение ERP, миграция серверов), а также работы, не согласованные заранее. Эти услуги выполняются отдельно по согласованию." },
      { q: "Что происходит после исчерпания лимитов?", a: "Мы уведомляем вас заранее. Дополнительные работы выполняются только после вашего согласования и оплачиваются по действующему прайс-листу. Работа не останавливается без вашего ведома." },
      { q: "Можно ли изменить тариф?", a: "Да. При росте компании тариф можно повысить в любой момент. Понижение возможно с учётом условий действующего договора. Индивидуальные условия доступны для тарифа ENTERPRISE." },
      { q: "Переносятся ли неиспользованные услуги?", a: "Нет. Неиспользованный объём услуг не переносится на следующий месяц. Лимиты обнуляются в начале каждого расчётного периода." },
      { q: "Как происходит подключение?", a: "После подписания договора наша команда проводит первичный анализ вашей инфраструктуры, настраивает мониторинг и Service Desk GoARKAN. Запуск занимает до 5 рабочих дней." },
      { q: "Как работает SLA?", a: "SLA — соглашение об уровне сервиса. Время первого ответа и время решения каждой заявки закреплены в договоре. Нарушение SLA влечёт штрафные санкции для ARKANA." },
      { q: "Какие работы оплачиваются отдельно?", a: "Работы за пределами включённого объёма, проектные задачи, выезды сверх лимита и все нестандартные запросы согласовываются и оплачиваются отдельно по прайс-листу." },
    ],
    conditionsTitle: "Коммерческие условия",
    conditions: [
      "Каждый тариф включает фиксированный объём услуг в месяц.",
      "Работы сверх включённых лимитов выполняются только после согласования с клиентом.",
      "Дополнительные работы оплачиваются согласно действующему прайс-листу ARKANA.",
      "Неиспользованный объём услуг не переносится на следующий период.",
      "Индивидуальные условия доступны для тарифа ENTERPRISE.",
    ],
  },
  en: {
    badge: "Pricing",
    h1: "Choose the IT level\nyour business needs.",
    sub: "Every plan includes SLA-backed service, GoARKAN access, and full IT infrastructure support. The difference is service volume and available resources.",
    popular: "Most popular",
    currency: "UZS/mo",
    contactSales: "Contact sales",
    ctaPrefix: "Start with",
    customTitle: "Non-standard requirements?",
    customBody: "More than 100 workstations, specific infrastructure, multiple offices? We'll build a custom proposal.",
    customCta: "Discuss terms",
    benefitsTitle: "What every plan includes",
    benefits: [
      { title: "SLA-backed service", desc: "All obligations are fixed in the contract." },
      { title: "Transparent pricing", desc: "No hidden fees or surprise costs." },
      { title: "Flexible plans", desc: "Scale up as your business grows." },
      { title: "GoARKAN reporting", desc: "Every completed task is logged in the system." },
    ],
    faqTitle: "Important plan information",
    faqs: [
      { q: "What does a plan include?", a: "Each plan includes a fixed monthly service volume: employee tickets, remote support, monitoring, and GoARKAN access. The exact scope depends on the selected plan." },
      { q: "What counts as one ticket?", a: "One ticket is one employee request: a fault, configuration, question, remote session, or on-site visit. Every request is logged in GoARKAN and closed separately." },
      { q: "What is included in remote support?", a: "Remote connection to an employee's computer for diagnostics, configuration, or software installation. One session equals one connection, regardless of duration." },
      { q: "What is not included?", a: "Hardware and license procurement, software development, large project work (ERP rollout, server migration), and any work not agreed in advance. These are handled separately by agreement." },
      { q: "What happens when limits are reached?", a: "We notify you in advance. Additional work is performed only after your approval and billed at the current price list. No work stops without your knowledge." },
      { q: "Can I change my plan?", a: "Yes. You can upgrade at any time. Downgrading is subject to the conditions of the current contract. Custom terms are available for ENTERPRISE." },
      { q: "Do unused services roll over?", a: "No. Unused service volume does not carry over to the next month. Limits reset at the start of each billing period." },
      { q: "How does onboarding work?", a: "After signing, our team conducts an initial infrastructure review, sets up monitoring and the GoARKAN Service Desk. Launch takes up to 5 business days." },
      { q: "How does SLA work?", a: "SLA is a Service Level Agreement. First response and resolution times for every ticket are fixed in the contract. Violations result in penalties for ARKANA." },
      { q: "What work is billed separately?", a: "Work beyond the included volume, project tasks, additional on-site visits, and all non-standard requests are agreed and billed separately at the price list." },
    ],
    conditionsTitle: "Commercial conditions",
    conditions: [
      "Each plan includes a fixed monthly service volume.",
      "Work beyond included limits is performed only after client approval.",
      "Additional work is billed according to ARKANA's current price list.",
      "Unused service volume does not carry over to the next period.",
      "Custom terms are available for the ENTERPRISE plan.",
    ],
  },
  uz: {
    badge: "Tariflar",
    h1: "Biznesingizga kerakli\nIT darajasini tanlang.",
    sub: "Har bir tarif SLA bo'yicha xizmat, GoARKAN kirishi va IT-infratuzilmangizni qo'llab-quvvatlashni o'z ichiga oladi. Farqi faqat xizmat hajmi va mavjud resurslarda.",
    popular: "Mashhur tanlov",
    currency: "so'm/oy",
    contactSales: "Sotuv bo'limi bilan bog'laning",
    ctaPrefix: "Boshlash",
    customTitle: "Nostandart talablar?",
    customBody: "100 dan ortiq ish joylari, o'ziga xos infratuzilma, bir nechta ofislar? Individual taklif tayyorlaymiz.",
    customCta: "Shartlarni muhokama qilish",
    benefitsTitle: "Har bir tarifga nima kiradi",
    benefits: [
      { title: "SLA bo'yicha ish", desc: "Barcha majburiyatlar shartnoma bilan belgilangan." },
      { title: "Shaffof shartlar", desc: "Yashirin to'lovlar va kutilmagan xarajatlarsiz." },
      { title: "Moslashuvchan tariflar", desc: "Biznes o'sishi bilan tarifni o'zgartirish mumkin." },
      { title: "GoARKAN hisoboti", desc: "Barcha bajarilgan ishlar tizimda qayd etiladi." },
    ],
    faqTitle: "Tariflar haqida muhim ma'lumot",
    faqs: [
      { q: "Tarif nimani o'z ichiga oladi?", a: "Tarif oylik belgilangan xizmat hajmini o'z ichiga oladi: xodimlarning arizalari, masofaviy yordam, monitoring va GoARKAN kirishi. Aniq tarkib tanlangan rejaga bog'liq." },
      { q: "Bitta ariza nima hisoblanadi?", a: "Bitta ariza — xodimning bitta murojati: nosozlik, sozlash, savol, masofaviy yordam yoki mutaxassis tashrifi. Har bir murojat GoARKAN'da qayd etiladi va alohida yopiladi." },
      { q: "Masofaviy qo'llab-quvvatlashga nima kiradi?", a: "Diagnostika, sozlash yoki dasturiy ta'minotni o'rnatish uchun xodim kompyuteriga masofadan ulanish. Bir sessiya — ulanishning davomiyligidan qat'iy nazar bitta ulanish." },
      { q: "Tarifga nima kirmaydi?", a: "Uskunalar va litsenziyalar xarid qilish, dasturiy ta'minot ishlab chiqish, yirik loyiha ishlari (ERP joriy etish, serverlarni ko'chirish) va oldindan kelishilmagan ishlar. Bu xizmatlar alohida kelishuv bo'yicha bajariladi." },
      { q: "Limitlar tugaganda nima bo'ladi?", a: "Biz sizni oldindan xabardor qilamiz. Qo'shimcha ishlar faqat sizning roziligingizdan keyin bajariladi va joriy narx ro'yxatiga muvofiq to'lanadi. Ishlar sizning xabaringiz olmay to'xtamaydi." },
      { q: "Tarifni o'zgartirish mumkinmi?", a: "Ha. Kompaniya o'sganda istalgan vaqtda tarifni oshirish mumkin. Kamaytirish joriy shartnoma shartlariga bog'liq. ENTERPRISE tarifi uchun individual shartlar mavjud." },
      { q: "Foydalanilmagan xizmatlar o'tkazib yuboriladi mi?", a: "Yo'q. Foydalanilmagan xizmat hajmi keyingi oyga o'tkazilmaydi. Limitlar har bir hisob-kitob davrining boshida yangilanadi." },
      { q: "Ulanish qanday amalga oshiriladi?", a: "Shartnoma imzolanganidan so'ng jamoamiz dastlabki infratuzilma tahlilini o'tkazadi, monitoring va GoARKAN Service Desk'ni sozlaydi. Ishga tushirish 5 ish kuniga qadar davom etadi." },
      { q: "SLA qanday ishlaydi?", a: "SLA — xizmat ko'rsatish darajasi to'g'risidagi kelishuv. Har bir ariza bo'yicha birinchi javob va hal qilish muddatlari shartnomada belgilangan. SLA buzilishi ARKANA uchun jarima sanksiyalariga olib keladi." },
      { q: "Qanday ishlar alohida to'lanadi?", a: "Belgilangan hajmdan tashqari ishlar, loyiha vazifalari, qo'shimcha tashriflar va barcha nostandart so'rovlar alohida kelishiladi va narx ro'yxatiga ko'ra to'lanadi." },
    ],
    conditionsTitle: "Tijorat shartlari",
    conditions: [
      "Har bir tarif oylik belgilangan xizmat hajmini o'z ichiga oladi.",
      "Belgilangan limitlardan oshgan ishlar faqat mijoz roziligi bilan bajariladi.",
      "Qo'shimcha ishlar ARKANA joriy narx ro'yxatiga muvofiq to'lanadi.",
      "Foydalanilmagan xizmat hajmi keyingi davrga o'tkazilmaydi.",
      "ENTERPRISE tarifi uchun individual shartlar mavjud.",
    ],
  },
};

/* ─── Fallback plans ────────────────────────────────────────────────── */
const FALLBACK_PLANS: Plan[] = [
  {
    id: 1, slug: "start", name: "START", is_popular: false, sort_order: 1, max_workstations: 25,
    price_label: "от 3 000 000", price_monthly: 3000000,
    cta_label: "Начать с START", cta_href: "/contact", website_show_contact_sales: false,
    features: [
      { text: "Service Desk (GoARKAN)", is_included: true },
      { text: "SLA — реакция 2 часа", is_included: true },
      { text: "Мониторинг серверов 24/7", is_included: true },
      { text: "Резервное копирование", is_included: true },
      { text: "Именной инженер", is_included: false },
      { text: "Кибербезопасность", is_included: false },
    ],
    services: [
      { count: "до 25", label: "Рабочих мест" },
      { count: "40", label: "Заявок в мес." },
    ],
  },
  {
    id: 2, slug: "operations", name: "OPERATIONS", is_popular: true, sort_order: 2, max_workstations: 75,
    price_label: "от 6 000 000", price_monthly: 6000000,
    cta_label: "Начать с OPERATIONS", cta_href: "/contact", website_show_contact_sales: false,
    features: [
      { text: "Service Desk (GoARKAN)", is_included: true },
      { text: "SLA — реакция 1 час", is_included: true },
      { text: "Мониторинг серверов 24/7", is_included: true },
      { text: "Резервное копирование", is_included: true },
      { text: "Именной инженер", is_included: true },
      { text: "Кибербезопасность базовая", is_included: true },
    ],
    services: [
      { count: "до 75", label: "Рабочих мест" },
      { count: "100", label: "Заявок в мес." },
    ],
  },
  {
    id: 3, slug: "enterprise", name: "ENTERPRISE", is_popular: false, sort_order: 3, max_workstations: null,
    price_label: "Индивидуально", price_monthly: null,
    cta_label: "Связаться с отделом продаж", cta_href: "/contact", website_show_contact_sales: true,
    features: [
      { text: "Service Desk (GoARKAN)", is_included: true },
      { text: "Индивидуальный SLA", is_included: true },
      { text: "Мониторинг серверов 24/7", is_included: true },
      { text: "Резервное копирование", is_included: true },
      { text: "Выделенная команда", is_included: true },
      { text: "Кибербезопасность расширенная", is_included: true },
    ],
    services: [],
  },
];

/* ─── Benefit icons ─────────────────────────────────────────────────── */
const BENEFIT_ICONS = [ShieldCheck, EqualNot, RefreshCw, LayoutGrid];

/* ─── Feature row value ─────────────────────────────────────────────── */
function FeatureValue({ value }: { value: boolean | string }) {
  if (value === true)  return <CheckCircle2 size={16} style={{ color: "var(--ark-text-muted)" }} />;
  if (value === false) return <X size={16} style={{ color: "var(--ark-text-faint)", opacity: 0.5 }} />;
  return <span style={{ fontSize: 13, color: "var(--ark-text-muted)" }}>{value}</span>;
}

/* ─── Main component ────────────────────────────────────────────────── */
export function PricingSection({ plans = [] }: { plans?: Plan[] }) {
  const { lang } = useApp();
  const c = COPY[lang] ?? COPY.ru;
  const [open, setOpen] = useState<number | null>(null);

  const activePlans = plans.length > 0 ? plans : FALLBACK_PLANS;
  const subtitles = SUBTITLES[lang] ?? SUBTITLES.ru;
  const featureMap = PLAN_FEATURES[lang] ?? PLAN_FEATURES.ru;

  const PLANS = activePlans.map(p => ({
    id:       p.slug,
    name:     p.name,
    subtitle: subtitles[p.slug] ?? "",
    price:    p.price_label ?? (p.price_monthly != null ? `от ${p.price_monthly.toLocaleString("ru-RU")}` : "—"),
    currency: p.price_monthly != null ? c.currency : "",
    popular:  p.is_popular,
    ctaLabel: p.website_show_contact_sales ? c.contactSales : `${c.ctaPrefix} ${p.name}`,
    ctaHref:  `/contact?plan=${p.slug}`,
    services: p.services ?? [],
    features: featureMap[p.slug] ?? p.features.map(f => ({ label: f.text, value: f.is_included })),
  }));

  const allItems = [...c.faqs, { q: c.conditionsTitle, a: "", isConditions: true }];
  const totalRows = c.faqs.length + 1;

  return (
    <div style={{ minHeight: "100vh" }}>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section style={{ padding: "96px 0 64px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, zIndex: 0,
          background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.12), transparent)",
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1, textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: EASE }}>
            <div className="ark-badge" style={{ justifyContent: "center", marginBottom: 24 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ark-accent-2)" }}>{c.badge}</span>
            </div>
            <h1 style={{
              fontFamily: "Nacelle, sans-serif", fontWeight: 600,
              fontSize: "clamp(2.25rem, 5vw, 3.5rem)", letterSpacing: "-0.04em",
              lineHeight: 1.05, marginBottom: 20, whiteSpace: "pre-line",
            }}>
              <span className="heading-gradient">{c.h1}</span>
            </h1>
            <p style={{ fontSize: 17, color: "var(--ark-text-muted)", lineHeight: 1.65, maxWidth: 560, margin: "0 auto" }}>
              {c.sub}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Tariff cards ──────────────────────────────────────────────── */}
      <section style={{ padding: "0 0 96px" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
                style={{
                  borderRadius: 16,
                  border: plan.popular ? "1px solid rgba(99,102,241,0.5)" : "1px solid var(--ark-border)",
                  background: plan.popular
                    ? "linear-gradient(to bottom right, rgba(99,102,241,0.12), rgba(79,70,229,0.05))"
                    : "var(--ark-card)",
                  padding: "28px 24px",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {plan.popular && (
                  <div style={{
                    position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)",
                    padding: "4px 16px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                    background: "var(--ark-accent)", color: "white", whiteSpace: "nowrap",
                    letterSpacing: "0.06em", textTransform: "uppercase",
                  }}>
                    {c.popular}
                  </div>
                )}

                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontFamily: "Nacelle, sans-serif", fontSize: 18, fontWeight: 700, color: "var(--ark-text)", marginBottom: 2, letterSpacing: "0.04em" }}>
                    {plan.name}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--ark-text-muted)", marginBottom: 16 }}>{plan.subtitle}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 2 }}>
                    <span style={{ fontFamily: "Nacelle, sans-serif", fontSize: plan.id === "enterprise" ? 22 : 26, fontWeight: 600, color: "var(--ark-text)", letterSpacing: "-0.03em", lineHeight: 1 }}>
                      {plan.price}
                    </span>
                  </div>
                  {plan.currency && (
                    <div style={{ fontSize: 12, color: "var(--ark-text-muted)" }}>{plan.currency}</div>
                  )}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
                  {plan.services.map(({ count, label }) => (
                    <div key={label} style={{ padding: "10px 12px", borderRadius: 8, background: "var(--ark-bg-2)", border: "1px solid var(--ark-border)" }}>
                      <div style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 700, fontSize: 20, color: "var(--ark-text)", lineHeight: 1, marginBottom: 3 }}>{count}</div>
                      <div style={{ fontSize: 10, color: "var(--ark-text-muted)", lineHeight: 1.3 }}>{label}</div>
                    </div>
                  ))}
                </div>

                <Link href={plan.ctaHref} className="btn" style={{
                  background: plan.popular ? "linear-gradient(to bottom, #6366f1, #4f46e5)" : "var(--ark-surface)",
                  color: plan.popular ? "white" : "var(--ark-text)",
                  border: plan.popular ? "none" : "1px solid var(--ark-border)",
                  boxShadow: plan.popular ? "inset 0 1px 0 rgba(255,255,255,0.16)" : "none",
                  marginBottom: 20, width: "100%", justifyContent: "center", fontSize: 13,
                }}>
                  {plan.ctaLabel}
                  <ArrowRight size={13} />
                </Link>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {plan.features.map((f) => (
                    <div key={f.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                      <span style={{ fontSize: 13, color: "var(--ark-text-muted)" }}>{f.label}</span>
                      <FeatureValue value={f.value} />
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Custom plan strip */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{
              marginTop: 16, borderRadius: 16, padding: "28px 32px",
              background: "var(--ark-card)", border: "1px solid var(--ark-border)",
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap",
            }}
          >
            <div>
              <div style={{ fontFamily: "Nacelle, sans-serif", fontSize: 18, fontWeight: 600, color: "var(--ark-text)", marginBottom: 6 }}>
                {c.customTitle}
              </div>
              <p style={{ fontSize: 14, color: "var(--ark-text-muted)" }}>{c.customBody}</p>
            </div>
            <Link href="/contact" className="btn grad-border" style={{ background: "var(--ark-surface)", color: "var(--ark-text)", flexShrink: 0 }}>
              {c.customCta}
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Premium benefits ─────────────────────────────────────────── */}
      <section style={{ padding: "64px 0", borderTop: "1px solid transparent", borderImage: "linear-gradient(to right, transparent, rgba(148,163,184,0.15), transparent) 1" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
          <h2 style={{
            fontFamily: "Nacelle, sans-serif", fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
            fontWeight: 600, letterSpacing: "-0.04em", marginBottom: 32, color: "var(--ark-text-heading)",
          }}>
            {c.benefitsTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {c.benefits.map(({ title, desc }, i) => {
              const Icon = BENEFIT_ICONS[i];
              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                  style={{
                    padding: "24px 20px",
                    borderRadius: 12,
                    background: "var(--ark-card)",
                    border: "1px solid var(--ark-border)",
                  }}
                >
                  <div style={{ marginBottom: 12 }}>
                    <Icon size={20} strokeWidth={1.5} style={{ color: "var(--ark-text-muted)" }} />
                  </div>
                  <div style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: 14, color: "var(--ark-text)", marginBottom: 6, letterSpacing: "-0.01em" }}>
                    {title}
                  </div>
                  <p style={{ fontSize: 13, color: "var(--ark-text-muted)", lineHeight: 1.6, margin: 0 }}>{desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Unified FAQ + conditions ─────────────────────────────────── */}
      <section style={{ padding: "64px 0 96px", borderTop: "1px solid transparent", borderImage: "linear-gradient(to right, transparent, rgba(148,163,184,0.15), transparent) 1" }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "0 1.5rem" }}>
          <h2 style={{ fontFamily: "Nacelle, sans-serif", fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 600, letterSpacing: "-0.04em", textAlign: "center", marginBottom: 48 }}>
            <span className="heading-gradient">{c.faqTitle}</span>
          </h2>

          {/* FAQ accordion */}
          <div style={{ display: "flex", flexDirection: "column", gap: 1, marginBottom: 40 }}>
            {c.faqs.map((faq, i) => {
              const isOpen = open === i;
              const last = i === c.faqs.length - 1;
              return (
                <div
                  key={i}
                  style={{
                    padding: "20px 24px",
                    borderRadius: i === 0 ? "12px 12px 0 0" : last ? "0 0 12px 12px" : 0,
                    background: "var(--ark-card)",
                    border: "1px solid var(--ark-border)",
                    borderBottom: last ? "1px solid var(--ark-border)" : "none",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: "Nacelle, sans-serif", fontSize: 15, fontWeight: 600, color: "var(--ark-text)", marginBottom: isOpen ? 8 : 0 }}>
                        {faq.q}
                      </p>
                      {isOpen && (
                        <p style={{ fontSize: 14, color: "var(--ark-text-muted)", lineHeight: 1.65, margin: 0 }}>
                          {faq.a}
                        </p>
                      )}
                    </div>
                    <ChevronDown
                      size={16}
                      style={{
                        color: "var(--ark-text-muted)",
                        flexShrink: 0,
                        marginTop: 2,
                        transition: "transform 0.2s",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Commercial conditions */}
          <div style={{
            padding: "28px 32px",
            borderRadius: 12,
            background: "var(--ark-bg-2)",
            border: "1px solid var(--ark-border)",
          }}>
            <div style={{ fontFamily: "Nacelle, sans-serif", fontSize: 15, fontWeight: 600, color: "var(--ark-text)", marginBottom: 16, letterSpacing: "-0.01em" }}>
              {c.conditionsTitle}
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {c.conditions.map((cond, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "var(--ark-text-muted)", lineHeight: 1.6 }}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--ark-accent)", flexShrink: 0, marginTop: 8 }} />
                  {cond}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
