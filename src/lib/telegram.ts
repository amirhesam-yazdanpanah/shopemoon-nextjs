interface TelegramSendResult {
  ok: boolean;
  skipped?: boolean;
}

/**
 * Sends a message to the configured Telegram chat via the Bot API.
 * Never throws — callers can fire this without blocking their own success response.
 */
export async function sendTelegramMessage(text: string): Promise<TelegramSendResult> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set — skipping Telegram notification."
      );
    }
    return { ok: false, skipped: true };
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    });

    if (!response.ok) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("[telegram] sendMessage failed with status", response.status);
      }
      return { ok: false };
    }

    return { ok: true };
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[telegram] sendMessage threw an error:", error);
    }
    return { ok: false };
  }
}

export function escapeTelegramHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
