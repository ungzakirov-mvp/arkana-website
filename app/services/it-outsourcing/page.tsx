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
  backLabel: { ru: "Все услуги", uz: "Barcha xizmatlar", en: "All services", zh: "全部服务" },
  eyebrow: { ru: "IT-аутсорсинг", uz: "IT-autsorsing", en: "IT Outsourcing", zh: "IT外包" },
  h1: {
    ru: "Весь ваш IT-отдел.<br />Одна команда. Один договор.",
    uz: "Barcha IT bo'limingiz.<br />Bir jamoa. Bir shartnoma.",
    en: "Your entire IT department.<br />One team. One contract.",
    zh: "您的完整IT部门。<br />一支团队。一份合同。",
  },
  desc: {
    ru: "Именной технический руководитель и инженеры поддержки, закреплённые за вашим аккаунтом — инфраструктура, поддержка пользователей, безопасность и управление поставщиками. Одна фиксированная стоимость в месяц.",
    uz: "Hisobingizga biriktirilgan shaxsiy texnik rahbar va qo'llab-quvvatlash muhandisl — infratuzilma, foydalanuvchi qo'llab-quvvatlash, xavfsizlik va yetkazib beruvchilarni boshqarish. Oyiga bitta belgilangan narx.",
    en: "A dedicated technical manager and support engineers assigned to your account — infrastructure, user support, security, and vendor management. One fixed monthly fee.",
    zh: "专属技术负责人与支持工程师绑定您的账户——基础设施、用户支持、网络安全与供应商管理，每月一个固定价格。",
  },
  ctaLabel: { ru: "Запросить бесплатный аудит", uz: "Bepul audit so'rash", en: "Request a free audit", zh: "申请免费评估" },
  ctaHref: "/contact",
  includedLabel: { ru: "Что включено", uz: "Nimalar kiradi", en: "What's included", zh: "服务内容" },
  included: [
    { ru: "Именной технический руководитель на вашем аккаунте", uz: "Hisobingizda shaxsiy texnik rahbar", en: "Named technical manager for your account", zh: "专属具名技术负责人" },
    { ru: "Инженеры поддержки, знающие вашу среду", uz: "Muhitingizni bilgan qo'llab-quvvatlash muhandisl", en: "Support engineers who know your environment", zh: "熟悉您IT环境的支持工程师" },
    { ru: "Мониторинг инфраструктуры с настроенными порогами оповещений", uz: "Sozlangan ogohlantirish chegaralari bilan infratuzilma monitoringi", en: "Infrastructure monitoring with configured alert thresholds", zh: "基础设施监控及自定义告警阈值" },
    { ru: "Учёт всех обращений через GoARKAN", uz: "GoARKAN orqali barcha murojaatlarni hisobga olish", en: "All requests tracked through GoARKAN", zh: "所有工单通过GoARKAN全程追踪" },
    { ru: "Управление доступом и защита рабочих мест", uz: "Kirish boshqaruvi va ish joylarini himoya qilish", en: "Access management and endpoint protection", zh: "访问管理与终端防护" },
    { ru: "Управление отношениями с поставщиками", uz: "Yetkazib beruvchilar bilan munosabatlarni boshqarish", en: "Vendor relationship management", zh: "供应商关系管理" },
    { ru: "Ежемесячные отчёты о производительности из GoARKAN", uz: "GoARKANdan oylik samaradorlik hisobotlari", en: "Monthly performance reports from GoARKAN", zh: "GoARKAN月度绩效报告" },
    { ru: "Ежеквартальный бизнес-обзор с техническим руководителем", uz: "Texnik rahbar bilan choraklik biznes sharhi", en: "Quarterly business review with your technical manager", zh: "与技术负责人进行季度业务回顾" },
  ],
  stepsHeading: { ru: "Как работает IT-аутсорсинг с ARKANA", uz: "ARKANA bilan IT-autsorsing qanday ishlaydi", en: "How IT outsourcing with ARKANA works", zh: "ARKANA的IT外包如何运作" },
  steps: [
    {
      step: "01",
      title: { ru: "Именное закрепление", uz: "Shaxsiy biriktirish", en: "Named assignment", zh: "专属绑定" },
      body: { ru: "Технический руководитель и инженеры поддержки закрепляются за вашим аккаунтом. Они изучают вашу среду — не только ваши заявки.", uz: "Texnik rahbar va qo'llab-quvvatlash muhandisl hisobingizga biriktiriladi. Ular faqat murojaatlaringizni emas, muhitingizni o'rganadi.", en: "A technical manager and support engineers are assigned to your account. They learn your environment — not just your tickets.", zh: "技术负责人与支持工程师绑定您的账户，深入了解您的IT环境——而不仅仅是处理工单。" },
    },
    {
      step: "02",
      title: { ru: "Персональная ответственность", uz: "Shaxsiy mas'uliyat", en: "Personal accountability", zh: "专属责任" },
      body: { ru: "Один технический руководитель отвечает за весь ваш IT. Вы знаете, кому звонить. Он знает вашу среду, команду и приоритеты.", uz: "Bitta texnik rahbar barcha IT uchun javob beradi. Kimga qo'ng'iroq qilishni bilasiz. U muhitingizni, jamoangizni va ustuvorliklaringizni biladi.", en: "One technical manager is accountable for all your IT. You know who to call. They know your environment, team, and priorities.", zh: "一位技术负责人全面负责您的IT事务。您知道遇事该找谁，而他也熟悉您的环境、团队与优先事项。" },
    },
    {
      step: "03",
      title: { ru: "Прозрачная отчётность", uz: "Shaffof hisobot", en: "Transparent reporting", zh: "透明报告" },
      body: { ru: "Ежемесячные отчёты из GoARKAN: решённые заявки, время реакции по категориям, изменения инфраструктуры. Реальные данные из системы.", uz: "GoARKANdan oylik hisobotlar: hal qilingan murojaatlar, kategoriyalar bo'yicha javob vaqti, infratuzilma o'zgarishlari. Tizimdan haqiqiy ma'lumotlar.", en: "Monthly reports from GoARKAN: resolved tickets, response time by category, infrastructure changes. Real data from the system.", zh: "GoARKAN月度报告：已解决工单、分类响应时间、基础设施变更——均来自系统的真实数据。" },
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
