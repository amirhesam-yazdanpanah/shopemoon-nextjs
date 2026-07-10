"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocale } from "@/context/providers";

const COPIED_RESET_MS = 2000;

function ClipboardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="8" y="8" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function MembershipSuccessModal({
  discountCode,
  onClose,
}: {
  discountCode: string;
  onClose: () => void;
}) {
  const { dict, locale } = useLocale();
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    window.setTimeout(onClose, 200);
  }, [onClose]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(discountCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), COPIED_RESET_MS);
    } catch {
      // clipboard access denied — silently ignore, code is still visible on screen
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      dir={dict.dir}
      lang={locale}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-navy/60 px-4 backdrop-blur-sm transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={close}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-md rounded-xl2 bg-cream p-6 text-center shadow-soft transition duration-200 dark:bg-navy-dark sm:p-8 ${
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={close}
          aria-label="close"
          className="absolute end-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-cream-dark text-navy/70 transition hover:bg-gold-soft dark:bg-navy-soft/60 dark:text-cream/70"
        >
          ✕
        </button>

        <h2 className="mt-2 text-xl font-bold sm:text-2xl">{dict.membership.successModal.title}</h2>
        <p className="mt-4 text-sm font-semibold text-navy-soft dark:text-cream-dark">
          {dict.membership.successModal.codeIntro}
        </p>

        <div className="mx-auto mt-4 w-fit rounded-xl border-2 border-gold bg-white px-8 py-4 shadow-soft dark:bg-navy-soft/50">
          <span dir="ltr" className="text-2xl font-black tracking-[0.2em] text-gold">
            {discountCode}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-gold to-gold-light px-6 py-3 text-sm font-bold text-white shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"
        >
          <ClipboardIcon />
          {copied ? dict.membership.successModal.copiedButton : dict.membership.successModal.copyButton}
        </button>

        <div className="mt-4">
          <button
            type="button"
            onClick={close}
            className="text-sm font-semibold text-navy-soft underline-offset-2 transition hover:text-gold hover:underline dark:text-cream-dark"
          >
            {dict.membership.successModal.closeButton}
          </button>
        </div>
      </div>
    </div>
  );
}
