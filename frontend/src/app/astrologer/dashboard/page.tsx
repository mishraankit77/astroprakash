"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  PhoneCall,
  MessageSquare,
  Power,
  Coins,
  Star,
  Users,
  Shield,
  Clock,
  PhoneIncoming,
  Check,
  X,
  Compass,
  ArrowRight,
  Sparkles,
  Lock,
} from "lucide-react";

export default function AstrologerDashboardPage() {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(true);
  const [incomingCall, setIncomingCall] = useState<any | null>(null);
  const [stats, setStats] = useState({
    todayEarnings: 4850,
    totalEarnings: 128400,
    todayCalls: 14,
    todayChats: 22,
    rating: 4.98,
    walletPayout: 12450,
  });

  const [astroProfile, setAstroProfile] = useState<any>({
    name: "Acharya Raghav Shastri",
    id: "astro_1",
    category: "Vedic Astrology",
    experienceYears: 18,
    pricePerMinute: 45,
    discountedPrice: 25,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("astroprakash_astro_session");
      if (stored) {
        setAstroProfile(JSON.parse(stored));
      }
    } catch {}

    // Load initial incoming consultation demo request
    setIncomingCall({
      requestId: "call_req_901",
      seekerName: "Rohit Sharma",
      maskedPhone: "+91 98XXX-XX210 (Masked Number)",
      birthDetails: "18 May 1996, 11:30 AM at New Delhi",
      lagna: "Leo (Simha)",
      rashi: "Cancer (Karka)",
      rate: "₹25/min",
      type: "Audio Consultation",
    });
  }, []);

  const toggleStatus = async () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    try {
      await fetch(`http://127.0.0.1:8000/api/astrologers/${astroProfile.id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isOnline: newStatus }),
      });
    } catch {}
  };

  const handleAcceptCall = () => {
    router.push("/astrologer/workspace");
  };

  const handleDeclineCall = () => {
    setIncomingCall(null);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col text-neutral-800">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Cockpit Header with Online Status Toggle */}
        <div className="bg-white rounded-3xl border border-orange-100 p-6 shadow-sm mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-orange-400 p-0.5 bg-orange-50">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256"
                  alt={astroProfile.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span
                className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                  isOnline ? "bg-emerald-500 animate-pulse" : "bg-neutral-400"
                }`}
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-neutral-900">{astroProfile.name}</h1>
                <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                  Verified Guru
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">
                {astroProfile.category} • {astroProfile.experienceYears} Years Exp • Rate: ₹{astroProfile.discountedPrice || 25}/min
              </p>
            </div>
          </div>

          {/* Toggle Switch */}
          <div className="flex items-center gap-3 bg-neutral-50 p-2 rounded-2xl border border-neutral-200/80">
            <span className={`text-xs font-bold ${isOnline ? "text-emerald-700" : "text-neutral-500"}`}>
              {isOnline ? "🟢 Online (Accepting Calls)" : "🔴 Offline"}
            </span>
            <button
              onClick={toggleStatus}
              className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                isOnline ? "bg-emerald-500" : "bg-neutral-300"
              }`}
            >
              <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                  isOnline ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Live Incoming Call Ringing Alert (Astrotalk Astrologer Feature) */}
        {incomingCall && isOnline && (
          <div className="mb-8 rounded-3xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white p-6 shadow-xl relative overflow-hidden animate-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-white text-orange-600 flex items-center justify-center animate-bounce shadow-md">
                  <PhoneIncoming className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-orange-100 uppercase tracking-widest block">
                    Incoming Audio Call Request
                  </span>
                  <h3 className="text-xl font-black">{incomingCall.seekerName}</h3>
                  <div className="text-xs text-orange-100 mt-1 flex flex-wrap gap-2">
                    <span className="bg-black/20 px-2 py-0.5 rounded-md font-mono">{incomingCall.maskedPhone}</span>
                    <span>•</span>
                    <span>DOB: {incomingCall.birthDetails}</span>
                    <span>•</span>
                    <span className="font-bold">Lagna: {incomingCall.lagna}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={handleDeclineCall}
                  className="flex-1 md:flex-initial px-5 py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span>Decline</span>
                </button>

                <button
                  onClick={handleAcceptCall}
                  className="flex-1 md:flex-initial px-6 py-3 rounded-xl bg-white text-orange-700 hover:bg-orange-50 font-black text-xs transition-transform hover:scale-105 shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-600" />
                  <span>Accept &amp; Launch Kundli Screen</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl border border-orange-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Today&apos;s Earnings</span>
              <div className="p-2 bg-orange-100 text-orange-600 rounded-xl">
                <Coins className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-black text-neutral-900">₹{stats.todayEarnings}</div>
            <span className="text-xs text-emerald-600 font-bold">14 calls + 22 chats completed</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-orange-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Withdrawable Balance</span>
              <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
                <Shield className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-black text-neutral-900">₹{stats.walletPayout}</div>
            <span className="text-xs text-neutral-500">Auto-transfers every Monday</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-orange-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Total Consultations</span>
              <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-black text-neutral-900">1,420</div>
            <span className="text-xs text-neutral-500">All-time happy seekers</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-orange-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Client Rating</span>
              <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
                <Star className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-black text-neutral-900">{stats.rating} ★</div>
            <span className="text-xs text-emerald-600 font-bold">Top 1% Guru on AstroPrakash</span>
          </div>
        </div>

        {/* Quick Launch Astrological Consultation Workspace */}
        <div className="bg-white rounded-3xl border border-orange-100 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600">
              <Compass className="w-4 h-4" />
              <span>Astrologer Active Workspace</span>
            </div>
            <h3 className="text-lg font-black text-neutral-900">
              Open Consultation Desk with Real-time Diamond Kundli Chart
            </h3>
            <p className="text-xs text-neutral-500 max-w-xl">
              Conduct live calls with seekers. View their D-1 Lagna Chart, Navamsha, Mahadasha, and planetary degrees simultaneously while speaking with complete private cloud number masking.
            </p>
          </div>

          <Link
            href="/astrologer/workspace"
            className="px-6 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-orange-500/20 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <span>Open Desk Screen</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
