import type { Dictionary, Lang } from './types'

export const translations: Record<Lang, Dictionary> = {
  tr: {
    nav: {
      home: 'ANA SAYFA',
      company: 'ŞİRKET',
      products: 'ÜRÜNLER',
      contact: 'İLETİŞİM',
    },
    voltageCategories: [
      {
        id: 'low-voltage',
        index: '01',
        name: 'ALÇAK GERİLİM',
        description:
          'Dağıtım, koruma ve bağlantı için endüstri lideri markaların bir araya geldiği alçak gerilim ürün ailesi.',
      },
      {
        id: 'medium-voltage',
        index: '02',
        name: 'ORTA GERİLİM',
        description:
          'Trafo merkezleri ve dağıtım hücreleri ile şebeke altyapısının omurgasını oluşturan orta gerilim çözümleri.',
      },
    ],
    hero: {
      eyebrowSuffix: '— DİJİTAL KATALOG',
      title: ['GELECEĞİN', 'ENERJİSİNİ', 'KURUYORUZ.'],
      subtitle: 'Alçak ve orta gerilim ürünlerini keşfedebileceğiniz interaktif dijital katalog.',
      scrollHint: 'KEŞFETMEK İÇİN KAYDIR',
    },
    about: {
      kicker: 'ŞİRKET',
      title: 'Mühendislik odaklı tedarik.',
      body:
        'Green Pi Enerji, alçak ve orta gerilim şebekelerinde kullanılan bileşenleri, sahada karşılaşılan gerçek mühendislik problemlerine çözüm olacak şekilde bir araya getirir. Uluslararası markaların ürün gamını, yerel projelerin teknik gereksinimleriyle buluşturuyoruz.',
    },
    vision: {
      index: '01',
      kicker: 'VİZYON',
      title: 'Daha bağlantılı ve\nsürdürülebilir bir\nenerji altyapısı.',
      body:
        'Şebekelerin dijitalleştiği, enerjinin daha akıllı yönetildiği bir gelecekte; güvenilir bileşen tedarikinin bu dönüşümün temeli olduğuna inanıyoruz.',
    },
    mission: {
      index: '02',
      kicker: 'MİSYON',
      title: 'Doğru ürünü, doğru\nprojeye, doğru zamanda\nulaştırmak.',
      body:
        'Sahadaki mühendislerin ihtiyaç duyduğu teknik derinliği, geniş stok kapasitesi ve hızlı tedarik süreçleriyle destekliyoruz.',
    },
    closing: {
      kicker: 'GREEN PI ENERJİ',
      body: 'Projeniz için doğru elektrik altyapısı çözümlerini birlikte tasarlayalım.',
    },
    contact: {
      emailLabel: 'E-POSTA',
      phoneLabel: 'TELEFON',
      addressLabel: 'ADRES',
    },
    portfolio: {
      title: 'ÜRÜN PORTFÖYÜ',
    },
    product: {
      viewLabel: 'İncele',
      drawerClose: 'Kapat',
      drawerBrandLabel: 'Marka',
      drawerCategoryLabel: 'Kategori',
      drawerCta: 'Teklif İste',
      categoryFallbackLow: 'Alçak Gerilim',
      categoryFallbackMedium: 'Orta Gerilim',
    },
    spec: {
      visualLabel: 'Teknik Görünüm',
      columnLabel0: 'Model Kodu',
      columnLabel1: 'Teknik Açıklama',
      emptyState: 'Teknik veri tablosu yakında eklenecek.',
    },
    footer: {
      rights: 'Tüm hakları saklıdır.',
    },
    menuAria: {
      burger: 'Menü',
      showBrands: 'Markaları göster',
      sideNav: 'Bölüm navigasyonu',
    },
  },
  en: {
    nav: {
      home: 'HOME',
      company: 'COMPANY',
      products: 'PRODUCTS',
      contact: 'CONTACT',
    },
    voltageCategories: [
      {
        id: 'low-voltage',
        index: '01',
        name: 'LOW VOLTAGE',
        description:
          'A low voltage product family bringing together industry-leading brands for distribution, protection and connection.',
      },
      {
        id: 'medium-voltage',
        index: '02',
        name: 'MEDIUM VOLTAGE',
        description:
          'Medium voltage solutions forming the backbone of grid infrastructure, from transformer substations to distribution cells.',
      },
    ],
    hero: {
      eyebrowSuffix: '— DIGITAL CATALOGUE',
      title: ['BUILDING', "TOMORROW'S", 'ENERGY.'],
      subtitle: 'An interactive digital catalogue to explore our low and medium voltage products.',
      scrollHint: 'SCROLL TO EXPLORE',
    },
    about: {
      kicker: 'COMPANY',
      title: 'Engineering-driven supply.',
      body:
        'Green Pi Enerji brings together the components used in low and medium voltage networks, assembled to solve the real engineering problems encountered in the field. We match the product range of international brands with the technical requirements of local projects.',
    },
    vision: {
      index: '01',
      kicker: 'VISION',
      title: 'A more connected\nand sustainable\nenergy infrastructure.',
      body:
        'In a future where grids become digital and energy is managed more intelligently, we believe reliable component supply is the foundation of that transformation.',
    },
    mission: {
      index: '02',
      kicker: 'MISSION',
      title: 'Delivering the right\nproduct, to the right\nproject, at the right time.',
      body:
        'We support the technical depth engineers need in the field with extensive stock capacity and fast supply processes.',
    },
    closing: {
      kicker: 'GREEN PI ENERJİ',
      body: "Let's design the right electrical infrastructure solutions for your project, together.",
    },
    contact: {
      emailLabel: 'EMAIL',
      phoneLabel: 'PHONE',
      addressLabel: 'ADDRESS',
    },
    portfolio: {
      title: 'PRODUCT PORTFOLIO',
    },
    product: {
      viewLabel: 'View',
      drawerClose: 'Close',
      drawerBrandLabel: 'Brand',
      drawerCategoryLabel: 'Category',
      drawerCta: 'Request a Quote',
      categoryFallbackLow: 'Low Voltage',
      categoryFallbackMedium: 'Medium Voltage',
    },
    spec: {
      visualLabel: 'Technical View',
      columnLabel0: 'Model Code',
      columnLabel1: 'Technical Description',
      emptyState: 'Technical data table coming soon.',
    },
    footer: {
      rights: 'All rights reserved.',
    },
    menuAria: {
      burger: 'Menu',
      showBrands: 'Show brands',
      sideNav: 'Section navigation',
    },
  },
  ru: {
    nav: {
      home: 'ГЛАВНАЯ',
      company: 'КОМПАНИЯ',
      products: 'ПРОДУКЦИЯ',
      contact: 'КОНТАКТЫ',
    },
    voltageCategories: [
      {
        id: 'low-voltage',
        index: '01',
        name: 'НИЗКОЕ НАПРЯЖЕНИЕ',
        description:
          'Линейка продукции низкого напряжения, объединяющая ведущие мировые бренды для распределения, защиты и подключения.',
      },
      {
        id: 'medium-voltage',
        index: '02',
        name: 'СРЕДНЕЕ НАПРЯЖЕНИЕ',
        description:
          'Решения среднего напряжения, формирующие основу сетевой инфраструктуры — от трансформаторных подстанций до распределительных ячеек.',
      },
    ],
    hero: {
      eyebrowSuffix: '— ЦИФРОВОЙ КАТАЛОГ',
      title: ['СОЗДАЁМ', 'ЭНЕРГИЮ', 'БУДУЩЕГО.'],
      subtitle: 'Интерактивный цифровой каталог продукции низкого и среднего напряжения.',
      scrollHint: 'ПРОКРУТИТЕ, ЧТОБЫ ИЗУЧИТЬ',
    },
    about: {
      kicker: 'КОМПАНИЯ',
      title: 'Поставки, основанные на инженерии.',
      body:
        'Green Pi Enerji объединяет компоненты, используемые в сетях низкого и среднего напряжения, подобранные для решения реальных инженерных задач на объекте. Мы связываем продуктовую линейку международных брендов с техническими требованиями локальных проектов.',
    },
    vision: {
      index: '01',
      kicker: 'ВИДЕНИЕ',
      title: 'Более связанная\nи устойчивая\nэнергетическая инфраструктура.',
      body:
        'В будущем, где сети становятся цифровыми, а энергия управляется более разумно, мы верим, что надёжные поставки компонентов — основа этой трансформации.',
    },
    mission: {
      index: '02',
      kicker: 'МИССИЯ',
      title: 'Доставлять нужный\nпродукт нужному\nпроекту в нужное время.',
      body:
        'Мы поддерживаем техническую глубину, необходимую инженерам на объекте, за счёт обширных складских запасов и быстрых процессов поставки.',
    },
    closing: {
      kicker: 'GREEN PI ENERJİ',
      body: 'Давайте вместе разработаем правильные решения электрической инфраструктуры для вашего проекта.',
    },
    contact: {
      emailLabel: 'ЭЛ. ПОЧТА',
      phoneLabel: 'ТЕЛЕФОН',
      addressLabel: 'АДРЕС',
    },
    portfolio: {
      title: 'ПОРТФЕЛЬ ПРОДУКЦИИ',
    },
    product: {
      viewLabel: 'Подробнее',
      drawerClose: 'Закрыть',
      drawerBrandLabel: 'Бренд',
      drawerCategoryLabel: 'Категория',
      drawerCta: 'Запросить предложение',
      categoryFallbackLow: 'Низкое напряжение',
      categoryFallbackMedium: 'Среднее напряжение',
    },
    spec: {
      visualLabel: 'Технический вид',
      columnLabel0: 'Код модели',
      columnLabel1: 'Техническое описание',
      emptyState: 'Таблица технических данных будет добавлена позже.',
    },
    footer: {
      rights: 'Все права защищены.',
    },
    menuAria: {
      burger: 'Меню',
      showBrands: 'Показать бренды',
      sideNav: 'Навигация по разделам',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      company: 'الشركة',
      products: 'المنتجات',
      contact: 'اتصل بنا',
    },
    voltageCategories: [
      {
        id: 'low-voltage',
        index: '01',
        name: 'الجهد المنخفض',
        description:
          'عائلة منتجات الجهد المنخفض التي تجمع بين العلامات التجارية الرائدة في الصناعة للتوزيع والحماية والتوصيل.',
      },
      {
        id: 'medium-voltage',
        index: '02',
        name: 'الجهد المتوسط',
        description:
          'حلول الجهد المتوسط التي تشكل العمود الفقري للبنية التحتية للشبكة، من محطات المحولات إلى خلايا التوزيع.',
      },
    ],
    hero: {
      eyebrowSuffix: '— كتالوج رقمي',
      title: ['نبني', 'طاقة', 'المستقبل.'],
      subtitle: 'كتالوج رقمي تفاعلي لاستكشاف منتجاتنا للجهد المنخفض والمتوسط.',
      scrollHint: 'مرر للاستكشاف',
    },
    about: {
      kicker: 'الشركة',
      title: 'توريد قائم على الهندسة.',
      body:
        'تجمع Green Pi Enerji المكوّنات المستخدمة في شبكات الجهد المنخفض والمتوسط بطريقة تحل المشكلات الهندسية الحقيقية التي تُواجَه في الميدان. نربط تشكيلة منتجات العلامات التجارية العالمية بالمتطلبات التقنية للمشاريع المحلية.',
    },
    vision: {
      index: '01',
      kicker: 'الرؤية',
      title: 'بنية تحتية للطاقة\nأكثر اتصالاً\nواستدامة.',
      body:
        'في مستقبل تصبح فيه الشبكات رقمية وتُدار الطاقة بذكاء أكبر، نؤمن بأن التوريد الموثوق للمكوّنات هو أساس هذا التحوّل.',
    },
    mission: {
      index: '02',
      kicker: 'المهمة',
      title: 'إيصال المنتج الصحيح\nللمشروع الصحيح\nفي الوقت الصحيح.',
      body:
        'ندعم العمق التقني الذي يحتاجه المهندسون في الميدان من خلال سعة تخزين واسعة وعمليات توريد سريعة.',
    },
    closing: {
      kicker: 'GREEN PI ENERJİ',
      body: 'لنصمم معًا حلول البنية التحتية الكهربائية المناسبة لمشروعك.',
    },
    contact: {
      emailLabel: 'البريد الإلكتروني',
      phoneLabel: 'الهاتف',
      addressLabel: 'العنوان',
    },
    portfolio: {
      title: 'محفظة المنتجات',
    },
    product: {
      viewLabel: 'عرض',
      drawerClose: 'إغلاق',
      drawerBrandLabel: 'العلامة التجارية',
      drawerCategoryLabel: 'الفئة',
      drawerCta: 'طلب عرض سعر',
      categoryFallbackLow: 'جهد منخفض',
      categoryFallbackMedium: 'جهد متوسط',
    },
    spec: {
      visualLabel: 'العرض التقني',
      columnLabel0: 'رمز الموديل',
      columnLabel1: 'الوصف التقني',
      emptyState: 'سيتم إضافة جدول البيانات التقنية قريبًا.',
    },
    footer: {
      rights: 'جميع الحقوق محفوظة.',
    },
    menuAria: {
      burger: 'القائمة',
      showBrands: 'إظهار العلامات التجارية',
      sideNav: 'التنقل بين الأقسام',
    },
  },
}
