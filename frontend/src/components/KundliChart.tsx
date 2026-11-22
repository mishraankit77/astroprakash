"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

interface KundliChartProps {
  housePlanets: Record<number, string[]>;
  lagnaSign?: string;
  size?: number;
}

export const KundliChart: React.FC<KundliChartProps> = ({
  housePlanets,
  lagnaSign = "Aries",
  size = 360,
}) => {
  const { language } = useLanguage();

  // North Indian Diamond Chart Layout
  // 12 Houses positioning in the 100x100 diamond SVG
  const houseLabels: Record<number, { x: number; y: number }> = {
    1: { x: 50, y: 32 },  // Lagna (Center-Top Diamond)
    2: { x: 26, y: 16 },  // Top-Left Triangle
    3: { x: 14, y: 32 },  // Left-Top Triangle
    4: { x: 30, y: 50 },  // Left Diamond
    5: { x: 14, y: 68 },  // Left-Bottom Triangle
    6: { x: 26, y: 84 },  // Bottom-Left Triangle
    7: { x: 50, y: 68 },  // Center-Bottom Diamond
    8: { x: 74, y: 84 },  // Bottom-Right Triangle
    9: { x: 86, y: 68 },  // Right-Bottom Triangle
    10: { x: 70, y: 50 }, // Right Diamond
    11: { x: 86, y: 32 }, // Right-Top Triangle
    12: { x: 74, y: 16 }, // Top-Right Triangle
  };

  const getPlanetAbbr = (p: string) => {
    if (language === "hi") {
      const hiMap: Record<string, string> = {
        Sun: "सूर्य", Moon: "चंद्र", Mars: "मंगल", Mercury: "बुध",
        Jupiter: "गुरु", Venus: "शुक्र", Saturn: "शनि", Rahu: "राहु", Ketu: "केतु"
      };
      return hiMap[p] || p;
    }

    const map: Record<string, string> = {
      Sun: "Su", Moon: "Mo", Mars: "Ma", Mercury: "Me",
      Jupiter: "Ju", Venus: "Ve", Saturn: "Sa", Rahu: "Ra", Ketu: "Ke"
    };
    return map[p] || p.substring(0, 2);
  };

  const rashiTranslation: Record<string, string> = {
    Aries: "मेष (Mesha)",
    Taurus: "वृषभ (Vrishabha)",
    Gemini: "मिथुन (Mithuna)",
    Cancer: "कर्क (Karka)",
    Leo: "सिंह (Simha)",
    Virgo: "कन्या (Kanya)",
    Libra: "तुला (Tula)",
    Scorpio: "वृश्चिक (Vrishchika)",
    Sagittarius: "धनु (Dhanu)",
    Capricorn: "मकर (Makara)",
    Aquarius: "कुम्भ (Kumbha)",
    Pisces: "मीन (Meena)",
  };

  const displayedLagna = language === "hi" && rashiTranslation[lagnaSign] ? rashiTranslation[lagnaSign] : lagnaSign;

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4 bg-gradient-to-br from-orange-50/50 via-white to-amber-50/30 rounded-2xl border border-orange-200 shadow-sm w-full max-w-full overflow-hidden">
      <div className="text-[11px] sm:text-xs font-bold text-orange-800 uppercase tracking-wider mb-2 flex items-center gap-1.5 text-center">
        <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping shrink-0" />
        {language === "hi" ? "वैदिक लग्न कुंडली (D-1 चक्र)" : "Vedic Lagna Kundli (D-1 Chart)"}
      </div>

      <svg
        viewBox="0 0 100 100"
        className="w-full max-w-[340px] aspect-square drop-shadow-md select-none mx-auto"
      >
        <defs>
          <linearGradient id="chartBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF9" />
            <stop offset="100%" stopColor="#FFF7ED" />
          </linearGradient>
        </defs>

        {/* Outer Square Border */}
        <rect
          x="2"
          y="2"
          width="96"
          height="96"
          fill="url(#chartBg)"
          stroke="#EA580C"
          strokeWidth="1.8"
          rx="2"
        />

        {/* Diagonal Cross Lines (X) */}
        <line x1="2" y1="2" x2="98" y2="98" stroke="#F97316" strokeWidth="1.2" />
        <line x1="2" y1="98" x2="98" y2="2" stroke="#F97316" strokeWidth="1.2" />

        {/* Inner Diamond (Kendra) */}
        <polygon
          points="50,2 98,50 50,98 2,50"
          fill="none"
          stroke="#EA580C"
          strokeWidth="1.5"
        />

        {/* House Numbers & Planets Placements */}
        {Object.entries(houseLabels).map(([houseStr, pos]) => {
          const houseNum = parseInt(houseStr);
          const planets = housePlanets[houseNum] || [];

          return (
            <g key={houseNum}>
              {/* House Number badge */}
              <text
                x={pos.x}
                y={pos.y - (planets.length > 0 ? 5 : 0)}
                textAnchor="middle"
                fontSize={language === "hi" ? "3.6" : "4"}
                fontWeight="bold"
                fill="#C2410C"
                opacity="0.8"
              >
                {language === "hi" ? `${houseNum}` : `H${houseNum}`}
              </text>

              {/* Planets in this House */}
              {planets.length > 0 && (
                <text
                  x={pos.x}
                  y={pos.y + 4}
                  textAnchor="middle"
                  fontSize={language === "hi" ? "3.4" : "4.2"}
                  fontWeight="900"
                  fill="#7C2D12"
                >
                  {planets.map(getPlanetAbbr).join(" ")}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <div className="mt-3 text-[11px] text-neutral-600 flex items-center gap-3">
        <span><strong className="text-orange-600">{language === "hi" ? "लग्न:" : "Lagna:"}</strong> {displayedLagna}</span>
        <span>•</span>
        <span><strong className="text-orange-600">{language === "hi" ? "परंपरा:" : "Tradition:"}</strong> {language === "hi" ? "महर्षि पराशर ज्योतिष" : "Parashari Jyotish"}</span>
      </div>
    </div>
  );
};
