import type { Metadata } from "next";
import { ServicePageLayout, type ServicePageCopy } from "@/components/sections/ServicePageLayout";
import { cybersecuritySchema, buildBreadcrumbSchema } from "@/lib/seo";

const breadcrumb = buildBreadcrumbSchema([
  { name: "Главная", url: "/" },
  { name: "Услуги", url: "/services" },
  { name: "Кибербезопасность", url: "/services/managed-it" },
]);

export const metadata: Metadata = {
  title: "Кибербезопасность для бизнеса | ARKANA — Ташкент",
  description:
    "ARKANA выстраивает и поддерживает базовую безопасность для бизнеса в Узбекистане: защита конечных точек, управление доступом, тестирование резервных копий, реагирование на инциденты.",
  alternates: { canonical: "/services/managed-it" },
  openGraph: {
    title: "Кибербезопасность для бизнеса | ARKANA",
    description:
      "Защита конечных точек, управление доступом, ежеквартальное тестирование резервного копирования, обучение сотрудников, управление патчами и реагирование на инциденты — для бизнеса в Узбекистане.",
    url: "/services/managed-it",
  },
};

const copy: ServicePageCopy = {
  backLabel: { ru: "Все услуги", uz: "Barcha xizmatlar", en: "All services" },
  eyebrow: { ru: "Кибербезопасность", uz: "Kiberxavfsizlik", en: "Cybersecurity" },
  h1: {
    ru: "Безопасность, которую<br />ваш бизнес реально<br />сможет поддерживать.",
    uz: "Xavfsizlik, biznesingiz<br />haqiqatda qo'llab-<br />quvvata oladigan.",
    en: "Security your business<br />can actually<br />maintain.",
  },
  desc: {
    ru: "Большинство компаний страдают от одних и тех же проблем: один скомпрометированный аккаунт, одна непропатченная система, одна резервная копия, которую никогда не проверяли. ARKANA выстраивает защиту от этих рисков и поддерживает её по чёткому расписанию.",
    uz: "Ko'pchilik kompaniyalar bir xil muammolardan aziyat chekadi: bitta buzilgan hisob, bitta yamoqlanmagan tizim, bitta hech qachon tekshirilmagan zaxira. ARKANA bu xatarlardan himoyani quradi va uni aniq jadval bo'yicha qo'llab-quvvatlaydi.",
    en: "Most companies suffer from the same issues: one compromised account, one unpatched system, one backup that was never tested. ARKANA builds protection against these risks and maintains it on a clear schedule.",
  },
  ctaLabel: { ru: "Найти уязвимости в вашей безопасности", uz: "Xavfsizligingizdagi zaifliklarni topish", en: "Find gaps in your security" },
  ctaHref: "/contact",
  includedLabel: { ru: "Что включено", uz: "Nimalar kiradi", en: "What's included" },
  included: [
    { ru: "Защита конечных точек — централизованная настройка и мониторинг", uz: "Endpoint himoyasi — markazlashtirilgan sozlash va monitoring", en: "Endpoint protection — centralised configuration and monitoring" },
    { ru: "Многофакторная аутентификация и управление доступом", uz: "Ko'p faktorli autentifikatsiya va kirish boshqaruvi", en: "Multi-factor authentication and access management" },
    { ru: "Ежедневный мониторинг резервного копирования, ежеквартальное тестирование восстановления", uz: "Kunlik zaxira monitoringi, choraklik tiklash testi", en: "Daily backup monitoring, quarterly restoration testing" },
    { ru: "Повышение осведомлённости сотрудников в области безопасности — ежеквартально", uz: "Xodimlarning xavfsizlik xabardorligini oshirish — choraklik", en: "Employee security awareness training — quarterly" },
    { ru: "Расписание патчей: ежемесячные плановые, критические — в течение 48 часов", uz: "Yamoqlar jadvali: oylik rejalashtirilgan, kritik — 48 soat ichida", en: "Patch schedule: monthly planned, critical — within 48 hours" },
    { ru: "Процедура реагирования на инциденты — документируется и проверяется ежегодно", uz: "Intsidentlarga munosabat tartibi — yillik hujjatlashtiriladi va tekshiriladi", en: "Incident response procedure — documented and tested annually" },
    { ru: "Аудит доступа при найме, смене роли или увольнении сотрудника", uz: "Yollash, rol o'zgarishi yoki xodimni ishdan bo'shatishda kirish auditi", en: "Access audit on hire, role change, or employee departure" },
    { ru: "Ежемесячный отчёт о состоянии безопасности через GoARKAN", uz: "GoARKAN orqali oylik xavfsizlik holati hisoboti", en: "Monthly security status report via GoARKAN" },
  ],
};

export default function ManagedITPage() {
  return (
    <ServicePageLayout
      copy={copy}
      schemas={
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cybersecuritySchema) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
        </>
      }
    />
  );
}
