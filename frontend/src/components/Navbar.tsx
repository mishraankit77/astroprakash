"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Globe,
  MoreHorizontal,
} from "lucide-react";

interface NavbarProps {
  onOpenWallet?: () => void;
  walletBalance?: number;
}

interface NavLinkItem {
  name: string;
  href: string;
  icon: any;
  badge?: string;
  badgeColor?: string;
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
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("astroprakash_user");
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      }
    } catch {}

    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("astroprakash_user");
    setCurrentUser(null);
    setUserDropdownOpen(false);
  };

  const primaryNavLinks: NavLinkItem[] = [
    {
      name: t("navChat"),
      href: "/chat-with-astrologer",
      icon: MessageSquare,
      badge: "FREE",
      badgeColor: "bg-emerald-500",
    },
    {
      name: t("navTalk"),
      href: "/talk-to-astrologer",
      icon: PhoneCall,
      badge: "Live",
      badgeColor: "bg-rose-500 animate-pulse",
    },
    {
      name: t("navAI"),
      href: "/ai-astrologer",
      icon: Sparkles,
      badge: "AI",
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
  ];

  const secondaryNavLinks: NavLinkItem[] = [
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

  const allNavLinks: NavLinkItem[] = [...primaryNavLinks, ...secondaryNavLinks];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-orange-100 shadow-[0_2px_15px_-3px_rgba(255,152,0,0.08)] w-full">
        {/* Top Ticker Announcement */}
        <div className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 text-white text-[11px] font-semibold py-1 px-3 sm:px-6">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-2">
            <span className="hidden lg:flex items-center gap-2 truncate">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span className="truncate">{t("liveAstrologersTicker")}</span>
            </span>
            <span className="mx-auto lg:mx-0 font-bold bg-black/15 px-2.5 py-0.5 rounded-full text-[11px] shrink-0">
              {t("firstChatFree")}
            </span>
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <Link
                href="/astrologer"
                className="text-white hover:text-amber-100 text-[11px] font-bold bg-black/20 hover:bg-black/30 px-2.5 py-0.5 rounded-full border border-white/20 transition-all flex items-center gap-1"
              >
                <span>🪔 {t("astrologerPortalLink")}</span>
                <span className="text-[9px] bg-orange-500 text-white px-1.5 rounded-full">
                  {language === "hi" ? "जुड़ें" : "Join"}
                </span>
              </Link>
              <span className="text-orange-100 text-[11px] font-medium hidden xl:inline">
                {t("tollFreeText")}
              </span>
            </div>
          </div>
        </div>

        {/* Main Navbar Bar */}
        <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-6">
          <div className="flex items-center justify-between h-16 sm:h-18 gap-2">
            {/* Left: Brand Logo */}
            <div className="shrink-0 flex items-center">
              <Logo size="md" />
            </div>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 min-w-0">
              {/* Primary Links */}
              {primaryNavLinks.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative flex items-center gap-1 px-2 xl:px-2.5 py-1.5 text-[11px] xl:text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                      isActive
                        ? "text-orange-600 bg-orange-50/90 font-black shadow-xs"
                        : "text-neutral-700 hover:text-orange-600 hover:bg-orange-50/60"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-orange-500 shrink-0" />
                    <span>{item.name}</span>
                    {item.badge && (
                      <span
                        className={`text-[8px] xl:text-[9px] font-black text-white px-1 xl:px-1.5 py-0.2 rounded-full leading-tight shrink-0 ${item.badgeColor}`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}

              {/* Secondary Links for 2XL screens */}
              <div className="hidden 2xl:flex items-center space-x-1">
                {secondaryNavLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                        isActive
                          ? "text-orange-600 bg-orange-50/90 font-black"
                          : "text-neutral-700 hover:text-orange-600 hover:bg-orange-50/60"
                      }`}
                    >
                      <Icon className="w-4 h-4 text-orange-500 shrink-0" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* "More" Dropdown for screens between lg and 2xl */}
              <div className="relative 2xl:hidden" ref={moreRef}>
                <button
                  type="button"
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                  className={`flex items-center gap-1 px-2 py-1.5 text-xs font-bold rounded-lg text-neutral-700 hover:text-orange-600 hover:bg-orange-50/60 transition-colors ${
                    moreDropdownOpen ? "bg-orange-50 text-orange-600" : ""
                  }`}
                >
                  <span>{language === "hi" ? "अधिक" : "More"}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {moreDropdownOpen && (
                  <div className="absolute left-0 mt-1.5 w-44 bg-white rounded-xl shadow-xl border border-orange-100 py-1.5 z-50 animate-in fade-in zoom-in-95">
                    {secondaryNavLinks.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMoreDropdownOpen(false)}
                          className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold hover:bg-orange-50 hover:text-orange-600 ${
                            isActive ? "text-orange-600 bg-orange-50/60 font-bold" : "text-neutral-700"
                          }`}
                        >
                          <Icon className="w-4 h-4 text-orange-500" />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </nav>

            {/* Right: Actions Section (Language, Wallet, Profile) - Guaranteed No-Shrink & No-Clipping */}
            <div className="shrink-0 flex items-center space-x-1.5 sm:space-x-2.5">
              {/* Language Switcher Pill */}
              <button
                type="button"
                onClick={toggleLanguage}
                className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100/90 border border-amber-200 text-neutral-800 text-[11px] sm:text-xs font-bold transition-all cursor-pointer shadow-2xs shrink-0"
                title={language === "en" ? "हिन्दी में बदलें" : "Switch to English"}
              >
                <Globe className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                <span className="font-extrabold text-[11px]">
                  {language === "en" ? "हिन्दी" : "EN"}
                </span>
              </button>

              {/* AstroPrakash Wallet Pill */}
              <button
                type="button"
                onClick={onOpenWallet}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200/90 text-orange-900 text-xs font-extrabold hover:bg-orange-100 transition-all shadow-xs cursor-pointer group shrink-0"
                title="AstroPrakash Wallet"
              >
                <Wallet className="w-3.5 h-3.5 text-orange-500 group-hover:scale-110 transition-transform shrink-0" />
                <span>₹{currentUser?.walletBalance || walletBalance}</span>
                <span className="text-[9px] bg-orange-500 text-white px-1.5 py-0.2 rounded-full font-bold shrink-0">
                  + Add
                </span>
              </button>

              {/* Login / Profile Button */}
              {currentUser ? (
                <div className="relative shrink-0" ref={userRef}>
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-orange-100/80 border border-orange-200 text-neutral-800 text-xs font-bold hover:bg-orange-100 transition-colors cursor-pointer shrink-0"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white flex items-center justify-center text-xs font-black shadow-xs">
                      {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <span className="max-w-[70px] truncate hidden sm:inline text-xs">{currentUser.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-orange-100 py-2 z-50 animate-in fade-in zoom-in-95">
                      <div className="px-4 py-2 border-b border-orange-50">
                        <div className="text-xs font-bold text-neutral-900 truncate">{currentUser.name}</div>
                        <div className="text-[10px] text-neutral-400 truncate">{currentUser.phone}</div>
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
                        type="button"
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
                        type="button"
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
                  type="button"
                  onClick={() => setAuthModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs sm:text-xs font-extrabold shadow-sm shadow-orange-500/20 transition-all cursor-pointer shrink-0 whitespace-nowrap active:scale-95"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{t("signInBtn")}</span>
                </button>
              )}

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 rounded-lg text-neutral-600 hover:text-orange-600 hover:bg-orange-50 transition-colors shrink-0"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-orange-100 px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-200">
            {allNavLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold ${
                    isActive
                      ? "text-orange-600 bg-orange-50 font-black"
                      : "text-neutral-700 hover:text-orange-600 hover:bg-orange-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-orange-500" />
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
                <span className="text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded-full font-bold">
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
