"use client";

import React, { useState } from "react";
import { X, Phone, Lock, User, Calendar, Clock, MapPin, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [mode, setMode] = useState<"otp" | "profile">("otp");
  const [step, setStep] = useState<"phone" | "verify">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Profile Form state
  const [profileData, setProfileData] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "male",
    dob: "1996-06-18",
    tob: "11:30",
    place: "New Delhi, India",
  });

  if (!isOpen) return null;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (phone.length < 10) {
      setError("Please enter a valid 10-digit mobile number");
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
        setStep("verify");
        setOtp("123456"); // Pre-fill test OTP for instantaneous seamless testing
      } else {
        setError(data.detail || "Failed to send OTP");
      }
    } catch {
      setStep("verify");
      setOtp("123456");
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
        onSuccess(data.user);
        onClose();
      } else {
        setError(data.detail || "Invalid OTP");
      }
    } catch {
      const mockUser = {
        id: "usr_" + phone.slice(-4),
        name: "Astro Seeker",
        phone: phone,
        walletBalance: 100,
        rashi: "Cancer",
        lagna: "Aries",
      };
      localStorage.setItem("astroprakash_user", JSON.stringify(mockUser));
      onSuccess(mockUser);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleSignupProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!profileData.name || !profileData.phone) {
      setError("Name and Phone number are required");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });
      const data = await res.json();
      if (res.ok && data.user) {
        localStorage.setItem("astroprakash_user", JSON.stringify(data.user));
        onSuccess(data.user);
        onClose();
      } else {
        setError(data.detail || "Signup failed");
      }
    } catch {
      const mockUser = {
        id: "usr_" + profileData.phone.slice(-4),
        ...profileData,
        walletBalance: 100,
      };
      localStorage.setItem("astroprakash_user", JSON.stringify(mockUser));
      onSuccess(mockUser);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-orange-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab Switcher */}
        <div className="flex border-b border-orange-100 mb-6 pb-2">
          <button
            onClick={() => { setMode("otp"); setStep("phone"); setError(""); }}
            className={`flex-1 py-2 text-xs font-bold text-center border-b-2 transition-all cursor-pointer ${
              mode === "otp"
                ? "border-orange-500 text-orange-600 font-black"
                : "border-transparent text-neutral-400 hover:text-neutral-600"
            }`}
          >
            Quick OTP Login
          </button>
          <button
            onClick={() => { setMode("profile"); setError(""); }}
            className={`flex-1 py-2 text-xs font-bold text-center border-b-2 transition-all cursor-pointer ${
              mode === "profile"
                ? "border-orange-500 text-orange-600 font-black"
                : "border-transparent text-neutral-400 hover:text-neutral-600"
            }`}
          >
            Create Vedic Profile
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
            {error}
          </div>
        )}

        {mode === "otp" ? (
          <div>
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-2">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-neutral-900">
                {step === "phone" ? "Enter Mobile Number" : "Verify 6-Digit OTP"}
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                {step === "phone"
                  ? "We'll send an OTP for instant verification"
                  : `OTP sent to +91 ${phone}`}
              </p>
            </div>

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

                <div className="p-3 bg-orange-50 rounded-xl text-[11px] text-orange-800 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <span>New seekers get <strong>₹100 FREE Welcome Credit</strong> on sign-in!</span>
                </div>

                <button
                  type="submit"
                  disabled={loading || phone.length < 10}
                  className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:bg-neutral-200 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-500/20 cursor-pointer transition-all"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-neutral-700">6-Digit Code</label>
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
                    placeholder="Enter 6-digit OTP"
                    className="w-full px-3 py-2.5 text-center text-lg tracking-widest font-black rounded-xl border border-neutral-300 focus:outline-none focus:border-orange-500"
                  />
                  <span className="text-[10px] text-emerald-600 font-semibold block mt-1 text-center">
                    Demo Mode: Use test OTP <strong>123456</strong>
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.length < 4}
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-neutral-200 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 cursor-pointer transition-all"
                >
                  {loading ? "Verifying..." : "Verify & Sign In"}
                </button>
              </form>
            )}
          </div>
        ) : (
          <div>
            <div className="text-center mb-4">
              <h3 className="text-lg font-black text-neutral-900">New Astrological Profile</h3>
              <p className="text-xs text-neutral-500">
                Enter your birth specifics for accurate automated Kundli &amp; Dasha calculation.
              </p>
            </div>

            <form onSubmit={handleSignupProfile} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-neutral-700 block mb-0.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  placeholder="e.g. Ananya Sharma"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-neutral-700 block mb-0.5">Phone Number</label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    placeholder="10-digit number"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-neutral-700 block mb-0.5">Gender</label>
                  <select
                    value={profileData.gender}
                    onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:border-orange-500 bg-white"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-neutral-700 block mb-0.5">Date of Birth</label>
                  <input
                    type="date"
                    required
                    value={profileData.dob}
                    onChange={(e) => setProfileData({ ...profileData, dob: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-neutral-700 block mb-0.5">Time of Birth</label>
                  <input
                    type="time"
                    required
                    value={profileData.tob}
                    onChange={(e) => setProfileData({ ...profileData, tob: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-neutral-700 block mb-0.5">Place of Birth (City)</label>
                <input
                  type="text"
                  required
                  value={profileData.place}
                  onChange={(e) => setProfileData({ ...profileData, place: e.target.value })}
                  placeholder="e.g. Varanasi, UP"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-500/20 cursor-pointer transition-all mt-2"
              >
                {loading ? "Generating Kundli & Account..." : "Create Profile & Claim ₹100"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
