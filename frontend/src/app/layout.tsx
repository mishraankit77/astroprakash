import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React, { Suspense } from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import { MobileBottomNav } from "@/components/MobileBottomNav";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FF6D00",
};

export const metadata: Metadata = {
  title: "AstroPrakash - Consult Top Astrologers, Free Kundli & Prakash AI",
  description:
    "India's premier Vedic astrology and spiritual tech platform. Chat and talk with verified Astrologers, Tarot readers, generate Free Janam Kundli, check Kundli Milan (36 Gunas), and get instant 24/7 AI guidance with Prakash AI.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-[#FFFDF9]">
      <body className={`${inter.className} min-h-full flex flex-col bg-[#FFFDF9] text-neutral-800 antialiased selection:bg-orange-100 selection:text-orange-900`}>
        <LanguageProvider>
          <div className="flex-1 flex flex-col pb-16 lg:pb-0">
            {children}
          </div>
          <Suspense fallback={null}>
            <MobileBottomNav />
          </Suspense>
        </LanguageProvider>
      </body>
    </html>
  );
}
