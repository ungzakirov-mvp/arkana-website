/**
 * Контент SEO-посадочных под услуги. Без цен (цены — по запросу).
 * Один объект = одна страница /services/<slug>, на 3 языках (zh берёт en).
 */
import type { L } from "@/lib/pricing";

export type Landing = {
  slug: string;
  service: string; // значение для LeadForm (SERVICES.v)
  meta: { title: string; description: string };
  badge: L;
  h1: L;
  sub: L;
  points: L[]; // короткие преимущества в первом экране
  whatTitle: L;
  what: { t: L; d: L }[];
  stepsTitle: L;
  steps: { t: L; d: L }[];
  faq: { q: L; a: L }[];
  formTitle: L;
  related: { href: string; label: L }[];
};

const l = (ru: string, uz: string, en: string): L => ({ ru, uz, en });

const STEPS_ONSITE = [
  { t: l("Заявка", "Ariza", "Request"), d: l("Звоните, пишите в Telegram или оставляете заявку на сайте.", "Qo'ng'iroq qiling, Telegramga yozing yoki saytda ariza qoldiring.", "Call, message us on Telegram or leave a request on the site.") },
  { t: l("Цена до начала", "Narx oldindan", "Price upfront"), d: l("Называем стоимость по прайсу до выезда — без сюрпризов.", "Tashrifdan oldin narxlar ro'yxati bo'yicha narxni aytamiz — kutilmagan xarajatlarsiz.", "We quote from the price list before the visit — no surprises.") },
  { t: l("Выезд и работа", "Tashrif va ish", "Visit and work"), d: l("Инженер приезжает и решает задачу. За один выезд — сколько угодно работ.", "Muhandis kelib, muammoni hal qiladi. Bitta tashrifda — istalgancha ish.", "An engineer comes and fixes it. Any number of jobs per visit.") },
  { t: l("Акт и счёт", "Dalolatnoma va hisob", "Act and invoice"), d: l("Каждая заявка — с номером в GoARKAN, актом и счётом для бухгалтерии.", "Har bir ariza — GoARKAN raqami, dalolatnoma va buxgalteriya uchun hisob bilan.", "Every job gets a GoARKAN number, an act and an invoice for accounting.") },
];

export const LANDINGS: Record<string, Landing> = {
  "on-demand": {
    slug: "on-demand",
    service: "on-demand",
    meta: {
      title: "Компьютерный мастер с выездом в Ташкенте — для офисов и компаний",
      description: "Выезд компьютерного мастера по Ташкенту: ремонт и настройка компьютеров, сети и Wi-Fi, принтеры, E-IMZO и Didox. Цена известна до начала, акт и счёт. Оставьте заявку.",
    },
    badge: l("Выезд по Ташкенту", "Toshkent bo'ylab tashrif", "Call-outs across Tashkent"),
    h1: l("Компьютерный мастер с выездом в офис", "Ofisga kompyuter ustasini chaqirish", "On-site computer technician for your office"),
    sub: l(
      "Не включается компьютер, пропала сеть, не печатает принтер, не видит ключ ЭЦП — приедем и решим. Без абонентской платы: платите только за сделанную работу.",
      "Kompyuter yonmayapti, tarmoq yo'q, printer chop etmayapti, ERI kaliti ko'rinmayapti — kelib hal qilamiz. Abonent to'lovisiz: faqat bajarilgan ish uchun to'laysiz.",
      "PC won't start, network is down, printer won't print, e-signature key not detected — we come and fix it. No subscription: pay only for the work done.",
    ),
    points: [
      l("Цена до начала работ", "Narx ish boshlanishidan oldin", "Price before we start"),
      l("Один выезд — много задач", "Bitta tashrif — ko'p vazifa", "One visit, many jobs"),
      l("Акт и счёт для бухгалтерии", "Buxgalteriya uchun dalolatnoma va hisob", "Act and invoice for accounting"),
    ],
    whatTitle: l("Что делаем на выезде", "Tashrifda nima qilamiz", "What we do on site"),
    what: [
      { t: l("Компьютеры и ноутбуки", "Kompyuter va noutbuklar", "PCs and laptops"), d: l("Диагностика, устранение неисправностей, переустановка Windows с переносом данных, чистка, замена комплектующих.", "Diagnostika, nosozliklarni bartaraf etish, ma'lumotlarni saqlab Windows o'rnatish, tozalash, qismlarni almashtirish.", "Diagnostics, fixes, Windows reinstall with data transfer, cleaning, part replacement.") },
      { t: l("Сеть и Wi-Fi", "Tarmoq va Wi-Fi", "Network and Wi-Fi"), d: l("Настройка роутера и Wi-Fi, подключение рабочих мест, прокладка кабеля, поиск и устранение сбоев сети.", "Router va Wi-Fi sozlash, ish o'rinlarini ulash, kabel tortish, tarmoq nosozliklarini topish va tuzatish.", "Router and Wi-Fi setup, workstation connection, cabling, network troubleshooting.") },
      { t: l("Принтеры и периферия", "Printerlar va periferiya", "Printers and peripherals"), d: l("Подключение и настройка принтеров, сканеров, МФУ, IP-телефонов и IP-камер.", "Printer, skaner, MFU, IP-telefon va IP-kameralarni ulash va sozlash.", "Printers, scanners, MFPs, IP phones and IP cameras.") },
      { t: l("ЭЦП и госпорталы", "ERI va davlat portallari", "E-signature and gov portals"), d: l("Установка E-IMZO и ключей, настройка my.soliq.uz, Didox и других порталов.", "E-IMZO va kalitlarni o'rnatish, my.soliq.uz, Didox va boshqa portallarni sozlash.", "E-IMZO and keys, my.soliq.uz, Didox and other portals.") },
      { t: l("Программы и почта", "Dasturlar va pochta", "Software and mail"), d: l("Установка и настройка программ, почты, Microsoft 365; подготовка рабочего места нового сотрудника.", "Dasturlar, pochta, Microsoft 365 o'rnatish va sozlash; yangi xodim ish o'rnini tayyorlash.", "Software, mail and Microsoft 365 setup; new employee onboarding.") },
      { t: l("Срочные сбои", "Shoshilinch nosozliklar", "Urgent outages"), d: l("Встала работа офиса — приоритетно. Вне рабочего времени и в выходные тоже выезжаем, по согласованию.", "Ofis ishi to'xtadimi — ustuvor. Ish vaqtidan tashqari va dam olish kunlari ham kelamiz, kelishuv bo'yicha.", "Office down — priority. After hours and weekends by arrangement.") },
    ],
    stepsTitle: l("Как это работает", "Qanday ishlaydi", "How it works"),
    steps: STEPS_ONSITE,
    faq: [
      { q: l("Сколько стоит вызов мастера?", "Usta chaqirish qancha turadi?", "How much is a call-out?"), a: l("Стоимость складывается из выезда и работ по фиксированному прайсу. Называем цену до начала — оставьте заявку или позвоните, и мы сразу скажем сумму под вашу задачу.", "Narx tashrif va qat'iy narxlar ro'yxati bo'yicha ishlardan iborat. Narxni oldindan aytamiz — ariza qoldiring yoki qo'ng'iroq qiling, vazifangiz uchun summani darhol aytamiz.", "The price is the call-out plus jobs from a fixed price list. We quote upfront — leave a request or call and we'll tell you the amount.") },
      { q: l("Как быстро приедете?", "Qanchalik tez kelasiz?", "How fast can you come?"), a: l("В будни 9:00–18:00 отвечаем в течение 45 минут и приезжаем в пределах нескольких рабочих часов, если свободен инженер. Клиенты на подписке обслуживаются первыми.", "Ish kunlari 9:00–18:00 da 45 daqiqa ichida javob beramiz va muhandis bo'sh bo'lsa, bir necha ish soati ichida kelamiz. Obunadagi mijozlarga birinchi navbatda xizmat ko'rsatiladi.", "Weekdays 9:00–18:00 we respond within 45 minutes and arrive within a few business hours if an engineer is free. Subscribers come first.") },
      { q: l("Работаете с физлицами?", "Jismoniy shaxslar bilan ishlaysizmi?", "Do you serve individuals?"), a: l("Мы работаем с компаниями и офисами: договор, акт, счёт, оплата перечислением.", "Biz kompaniyalar va ofislar bilan ishlaymiz: shartnoma, dalolatnoma, hisob-faktura, pul o'tkazish orqali to'lov.", "We work with companies and offices: contract, act, invoice, bank transfer.") },
      { q: l("Если обращаемся часто — есть вариант выгоднее?", "Tez-tez murojaat qilsak — arzonroq variant bormi?", "We call often — is there a better option?"), a: l("Да: карта часов на 3 месяца с включёнными выездами или подписка на IT-обслуживание с фиксированным платежом в месяц.", "Ha: tashriflar kiritilgan 3 oylik soatlar kartasi yoki oylik qat'iy to'lovli IT xizmat obunasi.", "Yes: a 3-month hour pack with call-outs included, or an IT support subscription with a fixed monthly fee.") },
      { q: l("Комплектующие покупаете вы?", "Butlovchi qismlarni siz sotib olasizmi?", "Do you supply parts?"), a: l("Подскажем, что купить, и установим. Комплектующие и лицензии оплачиваются отдельно.", "Nima sotib olishni maslahat beramiz va o'rnatamiz. Qismlar va litsenziyalar alohida to'lanadi.", "We advise what to buy and install it. Parts and licences are paid separately.") },
    ],
    formTitle: l("Вызвать мастера", "Usta chaqirish", "Book a technician"),
    related: [
      { href: "/services/it-outsourcing", label: l("IT-обслуживание по подписке", "Obuna bo'yicha IT xizmat", "IT support subscription") },
      { href: "/services/e-imzo", label: l("E-IMZO, ЭЦП и Didox", "E-IMZO, ERI va Didox", "E-IMZO, e-signature and Didox") },
      { href: "/services/infrastructure", label: l("Сети и серверы", "Tarmoq va serverlar", "Networks and servers") },
    ],
  },

  "telegram-bots": {
    slug: "telegram-bots",
    service: "bot",
    meta: {
      title: "Разработка Telegram-ботов в Ташкенте — бот для бизнеса под ключ",
      description: "Создаём Telegram-ботов для бизнеса в Ташкенте: заявки, заказы, опросы, уведомления, интеграция с 1С, Google Sheets и CRM. Фиксированная цена и срок, хостинг и сопровождение.",
    },
    badge: l("Telegram-боты под ключ", "Tayyor Telegram-botlar", "Turnkey Telegram bots"),
    h1: l("Разработка Telegram-ботов для бизнеса", "Biznes uchun Telegram-botlar yaratish", "Telegram bot development for business"),
    sub: l(
      "Бот принимает заявки и заказы, собирает данные, уведомляет сотрудников и клиентов — там, где все уже сидят. Фиксированная цена и срок, запуск от 7 рабочих дней.",
      "Bot ariza va buyurtmalarni qabul qiladi, ma'lumot yig'adi, xodim va mijozlarni xabardor qiladi — hamma allaqachon o'tirgan joyda. Qat'iy narx va muddat, 7 ish kunidan ishga tushirish.",
      "The bot takes requests and orders, collects data, notifies staff and clients — right where everyone already is. Fixed price and deadline, launch from 7 business days.",
    ),
    points: [
      l("Запуск от 7 рабочих дней", "7 ish kunidan ishga tushirish", "Launch from 7 business days"),
      l("Цена фиксируется до старта", "Narx boshlashdan oldin belgilanadi", "Price fixed before start"),
      l("Хостинг и сопровождение", "Xosting va kuzatuv", "Hosting and support"),
    ],
    whatTitle: l("Какие боты делаем", "Qanday botlar yaratamiz", "Bots we build"),
    what: [
      { t: l("Lite — 7 рабочих дней", "Lite — 7 ish kuni", "Lite — 7 business days"), d: l("Заявки, опросы, уведомления, справочник. Для старта и простых процессов.", "Arizalar, so'rovnomalar, bildirishnomalar, ma'lumotnoma. Boshlash va oddiy jarayonlar uchun.", "Requests, surveys, notifications, FAQ. For a quick start and simple processes.") },
      { t: l("Standard — 15 рабочих дней", "Standard — 15 ish kuni", "Standard — 15 business days"), d: l("Роли и права, админ-панель, отчёты, интеграции с Google Sheets, 1С, CRM, GoARKAN.", "Rollar va huquqlar, admin panel, hisobotlar, Google Sheets, 1C, CRM, GoARKAN bilan integratsiya.", "Roles, admin panel, reports, integrations with Google Sheets, 1C, CRM, GoARKAN.") },
      { t: l("Pro — от 30 рабочих дней", "Pro — 30 ish kunidan", "Pro — from 30 business days"), d: l("Платежи, личный кабинет, несколько каналов, любые интеграции по ТЗ.", "To'lovlar, shaxsiy kabinet, bir nechta kanal, TZ bo'yicha istalgan integratsiya.", "Payments, user accounts, multiple channels, any integrations per spec.") },
      { t: l("Боты для сотрудников", "Xodimlar uchun botlar", "Bots for staff"), d: l("Заявки в IT и АХО, согласования, учёт, опросы, рассылки по отделам.", "IT va xo'jalik bo'limiga arizalar, kelishuvlar, hisob, so'rovnomalar, bo'limlarga xabarlar.", "IT and facilities requests, approvals, records, surveys, department broadcasts.") },
      { t: l("Боты для клиентов", "Mijozlar uchun botlar", "Bots for clients"), d: l("Приём заказов и заявок, запись, статусы, уведомления, сбор отзывов.", "Buyurtma va arizalarni qabul qilish, yozilish, holatlar, bildirishnomalar, fikr yig'ish.", "Orders and requests, bookings, status updates, notifications, feedback.") },
      { t: l("Сопровождение", "Kuzatuv", "Support"), d: l("Хостинг на наших серверах, мониторинг, резервные копии и небольшие правки каждый месяц.", "Serverlarimizda xosting, monitoring, zaxira nusxalar va har oy kichik tuzatishlar.", "Hosting on our servers, monitoring, backups and small changes every month.") },
    ],
    stepsTitle: l("Как делаем", "Qanday qilamiz", "How we build"),
    steps: [
      { t: l("Задача", "Vazifa", "Brief"), d: l("Созваниваемся, разбираем процесс и что бот должен делать.", "Qo'ng'iroqda jarayon va bot nima qilishi kerakligini aniqlaymiz.", "We call and map the process and what the bot should do.") },
      { t: l("Смета и срок", "Smeta va muddat", "Estimate and deadline"), d: l("Фиксируем объём, цену и срок в договоре.", "Hajm, narx va muddatni shartnomada belgilaymiz.", "We fix scope, price and deadline in the contract.") },
      { t: l("Разработка", "Ishlab chiqish", "Build"), d: l("Показываем промежуточный результат, вносим правки.", "Oraliq natijani ko'rsatamiz, tuzatishlar kiritamiz.", "We show progress and make changes.") },
      { t: l("Запуск и поддержка", "Ishga tushirish va qo'llab-quvvatlash", "Launch and support"), d: l("Запускаем на сервере, обучаем, сопровождаем.", "Serverda ishga tushiramiz, o'rgatamiz, kuzatib boramiz.", "We deploy, train your team and support it.") },
    ],
    faq: [
      { q: l("Сколько стоит Telegram-бот?", "Telegram-bot qancha turadi?", "How much does a Telegram bot cost?"), a: l("Зависит от функций и интеграций. Есть три формата — Lite, Standard и Pro — с фиксированной ценой. Опишите задачу, и пришлём расчёт в течение рабочего дня.", "Funksiyalar va integratsiyalarga bog'liq. Uchta format bor — Lite, Standard va Pro — qat'iy narx bilan. Vazifani yozing, bir ish kuni ichida hisob yuboramiz.", "It depends on features and integrations. There are three fixed-price formats — Lite, Standard and Pro. Describe the task and we'll send a quote within one business day.") },
      { q: l("Сколько времени занимает разработка?", "Ishlab chiqish qancha vaqt oladi?", "How long does it take?"), a: l("Lite — 7 рабочих дней, Standard — 15, Pro — по смете, от 30 рабочих дней.", "Lite — 7 ish kuni, Standard — 15, Pro — smeta bo'yicha, 30 ish kunidan.", "Lite — 7 business days, Standard — 15, Pro — per estimate, from 30.") },
      { q: l("Где будет работать бот?", "Bot qayerda ishlaydi?", "Where will the bot run?"), a: l("На наших серверах с мониторингом и резервными копиями, либо на вашем сервере — как удобнее.", "Monitoring va zaxira nusxalar bilan serverlarimizda yoki sizning serveringizda — qanday qulay bo'lsa.", "On our servers with monitoring and backups, or on yours — whichever you prefer.") },
      { q: l("Можно связать с 1С или Google Таблицами?", "1C yoki Google Sheets bilan bog'lash mumkinmi?", "Can it connect to 1C or Google Sheets?"), a: l("Да, начиная с формата Standard: Google Sheets, 1С, CRM, GoARKAN. В Pro — любые интеграции по ТЗ.", "Ha, Standard formatidan boshlab: Google Sheets, 1C, CRM, GoARKAN. Pro da — TZ bo'yicha istalgan integratsiya.", "Yes, from Standard: Google Sheets, 1C, CRM, GoARKAN. Pro supports any integration per spec.") },
      { q: l("Код бота будет наш?", "Bot kodi bizniki bo'ladimi?", "Will we own the code?"), a: l("Условия передачи прав фиксируем в договоре до начала работ.", "Huquqlarni topshirish shartlari ish boshlanishidan oldin shartnomada belgilanadi.", "IP transfer terms are fixed in the contract before work starts.") },
    ],
    formTitle: l("Обсудить бота", "Botni muhokama qilish", "Discuss your bot"),
    related: [
      { href: "/goarkan", label: l("GoARKAN — цифровой офис", "GoARKAN — raqamli ofis", "GoARKAN digital office") },
      { href: "/pricing#bots", label: l("Форматы ботов", "Bot formatlari", "Bot formats") },
      { href: "/services/it-outsourcing", label: l("IT-обслуживание", "IT xizmat", "IT support") },
    ],
  },

  "e-imzo": {
    slug: "e-imzo",
    service: "on-demand",
    meta: {
      title: "Установка E-IMZO и ЭЦП, настройка Didox и my.soliq в Ташкенте",
      description: "Установим E-IMZO и ключи ЭЦП, настроим Didox, my.soliq.uz и другие госпорталы на компьютерах вашей компании. Выезд по Ташкенту или удалённо, акт и счёт.",
    },
    badge: l("ЭЦП и госпорталы", "ERI va davlat portallari", "E-signature and gov portals"),
    h1: l("Установка E-IMZO, ЭЦП и настройка Didox", "E-IMZO, ERI o'rnatish va Didox sozlash", "E-IMZO, e-signature and Didox setup"),
    sub: l(
      "Ключ не видится, E-IMZO не запускается, Didox или my.soliq не принимает подпись — настроим на всех компьютерах бухгалтерии и руководства. Выезд или удалённо.",
      "Kalit ko'rinmayapti, E-IMZO ishga tushmayapti, Didox yoki my.soliq imzoni qabul qilmayapti — buxgalteriya va rahbariyatning barcha kompyuterlarida sozlaymiz. Tashrif yoki masofadan.",
      "Key not detected, E-IMZO won't start, Didox or my.soliq rejects the signature — we set it up on every accounting and management PC. On site or remotely.",
    ),
    points: [
      l("Выезд или удалённо", "Tashrif yoki masofadan", "On site or remote"),
      l("Все компьютеры за один визит", "Barcha kompyuterlar bir tashrifda", "All PCs in one visit"),
      l("Входит в IT-подписку", "IT obunaga kiradi", "Included in subscription"),
    ],
    whatTitle: l("Что настраиваем", "Nimani sozlaymiz", "What we set up"),
    what: [
      { t: l("E-IMZO", "E-IMZO", "E-IMZO"), d: l("Установка и обновление модуля E-IMZO, Java и браузерных компонентов.", "E-IMZO moduli, Java va brauzer komponentlarini o'rnatish va yangilash.", "Install and update the E-IMZO module, Java and browser components.") },
      { t: l("Ключи ЭЦП", "ERI kalitlari", "E-signature keys"), d: l("Установка ключей на компьютер или токен, перенос на новый компьютер, проверка срока действия.", "Kalitlarni kompyuter yoki tokenga o'rnatish, yangi kompyuterga ko'chirish, amal qilish muddatini tekshirish.", "Install keys on a PC or token, move them to a new PC, check expiry.") },
      { t: l("Didox", "Didox", "Didox"), d: l("Вход по ЭЦП, подписание и отправка документов, доступы для сотрудников.", "ERI orqali kirish, hujjatlarni imzolash va yuborish, xodimlar uchun ruxsatlar.", "E-signature login, signing and sending documents, staff access.") },
      { t: l("my.soliq.uz и госпорталы", "my.soliq.uz va davlat portallari", "my.soliq.uz and gov portals"), d: l("Настройка входа и работы на my.soliq.uz и других порталах с ЭЦП.", "my.soliq.uz va boshqa portallarda ERI bilan kirish va ishlashni sozlash.", "Login and work on my.soliq.uz and other e-signature portals.") },
      { t: l("Новый сотрудник или компьютер", "Yangi xodim yoki kompyuter", "New employee or PC"), d: l("Готовим рабочее место бухгалтера целиком: ЭЦП, порталы, принтер, программы.", "Buxgalter ish o'rnini to'liq tayyorlaymiz: ERI, portallar, printer, dasturlar.", "We set up a full accountant workstation: e-signature, portals, printer, software.") },
      { t: l("Сбои и ошибки", "Nosozlik va xatolar", "Errors and failures"), d: l("Разбираемся, почему подпись не работает, и устраняем причину.", "Imzo nima uchun ishlamayotganini aniqlab, sababini bartaraf etamiz.", "We find out why signing fails and fix the cause.") },
    ],
    stepsTitle: l("Как это работает", "Qanday ishlaydi", "How it works"),
    steps: STEPS_ONSITE,
    faq: [
      { q: l("Можно настроить удалённо?", "Masofadan sozlash mumkinmi?", "Can you do it remotely?"), a: l("Чаще всего да — через удалённый доступ. Если нужен токен или замена оборудования, приедем.", "Ko'pincha ha — masofaviy ulanish orqali. Token yoki uskunani almashtirish kerak bo'lsa, kelamiz.", "Usually yes, via remote access. If a token or hardware is involved, we come on site.") },
      { q: l("Сколько стоит установка ЭЦП?", "ERI o'rnatish qancha turadi?", "How much is e-signature setup?"), a: l("Цена фиксированная за рабочее место и называется до начала. Оставьте заявку — скажем сумму под ваше число компьютеров.", "Narx ish o'rni uchun qat'iy va oldindan aytiladi. Ariza qoldiring — kompyuterlaringiz soniga qarab summani aytamiz.", "Fixed per workstation and quoted upfront. Leave a request and we'll quote for your number of PCs.") },
      { q: l("Входит ли это в IT-подписку?", "Bu IT obunaga kiradimi?", "Is this included in the subscription?"), a: l("Да, ЭЦП, E-IMZO, my.soliq, Didox и госпорталы входят во все пакеты IT-подписки.", "Ha, ERI, E-IMZO, my.soliq, Didox va davlat portallari barcha IT obuna paketlariga kiradi.", "Yes, e-signature, E-IMZO, my.soliq, Didox and gov portals are in every subscription plan.") },
      { q: l("Вы выпускаете ключи ЭЦП?", "ERI kalitlarini siz chiqarasizmi?", "Do you issue e-signature keys?"), a: l("Нет, ключ выдаёт удостоверяющий центр. Мы устанавливаем и настраиваем всё, чтобы подпись работала.", "Yo'q, kalitni sertifikatlashtirish markazi beradi. Biz imzo ishlashi uchun hammasini o'rnatamiz va sozlaymiz.", "No, keys are issued by a certification centre. We install and configure everything so signing works.") },
    ],
    formTitle: l("Настроить ЭЦП", "ERI sozlash", "Set up e-signature"),
    related: [
      { href: "/services/on-demand", label: l("Выезд компьютерного мастера", "Kompyuter ustasini chaqirish", "On-site technician") },
      { href: "/services/it-outsourcing", label: l("IT-обслуживание по подписке", "Obuna bo'yicha IT xizmat", "IT support subscription") },
    ],
  },
  "it-outsourcing": {
    slug: "it-outsourcing",
    service: "subscription",
    meta: {
      title: "IT-аутсорсинг в Ташкенте — обслуживание компьютеров и офиса по подписке",
      description: "IT-аутсорсинг для бизнеса в Ташкенте: поддержка сотрудников, выезды, серверы и Microsoft 365, ЭЦП и Didox, сроки реакции в договоре, отчёт руководителю. Пакеты START, BUSINESS, ENTERPRISE.",
    },
    badge: l("IT-аутсорсинг в Ташкенте", "Toshkentda IT autsorsing", "IT outsourcing in Tashkent"),
    h1: l("IT-аутсорсинг: ваш IT-отдел по подписке", "IT autsorsing: obuna bo'yicha IT bo'limingiz", "IT outsourcing: your IT department by subscription"),
    sub: l(
      "Берём на себя всё IT компании за фиксированный платёж в месяц: помощь сотрудникам, выезды, серверы, сеть, Microsoft 365, ЭЦП и госпорталы. Сроки реакции — в договоре, отчёт руководителю — каждый месяц.",
      "Kompaniyaning butun IT sini oylik qat'iy to'lov evaziga o'z zimmamizga olamiz: xodimlarga yordam, tashriflar, serverlar, tarmoq, Microsoft 365, ERI va davlat portallari. Javob muddatlari — shartnomada, rahbarga hisobot — har oy.",
      "We take over all of your company's IT for a fixed monthly fee: staff help, on-site visits, servers, network, Microsoft 365, e-signature and gov portals. Response times in the contract, a report to management every month.",
    ),
    points: [
      l("Удалённая помощь без лимита", "Cheklovsiz masofaviy yordam", "Unlimited remote help"),
      l("Сроки реакции в договоре", "Javob muddatlari shartnomada", "Response times in the contract"),
      l("Первый месяц — пилот", "Birinchi oy — sinov", "First month is a pilot"),
    ],
    whatTitle: l("Что входит в подписку", "Obunaga nima kiradi", "What the subscription covers"),
    what: [
      { t: l("Поддержка сотрудников", "Xodimlarni qo'llab-quvvatlash", "Staff support"), d: l("Telegram, телефон, удалённый доступ — без лимита. Выезды в офис по пакету: до 8, 16 или 30 в месяц.", "Telegram, telefon, masofaviy ulanish — cheklovsiz. Ofisga tashriflar paket bo'yicha: oyiga 8, 16 yoki 30 tagacha.", "Telegram, phone, remote access — unlimited. On-site visits per plan: up to 8, 16 or 30 a month.") },
      { t: l("Сотрудники и доступы", "Xodimlar va ruxsatlar", "People and access"), d: l("Новый сотрудник «под ключ»: техника, учётки, почта, доступы. При увольнении — отзыв всех доступов в тот же день.", "Yangi xodim to'liq: texnika, hisoblar, pochta, ruxsatlar. Ishdan ketganda — barcha ruxsatlar shu kuni bekor qilinadi.", "Turnkey onboarding: hardware, accounts, mail, access. Offboarding: all access revoked the same day.") },
      { t: l("Серверы и бэкапы", "Serverlar va zaxira", "Servers and backups"), d: l("Мониторинг серверов, контроль резервных копий серверов и Microsoft 365, в ENTERPRISE — проверка восстановления раз в квартал.", "Serverlar monitoringi, serverlar va Microsoft 365 zaxira nusxalari nazorati, ENTERPRISE da — har chorakda tiklash testi.", "Server monitoring, backup checks for servers and Microsoft 365, plus a quarterly restore test in ENTERPRISE.") },
      { t: l("Microsoft 365 и сеть", "Microsoft 365 va tarmoq", "Microsoft 365 and network"), d: l("Учётки, почта, Teams, OneDrive и защита входа; роутер, Wi-Fi, локальная сеть и межсетевой экран.", "Hisoblar, pochta, Teams, OneDrive va kirish himoyasi; router, Wi-Fi, lokal tarmoq va firewall.", "Accounts, mail, Teams, OneDrive and sign-in protection; router, Wi-Fi, LAN and firewall.") },
      { t: l("ЭЦП и госпорталы", "ERI va davlat portallari", "E-signature and gov portals"), d: l("E-IMZO, ключи ЭЦП, my.soliq.uz, Didox — входит во все пакеты.", "E-IMZO, ERI kalitlari, my.soliq.uz, Didox — barcha paketlarga kiradi.", "E-IMZO, keys, my.soliq.uz, Didox — in every plan.") },
      { t: l("Контроль и отчёт", "Nazorat va hisobot", "Control and reporting"), d: l("Паспорт IT-инфраструктуры передаём вам, заявки — в GoARKAN, отчёт руководителю каждый месяц, ИТ-аудит раз в год.", "IT infratuzilma pasporti sizga topshiriladi, arizalar — GoARKAN da, har oy rahbarga hisobot, yiliga IT audit.", "The infrastructure passport is yours, tickets live in GoARKAN, monthly management report, yearly IT audit.") },
    ],
    stepsTitle: l("Как подключаемся", "Qanday ulanamiz", "How onboarding works"),
    steps: [
      { t: l("Заявка и расчёт", "Ariza va hisob", "Request and quote"), d: l("Сколько сотрудников, серверов и что болит — присылаем расчёт за рабочий день.", "Nechta xodim, server va qanday muammo — bir ish kunida hisob yuboramiz.", "Headcount, servers and pain points — we send a quote within a business day.") },
      { t: l("Бесплатный аудит", "Bepul audit", "Free audit"), d: l("Обходим офис, описываем технику, сеть и риски.", "Ofisni ko'rib chiqamiz, texnika, tarmoq va xavflarni tasvirlaymiz.", "We walk the office and document hardware, network and risks.") },
      { t: l("Договор и подключение", "Shartnoma va ulanish", "Contract and setup"), d: l("Подключаем GoARKAN и Telegram-бот для заявок, инструктируем сотрудников.", "GoARKAN va arizalar uchun Telegram-botni ulaymiz, xodimlarga yo'riqnoma beramiz.", "We connect GoARKAN and the Telegram request bot and brief your staff.") },
      { t: l("Работаем", "Ishlaymiz", "We run it"), d: l("Принимаем заявки, закрываем риски из плана, отчитываемся каждый месяц.", "Arizalarni qabul qilamiz, rejadagi xavflarni yopamiz, har oy hisobot beramiz.", "We handle requests, close the risks from the plan and report monthly.") },
    ],
    faq: [
      { q: l("Сколько стоит IT-аутсорсинг?", "IT autsorsing qancha turadi?", "How much does IT outsourcing cost?"), a: l("Фиксированный платёж в месяц, зависит от числа рабочих мест, серверов и выбранного пакета. Пришлём расчёт в течение рабочего дня после заявки.", "Oylik qat'iy to'lov, ish o'rinlari, serverlar soni va tanlangan paketga bog'liq. Arizadan keyin bir ish kuni ichida hisob yuboramiz.", "A fixed monthly fee depending on seats, servers and plan. We send a quote within one business day.") },
      { q: l("Чем это лучше штатного сисадмина?", "Bu shtatdagi tizim administratoridan nimasi yaxshi?", "Why not hire a sysadmin?"), a: l("Один сотрудник болеет, уходит в отпуск и увольняется, а знания уходят вместе с ним. У нас команда, документация в паспорте инфраструктуры принадлежит вам, сроки реакции записаны в договоре.", "Bitta xodim kasal bo'ladi, ta'tilga chiqadi, ishdan ketadi — bilim u bilan ketadi. Bizda jamoa, infratuzilma pasportidagi hujjatlar sizniki, javob muddatlari shartnomada.", "One employee gets sick, takes leave or quits, and the knowledge leaves too. We are a team, the documentation is yours, and response times are in the contract.") },
      { q: l("Можно попробовать без долгого договора?", "Uzoq shartnomasiz sinab ko'rish mumkinmi?", "Can we try without a long commitment?"), a: l("Да: первый месяц — пилот, можно выйти без объяснений. Или начните с разовых выездов по заявкам.", "Ha: birinchi oy — sinov, sababsiz chiqish mumkin. Yoki ariza bo'yicha bir martalik tashriflardan boshlang.", "Yes: the first month is a pilot you can leave without explanation. Or start with one-off call-outs.") },
      { q: l("Что не входит в подписку?", "Obunaga nima kirmaydi?", "What is not included?"), a: l("Проекты (внедрения, миграции), работы вне рабочего времени, комплектующие и лицензии. Проекты для абонентов — со скидкой.", "Loyihalar (joriy etish, ko'chirish), ish vaqtidan tashqari ishlar, butlovchi qismlar va litsenziyalar. Abonentlar uchun loyihalar — chegirma bilan.", "Projects (rollouts, migrations), after-hours work, parts and licences. Subscribers get project discounts.") },
      { q: l("Если у нас больше 80 рабочих мест?", "80 dan ortiq ish o'rni bo'lsa-chi?", "What if we have more than 80 seats?"), a: l("Делаем индивидуальный расчёт — в том числе для нескольких офисов.", "Individual hisob qilamiz — bir nechta ofis uchun ham.", "We prepare a custom quote, including for multiple offices.") },
    ],
    formTitle: l("Получить расчёт", "Hisob olish", "Get a quote"),
    related: [
      { href: "/pricing#subscription", label: l("Сравнить пакеты", "Paketlarni solishtirish", "Compare plans") },
      { href: "/services/on-demand", label: l("Разовый выезд мастера", "Bir martalik usta chaqirish", "One-off call-out") },
      { href: "/goarkan", label: l("GoARKAN", "GoARKAN", "GoARKAN") },
    ],
  },

  infrastructure: {
    slug: "infrastructure",
    service: "project",
    meta: {
      title: "Настройка сети, Wi-Fi и серверов для офиса в Ташкенте",
      description: "Корпоративный Wi-Fi, локальная сеть и СКС, VLAN, серверы и виртуализация, резервное копирование, 1С, IP-телефония, FortiGate, VPN и MFA. Фиксированная цена за результат, сдача по акту.",
    },
    badge: l("Сети и серверы", "Tarmoq va serverlar", "Networks and servers"),
    h1: l("Сети, Wi-Fi и серверы для офиса", "Ofis uchun tarmoq, Wi-Fi va serverlar", "Office networks, Wi-Fi and servers"),
    sub: l(
      "Проектируем и настраиваем сеть, Wi-Fi, серверы, резервное копирование и телефонию. Смета согласуется до старта и не растёт без вашего согласия, сдаём по акту.",
      "Tarmoq, Wi-Fi, serverlar, zaxira nusxalash va telefoniyani loyihalaymiz va sozlaymiz. Smeta oldindan kelishiladi va roziligingizsiz oshmaydi, dalolatnoma bilan topshiramiz.",
      "We design and set up networks, Wi-Fi, servers, backups and telephony. The estimate is agreed upfront and never grows without approval; signed off with an act.",
    ),
    points: [
      l("Фиксированная цена за результат", "Natija uchun qat'iy narx", "Fixed price for the result"),
      l("Гарантия на работы 30 дней", "Ishlarga 30 kun kafolat", "30-day warranty on work"),
      l("Абонентам — скидка", "Abonentlarga — chegirma", "Discount for subscribers"),
    ],
    whatTitle: l("Что делаем", "Nima qilamiz", "What we do"),
    what: [
      { t: l("Wi-Fi и локальная сеть", "Wi-Fi va lokal tarmoq", "Wi-Fi and LAN"), d: l("Корпоративный Wi-Fi с контроллером, проект сети и СКС, настройка коммутаторов и маршрутизаторов, VLAN.", "Kontrollerli korporativ Wi-Fi, tarmoq va SKS loyihasi, kommutator va marshrutizatorlarni sozlash, VLAN.", "Controller-based corporate Wi-Fi, LAN and cabling design, switch and router setup, VLANs.") },
      { t: l("Серверы", "Serverlar", "Servers"), d: l("Windows Server и Linux, домен Active Directory, файловый сервер с правами, виртуализация Proxmox / Hyper-V / VMware, сервер 1С.", "Windows Server va Linux, Active Directory domeni, huquqli fayl server, Proxmox / Hyper-V / VMware virtualizatsiyasi, 1C serveri.", "Windows Server and Linux, Active Directory, file server with permissions, Proxmox / Hyper-V / VMware, 1C server.") },
      { t: l("Резервное копирование", "Zaxira nusxalash", "Backups"), d: l("Veeam под ключ, схема 3-2-1 с защищённой копией.", "Veeam to'liq, himoyalangan nusxa bilan 3-2-1 sxemasi.", "Turnkey Veeam, 3-2-1 with a protected copy.") },
      { t: l("Телефония и камеры", "Telefoniya va kameralar", "Telephony and cameras"), d: l("IP-телефония Asterisk / FreePBX, подключение IP-телефонов и камер, защита системы видеонаблюдения.", "Asterisk / FreePBX IP-telefoniya, IP-telefon va kameralarni ulash, videokuzatuv tizimini himoyalash.", "Asterisk / FreePBX IP telephony, IP phones and cameras, CCTV hardening.") },
      { t: l("Безопасность", "Xavfsizlik", "Security"), d: l("Межсетевой экран FortiGate, VPN для сотрудников, многофакторная аутентификация.", "FortiGate firewall, xodimlar uchun VPN, ko'p faktorli autentifikatsiya.", "FortiGate firewall, staff VPN, multi-factor authentication.") },
      { t: l("Аудит и переезд", "Audit va ko'chish", "Audit and moves"), d: l("Аудит IT-инфраструктуры с отчётом, инвентаризация, переезд офиса, миграция почты.", "Hisobotli IT infratuzilma auditi, inventarizatsiya, ofis ko'chishi, pochtani ko'chirish.", "IT infrastructure audit with report, inventory, office moves, mail migration.") },
    ],
    stepsTitle: l("Как работаем над проектом", "Loyiha ustida qanday ishlaymiz", "How projects run"),
    steps: [
      { t: l("Обследование", "Tekshiruv", "Survey"), d: l("Смотрим объект и задачу, собираем требования.", "Obyekt va vazifani ko'rib chiqamiz, talablarni yig'amiz.", "We review the site and task and gather requirements.") },
      { t: l("Смета", "Smeta", "Estimate"), d: l("Фиксированная цена и состав работ до начала.", "Ish boshlanishidan oldin qat'iy narx va ishlar tarkibi.", "Fixed price and scope before we start.") },
      { t: l("Работы", "Ishlar", "Work"), d: l("Монтаж и настройка, без остановки офиса где возможно.", "Montaj va sozlash, iloji bo'lsa ofisni to'xtatmasdan.", "Installation and setup, without stopping the office where possible.") },
      { t: l("Сдача по акту", "Dalolatnoma bilan topshirish", "Sign-off"), d: l("Документация, доступы и гарантия 30 дней.", "Hujjatlar, ruxsatlar va 30 kunlik kafolat.", "Documentation, credentials and a 30-day warranty.") },
    ],
    faq: [
      { q: l("Сколько стоит настройка сети или сервера?", "Tarmoq yoki serverni sozlash qancha turadi?", "How much does a network or server project cost?"), a: l("У каждого типового проекта фиксированная цена, у нестандартных — смета. Опишите задачу — пришлём расчёт в течение рабочего дня.", "Har bir tipik loyiha qat'iy narxga ega, nostandartlari — smeta bo'yicha. Vazifani yozing — bir ish kuni ichida hisob yuboramiz.", "Standard projects have fixed prices, others get an estimate. Describe the task and we'll quote within one business day.") },
      { q: l("Оборудование покупаете вы?", "Uskunani siz sotib olasizmi?", "Do you buy the hardware?"), a: l("Подбираем спецификацию под задачу, закупку делаете вы или по отдельному согласованию. Работы и оборудование считаются отдельно.", "Vazifaga mos spetsifikatsiyani tanlaymiz, xaridni siz yoki alohida kelishuv bo'yicha amalga oshirasiz. Ishlar va uskunalar alohida hisoblanadi.", "We specify the hardware; you purchase it or we agree separately. Work and hardware are priced separately.") },
      { q: l("Как платить за проект?", "Loyiha uchun qanday to'lanadi?", "How do we pay?"), a: l("Крупные проекты — 50 % предоплата, остаток после акта. Гарантия на работы — 30 дней.", "Yirik loyihalar — 50 % oldindan, qolgani dalolatnomadan keyin. Ishlarga kafolat — 30 kun.", "Large projects — 50 % upfront, the rest after sign-off. 30-day warranty on work.") },
      { q: l("Есть скидка для клиентов на подписке?", "Obunadagi mijozlarga chegirma bormi?", "Discounts for subscribers?"), a: l("Да: BUSINESS — 10 %, ENTERPRISE — 15 % на проектные работы.", "Ha: BUSINESS — 10 %, ENTERPRISE — loyiha ishlariga 15 %.", "Yes: BUSINESS 10 %, ENTERPRISE 15 % on project work.") },
    ],
    formTitle: l("Обсудить проект", "Loyihani muhokama qilish", "Discuss a project"),
    related: [
      { href: "/pricing#projects", label: l("Все проекты", "Barcha loyihalar", "All projects") },
      { href: "/services/it-outsourcing", label: l("IT-обслуживание по подписке", "Obuna bo'yicha IT xizmat", "IT support subscription") },
      { href: "/services/microsoft-365", label: l("Microsoft 365 и почта", "Microsoft 365 va pochta", "Microsoft 365 and mail") },
    ],
  },

  "microsoft-365": {
    slug: "microsoft-365",
    service: "project",
    meta: {
      title: "Microsoft 365 и корпоративная почта на домене — настройка в Ташкенте",
      description: "Настроим Microsoft 365 для компании: почта на вашем домене, Teams, OneDrive, SharePoint, защита входа, резервное копирование и перенос почты. Сопровождение по подписке.",
    },
    badge: l("Microsoft 365", "Microsoft 365", "Microsoft 365"),
    h1: l("Microsoft 365 и корпоративная почта для компании", "Kompaniya uchun Microsoft 365 va korporativ pochta", "Microsoft 365 and corporate mail for your company"),
    sub: l(
      "Почта на вашем домене, Teams, OneDrive и общие папки — настроим с нуля или перенесём из старой почты. Учётки, доступы и защита входа — на нашем сопровождении.",
      "Domeningizdagi pochta, Teams, OneDrive va umumiy papkalar — noldan sozlaymiz yoki eski pochtadan ko'chiramiz. Hisoblar, ruxsatlar va kirish himoyasi — bizning kuzatuvimizda.",
      "Mail on your domain, Teams, OneDrive and shared folders — set up from scratch or migrated from your old mail. Accounts, access and sign-in security under our care.",
    ),
    points: [
      l("Почта на вашем домене", "Domeningizda pochta", "Mail on your domain"),
      l("Перенос старой почты", "Eski pochtani ko'chirish", "Old mail migrated"),
      l("Входит в BUSINESS и ENTERPRISE", "BUSINESS va ENTERPRISE ga kiradi", "Included in BUSINESS and ENTERPRISE"),
    ],
    whatTitle: l("Что настраиваем", "Nimani sozlaymiz", "What we set up"),
    what: [
      { t: l("Почта и домен", "Pochta va domen", "Mail and domain"), d: l("Подключение домена, почтовые ящики, общие ящики и группы рассылки, подписи.", "Domenni ulash, pochta qutilari, umumiy qutilar va guruhlar, imzolar.", "Domain setup, mailboxes, shared mailboxes and groups, signatures.") },
      { t: l("Teams и OneDrive", "Teams va OneDrive", "Teams and OneDrive"), d: l("Команды и каналы, общие папки SharePoint и OneDrive с правами доступа.", "Jamoalar va kanallar, ruxsatli SharePoint va OneDrive umumiy papkalari.", "Teams and channels, SharePoint and OneDrive shared folders with permissions.") },
      { t: l("Защита входа", "Kirish himoyasi", "Sign-in security"), d: l("Многофакторная аутентификация, политики паролей, отключение доступа уволенным в тот же день.", "Ko'p faktorli autentifikatsiya, parol siyosati, ketgan xodimlar ruxsatini shu kuni o'chirish.", "MFA, password policies, same-day access removal for leavers.") },
      { t: l("Перенос почты", "Pochtani ko'chirish", "Mail migration"), d: l("Переезд со старого хостинга или другого сервиса без потери писем.", "Eski xosting yoki boshqa xizmatdan xatlarni yo'qotmasdan ko'chish.", "Move from old hosting or another service without losing mail.") },
      { t: l("Резервные копии", "Zaxira nusxalar", "Backups"), d: l("Контроль резервного копирования почты и файлов Microsoft 365.", "Microsoft 365 pochta va fayllari zaxira nusxalarini nazorat qilish.", "Backup checks for Microsoft 365 mail and files.") },
      { t: l("Поддержка пользователей", "Foydalanuvchilarni qo'llab-quvvatlash", "User support"), d: l("Новые сотрудники, телефоны и ноутбуки, вопросы по Outlook и Teams — в рамках подписки.", "Yangi xodimlar, telefon va noutbuklar, Outlook va Teams savollari — obuna doirasida.", "New staff, phones and laptops, Outlook and Teams questions — within the subscription.") },
    ],
    stepsTitle: l("Как это работает", "Qanday ishlaydi", "How it works"),
    steps: [
      { t: l("Задача", "Vazifa", "Brief"), d: l("Сколько пользователей, какой домен, откуда переносим.", "Nechta foydalanuvchi, qaysi domen, qayerdan ko'chiramiz.", "Users, domain and where we migrate from.") },
      { t: l("План и смета", "Reja va smeta", "Plan and estimate"), d: l("Подбираем план лицензий, фиксируем работы.", "Litsenziya rejasini tanlaymiz, ishlarni belgilaymiz.", "We pick the licence plan and fix the scope.") },
      { t: l("Настройка и перенос", "Sozlash va ko'chirish", "Setup and migration"), d: l("Настраиваем и переносим почту без простоя.", "To'xtovsiz sozlaymiz va pochtani ko'chiramiz.", "We configure and migrate mail without downtime.") },
      { t: l("Сопровождение", "Kuzatuv", "Ongoing support"), d: l("Учётки, доступы и вопросы сотрудников — дальше на нас.", "Hisoblar, ruxsatlar va xodimlar savollari — bundan keyin bizda.", "Accounts, access and staff questions — on us from then on.") },
    ],
    faq: [
      { q: l("Лицензии Microsoft 365 покупаете вы?", "Microsoft 365 litsenziyalarini siz sotib olasizmi?", "Do you sell Microsoft 365 licences?"), a: l("Поможем выбрать подходящий план; лицензии оплачиваются отдельно от наших работ.", "Mos rejani tanlashga yordam beramiz; litsenziyalar ishlarimizdan alohida to'lanadi.", "We help choose the right plan; licences are paid separately from our work.") },
      { q: l("Можно перенести почту без потери писем?", "Xatlarni yo'qotmasdan pochtani ko'chirish mumkinmi?", "Can you migrate mail without losing anything?"), a: l("Да, переносим ящики целиком и переключаем домен, когда всё готово.", "Ha, qutilarni to'liq ko'chiramiz va hammasi tayyor bo'lganda domenni o'tkazamiz.", "Yes, we move mailboxes in full and switch the domain once everything is ready.") },
      { q: l("Это входит в IT-подписку?", "Bu IT obunaga kiradimi?", "Is it part of the subscription?"), a: l("Поддержка Microsoft 365 входит в BUSINESS и ENTERPRISE, для START подключается опцией. Перенос почты — отдельный проект.", "Microsoft 365 qo'llab-quvvatlashi BUSINESS va ENTERPRISE ga kiradi, START uchun opsiya sifatida ulanadi. Pochtani ko'chirish — alohida loyiha.", "Microsoft 365 support is in BUSINESS and ENTERPRISE and an add-on for START. Mail migration is a separate project.") },
      { q: l("Работаете с Google Workspace?", "Google Workspace bilan ishlaysizmi?", "Do you support Google Workspace?"), a: l("Да, сопровождаем и Google Workspace.", "Ha, Google Workspace ni ham kuzatib boramiz.", "Yes, we support Google Workspace as well.") },
    ],
    formTitle: l("Настроить Microsoft 365", "Microsoft 365 ni sozlash", "Set up Microsoft 365"),
    related: [
      { href: "/services/it-outsourcing", label: l("IT-обслуживание по подписке", "Obuna bo'yicha IT xizmat", "IT support subscription") },
      { href: "/services/infrastructure", label: l("Сети и серверы", "Tarmoq va serverlar", "Networks and servers") },
    ],
  },

  development: {
    slug: "development",
    service: "development",
    meta: {
      title: "Разработка порталов, CRM и интеграций для бизнеса в Ташкенте",
      description: "Заказная разработка: веб-порталы и личные кабинеты, CRM, интеграции с 1С и госсервисами, мобильные приложения. Объём и цена фиксируются в смете до старта, еженедельный отчёт.",
    },
    badge: l("Разработка", "Dasturlash", "Development"),
    h1: l("Разработка порталов, CRM и интеграций", "Portal, CRM va integratsiyalar ishlab chiqish", "Portals, CRM and integrations development"),
    sub: l(
      "Всё, что не умещается в бота: веб-порталы и личные кабинеты, CRM под ваш процесс, интеграции с 1С и другими системами, мобильные приложения. Объём фиксируем в смете до старта.",
      "Botga sig'maydigan hamma narsa: veb-portallar va shaxsiy kabinetlar, jarayoningizga mos CRM, 1C va boshqa tizimlar bilan integratsiya, mobil ilovalar. Hajm boshlashdan oldin smetada belgilanadi.",
      "Everything bigger than a bot: web portals and user accounts, CRM for your process, integrations with 1C and other systems, mobile apps. Scope fixed in an estimate before we start.",
    ),
    points: [
      l("Смета до старта", "Boshlashdan oldin smeta", "Estimate before start"),
      l("Отчёт по часам каждую неделю", "Har hafta soatlar bo'yicha hisobot", "Weekly hours report"),
      l("Выделенная команда", "Alohida jamoa", "Dedicated team"),
    ],
    whatTitle: l("Что разрабатываем", "Nimani ishlab chiqamiz", "What we build"),
    what: [
      { t: l("Веб-порталы", "Veb-portallar", "Web portals"), d: l("Личные кабинеты клиентов и сотрудников, панели управления.", "Mijoz va xodimlar uchun shaxsiy kabinetlar, boshqaruv panellari.", "Client and staff portals, admin panels.") },
      { t: l("CRM и учёт", "CRM va hisob", "CRM and records"), d: l("Система под ваш процесс продаж, заявок или учёта.", "Sotuv, ariza yoki hisob jarayoningizga mos tizim.", "A system built around your sales, request or records process.") },
      { t: l("Интеграции", "Integratsiyalar", "Integrations"), d: l("Связка 1С, CRM, Google Sheets, GoARKAN и других систем через API.", "1C, CRM, Google Sheets, GoARKAN va boshqa tizimlarni API orqali bog'lash.", "Connecting 1C, CRM, Google Sheets, GoARKAN and others via APIs.") },
      { t: l("Мобильные приложения", "Mobil ilovalar", "Mobile apps"), d: l("Android и iOS для клиентов и сотрудников.", "Mijoz va xodimlar uchun Android va iOS.", "Android and iOS for clients and staff.") },
      { t: l("Дизайн интерфейсов", "Interfeys dizayni", "UI design"), d: l("Прототипы и дизайн экранов до начала разработки.", "Ishlab chiqishdan oldin prototiplar va ekran dizayni.", "Prototypes and screen design before development.") },
      { t: l("Запуск и поддержка", "Ishga tushirish va qo'llab-quvvatlash", "Launch and support"), d: l("Тестирование, развёртывание, сопровождение после запуска.", "Test qilish, joylashtirish, ishga tushirishdan keyin kuzatuv.", "Testing, deployment and post-launch support.") },
    ],
    stepsTitle: l("Как работаем", "Qanday ishlaymiz", "How we work"),
    steps: [
      { t: l("Задача", "Vazifa", "Brief"), d: l("Разбираем процесс и цели.", "Jarayon va maqsadlarni aniqlaymiz.", "We map the process and goals.") },
      { t: l("Смета", "Smeta", "Estimate"), d: l("Объём, срок и цена — до старта.", "Hajm, muddat va narx — boshlashdan oldin.", "Scope, timeline and price before start.") },
      { t: l("Разработка", "Ishlab chiqish", "Build"), d: l("Еженедельный отчёт по часам и демо.", "Har hafta soatlar bo'yicha hisobot va demo.", "Weekly hours report and demos.") },
      { t: l("Запуск", "Ishga tushirish", "Launch"), d: l("Развёртывание, обучение, поддержка.", "Joylashtirish, o'qitish, qo'llab-quvvatlash.", "Deployment, training, support.") },
    ],
    faq: [
      { q: l("Сколько стоит разработка?", "Ishlab chiqish qancha turadi?", "How much does development cost?"), a: l("Зависит от объёма. Фиксируем его в смете до старта и присылаем расчёт после короткого созвона.", "Hajmga bog'liq. Uni boshlashdan oldin smetada belgilaymiz va qisqa qo'ng'iroqdan keyin hisob yuboramiz.", "It depends on scope. We fix it in an estimate before starting and send a quote after a short call.") },
      { q: l("Смета может вырасти?", "Smeta oshishi mumkinmi?", "Can the estimate grow?"), a: l("Только с вашего согласия, если меняется объём задачи.", "Faqat roziligingiz bilan, agar vazifa hajmi o'zgarsa.", "Only with your approval if the scope changes.") },
      { q: l("В какой валюте оплата?", "To'lov qaysi valyutada?", "What currency?"), a: l("В сумах.", "So'mda.", "In UZS.") },
    ],
    formTitle: l("Обсудить проект", "Loyihani muhokama qilish", "Discuss a project"),
    related: [
      { href: "/services/telegram-bots", label: l("Telegram-боты", "Telegram-botlar", "Telegram bots") },
      { href: "/goarkan", label: l("GoARKAN", "GoARKAN", "GoARKAN") },
    ],
  },
};
