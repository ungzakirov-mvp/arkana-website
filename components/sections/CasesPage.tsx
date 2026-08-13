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
  zh: {
    badge: "行业解决方案",
    h1a: "ARKANA如何解决",
    h1b: "各行业的IT挑战。",
    sub: "三个行业，三种情况，一套方法——以合同为保障的可预期IT服务。",
    situationLabel: "现状",
    solutionLabel: "ARKANA解决方案",
    outcomeLabel: "业务成果",
    ctaHeading: "告诉我们您的业务情况。",
    ctaBody: "我们将在一个工作日内为您量身定制商务方案，充分考虑您的行业、规模与目标。",
    ctaBtn: "获取商务方案",
    cases: [
      {
        sector: "零售业",
        problem: "IT基础设施随门店网络扩张无序增长：各门店各自为政、设备不统一、缺乏集中管控。管理层往往在收银机死机或门店网络中断后才得知问题。",
        solution: "ARKANA以一份合同统一承接所有门店服务。GoARKAN集中管理资产台账，为整个门店网络提供统一服务台，无需工程师逐店出行即可远程支持。所有变更均经审批并留存记录。",
        outcome: "管理层可在一个地方实时查看所有门店的IT状态。问题得到更快解决，IT费用成为可预测的预算项目，不再是意外支出来源。",
      },
      {
        sector: "制造业",
        problem: "IT故障导致设备停机，直接造成生产损失。无备份系统、无监控，所有基础设施文档仅存在于某位工程师的记忆中——一旦离职，相关知识随之流失。",
        solution: "ARKANA为所有关键系统配置备份与监控方案。GoARKAN完整记录基础设施文档——网络拓扑、配置信息与访问凭证。按严重程度分级响应事件，SLA写入合同。",
        outcome: "IT风险降低，预警在设备停机前到达。文档不受人员变动影响，始终保持最新状态。即使工程师离职，业务也不会中断。",
      },
      {
        sector: "医疗行业",
        problem: "医疗数据安全要求严格，但IT安全体系尚未建立：网络防护薄弱、缺乏访问管控策略、合规风险突出。任何安全事件都可能损害声誉并招致处罚。",
        solution: "ARKANA开展安全审计，修复漏洞，建立访问与数据保护策略。7×24小时持续网络监控，所有事件记录在GoARKAN——管理层拥有完整的合规文档。",
        outcome: "组织满足监管合规要求，患者数据得到保护。管理层对IT安全充满信心，并具备可应对审查的文档证明。",
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
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10" style={{ position: "relative" }}>
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
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <div style={{ borderTop: "1px solid var(--ark-divider)" }}>
            {c.cases.map((item, i) => (
              <motion.div
                key={item.sector}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, ease: EASE, delay: i * 0.08 }}
                className="grid grid-cols-1 lg:grid-cols-[200px_1fr_1fr] gap-6 lg:gap-12"
                style={{ padding: "48px 0", borderBottom: "1px solid var(--ark-divider)", alignItems: "start" }}
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
            className="flex flex-col md:grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-start md:items-center p-8 md:p-12"
            style={{ marginTop: 80, borderRadius: 12, border: "1px solid var(--ark-border)", background: "var(--ark-bg-2)" }}
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
              className="w-full md:w-auto justify-center"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 24px", borderRadius: 8, background: "var(--ark-accent)", color: "#ffffff", fontWeight: 700, fontSize: 14, textDecoration: "none", letterSpacing: "-0.01em" }}
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
