import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AEGIS — Reputation that travels with your agent",
  description: "Drop-in SDK for AI agents. Every action becomes an on-chain receipt. Every receipt builds a portable, tamper-evident reputation. $AEGIS on Base.",
  openGraph: {
    title: "AEGIS — Reputation that travels with your agent",
    description: "Drop-in SDK for AI agents. On-chain receipts, portable reputation, privacy-preserving.",
    siteName: "AEGIS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AEGIS — Reputation that travels with your agent",
    description: "Drop-in SDK for AI agents. On-chain receipts, portable reputation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="virtual-protocol-site-verification" content="02a6b010ed3e8033b27ffcc1a1993bf3" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
