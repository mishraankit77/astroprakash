import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  size = "md",
  showText = true,
}) => {
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-11 h-11",
    lg: "w-16 h-16",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group ${className}`}>
      {/* Custom Yogi in Dhyan with Rising Sun Emblem */}
      <div className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-orange-100 p-1.5 shadow-sm border border-orange-200/80 transition-transform group-hover:scale-105 duration-300 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Defs for gradients */}
          <defs>
            {/* Rising Sun Radial Gradient */}
            <radialGradient id="sunGlow" cx="50%" cy="55%" r="50%">
              <stop offset="0%" stopColor="#FFF3B0" />
              <stop offset="40%" stopColor="#FFA000" />
              <stop offset="85%" stopColor="#FF6D00" />
              <stop offset="100%" stopColor="#EA580C" />
            </radialGradient>

            {/* Yogi Gradient */}
            <linearGradient id="yogiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9A3412" />
              <stop offset="100%" stopColor="#7C2D12" />
            </linearGradient>

            {/* Aura Halo Ring */}
            <radialGradient id="auraGlow" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#FED7AA" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FED7AA" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background Aura */}
          <circle cx="50" cy="50" r="46" fill="url(#auraGlow)" />

          {/* Rising Sun (half disk with rays) */}
          <path
            d="M 16 65 A 34 34 0 0 1 84 65 Z"
            fill="url(#sunGlow)"
            className="animate-pulse"
            style={{ animationDuration: "3s" }}
          />

          {/* Sun Rays radiating outwards */}
          <g stroke="#FB923C" strokeWidth="2.5" strokeLinecap="round">
            {/* Top Ray */}
            <line x1="50" y1="20" x2="50" y2="10" />
            {/* Top-Right 1 */}
            <line x1="64" y1="24" x2="71" y2="16" />
            {/* Top-Right 2 */}
            <line x1="75" y1="36" x2="85" y2="30" />
            {/* Top-Left 1 */}
            <line x1="36" y1="24" x2="29" y2="16" />
            {/* Top-Left 2 */}
            <line x1="25" y1="36" x2="15" y2="30" />
          </g>

          {/* Rising Sun Horizon Line */}
          <line x1="12" y1="67" x2="88" y2="67" stroke="#FDBA74" strokeWidth="2" strokeDasharray="2 3" opacity="0.7" />

          {/* Yogi Aura / Dhyan Halo behind head */}
          <circle cx="50" cy="42" r="10" fill="#FEF08A" opacity="0.85" />

          {/* Yogi in Dhyan (Meditation) Silhouette */}
          {/* Head & Jata (top-knot rishi hair) */}
          <circle cx="50" cy="42" r="6" fill="url(#yogiGrad)" />
          {/* Top knot bun */}
          <circle cx="50" cy="35" r="3" fill="url(#yogiGrad)" />

          {/* Neck & Shoulders & Torso */}
          <path
            d="M 44 48 C 42 50, 36 54, 34 60 C 33 63, 35 65, 38 65 L 62 65 C 65 65, 67 63, 66 60 C 64 54, 58 50, 56 48 Z"
            fill="url(#yogiGrad)"
          />

          {/* Arms resting on knees in Dhyan Mudra */}
          <path
            d="M 35 56 C 27 63, 23 72, 22 79 C 24 81, 28 82, 34 80 C 40 78, 44 76, 50 76 C 56 76, 60 78, 66 80 C 72 82, 76 81, 78 79 C 77 72, 73 63, 65 56 Z"
            fill="url(#yogiGrad)"
          />

          {/* Crossed Legs (Padmasana Base) */}
          <path
            d="M 18 80 C 22 75, 30 73, 40 76 L 60 76 C 70 73, 78 75, 82 80 C 80 86, 68 88, 50 88 C 32 88, 20 86, 18 80 Z"
            fill="url(#yogiGrad)"
          />

          {/* Meditation Hands in lap (Dhyan mudra) */}
          <ellipse cx="50" cy="74" rx="5" ry="2.5" fill="#FED7AA" />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center leading-none">
            <span className={`font-black tracking-tight text-neutral-800 ${textSizes[size]}`}>
              Astro
            </span>
            <span className={`font-black tracking-tight text-orange-500 ${textSizes[size]}`}>
              Prakash
            </span>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-orange-600/80 mt-0.5">
            Divine Vedic Wisdom
          </span>
        </div>
      )}
    </Link>
  );
};
