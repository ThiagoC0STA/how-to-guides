import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
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
  title: "How-ToGuides.com - Master AI Tools with Step-by-Step Guides",
  description:
    "Comprehensive tutorials for AI tools including ChatGPT, Midjourney, DALL-E, and more. Learn how to use AI effectively with our step-by-step guides.",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    apple: "/images/logo/favicon/apple-touch-icon.png",
    icon: [
      { url: "/images/logo/favicon/favicon-32x32.png", sizes: "32x32" },
      { url: "/images/logo/favicon/favicon-16x16.png", sizes: "16x16" },
    ],
    shortcut: "/images/logo/favicon/favicon.ico",
    other: [
      {
        rel: "manifest",
        url: "/images/logo/favicon/site.webmanifest",
      },
      {
        rel: "mask-icon",
        url: "/images/logo/favicon/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },
  themeColor: "#ffffff",
  other: {
    "msapplication-TileColor": "#da532c",
    "msapplication-config": "/images/logo/favicon/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
