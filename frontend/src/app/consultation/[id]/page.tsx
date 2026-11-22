"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Send,
  PhoneCall,
  MessageSquare,
  Clock,
  Star,
  Shield,
  X,
  Sparkles,
  PhoneOff,
  User,
  CheckCircle2,
  ShieldAlert,
  AlertTriangle,
  Lock,
  ShieldCheck,
} from "lucide-react";

interface Message {
  id: string;
  sender: "astrologer" | "user" | "system";
  text: string;
  time: string;
  isWarning?: boolean;
}

function ConsultationRoomContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const sessionId = (params?.id as string) || "session_1";

  const [session, setSession] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "sec_1",
      sender: "system",
      text: "🛡️ Privacy Protection Active: All direct phone numbers and contacts are 100% masked. Sharing personal mobile numbers in chat or speaking numbers on the call is prohibited and monitored.",
      time: "Just Now",
    },
    {
      id: "1",
      sender: "astrologer",
      text: "Pranam! I am Acharya Raghav Shastri. Please share your birth details (Date, Time, Place) and your question so I can calculate your planetary chart.",
      time: "10:00 AM",
    },
  ]);

  const [input, setInput] = useState("");
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [ended, setEnded] = useState(false);
  const [terminatedBySecurity, setTerminatedBySecurity] = useState(false);
  const [securityReason, setSecurityReason] = useState("");
  const [chatWarning, setChatWarning] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Timer increment
  useEffect(() => {
    if (ended || terminatedBySecurity) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [ended, terminatedBySecurity]);

  // Load session from backend
  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/consultation/${sessionId}`);
        if (res.ok) {
          const data = await res.json();
          setSession(data);
          if (data.messages && data.messages.length > 0) {
            setMessages(data.messages);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchSession();
  }, [sessionId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || ended || terminatedBySecurity) return;

    setChatWarning("");

    // DLP Filter: Check for 10-digit number or phone sequence
    const hasPhone = /(?:\+?91[\s\-]?)?(?:[6-9]\d{9}|[6-9][\s\.\-_/]*\d[\s\.\-_/]*\d[\s\.\-_/]*\d[\s\.\-_/]*\d[\s\.\-_/]*\d[\s\.\-_/]*\d[\s\.\-_/]*\d[\s\.\-_/]*\d[\s\.\-_/]*\d)/.test(
      text
    );

    if (hasPhone) {
      setInput("");
      const blockedNotice: Message = {
        id: Date.now().toString(),
        sender: "system",
        text: "⚠️ Message Blocked: Sharing personal phone numbers is prohibited by Privacy Policy. All consultations must stay within AstroPrakash.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isWarning: true,
      };
      setMessages((prev) => [...prev, blockedNotice]);
      setChatWarning("⚠️ Message Blocked: Sharing phone numbers or personal contacts is forbidden.");
      return;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/consultation/${sessionId}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionId,
          text: text,
          sender: "user",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.status === "blocked") {
          setIsTyping(false);
          setMessages((prev) => [...prev, data.systemMessage]);
          return;
        }

        setTimeout(() => {
          setMessages((prev) => [...prev, data.astrologerMessage]);
          setIsTyping(false);
        }, 1200);
      } else {
        throw new Error();
      }
    } catch {
      setTimeout(() => {
        const fallbackAstro: Message = {
          id: (Date.now() + 1).toString(),
          sender: "astrologer",
          text: "I am examining your 10th and 7th house charts. Planetary transit suggests positive developments in coming months. Keep reciting the Gayatri Mantra daily.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, fallbackAstro]);
        setIsTyping(false);
      }, 1500);
    }
  };

  // Simulating Voice Call Speech Leakage (Triggering Automatic Call Sever)
  const triggerSimulatedSpeechLeak = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/consultation/${sessionId}/audio-sentinel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionId,
          transcriptSnippet: "Call me at nine eight seven six five four three two one zero on my personal phone.",
        }),
      });
      const data = await res.json();
      if (data.terminated) {
        setEnded(true);
        setTerminatedBySecurity(true);
        setSecurityReason(data.reason);
      }
    } catch {
      setEnded(true);
      setTerminatedBySecurity(true);
      setSecurityReason("Phone number speech sequence detected over audio stream.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col text-neutral-800">
      {/* Astrologer Active Consultation Header */}
      <header className="bg-white border-b border-orange-100 shadow-sm sticky top-0 z-40 px-4 py-3 sm:px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          {/* Left: Astrologer info */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256"
                alt="Acharya Raghav Shastri"
                className="w-11 h-11 rounded-full object-cover border-2 border-orange-400 p-0.5"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-neutral-900">
                  {session?.astrologer?.name || "Acharya Raghav Shastri"}
                </h2>
                <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                  Verified Guru
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-neutral-500">
                <span className="flex items-center gap-1 font-mono text-neutral-600">
                  <Lock className="w-3 h-3 text-orange-500" />
                  Masked Virtual Line #409
                </span>
                <span>•</span>
                <span>Rate: <strong className="text-orange-600">₹25/min</strong> (First Session FREE)</span>
              </div>
            </div>
          </div>

          {/* Center/Right: Timer & End Consultation */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-800 font-mono text-xs sm:text-sm font-bold">
              <Clock className="w-4 h-4 text-orange-500 animate-spin" style={{ animationDuration: "6s" }} />
              <span>{formatTimer(timerSeconds)}</span>
            </div>

            <button
              onClick={() => setEnded(true)}
              className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <PhoneOff className="w-3.5 h-3.5" />
              <span>End Session</span>
            </button>
          </div>
        </div>
      </header>

      {/* Privacy Active Audio Sentinel Banner */}
      <div className="bg-orange-50 border-b border-orange-200 py-1.5 px-4 text-center text-xs text-orange-900 font-semibold flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Privacy Protection Active: Neither party can see personal numbers. Speaking numbers cuts call automatically.</span>
        <button
          onClick={triggerSimulatedSpeechLeak}
          className="ml-2 text-[10px] bg-rose-100 hover:bg-rose-200 text-rose-700 px-2 py-0.5 rounded-md font-bold transition-colors cursor-pointer"
        >
          [Test Voice Sentinel]
        </button>
      </div>

      {/* Main Chat Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-4 flex flex-col justify-between">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-3xl bg-white border border-orange-100 shadow-xs mb-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 max-w-2xl ${
                m.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              <div className="flex-shrink-0">
                {m.sender === "user" ? (
                  <div className="w-8 h-8 rounded-full bg-neutral-200 text-neutral-700 flex items-center justify-center font-bold text-xs">
                    <User className="w-4 h-4" />
                  </div>
                ) : m.sender === "system" ? (
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs">
                    <Shield className="w-4 h-4" />
                  </div>
                ) : (
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256"
                    alt="Astrologer"
                    className="w-8 h-8 rounded-full object-cover border border-orange-400"
                  />
                )}
              </div>

              <div
                className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  m.sender === "system"
                    ? "bg-orange-50/90 border border-orange-200 text-orange-950 font-medium"
                    : m.sender === "user"
                    ? "bg-orange-500 text-white rounded-tr-xs shadow-md shadow-orange-500/15"
                    : "bg-[#FFF9F2] text-neutral-800 border border-orange-200/80 rounded-tl-xs shadow-xs"
                }`}
              >
                <div className="whitespace-pre-line">{m.text}</div>
                <div
                  className={`text-[9px] mt-1.5 text-right ${
                    m.sender === "user" ? "text-orange-100" : "text-neutral-400"
                  }`}
                >
                  {m.time}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2 items-center text-xs text-orange-600 italic">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce delay-100" />
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce delay-200" />
              <span>Astrologer is calculating your planetary degrees...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {chatWarning && (
          <div className="mb-2 p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-bold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{chatWarning}</span>
          </div>
        )}

        {/* Quick prompt suggestions */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-2 no-scrollbar">
          {[
            "When will my career promote?",
            "Do I have Mangal Dosha?",
            "What is the best time for my marriage?",
            "Suggest lucky gemstone for wealth",
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1 rounded-xl bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-800 text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer flex-shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Message Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 bg-white rounded-2xl border border-orange-200 p-2 shadow-sm focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500 transition-all"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => { setInput(e.target.value); setChatWarning(""); }}
            disabled={ended || terminatedBySecurity}
            placeholder={
              terminatedBySecurity
                ? "Call terminated by Privacy Policy."
                : ended
                ? "Consultation has ended."
                : "Type your query here (personal phone numbers are blocked)..."
            }
            className="flex-1 px-3 py-2 text-sm text-neutral-800 bg-transparent focus:outline-none placeholder-neutral-400"
          />

          <button
            type="submit"
            disabled={ended || terminatedBySecurity || !input.trim()}
            className="p-3 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:bg-neutral-200 text-white transition-all cursor-pointer shadow-md shadow-orange-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </main>

      {/* Security Infraction Terminated Call Modal */}
      {terminatedBySecurity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl border-2 border-rose-500">
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto animate-pulse">
              <ShieldAlert className="w-10 h-10" />
            </div>

            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                Security Policy Triggered
              </span>
              <h3 className="text-xl font-black text-neutral-900 mt-2">
                CALL DISCONNECTED: PRIVACY POLICY TRIGGERED
              </h3>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              <strong>Reason:</strong> {securityReason || "Prohibited phone number speech detected over voice stream."}
            </p>

            <div className="p-3 bg-neutral-50 rounded-xl text-[11px] text-neutral-500 border border-neutral-200">
              Under AstroPrakash Trust &amp; Safety terms, attempting to share phone numbers or personal channels over voice calls results in instantaneous call termination to preserve seeker and guru privacy.
            </div>

            <div className="pt-2">
              <Link
                href="/"
                className="block w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs"
              >
                Back to AstroPrakash Home
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* End Consultation Summary Modal */}
      {ended && !terminatedBySecurity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl border border-orange-100">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h3 className="text-xl font-bold text-neutral-900">Consultation Completed</h3>
            <p className="text-xs text-neutral-500">
              Total Duration: <strong>{formatTimer(timerSeconds)}</strong> • First Chat was <strong>FREE</strong>
            </p>

            {reviewSubmitted ? (
              <div className="p-4 bg-emerald-50 rounded-2xl text-xs text-emerald-800 font-bold">
                Thank you for your valuable feedback!
              </div>
            ) : (
              <div className="p-4 bg-orange-50/60 rounded-2xl border border-orange-100 space-y-3">
                <span className="text-xs font-bold text-neutral-700 block">Rate Your Experience</span>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="text-2xl cursor-pointer"
                    >
                      {star <= rating ? "⭐" : "☆"}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setReviewSubmitted(true)}
                  className="px-4 py-2 bg-orange-500 text-white rounded-xl text-xs font-bold hover:bg-orange-600"
                >
                  Submit Review
                </button>
              </div>
            )}

            <div className="pt-2">
              <Link
                href="/"
                className="inline-block w-full py-3 rounded-xl bg-neutral-900 text-white font-bold text-xs hover:bg-neutral-800 transition-colors"
              >
                Back to AstroPrakash Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ConsultationRoomPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-orange-500 font-bold">Connecting Consultation...</div>}>
      <ConsultationRoomContent />
    </Suspense>
  );
}
