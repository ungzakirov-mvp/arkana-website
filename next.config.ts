import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    qualities: [75, 90],
  },
  async redirects() {
    return [
      // Старые услуги слиты в новые страницы (308, вес ссылок сохраняется)
      { source: "/services/itsm", destination: "/goarkan", permanent: true },
      { source: "/services/managed-it", destination: "/services/infrastructure", permanent: true },
      { source: "/:lang(uz|en|zh)/services/itsm", destination: "/:lang/goarkan", permanent: true },
      { source: "/:lang(uz|en|zh)/services/managed-it", destination: "/:lang/services/infrastructure", permanent: true },
      // Статьи блога есть на ru (корень) и частично на uz — /uz/blog/* без перевода редиректит сама страница
      { source: "/:lang(en|zh)/blog/:slug", destination: "/blog/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
