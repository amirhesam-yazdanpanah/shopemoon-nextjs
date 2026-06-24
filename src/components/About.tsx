"use client";

import { useLocale } from "@/context/providers";

export function About() {
  const { locale, dict } = useLocale();
  const { title, paragraphs, stats, quote } = dict.about;

  return (
    <section id="about" dir={dict.dir} lang={locale} className="px-5 py-20">
      <div className="mx-auto max-w-2xl rounded-xl2 bg-white/70 p-6 text-center shadow-soft dark:bg-navy-soft/30 sm:p-12">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold-soft dark:bg-navy-soft">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-gold">
            <path
              d="M20.5 14.5c-1 .3-2.1.4-3.2.2-4-.7-7-4.2-7-8.4 0-1.5.4-2.9 1-4.1C7.1 3.5 4 7.4 4 12c0 5 4 9.5 9 9.5 4 0 7.4-2.6 8.6-6.2-.4.1-.7.2-1.1.2Z"
              fill="currentColor"
            />
          </svg>
        </span>

        <h2 className="mt-5 text-2xl font-bold sm:text-3xl">{title}</h2>

        <div className="mt-8 text-start">
          {paragraphs.length > 0 && (
            <p className="text-lg font-semibold leading-relaxed text-navy dark:text-cream">
              {paragraphs[0]}
            </p>
          )}
          <div className="mt-4 space-y-4 text-base leading-loose text-navy-soft dark:text-cream-dark">
            {paragraphs.slice(1).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg bg-cream-dark px-4 py-6 shadow-card dark:bg-navy-dark"
            >
              <div className="text-2xl font-extrabold text-gold">{stat.value}</div>
              <div className="mt-1.5 text-sm text-navy-soft dark:text-cream-dark">{stat.label}</div>
            </div>
          ))}
        </div>

        <blockquote className="mt-10 rounded-lg bg-gold-soft/40 p-6 text-lg font-bold leading-relaxed text-navy dark:bg-navy-dark dark:text-cream">
          {quote}
        </blockquote>
      </div>
    </section>
  );
}
