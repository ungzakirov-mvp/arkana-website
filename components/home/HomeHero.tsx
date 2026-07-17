"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useApp } from "@/components/providers/ThemeLanguageProvider";

const EASE = "cubic-bezier(.16,1,.3,1)";

const COPY = {
  ru: {
    badge:   "IT-партнёр для вашего бизнеса",
    h1:      "Технологический партнёр",
    h1green: "для развития вашего бизнеса.",
    sub:     "Один договор. Фиксированная стоимость. Полная ответственность. Ваш IT работает предсказуемо — вы видите всё через GoARKAN.",
    cta:     "Получить коммерческое предложение →",
    ctaNote: "Ответим в течение рабочего дня",
    chips: [
      { title: "IT Outsourcing",  sub: "и поддержка" },
      { title: "Инфраструктура", sub: "и безопасность" },
      { title: "Автоматизация",  sub: "процессов" },
      { title: "Облако",         sub: "и интеграция" },
    ],
    stats: [
      { val: "99.9%", label: "Надёжность SLA" },
      { val: "< 2ч",  label: "Первый ответ" },
      { val: "5 дн.", label: "Средний срок запуска" },
      { val: "100+",  label: "Клиентов по Узбекистану" },
      { val: "24/7",  label: "Мониторинг" },
    ],
  },
  uz: {
    badge:   "Biznes uchun IT-sherik",
    h1:      "Texnologik sherik",
    h1green: "biznesingiz rivojlanishi uchun.",
    sub:     "Bitta shartnoma. Belgilangan narx. To'liq mas'uliyat. IT'ingiz barqaror ishlaydi — GoARKAN orqali hammasini ko'rasiz.",
    cta:     "Tijorat taklif olish →",
    ctaNote: "Bir ish kuni ichida javob beramiz",
    chips: [
      { title: "IT Outsourcing",     sub: "va qo'llab-quvvatlash" },
      { title: "Infratuzilma",       sub: "va xavfsizlik" },
      { title: "Avtomatlashtirish",  sub: "jarayonlari" },
      { title: "Bulut",              sub: "va integratsiya" },
    ],
    stats: [
      { val: "99.9%",   label: "SLA ishonchliligi" },
      { val: "< 2 soat", label: "Birinchi javob" },
      { val: "5 kun",   label: "O'rtacha ishga tushirish" },
      { val: "100+",    label: "O'zbekiston bo'ylab mijozlar" },
      { val: "24/7",    label: "Monitoring" },
    ],
  },
  en: {
    badge:   "IT Partner for Your Business",
    h1:      "Technology Partner",
    h1green: "for your business growth.",
    sub:     "One contract. Fixed cost. Full responsibility. Your IT runs predictably — you see everything through GoARKAN.",
    cta:     "Get a Commercial Proposal →",
    ctaNote: "We respond within one business day",
    chips: [
      { title: "IT Outsourcing",  sub: "& Support" },
      { title: "Infrastructure",  sub: "& Security" },
      { title: "Automation",      sub: "& Processes" },
      { title: "Cloud",           sub: "& Integration" },
    ],
    stats: [
      { val: "99.9%",   label: "SLA Reliability" },
      { val: "< 2h",    label: "First Response" },
      { val: "5 days",  label: "Avg. Launch Time" },
      { val: "100+",    label: "Clients across Uzbekistan" },
      { val: "24/7",    label: "Monitoring" },
    ],
  },
} as const;

function useTween(duration = 1400) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let id: number;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setProgress(p);
      if (p < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [duration]);
  return progress;
}

function BurstCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        canvas.width  = Math.round(rect.width  * dpr);
        canvas.height = Math.round(rect.height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };
    const ro = new ResizeObserver(() => requestAnimationFrame(resize));
    ro.observe(canvas);
    requestAnimationFrame(() => requestAnimationFrame(resize));

    type P = { angle: number; life: number; speed: number; wobble: number; size: number };
    const particles: P[] = Array.from({ length: 40 }, () => ({
      angle:  Math.random() * Math.PI * 2,
      life:   Math.random(),
      speed:  0.003 + Math.random() * 0.004,
      wobble: (Math.random() - 0.5) * 0.6,
      size:   1 + Math.random() * 1.5,
    }));

    let frame: number;
    const draw = () => {
      const w = canvas.width / dpr, h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2, maxR = Math.min(w, h) * 0.44;
      particles.forEach((p) => {
        p.life = (p.life + p.speed) % 1;
        const r = maxR * p.life;
        const a = p.angle + Math.sin(p.life * Math.PI * 4 + p.wobble) * 0.15;
        const alpha = p.life < 0.15 ? p.life / 0.15 : (1 - p.life) / 0.85;
        ctx.beginPath();
        ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79,209,138,${alpha * 0.7})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); ro.disconnect(); };
  }, []);
  return (
    <canvas ref={canvasRef} style={{
      position: "absolute", inset: "-40%", width: "180%", height: "180%",
      pointerEvents: "none", zIndex: 1,
    }} />
  );
}

const CHIP_POSITIONS = [
  { top: "6%",  left: "-2%" },
  { top: "6%",  right: "-4%" },
  { bottom: "10%", left: "-4%" },
  { bottom: "10%", right: "-2%" },
] as const;

const CHIP_ICONS = [
  <svg key="a" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4fd18a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 14v-2a9 9 0 0 1 18 0v2"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>,
  <svg key="b" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4fd18a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
  <svg key="c" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4fd18a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="12" cy="18" r="2.4"/><path d="M8 7.2 10.5 16M16 7.2 13.5 16M8.4 6h7.2"/></svg>,
  <svg key="d" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4fd18a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H8a5.5 5.5 0 1 1 1.3-10.8 6 6 0 0 1 11.4 2.4A4.3 4.3 0 0 1 17.5 19z"/></svg>,
];

export function HomeHero() {
  const { lang } = useApp();
  const c = COPY[lang] ?? COPY.ru;

  const videoRef = useRef<HTMLVideoElement>(null);
  const progress = useTween(1400);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;
    (vid as HTMLVideoElement & { defaultMuted: boolean }).defaultMuted = true;
    vid.loop = true;
    vid.play().catch(() => {});
    const onEnded = () => { vid.currentTime = 0.01; vid.play().catch(() => {}); };
    const onPause = () => { vid.play().catch(() => {}); };
    vid.addEventListener("ended", onEnded);
    vid.addEventListener("pause", onPause);
    const poll = setInterval(() => {
      if (vid.duration && vid.currentTime >= vid.duration - 0.08) vid.currentTime = 0.01;
      if (vid.paused) vid.play().catch(() => {});
    }, 200);
    return () => { clearInterval(poll); vid.removeEventListener("ended", onEnded); vid.removeEventListener("pause", onPause); };
  }, []);

  return (
    <section style={{
      position: "relative", padding: "120px clamp(20px,4vw,64px) 60px",
      overflow: "hidden", zIndex: 2, maxWidth: 1440, margin: "0 auto",
      backgroundImage: "radial-gradient(circle at 18% 22%, rgba(79,209,138,0.05), transparent 40%), linear-gradient(rgba(238,242,238,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(238,242,238,0.025) 1px, transparent 1px)",
      backgroundSize: "100% 100%, 64px 64px, 64px 64px",
    }}>
      <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: "clamp(24px,4vw,48px)", alignItems: "center" }}>

        {/* Left */}
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px",
            borderRadius: 100, border: "1px solid rgba(79,209,138,0.3)", background: "rgba(79,209,138,0.06)",
            marginBottom: 28, animation: `riseIn .9s ${EASE} both`,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4fd18a" }} />
            <span style={{ fontSize: 13, color: "#c3d0c8" }}>{c.badge}</span>
          </div>

          <h1 style={{
            fontSize: "clamp(36px,4.6vw,58px)", lineHeight: 1.1, fontWeight: 800,
            margin: "0 0 24px", letterSpacing: "-0.02em",
            animation: `riseIn .9s ${EASE} .1s both`,
            fontFamily: "var(--font-manrope), sans-serif",
          }}>
            {c.h1}{" "}
            <span style={{ color: "#4fd18a" }}>{c.h1green}</span>
          </h1>

          <p style={{
            fontSize: "clamp(15px,1.3vw,17px)", lineHeight: 1.65, color: "#9fb0a6",
            maxWidth: 480, margin: "0 0 36px",
            animation: `riseIn .9s ${EASE} .2s both`,
          }}>
            {c.sub}
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", animation: `riseIn .9s ${EASE} .3s both` }}>
            <Link href="/contact" style={{
              padding: "16px 32px", background: "#4fd18a", color: "#05080a",
              borderRadius: 100, fontWeight: 700, fontSize: 15,
              display: "inline-block", textDecoration: "none",
              transition: "background .2s, transform .2s",
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#7ee3ac"; el.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#4fd18a"; el.style.transform = ""; }}
            >
              {c.cta}
            </Link>
            <span style={{ fontSize: 13, color: "#748078" }}>{c.ctaNote}</span>
          </div>
        </div>

        {/* Right — video globe */}
        <div className="hero-globe" style={{ position: "relative", width: "100%", aspectRatio: "1/1" }}>
          <BurstCanvas />
          <div style={{
            position: "absolute", inset: "6%", borderRadius: "50%", pointerEvents: "none", zIndex: 1,
            background: "radial-gradient(circle, rgba(79,209,138,0) 62%, rgba(79,209,138,0.35) 78%, rgba(79,209,138,0) 92%)",
            filter: "blur(6px)", animation: "breathe 4s ease-in-out infinite",
          }} />
          <div style={{ position: "absolute", inset: "6%", borderRadius: "50%", overflow: "hidden", zIndex: 2 }}>
            <video ref={videoRef} autoPlay loop muted playsInline
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              src="/hero-globe.mp4"
            />
          </div>
          {c.chips.map((chip, i) => (
            <div key={i} style={{
              ...(CHIP_POSITIONS[i] as React.CSSProperties),
              position: "absolute", zIndex: 3,
              display: "flex", alignItems: "center", gap: 10, padding: "12px 18px",
              borderRadius: 16, background: "rgba(5,8,10,0.82)",
              border: "1px solid rgba(238,242,238,0.1)", backdropFilter: "blur(6px)",
              animation: `riseIn .8s ${EASE} ${0.4 + i * 0.1}s both`,
            }}>
              {CHIP_ICONS[i]}
              <div style={{ fontSize: 13, lineHeight: 1.3 }}>
                <div style={{ fontWeight: 700 }}>{chip.title}</div>
                <div style={{ color: "#9fb0a6" }}>{chip.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="hero-stats" style={{
        marginTop: 64, padding: "32px clamp(16px,3vw,40px)",
        borderRadius: 24, background: "#0b1210", border: "1px solid rgba(238,242,238,0.08)",
        display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 24,
        animation: `riseIn .9s ${EASE} .4s both`,
      }}>
        {c.stats.map(({ val: rawVal, label }, idx) => {
          // animate first two numeric stats; rest are static
          const animated = idx === 0
            ? `${(progress * 99.9).toFixed(1)}%`
            : idx === 1
              ? lang === "ru" ? `< ${Math.round(progress * 2)}ч` : lang === "uz" ? `< ${Math.round(progress * 2)} soat` : `< ${Math.round(progress * 2)}h`
              : rawVal;
          const icons = ["✓", "◔", "▤", "◆", "◐"];
          return (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ color: "#4fd18a", fontSize: 20 }}>{icons[idx]}</span>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "var(--font-manrope), sans-serif" }}>{animated}</div>
                <div style={{ fontSize: 12, color: "#748078" }}>{label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
