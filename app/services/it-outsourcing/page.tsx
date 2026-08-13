import type { Metadata } from "next";
import { ServicePageLayout, type ServicePageCopy } from "@/components/sections/ServicePageLayout";
import { itOutsourcingSchema, buildBreadcrumbSchema } from "@/lib/seo";

const breadcrumb = buildBreadcrumbSchema([
  { name: "Главная", url: "/" },
  { name: "Услуги", url: "/services" },
  { name: "IT-аутсорсинг", url: "/services/it-outsourcing" },
]);

export const metadata: Metadata = {
  title: "IT-аутсорсинг в Узбекистане — Полный IT-отдел | ARKANA",
  description:
    "Передайте весь IT-отдел на аутсорсинг ARKANA. Именной технический руководитель, фиксированная стоимость и ежемесячная отчётность. Обслуживаем бизнес по всему Узбекистану.",
  alternates: { canonical: "/services/it-outsourcing" },
  openGraph: {
    title: "IT-аутсорсинг в Узбекистане | ARKANA",
    description:
      "Именной технический руководитель. Фиксированное время реакции. Ежемесячная отчётность. ARKANA берёт весь ваш IT на себя.",
    url: "/services/it-outsourcing",
  },
};

const copy: ServicePageCopy = {
  backLabel: { ru: "Все услуги", uz: "Barcha xizmatlar", en: "All services" },
  eyebrow: { ru: "IT-аутсорсинг", uz: "IT-autsorsing", en: "IT Outsourcing" },
  h1: {
    ru: "Весь ваш IT-отдел.<br />Одна команда. Один договор.",
    uz: "Barcha IT bo'limingiz.<br />Bir jamoa. Bir shartnoma.",
    en: "Your entire IT department.<br />One team. One contract.",
  },
  desc: {
    ru: "Именной технический руководитель и инженеры поддержки, закреплённые за вашим аккаунтом — инфраструктура, поддержка пользователей, безопасность и управление поставщиками. Одна фиксированная стоимость в месяц.",
    uz: "Hisobingizga biriktirilgan shaxsiy texnik rahbar va qo'llab-quvvatlash muhandisl — infratuzilma, foydalanuvchi qo'llab-quvvatlash, xavfsizlik va yetkazib beruvchilarni boshqarish. Oyiga bitta belgilangan narx.",
    en: "A dedicated technical manager and support engineers assigned to your account — infrastructure, user support, security, and vendor management. One fixed monthly fee.",
  },
  ctaLabel: { ru: "Запросить бесплатный аудит", uz: "Bepul audit so'rash", en: "Request a free audit" },
  ctaHref: "/contact",
  includedLabel: { ru: "Что включено", uz: "Nimalar kiradi", en: "What's included" },
  included: [
    { ru: "Именной технический руководитель на вашем аккаунте", uz: "Hisobingizda shaxsiy texnik rahbar", en: "Named technical manager for your account" },
    { ru: "Инженеры поддержки, знающие вашу среду", uz: "Muhitingizni bilgan qo'llab-quvvatlash muhandisl", en: "Support engineers who know your environment" },
    { ru: "Мониторинг инфраструктуры с настроенными порогами оповещений", uz: "Sozlangan ogohlantirish chegaralari bilan infratuzilma monitoringi", en: "Infrastructure monitoring with configured alert thresholds" },
    { ru: "Учёт всех обращений через GoARKAN", uz: "GoARKAN orqali barcha murojaatlarni hisobga olish", en: "All requests tracked through GoARKAN" },
    { ru: "Управление доступом и защита рабочих мест", uz: "Kirish boshqaruvi va ish joylarini himoya qilish", en: "Access management and endpoint protection" },
    { ru: "Управление отношениями с поставщиками", uz: "Yetkazib beruvchilar bilan munosabatlarni boshqarish", en: "Vendor relationship management" },
    { ru: "Ежемесячные отчёты о производительности из GoARKAN", uz: "GoARKANdan oylik samaradorlik hisobotlari", en: "Monthly performance reports from GoARKAN" },
    { ru: "Ежеквартальный бизнес-обзор с техническим руководителем", uz: "Texnik rahbar bilan choraklik biznes sharhi", en: "Quarterly business review with your technical manager" },
  ],
  stepsHeading: { ru: "Как работает IT-аутсорсинг с ARKANA", uz: "ARKANA bilan IT-autsorsing qanday ishlaydi", en: "How IT outsourcing with ARKANA works" },
  steps: [
    {
      step: "01",
      title: { ru: "Именное закрепление", uz: "Shaxsiy biriktirish", en: "Named assignment" },
      body: { ru: "Технический руководитель и инженеры поддержки закрепляются за вашим аккаунтом. Они изучают вашу среду — не только ваши заявки.", uz: "Texnik rahbar va qo'llab-quvvatlash muhandisl hisobingizga biriktiriladi. Ular faqat murojaatlaringizni emas, muhitingizni o'rganadi.", en: "A technical manager and support engineers are assigned to your account. They learn your environment — not just your tickets." },
    },
    {
      step: "02",
      title: { ru: "Персональная ответственность", uz: "Shaxsiy mas'uliyat", en: "Personal accountability" },
      body: { ru: "Один технический руководитель отвечает за весь ваш IT. Вы знаете, кому звонить. Он знает вашу среду, команду и приоритеты.", uz: "Bitta texnik rahbar barcha IT uchun javob beradi. Kimga qo'ng'iroq qilishni bilasiz. U muhitingizni, jamoangizni va ustuvorliklaringizni biladi.", en: "One technical manager is accountable for all your IT. You know who to call. They know your environment, team, and priorities." },
    },
    {
      step: "03",
      title: { ru: "Прозрачная отчётность", uz: "Shaffof hisobot", en: "Transparent reporting" },
      body: { ru: "Ежемесячные отчёты из GoARKAN: решённые заявки, время реакции по категориям, изменения инфраструктуры. Реальные данные из системы.", uz: "GoARKANdan oylik hisobotlar: hal qilingan murojaatlar, kategoriyalar bo'yicha javob vaqti, infratuzilma o'zgarishlari. Tizimdan haqiqiy ma'lumotlar.", en: "Monthly reports from GoARKAN: resolved tickets, response time by category, infrastructure changes. Real data from the system." },
    },
  ],
};

export default function ITOutsourcingPage() {
  return (
    <ServicePageLayout
      copy={copy}
      schemas={
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itOutsourcingSchema) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
        </>
      }
    />
  );
}
