"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useApp } from "@/components/providers/ThemeLanguageProvider";

const EASE = "cubic-bezier(.16,1,.3,1)";

const COPY = {
  ru: {
    eyebrow: "Платформа GoARKAN",
    h2: "Полная ясность там, где раньше были догадки.",
    pillars: [
      {
        n: "01", tag: "GOARKAN",
        title: "Вы видите то же, что видим мы",
        desc: "Полная прозрачность в реальном времени. Ни одна заявка не теряется, ни один дедлайн не пропускается.",
        items: ["Портал заявок за 30 сек", "Дашборд SLA", "Реестр техники", "Документация сети"],
      },
      {
        n: "02", tag: "OPERATIONS",
        title: "Персональный менеджер. Команда за ним.",
        desc: "Единая точка входа для всех IT-вопросов. Ваш сервис-менеджер знает инфраструктуру — за ним стоит полная инженерная команда.",
        items: ["Ответ < 30 мин", "Персональный менеджер", "Инженерная команда", "99.9% uptime"],
      },
      {
        n: "03", tag: "BUSINESS",
        title: "Один договор. Ноль сюрпризов.",
        desc: "Фиксированная стоимость, предсказуемый бюджет, ежемесячная отчётность по всем работам.",
        items: ["Запуск 14 дней", "0 скрытых платежей", "Масштабирование", "Отчёт каждый месяц"],
      },
    ],
  },
  uz: {
    eyebrow: "GoARKAN platformasi",
    h2: "Ilgari taxmin bo'lgan joyda to'liq aniqlik.",
    pillars: [
      {
        n: "01", tag: "GOARKAN",
        title: "Siz ham biz ko'rganlarni ko'rasiz",
        desc: "Real vaqtda to'liq shaffoflik. Birorta ham ariza yo'qolmaydi, birorta ham muddat o'tkazib yuborilmaydi.",
        items: ["30 soniyada ariza portali", "SLA paneli", "Texnika reestri", "Tarmoq hujjatlari"],
      },
      {
        n: "02", tag: "OPERATIONS",
        title: "Shaxsiy menejer. Ortida to'liq jamoa.",
        desc: "Barcha IT masalalari uchun yagona kirish nuqtasi. Xizmat menejeringiz infratuzilmani biladi — ortida to'liq muhandislar jamoasi turadi.",
        items: ["Javob < 30 daqiqa", "Shaxsiy xizmat menejeri", "Muhandislar jamoasi", "99.9% uptime"],
      },
      {
        n: "03", tag: "BUSINESS",
        title: "Bitta shartnoma. Hech qanday kutilmagan xarajat.",
        desc: "Belgilangan narx, prognozli byudjet, barcha bajarilgan ishlar bo'yicha oylik hisobot.",
        items: ["14 kunda ishga tushirish", "Yashirin to'lovlar yo'q", "Kengayish imkoniyati", "Har oylik hisobot"],
      },
    ],
  },
  en: {
    eyebrow: "GoARKAN Platform",
    h2: "Complete clarity where there used to be guesswork.",
    pillars: [
      {
        n: "01", tag: "GOARKAN",
        title: "You see exactly what we see",
        desc: "Full transparency in real time. No ticket gets lost, no deadline slips through.",
        items: ["Ticket portal in 30 sec", "SLA Dashboard", "Asset Registry", "Network Documentation"],
      },
      {
        n: "02", tag: "OPERATIONS",
        title: "Dedicated service manager. Full team behind them.",
        desc: "One point of contact for all your IT. Your service manager knows your infrastructure — backed by the full engineering team.",
        items: ["Response < 30 min", "Dedicated service manager", "Full engineering team", "99.9% Uptime"],
      },
      {
        n: "03", tag: "BUSINESS",
        title: "One contract. Zero surprises.",
        desc: "Fixed price, predictable budget, and a monthly report on every task completed.",
        items: ["14-day onboarding", "No hidden fees", "Scale on demand", "Monthly report"],
      },
    ],
  },
  zh: {
    eyebrow: "GoARKAN平台",
    h2: "曾经靠猜测的地方，如今一切清晰可见。",
    pillars: [
      {
        n: "01", tag: "GOARKAN",
        title: "您所看到的，与我们完全一致",
        desc: "实时全程透明。每张工单有迹可查，每个截止日期绝不遗漏。",
        items: ["30秒内提交工单", "SLA仪表盘", "资产管理台账", "网络文档库"],
      },
      {
        n: "02", tag: "OPERATIONS",
        title: "专属服务经理，背后是完整团队。",
        desc: "所有IT问题统一对接。您的服务经理熟悉您的基础设施，身后有完整的工程师团队支撑。",
        items: ["响应时间 < 30分钟", "专属服务经理", "完整工程师团队", "99.9%可用率"],
      },
      {
        n: "03", tag: "BUSINESS",
        title: "一份合同，零隐性支出。",
        desc: "固定价格、可预期预算，以及每月完成所有工作的详细报告。",
        items: ["14天完成交接", "无隐性收费", "按需弹性扩展", "月度报告"],
      },
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

export function HomePlatform() {
  const { lang } = useApp();
  const c = COPY[lang] ?? COPY.ru;
  const { ref, visible } = useReveal();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="platform" style={{ position: "relative", zIndex: 2, padding: "120px clamp(20px,4vw,64px)", maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: `opacity .4s ${EASE}, transform .4s ${EASE}` }}>
        <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 12, letterSpacing: "0.12em", color: "#4fd18a", textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>{c.eyebrow}</div>
        <h2 style={{ fontSize: "clamp(28px,3.6vw,44px)", fontWeight: 800, margin: "0 0 60px", maxWidth: 640, lineHeight: 1.15, letterSpacing: "-0.01em", fontFamily: "var(--font-manrope), sans-serif" }}>
          {c.h2}
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
        {c.pillars.map((p, i) => {
          const isHero = i === 0;
          return (
            <div key={p.n} style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(20px)",
              transition: `opacity .4s ${EASE} ${i * 90}ms, transform .4s ${EASE} ${i * 90}ms`,
            }}>
              <div
                style={{
                  background: isHero ? "linear-gradient(145deg, #0f2018, #0b1210)" : "#0b1210",
                  border: isHero ? "1px solid rgba(79,209,138,0.22)" : "1px solid rgba(238,242,238,0.12)",
                  borderRadius: 24, padding: isHero ? 40 : 36,
                  boxShadow: isHero ? "0 0 40px rgba(79,209,138,0.07), inset 0 1px 0 rgba(79,209,138,0.08)" : "inset 0 1px 0 rgba(255,255,255,0.04)",
                  height: "100%", boxSizing: "border-box" as const,
                  transition: "transform 200ms cubic-bezier(0.4,0,0.2,1), box-shadow 200ms cubic-bezier(0.4,0,0.2,1), border-color 200ms cubic-bezier(0.4,0,0.2,1)",
                  willChange: "transform",
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-4px)"; el.style.boxShadow = isHero ? "0 16px 40px rgba(79,209,138,0.14), inset 0 1px 0 rgba(79,209,138,0.08)" : "0 12px 32px rgba(0,0,0,0.3)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ""; el.style.boxShadow = isHero ? "0 0 40px rgba(79,209,138,0.07), inset 0 1px 0 rgba(79,209,138,0.08)" : "inset 0 1px 0 rgba(255,255,255,0.04)"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
                  <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: isHero ? 36 : 32, fontWeight: 700, color: isHero ? "rgba(79,209,138,0.18)" : "rgba(238,242,238,0.12)" }}>{p.n}</span>
                  <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 11, letterSpacing: "0.1em", color: "#4fd18a", fontWeight: 600 }}>{p.tag}</span>
                </div>
                <h3 style={{ fontSize: isHero ? 23 : 21, fontWeight: 700, margin: "0 0 14px", lineHeight: 1.3, fontFamily: "var(--font-manrope), sans-serif" }}>{p.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: "#9fb0a6", margin: "0 0 24px" }}>{p.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {p.items.map(it => (
                    <div key={it} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 13, color: "#c3d0c8" }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                        <path d="M2.5 7L5.5 10L11.5 4" stroke="#4fd18a" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>{it}</span>
                    </div>
                  ))}
                </div>
                {isHero && (
                  // Why own platform matters — the key insight for the buyer
                  <div style={{
                    marginTop: 24, padding: "16px 18px",
                    borderRadius: 12, background: "rgba(79,209,138,0.05)",
                    border: "1px solid rgba(79,209,138,0.14)",
                  }}>
                    {[
                      { a: lang === "uz" ? "Email orqali so'rov" : lang === "en" ? "Request by email" : lang === "zh" ? "邮件提交请求" : "Запрос по email",       b: lang === "uz" ? "Portal, 30 soniyada" : lang === "en" ? "Portal, 30 seconds" : lang === "zh" ? "门户，30秒完成" : "Портал, 30 секунд" },
                      { a: lang === "uz" ? "Qo'ng'iroq = holat" : lang === "en" ? "Call for status" : lang === "zh" ? "电话问进度" : "Звонок = статус",        b: lang === "uz" ? "Dashboard, real vaqtda" : lang === "en" ? "Dashboard, real time" : lang === "zh" ? "仪表盘，实时查看" : "Дашборд в реальном времени" },
                      { a: lang === "uz" ? "Choraklik hisobot" : lang === "en" ? "Quarterly report" : lang === "zh" ? "季度报告" : "Квартальный отчёт",      b: lang === "uz" ? "Oylik ko'rsatkichlar" : lang === "en" ? "Monthly metrics" : lang === "zh" ? "月度指标" : "Ежемесячные метрики" },
                    ].map(row => (
                      <div key={row.a} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 12, marginBottom: 7 }}>
                        <span style={{ color: "#748078", textDecoration: "line-through", flex: 1, textDecorationColor: "rgba(248,113,113,0.5)" }}>{row.a}</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}><path d="M2 6h8M7 3l3 3-3 3" stroke="#4fd18a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <span style={{ color: "#c3d0c8", flex: 1, fontWeight: 600 }}>{row.b}</span>
                      </div>
                    ))}
                  </div>
                )}
                {isHero && (
                  <Link href="/goarkan" style={{
                    display: "inline-flex", alignItems: "center", gap: 6, marginTop: 24,
                    fontSize: 13, fontWeight: 700, color: "#4fd18a", textDecoration: "none",
                    transition: "gap 200ms cubic-bezier(0.4,0,0.2,1), opacity 150ms",
                    opacity: 0.85,
                  }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.gap = "10px"; el.style.opacity = "1"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.gap = "6px"; el.style.opacity = "0.85"; }}
                  >
                    {lang === "uz" ? "Platformani ochish" : lang === "en" ? "Open platform" : lang === "zh" ? "进入平台" : "Открыть платформу"} <ArrowRight size={13} />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
