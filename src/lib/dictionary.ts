export type Locale = "fa" | "en" | "tr";

export const telegramChannelLink = "https://t.me/shopeemonn";

export interface StoreUrls {
  /** Official default/international URL. Always required. */
  default: string;
  /** Official Turkish-language URL, only set when verified to belong to the store itself. */
  tr?: string;
  /** Official English-language URL, only set when distinct from default. */
  en?: string;
  /** Official Persian-language URL, only set when verified to belong to the store itself. */
  fa?: string;
}

export interface BrandLink {
  name: string;
  nameFa?: string;
  urls: StoreUrls;
}

export function getBrandDisplayName(brand: BrandLink, locale: Locale): string {
  return locale === "fa" && brand.nameFa ? brand.nameFa : brand.name;
}

/**
 * Resolves the correct official store URL for the active site language.
 * Priority: FA -> urls.fa || urls.tr || urls.default
 *           TR -> urls.tr || urls.default
 *           EN -> urls.en || urls.default
 * Only ever returns URLs that were supplied on the store's own `urls` object —
 * never a translated, proxied, or third-party mirror of the destination.
 */
export function getStoreUrl(store: BrandLink, currentLanguage: Locale): string {
  const { urls } = store;
  if (currentLanguage === "fa") {
    return urls.fa || urls.tr || urls.default;
  }
  if (currentLanguage === "tr") {
    return urls.tr || urls.default;
  }
  return urls.en || urls.default;
}

export const fashionBrands: BrandLink[] = [
  // Inditex
  { name: "Zara", nameFa: "زارا", urls: { default: "https://www.zara.com", tr: "https://www.zara.com/tr/" } },
  {
    name: "Massimo Dutti",
    nameFa: "ماسیمو دوتی",
    urls: { default: "https://www.massimodutti.com", tr: "https://www.massimodutti.com/tr/" },
  },
  { name: "Oysho", nameFa: "اویشو", urls: { default: "https://www.oysho.com", tr: "https://www.oysho.com/tr/" } },
  {
    name: "Bershka",
    nameFa: "برشکا",
    urls: { default: "https://www.bershka.com", tr: "https://www.bershka.com/tr/" },
  },
  {
    name: "Stradivarius",
    nameFa: "استرادیواریوس",
    urls: { default: "https://www.stradivarius.com", tr: "https://www.stradivarius.com/tr/" },
  },
  {
    name: "Pull&Bear",
    nameFa: "پول اند بیر",
    urls: { default: "https://www.pullandbear.com", tr: "https://www.pullandbear.com/tr/" },
  },
  {
    name: "Zara Home",
    nameFa: "زارا هوم",
    urls: { default: "https://www.zarahome.com", tr: "https://www.zarahome.com/tr/" },
  },
  { name: "Mango", nameFa: "مانگو", urls: { default: "https://shop.mango.com" } },
  { name: "H&M", nameFa: "اچ اند ام", urls: { default: "https://www.hm.com", tr: "https://www2.hm.com/tr_tr/index.html" } },
  // Luxury
  { name: "Gucci", nameFa: "گوچی", urls: { default: "https://www.gucci.com" } },
  { name: "Dior", nameFa: "دیور", urls: { default: "https://www.dior.com" } },
  { name: "Louis Vuitton", nameFa: "لویی ویتون", urls: { default: "https://www.louisvuitton.com" } },
  { name: "Saint Laurent", nameFa: "سن لوران", urls: { default: "https://www.ysl.com" } },
  { name: "Prada", nameFa: "پرادا", urls: { default: "https://www.prada.com", tr: "https://www.prada.com/tr/tr.html" } },
  { name: "Balenciaga", nameFa: "بالنسیاگا", urls: { default: "https://www.balenciaga.com" } },
  { name: "Burberry", nameFa: "بربری", urls: { default: "https://www.burberry.com", tr: "https://tr.burberry.com/" } },
  { name: "Fendi", nameFa: "فندی", urls: { default: "https://www.fendi.com" } },
  { name: "Valentino", nameFa: "والنتینو", urls: { default: "https://www.valentino.com" } },
  { name: "Versace", nameFa: "ورساچه", urls: { default: "https://www.versace.com" } },
  { name: "Bottega Veneta", nameFa: "بوتگا ونتا", urls: { default: "https://www.bottegaveneta.com" } },
  { name: "Loewe", nameFa: "لوئه", urls: { default: "https://www.loewe.com" } },
  { name: "Celine", nameFa: "سلین", urls: { default: "https://www.celine.com" } },
  { name: "Hermès", nameFa: "هرمس", urls: { default: "https://www.hermes.com" } },
  { name: "Chanel", nameFa: "شنل", urls: { default: "https://www.chanel.com" } },
  // Contemporary & Department Stores
  {
    name: "Guess",
    nameFa: "گس",
    urls: { default: "https://www.guess.com", tr: "https://www.guess.eu/tr-tr/home" },
  },
  {
    name: "Tommy Hilfiger",
    nameFa: "تامی هیلفیگر",
    urls: { default: "https://www.tommy.com", tr: "https://tr.tommy.com/" },
  },
  { name: "Calvin Klein", nameFa: "کلوین کلاین", urls: { default: "https://www.calvinklein.com" } },
  { name: "GAP", nameFa: "گپ", urls: { default: "https://www.gap.com", tr: "https://gap.com.tr/" } },
  {
    name: "Marks & Spencer",
    nameFa: "مارکس اند اسپنسر",
    urls: { default: "https://www.marksandspencer.com", tr: "https://www.marksandspencer.com.tr/" },
  },
  {
    name: "Boyner",
    nameFa: "بوینر",
    urls: { default: "https://www.boyner.com.tr", en: "https://www.boyner.com.tr/en" },
  },
  {
    name: "Trendyol",
    nameFa: "ترندیول",
    urls: { default: "https://www.trendyol.com", en: "https://www.trendyol.com/en" },
  },
  // Footwear
  { name: "Ecco", nameFa: "اکو", urls: { default: "https://www.ecco.com", tr: "https://tr.ecco.com/" } },
  { name: "Aldo", nameFa: "آلدو", urls: { default: "https://www.aldoshoes.com" } },
  { name: "Birkenstock", nameFa: "بیرکن‌استاک", urls: { default: "https://www.birkenstock.com" } },
];

export const sportsBrands: BrandLink[] = [
  // Nike's destination was intentionally changed to a Turkish reseller (not nike.com);
  // it is already TR-appropriate, so no separate tr/fa override is added.
  { name: "Nike", nameFa: "نایکی", urls: { default: "https://www.barcin.com/" } },
  { name: "Adidas", nameFa: "آدیداس", urls: { default: "https://www.adidas.com", tr: "https://www.adidas.com.tr/" } },
  { name: "Puma", nameFa: "پوما", urls: { default: "https://www.puma.com", tr: "https://tr.puma.com/" } },
  { name: "Reebok", nameFa: "ریباک", urls: { default: "https://www.reebok.com", tr: "https://www.reebok.com.tr/" } },
  {
    name: "Under Armour",
    nameFa: "آندر آرمور",
    urls: { default: "https://www.underarmour.com", tr: "https://www.underarmour.com.tr/" },
  },
  { name: "Alo Yoga", nameFa: "الو یوگا", urls: { default: "https://www.aloyoga.com" } },
  { name: "Champion", nameFa: "چمپیون", urls: { default: "https://www.champion.com" } },
  { name: "Lululemon", nameFa: "لولولمون", urls: { default: "https://www.lululemon.com" } },
  {
    name: "New Balance",
    nameFa: "نیو بالانس",
    urls: { default: "https://www.newbalance.com", tr: "https://www.newbalance.com.tr/" },
  },
  { name: "Asics", nameFa: "اسیکس", urls: { default: "https://www.asics.com", tr: "https://www.asics.com.tr/" } },
  {
    name: "The North Face",
    nameFa: "نورث فیس",
    urls: { default: "https://www.thenorthface.com", tr: "https://www.thenorthface.com.tr/" },
  },
  { name: "Columbia", nameFa: "کلمبیا", urls: { default: "https://www.columbia.com" } },
];

export const beautyBrands: BrandLink[] = [
  { name: "Sephora", nameFa: "سفورا", urls: { default: "https://www.sephora.com", tr: "https://www.sephora.com.tr/" } },
  { name: "Clinique", nameFa: "کلینیک", urls: { default: "https://www.clinique.com" } },
  { name: "MAC", nameFa: "مک", urls: { default: "https://www.maccosmetics.com", tr: "https://www.maccosmetics.com.tr/" } },
  { name: "KIKO Milano", nameFa: "کیکو میلانو", urls: { default: "https://www.kikocosmetics.com" } },
  { name: "Guerlain", nameFa: "گرلن", urls: { default: "https://www.guerlain.com" } },
  { name: "Chanel Beauty", nameFa: "شنل بیوتی", urls: { default: "https://www.chanel.com/us/beauty/" } },
  { name: "YSL Beauty", nameFa: "ایو سن لوران بیوتی", urls: { default: "https://www.yslbeauty.com" } },
  { name: "Dior Beauty", nameFa: "دیور بیوتی", urls: { default: "https://www.dior.com/en_us/beauty" } },
  { name: "Armani Beauty", nameFa: "آرمانی بیوتی", urls: { default: "https://www.armanibeauty.com" } },
  { name: "Lancôme", nameFa: "لانکوم", urls: { default: "https://www.lancome.com" } },
  {
    name: "Estée Lauder",
    nameFa: "استی لادر",
    urls: { default: "https://www.esteelauder.com", tr: "https://www.esteelauder.com.tr/" },
  },
  { name: "Tom Ford Beauty", nameFa: "تام فورد بیوتی", urls: { default: "https://www.tomford.com" } },
  { name: "Charlotte Tilbury", nameFa: "شارلوت تیلبری", urls: { default: "https://www.charlottetilbury.com" } },
  {
    name: "Kérastase",
    nameFa: "کراستاس",
    urls: { default: "https://www.kerastase.com", tr: "https://www.kerastase.com.tr/" },
  },
  { name: "NARS", nameFa: "نارس", urls: { default: "https://www.narscosmetics.com" } },
  { name: "Benefit", nameFa: "بنفیت", urls: { default: "https://www.benefitcosmetics.com" } },
  { name: "Rare Beauty", nameFa: "ریر بیوتی", urls: { default: "https://www.rarebeauty.com" } },
  { name: "Fenty Beauty", nameFa: "فنتی بیوتی", urls: { default: "https://www.fentybeauty.com" } },
  { name: "Huda Beauty", nameFa: "هدی بیوتی", urls: { default: "https://www.hudabeauty.com" } },
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
      phoneHelperText: string;
      phoneEnglishDigitsError: string;
      phoneDuplicateError: string;
    };
    submit: string;
    submitting: string;
    successMessage: string;
    errorMessage: string;
    successModal: {
      title: string;
      codeIntro: string;
      copyButton: string;
      copiedButton: string;
      closeButton: string;
    };
  };
  membershipModal: {
    teaserTitle: string;
    teaserDesc: string;
    submit: string;
    teaserLater: string;
    successMessage: string;
    successTitle: string;
    successCodeIntro: string;
    successCodeNote: string;
    copyCode: string;
    copiedToast: string;
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
    successTitle: string;
    successDesc: string;
    couponValidity: string;
    copyCode: string;
    copiedToast: string;
    submitError: string;
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
      submit: "ثبت و دریافت کد تخفیف",
      moderationNote: "نظرات پس از بررسی تیم شاپمون منتشر خواهند شد.",
      rewardNote: "با ارسال تجربه خرید، کد تخفیف خرید بعدی برای شما ارسال می‌شود.",
      teaserTitle: "🎁 برای خرید بعدی ۵ درصد تخفیف بگیر",
      teaserDesc: "نظر و رضایتت برامون خیلی ارزشمنده ❤️\n\nلطفاً چند دقیقه وقت بگذار و تجربه خریدت را با ما به اشتراک بگذار.\n\nبعد از ثبت فرم، کد تخفیف اختصاصی ۵ درصدی خرید بعدی به صورت خودکار به شما نمایش داده می‌شود.",
      teaserLater: "بعداً",
      successTitle: "✅ کد تخفیف شما آماده است!",
      successDesc: "کد تخفیف ۵ درصدی ویژه خرید بعدی شما:",
      couponValidity: "این کد تا ۳۰ روز اعتبار دارد.",
      copyCode: "کپی کد",
      copiedToast: "کد تخفیف کپی شد.",
      submitError: "ارسال فرم با مشکل مواجه شد. لطفاً دوباره تلاش کنید یا از طریق تلگرام با ما در ارتباط باشید.",
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
        phoneHelperText: "اعداد را با کیبورد انگلیسی وارد کنید",
        phoneEnglishDigitsError: "شماره تلفن را فقط با اعداد انگلیسی وارد کنید.",
        phoneDuplicateError: "این شماره تلفن قبلاً در شاپمون ثبت شده است.",
      },
      submit: "ارسال و عضویت",
      submitting: "در حال ارسال...",
      successMessage: "عضویت شما با موفقیت ثبت شد 🌙\nکد تخفیف ۱۰٪ اولین خرید به‌زودی برای شما ارسال می‌شود.",
      errorMessage: "ارسال فرم با مشکل مواجه شد. لطفاً دوباره تلاش کنید یا از طریق تلگرام با ما در ارتباط باشید.",
      successModal: {
        title: "عضویت شما با موفقیت ثبت شد 🌙",
        codeIntro: "کد تخفیف ۱۰٪ اولین خرید شما:",
        copyButton: "کپی کد تخفیف",
        copiedButton: "کپی شد ✓",
        closeButton: "بستن",
      },
    },
    membershipModal: {
      teaserTitle: "عضو شاپمون شو 🎁",
      teaserDesc: "و در اولین خریدت ۱۰٪ تخفیف هدیه بگیر.",
      submit: "ثبت عضویت",
      teaserLater: "بعداً",
      successMessage: "عضویت شما با موفقیت ثبت شد. کد تخفیف اولین خرید برای شما ارسال می‌شود.",
      successTitle: "عضویت شما با موفقیت انجام شد!",
      successCodeIntro: "کد تخفیف ۱۰ درصدی اولین خرید شما:",
      successCodeNote: "این کد فقط یک‌بار قابل استفاده است.",
      copyCode: "کپی کد تخفیف",
      copiedToast: "کد تخفیف کپی شد.",
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
      submit: "Submit & Get My Discount Code",
      moderationNote: "Reviews will be published after the ShopeMoon team reviews them.",
      rewardNote: "After submitting your experience, your next-purchase discount code will be sent to you.",
      teaserTitle: "🎁 Get 5% Off Your Next Purchase",
      teaserDesc:
        "Your feedback and satisfaction mean a lot to us ❤️\n\nPlease take a few minutes to share your shopping experience with us.\n\nOnce you submit the form, your exclusive 5% discount code for your next purchase will be shown to you automatically.",
      teaserLater: "Later",
      successTitle: "✅ Your discount code is ready!",
      successDesc: "Your exclusive 5% discount code for your next purchase:",
      couponValidity: "This code is valid for 30 days.",
      copyCode: "Copy Code",
      copiedToast: "Discount code copied.",
      submitError: "Something went wrong submitting the form. Please try again or reach us on Telegram.",
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
        phoneHelperText: "Enter digits using an English keyboard",
        phoneEnglishDigitsError: "Please enter the phone number using English digits only.",
        phoneDuplicateError: "This phone number is already registered with ShopeMoon.",
      },
      submit: "Submit & Join",
      submitting: "Sending...",
      successMessage: "Your membership was submitted successfully 🌙\nYour 10% first-purchase discount code will be sent to you soon.",
      errorMessage: "Something went wrong sending the form. Please try again or reach us on Telegram.",
      successModal: {
        title: "Your membership was successfully registered 🌙",
        codeIntro: "Your 10% first-purchase discount code:",
        copyButton: "Copy Discount Code",
        copiedButton: "Copied ✓",
        closeButton: "Close",
      },
    },
    membershipModal: {
      teaserTitle: "Join ShopeMoon 🎁",
      teaserDesc: "Get a 10% discount gift on your first purchase.",
      submit: "Join Now",
      teaserLater: "Later",
      successMessage: "Your membership was submitted successfully. Your first-purchase discount code will be sent to you.",
      successTitle: "Your membership was successful!",
      successCodeIntro: "Your 10% discount code for your first purchase:",
      successCodeNote: "This code can only be used once.",
      copyCode: "Copy Discount Code",
      copiedToast: "Discount code copied.",
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
    submit: "Gönder ve İndirim Kodumu Al",
    moderationNote: "Yorumlar, ShopeMoon ekibi tarafından incelendikten sonra yayınlanacaktır.",
    rewardNote: "Deneyiminizi gönderdiğinizde, bir sonraki alışverişiniz için indirim kodu size gönderilir.",
    teaserTitle: "🎁 Sonraki Alışverişinize %5 İndirim Kazanın",
    teaserDesc:
      "Görüşünüz ve memnuniyetiniz bizim için çok değerli ❤️\n\nLütfen birkaç dakikanızı ayırarak alışveriş deneyiminizi bizimle paylaşın.\n\nFormu gönderdikten sonra, bir sonraki alışverişiniz için özel %5 indirim kodunuz otomatik olarak size gösterilecektir.",
    teaserLater: "Sonra",
    successTitle: "✅ İndirim kodunuz hazır!",
    successDesc: "Bir sonraki alışverişiniz için özel %5 indirim kodunuz:",
    couponValidity: "Bu kod 30 gün boyunca geçerlidir.",
    copyCode: "Kodu Kopyala",
    copiedToast: "İndirim kodu kopyalandı.",
    submitError: "Form gönderilirken bir sorun oluştu. Lütfen tekrar deneyin veya Telegram üzerinden bize ulaşın.",
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
      phoneHelperText: "Rakamları İngilizce klavyeyle girin",
      phoneEnglishDigitsError: "Lütfen telefon numarasını yalnızca İngilizce rakamlarla girin.",
      phoneDuplicateError: "Bu telefon numarası ShopeMoon'da zaten kayıtlı.",
    },
    submit: "Gönder ve Üye Ol",
    submitting: "Gönderiliyor...",
    successMessage: "Üyeliğiniz başarıyla alındı 🌙\nİlk alışverişinize özel %10 indirim kodunuz size gönderilecek.",
    errorMessage: "Form gönderilirken bir sorun oluştu. Lütfen tekrar deneyin ya da Telegram üzerinden bizimle iletişime geçin.",
    successModal: {
      title: "Üyeliğiniz başarıyla tamamlandı 🌙",
      codeIntro: "İlk alışverişinize özel %10 indirim kodunuz:",
      copyButton: "İndirim Kodunu Kopyala",
      copiedButton: "Kopyalandı ✓",
      closeButton: "Kapat",
    },
  },
  membershipModal: {
    teaserTitle: "ShopeMoon'a Üye Ol 🎁",
    teaserDesc: "İlk alışverişine özel %10 indirim hediyesi kazan.",
    submit: "Üyeliği Tamamla",
    teaserLater: "Sonra",
    successMessage: "Üyeliğiniz başarıyla alındı. İlk alışveriş indirim kodunuz size gönderilecek.",
    successTitle: "Üyeliğiniz başarıyla tamamlandı!",
    successCodeIntro: "İlk alışverişiniz için %10 indirim kodunuz:",
    successCodeNote: "Bu kod yalnızca bir kez kullanılabilir.",
    copyCode: "İndirim Kodunu Kopyala",
    copiedToast: "İndirim kodu kopyalandı.",
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
