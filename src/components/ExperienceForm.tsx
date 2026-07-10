"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLocale } from "@/context/providers";

const RATINGS = [1, 2, 3, 4, 5];
const TOAST_DURATION_MS = 2200;

export interface ExperiencePayload {
  name: string;
  phone: string;
  product: string;
  rating: number;
  feedback: string;
  photoName: string;
  photoBase64?: string;
}

interface SubmitResult {
  success: boolean;
  couponCode?: string;
  expiresAt?: string;
}

/**
 * Single integration point for submitting an experience.
 * POSTs to the API route, which stores the submission + a freshly generated
 * coupon code and notifies the ShopeMoon Telegram chat.
 */
async function submitExperience(payload: ExperiencePayload): Promise<SubmitResult> {
  try {
    const response = await fetch("/api/experience", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) return { success: false };
    return await response.json();
  } catch {
    return { success: false };
  }
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      aria-hidden="true"
    >
      <path
        d="M12 3.5l2.6 5.4 5.9.7-4.3 4.1 1.1 5.8L12 16.6l-5.3 2.9 1.1-5.8-4.3-4.1 5.9-.7L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12.59 2.59a2 2 0 0 0-1.41-.59H4a2 2 0 0 0-2 2v7.17a2 2 0 0 0 .59 1.41l8.71 8.71a2.43 2.43 0 0 0 3.42 0l6.58-6.58a2.43 2.43 0 0 0 0-3.42l-8.71-8.7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="7.5" cy="7.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="8" y="8" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function CouponSuccessCard({
  couponCode,
  onCopy,
  toastVisible,
}: {
  couponCode: string;
  onCopy: () => void;
  toastVisible: boolean;
}) {
  const { dict } = useLocale();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className={`relative mt-6 rounded-2xl border border-emerald-300/70 bg-emerald-50 p-6 text-center shadow-card transition-all duration-500 ease-out dark:border-emerald-700/40 dark:bg-emerald-950/30 ${
        revealed ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
        {dict.experience.successTitle}
      </h3>
      <p className="mt-2 text-sm text-navy-soft dark:text-cream-dark">{dict.experience.successDesc}</p>

      <div className="mx-auto mt-4 w-fit rounded-xl border-2 border-gold bg-white px-8 py-4 shadow-soft dark:bg-navy-soft/50">
        <span dir="ltr" className="text-2xl font-black tracking-[0.2em] text-gold">
          {couponCode}
        </span>
      </div>

      <p className="mt-3 text-xs text-navy-soft dark:text-cream-dark">{dict.experience.couponValidity}</p>

      <button
        type="button"
        onClick={onCopy}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-gold to-gold-light px-5 py-2.5 text-sm font-bold text-white shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"
      >
        <ClipboardIcon />
        {dict.experience.copyCode}
      </button>

      <div
        role="status"
        className={`pointer-events-none absolute inset-x-0 -bottom-3 mx-auto w-fit translate-y-full rounded-full bg-navy px-4 py-1.5 text-xs font-semibold text-cream shadow-soft transition-all duration-200 dark:bg-cream dark:text-navy ${
          toastVisible ? "opacity-100" : "translate-y-[calc(100%+8px)] opacity-0"
        }`}
      >
        {dict.experience.copiedToast}
      </div>
    </div>
  );
}

export function ExperienceForm() {
  const { dict } = useLocale();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    product: "",
    rating: 5,
    feedback: "",
  });
  const [photoName, setPhotoName] = useState("");
  const [photoBase64, setPhotoBase64] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [coupon, setCoupon] = useState<{ code: string } | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    };
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(false);
    try {
      const result = await submitExperience({ ...form, photoName, photoBase64 });
      if (result.success && result.couponCode) {
        setCoupon({ code: result.couponCode });
      } else {
        setSubmitError(true);
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCopy() {
    if (!coupon) return;
    try {
      await navigator.clipboard.writeText(coupon.code);
      setToastVisible(true);
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
      toastTimerRef.current = window.setTimeout(() => setToastVisible(false), TOAST_DURATION_MS);
    } catch {
      // clipboard access denied — silently ignore, code is still visible on screen
    }
  }

  const inputClass =
    "rounded-lg border border-gold-soft/60 bg-white px-4 py-3 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold-soft dark:bg-navy-soft/40";

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-2">
        <label htmlFor="exp-name" className="text-sm font-semibold">
          {dict.experience.fields.name}
        </label>
        <input
          id="exp-name"
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className={inputClass}
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="exp-phone" className="text-sm font-semibold">
          {dict.experience.fields.phone}
        </label>
        <input
          id="exp-phone"
          type="tel"
          required
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          className={inputClass}
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="exp-product" className="text-sm font-semibold">
          {dict.experience.fields.product}
        </label>
        <input
          id="exp-product"
          required
          value={form.product}
          onChange={(e) => setForm((f) => ({ ...f, product: e.target.value }))}
          className={inputClass}
        />
      </div>

      <div className="grid gap-2">
        <span className="text-sm font-semibold">{dict.experience.fields.rating}</span>
        <div className="flex gap-1" role="radiogroup" aria-label={dict.experience.fields.rating}>
          {RATINGS.map((value) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={form.rating === value}
              aria-label={`${value}/5`}
              onClick={() => setForm((f) => ({ ...f, rating: value }))}
              className={`transition hover:scale-110 ${
                value <= form.rating ? "text-gold" : "text-navy/20 dark:text-cream/20"
              }`}
            >
              <StarIcon filled={value <= form.rating} />
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-2">
        <label htmlFor="exp-feedback" className="text-sm font-semibold">
          {dict.experience.fields.feedback}
        </label>
        <textarea
          id="exp-feedback"
          rows={4}
          required
          value={form.feedback}
          onChange={(e) => setForm((f) => ({ ...f, feedback: e.target.value }))}
          className={inputClass}
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="exp-photo" className="text-sm font-semibold">
          {dict.experience.fields.photo}
        </label>
        <input
          id="exp-photo"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) {
              setPhotoName("");
              setPhotoBase64("");
              return;
            }
            setPhotoName(file.name);
            const reader = new FileReader();
            reader.onload = () => setPhotoBase64(typeof reader.result === "string" ? reader.result : "");
            reader.readAsDataURL(file);
          }}
          className="rounded-lg border border-gold-soft/60 bg-white px-4 py-3 text-sm outline-none transition file:me-3 file:rounded-full file:border-0 file:bg-gold-soft file:px-4 file:py-2 file:text-xs file:font-bold file:text-gold focus:border-gold focus:ring-2 focus:ring-gold-soft dark:bg-navy-soft/40"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold to-gold-light px-8 py-4 text-base font-bold text-white shadow-card transition hover:-translate-y-0.5 hover:shadow-soft disabled:opacity-60"
      >
        <TagIcon />
        {dict.experience.submit}
      </button>

      {submitError && (
        <p className="text-center text-sm font-semibold text-red-600 dark:text-red-400">
          {dict.experience.submitError}
        </p>
      )}

      {coupon && <CouponSuccessCard couponCode={coupon.code} onCopy={handleCopy} toastVisible={toastVisible} />}

      <p className="text-center text-xs text-navy-soft dark:text-cream-dark">
        {dict.experience.moderationNote}
      </p>
      {!coupon && (
        <p className="text-center text-sm font-semibold text-gold">{dict.experience.rewardNote}</p>
      )}
    </form>
  );
}
