"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WalletModal } from "@/components/WalletModal";
import { useLanguage } from "@/context/LanguageContext";
import {
  SunMedium,
  Heart,
  Briefcase,
  Activity,
  Sparkles,
  Star,
  ArrowRight,
  Flame,
} from "lucide-react";
import Link from "next/link";

export default function HoroscopesPage() {
  const { language } = useLanguage();
  const [horoscopes, setHoroscopes] = useState<any[]>([]);
  const [selectedSign, setSelectedSign] = useState<string>("Aries");
  const [loading, setLoading] = useState(true);
  const [walletOpen, setWalletOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(100);

  useEffect(() => {
    async function loadHoroscopes() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/horoscopes");
        if (res.ok) {
          const data = await res.json();
          setHoroscopes(data.horoscopes);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadHoroscopes();
  }, []);

  const currentH = horoscopes.find((h) => h.sign.toLowerCase() === selectedSign.toLowerCase()) || horoscopes[0];

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col text-neutral-800">
      <Navbar onOpenWallet={() => setWalletOpen(true)} walletBalance={walletBalance} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Banner */}
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-lg shadow-orange-500/10">
          <div className="flex items-center gap-2 text-xs font-bold text-orange-100 uppercase tracking-wider mb-1">
            <SunMedium className="w-4 h-4 text-orange-200" />
            <span>{language === "hi" ? "दैनिक ग्रह गोचर फल" : "Daily Planetary Forecasts"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {language === "hi" ? "दैनिक राशिफल (आज का भविष्यफल)" : "Daily Horoscopes (Rashifal)"}
          </h1>
          <p className="text-sm text-orange-100 mt-1 max-w-2xl leading-relaxed">
            {language === "hi"
              ? "सभी 12 राशियों के लिए आज का प्रामाणिक दैनिक राशिफल। जानें कि आज का ग्रह गोचर आपके प्रेम, करियर, स्वास्थ्य एवं शुभ अंक-रंग पर क्या प्रभाव डालेगा।"
              : "Read authentic daily astrological predictions for all 12 zodiac signs. Understand how planetary transits guide your love, career, health, and lucky charms today."}
          </p>
        </div>

        {/* 12 Signs Selector Grid (Astrotalk Style) */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2.5 mb-10">
          {horoscopes.map((h) => (
            <button
              key={h.sign}
              onClick={() => setSelectedSign(h.sign)}
              className={`p-3 rounded-2xl flex flex-col items-center justify-center text-center transition-all cursor-pointer border ${
                selectedSign.toLowerCase() === h.sign.toLowerCase()
                  ? "bg-orange-500 text-white border-orange-500 shadow-md scale-105"
                  : "bg-white text-neutral-700 border-orange-100 hover:border-orange-300 hover:bg-orange-50"
              }`}
            >
              <span className="text-2xl leading-none mb-1">{h.icon}</span>
              <span className="text-xs font-bold truncate">{h.sign}</span>
              <span className={`text-[9px] ${selectedSign.toLowerCase() === h.sign.toLowerCase() ? "text-orange-100" : "text-neutral-400"}`}>
                {h.sanskrit}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Horoscope Detail Card */}
        {currentH && (
          <div className="bg-white rounded-3xl border border-orange-100 p-6 sm:p-8 shadow-sm space-y-8 animate-in fade-in duration-200">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-orange-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 text-white flex items-center justify-center text-3xl shadow-md">
                  {currentH.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-black text-neutral-900">{currentH.sign} Horoscope</h2>
                    <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                      {currentH.sanskrit}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {currentH.dates} • Element: {currentH.element}
                  </p>
                </div>
              </div>

              {/* Day Rating */}
              <div className="bg-orange-50/80 p-3 rounded-2xl border border-orange-200/80 text-center">
                <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">Cosmic Rating</div>
                <div className="flex items-center justify-center gap-1 mt-0.5 text-amber-500 font-bold text-sm">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <span className="text-neutral-900 font-black">{currentH.rating} / 5.0</span>
                </div>
              </div>
            </div>

            {/* General Prediction */}
            <div className="p-5 rounded-2xl bg-[#FFF9F2] border border-orange-100/80">
              <h3 className="text-sm font-bold text-orange-900 mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-orange-500" />
                Today&apos;s Cosmic Overview
              </h3>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {currentH.prediction}
              </p>
            </div>

            {/* 3 Pillars: Love, Career, Health */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-white border border-rose-100 shadow-xs">
                <div className="flex items-center gap-2 text-rose-600 font-bold text-sm mb-2">
                  <Heart className="w-4 h-4" />
                  <span>Love &amp; Relationships</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {currentH.love}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-amber-100 shadow-xs">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-sm mb-2">
                  <Briefcase className="w-4 h-4" />
                  <span>Career &amp; Business</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {currentH.career}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-emerald-100 shadow-xs">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm mb-2">
                  <Activity className="w-4 h-4" />
                  <span>Health &amp; Vitality</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {currentH.health}
                </p>
              </div>
            </div>

            {/* Lucky Charms */}
            <div className="flex flex-wrap items-center gap-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60 text-xs text-neutral-700">
              <div>
                <strong className="text-orange-600">Lucky Number:</strong> {currentH.luckyNumber}
              </div>
              <span>•</span>
              <div>
                <strong className="text-orange-600">Lucky Color:</strong> {currentH.luckyColor}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white">
              <div>
                <h4 className="text-base font-bold">Want deeper personal forecasts for {currentH.sign}?</h4>
                <p className="text-xs text-orange-100 mt-0.5">
                  Speak directly with an expert astrologer specialized in {currentH.sanskrit} Rashi transits.
                </p>
              </div>
              <Link
                href="/chat-with-astrologer"
                className="px-5 py-2.5 rounded-xl bg-white text-orange-700 font-bold text-xs hover:bg-orange-50 shadow-md transition-all whitespace-nowrap"
              >
                Chat with Guru (FREE)
              </Link>
            </div>
          </div>
        )}
      </main>

      <WalletModal
        isOpen={walletOpen}
        onClose={() => setWalletOpen(false)}
        currentBalance={walletBalance}
        onRecharge={(add) => setWalletBalance(walletBalance + add)}
      />

      <Footer />
    </div>
  );
}
