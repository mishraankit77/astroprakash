"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X, MessageSquare, PhoneCall, Sparkles, User, Calendar, Clock, MapPin } from "lucide-react";
import { AstrologerData } from "./AstrologerCard";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  astrologer: AstrologerData | null;
  consultationType: "chat" | "call";
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  astrologer,
  consultationType,
}) => {
  const router = useRouter();
  const [userName, setUserName] = useState("Rohit Sharma");
  const [gender, setGender] = useState("male");
  const [dob, setDob] = useState("1996-05-18");
  const [tob, setTob] = useState("11:30");
  const [place, setPlace] = useState("New Delhi, India");
  const [loading, setLoading] = useState(false);

  if (!isOpen || !astrologer) return null;

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/consultation/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          astrologerId: astrologer.id,
          type: consultationType,
          userName: userName,
          userBirthDetails: `${dob} ${tob} at ${place}`
        })
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/consultation/${data.sessionId}`);
      } else {
        // Fallback directly
        router.push(`/consultation/${astrologer.id}?name=${encodeURIComponent(userName)}&type=${consultationType}`);
      }
    } catch {
      router.push(`/consultation/${astrologer.id}?name=${encodeURIComponent(userName)}&type=${consultationType}`);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-orange-100 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Astrologer preview */}
        <div className="flex items-center gap-4 pb-4 border-b border-orange-100">
          <img
            src={astrologer.avatar}
            alt={astrologer.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-orange-400 p-0.5"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                Start {consultationType === "chat" ? "Live Chat" : "Voice Consultation"}
              </span>
            </div>
            <h3 className="text-lg font-bold text-neutral-900">{astrologer.name}</h3>
            <p className="text-xs text-neutral-500">
              Rate: <span className="font-bold text-orange-600">₹{astrologer.discountedPrice}/min</span> (First Chat FREE)
            </p>
          </div>
        </div>

        {/* Form to enter birth details */}
        <form onSubmit={handleStart} className="space-y-4 mt-4">
          <p className="text-xs text-neutral-600">
            Please verify your birth details so {astrologer.name} can prepare your Janam Kundli chart instantly:
          </p>

          <div>
            <label className="text-xs font-bold text-neutral-700 mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-orange-500" /> Full Name
            </label>
            <input
              type="text"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:border-orange-500 text-sm"
              placeholder="Your Name"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-neutral-700 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-orange-500" /> Date of Birth
              </label>
              <input
                type="date"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 focus:outline-none focus:border-orange-500 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-neutral-700 mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-orange-500" /> Time of Birth
              </label>
              <input
                type="time"
                required
                value={tob}
                onChange={(e) => setTob(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 focus:outline-none focus:border-orange-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-neutral-700 mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-orange-500" /> Place of Birth (City, State)
            </label>
            <input
              type="text"
              required
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:border-orange-500 text-sm"
              placeholder="e.g. Varanasi, UP, India"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25 hover:from-orange-600 hover:to-orange-700 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            ) : consultationType === "chat" ? (
              <>
                <MessageSquare className="w-4 h-4" />
                <span>Start Live Chat (FREE First Session)</span>
              </>
            ) : (
              <>
                <PhoneCall className="w-4 h-4" />
                <span>Connect Voice Call Now</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
