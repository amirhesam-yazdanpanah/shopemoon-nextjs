import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { AppProviders } from "@/context/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShopeMoon | خرید مستقیم از برندهای اورجینال",
  description:
    "ShopeMoon - خرید حضوری و آنلاین از فروشگاه‌های معتبر ترکیه و اروپا. زارا، گوچی، نایک و برندهای اورجینال دیگر.",
  openGraph: {
    title: "ShopeMoon | خرید مستقیم از برندهای اورجینال",
    description: "خرید حضوری و آنلاین از فروشگاه‌های معتبر ترکیه و اروپا",
    type: "website",
    locale: "fa_IR",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// Real key names read by @elevenlabs/convai-widget-core's text-contents
// attribute (verified against the package source, not docs):
// main_label, start_call, end_call, expand, collapse, listening_status,
// speaking_status. Flat attributes like "action-text"/"start-call-text"
// are not read by the widget at all.
const elevenLabsTextContents = JSON.stringify({
  main_label: "هر سوالی داری از من بپرس",
  start_call: "شروع تماس صوتی",
  end_call: "پایان تماس",
  expand: "باز کردن دستیار",
  collapse: "بستن دستیار",
  listening_status: "دارم به حرفت گوش میدم…",
  speaking_status: "در حال پاسخ دادن…",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="bg-cream text-navy dark:bg-navy-dark dark:text-cream transition-colors duration-300">
        <AppProviders>{children}</AppProviders>
        <elevenlabs-convai
          agent-id="agent_1301kvzjfw9xed4vt4t83qd5md2k"
          placement="bottom-left"
          text-contents={elevenLabsTextContents}
          avatar-orb-color-1="#c9a25d"
          avatar-orb-color-2="#f7f1e6"
        ></elevenlabs-convai>
        <Script src="https://unpkg.com/@elevenlabs/convai-widget-embed" strategy="afterInteractive" async />
      </body>
    </html>
  );
}
