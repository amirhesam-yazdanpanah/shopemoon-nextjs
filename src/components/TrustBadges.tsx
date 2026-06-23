"use client";

import { useLocale } from "@/context/providers";

export function TrustBadges() {
  const { dict } = useLocale();

  return (
    <section className="border-y border-gold-soft/40 bg-white/60 px-5 py-14 dark:border-navy-soft dark:bg-navy-soft/30">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">{dict.trust.title}</h2>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dict.trust.items.map((item) => (
            <div
              key={item.title}
              className="rounded-xl2 bg-cream p-6 text-center shadow-card dark:bg-navy-dark"
            >
              <h3 className="text-base font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-navy-soft dark:text-cream-dark">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
