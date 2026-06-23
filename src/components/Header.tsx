"use client";

import { useState } from "react";
import { useLocale } from "@/context/providers";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";

export function Header() {
  const { dict } = useLocale();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#hero", label: dict.nav.home },
    { href: "#products", label: dict.nav.products },
    { href: "#membership", label: dict.nav.membership },
    { href: "#faq", label: dict.nav.faq },
    { href: "#contact", label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-gold-soft/40 bg-cream/90 backdrop-blur dark:border-navy-soft dark:bg-navy-dark/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <a
          href="#hero"
          className="bg-gradient-to-br from-navy to-gold bg-clip-text text-2xl font-extrabold tracking-tight text-transparent dark:from-cream dark:to-gold-light sm:text-3xl"
        >
          ShopeMoon
        </a>

        <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-gold">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold-soft md:hidden"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-gold-soft/40 bg-cream px-5 py-4 dark:border-navy-soft dark:bg-navy-dark md:hidden">
          <ul className="flex flex-col gap-3 text-sm font-semibold">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)} className="block py-1">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
