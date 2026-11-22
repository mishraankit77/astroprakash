"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { KundliChart } from "@/components/KundliChart";
import { WalletModal } from "@/components/WalletModal";
import { useLanguage } from "@/context/LanguageContext";
import {
  Compass,
  User,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Printer,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function FreeKundliPage() {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "Rohit Sharma",
    gender: "male",
    dob: "1995-08-15",
    tob: "14:30",
    place: "New Delhi, India",
  });

  const [loading, setLoading] = useState(false);
  const [kundliResult, setKundliResult] = useState<any>(null);
  const [walletOpen, setWalletOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(100);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/kundli/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        setKundliResult(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col text-neutral-800">
      <Navbar onOpenWallet={() => setWalletOpen(true)} walletBalance={walletBalance} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Banner */}
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-lg shadow-orange-500/10">
          <div className="flex items-center gap-2 text-xs font-bold text-orange-100 uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4 text-orange-200" />
            <span>{language === "hi" ? "प्रामाणिक वैदिक जन्मपत्री कैलकुलेटर" : "Vedic Janampatri Calculator"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">{t("kundliTitle")}</h1>
          <p className="text-sm text-orange-100 mt-1 max-w-2xl leading-relaxed">
            {t("kundliSubtitle")}
          </p>
        </div>

        {/* Input Form Card */}
        <div className="bg-white rounded-3xl border border-orange-100 p-6 sm:p-8 shadow-sm mb-10 max-w-3xl mx-auto">
          <h2 className="text-lg font-bold text-neutral-900 mb-4 pb-2 border-b border-orange-100 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
            {t("enterBirthDetails")}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-neutral-700 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-orange-500" /> {t("fullNameLabel")}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-orange-500 text-sm"
                  placeholder={language === "hi" ? "उदा. रोहित शर्मा" : "e.g. Rohit Sharma"}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 mb-1 block">{t("genderLabel")}</label>
                <div className="flex gap-2">
                  {["male", "female"].map((g) => (
                    <button
                      type="button"
                      key={g}
                      onClick={() => setFormData({ ...formData, gender: g })}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold capitalize border transition-all cursor-pointer ${
                        formData.gender === g
                          ? "bg-orange-500 text-white border-orange-500"
                          : "bg-neutral-50 text-neutral-700 border-neutral-200"
                      }`}
                    >
                      {g === "male" ? t("male") : t("female")}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-neutral-700 mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-orange-500" /> {t("dobLabel")}
                </label>
                <input
                  type="date"
                  required
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:border-orange-500 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-orange-500" /> {t("tobLabel")}
                </label>
                <input
                  type="time"
                  required
                  value={formData.tob}
                  onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:border-orange-500 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-orange-500" /> {t("pobLabel")}
                </label>
                <input
                  type="text"
                  required
                  value={formData.place}
                  onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:border-orange-500 text-sm"
                  placeholder={language === "hi" ? "उदा. नई दिल्ली, भारत" : "City, State"}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25 hover:from-orange-600 hover:to-orange-700 transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  <span>{t("generatingKundli")}</span>
                </span>
              ) : (
                <>
                  <Compass className="w-4 h-4" />
                  <span>{t("generateKundliBtn")}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Showcase */}
        {kundliResult && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Highlights overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-orange-100 shadow-sm">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">{t("lagnaAscendant")}</span>
                <div className="text-xl font-black text-neutral-900 mt-1">
                  {language === "hi" ? kundliResult.lagna.signHindi || kundliResult.lagna.sign : kundliResult.lagna.sign}
                </div>
                <div className="text-xs text-orange-600 font-semibold mt-0.5">
                  {t("lordLabel")}: {language === "hi" ? kundliResult.lagna.lordHindi || kundliResult.lagna.lord : kundliResult.lagna.lord} • {kundliResult.lagna.degree}°
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-orange-100 shadow-sm">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">{t("rashiMoonSign")}</span>
                <div className="text-xl font-black text-neutral-900 mt-1">
                  {language === "hi" ? kundliResult.moonSign.signHindi || kundliResult.moonSign.sign : kundliResult.moonSign.sign}
                </div>
                <div className="text-xs text-orange-600 font-semibold mt-0.5">
                  {t("lordLabel")}: {language === "hi" ? kundliResult.moonSign.lordHindi || kundliResult.moonSign.lord : kundliResult.moonSign.lord}
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-orange-100 shadow-sm">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">{t("janmaNakshatra")}</span>
                <div className="text-xl font-black text-neutral-900 mt-1">{kundliResult.moonSign.nakshatra}</div>
                <div className="text-xs text-neutral-500 mt-0.5">
                  {t("padaLabel")}: {kundliResult.moonSign.pada}
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-orange-100 shadow-sm">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">{t("mangalDoshaLabel")}</span>
                <div className="text-xl font-black mt-1 text-rose-600">
                  {kundliResult.dosha.mangalDosha.isManglik
                    ? (language === "hi" ? "मांगलिक दोष (प्रभावित)" : "Afflicted (Manglik)")
                    : (language === "hi" ? "मांगलिक दोष नहीं है" : "No Dosha (Non-Manglik)")}
                </div>
                <div className="text-xs text-neutral-500 mt-0.5">
                  {language === "hi" ? `तीव्रता: ${kundliResult.dosha.mangalDosha.severityHindi || kundliResult.dosha.mangalDosha.severity}` : `Severity: ${kundliResult.dosha.mangalDosha.severity}`}
                </div>
              </div>
            </div>

            {/* Diamond Lagna Chart & Planet Table */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Chart */}
              <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-orange-100 shadow-sm flex flex-col items-center">
                <KundliChart
                  housePlanets={kundliResult.housePlanets}
                  lagnaSign={kundliResult.lagna.sign}
                  size={360}
                />
              </div>

              {/* Planetary Table */}
              <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-orange-100 shadow-sm overflow-x-auto">
                <h3 className="text-base font-bold text-neutral-900 mb-4 pb-2 border-b border-orange-100">
                  {t("planetaryPositionsTitle")}
                </h3>
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-neutral-100 text-neutral-500 uppercase tracking-wider">
                      <th className="py-2.5 px-3">{t("thPlanet")}</th>
                      <th className="py-2.5 px-3">{t("thSign")}</th>
                      <th className="py-2.5 px-3">{t("thDegree")}</th>
                      <th className="py-2.5 px-3">{t("thHouse")}</th>
                      <th className="py-2.5 px-3">{t("thNakshatra")}</th>
                      <th className="py-2.5 px-3">{t("thLord")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-50">
                    {kundliResult.planets.map((p: any) => (
                      <tr key={p.planet} className="hover:bg-orange-50/50 transition-colors">
                        <td className="py-2.5 px-3 font-bold text-neutral-800">
                          {language === "hi" ? p.planetHindi || p.planet : p.planet}
                        </td>
                        <td className="py-2.5 px-3 text-neutral-700">
                          {language === "hi" ? p.signHindi || p.sign : p.sign}
                        </td>
                        <td className="py-2.5 px-3 text-neutral-600 font-mono">{p.degree}°</td>
                        <td className="py-2.5 px-3 font-semibold text-orange-600">
                          {language === "hi" ? `भाव ${p.house}` : `House ${p.house}`}
                        </td>
                        <td className="py-2.5 px-3 text-neutral-700">{p.nakshatra} (P{p.pada})</td>
                        <td className="py-2.5 px-3 text-neutral-600">
                          {language === "hi" ? p.lordHindi || p.lord : p.lord}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Dosha & Remedial Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-sm">
                <div className="flex items-center gap-2 text-rose-600 font-bold text-sm mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{t("mangalDoshaTitle")}</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed mb-3">
                  {language === "hi"
                    ? kundliResult.dosha.mangalDosha.descriptionHindi || kundliResult.dosha.mangalDosha.description
                    : kundliResult.dosha.mangalDosha.description}
                </p>
                <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-200/60 text-xs text-rose-800 leading-relaxed">
                  <strong>{t("sacredRemedyLabel")}:</strong>{" "}
                  {language === "hi"
                    ? kundliResult.dosha.mangalDosha.remedyHindi || kundliResult.dosha.mangalDosha.remedy
                    : kundliResult.dosha.mangalDosha.remedy}
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-sm">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-sm mb-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>{t("sadeSatiTitle")}</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed mb-3">
                  {language === "hi" ? (
                    <>
                      वर्तमान स्थिति: <strong className="text-neutral-900">{kundliResult.dosha.sadeSati.statusHindi || kundliResult.dosha.sadeSati.status}</strong>. {kundliResult.dosha.sadeSati.descriptionHindi || kundliResult.dosha.sadeSati.description}
                    </>
                  ) : (
                    <>
                      Current Status: <strong className="text-neutral-900">{kundliResult.dosha.sadeSati.status}</strong>. {kundliResult.dosha.sadeSati.description}
                    </>
                  )}
                </p>
                <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/60 text-xs text-amber-900 leading-relaxed">
                  <strong>{t("sacredRemedyLabel")}:</strong>{" "}
                  {language === "hi"
                    ? kundliResult.dosha.sadeSati.remedyHindi || kundliResult.dosha.sadeSati.remedy
                    : kundliResult.dosha.sadeSati.remedy}
                </div>
              </div>
            </div>

            {/* Vimshottari Mahadasha Sequence */}
            <div className="bg-white p-6 rounded-3xl border border-orange-100 shadow-sm">
              <h3 className="text-base font-bold text-neutral-900 mb-4 pb-2 border-b border-orange-100">
                {t("vimshottariDashaTitle")}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
                {kundliResult.vimshottariDasha.map((d: any) => (
                  <div
                    key={d.planet}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      d.isActive
                        ? "bg-orange-500 text-white border-orange-500 shadow-md ring-2 ring-orange-500/20"
                        : "bg-neutral-50/80 border-neutral-200 text-neutral-700"
                    }`}
                  >
                    <div className="text-xs font-bold">
                      {language === "hi" ? d.planetHindi || d.planet : d.planet}
                    </div>
                    <div className={`text-[10px] ${d.isActive ? "text-orange-100" : "text-neutral-500"}`}>
                      {language === "hi" ? d.durationHindi || d.duration : d.duration}
                    </div>
                    <div className={`text-[10px] mt-1 font-semibold font-mono ${d.isActive ? "text-white" : "text-neutral-600"}`}>
                      {d.start} - {d.end}
                    </div>
                    {d.isActive && (
                      <span className="inline-block mt-1 text-[8px] uppercase tracking-wider bg-white text-orange-600 font-black px-1.5 py-0.5 rounded-full">
                        {language === "hi" ? "सक्रिय" : "Active"}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Astrotalk-like Consultation Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-orange-500 to-amber-500 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-lg font-bold">
                  {language === "hi" ? "अपनी कुंडली को लेकर कोई विशेष प्रश्न या शंका है?" : "Have Questions About Your Kundli?"}
                </h4>
                <p className="text-xs text-orange-100 mt-0.5">
                  {language === "hi"
                    ? "विद्वान आचार्यों से सीधे परामर्श लें एवं छिपे हुए राजयोग व महादशा के फल समझें।"
                    : "Consult with an expert Acharya to decode hidden yogas and upcoming Mahadasha transit effects."}
                </p>
              </div>
              <Link
                href="/chat-with-astrologer"
                className="px-5 py-2.5 rounded-xl bg-white text-orange-700 font-bold text-xs hover:bg-orange-50 shadow-md transition-all whitespace-nowrap"
              >
                {language === "hi" ? "ज्योतिषी से चैट करें (FREE)" : "Chat with Astrologer (FREE)"}
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
