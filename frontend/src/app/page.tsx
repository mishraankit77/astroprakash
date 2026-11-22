"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AstrologerCard, AstrologerData } from "@/components/AstrologerCard";
import { WalletModal } from "@/components/WalletModal";
import { ConsultationModal } from "@/components/ConsultationModal";
import { AuthModal } from "@/components/AuthModal";
import { useLanguage } from "@/context/LanguageContext";
import {
  MessageSquare,
  PhoneCall,
  Sparkles,
  Compass,
  HeartHandshake,
  SunMedium,
  ShoppingBag,
  Star,
  CheckCircle2,
  Users,
  ShieldCheck,
  Award,
  Clock,
  ArrowRight,
  Flame,
  Search,
  Sparkle,
  Phone,
  Zap,
} from "lucide-react";

export default function HomePage() {
  const { language, t } = useLanguage();
  const [astrologers, setAstrologers] = useState<AstrologerData[]>([]);
  const [loadingAstro, setLoadingAstro] = useState(true);
  const [walletOpen, setWalletOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(100);
  const [selectedAstro, setSelectedAstro] = useState<AstrologerData | null>(null);
  const [consultType, setConsultType] = useState<"chat" | "call">("chat");
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/astrologers");
        if (res.ok) {
          const data = await res.json();
          setAstrologers(data.astrologers);
        }
      } catch (e) {
        console.error("Using fallback astrologers:", e);
      } finally {
        setLoadingAstro(false);
      }
    }
    loadData();
  }, []);

  const handleSelectAstro = (astro: AstrologerData, type: "chat" | "call") => {
    setSelectedAstro(astro);
    setConsultType(type);
    setConsultModalOpen(true);
  };

  const categories = [
    {
      name: language === "hi" ? "ज्योतिषी से चैट" : "Chat with Astrologer",
      href: "/chat-with-astrologer",
      icon: MessageSquare,
      color: "text-orange-600 bg-orange-100",
      desc: language === "hi" ? "पहली चैट FREE" : "First Chat FREE"
    },
    {
      name: language === "hi" ? "ज्योतिषी से बात" : "Talk to Astrologer",
      href: "/talk-to-astrologer",
      icon: PhoneCall,
      color: "text-amber-700 bg-amber-100",
      desc: language === "hi" ? "लाइव ऑडियो कॉल" : "Direct Voice Call"
    },
    {
      name: language === "hi" ? "प्रकाश AI ज्योतिषी" : "Prakash AI Astrologer",
      href: "/ai-astrologer",
      icon: Sparkles,
      color: "text-orange-700 bg-orange-200",
      desc: language === "hi" ? "24x7 वैदिक AI" : "24x7 Vedic AI"
    },
    {
      name: language === "hi" ? "मुफ्त जन्म कुंडली" : "Free Janam Kundli",
      href: "/free-kundli",
      icon: Compass,
      color: "text-rose-700 bg-rose-100",
      desc: language === "hi" ? "विस्तृत D-1 चक्र" : "Detailed D-1 Chart"
    },
    {
      name: language === "hi" ? "कुंडली मिलान" : "Kundli Matching",
      href: "/kundli-matching",
      icon: HeartHandshake,
      color: "text-pink-700 bg-pink-100",
      desc: language === "hi" ? "36 गुण मिलान" : "36 Gunas Milan"
    },
    {
      name: language === "hi" ? "दैनिक राशिफल" : "Daily Horoscopes",
      href: "/horoscopes",
      icon: SunMedium,
      color: "text-amber-700 bg-amber-100",
      desc: language === "hi" ? "सभी 12 राशियां" : "All 12 Zodiacs"
    },
    {
      name: language === "hi" ? "आज का पंचांग" : "Today's Panchang",
      href: "/panchang",
      icon: Clock,
      color: "text-teal-700 bg-teal-100",
      desc: language === "hi" ? "शुभ मुहूर्त" : "Shubh Muhurat"
    },
    {
      name: language === "hi" ? "एस्ट्रोमॉल एवं पूजा" : "AstroMall & Pooja",
      href: "/astromall",
      icon: ShoppingBag,
      color: "text-indigo-700 bg-indigo-100",
      desc: language === "hi" ? "प्रमाणित रत्न" : "Certified Gems"
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col text-neutral-800">
      <Navbar
        onOpenWallet={() => setWalletOpen(true)}
        walletBalance={walletBalance}
      />

      <main className="flex-1">
        {/* Astrotalk-grade Hero Section with Warm Saffron & Ivory Palette */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF7ED] via-[#FFFBF5] to-white py-12 md:py-20 border-b border-orange-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto space-y-5">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-orange-200/80 shadow-xs text-xs font-bold text-orange-800">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{language === "hi" ? "1,420+ प्रमाणित ज्योतिषी ऑनलाइन" : "1,420+ Verified Astrologers Live"}</span>
                <span className="text-orange-300">•</span>
                <span className="text-orange-600">
                  {language === "hi" ? "500k+ साधकों द्वारा 4.96/5 ★ रेटिंग" : "Rated 4.96/5 ★ by 500k+ Seekers"}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-neutral-900 leading-tight">
                {language === "hi" ? (
                  <>
                    प्राचीन वैदिक ज्ञान,{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500">
                      AI द्वारा प्रकाशित
                    </span>
                  </>
                ) : (
                  <>
                    Ancient Vedic Wisdom,{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500">
                      Illuminated by AI
                    </span>
                  </>
                )}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto font-normal leading-relaxed">
                {language === "hi"
                  ? "भारत के प्रतिष्ठित आचार्यों एवं प्रकाश AI से करियर, विवाह, साढ़े साती, कुंडली दोष एवं व्यापार पर शास्त्रोक्त मार्गदर्शन प्राप्त करें।"
                  : "Connect with India's most revered Acharyas and our specialized Prakash AI for precise clarity on Career promotions, Marriage timing, Kundli Doshas & Wealth."}
              </p>

              {/* Astrotalk Interactive Search Bar */}
              <div className="max-w-xl mx-auto pt-2">
                <div className="relative flex items-center shadow-lg shadow-orange-500/5 rounded-2xl border border-orange-200 bg-white p-1.5 focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500 transition-all">
                  <Search className="w-5 h-5 text-orange-400 ml-3 mr-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={language === "hi" ? "ज्योतिषी का नाम, समस्या (नौकरी, विवाह, साढ़े साती, कुंडली) खोजें..." : "Search by name, problem (Job, Marriage, Sade Sati, Kundli)..."}
                    className="w-full text-sm text-neutral-800 placeholder-neutral-400 bg-transparent focus:outline-none py-2"
                  />
                  <Link
                    href={`/chat-with-astrologer?search=${encodeURIComponent(searchQuery)}`}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-colors flex-shrink-0"
                  >
                    {language === "hi" ? "परामर्श लें" : "Consult"}
                  </Link>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <Link
                  href="/chat-with-astrologer"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md shadow-orange-500/25 transition-all hover:scale-102"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{language === "hi" ? "ज्योतिषी से चैट करें (पहली चैट FREE)" : "Chat with Astrologer (FREE 1st Chat)"}</span>
                </Link>

                <Link
                  href="/ai-astrologer"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-md shadow-amber-500/20 transition-all hover:scale-102"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{language === "hi" ? "प्रकाश AI से पूछें (24x7)" : "Ask Prakash AI Instant"}</span>
                </Link>

                <Link
                  href="/free-kundli"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-orange-50 text-neutral-800 border border-orange-200 font-bold text-sm transition-all"
                >
                  <Compass className="w-4 h-4 text-orange-500" />
                  <span>{language === "hi" ? "मुफ्त जन्म कुंडली बनाएं" : "Free Janam Kundli"}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Category Icons Bar (Astrotalk Grid) */}
        <section className="py-8 bg-white border-b border-orange-100 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {categories.map((c) => {
                const Icon = c.icon;
                return (
                  <Link
                    key={c.name}
                    href={c.href}
                    className="flex flex-col items-center text-center p-3 rounded-2xl hover:bg-orange-50/80 transition-all group border border-transparent hover:border-orange-100"
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2 shadow-xs group-hover:scale-110 transition-transform ${c.color}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-neutral-800 group-hover:text-orange-600 transition-colors leading-tight">
                      {c.name}
                    </span>
                    <span className="text-[10px] text-orange-600 font-semibold mt-0.5">
                      {c.desc}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Live Astrologers Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">
                <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
                <span>{language === "hi" ? "अभी ऑनलाइन उपलब्ध" : "Available Online Right Now"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900">
                {language === "hi" ? "भारत के शीर्ष वैदिक विद्वानों से परामर्श लें" : "Consult India's Top Astrologers"}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                {language === "hi" ? "सत्यापित ज्योतिषाचार्य, टैरो रीडर्स एवं अंकशास्त्री आपके मार्गदर्शन हेतु तत्पर हैं।" : "Verified Vedic Acharyas, Tarot Masters & Numerologists ready to guide you."}
              </p>
            </div>

            <Link
              href="/chat-with-astrologer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 px-4 py-2 rounded-xl border border-orange-200 self-start sm:self-auto hover:bg-orange-100 transition-colors"
            >
              <span>{language === "hi" ? "सभी 1,420+ ज्योतिषी देखें" : "View All 1,420+ Astrologers"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {astrologers.map((astro) => (
              <AstrologerCard
                key={astro.id}
                astrologer={astro}
                onSelect={handleSelectAstro}
              />
            ))}
          </div>
        </section>

        {/* Prakash AI Highlight Feature */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="rounded-3xl bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 text-white p-6 sm:p-10 shadow-xl shadow-orange-500/15 relative overflow-hidden">
            <div className="max-w-2xl space-y-4 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-orange-100 uppercase tracking-wider">
                <Sparkle className="w-3.5 h-3.5 text-yellow-300" />
                {language === "hi" ? "अत्याधुनिक वैदिक AI तकनीक" : "Next-Gen Astrological AI"}
              </div>
              <h2 className="text-2xl sm:text-4xl font-black leading-tight">
                {language === "hi" ? "प्रकाश AI: शास्त्रीय वैदिक गणना एवं तत्काल समाधान" : "Prakash AI: Classical Vedic Reasoning for Immediate Clarity"}
              </h2>
              <p className="text-sm sm:text-base text-orange-100 leading-relaxed font-normal">
                {language === "hi"
                  ? "वृहत् पराशर होरा शास्त्र, जैमिनी सूत्र एवं नवग्रह पंचांग पर प्रशिक्षित। अपनी जन्म तिथि दर्ज करें और तुरंत शास्त्र सम्मत भविष्यवाणियां एवं सटीक वैदिक उपाय प्राप्त करें।"
                  : "Trained on Brihat Parashara Hora Shastra, Jaimini Sutras, and Navagraha Ephemeris. Input your birth details and get non-generic, mathematically computed astrological forecasts with authentic Sanskrit mantras and Lal Kitab remedies."}
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/ai-astrologer"
                  className="px-6 py-3 rounded-xl bg-white text-orange-700 font-black text-xs sm:text-sm shadow-md hover:bg-orange-50 transition-all flex items-center gap-2"
                >
                  <span>{language === "hi" ? "प्रकाश AI से अभी पूछें (24x7)" : "Ask Prakash AI Now (24x7)"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/free-kundli"
                  className="px-5 py-3 rounded-xl bg-orange-700/60 hover:bg-orange-700/80 text-white font-bold text-xs sm:text-sm transition-all"
                >
                  {language === "hi" ? "मुफ्त कुंडली बनाएं" : "Generate Free Kundli"}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Astrotalk Trust Proof Section */}
        <section className="bg-gradient-to-b from-white via-orange-50/20 to-white py-16 border-t border-b border-orange-100 my-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">
                {language === "hi" ? "हमारा पावन संकल्प" : "Our Sacred Commitment"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 mt-1">
                {language === "hi" ? "लाखों भक्त एस्ट्रोप्रकाश पर क्यों विश्वास करते हैं?" : "Why Millions Trust AstroPrakash"}
              </h2>
              <p className="text-xs text-neutral-500 mt-2">
                {language === "hi" ? "प्राचीन गुरु-शिष्य परंपरा की शुद्धता के साथ आधुनिक तकनीक और 100% गोपनीयता का संगम।" : "We combine the purity of ancient Guru-Shishya tradition with stringent verification and modern technology."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-orange-100 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-neutral-900 mb-1.5">
                  {language === "hi" ? "100% प्रमाणित ज्योतिषी" : "100% Verified Astrologers"}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {language === "hi" ? "केवल 50 में से 1 ज्योतिषी हमारे कठिन 4-स्तरीय वैदिक ज्ञान एवं अनुभव परीक्षण में उत्तीर्ण होता है।" : "Only 1 out of 50 applicants qualifies our rigorous 4-round Vedic scholarship and predictive evaluation."}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-orange-100 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-neutral-900 mb-1.5">
                  {language === "hi" ? "संतुष्टि गारंटी" : "Satisfaction Guaranteed"}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {language === "hi" ? "यदि आप परामर्श से संतुष्ट नहीं हैं, तो हमारी सहायता टीम तुरंत आपके वॉलेट में रिफंड प्रदान करती है।" : "If you are ever unsatisfied with the depth or clarity of your consultation, our support team refunds your wallet immediately."}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-orange-100 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-neutral-900 mb-1.5">
                  {language === "hi" ? "प्रकाश AI नवाचार" : "Prakash AI Innovation"}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {language === "hi" ? "कुंडली, दशा एवं दोषों की 24/7 त्वरित एवं गोपनीय गणना बिना किसी प्रतीक्षा के प्राप्त करें।" : "Get fast, confidential, 24/7 calculations for Kundli, Doshas, and transits without waiting."}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-orange-100 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-neutral-900 mb-1.5">
                  {language === "hi" ? "पूर्ण गोपनीयता व सुरक्षा" : "Total Privacy & Anonymity"}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {language === "hi" ? "आपके जन्म विवरण, मोबाइल नंबर और सभी बातचीत पूर्णतः सुरक्षित एवं एन्क्रिप्टेड रहती हैं।" : "All personal details, queries, and astrological charts are end-to-end secured and never shared with third parties."}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Wallet Modal */}
      <WalletModal
        isOpen={walletOpen}
        onClose={() => setWalletOpen(false)}
        currentBalance={walletBalance}
        onRecharge={(added) => setWalletBalance(walletBalance + added)}
      />

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={consultModalOpen}
        onClose={() => setConsultModalOpen(false)}
        astrologer={selectedAstro}
        consultationType={consultType}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(user) => setWalletBalance(user.walletBalance || 100)}
      />

      <Footer />
    </div>
  );
}
