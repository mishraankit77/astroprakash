"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { KundliChart } from "@/components/KundliChart";
import {
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  ShieldAlert,
  ShieldCheck,
  Send,
  MessageSquare,
  AlertTriangle,
  Clock,
  User,
  Compass,
  Lock,
  Volume2,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function AstrologerWorkspacePage() {
  const [callActive, setCallActive] = useState(true);
  const [callTimer, setCallTimer] = useState(151);
  const [isMuted, setIsMuted] = useState(false);
  const [showEndCallModal, setShowEndCallModal] = useState(false);
  const [terminatedBySecurity, setTerminatedBySecurity] = useState(false);
  const [securityReason, setSecurityReason] = useState("");

  // Chat in workspace
  const [messages, setMessages] = useState<any[]>([
    {
      id: "1",
      sender: "system",
      text: "🛡️ Privacy Protection Active: All direct phone numbers and contacts are 100% masked. Audio stream is actively monitored for contact leakage.",
      time: "10:15 AM",
    },
    {
      id: "2",
      sender: "seeker",
      text: "Pranam Guruji! I want guidance on my career switch. When is the favorable timing?",
      time: "10:16 AM",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatError, setChatError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Seeker's Live Kundli Data (Loaded in Astrologer Workspace)
  const [seekerKundli, setSeekerKundli] = useState<any>({
    name: "Rohit Sharma",
    dob: "1996-05-18",
    tob: "11:30",
    place: "New Delhi",
    lagna: { sign: "Leo", sanskrit: "Simha", lord: "Sun", degree: 14.2 },
    moonSign: { sign: "Cancer", sanskrit: "Karka", lord: "Moon", nakshatra: "Pushya", pada: 2 },
    housePlanets: {
      1: ["Sun"],
      2: ["Mercury"],
      4: ["Venus"],
      7: ["Jupiter"],
      8: ["Mars"],
      10: ["Saturn"],
      11: ["Rahu"],
      5: ["Ketu"],
    },
    dasha: "Rahu Mahadasha / Jupiter Antardasha",
  });

  // Call timer
  useEffect(() => {
    if (!callActive || terminatedBySecurity) return;
    const interval = setInterval(() => {
      setCallTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [callActive, terminatedBySecurity]);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // End Call handler
  const handleEndCall = () => {
    setCallActive(false);
    setShowEndCallModal(true);
  };

  // Chat message sending with anti-leak verification
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = chatInput.trim();
    if (!text) return;

    setChatError("");

    // DLP Filter: Check for 10-digit number or phone sequence
    const hasPhone = /(?:\+?91[\s\-]?)?(?:[6-9]\d{9}|[6-9][\s\.\-_/]*\d[\s\.\-_/]*\d[\s\.\-_/]*\d[\s\.\-_/]*\d[\s\.\-_/]*\d[\s\.\-_/]*\d[\s\.\-_/]*\d[\s\.\-_/]*\d[\s\.\-_/]*\d)/.test(
      text
    );

    if (hasPhone) {
      setChatInput("");
      const systemBlockedMsg = {
        id: Date.now().toString(),
        sender: "system",
        text: `⚠️ Message Blocked: Sharing personal phone numbers is prohibited by Privacy Policy. All consultations must stay within AstroPrakash.`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, systemBlockedMsg]);
      setChatError("⚠️ Message Blocked: Sharing phone numbers or personal contacts is forbidden.");
      return;
    }

    const newMsg = {
      id: Date.now().toString(),
      sender: "astrologer",
      text: text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setChatInput("");

    // Simulated seeker response
    setTimeout(() => {
      const seekerReplies = [
        "Dhanyawaad Guruji! When will my Rahu Mahadasha effects calm down?",
        "Pranam Guruji! Should I perform Shiva Rudrabhishek for career growth?",
        "Thank you Guruji, your analysis of my kundli chart is very reassuring.",
        "Understood Guruji! I will start the gemstone and mantra remedies as advised."
      ];
      const randomReply = seekerReplies[Math.floor(Math.random() * seekerReplies.length)];
      const seekerMsg = {
        id: (Date.now() + 1).toString(),
        sender: "seeker",
        text: randomReply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, seekerMsg]);
    }, 1200);
  };

  // Simulating Voice Call Speech Leakage (Triggering Automatic Call Sever)
  const triggerSimulatedSpeechLeak = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/consultation/session_demo/audio-sentinel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: "session_demo",
          transcriptSnippet: "Hey, note down my phone number 9876543210 and call me on WhatsApp.",
        }),
      });
      const data = await res.json();
      if (data.terminated) {
        setCallActive(false);
        setTerminatedBySecurity(true);
        setSecurityReason(data.reason);
      }
    } catch {
      setCallActive(false);
      setTerminatedBySecurity(true);
      setSecurityReason("Phone number speech sequence detected over audio stream.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col text-neutral-800">
      {/* Top Bar for Astrologer */}
      <header className="bg-white border-b border-orange-100 px-4 sm:px-6 py-3 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/astrologer/dashboard"
              className="text-xs font-bold text-neutral-500 hover:text-orange-600 flex items-center gap-1"
            >
              ← Back to Cockpit
            </Link>
            <span className="text-neutral-300">|</span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-black text-neutral-900">Live Consultation Desk</span>
            </div>
          </div>

          {/* Privacy Status badge */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Private &amp; Masked Consultation</span>
          </div>
        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Seeker's Live Kundli & Dasha Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-orange-100 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-orange-100 mb-4">
              <div>
                <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">
                  Caller Janampatri
                </span>
                <h2 className="text-lg font-black text-neutral-900">{seekerKundli.name}</h2>
                <p className="text-xs text-neutral-500">
                  {seekerKundli.dob} • {seekerKundli.tob} • {seekerKundli.place}
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-neutral-400 block font-bold uppercase">Active Dasha</span>
                <span className="text-xs font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                  {seekerKundli.dasha}
                </span>
              </div>
            </div>

            {/* Diamond Lagna Chart */}
            <div className="flex flex-col items-center">
              <KundliChart
                housePlanets={seekerKundli.housePlanets}
                lagnaSign={seekerKundli.lagna.sign}
                size={340}
              />
            </div>

            {/* Quick Chart summary cards */}
            <div className="grid grid-cols-3 gap-3 mt-4 text-center text-xs">
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                <span className="text-[10px] font-bold text-neutral-400 uppercase">Lagna</span>
                <div className="font-bold text-neutral-900">{seekerKundli.lagna.sign} ({seekerKundli.lagna.sanskrit})</div>
                <div className="text-[10px] text-orange-600 font-semibold">Lord: {seekerKundli.lagna.lord}</div>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                <span className="text-[10px] font-bold text-neutral-400 uppercase">Moon Sign</span>
                <div className="font-bold text-neutral-900">{seekerKundli.moonSign.sign}</div>
                <div className="text-[10px] text-orange-600 font-semibold">Nakshatra: {seekerKundli.moonSign.nakshatra}</div>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                <span className="text-[10px] font-bold text-neutral-400 uppercase">Mangal Dosha</span>
                <div className="font-bold text-rose-600">House 8 (Moderate)</div>
                <div className="text-[10px] text-neutral-500">Kuja Shanti required</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Active Voice Call + Chat + Privacy Sentinel */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          {/* Active Call Console */}
          <div className="bg-white rounded-3xl border border-orange-100 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">{seekerKundli.name}</h3>
                  <div className="text-[11px] text-neutral-500 font-mono flex items-center gap-1">
                    <Lock className="w-3 h-3 text-orange-500" />
                    <span>Masked ID: +91 98XXX-XX210</span>
                  </div>
                </div>
              </div>

              {/* Timer */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-orange-50 border border-orange-200 text-orange-800 text-xs font-mono font-bold">
                <Clock className="w-3.5 h-3.5 text-orange-500" />
                <span>{formatTimer(callTimer)}</span>
              </div>
            </div>

            {/* Audio Waveform visualization simulation */}
            {callActive && !terminatedBySecurity && (
              <div className="p-3 bg-neutral-900 rounded-2xl flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span className="font-mono text-emerald-400 text-[11px]">Audio Stream Encrypted</span>
                </div>
                <div className="flex gap-1 items-center h-4">
                  {[4, 12, 8, 16, 6, 14, 10, 18, 4, 12].map((h, i) => (
                    <span
                      key={i}
                      className="w-1 bg-orange-500 rounded-full animate-pulse"
                      style={{ height: `${h}px`, animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Call Controls */}
            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                  isMuted ? "bg-amber-100 border-amber-300 text-amber-800" : "bg-neutral-50 border-neutral-200"
                }`}
              >
                {isMuted ? <MicOff className="w-4 h-4 text-rose-500" /> : <Mic className="w-4 h-4 text-neutral-700" />}
                <span>{isMuted ? "Muted" : "Mute"}</span>
              </button>

              <button
                onClick={handleEndCall}
                className="px-4 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md transition-colors"
              >
                <PhoneOff className="w-4 h-4" />
                <span>{callActive ? "End Call" : "Call Ended (Summary)"}</span>
              </button>
            </div>

            {/* Privacy Sentinel Live Sentinel Button */}
            <div className="pt-2 border-t border-orange-50">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                  Voice Speech Privacy Sentinel
                </span>
                <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                  Active
                </span>
              </div>
              <p className="text-[10px] text-neutral-500 mb-2">
                If either seeker or astrologer speaks their personal phone number on the call, the call is instantly severed.
              </p>
              <button
                type="button"
                onClick={triggerSimulatedSpeechLeak}
                className="w-full py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>Simulate Phone Number Spoken on Call (Tests Instant Call Sever)</span>
              </button>
            </div>
          </div>

          {/* Consultation Chat Box with Number DLP Protection */}
          <div className="bg-white rounded-3xl border border-orange-100 p-4 shadow-sm flex-1 flex flex-col justify-between h-[340px]">
            <div className="overflow-y-auto space-y-2.5 flex-1 pr-1">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`p-2.5 rounded-xl text-xs leading-relaxed ${
                    m.sender === "system"
                      ? "bg-orange-50 border border-orange-200 text-orange-900 font-semibold"
                      : m.sender === "astrologer"
                      ? "bg-orange-500 text-white ml-auto max-w-[85%]"
                      : "bg-neutral-100 text-neutral-800 mr-auto max-w-[85%]"
                  }`}
                >
                  <div>{m.text}</div>
                  <div className={`text-[9px] mt-0.5 text-right ${m.sender === "astrologer" ? "text-orange-100" : "text-neutral-400"}`}>
                    {m.time}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {chatError && (
              <div className="p-2 my-1.5 bg-rose-50 border border-rose-200 text-rose-700 text-[11px] rounded-xl font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{chatError}</span>
              </div>
            )}

            <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-orange-50">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => { setChatInput(e.target.value); setChatError(""); }}
                placeholder="Type guidance (personal phone numbers are blocked)..."
                className="flex-1 px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:border-orange-500 text-neutral-800"
              />
              <button
                type="submit"
                onClick={handleSendMessage}
                disabled={!chatInput.trim()}
                className="p-2.5 bg-orange-500 hover:bg-orange-600 disabled:bg-neutral-300 text-white rounded-xl cursor-pointer shadow-xs transition-colors flex items-center justify-center"
                title="Send Message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Consultation Completed / End Call Summary Modal */}
      {showEndCallModal && !terminatedBySecurity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl border border-orange-100">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Call Completed
              </span>
              <h3 className="text-xl font-black text-neutral-900 mt-2">
                Consultation Finished
              </h3>
            </div>

            <div className="bg-orange-50/60 rounded-2xl p-4 border border-orange-100 space-y-2 text-left text-xs">
              <div className="flex justify-between items-center py-1 border-b border-orange-100/60">
                <span className="text-neutral-500">Caller:</span>
                <span className="font-bold text-neutral-900">{seekerKundli.name}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-orange-100/60">
                <span className="text-neutral-500">Call Duration:</span>
                <span className="font-mono font-bold text-neutral-900">{formatTimer(callTimer)}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-orange-100/60">
                <span className="text-neutral-500">Billing Rate:</span>
                <span className="font-bold text-neutral-900">₹25 / min</span>
              </div>
              <div className="flex justify-between items-center py-1 text-sm">
                <span className="font-bold text-neutral-800">Earned This Call:</span>
                <span className="font-black text-emerald-600">
                  ₹{Math.max(25, Math.ceil(callTimer / 60) * 25)}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-neutral-500">
              Earnings have been credited to your Astrologer Wallet.
            </p>

            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/astrologer/dashboard"
                className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-all block"
              >
                Complete &amp; Return to Cockpit
              </Link>
              <button
                type="button"
                onClick={() => setShowEndCallModal(false)}
                className="w-full py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Review Chat &amp; Chart Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Security Infraction Terminated Call Modal */}
      {terminatedBySecurity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl border-2 border-rose-500">
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto animate-pulse">
              <ShieldAlert className="w-10 h-10" />
            </div>

            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                Security Enforcement Action
              </span>
              <h3 className="text-xl font-black text-neutral-900 mt-2">
                CALL DISCONNECTED: PRIVACY POLICY TRIGGERED
              </h3>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              <strong>Reason:</strong> {securityReason || "Prohibited phone number speech detected in audio stream."}
            </p>

            <div className="p-3 bg-neutral-50 rounded-xl text-[11px] text-neutral-500 border border-neutral-200">
              Under AstroPrakash Trust &amp; Safety terms, attempting to share phone numbers or personal channels over voice calls results in instantaneous call termination to preserve seeker and guru privacy.
            </div>

            <div className="pt-2">
              <Link
                href="/astrologer/dashboard"
                className="block w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs"
              >
                Return to Astrologer Cockpit
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
