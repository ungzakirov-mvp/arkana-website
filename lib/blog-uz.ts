/** Узбекские версии статей блога (латиница). Ключ — slug русской статьи; список — в blog-uz-slugs.ts. */

export type UzPost = { title: string; category: string; readTime: string; excerpt: string; content: string };

export const UZ_POSTS: Record<string, UzPost> = {
  "vyzov-kompyuternogo-mastera-tashkent": {
    title: "Toshkentda ofisga kompyuter ustasini chaqirish: qachon kerak va qanday tayyorlanish",
    category: "IT-qo'llab-quvvatlash",
    readTime: "6 daq",
    excerpt: "Qaysi muammoni masofadan hal qilish mumkin, qachon esa ustani ofisga chaqirish kerak. Usta kelishidan oldin nimani tayyorlash va ishdan keyin qanday hujjatlarni olish kerak.",
    content: `
Kompyuter yoqilmayapti, printer chop etmayapti, ofisda internet yo'q — o'z IT mutaxassisi bo'lmagan biznesda bunday holatlar ishni to'xtatib qo'yadi. Qachon kompyuter ustasini chaqirish kerakligini, qachon esa muammoni masofadan tezroq hal qilish mumkinligini ko'rib chiqamiz.

## Masofadan nimani hal qilish mumkin

Muammolarning katta qismini muhandis masofaviy ulanish orqali, ofisga kelmasdan hal qiladi:

- Pochta, Microsoft 365, messenjerlar va ofis dasturlarini sozlash
- Dasturlar, drayverlar va antivirusni o'rnatish va yangilash
- Kalit joyida bo'lsa va kompyuter yoqilsa — E-IMZO va Didox'da hujjat imzolashni sozlash
- Umumiy papkalarga kirish va hisob yozuvlari bilan bog'liq muammolar
- Tizimning sekin ishlashi, chiqib turadigan xatolar

Masofadan odatda tezroq: ustani kutish shart emas, ish esa ekraningizda ko'rinib turadi.

## Qachon ustani chaqirish kerak

Muammo jismoniy bo'lsa yoki masofaviy ulanish imkoni bo'lmasa, ofisga borish kerak:

- Kompyuter yoki noutbuk yoqilmaydi, tizim yuklanmaydi
- Butun ofisda internet yo'qolgan, Wi-Fi yoki router ishlamayapti
- Kabel tortish yoki tekshirish, yangi ish joyini ulash kerak
- Printer yoki MFU tarmoqni ko'rmayapti, qog'oz tiqilib qolgan, qurilma xatosi
- Butlovchi qismlarni almashtirish: disk, xotira, quvvat bloki
- Ofis ko'chishi yoki yangi uskunani ulash

## Usta kelishiga qanday tayyorlanish kerak

Ish kamroq vaqt olishi uchun:

- Muammoni tasvirlab bering: nima bo'ldi, qachon boshlandi, bir kun oldin nima o'zgartirildi
- Ekranda xato bo'lsa, uni suratga oling
- Administrator parollarini yoki ularni kirita oladigan odamni tayyorlab qo'ying
- Server xonasi, router va uskunalar shkafiga kirish imkonini bering
- Kompyuter hali ishlayotgan bo'lsa, muhim fayllarni saqlab qo'ying

## Ishdan keyin qanday hujjatlarni olish kerak

Yuridik shaxs bilan ish rasmiylashtirilishi shart. Ustaning ishidan keyin quyidagilarni olishingiz kerak:

- Bajarilgan ishlar dalolatnomasi — nima qilingani ro'yxati bilan
- Shartnoma bo'yicha hisob-faktura
- Xavflar topilgan bo'lsa, tavsiyalar: eskirgan disk, zaxira nusxa yo'qligi, routerda kuchsiz parol

Usta «hujjatsiz» kelsa, xarajatlarni buxgalteriyada rasmiylashtirish qiyin bo'ladi, muammo takrorlansa esa kim bilan hal qilish noma'lum.

## Bir martalik chaqiruv yoki obuna

Usta bir necha oyda bir marta kerak bo'lsa — har bir ariza uchun to'lash qulayroq. Muammolar har hafta yuzaga kelsa, obuna bo'yicha IT xizmat foydaliroq: muhandis ofisingizni biladi va ko'p muammolarning oldi olinadi.

**Xulosa**: Avval masofaviy yordamni sinab ko'ring — bu tezroq. Ustani chaqirish uskunalar va tarmoqdagi jismoniy muammolar uchun kerak. ARKANA Toshkent bo'ylab mijozlarga boradi va har bir ishni dalolatnoma va hisob-faktura bilan rasmiylashtiradi. Ariza qoldiring — vazifani aniqlab, bir ish kunida hisob-kitob yuboramiz.
    `,
  },

  "e-imzo-ne-rabotaet": {
    title: "E-IMZO ishlamayapti: ERI bilan bog'liq ko'p uchraydigan xatolar va yechimlar",
    category: "IT-qo'llab-quvvatlash",
    readTime: "6 daq",
    excerpt: "ERI kaliti ko'rinmaydi, Didox yoki my.soliq.uz imzoni qabul qilmaydi, brauzer E-IMZO ni topmaydi. Elektron imzo muammolarining asosiy sabablari va tekshirish tartibi.",
    content: `
O'zbekistonda biznes uchun elektron imzo har kuni kerak: Didox'dagi hisob-fakturalar, soliq hisobotlari, davlat xizmatlari. E-IMZO ishlamay qolsa, buxgalteriya to'xtab qoladi. Ko'p uchraydigan sabablar va tekshirish tartibini ko'rib chiqamiz.

## 1-qadam. E-IMZO ishga tushirilganmi

Brauzerda imzo faqat kompyuterda E-IMZO dasturi ishlab turgan bo'lsa ishlaydi. «E-IMZO o'rnatilmagan» yoki «modul topilmadi» xatosining ko'p uchraydigan sababi — dastur shunchaki ishga tushirilmagan yoki qayta yuklashdan keyin yopilib qolgan.

Tekshiring: soat yonidagi bildirishnomalar sohasida E-IMZO belgisi bormi. Agar bo'lmasa — dasturni ishga tushiring va brauzerda sahifani yangilang.

## 2-qadam. Kalitlar papkasi ko'rinadimi

E-IMZO kalitlari DSKEYS papkasida — disk yoki fleshka ildizida saqlanadi. Kalit ro'yxatda ko'rinmasa:

- Fleshka ulanganini va tizimda ko'rinishini tekshiring
- Papka aynan DSKEYS deb nomlanganiga va ichki papkada emas, ildizda turganiga ishonch hosil qiling
- Kalit fayli o'chirilmagan yoki nomi o'zgartirilmaganini tekshiring

## 3-qadam. Kalit muddati tugamaganmi

Har bir ERI kalitining amal qilish muddati bor. Muddat tugagan bo'lsa, imzo hech bir xizmatda o'tmaydi. Muddat E-IMZO'da kalitni tanlashda ko'rinadi. Muddati o'tgan kalitni qayta chiqarish kerak — hisobot topshirish kunida imzosiz qolmaslik uchun oldindan.

## 4-qadam. Brauzer va yangilanishlar

E-IMZO ishlab tursa va kalit ko'rinsa-yu, sayt imzoni qabul qilmasa:

- E-IMZO ni so'nggi versiyagacha yangilang
- Boshqa brauzerni sinab ko'ring
- Sahifadagi skriptlarni bloklaydigan kengaytmalarni o'chiring
- Antivirus dasturni bloklamayotganini tekshiring

## 5-qadam. Kalit paroli

Parol bir necha marta noto'g'ri kiritilgandan keyin kalit bloklanishi mumkin. Parol yo'qolgan bo'lsa, uni tiklab bo'lmaydi — kalitni qayta chiqarishga to'g'ri keladi. Parollarni monitordagi qog'ozchada emas, ishonchli joyda saqlang.

## Nosozliklarning oldini qanday olish kerak

- Kalitning nusxasini himoyalangan joyda saqlang
- Hujjatlarni imzolaydigan barcha xodimlar kalitlarining muddatini kuzatib boring
- E-IMZO va kalitlarni umumiy kompyuterlarga o'rnatmang
- Windows qayta o'rnatilgandan keyin imzoni hisobot kunida emas, darhol tekshiring

**Xulosa**: E-IMZO bilan bog'liq ko'p muammolar bir necha daqiqada hal qilinadi: dasturni ishga tushirish, DSKEYS papkasi, kalit muddati va brauzerni tekshirish. Yordam bermasa — ARKANA E-IMZO va Didox hamda my.soliq.uz'da imzoni masofadan yoki Toshkent bo'ylab borib sozlaydi. Ariza qoldiring, bir ish kunida javob beramiz.
    `,
  },

  "sistemnyj-administrator-na-autsorse": {
    title: "Autsorsingdagi tizim administratori: nima kiradi va kimga mos",
    category: "IT-autsorsing",
    readTime: "7 daq",
    excerpt: "Tashqi tizim administratori shtatdagisidan nimasi bilan farq qiladi, qanday vazifalarni o'z zimmasiga oladi va kompaniyangizga autsorsing mosligini qanday aniqlash mumkin.",
    content: `
Kichik kompaniyaga kamdan-kam hollarda to'liq kunlik tizim administratori kerak bo'ladi, lekin IT vazifalar doimo yuzaga keladi. Autsorsingdagi tizim administratori — bu IT'ingizni shartnoma asosida yuritadigan tashqi mutaxassis yoki jamoa.

## Autsorsingdagi tizim administratori nima qiladi

Odatda xizmatga quyidagilar kiradi:

- Xodimlarni qo'llab-quvvatlash: kompyuterlar, pochta, dasturlar, printerlar
- Ofisda tarmoq, Wi-Fi va internetni sozlash va qo'llab-quvvatlash
- Hisob yozuvlari: yangi xodimlarga kirish berish va ishdan ketganlarnikini o'chirish
- Muhim ma'lumotlarni zaxiralash va tiklashni tekshirish
- Yangilanishlar va antivirus himoyasi
- Yangi ish joylari va uskunalarni ulash
- Texnika va litsenziyalar hisobi

Ishlarning aniq tarkibi shartnomada qayd etiladi — imzolashdan oldin aynan shuni tekshirish kerak.

## Shtatdagi tizim administratoridan farqi

Shtatdagi mutaxassis doim ofisda, lekin u bitta: ta'til, kasallik yoki ishdan ketish kompaniyani IT'siz qoldiradi. Bundan tashqari, bitta odam tarmoqlar, serverlar, xavfsizlik va ofis dasturlarida bir xil kuchli bo'lishi kamdan-kam uchraydi.

Autsorsing — bu odam bilan emas, kompaniya bilan tuzilgan shartnoma. Infratuzilmangiz haqidagi bilimlar hujjatlashtiriladi, arizalar qayd etiladi, aniq bir muhandis band bo'lsa ham ish davom etadi.

## Autsorsing kimga mos

- O'z IT mutaxassisi yo'q, muammolarni «tushunadigan xodim» hal qiladigan kompaniyalarga
- IT vazifalar to'liq stavka uchun yetarli bo'lmagan ofislarga
- Murakkab loyihalarda yordam kerak bo'lgan shtat administratori bor kompaniyalarga
- Shaffoflikni istagan biznesga: arizalar, dalolatnomalar va bajarilgan ishlar hisoboti

## Pudratchini qanday tanlash kerak

- Shartnomani ko'rsatishni so'rang: nima kiradi, nima alohida to'lanadi, javob berish muddatlari
- Arizalar qanday beriladi: telefon, Telegram, hisob tizimi
- Har bir ish dalolatnoma va hisob-faktura bilan rasmiylashtiriladimi
- Tarmog'ingiz bo'yicha parollar va hujjatlarni kim saqlashini so'rang

## Ish formatlari

- Obuna — ofisga xizmat ko'rsatish uchun belgilangan oylik to'lov
- Arizalar bo'yicha — faqat bajarilgan ishlar uchun to'lov
- Loyihalar — bir martalik vazifalar: tarmoq tortish, ofis ko'chishi, server sozlash

**Xulosa**: Autsorsingdagi tizim administratori shtat birligi xarajatlarisiz ishonchli IT kerak bo'lgan kompaniyalarga mos. ARKANA obuna, arizalar va loyihalar bo'yicha ishlaydi, har bir ishni shartnoma, dalolatnoma va hisob-faktura bilan rasmiylashtiradi. Ariza qoldiring — kompaniyangiz uchun bir ish kunida hisob-kitob yuboramiz.
    `,
  },
};
