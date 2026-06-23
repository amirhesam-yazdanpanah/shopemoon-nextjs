"use client";

import { useLocale } from "@/context/providers";
import { whatsappLink } from "@/lib/dictionary";

export function Contact() {
  const { dict } = useLocale();

  return (
    <section id="contact" className="bg-cream-dark px-5 py-16 text-center dark:bg-navy-soft/20">
      <div className="mx-auto max-w-xl">
        <h2 className="text-2xl font-bold sm:text-3xl">{dict.contact.title}</h2>
        <p className="mt-4 text-navy-soft dark:text-cream-dark">{dict.contact.desc}</p>
        <a
          href={whatsappLink(dict.hero.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex rounded-full bg-gradient-to-br from-gold to-gold-light px-8 py-3 font-bold text-white shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"
        >
          {dict.contact.cta}
        </a>
      </div>
    </section>
  );
}
