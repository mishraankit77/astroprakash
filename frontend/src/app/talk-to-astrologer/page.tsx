"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AstrologerCard, AstrologerData } from "@/components/AstrologerCard";
import { ConsultationModal } from "@/components/ConsultationModal";
import { WalletModal } from "@/components/WalletModal";
import { useLanguage } from "@/context/LanguageContext";
import { PhoneCall, ShieldCheck, Zap, Headphones, Search } from "lucide-react";

export default function TalkToAstrologerPage() {
  const { language } = useLanguage();
  const [astrologers, setAstrologers] = useState<AstrologerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [selectedAstro, setSelectedAstro] = useState<AstrologerData | null>(null);
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(100);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/astrologers");
        if (res.ok) {
          const data = await res.json();
          setAstrologers(data.astrologers);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSelect = (astro: AstrologerData, type: "chat" | "call") => {
    setSelectedAstro(astro);
    setConsultModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col text-neutral-800">
      <Navbar onOpenWallet={() => setWalletOpen(true)} walletBalance={walletBalance} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Banner */}
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-lg shadow-orange-500/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-orange-100 uppercase tracking-wider mb-1">
              <PhoneCall className="w-4 h-4 text-orange-200" />
              <span>{language === "hi" ? "सीधे फोन पर बात करें" : "Direct Audio Consultation"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              {language === "hi" ? "प्रमाणित वैदिक ज्योतिषियों से लाइव कॉल पर बात करें" : "Talk to Astrologer Live on Call"}
            </h1>
            <p className="text-sm text-orange-100 mt-1 max-w-xl">
              {language === "hi"
                ? "100% गोपनीय व सुरक्षित ऑडियो कॉल। विद्वान ज्योतिषियों से सीधे अपनी कुंडली पर चर्चा करें।"
                : "Connect via high-definition private audio call. Speak directly with renowned Astrologers for detailed Kundli discussions."}
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/30 text-center flex-shrink-0">
            <span className="text-[11px] font-bold text-orange-100 block">
              {language === "hi" ? "विशेष स्वागत उपहार" : "Introductory Perk"}
            </span>
            <span className="text-sm font-black text-white">
              🎁 {language === "hi" ? "पहली कॉल पर 50% छूट" : "Special 50% Off First Call"}
            </span>
          </div>
        </div>

        {/* Benefits bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-2xl border border-orange-100 flex items-center gap-3">
            <div className="p-2.5 bg-orange-100 text-orange-600 rounded-xl">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-neutral-900">Crystal Clear Audio</h4>
              <p className="text-[11px] text-neutral-500">Zero latency direct calling</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-orange-100 flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 text-amber-600 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-neutral-900">100% Private Phone Number</h4>
              <p className="text-[11px] text-neutral-500">Your number is masked &amp; hidden</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-orange-100 flex items-center gap-3">
            <div className="p-2.5 bg-orange-100 text-orange-600 rounded-xl">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-neutral-900">Instant Connection</h4>
              <p className="text-[11px] text-neutral-500">Connect in less than 30 seconds</p>
            </div>
          </div>
        </div>

        {/* Astrologers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {astrologers.map((astro) => (
            <AstrologerCard key={astro.id} astrologer={astro} onSelect={handleSelect} />
          ))}
        </div>
      </main>

      <ConsultationModal
        isOpen={consultModalOpen}
        onClose={() => setConsultModalOpen(false)}
        astrologer={selectedAstro}
        consultationType="call"
      />

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
