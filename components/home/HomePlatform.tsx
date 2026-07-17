"use client";

import { useRef, useEffect, useState } from "react";

const EASE = "cubic-bezier(.16,1,.3,1)";

const PILLARS = [
  {
    n: "01", tag: "GOARKAN",
    title: "Вы видите то же, что видим мы",
    desc: "Полная прозрачность в реальном времени. Ни одна заявка не теряется, ни один дедлайн не пропускается.",
    items: ["Портал заявок за 30 сек", "Дашборд SLA", "Реестр техники", "Документация сети"],
  },
  {
    n: "02", tag: "OPERATIONS",
    title: "Именной инженер. SLA в договоре.",
    desc: "Фиксированные обязательства с штрафными санкциями. Ваш инженер знает вашу инфраструктуру.",
    items: ["Ответ < 2ч", "Мониторинг 24/7", "Удалённо сначала", "99.9% uptime"],
  },
  {
    n: "03", tag: "BUSINESS",
    title: "Один договор. Ноль сюрпризов.",
    desc: "Фиксированная стоимость, предсказуемый бюджет, ежемесячная отчётность по всем работам.",
    items: ["Запуск 5 дней", "0 скрытых платежей", "Масштабирование", "Отчёт каждый месяц"],
  },
];

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

export function HomePlatform() {
  const { ref, visible } = useReveal();
  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="platform" style={{ position: "relative", zIndex: 2, padding: "120px clamp(20px,4vw,64px)", maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(36px)", transition: `opacity .7s ${EASE}, transform .7s ${EASE}` }}>
        <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 12, letterSpacing: "0.12em", color: "#4fd18a", textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Платформа GoARKAN</div>
        <h2 style={{ fontSize: "clamp(28px,3.6vw,44px)", fontWeight: 800, margin: "0 0 60px", maxWidth: 640, lineHeight: 1.15, letterSpacing: "-0.01em", fontFamily: "var(--font-manrope), sans-serif" }}>
          Полная ясность там, где раньше были догадки.
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
        {PILLARS.map((p, i) => (
          <div key={p.n} style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(36px)",
            transition: `opacity .7s ${EASE} ${i * 90}ms, transform .7s ${EASE} ${i * 90}ms`,
          }}>
            <div style={{ background: "#0b1210", border: "1px solid rgba(238,242,238,0.08)", borderRadius: 24, padding: 36, height: "100%", boxSizing: "border-box" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
                <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 32, fontWeight: 700, color: "rgba(238,242,238,0.12)" }}>{p.n}</span>
                <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 11, letterSpacing: "0.1em", color: "#4fd18a", fontWeight: 600 }}>{p.tag}</span>
              </div>
              <h3 style={{ fontSize: 21, fontWeight: 700, margin: "0 0 14px", lineHeight: 1.3, fontFamily: "var(--font-manrope), sans-serif" }}>{p.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "#9fb0a6", margin: "0 0 24px" }}>{p.desc}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {p.items.map(it => (
                  <div key={it} style={{ display: "flex", gap: 10, alignItems: "baseline", fontSize: 13, color: "#c3d0c8" }}>
                    <span style={{ color: "#4fd18a" }}>✓</span><span>{it}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
