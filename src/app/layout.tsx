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

// action-text / start-call-text are not real attributes — the widget core
// only reads a text-contents JSON attribute, with keys main_label and
// start_call, to override its default English labels with Persian ones.
const elevenLabsTextContents = JSON.stringify({
  main_label: "هر سوالی داری از من بپرس",
  start_call: "شروع تماس صوتی",
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
          text-contents={elevenLabsTextContents}
        ></elevenlabs-convai>
        <Script src="https://unpkg.com/@elevenlabs/convai-widget-embed" strategy="afterInteractive" async />
      </body>
    </html>
  );
}
