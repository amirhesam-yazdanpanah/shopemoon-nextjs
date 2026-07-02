"use client";

import { useState } from "react";
import { useExperienceModal, useMembershipModal, useLocale, useTheme } from "@/context/providers";
import { ThemeToggle, MoonIcon, SunIcon } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M5 20c1-3.8 4.2-6 7-6s6 2.2 7 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Header() {
  const { dict } = useLocale();
  const { openModal } = useExperienceModal();
  const { closeModal: closeMembershipModal } = useMembershipModal();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  function openExperienceModal() {
    closeMembershipModal();
    openModal();
  }

  const links: { href?: string; label: string; action?: () => void }[] = [
    { href: "#hero", label: dict.nav.home },
    { href: "#about", label: dict.nav.about },
    { href: "#products", label: dict.nav.products },
    { label: dict.nav.experience, action: openExperienceModal },
    { href: "#faq", label: dict.nav.faq },
    { href: "#contact", label: dict.nav.contact },
  ];

  const socialLinks = [
    {
      href: "https://www.instagram.com/shopemoon.tr/",
      label: "Instagram",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
        </svg>
      ),
    },
    {
      href: "https://t.me/shopeemonn",
      label: "Telegram",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M21 4 3 11.5l5.2 1.9L10 19l3-3.6 4.3 3.1L21 4Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M8.2 13.4 17 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      href: "https://wa.me/989109798803",
      label: "WhatsApp",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3a8.9 8.9 0 0 0-7.6 13.5L3 21l4.6-1.2A8.9 8.9 0 1 0 12 3Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 8.4c.3-.6.6-.6.9-.6h.6c.2 0 .4 0 .6.5.2.5.7 1.7.8 1.8.1.1.1.3 0 .5-.1.2-.2.3-.3.4-.2.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.5.7 1.8.9.3.1.5.2.5.3 0 .2 0 .9-.3 1.6-.3.7-1.5 1.3-2.1 1.4-.5.1-1.2.1-2-.2-.4-.2-1-.4-1.7-.7-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.6-1.2-3 0-1.4.7-2.1 1-2.4Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-gold-soft/40 bg-cream/90 backdrop-blur dark:border-navy-soft dark:bg-navy-dark/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <a href="#hero" className="flex items-center gap-2">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="shrink-0 text-gold"
          >
            <path
              d="M20.5 14.5c-1 .3-2.1.4-3.2.2-4-.7-7-4.2-7-8.4 0-1.5.4-2.9 1-4.1C7.1 3.5 4 7.4 4 12c0 5 4 9.5 9 9.5 4 0 7.4-2.6 8.6-6.2-.4.1-.7.2-1.1.2Z"
              fill="currentColor"
            />
          </svg>
          <span className="bg-gradient-to-br from-navy to-gold bg-clip-text text-2xl font-extrabold tracking-tight text-transparent dark:from-cream dark:to-gold-light sm:text-3xl">
            ShopeMoon
          </span>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
          {links.map((link) =>
            link.action ? (
              <button
                key={link.label}
                type="button"
                onClick={link.action}
                className="transition hover:text-gold"
              >
                {link.label}
              </button>
            ) : (
              <a key={link.href} href={link.href} className="transition hover:text-gold">
                {link.label}
              </a>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 border-e border-gold-soft/40 pe-2 md:flex">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-navy/70 transition hover:bg-cream-dark hover:text-gold dark:text-cream/70 dark:hover:bg-navy-soft"
              >
                {social.icon}
              </a>
            ))}
            <a
              href="#membership"
              aria-label={dict.nav.membership}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-navy/70 transition hover:bg-cream-dark hover:text-gold dark:text-cream/70 dark:hover:bg-navy-soft"
            >
              <UserIcon />
            </a>
          </div>
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
              <li key={link.label}>
                {link.action ? (
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      link.action?.();
                    }}
                    className="block py-1 text-start"
                  >
                    {link.label}
                  </button>
                ) : (
                  <a href={link.href} onClick={() => setOpen(false)} className="block py-1">
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={toggleTheme}
            className="mt-4 flex w-full items-center gap-2 border-t border-gold-soft/40 pt-4 text-sm font-semibold text-navy/80 transition hover:text-gold dark:text-cream/80"
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
            {dict.theme.toggleLabel}
          </button>

          <div className="mt-4 flex items-center gap-2 border-t border-gold-soft/40 pt-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold-soft/40 text-navy/70 transition hover:bg-cream-dark hover:text-gold dark:text-cream/70 dark:hover:bg-navy-soft"
              >
                {social.icon}
              </a>
            ))}
            <a
              href="#membership"
              onClick={() => setOpen(false)}
              aria-label={dict.nav.membership}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold-soft/40 text-navy/70 transition hover:bg-cream-dark hover:text-gold dark:text-cream/70 dark:hover:bg-navy-soft"
            >
              <UserIcon />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
