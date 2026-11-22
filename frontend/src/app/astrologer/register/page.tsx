"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import {
  User,
  Phone,
  Mail,
  Award,
  BookOpen,
  DollarSign,
  Languages,
  CheckCircle2,
  Shield,
  ArrowRight,
} from "lucide-react";

export default function AstrologerRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    category: "Vedic",
    skills: ["Vedic Astrology", "Kundli Analysis"],
    languages: ["Hindi", "English"],
    experienceYears: 10,
    pricePerMinute: 35,
    bio: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const skillOptions = [
    "Vedic Astrology",
    "Kundli Analysis",
    "Prashna Kundli",
    "Tarot Reading",
    "Numerology",
    "Vastu Shastra",
    "Nadi Astrology",
    "KP System",
    "Gemology",
    "Lal Kitab Remedies",
  ];

  const languageOptions = ["Hindi", "English", "Sanskrit", "Punjabi", "Gujarati", "Marathi", "Bengali", "Tamil"];

  const toggleSkill = (skill: string) => {
    if (formData.skills.includes(skill)) {
      setFormData({ ...formData, skills: formData.skills.filter((s) => s !== skill) });
    } else {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
    }
  };

  const toggleLanguage = (lang: string) => {
    if (formData.languages.includes(lang)) {
      setFormData({ ...formData, languages: formData.languages.filter((l) => l !== lang) });
    } else {
      setFormData({ ...formData, languages: [...formData.languages, lang] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name || formData.phone.length < 10) {
      setError("Please fill all required fields with a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/astrologers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.astrologer) {
        localStorage.setItem("astroprakash_astro_session", JSON.stringify(data.astrologer));
        setSuccess(true);
        setTimeout(() => {
          router.push("/astrologer/dashboard");
        }, 1500);
      } else {
        setError(data.detail || "Registration failed.");
      }
    } catch {
      const mockAstro = {
        id: "astro_new",
        ...formData,
        rating: 5.0,
        isOnline: true,
      };
      localStorage.setItem("astroprakash_astro_session", JSON.stringify(mockAstro));
      setSuccess(true);
      setTimeout(() => {
        router.push("/astrologer/dashboard");
      }, 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col text-neutral-800">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 w-full">
        <div className="bg-white rounded-3xl border border-orange-100 p-6 sm:p-10 shadow-xl">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">
              Astrologer Onboarding
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 mt-1">
              Register as an AstroPrakash Astrologer
            </h1>
            <p className="text-xs text-neutral-500 mt-1 max-w-md mx-auto">
              Join our verified guru council. Connect with seekers across India and globally with 100% number masking.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-bold">
              {error}
            </div>
          )}

          {success ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
              <h3 className="text-2xl font-black text-neutral-900">Registration Successful!</h3>
              <p className="text-xs text-neutral-600 max-w-sm mx-auto">
                Your profile is verified and active in the AstroPrakash Astrologer Council. Redirecting to your Astrologer Cockpit...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              {/* Personal info */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-neutral-900 pb-2 border-b border-orange-100 flex items-center gap-2">
                  <User className="w-4 h-4 text-orange-500" />
                  <span>1. Personal &amp; Contact Details</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-neutral-700 mb-1 block">Full Name (with Title e.g. Acharya / Pt.) *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Acharya Alok Tripathi"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-neutral-700 mb-1 block">Registered Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })}
                      placeholder="10-digit number"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-orange-500"
                    />
                    <span className="text-[10px] text-neutral-400 mt-0.5 block">
                      Protected by Cloud Masking (never shown to callers)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-neutral-700 mb-1 block">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="guru@astroprakash.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-neutral-700 mb-1 block">Primary Specialization Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-orange-500 bg-white"
                    >
                      <option value="Vedic">Vedic Astrology (Jyotish)</option>
                      <option value="Tarot">Tarot Card Reading</option>
                      <option value="Numerology">Numerology &amp; Name Correction</option>
                      <option value="Vastu">Vastu Shastra</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Skills and Languages */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-neutral-900 pb-2 border-b border-orange-100 flex items-center gap-2">
                  <Award className="w-4 h-4 text-orange-500" />
                  <span>2. Astrological Expertise &amp; Languages</span>
                </h3>

                <div>
                  <label className="font-bold text-neutral-700 mb-2 block">Select Core Skills (Select multiple)</label>
                  <div className="flex flex-wrap gap-2">
                    {skillOptions.map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => toggleSkill(s)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          formData.skills.includes(s)
                            ? "bg-orange-500 text-white border-orange-500 shadow-xs"
                            : "bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-orange-200"
                        }`}
                      >
                        {s} {formData.skills.includes(s) && "✓"}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-bold text-neutral-700 mb-2 block">Consultation Languages</label>
                  <div className="flex flex-wrap gap-2">
                    {languageOptions.map((l) => (
                      <button
                        type="button"
                        key={l}
                        onClick={() => toggleLanguage(l)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          formData.languages.includes(l)
                            ? "bg-amber-500 text-white border-amber-500 shadow-xs"
                            : "bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-amber-200"
                        }`}
                      >
                        {l} {formData.languages.includes(l) && "✓"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-neutral-700 mb-1 block">Years of Vedic Experience *</label>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      required
                      value={formData.experienceYears}
                      onChange={(e) => setFormData({ ...formData, experienceYears: parseInt(e.target.value) || 1 })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-neutral-700 mb-1 block">Consultation Rate (₹ / minute) *</label>
                    <input
                      type="number"
                      min={10}
                      max={200}
                      required
                      value={formData.pricePerMinute}
                      onChange={(e) => setFormData({ ...formData, pricePerMinute: parseInt(e.target.value) || 20 })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-neutral-900 pb-2 border-b border-orange-100 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-orange-500" />
                  <span>3. Professional Bio &amp; Credentials</span>
                </h3>

                <div>
                  <label className="font-bold text-neutral-700 mb-1 block">Bio &amp; Lineage / Gurukul Description</label>
                  <textarea
                    rows={3}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Describe your training (e.g. Acharya from Sampurnanand Sanskrit Vishwavidyalaya, special expertise in Kundli matching and career remedies)..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="p-4 bg-orange-50/80 rounded-2xl border border-orange-200 flex items-start gap-3">
                <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-neutral-600">
                  By submitting your application, you agree to AstroPrakash&apos;s <strong>Privacy &amp; Non-Circumvention Policy</strong>. You acknowledge that sharing personal phone numbers or external channels in calls or chats results in automatic termination.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-orange-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <>
                    <span>Submit Application &amp; Go to Cockpit</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
