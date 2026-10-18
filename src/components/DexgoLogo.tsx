import React from 'react';
import { motion } from 'motion/react';

interface DexgoLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  animated?: boolean;
  variant?: 'full' | 'mark-only' | 'text-only';
}

export const DexgoLogo: React.FC<DexgoLogoProps> = ({
  size = 'md',
  showTagline = false,
  className = '',
  animated = true,
  variant = 'full',
}) => {
  // Sizing dimensions for pixel-perfect clarity
  const config = {
    sm: {
      markSize: 24,
      textSize: 'text-lg',
      taglineSize: 'text-[9px]',
      gap: 'gap-2',
      height: 'h-6',
    },
    md: {
      markSize: 32,
      textSize: 'text-2xl',
      taglineSize: 'text-[11px]',
      gap: 'gap-2.5',
      height: 'h-8',
    },
    lg: {
      markSize: 42,
      textSize: 'text-3xl',
      taglineSize: 'text-xs',
      gap: 'gap-3.5',
      height: 'h-11',
    },
    xl: {
      markSize: 58,
      textSize: 'text-5xl',
      taglineSize: 'text-sm',
      gap: 'gap-4',
      height: 'h-15',
    },
  }[size];

  return (
    <div className={`inline-flex items-center ${config.gap} select-none group cursor-pointer ${className}`}>
      {/* Precision Engineered Brand Mark Icon */}
      {variant !== 'text-only' && (
        <motion.div
          className="relative shrink-0 flex items-center justify-center"
          whileHover={animated ? { scale: 1.08, rotate: [0, -2, 2, 0] } : undefined}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          {/* Ambient Glow Aura */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-cyan-500/30 via-emerald-500/20 to-lime-400/30 blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

          <svg
            width={config.markSize}
            height={config.markSize}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 drop-shadow-[0_2px_10px_rgba(0,229,255,0.35)]"
            aria-label="Dexgo Icon"
          >
            <defs>
              {/* Electric Cyan-to-Blue Linear Gradient */}
              <linearGradient id="dexgo-cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00F5FF" />
                <stop offset="45%" stopColor="#00B4D8" />
                <stop offset="100%" stopColor="#0052FF" />
              </linearGradient>

              {/* Electric Neon Lime Forward Gradient */}
              <linearGradient id="dexgo-lime-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#05F26C" />
                <stop offset="60%" stopColor="#00FF87" />
                <stop offset="100%" stopColor="#70FFA8" />
              </linearGradient>

              {/* Cross-cut shadow depth */}
              <filter id="mark-inner-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="-1" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.5" />
              </filter>
            </defs>

            {/* Background High-Tech Geometric Rounded Base */}
            <rect
              x="2"
              y="2"
              width="44"
              height="44"
              rx="11"
              fill="#080E1A"
              stroke="rgba(0, 229, 255, 0.25)"
              strokeWidth="1.5"
            />

            {/* Dynamic Left Wing (Letter D / Lower X segment) - Electric Cyan/Blue */}
            <path
              d="M 12 12 C 12 10.5 13.5 9.5 15 10 L 26 14 C 27.5 14.5 28.5 16 28.5 17.5 L 28.5 31 C 28.5 33 26.5 34.5 24.5 34 L 14.5 31.5 C 13 31 12 29.5 12 28 Z"
              fill="url(#dexgo-cyan-grad)"
            />

            {/* Sharp Geometric Cutout inside D */}
            <path
              d="M 17 16 L 22.5 18 L 22.5 26.5 L 17 25 Z"
              fill="#080E1A"
            />

            {/* Dynamic Forward Crossing Chevron / Arrow (Letter X forward blade & GO propulsion) */}
            <path
              d="M 21 38 L 36 17 C 37 15.5 36.5 13.5 35 12.5 L 30 9.5 C 29 9 27.5 9.5 27 10.5 L 18 24 L 21 38 Z"
              fill="url(#dexgo-lime-grad)"
              filter="url(#mark-inner-shadow)"
            />

            {/* Forward Speed Indicator Dot (GO propulsion) */}
            <circle cx="36.5" cy="34.5" r="3" fill="url(#dexgo-lime-grad)" />
          </svg>
        </motion.div>
      )}

      {/* Typography: Wordmark with DEX in Cyan and GO in Neon Lime */}
      {variant !== 'mark-only' && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center tracking-tight font-black">
            {/* DEX portion: Cyan to Blue */}
            <span
              className={`${config.textSize} font-black tracking-[-0.04em] bg-gradient-to-r from-[#00F5FF] via-[#00D0FF] to-[#0077FE] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(0,229,255,0.4)] transition-all`}
              style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
            >
              DEX
            </span>

            {/* GO portion: Electric Neon Lime / Green */}
            <span
              className={`${config.textSize} font-black tracking-[-0.04em] bg-gradient-to-r from-[#00FF87] via-[#10E56A] to-[#00D95A] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(0,255,135,0.45)] pl-0.5`}
              style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
            >
              GO
            </span>
          </div>

          {showTagline && (
            <span
              className={`${config.taglineSize} font-bold tracking-[0.2em] uppercase text-cyan-400/80 mt-0.5 flex items-center gap-1.5`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              DEALERSHIP OS
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export const DexgoIconMark: React.FC<{ size?: number; className?: string; animated?: boolean }> = ({
  size = 32,
  className = '',
  animated = true,
}) => {
  return (
    <motion.div
      className={`relative shrink-0 flex items-center justify-center ${className}`}
      whileHover={animated ? { scale: 1.1 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-cyan-500/25 to-emerald-500/25 blur-sm" />
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        <defs>
          <linearGradient id="dexgo-icon-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F5FF" />
            <stop offset="100%" stopColor="#0052FF" />
          </linearGradient>
          <linearGradient id="dexgo-icon-lime" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#05F26C" />
            <stop offset="100%" stopColor="#70FFA8" />
          </linearGradient>
        </defs>
        <rect
          x="2"
          y="2"
          width="44"
          height="44"
          rx="11"
          fill="#080E1A"
          stroke="rgba(0, 229, 255, 0.3)"
          strokeWidth="1.5"
        />
        <path
          d="M 12 12 C 12 10.5 13.5 9.5 15 10 L 26 14 C 27.5 14.5 28.5 16 28.5 17.5 L 28.5 31 C 28.5 33 26.5 34.5 24.5 34 L 14.5 31.5 C 13 31 12 29.5 12 28 Z"
          fill="url(#dexgo-icon-cyan)"
        />
        <path
          d="M 17 16 L 22.5 18 L 22.5 26.5 L 17 25 Z"
          fill="#080E1A"
        />
        <path
          d="M 21 38 L 36 17 C 37 15.5 36.5 13.5 35 12.5 L 30 9.5 C 29 9 27.5 9.5 27 10.5 L 18 24 L 21 38 Z"
          fill="url(#dexgo-icon-lime)"
        />
        <circle cx="36.5" cy="34.5" r="3" fill="url(#dexgo-icon-lime)" />
      </svg>
    </motion.div>
  );
};
