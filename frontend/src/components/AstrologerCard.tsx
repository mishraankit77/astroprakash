"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Star, MessageSquare, PhoneCall, CheckCircle2, Shield } from "lucide-react";

export interface AstrologerData {
  id: string;
  name: string;
  avatar: string;
  skills: string[];
  languages: string[];
  experienceYears: number;
  rating: number;
  totalOrders: number;
  pricePerMinute: number;
  discountedPrice: number;
  isOnline: boolean;
  isBusy: boolean;
  bio: string;
  category: string;
  badge?: string;
}

interface AstrologerCardProps {
  astrologer: AstrologerData;
  onSelect?: (astro: AstrologerData, type: "chat" | "call") => void;
}

export const AstrologerCard: React.FC<AstrologerCardProps> = ({
  astrologer,
  onSelect,
}) => {
  const { language, t } = useLanguage();

  return (
    <div className="bg-white rounded-2xl border border-orange-100 hover:border-orange-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      {/* Top Section */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-4">
          {/* Avatar with Status indicator */}
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-orange-300 p-0.5 bg-orange-50">
              <img
                src={astrologer.avatar}
                alt={astrologer.name}
                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Status Dot */}
            <span
              className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${
                astrologer.isBusy
                  ? "bg-amber-500"
                  : astrologer.isOnline
                  ? "bg-emerald-500 animate-pulse"
                  : "bg-neutral-400"
              }`}
              title={astrologer.isBusy ? (language === "hi" ? "व्यस्त" : "Busy") : astrologer.isOnline ? (language === "hi" ? "ऑनलाइन" : "Online") : "Offline"}
            />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 truncate group-hover:text-orange-600 transition-colors">
                {astrologer.name}
              </h3>
              {astrologer.badge && (
                <span className="text-[10px] font-semibold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full border border-orange-200">
                  {astrologer.badge}
                </span>
              )}
            </div>

            {/* Rating & Orders */}
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded text-amber-700 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{astrologer.rating.toFixed(1)}</span>
              </div>
              <span className="text-xs text-neutral-500">
                ({(astrologer.totalOrders / 1000).toFixed(1)}k {language === "hi" ? "परामर्श" : "orders"})
              </span>
            </div>

            {/* Skills */}
            <p className="text-xs text-neutral-600 truncate mt-1.5 font-medium">
              {astrologer.skills.join(", ")}
            </p>

            {/* Languages & Experience */}
            <div className="flex items-center gap-2 text-xs text-neutral-500 mt-1">
              <span>{astrologer.languages.join(", ")}</span>
              <span>•</span>
              <span>{language === "hi" ? `अनुभव: ${astrologer.experienceYears} वर्ष` : `Exp: ${astrologer.experienceYears} Years`}</span>
            </div>
          </div>
        </div>

        {/* Pricing tag */}
        <div className="mt-4 pt-3 border-t border-orange-50 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-black text-orange-600">
              ₹{astrologer.discountedPrice}/{language === "hi" ? "मिनट" : "min"}
            </span>
            <span className="text-xs text-neutral-400 line-through">
              ₹{astrologer.pricePerMinute}/{language === "hi" ? "मिनट" : "min"}
            </span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded ml-1">
              {language === "hi" ? "पहली चैट FREE" : "FREE First"}
            </span>
          </div>

          <div className="text-[11px] font-medium text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>{language === "hi" ? "प्रमाणित आचार्य" : "Verified Acharya"}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 border-t border-orange-100 bg-orange-50/40">
        <button
          onClick={() => onSelect && onSelect(astrologer, "chat")}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs sm:text-sm font-bold text-neutral-700 hover:text-orange-600 hover:bg-orange-100/70 transition-colors border-r border-orange-100 cursor-pointer"
        >
          <MessageSquare className="w-4 h-4 text-orange-500" />
          <span>{language === "hi" ? "चैट करें" : "Chat"}</span>
        </button>

        <button
          onClick={() => onSelect && onSelect(astrologer, "call")}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs sm:text-sm font-bold text-orange-600 hover:text-white hover:bg-orange-500 transition-colors cursor-pointer"
        >
          <PhoneCall className="w-4 h-4 text-orange-500 group-hover:text-white" />
          <span>{language === "hi" ? "कॉल करें" : "Call"}</span>
        </button>
      </div>
    </div>
  );
};
