"use client";

import { useLocale } from "@/context/providers";

export function TrustBadges() {
  const { dict } = useLocale();

  return (
    <section className="border-y border-gold-soft/40 bg-white/60 px-5 py-14 dark:border-navy-soft dark:bg-navy-soft/30">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">{dict.trust.title}</h2>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dict.trust.items.map((item, index) => (
            <div
              key={item.title}
              className="flex min-h-[240px] flex-col items-center justify-center rounded-xl2 bg-cream p-8 text-center shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-soft dark:bg-navy-dark sm:p-10"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold-soft text-sm font-extrabold text-gold dark:bg-navy-soft dark:text-gold-light">
                {index + 1}
              </span>
              <h3 className="mt-5 text-lg font-bold sm:text-xl">{item.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-navy-soft dark:text-cream-dark">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
