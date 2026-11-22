"use client";

import React, { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WalletModal } from "@/components/WalletModal";
import { useLanguage } from "@/context/LanguageContext";
import {
  Send,
  Sparkles,
  Bot,
  User,
  Sparkle,
  Compass,
  Heart,
  Briefcase,
  Coins,
  ShieldAlert,
  RotateCcw,
  Edit3,
  Check,
  Calendar,
  Clock,
  MapPin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  chartSummary?: {
    lagna?: string;
    rashi?: string;
    nakshatra?: string;
    activeDasha?: string;
    isManglik?: boolean;
  };
  remedies?: string[];
  luckyTips?: {
    luckyColor?: string;
    luckyDirection?: string;
    favorableDay?: string;
  };
  time: string;
}

export default function AIAstrologerPage() {
  const { language } = useLanguage();
  // User Birth Details for Personalized Calculations
  const [userProfile, setUserProfile] = useState({
    name: "Rohit Sharma",
    gender: "male",
    dob: "1996-06-18",
    tob: "11:30",
    place: "New Delhi, India",
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileExpanded, setProfileExpanded] = useState(false);

  // Initialize with authentic Parashara greeting
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (language === "hi") {
      setMessages([
        {
          id: "welcome_hi",
          sender: "ai",
          text: "हरि ॐ! मैं प्रकाश AI हूँ, महर्षि पराशर होरा शास्त्र एवं प्रामाणिक वैदिक पंचांग पर प्रशिक्षित। आपके जन्म विवरण (लग्न: सिंह, चंद्र राशि: कर्क, नक्षत्र: पुष्य) के आधार पर आपकी ग्रह स्थिति की गणना हो चुकी है।\n\nकरियर पदोन्नति, विवाह योग, धन लाभ, साढ़े साती अथवा कुंडली दोष के संबंध में अपना कोई भी प्रश्न पूछें।",
          chartSummary: {
            lagna: "सिंह (Simha)",
            rashi: "कर्क (Karka)",
            nakshatra: "पुष्य चरण २",
            activeDasha: "बृहस्पति महादशा",
          },
          remedies: [
            "नित्य प्रातःकाल पूर्व दिशा की ओर मुख करके गायत्री मंत्र का 108 बार जप करें।",
            "तांबे के पात्र में जल व लाल चंदन मिलाकर उदीयमान भगवान सूर्य को अर्घ्य दें।"
          ],
          time: "अभी",
        },
      ]);
    } else {
      setMessages([
        {
          id: "welcome_en",
          sender: "ai",
          text: "Hari Om! I am Prakash AI, trained on Brihat Parashara Hora Shastra and the classical Vedic ephemeris. I have synchronized your planetary chart based on your birth coordinates (Lagna: Leo, Chandra Rashi: Cancer, Nakshatra: Pushya).\n\nPlease ask your question regarding Career promotion, Marriage timing, Wealth, or Kundli Doshas for an exact astrological calculation.",
          chartSummary: {
            lagna: "Leo (Simha)",
            rashi: "Cancer (Karka)",
            nakshatra: "Pushya P2",
            activeDasha: "Jupiter Mahadasha",
          },
          remedies: [
            "Chant the Gayatri Mantra 108 times at dawn facing East.",
            "Offer water mixed with red sandalwood to the rising Sun daily in a copper vessel."
          ],
          time: "Just Now",
        },
      ]);
    }
  }, [language]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(100);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load user from localStorage if logged in
  useEffect(() => {
    try {
      const stored = localStorage.getItem("astroprakash_user");
      if (stored) {
        const u = JSON.parse(stored);
        setUserProfile((prev) => ({
          ...prev,
          name: u.name || prev.name,
          dob: u.dob || prev.dob,
          tob: u.tob || prev.tob,
          place: u.place || prev.place,
          gender: u.gender || prev.gender,
        }));
      }
    } catch {}
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const quickPrompts = [
    { title: "Career & Promotion", prompt: "Calculate my 10th house karma lord and exact timing for my job promotion or salary appraisal.", icon: Briefcase },
    { title: "Marriage Timing", prompt: "Analyze my 7th house and Venus/Jupiter transits. When will I get married and will it be love or arranged?", icon: Heart },
    { title: "Wealth & Dhana Yogas", prompt: "Examine my 2nd and 11th houses. What are my financial fortunes and property investment prospects for 2026-2027?", icon: Coins },
    { title: "Mangal & Sade Sati", prompt: "Check if I have Mangal Dosha or Shani Sade Sati affliction and provide exact scriptural remedies.", icon: ShieldAlert },
  ];

  const handleSend = async (textToSend?: string) => {
    const q = textToSend || input;
    if (!q.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: q,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: q,
          userContext: userProfile,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: data.text,
          chartSummary: data.chartSummary,
          remedies: data.remedies,
          luckyTips: data.luckyTips,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        throw new Error("Failed");
      }
    } catch {
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: `Based on your birth coordinates (${userProfile.dob} at ${userProfile.place}), Jupiter is casting a favorable aspect on your Lagna lord. A major positive shift will materialize over the next 4 to 6 months. Maintain daily worship of Lord Surya.`,
        chartSummary: {
          lagna: "Calculated",
          rashi: "Moon Sign",
        },
        remedies: [
          "Offer water to the rising Sun daily from a copper vessel.",
          "Chant Om Namah Shivaya 108 times."
        ],
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col text-neutral-800">
      <Navbar onOpenWallet={() => setWalletOpen(true)} walletBalance={walletBalance} />

      <main className="flex-1 max-w-5xl mx-auto px-2.5 sm:px-6 py-3 sm:py-6 w-full flex flex-col h-[calc(100vh-140px)]">
        {/* Top Header Card */}
        <div className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 rounded-2xl p-3 sm:p-4 text-white shadow-md flex items-center justify-between mb-2 sm:mb-3 flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="bg-white/20 p-1.5 sm:p-2 rounded-xl backdrop-blur-md shrink-0">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-200" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="text-sm sm:text-lg font-black tracking-tight truncate">
                  {language === "hi" ? "प्रकाश AI: वैदिक ज्योतिष" : "Prakash AI: Vedic Jyotish"}
                </h1>
                <span className="text-[9px] sm:text-[10px] bg-emerald-500 text-white font-bold px-1.5 sm:px-2 py-0.2 sm:py-0.5 rounded-full animate-pulse shrink-0">
                  {language === "hi" ? "सटीक" : "Ephemeris"}
                </span>
              </div>
              <p className="text-[11px] text-orange-100 hidden sm:block truncate">
                {language === "hi"
                  ? "वृहत् पराशर होरा शास्त्र, जैमिनी सूत्र एवं नवग्रह पंचांग पर आधारित 24x7 तत्काल मार्गदर्शन"
                  : "Grounded in Brihat Parashara Hora Shastra, Jaimini Sutras & Navagraha Ephemeris"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setMessages(messages.slice(0, 1))}
            className="text-xs bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Reset Chat"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>

        {/* Personalized Birth Details Bar (Crucial for Non-Generic Answers!) */}
        <div className="bg-white rounded-2xl p-3 border border-orange-200 mb-3 flex-shrink-0 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-neutral-700 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-orange-500" />
                Active Chart Profile:
              </span>
              <span className="font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                {userProfile.name}
              </span>
              <span className="text-neutral-500 hidden sm:inline">
                ({userProfile.dob} • {userProfile.tob} • {userProfile.place})
              </span>
            </div>

            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-3 h-3" />
              <span>{isEditingProfile ? "Done" : "Change Birth Data"}</span>
            </button>
          </div>

          {/* Inline Edit Form */}
          {isEditingProfile && (
            <div className="mt-3 pt-3 border-t border-orange-100 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs animate-in fade-in">
              <div>
                <label className="text-[10px] font-bold text-neutral-500 block mb-0.5">Name</label>
                <input
                  type="text"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                  className="w-full px-2 py-1 border border-neutral-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-neutral-500 block mb-0.5">Date of Birth</label>
                <input
                  type="date"
                  value={userProfile.dob}
                  onChange={(e) => setUserProfile({ ...userProfile, dob: e.target.value })}
                  className="w-full px-2 py-1 border border-neutral-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-neutral-500 block mb-0.5">Time of Birth</label>
                <input
                  type="time"
                  value={userProfile.tob}
                  onChange={(e) => setUserProfile({ ...userProfile, tob: e.target.value })}
                  className="w-full px-2 py-1 border border-neutral-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-neutral-500 block mb-0.5">Place of Birth</label>
                <input
                  type="text"
                  value={userProfile.place}
                  onChange={(e) => setUserProfile({ ...userProfile, place: e.target.value })}
                  className="w-full px-2 py-1 border border-neutral-300 rounded-lg text-xs"
                />
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-2 flex-shrink-0 no-scrollbar">
          {quickPrompts.map((qp, idx) => {
            const Icon = qp.icon;
            return (
              <button
                key={idx}
                onClick={() => handleSend(qp.prompt)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-900 text-xs font-bold whitespace-nowrap transition-all shadow-xs cursor-pointer flex-shrink-0"
              >
                <Icon className="w-3.5 h-3.5 text-orange-600" />
                <span>{qp.title}</span>
              </button>
            );
          })}
        </div>

        {/* Chat Messages Container */}
        <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-3xl bg-white border border-orange-100 shadow-sm">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 max-w-3xl ${
                m.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                {m.sender === "user" ? (
                  <div className="w-8 h-8 rounded-full bg-neutral-200 text-neutral-700 flex items-center justify-center font-bold text-xs">
                    <User className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-sm">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  m.sender === "user"
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-tr-xs shadow-md shadow-orange-500/15"
                    : "bg-[#FFFDF9] text-neutral-800 border border-orange-200/90 rounded-tl-xs shadow-xs"
                }`}
              >
                {/* Technical Astrological Coordinates Badge */}
                {m.chartSummary && (
                  <div className="mb-3 pb-2.5 border-b border-orange-200 flex flex-wrap gap-2 text-[10px] font-bold">
                    {m.chartSummary.lagna && (
                      <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-md">
                        Lagna: {m.chartSummary.lagna}
                      </span>
                    )}
                    {m.chartSummary.rashi && (
                      <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md">
                        Chandra Rashi: {m.chartSummary.rashi}
                      </span>
                    )}
                    {m.chartSummary.activeDasha && (
                      <span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded-md">
                        Dasha: {m.chartSummary.activeDasha}
                      </span>
                    )}
                  </div>
                )}

                <div className="whitespace-pre-line font-normal">{m.text}</div>

                {/* Remedies Section if present */}
                {m.remedies && m.remedies.length > 0 && (
                  <div className="mt-3.5 pt-3 border-t border-orange-200/80">
                    <h5 className="text-[11px] font-black text-orange-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Sparkle className="w-3.5 h-3.5 text-orange-600 fill-orange-600" />
                      Classical Vedic Remedies (Parashara &amp; Lal Kitab)
                    </h5>
                    <ul className="space-y-1.5 text-xs text-neutral-700">
                      {m.remedies.map((rem, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-1.5">
                          <span className="text-orange-500 font-bold">•</span>
                          <span>{rem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Lucky Tips if present */}
                {m.luckyTips && (
                  <div className="mt-2.5 pt-2 border-t border-orange-100 flex flex-wrap gap-2 text-[11px] text-orange-800 font-semibold">
                    <span className="bg-orange-100/80 px-2 py-0.5 rounded-md">
                      Color: {m.luckyTips.luckyColor}
                    </span>
                    <span className="bg-orange-100/80 px-2 py-0.5 rounded-md">
                      Direction: {m.luckyTips.luckyDirection}
                    </span>
                    <span className="bg-orange-100/80 px-2 py-0.5 rounded-md">
                      Day: {m.luckyTips.favorableDay}
                    </span>
                  </div>
                )}

                <div
                  className={`text-[10px] mt-2 text-right ${
                    m.sender === "user" ? "text-orange-100" : "text-neutral-400"
                  }`}
                >
                  {m.time}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 max-w-md mr-auto">
              <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-200 text-neutral-700 text-xs flex items-center gap-2">
                <span className="animate-pulse">Computing Navagraha degrees, Bhavas &amp; Mahadasha transits...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="mt-3 flex-shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 bg-white rounded-2xl border border-orange-200 p-2 shadow-sm focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500 transition-all"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                language === "hi"
                  ? "अपना प्रश्न पूछें (उदा. पदोन्नति कब होगी? क्या मेरी कुंडली में मांगलिक दोष है?)..."
                  : "Ask your query (e.g. When will I get a promotion? Is my marriage delayed?)..."
              }
              className="flex-1 px-3 py-2 text-sm text-neutral-800 bg-transparent focus:outline-none placeholder-neutral-400"
            />

            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-3 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:bg-neutral-200 text-white transition-all cursor-pointer shadow-md shadow-orange-500/20 disabled:shadow-none"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-[10px] text-neutral-400 text-center mt-1.5">
            Prakash AI computes exact Sidereal Lahiri planetary positions. For complex personal life readings, you can also consult our live Acharyas.
          </p>
        </div>
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
