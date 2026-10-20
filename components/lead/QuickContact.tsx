"use client";

import Link from "@/components/ui/LocaleLink";
import { Phone, Send, FileText } from "lucide-react";
import { useApp } from "@/components/providers/ThemeLanguageProvider";
import { COMPANY } from "@/lib/company";
import { track } from "@/lib/track";

const T = {
  ru: { call: "Позвонить", tg: "Telegram", req: "Заявка", tgTip: "Написать в Telegram" },
  uz: { call: "Qo'ng'iroq", tg: "Telegram", req: "Ariza", tgTip: "Telegramga yozish" },
  en: { call: "Call", tg: "Telegram", req: "Request", tgTip: "Message us on Telegram" },
  zh: { call: "致电", tg: "Telegram", req: "留言", tgTip: "Telegram联系" },
};

/** Мобильная нижняя панель «Позвонить / Telegram / Заявка» + плавающая кнопка Telegram на десктопе. */
export function QuickContact() {
  const { lang } = useApp();
  const t = T[lang as keyof typeof T] ?? T.ru;
  return (
    <>
      <style>{`
        .qc-bar { display: none; }
        .qc-fab { position: fixed; right: 22px; bottom: 22px; z-index: 60; width: 56px; height: 56px; border-radius: 50%; background: #229ED9; color: #fff; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 28px rgba(34,158,217,.45); transition: transform .15s; }
        .qc-fab:hover { transform: translateY(-2px) scale(1.04); }
        @media (max-width: 767px) {
          .qc-fab { display: none; }
          .qc-bar { display: grid; grid-template-columns: 1fr 1fr 1.2fr; gap: 8px; position: fixed; left: 0; right: 0; bottom: 0; z-index: 60; padding: 10px 12px calc(10px + env(safe-area-inset-bottom)); background: rgba(5,8,10,.92); backdrop-filter: blur(14px); border-top: 1px solid var(--ark-border); }
          .qc-bar a { display: flex; align-items: center; justify-content: center; gap: 6px; height: 46px; border-radius: 12px; font-size: 14px; font-weight: 700; text-decoration: none; color: var(--ark-text); border: 1px solid var(--ark-border-strong); }
          .qc-bar a.tg { background: #229ED9; border-color: #229ED9; color: #fff; }
          .qc-bar a.req { background: var(--ark-accent); border-color: var(--ark-accent); color: #05080a; }
          .qc-spacer { height: calc(68px + env(safe-area-inset-bottom)); }
        }
      `}</style>
      <a className="qc-fab" href={COMPANY.telegram} target="_blank" rel="noopener" aria-label={t.tgTip} title={t.tgTip} onClick={() => track("click_telegram", { from: "fab" })}>
        <Send size={24} />
      </a>
      <div className="qc-spacer" aria-hidden="true" />
      <nav className="qc-bar" aria-label={t.req}>
        <a href={`tel:${COMPANY.phones[0]}`} onClick={() => track("click_phone", { from: "bar" })}><Phone size={16} />{t.call}</a>
        <a className="tg" href={COMPANY.telegram} target="_blank" rel="noopener" onClick={() => track("click_telegram", { from: "bar" })}><Send size={16} />{t.tg}</a>
        <Link className="req" href="/contact#lead-form"><FileText size={16} />{t.req}</Link>
      </nav>
    </>
  );
}
