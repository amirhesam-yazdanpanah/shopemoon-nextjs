"use client";

import { useLocale } from "@/context/providers";

export function About() {
  const { locale, dict } = useLocale();
  const { title, paragraphs, stats, quote } = dict.about;

  return (
    <section id="about" dir={dict.dir} lang={locale} className="px-5 py-16">
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

        <h2 className="mt-4 text-2xl font-bold sm:text-3xl">{title}</h2>

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

        <blockquote className="mt-8 border-s-4 border-gold ps-4 text-lg font-bold leading-relaxed">
          {quote}
        </blockquote>
      </div>
    </section>
  );
}
