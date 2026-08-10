"use client";

import { useRef, useEffect, useState } from "react";
import { useApp } from "@/components/providers/ThemeLanguageProvider";

const EASE = "cubic-bezier(.16,1,.3,1)";

// Ticket volume over 30 days — deliberate downward trend (fewer incidents = better ops)
const TICKET_DATA = [11, 8, 14, 7, 9, 4, 8, 6, 10, 5, 7, 3, 6, 8, 4, 5, 3, 7, 4, 4, 6, 3, 4, 3, 5, 3, 3, 3, 2, 3];
const MONTHS = ["1 июл", "8 июл", "15 июл", "22 июл", "29 июл"];

function sparkPath(data: number[], w: number, h: number): string {
  const mn = Math.min(...data), mx = Math.max(...data), rng = mx - mn || 1;
  return data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - mn) / rng) * (h - 4) - 2;
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
}
function areaPath(data: number[], w: number, h: number): string {
  return sparkPath(data, w, h) + ` L${w},${h} L0,${h} Z`;
}

function useReveal() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

const KPIS_RU = [
  { label: "Открытых заявок", value: "3", trend: "−4 за 30д", up: true,   icon: <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="14" rx="2" stroke="#4fd18a" strokeWidth="1.3"/><path d="M3 8.5h14" stroke="#4fd18a" strokeWidth="1.2"/><path d="M7 2.5v3M13 2.5v3" stroke="#4fd18a" strokeWidth="1.4" strokeLinecap="round"/></svg> },
  { label: "SLA выполнение", value: "95.4%", trend: "+0.4%", up: true,   icon: <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M10 2L3 5v5.5c0 3.87 2.98 7.5 7 8.5 4.02-1 7-4.63 7-8.5V5L10 2z" stroke="#4fd18a" strokeWidth="1.3"/><path d="M7 10.5l2 2 4-4" stroke="#4fd18a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { label: "Активов в реестре", value: "142", trend: "+1 за мес.", up: true,   icon: <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><rect x="2" y="3" width="7" height="7" rx="1.2" stroke="#4fd18a" strokeWidth="1.3"/><rect x="11" y="3" width="7" height="7" rx="1.2" stroke="#4fd18a" strokeWidth="1.3"/><rect x="2" y="12" width="7" height="6" rx="1.2" stroke="#4fd18a" strokeWidth="1.3"/><rect x="11" y="12" width="7" height="6" rx="1.2" stroke="#4fd18a" strokeWidth="1.3"/></svg> },
  { label: "Лицензий активно", value: "89/92", trend: "97% покрытие", up: true,   icon: <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><rect x="3" y="6" width="14" height="10" rx="1.5" stroke="#4fd18a" strokeWidth="1.3"/><path d="M7 6V5a3 3 0 0 1 6 0v1" stroke="#4fd18a" strokeWidth="1.3"/><circle cx="10" cy="11.5" r="1.3" fill="#4fd18a" opacity="0.8"/></svg> },
  { label: "Сотрудников", value: "47", trend: "в базе поддержки", up: true,   icon: <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><circle cx="8" cy="7" r="3" stroke="#4fd18a" strokeWidth="1.3"/><path d="M2 17c0-3.31 2.69-6 6-6h4c3.31 0 6 2.69 6 6" stroke="#4fd18a" strokeWidth="1.3" strokeLinecap="round"/></svg> },
  { label: "Доступность", value: "99.9%", trend: "30д uptime", up: true,   icon: <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.5" stroke="#4fd18a" strokeWidth="1.3"/><path d="M10 6.5V10.5l2.5 2" stroke="#4fd18a" strokeWidth="1.3" strokeLinecap="round"/></svg> },
  { label: "Среднее время ответа", value: "24 мин", trend: "−3 мин за мес.", up: true,   icon: <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.5" stroke="#4fd18a" strokeWidth="1.3"/><path d="M10 5.5v4.5l3 2" stroke="#4fd18a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { label: "Безопасность", value: "100%", trend: "0 критических", up: true,   icon: <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M10 2L3 5v5.5c0 3.87 2.98 7.5 7 8.5 4.02-1 7-4.63 7-8.5V5L10 2z" stroke="#4fd18a" strokeWidth="1.3" strokeLinejoin="round"/></svg> },
] as const;

const TICKETS_RU = [
  { id: "GRK-2850", title: "Патч безопасности — 12 хостов",     pri: "high",   status: "Выполнена", time: "2ч назад" },
  { id: "GRK-2849", title: "Обновление VPN-конфигурации",        pri: "medium", status: "В работе",  time: "4ч назад" },
  { id: "GRK-2848", title: "Плановое обслуживание серверов",     pri: "low",    status: "Выполнена", time: "Вчера"    },
  { id: "GRK-2847", title: "Продление лицензий Microsoft 365",   pri: "low",    status: "Выполнена", time: "Вчера"    },
] as const;

const ASSETS_RU = [
  { label: "Рабочие станции", count: 87,  color: "#4fd18a" },
  { label: "Серверы",          count: 12,  color: "#7ee3ac" },
  { label: "Сетевое обор.",    count: 31,  color: "#3ba86e" },
  { label: "Мобильные",        count: 12,  color: "#2d8a5a" },
] as const;

const PRI_COLORS: Record<string, string> = {
  high: "#f87171", medium: "#fbbf24", low: "#4fd18a",
};

export function HomeDashboard() {
  const { lang } = useApp();
  const { ref, visible } = useReveal();
  const W = 320, H = 72;
  const line = sparkPath(TICKET_DATA, W, H);
  const area = areaPath(TICKET_DATA, W, H);

  const COPY = {
    ru: {
      eyebrow: "GoARKAN Платформа",
      heading: "Ваш IT — в режиме реального времени.",
      sub: "Не звонки ради статуса. Только данные, измерения и отчёты.",
      badge: "Демо-превью",
      greeting: "Добрый день, Заместитель директора",
      updated: "Обновлено: 31 июл. 2026, 14:32",
      allOk: "Все системы работают в штатном режиме",
      chartTitle: "Заявки за 30 дней",
      assetsTitle: "Активы по типу",
      ticketsTitle: "Последние заявки",
      viewAll: "Все заявки →",
      nav: ["Дашборд", "Заявки", "Активы", "Отчёты", "Настройки"],
    },
    uz: {
      eyebrow: "GoARKAN Platforma",
      heading: "IT'ingiz — real vaqt rejimida.",
      sub: "Status uchun qo'ng'iroqlar emas. Faqat ma'lumotlar va hisobotlar.",
      badge: "Demo ko'rinishi",
      greeting: "Xayrli kun, Direktor o'rinbosari",
      updated: "Yangilandi: 31 iyul. 2026, 14:32",
      allOk: "Barcha tizimlar normal ishlayapti",
      chartTitle: "30 kunda arizalar",
      assetsTitle: "Aktivlar turi bo'yicha",
      ticketsTitle: "Oxirgi arizalar",
      viewAll: "Barcha arizalar →",
      nav: ["Boshqaruv", "Arizalar", "Aktivlar", "Hisobotlar", "Sozlamalar"],
    },
    en: {
      eyebrow: "GoARKAN Platform",
      heading: "Your IT in real time.",
      sub: "No status calls. Just data, metrics and monthly reports.",
      badge: "Demo preview",
      greeting: "Good afternoon, Deputy Director",
      updated: "Updated: 31 Jul 2026, 14:32",
      allOk: "All systems operating normally",
      chartTitle: "Tickets over 30 days",
      assetsTitle: "Assets by type",
      ticketsTitle: "Recent tickets",
      viewAll: "All tickets →",
      nav: ["Dashboard", "Tickets", "Assets", "Reports", "Settings"],
    },
  } as const;
  const c = COPY[lang] ?? COPY.ru;
  const kpis = KPIS_RU;
  const tickets = TICKETS_RU;
  const assets = ASSETS_RU;
  const total = assets.reduce((s, a) => s + a.count, 0);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="dash-section"
      style={{
        position: "relative", zIndex: 2,
        padding: "100px clamp(20px,4vw,64px) 120px",
        background: "#05080a",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Section header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          flexWrap: "wrap", gap: 24, marginBottom: 56,
          opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)",
          transition: `opacity .5s ${EASE}, transform .5s ${EASE}`,
        }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 11, letterSpacing: "0.12em", color: "#4fd18a", textTransform: "uppercase", marginBottom: 14, fontWeight: 600 }}>
              {c.eyebrow}
            </div>
            <h2 style={{ fontSize: "clamp(26px,3.2vw,42px)", fontWeight: 800, margin: "0 0 12px", letterSpacing: "-0.02em", fontFamily: "var(--font-manrope), sans-serif", lineHeight: 1.12 }}>
              {c.heading}
            </h2>
            <p style={{ fontSize: 15, color: "#9fb0a6", margin: 0, maxWidth: 420, lineHeight: 1.65 }}>
              {c.sub}
            </p>
          </div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px",
            borderRadius: 100, border: "1px solid rgba(79,209,138,0.2)", background: "rgba(79,209,138,0.06)",
            flexShrink: 0,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4fd18a", flexShrink: 0, animation: "statusPulse 2s ease-in-out infinite" }} />
            <span style={{ fontSize: 12, color: "#c3d0c8", fontWeight: 600, fontFamily: "var(--font-mono, monospace)" }}>{c.badge}</span>
          </div>
        </div>

        {/* Scroll hint — mobile only */}
        <div className="dash-scroll-hint" style={{
          display: "none", alignItems: "center", justifyContent: "center",
          gap: 8, marginBottom: 12,
          fontSize: 11, color: "#748078", fontFamily: "var(--font-mono, monospace)",
          letterSpacing: "0.06em",
        }}>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
            <path d="M4 10h12M10 4l6 6-6 6" stroke="#748078" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          SCROLL TO EXPLORE
        </div>

        {/* Dashboard window — scrollable on mobile */}
        <div className="dash-scroll-wrapper" style={{ position: "relative" }}>
        <div className="dash-window" style={{
          borderRadius: 20, overflow: "hidden",
          border: "1px solid rgba(238,242,238,0.1)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(238,242,238,0.04), inset 0 1px 0 rgba(255,255,255,0.04)",
          opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(28px)",
          transition: `opacity .7s ${EASE} .1s, transform .7s ${EASE} .1s`,
        }}>
          {/* Window chrome */}
          <div style={{
            background: "#0d1a14", borderBottom: "1px solid rgba(238,242,238,0.08)",
            padding: "14px 20px", display: "flex", alignItems: "center", gap: 16,
          }}>
            <div style={{ display: "flex", gap: 7 }}>
              {["#f87171","#fbbf24","#4fd18a"].map(c => (
                <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.7 }} />
              ))}
            </div>
            <div style={{
              flex: 1, display: "flex", justifyContent: "center",
              fontFamily: "var(--font-mono, monospace)", fontSize: 12, color: "#748078", letterSpacing: "0.04em",
            }}>
              GoARKAN Executive Portal — arkana.uz
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4fd18a", animation: "statusPulse 2.4s ease-in-out infinite" }} />
              <span style={{ fontSize: 11, color: "#4fd18a", fontFamily: "var(--font-mono, monospace)", fontWeight: 600 }}>ONLINE</span>
            </div>
          </div>

          {/* Dashboard body */}
          <div style={{ background: "#08100d", display: "flex", minHeight: 460 }}>
            {/* Sidebar */}
            <div style={{
              width: 52, borderRight: "1px solid rgba(238,242,238,0.06)",
              display: "flex", flexDirection: "column", alignItems: "center",
              paddingTop: 20, gap: 6, flexShrink: 0,
            }}>
              {[
                <svg key="d" width="18" height="18" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="6" height="6" rx="1" fill="#4fd18a"/><rect x="11" y="3" width="6" height="6" rx="1" fill="#4fd18a" opacity="0.35"/><rect x="3" y="11" width="6" height="6" rx="1" fill="#4fd18a" opacity="0.35"/><rect x="11" y="11" width="6" height="6" rx="1" fill="#4fd18a" opacity="0.35"/></svg>,
                <svg key="t" width="18" height="18" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="13" rx="2" stroke="#748078" strokeWidth="1.3"/><path d="M7 9h6M7 12h4" stroke="#748078" strokeWidth="1.2" strokeLinecap="round"/></svg>,
                <svg key="a" width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 3L17 7v6l-7 4-7-4V7l7-4z" stroke="#748078" strokeWidth="1.3"/></svg>,
                <svg key="r" width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M4 4h12v12H4z" stroke="#748078" strokeWidth="1.3" rx="1"/><path d="M8 10V14M12 8v6M6 12v2" stroke="#748078" strokeWidth="1.2" strokeLinecap="round"/></svg>,
              ].map((icon, i) => (
                <div key={i} style={{
                  width: 36, height: 36, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center",
                  background: i === 0 ? "rgba(79,209,138,0.12)" : "transparent",
                  border: i === 0 ? "1px solid rgba(79,209,138,0.18)" : "1px solid transparent",
                  cursor: "default",
                }}>
                  {icon}
                </div>
              ))}
            </div>

            {/* Main content */}
            <div style={{ flex: 1, padding: "20px 20px 20px 20px", overflow: "hidden", minWidth: 0 }}>
              {/* Header row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 8 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#eef2ee", marginBottom: 2 }}>{c.greeting}</div>
                  <div style={{ fontSize: 11, color: "#748078", fontFamily: "var(--font-mono, monospace)" }}>{c.updated}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 12px", borderRadius: 8, background: "rgba(79,209,138,0.07)", border: "1px solid rgba(79,209,138,0.14)" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4fd18a", flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: "#4fd18a", fontWeight: 600 }}>{c.allOk}</span>
                </div>
              </div>

              {/* KPI tiles */}
              <div className="dash-kpi-grid" style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 10, marginBottom: 16,
              }}>
                {kpis.map((kpi) => (
                  <div key={kpi.label} style={{
                    background: "rgba(15,26,22,0.7)", border: "1px solid rgba(238,242,238,0.07)",
                    borderRadius: 10, padding: "12px 14px",
                    transition: "border-color 180ms ease, background 180ms ease",
                    cursor: "default",
                  }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(79,209,138,0.2)"; el.style.background = "rgba(79,209,138,0.05)"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(238,242,238,0.07)"; el.style.background = "rgba(15,26,22,0.7)"; }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                      <div style={{ opacity: 0.7 }}>{kpi.icon}</div>
                      <span style={{ fontSize: 10, color: "#4fd18a", fontWeight: 600, background: "rgba(79,209,138,0.08)", padding: "2px 6px", borderRadius: 4 }}>
                        {kpi.trend}
                      </span>
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: "#eef2ee", letterSpacing: "-0.02em", fontFamily: "var(--font-manrope), sans-serif", lineHeight: 1.1 }}>
                      {kpi.value}
                    </div>
                    <div style={{ fontSize: 10.5, color: "#748078", marginTop: 3 }}>{kpi.label}</div>
                  </div>
                ))}
              </div>

              {/* Charts + tickets row */}
              <div className="dash-bottom-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                {/* Sparkline chart */}
                <div style={{ background: "rgba(15,26,22,0.7)", border: "1px solid rgba(238,242,238,0.07)", borderRadius: 10, padding: "14px 14px 10px" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#9fb0a6", marginBottom: 12 }}>{c.chartTitle}</div>
                  <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: 60, overflow: "visible" }}>
                    <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4fd18a" stopOpacity="0.18"/>
                        <stop offset="100%" stopColor="#4fd18a" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <path d={area} fill="url(#areaGrad)"/>
                    <path d={line} fill="none" stroke="#4fd18a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                    {MONTHS.map(m => (
                      <span key={m} style={{ fontSize: 9, color: "#748078", fontFamily: "var(--font-mono, monospace)" }}>{m}</span>
                    ))}
                  </div>
                </div>

                {/* Asset breakdown */}
                <div style={{ background: "rgba(15,26,22,0.7)", border: "1px solid rgba(238,242,238,0.07)", borderRadius: 10, padding: "14px 14px" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#9fb0a6", marginBottom: 14 }}>{c.assetsTitle}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {assets.map(a => (
                      <div key={a.label}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                          <span style={{ fontSize: 10.5, color: "#c3d0c8" }}>{a.label}</span>
                          <span style={{ fontSize: 10.5, color: "#748078", fontFamily: "var(--font-mono, monospace)" }}>{a.count}</span>
                        </div>
                        <div style={{ height: 4, background: "rgba(238,242,238,0.07)", borderRadius: 2, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${(a.count / total) * 100}%`, background: a.color, borderRadius: 2, transition: "width 1s ease 0.5s" }} />
                        </div>
                      </div>
                    ))}
                    <div style={{ fontSize: 10, color: "#748078", marginTop: 4, fontFamily: "var(--font-mono, monospace)" }}>Всего: {total} единиц</div>
                  </div>
                </div>

                {/* Recent tickets */}
                <div style={{ background: "rgba(15,26,22,0.7)", border: "1px solid rgba(238,242,238,0.07)", borderRadius: 10, padding: "14px 14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#9fb0a6" }}>{c.ticketsTitle}</span>
                    <span style={{ fontSize: 10, color: "#4fd18a", cursor: "default" }}>{c.viewAll}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {tickets.map(t => (
                      <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: PRI_COLORS[t.pri], flexShrink: 0 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 10.5, color: "#eef2ee", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.title}</div>
                          <div style={{ fontSize: 9.5, color: "#748078", fontFamily: "var(--font-mono, monospace)" }}>{t.id} · {t.time}</div>
                        </div>
                        <div style={{
                          fontSize: 9, padding: "2px 6px", borderRadius: 4, flexShrink: 0,
                          background: t.status === "В работе" ? "rgba(251,191,36,0.1)" : "rgba(79,209,138,0.08)",
                          color: t.status === "В работе" ? "#fbbf24" : "#4fd18a",
                          fontWeight: 600, whiteSpace: "nowrap",
                        }}>
                          {t.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right fade — desktop hidden, mobile shown */}
        <div className="dash-fade-right" style={{
          display: "none", position: "absolute", top: 0, right: 0,
          width: 48, height: "100%", borderRadius: "0 20px 20px 0",
          background: "linear-gradient(to right, transparent, #05080a)",
          pointerEvents: "none", zIndex: 2,
        }} />
        </div>

        {/* Footnote */}
        <p style={{
          textAlign: "center", fontSize: 12, color: "#748078",
          marginTop: 20, fontFamily: "var(--font-mono, monospace)",
          opacity: visible ? 1 : 0, transition: `opacity .5s ${EASE} .4s`,
        }}>
          Демо-данные · Реальный интерфейс доступен после подключения
        </p>
      </div>

      <style>{`
        /* Desktop */
        @media (min-width: 769px) {
          .dash-kpi-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .dash-bottom-grid { grid-template-columns: 1fr 1fr 1fr !important; }
          .dash-scroll-hint { display: none !important; }
          .dash-fade-right { display: none !important; }
        }
        /* Tablet ≤900px — KPI 2×4, bottom stack */
        @media (max-width: 900px) and (min-width: 769px) {
          .dash-kpi-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .dash-bottom-grid { grid-template-columns: 1fr !important; }
        }
        /* Mobile ≤768px — horizontal scroll, preserve full layout */
        @media (max-width: 768px) {
          .dash-scroll-hint {
            display: flex !important;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin-bottom: 12px;
            font-size: 11px;
            color: #748078;
            font-family: var(--font-mono, monospace);
            letter-spacing: 0.06em;
          }
          .dash-scroll-wrapper {
            overflow-x: auto !important;
            overflow-y: visible !important;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            position: relative;
          }
          .dash-scroll-wrapper::-webkit-scrollbar { display: none; }
          .dash-window {
            min-width: 680px !important;
          }
          .dash-fade-right {
            display: block !important;
            position: absolute;
            top: 0; right: 0;
            width: 56px; height: 100%;
            border-radius: 0 20px 20px 0;
            background: linear-gradient(to right, transparent, #05080a);
            pointer-events: none;
            z-index: 2;
          }
          .dash-kpi-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .dash-bottom-grid { grid-template-columns: 1fr 1fr 1fr !important; }
        }
        /* Mobile: reduce section padding */
        @media (max-width: 768px) {
          .dash-section { padding-top: 72px !important; padding-bottom: 72px !important; }
        }
        @media (max-width: 480px) {
          .dash-section { padding-top: 56px !important; padding-bottom: 56px !important; }
        }
      `}</style>
    </section>
  );
}
