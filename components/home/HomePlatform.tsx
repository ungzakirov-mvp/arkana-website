"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useApp } from "@/components/providers/ThemeLanguageProvider";

const COPY: Record<string, {
  label: string; h2a: string; h2b: string; body: string; cta: string;
  features: { title: string; desc: string }[];
}> = {
  ru: {
    label: "Платформа GoARKAN",
    h2a: "Полный контроль",
    h2b: "над вашим IT.",
    body: "GoARKAN объединяет всё, что связано с IT вашей компании, в единой платформе. Вы всегда знаете, что происходит, кто отвечает и на каком этапе находится каждая задача.",
    cta: "Подробнее о GoARKAN",
    features: [
      { title: "Обращения сотрудников", desc: "Сотрудник описывает проблему — мы берём её в работу. Никаких потерянных задач, никаких звонков с вопросом «а что там с моим запросом?»" },
      { title: "Всё оборудование под контролем", desc: "Каждый компьютер, сервер и лицензия зафиксированы. Вы видите, что есть, что устаревает и что требует замены." },
      { title: "Вы видите то, что видим мы", desc: "Клиентский доступ в GoARKAN включён в каждый тариф. Открываете портал — видите все активные задачи, статусы и сроки." },
      { title: "Отчёт каждый месяц", desc: "Получаете письменный отчёт по фактическим данным: что сделано, какой SLA выполнен, что требует внимания." },
      { title: "Документация вашей компании", desc: "Сетевые схемы, конфигурации, пароли — хранятся в структурированном виде и всегда актуальны. Не в голове одного инженера." },
      { title: "Любое изменение согласовано", desc: "Перед тем как что-то менять в вашей IT-инфраструктуре, мы фиксируем изменение и получаем согласование. Никаких сюрпризов." },
    ],
  },
  en: {
    label: "GoARKAN Platform",
    h2a: "Full control",
    h2b: "over your IT.",
    body: "GoARKAN brings everything related to your company's IT into a single platform. You always know what is happening, who is responsible, and where every task stands.",
    cta: "Learn about GoARKAN",
    features: [
      { title: "Employee requests", desc: "An employee describes a problem — we handle it. No lost tasks, no calls asking 'what happened to my request?'" },
      { title: "All hardware under control", desc: "Every computer, server, and licence is registered. You see what you have, what's ageing, and what needs replacing." },
      { title: "You see what we see", desc: "Client access to GoARKAN is included in every plan. Open the portal and see all active tasks, statuses, and deadlines." },
      { title: "Monthly report", desc: "You receive a written report based on real data: what was done, which SLAs were met, and what needs attention." },
      { title: "Your company documentation", desc: "Network diagrams, configurations, passwords — stored in structured form and always up to date. Not in one engineer's head." },
      { title: "Every change is approved", desc: "Before changing anything in your IT infrastructure, we log the change and get approval. No surprises." },
    ],
  },
  uz: {
    label: "GoARKAN Platformasi",
    h2a: "IT'ingiz ustidan",
    h2b: "to'liq nazorat.",
    body: "GoARKAN kompaniyangizning IT bilan bog'liq barcha narsalarni yagona platformaga birlashtiradi. Nima bo'layotgani, kim javobgar ekanligi va har bir vazifa qaysi bosqichda turganini doim bilasiz.",
    cta: "GoARKAN haqida batafsil",
    features: [
      { title: "Xodimlarning murojaatlari", desc: "Xodim muammoni tavsiflab beradi — biz uni ishga olamiz. Yo'qolgan vazifalar yo'q, 'mening so'rovim nima bo'ldi?' degan qo'ng'iroqlar yo'q." },
      { title: "Barcha uskunalar nazorat ostida", desc: "Har bir kompyuter, server va litsenziya ro'yxatga olingan. Nima borligini, nima eskirayotganini va nima almashtirilishi kerakligini ko'rasiz." },
      { title: "Biz ko'rgan narsani siz ham ko'rasiz", desc: "GoARKAN'ga mijoz kirishi har bir tarifga kiritilgan. Portalni ochasiz — barcha faol vazifalar, statuslar va muddatlarni ko'rasiz." },
      { title: "Har oy hisobot", desc: "Haqiqiy ma'lumotlarga asoslangan yozma hisobot olasiz: nima qilindi, qaysi SLA bajarildi, nimaga e'tibor berish kerak." },
      { title: "Kompaniya hujjatlari", desc: "Tarmoq sxemalari, konfiguratsiyalar, parollar — tuzilgan shaklda saqlanadi va har doim yangilangan. Bitta muhandisning xotirasida emas." },
      { title: "Har bir o'zgarish kelishilgan", desc: "IT infratuzilmangizda biror narsani o'zgartirishdan oldin o'zgarishni qayd etamiz va rozilik olamiz. Kutilmagan hodisalar yo'q." },
    ],
  },
};

export function HomePlatform() {
  const { lang } = useApp();
  const c = COPY[lang] ?? COPY.ru;

  return (
    <section className="py-16 lg:py-24" style={{ background: "var(--ark-bg)", borderTop: "1px solid var(--ark-divider)" }}>
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-16">
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-hint)", marginBottom: 16 }}>
              {c.label}
            </div>
            <h2 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(2.5rem, 4vw, 4rem)", lineHeight: 1.02, letterSpacing: "-0.05em", color: "var(--ark-text-heading)", margin: 0 }}>
              {c.h2a}
              <br />
              <span style={{ color: "var(--ark-text-hint)" }}>{c.h2b}</span>
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, paddingBottom: 4 }}>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--ark-text-sub)", margin: 0, letterSpacing: "-0.01em" }}>
              {c.body}
            </p>
            <Link href="/goarkan" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "var(--ark-accent-2)", textDecoration: "none", letterSpacing: "-0.01em" }}>
              {c.cta}
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 1, border: "1px solid var(--ark-border)", borderRadius: 12, overflow: "hidden" }}>
          {c.features.map(({ title, desc }, i) => (
            <div key={title} style={{ padding: "32px 28px", background: i % 2 === 0 ? "var(--ark-bg-2)" : "var(--ark-bg)", borderBottom: i < 3 ? "1px solid var(--ark-border)" : "none" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--ark-accent-2)", marginBottom: 10, opacity: 0.6 }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--ark-text)", margin: "0 0 8px", letterSpacing: "-0.02em" }}>
                {title}
              </h3>
              <p style={{ fontSize: 13, color: "var(--ark-text-sub)", lineHeight: 1.65, margin: 0, letterSpacing: "-0.01em" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
