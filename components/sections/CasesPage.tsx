"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useApp } from "@/components/providers/ThemeLanguageProvider";

const EASE = [0.16, 1, 0.3, 1] as const;

const COPY: Record<string, {
  badge: string; h1a: string; h1b: string; sub: string;
  situationLabel: string; solutionLabel: string; outcomeLabel: string;
  ctaHeading: string; ctaBody: string; ctaBtn: string;
  cases: { sector: string; problem: string; solution: string; outcome: string }[];
}> = {
  ru: {
    badge: "Решения по отраслям",
    h1a: "Как ARKANA решает",
    h1b: "задачи разного бизнеса.",
    sub: "Три отрасли. Три ситуации. Один подход — предсказуемый IT, закреплённый договором.",
    situationLabel: "Ситуация",
    solutionLabel: "Решение ARKANA",
    outcomeLabel: "Результат",
    ctaHeading: "Расскажите о вашем бизнесе.",
    ctaBody: "Подготовим коммерческое предложение за один рабочий день — с учётом вашей отрасли, размера и задач.",
    ctaBtn: "Получить коммерческое предложение",
    cases: [
      {
        sector: "Торговля",
        problem: "IT-инфраструктура разрастается вместе с сетью магазинов. Отдельные инженеры в точках, разная техника, нет единого управления. Руководство узнаёт о проблемах постфактум — после того, как касса зависла или упал интернет в торговом зале.",
        solution: "ARKANA берёт на обслуживание все точки по единому договору. Централизованный реестр оборудования в GoARKAN, единый Service Desk для всей сети, дистанционная поддержка без выезда в каждый магазин. Изменения согласовываются и фиксируются.",
        outcome: "Руководство видит состояние IT по всей сети в одном месте — в реальном времени. Проблемы решаются быстрее. IT-расходы становятся предсказуемой статьёй бюджета, а не источником сюрпризов.",
      },
      {
        sector: "Производство",
        problem: "Простой оборудования из-за IT-сбоя — прямые потери производства. Нет резервного копирования, нет мониторинга, вся документация по инфраструктуре хранится в памяти одного инженера. Если он уволится — данные уйдут вместе с ним.",
        solution: "ARKANA настраивает резервное копирование и мониторинг всех критичных систем. Полная документация инфраструктуры ведётся в GoARKAN — схемы сети, конфигурации, доступы. Реагирование на инциденты по приоритету критичности, SLA закреплён в договоре.",
        outcome: "IT-риски снижаются. Предупреждения о проблемах приходят до остановки оборудования. Документация актуальна и не зависит от конкретного сотрудника. Бизнес не остановится, если инженер уйдёт.",
      },
      {
        sector: "Медицина",
        problem: "Требования к безопасности медицинских данных жёсткие, но IT-безопасность не выстроена. Незащищённые сети, отсутствие политик доступа, регуляторные риски. Любой инцидент — угроза репутации и штрафы.",
        solution: "ARKANA проводит аудит безопасности, закрывает уязвимости, выстраивает политику доступа и защиты данных. Постоянный мониторинг сети 24/7. Все события фиксируются в GoARKAN — у руководства есть полная документация соответствия.",
        outcome: "Медицинская организация соответствует требованиям регуляторов. Данные пациентов защищены. Руководство уверено в безопасности IT и имеет документальное подтверждение на случай проверки.",
      },
    ],
  },
  en: {
    badge: "Industry solutions",
    h1a: "How ARKANA solves",
    h1b: "challenges across industries.",
    sub: "Three industries. Three situations. One approach — predictable IT, backed by contract.",
    situationLabel: "Situation",
    solutionLabel: "ARKANA solution",
    outcomeLabel: "Business outcome",
    ctaHeading: "Tell us about your business.",
    ctaBody: "We will prepare a commercial proposal within one business day — tailored to your industry, size, and goals.",
    ctaBtn: "Get a commercial proposal",
    cases: [
      {
        sector: "Retail",
        problem: "IT infrastructure grows unplanned as the store network expands. Separate engineers at each location, inconsistent hardware, no central visibility. Management learns about problems after the fact — when the register freezes or the internet drops.",
        solution: "ARKANA takes all locations under a single contract. Centralised asset registry in GoARKAN, unified Service Desk for the entire network, remote support without engineers visiting each store. Every change is approved and logged.",
        outcome: "Management sees IT status across all locations in one place, in real time. Issues are resolved faster. IT costs become a predictable budget line, not a source of surprises.",
      },
      {
        sector: "Manufacturing",
        problem: "Equipment downtime from an IT failure means direct production losses. No backup system, no monitoring, all infrastructure documentation exists only in the engineer's memory. If they leave — that knowledge leaves with them.",
        solution: "ARKANA configures backup and monitoring for all critical systems. Full infrastructure documentation is maintained in GoARKAN — network diagrams, configurations, credentials. Incident response by criticality priority, SLA contractually bound.",
        outcome: "IT risks decrease. Warnings arrive before equipment stops. Documentation stays current regardless of staff changes. The business will not stop if an engineer leaves.",
      },
      {
        sector: "Healthcare",
        problem: "Medical data security requirements are strict, but IT security is not in place. Unsecured networks, no access policies, regulatory risk. Any incident is a reputational threat and a potential fine.",
        solution: "ARKANA conducts a security audit, closes vulnerabilities, establishes access and data protection policies. Continuous 24/7 network monitoring. All events are logged in GoARKAN — management has complete compliance documentation.",
        outcome: "The organisation meets regulatory requirements. Patient data is protected. Management is confident in IT security and has documented proof ready for inspection.",
      },
    ],
  },
  uz: {
    badge: "Sohalar bo'yicha yechimlar",
    h1a: "ARKANA turli biznes",
    h1b: "muammolarini qanday hal qiladi.",
    sub: "Uch soha. Uch vaziyat. Bir yondashuv — shartnoma bilan mustahkamlangan taxmin qilinadigan IT.",
    situationLabel: "Vaziyat",
    solutionLabel: "ARKANA yechimi",
    outcomeLabel: "Natija",
    ctaHeading: "Biznesingiz haqida ayting.",
    ctaBody: "Soha, hajm va vazifalaringizni hisobga olgan holda bir ish kunida tijorat taklifi tayyorlaymiz.",
    ctaBtn: "Tijorat taklifi olish",
    cases: [
      {
        sector: "Savdo",
        problem: "IT infratuzilmasi do'konlar tarmog'i bilan birga rejalashtirilmagan holda o'sadi. Har bir nuqtada alohida muhandislar, turli texnikalar, yagona nazorat yo'q. Rahbariyat muammolar haqida fakt keyin bilib oladi — kassa muzlaganda yoki savdo zalida internet tushganda.",
        solution: "ARKANA barcha nuqtalarni yagona shartnoma bo'yicha xizmatga oladi. GoARKAN'da markazlashtirilgan uskunalar reestri, butun tarmoq uchun yagona Service Desk, har bir do'konga bormay masofaviy qo'llab-quvvatlash. Barcha o'zgarishlar kelishiladi va qayd etiladi.",
        outcome: "Rahbariyat barcha nuqtalardagi IT holatini bir joyda — real vaqtda ko'radi. Muammolar tezroq hal qilinadi. IT xarajatlari kutilmagan manbaga emas, taxmin qilinadigan byudjet moddasiga aylanadi.",
      },
      {
        sector: "Ishlab chiqarish",
        problem: "IT nosozligi sababli uskunalarning to'xtashi bevosita ishlab chiqarish yo'qotishlarini anglatadi. Zaxira nusxa tizimi yo'q, monitoring yo'q, barcha infratuzilma hujjatlari bitta muhandisning xotirasida. U ketsa — bilim ham ketadi.",
        solution: "ARKANA barcha muhim tizimlar uchun zaxira nusxa va monitoringni sozlaydi. To'liq infratuzilma hujjatlari GoARKAN'da yuritiladi — tarmoq sxemalari, konfiguratsiyalar, kirish ma'lumotlari. Muhimlik darajasi bo'yicha hodisalarga javob, SLA shartnomada mustahkamlangan.",
        outcome: "IT xavflari kamayadi. Ogohlantirishlar uskunalar to'xtashidan oldin keladi. Hujjatlar xodimlar almashinuvidan qat'iy nazar yangilangan bo'ladi. Muhandis ketsa ham biznes to'xtamaydi.",
      },
      {
        sector: "Tibbiyot",
        problem: "Tibbiy ma'lumotlar xavfsizligiga talablar qat'iy, lekin IT xavfsizligi tashkil etilmagan. Himoyalanmagan tarmoqlar, kirish siyosati yo'q, tartibga solish xavflari. Har qanday hodisa — obro'ga tahdid va mumkin bo'lgan jarima.",
        solution: "ARKANA xavfsizlik auditi o'tkazadi, zaifliklarni bartaraf etadi, kirish va ma'lumotlarni himoya qilish siyosatini tashkil etadi. 24/7 uzluksiz tarmoq monitoringi. Barcha hodisalar GoARKAN'da qayd etiladi — rahbariyatda to'liq muvofiqlik hujjatlari bor.",
        outcome: "Tashkilot tartibga solish talablariga javob beradi. Bemorlar ma'lumotlari himoyalangan. Rahbariyat IT xavfsizligiga ishonch bilan qaraydi va tekshiruv uchun tayyorlangan hujjatli isbotga ega.",
      },
    ],
  },
};

export function CasesPage() {
  const { lang } = useApp();
  const c = COPY[lang] ?? COPY.ru;

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ padding: "96px 0 80px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.10), transparent)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px", position: "relative" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: EASE }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-hint)", marginBottom: 20 }}>
              {c.badge}
            </div>
            <h1 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(2.25rem, 5vw, 4rem)", letterSpacing: "-0.05em", lineHeight: 1.05, margin: "0 0 24px", color: "var(--ark-text-heading)", maxWidth: 760 }}>
              {c.h1a}
              <br />
              <span style={{ color: "var(--ark-text-sub)" }}>{c.h1b}</span>
            </h1>
            <p style={{ fontSize: 16, color: "var(--ark-text-sub)", lineHeight: 1.65, maxWidth: 520, margin: 0 }}>
              {c.sub}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cases */}
      <section style={{ paddingBottom: 96 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
          <div style={{ borderTop: "1px solid var(--ark-divider)" }}>
            {c.cases.map((item, i) => (
              <motion.div
                key={item.sector}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, ease: EASE, delay: i * 0.08 }}
                style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr", gap: "48px", padding: "56px 0", borderBottom: "1px solid var(--ark-divider)", alignItems: "start" }}
                className="max-lg:flex max-lg:flex-col max-lg:gap-6"
              >
                {/* Sector */}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 500, color: "var(--ark-text-faint)", letterSpacing: "0.04em", marginBottom: 8 }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div style={{ fontFamily: "Nacelle, sans-serif", fontSize: 22, fontWeight: 600, color: "var(--ark-text-heading)", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
                    {item.sector}
                  </div>
                </div>

                {/* Situation + Solution */}
                <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-muted)", marginBottom: 10 }}>
                      {c.situationLabel}
                    </div>
                    <p style={{ fontSize: 13.5, color: "var(--ark-text-sub)", lineHeight: 1.7, margin: 0, letterSpacing: "-0.01em" }}>
                      {item.problem}
                    </p>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-muted)", marginBottom: 10 }}>
                      {c.solutionLabel}
                    </div>
                    <p style={{ fontSize: 13.5, color: "var(--ark-text-sub)", lineHeight: 1.7, margin: 0, letterSpacing: "-0.01em" }}>
                      {item.solution}
                    </p>
                  </div>
                </div>

                {/* Outcome */}
                <div>
                  <div style={{ width: 2, height: 24, background: "var(--ark-accent)", borderRadius: 2, marginBottom: 16, opacity: 0.5 }} />
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-faint)", marginBottom: 12 }}>
                    {c.outcomeLabel}
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: "var(--ark-text-muted)", lineHeight: 1.7, letterSpacing: "-0.01em", margin: 0 }}>
                    {item.outcome}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ marginTop: 80, display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "center", padding: "48px 56px", borderRadius: 12, border: "1px solid var(--ark-border)", background: "var(--ark-bg-2)" }}
            className="max-md:flex max-md:flex-col max-md:gap-8 max-md:p-8"
          >
            <div>
              <div style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(1.5rem, 2.5vw, 2rem)", letterSpacing: "-0.04em", color: "var(--ark-text-heading)", marginBottom: 10, lineHeight: 1.2 }}>
                {c.ctaHeading}
              </div>
              <p style={{ fontSize: 14, color: "var(--ark-text-muted)", lineHeight: 1.65, margin: 0, maxWidth: 480 }}>
                {c.ctaBody}
              </p>
            </div>
            <Link
              href="/contact"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 24px", borderRadius: 8, background: "var(--ark-accent)", color: "#ffffff", fontWeight: 700, fontSize: 14, textDecoration: "none", letterSpacing: "-0.01em", whiteSpace: "nowrap", flexShrink: 0 }}
            >
              {c.ctaBtn}
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
