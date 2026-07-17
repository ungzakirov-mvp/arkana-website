"use client";

import { useRef, useEffect, useState } from "react";
import { useApp } from "@/components/providers/ThemeLanguageProvider";

const EASE = "cubic-bezier(.16,1,.3,1)";

const COPY = {
  ru: {
    eyebrow: "Отрасли",
    h2: "Решения для разных отраслей",
    industries: [
      { n: "01", title: "Торговля и ритейл",   body: "Поддержка кассовых систем, товароучёта, корпоративной сети и видеонаблюдения. Минимальный простой — максимальная скорость реакции." },
      { n: "02", title: "Производство",        body: "Инфраструктура цехов, промышленные сети, интеграция с ERP. Чёткие SLA и именной инженер, знающий вашу специфику." },
      { n: "03", title: "Медицина и клиники",  body: "Безопасность данных пациентов, надёжность медицинского оборудования и IT, соответствие требованиям регуляторов." },
    ],
  },
  uz: {
    eyebrow: "Tarmoqlar",
    h2: "Turli tarmoqlar uchun yechimlar",
    industries: [
      { n: "01", title: "Savdo va riteil",          body: "Kassa tizimlari, tovar hisobi, korporativ tarmoq va videokuzatuvni qo'llab-quvvatlash. Minimal to'xtash — maksimal javob tezligi." },
      { n: "02", title: "Ishlab chiqarish",         body: "Sex infratuzilmasi, sanoat tarmoqlari, ERP bilan integratsiya. Aniq SLA va mutaxassislikni biladigan shaxsiy muhandis." },
      { n: "03", title: "Tibbiyot va klinikalar",   body: "Bemor ma'lumotlari xavfsizligi, tibbiy uskunalar va IT ishonchliligi, regulyator talablariga muvofiqlik." },
    ],
  },
  en: {
    eyebrow: "Industries",
    h2: "Solutions across industries",
    industries: [
      { n: "01", title: "Retail & Trade",      body: "Support for POS systems, inventory management, corporate network and CCTV. Minimal downtime — maximum response speed." },
      { n: "02", title: "Manufacturing",       body: "Factory infrastructure, industrial networks, ERP integration. Clear SLAs and a named engineer who knows your specifics." },
      { n: "03", title: "Healthcare & Clinics", body: "Patient data security, medical equipment and IT reliability, regulatory compliance." },
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

export function HomeCases() {
  const { lang } = useApp();
  const c = COPY[lang] ?? COPY.ru;
  const { ref, visible } = useReveal();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="industries" style={{ position: "relative", zIndex: 2, padding: "0 clamp(20px,4vw,64px) 120px", maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(36px)", transition: `opacity .7s ${EASE}, transform .7s ${EASE}` }}>
        <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 12, letterSpacing: "0.12em", color: "#4fd18a", textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>{c.eyebrow}</div>
        <h2 style={{ fontSize: "clamp(28px,3.6vw,44px)", fontWeight: 800, margin: "0 0 56px", maxWidth: 680, lineHeight: 1.15, letterSpacing: "-0.01em", fontFamily: "var(--font-manrope), sans-serif" }}>
          {c.h2}
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
        {c.industries.map((ind, i) => (
          <div key={ind.n} style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(36px)",
            transition: `opacity .7s ${EASE} ${i * 90}ms, transform .7s ${EASE} ${i * 90}ms`,
          }}>
            <div
              style={{ background: "#0b1210", border: "1px solid rgba(238,242,238,0.08)", borderRadius: 24, padding: 36, height: "100%", boxSizing: "border-box", transition: "box-shadow .3s ease, transform .3s ease" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 12px 32px rgba(79,209,138,0.12)"; el.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = ""; el.style.transform = ""; }}
            >
              <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 11, letterSpacing: "0.1em", color: "#4fd18a", fontWeight: 600 }}>{ind.n}</span>
              <h3 style={{ fontSize: 20, fontWeight: 700, margin: "16px 0 14px", fontFamily: "var(--font-manrope), sans-serif" }}>{ind.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "#9fb0a6", margin: 0 }}>{ind.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
