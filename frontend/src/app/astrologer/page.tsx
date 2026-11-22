"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import {
  ShieldCheck,
  Award,
  Coins,
  PhoneCall,
  MessageSquare,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Lock,
} from "lucide-react";

export default function AstrologerPortalLandingPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col text-neutral-800">
      <Navbar />

      <main className="flex-1">
        {/* Astrologer Hero Banner */}
        <section className="bg-gradient-to-b from-[#FFF7ED] via-[#FFFBF5] to-white py-16 md:py-24 border-b border-orange-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-orange-200 shadow-xs text-xs font-bold text-orange-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>AstroPrakash Guru Partner Network</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 leading-tight">
                  Share Your Vedic Wisdom.{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
                    Earn with Honor &amp; Dignity.
                  </span>
                </h1>

                <p className="text-base text-neutral-600 leading-relaxed">
                  Join India&apos;s most respected platform for certified Vedic Acharyas, Tarot Masters, and Numerologists. Serve seekers worldwide, conduct private audio calls and chats, and receive weekly guaranteed bank payouts.
                </p>

                {/* Privacy Guarantee */}
                <div className="p-4 bg-orange-50/80 rounded-2xl border border-orange-200/80 flex items-start gap-3 text-xs text-neutral-700">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-900 block font-bold">100% Number Masking &amp; Privacy Protection</strong>
                    <span>Neither seekers see your personal phone number, nor do you see theirs. All voice calls and chats are securely bridged by AstroPrakash.</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/astrologer/register"
                    className="px-8 py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-orange-500/25 transition-all flex items-center gap-2"
                  >
                    <span>Register as Astrologer</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/astrologer/dashboard"
                    className="px-6 py-4 rounded-2xl bg-white hover:bg-orange-50 text-neutral-900 border border-orange-200 font-bold text-sm transition-all"
                  >
                    Partner Login / Dashboard
                  </Link>
                </div>
              </div>

              {/* Earnings & Stats highlight card */}
              <div className="bg-white rounded-3xl border border-orange-100 p-8 shadow-xl space-y-6 relative">
                <div className="flex items-center justify-between pb-4 border-b border-orange-100">
                  <div>
                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Top Guru Earnings</span>
                    <div className="text-3xl font-black text-neutral-900">₹75,000 - ₹3,50,000+</div>
                    <span className="text-xs text-emerald-600 font-bold">Monthly Average Payout</span>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
                    <Coins className="w-7 h-7" />
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span><strong>Flexible Working Hours:</strong> Log in anytime, toggle Online/Offline with 1 tap</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span><strong>Live Kundli Cockpit:</strong> See seeker&apos;s D-1 chart &amp; Mahadasha on screen during calls</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span><strong>Guaranteed Payouts:</strong> Direct transfer to your bank account every Monday</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span><strong>Zero Harassment:</strong> Prohibited number sharing filters protect you from spam</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/astrologer/register"
                    className="block w-full py-3.5 text-center rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs"
                  >
                    Start Easy 3-Minute Registration
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
