"use client";

import { useLocale } from "@/context/providers";

export function Footer() {
  const { dict } = useLocale();

  const quickLinks = [
    { href: "#hero", label: dict.nav.home },
    { href: "#about", label: dict.nav.about },
    { href: "#products", label: dict.nav.products },
    { href: "#membership", label: dict.nav.membership },
    { href: "#faq", label: dict.nav.faq },
    { href: "#contact", label: dict.nav.contact },
  ];

  const socialLinks = [
    { href: "https://wa.me/989109798803", label: "WhatsApp" },
    { href: "https://www.instagram.com/shopemoon.tr/", label: "Instagram" },
    { href: "https://t.me/shopeemonn", label: "Telegram" },
  ];

  return (
    <footer className="bg-navy px-5 py-14 text-cream">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 text-center sm:grid-cols-3 sm:text-start">
        <div>
          <p className="text-xl font-extrabold text-gold-soft">ShopeMoon</p>
          <p className="mt-2 text-sm leading-relaxed opacity-80">{dict.footer.tagline}</p>
          <div className="mt-4 flex justify-center gap-4 text-sm font-semibold sm:justify-start">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-90 transition hover:opacity-100 hover:text-gold-soft"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <ul className="flex flex-col items-center gap-2 text-sm opacity-90 sm:items-start">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition hover:text-gold-soft hover:opacity-100">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-gold-soft/80">
            {dict.nav.contact}
          </p>
          <div className="mt-4 flex flex-col items-center gap-2 text-sm opacity-90 sm:items-start">
            <a
              href="https://wa.me/989109798803"
              target="_blank"
              rel="noopener noreferrer"
              dir="ltr"
              className="transition hover:text-gold-soft hover:opacity-100"
            >
              +98 910 979 8803
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-cream/10 pt-6 text-center text-xs opacity-70">
        {dict.footer.rights}
      </div>
    </footer>
  );
}
