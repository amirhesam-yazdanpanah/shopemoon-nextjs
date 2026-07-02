import { NextResponse } from "next/server";

const PRODUCTION_WEBHOOK_URL = "https://amirhesam.app.n8n.cloud/webhook/shopemoon-membership";

interface MembershipPayload {
  name: string;
  whatsapp: string;
  gender: string;
  birthDate: string;
  brands: string;
  address: string;
  details: string;
}

function isMembershipPayload(value: unknown): value is MembershipPayload {
  if (!value || typeof value !== "object") return false;
  const payload = value as Record<string, unknown>;
  return typeof payload.name === "string" && payload.name.trim().length > 0 &&
    typeof payload.whatsapp === "string" && payload.whatsapp.trim().length > 0;
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

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false }, { status: 502 });
  }
}
