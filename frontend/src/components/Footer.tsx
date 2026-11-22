"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldCheck, Lock, Award, Heart, Phone, Mail, MapPin } from "lucide-react";

export const Footer: React.FC = () => {
  const { language } = useLanguage();

  return (
    <footer className="bg-neutral-900 text-neutral-300 pt-16 pb-12 border-t-4 border-orange-500">
      {/* Top Highlight Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-neutral-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/60">
            <div className="p-2.5 rounded-lg bg-orange-500/10 text-orange-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                {language === "hi" ? "100% प्रमाणित ज्योतिषी" : "100% Verified Astrologers"}
              </h4>
              <p className="text-xs text-neutral-400">
                {language === "hi" ? "कठिन 4-स्तरीय वैदिक परीक्षा" : "Strict 4-tier Vedic assessment"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/60">
            <div className="p-2.5 rounded-lg bg-orange-500/10 text-orange-400">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                {language === "hi" ? "गोपनीय एवं सुरक्षित" : "Private & Confidential"}
              </h4>
              <p className="text-xs text-neutral-400">
                {language === "hi" ? "मास्क्ड कॉल्स व एन्क्रिप्टेड चैट" : "End-to-end encrypted consultations"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/60">
            <div className="p-2.5 rounded-lg bg-orange-500/10 text-orange-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                {language === "hi" ? "सत्यापित एस्ट्रोमॉल" : "Certified AstroMall"}
              </h4>
              <p className="text-xs text-neutral-400">
                {language === "hi" ? "लैब-प्रमाणित रत्न एवं रुद्राक्ष" : "Lab-tested pure gemstones & pooja"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/60">
            <div className="p-2.5 rounded-lg bg-orange-500/10 text-orange-400">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                {language === "hi" ? "4.9/5 साधक संतुष्टि" : "4.9/5 User Satisfaction"}
              </h4>
              <p className="text-xs text-neutral-400">
                {language === "hi" ? "500,000+ संतुष्ट परामर्श" : "Over 500,000+ guided seekers"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white inline-block p-2 rounded-xl">
              <Logo size="md" />
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed pr-6">
              {language === "hi"
                ? "एस्ट्रोप्रकाश प्राचीन वैदिक ज्योतिष परंपरा एवं आधुनिक AI तकनीक का संगम है। करियर, विवाह, धन एवं मानसिक शांति के लिए भारत के शीर्ष ज्योतिषियों से 24x7 सीधे परामर्श प्राप्त करें।"
                : "AstroPrakash illuminates your life path by fusing authentic Vedic Jyotish tradition with modern cutting-edge AI guidance. Connect 24x7 with India's leading astrologers, tarot readers, and numerologists for career, marriage, finance, and spiritual peace."}
            </p>
            <div className="pt-2 space-y-2 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>{language === "hi" ? "वाराणसी एवं नई दिल्ली, भारत" : "Varanasi & New Delhi, India"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500" />
                <span>support@astroprakash.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500" />
                <span>+91 1800 278 7672 ({language === "hi" ? "टोल फ्री" : "Toll Free"})</span>
              </div>
            </div>
          </div>

          {/* Horoscopes & Kundli */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-orange-500/40 pb-1">
              {language === "hi" ? "ज्योतिष सेवाएं" : "Astrology Tools"}
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/free-kundli" className="hover:text-orange-400 transition-colors">{language === "hi" ? "मुफ्त जन्म कुंडली" : "Free Janam Kundli"}</Link></li>
              <li><Link href="/kundli-matching" className="hover:text-orange-400 transition-colors">{language === "hi" ? "कुंडली मिलान (36 गुण)" : "Kundli Milan (36 Gunas)"}</Link></li>
              <li><Link href="/horoscopes" className="hover:text-orange-400 transition-colors">{language === "hi" ? "दैनिक राशिफल" : "Daily Horoscope"}</Link></li>
              <li><Link href="/panchang" className="hover:text-orange-400 transition-colors">{language === "hi" ? "आज का पंचांग" : "Today's Panchang"}</Link></li>
              <li><Link href="/free-kundli" className="hover:text-orange-400 transition-colors">{language === "hi" ? "मांगलिक दोष विश्लेषण" : "Mangal Dosha Analysis"}</Link></li>
              <li><Link href="/free-kundli" className="hover:text-orange-400 transition-colors">{language === "hi" ? "साढ़े साती कैलकुलेटर" : "Sade Sati Calculator"}</Link></li>
            </ul>
          </div>

          {/* Consultations */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-orange-500/40 pb-1">
              {language === "hi" ? "परामर्श" : "Consultations"}
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/chat-with-astrologer" className="hover:text-orange-400 transition-colors">{language === "hi" ? "ज्योतिषी से चैट करें" : "Chat with Astrologer"}</Link></li>
              <li><Link href="/talk-to-astrologer" className="hover:text-orange-400 transition-colors">{language === "hi" ? "ज्योतिषी से बात करें" : "Talk to Astrologer"}</Link></li>
              <li><Link href="/ai-astrologer" className="hover:text-orange-400 transition-colors">{language === "hi" ? "प्रकाश AI परामर्श" : "Prakash AI Consultation"}</Link></li>
              <li><Link href="/chat-with-astrologer?category=Vedic" className="hover:text-orange-400 transition-colors">{language === "hi" ? "वैदिक ज्योतिषाचार्य" : "Vedic Astrologers"}</Link></li>
              <li><Link href="/chat-with-astrologer?category=Tarot" className="hover:text-orange-400 transition-colors">{language === "hi" ? "टैरो कार्ड रीडर्स" : "Tarot Card Readers"}</Link></li>
              <li><Link href="/chat-with-astrologer?category=Numerology" className="hover:text-orange-400 transition-colors">{language === "hi" ? "अंकशास्त्री" : "Numerologists"}</Link></li>
            </ul>
          </div>

          {/* AstroMall & Company */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-orange-500/40 pb-1">
              {language === "hi" ? "एस्ट्रोमॉल एवं अनुष्ठान" : "AstroMall & Rituals"}
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/astromall" className="hover:text-orange-400 transition-colors">{language === "hi" ? "प्रमाणित रत्न" : "Certified Gemstones"}</Link></li>
              <li><Link href="/astromall" className="hover:text-orange-400 transition-colors">{language === "hi" ? "प्रामाणिक रुद्राक्ष" : "Original Rudraksha"}</Link></li>
              <li><Link href="/astromall" className="hover:text-orange-400 transition-colors">{language === "hi" ? "सिद्ध यंत्र" : "Energized Yantras"}</Link></li>
              <li><Link href="/astromall" className="hover:text-orange-400 transition-colors">{language === "hi" ? "ऑनलाइन पूजा अनुष्ठान" : "Online Pooja Booking"}</Link></li>
              <li><Link href="/astrologer" className="hover:text-orange-400 transition-colors">{language === "hi" ? "ज्योतिषी बनें (पोर्टल)" : "Join as Astrologer"}</Link></li>
              <li><Link href="/" className="hover:text-orange-400 transition-colors">{language === "hi" ? "नियम एवं गोपनीयता" : "Privacy & Terms"}</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright & Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-neutral-800 text-xs text-neutral-500 text-center space-y-2">
        <p>
          {language === "hi"
            ? "अस्वीकरण: एस्ट्रोप्रकाश ज्योतिष-आधारित परामर्श एवं AI-संचालित विश्लेषण केवल आध्यात्मिक एवं व्यक्तिगत मार्गदर्शन हेतु प्रदान करता है।"
            : "Disclaimer: AstroPrakash provides astrology-based consultations and AI-driven insights for personal spiritual reflection. Astrology is an ancient interpretive Vedic system; predictions and advice should be received with discernment."}
        </p>
        <p>
          © 2026 AstroPrakash Technologies Pvt. Ltd. {language === "hi" ? "सर्वाधिकार सुरक्षित।" : "All rights reserved."}
        </p>
      </div>
    </footer>
  );
};
