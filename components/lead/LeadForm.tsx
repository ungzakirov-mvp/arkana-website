"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, AlertCircle, Send, Phone } from "lucide-react";
import { submitContact, type ContactFormState } from "@/app/actions/contact";
import { useApp } from "@/components/providers/ThemeLanguageProvider";
import { COMPANY } from "@/lib/company";
import { track } from "@/lib/track";

export const SERVICES = [
  { v: "subscription", ru: "IT-обслуживание по подписке", uz: "Obuna bo'yicha IT xizmat", en: "IT support subscription", zh: "IT订阅服务" },
  { v: "on-demand", ru: "Разовый выезд мастера", uz: "Bir martalik usta chaqirish", en: "One-off call-out", zh: "单次上门" },
  { v: "project", ru: "Проект: сеть, сервер, Wi-Fi, камеры", uz: "Loyiha: tarmoq, server, Wi-Fi, kamera", en: "Project: network, server, Wi-Fi, CCTV", zh: "项目：网络、服务器、Wi-Fi、监控" },
  { v: "bot", ru: "Telegram-бот", uz: "Telegram-bot", en: "Telegram bot", zh: "Telegram机器人" },
  { v: "goarkan", ru: "GoARKAN — цифровой офис", uz: "GoARKAN — raqamli ofis", en: "GoARKAN digital office", zh: "GoARKAN数字办公室" },
  { v: "development", ru: "Разработка: сайт, CRM, интеграции", uz: "Dasturlash: sayt, CRM, integratsiya", en: "Development: web, CRM, integrations", zh: "开发：网站、CRM、集成" },
  { v: "other", ru: "Другое / не знаю", uz: "Boshqa / bilmayman", en: "Other / not sure", zh: "其他 / 不确定" },
] as const;

const T = {
  ru: { title: "Оставьте заявку — перезвоним", sub: "Ответим в течение рабочего дня. Без спама и обязательств.", name: "Имя", phone: "Телефон", company: "Компания", email: "Email", service: "Что нужно", msg: "Коротко о задаче", opt: "необязательно", send: "Отправить заявку", sending: "Отправляем…", okT: "Заявка отправлена!", okS: "Свяжемся с вами в течение рабочего дня. Срочно — звоните или пишите в Telegram.", or: "или сразу", call: "Позвонить", tg: "Telegram", rl: "Слишком много заявок с вашего адреса. Позвоните нам.", consent: "Нажимая кнопку, вы соглашаетесь на обработку персональных данных." },
  uz: { title: "Ariza qoldiring — qo'ng'iroq qilamiz", sub: "Bir ish kuni ichida javob beramiz. Spam va majburiyatsiz.", name: "Ism", phone: "Telefon", company: "Kompaniya", email: "Email", service: "Nima kerak", msg: "Vazifa haqida qisqacha", opt: "ixtiyoriy", send: "Ariza yuborish", sending: "Yuborilmoqda…", okT: "Ariza yuborildi!", okS: "Bir ish kuni ichida bog'lanamiz. Shoshilinch bo'lsa — qo'ng'iroq qiling yoki Telegramga yozing.", or: "yoki darhol", call: "Qo'ng'iroq", tg: "Telegram", rl: "Juda ko'p ariza. Bizga qo'ng'iroq qiling.", consent: "Tugmani bosib, shaxsiy ma'lumotlarni qayta ishlashga rozilik bildirasiz." },
  en: { title: "Leave a request — we'll call back", sub: "We reply within one business day. No spam, no commitment.", name: "Name", phone: "Phone", company: "Company", email: "Email", service: "What you need", msg: "Briefly about the task", opt: "optional", send: "Send request", sending: "Sending…", okT: "Request sent!", okS: "We'll get back within one business day. Urgent? Call or message us on Telegram.", or: "or right now", call: "Call", tg: "Telegram", rl: "Too many requests. Please call us.", consent: "By submitting you agree to the processing of personal data." },
  zh: { title: "留下需求 — 我们回电", sub: "一个工作日内回复。无垃圾信息，无需承诺。", name: "姓名", phone: "电话", company: "公司", email: "邮箱", service: "需要什么", msg: "简述需求", opt: "可选", send: "提交", sending: "提交中…", okT: "已提交！", okS: "我们将在一个工作日内联系您。紧急请致电或Telegram。", or: "或直接", call: "致电", tg: "Telegram", rl: "请求过多，请致电。", consent: "提交即表示同意处理个人数据。" },
};

const INITIAL: ContactFormState = { status: "idle" };
const UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content"];

/** Подставить тариф/услугу в форму из кнопки на странице. */
export function selectPlan(plan: string) {
  window.dispatchEvent(new CustomEvent("ark-plan", { detail: plan }));
}

const guessService = (p: string) =>
  p.startsWith("bot") ? "bot" : p.startsWith("goarkan") ? "goarkan" : p === "on-demand" ? "on-demand" : p === "project" ? "project" : ["start", "business", "enterprise"].includes(p) ? "subscription" : "";

type Props = { service?: string; plan?: string; title?: string; sub?: string; showContacts?: boolean; id?: string };

export function LeadForm({ service, plan, title, sub, showContacts = true, id = "lead-form" }: Props) {
  const { lang } = useApp();
  const t = T[lang as keyof typeof T] ?? T.ru;
  const [state, action, pending] = useActionState(submitContact, INITIAL);
  const formRef = useRef<HTMLFormElement>(null);
  const [svc, setSvc] = useState(service ?? "");

  // Скрытые поля (страница, источник, UTM, тариф) заполняем напрямую в DOM — без лишних ререндеров.
  useEffect(() => {
    const setField = (k: string, v: string) => {
      const el = formRef.current?.elements.namedItem(k) as HTMLInputElement | null;
      if (el) el.value = v;
    };
    const q = new URLSearchParams(window.location.search);
    setField("page", window.location.pathname + window.location.search);
    setField("ref", document.referrer);
    for (const k of UTM) {
      const v = q.get(k) ?? sessionStorageGet(k);
      if (v) { setField(k, v); sessionStorageSet(k, v); }
    }
    const onPlan = (e: Event) => {
      const p = (e as CustomEvent<string>).detail;
      if (!plan) setField("plan", p);
      if (!service && guessService(p)) setSvc(guessService(p));
    };
    window.addEventListener("ark-plan", onPlan);
    const qp = q.get("plan");
    if (qp) selectPlan(qp);
    return () => window.removeEventListener("ark-plan", onPlan);
  }, [plan, service, state.status]);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      track("lead_submit", { service: svc || "none" });
    }
  }, [state.status, svc]);

  const err = (f: string) => (state.status === "error" ? state.errors?.[f]?.[0] : undefined);
  const svcLabel = SERVICES.find((s) => s.v === svc);

  return (
    <div id={id} className="lf-card" style={{ scrollMarginTop: 96 }}>
      <style>{`
        .lf-card { border-radius: 18px; background: var(--ark-card); border: 1px solid var(--ark-border-strong); padding: clamp(20px, 4vw, 32px); }
        .lf-h { font-family: Nacelle, sans-serif; font-weight: 600; font-size: 1.35rem; color: var(--ark-text-heading); margin: 0 0 6px; letter-spacing: -0.02em; }
        .lf-sub { font-size: 14px; color: var(--ark-text-muted); margin: 0 0 20px; line-height: 1.55; }
        .lf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media (max-width: 560px) { .lf-grid { grid-template-columns: 1fr; } }
        .lf-f label { display: block; font-size: 12px; font-weight: 600; color: var(--ark-text-muted); margin-bottom: 6px; }
        .lf-f label span { font-weight: 400; color: var(--ark-text-faint); }
        .lf-in { width: 100%; box-sizing: border-box; padding: 12px 13px; border-radius: 10px; background: var(--ark-bg-2); border: 1px solid var(--ark-border); color: var(--ark-text); font-size: 16px; font-family: inherit; outline: none; transition: border-color .15s; }
        .lf-in:focus { border-color: var(--ark-accent); }
        .lf-in.bad { border-color: #f87171; }
        .lf-e { font-size: 12px; color: #f87171; margin-top: 4px; }
        .lf-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 14px; border-radius: 12px; background: var(--ark-accent); color: #05080a; font-weight: 700; font-size: 15px; border: none; cursor: pointer; transition: opacity .15s, transform .1s; }
        .lf-btn:hover { opacity: .9; transform: translateY(-1px); }
        .lf-btn[disabled] { opacity: .6; cursor: wait; }
        .lf-alt { display: flex; gap: 10px; margin-top: 14px; align-items: center; flex-wrap: wrap; font-size: 13px; color: var(--ark-text-sub); }
        .lf-alt a { display: inline-flex; align-items: center; gap: 6px; padding: 8px 12px; border-radius: 10px; border: 1px solid var(--ark-border-strong); color: var(--ark-text); text-decoration: none; font-weight: 600; }
        .lf-alt a:hover { border-color: var(--ark-accent); }
        .lf-note { font-size: 11.5px; color: var(--ark-text-faint); margin-top: 12px; text-align: center; }
      `}</style>

      {state.status === "success" ? (
        <div style={{ textAlign: "center", padding: "36px 8px" }}>
          <CheckCircle2 size={48} style={{ color: "var(--ark-accent)", margin: "0 auto 14px" }} />
          <h3 className="lf-h">{t.okT}</h3>
          <p className="lf-sub" style={{ marginBottom: 0 }}>{t.okS}</p>
          {showContacts && <ContactButtons t={t} center />}
        </div>
      ) : (
        <form ref={formRef} action={action} noValidate>
          <h3 className="lf-h">{title ?? t.title}</h3>
          <p className="lf-sub">{sub ?? t.sub}</p>

          {state.status === "error" && state.message && (
            <div role="alert" style={{ display: "flex", gap: 8, padding: "10px 14px", borderRadius: 10, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", marginBottom: 14, fontSize: 13, color: "#f87171" }}>
              <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />{state.message}
            </div>
          )}
          {state.status === "rate_limited" && (
            <div role="alert" style={{ padding: "10px 14px", borderRadius: 10, background: "rgba(245,158,11,0.1)", marginBottom: 14, fontSize: 13, color: "#fbbf24" }}>{t.rl}</div>
          )}

          <input type="text" name="website" style={{ display: "none" }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <input type="hidden" name="lang" value={lang} />
          <input type="hidden" name="plan" defaultValue={plan ?? ""} />
          <input type="hidden" name="service" value={svcLabel ? svcLabel.ru : ""} />
          {["page", "ref", ...UTM].map((k) => <input key={k} type="hidden" name={k} defaultValue="" />)}

          <div className="lf-grid">
            <div className="lf-f">
              <label htmlFor={`${id}-name`}>{t.name} *</label>
              <input id={`${id}-name`} className={`lf-in${err("name") ? " bad" : ""}`} name="name" autoComplete="name" required minLength={2} />
              {err("name") && <div className="lf-e">{err("name")}</div>}
            </div>
            <div className="lf-f">
              <label htmlFor={`${id}-phone`}>{t.phone} *</label>
              <input id={`${id}-phone`} className={`lf-in${err("phone") ? " bad" : ""}`} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+998 __ ___ __ __" defaultValue="+998 " required />
              {err("phone") && <div className="lf-e">{err("phone")}</div>}
            </div>
            <div className="lf-f" style={{ gridColumn: "1 / -1" }}>
              <label htmlFor={`${id}-svc`}>{t.service}</label>
              <select id={`${id}-svc`} className="lf-in" value={svc} onChange={(e) => setSvc(e.target.value)}>
                <option value="">—</option>
                {SERVICES.map((s) => <option key={s.v} value={s.v}>{(s as Record<string, string>)[lang] ?? s.ru}</option>)}
              </select>
            </div>
            <div className="lf-f">
              <label htmlFor={`${id}-company`}>{t.company} <span>({t.opt})</span></label>
              <input id={`${id}-company`} className="lf-in" name="company" autoComplete="organization" />
            </div>
            <div className="lf-f">
              <label htmlFor={`${id}-email`}>{t.email} <span>({t.opt})</span></label>
              <input id={`${id}-email`} className={`lf-in${err("email") ? " bad" : ""}`} name="email" type="email" autoComplete="email" />
              {err("email") && <div className="lf-e">{err("email")}</div>}
            </div>
            <div className="lf-f" style={{ gridColumn: "1 / -1" }}>
              <label htmlFor={`${id}-msg`}>{t.msg} <span>({t.opt})</span></label>
              <textarea id={`${id}-msg`} className="lf-in" name="message" rows={3} style={{ resize: "vertical" }} />
            </div>
          </div>

          <button type="submit" className="lf-btn" disabled={pending} style={{ marginTop: 18 }}>
            {pending ? t.sending : <>{t.send} <ArrowRight size={16} /></>}
          </button>
          {showContacts && <ContactButtons t={t} />}
          <p className="lf-note">{t.consent}</p>
        </form>
      )}
    </div>
  );
}

function ContactButtons({ t, center }: { t: (typeof T)["ru"]; center?: boolean }) {
  return (
    <div className="lf-alt" style={center ? { justifyContent: "center" } : undefined}>
      <span>{t.or}</span>
      <a href={`tel:${COMPANY.phones[0]}`} onClick={() => track("click_phone")}><Phone size={14} /> {COMPANY.phonesDisplay[0]}</a>
      <a href={COMPANY.telegram} target="_blank" rel="noopener" onClick={() => track("click_telegram")}><Send size={14} /> {t.tg}</a>
    </div>
  );
}

function sessionStorageGet(k: string) {
  try { return sessionStorage.getItem(`ark_${k}`); } catch { return null; }
}
function sessionStorageSet(k: string, v: string) {
  try { sessionStorage.setItem(`ark_${k}`, v); } catch { /* ignore */ }
}
