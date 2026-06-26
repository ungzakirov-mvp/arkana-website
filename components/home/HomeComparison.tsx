"use client";

import { motion } from "framer-motion";
import { useApp } from "@/components/providers/ThemeLanguageProvider";

const COPY: Record<string, {
  h2: string; col1: string; col2: string; catHeader: string;
  rows: { label: string; col1: string; col2: string }[];
}> = {
  ru: {
    h2: "Почему ARKANA выгоднее собственного IT-отдела",
    col1: "Собственный IT-отдел",
    col2: "ARKANA",
    catHeader: "Параметр",
    rows: [
      { label: "Стоимость",                col1: "Оклад + налоги + больничные + оборудование. Итоговая цифра непредсказуема.",               col2: "Фиксированная ежемесячная сумма в договоре. Никаких скрытых расходов." },
      { label: "Команда",                  col1: "1–2 штатных инженера. Если один заболел — работа стоит.",                                   col2: "Целая команда специалистов. Всегда доступны, больничные вас не касаются." },
      { label: "Ответственность",          col1: "Неформальная. Претензии решаются внутри компании, часто без результата.",                   col2: "Закреплена в договоре с конкретными SLA и финансовыми штрафами за нарушение." },
      { label: "Контроль",                 col1: "Непонятно, что происходит с вашим IT. Узнаёте о проблемах постфактум.",                    col2: "Все задачи, статусы и сроки видны через GoARKAN в режиме реального времени." },
      { label: "Документация",             col1: "Знания хранятся в голове инженера. Уволился — информация потеряна.",                        col2: "Вся документация в GoARKAN: схемы сети, конфигурации, доступы. Всегда актуальна." },
      { label: "Отчётность",               col1: "Нет системной отчётности. Что было сделано — никто не знает.",                             col2: "Ежемесячный письменный отчёт с реальными данными по задачам и SLA." },
      { label: "Масштабирование",          col1: "Набор нового сотрудника — 1–3 месяца. Сокращение — юридические риски.",                    col2: "Количество рабочих мест меняется по заявке. Быстро, без кадровых вопросов." },
      { label: "Управление оборудованием", col1: "Учёт ведётся в Excel или вообще не ведётся. Инвентаризация раз в год.",                    col2: "Автоматический реестр всей техники в GoARKAN. Видно, что устаревает и когда." },
      { label: "Развитие",                 col1: "Штатный инженер занят поддержкой. На развитие IT и новые технологии времени нет.",          col2: "ARKANA предлагает IT-стратегию, внедрение новых инструментов и развитие инфраструктуры." },
    ],
  },
  en: {
    h2: "Why ARKANA is more cost-effective than an in-house IT department",
    col1: "In-house IT department",
    col2: "ARKANA",
    catHeader: "Parameter",
    rows: [
      { label: "Cost",               col1: "Salary + taxes + sick leave + equipment. The final number is unpredictable.",          col2: "Fixed monthly amount in the contract. No hidden costs." },
      { label: "Team",               col1: "1–2 engineers. If one is sick — work stops.",                                          col2: "An entire team of specialists. Always available, their sick days are not your problem." },
      { label: "Accountability",     col1: "Informal. Complaints are resolved internally, often without result.",                  col2: "Defined in the contract with specific SLAs and financial penalties for violations." },
      { label: "Visibility",         col1: "It is unclear what is happening with your IT. You learn about problems after the fact.", col2: "All tasks, statuses, and deadlines are visible in GoARKAN in real time." },
      { label: "Documentation",      col1: "Knowledge lives in the engineer's head. They leave — information is lost.",             col2: "All documentation in GoARKAN: network diagrams, configurations, credentials. Always current." },
      { label: "Reporting",          col1: "No systematic reporting. Nobody knows what was done.",                                 col2: "Monthly written report with real data on tasks and SLA performance." },
      { label: "Scaling",            col1: "Hiring takes 1–3 months. Layoffs carry legal risks.",                                  col2: "Workstation count changes on request. Fast, with no HR complications." },
      { label: "Asset management",   col1: "Tracked in Excel or not tracked at all. Annual inventory at best.",                   col2: "Automatic asset registry in GoARKAN. Visible what is ageing and when." },
      { label: "Development",        col1: "In-house engineer is busy with support. No time for IT development or new technology.", col2: "ARKANA provides IT strategy, adoption of new tools, and infrastructure development." },
    ],
  },
  uz: {
    h2: "Nima uchun ARKANA shtat IT bo'limidan foydali",
    col1: "Shtat IT bo'limi",
    col2: "ARKANA",
    catHeader: "Mezon",
    rows: [
      { label: "Narx",               col1: "Maosh + soliqlar + kasallik + uskunalar. Yakuniy raqam oldindan aytib bo'lmaydi.",     col2: "Shartnomada belgilangan oylik to'lov. Yashirin xarajatlar yo'q." },
      { label: "Jamoa",              col1: "1–2 shtat muhandis. Biri kasal bo'lsa — ish to'xtaydi.",                               col2: "Mutaxassislardan iborat butun jamoa. Har doim mavjud, ularning kasalligi sizni qiziqtirmaydi." },
      { label: "Javobgarlik",        col1: "Norasmiy. Shikoyatlar ichki hal qilinadi, ko'pincha natijasiz.",                       col2: "Shartnomada aniq SLA va buzilish uchun moliyaviy jarimalari bilan belgilangan." },
      { label: "Nazorat",            col1: "IT'ingizda nima bo'layotgani noaniq. Muammolar haqida keyin bilib olasiz.",            col2: "Barcha vazifalar, statuslar va muddatlar GoARKAN'da real vaqtda ko'rinadi." },
      { label: "Hujjatlar",          col1: "Bilim muhandisning xotirasida. Ketdi — ma'lumot yo'qoldi.",                           col2: "Barcha hujjatlar GoARKAN'da: tarmoq sxemalari, konfiguratsiyalar, kirish ma'lumotlari. Har doim yangilangan." },
      { label: "Hisobot",            col1: "Tizimli hisobot yo'q. Nima qilinganini hech kim bilmaydi.",                           col2: "Vazifalar va SLA bo'yicha haqiqiy ma'lumotlar bilan oylik yozma hisobot." },
      { label: "Masshtablash",       col1: "Yangi xodim yollash — 1–3 oy. Qisqartirish — huquqiy xavflar.",                      col2: "Ish joylari soni so'rovga ko'ra o'zgaradi. Tez, kadrlar muammolarisiz." },
      { label: "Uskunalar boshqaruvi", col1: "Excel'da yoki umuman hisoblanmaydi. Yiliga bir marta inventarizatsiya.",            col2: "GoARKAN'da avtomatik aktiv reestri. Nima eskirayotgani va qachon — ko'rinadi." },
      { label: "Rivojlanish",        col1: "Shtat muhandis qo'llab-quvvatlash bilan band. IT rivojlanishi uchun vaqt yo'q.",      col2: "ARKANA IT strategiyasi, yangi vositalarni joriy etish va infratuzilma rivojlanishini taqdim etadi." },
    ],
  },
};

export function HomeComparison() {
  const { lang } = useApp();
  const c = COPY[lang] ?? COPY.ru;

  return (
    <section style={{ background: "var(--ark-bg)", paddingBottom: 120, borderTop: "1px solid var(--ark-divider)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>

        <div style={{ padding: "80px 0 64px" }}>
          <h2 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(2rem, 3.5vw, 3.25rem)", lineHeight: 1.1, letterSpacing: "-0.04em", color: "var(--ark-text-heading)", margin: 0, maxWidth: 720 }}>
            {c.h2}
          </h2>
        </div>

        <div style={{ borderRadius: 12, border: "1px solid var(--ark-border)", overflow: "hidden" }}>
          {/* Column headers */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "var(--ark-surface)", borderBottom: "1px solid var(--ark-border)" }}>
            <div style={{ padding: "18px 24px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ark-text-faint)" }}>
              {c.catHeader}
            </div>
            <div style={{ padding: "18px 24px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ark-text-hint)", borderLeft: "1px solid var(--ark-border)" }}>
              {c.col1}
            </div>
            <div style={{ padding: "18px 24px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ark-text)", borderLeft: "1px solid var(--ark-border)", background: "var(--ark-accent-glow)" }}>
              {c.col2}
            </div>
          </div>

          {c.rows.map(({ label, col1, col2 }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: i * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: i < c.rows.length - 1 ? "1px solid var(--ark-divider)" : "none" }}
            >
              <div style={{ padding: "20px 24px", fontSize: 13, fontWeight: 600, color: "var(--ark-text-muted)", letterSpacing: "-0.01em", display: "flex", alignItems: "center" }}>
                {label}
              </div>
              <div style={{ padding: "20px 24px", borderLeft: "1px solid var(--ark-divider)", display: "flex", alignItems: "flex-start" }}>
                <span style={{ fontSize: 13, color: "var(--ark-text-faint)", letterSpacing: "-0.01em", lineHeight: 1.55 }}>{col1}</span>
              </div>
              <div style={{ padding: "20px 24px", borderLeft: "1px solid var(--ark-divider)", background: "var(--ark-accent-glow)", display: "flex", alignItems: "flex-start" }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: "var(--ark-text)", letterSpacing: "-0.01em", lineHeight: 1.55 }}>{col2}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
