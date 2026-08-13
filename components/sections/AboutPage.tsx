"use client";

import Link from "next/link";
import { ArrowRight, Target, Eye, Heart } from "lucide-react";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { useApp } from "@/components/providers/ThemeLanguageProvider";

const COPY: Record<string, {
  heroBadge: string; h1a: string; h1b: string; sub: string;
  storyBadge: string; storyH2: string;
  storyP1: string; storyP2: string; storyP3: string;
  platformBadge: string; platformH3: string; platformDesc: string; platformLink: string;
  quote: string; quoteAuthor: string;
  valuesBadge: string; valuesH2: string;
  values: { title: string; body: string }[];
  teamBadge: string; teamH2: string; teamSub: string;
  ctaH3: string; ctaSub: string; ctaBtn: string;
}> = {
  ru: {
    heroBadge: "О компании",
    h1a: "Технологический партнёр.",
    h1b: "Не просто подрядчик.",
    sub: "ARKANA — технологический партнёр для бизнеса в Ташкенте. Мы помогаем компаниям по всему Узбекистану построить предсказуемый IT-сервис с чёткой ответственностью и прозрачностью через GoARKAN.",
    storyBadge: "Наша история",
    storyH2: "Создана, чтобы исправить IT-аутсорсинг.",
    storyP1: "ARKANA основана на простом наблюдении: большинство IT-аутсорсинга в Узбекистане либо слишком дёшев, чтобы быть надёжным, либо слишком дорог и безлик, чтобы быть полезным для растущего бизнеса.",
    storyP2: "Мы построили ARKANA, чтобы занять это пространство — принести корпоративные процессы и именную модель команды компаниям, которым не нужен полноценный IT-отдел, но нужно больше, чем ситуативный ремонт.",
    storyP3: "Мы также создали GoARKAN — собственную платформу управления сервисами — потому что считаем: клиенты заслуживают настоящей прозрачности в работе, выполняемой от их имени.",
    platformBadge: "Наша платформа",
    platformH3: "GoARKAN",
    platformDesc: "Мы создали собственную платформу управления сервисами, чтобы клиенты имели полный контроль над каждой заявкой, активом и действием. Используется нашей командой инженеров ежедневно.",
    platformLink: "Перейти на GoARKAN →",
    quote: "«Мы не просто очередная IT-компания. Мы — IT-отдел, которого ваш бизнес заслуживает, но которого у него никогда не было.»",
    quoteAuthor: "— Команда ARKANA",
    valuesBadge: "Наши ценности",
    valuesH2: "То, что определяет каждое наше решение.",
    values: [
      { title: "Ответственность", body: "За каждым клиентом закреплён именной технический руководитель. Когда что-то идёт не так — вы всегда знаете, кто отвечает. И он знает вас по имени." },
      { title: "Прозрачность", body: "Мы создали GoARKAN именно потому, что клиенты должны иметь полный доступ к информации о своём IT. Никаких чёрных ящиков. Не нужно спрашивать об обновлениях." },
      { title: "Партнёрство", body: "Мы не подрядчик. Мы — продолжение вашей команды, ориентированное на цели вашего бизнеса, а не только на закрытие заявок." },
    ],
    teamBadge: "Наша команда",
    teamH2: "Люди, стоящие за вашим IT.",
    teamSub: "Команда сертифицированных инженеров, менеджеров проектов и технических руководителей, обеспечивающих стабильный и ответственный IT-сервис.",
    ctaH3: "Готовы начать работу с ARKANA?",
    ctaSub: "Расскажите о вашем бизнесе — подготовим предложение за один рабочий день.",
    ctaBtn: "Получить коммерческое предложение",
  },
  en: {
    heroBadge: "About us",
    h1a: "Technology partner.",
    h1b: "Not just a contractor.",
    sub: "ARKANA is a technology partner for businesses in Tashkent. We help companies across Uzbekistan run predictable, accountable IT — with full visibility through GoARKAN.",
    storyBadge: "Our story",
    storyH2: "Built to fix what's broken in IT outsourcing.",
    storyP1: "ARKANA was founded on a simple observation: most IT outsourcing in Uzbekistan is either too cheap to be reliable, or too expensive and impersonal to be worth it for a growing business.",
    storyP2: "We built ARKANA to fill that gap — bringing enterprise-grade processes and a dedicated account team model to companies that don't need a full IT department, but need far more than break-fix support.",
    storyP3: "We also built GoARKAN — our own service management platform — because we believe clients deserve genuine transparency into the work being done on their behalf.",
    platformBadge: "Our platform",
    platformH3: "GoARKAN",
    platformDesc: "We built our own ITSM platform so every client has full visibility into their tickets, assets, and SLA metrics. Our engineering team runs on it every day.",
    platformLink: "Explore GoARKAN →",
    quote: "\"We're not just another IT company. We're the IT department your business deserves — and never had.\"",
    quoteAuthor: "— The ARKANA team",
    valuesBadge: "Our values",
    valuesH2: "The principles behind every decision we make.",
    values: [
      { title: "Accountability", body: "Every client has a named technical lead. When something goes wrong, you know exactly who owns it — and they know your environment by heart." },
      { title: "Transparency", body: "We built GoARKAN because clients deserve full access to what's happening in their IT. No black boxes. No waiting for updates that never come." },
      { title: "Partnership", body: "We're not a vendor. We're an extension of your team, focused on business outcomes — not just clearing the ticket queue." },
    ],
    teamBadge: "Our team",
    teamH2: "The people behind your IT.",
    teamSub: "Certified engineers, delivery managers, and technical leads — all focused on one thing: making your IT work the way your business needs it to.",
    ctaH3: "Ready to work with ARKANA?",
    ctaSub: "Tell us about your business — we'll put together a proposal within one business day.",
    ctaBtn: "Request a proposal",
  },
  uz: {
    heroBadge: "Kompaniya haqida",
    h1a: "Texnologik hamkor.",
    h1b: "Shunchaki pudratchi emas.",
    sub: "ARKANA — Toshkentdagi biznes uchun texnologik hamkor. Biz O'zbekiston bo'ylab kompaniyalarga GoARKAN orqali bashoratli va shaffof IT xizmatini yo'lga qo'yishda yordam beramiz.",
    storyBadge: "Bizning tarix",
    storyH2: "IT-autsorsing muammosini hal qilish uchun yaratildi.",
    storyP1: "ARKANA oddiy bir kuzatuvdan tug'ildi: O'zbekistondagi ko'pchilik IT-autsorsing yoki ishonchli bo'lish uchun juda arzon, yoki o'sayotgan biznes uchun samarali bo'lish uchun juda qimmat va shaxssiz.",
    storyP2: "Biz ARKANA ni aynan shu bo'shliqni to'ldirish uchun yaratdik — to'liq IT bo'limiga muhtoj bo'lmagan, ammo oddiy nosozliklarni tuzatishdan ko'proq narsaga muhtoj kompaniyalarga korporativ darajadagi jarayonlar va shaxsiy jamoa modelini olib keldik.",
    storyP3: "Biz shuningdek GoARKAN — o'z xizmat boshqaruvi platformamizni ham yaratdik. Chunki mijozlar ular nomidan bajariladigan har bir ish haqida haqiqiy shaffoflikka loyiq, deb ishonimiz komil.",
    platformBadge: "Bizning platforma",
    platformH3: "GoARKAN",
    platformDesc: "Biz o'z ITSM platformamizni yaratdik — shunda har bir mijoz o'z arizalari, aktivlari va SLA ko'rsatkichlarini to'liq nazorat qilsin. Muhandislar jamoamiz uni har kuni ishlatadi.",
    platformLink: "GoARKAN ni ko'rish →",
    quote: "«Biz shunchaki yana bir IT kompaniyasi emasmiz. Biz — sizning biznesingizga loyiq, ammo hali bo'lmagan IT bo'limimiz.»",
    quoteAuthor: "— ARKANA jamoasi",
    valuesBadge: "Bizning qadriyatlar",
    valuesH2: "Har bir qarorimiz ortidagi tamoyillar.",
    values: [
      { title: "Mas'uliyat", body: "Har bir mijozga shaxsiy texnik rahbar tayinlanadi. Biror narsa noto'g'ri ketsa — siz kim javobgar ekanini doim bilasiz. Va u sizning infratuzilmangizni yaxshi biladi." },
      { title: "Shaffoflik", body: "Biz GoARKAN ni aynan shu sababdan yaratdik: mijozlar o'z IT holatini har doim to'liq ko'rishga haqli. Yashirin jarayonlar yo'q. Holat so'rash zarurati yo'q." },
      { title: "Hamkorlik", body: "Biz pudratchi emasmiz. Biz sizning jamoangizning bir qismi — faqat arizalarni yopishga emas, biznesingizning maqsadlariga yo'naltirilgan." },
    ],
    teamBadge: "Bizning jamoa",
    teamH2: "IT sizning qo'lingizda.",
    teamSub: "Sertifikatlangan muhandislar, loyiha menejerlari va texnik rahbarlar — hammasi bitta maqsad uchun: IT'ingiz biznesingiz kabi ishlashi uchun.",
    ctaH3: "ARKANA bilan ishlay boshlashga tayyormisiz?",
    ctaSub: "Biznesingiz haqida aytib bering — bir ish kuni ichida taklif tayyorlaymiz.",
    ctaBtn: "Taklif so'rash",
  },
  zh: {
    heroBadge: "关于我们",
    h1a: "技术合作伙伴。",
    h1b: "不只是服务商。",
    sub: "ARKANA是塔什干企业的技术合作伙伴。我们帮助乌兹别克斯坦各地的企业通过GoARKAN建立可预期、可追责的IT服务体系，实现全程透明。",
    storyBadge: "我们的故事",
    storyH2: "为解决IT外包的痛点而生。",
    storyP1: "ARKANA源于一个简单的观察：乌兹别克斯坦的大多数IT外包要么价格太低、可靠性存疑，要么费用高昂且缺乏个性化，对成长型企业而言性价比不高。",
    storyP2: "我们创建ARKANA正是为了填补这一空白——将企业级流程与专属账户团队模式带给那些不需要完整IT部门、但又不甘于仅仅应急维修的公司。",
    storyP3: "我们还自主研发了GoARKAN服务管理平台，因为我们相信：客户有权对代表其执行的每一项工作拥有真正的透明度。",
    platformBadge: "我们的平台",
    platformH3: "GoARKAN",
    platformDesc: "我们自主研发了ITSM平台，让每位客户都能全面了解自己的工单、资产与SLA指标。我们的工程师团队每天在上面工作。",
    platformLink: "探索GoARKAN →",
    quote: "「我们不只是另一家IT公司，我们是您的企业理应拥有、却从未拥有过的IT部门。」",
    quoteAuthor: "— ARKANA团队",
    valuesBadge: "我们的价值观",
    valuesH2: "每一个决策背后的原则。",
    values: [
      { title: "责任担当", body: "每位客户都有一名具名技术负责人。当出现问题时，您始终知道谁来负责——而他也熟知您的IT环境。" },
      { title: "透明公开", body: "我们建立GoARKAN，正是因为客户有权随时全面了解自己的IT状况。没有黑箱，无需等待迟迟不来的进展通知。" },
      { title: "真诚合作", body: "我们不是供应商，而是您团队的延伸——聚焦于业务成果，而不仅仅是清空工单队列。" },
    ],
    teamBadge: "我们的团队",
    teamH2: "支撑您IT运营的人。",
    teamSub: "认证工程师、交付经理与技术负责人——所有人专注于一件事：让您的IT按业务需求高效运转。",
    ctaH3: "准备好与ARKANA合作了吗？",
    ctaSub: "告诉我们您的业务情况——我们将在一个工作日内准备好方案。",
    ctaBtn: "申请商务方案",
  },
};

const VALUE_ICONS = [Target, Eye, Heart];
const VALUE_ACCENTS = ["#6366f1", "var(--ark-accent-2)", "#818cf8"];

const TEAM = [
  { initials: "A", from: "#6366f1", to: "#818cf8" },
  { initials: "D", from: "#818cf8", to: "#a78bfa" },
  { initials: "S", from: "#22c55e", to: "#0ea5e9" },
];
const TEAM_LABELS: Record<string, { name: string; role: string }[]> = {
  ru: [
    { name: "Технический директор", role: "Основатель и руководитель направления" },
    { name: "Руководитель операций", role: "Управление сервисными процессами" },
    { name: "Ведущий инженер", role: "Инфраструктура и безопасность" },
  ],
  en: [
    { name: "Chief Technology Officer", role: "Founder and technical lead" },
    { name: "Head of Operations", role: "Service process management" },
    { name: "Lead Engineer", role: "Infrastructure and security" },
  ],
  uz: [
    { name: "Texnik direktor", role: "Asoschi va texnik rahbar" },
    { name: "Operatsiyalar boshlig'i", role: "Xizmat jarayonlarini boshqarish" },
    { name: "Bosh muhandis", role: "Infratuzilma va xavfsizlik" },
  ],
  zh: [
    { name: "首席技术官", role: "创始人兼技术负责人" },
    { name: "运营总监", role: "服务流程管理" },
    { name: "首席工程师", role: "基础设施与网络安全" },
  ],
};

export function AboutPage() {
  const { lang } = useApp();
  const c = COPY[lang] ?? COPY.ru;
  const team = TEAM_LABELS[lang] ?? TEAM_LABELS.ru;

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-24" style={{ background: "var(--ark-bg)" }}>
        <div className="max-w-[75rem] mx-auto px-6">
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-hint)", marginBottom: 24 }}>
            {c.heroBadge}
          </div>
          <h1
            className="text-[48px] sm:text-[60px] font-[800] leading-[1.07] tracking-[-0.02em] mt-4 mb-6"
            style={{ color: "var(--ark-text-heading)" }}
          >
            {c.h1a}
            <br />
            <span style={{ color: "var(--ark-text-sub)", fontWeight: 700 }}>
              {c.h1b}
            </span>
          </h1>
          <p className="text-[18px] leading-[1.65] max-w-[580px]" style={{ color: "var(--ark-text-sub)" }}>
            {c.sub}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-28" style={{ background: "var(--ark-bg-2)", borderTop: "1px solid var(--ark-divider)" }}>
        <div className="max-w-[75rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-hint)", marginBottom: 20 }}>
                {c.storyBadge}
              </div>
              <h2 className="text-[34px] font-[800] mt-4 mb-6 leading-[1.15]" style={{ color: "var(--ark-text-heading)" }}>
                {c.storyH2}
              </h2>
              <div className="flex flex-col gap-4 text-[16px] leading-[1.7]" style={{ color: "var(--ark-text-sub)" }}>
                <p>{c.storyP1}</p>
                <p>{c.storyP2}</p>
                <p>{c.storyP3}</p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="rounded-[24px] p-8" style={{ background: "var(--ark-card)", border: "1px solid var(--ark-border)" }}>
                <p style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--ark-text-hint)", marginBottom: 12 }}>
                  {c.platformBadge}
                </p>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: "var(--ark-text-heading)", marginBottom: 12 }}>
                  {c.platformH3}
                </h3>
                <p style={{ fontSize: 14, color: "var(--ark-text-sub)", lineHeight: 1.65, marginBottom: 20 }}>
                  {c.platformDesc}
                </p>
                <a
                  href="https://goarkan.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 700, color: "var(--ark-accent-2)", textDecoration: "none" }}
                >
                  {c.platformLink}
                </a>
              </div>

              <div className="rounded-[20px] p-7" style={{ background: "var(--ark-surface)", border: "1px solid var(--ark-border)" }}>
                <p style={{ fontSize: 14, color: "var(--ark-text-sub)", lineHeight: 1.7, fontStyle: "italic" }}>
                  {c.quote}
                </p>
                <p style={{ fontSize: 12, color: "var(--ark-text-faint)", marginTop: 12, fontWeight: 600 }}>
                  {c.quoteAuthor}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28" style={{ background: "var(--ark-bg)", borderTop: "1px solid var(--ark-divider)" }}>
        <div className="max-w-[75rem] mx-auto px-6">
          <div className="max-w-[500px] mb-14">
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-hint)", marginBottom: 20 }}>
              {c.valuesBadge}
            </div>
            <h2 className="text-[34px] font-[800] mt-4 mb-4 leading-[1.15]" style={{ color: "var(--ark-text-heading)" }}>
              {c.valuesH2}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.values.map(({ title, body }, i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <div key={title} className="rounded-[20px] p-7" style={{ background: "var(--ark-card)", border: "1px solid var(--ark-card-border)" }}>
                  <div className="w-11 h-11 rounded-[12px] flex items-center justify-center mb-5" style={{ background: "var(--ark-accent-glow)", border: "1px solid var(--ark-border)" }}>
                    <Icon size={20} style={{ color: VALUE_ACCENTS[i] }} />
                  </div>
                  <h3 className="text-[17px] font-[700] mb-3" style={{ color: "var(--ark-text-heading)" }}>{title}</h3>
                  <p className="text-[14px] leading-[1.65]" style={{ color: "var(--ark-text-sub)" }}>{body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-28" style={{ background: "var(--ark-bg-2)", borderTop: "1px solid var(--ark-divider)" }}>
        <div className="max-w-[75rem] mx-auto px-6">
          <div className="max-w-[500px] mb-12">
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-hint)", marginBottom: 20 }}>
              {c.teamBadge}
            </div>
            <h2 className="text-[34px] font-[800] mt-4 mb-4 leading-[1.15]" style={{ color: "var(--ark-text-heading)" }}>
              {c.teamH2}
            </h2>
            <p className="text-[16px] leading-[1.65]" style={{ color: "var(--ark-text-sub)" }}>
              {c.teamSub}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {team.map(({ name, role }, i) => (
              <div key={name} className="rounded-[18px] p-6" style={{ background: "var(--ark-card)", border: "1px solid var(--ark-card-border)" }}>
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-[20px] font-[900] text-white mb-4"
                  style={{ background: `linear-gradient(135deg, ${TEAM[i].from}, ${TEAM[i].to})` }}
                >
                  {TEAM[i].initials}
                </div>
                <p className="text-[15px] font-[700]" style={{ color: "var(--ark-text-heading)" }}>{name}</p>
                <p className="text-[13px] mt-1" style={{ color: "var(--ark-text-muted)" }}>{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="py-16" style={{ background: "var(--ark-bg)", borderTop: "1px solid var(--ark-divider)" }}>
        <div className="max-w-[75rem] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[20px] font-[800] mb-1" style={{ color: "var(--ark-text-heading)" }}>
              {c.ctaH3}
            </p>
            <p className="text-[14px]" style={{ color: "var(--ark-text-muted)" }}>
              {c.ctaSub}
            </p>
          </div>
          <Link
            href="/contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "12px 24px", borderRadius: 12,
              background: "var(--ark-accent)", color: "#ffffff",
              fontSize: 13.5, fontWeight: 700, textDecoration: "none", flexShrink: 0,
            }}
          >
            {c.ctaBtn}
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
