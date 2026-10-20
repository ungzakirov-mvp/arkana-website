/**
 * Собственный набор иконок ARKANA (duotone): тонкий контур акцентного цвета + полупрозрачная заливка.
 * Сетка 24×24, линия 1.5. Используются вместо типовых библиотечных иконок в тарифах и GoARKAN.
 */
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

const base = (size = 24) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});
const FILL = "currentColor";
const SOFT = 0.14;

/* ── Тарифы ─────────────────────────────────────────────────────────── */

/** START — один офис: дверь, окна, сигнал связи. */
export function IconPlanStart({ size, ...p }: P) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M4 20V9.5L12 5l8 4.5V20" fill={FILL} fillOpacity={SOFT} />
      <path d="M2.5 20h19" />
      <path d="M10 20v-4.2a2 2 0 0 1 4 0V20" />
      <path d="M7.5 11.5h1.8M14.7 11.5h1.8" />
      <circle cx="12" cy="9.2" r="0.9" fill={FILL} stroke="none" />
    </svg>
  );
}

/** BUSINESS — офис со своим сервером: стойка + связанные узлы. */
export function IconPlanBusiness({ size, ...p }: P) {
  return (
    <svg {...base(size)} {...p}>
      <rect x="3.5" y="4" width="10" height="16" rx="2" fill={FILL} fillOpacity={SOFT} />
      <path d="M3.5 9.3h10M3.5 14.7h10" />
      <circle cx="6.4" cy="6.65" r="0.75" fill={FILL} stroke="none" />
      <circle cx="6.4" cy="12" r="0.75" fill={FILL} stroke="none" />
      <circle cx="6.4" cy="17.35" r="0.75" fill={FILL} stroke="none" />
      <path d="M9 6.65h2.2M9 12h2.2M9 17.35h2.2" />
      <path d="M13.5 12h3" />
      <circle cx="18.5" cy="12" r="2" fill={FILL} fillOpacity={0.35} />
      <path d="M18.5 10V7.5M18.5 14v2.5" />
      <circle cx="18.5" cy="6" r="1.3" />
      <circle cx="18.5" cy="18" r="1.3" />
    </svg>
  );
}

/** ENTERPRISE — компания-сеть: центральное ядро и орбита филиалов. */
export function IconPlanEnterprise({ size, ...p }: P) {
  return (
    <svg {...base(size)} {...p}>
      <circle cx="12" cy="12" r="8.5" strokeDasharray="1.6 2.4" opacity={0.7} />
      <path d="M12 7.2l4.2 2.4v4.8L12 16.8l-4.2-2.4V9.6z" fill={FILL} fillOpacity={0.2} />
      <path d="M12 12l4.2-2.4M12 12v4.8M12 12L7.8 9.6" opacity={0.8} />
      <circle cx="12" cy="3.5" r="1.4" fill={FILL} fillOpacity={0.35} />
      <circle cx="19.4" cy="16.3" r="1.4" fill={FILL} fillOpacity={0.35} />
      <circle cx="4.6" cy="16.3" r="1.4" fill={FILL} fillOpacity={0.35} />
    </svg>
  );
}

/** Галочка списка: мягкий кружок + чёткая отметка. */
export function IconTick({ size = 18, ...p }: P) {
  return (
    <svg {...base(size)} strokeWidth={1.8} {...p}>
      <circle cx="12" cy="12" r="9" fill={FILL} fillOpacity={0.12} stroke="none" />
      <path d="M8 12.3l2.7 2.7L16 9.6" />
    </svg>
  );
}

/* ── GoARKAN: модули ────────────────────────────────────────────────── */

/** Главный экран — плитки, одна «живая» с графиком. */
export function IconHomeScreen({ size, ...p }: P) {
  return (
    <svg {...base(size)} {...p}>
      <rect x="3" y="3.5" width="18" height="17" rx="3" />
      <rect x="5.5" y="6" width="7" height="5.5" rx="1.4" fill={FILL} fillOpacity={0.2} />
      <path d="M6.8 10l1.6-1.6 1.4 1.1 1.7-2" />
      <rect x="14.5" y="6" width="4" height="5.5" rx="1.2" />
      <path d="M5.5 14.5h13M5.5 17.5h8" opacity={0.75} />
    </svg>
  );
}

/** Документооборот — документ с росчерком подписи. */
export function IconDocFlow({ size, ...p }: P) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M6 3.5h8l4.5 4.5v10.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2z" fill={FILL} fillOpacity={SOFT} />
      <path d="M14 3.5V8h4.5" />
      <path d="M7.5 11h6M7.5 13.8h4" opacity={0.75} />
      <path d="M7.3 17.6c1-1.4 1.9-1.6 2.3-.7.3.7-.3 1.2.4 1.1.9-.1 1.4-1.6 2.3-1.4.6.1.5.9 1.1.9.4 0 .8-.3 1.2-.6" />
    </svg>
  );
}

/** Кадры — оргструктура: руководитель и два отдела. */
export function IconOrg({ size, ...p }: P) {
  return (
    <svg {...base(size)} {...p}>
      <circle cx="12" cy="6" r="2.6" fill={FILL} fillOpacity={0.2} />
      <path d="M12 8.6v3M6 15v-1.6a1.8 1.8 0 0 1 1.8-1.8h8.4a1.8 1.8 0 0 1 1.8 1.8V15" />
      <circle cx="6" cy="17.4" r="2.4" />
      <circle cx="18" cy="17.4" r="2.4" />
      <path d="M12 11.6V15" />
      <circle cx="12" cy="17.4" r="2.4" fill={FILL} fillOpacity={SOFT} />
    </svg>
  );
}

/** Service Desk — заявка-тикет с прорезью и меткой времени. */
export function IconDesk({ size, ...p }: P) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2.2a2.3 2.3 0 0 0 0 4.6V17a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3.2a2.3 2.3 0 0 0 0-4.6z" fill={FILL} fillOpacity={SOFT} />
      <path d="M14.5 5v14" strokeDasharray="1.5 2" opacity={0.7} />
      <circle cx="9.3" cy="12" r="2.6" />
      <path d="M9.3 10.7V12l.9.7" />
    </svg>
  );
}

/** Техника и склад — ноутбук и коробка склада. */
export function IconAssets({ size, ...p }: P) {
  return (
    <svg {...base(size)} {...p}>
      <rect x="2.8" y="5" width="11.5" height="8" rx="1.5" fill={FILL} fillOpacity={SOFT} />
      <path d="M1.8 16h13.5" />
      <path d="M16.2 11.2l3.5-1.7 3.5 1.7v5.6l-3.5 1.7-3.5-1.7z" />
      <path d="M16.2 11.2l3.5 1.7 3.5-1.7M19.7 12.9v5.6" opacity={0.75} />
    </svg>
  );
}

/* ── GoARKAN: преимущества ──────────────────────────────────────────── */

/** Вся компания в телефоне. */
export function IconPocketOffice({ size, ...p }: P) {
  return (
    <svg {...base(size)} {...p}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.6" fill={FILL} fillOpacity={SOFT} />
      <path d="M10.5 5h3" />
      <rect x="9" y="8" width="2.6" height="2.6" rx="0.6" />
      <rect x="12.6" y="8" width="2.6" height="2.6" rx="0.6" fill={FILL} fillOpacity={0.35} />
      <rect x="9" y="11.8" width="2.6" height="2.6" rx="0.6" fill={FILL} fillOpacity={0.35} />
      <rect x="12.6" y="11.8" width="2.6" height="2.6" rx="0.6" />
      <circle cx="12" cy="18.3" r="0.8" fill={FILL} stroke="none" />
    </svg>
  );
}

/** Без бумаги — документ с печатью-галочкой. */
export function IconPaperless({ size, ...p }: P) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M5 4.5a2 2 0 0 1 2-2h7l4 4V13" />
      <path d="M13.5 2.5V7H18" />
      <path d="M8 9.5h5M8 12.5h3" opacity={0.75} />
      <circle cx="15.5" cy="17" r="4.5" fill={FILL} fillOpacity={0.18} />
      <path d="M13.6 17.1l1.3 1.3 2.5-2.7" />
      <path d="M5 4.5V19a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

/** Одна система вместо пяти — слои сходятся в один. */
export function IconUnify({ size, ...p }: P) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M12 3.5l8.5 4.3L12 12 3.5 7.8z" fill={FILL} fillOpacity={0.2} />
      <path d="M3.5 12.2L12 16.5l8.5-4.3" />
      <path d="M3.5 16.2L12 20.5l8.5-4.3" opacity={0.6} />
    </svg>
  );
}

/** Начать с одного модуля — ступени роста. */
export function IconGrowth({ size, ...p }: P) {
  return (
    <svg {...base(size)} {...p}>
      <rect x="3.5" y="14" width="4.5" height="6.5" rx="1.2" fill={FILL} fillOpacity={0.3} />
      <rect x="9.75" y="10" width="4.5" height="10.5" rx="1.2" fill={FILL} fillOpacity={SOFT} />
      <rect x="16" y="5.5" width="4.5" height="15" rx="1.2" strokeDasharray="1.6 2" />
      <path d="M4.5 9.5l4-3.5 3 2 5-4.5" />
      <path d="M14.5 3.5h2v2" />
    </svg>
  );
}
