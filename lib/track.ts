/** Цели аналитики: Яндекс Метрика (reachGoal) + GA4 (event). Тихо ничего не делает, если счётчики не подключены. */
type W = Window & { ym?: (...a: unknown[]) => void; gtag?: (...a: unknown[]) => void };

export type Goal = "lead_submit" | "click_phone" | "click_telegram" | "click_email" | "open_goarkan";

export function track(goal: Goal, params?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const w = window as W;
  try {
    const id = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
    if (id && w.ym) w.ym(Number(id), "reachGoal", goal, params);
    if (w.gtag) w.gtag("event", goal, params ?? {});
  } catch {
    /* аналитика не должна ломать сайт */
  }
}
