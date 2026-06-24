"use client";

import { useState } from "react";
import { useLocale } from "@/context/providers";

export function FAQ() {
  const { dict } = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="px-5 py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">{dict.faq.title}</h2>

        <div className="mt-8 space-y-3">
          {dict.faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-xl2 border border-gold-soft/50 bg-white/70 dark:border-navy-soft dark:bg-navy-soft/30"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start font-semibold"
                >
                  <span>{item.q}</span>
                  <span aria-hidden="true" className="text-gold">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <p className="px-5 pb-4 text-sm text-navy-soft dark:text-cream-dark">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
