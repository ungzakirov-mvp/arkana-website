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
};
