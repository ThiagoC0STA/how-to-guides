import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "@/components/Footer";
import { LoadingProvider } from "../components/LoadingProvider";
import ErrorModal from '../components/ErrorModal';
import SuccessModal from '../components/SuccessModal';

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const viewport = "width=device-width, initial-scale=1";
export const themeColor = "#ffffff";

export const metadata: Metadata = {
  title: "How-ToGuides.com - Master AI Tools with Step-by-Step Guides",
  description:
    "Comprehensive tutorials for AI tools including ChatGPT, Midjourney, DALL-E, and more. Learn how to use AI effectively with our step-by-step guides.",
  icons: {
    apple: "/images/logo/guides-logo.svg",
    icon: [
      { url: "/images/logo/guides-logo.svg", sizes: "32x32" },
      { url: "/images/logo/guides-logo.svg", sizes: "16x16" },
    ],
    shortcut: "/images/logo/guides-logo.svg",
    other: [
      {
        rel: "manifest",
        url: "/images/logo/guides-logo.svg",
      },
      {
        rel: "mask-icon",
        url: "/images/logo/guides-logo.svg",
        color: "#5bbad5",
      },
    ],
  },
  
  other: {
    "msapplication-TileColor": "#da532c",
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
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <LoadingProvider>
          <Header />
          {children}
          <Footer />
          <ErrorModal />
          <SuccessModal />
        </LoadingProvider>
      </body>
    </html>
  );
}
