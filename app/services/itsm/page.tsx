import type { Metadata } from "next";
import { ServicePageLayout, type ServicePageCopy } from "@/components/sections/ServicePageLayout";
import { itsmSchema, buildBreadcrumbSchema } from "@/lib/seo";

const breadcrumb = buildBreadcrumbSchema([
  { name: "Главная", url: "/" },
  { name: "Услуги", url: "/services" },
  { name: "IT Service Management", url: "/services/itsm" },
]);

export const metadata: Metadata = {
  title: "IT Service Management | Платформа GoARKAN | ARKANA",
  description:
    "Управление IT-сервисами через GoARKAN. Учёт заявок, инвентаризация активов, отчётность о производительности. IT Service Desk для бизнеса в Узбекистане.",
  alternates: { canonical: "/services/itsm" },
  openGraph: {
    title: "IT Service Management | GoARKAN | ARKANA",
    description:
      "Каждая заявка учтена. Каждый актив зафиксирован. Ежемесячные отчёты о производительности из GoARKAN — собственной платформы ARKANA для управления сервисами.",
    url: "/services/itsm",
  },
};

const copy: ServicePageCopy = {
  backLabel: { ru: "Все услуги", uz: "Barcha xizmatlar", en: "All services" },
  eyebrow: { ru: "IT Service Management и GoARKAN", uz: "IT Service Management va GoARKAN", en: "IT Service Management & GoARKAN" },
  h1: {
    ru: "Система,<br />стоящая за сервисом.",
    uz: "Xizmat ortidagi<br />tizim.",
    en: "The system<br />behind the service.",
  },
  desc: {
    ru: "Каждый месяц GoARKAN формирует отчёт о производительности по вашему аккаунту — на основе данных системы, зафиксировавшей каждую заявку, изменение активов, оповещение инфраструктуры и применённый патч за этот период. Отчёт отражает то, что было на самом деле.",
    uz: "Har oy GoARKAN hisobingiz bo'yicha samaradorlik hisobotini tuzadi — ushbu davr uchun har bir murojaat, aktivlar o'zgarishi, infratuzilma ogohlantirishlari va qo'llanilgan yamoqlarni qayd etgan tizim ma'lumotlari asosida. Hisobot haqiqatda bo'lgan narsani aks ettiradi.",
    en: "Every month GoARKAN generates a performance report for your account — based on system data that recorded every ticket, asset change, infrastructure alert, and applied patch during that period. The report reflects what actually happened.",
  },
  ctaLabel: { ru: "Посмотреть, как работает GoARKAN", uz: "GoARKAN qanday ishlashini ko'rish", en: "See how GoARKAN works" },
  ctaHref: "/goarkan",
  includedLabel: { ru: "Что охватывает GoARKAN", uz: "GoARKAN nimani qamrab oladi", en: "What GoARKAN covers" },
  included: [
    { ru: "Управление заявками — от подачи до закрытия", uz: "Murojaatlarni boshqarish — topshirishdan yopishgacha", en: "Ticket management — from submission to closure" },
    { ru: "Инвентаризация активов — обновляется при каждом изменении оборудования", uz: "Aktivlar inventarizatsiyasi — har bir uskunalar o'zgarishida yangilanadi", en: "Asset inventory — updated with every hardware change" },
    { ru: "База знаний: схемы сети, конфигурации, инструкции", uz: "Bilimlar bazasi: tarmoq sxemalari, konfiguratsiyalar, ko'rsatmalar", en: "Knowledge base: network diagrams, configurations, instructions" },
    { ru: "Ежемесячные отчёты на основе операционных данных GoARKAN", uz: "GoARKAN operatsion ma'lumotlari asosida oylik hisobotlar", en: "Monthly reports based on GoARKAN operational data" },
    { ru: "Ежеквартальный обзор: объём, целевые показатели, прогноз затрат", uz: "Choraklik sharh: hajm, maqsadli ko'rsatkichlar, xarajatlar bashorati", en: "Quarterly review: volume, targets, cost forecast" },
    { ru: "Классификация приоритетов инцидентов с заданным временем реакции", uz: "Belgilangan javob vaqti bilan intsidentlarni ustuvorlik bo'yicha tasniflash", en: "Incident priority classification with defined response times" },
    { ru: "Управление изменениями — документируется до применения", uz: "O'zgarishlarni boshqarish — qo'llanilgunga qadar hujjatlashtiriladi", en: "Change management — documented before applied" },
    { ru: "Клиентский портал — статус заявок виден в любое время", uz: "Mijoz portali — murojaatlar holati istalgan vaqtda ko'rinadi", en: "Client portal — ticket status visible at any time" },
  ],
};

export default function ITSMPage() {
  return (
    <ServicePageLayout
      copy={copy}
      schemas={
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itsmSchema) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
        </>
      }
    />
  );
}
