/**
 * Каталог услуг ARKANA для сайта. ЦЕНЫ НА САЙТЕ НЕ ПУБЛИКУЮТСЯ — «по запросу».
 * Цифры живут только в тарифной сетке (docx) и КП. Сюда их не добавлять:
 * всё, что здесь лежит, попадает в JS-бандл и видно в исходнике страницы.
 */

export type Lang = "ru" | "uz" | "en" | "zh";
export type L = { ru: string; uz: string; en: string; zh?: string };

export const tr = (v: L, lang: Lang | string): string =>
  (v as Record<string, string | undefined>)[lang] ?? (lang === "zh" ? v.en : v.ru);


const Y = true;
const N = false;
type Cell = boolean | L;

/* ─── 1. Подписка ───────────────────────────────────────────────────── */

export type SubscriptionPlan = {
  code: "start" | "business" | "enterprise";
  name: string;
  seats: L;
  audience: L;
  recommended?: boolean;
  highlights: L[];
};

export const SUBSCRIPTION: SubscriptionPlan[] = [
  {
    code: "start",
    name: "START",
    seats: { ru: "до 15 рабочих мест", uz: "15 tagacha ish o'rni", en: "up to 15 workstations" },
    audience: { ru: "Офис без своего айтишника", uz: "O'z IT xodimi bo'lmagan ofis", en: "Office without in-house IT" },
    highlights: [
      { ru: "Удалённая помощь без лимита", uz: "Cheklovsiz masofaviy yordam", en: "Unlimited remote help" },
      { ru: "До 8 выездов в месяц", uz: "Oyiga 8 tagacha tashrif", en: "Up to 8 on-site visits a month" },
      { ru: "Реакция — 4 рабочих часа", uz: "Javob — 4 ish soati", en: "Response within 4 business hours" },
      { ru: "ЭЦП, E-IMZO, my.soliq, Didox", uz: "ERI, E-IMZO, my.soliq, Didox", en: "E-signature, E-IMZO, my.soliq, Didox" },
      { ru: "5 заправок картриджей в месяц", uz: "Oyiga 5 ta kartrij to'ldirish", en: "5 cartridge refills a month" },
      { ru: "GoARKAN Service Desk", uz: "GoARKAN Service Desk", en: "GoARKAN Service Desk" },
      { ru: "Отчёт руководителю каждый месяц", uz: "Har oy rahbarga hisobot", en: "Monthly report to management" },
    ],
  },
  {
    code: "business",
    name: "BUSINESS",
    recommended: true,
    seats: { ru: "до 40 рабочих мест", uz: "40 tagacha ish o'rni", en: "up to 40 workstations" },
    audience: { ru: "Компания с сервером и облаком", uz: "Serveri va bulutli xizmatlari bor kompaniya", en: "Company with servers and cloud" },
    highlights: [
      { ru: "Всё из START", uz: "START dagi hammasi", en: "Everything in START" },
      { ru: "До 16 выездов в месяц", uz: "Oyiga 16 tagacha tashrif", en: "Up to 16 on-site visits a month" },
      { ru: "Реакция — 2 рабочих часа", uz: "Javob — 2 ish soati", en: "Response within 2 business hours" },
      { ru: "До 2 серверов, мониторинг и бэкапы", uz: "2 tagacha server, monitoring va zaxira nusxa", en: "Up to 2 servers, monitoring and backups" },
      { ru: "Microsoft 365: почта, Teams, OneDrive", uz: "Microsoft 365: pochta, Teams, OneDrive", en: "Microsoft 365: mail, Teams, OneDrive" },
      { ru: "GoARKAN Офис: учёт техники и склад", uz: "GoARKAN Ofis: texnika hisobi va ombor", en: "GoARKAN Office: assets and stock" },
      { ru: "ИТ-аудит раз в год, −10 % на проекты", uz: "Yiliga IT audit, loyihalarga −10 %", en: "Annual IT audit, −10 % on projects" },
    ],
  },
  {
    code: "enterprise",
    name: "ENTERPRISE",
    seats: { ru: "до 80 рабочих мест", uz: "80 tagacha ish o'rni", en: "up to 80 workstations" },
    audience: { ru: "Компания, где ИТ — часть бизнеса", uz: "IT biznesning bir qismi bo'lgan kompaniya", en: "Company where IT is core to the business" },
    highlights: [
      { ru: "Всё из BUSINESS", uz: "BUSINESS dagi hammasi", en: "Everything in BUSINESS" },
      { ru: "До 30 выездов, инженер в офисе 1 день в неделю", uz: "30 tagacha tashrif, haftada 1 kun ofisda muhandis", en: "Up to 30 visits, engineer on site 1 day a week" },
      { ru: "Реакция — 1 рабочий час", uz: "Javob — 1 ish soati", en: "Response within 1 business hour" },
      { ru: "До 5 серверов, межсетевой экран", uz: "5 tagacha server, tarmoqlararo ekran", en: "Up to 5 servers, firewall" },
      { ru: "Проверка восстановления бэкапов раз в квартал", uz: "Har chorakda zaxiradan tiklashni tekshirish", en: "Quarterly backup restore test" },
      { ru: "GoARKAN Цифровой офис с ЭДО", uz: "GoARKAN Raqamli ofis (EHA bilan)", en: "GoARKAN Digital Office with e-docs" },
      { ru: "Telegram-бот «Лайт» в год, −15 % на проекты", uz: "Yiliga «Lite» Telegram-bot, loyihalarga −15 %", en: "One Lite Telegram bot a year, −15 % on projects" },
    ],
  },
];

export type CompareRow = { group?: L; label?: L; cells?: [Cell, Cell, Cell] };

const l = (ru: string, uz: string, en: string): L => ({ ru, uz, en });

export const SUBSCRIPTION_COMPARE: CompareRow[] = [
  { group: l("Поддержка сотрудников", "Xodimlarni qo'llab-quvvatlash", "Employee support") },
  { label: l("Удалённая помощь: Telegram, телефон, удалённый доступ", "Masofaviy yordam: Telegram, telefon, masofaviy ulanish", "Remote help: Telegram, phone, remote access"), cells: [l("безлимит", "cheklovsiz", "unlimited"), l("безлимит", "cheklovsiz", "unlimited"), l("безлимит", "cheklovsiz", "unlimited")] },
  { label: l("Выезды специалиста в месяц", "Oylik mutaxassis tashriflari", "On-site visits a month"), cells: [l("до 8", "8 tagacha", "up to 8"), l("до 16", "16 tagacha", "up to 16"), l("до 30", "30 tagacha", "up to 30")] },
  { label: l("Реакция на обычную заявку", "Oddiy arizaga javob", "Response to a regular ticket"), cells: [l("4 рабочих часа", "4 ish soati", "4 business hours"), l("2 рабочих часа", "2 ish soati", "2 business hours"), l("1 рабочий час", "1 ish soati", "1 business hour")] },
  { label: l("Критический сбой — реакция / восстановление", "Jiddiy nosozlik — javob / tiklash", "Critical outage — response / restore"), cells: [l("1 ч / 4 ч", "1 s / 4 s", "1 h / 4 h"), l("1 ч / 4 ч", "1 s / 4 s", "1 h / 4 h"), l("1 ч / 4 ч", "1 s / 4 s", "1 h / 4 h")] },
  { label: l("Инженер в вашем офисе по графику", "Jadval bo'yicha ofisingizda muhandis", "Scheduled engineer at your office"), cells: [N, N, l("1 день в неделю", "haftada 1 kun", "1 day a week")] },
  { label: l("Новый сотрудник «под ключ» и отзыв доступов при увольнении", "Yangi xodimni to'liq ulash va ketganda ruxsatlarni bekor qilish", "Onboarding and same-day offboarding"), cells: [Y, Y, Y] },
  { label: l("ЭЦП, E-IMZO, my.soliq, Didox и госпорталы", "ERI, E-IMZO, my.soliq, Didox va davlat portallari", "E-signature, E-IMZO, my.soliq, Didox, gov portals"), cells: [Y, Y, Y] },
  { label: l("Заправка картриджей в месяц", "Oylik kartrij to'ldirish", "Cartridge refills a month"), cells: [l("5", "5", "5"), l("15", "15", "15"), l("25", "25", "25")] },
  { group: l("Серверы, сеть, облако", "Serverlar, tarmoq, bulut", "Servers, network, cloud") },
  { label: l("Серверы на обслуживании", "Xizmatdagi serverlar", "Servers covered"), cells: [N, l("до 2", "2 tagacha", "up to 2"), l("до 5", "5 tagacha", "up to 5")] },
  { label: l("Мониторинг серверов", "Serverlar monitoringi", "Server monitoring"), cells: [N, Y, Y] },
  { label: l("Резервное копирование серверов и Microsoft 365", "Serverlar va Microsoft 365 zaxira nusxasi", "Server and Microsoft 365 backups"), cells: [N, l("ежедневный контроль", "kunlik nazorat", "daily checks"), l("+ проверка восстановления раз в квартал", "+ har chorakda tiklash testi", "+ quarterly restore test")] },
  { label: l("Microsoft 365: учётки, почта, Teams, OneDrive", "Microsoft 365: hisoblar, pochta, Teams, OneDrive", "Microsoft 365: accounts, mail, Teams, OneDrive"), cells: [N, Y, Y] },
  { label: l("Локальная сеть и Wi-Fi", "Lokal tarmoq va Wi-Fi", "LAN and Wi-Fi"), cells: [l("роутер и Wi-Fi", "router va Wi-Fi", "router and Wi-Fi"), l("сеть и Wi-Fi", "tarmoq va Wi-Fi", "network and Wi-Fi"), l("сеть, Wi-Fi, межсетевой экран", "tarmoq, Wi-Fi, firewall", "network, Wi-Fi, firewall")] },
  { group: l("Цифровой офис GoARKAN", "GoARKAN raqamli ofisi", "GoARKAN digital office") },
  { label: l("Service Desk: заявки из Telegram, статусы, история", "Service Desk: Telegram orqali arizalar, holat, tarix", "Service Desk: tickets from Telegram, status, history"), cells: [Y, Y, Y] },
  { label: l("Учёт техники, лицензий, склад, договоры", "Texnika, litsenziya, ombor, shartnomalar hisobi", "Assets, licences, stock, contracts"), cells: [N, Y, Y] },
  { label: l("Документооборот с ЭЦП, дашборд руководителя", "ERI bilan hujjat aylanishi, rahbar paneli", "E-docs with e-signature, management dashboard"), cells: [N, N, Y] },
  { label: l("Telegram-бот «Лайт» под вашу задачу", "Vazifangiz uchun «Lite» Telegram-bot", "Lite Telegram bot for your task"), cells: [N, N, l("1 в год", "yiliga 1", "1 a year")] },
  { group: l("Контроль и прозрачность", "Nazorat va shaffoflik", "Control and transparency") },
  { label: l("Паспорт ИТ-инфраструктуры — передаём вам", "IT infratuzilma pasporti — sizga topshiriladi", "IT infrastructure passport — handed to you"), cells: [Y, Y, Y] },
  { label: l("Отчёт руководителю", "Rahbarga hisobot", "Report to management"), cells: [l("ежемесячно", "har oy", "monthly"), l("ежемесячно", "har oy", "monthly"), l("ежемесячно", "har oy", "monthly")] },
  { label: l("ИТ-аудит с отчётом", "Hisobotli IT audit", "IT audit with report"), cells: [N, l("ежегодно", "har yili", "yearly"), l("ежегодно", "har yili", "yearly")] },
  { label: l("Скидка на проектные работы", "Loyiha ishlariga chegirma", "Discount on projects"), cells: [N, l("10 %", "10 %", "10 %"), l("15 %", "15 %", "15 %")] },
];

export const SUBSCRIPTION_ADDONS: { label: L }[] = [
  { label: l("Дополнительное рабочее место", "Qo'shimcha ish o'rni", "Extra workstation") },
  { label: l("Дополнительный сервер (физический / виртуальный)", "Qo'shimcha server (jismoniy / virtual)", "Extra server (physical / virtual)") },
  { label: l("Межсетевой экран (START и BUSINESS)", "Tarmoqlararo ekran (START va BUSINESS)", "Firewall (START and BUSINESS)") },
  { label: l("Бэкап и мониторинг сервера (START)", "Server zaxirasi va monitoringi (START)", "Server backup and monitoring (START)") },
  { label: l("Microsoft 365 / Google Workspace (START)", "Microsoft 365 / Google Workspace (START)", "Microsoft 365 / Google Workspace (START)") },
  { label: l("Поддержка 24/7 по критическим сбоям", "Jiddiy nosozliklar bo'yicha 24/7 yordam", "24/7 support for critical outages") },
  { label: l("Инженер в офисе: дополнительный день в неделю", "Ofisda muhandis: haftada qo'shimcha kun", "Engineer on site: extra day a week") },
];

export const SUBSCRIPTION_TERMS: L[] = [
  l("Договор на 12 месяцев, оплата ежемесячно до 5-го числа. Первый месяц — пилот: можно выйти без объяснений.", "Shartnoma 12 oyga, to'lov har oy 5-sanagacha. Birinchi oy — sinov: sababsiz chiqish mumkin.", "12-month contract, paid monthly by the 5th. The first month is a pilot — you can leave without explanation."),
    l("Бесплатный аудит при подключении и паспорт ИТ-инфраструктуры — ваша собственность.", "Ulanishda bepul audit va IT infratuzilma pasporti — sizning mulkingiz.", "Free audit at onboarding; the IT infrastructure passport is yours."),
  l("Не входят: проекты (внедрения, миграции), работы вне рабочего времени, комплектующие и лицензии.", "Kirmaydi: loyihalar (joriy etish, ko'chirish), ish vaqtidan tashqari ishlar, butlovchi qismlar va litsenziyalar.", "Not included: projects (rollouts, migrations), after-hours work, parts and licences."),
  l("Больше 80 рабочих мест или несколько офисов — индивидуальный расчёт.", "80 dan ortiq ish o'rni yoki bir nechta ofis — individual hisob.", "Over 80 workstations or several offices — custom quote."),
];

/* ─── 2. По заявкам ─────────────────────────────────────────────────── */

export const ON_DEMAND = {
  terms: [
    l("Будни 9:00–18:00. Реакция до 45 минут, приезд до 3 рабочих часов при наличии свободного специалиста; абоненты обслуживаются первыми.", "Ish kunlari 9:00–18:00. Javob 45 daqiqagacha, bo'sh mutaxassis bo'lsa 3 ish soatigacha yetib kelish; abonentlarga birinchi navbatda xizmat ko'rsatiladi.", "Weekdays 9:00–18:00. Response within 45 minutes, arrival within 3 business hours if an engineer is free; subscribers come first."),
    l("Вне рабочего времени и в выходные — тоже выезжаем, по согласованию.", "Ish vaqtidan tashqari va dam olish kunlari ham kelamiz — kelishuv bo'yicha.", "After hours and weekends — available by arrangement."),
    l("По каждой заявке — номер в GoARKAN, акт и счёт.", "Har bir ariza — GoARKAN da raqam, dalolatnoma va hisob-faktura.", "Every job gets a GoARKAN ticket number, an act and an invoice."),
    l("Стоимость фиксируем до начала работ — по прайсу из 200+ позиций, он идёт приложением к договору.", "Narx ish boshlanishidan oldin belgilanadi — 200+ bandli narxlar ro'yxati shartnomaga ilova qilinadi.", "The price is agreed before work starts, from a 200+ item price list annexed to the contract."),
  ],
  works: [
    { label: l("Диагностика компьютера и устранение программной неисправности", "Kompyuter diagnostikasi va dasturiy nosozlikni tuzatish", "PC diagnostics and software fix"), unit: l("заявка", "ariza", "job") },
    { label: l("Подключение компьютера на рабочем месте: сеть, принтеры, сервисы", "Ish o'rnida kompyuterni ulash: tarmoq, printerlar, xizmatlar", "Set up a PC at a workstation: network, printers, services"), unit: l("рабочее место", "ish o'rni", "workstation") },
    { label: l("Переустановка Windows с переносом данных", "Ma'lumotlarni saqlab Windows ni qayta o'rnatish", "Windows reinstall with data transfer"), unit: l("рабочее место", "ish o'rni", "workstation") },
    { label: l("Установка и настройка программ (до 5)", "Dasturlarni o'rnatish va sozlash (5 tagacha)", "Install and configure software (up to 5)"), unit: l("рабочее место", "ish o'rni", "workstation") },
    { label: l("Новый сотрудник: учётка, почта, программы, доступы", "Yangi xodim: hisob, pochta, dasturlar, ruxsatlar", "New employee: account, mail, software, access"), unit: l("сотрудник", "xodim", "employee") },
    { label: l("Установка E-IMZO и ключей ЭЦП", "E-IMZO va ERI kalitlarini o'rnatish", "Install E-IMZO and e-signature keys"), unit: l("рабочее место", "ish o'rni", "workstation") },
    { label: l("Настройка my.soliq.uz, Didox и других госпорталов", "my.soliq.uz, Didox va boshqa davlat portallarini sozlash", "Set up my.soliq.uz, Didox and other gov portals"), unit: l("рабочее место", "ish o'rni", "workstation") },
    { label: l("Подключение принтера или сканера", "Printer yoki skanerni ulash", "Connect a printer or scanner"), unit: l("устройство", "qurilma", "device") },
    { label: l("Чистка системного блока, замена термопасты", "Tizim blokini tozalash, termopastani almashtirish", "PC cleaning, thermal paste replacement"), unit: l("рабочее место", "ish o'rni", "workstation") },
    { label: l("Замена комплектующих (без их стоимости)", "Butlovchi qismlarni almashtirish (narxisiz)", "Replace parts (parts not included)"), unit: l("рабочее место", "ish o'rni", "workstation") },
    { label: l("Установка и настройка Wi-Fi роутера", "Wi-Fi routerni o'rnatish va sozlash", "Install and configure a Wi-Fi router"), unit: l("устройство", "qurilma", "device") },
    { label: l("Подключение рабочего места к сети, патч-корды", "Ish o'rnini tarmoqqa ulash, patch-kordlar", "Network port patching"), unit: l("порт", "port", "port") },
    { label: l("Прокладка кабельной линии до 30 м (без материалов)", "30 m gacha kabel tortish (materiallarsiz)", "Cable run up to 30 m (materials extra)"), unit: l("линия", "liniya", "line") },
    { label: l("Подключение и настройка IP-телефона", "IP-telefonni ulash va sozlash", "Connect and configure an IP phone"), unit: l("аппарат", "apparat", "phone") },
    { label: l("Подключение и настройка IP-камеры", "IP-kamerani ulash va sozlash", "Connect and configure an IP camera"), unit: l("камера", "kamera", "camera") },
    { label: l("Диагностика и устранение неисправности сети", "Tarmoq nosozligini aniqlash va tuzatish", "Network fault diagnostics and fix"), unit: l("заявка", "ariza", "job") },
  ],
};

/* ─── 3. Проекты ────────────────────────────────────────────────────── */

export const PROJECTS: { group: L; items: { label: L; unit: L }[] }[] = [
  {
    group: l("Офис и сеть", "Ofis va tarmoq", "Office and network"),
    items: [
      { label: l("Корпоративная сеть Wi-Fi с контроллером (до 20 точек)", "Kontrollerli korporativ Wi-Fi tarmog'i (20 nuqtagacha)", "Corporate Wi-Fi with controller (up to 20 APs)"), unit: l("проект", "loyiha", "project") },
      { label: l("Настройка управляемого коммутатора или маршрутизатора", "Boshqariladigan kommutator yoki marshrutizatorni sozlash", "Managed switch or router configuration"), unit: l("устройство", "qurilma", "device") },
      { label: l("Сегментация сети VLAN (до 10 коммутаторов)", "VLAN tarmoq segmentatsiyasi (10 kommutatorgacha)", "VLAN segmentation (up to 10 switches)"), unit: l("проект", "loyiha", "project") },
      { label: l("Проект локальной сети и СКС (до 100 портов)", "Lokal tarmoq va SKS loyihasi (100 portgacha)", "LAN and structured cabling design (up to 100 ports)"), unit: l("проект", "loyiha", "project") },
    ],
  },
  {
    group: l("Серверы и данные", "Serverlar va ma'lumotlar", "Servers and data"),
    items: [
      { label: l("Установка сервера: Windows Server или Linux", "Server o'rnatish: Windows Server yoki Linux", "Server install: Windows Server or Linux"), unit: l("сервер", "server", "server") },
      { label: l("Домен Active Directory под ключ (до 100 мест)", "Active Directory domeni (100 o'ringacha)", "Active Directory domain turnkey (up to 100 seats)"), unit: l("проект", "loyiha", "project") },
      { label: l("Файловый сервер с разграничением прав", "Huquqlar ajratilgan fayl server", "File server with access control"), unit: l("сервер", "server", "server") },
      { label: l("Виртуализация: Proxmox / Hyper-V / VMware", "Virtualizatsiya: Proxmox / Hyper-V / VMware", "Virtualization: Proxmox / Hyper-V / VMware"), unit: l("хост", "xost", "host") },
      { label: l("Резервное копирование Veeam под ключ", "Veeam zaxira nusxalash", "Veeam backup turnkey"), unit: l("проект", "loyiha", "project") },
      { label: l("Сервер 1С:Предприятие", "1C:Enterprise serveri", "1C:Enterprise server"), unit: l("сервер", "server", "server") },
    ],
  },
  {
    group: l("Телефония и видеонаблюдение", "Telefoniya va videokuzatuv", "Telephony and CCTV"),
    items: [
      { label: l("IP-телефония Asterisk / FreePBX (до 50 абонентов)", "Asterisk / FreePBX IP-telefoniya (50 abonentgacha)", "Asterisk / FreePBX IP telephony (up to 50 users)"), unit: l("сервер", "server", "server") },
      { label: l("Защита системы видеонаблюдения: пароли, сегментация", "Videokuzatuv tizimini himoyalash: parollar, segmentatsiya", "CCTV hardening: passwords, segmentation"), unit: l("система", "tizim", "system") },
    ],
  },
  {
    group: l("Безопасность", "Xavfsizlik", "Security"),
    items: [
      { label: l("Межсетевой экран FortiGate: политики (до 100 правил)", "FortiGate firewall: siyosatlar (100 qoidagacha)", "FortiGate firewall policies (up to 100 rules)"), unit: l("проект", "loyiha", "project") },
      { label: l("Удалённый доступ VPN для сотрудников (до 50)", "Xodimlar uchun VPN (50 tagacha)", "Staff VPN remote access (up to 50)"), unit: l("устройство", "qurilma", "device") },
      { label: l("Многофакторная аутентификация (MFA)", "Ko'p faktorli autentifikatsiya (MFA)", "Multi-factor authentication (MFA)"), unit: l("система", "tizim", "system") },
    ],
  },
  {
    group: l("Аудит и миграция", "Audit va ko'chirish", "Audit and migration"),
    items: [
      { label: l("Аудит ИТ-инфраструктуры с отчётом (до 100 мест и 10 серверов)", "IT infratuzilma auditi hisobot bilan (100 o'rin va 10 servergacha)", "IT infrastructure audit with report (up to 100 seats, 10 servers)"), unit: l("проект", "loyiha", "project") },
      { label: l("Инвентаризация ИТ-активов (до 100 мест)", "IT aktivlarni inventarizatsiya qilish (100 o'ringacha)", "IT asset inventory (up to 100 seats)"), unit: l("проект", "loyiha", "project") },
      { label: l("Миграция почты (до 100 ящиков)", "Pochtani ko'chirish (100 qutigacha)", "Mail migration (up to 100 mailboxes)"), unit: l("проект", "loyiha", "project") },
      { label: l("Переезд офиса (до 20 рабочих мест)", "Ofis ko'chishi (20 ish o'rnigacha)", "Office move (up to 20 seats)"), unit: l("смета", "smeta", "estimate") },
    ],
  },
];

export const PROJECT_TERMS: L[] = [
  l("Цена известна до начала, смета не растёт без вашего согласия.", "Narx boshlashdan oldin ma'lum, smeta roziligingizsiz oshmaydi.", "Price is fixed before we start; the estimate never grows without your approval."),
  l("Крупные проекты — предоплата 50 %, остаток после акта. Гарантия на работы — 30 дней.", "Yirik loyihalar — 50 % oldindan to'lov, qolgani dalolatnomadan keyin. Ishlarga kafolat — 30 kun.", "Large projects — 50 % upfront, rest after acceptance. 30-day warranty on work."),
  l("Абонентам BUSINESS — скидка 10 %, ENTERPRISE — 15 %.", "BUSINESS abonentlariga — 10 %, ENTERPRISE — 15 % chegirma.", "BUSINESS subscribers get 10 % off, ENTERPRISE 15 %."),
];

/* ─── 4. GoARKAN ────────────────────────────────────────────────────── */

export const GOARKAN_PLANS: { code: string; name: L; staff: L; storage: string; setup: L; features: [boolean, boolean, boolean, boolean, boolean, boolean] }[] = [
  { code: "sd", name: l("Service Desk", "Service Desk", "Service Desk"), staff: l("до 50 сотрудников", "50 xodimgacha", "up to 50 staff"), storage: "10 GB", setup: l("внедрение: настройка, импорт данных, обучение", "joriy etish: sozlash, ma'lumotlarni import qilish, o'qitish", "setup: configuration, data import, training"), features: [Y, N, N, N, N, N] },
  { code: "office", name: l("Офис", "Ofis", "Office"), staff: l("до 150 сотрудников", "150 xodimgacha", "up to 150 staff"), storage: "50 GB", setup: l("внедрение: настройка, импорт данных, обучение", "joriy etish: sozlash, ma'lumotlarni import qilish, o'qitish", "setup: configuration, data import, training"), features: [Y, Y, Y, Y, N, N] },
  { code: "digital", name: l("Цифровой офис", "Raqamli ofis", "Digital Office"), staff: l("до 300 сотрудников", "300 xodimgacha", "up to 300 staff"), storage: "200 GB", setup: l("внедрение: настройка, импорт данных, обучение", "joriy etish: sozlash, ma'lumotlarni import qilish, o'qitish", "setup: configuration, data import, training"), features: [Y, Y, Y, Y, Y, Y] },
];

export const GOARKAN_FEATURES: L[] = [
  l("Service Desk, Telegram-бот, SLA, отчёты", "Service Desk, Telegram-bot, SLA, hisobotlar", "Service Desk, Telegram bot, SLA, reports"),
  l("Учёт техники и лицензий", "Texnika va litsenziyalar hisobi", "Assets and licences"),
  l("Склад", "Ombor", "Stock"),
  l("Договоры и сроки", "Shartnomalar va muddatlar", "Contracts and deadlines"),
  l("Документооборот с электронной подписью", "Elektron imzoli hujjat aylanishi", "E-docs with electronic signature"),
  l("Дашборд руководителя", "Rahbar paneli", "Management dashboard"),
];

/* ─── 5. Боты и разработка ─────────────────────────────────────────── */

export const BOT_PLANS: { code: string; name: string; term: L; does: L; integrations: L; support: L; recommended?: boolean }[] = [
  { code: "lite", name: "LITE", term: l("7 рабочих дней", "7 ish kuni", "7 business days"), does: l("Заявки, опросы, уведомления, справочник", "Arizalar, so'rovnomalar, bildirishnomalar, ma'lumotnoma", "Requests, surveys, notifications, FAQ"), integrations: l("—", "—", "—"), support: l("хостинг, мониторинг, бэкапы, правки", "xosting, monitoring, zaxira, tuzatishlar", "hosting, monitoring, backups, changes") },
  { code: "standard", name: "STANDARD", recommended: true, term: l("15 рабочих дней", "15 ish kuni", "15 business days"), does: l("+ роли и права, админ-панель, отчёты", "+ rollar va huquqlar, admin panel, hisobotlar", "+ roles, admin panel, reports"), integrations: l("Google Sheets, 1С, CRM, GoARKAN", "Google Sheets, 1C, CRM, GoARKAN", "Google Sheets, 1C, CRM, GoARKAN"), support: l("хостинг, мониторинг, бэкапы, правки", "xosting, monitoring, zaxira, tuzatishlar", "hosting, monitoring, backups, changes") },
  { code: "pro", name: "PRO", term: l("по смете, от 30 рабочих дней", "smeta bo'yicha, 30 ish kunidan", "by estimate, from 30 business days"), does: l("+ платежи, личный кабинет, несколько каналов", "+ to'lovlar, shaxsiy kabinet, bir nechta kanal", "+ payments, user accounts, multiple channels"), integrations: l("любые по ТЗ", "TZ bo'yicha istalgan", "any, per spec"), support: l("хостинг, мониторинг, бэкапы, правки", "xosting, monitoring, zaxira, tuzatishlar", "hosting, monitoring, backups, changes") },
];

export const BOT_NOTE = l(
  "В сопровождение входят хостинг на наших серверах, мониторинг, резервные копии и правки до 2 часов в месяц. Порталы, приложения и интеграции крупнее бота — выделенной командой по смете.",
  "Kuzatuvga serverlarimizda xosting, monitoring, zaxira nusxalar va oyiga 2 soatgacha tuzatishlar kiradi. Botdan kattaroq portal, ilova va integratsiyalar — alohida jamoa bilan smeta bo'yicha.",
  "Support covers hosting on our servers, monitoring, backups and up to 2 hours of changes a month. Portals, apps and integrations bigger than a bot are built by a dedicated team per estimate.",
);

export const GENERAL_TERMS: L[] = [
  l("Расчёт под вашу компанию — в течение рабочего дня после заявки. Цены в сумах, без НДС.", "Kompaniyangiz uchun hisob — arizadan keyin bir ish kuni ichida. Narxlar so'mda, QQSsiz.", "A quote for your company within one business day of your request. Prices in UZS, VAT-exempt."),
  l("Один рамочный договор на все продукты; акт и счёт по каждой работе, оплата безналичным расчётом.", "Barcha mahsulotlar uchun bitta ramkaviy shartnoma; har bir ishga dalolatnoma va hisob-faktura, naqd pulsiz to'lov.", "One framework contract for everything; an act and invoice for every job, bank transfer payment."),
  l("Лицензии, оборудование и расходные материалы — отдельно, по согласованной спецификации.", "Litsenziyalar, uskunalar va sarf materiallari — alohida, kelishilgan spetsifikatsiya bo'yicha.", "Licences, hardware and consumables are billed separately per agreed spec."),
];

/* ─── «Что выбрать» ─────────────────────────────────────────────────── */

export const CHOOSER: { situation: L; solution: L; href: string }[] = [
  { situation: l("Нет своего айтишника, до 15 сотрудников", "O'z IT xodimi yo'q, 15 xodimgacha", "No in-house IT, up to 15 staff"), solution: l("Подписка START", "START obunasi", "START subscription"), href: "#subscription" },
  { situation: l("20–40 сотрудников, есть сервер", "20–40 xodim, serveri bor", "20–40 staff, own server"), solution: l("Подписка BUSINESS", "BUSINESS obunasi", "BUSINESS subscription"), href: "#subscription" },
  { situation: l("40–80 сотрудников, серверы, документооборот", "40–80 xodim, serverlar, hujjat aylanishi", "40–80 staff, servers, e-docs"), solution: l("Подписка ENTERPRISE", "ENTERPRISE obunasi", "ENTERPRISE subscription"), href: "#subscription" },
  { situation: l("Проблемы бывают редко", "Muammolar kamdan-kam bo'ladi", "Problems are rare"), solution: l("По заявкам", "Ariza bo'yicha", "Pay per job"), href: "#on-demand" },
  { situation: l("Разово: сеть, сервер, Wi-Fi, видеонаблюдение", "Bir martalik: tarmoq, server, Wi-Fi, videokuzatuv", "One-off: network, server, Wi-Fi, CCTV"), solution: l("Проект", "Loyiha", "Project"), href: "#projects" },
  { situation: l("Свой ИТ-отдел, нужен порядок в заявках и технике", "O'z IT bo'limi bor, arizalar va texnikada tartib kerak", "Own IT team, need order in tickets and assets"), solution: l("GoARKAN Офис", "GoARKAN Ofis", "GoARKAN Office"), href: "#goarkan" },
  { situation: l("Автоматизировать заявки и учёт через Telegram", "Arizalar va hisobni Telegram orqali avtomatlashtirish", "Automate requests and records via Telegram"), solution: l("Бот под ключ", "Tayyor bot", "Turnkey bot"), href: "#bots" },
];

/** Услуги для schema.org (без цен) */
export const SCHEMA_SERVICES = [
  "IT-аутсорсинг и абонентское обслуживание компьютеров",
  "Выезд компьютерного мастера по Ташкенту",
  "Настройка сетей, Wi-Fi и серверов",
  "IP-телефония и видеонаблюдение",
  "Установка E-IMZO, ЭЦП, настройка Didox и my.soliq",
  "Microsoft 365 и корпоративная почта",
  "Цифровой офис GoARKAN: Service Desk, учёт техники, ЭДО",
  "Разработка Telegram-ботов",
];
