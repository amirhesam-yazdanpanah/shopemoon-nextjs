"use client";

import { useLocale } from "@/context/providers";
import { getBrandDisplayName, getStoreUrl } from "@/lib/dictionary";

export function ProductShowcase() {
  const { dict, locale } = useLocale();

  return (
    <section id="products" className="px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">{dict.products.title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-navy-soft dark:text-cream-dark">
          {dict.products.subtitle}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {dict.products.categories.map((cat) => (
            <div
              key={cat.name}
              className="rounded-xl2 bg-white/70 p-6 shadow-card dark:bg-navy-soft/30"
            >
              <h3 className="text-lg font-bold text-gold">{cat.name}</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {cat.brands.map((brand) => (
                  <li key={brand.name}>
                    <a
                      href={getStoreUrl(brand, locale)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-lg bg-cream-dark px-3 py-2 font-medium text-navy transition hover:bg-gold-soft hover:text-navy dark:bg-navy-dark dark:text-cream dark:hover:bg-navy-soft"
                    >
                      {getBrandDisplayName(brand, locale)}
                    </a>
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
