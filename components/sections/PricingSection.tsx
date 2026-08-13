"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Check, ChevronDown,
  ShieldCheck, EqualNot, RefreshCw, LayoutGrid, ArrowRight, Star,
} from "lucide-react";
import { useApp } from "@/components/providers/ThemeLanguageProvider";

const PORTAL_API = "/api/pricing";
const PLANS_CACHE_KEY = "ark_plans_cache";
const EASE = [0.16, 1, 0.3, 1] as const;

type ApiPlan = {
  code: string;
  name: string;
  displayPrice: string;
  pricingModel: string;
  userLimit: number | null;
  ticketLimitMo: number | null;
  printerRefillLimit: number | null;
  onsiteVisitLimit: number | null;
  remoteSessionLimit: number | null;
  sortOrder: number;
};

/* ─── Static per-plan metadata ──────────────────────────────────────── */
const PLAN_META: Record<string, {
  sla: string;
  recommended?: boolean;
  sdFeatures: Record<string, string[]>;
  services: { color: string; label: Record<string, string> }[];
  cta: Record<string, string>;
}> = {
  micro: {
    sla: "SLA 8h",
    sdFeatures: { ru: [], en: [], uz: [], zh: [] },
    services: [
      { color: "#94a3b8", label: { ru: "Удалённая и выездная поддержка", en: "Remote & on-site support", uz: "Masofaviy va joyida qo'llab-quvvatlash", zh: "远程与上门支持" } },
      { color: "#94a3b8", label: { ru: "IT Support", en: "IT Support", uz: "IT Support", zh: "IT支持" } },
      { color: "#94a3b8", label: { ru: "Сетевые работы", en: "Network services", uz: "Tarmoq ishlari", zh: "网络服务" } },
    ],
    cta: { ru: "Начать работу", en: "Get started", uz: "Boshlash", zh: "立即开始" },
  },
  start: {
    sla: "SLA 4h",
    sdFeatures: {
      ru: ["Telegram Bot для заявок", "Присвоение номера заявки", "Контроль статуса", "История заявок", "Уведомления пользователей"],
      en: ["Telegram Bot for tickets", "Ticket number assignment", "Status tracking", "Ticket history", "User notifications"],
      uz: ["Arizalar uchun Telegram Bot", "Ariza raqamini belgilash", "Holat nazorati", "Arizalar tarixi", "Foydalanuvchi xabarnomalar"],
      zh: ["Telegram Bot工单提交", "工单编号分配", "状态跟踪", "工单历史", "用户通知"],
    },
    services: [
      { color: "#f97316", label: { ru: "Приоритетная поддержка", en: "Priority support", uz: "Ustuvor qo'llab-quvvatlash", zh: "优先支持" } },
      { color: "#94a3b8", label: { ru: "IT Support", en: "IT Support", uz: "IT Support", zh: "IT支持" } },
      { color: "#94a3b8", label: { ru: "Сетевые работы", en: "Network services", uz: "Tarmoq ishlari", zh: "网络服务" } },
      { color: "#22c55e", label: { ru: "Видеонаблюдение", en: "CCTV", uz: "Videokuzatuv", zh: "视频监控" } },
    ],
    cta: { ru: "Подключить Service Desk", en: "Connect Service Desk", uz: "Service Desk ulash", zh: "接入服务台" },
  },
  business: {
    sla: "SLA 2–4h",
    recommended: true,
    sdFeatures: {
      ru: ["Telegram Bot для заявок", "Присвоение номера заявки", "Контроль статуса", "История заявок", "Уведомления пользователей", "Мобильное приложение", "Push-уведомления", "Управление заявками"],
      en: ["Telegram Bot for tickets", "Ticket number assignment", "Status tracking", "Ticket history", "User notifications", "Mobile app", "Push notifications", "Ticket management"],
      uz: ["Arizalar uchun Telegram Bot", "Ariza raqamini belgilash", "Holat nazorati", "Arizalar tarixi", "Foydalanuvchi xabarnomalar", "Mobil ilova", "Push-xabarnomalar", "Arizalarni boshqarish"],
      zh: ["Telegram Bot工单提交", "工单编号分配", "状态跟踪", "工单历史", "用户通知", "移动应用", "推送通知", "工单管理"],
    },
    services: [
      { color: "#f97316", label: { ru: "Приоритетный выезд", en: "Priority on-site", uz: "Ustuvor tashrif", zh: "优先上门" } },
      { color: "#94a3b8", label: { ru: "IT Support", en: "IT Support", uz: "IT Support", zh: "IT支持" } },
      { color: "#94a3b8", label: { ru: "Сетевые работы", en: "Network services", uz: "Tarmoq ishlari", zh: "网络服务" } },
      { color: "#94a3b8", label: { ru: "Серверы", en: "Servers", uz: "Serverlar", zh: "服务器" } },
      { color: "#22c55e", label: { ru: "Видеонаблюдение", en: "CCTV", uz: "Videokuzatuv", zh: "视频监控" } },
      { color: "#3b82f6", label: { ru: "IP-телефония", en: "IP telephony", uz: "IP-telefon", zh: "IP电话" } },
      { color: "#a855f7", label: { ru: "IT аудит", en: "IT audit", uz: "IT audit", zh: "IT审计" } },
    ],
    cta: { ru: "Подключить Service Desk", en: "Connect Service Desk", uz: "Service Desk ulash", zh: "接入服务台" },
  },
  enterprise_plus: {
    sla: "SLA 2h",
    sdFeatures: {
      ru: ["Telegram Bot для заявок", "Присвоение номера заявки", "Контроль статуса", "История заявок", "Уведомления пользователей", "Мобильное приложение", "Push-уведомления", "Управление заявками"],
      en: ["Telegram Bot for tickets", "Ticket number assignment", "Status tracking", "Ticket history", "User notifications", "Mobile app", "Push notifications", "Ticket management"],
      uz: ["Arizalar uchun Telegram Bot", "Ariza raqamini belgilash", "Holat nazorati", "Arizalar tarixi", "Foydalanuvchi xabarnomalar", "Mobil ilova", "Push-xabarnomalar", "Arizalarni boshqarish"],
      zh: ["Telegram Bot工单提交", "工单编号分配", "状态跟踪", "工单历史", "用户通知", "移动应用", "推送通知", "工单管理"],
    },
    services: [
      { color: "#f97316", label: { ru: "Максимальный приоритет", en: "Maximum priority", uz: "Maksimal ustuvorlik", zh: "最高优先级" } },
      { color: "#94a3b8", label: { ru: "IT Support", en: "IT Support", uz: "IT Support", zh: "IT支持" } },
      { color: "#94a3b8", label: { ru: "Сетевые работы", en: "Network services", uz: "Tarmoq ishlari", zh: "网络服务" } },
      { color: "#94a3b8", label: { ru: "Серверы", en: "Servers", uz: "Serverlar", zh: "服务器" } },
      { color: "#22c55e", label: { ru: "Видеонаблюдение", en: "CCTV", uz: "Videokuzatuv", zh: "视频监控" } },
      { color: "#3b82f6", label: { ru: "IP-телефония", en: "IP telephony", uz: "IP-telefon", zh: "IP电话" } },
      { color: "#a855f7", label: { ru: "IT аудит", en: "IT audit", uz: "IT audit", zh: "IT审计" } },
    ],
    cta: { ru: "Подключить Service Desk", en: "Connect Service Desk", uz: "Service Desk ulash", zh: "接入服务台" },
  },
  pro: {
    sla: "SLA 1h",
    sdFeatures: {
      ru: ["Telegram Bot для заявок", "Присвоение номера заявки", "Контроль статуса", "История заявок", "Уведомления пользователей", "Мобильное приложение", "Push-уведомления", "Управление заявками"],
      en: ["Telegram Bot for tickets", "Ticket number assignment", "Status tracking", "Ticket history", "User notifications", "Mobile app", "Push notifications", "Ticket management"],
      uz: ["Arizalar uchun Telegram Bot", "Ariza raqamini belgilash", "Holat nazorati", "Arizalar tarixi", "Foydalanuvchi xabarnomalar", "Mobil ilova", "Push-xabarnomalar", "Arizalarni boshqarish"],
      zh: ["Telegram Bot工单提交", "工单编号分配", "状态跟踪", "工单历史", "用户通知", "移动应用", "推送通知", "工单管理"],
    },
    services: [
      { color: "#f97316", label: { ru: "Инженер постоянно в офисе", en: "Dedicated on-site engineer", uz: "Doimiy ofis muhandisi", zh: "驻场专属工程师" } },
      { color: "#f97316", label: { ru: "Полный контроль IT", en: "Full IT control", uz: "To'liq IT nazorati", zh: "全面IT管控" } },
      { color: "#94a3b8", label: { ru: "IT Support", en: "IT Support", uz: "IT Support", zh: "IT支持" } },
      { color: "#94a3b8", label: { ru: "Сетевые работы", en: "Network services", uz: "Tarmoq ishlari", zh: "网络服务" } },
      { color: "#94a3b8", label: { ru: "Серверы", en: "Servers", uz: "Serverlar", zh: "服务器" } },
      { color: "#22c55e", label: { ru: "Видеонаблюдение", en: "CCTV", uz: "Videokuzatuv", zh: "视频监控" } },
      { color: "#3b82f6", label: { ru: "IP-телефония", en: "IP telephony", uz: "IP-telefon", zh: "IP电话" } },
      { color: "#a855f7", label: { ru: "IT аудит", en: "IT audit", uz: "IT audit", zh: "IT审计" } },
    ],
    cta: { ru: "Получить IT-поддержку", en: "Get IT support", uz: "IT yordam olish", zh: "获取IT支持" },
  },
};

/* ─── Copy ─────────────────────────────────────────────────────────── */
const COPY: Record<string, {
  badge: string; h1: string; sub: string; currency: string; mo: string; wstUnit: string;
  pcs: string; tickets: string; refills: string; sdLabel: string; recommended: string;
  unlimited: string; contactSales: string;
  customTitle: string; customBody: string; customCta: string;
  benefitsTitle: string; benefits: { title: string; desc: string }[];
  faqTitle: string; faqs: { q: string; a: string }[];
  conditionsTitle: string; conditions: string[];
}> = {
  ru: {
    badge: "Тарифы",
    h1: "Выберите уровень IT,\nкоторый нужен вашему бизнесу.",
    sub: "Каждый тариф включает работу по SLA, доступ к GoARKAN и сопровождение вашей IT-инфраструктуры. Отличается только объём обслуживания и доступные ресурсы.",
    currency: "сум", mo: "/ месяц", wstUnit: "ПК",
    pcs: "РАБОЧИХ МЕСТ", tickets: "ЗАЯВОК", refills: "ЗАПРАВКИ", sdLabel: "SERVICE DESK ВКЛЮЧЁН",
    recommended: "Рекомендуемый", unlimited: "∞", contactSales: "По запросу",
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
    currency: "UZS", mo: "/ month", wstUnit: "PC",
    pcs: "WORKSTATIONS", tickets: "TICKETS", refills: "REFILLS", sdLabel: "SERVICE DESK INCLUDED",
    recommended: "Recommended", unlimited: "∞", contactSales: "By request",
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
      { q: "What happens when limits are reached?", a: "We notify you in advance. Nothing proceeds without your approval. Additional work is billed at the current price list — no surprises." },
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
    currency: "so'm", mo: "/ oy", wstUnit: "ish joyi",
    pcs: "ISH JOYLARI", tickets: "ARIZALAR", refills: "TO\'LDIRISH", sdLabel: "SERVICE DESK KIRITILGAN",
    recommended: "Tavsiya etiladi", unlimited: "∞", contactSales: "So'rov bo'yicha",
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
      { q: "Tarifga nima kirmaydi?", a: "Uskunalar va litsenziyalar xarid qilish, dasturiy ta'minot ishlab chiqish, yirik loyiha ishlari va oldindan kelishilmagan ishlar. Bu xizmatlar alohida kelishuv bo'yicha bajariladi." },
      { q: "Limitlar tugaganda nima bo'ladi?", a: "Biz sizni oldindan xabardor qilamiz. Qo'shimcha ishlar faqat sizning roziligingizdan keyin bajariladi va joriy narx ro'yxatiga muvofiq to'lanadi." },
      { q: "Tarifni o'zgartirish mumkinmi?", a: "Ha. Kompaniya o'sganda istalgan vaqtda tarifni oshirish mumkin. ENTERPRISE tarifi uchun individual shartlar mavjud." },
      { q: "Foydalanilmagan xizmatlar o'tkazib yuboriladi mi?", a: "Yo'q. Foydalanilmagan xizmat hajmi keyingi oyga o'tkazilmaydi. Limitlar har bir hisob-kitob davrining boshida yangilanadi." },
      { q: "Ulanish qanday amalga oshiriladi?", a: "Shartnoma imzolanganidan so'ng jamoamiz dastlabki infratuzilma tahlilini o'tkazadi, monitoring va GoARKAN Service Desk'ni sozlaydi. Ishga tushirish 5 ish kuniga qadar davom etadi." },
      { q: "SLA qanday ishlaydi?", a: "SLA — xizmat ko'rsatish darajasi to'g'risidagi kelishuv. Har bir ariza bo'yicha birinchi javob va hal qilish muddatlari shartnomada belgilangan." },
      { q: "Qanday ishlar alohida to'lanadi?", a: "Belgilangan hajmdan tashqari ishlar, loyiha vazifalari, qo'shimcha tashriflar va barcha nostandart so'rovlar alohida kelishiladi va to'lanadi." },
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
  zh: {
    badge: "定价方案",
    h1: "选择适合\n您企业的IT服务级别。",
    sub: "每个套餐均包含SLA承诺服务、GoARKAN访问权限及完整的IT基础设施支持。区别仅在于服务量和可用资源。",
    currency: "苏姆", mo: "/ 月", wstUnit: "台",
    pcs: "工作站", tickets: "工单", refills: "耗材补充", sdLabel: "服务台已包含",
    recommended: "推荐", unlimited: "∞", contactSales: "按需询价",
    customTitle: "有非标准需求？",
    customBody: "超过100台工作站、特定基础设施、多办公室？我们将为您量身定制方案。",
    customCta: "洽谈合作条件",
    benefitsTitle: "每个套餐的通用权益",
    benefits: [
      { title: "SLA服务保障", desc: "所有义务均以合同形式约定。" },
      { title: "透明定价", desc: "无隐性费用，无意外支出。" },
      { title: "灵活套餐", desc: "业务增长时可随时升级套餐。" },
      { title: "GoARKAN报告", desc: "所有完成的工作均在系统中留有记录。" },
    ],
    faqTitle: "套餐重要说明",
    faqs: [
      { q: "套餐包含哪些内容？", a: "每个套餐包含固定的月度服务量：员工工单、远程支持、监控及GoARKAN访问权限。具体内容取决于所选套餐。" },
      { q: "什么算作一张工单？", a: "一张工单对应一次员工请求：故障、配置、咨询、远程协助或上门服务。每次请求在GoARKAN中单独登记和关闭。" },
      { q: "远程支持包含哪些内容？", a: "远程连接至员工电脑，进行诊断、配置或软件安装。一次会话等于一次连接，不计时长。" },
      { q: "套餐不包含哪些内容？", a: "硬件和许可证采购、软件开发、大型项目工作（ERP实施、服务器迁移）及未事先约定的工作。这些均另行协议处理。" },
      { q: "超出限额后会怎样？", a: "我们提前通知您。任何额外工作均须经您确认后方可执行，并按现行价目表计费。不会有任何未知支出。" },
      { q: "可以更换套餐吗？", a: "可以。业务增长时可随时升级套餐。降级须按现行合同条款处理。ENTERPRISE套餐提供定制条款。" },
      { q: "未使用的服务量能否结转？", a: "不能。未使用的服务量不结转至下月，每个计费周期开始时重新计算。" },
      { q: "如何开始使用？", a: "签署合同后，我们团队将进行基础设施初步评估，配置监控和GoARKAN服务台。启动最多需要5个工作日。" },
      { q: "SLA如何运作？", a: "SLA是服务级别协议。每张工单的首次响应时间和解决时间均在合同中明确规定。ARKANA违反SLA须承担违约责任。" },
      { q: "哪些工作单独计费？", a: "超出包含量的工作、项目任务、额外上门服务及所有非标准请求，均需单独协商并按价目表计费。" },
    ],
    conditionsTitle: "商务条款",
    conditions: [
      "每个套餐包含固定的月度服务量。",
      "超出包含限额的工作，须经客户确认后方可执行。",
      "额外工作按ARKANA现行价目表计费。",
      "未使用的服务量不结转至下一计费周期。",
      "ENTERPRISE套餐提供定制条款。",
    ],
  },
};

const BENEFIT_ICONS = [ShieldCheck, EqualNot, RefreshCw, LayoutGrid];

/* ─── Pricing Card ──────────────────────────────────────────────────── */
function PricingCard({
  plan, meta, c, lang, index,
}: {
  plan: ApiPlan;
  meta: typeof PLAN_META[string];
  c: typeof COPY["ru"];
  lang: string;
  index: number;
}) {
  const isRecommended = meta.recommended;
  const isCustom = plan.pricingModel === "custom";
  const hasSd = (meta.sdFeatures[lang] ?? meta.sdFeatures.ru).length > 0;

  const statLabel: React.CSSProperties = {
    fontSize: 9, fontWeight: 700, letterSpacing: "0.1em",
    color: "rgba(148,163,184,0.7)", marginBottom: 4, textTransform: "uppercase",
  };
  const statVal: React.CSSProperties = {
    fontSize: 17, fontWeight: 700, color: "#f1f5f9", lineHeight: 1.1, fontFamily: "Nacelle, sans-serif",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.08 }}
      whileHover={{ y: -5, transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] } }}
      style={{
        position: "relative",
        borderRadius: 16,
        padding: isRecommended ? 2 : 0,
        background: isRecommended
          ? "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #3b82f6 100%)"
          : "transparent",
        width: "100%",
        height: "100%",
        cursor: "default",
      }}
    >
      {/* Recommended badge */}
      {isRecommended && (
        <div style={{
          position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
          background: "linear-gradient(90deg, #3b82f6, #6366f1)",
          borderRadius: 20, padding: "4px 14px",
          display: "flex", alignItems: "center", gap: 5,
          fontSize: 11, fontWeight: 700, color: "#fff",
          whiteSpace: "nowrap", letterSpacing: "0.04em", zIndex: 10,
          boxShadow: "0 2px 12px rgba(99,102,241,0.5)",
        }}>
          <Star size={10} fill="white" stroke="none" />
          {c.recommended}
        </div>
      )}

      {/* Card inner */}
      <div style={{
        borderRadius: isRecommended ? 14 : 16,
        border: isRecommended ? "none" : "1px solid rgba(255,255,255,0.08)",
        background: "#0f1117",
        padding: "24px 18px 20px",
        display: "flex", flexDirection: "column", height: "100%",
        transition: "border-color 0.25s, box-shadow 0.25s",
      }}
        className="pricing-card-inner"
      >
        {/* Plan name */}
        <div style={{
          fontSize: 11, fontWeight: 800, letterSpacing: "0.15em",
          color: isRecommended ? "#60a5fa" : "rgba(148,163,184,0.8)",
          textTransform: "uppercase", marginBottom: 12,
        }}>
          {plan.name}
        </div>

        {/* Price */}
        <div style={{ marginBottom: 4 }}>
          {isCustom ? (
            <div style={{ fontFamily: "Nacelle, sans-serif", fontSize: 22, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.02em", lineHeight: 1 }}>
              {c.contactSales}
            </div>
          ) : (
            <div style={{ fontFamily: "Nacelle, sans-serif", fontSize: 26, fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.03em", lineHeight: 1 }}>
              {plan.displayPrice.replace(/\s*(сум|so'm|UZS).*/, "")}
            </div>
          )}
        </div>
        <div style={{ fontSize: 12, color: "rgba(148,163,184,0.6)", marginBottom: 18 }}>
          {isCustom ? "" : `${plan.displayPrice.match(/сум|so'm|UZS/)?.[0] ?? c.currency} ${c.mo}`}
        </div>

        {/* Stats grid */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 1, marginBottom: 18,
          background: "rgba(255,255,255,0.05)", borderRadius: 10, overflow: "hidden",
        }}>
          {[
            { label: c.pcs, val: plan.userLimit ? `${plan.userLimit} ${c.wstUnit}` : "—" },
            { label: "SLA", val: meta.sla },
            { label: c.tickets, val: plan.ticketLimitMo?.toString() ?? "—" },
            { label: c.refills, val: plan.printerRefillLimit != null ? plan.printerRefillLimit.toString() : c.unlimited },
          ].map(({ label, val }) => (
            <div key={label} style={{ padding: "10px 10px 9px", background: "rgba(15,17,23,0.8)" }}>
              <div style={statLabel}>{label}</div>
              <div style={statVal}>{val}</div>
            </div>
          ))}
        </div>

        {/* Service Desk block */}
        {hasSd && (
          <div style={{ marginBottom: 16 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 7, marginBottom: 10,
            }}>
              <div style={{
                width: 18, height: 18, borderRadius: "50%",
                background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <Check size={10} color="white" strokeWidth={3} />
              </div>
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", color: "#60a5fa", textTransform: "uppercase" }}>
                {c.sdLabel}
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5, paddingLeft: 4 }}>
              {(meta.sdFeatures[lang] ?? meta.sdFeatures.ru).map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#3b82f6", flexShrink: 0 }} />
                  <span style={{ fontSize: 11.5, color: "rgba(148,163,184,0.85)", lineHeight: 1.3 }}>{f}</span>
                </div>
              ))}
            </div>
            <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "14px 0" }} />
          </div>
        )}

        {/* Services checklist */}
        <div style={{ display: "flex", flexDirection: "column", gap: 7, flex: 1, marginBottom: 20 }}>
          {meta.services.map(({ color, label }) => (
            <div key={label.ru} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <Check size={13} style={{ color, flexShrink: 0, marginTop: 1 }} strokeWidth={2.5} />
              <span style={{ fontSize: 12, color: "rgba(241,245,249,0.8)", lineHeight: 1.4 }}>{label[lang] ?? label.ru}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          href={`/contact?plan=${plan.code}`}
          style={{
            display: "block", textAlign: "center",
            padding: "11px 16px",
            borderRadius: 10,
            fontSize: 12.5, fontWeight: 700,
            textDecoration: "none",
            transition: "background-color 150ms cubic-bezier(0.4,0,0.2,1), box-shadow 150ms cubic-bezier(0.4,0,0.2,1), transform 100ms cubic-bezier(0.4,0,0.2,1), color 150ms",
            ...(isRecommended ? {
              background: "linear-gradient(135deg, #3b82f6, #6366f1)",
              color: "#fff",
              boxShadow: "0 4px 16px rgba(99,102,241,0.4)",
            } : {
              background: "transparent",
              color: "#f1f5f9",
              border: "1px solid rgba(255,255,255,0.15)",
            }),
          }}
          className="pricing-cta-btn"
        >
          {meta.cta[lang] ?? meta.cta.ru}
        </Link>
      </div>
    </motion.div>
  );
}

/* ─── Main component ────────────────────────────────────────────────── */
export function PricingSection() {
  const { lang } = useApp();
  const c = COPY[lang] ?? COPY.ru;
  const [open, setOpen] = useState<number | null>(null);
  const [apiPlans, setApiPlans] = useState<ApiPlan[] | null>(null);
  const [pricingReady, setPricingReady] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const locale = lang === "en" ? "en" : lang === "uz" ? "uz" : "ru";

    fetch(`${PORTAL_API}?locale=${locale}`)
      .then(r => r.ok ? r.json() : null)
      .then(json => {
        const plans: ApiPlan[] = json?.data ?? [];
        if (plans.length > 0) setApiPlans(plans);
        setPricingReady(true);
      })
      .catch(() => { setPricingReady(true); });
  }, [lang]);

  const activePlans = (apiPlans ?? []).sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      <style>{`
        .pricing-card-inner:hover {
          border-color: rgba(255,255,255,0.14) !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        }
        .pricing-cta-btn:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }
        .pricing-scroll::-webkit-scrollbar { height: 4px; }
        .pricing-scroll::-webkit-scrollbar-track { background: transparent; }
        .pricing-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
        @media (prefers-reduced-motion: reduce) {
          .pricing-card-inner { transition: none !important; }
          .pricing-cta-btn { transition: none !important; }
        }
      `}</style>

      <div style={{ minHeight: "100vh" }}>

        {/* ── Hero ──────────────────────────────────────────────────── */}
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

        {/* ── Pricing cards ─────────────────────────────────────────── */}
        <section style={{ padding: "0 0 96px" }}>
          <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem" }}>

            {activePlans.length === 0 && !pricingReady && (
              <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 8, paddingTop: 24, justifyContent: "center" }}>
                {["MICRO", "START", "BUSINESS", "ENTERPRISE+", "PRO"].map((name) => (
                  <div key={name} style={{
                    flexShrink: 0, width: 220, borderRadius: 16, padding: "24px 18px",
                    background: "#0f1117", border: "1px solid rgba(255,255,255,0.06)",
                    display: "flex", flexDirection: "column", gap: 12,
                  }}>
                    <div style={{ height: 14, width: "60%", borderRadius: 6, background: "rgba(255,255,255,0.06)" }} />
                    <div style={{ height: 28, width: "80%", borderRadius: 6, background: "rgba(255,255,255,0.04)" }} />
                    <div style={{ height: 10, width: "50%", borderRadius: 4, background: "rgba(255,255,255,0.04)", marginTop: 8 }} />
                    <div style={{ height: 10, width: "70%", borderRadius: 4, background: "rgba(255,255,255,0.04)" }} />
                    <div style={{ height: 10, width: "55%", borderRadius: 4, background: "rgba(255,255,255,0.04)" }} />
                    <div style={{ height: 36, borderRadius: 10, background: "rgba(255,255,255,0.06)", marginTop: "auto" }} />
                  </div>
                ))}
              </div>
            )}

            {activePlans.length === 0 && pricingReady && (
              <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 8, paddingTop: 24, justifyContent: "center", flexWrap: "wrap" }}>
                {[
                  { name: "MICRO",       sla: "SLA 8h",   code: "micro" },
                  { name: "START",       sla: "SLA 4h",   code: "start" },
                  { name: "BUSINESS",    sla: "SLA 2–4h", code: "business", recommended: true },
                  { name: "ENTERPRISE+", sla: "SLA 2h",   code: "enterprise_plus" },
                  { name: "PRO",         sla: "SLA 1h",   code: "pro" },
                ].map(({ name, sla, code, recommended }) => (
                  <div key={code} style={{
                    flexShrink: 0, width: 220, borderRadius: 16,
                    padding: recommended ? 2 : 0,
                    background: recommended ? "linear-gradient(135deg,#4fd18a,#7ee3ac)" : "transparent",
                  }}>
                    <div style={{
                      borderRadius: recommended ? 14 : 16,
                      background: "#0f1117", border: recommended ? "none" : "1px solid rgba(255,255,255,0.08)",
                      padding: "24px 18px 20px", display: "flex", flexDirection: "column", gap: 8,
                    }}>
                      <div style={{ fontFamily: "var(--font-mono,monospace)", fontSize: 10, letterSpacing: "0.1em", color: "#4fd18a", fontWeight: 600 }}>{sla}</div>
                      <div style={{ fontSize: 18, fontWeight: 800, fontFamily: "var(--font-manrope),sans-serif", color: "#eef2ee" }}>{name}</div>
                      <p style={{ fontSize: 13, color: "#748078", lineHeight: 1.5, marginTop: 4 }}>
                        {lang === "ru" ? "Цена по запросу" : lang === "uz" ? "Narx so'rov bo'yicha" : lang === "zh" ? "价格面议" : "Pricing on request"}
                      </p>
                      <Link href={`/contact?plan=${code}`} style={{
                        marginTop: 12, display: "block", textAlign: "center", padding: "10px 16px",
                        borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: "none",
                        background: recommended ? "linear-gradient(135deg,#4fd18a,#7ee3ac)" : "transparent",
                        color: recommended ? "#05080a" : "#eef2ee",
                        border: recommended ? "none" : "1px solid rgba(255,255,255,0.15)",
                      }}>
                        {c.contactSales}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Responsive grid */}
            <div
              className="pricing-plans-grid"
              style={{ paddingTop: 24 }}
            >
              {activePlans.map((plan, i) => {
                const meta = PLAN_META[plan.code] ?? PLAN_META.micro;
                return (
                  <PricingCard key={plan.code} plan={plan} meta={meta} c={c} lang={lang} index={i} />
                );
              })}
            </div>

            {/* Custom plan strip */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{
                marginTop: 32, borderRadius: 16, padding: "28px 32px",
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

        {/* ── Benefits ──────────────────────────────────────────────── */}
        <section style={{ padding: "64px 0", borderTop: "1px solid transparent", borderImage: "linear-gradient(to right, transparent, rgba(148,163,184,0.15), transparent) 1" }}>
          <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
            <h2 style={{ fontFamily: "Nacelle, sans-serif", fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", fontWeight: 600, letterSpacing: "-0.04em", marginBottom: 32, color: "var(--ark-text-heading)" }}>
              {c.benefitsTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {c.benefits.map(({ title, desc }, i) => {
                const Icon = BENEFIT_ICONS[i];
                return (
                  <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                    style={{ padding: "24px 20px", borderRadius: 12, background: "var(--ark-card)", border: "1px solid var(--ark-border)" }}>
                    <div style={{ marginBottom: 12 }}><Icon size={20} strokeWidth={1.5} style={{ color: "var(--ark-text-muted)" }} /></div>
                    <div style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: 14, color: "var(--ark-text)", marginBottom: 6, letterSpacing: "-0.01em" }}>{title}</div>
                    <p style={{ fontSize: 13, color: "var(--ark-text-muted)", lineHeight: 1.6, margin: 0 }}>{desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <section style={{ padding: "64px 0 96px", borderTop: "1px solid transparent", borderImage: "linear-gradient(to right, transparent, rgba(148,163,184,0.15), transparent) 1" }}>
          <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "0 1.5rem" }}>
            <h2 style={{ fontFamily: "Nacelle, sans-serif", fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 600, letterSpacing: "-0.04em", textAlign: "center", marginBottom: 48 }}>
              <span className="heading-gradient">{c.faqTitle}</span>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 1, marginBottom: 40 }}>
              {c.faqs.map((faq, i) => {
                const isOpen = open === i;
                const last = i === c.faqs.length - 1;
                return (
                  <div key={i} style={{ padding: "20px 24px", borderRadius: i === 0 ? "12px 12px 0 0" : last ? "0 0 12px 12px" : 0, background: "var(--ark-card)", border: "1px solid var(--ark-border)", borderBottom: last ? "1px solid var(--ark-border)" : "none", cursor: "pointer" }}
                    onClick={() => setOpen(isOpen ? null : i)} role="button" aria-expanded={isOpen} tabIndex={0}
                    onKeyDown={e => (e.key === "Enter" || e.key === " ") && setOpen(isOpen ? null : i)}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontFamily: "Nacelle, sans-serif", fontSize: 15, fontWeight: 600, color: "var(--ark-text)", marginBottom: isOpen ? 8 : 0 }}>{faq.q}</p>
                        {isOpen && <p style={{ fontSize: 14, color: "var(--ark-text-muted)", lineHeight: 1.65, margin: 0 }}>{faq.a}</p>}
                      </div>
                      <ChevronDown size={16} style={{ color: "var(--ark-text-muted)", flexShrink: 0, marginTop: 2, transition: "transform 220ms cubic-bezier(0.4,0,0.2,1)", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ padding: "28px 32px", borderRadius: 12, background: "var(--ark-bg-2)", border: "1px solid var(--ark-border)" }}>
              <div style={{ fontFamily: "Nacelle, sans-serif", fontSize: 15, fontWeight: 600, color: "var(--ark-text)", marginBottom: 16, letterSpacing: "-0.01em" }}>{c.conditionsTitle}</div>
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
    </>
  );
}
