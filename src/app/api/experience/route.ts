import { NextResponse } from "next/server";
import { escapeTelegramHtml, sendTelegramMessage } from "@/lib/telegram";

const PRODUCTION_WEBHOOK_URL = "https://amirhesam.app.n8n.cloud/webhook/shopemoon-experience";

interface ExperiencePayload {
  name: string;
  phone: string;
  product: string;
  rating: number;
  feedback: string;
  photoName?: string;
}

interface CouponWebhookResponse {
  success: boolean;
  couponCode?: string;
  discount?: number;
  expiresAt?: string;
}

function isExperiencePayload(value: unknown): value is ExperiencePayload {
  if (!value || typeof value !== "object") return false;
  const payload = value as Record<string, unknown>;
  return typeof payload.name === "string" && payload.name.trim().length > 0 &&
    typeof payload.phone === "string" && payload.phone.trim().length > 0;
}

function formatExperienceTelegramMessage(payload: ExperiencePayload, couponCode: string) {
  const lines = [
    "🎁 <b>فرم رضایت مشتری جدید</b>",
    "",
    `👤 <b>نام:</b> ${escapeTelegramHtml(payload.name)}`,
    `📞 <b>شماره:</b> ${escapeTelegramHtml(payload.phone)}`,
    `🛍 <b>محصول:</b> ${escapeTelegramHtml(payload.product || "-")}`,
    `⭐ <b>امتیاز:</b> ${payload.rating}/5`,
    `💬 <b>متن نظر:</b> ${escapeTelegramHtml(payload.feedback || "-")}`,
    "",
    "🎟 <b>کد تخفیف:</b>",
    escapeTelegramHtml(couponCode),
  ];
  return lines.join("\n");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  if (!isExperiencePayload(body)) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const webhookUrl = process.env.EXPERIENCE_WEBHOOK_URL || PRODUCTION_WEBHOOK_URL;

  let coupon: CouponWebhookResponse;
  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!webhookResponse.ok) {
      return NextResponse.json({ success: false }, { status: 502 });
    }

    coupon = await webhookResponse.json();
    if (!coupon.success || !coupon.couponCode) {
      return NextResponse.json({ success: false }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ success: false }, { status: 502 });
  }

  // Best-effort admin notification — never let a Telegram failure affect the response.
  void sendTelegramMessage(formatExperienceTelegramMessage(body, coupon.couponCode));

  return NextResponse.json(
    { success: true, couponCode: coupon.couponCode, discount: coupon.discount, expiresAt: coupon.expiresAt },
    { status: 200 }
  );
}
