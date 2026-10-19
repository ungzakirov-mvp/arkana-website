"use client";

import Link from "@/components/ui/LocaleLink";
import { ArrowRight, Headset, Server, Wrench, PenLine, Send, LayoutGrid } from "lucide-react";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { useApp } from "@/components/providers/ThemeLanguageProvider";
import type { LucideIcon } from "lucide-react";

type Svc = { title: string; tagline: string; body: string; highlights: string[] };
type Copy = { heroBadge: string; h1a: string; h1b: string; sub: string; cta: string; learnMore: string; services: Svc[] };

const COPY: Record<string, Copy> = {
  ru: {
    heroBadge: "Наши услуги",
    h1a: "Всё IT компании.",
    h1b: "Один подрядчик.",
    sub: "Обслуживание по подписке, разовые выезды, сети и серверы, ЭЦП и госпорталы, цифровой офис GoARKAN и Telegram-боты — по одному договору в Ташкенте.",
    cta: "Оставить заявку",
    learnMore: "Подробнее",
    services: [
      { title: "IT-обслуживание по подписке", tagline: "Ваш IT-отдел за фиксированную сумму в месяц.", body: "Поддержка сотрудников без лимита, выезды, серверы и Microsoft 365, сроки реакции в договоре, паспорт инфраструктуры и отчёт руководителю каждый месяц.", highlights: ["START / BUSINESS / ENTERPRISE", "Сроки в договоре", "Отчёт руководителю", "GoARKAN включён"] },
      { title: "Выезд компьютерного мастера", tagline: "Платите только за сделанную работу.", body: "Компьютеры, сеть и Wi-Fi, принтеры, программы и почта. Цена известна до начала, за один выезд — сколько угодно задач, акт и счёт для бухгалтерии.", highlights: ["Без абонентской платы", "Фикс-прайс", "Акт и счёт", "Карта часов"] },
      { title: "E-IMZO, ЭЦП и Didox", tagline: "Подпись работает на всех компьютерах.", body: "Установка E-IMZO и ключей ЭЦП, настройка Didox, my.soliq.uz и других госпорталов. Выезд или удалённо.", highlights: ["E-IMZO", "Didox", "my.soliq.uz", "Удалённо"] },
      { title: "Сети, серверы, телефония", tagline: "Проекты с фиксированной ценой за результат.", body: "Wi-Fi и локальная сеть, VLAN, серверы и виртуализация, резервное копирование, 1С, IP-телефония, межсетевой экран, VPN и MFA. Сдаём по акту.", highlights: ["Wi-Fi и СКС", "Серверы и бэкапы", "IP-телефония", "VPN и MFA"] },
      { title: "Telegram-боты под ключ", tagline: "Заявки, заказы и уведомления там, где все сидят.", body: "Боты для сотрудников и клиентов: заявки, опросы, учёт, интеграции с 1С, Google Sheets и CRM. Фиксированная цена и срок, хостинг и сопровождение.", highlights: ["Lite / Standard / Pro", "Интеграции", "Хостинг", "Сопровождение"] },
      { title: "GoARKAN — цифровой офис", tagline: "Заявки, техника, склад и документы в одной системе.", body: "Service Desk с Telegram-ботом, учёт техники и лицензий, склад, договоры, документооборот с электронной подписью и дашборд руководителя.", highlights: ["Service Desk", "Учёт техники", "ЭДО с ЭЦП", "Дашборд"] },
    ],
  },
  uz: {
    heroBadge: "Xizmatlarimiz",
    h1a: "Kompaniyaning butun IT si.",
    h1b: "Bitta pudratchi.",
    sub: "Obuna bo'yicha xizmat, bir martalik tashriflar, tarmoq va serverlar, ERI va davlat portallari, GoARKAN raqamli ofisi va Telegram-botlar — Toshkentda bitta shartnoma bilan.",
    cta: "Ariza qoldirish",
    learnMore: "Batafsil",
    services: [
      { title: "Obuna bo'yicha IT xizmat", tagline: "Oylik belgilangan narxdagi IT bo'limingiz.", body: "Xodimlarni cheklovsiz qo'llab-quvvatlash, tashriflar, serverlar va Microsoft 365, shartnomadagi javob muddatlari, infratuzilma pasporti va har oy rahbarga hisobot.", highlights: ["START / BUSINESS / ENTERPRISE", "Shartnomadagi muddatlar", "Rahbarga hisobot", "GoARKAN kiritilgan"] },
      { title: "Kompyuter ustasini chaqirish", tagline: "Faqat bajarilgan ish uchun to'laysiz.", body: "Kompyuterlar, tarmoq va Wi-Fi, printerlar, dasturlar va pochta. Narx oldindan ma'lum, bitta tashrifda istalgancha vazifa, dalolatnoma va hisob.", highlights: ["Abonent to'lovisiz", "Qat'iy narxlar", "Dalolatnoma va hisob", "Soatlar kartasi"] },
      { title: "E-IMZO, ERI va Didox", tagline: "Imzo barcha kompyuterlarda ishlaydi.", body: "E-IMZO va ERI kalitlarini o'rnatish, Didox, my.soliq.uz va boshqa davlat portallarini sozlash. Tashrif yoki masofadan.", highlights: ["E-IMZO", "Didox", "my.soliq.uz", "Masofadan"] },
      { title: "Tarmoq, serverlar, telefoniya", tagline: "Natija uchun qat'iy narxdagi loyihalar.", body: "Wi-Fi va lokal tarmoq, VLAN, serverlar va virtualizatsiya, zaxira nusxalash, 1C, IP-telefoniya, firewall, VPN va MFA. Dalolatnoma bilan topshiramiz.", highlights: ["Wi-Fi va SKS", "Serverlar va zaxira", "IP-telefoniya", "VPN va MFA"] },
      { title: "Tayyor Telegram-botlar", tagline: "Arizalar, buyurtmalar va xabarlar hamma o'tirgan joyda.", body: "Xodimlar va mijozlar uchun botlar: arizalar, so'rovnomalar, hisob, 1C, Google Sheets va CRM bilan integratsiya. Qat'iy narx va muddat, xosting va kuzatuv.", highlights: ["Lite / Standard / Pro", "Integratsiyalar", "Xosting", "Kuzatuv"] },
      { title: "GoARKAN — raqamli ofis", tagline: "Arizalar, texnika, ombor va hujjatlar bitta tizimda.", body: "Telegram-botli Service Desk, texnika va litsenziyalar hisobi, ombor, shartnomalar, elektron imzoli hujjat aylanishi va rahbar paneli.", highlights: ["Service Desk", "Texnika hisobi", "ERI bilan EHA", "Panel"] },
    ],
  },
  en: {
    heroBadge: "Our services",
    h1a: "All your company's IT.",
    h1b: "One provider.",
    sub: "Subscription support, one-off call-outs, networks and servers, e-signature and gov portals, the GoARKAN digital office and Telegram bots — under one contract in Tashkent.",
    cta: "Leave a request",
    learnMore: "Learn more",
    services: [
      { title: "IT support subscription", tagline: "Your IT department for a fixed monthly fee.", body: "Unlimited staff support, on-site visits, servers and Microsoft 365, contractual response times, an infrastructure passport and a monthly report to management.", highlights: ["START / BUSINESS / ENTERPRISE", "Times in contract", "Management report", "GoARKAN included"] },
      { title: "On-site computer technician", tagline: "Pay only for the work done.", body: "PCs, network and Wi-Fi, printers, software and mail. Price known upfront, any number of jobs per visit, act and invoice for accounting.", highlights: ["No monthly fee", "Fixed price list", "Act and invoice", "Hour pack"] },
      { title: "E-IMZO, e-signature and Didox", tagline: "Signing works on every PC.", body: "Install E-IMZO and e-signature keys, set up Didox, my.soliq.uz and other gov portals. On site or remotely.", highlights: ["E-IMZO", "Didox", "my.soliq.uz", "Remote"] },
      { title: "Networks, servers, telephony", tagline: "Fixed-price projects, paid for the result.", body: "Wi-Fi and LAN, VLANs, servers and virtualization, backups, 1C, IP telephony, firewall, VPN and MFA. Signed off with an act.", highlights: ["Wi-Fi and cabling", "Servers and backups", "IP telephony", "VPN and MFA"] },
      { title: "Turnkey Telegram bots", tagline: "Requests, orders and alerts where everyone already is.", body: "Bots for staff and clients: requests, surveys, records, integrations with 1C, Google Sheets and CRM. Fixed price and deadline, hosting and support.", highlights: ["Lite / Standard / Pro", "Integrations", "Hosting", "Support"] },
      { title: "GoARKAN digital office", tagline: "Requests, assets, stock and documents in one system.", body: "Service Desk with a Telegram bot, asset and licence records, stock, contracts, e-docs with electronic signature and a management dashboard.", highlights: ["Service Desk", "Asset records", "E-docs", "Dashboard"] },
    ],
  },
};

const SERVICE_HREFS = [
  "/services/it-outsourcing",
  "/services/on-demand",
  "/services/e-imzo",
  "/services/infrastructure",
  "/services/telegram-bots",
  "/goarkan",
];
const SERVICE_ICONS: LucideIcon[] = [Headset, Wrench, PenLine, Server, Send, LayoutGrid];

export function ServicesPage() {
  const { lang } = useApp();
  const c = COPY[lang] ?? (lang === "zh" ? COPY.en : COPY.ru);

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20" style={{ background: "var(--ark-bg)" }}>
        <div className="max-w-[75rem] mx-auto px-6">
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-hint)", marginBottom: 24 }}>
            {c.heroBadge}
          </div>
          <h1
            className="text-[48px] sm:text-[60px] font-[800] leading-[1.07] tracking-[-0.02em] mt-4 mb-6 max-w-[640px]"
            style={{ color: "var(--ark-text-heading)" }}
          >
            {c.h1a}
            <br />
            <span style={{ color: "var(--ark-accent)" }}>{c.h1b}</span>
          </h1>
          <p className="text-[18px] leading-[1.65] max-w-[540px] mb-10" style={{ color: "var(--ark-text-sub)" }}>
            {c.sub}
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "13px 28px", borderRadius: 100,
              background: "#4fd18a", color: "#05080a",
              fontSize: 14, fontWeight: 700, textDecoration: "none",
              transition: "background 150ms cubic-bezier(0.4,0,0.2,1), box-shadow 150ms cubic-bezier(0.4,0,0.2,1), transform 100ms cubic-bezier(0.4,0,0.2,1)",
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#7ee3ac"; el.style.boxShadow = "0 8px 24px rgba(79,209,138,0.35)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#4fd18a"; el.style.boxShadow = "none"; }}
            onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"; }}
            onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
          >
            {c.cta}
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Service cards */}
      <section className="py-20 lg:py-28" style={{ background: "var(--ark-bg-2)", borderTop: "1px solid var(--ark-divider)" }}>
        <div className="max-w-[75rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {c.services.map(({ title, tagline, body, highlights }, i) => {
              const Icon = SERVICE_ICONS[i];
              return (
                <div
                  key={SERVICE_HREFS[i]}
                  className="group rounded-[24px] p-8"
                  style={{
                    background: "var(--ark-card)",
                    border: "1px solid var(--ark-card-border)",
                    transition: "transform 220ms cubic-bezier(0.4,0,0.2,1), box-shadow 220ms cubic-bezier(0.4,0,0.2,1), border-color 220ms cubic-bezier(0.4,0,0.2,1)",
                    willChange: "transform",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-5px)";
                    el.style.boxShadow = "0 20px 48px rgba(0,0,0,0.32), 0 0 0 1px rgba(79,209,138,0.12)";
                    el.style.borderColor = "rgba(79,209,138,0.22)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "";
                    el.style.boxShadow = "";
                    el.style.borderColor = "var(--ark-card-border)";
                  }}
                >
                  {/* Card header: icon + number */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                    <div
                      style={{
                        width: 48, height: 48, borderRadius: 14,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: "linear-gradient(135deg, rgba(79,209,138,0.14), rgba(79,209,138,0.05))",
                        border: "1px solid rgba(79,209,138,0.22)",
                        boxShadow: "0 0 24px rgba(79,209,138,0.1)",
                      }}
                    >
                      <Icon size={22} style={{ color: "#4fd18a" }} />
                    </div>
                    <span style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: 12, color: "rgba(79,209,138,0.28)",
                      fontWeight: 600, letterSpacing: "0.04em",
                    }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h2 className="text-[22px] font-[800] mb-2" style={{ color: "var(--ark-text-heading)" }}>{title}</h2>
                  <p className="text-[14px] font-[600] mb-4" style={{ color: "var(--ark-accent-2)" }}>{tagline}</p>
                  <p className="text-[14.5px] leading-[1.65] mb-6" style={{ color: "var(--ark-text-sub)" }}>{body}</p>

                  <div className="flex flex-wrap gap-2 mb-7">
                    {highlights.map((h) => (
                      <span
                        key={h}
                        className="px-3 py-1 rounded-full text-[12px] font-[600]"
                        style={{ background: "var(--ark-surface)", border: "1px solid var(--ark-border)", color: "var(--ark-text-muted)" }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={SERVICE_HREFS[i]}
                    className="inline-flex items-center gap-2 text-[13.5px] font-[700] group-hover:gap-3"
                    style={{
                      color: "var(--ark-accent-2)",
                      transition: "gap 180ms cubic-bezier(0.4,0,0.2,1), color 150ms cubic-bezier(0.4,0,0.2,1)",
                    }}
                  >
                    {c.learnMore}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
