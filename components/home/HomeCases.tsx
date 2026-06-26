"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useApp } from "@/components/providers/ThemeLanguageProvider";

const COPY: Record<string, {
  label: string; h2: string; all: string;
  industries: { index: string; sector: string; problem: string; solution: string; result: string }[];
}> = {
  ru: {
    label: "Отрасли",
    h2: "Решения для разных отраслей",
    all: "Все решения →",
    industries: [
      {
        index: "01", sector: "Торговля",
        problem: "IT-инфраструктура разрастается вместе с сетью магазинов. Отдельные инженеры в точках, разная техника, нет единого управления.",
        solution: "ARKANA берёт на обслуживание все точки по единому договору. Централизованный реестр оборудования, единый Service Desk, дистанционная поддержка — без выезда в каждый магазин.",
        result: "Руководство видит состояние IT по всей сети в одном месте. Проблемы решаются быстрее, расходы на IT становятся предсказуемыми.",
      },
      {
        index: "02", sector: "Производство",
        problem: "Простой оборудования из-за IT-сбоя — прямые потери. Нет резервного копирования, нет мониторинга, нет документации по инфраструктуре.",
        solution: "Настраиваем резервное копирование и мониторинг всех критичных систем. Документируем инфраструктуру в GoARKAN. Реагируем на инциденты по приоритету критичности.",
        result: "IT-риски для производства снижаются. Вы знаете, что происходит с вашей инфраструктурой, и получаете предупреждение до того, как что-то сломается.",
      },
      {
        index: "03", sector: "Медицина",
        problem: "Требования к безопасности данных жёсткие, но IT-безопасность не выстроена. Незащищённые сети, отсутствие политик, регуляторные риски.",
        solution: "Проводим аудит безопасности, закрываем уязвимости, выстраиваем политику доступа и защиты данных. Мониторим сеть на предмет угроз в режиме 24/7.",
        result: "Медицинская организация соответствует требованиям регуляторов. Данные пациентов защищены. Руководство уверено в безопасности IT.",
      },
    ],
  },
  en: {
    label: "Industries",
    h2: "Solutions for different industries",
    all: "All solutions →",
    industries: [
      {
        index: "01", sector: "Retail",
        problem: "IT infrastructure grows with the store network. Separate engineers at locations, different hardware, no central management.",
        solution: "ARKANA takes all locations under a single contract. Centralised hardware registry, unified Service Desk, remote support — without visiting each store.",
        result: "Management sees the IT status across the entire network in one place. Issues are resolved faster, IT costs become predictable.",
      },
      {
        index: "02", sector: "Manufacturing",
        problem: "Equipment downtime from an IT failure means direct losses. No backups, no monitoring, no infrastructure documentation.",
        solution: "We configure backup and monitoring for all critical systems. Document the infrastructure in GoARKAN. Respond to incidents by criticality priority.",
        result: "IT risks to production decrease. You know what is happening with your infrastructure and receive warnings before something breaks.",
      },
      {
        index: "03", sector: "Healthcare",
        problem: "Data security requirements are strict, but IT security is not in place. Unsecured networks, no policies, regulatory risks.",
        solution: "We conduct a security audit, close vulnerabilities, establish access and data protection policies. Monitor the network for threats 24/7.",
        result: "The medical organisation meets regulatory requirements. Patient data is protected. Management is confident in IT security.",
      },
    ],
  },
  uz: {
    label: "Sohalar",
    h2: "Turli sohalarga yechimlar",
    all: "Barcha yechimlar →",
    industries: [
      {
        index: "01", sector: "Savdo",
        problem: "IT infratuzilmasi do'konlar tarmog'i bilan birga o'sadi. Har bir nuqtada alohida muhandislar, turli texnikalar, yagona boshqaruv yo'q.",
        solution: "ARKANA barcha nuqtalarni yagona shartnoma bo'yicha xizmatga oladi. Markazlashtirilgan uskunalar reestri, yagona Service Desk, masofaviy qo'llab-quvvatlash — har bir do'konga bormasdan.",
        result: "Rahbariyat butun tarmoqdagi IT holatini bir joyda ko'radi. Muammolar tezroq hal qilinadi, IT xarajatlari taxmin qilinadigan bo'ladi.",
      },
      {
        index: "02", sector: "Ishlab chiqarish",
        problem: "IT nosozligi sababli uskunalarning to'xtashi bevosita zarar. Zaxira nusxa yo'q, monitoring yo'q, infratuzilma hujjatlari yo'q.",
        solution: "Barcha muhim tizimlar uchun zaxira nusxa va monitoringni sozlaymiz. Infratuzilmani GoARKAN'da hujjatlashtiramiz. Hodisalarga muhimlik darajasi bo'yicha javob beramiz.",
        result: "Ishlab chiqarish uchun IT xavflari kamayadi. Infratuzilmangizda nima bo'layotganini bilasiz va biror narsa buzilishidan oldin ogohlantirish olasiz.",
      },
      {
        index: "03", sector: "Tibbiyot",
        problem: "Ma'lumotlar xavfsizligiga talablar qat'iy, lekin IT xavfsizligi tashkil etilmagan. Himoyalanmagan tarmoqlar, siyosatlar yo'q, tartibga solish xavflari.",
        solution: "Xavfsizlik auditi o'tkazamiz, zaifliklarni yonamiz, kirish va ma'lumotlarni himoya qilish siyosatini tashkil etamiz. Tarmoqni 24/7 rejimida tahdidlar bo'yicha monitoring qilamiz.",
        result: "Tibbiy tashkilot tartibga solish talablariga javob beradi. Bemorlar ma'lumotlari himoyalangan. Rahbariyat IT xavfsizligiga ishonch bilan qarashadi.",
      },
    ],
  },
};

export function HomeCases() {
  const { lang } = useApp();
  const c = COPY[lang] ?? COPY.ru;

  return (
    <section style={{ background: "var(--ark-bg)", borderTop: "1px solid var(--ark-divider)" }}>
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "80px 0 64px", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-hint)", marginBottom: 16 }}>{c.label}</div>
            <h2 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(2rem, 3.5vw, 3.25rem)", lineHeight: 1.1, letterSpacing: "-0.04em", color: "var(--ark-text-heading)", margin: 0 }}>
              {c.h2}
            </h2>
          </div>
          <Link href="/cases" style={{ fontSize: 13, fontWeight: 500, color: "var(--ark-text-muted)", textDecoration: "none", letterSpacing: "-0.01em", paddingBottom: 6 }}>
            {c.all}
          </Link>
        </div>

        <div style={{ borderTop: "1px solid var(--ark-divider)", paddingBottom: 80 }}>
          {c.industries.map((ind, i) => (
            <motion.div
              key={ind.index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ display: "grid", gridTemplateColumns: "56px 200px 1fr 1fr", gap: "32px", alignItems: "start", padding: "44px 0", borderBottom: "1px solid var(--ark-divider)" }}
              className="max-lg:flex max-lg:flex-col max-lg:gap-4"
            >
              {/* Index */}
              <div style={{ fontSize: 11, fontWeight: 500, color: "var(--ark-text-faint)", letterSpacing: "0.04em", paddingTop: 3 }}>{ind.index}</div>

              {/* Sector */}
              <div>
                <div style={{ fontFamily: "Nacelle, sans-serif", fontSize: 20, fontWeight: 600, color: "var(--ark-text-heading)", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
                  {ind.sector}
                </div>
              </div>

              {/* Problem + Solution */}
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-faint)", marginBottom: 8 }}>
                    {lang === "ru" ? "Ситуация" : lang === "uz" ? "Vaziyat" : "Situation"}
                  </div>
                  <p style={{ fontSize: 13, color: "var(--ark-text-label)", lineHeight: 1.65, margin: 0, letterSpacing: "-0.01em" }}>{ind.problem}</p>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-faint)", marginBottom: 8 }}>
                    {lang === "ru" ? "Решение ARKANA" : lang === "uz" ? "ARKANA yechimi" : "ARKANA solution"}
                  </div>
                  <p style={{ fontSize: 13, color: "var(--ark-text-label)", lineHeight: 1.65, margin: 0, letterSpacing: "-0.01em" }}>{ind.solution}</p>
                </div>
              </div>

              {/* Result */}
              <div>
                <div style={{ width: 2, height: 24, background: "var(--ark-border-strong)", borderRadius: 2, marginBottom: 14 }} />
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-faint)", marginBottom: 10 }}>
                  {lang === "ru" ? "Результат" : lang === "uz" ? "Natija" : "Result"}
                </div>
                <p style={{ fontSize: 14, fontWeight: 500, color: "var(--ark-text-muted)", lineHeight: 1.65, letterSpacing: "-0.01em", margin: 0 }}>{ind.result}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
