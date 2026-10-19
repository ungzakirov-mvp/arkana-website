/** Реальные контакты ARKANA — единый источник для сайта, футера и schema.org (NAP). */
export const COMPANY = {
  name: "ARKANA",
  legalName: "ООО «ARKANA»",
  email: "info@arkana.uz",
  phones: ["+998999981777", "+998501208888"],
  phonesDisplay: ["+998 99 998 17 77", "+998 50 120 88 88"],
  telegram: "https://t.me/arkana_uz",
  telegramHandle: "@arkana_uz",
  address: {
    ru: "Ташкент, МФЙ Бозсув, ул. Хаким-заде, 71",
    uz: "Toshkent, Bo'zsuv MFY, Hakimzoda ko'chasi, 71",
    en: "71 Hakimzoda St, Bozsuv MFY, Tashkent",
    street: "Hakimzoda ko'chasi, 71, Bo'zsuv MFY",
    locality: "Tashkent",
    country: "UZ",
  },
  hours: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
  sameAs: ["https://t.me/arkana_uz"],
} as const;
