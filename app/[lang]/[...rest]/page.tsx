import { notFound } from "next/navigation";

/** Любой несуществующий адрес → фирменная страница 404 (app/[lang]/not-found.tsx). */
export default function CatchAll() {
  notFound();
}
