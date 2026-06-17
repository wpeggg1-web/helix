import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { brand } from "@/lib/data";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

const SITE_URL = "https://helix-iota-eosin.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${brand.name} — ${brand.tagline}`, template: `%s · ${brand.name}` },
  description: brand.subtitle,
  keywords: ["AI inference", "decentralized", "verifiable AI", "inference oracle", "Base"],
  authors: [{ name: brand.name, url: brand.xUrl }],
  creator: brand.xHandle,
  publisher: brand.name,
  openGraph: {
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.subtitle,
    url: SITE_URL,
    siteName: brand.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: brand.xHandle,
    creator: brand.xHandle,
    title: brand.name,
    description: brand.tagline,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <meta name="virtual-protocol-site-verification" content="7206e5225ad97baa718fd39f2b7d675e" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="128x128" href="/logo-128.png" />
        <link rel="icon" type="image/png" sizes="256x256" href="/logo-256.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
