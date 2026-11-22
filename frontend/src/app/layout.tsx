import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} min-h-full flex flex-col bg-[#FFFDF9] text-neutral-800 antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
