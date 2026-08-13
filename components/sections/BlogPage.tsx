"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { useApp } from "@/components/providers/ThemeLanguageProvider";

const EASE = [0.16, 1, 0.3, 1] as const;

const CATEGORY_KEYS = ["IT-outsourcing", "Cybersecurity", "Microsoft 365", "Infrastructure", "Cost Optimisation", "IT-support", "Service Desk"] as const;
type CategoryKey = typeof CATEGORY_KEYS[number];

const CATEGORY_LABELS: Record<string, Record<CategoryKey, string>> = {
  ru: { "IT-outsourcing": "IT-аутсорсинг", "Cybersecurity": "Кибербезопасность", "Microsoft 365": "Microsoft 365", "Infrastructure": "Инфраструктура", "Cost Optimisation": "Оптимизация затрат", "IT-support": "IT-поддержка", "Service Desk": "Service Desk" },
  en: { "IT-outsourcing": "IT Outsourcing", "Cybersecurity": "Cybersecurity", "Microsoft 365": "Microsoft 365", "Infrastructure": "Infrastructure", "Cost Optimisation": "Cost Optimisation", "IT-support": "IT Support", "Service Desk": "Service Desk" },
  uz: { "IT-outsourcing": "IT-autsorsing", "Cybersecurity": "Kiberxavfsizlik", "Microsoft 365": "Microsoft 365", "Infrastructure": "Infratuzilma", "Cost Optimisation": "Xarajatlarni optimallashtirish", "IT-support": "IT-qo'llab-quvvatlash", "Service Desk": "Service Desk" },
  zh: { "IT-outsourcing": "IT外包", "Cybersecurity": "网络安全", "Microsoft 365": "Microsoft 365", "Infrastructure": "基础设施", "Cost Optimisation": "成本优化", "IT-support": "IT技术支持", "Service Desk": "服务台" },
};

const UI: Record<string, { badge: string; h1a: string; h1b: string; all: string; featured: string; read: string }> = {
  ru: { badge: "Блог", h1a: "IT для бизнеса —", h1b: "понятно и по делу", all: "Все", featured: "Главная статья", read: "Читать" },
  en: { badge: "Blog", h1a: "IT for business —", h1b: "clear and practical", all: "All", featured: "Featured", read: "Read" },
  uz: { badge: "Blog", h1a: "Biznes uchun IT —", h1b: "tushunarli va amaliy", all: "Barchasi", featured: "Asosiy maqola", read: "O'qish" },
  zh: { badge: "博客", h1a: "企业IT——", h1b: "清晰实用", all: "全部", featured: "精选文章", read: "阅读" },
};

type I18nStr = { ru: string; en: string; uz: string; zh: string };

const POSTS: { categoryKey: CategoryKey; title: I18nStr; excerpt: I18nStr; date: I18nStr; readTime: I18nStr; slug: string; featured: boolean }[] = [
  {
    categoryKey: "IT-outsourcing",
    title: {
      ru: "IT-аутсорсинг vs штатный IT-отдел: что выгоднее для бизнеса в 2026 году",
      en: "IT outsourcing vs in-house IT: what makes more sense for business in 2026",
      uz: "IT-autsorsing va shtat IT bo'limi: 2026 yilda biznes uchun qaysi biri foydali",
      zh: "IT外包与自建IT部门：2026年哪种方式对企业更划算",
    },
    excerpt: {
      ru: "Разбираем реальные расходы: зарплаты, налоги, оборудование, обучение. Когда аутсорсинг выгоднее и для кого.",
      en: "A breakdown of the real costs: salaries, taxes, equipment, training. When outsourcing wins and for whom.",
      uz: "Haqiqiy xarajatlarni tahlil qilamiz: maosh, soliqlar, uskunalar, o'qitish. Autsorsing qachon va kim uchun foydali.",
      zh: "拆解真实成本：薪资、税费、设备、培训。外包什么时候更划算？适合哪类企业？",
    },
    date: { ru: "15 июня 2026", en: "Jun 15, 2026", uz: "15 iyun 2026", zh: "2026年6月15日" },
    readTime: { ru: "8 мин", en: "8 min", uz: "8 daq", zh: "8分钟" },
    slug: "it-outsourcing-vs-staff",
    featured: true,
  },
  {
    categoryKey: "Cybersecurity",
    title: {
      ru: "5 главных угроз кибербезопасности для малого бизнеса в 2026 году",
      en: "5 biggest cybersecurity threats for small business in 2026",
      uz: "2026 yilda kichik biznes uchun 5 ta asosiy kiberxavfsizlik tahdidi",
      zh: "2026年中小企业面临的5大网络安全威胁",
    },
    excerpt: {
      ru: "Фишинг, программы-вымогатели, атаки на Supply Chain — как защитить бизнес без большого бюджета.",
      en: "Phishing, ransomware, supply chain attacks — how to protect your business without a big budget.",
      uz: "Fishing, to'lov dasturlari, ta'minot zanjiriga hujumlar — katta byudjetsiz biznesni qanday himoya qilish.",
      zh: "网络钓鱼、勒索软件、供应链攻击——如何在预算有限的情况下保护您的企业。",
    },
    date: { ru: "8 июня 2026", en: "Jun 8, 2026", uz: "8 iyun 2026", zh: "2026年6月8日" },
    readTime: { ru: "6 мин", en: "6 min", uz: "6 daq", zh: "6分钟" },
    slug: "cybersecurity-threats-2026",
    featured: false,
  },
  {
    categoryKey: "Microsoft 365",
    title: {
      ru: "Как перейти на Microsoft 365 без потери данных и простоя",
      en: "How to migrate to Microsoft 365 without data loss or downtime",
      uz: "Ma'lumot yo'qotmasdan va to'xtamasdan Microsoft 365 ga qanday o'tish",
      zh: "如何在零数据丢失、零停机的情况下迁移至Microsoft 365",
    },
    excerpt: {
      ru: "Пошаговый план миграции: подготовка, перенос данных, настройка, обучение сотрудников.",
      en: "A step-by-step migration plan: preparation, data transfer, configuration, employee training.",
      uz: "Bosqichma-bosqich ko'chirish rejasi: tayyorgarlik, ma'lumotlarni ko'chirish, sozlash, xodimlarni o'qitish.",
      zh: "分步迁移计划：准备工作、数据迁移、系统配置与员工培训。",
    },
    date: { ru: "1 июня 2026", en: "Jun 1, 2026", uz: "1 iyun 2026", zh: "2026年6月1日" },
    readTime: { ru: "10 мин", en: "10 min", uz: "10 daq", zh: "10分钟" },
    slug: "m365-migration-guide",
    featured: false,
  },
  {
    categoryKey: "Infrastructure",
    title: {
      ru: "Когда пора менять серверное оборудование: признаки и план действий",
      en: "When it's time to replace server hardware: signs and action plan",
      uz: "Server uskunalarini qachon almashtirish kerak: belgilar va harakat rejasi",
      zh: "何时该更换服务器硬件：信号识别与行动计划",
    },
    excerpt: {
      ru: "Возраст оборудования, производительность, стоимость обслуживания — как принять правильное решение.",
      en: "Equipment age, performance, maintenance cost — how to make the right decision.",
      uz: "Uskunalar yoshi, unumdorlik, xizmat ko'rsatish narxi — to'g'ri qaror qanday qabul qilinadi.",
      zh: "设备寿命、性能指标、维护成本——如何做出正确的更换决策。",
    },
    date: { ru: "24 мая 2026", en: "May 24, 2026", uz: "24 may 2026", zh: "2026年5月24日" },
    readTime: { ru: "7 мин", en: "7 min", uz: "7 daq", zh: "7分钟" },
    slug: "when-to-replace-servers",
    featured: false,
  },
  {
    categoryKey: "Cost Optimisation",
    title: {
      ru: "Как сократить IT-расходы на 30–40% без потери качества",
      en: "How to cut IT costs by 30–40% without losing quality",
      uz: "Sifatni yo'qotmasdan IT xarajatlarini 30–40% ga qisqartirish",
      zh: "如何在不降低质量的前提下削减30–40%的IT开支",
    },
    excerpt: {
      ru: "Аудит лицензий, оптимизация облака, пересмотр контрактов — практические советы.",
      en: "Licence audits, cloud optimisation, contract renegotiation — practical advice.",
      uz: "Litsenziya auditi, bulutni optimallashtirish, shartnomalarni qayta ko'rish — amaliy maslahatlar.",
      zh: "许可证审计、云资源优化、合同重新谈判——实操建议。",
    },
    date: { ru: "17 мая 2026", en: "May 17, 2026", uz: "17 may 2026", zh: "2026年5月17日" },
    readTime: { ru: "9 мин", en: "9 min", uz: "9 daq", zh: "9分钟" },
    slug: "cut-it-costs",
    featured: false,
  },
  {
    categoryKey: "IT-outsourcing",
    title: {
      ru: "SLA в IT-аутсорсинге: что должно быть в договоре и как проверить выполнение",
      en: "SLA in IT outsourcing: what must be in the contract and how to verify compliance",
      uz: "IT-autsorsing SLA si: shartnomada nima bo'lishi kerak va bajarilishini qanday tekshirish",
      zh: "IT外包中的SLA：合同必须包含的内容及如何核验履约情况",
    },
    excerpt: {
      ru: "Время реакции, время решения, штрафные санкции, прозрачность — чек-лист для бизнеса.",
      en: "Response time, resolution time, penalty clauses, transparency — a business checklist.",
      uz: "Javob vaqti, hal qilish vaqti, jarima shartlari, shaffoflik — biznes uchun chek-list.",
      zh: "响应时间、解决时间、违约条款、透明度——企业实用检查清单。",
    },
    date: { ru: "10 мая 2026", en: "May 10, 2026", uz: "10 may 2026", zh: "2026年5月10日" },
    readTime: { ru: "5 мин", en: "5 min", uz: "5 daq", zh: "5分钟" },
    slug: "sla-guide",
    featured: false,
  },
  {
    categoryKey: "IT-support",
    title: {
      ru: "IT-техподдержка для бизнеса в Ташкенте: как выбрать и на что смотреть",
      en: "IT support for business in Tashkent: how to choose and what to look for",
      uz: "Toshkentda biznes uchun IT-qo'llab-quvvatlash: qanday tanlash va nimaga e'tibor berish",
      zh: "塔什干企业IT技术支持：如何选择及注意事项",
    },
    excerpt: {
      ru: "Что включает профессиональная IT-техподдержка, какие вопросы задать потенциальному провайдеру и как не переплатить за пустые обещания.",
      en: "What professional IT support includes, what to ask a potential provider, and how to avoid overpaying for empty promises.",
      uz: "Professional IT-qo'llab-quvvatlash nimani o'z ichiga oladi, potentsial provaydérga qanday savollar berish va bo'sh va'dalar uchun ortiqcha to'lamaslik.",
      zh: "专业IT技术支持包含哪些内容、向候选服务商应问哪些问题，以及如何避免为空洞承诺多付费。",
    },
    date: { ru: "28 июня 2026", en: "Jun 28, 2026", uz: "28 iyun 2026", zh: "2026年6月28日" },
    readTime: { ru: "7 мин", en: "7 min", uz: "7 daq", zh: "7分钟" },
    slug: "tehpodderzhka-tashkent",
    featured: false,
  },
  {
    categoryKey: "Service Desk",
    title: {
      ru: "Service Desk для бизнеса: что это такое и почему это не просто «техподдержка»",
      en: "Service Desk for business: what it is and why it's more than just tech support",
      uz: "Biznes uchun Service Desk: bu nima va nima uchun bu shunchaki texnik yordam emas",
      zh: "企业服务台：是什么，为什么不只是"技术支持"",
    },
    excerpt: {
      ru: "Service Desk — это не просто номер телефона. Разбираем, как устроен профессиональный Service Desk и что он даёт бизнесу в Узбекистане.",
      en: "Service Desk is not just a phone number. We break down how a professional Service Desk works and what it delivers for businesses in Uzbekistan.",
      uz: "Service Desk — bu shunchaki telefon raqami emas. Professional Service Desk qanday ishlashini va O'zbekistondagi biznesga nima berishini tahlil qilamiz.",
      zh: "服务台不只是一个电话号码。我们深入拆解专业服务台的运作机制及其为乌兹别克斯坦企业带来的价值。",
    },
    date: { ru: "28 июня 2026", en: "Jun 28, 2026", uz: "28 iyun 2026", zh: "2026年6月28日" },
    readTime: { ru: "6 мин", en: "6 min", uz: "6 daq", zh: "6分钟" },
    slug: "service-desk-dlya-biznesa",
    featured: false,
  },
  {
    categoryKey: "Cybersecurity",
    title: {
      ru: "Защита данных компании в Узбекистане: минимум, который должен быть у каждого бизнеса",
      en: "Company data protection in Uzbekistan: the baseline every business must have",
      uz: "O'zbekistonda kompaniya ma'lumotlarini himoya qilish: har bir biznesda bo'lishi kerak bo'lgan minimum",
      zh: "乌兹别克斯坦企业数据保护：每家企业必须具备的基础安全底线",
    },
    excerpt: {
      ru: "Практический чеклист: резервные копии, разграничение доступа, защита от вирусов и фишинга. Без технического жаргона — для руководителей бизнеса.",
      en: "A practical checklist: backups, access control, protection from viruses and phishing. No technical jargon — written for business leaders.",
      uz: "Amaliy chek-list: zaxira nusxalar, kirish nazorati, virus va fishingdan himoya. Texnik jargonosiz — biznes rahbarlari uchun.",
      zh: "实用检查清单：数据备份、访问管控、病毒与钓鱼防护。无技术术语——专为企业管理者撰写。",
    },
    date: { ru: "28 июня 2026", en: "Jun 28, 2026", uz: "28 iyun 2026", zh: "2026年6月28日" },
    readTime: { ru: "8 мин", en: "8 min", uz: "8 daq", zh: "8分钟" },
    slug: "zashchita-dannyh-kompanii",
    featured: false,
  },
];

export function BlogPage() {
  const { lang } = useApp();
  const ui = UI[lang] ?? UI.ru;
  const allLabel = ui.all;
  const catLabels = CATEGORY_LABELS[lang] ?? CATEGORY_LABELS.ru;
  const [categoryKey, setCategoryKey] = useState<CategoryKey | "all">("all");

  const filtered = categoryKey === "all" ? POSTS : POSTS.filter(p => p.categoryKey === categoryKey);
  const featured = filtered.find(p => p.featured);
  const rest = filtered.filter(p => !p.featured);

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ padding: "96px 0 64px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.1), transparent)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem", position: "relative" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: EASE }}>
            <div className="ark-badge" style={{ marginBottom: 24 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ark-accent-2)" }}>{ui.badge}</span>
            </div>
            <h1 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 20 }}>
              <span className="heading-gradient">{ui.h1a}</span>
              <br />
              <span style={{ color: "var(--ark-text)" }}>{ui.h1b}</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "0 0 96px" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
          {/* Categories */}
          <div style={{ display: "flex", gap: 6, marginBottom: 48, flexWrap: "wrap" }}>
            {([["all", allLabel], ...CATEGORY_KEYS.map(k => [k, catLabels[k]])] as [string, string][]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setCategoryKey(key as CategoryKey | "all")}
                style={{
                  padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600,
                  cursor: "pointer", transition: "all 0.2s", border: "1px solid",
                  borderColor: categoryKey === key ? "var(--ark-accent)" : "var(--ark-border)",
                  background: categoryKey === key ? "var(--ark-accent)" : "var(--ark-bg)",
                  color: categoryKey === key ? "#fff" : "var(--ark-text-muted)",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Featured post */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ marginBottom: 32 }}
            >
              <Link href={`/blog/${featured.slug}`} style={{ textDecoration: "none", display: "block" }}>
                <div className="p-6 sm:p-10" style={{
                  borderRadius: 16,
                  background: "linear-gradient(to bottom right, rgba(99,102,241,0.12), rgba(79,70,229,0.05))",
                  border: "1px solid rgba(99,102,241,0.25)",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.5)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.25)")}
                >
                  <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", padding: "3px 10px", borderRadius: 6, background: "var(--ark-accent-glow)", color: "var(--ark-accent-2)" }}>
                      {catLabels[featured.categoryKey]}
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", padding: "3px 10px", borderRadius: 6, background: "var(--ark-surface)", color: "var(--ark-text-muted)" }}>
                      {ui.featured}
                    </span>
                  </div>
                  <h2 style={{ fontFamily: "Nacelle, sans-serif", fontSize: "clamp(1.375rem, 3vw, 1.875rem)", fontWeight: 600, color: "var(--ark-text)", lineHeight: 1.25, marginBottom: 16 }}>
                    {featured.title[lang] ?? featured.title.ru}
                  </h2>
                  <p style={{ fontSize: 15, color: "var(--ark-text-muted)", lineHeight: 1.65, marginBottom: 24, maxWidth: 560 }}>
                    {featured.excerpt[lang] ?? featured.excerpt.ru}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ fontSize: 12, color: "var(--ark-text-muted)" }}>{featured.date[lang] ?? featured.date.ru}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--ark-text-muted)" }}>
                      <Clock size={12} />
                      {featured.readTime[lang] ?? featured.readTime.ru}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, color: "var(--ark-accent-2)" }}>
                      {ui.read} <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
              >
                <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                  <div style={{
                    borderRadius: 14, padding: "24px", height: "100%",
                    background: "var(--ark-card)", border: "1px solid var(--ark-card-border)",
                    display: "flex", flexDirection: "column", gap: 12,
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--ark-accent)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--ark-card-border)")}
                  >
                    <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", padding: "2px 8px", borderRadius: 4, background: "var(--ark-accent-glow)", color: "var(--ark-accent-2)", width: "fit-content" }}>
                      {catLabels[post.categoryKey]}
                    </span>
                    <h3 style={{ fontFamily: "Nacelle, sans-serif", fontSize: 15.5, fontWeight: 600, color: "var(--ark-text)", lineHeight: 1.35, flex: 1 }}>
                      {post.title[lang] ?? post.title.ru}
                    </h3>
                    <p style={{ fontSize: 13.5, color: "var(--ark-text-muted)", lineHeight: 1.6 }}>
                      {post.excerpt[lang] ?? post.excerpt.ru}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
                      <span style={{ fontSize: 11.5, color: "var(--ark-text-muted)" }}>{post.date[lang] ?? post.date.ru}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11.5, color: "var(--ark-text-muted)" }}>
                        <Clock size={11} />
                        {post.readTime[lang] ?? post.readTime.ru}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
