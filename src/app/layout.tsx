import type { Metadata, Viewport } from "next";
import { AppProviders } from "@/context/providers";
import { VoiceWidget } from "@/components/VoiceWidget";
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="bg-cream text-navy dark:bg-navy-dark dark:text-cream transition-colors duration-300">
        <AppProviders>
          {children}
          <VoiceWidget />
        </AppProviders>
      </body>
    </html>
  );
}
