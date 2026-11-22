"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "./Logo";
import { AuthModal } from "./AuthModal";
import { useLanguage } from "@/context/LanguageContext";
import {
  MessageSquare,
  PhoneCall,
  Sparkles,
  Compass,
  HeartHandshake,
  SunMedium,
  ShoppingBag,
  Wallet,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  Clock,
  ShieldCheck,
  Search,
  Globe,
} from "lucide-react";

interface NavbarProps {
  onOpenWallet?: () => void;
  walletBalance?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenWallet,
  walletBalance = 100,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("astroprakash_user");
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      }
    } catch {}
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("astroprakash_user");
    setCurrentUser(null);
    setUserDropdownOpen(false);
  };

  const navLinks = [
    {
      name: t("navChat"),
      href: "/chat-with-astrologer",
      icon: MessageSquare,
      badge: language === "hi" ? "पहली चैट मुफ्त" : "FREE 1st Chat",
      badgeColor: "bg-emerald-500",
    },
    {
      name: t("navTalk"),
      href: "/talk-to-astrologer",
      icon: PhoneCall,
      badge: language === "hi" ? "लाइव" : "Live",
      badgeColor: "bg-red-500 animate-pulse",
    },
    {
      name: t("navAI"),
      href: "/ai-astrologer",
      icon: Sparkles,
      badge: language === "hi" ? "वैदिक AI" : "Vedic AI",
      badgeColor: "bg-orange-500",
    },
    {
      name: t("navFreeKundli"),
      href: "/free-kundli",
      icon: Compass,
    },
    {
      name: t("navMatching"),
      href: "/kundli-matching",
      icon: HeartHandshake,
    },
    {
      name: t("navHoroscopes"),
      href: "/horoscopes",
      icon: SunMedium,
    },
    {
      name: t("navAstromall"),
      href: "/astromall",
      icon: ShoppingBag,
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-orange-100 shadow-[0_2px_15px_-3px_rgba(255,152,0,0.08)]">
        {/* Top Ticker Announcement (Astrotalk Style) */}
        <div className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 text-white text-xs font-semibold py-1.5 px-4 text-center">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <span className="hidden md:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{t("liveAstrologersTicker")}</span>
            </span>
            <span className="mx-auto md:mx-0 font-bold bg-black/15 px-3 py-0.5 rounded-full">
              {t("firstChatFree")}
            </span>
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/astrologer"
                className="text-white hover:text-amber-200 text-xs font-bold bg-black/20 px-2.5 py-0.5 rounded-full border border-white/20 transition-colors flex items-center gap-1"
              >
                <span>🪔 {t("astrologerPortalLink")}</span>
                <span className="text-[10px] bg-orange-500 text-white px-1.5 rounded-full">
                  {language === "hi" ? "जुड़ें" : "Join"}
                </span>
              </Link>
              <span className="text-orange-100 text-[11px]">
                {t("tollFreeText")}
              </span>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo size="md" />
            </div>

            {/* Desktop Nav Links */}
            <nav className="hidden xl:flex items-center space-x-1">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl transition-all ${
                      isActive
                        ? "text-orange-600 bg-orange-50/80 font-black shadow-xs"
                        : "text-neutral-700 hover:text-orange-600 hover:bg-orange-50/50"
                    }`}
                  >
                    <Icon className="w-4 h-4 text-orange-500" />
                    <span>{item.name}</span>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-black text-white px-1.5 py-0.5 rounded-full leading-none shadow-xs ${item.badgeColor}`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons (Language, Wallet & Profile) */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Language Switcher Pill */}
              <button
                type="button"
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-neutral-800 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                title={language === "en" ? "Switch to Hindi (हिन्दी में बदलें)" : "Switch to English"}
              >
                <Globe className="w-3.5 h-3.5 text-orange-600" />
                <span className="font-extrabold text-[11px] sm:text-xs">
                  {language === "en" ? "हिन्दी" : "English"}
                </span>
                <span className="text-[9px] bg-orange-500 text-white font-black px-1.5 py-0.5 rounded-full">
                  {language.toUpperCase()}
                </span>
              </button>

              {/* Wallet button */}
              <button
                onClick={onOpenWallet}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs sm:text-sm font-black hover:bg-orange-100 transition-all shadow-xs cursor-pointer group"
                title="AstroPrakash Wallet"
              >
                <Wallet className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform" />
                <span>₹{currentUser?.walletBalance || walletBalance}</span>
                <span className="text-[10px] bg-orange-500 text-white px-1.5 py-0.5 rounded-full font-bold ml-0.5">
                  + Add
                </span>
              </button>

              {/* Login / Profile button */}
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100/70 border border-orange-200 text-neutral-800 text-xs font-bold hover:bg-orange-100 transition-colors cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-black">
                      {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <span className="max-w-[80px] truncate hidden sm:inline">{currentUser.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-orange-100 py-2 z-50 animate-in fade-in">
                      <div className="px-4 py-2 border-b border-orange-50">
                        <div className="text-xs font-bold text-neutral-900 truncate">{currentUser.name}</div>
                        <div className="text-[10px] text-neutral-400">{currentUser.phone}</div>
                      </div>
                      <Link
                        href="/free-kundli"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs text-neutral-700 hover:bg-orange-50 hover:text-orange-600 font-medium"
                      >
                        <Compass className="w-3.5 h-3.5 text-orange-500" />
                        <span>{language === "hi" ? "मेरी जन्म कुंडली" : "My Janam Kundli"}</span>
                      </Link>
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          if (onOpenWallet) onOpenWallet();
                        }}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs text-neutral-700 hover:bg-orange-50 hover:text-orange-600 font-medium cursor-pointer"
                      >
                        <Wallet className="w-3.5 h-3.5 text-orange-500" />
                        <span>{language === "hi" ? "वॉलेट रिचार्ज" : "Recharge Wallet"}</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-bold border-t border-orange-50 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>{language === "hi" ? "लॉग आउट" : "Sign Out"}</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-black shadow-md shadow-orange-500/20 transition-all cursor-pointer hover:scale-102"
                >
                  <User className="w-4 h-4" />
                  <span>{t("signInBtn")}</span>
                </button>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-lg text-neutral-600 hover:text-orange-600 hover:bg-orange-50"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-orange-100 px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-200">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold ${
                    isActive
                      ? "text-orange-600 bg-orange-50"
                      : "text-neutral-700 hover:text-orange-600 hover:bg-orange-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-orange-500" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-black text-white px-2 py-0.5 rounded-full ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-orange-100 mt-2 space-y-2">
              {/* Mobile Language Switcher */}
              <button
                type="button"
                onClick={() => {
                  toggleLanguage();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold bg-amber-50 border border-amber-200 text-neutral-800"
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-orange-600" />
                  <span>{language === "en" ? "भाषा बदलें (Switch to हिन्दी)" : "Switch to English"}</span>
                </div>
                <span className="text-[10px] bg-orange-500 text-white font-bold px-2 py-0.5 rounded-full">
                  {language === "en" ? "हिन्दी" : "English"}
                </span>
              </button>

              <Link
                href="/astrologer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold bg-orange-100/70 text-orange-900"
              >
                <span>🪔 {t("astrologerPortalLink")}</span>
                <span className="text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded-full">
                  {language === "hi" ? "हमारे साथ जुड़ें" : "Earn with us"}
                </span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
        }}
      />
    </>
  );
};
