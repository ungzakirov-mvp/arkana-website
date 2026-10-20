"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "@/components/ui/LocaleLink";
import { ArrowRight } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { IconHomeScreen, IconDocFlow, IconOrg, IconDesk, IconAssets, IconPocketOffice, IconPaperless, IconUnify, IconGrowth, IconTick } from "@/components/ui/ArkIcons";
import { useApp } from "@/components/providers/ThemeLanguageProvider";

const EASE = [0.16, 1, 0.3, 1] as const;

type Module = { key: string; label: string; desc: string; features: string[] };
type Copy = {
  badge: string; h1sub: string; sub: string; features: string[];
  cta1: string; cta2: string; benefitsTitle: string;
  platformCtaLabel: string; platformCta: string;
  modules: Module[]; benefits: { title: string; desc: string }[];
  soonTitle: string; soon: string[]; noShot: string;
};

const COPY: Record<string, Copy> = {
  ru: {
    badge: "Цифровой офис · собственная разработка ARKANA",
    h1sub: "Вся компания — в одной системе.",
    sub: "Документооборот с электронной подписью, кадры, заявки сотрудников, учёт техники и склад — в браузере и в Telegram. Руководитель видит всю компанию на одном экране, с телефона.",
    features: ["Документы с ЭЦП", "Кадры и оргструктура", "Заявки из Telegram", "Учёт техники и склад"],
    cta1: "Запросить демо",
    cta2: "Тарифы GoARKAN",
    benefitsTitle: "Почему GoARKAN",
    platformCtaLabel: "Покажем GoARKAN на ваших процессах — оставьте заявку на демо.",
    platformCta: "Запросить демо",
    modules: [
      { key: "home", label: "Главный экран", desc: "Экран руководителя: документы на подписи, просроченные поручения, открытые заявки, состояние техники — вся компания за минуту.", features: ["Документы на подписи", "Контроль поручений", "Заявки и просрочки", "Всё с телефона"] },
      { key: "edo", label: "Документооборот", desc: "Входящие, исходящие и служебные письма, канцелярия с регистрацией. Шаблоны и бланки, настраиваемые маршруты согласования, лист согласования, электронная подпись и контроль исполнения поручений.", features: ["Входящие, исходящие, служебные", "Маршруты и лист согласования", "Шаблоны и бланки", "ЭЦП и контроль исполнения"] },
      { key: "hr", label: "Кадры", desc: "Оргструктура компании: департаменты и отделы, личные карточки сотрудников, аттестации. Новый сотрудник сразу получает доступы и технику.", features: ["Департаменты и отделы", "Личные карточки", "Аттестации", "Приём и увольнение"] },
      { key: "sd", label: "Service Desk", desc: "Заявки в IT, АХО и любой отдел — из Telegram-бота или браузера. Каталог услуг, SLA, автоназначение исполнителя, база знаний и оценка качества.", features: ["Заявки из Telegram", "SLA и автоназначение", "База знаний", "Оценка исполнителя"] },
      { key: "assets", label: "Техника и склад", desc: "Какая техника у кого и кто за неё отвечает — с электронной приёмкой сотрудником. Лицензии и их сроки, расходники и склад: приход, выдача, остатки.", features: ["Учёт техники", "Лицензии и сроки", "Электронная приёмка", "Склад и расходники"] },
    ],
    benefits: [
      { title: "Вся компания в телефоне", desc: "Документы, люди, заявки и техника — на одном экране у руководителя, без звонков «что там у нас»." },
      { title: "Без бумаги", desc: "Согласования и подтверждения — электронные, с подписью. От принятой техники или прочитанного приказа уже не откажешься." },
      { title: "Одна система вместо пяти", desc: "Чаты, Excel, почта и бумажные журналы заменяются одним местом, где ничего не теряется." },
      { title: "Начните с одного модуля", desc: "Подключите Service Desk или документооборот, а остальные модули — когда будете готовы." },
    ],
    soonTitle: "В разработке",
    soon: ["Замещение и делегирование", "Лист ознакомления", "Мобильное приложение", "Данные из 1С на главном экране"],
    noShot: "Скриншот модуля скоро появится",
  },
  uz: {
    badge: "Raqamli ofis · ARKANA ishlanmasi",
    h1sub: "Butun kompaniya — bitta tizimda.",
    sub: "Elektron imzoli hujjat aylanishi, kadrlar, xodimlar arizalari, texnika hisobi va ombor — brauzerda va Telegramda. Rahbar butun kompaniyani telefonida bitta ekranda ko'radi.",
    features: ["ERI bilan hujjatlar", "Kadrlar va tuzilma", "Telegram orqali arizalar", "Texnika hisobi va ombor"],
    cta1: "Demo so'rash",
    cta2: "GoARKAN tariflari",
    benefitsTitle: "Nega GoARKAN",
    platformCtaLabel: "GoARKAN ni sizning jarayonlaringizda ko'rsatamiz — demo uchun ariza qoldiring.",
    platformCta: "Demo so'rash",
    modules: [
      { key: "home", label: "Bosh ekran", desc: "Rahbar ekrani: imzoga hujjatlar, muddati o'tgan topshiriqlar, ochiq arizalar, texnika holati — butun kompaniya bir daqiqada.", features: ["Imzoga hujjatlar", "Topshiriqlar nazorati", "Arizalar va kechikishlar", "Hammasi telefonda"] },
      { key: "edo", label: "Hujjat aylanishi", desc: "Kiruvchi, chiquvchi va xizmat xatlari, ro'yxatga olish bilan devonxona. Shablon va blankalar, sozlanadigan kelishuv marshrutlari, kelishuv varaqasi, elektron imzo va topshiriqlar ijrosi nazorati.", features: ["Kiruvchi, chiquvchi, xizmat", "Marshrut va kelishuv varaqasi", "Shablon va blankalar", "ERI va ijro nazorati"] },
      { key: "hr", label: "Kadrlar", desc: "Kompaniya tuzilmasi: departament va bo'limlar, xodimlarning shaxsiy kartochkalari, attestatsiyalar.", features: ["Departament va bo'limlar", "Shaxsiy kartochkalar", "Attestatsiyalar", "Ishga qabul va bo'shatish"] },
      { key: "sd", label: "Service Desk", desc: "IT, xo'jalik va istalgan bo'limga arizalar — Telegram-bot yoki brauzer orqali. Xizmatlar katalogi, SLA, avtomatik tayinlash, bilimlar bazasi va baholash.", features: ["Telegram orqali arizalar", "SLA va avtotayinlash", "Bilimlar bazasi", "Ijrochini baholash"] },
      { key: "assets", label: "Texnika va ombor", desc: "Qaysi texnika kimda va kim javobgar — xodimning elektron qabuli bilan. Litsenziyalar va muddatlari, sarf materiallari va ombor.", features: ["Texnika hisobi", "Litsenziyalar", "Elektron qabul", "Ombor"] },
    ],
    benefits: [
      { title: "Butun kompaniya telefonda", desc: "Hujjatlar, odamlar, arizalar va texnika — rahbarning bitta ekranida." },
      { title: "Qog'ozsiz", desc: "Kelishuv va tasdiqlar — elektron, imzo bilan. Qabul qilingan texnikadan yoki o'qilgan buyruqdan voz kechib bo'lmaydi." },
      { title: "Beshta o'rniga bitta tizim", desc: "Chatlar, Excel, pochta va qog'oz jurnallar o'rniga hech narsa yo'qolmaydigan bitta joy." },
      { title: "Bitta moduldan boshlang", desc: "Service Desk yoki hujjat aylanishini ulang, qolganini tayyor bo'lganingizda." },
    ],
    soonTitle: "Ishlab chiqilmoqda",
    soon: ["O'rinbosarlik va vakolat berish", "Tanishish varaqasi", "Mobil ilova", "Bosh ekranda 1C ma'lumotlari"],
    noShot: "Modul skrinshoti tez orada",
  },
  en: {
    badge: "Digital office · built by ARKANA",
    h1sub: "Your whole company in one system.",
    sub: "Document flow with e-signature, HR, staff requests, asset records and stock — in the browser and on Telegram. Management sees the whole company on one screen, from a phone.",
    features: ["E-signed documents", "HR and org structure", "Requests via Telegram", "Assets and stock"],
    cta1: "Request a demo",
    cta2: "GoARKAN plans",
    benefitsTitle: "Why GoARKAN",
    platformCtaLabel: "We'll show GoARKAN on your own processes — request a demo.",
    platformCta: "Request a demo",
    modules: [
      { key: "home", label: "Home screen", desc: "The management screen: documents to sign, overdue assignments, open requests, asset status — the whole company in a minute.", features: ["Documents to sign", "Assignment control", "Requests and overdue", "All from a phone"] },
      { key: "edo", label: "Document flow", desc: "Incoming, outgoing and internal letters, a registry office with registration. Templates and letterheads, configurable approval routes, approval sheet, e-signature and execution control.", features: ["Incoming, outgoing, internal", "Routes and approval sheet", "Templates and letterheads", "E-signature and control"] },
      { key: "hr", label: "HR", desc: "Company structure: departments and units, employee profiles, performance reviews.", features: ["Departments", "Employee profiles", "Reviews", "Onboarding and offboarding"] },
      { key: "sd", label: "Service Desk", desc: "Requests to IT, facilities or any department — via Telegram bot or browser. Service catalogue, SLA, auto-assignment, knowledge base and ratings.", features: ["Telegram requests", "SLA and auto-assign", "Knowledge base", "Ratings"] },
      { key: "assets", label: "Assets and stock", desc: "Who has which equipment and who is responsible — with electronic acceptance by the employee. Licences and expiry, consumables and stock.", features: ["Asset records", "Licences", "E-acceptance", "Stock"] },
    ],
    benefits: [
      { title: "The company in your phone", desc: "Documents, people, requests and assets — on one management screen." },
      { title: "Paperless", desc: "Approvals and confirmations are electronic and signed — no denying an accepted laptop or a read order." },
      { title: "One system instead of five", desc: "Chats, Excel, email and paper logs replaced by one place where nothing gets lost." },
      { title: "Start with one module", desc: "Connect Service Desk or document flow first, add the rest when you are ready." },
    ],
    soonTitle: "In development",
    soon: ["Delegation and deputies", "Acknowledgement sheet", "Mobile app", "1C data on the home screen"],
    noShot: "Module screenshot coming soon",
  },
};

const MODULE_ICONS: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>[] = [IconHomeScreen, IconDocFlow, IconOrg, IconDesk, IconAssets];
/** Скриншоты модулей: положить файлы в public/portal/ с этими именами (демо-данные, без реальных клиентов). */
const MODULE_IMGS: Record<string, string | null> = {
  home: null,
  edo: null,
  hr: null,
  sd: null,
  assets: null,
};
const MODULE_SLUGS: Record<string, string> = { home: "home", edo: "documents", hr: "hr", sd: "service-desk", assets: "assets" };

const BENEFIT_ICONS = [IconPocketOffice, IconPaperless, IconUnify, IconGrowth];

export function GoArkanPage() {
  const [active, setActive] = useState(0);
  const { lang } = useApp();
  const c = COPY[lang] ?? (lang === "zh" ? COPY.en : COPY.ru);
  const mod = c.modules[active];
  const img = MODULE_IMGS[mod.key];

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ padding: "96px 0 64px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(79,209,138,0.08), transparent)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem", position: "relative" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            style={{ textAlign: "center" }}
          >
            <div className="ark-badge" style={{ justifyContent: "center", marginBottom: 24 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ark-accent-2)" }}>{c.badge}</span>
            </div>
            <h1 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(2.25rem, 5vw, 3.75rem)", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 20 }}>
              <span className="heading-gradient">GoARKAN</span>
              <br />
              <span style={{ color: "var(--ark-text)" }}>{c.h1sub}</span>
            </h1>
            <p style={{ fontSize: 17, color: "var(--ark-text-muted)", lineHeight: 1.65, maxWidth: 580, margin: "0 auto 24px" }}>
              {c.sub}
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}>
              {c.features.map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--ark-text-muted)" }}>
                  <IconTick size={16} style={{ color: "#4fd18a" }} />
                  {item}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/contact"
                className="btn"
                style={{ background: "#4fd18a", color: "#05080a" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#7ee3ac"; el.style.boxShadow = "0 8px 24px rgba(79,209,138,0.35)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#4fd18a"; el.style.boxShadow = "none"; }}
                onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"; }}
                onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
              >
                {c.cta1}
                <ArrowRight size={15} />
              </Link>
              <Link href="/pricing#goarkan" className="btn grad-border" style={{ background: "var(--ark-surface)", color: "var(--ark-text)" }}>
                {c.cta2}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Platform showcase */}
      <section style={{ padding: "0 0 64px" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
          {/* Module tabs */}
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 24, flexWrap: "wrap" }}>
            {c.modules.map(({ label }, i) => {
              const Icon = MODULE_ICONS[i];
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                    cursor: "pointer",
                    border: "1px solid",
                    borderColor: active === i ? "var(--ark-accent)" : "var(--ark-border)",
                    background: active === i ? "var(--ark-accent)" : "var(--ark-bg)",
                    color: active === i ? "#fff" : "var(--ark-text-muted)",
                    transition: "background 180ms cubic-bezier(0.4,0,0.2,1), border-color 180ms cubic-bezier(0.4,0,0.2,1), color 180ms cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  <Icon size={16} />
                  {label}
                </button>
              );
            })}
          </div>

          {/* Browser mockup */}
          <div style={{ borderRadius: 16, background: "var(--ark-card)", border: "1px solid var(--ark-border)", overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.5)" }}>
            {/* Browser bar */}
            <div style={{ padding: "10px 16px", borderBottom: "1px solid var(--ark-border)", display: "flex", alignItems: "center", gap: 10, background: "rgba(0,0,0,0.15)" }}>
              <div style={{ display: "flex", gap: 5 }}>
                {["#3d1f1f", "#3d3018", "#1a3320"].map(col => <span key={col} style={{ width: 10, height: 10, borderRadius: "50%", background: col, display: "block" }} />)}
              </div>
              <div style={{ flex: 1, background: "var(--ark-surface)", border: "1px solid var(--ark-border)", borderRadius: 5, padding: "3px 12px", fontSize: 11, color: "var(--ark-text-muted)", display: "flex", alignItems: "center", gap: 5, maxWidth: 280 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--ark-text-faint)", display: "block" }} />
                goarkan.uz / {MODULE_SLUGS[mod.key]}
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }} style={{ position: "relative", aspectRatio: "16/9" }}>
                {img ? (
                  <Image src={img} alt={`GoARKAN — ${mod.label}`} fill style={{ objectFit: "cover", objectPosition: "top" }} quality={90} />
                ) : (
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, padding: 24, background: "radial-gradient(ellipse 60% 60% at 50% 40%, rgba(79,209,138,0.10), transparent)" }}>
                    {(() => { const Icon = MODULE_ICONS[active]; return <Icon size={56} strokeWidth={1.2} style={{ color: "#4fd18a" }} />; })()}
                    <div style={{ fontFamily: "Nacelle, sans-serif", fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 600, color: "var(--ark-text)" }}>{mod.label}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", maxWidth: 560 }}>
                      {mod.features.map((f) => <span key={f} style={{ fontSize: 13, padding: "7px 12px", borderRadius: 999, border: "1px solid var(--ark-border-strong)", color: "var(--ark-text-dim)" }}>{f}</span>)}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--ark-text-faint)" }}>{c.noShot}</div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            <div style={{ padding: "16px 20px", borderTop: "1px solid var(--ark-border)", display: "flex", alignItems: "flex-start", gap: 40, flexWrap: "wrap" }}>
              <p style={{ fontSize: 13.5, color: "var(--ark-text-muted)", lineHeight: 1.5, flex: 1 }}>{mod.desc}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {mod.features.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <IconTick size={15} style={{ color: "#4fd18a" }} />
                    <span style={{ fontSize: 12.5, color: "var(--ark-text-muted)" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform open CTA */}
      <section style={{ padding: "16px 0 80px" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <p style={{ fontSize: 14, color: "var(--ark-text-muted)", marginBottom: 20, opacity: 0.8 }}>
            {c.platformCtaLabel}
          </p>
          <Link
            href="/contact?plan=goarkan-demo#lead-form"
            className="btn"
            style={{ background: "#4fd18a", color: "#05080a", display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 700, textDecoration: "none" }}
          >
            {c.platformCta}
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: "64px 0 96px", borderTop: "1px solid transparent", borderImage: "linear-gradient(to right, transparent, rgba(148,163,184,0.15), transparent) 1" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
              <span className="heading-gradient">{c.benefitsTitle}</span>
            </h2>
          </div>
          <div style={{ display: "grid", gap: 24 }} className="grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1">
            {c.benefits.map(({ title, desc }, i) => {
              const Icon = BENEFIT_ICONS[i];
              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE, delay: i * 0.07 }}
                  style={{
                    padding: "24px", borderRadius: 14,
                    background: "var(--ark-card)", border: "1px solid var(--ark-card-border)",
                    transition: "transform 200ms cubic-bezier(0.4,0,0.2,1), box-shadow 200ms cubic-bezier(0.4,0,0.2,1), border-color 200ms cubic-bezier(0.4,0,0.2,1)",
                    willChange: "transform",
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 12px 32px rgba(0,0,0,0.25)"; el.style.borderColor = "rgba(79,209,138,0.18)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ""; el.style.boxShadow = ""; el.style.borderColor = "var(--ark-card-border)"; }}
                >
                  <div style={{ marginBottom: 16, width: 48, height: 48, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "#4fd18a", background: "linear-gradient(135deg, rgba(79,209,138,0.16), rgba(79,209,138,0.04))", border: "1px solid rgba(79,209,138,0.25)" }}><Icon size={26} /></div>
                  <h3 style={{ fontFamily: "Nacelle, sans-serif", fontSize: 15, fontWeight: 600, color: "var(--ark-text)", marginBottom: 8 }}>{title}</h3>
                  <p style={{ fontSize: 13.5, color: "var(--ark-text-muted)", lineHeight: 1.6 }}>{desc}</p>
                </motion.div>
              );
            })}
          </div>
          <div style={{ marginTop: 40, textAlign: "center" }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ark-text-muted)", marginBottom: 14 }}>{c.soonTitle}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
              {c.soon.map((x) => <span key={x} style={{ fontSize: 13, padding: "7px 12px", borderRadius: 999, border: "1px dashed var(--ark-border-strong)", color: "var(--ark-text-dim)" }}>{x}</span>)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
