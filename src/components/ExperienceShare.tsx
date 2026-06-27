"use client";

import { useState, type FormEvent } from "react";
import { useLocale } from "@/context/providers";
import { whatsappLink } from "@/lib/dictionary";

const RATINGS = [1, 2, 3, 4, 5];

export function ExperienceShare() {
  const { dict } = useLocale();
  const [form, setForm] = useState({
    name: "",
    whatsapp: "",
    product: "",
    rating: 5,
    feedback: "",
  });
  const [photoName, setPhotoName] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const message = [
      dict.experience.title,
      `${dict.experience.fields.name}: ${form.name}`,
      `${dict.experience.fields.whatsapp}: ${form.whatsapp}`,
      `${dict.experience.fields.product}: ${form.product}`,
      `${dict.experience.fields.rating}: ${form.rating}/5`,
      `${dict.experience.fields.feedback}: ${form.feedback || "-"}`,
      `${dict.experience.fields.photo}: ${photoName || "-"}`,
    ].join("\n");
    window.open(whatsappLink(message), "_blank", "noopener");
  }

  const inputClass =
    "rounded-lg border border-gold-soft/60 bg-white px-4 py-3 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold-soft dark:bg-navy-soft/40";

  return (
    <section id="experience" className="px-5 py-20">
      <div className="mx-auto max-w-xl">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">{dict.experience.title}</h2>
        <p className="mx-auto mt-4 max-w-md text-center leading-relaxed text-navy-soft dark:text-cream-dark">
          {dict.experience.intro}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 grid gap-5 rounded-xl2 bg-cream p-6 shadow-soft dark:bg-navy-dark sm:p-10"
        >
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
            <div className="flex gap-2" role="radiogroup" aria-label={dict.experience.fields.rating}>
              {RATINGS.map((value) => (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={form.rating === value}
                  onClick={() => setForm((f) => ({ ...f, rating: value }))}
                  className={`h-11 w-11 rounded-full text-base font-bold transition ${
                    form.rating === value
                      ? "bg-gradient-to-br from-gold to-gold-light text-white shadow-card"
                      : "bg-cream-dark text-navy/70 hover:bg-gold-soft dark:bg-navy-soft/40 dark:text-cream/70"
                  }`}
                >
                  {value}
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
            className="mt-2 rounded-full bg-gradient-to-br from-gold to-gold-light px-8 py-4 text-base font-bold text-white shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"
          >
            {dict.experience.submit}
          </button>

          <p className="text-center text-xs text-navy-soft dark:text-cream-dark">
            {dict.experience.moderationNote}
          </p>
          <p className="text-center text-sm font-semibold text-gold">{dict.experience.rewardNote}</p>
        </form>
      </div>
    </section>
  );
}
