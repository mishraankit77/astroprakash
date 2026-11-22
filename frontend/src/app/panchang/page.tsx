"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WalletModal } from "@/components/WalletModal";
import { useLanguage } from "@/context/LanguageContext";
import {
  Clock,
  Sunrise,
  Sunset,
  Moon,
  AlertOctagon,
  CheckCircle,
  Calendar,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function PanchangPage() {
  const { language } = useLanguage();
  const [panchang, setPanchang] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [walletOpen, setWalletOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(100);

  useEffect(() => {
    async function loadPanchang() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/panchang/today");
        if (res.ok) {
          const data = await res.json();
          setPanchang(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadPanchang();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col text-neutral-800">
      <Navbar onOpenWallet={() => setWalletOpen(true)} walletBalance={walletBalance} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Banner */}
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-lg shadow-orange-500/10">
          <div className="flex items-center gap-2 text-xs font-bold text-orange-100 uppercase tracking-wider mb-1">
            <Clock className="w-4 h-4 text-orange-200" />
            <span>{language === "hi" ? "दैनिक वैदिक पंचांग एवं शुभ मुहूर्त" : "Vedic Almanac & Muhurat"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {language === "hi" ? "आज का पंचांग एवं शुभ मुहूर्त" : "Today's Panchang & Shubh Muhurat"}
          </h1>
          <p className="text-sm text-orange-100 mt-1 max-w-2xl leading-relaxed">
            {language === "hi"
              ? "सटीक सनातन काल गणना: तिथि, नक्षत्र, योग, करण, राहुकाल एवं अभिजीत मुहूर्त - मांगलिक व शुभ कार्यों के सटीक निर्धारण हेतु।"
              : "Accurate Hindu calendar calculations: Tithi, Nakshatra, Yoga, Karana, Rahu Kaal, and Abhijit Muhurat for determining auspicious beginnings."}
          </p>
        </div>

        {panchang && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Quick summary top cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-orange-100 shadow-sm flex items-center gap-3">
                <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400">Date &amp; Day</span>
                  <div className="text-sm font-black text-neutral-900">{panchang.date}</div>
                  <div className="text-xs text-orange-600 font-semibold">{panchang.day}</div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-orange-100 shadow-sm flex items-center gap-3">
                <div className="p-3 rounded-xl bg-amber-100 text-amber-600">
                  <Sunrise className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400">Sunrise</span>
                  <div className="text-sm font-black text-neutral-900">{panchang.sunrise}</div>
                  <div className="text-xs text-neutral-500">Sunset: {panchang.sunset}</div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-orange-100 shadow-sm flex items-center gap-3">
                <div className="p-3 rounded-xl bg-rose-100 text-rose-600">
                  <AlertOctagon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-rose-500">Rahu Kaal (Avoid)</span>
                  <div className="text-xs font-black text-rose-700">{panchang.rahuKaal}</div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-orange-100 shadow-sm flex items-center gap-3">
                <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-600">Abhijit Muhurat</span>
                  <div className="text-xs font-black text-emerald-800">{panchang.abhijitMuhurat}</div>
                </div>
              </div>
            </div>

            {/* Detailed Panchang 5 Limbs Table */}
            <div className="bg-white rounded-3xl border border-orange-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-base font-bold text-neutral-900 mb-6 pb-2 border-b border-orange-100 flex items-center justify-between">
                <span>The 5 Vedic Limbs of Time (Pancha-Anga)</span>
                <span className="text-xs text-orange-600 font-semibold">{panchang.paksha}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-4">
                  <div className="flex justify-between p-3.5 bg-neutral-50 rounded-xl">
                    <span className="font-semibold text-neutral-600">Tithi</span>
                    <span className="font-bold text-neutral-900">{panchang.tithi}</span>
                  </div>
                  <div className="flex justify-between p-3.5 bg-neutral-50 rounded-xl">
                    <span className="font-semibold text-neutral-600">Nakshatra</span>
                    <span className="font-bold text-neutral-900">{panchang.nakshatra}</span>
                  </div>
                  <div className="flex justify-between p-3.5 bg-neutral-50 rounded-xl">
                    <span className="font-semibold text-neutral-600">Yoga</span>
                    <span className="font-bold text-neutral-900">{panchang.yoga}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between p-3.5 bg-neutral-50 rounded-xl">
                    <span className="font-semibold text-neutral-600">Karana</span>
                    <span className="font-bold text-neutral-900">{panchang.karana}</span>
                  </div>
                  <div className="flex justify-between p-3.5 bg-neutral-50 rounded-xl">
                    <span className="font-semibold text-neutral-600">Gulika Kaal</span>
                    <span className="font-bold text-neutral-900">{panchang.gulikaKaal}</span>
                  </div>
                  <div className="flex justify-between p-3.5 bg-neutral-50 rounded-xl">
                    <span className="font-semibold text-neutral-600">Yamaganda</span>
                    <span className="font-bold text-neutral-900">{panchang.yamaganda}</span>
                  </div>
                </div>
              </div>

              {/* Special Day Note */}
              <div className="mt-6 p-4 rounded-2xl bg-orange-50/70 border border-orange-200/80 text-xs text-orange-900 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-orange-600 flex-shrink-0" />
                <div>
                  <strong>Today&apos;s Special Observance:</strong> {panchang.specialDay}. Ideal for chanting Surya and Shiva mantras during morning hours.
                </div>
              </div>
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
