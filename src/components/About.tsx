export function About() {
  const paragraphs = [
    "من مونا هستم و در ازمیر ترکیه زندگی می‌کنم.",
    "بیش از ۷ سال است که به صورت حرفه‌ای در حوزه خرید و فروش آنلاین فعالیت می‌کنم و امروز جامعه‌ای با بیش از ۳۳ هزار دنبال‌کننده همراه من هستند.",
    "شاپمون را با یک هدف ساده راه‌اندازی کردم: اینکه خرید از برندهای اصلی ترکیه برای ایرانی‌ها مطمئن، شفاف و بدون نگرانی باشد.",
    "هر روز با فروشگاه‌ها و برندهای مختلف در ارتباط هستم و به خوبی می‌دانم پیدا کردن کالای اصل، بررسی موجودی، استعلام قیمت و ارسال مطمئن چقدر اهمیت دارد. به همین دلیل تلاش می‌کنم تمام مراحل خرید را با شفافیت کامل انجام دهم؛ از بررسی کالا و ارسال عکس و فاکتور گرفته تا پیگیری سفارش و تحویل نهایی.",
    "در طول این سال‌ها، حتی در سخت‌ترین شرایط نیز ارتباط با مشتریان و پاسخگویی را متوقف نکرده‌ام. اعتماد مشتریان بزرگ‌ترین سرمایه من است و صدها تجربه موفق خرید و رضایت مشتری، نتیجه همین تعهد بوده است.",
    "اگر تصمیم بگیرید از طریق شاپمون خرید کنید، با یک فروشگاه بی‌نام‌ونشان طرف نیستید؛ با شخصی در ازمیر در ارتباطی که خرید تو را مثل خرید خودش پیگیری می‌کند.",
  ];

  const stats = [
    { value: "37,000+", label: "دنبال‌کننده" },
    { value: "7", label: "سال تجربه خرید آنلاین" },
    { value: "صدها", label: "مشتری راضی" },
  ];

  return (
    <section id="about" dir="rtl" lang="fa" className="px-5 py-16">
      <div className="mx-auto max-w-2xl rounded-xl2 border border-gold-soft/50 bg-white/70 p-6 text-center shadow-card dark:border-navy-soft dark:bg-navy-soft/30 sm:p-10">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="mx-auto text-gold"
        >
          <path
            d="M20.5 14.5c-1 .3-2.1.4-3.2.2-4-.7-7-4.2-7-8.4 0-1.5.4-2.9 1-4.1C7.1 3.5 4 7.4 4 12c0 5 4 9.5 9 9.5 4 0 7.4-2.6 8.6-6.2-.4.1-.7.2-1.1.2Z"
            fill="currentColor"
          />
        </svg>

        <h2 className="mt-4 text-2xl font-bold sm:text-3xl">درباره من</h2>

        <div className="mt-6 space-y-4 text-start text-base leading-loose text-navy-soft dark:text-cream-dark">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg bg-cream-dark px-4 py-5 dark:bg-navy-dark"
            >
              <div className="text-xl font-extrabold text-gold">{stat.value}</div>
              <div className="mt-1 text-sm text-navy-soft dark:text-cream-dark">{stat.label}</div>
            </div>
          ))}
        </div>

        <blockquote className="mt-8 border-r-4 border-gold ps-4 text-lg font-bold leading-relaxed">
          «شاپمون نه یک فروشگاه، بلکه دوست معتمد تو هست»
        </blockquote>
      </div>
    </section>
  );
}
