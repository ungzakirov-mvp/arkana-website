"use client";

import { useActionState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, CheckCircle2, ArrowRight, Send, AlertCircle } from "lucide-react";
import { submitContact, type ContactFormState } from "@/app/actions/contact";
import { useApp } from "@/components/providers/ThemeLanguageProvider";
import type { SiteSettings } from "@/lib/cms-api";

const EASE = [0.16, 1, 0.3, 1] as const;

const COPY: Record<string, {
  badge: string; h1a: string; h1b: string; sub: string;
  howTitle: string; phone: string; telegram: string; email: string; address: string; hours: string;
  nextTitle: string; next: { title: string; desc: string }[];
  youGet: string; items: string[];
  formTitle: string; success: string; successSub: string;
  sending: string; submit: string; disclaimer: string;
  name: string; namePh: string; company: string; companyPh: string;
  emailLabel: string; emailPh: string; phoneLabel: string; phonePh: string;
  message: string; messagePh: string;
}> = {
  ru: {
    badge: "Контакты",
    h1a: "Получите коммерческое",
    h1b: "предложение за 1 день",
    sub: "Расскажите о вашем бизнесе. Подберём решение и подготовим предложение без обязательств.",
    howTitle: "Как с нами связаться",
    phone: "Телефон", telegram: "Telegram", email: "Email", address: "Адрес", hours: "Режим работы",
    nextTitle: "Что будет дальше",
    next: [
      { title: "Отвечаем", desc: "В течение рабочего дня — звонок или сообщение в Telegram" },
      { title: "Изучаем ситуацию", desc: "Разбираемся в вашем бизнесе и IT-задачах" },
      { title: "Готовим предложение", desc: "Письменный расчёт и план работы. Без давления." },
    ],
    youGet: "Что вы получите",
    items: ["Анализ текущей IT-ситуации", "Коммерческое предложение под ваш бизнес", "Рекомендации по развитию IT", "Без обязательств"],
    formTitle: "Запросить коммерческое предложение",
    success: "Заявка отправлена!", successSub: "Мы свяжемся с вами в течение рабочего дня.",
    sending: "Отправляем...", submit: "Отправить заявку", disclaimer: "Отвечаем в течение рабочего дня · Без спама · Без обязательств",
    name: "Ваше имя *", namePh: "Иван Иванов",
    company: "Компания *", companyPh: "ООО Ваша Компания",
    emailLabel: "Email *", emailPh: "ivan@company.uz",
    phoneLabel: "Телефон", phonePh: "+998 90 123-45-67",
    message: "Расскажите о задаче (необязательно)", messagePh: "Кратко о вашем бизнесе и IT-задачах...",
  },
  en: {
    badge: "Contact",
    h1a: "Get a commercial",
    h1b: "proposal in 1 day",
    sub: "Tell us about your business. We'll find the right fit and put together a proposal — no commitment required.",
    howTitle: "How to reach us",
    phone: "Phone", telegram: "Telegram", email: "Email", address: "Address", hours: "Working hours",
    nextTitle: "What happens next",
    next: [
      { title: "We respond", desc: "Within one business day — by phone or Telegram" },
      { title: "We assess your needs", desc: "We dig into your business context and IT priorities" },
      { title: "We send a proposal", desc: "A scoped, written plan — no vague estimates, no pressure." },
    ],
    youGet: "What you get",
    items: ["A clear picture of your current IT environment", "A proposal tailored to your business", "Actionable IT recommendations", "No obligation"],
    formTitle: "Request a proposal",
    success: "Request received!", successSub: "We'll be in touch within one business day.",
    sending: "Sending...", submit: "Send request", disclaimer: "Reply within 1 business day · No spam · No obligation",
    name: "Your name *", namePh: "John Smith",
    company: "Company *", companyPh: "Your Company LLC",
    emailLabel: "Email *", emailPh: "john@company.uz",
    phoneLabel: "Phone", phonePh: "+998 90 123-45-67",
    message: "Describe your task (optional)", messagePh: "Brief about your business and IT needs...",
  },
  uz: {
    badge: "Aloqa",
    h1a: "1 kunda tijorat",
    h1b: "taklifini oling",
    sub: "Biznesingiz haqida ayting. Yechim topamiz va majburiyatsiz taklif tayyorlaymiz.",
    howTitle: "Biz bilan bog'laning",
    phone: "Telefon", telegram: "Telegram", email: "Email", address: "Manzil", hours: "Ish vaqti",
    nextTitle: "Keyin nima bo'ladi",
    next: [
      { title: "Javob beramiz", desc: "Bir ish kuni ichida — qo'ng'iroq yoki Telegram xabari" },
      { title: "Ehtiyojlarni aniqlaymiz", desc: "Biznesingiz va IT vaziyatingizni chuqurroq o'rganamiz" },
      { title: "Taklif tayyorlaymiz", desc: "Aniq hisob-kitob va ish rejasi. Majburiyat yo'q." },
    ],
    youGet: "Nima olasiz",
    items: ["Joriy IT muhitingizning aniq tasviri", "Biznesingizga moslashtirilgan taklif", "Amaliy IT tavsiyalar", "Majburiyatsiz"],
    formTitle: "Taklif so'rash",
    success: "Ariza qabul qilindi!", successSub: "Bir ish kuni ichida siz bilan bog'lanamiz.",
    sending: "Yuborilmoqda...", submit: "Ariza yuborish", disclaimer: "1 ish kuni ichida javob · Spam yo'q · Majburiyatsiz",
    name: "Ismingiz *", namePh: "Alisher Umarov",
    company: "Kompaniya *", companyPh: "Sizning kompaniyangiz",
    emailLabel: "Email *", emailPh: "alisher@company.uz",
    phoneLabel: "Telefon", phonePh: "+998 90 123-45-67",
    message: "Vazifani tasvirlab bering (ixtiyoriy)", messagePh: "Biznesingiz va IT ehtiyojlaringiz haqida qisqacha...",
  },
  zh: {
    badge: "联系我们",
    h1a: "1天内获取",
    h1b: "商务方案",
    sub: "告诉我们您的业务情况。我们将为您量身定制解决方案并准备好报价——无需任何承诺。",
    howTitle: "如何联系我们",
    phone: "电话", telegram: "Telegram", email: "邮箱", address: "地址", hours: "工作时间",
    nextTitle: "后续流程",
    next: [
      { title: "及时回复", desc: "一个工作日内——电话或Telegram联系" },
      { title: "了解需求", desc: "深入了解您的业务背景与IT优先事项" },
      { title: "提交方案", desc: "书面方案与工作计划——清晰明确，无压力。" },
    ],
    youGet: "您将获得",
    items: ["当前IT环境的清晰分析", "量身定制的商务方案", "可落地的IT建议", "无需任何承诺"],
    formTitle: "申请商务方案",
    success: "申请已提交！", successSub: "我们将在一个工作日内与您联系。",
    sending: "提交中...", submit: "提交申请", disclaimer: "1个工作日内回复 · 无垃圾邮件 · 无需承诺",
    name: "您的姓名 *", namePh: "张三",
    company: "公司 *", companyPh: "您的公司名称",
    emailLabel: "邮箱 *", emailPh: "zhangsan@company.uz",
    phoneLabel: "电话", phonePh: "+998 90 123-45-67",
    message: "描述您的需求（可选）", messagePh: "简要介绍您的业务与IT需求...",
  },
};

function buildContacts(s: SiteSettings | null | undefined, c: typeof COPY["ru"], lang: string) {
  const fallbackPhones = [
    { label: "Телефон", value: "+998 99 998 17 77", href: "tel:+998999981777" },
    { label: "Телефон", value: "+998 50 120 88 88", href: "tel:+998501208888" },
  ];
  const phonesArr = s?.phones?.length ? s.phones : fallbackPhones;
  const email     = s?.emails?.[0]?.value    ?? "info@arkana.uz";
  const emailHref = s?.emails?.[0]?.href     ?? "mailto:info@arkana.uz";
  const tg        = s?.telegram               ?? "@arkana_uz";
  const tgHref    = s?.telegram_href          ?? "https://t.me/arkana_uz";
  const hoursFallback: Record<string, string> = { ru: "Пн–Пт: 9:00–18:00", en: "Mon–Fri: 9:00–18:00", uz: "Du–Ju: 9:00–18:00", zh: "周一至周五：9:00–18:00" };
  const hoursStr  = s?.working_hours ? Object.entries(s.working_hours).map(([d, h]) => `${d}: ${h}`).join(", ") : (hoursFallback[lang] ?? "Пн–Пт: 9:00–18:00");
  return [
    ...phonesArr.map(p => ({ icon: Phone, label: c.phone, value: p.value, href: p.href })),
    { icon: Send,   label: c.telegram, value: tg,       href: tgHref    },
    { icon: Mail,   label: c.email,    value: email,    href: emailHref },
    { icon: Clock,  label: c.hours,    value: hoursStr, href: "#"       },
  ] as { icon: typeof Phone; label: string; value: string; href: string }[];
}

const INITIAL_STATE: ContactFormState = { status: "idle" };

export function ContactPageSection({ settings }: { settings?: SiteSettings | null }) {
  const { lang } = useApp();
  const c = COPY[lang] ?? COPY.ru;
  const [state, action, pending] = useActionState(submitContact, INITIAL_STATE);
  const formRef = useRef<HTMLFormElement>(null);
  const CONTACTS = buildContacts(settings, c, lang);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

  const fieldError = (field: string): string | undefined => {
    if (state.status === "error") return state.errors?.[field]?.[0];
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ padding: "96px 0 64px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.12), transparent)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem", position: "relative", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: EASE }}>
            <div className="ark-badge" style={{ justifyContent: "center", marginBottom: 24 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ark-accent-2)" }}>{c.badge}</span>
            </div>
            <h1 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 16 }}>
              <span className="heading-gradient">{c.h1a}</span>
              <br />
              <span style={{ color: "var(--ark-text)" }}>{c.h1b}</span>
            </h1>
            <p style={{ fontSize: 16, color: "var(--ark-text-muted)", lineHeight: 1.65, maxWidth: 480, margin: "0 auto" }}>
              {c.sub}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "0 0 96px" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-12 items-start">

            {/* Left */}
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: EASE }}>
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "1.375rem", color: "var(--ark-text)", marginBottom: 24 }}>
                  {c.howTitle}
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {CONTACTS.map(({ icon: Icon, label, value, href }) => (
                    <a key={value} href={href}
                      style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 16px", borderRadius: 12, background: "var(--ark-card)", border: "1px solid var(--ark-card-border)", textDecoration: "none", transition: "border-color 150ms cubic-bezier(0.4,0,0.2,1), transform 150ms cubic-bezier(0.4,0,0.2,1)" }}
                      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--ark-accent)"; el.style.transform = "translateX(3px)"; }}
                      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--ark-card-border)"; el.style.transform = ""; }}
                    >
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--ark-accent-glow)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon size={16} style={{ color: "var(--ark-accent-2)" }} />
                      </div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ark-text-muted)", marginBottom: 2 }}>{label}</div>
                        <div style={{ fontSize: 14, color: "var(--ark-text)", fontWeight: 500 }}>{value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ark-text-muted)", marginBottom: 16 }}>
                  {c.nextTitle}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {c.next.map(({ title, desc }, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--ark-accent)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                        {i + 1}
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ark-text)", marginBottom: 2 }}>{title}</div>
                        <div style={{ fontSize: 13, color: "var(--ark-text-muted)", lineHeight: 1.5 }}>{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ padding: "20px", borderRadius: 12, background: "var(--ark-accent-glow)", border: "1px solid rgba(99,102,241,0.15)" }}>
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ark-accent-2)", marginBottom: 12 }}>
                  {c.youGet}
                </div>
                {c.items.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <CheckCircle2 size={14} style={{ color: "var(--ark-accent-2)", flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "var(--ark-text)", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}>
              <div style={{ borderRadius: 16, background: "var(--ark-card)", border: "1px solid var(--ark-border)", padding: "32px" }}>
                {state.status === "success" ? (
                  <div style={{ textAlign: "center", padding: "48px 24px" }}>
                    <CheckCircle2 size={48} style={{ color: "var(--ark-accent-2)", margin: "0 auto 16px" }} />
                    <h3 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "1.25rem", color: "var(--ark-text)", marginBottom: 8 }}>{c.success}</h3>
                    <p style={{ fontSize: 14, color: "var(--ark-text-muted)" }}>{c.successSub}</p>
                  </div>
                ) : (
                  <form ref={formRef} action={action}>
                    <h3 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "1.25rem", color: "var(--ark-text)", marginBottom: 24 }}>
                      {c.formTitle}
                    </h3>

                    {state.status === "error" && state.message && (
                      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 8, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", marginBottom: 16 }}>
                        <AlertCircle size={14} style={{ color: "#f87171", flexShrink: 0 }} />
                        <span style={{ fontSize: 13, color: "#f87171" }}>{state.message}</span>
                      </div>
                    )}

                    {state.status === "rate_limited" && (
                      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 8, background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)", marginBottom: 16 }}>
                        <AlertCircle size={14} style={{ color: "#fbbf24", flexShrink: 0 }} />
                        <span style={{ fontSize: 13, color: "#fbbf24" }}>
                          {lang === "uz" ? "Juda ko'p so'rovlar. Keyinroq urinib ko'ring." : lang === "en" ? "Too many requests. Please try again later." : lang === "zh" ? "请求过于频繁，请稍后重试。" : "Слишком много запросов. Попробуйте позже."}
                        </span>
                      </div>
                    )}

                    <input type="text" name="website" style={{ display: "none" }} tabIndex={-1} autoComplete="off" aria-hidden="true" />

                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      {[
                        { label: c.name,        name: "name",    type: "text",  ph: c.namePh    },
                        { label: c.company,     name: "company", type: "text",  ph: c.companyPh },
                        { label: c.emailLabel,  name: "email",   type: "email", ph: c.emailPh   },
                        { label: c.phoneLabel,  name: "phone",   type: "tel",   ph: c.phonePh   },
                      ].map(({ label, name, type, ph }) => (
                        <div key={name}>
                          <label style={{ display: "block", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ark-text-muted)", marginBottom: 6 }}>
                            {label}
                          </label>
                          <input
                            type={type} name={name} required placeholder={ph}
                            style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "var(--ark-bg-2)", border: `1px solid ${fieldError(name) ? "#f87171" : "var(--ark-border)"}`, color: "var(--ark-text)", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                          />
                          {fieldError(name) && <p style={{ fontSize: 12, color: "#f87171", marginTop: 4 }}>{fieldError(name)}</p>}
                        </div>
                      ))}

                      <div>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ark-text-muted)", marginBottom: 6 }}>
                          {c.message}
                        </label>
                        <textarea
                          name="message" rows={3} placeholder={c.messagePh}
                          style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "var(--ark-bg-2)", border: "1px solid var(--ark-border)", color: "var(--ark-text)", fontSize: 14, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }}
                        />
                      </div>

                      <button
                        type="submit" disabled={pending}
                        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: "12px", borderRadius: 8, background: "linear-gradient(to bottom, #6366f1, #4f46e5)", color: "white", fontWeight: 700, fontSize: 14, border: "none", cursor: pending ? "wait" : "pointer", opacity: pending ? 0.7 : 1, transition: "opacity 0.2s" }}
                      >
                        {pending ? c.sending : c.submit}
                        {!pending && <ArrowRight size={15} />}
                      </button>

                      <p style={{ fontSize: 11.5, color: "var(--ark-text-muted)", textAlign: "center" }}>
                        {c.disclaimer}
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
