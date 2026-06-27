"use client";

import { useState, type FormEvent } from "react";
import { useLocale } from "@/context/providers";
import { whatsappLink, type LocaleDictionary } from "@/lib/dictionary";

const RATINGS = [1, 2, 3, 4, 5];

export interface ExperiencePayload {
  name: string;
  whatsapp: string;
  product: string;
  rating: number;
  feedback: string;
  photoName: string;
}

/**
 * Single integration point for submitting an experience.
 * Today this only opens a pre-filled WhatsApp message. Once a real backend
 * exists, replace the body of this function (e.g. POST `payload` to an API
 * route) — the form UI above never needs to change.
 */
async function submitExperience(payload: ExperiencePayload, dict: LocaleDictionary) {
  const message = [
    dict.experience.teaserTitle,
    `${dict.experience.fields.name}: ${payload.name}`,
    `${dict.experience.fields.whatsapp}: ${payload.whatsapp}`,
    `${dict.experience.fields.product}: ${payload.product}`,
    `${dict.experience.fields.rating}: ${payload.rating}/5`,
    `${dict.experience.fields.feedback}: ${payload.feedback || "-"}`,
    `${dict.experience.fields.photo}: ${payload.photoName || "-"}`,
  ].join("\n");
  window.open(whatsappLink(message), "_blank", "noopener");
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

export function ExperienceForm({ onSubmitted }: { onSubmitted?: () => void }) {
  const { dict } = useLocale();
  const [form, setForm] = useState({
    name: "",
    whatsapp: "",
    product: "",
    rating: 5,
    feedback: "",
  });
  const [photoName, setPhotoName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitExperience({ ...form, photoName }, dict);
      onSubmitted?.();
    } finally {
      setSubmitting(false);
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
        <label htmlFor="exp-whatsapp" className="text-sm font-semibold">
          {dict.experience.fields.whatsapp}
        </label>
        <input
          id="exp-whatsapp"
          type="tel"
          required
          value={form.whatsapp}
          onChange={(e) => setForm((f) => ({ ...f, whatsapp: e.target.value }))}
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
          onChange={(e) => setPhotoName(e.target.files?.[0]?.name ?? "")}
          className="rounded-lg border border-gold-soft/60 bg-white px-4 py-3 text-sm outline-none transition file:me-3 file:rounded-full file:border-0 file:bg-gold-soft file:px-4 file:py-2 file:text-xs file:font-bold file:text-gold focus:border-gold focus:ring-2 focus:ring-gold-soft dark:bg-navy-soft/40"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 rounded-full bg-gradient-to-br from-gold to-gold-light px-8 py-4 text-base font-bold text-white shadow-card transition hover:-translate-y-0.5 hover:shadow-soft disabled:opacity-60"
      >
        {dict.experience.submit}
      </button>

      <p className="text-center text-xs text-navy-soft dark:text-cream-dark">
        {dict.experience.moderationNote}
      </p>
      <p className="text-center text-sm font-semibold text-gold">{dict.experience.rewardNote}</p>
    </form>
  );
}
