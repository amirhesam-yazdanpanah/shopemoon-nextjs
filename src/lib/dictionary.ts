export type Locale = "fa" | "en" | "tr";

export const telegramChannelLink = "https://t.me/shopeemonn";

export interface BrandLink {
  name: string;
  url: string;
}

export const fashionBrands: BrandLink[] = [
  // Inditex
  { name: "Zara", url: "https://www.zara.com" },
  { name: "Massimo Dutti", url: "https://www.massimodutti.com" },
  { name: "Oysho", url: "https://www.oysho.com" },
  { name: "Bershka", url: "https://www.bershka.com" },
  { name: "Stradivarius", url: "https://www.stradivarius.com" },
  { name: "Pull&Bear", url: "https://www.pullandbear.com" },
  { name: "Zara Home", url: "https://www.zarahome.com" },
  { name: "Mango", url: "https://shop.mango.com" },
  { name: "H&M", url: "https://www.hm.com" },
  // Luxury
  { name: "Gucci", url: "https://www.gucci.com" },
  { name: "Dior", url: "https://www.dior.com" },
  { name: "Louis Vuitton", url: "https://www.louisvuitton.com" },
  { name: "Saint Laurent", url: "https://www.ysl.com" },
  { name: "Prada", url: "https://www.prada.com" },
  { name: "Balenciaga", url: "https://www.balenciaga.com" },
  { name: "Burberry", url: "https://www.burberry.com" },
  { name: "Fendi", url: "https://www.fendi.com" },
  { name: "Valentino", url: "https://www.valentino.com" },
  { name: "Versace", url: "https://www.versace.com" },
  { name: "Bottega Veneta", url: "https://www.bottegaveneta.com" },
  { name: "Loewe", url: "https://www.loewe.com" },
  { name: "Celine", url: "https://www.celine.com" },
  { name: "Hermès", url: "https://www.hermes.com" },
  { name: "Chanel", url: "https://www.chanel.com" },
  // Contemporary & Department Stores
  { name: "Guess", url: "https://www.guess.com" },
  { name: "Tommy Hilfiger", url: "https://www.tommy.com" },
  { name: "Calvin Klein", url: "https://www.calvinklein.com" },
  { name: "GAP", url: "https://www.gap.com" },
  { name: "Marks & Spencer", url: "https://www.marksandspencer.com" },
  { name: "Boyner", url: "https://www.boyner.com.tr" },
  { name: "Trendyol", url: "https://www.trendyol.com" },
  // Footwear
  { name: "Ecco", url: "https://www.ecco.com" },
  { name: "Aldo", url: "https://www.aldoshoes.com" },
  { name: "Birkenstock", url: "https://www.birkenstock.com" },
];

export const sportsBrands: BrandLink[] = [
  { name: "Nike", url: "https://www.nike.com" },
  { name: "Adidas", url: "https://www.adidas.com" },
  { name: "Puma", url: "https://www.puma.com" },
  { name: "Reebok", url: "https://www.reebok.com" },
  { name: "Under Armour", url: "https://www.underarmour.com" },
  { name: "Alo Yoga", url: "https://www.aloyoga.com" },
  { name: "Champion", url: "https://www.champion.com" },
  { name: "Lululemon", url: "https://www.lululemon.com" },
  { name: "New Balance", url: "https://www.newbalance.com" },
  { name: "Asics", url: "https://www.asics.com" },
  { name: "The North Face", url: "https://www.thenorthface.com" },
  { name: "Columbia", url: "https://www.columbia.com" },
];

export const beautyBrands: BrandLink[] = [
  { name: "Sephora", url: "https://www.sephora.com" },
  { name: "Clinique", url: "https://www.clinique.com" },
  { name: "MAC", url: "https://www.maccosmetics.com" },
  { name: "KIKO Milano", url: "https://www.kikocosmetics.com" },
  { name: "Guerlain", url: "https://www.guerlain.com" },
  { name: "Chanel Beauty", url: "https://www.chanel.com/us/beauty/" },
  { name: "YSL Beauty", url: "https://www.yslbeauty.com" },
  { name: "Dior Beauty", url: "https://www.dior.com/en_us/beauty" },
  { name: "Armani Beauty", url: "https://www.armanibeauty.com" },
  { name: "Lancôme", url: "https://www.lancome.com" },
  { name: "Estée Lauder", url: "https://www.esteelauder.com" },
  { name: "Tom Ford Beauty", url: "https://www.tomford.com" },
  { name: "Charlotte Tilbury", url: "https://www.charlottetilbury.com" },
  { name: "Kérastase", url: "https://www.kerastase.com" },
  { name: "NARS", url: "https://www.narscosmetics.com" },
  { name: "Benefit", url: "https://www.benefitcosmetics.com" },
  { name: "Rare Beauty", url: "https://www.rarebeauty.com" },
  { name: "Fenty Beauty", url: "https://www.fentybeauty.com" },
  { name: "Huda Beauty", url: "https://www.hudabeauty.com" },
];

export const allBrands: BrandLink[] = [...fashionBrands, ...sportsBrands, ...beautyBrands];

export interface LocaleDictionary {
  dir: "rtl" | "ltr";
  nav: {
    home: string;
    about: string;
    products: string;
    experience: string;
    membership: string;
    faq: string;
    contact: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trustIndicators: string[];
  };
  trust: {
    title: string;
    items: { title: string; desc: string }[];
  };
  products: {
    title: string;
    subtitle: string;
    categories: { name: string; brands: BrandLink[] }[];
  };
  membership: {
    title: string;
    desc: string;
    fields: {
      name: string;
      phone: string;
      brands: string;
      details: string;
      address: string;
      addressPlaceholder: string;
      gender: string;
      genderPlaceholder: string;
      genderOptions: { female: string; male: string; preferNotToSay: string };
      birthDate: string;
      birthDatePlaceholder: string;
      birthDateInvalidError: string;
      birthDateFutureError: string;
      phoneInvalidError: string;
    };
    submit: string;
    submitting: string;
    successMessage: string;
    errorMessage: string;
  };
  membershipModal: {
    teaserTitle: string;
    teaserDesc: string;
    submit: string;
    teaserLater: string;
    successMessage: string;
  };
  experience: {
    title: string;
    intro: string;
    fields: {
      name: string;
      phone: string;
      product: string;
      rating: string;
      feedback: string;
      photo: string;
    };
    submit: string;
    moderationNote: string;
    rewardNote: string;
    teaserTitle: string;
    teaserDesc: string;
    teaserLater: string;
  };
  faq: {
    title: string;
    items: { q: string; a: string }[];
  };
  contact: {
    title: string;
    desc: string;
    cta: string;
  };
  footer: {
    tagline: string;
    rights: string;
  };
  theme: { light: string; dark: string; toggleLabel: string };
  about: {
    title: string;
    paragraphs: string[];
    stats: { value: string; label: string }[];
    quote: string;
  };
}

const translatedDictionary = {
  fa: {
    dir: "rtl" as const,
    nav: {
      home: "خانه",
      about: "درباره من",
      products: "فروشگاه‌ها",
      experience: "تجربه خرید",
      membership: "عضویت",
      faq: "سوالات",
      contact: "تماس",
    },
    hero: {
      eyebrow: "ShopeMoon",
      title: "خرید مستقیم از برندهای اورجینال",
      subtitle: "خرید حضوری و آنلاین از فروشگاه‌های معتبر ترکیه و اروپا",
      ctaPrimary: "پیام در تلگرام",
      ctaSecondary: "مشاهده فروشگاه‌ها",
      trustIndicators: ["ضمانت اصالت کالا", "پاسخگویی سریع در تلگرام", "ارسال مطمئن"],
    },
    trust: {
      title: "مراحل خرید در شاپمون",
      items: [
        { title: "ارسال لینک محصول", desc: "لینک، عکس یا نام محصول مورد نظرتان را برای ما ارسال کنید." },
        { title: "بررسی موجودی و قیمت", desc: "موجودی، قیمت و جزئیات کالا از فروشگاه رسمی بررسی می‌شود." },
        { title: "پرداخت و خرید", desc: "پس از تأیید شما، خرید به صورت نهایی ثبت و پرداخت انجام می‌شود." },
        { title: "ارسال و تحویل", desc: "کالا ارسال می‌شود و کد رهگیری در اختیار شما قرار می‌گیرد." },
      ],
    },
    experience: {
      title: "تجربه خرید با شاپمون",
      intro: "تجربه خریدت با شاپمون رو با ما به اشتراک بذار؛ با ارسال عکس، نظر و رضایتت، برای خرید بعدی امتیاز یا تخفیف دریافت می‌کنی.",
      fields: {
        name: "نام و نام خانوادگی",
        phone: "شماره تلفن",
        product: "نام برند یا محصولی که خریدی",
        rating: "امتیاز خرید از ۱ تا ۵",
        feedback: "متن رضایت یا تجربه خرید",
        photo: "آپلود عکس رضایت / محصول",
      },
      submit: "ثبت تجربه خرید",
      moderationNote: "نظرات پس از بررسی تیم شاپمون منتشر خواهند شد.",
      rewardNote: "با ارسال تجربه خرید، کد تخفیف خرید بعدی برای شما ارسال می‌شود.",
      teaserTitle: "🎁 تجربه خرید با شاپمون",
      teaserDesc: "اگر از خریدت راضی بودی،\nبا ارسال عکس، نظر و تجربه خریدت،\nبرای خرید بعدی کد تخفیف یا امتیاز هدیه دریافت کن.",
      teaserLater: "بعداً",
    },
    products: {
      title: "دسته‌بندی محصولات",
      subtitle: "برندهای منتخب در حوزه پوشاک، زیبایی و ورزش",
      categories: [
        { name: "پوشاک و استایل", brands: fashionBrands },
        { name: "زیبایی و آرایشی", brands: beautyBrands },
        { name: "ورزشی و اکتیو", brands: sportsBrands },
      ],
    },
    membership: {
      title: "عضویت در ShopeMoon",
      desc: "با عضویت در ShopeMoon می‌توانید درخواست‌های خرید، برندهای مورد علاقه و اطلاعات تماس خود را ثبت کنید تا در زمان نیاز سریع‌تر راهنمایی شوید.",
      fields: {
        name: "نام و نام خانوادگی",
        phone: "شماره تلفن",
        brands: "برندهای مورد علاقه",
        details: "توضیحات / درخواست خرید",
        address: "آدرس",
        addressPlaceholder: "آدرس خود را وارد کنید",
        gender: "جنسیت",
        genderPlaceholder: "جنسیت خود را انتخاب کنید",
        genderOptions: { female: "خانم", male: "آقا", preferNotToSay: "ترجیح می‌دهم نگویم" },
        birthDate: "تاریخ تولد",
        birthDatePlaceholder: "تاریخ تولد خود را وارد کنید",
        birthDateInvalidError: "تاریخ تولد وارد شده معتبر نیست.",
        birthDateFutureError: "تاریخ تولد نمی‌تواند در آینده باشد.",
        phoneInvalidError: "شماره تلفن وارد شده معتبر نیست.",
      },
      submit: "ارسال و عضویت",
      submitting: "در حال ارسال...",
      successMessage: "عضویت شما با موفقیت ثبت شد 🌙\nکد تخفیف ۱۰٪ اولین خرید به‌زودی برای شما ارسال می‌شود.",
      errorMessage: "ارسال فرم با مشکل مواجه شد. لطفاً دوباره تلاش کنید یا از طریق تلگرام با ما در ارتباط باشید.",
    },
    membershipModal: {
      teaserTitle: "عضو شاپمون شو 🎁",
      teaserDesc: "و در اولین خریدت ۱۰٪ تخفیف هدیه بگیر.",
      submit: "ثبت عضویت",
      teaserLater: "بعداً",
      successMessage: "عضویت شما با موفقیت ثبت شد. کد تخفیف اولین خرید برای شما ارسال می‌شود.",
    },
    faq: {
      title: "سوالات متداول",
      items: [
        { q: "آیا کالاها اورجینال هستند؟", a: "بله، تمام خریدها مستقیم از فروشگاه‌های رسمی برندها انجام می‌شود." },
        { q: "هزینه ارسال چقدر است؟", a: "هزینه ارسال بر اساس مقصد و وزن کالا محاسبه و پیش از پرداخت اعلام می‌شود." },
        { q: "چقدر طول می‌کشد سفارش برسد؟", a: "زمان تقریبی ارسال بسته به کشور مبدا و مقصد متفاوت است و در زمان استعلام اعلام می‌شود." },
        { q: "چطور سفارش ثبت کنم؟", a: "کافی است از طریق تلگرام لینک، عکس یا نام محصول را برای ما ارسال کنید." },
      ],
    },
    contact: {
      title: "تماس با ما",
      desc: "برای هرگونه سوال یا ثبت سفارش از طریق تلگرام با ما در ارتباط باشید.",
      cta: "شروع گفتگو در تلگرام",
    },
    footer: {
      tagline: "خرید امن از برندهای اصلی ترکیه و اروپا",
      rights: "© ShopeMoon. تمامی حقوق محفوظ است.",
    },
    theme: { light: "روشن", dark: "تیره", toggleLabel: "حالت شب / روز" },
    about: {
      title: "درباره من",
      paragraphs: [
        "من مونا هستم و در ازمیر ترکیه زندگی می‌کنم.",
        "بیش از ۷ سال است که به صورت حرفه‌ای در حوزه خرید و فروش آنلاین فعالیت می‌کنم و امروز جامعه‌ای با بیش از ۳۳ هزار دنبال‌کننده همراه من هستند.",
        "شاپمون را با یک هدف ساده راه‌اندازی کردم: اینکه خرید از برندهای اصلی ترکیه برای ایرانی‌ها مطمئن، شفاف و بدون نگرانی باشد.",
        "هر روز با فروشگاه‌ها و برندهای مختلف در ارتباط هستم و به خوبی می‌دانم پیدا کردن کالای اصل، بررسی موجودی، استعلام قیمت و ارسال مطمئن چقدر اهمیت دارد. به همین دلیل تلاش می‌کنم تمام مراحل خرید را با شفافیت کامل انجام دهم؛ از بررسی کالا و ارسال عکس و فاکتور گرفته تا پیگیری سفارش و تحویل نهایی.",
        "در طول این سال‌ها، حتی در سخت‌ترین شرایط نیز ارتباط با مشتریان و پاسخگویی را متوقف نکرده‌ام. اعتماد مشتریان بزرگ‌ترین سرمایه من است و صدها تجربه موفق خرید و رضایت مشتری، نتیجه همین تعهد بوده است.",
        "اگر تصمیم بگیرید از طریق شاپمون خرید کنید، با یک فروشگاه بی‌نام‌ونشان طرف نیستید؛ با شخصی در ازمیر در ارتباطی که خرید تو را مثل خرید خودش پیگیری می‌کند.",
      ],
      stats: [
        { value: "38,500+", label: "دنبال‌کننده" },
        { value: "7", label: "سال تجربه خرید آنلاین" },
        { value: "صدها", label: "مشتری راضی" },
      ],
      quote: "«شاپمون نه یک فروشگاه، بلکه دوست معتمد تو هست»",
    },
  },
  en: {
    dir: "ltr" as const,
    nav: {
      home: "Home",
      about: "About Me",
      products: "Stores",
      experience: "Reviews",
      membership: "Membership",
      faq: "FAQ",
      contact: "Contact",
    },
    hero: {
      eyebrow: "ShopeMoon",
      title: "Buy Direct From Original Brands",
      subtitle: "In-person and online shopping from trusted Turkish and European retailers",
      ctaPrimary: "Message on Telegram",
      ctaSecondary: "View Stores",
      trustIndicators: ["Authenticity guaranteed", "Fast Telegram replies", "Reliable delivery"],
    },
    trust: {
      title: "Shopping Steps with ShopeMoon",
      items: [
        { title: "Send the product link", desc: "Send us a link, photo, or product name." },
        { title: "Stock & price check", desc: "Availability, price, and details are verified with the official store." },
        { title: "Payment & purchase", desc: "Once you confirm, the order is placed and payment is completed." },
        { title: "Shipping & delivery", desc: "Your order ships and you receive a tracking code." },
      ],
    },
    experience: {
      title: "Your ShopeMoon Shopping Experience",
      intro: "Share your ShopeMoon shopping experience with us — send a photo, your feedback, and your satisfaction to earn points or a discount on your next purchase.",
      fields: {
        name: "Full Name",
        phone: "Phone Number",
        product: "Brand or product you purchased",
        rating: "Rate your purchase from 1 to 5",
        feedback: "Your feedback or shopping experience",
        photo: "Upload a satisfaction / product photo",
      },
      submit: "Submit My Experience",
      moderationNote: "Reviews will be published after the ShopeMoon team reviews them.",
      rewardNote: "After submitting your experience, your next-purchase discount code will be sent to you.",
      teaserTitle: "🎁 Your ShopeMoon Experience",
      teaserDesc:
        "If you were happy with your purchase,\nsend a photo, your feedback, and your experience\nto get a discount code or reward points on your next order.",
      teaserLater: "Later",
    },
    products: {
      title: "Product Categories",
      subtitle: "Curated brands across fashion, beauty, and sport",
      categories: [
        { name: "Fashion & Style", brands: fashionBrands },
        { name: "Beauty & Cosmetics", brands: beautyBrands },
        { name: "Sport & Active", brands: sportsBrands },
      ],
    },
    membership: {
      title: "Join ShopeMoon",
      desc: "Become a member to save your purchase requests, favorite brands, and contact details for faster assistance.",
      fields: {
        name: "Full Name",
        phone: "Phone Number",
        brands: "Favorite Brands",
        details: "Details / Purchase Request",
        address: "Address",
        addressPlaceholder: "Enter your address",
        gender: "Gender",
        genderPlaceholder: "Select your gender",
        genderOptions: { female: "Female", male: "Male", preferNotToSay: "Prefer not to say" },
        birthDate: "Date of Birth",
        birthDatePlaceholder: "Enter your date of birth",
        birthDateInvalidError: "The date of birth entered is not valid.",
        birthDateFutureError: "Date of birth cannot be in the future.",
        phoneInvalidError: "The phone number entered is not valid.",
      },
      submit: "Submit & Join",
      submitting: "Sending...",
      successMessage: "Your membership was submitted successfully 🌙\nYour 10% first-purchase discount code will be sent to you soon.",
      errorMessage: "Something went wrong sending the form. Please try again or reach us on Telegram.",
    },
    membershipModal: {
      teaserTitle: "Join ShopeMoon 🎁",
      teaserDesc: "Get a 10% discount gift on your first purchase.",
      submit: "Join Now",
      teaserLater: "Later",
      successMessage: "Your membership was submitted successfully. Your first-purchase discount code will be sent to you.",
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "Are the products original?", a: "Yes, all purchases are made directly from official brand stores." },
        { q: "What about shipping cost?", a: "Shipping cost depends on destination and weight, confirmed before payment." },
        { q: "How long does delivery take?", a: "Delivery time varies by origin and destination, shared at order confirmation." },
        { q: "How do I place an order?", a: "Simply send us a link, photo, or product name via Telegram." },
      ],
    },
    contact: {
      title: "Contact Us",
      desc: "Reach out via Telegram for any questions or to place an order.",
      cta: "Start chat on Telegram",
    },
    footer: {
      tagline: "Secure shopping from authentic Turkish and European brands",
      rights: "© ShopeMoon. All rights reserved.",
    },
    theme: { light: "Light", dark: "Dark", toggleLabel: "Light / Dark Mode" },
    about: {
      title: "About Me",
      paragraphs: [
        "I am Mona and I live in Izmir, Turkey.",
        "For more than 7 years, I have been working professionally in online shopping and sales. Today, I am supported by a community of more than 38,500 followers.",
        "I created ShopeMoon with one simple goal: to make shopping from original Turkish and international brands safe, transparent, and worry-free for Persian-speaking customers.",
        "Every day, I stay in touch with different stores and brands, and I know how important it is to find authentic products, check availability, confirm prices, and arrange secure delivery. That is why I try to handle every step of the shopping process with full transparency, from checking the product and sending photos and invoices to tracking the order and final delivery.",
        "Over the years, even in difficult situations, I have never stopped communicating with customers and responding to their questions. Customer trust is my most valuable asset, and hundreds of successful shopping experiences and satisfied customers are the result of this commitment.",
        "When you shop through ShopeMoon, you are not dealing with an anonymous store. You are in direct contact with someone in Izmir who follows your purchase as carefully as her own.",
      ],
      stats: [
        { value: "38,500+", label: "followers" },
        { value: "7", label: "years of online shopping experience" },
        { value: "Hundreds", label: "of satisfied customers" },
      ],
      quote: "“ShopeMoon is not just a store, it is your trusted shopping friend.”",
    },
  },
} satisfies Record<"fa" | "en", LocaleDictionary>;

const turkishDictionary = {
  dir: "ltr" as const,
  nav: {
    home: "Ana Sayfa",
    about: "Hakkımda",
    products: "Mağazalar",
    experience: "Alışveriş Deneyimi",
    membership: "Üyelik",
    faq: "SSS",
    contact: "İletişim",
  },
  hero: {
    eyebrow: "ShopeMoon",
    title: "Orijinal Markalardan Doğrudan Alışveriş",
    subtitle: "Güvenilir Türk ve Avrupa mağazalarından yüz yüze ve online alışveriş",
    ctaPrimary: "Telegram'dan Yazın",
    ctaSecondary: "Mağazaları Gör",
    trustIndicators: ["Orijinallik garantisi", "Telegram'dan hızlı yanıt", "Güvenli teslimat"],
  },
  trust: {
    title: "ShopeMoon ile Alışveriş Adımları",
    items: [
      { title: "Ürün linkini gönderin", desc: "Bize bir bağlantı, fotoğraf veya ürün adı gönderin." },
      { title: "Stok ve fiyat kontrolü", desc: "Stok, fiyat ve ürün detayları resmi mağazadan teyit edilir." },
      { title: "Ödeme ve satın alma", desc: "Onayınızdan sonra sipariş kesinleşir ve ödeme tamamlanır." },
      { title: "Gönderim ve teslimat", desc: "Ürün gönderilir ve size bir takip kodu verilir." },
    ],
  },
  experience: {
    title: "ShopeMoon Alışveriş Deneyiminiz",
    intro: "ShopeMoon ile alışveriş deneyiminizi bizimle paylaşın; bir fotoğraf, yorumunuz ve memnuniyetinizi gönderdiğinizde bir sonraki alışverişiniz için puan veya indirim kazanırsınız.",
    fields: {
      name: "Ad Soyad",
      phone: "Telefon Numarası",
      product: "Satın aldığınız marka veya ürün",
      rating: "Alışverişinizi 1'den 5'e kadar puanlayın",
      feedback: "Yorumunuz veya alışveriş deneyiminiz",
      photo: "Memnuniyet / ürün fotoğrafı yükleyin",
    },
    submit: "Deneyimimi Gönder",
    moderationNote: "Yorumlar, ShopeMoon ekibi tarafından incelendikten sonra yayınlanacaktır.",
    rewardNote: "Deneyiminizi gönderdiğinizde, bir sonraki alışverişiniz için indirim kodu size gönderilir.",
    teaserTitle: "🎁 ShopeMoon Deneyiminiz",
    teaserDesc:
      "Alışverişinizden memnun kaldıysanız,\nbir fotoğraf, yorumunuz ve deneyiminizi göndererek\nbir sonraki siparişiniz için indirim kodu veya ödül puanı kazanın.",
    teaserLater: "Sonra",
  },
  products: {
    title: "Ürün Kategorileri",
    subtitle: "Moda, güzellik ve spor alanında seçilmiş markalar",
    categories: [
      { name: "Moda ve Stil", brands: fashionBrands },
      { name: "Güzellik ve Kozmetik", brands: beautyBrands },
      { name: "Spor ve Aktif Giyim", brands: sportsBrands },
    ],
  },
  membership: {
    title: "ShopeMoon'a Üye Ol",
    desc: "ShopeMoon'a üye olarak satın alma taleplerinizi, favori markalarınızı ve iletişim bilgilerinizi kaydedebilir, ihtiyaç anında daha hızlı yardım alabilirsiniz.",
    fields: {
      name: "Ad Soyad",
      phone: "Telefon Numarası",
      brands: "Favori Markalar",
      details: "Detaylar / Satın Alma Talebi",
      address: "Adres",
      addressPlaceholder: "Adresinizi girin",
      gender: "Cinsiyet",
      genderPlaceholder: "Cinsiyetinizi seçin",
      genderOptions: { female: "Kadın", male: "Erkek", preferNotToSay: "Belirtmek istemiyorum" },
      birthDate: "Doğum Tarihi",
      birthDatePlaceholder: "Doğum tarihinizi girin",
      birthDateInvalidError: "Girilen doğum tarihi geçerli değil.",
      birthDateFutureError: "Doğum tarihi gelecekte olamaz.",
      phoneInvalidError: "Girilen telefon numarası geçerli değil.",
    },
    submit: "Gönder ve Üye Ol",
    submitting: "Gönderiliyor...",
    successMessage: "Üyeliğiniz başarıyla alındı 🌙\nİlk alışverişinize özel %10 indirim kodunuz size gönderilecek.",
    errorMessage: "Form gönderilirken bir sorun oluştu. Lütfen tekrar deneyin ya da Telegram üzerinden bizimle iletişime geçin.",
  },
  membershipModal: {
    teaserTitle: "ShopeMoon'a Üye Ol 🎁",
    teaserDesc: "İlk alışverişine özel %10 indirim hediyesi kazan.",
    submit: "Üyeliği Tamamla",
    teaserLater: "Sonra",
    successMessage: "Üyeliğiniz başarıyla alındı. İlk alışveriş indirim kodunuz size gönderilecek.",
  },
  faq: {
    title: "Sıkça Sorulan Sorular",
    items: [
      { q: "Ürünler orijinal mi?", a: "Evet, tüm satın almalar doğrudan resmi marka mağazalarından yapılır." },
      { q: "Kargo ücreti ne kadar?", a: "Kargo ücreti hedefe ve ağırlığa göre değişir, ödeme öncesi bildirilir." },
      { q: "Teslimat ne kadar sürer?", a: "Teslimat süresi çıkış ve varış noktasına göre değişir, sipariş onayında bildirilir." },
      { q: "Nasıl sipariş verebilirim?", a: "Telegram üzerinden bize bir bağlantı, fotoğraf veya ürün adı göndermeniz yeterlidir." },
    ],
  },
  contact: {
    title: "Bize Ulaşın",
    desc: "Sorularınız veya sipariş vermek için Telegram üzerinden bize ulaşın.",
    cta: "Telegram'da Sohbete Başla",
  },
  footer: {
    tagline: "Orijinal Türk ve Avrupa markalarından güvenli alışveriş",
    rights: "© ShopeMoon. Tüm hakları saklıdır.",
  },
  theme: { light: "Açık", dark: "Koyu", toggleLabel: "Açık / Koyu Mod" },
  about: {
    title: "Hakkımda",
    paragraphs: [
      "Ben Mona, Türkiye İzmir'de yaşıyorum.",
      "7 yıldan fazla süredir online alışveriş ve satış alanında profesyonel olarak çalışıyorum. Bugün 38.500'den fazla takipçiden oluşan bir topluluk benimle birlikte.",
      "ShopeMoon'u basit bir amaçla kurdum: Türkiye'deki ve uluslararası orijinal markalardan alışverişi Farsça konuşan müşteriler için güvenli, şeffaf ve endişesiz hale getirmek.",
      "Her gün farklı mağazalar ve markalarla iletişim halindeyim. Orijinal ürün bulmanın, stok kontrolü yapmanın, fiyat doğrulamanın ve güvenli teslimat sağlamanın ne kadar önemli olduğunu çok iyi biliyorum. Bu yüzden ürün kontrolünden fotoğraf ve fatura gönderimine, sipariş takibinden son teslimata kadar tüm alışveriş sürecini tam şeffaflıkla yürütmeye çalışıyorum.",
      "Yıllar boyunca, zor zamanlarda bile müşterilerle iletişimi ve sorulara yanıt vermeyi hiç bırakmadım. Müşteri güveni benim en değerli sermayemdir. Yüzlerce başarılı alışveriş deneyimi ve memnun müşteri, bu bağlılığın sonucudur.",
      "ShopeMoon üzerinden alışveriş yaptığınızda isimsiz bir mağazayla değil, İzmir'de sizin alışverişinizi kendi alışverişi gibi takip eden biriyle iletişim kurarsınız.",
    ],
    stats: [
      { value: "38.500+", label: "takipçi" },
      { value: "7", label: "yıllık online alışveriş deneyimi" },
      { value: "Yüzlerce", label: "memnun müşteri" },
    ],
    quote: "“ShopeMoon sadece bir mağaza değil, güvenilir alışveriş arkadaşınızdır.”",
  },
} satisfies LocaleDictionary;

export const dictionary: Record<Locale, LocaleDictionary> = {
  ...translatedDictionary,
  tr: turkishDictionary,
};
