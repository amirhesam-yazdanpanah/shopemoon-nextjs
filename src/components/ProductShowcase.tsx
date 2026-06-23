"use client";

import { useLocale } from "@/context/providers";

export function ProductShowcase() {
  const { dict } = useLocale();

  return (
    <section id="products" className="px-5 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">{dict.products.title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-navy-soft dark:text-cream-dark">
          {dict.products.subtitle}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {dict.products.categories.map((cat) => (
            <div
              key={cat.name}
              className="rounded-xl2 border border-gold-soft/50 bg-white/70 p-6 shadow-card dark:border-navy-soft dark:bg-navy-soft/30"
            >
              <h3 className="text-lg font-bold text-gold">{cat.name}</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {cat.brands.map((brand) => (
                  <li
                    key={brand}
                    className="rounded-lg bg-cream-dark px-3 py-2 font-medium dark:bg-navy-dark"
                  >
                    {brand}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
