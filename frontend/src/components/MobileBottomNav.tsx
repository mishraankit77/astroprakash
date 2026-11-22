"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import {
  MessageSquare,
  PhoneCall,
  Sparkles,
  Compass,
  UserCheck,
} from "lucide-react";

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const { language, t } = useLanguage();

  const navItems = [
    {
      name: language === "hi" ? "चैट" : "Chat",
      href: "/chat-with-astrologer",
      icon: MessageSquare,
      badge: "FREE",
      badgeColor: "bg-emerald-500",
    },
    {
      name: language === "hi" ? "कॉल" : "Call",
      href: "/talk-to-astrologer",
      icon: PhoneCall,
      badge: "Live",
      badgeColor: "bg-rose-500 animate-pulse",
    },
    {
      name: "Prakash AI",
      href: "/ai-astrologer",
      icon: Sparkles,
      badge: "AI",
      badgeColor: "bg-orange-500",
      isSpecial: true,
    },
    {
      name: language === "hi" ? "कुंडली" : "Kundli",
      href: "/free-kundli",
      icon: Compass,
    },
    {
      name: language === "hi" ? "ज्योतिषी" : "Astrologer",
      href: "/astrologer",
      icon: UserCheck,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-orange-100 shadow-[0_-4px_20px_rgba(255,152,0,0.08)] lg:hidden px-2 py-1 safe-area-bottom">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          if (item.isSpecial) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative -top-3 flex flex-col items-center group shrink-0"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
                    isActive
                      ? "bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-400 text-white shadow-orange-500/40 ring-2 ring-white"
                      : "bg-gradient-to-tr from-orange-500 to-amber-500 text-white shadow-orange-500/25"
                  }`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-[10px] font-black text-orange-600 mt-0.5">
                  {item.name}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
                isActive
                  ? "text-orange-600 font-bold"
                  : "text-neutral-500 hover:text-orange-500"
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? "text-orange-600" : "text-neutral-400"}`} />
                {item.badge && (
                  <span
                    className={`absolute -top-1.5 -right-3 text-[8px] font-black text-white px-1 py-0.2 rounded-full leading-tight ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 ${isActive ? "font-bold text-orange-600" : "font-medium"}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
