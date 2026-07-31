"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useApp } from "@/components/providers/ThemeLanguageProvider";

const EASE = "cubic-bezier(.16,1,.3,1)";

// ── Hero visual configuration ──────────────────────────────────────────────────
// All visual parameters for the Hero globe animation and video treatment.
// Edit values here — the component reads exclusively from this object.
// Never put numeric literals for visuals directly in JSX below.
const HERO_VISUALS = {
  // BurstCanvas particle animation
  canvas: {
    count:      40,           // number of active particles
    speedMin:   0.003,        // life units per frame (min)
    speedMax:   0.007,        // life units per frame (max); actual = speedMin + rand*(speedMax-speedMin)
    wobble:     0.6,          // angle wobble amplitude in radians (±wobble/2 each side)
    sizeMin:    1,            // particle radius in px (min)
    sizeExtra:  1.5,          // additional random radius (max size = sizeMin + sizeExtra)
    alpha:      0.7,          // peak alpha multiplier for rgba fill
    maxRadius:  0.44,         // max orbit radius as fraction of Math.min(canvasW, canvasH)
    color:      "79,209,138", // RGB values only — used inside rgba(R,G,B,a)
  },
  // Outer glow ring (the green halo around the globe)
  glow: {
    ringOpacity:      0.35,   // peak opacity of the green ring at 78% stop
    blur:             "6px",  // CSS blur filter on the ring overlay
    breatheDuration:  "4s",   // CSS animation duration for the breathe keyframe
  },
  // <video> CSS filter — original video colours preserved
  video: {
    hueRotate:  0,            // deg — no hue shift, show natural colours
    saturate:   1.0,          // multiplier — natural saturation
    brightness: 0.88,         // multiplier — slightly dim
  },
  // Section background radial glow (subtle green at top-left)
  bg: {
    glowOpacity: 0.05,
  },
  // Counter tween on page load
  tween: {
    durationMs: 1400,
  },
} as const;

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
      { val: "95%",      label: "SLA выполнение" },
      { val: "< 30 мин", label: "Первый ответ" },
      { val: "14 дн.",   label: "Средний срок запуска" },
      { val: "GoARKAN", label: "ITSM-платформа" },
      { val: "24/7",  label: "Мониторинг" },
    ],
  },
  uz: {
    badge:   "Biznesingizga IT hamkor",
    h1:      "Texnologik hamkor",
    h1green: "biznesingizni rivojlantirish uchun.",
    sub:     "Bitta shartnoma. Belgilangan narx. To'liq mas'uliyat. IT'ingiz ishlaydi — GoARKAN orqali barchasini ko'rasiz.",
    cta:     "Taklif so'rash →",
    ctaNote: "Bir ish kuni ichida javob beramiz",
    chips: [
      { title: "IT Autsorsing",      sub: "va qo'llab-quvvatlash" },
      { title: "Infratuzilma",       sub: "va xavfsizlik" },
      { title: "Avtomatlashtirish",  sub: "va jarayonlar" },
      { title: "Bulut",              sub: "va integratsiya" },
    ],
    stats: [
      { val: "95%",          label: "SLA bajarish" },
      { val: "< 30 daqiqa", label: "Birinchi javob" },
      { val: "14 kun",       label: "O'rtacha onboarding" },
      { val: "GoARKAN", label: "ITSM platforma" },
      { val: "24/7",     label: "Monitoring" },
    ],
  },
  en: {
    badge:   "Your IT partner for business",
    h1:      "Technology Partner",
    h1green: "built to grow your business.",
    sub:     "One contract. Fixed price. Full accountability. Your IT runs predictably — with complete visibility through GoARKAN.",
    cta:     "Request a Proposal →",
    ctaNote: "We respond within one business day",
    chips: [
      { title: "IT Outsourcing",  sub: "& Support" },
      { title: "Infrastructure",  sub: "& Security" },
      { title: "Automation",      sub: "& Workflows" },
      { title: "Cloud",           sub: "& Integration" },
    ],
    stats: [
      { val: "95%",     label: "SLA Compliance" },
      { val: "< 30 min", label: "First Response" },
      { val: "14 days", label: "Average Onboarding" },
      { val: "GoARKAN", label: "ITSM Platform" },
      { val: "24/7",   label: "Monitoring" },
    ],
  },
} as const;

function useTween(duration = HERO_VISUALS.tween.durationMs) {
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

    const cv = HERO_VISUALS.canvas;
    type P = { angle: number; life: number; speed: number; wobble: number; size: number };
    const particles: P[] = Array.from({ length: cv.count }, () => ({
      angle:  Math.random() * Math.PI * 2,
      life:   Math.random(),
      speed:  cv.speedMin + Math.random() * (cv.speedMax - cv.speedMin),
      wobble: (Math.random() - 0.5) * cv.wobble,
      size:   cv.sizeMin + Math.random() * cv.sizeExtra,
    }));

    let frame: number;
    const draw = () => {
      const w = canvas.width / dpr, h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2, maxR = Math.min(w, h) * cv.maxRadius;
      particles.forEach((p) => {
        p.life = (p.life + p.speed) % 1;
        const r = maxR * p.life;
        const a = p.angle + Math.sin(p.life * Math.PI * 4 + p.wobble) * 0.15;
        const alpha = p.life < 0.15 ? p.life / 0.15 : (1 - p.life) / 0.85;
        ctx.beginPath();
        ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cv.color},${alpha * cv.alpha})`;
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
  const progress = useTween();

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;
    (vid as HTMLVideoElement & { defaultMuted: boolean }).defaultMuted = true;
    vid.loop = true;
    vid.play().catch(() => {});
    const onEnded = () => { vid.currentTime = 0.01; vid.play().catch(() => {}); };
    const onPause = () => { if (document.visibilityState !== "hidden") vid.play().catch(() => {}); };
    vid.addEventListener("ended", onEnded);
    vid.addEventListener("pause", onPause);
    return () => { vid.removeEventListener("ended", onEnded); vid.removeEventListener("pause", onPause); };
  }, []);

  const vf = HERO_VISUALS.video;
  const videoFilter = `hue-rotate(${vf.hueRotate}deg) saturate(${vf.saturate}) brightness(${vf.brightness})`;
  const gv = HERO_VISUALS.glow;
  const glowBg = `radial-gradient(circle, rgba(79,209,138,0) 62%, rgba(79,209,138,${gv.ringOpacity}) 78%, rgba(79,209,138,0) 92%)`;

  return (
    <section style={{
      position: "relative", padding: "64px clamp(20px,4vw,64px) 60px",
      overflow: "hidden", zIndex: 2, maxWidth: 1440, margin: "0 auto",
      backgroundImage: `radial-gradient(circle at 18% 22%, rgba(79,209,138,${HERO_VISUALS.bg.glowOpacity}), transparent 40%), linear-gradient(rgba(238,242,238,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(238,242,238,0.025) 1px, transparent 1px)`,
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
            fontSize: "clamp(36px,4.6vw,64px)", lineHeight: 1.06, fontWeight: 800,
            margin: "0 0 24px", letterSpacing: "-0.03em",
            animation: `riseIn .9s ${EASE} .1s both`,
            fontFamily: "var(--font-manrope), sans-serif",
          }}>
            <span style={{ display: "block" }}>{c.h1}</span>
            <span style={{ display: "block", color: "#9fb0a6", fontWeight: 700, fontSize: "0.78em", letterSpacing: "-0.02em", lineHeight: 1.2, marginTop: "0.1em" }}>{c.h1green}</span>
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
              transition: "background 150ms cubic-bezier(0.4,0,0.2,1), box-shadow 150ms cubic-bezier(0.4,0,0.2,1), transform 100ms cubic-bezier(0.4,0,0.2,1)",
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#7ee3ac"; el.style.boxShadow = "0 8px 24px rgba(79,209,138,0.4)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#4fd18a"; el.style.boxShadow = "none"; }}
              onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"; }}
              onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
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
            background: glowBg,
            filter: `blur(${gv.blur})`, animation: `breathe ${gv.breatheDuration} ease-in-out infinite`,
          }} />
          <div style={{ position: "absolute", inset: "6%", borderRadius: "50%", overflow: "hidden", zIndex: 2 }}>
            <video ref={videoRef} autoPlay loop muted playsInline
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: videoFilter }}
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
        borderRadius: 24, background: "#0b1210", border: "1px solid rgba(238,242,238,0.12)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
        display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 24,
        animation: `riseIn .9s ${EASE} .4s both`,
      }}>
        {c.stats.map(({ val: rawVal, label }, idx) => {
          const animated = idx === 0
            ? `${(progress * 95).toFixed(0)}%`
            : idx === 1
              ? lang === "ru" ? `< ${Math.round(progress * 30)} мин` : lang === "uz" ? `< ${Math.round(progress * 30)} daq` : `< ${Math.round(progress * 30)} min`
              : rawVal;
          const STAT_ICONS = [
            <svg key="s0" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2L3 5v5.5c0 3.87 2.98 7.5 7 8.5 4.02-1 7-4.63 7-8.5V5L10 2z" fill="rgba(79,209,138,0.12)" stroke="#4fd18a" strokeWidth="1.35" strokeLinejoin="round"/><path d="M7 10.5l2 2 4-4" stroke="#4fd18a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
            <svg key="s1" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="7.5" stroke="#4fd18a" strokeWidth="1.35"/><path d="M10 6.5V10.5l2.5 2" stroke="#4fd18a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
            <svg key="s2" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2.5" y="4.5" width="15" height="13" rx="2" stroke="#4fd18a" strokeWidth="1.35"/><path d="M2.5 8.5h15" stroke="#4fd18a" strokeWidth="1.2"/><path d="M7 2.5v3M13 2.5v3" stroke="#4fd18a" strokeWidth="1.5" strokeLinecap="round"/><rect x="6" y="11" width="2.5" height="2.5" rx="0.5" fill="#4fd18a" opacity="0.75"/></svg>,
            <svg key="s3" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2.5L17.5 7v6L10 17.5 2.5 13V7L10 2.5z" stroke="#4fd18a" strokeWidth="1.35" strokeLinejoin="round"/><path d="M2.5 7L10 11.5l7.5-4.5" stroke="#4fd18a" strokeWidth="1.1" opacity="0.55"/><line x1="10" y1="11.5" x2="10" y2="17.5" stroke="#4fd18a" strokeWidth="1.1" opacity="0.55"/></svg>,
            <svg key="s4" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M2 10s3-5.5 8-5.5S18 10 18 10s-3 5.5-8 5.5S2 10 2 10z" stroke="#4fd18a" strokeWidth="1.35"/><circle cx="10" cy="10" r="2.5" fill="rgba(79,209,138,0.2)" stroke="#4fd18a" strokeWidth="1.3"/></svg>,
          ];
          const isTextStat = idx === 3;
          return (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 10, background: "rgba(79,209,138,0.07)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {STAT_ICONS[idx]}
              </div>
              <div>
                <div style={{ fontSize: isTextStat ? 15 : 22, fontWeight: 800, fontFamily: "var(--font-manrope), sans-serif", letterSpacing: isTextStat ? "0.01em" : "-0.02em" }}>{animated}</div>
                <div style={{ fontSize: 11.5, color: "#748078", marginTop: 1 }}>{label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
