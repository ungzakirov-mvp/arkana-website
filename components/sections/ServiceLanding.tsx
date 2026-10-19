"use client";

import Link from "@/components/ui/LocaleLink";
import { useState } from "react";
import { Check, ChevronDown, Phone, Send, ArrowRight } from "lucide-react";
import { useApp } from "@/components/providers/ThemeLanguageProvider";
import { LeadForm } from "@/components/lead/LeadForm";
import { tr, type L } from "@/lib/pricing";
import { COMPANY } from "@/lib/company";
import { track } from "@/lib/track";
import { LANDINGS } from "@/lib/landings";

const UI = {
  cta: { ru: "Оставить заявку", uz: "Ariza qoldirish", en: "Leave a request" },
  faq: { ru: "Частые вопросы", uz: "Ko'p beriladigan savollar", en: "FAQ" },
  related: { ru: "Смотрите также", uz: "Shuningdek", en: "See also" },
  why: { ru: "Почему ARKANA", uz: "Nega ARKANA", en: "Why ARKANA" },
  whyItems: [
    { ru: "Договор, акт и счёт по каждой работе", uz: "Har bir ish uchun shartnoma, dalolatnoma va hisob", en: "Contract, act and invoice for every job" },
    { ru: "Каждая заявка с номером и историей в GoARKAN", uz: "Har bir ariza GoARKAN da raqam va tarix bilan", en: "Every request numbered and tracked in GoARKAN" },
    { ru: "Цена согласуется до начала работ", uz: "Narx ish boshlanishidan oldin kelishiladi", en: "Price agreed before work starts" },
    { ru: "Telegram, телефон или сайт — как удобно", uz: "Telegram, telefon yoki sayt — qanday qulay", en: "Telegram, phone or website — your choice" },
  ],
} satisfies Record<string, L | L[]>;

export function ServiceLanding({ slug }: { slug: string }) {
  const d = LANDINGS[slug];
  const { lang } = useApp();
  const t = (v: L) => tr(v, lang);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <style>{`
        .sl-wrap { max-width: 76rem; margin: 0 auto; padding: 0 1.25rem; }
        .sl-hero { padding: 104px 0 56px; position: relative; overflow: hidden; }
        .sl-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 40px; align-items: start; }
        @media (max-width: 960px) { .sl-grid { grid-template-columns: 1fr; } .sl-hero { padding-top: 92px; } }
        .sl-h1 { font-family: Nacelle, sans-serif; font-weight: 600; font-size: clamp(2rem, 4.6vw, 3.1rem); letter-spacing: -0.04em; line-height: 1.08; margin: 0 0 18px; color: var(--ark-text-heading); }
        .sl-sub { font-size: 17px; color: var(--ark-text-muted); line-height: 1.65; margin: 0 0 22px; max-width: 600px; }
        .sl-points { list-style: none; padding: 0; margin: 0 0 26px; display: flex; flex-direction: column; gap: 10px; }
        .sl-points li { display: flex; gap: 10px; align-items: center; font-size: 15px; color: var(--ark-text-dim); }
        .sl-actions { display: flex; flex-wrap: wrap; gap: 10px; }
        .sl-btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 20px; border-radius: 12px; font-weight: 700; font-size: 15px; text-decoration: none; border: 1px solid var(--ark-border-strong); color: var(--ark-text); }
        .sl-btn.primary { background: var(--ark-accent); border-color: var(--ark-accent); color: #05080a; }
        .sl-btn.tg { background: #229ED9; border-color: #229ED9; color: #fff; }
        .sl-section { padding: 64px 0 0; }
        .sl-h2 { font-family: Nacelle, sans-serif; font-weight: 600; font-size: clamp(1.5rem, 3vw, 2.1rem); letter-spacing: -0.03em; color: var(--ark-text-heading); margin: 0 0 24px; }
        .sl-cards { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 16px; }
        @media (max-width: 960px) { .sl-cards { grid-template-columns: repeat(2, minmax(0,1fr)); } }
        @media (max-width: 620px) { .sl-cards { grid-template-columns: 1fr; } }
        .sl-card { background: var(--ark-card); border: 1px solid var(--ark-border); border-radius: 16px; padding: 22px; }
        .sl-card h3 { font-size: 16px; font-weight: 700; color: var(--ark-text-heading); margin: 0 0 8px; }
        .sl-card p { font-size: 14px; color: var(--ark-text-muted); line-height: 1.6; margin: 0; }
        .sl-steps { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 16px; counter-reset: s; }
        @media (max-width: 960px) { .sl-steps { grid-template-columns: repeat(2, minmax(0,1fr)); } }
        @media (max-width: 520px) { .sl-steps { grid-template-columns: 1fr; } }
        .sl-step { position: relative; padding: 22px; border-radius: 16px; border: 1px solid var(--ark-border); background: var(--ark-bg-2); }
        .sl-step::before { counter-increment: s; content: counter(s); display: flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 50%; background: var(--ark-accent); color: #05080a; font-weight: 800; font-size: 14px; margin-bottom: 12px; }
        .sl-step h3 { font-size: 15px; font-weight: 700; color: var(--ark-text-heading); margin: 0 0 6px; }
        .sl-step p { font-size: 13.5px; color: var(--ark-text-muted); line-height: 1.55; margin: 0; }
        .sl-faq { border: 1px solid var(--ark-border); border-radius: 14px; overflow: hidden; background: var(--ark-card); }
        .sl-faq button { width: 100%; display: flex; justify-content: space-between; gap: 12px; align-items: center; padding: 18px 20px; background: none; border: none; border-top: 1px solid var(--ark-line); color: var(--ark-text); font-size: 15px; font-weight: 600; text-align: left; cursor: pointer; font-family: inherit; }
        .sl-faq > div:first-child button { border-top: none; }
        .sl-faq .a { padding: 0 20px 18px; font-size: 14.5px; color: var(--ark-text-muted); line-height: 1.65; }
        .sl-why { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 12px; }
        @media (max-width: 620px) { .sl-why { grid-template-columns: 1fr; } }
        .sl-why div { display: flex; gap: 10px; align-items: flex-start; font-size: 15px; color: var(--ark-text-dim); padding: 14px 16px; border-radius: 12px; border: 1px solid var(--ark-border); }
        .sl-rel { display: flex; flex-wrap: wrap; gap: 10px; }
        .sl-rel a { color: var(--ark-accent-2); text-decoration: none; padding: 9px 14px; border: 1px solid var(--ark-border); border-radius: 999px; font-size: 14px; }
        .sl-rel a:hover { border-color: var(--ark-accent); }
      `}</style>

      <section className="sl-hero">
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 20% -10%, rgba(79,209,138,0.12), transparent)", pointerEvents: "none" }} />
        <div className="sl-wrap sl-grid" style={{ position: "relative" }}>
          <div>
            <div className="ark-badge" style={{ marginBottom: 18 }}><span style={{ fontSize: 12, fontWeight: 500, color: "var(--ark-accent-2)" }}>{t(d.badge)}</span></div>
            <h1 className="sl-h1">{t(d.h1)}</h1>
            <p className="sl-sub">{t(d.sub)}</p>
            <ul className="sl-points">{d.points.map((p) => <li key={p.ru}><Check size={18} strokeWidth={2.5} style={{ color: "var(--ark-accent)" }} />{t(p)}</li>)}</ul>
            <div className="sl-actions">
              <a href="#lead-form" className="sl-btn primary">{t(UI.cta)} <ArrowRight size={16} /></a>
              <a href={`tel:${COMPANY.phones[0]}`} className="sl-btn" onClick={() => track("click_phone", { from: slug })}><Phone size={16} />{COMPANY.phonesDisplay[0]}</a>
              <a href={COMPANY.telegram} target="_blank" rel="noopener" className="sl-btn tg" onClick={() => track("click_telegram", { from: slug })}><Send size={16} />Telegram</a>
            </div>
          </div>
          <LeadForm service={d.service} title={t(d.formTitle)} showContacts={false} />
        </div>
      </section>

      <section className="sl-section">
        <div className="sl-wrap">
          <h2 className="sl-h2">{t(d.whatTitle)}</h2>
          <div className="sl-cards">{d.what.map((w) => <div key={w.t.ru} className="sl-card"><h3>{t(w.t)}</h3><p>{t(w.d)}</p></div>)}</div>
        </div>
      </section>

      <section className="sl-section">
        <div className="sl-wrap">
          <h2 className="sl-h2">{t(d.stepsTitle)}</h2>
          <div className="sl-steps">{d.steps.map((s) => <div key={s.t.ru} className="sl-step"><h3>{t(s.t)}</h3><p>{t(s.d)}</p></div>)}</div>
        </div>
      </section>

      <section className="sl-section">
        <div className="sl-wrap">
          <h2 className="sl-h2">{t(UI.why)}</h2>
          <div className="sl-why">{UI.whyItems.map((w) => <div key={w.ru}><Check size={18} strokeWidth={2.5} style={{ color: "var(--ark-accent)", flexShrink: 0, marginTop: 2 }} />{t(w)}</div>)}</div>
        </div>
      </section>

      <section className="sl-section">
        <div className="sl-wrap" style={{ maxWidth: "56rem" }}>
          <h2 className="sl-h2">{t(UI.faq)}</h2>
          <div className="sl-faq">
            {d.faq.map((f, i) => (
              <div key={f.q.ru}>
                <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
                  {t(f.q)}
                  <ChevronDown size={18} style={{ flexShrink: 0, transition: "transform .2s", transform: open === i ? "rotate(180deg)" : "none", color: "var(--ark-text-muted)" }} />
                </button>
                <div className="a" hidden={open !== i}>{t(f.a)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sl-section" style={{ paddingBottom: 96 }}>
        <div className="sl-wrap">
          <h2 className="sl-h2" style={{ fontSize: "1.25rem" }}>{t(UI.related)}</h2>
          <div className="sl-rel">{d.related.map((r) => <Link key={r.href} href={r.href}>{t(r.label)} →</Link>)}</div>
        </div>
      </section>
    </>
  );
}
