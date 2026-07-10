import { NextResponse } from "next/server";
import { isEnglishDigitsOnlyPhone } from "@/lib/validation";

const PRODUCTION_WEBHOOK_URL = "https://amirhesam.app.n8n.cloud/webhook/shopemoon-membership-v2";

interface MembershipPayload {
  name: string;
  whatsapp: string;
  gender: string;
  birthDate: string;
  address: string;
}

interface MembershipWebhookResponse {
  success: boolean;
  code?: string;
  message?: string;
  discountCode?: string;
}

function isMembershipPayload(value: unknown): value is MembershipPayload {
  if (!value || typeof value !== "object") return false;
  const payload = value as Record<string, unknown>;
  return typeof payload.name === "string" && payload.name.trim().length > 0 &&
    typeof payload.whatsapp === "string" && payload.whatsapp.trim().length > 0;
}

/**
 * The frontend never decides uniqueness, coupon codes, or discount percentage —
 * those all happen in the n8n workflow. This route only does a fast-fail format
 * check before forwarding, and translates the webhook's response into the
 * documented 201/400/409/500 contract.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, code: "INVALID_INPUT", message: "اطلاعات ارسالی معتبر نیست." }, { status: 400 });
  }

  if (!isMembershipPayload(body)) {
    return NextResponse.json({ success: false, code: "INVALID_INPUT", message: "اطلاعات وارد شده کامل یا معتبر نیست." }, { status: 400 });
  }

  if (!isEnglishDigitsOnlyPhone(body.whatsapp)) {
    return NextResponse.json(
      { success: false, code: "INVALID_INPUT", message: "شماره تلفن را فقط با اعداد انگلیسی وارد کنید." },
      { status: 400 }
    );
  }

  const webhookUrl = process.env.MEMBERSHIP_WEBHOOK_URL || PRODUCTION_WEBHOOK_URL;

  let webhookResponse: Response;
  try {
    webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    return NextResponse.json(
      { success: false, code: "SERVER_ERROR", message: "ارسال فرم با مشکل مواجه شد. لطفاً دوباره تلاش کنید." },
      { status: 500 }
    );
  }

  let result: MembershipWebhookResponse;
  try {
    result = await webhookResponse.json();
  } catch {
    return NextResponse.json(
      { success: false, code: "SERVER_ERROR", message: "ارسال فرم با مشکل مواجه شد. لطفاً دوباره تلاش کنید." },
      { status: 500 }
    );
  }

  if (webhookResponse.status === 409) {
    return NextResponse.json(
      { success: false, code: "DUPLICATE_PHONE", message: result.message || "این شماره تلفن قبلاً در شاپمون ثبت شده است." },
      { status: 409 }
    );
  }

  if (webhookResponse.status === 400) {
    return NextResponse.json(
      { success: false, code: "INVALID_INPUT", message: result.message || "اطلاعات وارد شده کامل یا معتبر نیست." },
      { status: 400 }
    );
  }

  if (!webhookResponse.ok || !result.success || !result.discountCode) {
    return NextResponse.json(
      { success: false, code: "SERVER_ERROR", message: result.message || "متأسفانه در ثبت اطلاعات مشکلی پیش آمد. لطفاً کمی بعد دوباره تلاش کنید." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, discountCode: result.discountCode }, { status: 201 });
}
