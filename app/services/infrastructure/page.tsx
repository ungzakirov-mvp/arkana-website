import type { Metadata } from "next";
import { ServicePageLayout, type ServicePageCopy } from "@/components/sections/ServicePageLayout";
import { infrastructureSchema, buildBreadcrumbSchema } from "@/lib/seo";

const breadcrumb = buildBreadcrumbSchema([
  { name: "Главная", url: "/" },
  { name: "Услуги", url: "/services" },
  { name: "Инфраструктура", url: "/services/infrastructure" },
]);

export const metadata: Metadata = {
  title: "Управление IT-инфраструктурой | ARKANA — Ташкент",
  description:
    "ARKANA мониторит и управляет серверами, сетями, облачными средами и резервными копиями для бизнеса в Узбекистане. Ежемесячный патчинг, ежеквартальное тестирование восстановления.",
  alternates: { canonical: "/services/infrastructure" },
  openGraph: {
    title: "Управление IT-инфраструктурой | ARKANA",
    description:
      "Настроенные пороги оповещений. Ежемесячный план патчинга. Ежеквартальное тестирование восстановления. Инженеры ARKANA мониторят вашу среду и реагируют до того, как ваша команда заметит проблему.",
    url: "/services/infrastructure",
  },
};

const copy: ServicePageCopy = {
  backLabel: { ru: "Все услуги", uz: "Barcha xizmatlar", en: "All services", zh: "所有服务" },
  eyebrow: { ru: "Управление инфраструктурой", uz: "Infratuzilmani boshqarish", en: "Infrastructure Management", zh: "基础设施管理" },
  h1: {
    ru: "Серверы, сети, системы.<br />Инженеры, знающие<br />вашу среду.",
    uz: "Serverlar, tarmoqlar, tizimlar.<br />Muhitingizni bilgan<br />muhandislar.",
    en: "Servers, networks, systems.<br />Engineers who know<br />your environment.",
    zh: "服务器、网络、系统。<br />熟悉您环境的<br />专业工程师。",
  },
  desc: {
    ru: "Сбои инфраструктуры редко бывают внезапными. Им предшествуют сигналы, которые остаются незамеченными, потому что никто не следит. ARKANA назначает инженеров для мониторинга вашей среды с заданными порогами — и реагирует прежде, чем ваша команда заметит проблему.",
    uz: "Infratuzilma nosozliklari kamdan-kam hollarda to'satdan sodir bo'ladi. Ularga odatda hech kim kuzatmaganligi sababli e'tibordan chetda qoladigan signallar oldin keladi. ARKANA muhandislarni belgilangan chegaralar bilan muhitingizni monitoring qilish uchun tayinlaydi va jamoangiz muammoni sezmagunga qadar munosabat bildiradi.",
    en: "Infrastructure failures are rarely sudden. They are preceded by signals that go unnoticed because no one is watching. ARKANA assigns engineers to monitor your environment with defined thresholds — and responds before your team notices a problem.",
    zh: "基础设施故障极少是突然发生的。它们总有先兆，只是因为无人监控而被忽视。ARKANA派驻工程师以预设阈值监控您的环境——在您的团队察觉问题之前主动响应。",
  },
  ctaLabel: { ru: "Запросить бесплатный аудит инфраструктуры", uz: "Bepul infratuzilma auditi so'rash", en: "Request a free infrastructure audit", zh: "申请免费基础设施审计" },
  ctaHref: "/contact",
  includedLabel: { ru: "Что включено", uz: "Nimalar kiradi", en: "What's included", zh: "服务内容" },
  included: [
    { ru: "Мониторинг состояния серверов с настроенными порогами оповещений", uz: "Sozlangan ogohlantirish chegaralari bilan serverlar holatini monitoring qilish", en: "Server health monitoring with configured alert thresholds", zh: "服务器健康监控，配置预警阈值" },
    { ru: "Ежемесячный план обновлений для всех управляемых систем", uz: "Barcha boshqariladigan tizimlar uchun oylik yangilash rejasi", en: "Monthly patching schedule for all managed systems", zh: "所有托管系统的月度补丁计划" },
    { ru: "Мониторинг и управление конфигурацией сетевого оборудования", uz: "Tarmoq uskunalarini monitoring qilish va konfiguratsiyasini boshqarish", en: "Network equipment monitoring and configuration management", zh: "网络设备监控与配置管理" },
    { ru: "Управление облачной средой и отчётность по затратам", uz: "Bulut muhitini boshqarish va xarajatlar bo'yicha hisobot", en: "Cloud environment management and cost reporting", zh: "云环境管理与费用报告" },
    { ru: "Ежедневный мониторинг резервного копирования, ежеквартальное тестирование восстановления", uz: "Kunlik zaxira monitoring, choraklik tiklash testi", en: "Daily backup monitoring, quarterly restoration testing", zh: "每日备份监控，季度恢复测试" },
    { ru: "Отслеживание жизненного цикла оборудования и планирование замены", uz: "Uskunalar hayot davrini kuzatish va almashtirish rejalashtirish", en: "Hardware lifecycle tracking and replacement planning", zh: "硬件生命周期追踪与替换规划" },
    { ru: "Управление изменениями — каждое изменение документируется до применения", uz: "O'zgarishlarni boshqarish — har bir o'zgarish qo'llanilgunga qadar hujjatlashtiriladi", en: "Change management — every change documented before applied", zh: "变更管理——每项变更在实施前留有文档" },
    { ru: "Ежемесячный отчёт по инфраструктуре из GoARKAN", uz: "GoARKANdan oylik infratuzilma hisoboti", en: "Monthly infrastructure report from GoARKAN", zh: "GoARKAN月度基础设施报告" },
  ],
};

export default function InfrastructurePage() {
  return (
    <ServicePageLayout
      copy={copy}
      schemas={
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(infrastructureSchema) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
        </>
      }
    />
  );
}
