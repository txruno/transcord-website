import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import { getTranslate } from "@/lib/locale";
import { SUPPORTED_LOCALES } from "@/lib/locales";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const dynamicParams = false;

export function generateStaticParams(): Array<{ locale: string }> {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslate(locale);
  const metadataBase = new URL(process.env.SITE_URL ?? "https://transcord.vercel.app");
  return {
    metadataBase,
    title: `Transcord`,
    description: t("home.hero.title"),
    verification: {
      google: "BCXkHuN0X-nlOp144yNpu54ds-BW9CnzTcDFeZsB0Os"
    },
    openGraph: {
      type: "website",
      url: `/${locale}`,
      title: "Transcord",
      description: t("home.hero.title"),
      siteName: "Transcord",
      images: [{ url: `/images/posts/transcord-beta.png` }]
    },
    twitter: {
      card: "summary_large_image",
      images: `/images/posts/transcord-beta.png`
    }
  };
}
export const viewport: Viewport = {
  themeColor: "#51a2ff",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gray-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
