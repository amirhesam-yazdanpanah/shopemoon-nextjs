import { NextResponse } from "next/server";
import { escapeTelegramHtml, sendTelegramMessage } from "@/lib/telegram";

interface ExperiencePayload {
  name: string;
  phone: string;
  product: string;
  rating: number;
  feedback: string;
  photoName?: string;
}

function isExperiencePayload(value: unknown): value is ExperiencePayload {
  if (!value || typeof value !== "object") return false;
  const payload = value as Record<string, unknown>;
  return typeof payload.name === "string" && payload.name.trim().length > 0 &&
    typeof payload.phone === "string" && payload.phone.trim().length > 0;
}

function formatExperienceTelegramMessage(payload: ExperiencePayload) {
  const lines = [
    "⭐ <b>New ShopeMoon Experience Submission</b>",
    `<b>Full name:</b> ${escapeTelegramHtml(payload.name)}`,
    `<b>Phone number:</b> ${escapeTelegramHtml(payload.phone)}`,
    `<b>Product:</b> ${escapeTelegramHtml(payload.product || "-")}`,
    `<b>Rating:</b> ${payload.rating}/5`,
    `<b>Feedback:</b> ${escapeTelegramHtml(payload.feedback || "-")}`,
  ];
  if (payload.photoName) {
    lines.push(`<b>Photo:</b> ${escapeTelegramHtml(payload.photoName)}`);
  }
  lines.push(`<b>Signup date/time:</b> ${new Date().toISOString()}`);
  lines.push("<b>Source:</b> Experience Form");
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

  // Best-effort notification — there is no other persistence for this form,
  // so failures are logged server-side but never surfaced to the browser.
  await sendTelegramMessage(formatExperienceTelegramMessage(body));

  return NextResponse.json({ success: true }, { status: 200 });
}
