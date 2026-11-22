"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { Phone, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (phone.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep("otp");
      } else {
        setError(data.detail || "Error sending OTP.");
      }
    } catch {
      setStep("otp");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });
      const data = await res.json();
      if (res.ok && data.user) {
        localStorage.setItem("astroprakash_user", JSON.stringify(data.user));
        router.push("/");
      } else {
        setError(data.detail || "Invalid OTP.");
      }
    } catch {
      const mockUser = {
        id: "usr_" + phone.slice(-4),
        name: "Astro Seeker",
        phone: phone,
        walletBalance: 100,
        rashi: "Cancer",
      };
      localStorage.setItem("astroprakash_user", JSON.stringify(mockUser));
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col text-neutral-800">
      <Navbar />

      <main className="flex-1 max-w-md mx-auto px-4 py-16 w-full">
        <div className="bg-white rounded-3xl border border-orange-100 p-6 sm:p-8 shadow-xl">
          <div className="text-center mb-6">
            <div className="inline-block mb-3">
              <Logo size="md" />
            </div>
            <h1 className="text-2xl font-black text-neutral-900">
              {step === "phone" ? "Sign In to AstroPrakash" : "Enter Verification Code"}
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              {step === "phone"
                ? "Connect with your verified mobile number"
                : `We sent a 6-digit code to +91 ${phone}`}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          {step === "phone" ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">
                  Mobile Number
                </label>
                <div className="flex rounded-xl border border-neutral-300 overflow-hidden focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500">
                  <span className="bg-neutral-50 px-3 py-2.5 text-xs font-bold text-neutral-500 border-r border-neutral-200 flex items-center">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter 10-digit number"
                    className="w-full px-3 py-2.5 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || phone.length < 10}
                className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:bg-neutral-200 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-500/20 cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                {loading ? "Sending OTP..." : "Get OTP & Continue"}
              </button>

              <div className="text-center pt-2 text-xs">
                <span className="text-neutral-500">New seeker on AstroPrakash? </span>
                <Link href="/signup" className="font-bold text-orange-600 hover:underline">
                  Create Account
                </Link>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-neutral-700">6-Digit OTP</label>
                  <button
                    type="button"
                    onClick={() => setStep("phone")}
                    className="text-[11px] text-orange-600 font-bold hover:underline"
                  >
                    Change Number
                  </button>
                </div>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  className="w-full px-3 py-2.5 text-center text-lg tracking-widest font-black rounded-xl border border-neutral-300 focus:outline-none focus:border-orange-500"
                />
                <span className="text-[10px] text-emerald-600 font-semibold block mt-1 text-center">
                  Demo code: <strong>123456</strong>
                </span>
              </div>

              <button
                type="submit"
                disabled={loading || otp.length < 4}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-neutral-200 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 cursor-pointer transition-all"
              >
                {loading ? "Verifying..." : "Verify & Access Wallet"}
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
