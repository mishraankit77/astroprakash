"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import {
  Sparkles,
  Phone,
  User,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "male",
    dob: "1996-06-18",
    tob: "11:30",
    place: "New Delhi, India",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name || formData.phone.length < 10) {
      setError("Please fill all required fields with a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.user) {
        localStorage.setItem("astroprakash_user", JSON.stringify(data.user));
        setSuccess(true);
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        setError(data.detail || "Unable to register. Please try again.");
      }
    } catch {
      const mockUser = {
        id: "usr_" + formData.phone.slice(-4),
        ...formData,
        walletBalance: 100,
      };
      localStorage.setItem("astroprakash_user", JSON.stringify(mockUser));
      setSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col text-neutral-800">
      <Navbar />

      <main className="flex-1 max-w-xl mx-auto px-4 py-12 w-full">
        <div className="bg-white rounded-3xl border border-orange-100 p-6 sm:p-8 shadow-xl">
          <div className="text-center mb-6">
            <div className="inline-block mb-3">
              <Logo size="md" />
            </div>
            <h1 className="text-2xl font-black text-neutral-900">Create Your AstroPrakash Account</h1>
            <p className="text-xs text-neutral-500 mt-1">
              Enter your birth specifics to unlock customized Kundli, Panchang, and claim <strong>₹100 Free Consultation Bonus</strong>.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          {success ? (
            <div className="py-10 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
              <h3 className="text-xl font-bold text-neutral-900">Welcome to AstroPrakash!</h3>
              <p className="text-xs text-neutral-600">
                Your Vedic birth chart has been synthesized and ₹100 Welcome Credit is available in your wallet.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-neutral-700 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-orange-500" /> Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-neutral-700 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-orange-500" /> Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })}
                    placeholder="10-digit number"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 mb-1 block">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-orange-500 bg-white"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-neutral-700 mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-orange-500" /> Date of Birth *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-neutral-700 mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-orange-500" /> Time of Birth *
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.tob}
                    onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-neutral-700 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-orange-500" /> Place of Birth (City, State) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.place}
                  onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                  placeholder="e.g. Varanasi, Uttar Pradesh"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="p-3 bg-orange-50/70 border border-orange-200/60 rounded-xl text-[11px] text-orange-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-600 flex-shrink-0" />
                <span>
                  <strong>Welcome Benefit:</strong> Get ₹100 instant wallet credit + 1 Free live astrologer chat!
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-orange-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <>
                    <span>Create Profile &amp; Claim ₹100</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <span className="text-neutral-500">Already registered? </span>
                <Link href="/login" className="font-bold text-orange-600 hover:underline">
                  Log in here
                </Link>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
