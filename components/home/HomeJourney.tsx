"use client";

import { useRef, useEffect, useState } from "react";
import { useApp } from "@/components/providers/ThemeLanguageProvider";

const EASE = "cubic-bezier(.16,1,.3,1)";

const COPY = {
  ru: {
    eyebrow: "Путь заявки",
    h2:  "От открытия заявки до готового отчёта",
    sub: "Каждый инцидент проходит отслеживаемый путь. Никаких звонков ради уточнения статуса.",
    steps: [
      { n: "01", role: "Сотрудник", title: "Создание заявки",       desc: "Через Telegram-бот, веб-портал или звонок. Заявка появляется в системе мгновенно." },
      { n: "02", role: "Инженер",   title: "Приём и диагностика",    desc: "Инженер принимает заявку, уточняет детали и начинает диагностику удалённо." },
      { n: "03", role: "Инженер",   title: "Решение проблемы",       desc: "Удалённое или выездное решение. Все действия фиксируются в GoARKAN." },
      { n: "04", role: "Система",   title: "Закрытие и верификация", desc: "GoARKAN автоматически фиксирует время решения и проверяет соответствие SLA." },
      { n: "05", role: "Менеджер",  title: "Отчёт клиенту",          desc: "Ежемесячный отчёт со всеми заявками, временем реакции и статистикой." },
    ],
  },
  uz: {
    eyebrow: "Ariza yo'li",
    h2:  "Arizadan tayyor hisobotgacha",
    sub: "Har bir muammo kuzatiladigan yo'ldan o'tadi. Holat haqida so'rash uchun qo'ng'iroq kerak emas.",
    steps: [
      { n: "01", role: "Xodim",    title: "Ariza yaratish",           desc: "Telegram-bot, veb-portal yoki telefon orqali. Ariza tizimda darhol ro'yxatga olinadi." },
      { n: "02", role: "Muhandis", title: "Qabul va diagnostika",     desc: "Muhandis arizani qabul qiladi, tafsilotlarni aniqlab, masofadan diagnostika o'tkazadi." },
      { n: "03", role: "Muhandis", title: "Muammoni bartaraf etish",  desc: "Masofaviy yoki joyida yechim. Barcha harakatlar GoARKAN'da qayd etiladi." },
      { n: "04", role: "Tizim",    title: "Yopish va tekshirish",     desc: "GoARKAN avtomatik ravishda yechim vaqtini qayd etadi va SLA bajarilishini tekshiradi." },
      { n: "05", role: "Menejer",  title: "Mijozga hisobot",          desc: "Barcha arizalar, javob vaqtlari va statistikani o'z ichiga olgan oylik hisobot." },
    ],
  },
  en: {
    eyebrow: "Ticket Journey",
    h2:  "From the first ticket to the monthly report",
    sub: "Every incident follows a tracked, documented path. No status calls, no chasing updates.",
    steps: [
      { n: "01", role: "Employee", title: "Submit a Ticket",    desc: "Via Telegram bot, web portal, or phone. The ticket lands in the system instantly." },
      { n: "02", role: "Engineer", title: "Intake & Diagnosis", desc: "The engineer picks up the ticket, confirms the details, and starts remote diagnosis." },
      { n: "03", role: "Engineer", title: "Resolution",         desc: "Fixed remotely or on-site. Every action is logged in GoARKAN as it happens." },
      { n: "04", role: "System",   title: "Close & Verify",     desc: "GoARKAN records the resolution time and automatically checks SLA compliance." },
      { n: "05", role: "Manager",  title: "Client Report",      desc: "A monthly report with every ticket, response time, and performance metric." },
    ],
  },
} as const;

function useReveal() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export function HomeJourney() {
  const { lang } = useApp();
  const c = COPY[lang] ?? COPY.ru;
  const { ref, visible } = useReveal();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="flow" style={{ position: "relative", zIndex: 2, padding: "0 clamp(20px,4vw,64px) 120px", maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: `opacity .4s ${EASE}, transform .4s ${EASE}` }}>
        <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 12, letterSpacing: "0.12em", color: "#4fd18a", textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>{c.eyebrow}</div>
        <h2 style={{ fontSize: "clamp(28px,3.6vw,44px)", fontWeight: 800, margin: "0 0 20px", maxWidth: 680, lineHeight: 1.15, letterSpacing: "-0.01em", fontFamily: "var(--font-manrope), sans-serif" }}>
          {c.h2}
        </h2>
        <p style={{ fontSize: 15, color: "#9fb0a6", maxWidth: 560, margin: "0 0 56px", lineHeight: 1.6 }}>
          {c.sub}
        </p>
      </div>
      {/* Progress line */}
      <div style={{ position: "relative", height: 2, background: "rgba(238,242,238,0.1)", margin: "0 0 48px", borderRadius: 2 }}>
        <span style={{ position: "absolute", top: -3, width: 8, height: 8, borderRadius: "50%", background: "#4fd18a", left: 0, animation: "drift 3.2s linear infinite" }} />
      </div>
      <div className="journey-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 28 }}>
        {c.steps.map((step, i) => (
          <div key={step.n} style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition: `opacity .4s ${EASE} ${i * 90}ms, transform .4s ${EASE} ${i * 90}ms`,
          }}>
            <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 22, fontWeight: 700, color: "rgba(238,242,238,0.14)", marginBottom: 16 }}>{step.n}</div>
            <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 11, letterSpacing: "0.1em", color: "#4fd18a", textTransform: "uppercase", marginBottom: 10, fontWeight: 600 }}>{step.role}</div>
            <h3 style={{ fontSize: 17, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.3, fontFamily: "var(--font-manrope), sans-serif" }}>{step.title}</h3>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: "#9fb0a6", margin: 0 }}>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
