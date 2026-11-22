"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AstrologerCard, AstrologerData } from "@/components/AstrologerCard";
import { ConsultationModal } from "@/components/ConsultationModal";
import { WalletModal } from "@/components/WalletModal";
import { useLanguage } from "@/context/LanguageContext";
import { Search, Filter, Sparkles, MessageSquare, Flame } from "lucide-react";

export default function ChatWithAstrologerPage() {
  const { language, t } = useLanguage();
  const [astrologers, setAstrologers] = useState<AstrologerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedAstro, setSelectedAstro] = useState<AstrologerData | null>(null);
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(100);

  useEffect(() => {
    async function fetchAstrologers() {
      try {
        const queryParams = new URLSearchParams();
        if (category !== "all") queryParams.append("category", category);
        if (onlineOnly) queryParams.append("onlineOnly", "true");
        if (search) queryParams.append("search", search);

        const res = await fetch(`http://127.0.0.1:8000/api/astrologers?${queryParams.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setAstrologers(data.astrologers);
        }
      } catch (err) {
        console.error("Failed to load astrologers:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAstrologers();
  }, [category, onlineOnly, search]);

  const categories = ["all", "Vedic", "Tarot", "Numerology"];

  const handleSelect = (astro: AstrologerData, type: "chat" | "call") => {
    setSelectedAstro(astro);
    setConsultModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col text-neutral-800">
      <Navbar onOpenWallet={() => setWalletOpen(true)} walletBalance={walletBalance} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-lg shadow-orange-500/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-orange-100 uppercase tracking-wider mb-1">
              <Flame className="w-4 h-4 fill-orange-200 text-orange-200" />
              <span>{language === "hi" ? "त्वरित वैदिक मार्गदर्शन" : "Instant Vedic Guidance"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              {language === "hi" ? "भारत के शीर्ष ज्योतिषियों से चैट करें" : "Chat with India's Best Astrologers"}
            </h1>
            <p className="text-sm text-orange-100 mt-1 max-w-xl">
              {language === "hi"
                ? "100% गोपनीय एवं सुरक्षित चैट। प्रेम, करियर, विवाह, साढ़े साती एवं कुंडली दोष पर तुरंत मार्गदर्शन प्राप्त करें।"
                : "100% Confidential text chat with verified Acharyas. Get answers for Love, Career, Kundli Doshas & Marriage."}
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/30 text-center flex-shrink-0">
            <span className="text-[11px] font-bold text-orange-100 block">
              {language === "hi" ? "आपके लिए विशेष उपहार" : "Offer for You"}
            </span>
            <span className="text-sm font-black text-white">
              🎁 {language === "hi" ? "पहली चैट 100% FREE" : "First Chat FREE"}
            </span>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="bg-white rounded-2xl p-4 border border-orange-100 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                  category === c
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                    : "bg-neutral-100 text-neutral-700 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                {c === "all"
                  ? (language === "hi" ? "सभी ज्योतिषी" : "All Astrologers")
                  : c === "Vedic"
                  ? (language === "hi" ? "वैदिक ज्योतिषी" : "Vedic")
                  : c === "Tarot"
                  ? (language === "hi" ? "टैरो रीडर्स" : "Tarot")
                  : (language === "hi" ? "अंकशास्त्री" : "Numerology")}
              </button>
            ))}

            <button
              onClick={() => setOnlineOnly(!onlineOnly)}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                onlineOnly
                  ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                  : "bg-white border-neutral-200 text-neutral-600 hover:border-orange-200"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${onlineOnly ? "bg-emerald-500 animate-pulse" : "bg-neutral-400"}`} />
              <span>{language === "hi" ? "केवल ऑनलाइन" : "Online Only"}</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={language === "hi" ? "ज्योतिषी खोजें..." : "Search astrologer..."}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Astrologers Grid */}
        {loading ? (
          <div className="text-center py-20 text-orange-500 font-bold">
            <span className="animate-spin inline-block w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full mb-3" />
            <p className="text-sm text-neutral-600">Connecting to verified astrologers...</p>
          </div>
        ) : astrologers.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-orange-100 max-w-md mx-auto my-12">
            <p className="text-sm font-bold text-neutral-700">No astrologers found matching your filter.</p>
            <button
              onClick={() => { setCategory("all"); setOnlineOnly(false); setSearch(""); }}
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-xl text-xs font-bold hover:bg-orange-600"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {astrologers.map((astro) => (
              <AstrologerCard key={astro.id} astrologer={astro} onSelect={handleSelect} />
            ))}
          </div>
        )}
      </main>

      <ConsultationModal
        isOpen={consultModalOpen}
        onClose={() => setConsultModalOpen(false)}
        astrologer={selectedAstro}
        consultationType="chat"
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
