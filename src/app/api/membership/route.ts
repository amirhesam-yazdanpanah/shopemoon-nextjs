import { NextResponse } from "next/server";
import { escapeTelegramHtml, sendTelegramMessage } from "@/lib/telegram";

const PRODUCTION_WEBHOOK_URL = "https://amirhesam.app.n8n.cloud/webhook/shopemoon-membership";

interface MembershipPayload {
  name: string;
  whatsapp: string;
  gender: string;
  birthDate: string;
  brands: string;
  address: string;
  details: string;
  source?: string;
}

function isMembershipPayload(value: unknown): value is MembershipPayload {
  if (!value || typeof value !== "object") return false;
  const payload = value as Record<string, unknown>;
  return typeof payload.name === "string" && payload.name.trim().length > 0 &&
    typeof payload.whatsapp === "string" && payload.whatsapp.trim().length > 0;
}

function formatMembershipTelegramMessage(payload: MembershipPayload) {
  const lines = [
    "🌙 <b>New ShopeMoon Membership</b>",
    `<b>Full name:</b> ${escapeTelegramHtml(payload.name)}`,
    `<b>Phone number:</b> ${escapeTelegramHtml(payload.whatsapp)}`,
    `<b>Gender:</b> ${escapeTelegramHtml(payload.gender || "-")}`,
    `<b>Birthday:</b> ${escapeTelegramHtml(payload.birthDate || "-")}`,
  ];
  if (payload.address) {
    lines.push(`<b>Address:</b> ${escapeTelegramHtml(payload.address)}`);
  }
  lines.push(`<b>Signup date/time:</b> ${new Date().toISOString()}`);
  lines.push(`<b>Source:</b> ${escapeTelegramHtml(payload.source || "Membership Form")}`);
  return lines.join("\n");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  if (!isMembershipPayload(body)) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const webhookUrl = process.env.MEMBERSHIP_WEBHOOK_URL || PRODUCTION_WEBHOOK_URL;

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!webhookResponse.ok) {
      return NextResponse.json({ success: false }, { status: 502 });
    }

    // Best-effort admin notification — never let a Telegram failure affect the response.
    void sendTelegramMessage(formatMembershipTelegramMessage(body));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false }, { status: 502 });
  }
}
