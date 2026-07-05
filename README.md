# ShopeMoon — Next.js 15

Modern luxury fashion landing page for ShopeMoon. Built with Next.js 15 (App Router), React 19, TypeScript, and Tailwind CSS. Supports RTL Persian and LTR English, light/dark mode, and is fully responsive.

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS

## Features

- Persian (RTL) / English (LTR) toggle
- Light / dark mode toggle
- Hero section with Telegram CTA
- Trust badges
- Product showcase by category
- Membership form (saved via API, with a Telegram admin notification)
- Experience/review form (notifies the team via Telegram)
- FAQ accordion
- Contact section

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Environment variables

- `MEMBERSHIP_WEBHOOK_URL` — n8n webhook that saves membership submissions to Google Sheets.
- `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` — Telegram bot used to notify the team about new
  membership signups and experience submissions. Optional in development (missing values are
  logged as a warning and the notification is skipped, never crashing the app).

See `.env.example` for details.

## Build

```bash
npm run build
npm run start
```

## Deploy to Vercel

- Framework Preset: **Next.js**
- Root Directory: **/** (repo root)
- Build Command: `next build` (default)
- Output Directory: *(default, managed by Next.js)*
- Required environment variables: `MEMBERSHIP_WEBHOOK_URL`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`

## Contact

Telegram: https://t.me/shopeemonn
