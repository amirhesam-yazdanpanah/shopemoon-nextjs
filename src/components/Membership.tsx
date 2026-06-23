"use client";

import { useState, type FormEvent } from "react";
import { useLocale } from "@/context/providers";
import { whatsappLink } from "@/lib/dictionary";

export function Membership() {
  const { dict } = useLocale();
  const [form, setForm] = useState({ name: "", whatsapp: "", brands: "", details: "" });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const message = [
      dict.membership.title,
      `${dict.membership.fields.name}: ${form.name}`,
      `${dict.membership.fields.whatsapp}: ${form.whatsapp}`,
      `${dict.membership.fields.brands}: ${form.brands || "-"}`,
      `${dict.membership.fields.details}: ${form.details || "-"}`,
    ].join("\n");
    window.open(whatsappLink(message), "_blank", "noopener");
  }

  return (
    <section id="membership" className="bg-cream-dark px-5 py-16 dark:bg-navy-soft/20">
      <div className="mx-auto max-w-xl">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">{dict.membership.title}</h2>
        <p className="mt-4 text-center text-navy-soft dark:text-cream-dark">
          {dict.membership.desc}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 grid gap-4 rounded-xl2 bg-cream p-6 shadow-card dark:bg-navy-dark sm:p-8"
        >
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-semibold">
              {dict.membership.fields.name}
            </label>
            <input
              id="name"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="rounded-lg border border-gold-soft/60 bg-white px-4 py-3 outline-none focus:border-gold focus:ring-2 focus:ring-gold-soft dark:bg-navy-soft/40"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="whatsapp" className="text-sm font-semibold">
              {dict.membership.fields.whatsapp}
            </label>
            <input
              id="whatsapp"
              type="tel"
              required
              value={form.whatsapp}
              onChange={(e) => setForm((f) => ({ ...f, whatsapp: e.target.value }))}
              className="rounded-lg border border-gold-soft/60 bg-white px-4 py-3 outline-none focus:border-gold focus:ring-2 focus:ring-gold-soft dark:bg-navy-soft/40"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="brands" className="text-sm font-semibold">
              {dict.membership.fields.brands}
            </label>
            <input
              id="brands"
              value={form.brands}
              onChange={(e) => setForm((f) => ({ ...f, brands: e.target.value }))}
              className="rounded-lg border border-gold-soft/60 bg-white px-4 py-3 outline-none focus:border-gold focus:ring-2 focus:ring-gold-soft dark:bg-navy-soft/40"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="details" className="text-sm font-semibold">
              {dict.membership.fields.details}
            </label>
            <textarea
              id="details"
              rows={4}
              value={form.details}
              onChange={(e) => setForm((f) => ({ ...f, details: e.target.value }))}
              className="rounded-lg border border-gold-soft/60 bg-white px-4 py-3 outline-none focus:border-gold focus:ring-2 focus:ring-gold-soft dark:bg-navy-soft/40"
            />
          </div>

          <button
            type="submit"
            className="mt-2 rounded-full bg-gradient-to-br from-gold to-gold-light px-8 py-3 font-bold text-white shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"
          >
            {dict.membership.submit}
          </button>
        </form>
      </div>
    </section>
  );
}
