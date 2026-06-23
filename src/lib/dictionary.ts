export type Locale = "fa" | "en";

export const whatsappNumber = "989109798803";

export function whatsappLink(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export interface BrandLink {
  name: string;
  url: string;
}

const fashionBrands: BrandLink[] = [
  // Inditex
  { name: "Zara", url: "https://www.zara.com" },
  { name: "Massimo Dutti", url: "https://www.massimodutti.com" },
  { name: "Oysho", url: "https://www.oysho.com" },
  { name: "Bershka", url: "https://www.bershka.com" },
  { name: "Stradivarius", url: "https://www.stradivarius.com" },
  { name: "Pull&Bear", url: "https://www.pullandbear.com" },
  { name: "Zara Home", url: "https://www.zarahome.com" },
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
];

const sportsBrands: BrandLink[] = [
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

const beautyBrands: BrandLink[] = [
  { name: "Sephora", url: "https://www.sephora.com" },
  { name: "Clinique", url: "https://www.clinique.com" },
  { name: "MAC", url: "https://www.maccosmetics.com" },
  { name: "Kiko Milano", url: "https://www.kikocosmetics.com" },
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
    products: string;
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
    whatsappMessage: string;
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
      whatsapp: string;
      brands: string;
      details: string;
    };
    submit: string;
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
  theme: { light: string; dark: string };
}

export const dictionary = {
  fa: {
    dir: "rtl" as const,
    nav: {
      home: "خانه",
      products: "محصولات",
      membership: "عضویت",
      faq: "سوالات",
      contact: "تماس",
    },
    hero: {
      eyebrow: "ShopeMoon",
      title: "خرید مستقیم از برندهای اورجینال",
      subtitle: "خرید حضوری و آنلاین از فروشگاه‌های معتبر ترکیه و اروپا",
      ctaPrimary: "پیام در واتساپ",
      ctaSecondary: "محصولات را ببینید",
      whatsappMessage: "سلام، برای خرید از برندهای اورجینال راهنمایی می‌خواستم.",
    },
    trust: {
      title: "چرا ShopeMoon؟",
      items: [
        { title: "خرید از فروشگاه‌های رسمی", desc: "تمام سفارش‌ها مستقیم از منابع معتبر تهیه می‌شوند." },
        { title: "بررسی موجودی و قیمت", desc: "پیش از پرداخت، موجودی و قیمت دقیق استعلام می‌شود." },
        { title: "راهنمایی سایز و رنگ", desc: "در انتخاب سایز و رنگ مناسب همراه شما هستیم." },
        { title: "ارتباط مستقیم در واتساپ", desc: "پاسخگویی سریع و شفاف در تمام مراحل خرید." },
      ],
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
        whatsapp: "شماره واتساپ",
        brands: "برندهای مورد علاقه",
        details: "توضیحات / درخواست خرید",
      },
      submit: "ارسال و عضویت",
    },
    faq: {
      title: "سوالات متداول",
      items: [
        { q: "آیا کالاها اورجینال هستند؟", a: "بله، تمام خریدها مستقیم از فروشگاه‌های رسمی برندها انجام می‌شود." },
        { q: "هزینه ارسال چقدر است؟", a: "هزینه ارسال بر اساس مقصد و وزن کالا محاسبه و پیش از پرداخت اعلام می‌شود." },
        { q: "چقدر طول می‌کشد سفارش برسد؟", a: "زمان تقریبی ارسال بسته به کشور مبدا و مقصد متفاوت است و در زمان استعلام اعلام می‌شود." },
        { q: "چطور سفارش ثبت کنم؟", a: "کافی است از طریق واتساپ لینک، عکس یا نام محصول را برای ما ارسال کنید." },
      ],
    },
    contact: {
      title: "تماس با ما",
      desc: "برای هرگونه سوال یا ثبت سفارش از طریق واتساپ با ما در ارتباط باشید.",
      cta: "شروع گفتگو در واتساپ",
    },
    footer: {
      tagline: "خرید امن از برندهای اصلی ترکیه و اروپا",
      rights: "© ShopeMoon. تمامی حقوق محفوظ است.",
    },
    theme: { light: "روشن", dark: "تیره" },
  },
  en: {
    dir: "ltr" as const,
    nav: {
      home: "Home",
      products: "Products",
      membership: "Membership",
      faq: "FAQ",
      contact: "Contact",
    },
    hero: {
      eyebrow: "ShopeMoon",
      title: "Buy Direct From Original Brands",
      subtitle: "In-person and online shopping from trusted Turkish and European retailers",
      ctaPrimary: "Message on WhatsApp",
      ctaSecondary: "View Products",
      whatsappMessage: "Hi, I'd like guidance on buying original brand products.",
    },
    trust: {
      title: "Why ShopeMoon?",
      items: [
        { title: "Official store purchases", desc: "Every order is sourced directly from authorized retailers." },
        { title: "Stock & price verification", desc: "Availability and exact pricing are confirmed before payment." },
        { title: "Size & color guidance", desc: "We help you choose the right size and color." },
        { title: "Direct WhatsApp contact", desc: "Fast, transparent communication at every step." },
      ],
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
        whatsapp: "WhatsApp Number",
        brands: "Favorite Brands",
        details: "Details / Purchase Request",
      },
      submit: "Submit & Join",
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "Are the products original?", a: "Yes, all purchases are made directly from official brand stores." },
        { q: "What about shipping cost?", a: "Shipping cost depends on destination and weight, confirmed before payment." },
        { q: "How long does delivery take?", a: "Delivery time varies by origin and destination, shared at order confirmation." },
        { q: "How do I place an order?", a: "Simply send us a link, photo, or product name via WhatsApp." },
      ],
    },
    contact: {
      title: "Contact Us",
      desc: "Reach out via WhatsApp for any questions or to place an order.",
      cta: "Start chat on WhatsApp",
    },
    footer: {
      tagline: "Secure shopping from authentic Turkish and European brands",
      rights: "© ShopeMoon. All rights reserved.",
    },
    theme: { light: "Light", dark: "Dark" },
  },
} satisfies Record<Locale, LocaleDictionary>;
