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
    h2: "Turli sohalardagi yechimlar",
    industries: [
      { n: "01", title: "Savdo va chakana",         body: "Kassa tizimlari, tovar hisobi, korporativ tarmoq va videokuzatuvni qo'llab-quvvatlash. Minimal to'xtash vaqti — maksimal javob tezligi." },
      { n: "02", title: "Ishlab chiqarish",         body: "Sex infratuzilmasi, sanoat tarmoqlari, ERP integratsiyasi. Aniq SLA va soha spesifikasini biladigan shaxsiy muhandis." },
      { n: "03", title: "Tibbiyot va klinikalar",   body: "Bemor ma'lumotlari xavfsizligi, tibbiy uskunalar va IT ishonchliligi, regulyator talablariga to'liq muvofiqlik." },
    ],
  },
  en: {
    eyebrow: "Industries",
    h2: "Built for the industries that can't afford downtime",
    industries: [
      { n: "01", title: "Retail & Trade",       body: "POS systems, inventory, corporate networks, and CCTV — all maintained under one SLA. Fast response when a register goes down or the network drops." },
      { n: "02", title: "Manufacturing",        body: "Shop floor infrastructure, industrial networks, and ERP integration. A named engineer who understands your production environment." },
      { n: "03", title: "Healthcare & Clinics", body: "Patient data protection, reliable medical IT, and regulatory compliance — handled by engineers who treat uptime as non-negotiable." },
    ],
  },
  zh: {
    eyebrow: "行业解决方案",
    h2: "专为不能承受宕机的行业而生",
    industries: [
      { n: "01", title: "零售与贸易",   body: "POS收银系统、库存管理、企业网络与视频监控，全部纳入统一SLA管理。收银台宕机或网络中断，快速响应，绝不拖延。" },
      { n: "02", title: "制造业",       body: "车间基础设施、工业网络与ERP集成。有名有姓的工程师深度了解您的生产环境与特殊需求。" },
      { n: "03", title: "医疗与诊所",   body: "患者数据安全保护、医疗IT可靠性保障与法规合规管理，由将系统可用性视为底线的工程师全程负责。" },
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
      <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: `opacity .4s ${EASE}, transform .4s ${EASE}` }}>
        <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 12, letterSpacing: "0.12em", color: "#4fd18a", textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>{c.eyebrow}</div>
        <h2 style={{ fontSize: "clamp(28px,3.6vw,44px)", fontWeight: 800, margin: "0 0 56px", maxWidth: 680, lineHeight: 1.15, letterSpacing: "-0.01em", fontFamily: "var(--font-manrope), sans-serif" }}>
          {c.h2}
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
        {c.industries.map((ind, i) => (
          <div key={ind.n} style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition: `opacity .4s ${EASE} ${i * 90}ms, transform .4s ${EASE} ${i * 90}ms`,
          }}>
            <div
              style={{ background: "#0b1210", border: "1px solid rgba(238,242,238,0.12)", borderRadius: 24, padding: 36, height: "100%", boxSizing: "border-box", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)", transition: "box-shadow 200ms cubic-bezier(0.4,0,0.2,1), transform 200ms cubic-bezier(0.4,0,0.2,1), border-color 200ms cubic-bezier(0.4,0,0.2,1)", cursor: "default", willChange: "transform" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 12px 32px rgba(79,209,138,0.12)"; el.style.transform = "translateY(-4px)"; el.style.borderColor = "rgba(79,209,138,0.2)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.04)"; el.style.transform = ""; el.style.borderColor = "rgba(238,242,238,0.12)"; }}
            >
              <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 11, letterSpacing: "0.1em", color: "#748078", fontWeight: 600 }}>{ind.n}</span>
              <h3 style={{ fontSize: 20, fontWeight: 700, margin: "16px 0 14px", fontFamily: "var(--font-manrope), sans-serif" }}>{ind.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "#9fb0a6", margin: 0 }}>{ind.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
