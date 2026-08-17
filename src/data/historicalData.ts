import {
  HistoricalPerson,
  HistoricalState,
  HistoricalCity,
  HistoricalConflict,
  HistoricalTreaty,
  HistoricalMonument,
  TimelineEvent,
  MapRouteLayer,
  EditProposal
} from '../types';

export const HISTORICAL_PERSONS: HistoricalPerson[] = [
  {
    id: 'amir-temur',
    name: 'Amir Temur Koʻragon',
    nativeName: 'تیمور گورکانی - Temür',
    title: 'Buyuk Sohibqiron va Temuriylar Saltanati Asoschisi',
    category: 'ruler',
    birthYear: 1336,
    deathYear: 1405,
    isBCE: false,
    dynastyOrState: 'Temuriylar Saltanati',
    shortBio: 'Oʻrta asrlar jahon harbiy sanʼati va davlatchiligining eng yirik namoyandalaridan biri, buyuk sarkarda, markazlashgan qudratli saltanat bunyodkori.',
    fullBio: 'Amir Temur 1336-yil 9-aprelda Kesh (Shahrisabz) yaqinidagi Xoʻja Ilgʻor qishlogʻida barlos beklaridan Taragʻay bahodir xonadonida tavallud topgan. 1370-yilda Movarounnahr taxtiga oʻtirgach, parokanda boʻlgan oʻlkalarni birlashtirib, Hindistondan Oʻrta yer dengizigacha choʻzilgan ulkan saltanat barpo etdi. "Kuch — adolatdadir" shiori ostida qonuniylik va obodonchilik tamoyillarini oʻrnatdi.',
    achievements: [
      'Movarounnahrni 35 yillik parokandalikdan soʻng yagona markazlashgan davlatga aylantirdi',
      'Buyuk Ipak Yoʻlining xavfsizligini taʼminlab, Sharq va Gʻarb oʻrtasida xalqaro savdo tarmogʻini rivojlantirdi',
      '"Temur tuzuklari" nomli mukammal davlat boshqaruvi va harbiy nizom asarini yaratdi',
      'Samarqandni jahonning eng goʻzal va ilmiy-madaniy poytaxtiga aylantirdi'
    ],
    famousQuotes: [
      { quote: 'Kuch — adolatdadir.', context: 'Saltanat muhriga oʻyib yozilgan asosiy davlat shiori' },
      { quote: 'Bir kunlik adolat — yuz kunlik toat-ibodatdan afzaldir.', context: 'Davlat boshqaruvi toʻgʻrisida' },
      { quote: 'Bizning qudratimizga shubha qilsangiz, biz qurdirgan imoratlarga boqing!', context: 'Oqsaroy peshtoqidagi bitik' }
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
    heroBackgroundUrl: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=1920&q=80',
    coordinates: { lat: 39.6542, lng: 66.9597, locationName: 'Samarqand, Oʻzbekiston' },
    majorWorksOrCampaigns: [
      'Uch yillik yurish (1386-1388)',
      'Besh yillik yurish (1392-1396)',
      'Hindiston yurishi (1398-1399)',
      'Yetti yillik yurish (1399-1404)',
      'Anqara jangi (1402)'
    ],
    citations: [
      { id: 'c-1', sourceTitle: 'Zafarnoma', author: 'Sharafuddin Ali Yazdiy', year: 1425, type: 'manuscript' },
      { id: 'c-2', sourceTitle: 'Temur tuzuklari', author: 'Amir Temur', year: 1783, publisherOrUrl: 'Oʻzbekiston Fanlar Akademiyasi nashriyoti', type: 'book' },
      { id: 'c-3', sourceTitle: 'Tamerlane: Sword of Islam, Conqueror of the World', author: 'Justin Marozzi', year: 2004, publisherOrUrl: 'HarperCollins', type: 'book' }
    ],
    viewsCount: 24890,
    tags: ['Temuriylar', 'Sarkarda', 'XIV asr', 'Sohibqiron', 'Samarqand']
  },
  {
    id: 'mirzo-ulugbek',
    name: 'Mirzo Ulugʻbek (Muhammad Taragʻay)',
    nativeName: 'میرزا ملک الغ‌بیگ',
    title: 'Buyuk Astronom, Matematik va Hukmdor',
    category: 'scientist',
    birthYear: 1394,
    deathYear: 1449,
    isBCE: false,
    dynastyOrState: 'Temuriylar Saltanati',
    shortBio: 'Temuriylar sulolasi vakili, astronomiya va matematika sohasida olamshumul yutuqlarga erishgan jahonshumul alloma va Samarqand hukmdori.',
    fullBio: 'Muhammad Taragʻay Ulugʻbek 1394-yil Sultoniya shahrida Shohruh Mirzo oilasida dunyoga kelgan. 1409-yilda Movarounnahr hukmdori etib tayinlandi. Samarqandda ulkan rasadxona va madrasalar qurdirib, Qozizoda Rumiy, Gʻiyosiddin Jamshid al-Koshiy, Ali Qushchi kabi yetuk olimlar bilan birgalikda 1018 ta yulduzning aniq koordinatalarini oʻz ichiga olgan "Ziji jadidi Koʻragoniy" asarini yaratdi.',
    achievements: [
      '1424-1428 yillarda Samarqandda davrining eng yirik rasadxonasini barpo etdi',
      '1018 ta qoʻzgʻalmas yulduzning joylashuvini 1 daqiqalik xatolik bilan aniqlagan "Zij" jadvalini tuzdi',
      'Bir yil uzunligini 365 kun, 6 soat, 10 daqiqa, 8 soniya deb hisoblab chiqdi (zamonaviy hisobdan bor-yoʻgʻi 58 soniyaga farq qiladi)',
      'Samarqand, Buxoro va Gʻijduvonda fan va madaniyat markazi boʻlgan madrasalar ochdi'
    ],
    famousQuotes: [
      { quote: 'Ilm olish har bir musulmon erkak va ayol uchun farzdir.', context: 'Buxoro madrasasi peshtoqiga oʻyib yozilgan hadis va shior' },
      { quote: 'Dinlar yoʻq boʻlib ketishi, saltanatlar qulashi mumkin, lekin olimlarning mehnati abadiy qoladi.', context: 'Astronomiya va ilm-fan qimmati haqida' }
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    heroBackgroundUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1920&q=80',
    coordinates: { lat: 39.6749, lng: 66.9822, locationName: 'Ulugʻbek Rasadxonasi, Samarqand' },
    majorWorksOrCampaigns: [
      'Ziji jadidi Koʻragoniy (Ulugʻbek Ziji)',
      'Risolayi Ulugʻbek (Matematik risola)',
      'Tarixi arbaʼ ulus (Toʻrt ulus tarixi)'
    ],
    citations: [
      { id: 'c-4', sourceTitle: 'Ziji Koʻragoniy', author: 'Mirzo Ulugʻbek', year: 1437, type: 'manuscript' },
      { id: 'c-5', sourceTitle: 'Ulugʻbek va uning rasadxonasi', author: 'V.L. Vyatkin', year: 1908, type: 'academic_paper' }
    ],
    viewsCount: 18450,
    tags: ['Astronomiya', 'Matematika', 'Temuriylar', 'XV asr', 'Ilm-fan']
  },
  {
    id: 'ibn-sino',
    name: 'Abu Ali ibn Sino (Avitsenna)',
    nativeName: 'أبو علي الحسين بن عبد الله بن سينا',
    title: 'Shayx ur-Rais, Tibbiyot va Falsafa Qomusi',
    category: 'scientist',
    birthYear: 980,
    deathYear: 1037,
    isBCE: false,
    dynastyOrState: 'Somoniylar / Gʻaznaviylar davri',
    shortBio: 'Sharq va Gʻarb uygʻonish davriga poydevor qoʻygan ensiklopedik olim, jahon tibbiyot fanining otalaridan biri.',
    fullBio: 'Ibn Sino Buxoro yaqinidagi Afshona qishlogʻida tugʻilgan. 16 yoshidayoq tabib sifatida mashhur boʻlib, Somoniy amiri Nuh ibn Mansurni davolagan va saroy kutubxonasidan foydalanish huquqini olgan. Uning 5 jildlik "Tib qonunlari" (Al-Qonun fit-tibb) asari 600 yildan ortiq vaqt davomida Yevropa universitetlarida asosiy tibbiy darslik sifatida oʻqitilgan.',
    achievements: [
      'Yurak-qon tomir, yuqumli kasalliklar, jarrohlik va farmakologiyaga oid mukammal "Tib qonunlari"ni yaratdi',
      'Falsafa, mantiq, fizika va metafizikani qamrab olgan "Kitob ash-Shifo" ensiklopediyasini yozdi',
      'Kasalliklarning koʻzga koʻrinmas mayda zarralar (mikroblar) orqali suv va havodan tarqalishini kashf etdi',
      'Psixosomatik tibbiyot va puls diagnostikasi usullarini ishlab chiqdi'
    ],
    famousQuotes: [
      { quote: 'Tabibda lochin nigohi, ilon donishmandligi va sher yuragi boʻlishi lozim.', context: 'Tabobat axloqi toʻgʻrisida' },
      { quote: 'Gʻazab — vujudga tushgan zahar, sabr esa uning davosidir.', context: 'Salomatlik va ruhiyat haqida' }
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
    heroBackgroundUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1920&q=80',
    coordinates: { lat: 39.7747, lng: 64.4286, locationName: 'Afshona, Buxoro' },
    majorWorksOrCampaigns: [
      'Al-Qonun fit-tibb (Tib qonunlari - 5 jild)',
      'Kitob ash-Shifo (Shifo kitobi)',
      'Kitob an-Najot (Najot kitobi)',
      'Donishnoma (Hikmatlar kitobi)'
    ],
    citations: [
      { id: 'c-6', sourceTitle: 'The Canon of Medicine', author: 'Avicenna', year: 1593, publisherOrUrl: 'Rome Medici Press', type: 'book' },
      { id: 'c-7', sourceTitle: 'Abu Ali ibn Sino va uning falsafiy merosi', author: 'OʻzR FA Falsafa instituti', year: 1980, type: 'academic_paper' }
    ],
    viewsCount: 22100,
    tags: ['Tibbiyot', 'Falsafa', 'Buxoro', 'X asr', 'Ensiklopediya']
  },
  {
    id: 'spitamen',
    name: 'Spitamen (Spitamenes)',
    nativeName: 'Σπιταμένης - Spitamana',
    title: 'Soʻgʻd Sarkardasi, Erkinlik Qahramoni',
    category: 'commander',
    birthYear: 370,
    deathYear: 328,
    isBCE: true,
    dynastyOrState: 'Qadimgi Soʻgʻdiyona',
    shortBio: 'Makedoniyalik Aleksandr (Iskandar Zulqarnayn) bosqiniga qarshi Oʻrta Osiyo xalqlarining umumxalq ozodlik harakatiga boshchilik qilgan buyuk sarkarda.',
    fullBio: 'Miloddan avvalgi 329-328 yillarda Spitamen Soʻgʻdiyona va Baqtriyada Iskandar qoʻshinlariga qarshi partizanlik va tezkor manevrli urush taktikalarini qoʻlladi. Politimet (Zarafshon) daryosi boʻyida yunon-makedon lashkarboshilaridan Farrux (Farnux) armiyasini butunlay tor-mor keltirdi. U Iskandar hayotidagi yagona toʻliq magʻlubiyatni taqdim etgan daho sarkarda hisoblanadi.',
    achievements: [
      'Makedoniyalik Iskandarga qarshi 3 yil davomida murosasiz partizanlik va harbiy harakatlarni boshqardi',
      'Politimet jangi orqali ellin bosqinchilarining yengilmaslik afsonasini chilparchin qildi',
      'Massagetlar, soʻgʻdlar va koʻchmanchi qabilalarni yagona harbiy ittifoqqa birlashtirdi'
    ],
    famousQuotes: [
      { quote: 'Togʻlarimiz burgutiga qul boʻlishdan koʻra oʻlim sharafliroqdir.', context: 'Qadimgi soʻgʻd rivoyatlarida saqlangan xitob' }
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    heroBackgroundUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80',
    coordinates: { lat: 39.6542, lng: 66.9597, locationName: 'Zarafshon vohasi / Marokanda' },
    majorWorksOrCampaigns: [
      'Marokanda qamali va ozod qilinishi (m.avv. 329)',
      'Politimet jangi (m.avv. 329)',
      'Baqtriya qalʼalariga hujumlar (m.avv. 328)'
    ],
    citations: [
      { id: 'c-8', sourceTitle: 'Anabasis Alexandri', author: 'Arrian', year: 150, type: 'book' },
      { id: 'c-9', sourceTitle: 'Qadimgi Soʻgʻd tarixi va Spitamen jasorati', author: 'E.V. Rtveladze', year: 2002, type: 'academic_paper' }
    ],
    viewsCount: 15300,
    tags: ['Antik davr', 'Soʻgʻdiyona', 'Aleksandr', 'Sarkarda', 'Ozodlik harakati']
  },
  {
    id: 'jaloliddin-manguberdi',
    name: 'Jaloliddin Manguberdi',
    nativeName: 'جلال الدين منكبرتي',
    title: 'Xorazmshoh, Qahramon Sarkarda',
    category: 'commander',
    birthYear: 1198,
    deathYear: 1231,
    isBCE: false,
    dynastyOrState: 'Anushteginiylar Xorazmshohlar Davlati',
    shortBio: 'Chingizxon boshchiligidagi moʻgʻul bosqinchilariga qarshi 11 yil davomida mardonavor kurashgan afsonaviy vatanparvar sarkarda.',
    fullBio: 'Alovuddin Muhammad Xorazmshohning toʻngʻich oʻgʻli. 1221-yilda Parvon jangida moʻgʻullarning Shiki Xutuxu boshchiligidagi 45 ming kishilik saralangan qoʻshinini qaqshatqich magʻlubiyatga uchratdi. Hind daryosi boʻyidagi jangda oʻzining tengsiz jasorati bilan Chingizxonda ham yuksak hayrat va hurmat uygʻotdi.',
    achievements: [
      'Parvon jangida (1221) Chingizxon qoʻshiniga birinchi yirik tarixiy magʻlubiyatni berdi',
      'Hind daryosi boʻyida oʻzini va otini 14 metrli tik qoyadan daryoga tashlab, dushmanga taslim boʻlmaslik jasoratini koʻrsatdi',
      'Hindiston, Eron, Ozarbayjon va Iroqda yangi mudofaa frontlarini tashkil qildi'
    ],
    famousQuotes: [
      { quote: 'Agar otaning shon-shuhrati oʻgʻilga oʻtmasa, oʻgʻil oʻz qilichi bilan shon-sharaf qozonmogʻi darkor!', context: 'Gurganjda taxt vorisligi davrida' },
      { quote: 'Ota oʻgʻil tugʻsa, shunday oʻgʻil tugʻsin!', context: 'Chingizxonning Hind daryosi qirgʻogʻida Jaloliddin jasoratiga bergan bahosi' }
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=600&q=80',
    heroBackgroundUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=1920&q=80',
    coordinates: { lat: 41.3775, lng: 60.3639, locationName: 'Urganch / Xorazm' },
    majorWorksOrCampaigns: [
      'Valiyon jangi (1221)',
      'Parvon jangi (1221)',
      'Sind (Hind daryosi) jangi (1221)',
      'Garnisi jangi (1225)'
    ],
    citations: [
      { id: 'c-10', sourceTitle: 'Siyrat as-Sulton Jaloliddin Mankburni', author: 'Shihobiddin Muhammad an-Nasaviy', year: 1241, type: 'manuscript' },
      { id: 'c-11', sourceTitle: 'Tarixi Jahongushoy', author: 'Ato Malik Juvayniy', year: 1260, type: 'manuscript' }
    ],
    viewsCount: 20120,
    tags: ['Xorazmshohlar', 'Moʻgʻullar bosqini', 'Parvon', 'Sarkarda', 'XIII asr']
  },
  {
    id: 'al-xorazmiy',
    name: 'Muhammad ibn Muso al-Xorazmiy',
    nativeName: 'محمد بن موسى الخوارزمي',
    title: 'Algebra va Algoritm Fani Asoschisi',
    category: 'scientist',
    birthYear: 780,
    deathYear: 850,
    isBCE: false,
    dynastyOrState: 'Abbosiylar Xalifaligi / Bayt ul-Hikma',
    shortBio: 'Dunyo sivilizatsiyasiga algebra fani, nol raqami va algoritm tushunchasini taqdim etgan buyuk matematik, astronom va geograf.',
    fullBio: 'Xiva shahrida tugʻilgan. Bagʻdoddagi "Bayt ul-Hikma" (Donishmandlar uyi) akademiyasiga rahbarlik qilgan. Uning "Al-Kitob al-muxtasar fi hisob al-jabr va al-muqobala" asaridagi "al-jabr" soʻzidan zamonaviy "Algebra" soʻzi, uning lotinlashtirilgan ismi Algoritmi dan "Algoritm" atamasi paydo boʻlgan.',
    achievements: [
      'Algebrani mustaqil matematik fan sifatida tizimlashtirdi va tenglamalarni yechish qoidalarini kashf etdi',
      'Hind oʻnlik sanoq sistemasini va nol (0) tushunchasini butun dunyoga tanitdi',
      'Astronomik jadvallar (Zij) va 2400 dan ortiq geografik koordinatalarni oʻz ichiga olgan xarita asarini tuzdi'
    ],
    famousQuotes: [
      { quote: 'Inson axloqiy fazilatli boʻlsa — bu 1 ga teng. Agar husn sohibi boʻlsa, 0 qoʻshilib 10 boʻladi. Boylik qoʻshilsa 100 boʻladi. Lekin 1 (axloq) yoʻqolsa, faqat nollar qoladi.', context: 'Insoniy qadriyatlar va hisob-kitob falsafasi' }
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80',
    heroBackgroundUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80',
    coordinates: { lat: 41.3783, lng: 60.3642, locationName: 'Xiva, Xorazm' },
    majorWorksOrCampaigns: [
      'Al-Jabr val-Muqobala',
      'Kitob surat al-Ard (Yer surati)',
      'Zij al-Xorazmiy',
      'Hind hisobi boʻyicha risola'
    ],
    citations: [
      { id: 'c-12', sourceTitle: 'Al-Kitab al-mukhtasar fi hisab al-jabr', author: 'Al-Khwarizmi', year: 820, type: 'manuscript' },
      { id: 'c-13', sourceTitle: 'The Algebra of Mohammed ben Musa', author: 'Frederic Rosen', year: 1831, publisherOrUrl: 'Oriental Translation Fund', type: 'book' }
    ],
    viewsCount: 26400,
    tags: ['Algebra', 'Algoritm', 'Matematika', 'Xorazm', 'IX asr']
  }
];

export const HISTORICAL_STATES: HistoricalState[] = [
  {
    id: 'temuriylar-saltanati',
    name: 'Temuriylar Saltanati (Gurkaniya)',
    nativeName: 'دولت تیموریان - Gurkānī',
    capital: 'Samarqand (1370–1405), Hirot (1405–1507)',
    startYear: 1370,
    endYear: 1507,
    isBCE: false,
    era: "O'rta asrlar (Sharq Uyg'onishi)",
    founders: ['Amir Temur Koʻragon'],
    zenithLeaders: ['Amir Temur', 'Shohruh Mirzo', 'Mirzo Ulugʻbek', 'Husayn Boyqaro'],
    shortDescription: 'Sharqiy Yevropa, Yaqin Sharq, Kavkaz, Oʻrta Osiyo va Hindiston hududlarini oʻz ichiga olgan eng qudratli jahon imperiyalaridan biri.',
    riseAndGrowth: '1370-yilda Amir Temur Movarounnahrda hokimiyatni qoʻlga kiritgach, parokandalikka barham berdi. Strategik harbiy yurishlar natijasida Oltin Oʻrda, Dehli sultonligi, Usmonlilar imperiyasi va Mamluklar davlatlari bilan toʻqnashuvlarda gʻalaba qozonib, mintaqada yagona barqaror iqtisodiy-savdo tizimini oʻrnatdi.',
    goldenAge: 'Shohruh va Mirzo Ulugʻbek davrida Samarqand va Hirot fan, madaniyat, miniatyura sanʼati (Kamoliddin Behzod) va turkiy adabiyot (Alisher Navoiy) markaziga aylandi. "Temuriy Uygʻonish davri" (Renaissance) deb atalgan oltin davr yuz berdi.',
    declineAndFall: 'Shohruh va Ulugʻbek vafotidan soʻng taxt uchun kurashlar kuchaydi. 1507-yilda Shayboniyxon boshchiligidagi koʻchmanchi oʻzbeklar Hirotni egallashi bilan sulola Oʻrta Osiyoda oʻz hukmronligini yakunladi, biroq Bobur Mirzo orqali Hindistonda Boburiylar (Buyuk Moʻgʻullar) imperiyasi sifatida davom etdi.',
    territoryDescription: 'Gʻarbda Oʻrta yer dengizi va Qora dengiz sohillaridan sharqda Xitoy chegaralarigacha, shimolda Volga boʻylaridan janubda Fors koʻrfazi va Gang daryosigacha.',
    dynastyLineage: [
      { ruler: 'Amir Temur', reign: '1370–1405', note: 'Saltanat asoschisi, Sohibqiron' },
      { ruler: 'Xalil Sulton', reign: '1405–1409', note: 'Samarqand hukmdori' },
      { ruler: 'Shohruh Mirzo', reign: '1409–1447', note: 'Hirot poytaxti asoschisi' },
      { ruler: 'Mirzo Ulugʻbek', reign: '1447–1449', note: 'Buyuk olim va podshoh' },
      { ruler: 'Abu Said Mirzo', reign: '1451–1469', note: 'Saltanatni vaqtincha birlashtirgan' },
      { ruler: 'Husayn Boyqaro', reign: '1469–1506', note: 'Hirotda madaniyat homiysi' }
    ],
    heroBackgroundUrl: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=1920&q=80',
    coordinates: { lat: 39.6542, lng: 66.9597, locationName: 'Samarqand, Oʻzbekiston' },
    citations: [
      { id: 'c-14', sourceTitle: 'Zubdat ut-Tavorix', author: 'Hofizi Abru', year: 1427, type: 'manuscript' },
      { id: 'c-15', sourceTitle: 'Matlaʼi saʼdayn va majmai bahrayn', author: 'Abdurazzoq Samarqandiy', year: 1470, type: 'manuscript' }
    ],
    tags: ['Temuriylar', 'Buyuk Imperiyalar', 'Samarqand', 'Hirot', 'XIV-XVI asrlar']
  },
  {
    id: 'somoniylar-davlati',
    name: 'Somoniylar Davlati',
    nativeName: 'دولت سامانیان - Sāmāniyān',
    capital: 'Buxoro (875–999)',
    startYear: 875,
    endYear: 999,
    isBCE: false,
    era: "Ilk O'rta asrlar (Musulmon Renessansi)",
    founders: ['Ismoil Somoniy', 'Ahmad ibn Asad'],
    zenithLeaders: ['Ismoil Somoniy (892–907)', 'Nasr II ibn Ahmad (914–943)'],
    shortDescription: 'Movarounnahr va Xurosonda tashkil topgan, markazlashgan boshqaruv tizimi va fan-madaniyat gullab-yashnagan ilk mustaqil davlat.',
    riseAndGrowth: 'Arab xalifaligi zaiflashgan davrda Somonxudot avlodlari Movarounnahr shaharlarida mustahkamlanib, 875-yilda xalifa Muʼtamiddan butun viloyatni boshqarish yorligʻini oldilar. Ismoil Somoniy 892-yilda poytaxt Buxoroda yagona markazlashgan davlatni barpo etdi.',
    goldenAge: 'Buxoro "Qubbat ul-Islom" va Sharqning ilm poytaxtiga aylandi. Rudakiy, Firdavsiy, Forobiy, Ibn Sino kabi allomalar Somoniylar homiyligida ijod qildi. 10 ta markaziy devondan iborat mukammal davlat boshqaruvi apparati tuzildi.',
    declineAndFall: 'X asr oxirida ichki feodal nizolar va sarkardalar isyoni kuchaydi. 999-yilda Qoraxoniylar va Gʻaznaviylar ittifoqi Buxoroni egallab, davlat hududini oʻzaro boʻlib oldi.',
    territoryDescription: 'Movarounnahr, Xuroson, Shimoliy Eron, Xorazm, Seyiston va Fargʻona vodiysi.',
    dynastyLineage: [
      { ruler: 'Nasr I', reign: '875–892', note: 'Samarqand hokimi' },
      { ruler: 'Ismoil Somoniy', reign: '892–907', note: 'Yagona davlat asoschisi, adolatli amir' },
      { ruler: 'Ahmad ibn Ismoil', reign: '907–914', note: 'Ismoil Somoniy oʻgʻli' },
      { ruler: 'Nasr II (Said amir)', reign: '914–943', note: 'Madaniyat va adabiyot gullagan davr' }
    ],
    heroBackgroundUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1920&q=80',
    coordinates: { lat: 39.7747, lng: 64.4286, locationName: 'Buxoro, Oʻzbekiston' },
    citations: [
      { id: 'c-16', sourceTitle: 'Tarixi Buxoro', author: 'Abu Bakr Muhammad Narshaxiy', year: 943, type: 'manuscript' },
      { id: 'c-17', sourceTitle: 'Muroj uz-Zahab', author: 'Al-Masʼudiy', year: 956, type: 'book' }
    ],
    tags: ['Somoniylar', 'Buxoro', 'IX-X asrlar', 'Ismoil Somoniy', 'Sharq Renessansi']
  },
  {
    id: 'kushon-imperiyasi',
    name: 'Kushon Imperiyasi',
    nativeName: 'Kushano / Guishuang',
    capital: 'Baqtra (Balx), Peshovar (Purushapura)',
    startYear: 30,
    endYear: 375,
    isBCE: false,
    era: 'Antik davr',
    founders: ['Kujula Kadfiz (Kadhises I)'],
    zenithLeaders: ['Kanishka I (127–150)', 'Huvishka'],
    shortDescription: 'Rim imperiyasi, Parfiya va Xan Xitoyi bilan bir qatorda qadimgi dunyoning 4 ta eng buyuk qudratli imperiyasidan biri.',
    riseAndGrowth: 'Yuechji qabilalarining birlashuvi natijasida Baqtriya hududida tashkil topgan. Janubiy Osiyo va Oʻrta Osiyoni birlashtirib, Buyuk Ipak Yoʻlining asosiy quruqlik va dengiz yoʻllarini nazorat qildi.',
    goldenAge: 'Kanishka I hukmronligi davrida buddizm, zardushtiylik va ellinistik madaniyat uygʻunlashib, mashhur Gandxara sanʼati vujudga keldi. Oltin tangalar zarb qilindi, xalqaro savdo mislsiz darajada rivojlandi.',
    declineAndFall: 'Sosoniylar davlatining kuchayishi va shimoldan Xioniylar/Eftaliylarning bosimi ostida parchalanib ketdi.',
    territoryDescription: 'Oʻzbekiston va Tojikiston janubidan (Dalvarzintepa, Xolchayon), Afgʻoniston, Pokiston va Shimoliy Hindiston (Varanasigacha).',
    dynastyLineage: [
      { ruler: 'Kujula Kadfiz', reign: '30–80', note: 'Imperiya asoschisi' },
      { ruler: 'Vima Kadfiz', reign: '90–100', note: 'Oltin tanga islohoti' },
      { ruler: 'Kanishka I', reign: '127–150', note: 'Imperiyaning eng buyuk hukmdori' },
      { ruler: 'Vasudeva I', reign: '191–232', note: 'Kushon qudratining soʻnggi bosqichi' }
    ],
    heroBackgroundUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1920&q=80',
    coordinates: { lat: 37.2242, lng: 67.2783, locationName: 'Termiz / Dalvarzintepa' },
    citations: [
      { id: 'c-18', sourceTitle: 'Rabatak yozuvi', author: 'Kanishka I davri toshbitigi', year: 130, type: 'archive' },
      { id: 'c-19', sourceTitle: 'Kushonlar davlati va madaniyati', author: 'G.A. Pugachenkova', year: 1979, type: 'book' }
    ],
    tags: ['Antik davr', 'Kushonlar', 'Kanishka', 'Termiz', 'Baqtriya']
  }
];

export const HISTORICAL_CITIES: HistoricalCity[] = [
  {
    id: 'samarqand',
    name: 'Samarqand (Qadimgi Marokanda)',
    ancientName: 'Maracanda / Smaracanda / Afrosiyob',
    establishedYear: 750,
    isBCE: true,
    region: 'Zarafshon vohasi',
    modernCountry: 'Oʻzbekiston',
    strategicImportance: 'Buyuk Ipak Yoʻlining markaziy chorrahasi, Temuriylar saltanati poytaxti, qadimiy ilm-fan va hunarmandchilik beshigi.',
    shortDescription: 'Yer yuzining sayqali deb taʼriflangan, 2750 yildan ortiq boy tarixga ega boʻlgan afsonaviy shahar.',
    fullHistory: 'Miloddan avvalgi VIII asrda Afrosiyob tepaligida asos solingan. Miloddan avvalgi 329-yilda Iskandar Zulqarnayn tomonidan qamal qilingan. VIII asrda arablar tomonidan fath etilib, Somoniylar, Qoraxoniylar va Xorazmshohlar davrida rivojlangan. 1220-yilda Chingizxon tomonidan vayron qilingach, XIV asrda Amir Temur uni oʻz buyuk saltanatining goʻzal poytaxtiga aylantirdi.',
    keyEpochs: [
      { era: 'm.avv. VIII - IV asrlar', title: 'Afrosiyob va Ahamoniylar davri', desc: 'Mudofaa devorlari bilan oʻralgan Soʻgʻd poytaxti' },
      { era: 'm.avv. 329-yil', title: 'Aleksandr Makedonskiy istilosi', desc: 'Marokanda uchun shiddatli janglar va Spitamen qarshiligi' },
      { era: 'XIV-XV asrlar', title: 'Temuriylar Oltin Davri', desc: 'Registon, Bibixonim, Goʻri Amir, Shohi Zinda va Ulugʻbek Rasadxonasi qurilishi' }
    ],
    famousMonuments: ['Registon ansambli', 'Goʻri Amir maqbarasi', 'Shohi Zinda', 'Bibixonim masjidi', 'Ulugʻbek Rasadxonasi', 'Afrosiyob muzeyi'],
    heroBackgroundUrl: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=1920&q=80',
    coordinates: { lat: 39.6542, lng: 66.9597, locationName: 'Samarqand, Oʻzbekiston' },
    citations: [
      { id: 'c-20', sourceTitle: 'Qadimgi Samarqand arxeologiyasi', author: 'Ya.Gʻ. Gʻulomov', year: 1969, type: 'book' },
      { id: 'c-21', sourceTitle: 'Samarkand: A Cultural and Architectural Guide', author: 'UNESCO Heritage Series', year: 2012, type: 'academic_paper' }
    ]
  },
  {
    id: 'buxoro',
    name: 'Buxoro (Buxoroyi Sharif)',
    ancientName: 'Numijkat / Poykand / Vihara',
    establishedYear: 500,
    isBCE: true,
    region: 'Quyi Zarafshon',
    modernCountry: 'Oʻzbekiston',
    strategicImportance: 'Islom olamining maʼnaviy poytaxti, Somoniylar va Buxoro amirligi markazi, 140 dan ortiq meʼmoriy yodgorliklar shahri.',
    shortDescription: 'Sharqning tirik muzeyi, islom falsafasi, tasavvuf va meʼmorchilik durdonasi.',
    fullHistory: 'Qadimiy qatlamlari miloddan avvalgi VI asrga borib taqaladi. Arki Buxoro milodiy I asrda Siyovush tomonidan qurilgani rivoyat qilinadi. Somoniylar davrida "Qubbat ul-Islom" maqomini olib, jahon darajasidagi allomalar (Imom Buxoriy, Ibn Sino, Narshaxiy, Rudakiy) yetishib chiqqan.',
    keyEpochs: [
      { era: 'IX-X asrlar', title: 'Somoniylar poytaxti', desc: 'Ismoil Somoniy maqbarasi va madrasalar qurilishi' },
      { era: 'XII asr', title: 'Qoraxoniylar davri', desc: 'Minorai Kalon va Masjidi Kalon qad rostlashi' },
      { era: 'XVI-XIX asrlar', title: 'Shayboniylar va Ashtarxoniylar, Mangʻitlar', desc: 'Labi Hovuz, Mir Arab madrasasi, Poyi Kalon' }
    ],
    famousMonuments: ['Arki Buxoro', 'Poyi Kalon majmuasi', 'Ismoil Somoniy maqbarasi', 'Labi Hovuz', 'Chor Minor', 'Mir Arab madrasasi'],
    heroBackgroundUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1920&q=80',
    coordinates: { lat: 39.7747, lng: 64.4286, locationName: 'Buxoro, Oʻzbekiston' },
    citations: [
      { id: 'c-22', sourceTitle: 'Tarixi Narshaxiy', author: 'Abu Bakr Narshaxiy', year: 943, type: 'manuscript' }
    ]
  },
  {
    id: 'xiva',
    name: 'Xiva (Ichan-Qalʼa)',
    ancientName: 'Xeyvaq / Xorasmiya',
    establishedYear: 400,
    isBCE: true,
    region: 'Quyi Amudaryo / Xorazm',
    modernCountry: 'Oʻzbekiston',
    strategicImportance: 'Qadimgi Xorazm sivilizatsiyasining durdonasi, Xiva xonligi poytaxti, yaxlit ochiq osmon ostidagi muzey-shahar.',
    shortDescription: 'Oʻrta Osiyoning eng toʻliq saqlanib qolgan qalʼa-shahri, qadimiy karvon yoʻllari vohasi.',
    fullHistory: 'Afsonalarga koʻra Nuh paygʻambarning oʻgʻli Som tomonidan Xeyvaq qudugʻi qazilishi bilan boshlangan. XVI asrdan boshlab Xiva xonligining poytaxti boʻlib xizmat qildi. Ichan-Qalʼa hududi 1990-yilda Oʻrta Osiyoda birinchi boʻlib UNESCO Butunjahon merosi roʻyxatiga kiritildi.',
    keyEpochs: [
      { era: 'm.avv. IV - milodiy VIII asr', title: 'Qadimgi Xorazm qalʼalari', desc: 'Tuproqqalʼa va Qoyqirilganqalʼa davri' },
      { era: '1598–1920 yillar', title: 'Xiva Xonligi poytaxti', desc: 'Ichan-Qalʼa saroylari, Kalta Minor, Islom Xoʻja minorasi' }
    ],
    famousMonuments: ['Ichan-Qalʼa', 'Kalta Minor', 'Islom Xoʻja minorasi', 'Kunya-Ark', 'Toshhovli saroyi', 'Juma masjidi'],
    heroBackgroundUrl: 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=1920&q=80',
    coordinates: { lat: 41.3783, lng: 60.3642, locationName: 'Xiva, Xorazm' },
    citations: [
      { id: 'c-23', sourceTitle: 'Xiva xonligi tarixi', author: 'Munis va Ogahiy (Firdavs ul-iqbol)', year: 1840, type: 'manuscript' }
    ]
  }
];

export const HISTORICAL_CONFLICTS: HistoricalConflict[] = [
  {
    id: 'politimet-jangi',
    title: 'Politimet (Zarafshon) Jangi',
    type: 'jang',
    startYear: 329,
    endYear: 329,
    isBCE: true,
    location: 'Politimet (Zarafshon) daryosi oroli',
    parties: [
      { name: 'Soʻgʻd va Koʻchmanchi Massagetlar ittifoqi', leader: 'Spitamen', strength: 'taxm. 3000 otliq va kamonchilar' },
      { name: 'Makedoniya va Ellin qoʻshini', leader: 'Farnux (Pharnuches), Andromax, Menedem', strength: 'taxm. 2300 piyoda va 800 otliq' }
    ],
    commanders: ['Spitamen', 'Farnux', 'Karan'],
    causes: [
      'Aleksandr Makedonskiyning Oʻrta Osiyoga bosqini va Marokandani egallashi',
      'Soʻgʻd zodagonlari va xalqining mustaqillik uchun Spitamen boshchiligida qoʻzgʻoloni',
      'Yunon garnizonlarining Marokanda qalʼasida qamal qilinishi'
    ],
    battleSequence: [
      { phase: '1. Marokanda qamali', description: 'Spitamen Marokandadagi makedon garnizonini qamal qildi. Iskandar unga qarshi Farnux qoʻmondonligidagi maxsus korpusni yubordi.' },
      { phase: '2. Qaytish va tuzoq', description: 'Spitamen qamalni boʻshatib, dushmanni Zarafshon daryosi boʻyidagi ochiq dasht va toʻqayzorlarga tomon chalgʻitib chekindi.' },
      { phase: '3. Daryodagi qurshov va qirgʻin', description: 'Makedon qoʻshini daryodan oʻtayotganda, koʻchmanchi otliq kamonchilar har tomondan oʻq yogʻdirdi va orolda makedon korpusi butunlay qirib tashlandi.' }
    ],
    outcome: 'Spitamenning toʻliq va yorqin gʻalabasi. Makedon korpusi butunlay yoʻq qilindi. Bu Iskandarning butun Osiyo yurishidagi eng mashhur magʻlubiyati boʻldi.',
    geopoliticalImpact: 'Aleksandr Makedonskiy zudlik bilan asosiy armiyasi bilan yetib kelishga va taktikani oʻzgartirishga, mahalliy zodagonlar bilan sulolaviy nikohlar (Roxana) tuzishga majbur boʻldi.',
    heroBackgroundUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=1920&q=80',
    coordinates: { lat: 39.6542, lng: 66.85, locationName: 'Zarafshon daryosi boʻyi' },
    citations: [
      { id: 'c-24', sourceTitle: 'Anabasis Alexandri (IV kitob)', author: 'Arrian', year: 150, type: 'book' }
    ]
  },
  {
    id: 'anqara-jangi',
    title: 'Anqara Jangi (1402)',
    type: 'urush',
    startYear: 1402,
    endYear: 1402,
    isBCE: false,
    location: 'Chubuq tekisligi, Anqara yaqinida',
    parties: [
      { name: 'Temuriylar Armiyasi', leader: 'Amir Temur, Shohruh, Mironshoh, Sulton Husayn', strength: 'taxm. 140 000 jangchi, jangovar fillar' },
      { name: 'Usmonlilar Imperiyasi va Serbiya ittifoqi', leader: 'Sulton Boyazid I Yildirim, Stefan Lazarevich', strength: 'taxm. 85 000 jangchi' }
    ],
    commanders: ['Amir Temur', 'Boyazid I Yildirim', 'Mirzo Shohruh', 'Mirzo Abu Bakr'],
    causes: [
      'Kichik Osiyo va Yaqin Sharqda ikki buyuk qudratli hukmdorning manfaatlar toʻqnashuvi',
      'Qora Yusuf va Ahmad Jaloyirning Boyazid panohiga qochishi va elchilik xatlaridagi ziddiyatlar'
    ],
    battleSequence: [
      { phase: '1. Strategik manyovr', description: 'Amir Temur kutilmagan yoʻnalishdan aylanib oʻtib, Boyazid qoʻshinining asosiy suv manbasini egallab oldi.' },
      { phase: '2. Qanotlar toʻqnashuvi', description: 'Temuriylar otliqlari va jangovar fillari markazga shiddatli zarba berdi. Qora tatarlar va Onadoʻli bekliklari Temur tomoniga oʻtdi.' },
      { phase: '3. Hal qiluvchi zarba va asir olish', description: 'Boyazid shaxsiy yanicharlari bilan tepalikda oxirigacha jang qildi, biroq qurshovga olinib asir tushdi.' }
    ],
    outcome: 'Amir Temurning mutlaq gʻalabasi. Sulton Boyazid I asir olindi. Usmonlilar davlati 11 yillik oraliq davriga (Fetret devri) kirdi.',
    geopoliticalImpact: 'Vizantiya imperiyasining Konstantinopol qulashi yana 50 yilga kechiktirildi. Yevropa monarxlari (Fransiya qiroli, Angliya qiroli, Kastiliya elchisi Klavixo) Amir Temurga minnatdorlik va qutlov maktublari yubordi.',
    heroBackgroundUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1920&q=80',
    coordinates: { lat: 39.9334, lng: 32.8597, locationName: 'Chubuq / Anqara, Turkiya' },
    citations: [
      { id: 'c-25', sourceTitle: 'Ajoyib al-Maqdur fi Navoib Temur', author: 'Ibn Arabshoh', year: 1435, type: 'manuscript' },
      { id: 'c-26', sourceTitle: 'Zafarnoma', author: 'Nizomiddin Shomiy', year: 1404, type: 'manuscript' }
    ]
  },
  {
    id: 'muqanna-qozgoloni',
    title: 'Muqanna Qoʻzgʻoloni ("Oq kiyimlilar" harakati)',
    type: 'qozgolon',
    startYear: 776,
    endYear: 783,
    isBCE: false,
    location: 'Movarounnahr (Som togʻi, Sanjam qishlogʻi, Kesh, Samarqand)',
    parties: [
      { name: 'Oq kiyimlilar (Xalq harakati)', leader: 'Hoshim ibn Hakim (Muqanna)', strength: 'Oʻn minglab dehqonlar va koʻchmanchilar' },
      { name: 'Abbosiylar Xalifaligi Armiyasi', leader: 'Xalifa Mahdiy, Jibroil ibn Yahyo, Said al-Harashiy', strength: 'Xalifalik saralangan gvardiyasi' }
    ],
    commanders: ['Muqanna', 'Said al-Harashiy', 'Muoz ibn Muslim'],
    causes: [
      'Arab xalifaligining ogʻir soliq zulmi va milliy kamsitish siyosati',
      'Mahalliy qishloq aholisi va dehqonlarning erkinlik va tenglikka intilishi'
    ],
    battleSequence: [
      { phase: '1. Boshlanishi', description: 'Muqanna 776-yilda yuziga parda (niqob) tortib, Marv va Buxoro atrofida "Oq kiyimlilar" gʻoyasini targʻib qildi.' },
      { phase: '2. Kengayish', description: 'Qoʻzgʻolon Samarqand, Kesh va Sanjam viloyatlariga yoyilib, arab noiblari magʻlubiyatga uchratildi.' },
      { phase: '3. Som qalʼasi qamali', description: '783-yilda arab lashkari Som togʻidagi mustahkam qalʼani bir necha oy qamal qildi. Muqanna taslim boʻlmasdan oʻzini olovga tashladi.' }
    ],
    outcome: 'Qoʻzgʻolon bostirildi, biroq xalifalik Movarounnahrda soliqlarni kamaytirishga va mahalliy zodagonlarga imtiyozlar berishga majbur boʻldi.',
    geopoliticalImpact: 'Somoniylar sulolasining keyinchalik hokimiyat tepasiga kelishiga va Movarounnahr mustaqilligiga zamin yaratdi.',
    heroBackgroundUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80',
    coordinates: { lat: 39.05, lng: 66.8333, locationName: 'Som togʻi, Qashqadaryo' },
    citations: [
      { id: 'c-27', sourceTitle: 'Tarixi Tabariy', author: 'Muhammad ibn Jarir at-Tabariy', year: 915, type: 'book' }
    ]
  }
];

export const HISTORICAL_TREATIES: HistoricalTreaty[] = [
  {
    id: 'qadesh-shartnomasi',
    title: 'Qadesh Tinchlik Shartnomasi (m.avv. 1258)',
    signYear: 1258,
    isBCE: true,
    location: 'Qadesh shahri (hozirgi Suriya)',
    signatories: [
      { party: 'Qadimgi Misr Firʼavni', representative: 'Ramzes II' },
      { party: 'Xett Imperiyasi Podshohi', representative: 'Xattusili III' },
    ],
    context: 'Yaqin Sharqdagi gegemonlik va Suriya yerlariga egalik qilish boʻyicha uzoq yillik Qadesh jangidan keyin tuzilgan insoniyat tarixidagi birinchi yozma xalqaro tinchlik shartnomasi.',
    keyTerms: [
      'Ikki buyuk davlat oʻrtasida abadiy tinchlik va birodarlik oʻrnatilishi',
      'Harbiy hujum qilmaslik va uchinchi tomon hujum qilganda oʻzaro yordam berish (mudofaa ittifoqi)',
      'Siyosiy qochqinlar va asirlarni oʻzaro ekstraditsiya qilish, ularga jazo qoʻllamaslik',
      'Chegaralarning daxlsizligi tan olinishi'
    ],
    geopoliticalImpact: 'Yaqin Sharqda barqarorlik oʻrnatildi, Xett va Misr oʻrtasida diplomatik nikohlar amalga oshirildi. Shartnoma nusxasi bugungi kunda BMT Bosh qarorgohida xalqaro diplomatiya ramzi sifatida osilgan.',
    originalDocumentExtract: '"Qarang, Xett mamlakati podshohi Xattusili Misr podshohi Ramzes bilan abadiy doʻstlik va tinchlik toʻgʻrisida ahdnomaga kirdi. Biz bir-birimizga hech qachon yovlik qilmagaymiz..."',
    heroBackgroundUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=80',
    coordinates: { lat: 34.5667, lng: 36.5167, locationName: 'Qadesh, Suriya' },
    citations: [
      { id: 'c-28', sourceTitle: 'Karnak ibodatxonasi tosh bitiklari', author: 'Misr arxivi', year: 1258, type: 'archive' },
      { id: 'c-29', sourceTitle: 'Boghazköy mixxat lavhalari', author: 'Xattusa arxivi', year: 1258, type: 'archive' }
    ]
  },
  {
    id: 'vestfaliya-sulhi',
    title: 'Vestfaliya Tinchlik Sulhi (1648)',
    signYear: 1648,
    isBCE: false,
    location: 'Myunster va Osnabryuk (Germaniya)',
    signatories: [
      { party: 'Muqaddas Rim Imperiyasi', representative: 'Ferdinand III' },
      { party: 'Fransiya Qirolligi', representative: 'Lyudovik XIV' },
      { party: 'Shvetsiya Qirolligi', representative: 'Qirolicha Kristina' }
    ],
    context: 'Yevropada 8 milliondan ortiq inson qurbon boʻlgan qonli Oʻttiz yillik urushga (1618–1648) barham bergan umumyevropa kongressi.',
    keyTerms: [
      'Davlat suvereniteti va hududiy yaxlitlik tamoyilining xalqaro huquqda oʻrnatilishi',
      'Davlatlarning ichki ishlariga boshqa davlatlarning aralashmasligi (Vestfaliya tizimi)',
      'Diniy eʼtiqod erkinligi (katolik, lyuteran va kalvinizmning teng huquqliligi)',
      'Shveytsariya va Niderlandiya mustaqilligining rasman tan olinishi'
    ],
    geopoliticalImpact: 'Zamonaviy xalqaro munosabatlar va milliy davlatlar tizimiga asos soldi. Barcha zamonaviy xalqaro huquq institutlari shu sulh tamoyillariga tayanadi.',
    originalDocumentExtract: '"Ushbu tinchlik barcha tomonlar uchun chinakam, samimiy va abadiy boʻlsin. Har bir davlat oʻz chegaralarida toʻlaqonli hukmronlikka egadir..."',
    heroBackgroundUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1920&q=80',
    coordinates: { lat: 51.9607, lng: 7.6261, locationName: 'Myunster, Germaniya' },
    citations: [
      { id: 'c-30', sourceTitle: 'Treaty of Westphalia Original Protocols', author: 'European State Archives', year: 1648, type: 'archive' }
    ]
  }
];

export const HISTORICAL_MONUMENTS: HistoricalMonument[] = [
  {
    id: 'registon-ansambli',
    name: 'Registon Ansambli',
    ancientName: 'Registon (Qumloq joy)',
    buildCentury: 'XV-XVII asrlar',
    buildYear: 1420,
    builder: 'Mirzo Ulugʻbek, Yalangtoʻsh Bahodir',
    architecturalStyle: 'Temuriylar va Ashtarxoniylar memoriy uslubi, koshinkorlik sanʼati',
    locationCity: 'Samarqand, Oʻzbekiston',
    currentStatus: 'UNESCO Butunjahon merosi obyekti, Davlat muzey-qoʻriqxonasi',
    shortDescription: 'Sharq meʼmorchiligining eng buyuk durdonasi, 3 ta afsonaviy madrasadan iborat betakror maydon.',
    architecturalDetails: 'Maydonda 3 ta muazzam madrasa joylashgan: Ulugʻbek madrasasi (1417–1420), Sherdor madrasasi (1619–1636, peshtoqida quyosh va ohuni quvayotgan qoplonlar tasvirlangan) va Tillakori madrasasi (1646–1660, ichki bezaklarida sof oltin suvi ishlatilgan).',
    heroBackgroundUrl: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=1920&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80'
    ],
    coordinates: { lat: 39.6548, lng: 66.9757, locationName: 'Registon, Samarqand' },
    citations: [
      { id: 'c-31', sourceTitle: 'Samarqand Registoni', author: 'P.Sh. Zohidov', year: 1986, type: 'book' }
    ]
  },
  {
    id: 'gori-amir',
    name: 'Goʻri Amir Maqbarasi',
    ancientName: 'Goʻri Mir (Amir qabri)',
    buildCentury: 'XV asr (1404)',
    buildYear: 1404,
    builder: 'Amir Temur, Mirzo Ulugʻbek',
    architecturalStyle: 'Temuriy monumental meʼmorchiligi, 64 qovurgʻali moviy gumbaz',
    locationCity: 'Samarqand, Oʻzbekiston',
    currentStatus: 'UNESCO Butunjahon merosi obyekti, faol maqbara va muzey',
    shortDescription: 'Amir Temur va temuriylar xonadoni (Shohruh, Ulugʻbek, Mir Sayyid Baraka) dafn etilgan muazzam dahma.',
    architecturalDetails: 'Balandligi 34 metr boʻlgan 64 qovurgʻali yorqin zangori gumbaz bilan bezatilgan. Ichki xona koshinkori marmar panjaralar va qora nefrit toshidan yasalgan Temur qabrtoshi bilan mashhur.',
    heroBackgroundUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1920&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80'
    ],
    coordinates: { lat: 39.6486, lng: 66.9692, locationName: 'Goʻri Amir, Samarqand' },
    citations: [
      { id: 'c-32', sourceTitle: 'Temuriylar meʼmoriy sanʼati', author: 'L.Yu. Mankovskaya', year: 1995, type: 'academic_paper' }
    ]
  },
  {
    id: 'minora-i-kalon',
    name: 'Minorai Kalon (Katta Minora)',
    ancientName: 'Minara-i Kalan',
    buildCentury: 'XII asr (1127)',
    buildYear: 1127,
    builder: 'Arslonxon Muhammad (Qoraxoniy hukmdor), Meʼmor Bako',
    architecturalStyle: 'Qoraxoniylar gʻisht terish mahorati va oʻyma naqshlar',
    locationCity: 'Buxoro, Oʻzbekiston',
    currentStatus: 'UNESCO obyekti, Buxoroning ramziy minorasi',
    shortDescription: 'Balandligi 45.6 metr boʻlgan, Chingizxon ham hayratlanib buzishga jurʼat etmagan afsonaviy minora.',
    architecturalDetails: 'Pishiq gʻishtdan ohak qorishmasida poydevoriga tuxum sarigʻi qoʻshib qurilgan. 14 ta naqshinkor halqasining har biri betakror geometrik uslubda terilgan.',
    heroBackgroundUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1920&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'
    ],
    coordinates: { lat: 39.7758, lng: 64.4144, locationName: 'Poyi Kalon, Buxoro' },
    citations: [
      { id: 'c-33', sourceTitle: 'Buxoro meʼmoriy yodgorliklari', author: 'O.A. Suxareva', year: 1966, type: 'book' }
    ]
  }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'tl-1',
    title: 'Qadesh tinchlik shartnomasi imzolandi',
    year: 1258,
    isBCE: true,
    century: 'm.avv. XIII asr',
    category: 'treaty',
    summary: 'Misr firʼavni Ramzes II va Xett podshohi Xattusili III oʻrtasida insoniyat tarixidagi birinchi yozma tinchlik sulhi tuzildi.',
    entityId: 'qadesh-shartnomasi',
    route: '/treaties',
    heroBackgroundUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    tags: ['Misr', 'Xett', 'Diplomatiya', 'm.avv.']
  },
  {
    id: 'tl-2',
    title: 'Spitamen boshchiligida Politimet jangi',
    year: 329,
    isBCE: true,
    century: 'm.avv. IV asr',
    category: 'conflict',
    summary: 'Spitamen boshchiligidagi soʻgʻdiylar Aleksandr Makedonskiy korpusini Zarafshon daryosi boʻyida butunlay tor-mor keltirdi.',
    entityId: 'politimet-jangi',
    route: '/conflicts',
    heroBackgroundUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=800&q=80',
    tags: ['Spitamen', 'Aleksandr', 'Soʻgʻdiyona', 'Jang']
  },
  {
    id: 'tl-3',
    title: 'Kushon Imperiyasi Kanishka I davrida gullab-yashnadi',
    year: 127,
    isBCE: false,
    century: 'II asr',
    category: 'state',
    summary: 'Kanishka I davrida Kushon davlati Rim, Parfiya va Xan Xitoyi bilan tenglashib, Ipak yoʻlida Gandxara madaniyatini yuksaltirdi.',
    entityId: 'kushon-imperiyasi',
    route: '/states',
    heroBackgroundUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    tags: ['Kushon', 'Kanishka', 'Antik davr']
  },
  {
    id: 'tl-4',
    title: 'Muqanna qoʻzgʻoloni va "Oq kiyimlilar" harakati',
    year: 776,
    isBCE: false,
    century: 'VIII asr',
    category: 'conflict',
    summary: 'Movarounnahrda xalifalik zulmiga qarshi xalq ozodlik harakati keng yoyildi.',
    entityId: 'muqanna-qozgoloni',
    route: '/conflicts',
    heroBackgroundUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    tags: ['Muqanna', 'Xalifalik', 'Ozodlik']
  },
  {
    id: 'tl-5',
    title: 'Al-Xorazmiy "Al-Jabr" asari bilan algebraga asos soldi',
    year: 820,
    isBCE: false,
    century: 'IX asr',
    category: 'person',
    summary: 'Bagʻdoddagi Bayt ul-Hikmada al-Xorazmiy nol raqami va tenglamalar hisobini dunyo ilmiga joriy qildi.',
    entityId: 'al-xorazmiy',
    route: '/persons',
    heroBackgroundUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
    tags: ['Algebra', 'Ilm-fan', 'Xorazm']
  },
  {
    id: 'tl-6',
    title: 'Ismoil Somoniy Buxoroda yagona markazlashgan davlat tuzdi',
    year: 892,
    isBCE: false,
    century: 'IX asr',
    category: 'state',
    summary: 'Somoniylar davlati poytaxt Buxoroda Sharq uygʻonish davriga poydevor qoʻydi.',
    entityId: 'somoniylar-davlati',
    route: '/states',
    heroBackgroundUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    tags: ['Somoniylar', 'Buxoro', 'Davlat']
  },
  {
    id: 'tl-7',
    title: 'Minorai Kalon qad rostladi',
    year: 1127,
    isBCE: false,
    century: 'XII asr',
    category: 'monument',
    summary: 'Qoraxoniy hukmdor Arslonxon Buxoroda 45 metrli salobatli minorani qurdirdi.',
    entityId: 'minora-i-kalon',
    route: '/monuments',
    heroBackgroundUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    tags: ['Buxoro', 'Minora', 'Meʼmorchilik']
  },
  {
    id: 'tl-8',
    title: 'Jaloliddin Manguberdi Parvon jangida gʻalaba qozondi',
    year: 1221,
    isBCE: false,
    century: 'XIII asr',
    category: 'person',
    summary: 'Xorazmshoh Jaloliddin Manguberdi Chingizxon armiyasining bosh qoʻshinini Parvon maydonida tor-mor qildi.',
    entityId: 'jaloliddin-manguberdi',
    route: '/persons',
    heroBackgroundUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80',
    tags: ['Manguberdi', 'Jang', 'Qahramonlik']
  },
  {
    id: 'tl-9',
    title: 'Amir Temur Samarqandda taxtga oʻtirdi',
    year: 1370,
    isBCE: false,
    century: 'XIV asr',
    category: 'state',
    summary: 'Amir Temur 1370-yil 9-aprelda buyuk Temuriylar saltanatiga asos soldi va Samarqandni poytaxt qildi.',
    entityId: 'amir-temur',
    route: '/persons',
    heroBackgroundUrl: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=800&q=80',
    tags: ['Amir Temur', 'Samarqand', 'Imperiya']
  },
  {
    id: 'tl-10',
    title: 'Tarixiy Anqara jangi',
    year: 1402,
    isBCE: false,
    century: 'XV asr',
    category: 'conflict',
    summary: 'Amir Temur Boyazid I Yildirim ustidan gʻalaba qozonib, jahon xaritasini oʻzgartirdi.',
    entityId: 'anqara-jangi',
    route: '/conflicts',
    heroBackgroundUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    tags: ['Anqara', 'Amir Temur', 'Boyazid']
  },
  {
    id: 'tl-11',
    title: 'Mirzo Ulugʻbek "Ziji Koʻragoniy" yulduzlar jadvalini yaratdi',
    year: 1437,
    isBCE: false,
    century: 'XV asr',
    category: 'person',
    summary: 'Samarqand rasadxonasida 1018 ta yulduzning eng aniq koordinatalari hisoblab chiqildi.',
    entityId: 'mirzo-ulugbek',
    route: '/persons',
    heroBackgroundUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80',
    tags: ['Ulugʻbek', 'Astronomiya', 'Rasadxona']
  },
  {
    id: 'tl-12',
    title: 'Vestfaliya sulhi va zamonaviy xalqaro munosabatlar tizimi',
    year: 1648,
    isBCE: false,
    century: 'XVII asr',
    category: 'treaty',
    summary: 'Yevropada davlat suvereniteti va chegaralar daxlsizligi tamoyili mustahkamlandi.',
    entityId: 'vestfaliya-sulhi',
    route: '/treaties',
    heroBackgroundUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    tags: ['Sulh', 'Yevropa', 'Suverenitet']
  }
];

export const MAP_ROUTES: MapRouteLayer[] = [
  {
    id: 'silk-road',
    name: 'Buyuk Ipak Yoʻli (Asosiy Shimoliy va Janubiy Magistrallar)',
    description: 'Xitoyning Changan shahridan Samarqand, Buxoro, Marv, Bagʻdod orqali Rim va Konstantinopolgacha boʻlgan 7000 km lik savdo yoʻli.',
    color: '#f59e0b', // Gold Amber
    epoch: 'm.avv. II asr — milodiy XVI asr',
    coordinates: [
      [34.3416, 108.9398], // Xi'an (Changan)
      [40.1421, 94.6620],  // Dunhuang
      [41.7266, 82.9592],  // Kucha
      [39.4677, 75.9898],  // Kashgar
      [40.8154, 72.2837],  // Andijon / Farg'ona
      [39.6542, 66.9597],  // Samarqand
      [39.7747, 64.4286],  // Buxoro
      [37.5958, 61.8556],  // Marv
      [36.2974, 59.6062],  // Mashhad
      [35.6892, 51.3890],  // Tehron / Ray
      [33.3152, 44.3661],  // Bag'dod
      [36.2021, 37.1343],  // Halab (Aleppo)
      [41.0082, 28.9784],  // Konstantinopol (Istanbul)
      [41.9028, 12.4964]   // Rim
    ]
  },
  {
    id: 'timur-campaigns',
    name: 'Amir Temurning Gʻarbiy va Janubiy Yurishlari (1386-1402)',
    description: 'Samarqanddan boshlanib Kavkaz, Oltin Oʻrda (Volga), Hindiston (Dehli), Yaqin Sharq va Anqaragacha qamrab olgan harbiy marshrut.',
    color: '#ef4444', // Red
    epoch: 'XIV asr (1370–1405)',
    coordinates: [
      [39.6542, 66.9597], // Samarqand
      [37.2242, 67.2783], // Termiz / Balx
      [34.5553, 69.2075], // Kobul
      [28.6139, 77.2090], // Dehli
      [34.5553, 69.2075], // Kobul qaytish
      [39.6542, 66.9597], // Samarqand
      [40.4093, 49.8671], // Boku / Ozarbayjon
      [41.7151, 44.8271], // Tbilisi
      [51.5332, 46.0343], // Saratov / Qunduzcha (Oltin O'rda)
      [33.5138, 36.2765], // Damashq
      [39.9334, 32.8597]  // Anqara
    ]
  },
  {
    id: 'alexander-march',
    name: 'Aleksandr Makedonskiyning Oʻrta Osiyo va Baqtriya Yurishi',
    description: 'Gavgamela jangidan soʻng Baqtriya, Marokanda, Aleksandriya Esxata (Xoʻjand) va Hindiston yurishi.',
    color: '#3b82f6', // Blue
    epoch: 'm.avv. IV asr (m.avv. 331–326)',
    coordinates: [
      [36.3575, 43.1536], // Gavgamela / Mosul
      [33.3152, 44.3661], // Bobil
      [29.9344, 52.8914], // Persepol
      [34.3529, 62.2040], // Hirot (Alexandria Ariana)
      [36.7559, 66.8975], // Baqtra (Balx)
      [37.2242, 67.2783], // Oks (Amudaryo kechuvi)
      [39.6542, 66.9597], // Marokanda (Samarqand)
      [40.2833, 69.6333], // Xo'jand (Alexandria Eschate)
      [34.0043, 71.5448]  // Peshovar / Hind daryosi
    ]
  }
];

export const INITIAL_PROPOSALS: EditProposal[] = [
  {
    id: 'prop-1',
    targetId: 'amir-temur',
    targetType: 'person',
    targetTitle: 'Amir Temur Koʻragon',
    authorName: 'Dr. Sardor Yusupov',
    authorRole: 'researcher',
    authorEmail: 'sardor.yusupov@academy.uz',
    submittedAt: '2026-08-15 14:30',
    summaryOfChange: 'Klavixo elchilik kundaliklaridan yangi manba va diplomatik yozishmalar iqtibosini qoʻshish.',
    proposedContent: 'Amir Temurning 1402-yildagi Anqara gʻalabasidan soʻng Fransiya qiroli Karl VI va Angliya qiroli Genrix IV bilan olib borgan savdo shartnomalari diplomatik xatlari kiritildi.',
    originalContent: 'Amir Temur diplomatiyasi haqidagi umumiy maʼlumotlar.',
    status: 'pending',
    citationsAdded: [
      { id: 'c-new-1', sourceTitle: 'Embassy to Tamerlane 1403-1406', author: 'Ruy Gonzalez de Clavijo', year: 1928, type: 'book' }
    ]
  },
  {
    id: 'prop-2',
    targetId: 'registon-ansambli',
    targetType: 'monument',
    targetTitle: 'Registon Ansambli',
    authorName: 'Nodira Qosimova (Restavrator)',
    authorRole: 'researcher',
    authorEmail: 'n.qosimova@heritage.uz',
    submittedAt: '2026-08-16 09:15',
    summaryOfChange: 'Tillakori madrasasining gumbazidagi oltin qoplama restavratsiyasi tafsilotlarini yangilash.',
    proposedContent: 'Tillakori masjidining "kundal" uslubidagi tillakori naqshlarida 1979-yilda 3.5 kg sof tilla ishlatilgani haqidagi arxiv maʼlumoti qoʻshildi.',
    originalContent: 'Ichki bezaklarida sof oltin suvi ishlatilgan.',
    status: 'approved',
    citationsAdded: [
      { id: 'c-new-2', sourceTitle: 'Samarqand obidalari restavratsiyasi arxivi', author: 'Madaniy meros agentligi', year: 2021, type: 'archive' }
    ]
  }
];
