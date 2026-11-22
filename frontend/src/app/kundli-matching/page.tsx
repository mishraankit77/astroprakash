"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WalletModal } from "@/components/WalletModal";
import { useLanguage } from "@/context/LanguageContext";
import {
  HeartHandshake,
  User,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Shield,
} from "lucide-react";
import Link from "next/link";

export default function KundliMatchingPage() {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    groomName: "Aarav Sharma",
    groomDob: "1994-06-12",
    groomTob: "10:15",
    groomPlace: "Delhi",
    brideName: "Ananya Verma",
    brideDob: "1996-09-24",
    brideTob: "18:45",
    bridePlace: "Mumbai",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [walletOpen, setWalletOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(100);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/matching/guna-milan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        setResult(data);
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
            <HeartHandshake className="w-4 h-4 text-orange-200" />
            <span>{language === "hi" ? "अष्टकूट गुण मिलान (36 गुण)" : "Ashtakoot Guna Milan (36 Points)"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {language === "hi" ? "विवाह हेतु वैदिक कुंडली मिलान" : "Kundli Matching for Marriage Compatibility"}
          </h1>
          <p className="text-sm text-orange-100 mt-1 max-w-2xl leading-relaxed">
            {language === "hi"
              ? "वर-कन्या की कुंडली का 36 गुण अष्टकूट मिलान, मांगलिक सामंजस्य, मानसिक तालमेल, नाड़ी व भकूट दोष का शास्त्र सम्मत विश्लेषण प्राप्त करें।"
              : "Analyze marriage prospects with the authentic Vedic 36 Guna system. Check mental bonding, physical harmony, financial fortune, and Nadi / Bhakoot dosha remedies."}
          </p>
        </div>

        {/* Input Forms: Bride & Groom */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-orange-100 p-6 sm:p-8 shadow-sm mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Groom Details */}
            <div className="p-5 rounded-2xl bg-orange-50/50 border border-orange-100 space-y-3.5">
              <h3 className="text-sm font-bold text-orange-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                Boy&apos;s (Groom) Birth Details
              </h3>

              <div>
                <label className="text-xs font-semibold text-neutral-700 mb-1 block">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.groomName}
                  onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-neutral-200 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-neutral-700 mb-1 block">Birth Date</label>
                  <input
                    type="date"
                    required
                    value={formData.groomDob}
                    onChange={(e) => setFormData({ ...formData, groomDob: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-neutral-200 text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-700 mb-1 block">Birth Time</label>
                  <input
                    type="time"
                    required
                    value={formData.groomTob}
                    onChange={(e) => setFormData({ ...formData, groomTob: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-neutral-200 text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 mb-1 block">Birth Place</label>
                <input
                  type="text"
                  required
                  value={formData.groomPlace}
                  onChange={(e) => setFormData({ ...formData, groomPlace: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-neutral-200 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Bride Details */}
            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-3.5">
              <h3 className="text-sm font-bold text-amber-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Girl&apos;s (Bride) Birth Details
              </h3>

              <div>
                <label className="text-xs font-semibold text-neutral-700 mb-1 block">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.brideName}
                  onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-neutral-200 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-neutral-700 mb-1 block">Birth Date</label>
                  <input
                    type="date"
                    required
                    value={formData.brideDob}
                    onChange={(e) => setFormData({ ...formData, brideDob: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-neutral-200 text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-neutral-700 mb-1 block">Birth Time</label>
                  <input
                    type="time"
                    required
                    value={formData.brideTob}
                    onChange={(e) => setFormData({ ...formData, brideTob: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-neutral-200 text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 mb-1 block">Birth Place</label>
                <input
                  type="text"
                  required
                  value={formData.bridePlace}
                  onChange={(e) => setFormData({ ...formData, bridePlace: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-neutral-200 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              type="submit"
              disabled={loading}
              className="py-3.5 px-8 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25 hover:from-orange-600 hover:to-orange-700 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              {loading ? (
                <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  <HeartHandshake className="w-4 h-4" />
                  <span>Match Kundlis (Check 36 Gunas)</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Results */}
        {result && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Score Banner */}
            <div className="bg-white rounded-3xl border border-orange-100 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                  Ashtakoot Compatibility Score
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-neutral-900">
                  {result.groom.name} &amp; {result.bride.name}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 max-w-xl">
                  {result.verdict}
                </p>
              </div>

              {/* Big Score badge */}
              <div className="flex-shrink-0 flex items-center justify-center w-36 h-36 rounded-full bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 border-4 border-orange-500 p-2 shadow-inner text-center">
                <div>
                  <div className="text-3xl font-black text-orange-600">{result.totalScore}</div>
                  <div className="text-xs text-neutral-500 font-bold">out of 36</div>
                  <div className="text-[10px] text-emerald-600 font-bold">{result.percentage}% Match</div>
                </div>
              </div>
            </div>

            {/* 8 Kootas Detailed Table */}
            <div className="bg-white rounded-3xl border border-orange-100 p-6 shadow-sm overflow-x-auto">
              <h4 className="text-base font-bold text-neutral-900 mb-4 pb-2 border-b border-orange-100">
                Detailed Ashtakoot Breakdown (8 Cosmic Factors)
              </h4>

              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-100 text-neutral-500 uppercase tracking-wider">
                    <th className="py-2.5 px-3">Guna (Koota)</th>
                    <th className="py-2.5 px-3">Significance</th>
                    <th className="py-2.5 px-3">Max Points</th>
                    <th className="py-2.5 px-3">Obtained Points</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {result.kootas.map((k: any) => (
                    <tr key={k.name} className="hover:bg-orange-50/40">
                      <td className="py-3 px-3 font-bold text-neutral-800">{k.name}</td>
                      <td className="py-3 px-3 text-neutral-600">{k.meaning}</td>
                      <td className="py-3 px-3 font-semibold text-neutral-700">{k.max}</td>
                      <td className="py-3 px-3 font-black text-orange-600">{k.obtained}</td>
                      <td className="py-3 px-3">
                        {k.hasDosha ? (
                          <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                            Dosha Found
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                            Compatible
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Remedies Card */}
            <div className="bg-white rounded-3xl border border-orange-200/80 p-6 shadow-sm">
              <h4 className="text-base font-bold text-neutral-900 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-500" />
                Vedic Dosha Remedies &amp; Recommendations
              </h4>
              <p className="text-xs text-neutral-600 mb-4">
                If Nadi or Bhakoot points are low, classical scriptures provide remedial pujas to neutralize adverse planetary vibrations:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-100">
                  <h5 className="font-bold text-orange-900 mb-1">Nadi Dosha Remedy</h5>
                  <p className="text-neutral-700">{result.doshaRemedies.nadiDosha}</p>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100">
                  <h5 className="font-bold text-amber-900 mb-1">Bhakoot Dosha Remedy</h5>
                  <p className="text-neutral-700">{result.doshaRemedies.bhakootDosha}</p>
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
