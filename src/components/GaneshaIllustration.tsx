import React from 'react';
import { motion } from 'motion/react';
import { VinayakDecorations } from '../types';

export type TreatType = 'modak' | 'undralu';

interface GaneshaIllustrationProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  decorations: VinayakDecorations;
  interactive?: boolean;
  onDecorationTargetClick?: (slot: keyof VinayakDecorations) => void;
  className?: string;
  animateEntrance?: boolean;
  isEating?: boolean;
  treatType?: TreatType;
}

export const GaneshaIllustration: React.FC<GaneshaIllustrationProps> = ({
  size = 'lg',
  decorations,
  className = '',
  animateEntrance = false,
  isEating = false,
  treatType = 'modak',
}) => {
  const sizeMap = {
    sm: 'w-24 h-28',
    md: 'w-44 h-52',
    lg: 'w-64 h-72 sm:w-72 sm:h-80',
    xl: 'w-72 h-80 sm:w-88 sm:h-96',
  };

  const containerAnimation = animateEntrance
    ? {
        initial: { opacity: 0, scale: 0.88, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        transition: { duration: 0.8, ease: 'easeOut' as const },
      }
    : {
        initial: { opacity: 1, scale: 1, y: 0 },
        animate: { opacity: 1, scale: 1, y: 0 },
      };

  return (
    <motion.div
      {...containerAnimation}
      className={`relative flex items-center justify-center select-none ${sizeMap[size]} ${className}`}
    >
      <svg
        viewBox="0 0 280 320"
        className="w-full h-full drop-shadow-2xl overflow-visible"
        fill="none"
      >
        <defs>
          {/* Prabhavali Halo Gradient */}
          <radialGradient id="prabhavaliGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.85" />
            <stop offset="65%" stopColor="#F59E0B" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
          </radialGradient>

          {/* Ganesha Skin Gold Warmth */}
          <linearGradient id="skinGrad" x1="140" y1="60" x2="140" y2="220" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="35%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          {/* Dhoti Silk Yellow/Orange */}
          <linearGradient id="dhotiGrad" x1="140" y1="180" x2="140" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#C2410C" />
          </linearGradient>

          {/* Pedestal Lotus */}
          <linearGradient id="lotusGrad" x1="140" y1="260" x2="140" y2="310" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FDA4AF" />
            <stop offset="50%" stopColor="#F43F5E" />
            <stop offset="100%" stopColor="#BE123C" />
          </linearGradient>

          {/* Gold Ornament Metal */}
          <linearGradient id="goldMetal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="30%" stopColor="#FCD34D" />
            <stop offset="70%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          {/* High-contrast Modak Eating Gradient */}
          <linearGradient id="modakEatGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="25%" stopColor="#FEF08A" />
            <stop offset="65%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          {/* High-contrast Undralu Steamed Gradient */}
          <radialGradient id="undraluEatGrad" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="55%" stopColor="#FEF9C3" />
            <stop offset="100%" stopColor="#FDE68A" />
          </radialGradient>

          {/* Pop-out Drop Shadow for Eating Treat */}
          <filter id="treatShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="#78350F" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* 1. Divine Aura / Prabhavali Halo */}
        <circle cx="140" cy="118" r="88" fill="url(#prabhavaliGlow)" />
        <circle
          cx="140"
          cy="118"
          r="74"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="2.5"
          strokeDasharray="6 4"
          opacity="0.7"
        />
        {/* Sunbeam petals around halo */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
          <circle
            key={i}
            cx={140 + Math.cos((deg * Math.PI) / 180) * 78}
            cy={118 + Math.sin((deg * Math.PI) / 180) * 78}
            r="3.5"
            fill="#FBBF24"
            opacity="0.85"
          />
        ))}

        {/* 2. Lotus Pedestal (Asana) */}
        <g id="lotus-pedestal">
          {/* Base slab */}
          <rect x="52" y="278" width="176" height="22" rx="10" fill="url(#goldMetal)" stroke="#78350F" strokeWidth="1.5" />
          <ellipse cx="140" cy="278" rx="88" ry="14" fill="#991B1B" />
          {/* Lotus Petals Base */}
          {[-70, -45, -20, 0, 20, 45, 70].map((offset, i) => (
            <path
              key={i}
              d={`M${140 + offset} 278 Q${140 + offset} 250 ${140 + offset + (offset < 0 ? -12 : offset > 0 ? 12 : 0)} 262 Q${140 + offset} 276 ${140 + offset} 278 Z`}
              fill="url(#lotusGrad)"
              stroke="#881337"
              strokeWidth="1.2"
            />
          ))}
        </g>

        {/* 3. Big Kind Ears (Behind Head) */}
        {/* Left Ear */}
        <motion.g
          id="left-ear"
          animate={
            isEating
              ? {
                  rotate: [-2, 3, -2],
                  transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
                }
              : {}
          }
          style={{ transformOrigin: '80px 116px' }}
        >
          <ellipse cx="78" cy="116" rx="36" ry="46" fill="url(#skinGrad)" stroke="#D97706" strokeWidth="2.5" />
          <ellipse cx="80" cy="116" rx="20" ry="28" fill="#FEF08A" opacity="0.6" />
          {/* Ear curves */}
          <path d="M72 90 Q86 116 70 144" stroke="#D97706" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
          {/* Golden Kundal / Earring */}
          <circle cx="58" cy="148" r="6" fill="url(#goldMetal)" stroke="#92400E" strokeWidth="1.2" />
          <circle cx="58" cy="148" r="2.5" fill="#DC2626" />
        </motion.g>

        {/* Right Ear */}
        <motion.g
          id="right-ear"
          animate={
            isEating
              ? {
                  rotate: [2, -3, 2],
                  transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
                }
              : {}
          }
          style={{ transformOrigin: '200px 116px' }}
        >
          <ellipse cx="202" cy="116" rx="36" ry="46" fill="url(#skinGrad)" stroke="#D97706" strokeWidth="2.5" />
          <ellipse cx="200" cy="116" rx="20" ry="28" fill="#FEF08A" opacity="0.6" />
          {/* Ear curves */}
          <path d="M208 90 Q194 116 210 144" stroke="#D97706" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
          {/* Golden Kundal / Earring */}
          <circle cx="222" cy="148" r="6" fill="url(#goldMetal)" stroke="#92400E" strokeWidth="1.2" />
          <circle cx="222" cy="148" r="2.5" fill="#DC2626" />
        </motion.g>

        {/* 4. Body & Pot-Belly */}
        <motion.g
          id="body"
          animate={
            isEating
              ? {
                  scaleY: [1, 1.025, 1],
                  transition: { duration: 3.4, repeat: Infinity, ease: 'easeInOut' },
                }
              : {}
          }
          style={{ transformOrigin: '140px 240px' }}
        >
          {/* Yellow Pot Belly */}
          <ellipse cx="140" cy="204" rx="54" ry="46" fill="url(#skinGrad)" stroke="#D97706" strokeWidth="2.5" />
          {/* Belly button */}
          <ellipse cx="140" cy="216" rx="4" ry="3" fill="#B45309" opacity="0.6" />

          {/* Dhoti / Pitambara Cloth */}
          <path
            d="M88 206 C88 250 102 268 140 268 C178 268 192 250 192 206 C176 220 158 226 140 226 C122 226 104 220 88 206 Z"
            fill="url(#dhotiGrad)"
            stroke="#9A3412"
            strokeWidth="2"
          />
          {/* Golden Dhoti Zari border */}
          <path
            d="M92 208 Q140 230 188 208"
            stroke="url(#goldMetal)"
            strokeWidth="3.5"
            fill="none"
          />
          {/* Central pleats */}
          <path d="M140 226 L140 268" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
          <path d="M132 230 L132 265" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          <path d="M148 230 L148 265" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />

          {/* Crossed Folded Legs */}
          <path
            d="M66 254 C66 238 90 248 116 256 C102 268 84 268 66 254 Z"
            fill="url(#skinGrad)"
            stroke="#D97706"
            strokeWidth="2"
          />
          <path
            d="M214 254 C214 238 190 248 164 256 C178 268 196 268 214 254 Z"
            fill="url(#skinGrad)"
            stroke="#D97706"
            strokeWidth="2"
          />

          {/* Sacred Thread (Janeu) across torso */}
          <path
            d="M102 168 Q136 195 174 238"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </motion.g>

        {/* 5. Arms & Hands */}
        {/* Left Hand: Abhaya Mudra (Blessing) */}
        <g id="blessing-hand">
          <path
            d="M84 176 C74 176 66 186 64 196 C62 208 72 216 82 214 C88 212 92 200 90 190 Z"
            fill="url(#skinGrad)"
            stroke="#D97706"
            strokeWidth="2"
          />
          {/* Palm with red auspicious blessing swastika / circle */}
          <circle cx="76" cy="198" r="5" fill="#EF4444" opacity="0.85" />
          {/* Golden Kangan / Bangle */}
          <ellipse cx="86" cy="186" rx="4" ry="7" fill="url(#goldMetal)" stroke="#92400E" strokeWidth="1" />
        </g>

        {/* Right Hand: Holding Prasad Bowl of Modak & Undralu */}
        <g id="modak-hand">
          <path
            d="M196 176 C206 176 214 186 216 196 C218 208 208 216 198 214 C192 212 188 200 190 190 Z"
            fill="url(#skinGrad)"
            stroke="#D97706"
            strokeWidth="2"
          />
          {/* Golden Kangan */}
          <ellipse cx="194" cy="186" rx="4" ry="7" fill="url(#goldMetal)" stroke="#92400E" strokeWidth="1" />

          {/* Golden Prasad Thali / Bowl overflowing with Modaks & Undrallu */}
          <g id="prasad-bowl" transform="translate(196, 196)">
            {/* Bowl Base */}
            <ellipse cx="0" cy="8" rx="20" ry="7" fill="#78350F" opacity="0.3" />
            <ellipse cx="0" cy="5" rx="18" ry="6.5" fill="url(#goldMetal)" stroke="#78350F" strokeWidth="1.2" />
            <ellipse cx="0" cy="4" rx="15" ry="4.5" fill="#FDE047" opacity="0.8" />

            {/* Steamed Undralu Dumplings in Bowl (Round ivory with dal specks) */}
            <circle cx="-8" cy="1" r="4.5" fill="#FFFDF5" stroke="#D97706" strokeWidth="0.8" />
            <circle cx="-9" cy="0" r="1" fill="#F59E0B" />
            <circle cx="-7" cy="2" r="0.7" fill="#DC2626" />

            <circle cx="8" cy="1" r="4.5" fill="#FFFDF5" stroke="#D97706" strokeWidth="0.8" />
            <circle cx="7" cy="0" r="1" fill="#F59E0B" />
            <circle cx="9" cy="2" r="0.7" fill="#DC2626" />

            {/* Modak in Bowl (Golden pleated) */}
            <path
              d="M 0,-6 C -4,-1 -5,3 -4,6 C -3,7 3,7 4,6 C 5,3 4,-1 0,-6 Z"
              fill="#FEF08A"
              stroke="#D97706"
              strokeWidth="0.8"
            />
            <circle cx="0" cy="-6" r="1" fill="#DC2626" />

            {/* Hot Prasad Steam wisps rising */}
            {isEating && (
              <motion.g
                animate={{ y: [-2, -8, -12], opacity: [0, 0.7, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
              >
                <path d="M-4,-8 Q-2,-12 -5,-16" stroke="#FEF08A" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.7" />
                <path d="M3,-8 Q5,-12 2,-16" stroke="#FEF08A" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.7" />
              </motion.g>
            )}
          </g>
        </g>

        {/* 6. Ganesha Head */}
        <g id="ganesha-head">
          <ellipse cx="140" cy="116" rx="46" ry="48" fill="url(#skinGrad)" stroke="#D97706" strokeWidth="2.5" />

          {/* Gentle Cute Eyes - Blinking & Smiling happily while eating */}
          {isEating ? (
            <g id="eating-eyes">
              {/* Left Eye: Joyful Smile Crescent during munch, gentle open during look */}
              <motion.path
                d="M112 105 Q118 97 124 105"
                stroke="#1C1917"
                strokeWidth="2.6"
                strokeLinecap="round"
                fill="none"
                animate={{
                  d: [
                    'M112 104 Q118 97 124 104',
                    'M112 105 Q118 99 124 105',
                    'M112 103 Q118 95 124 103',
                    'M112 104 Q118 97 124 104',
                  ],
                }}
                transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Right Eye: Joyful Smile Crescent */}
              <motion.path
                d="M156 105 Q162 97 168 105"
                stroke="#1C1917"
                strokeWidth="2.6"
                strokeLinecap="round"
                fill="none"
                animate={{
                  d: [
                    'M156 104 Q162 97 168 104',
                    'M156 105 Q162 99 168 105',
                    'M156 103 Q162 95 168 103',
                    'M156 104 Q162 97 168 104',
                  ],
                }}
                transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </g>
          ) : (
            <g id="normal-eyes">
              {/* Left Eye */}
              <ellipse cx="118" cy="104" rx="6.5" ry="4" fill="#1C1917" />
              <circle cx="120" cy="102.5" r="2" fill="#FFFFFF" />

              {/* Right Eye */}
              <ellipse cx="162" cy="104" rx="6.5" ry="4" fill="#1C1917" />
              <circle cx="164" cy="102.5" r="2" fill="#FFFFFF" />
            </g>
          )}

          {/* Eyebrows */}
          <path d="M110 96 Q118 92 126 96" stroke="#92400E" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M154 96 Q162 92 170 96" stroke="#92400E" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Cheeks Blush - Glowing pink with munching pleasure */}
          <motion.circle
            cx="106"
            cy="116"
            r="7"
            fill="#F43F5E"
            animate={
              isEating
                ? {
                    r: [7, 8.5, 7],
                    fillOpacity: [0.35, 0.65, 0.35],
                  }
                : { fillOpacity: 0.3 }
            }
            transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="174"
            cy="116"
            r="7"
            fill="#F43F5E"
            animate={
              isEating
                ? {
                    r: [7, 8.5, 7],
                    fillOpacity: [0.35, 0.65, 0.35],
                  }
                : { fillOpacity: 0.3 }
            }
            transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Cute Chewing Mouth (opens during munching nom nom) */}
          {isEating && (
            <g id="chewing-mouth">
              {/* Animated Mouth Cavity: Opens wide when sweet arrives, then munches rhythmically */}
              <motion.ellipse
                cx="140"
                cy="132"
                rx="5"
                ry="3"
                fill="#450A0A"
                stroke="#991B1B"
                strokeWidth="1"
                animate={{
                  rx: [3, 4, 7, 7, 5, 2, 5, 2, 5, 3, 3],
                  ry: [1, 2, 5.5, 5, 3.5, 1, 3.5, 1, 3, 1, 1],
                  opacity: [0.4, 0.6, 1, 1, 0.9, 0.4, 0.9, 0.4, 0.8, 0.4, 0.4],
                }}
                transition={{
                  duration: 3.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  times: [0, 0.35, 0.55, 0.65, 0.72, 0.76, 0.80, 0.84, 0.88, 0.94, 1],
                }}
              />
              {/* Pink little tongue inside mouth */}
              <motion.ellipse
                cx="140"
                cy="134"
                rx="3.5"
                ry="2"
                fill="#FB7185"
                animate={{
                  opacity: [0, 0.3, 0.95, 0.9, 0.8, 0.2, 0.8, 0.2, 0.6, 0, 0],
                  scaleY: [0.5, 0.8, 1.2, 1.1, 0.9, 0.5, 0.9, 0.5, 0.8, 0.5, 0.5],
                }}
                transition={{
                  duration: 3.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  times: [0, 0.35, 0.55, 0.65, 0.72, 0.76, 0.80, 0.84, 0.88, 0.94, 1],
                }}
              />
            </g>
          )}

          {/* Single Tusk (Ekadanta) */}
          <path d="M125 128 L114 134 L126 132 Z" fill="#FFFBEB" stroke="#B45309" strokeWidth="1" />

          {/* Trunk (Vakratunda) */}
          {isEating ? (
            /* Animated Eating Trunk gently swaying in synchrony with feeding */
            <motion.g
              id="eating-trunk-group"
              animate={{
                rotate: [0, 3, -4, 2, -1, 0],
              }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '136px 118px' }}
            >
              <path
                d="M132 118 C132 144 126 166 142 168 C158 170 166 156 162 144 C158 138 152 138 150 144 C148 150 144 154 138 152 C134 150 136 136 138 118 Z"
                fill="url(#skinGrad)"
                stroke="#D97706"
                strokeWidth="2.5"
              />
            </motion.g>
          ) : (
            /* Static Peaceful Trunk */
            <g id="static-trunk">
              <path
                d="M132 118 C132 144 126 166 142 168 C158 170 166 156 162 144 C158 138 152 138 150 144 C148 150 144 154 138 152 C134 150 136 136 138 118 Z"
                fill="url(#skinGrad)"
                stroke="#D97706"
                strokeWidth="2.5"
              />
              <circle cx="152" cy="144" r="5" fill="#FBBF24" stroke="#B45309" strokeWidth="1.2" />
              <circle cx="152" cy="142" r="1.5" fill="#DC2626" />
            </g>
          )}
        </g>

        {/* ========================================================= */}
        {/* ANIMATED TREAT IN TRUNK / FLIGHT: MODAK OR UNDRALU        */}
        {/* ========================================================= */}
        {isEating && (
          <g id="eating-animation-layer">
            {/* The Treat: Starts on plate, travels UP to mouth, enters mouth, disappears, resets invisibly */}
            <motion.g
              animate={{
                // 1. Starts on plate (196, 194)
                // 2. Trunk lifts it up towards chin (178, 168) -> (154, 146)
                // 3. Modak enters mouth (140, 130) and is eaten (scale 0, opacity 0)
                // 4. Stays invisible at mouth during chewing
                // 5. Instantly teleports back to plate (196, 194) while completely invisible
                // 6. Fresh warm sweet fades in onto plate
                x: [196, 196, 178, 154, 140, 140, 140, 140, 196, 196, 196],
                y: [194, 194, 168, 146, 132, 130, 130, 130, 194, 194, 194],
                scale: [1.15, 1.25, 1.35, 1.3, 1.0, 0.4, 0, 0, 0, 0.4, 1.15],
                opacity: [1, 1, 1, 1, 1, 0.85, 0, 0, 0, 0.4, 1],
                rotate: [0, 0, -12, -22, -10, 0, 0, 0, 0, 0, 0],
              }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                ease: 'easeInOut',
                times: [0, 0.12, 0.35, 0.52, 0.65, 0.74, 0.78, 0.86, 0.88, 0.94, 1],
              }}
            >
              {treatType === 'undralu' ? (
                /* Steamed Round Undralu Dumpling with Golden Dal Specks - High Visibility */
                <g id="active-undralu" filter="url(#treatShadow)">
                  {/* Steam halo */}
                  <circle cx="0" cy="0" r="15" fill="#FEF08A" opacity="0.4" />
                  {/* Pure Steamed Rice Flour Dumpling */}
                  <circle cx="0" cy="0" r="11.5" fill="url(#undraluEatGrad)" stroke="#78350F" strokeWidth="2" />
                  {/* Steamed Gloss Highlight */}
                  <ellipse cx="-3.5" cy="-3.5" rx="5" ry="3.5" fill="#FFFFFF" opacity="0.9" transform="rotate(-30 -3.5 -3.5)" />
                  {/* Golden Chana Dal / Cardamom specks */}
                  <circle cx="-3" cy="-1.5" r="1.8" fill="#D97706" />
                  <circle cx="3.5" cy="2" r="1.6" fill="#B45309" />
                  <circle cx="-0.5" cy="5" r="1.4" fill="#D97706" />
                  <circle cx="4" cy="-3.5" r="1.4" fill="#F59E0B" />
                  {/* Vermillion Saffron Bindi */}
                  <circle cx="0" cy="-6.5" r="2.2" fill="#DC2626" />
                  <circle cx="0" cy="-6.5" r="0.9" fill="#FEF08A" />
                </g>
              ) : (
                /* Golden Pleated Modak Dumpling - High Visibility */
                <g id="active-modak" filter="url(#treatShadow)">
                  {/* Golden aura */}
                  <circle cx="0" cy="0" r="17" fill="#FDE047" opacity="0.4" />
                  {/* Modak Body - rich golden gradients with saffron base */}
                  <path
                    d="M 0,-16 C -8,-6 -11,4 -10,10 C -9,15 9,15 10,10 C 11,4 8,-6 0,-16 Z"
                    fill="url(#modakEatGrad)"
                    stroke="#78350F"
                    strokeWidth="2"
                  />
                  {/* Golden Pleat Ridges */}
                  <path d="M 0,-16 L -5,10" stroke="#92400E" strokeWidth="1.3" opacity="0.9" />
                  <path d="M 0,-16 L 0,12" stroke="#92400E" strokeWidth="1.5" opacity="0.95" />
                  <path d="M 0,-16 L 5,10" stroke="#92400E" strokeWidth="1.3" opacity="0.9" />
                  {/* Glistening Sugar Highlight */}
                  <path d="M -3,-6 Q 0,-12 2,-6" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.95" />
                  {/* Saffron Tikka Top */}
                  <circle cx="0" cy="-16" r="2.5" fill="#DC2626" />
                  <circle cx="0" cy="-16" r="1" fill="#FEF08A" />
                </g>
              )}
            </motion.g>

            {/* Joyful munching sparkles & crumbs rising from mouth while chewing */}
            <motion.g
              animate={{
                opacity: [0, 0, 0, 0.95, 0.9, 0, 0],
                y: [0, 0, 0, -6, -16, -24, 0],
                scale: [0.5, 0.5, 0.5, 1.1, 1.3, 0.7, 0.5],
              }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                times: [0, 0.65, 0.72, 0.78, 0.86, 0.92, 1],
                ease: 'easeOut',
              }}
              transform="translate(140, 126)"
            >
              {/* Sweet Sparkle Star 1 */}
              <circle cx="-13" cy="-4" r="2.2" fill="#FDE047" />
              <line x1="-17" y1="-4" x2="-9" y2="-4" stroke="#D97706" strokeWidth="1.2" />
              <line x1="-13" y1="-8" x2="-13" y2="0" stroke="#D97706" strokeWidth="1.2" />

              {/* Sweet Sparkle Star 2 */}
              <circle cx="15" cy="-6" r="2.2" fill="#FDE047" />
              <line x1="11" y1="-6" x2="19" y2="-6" stroke="#D97706" strokeWidth="1.2" />
              <line x1="15" y1="-10" x2="15" y2="-2" stroke="#D97706" strokeWidth="1.2" />

              {/* Crunchy golden sweet crumbs */}
              <circle cx="-7" cy="2" r="1.6" fill="#F59E0B" />
              <circle cx="8" cy="1" r="1.5" fill="#EA580C" />
              <circle cx="1" cy="-7" r="1.8" fill="#FEF08A" />
              <circle cx="-1" cy="4" r="1.3" fill="#D97706" />
            </motion.g>
          </g>
        )}

        {/* =================================================== */}
        {/* DECORATIONS (Can be permanently adorned by player)  */}
        {/* =================================================== */}

        {/* Decoration 1: Sacred Tilak (Trishul / Chandan) */}
        {decorations.hasTilak ? (
          <g id="sacred-tilak-active">
            {/* Glowing Aura around tilak */}
            <circle cx="140" cy="86" r="14" fill="#F59E0B" fillOpacity="0.35" />
            {/* Red Vermillion U-shape */}
            <path
              d="M130 76 Q140 92 150 76"
              stroke="#DC2626"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            {/* Central golden vertical streak */}
            <line x1="140" y1="72" x2="140" y2="88" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
            {/* Vermillion Bindi */}
            <circle cx="140" cy="90" r="3" fill="#DC2626" />
          </g>
        ) : (
          /* Subtle default small tilak */
          <g id="default-tilak">
            <path d="M134 82 Q140 90 146 82" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
            <circle cx="140" cy="87" r="1.5" fill="#DC2626" opacity="0.6" />
          </g>
        )}

        {/* Decoration 2: Mukut (Ornate Golden Crown) */}
        {decorations.hasCrown ? (
          <g id="mukut-active">
            {/* Crown Base Band */}
            <path
              d="M112 72 Q140 64 168 72 L164 64 Q140 56 116 64 Z"
              fill="url(#goldMetal)"
              stroke="#78350F"
              strokeWidth="1.5"
            />
            {/* Rubies & Emeralds on band */}
            <circle cx="126" cy="67" r="2.5" fill="#DC2626" />
            <circle cx="140" cy="64" r="3" fill="#16A34A" />
            <circle cx="154" cy="67" r="2.5" fill="#DC2626" />

            {/* Regal Crown Peaks */}
            <path
              d="M114 64 L122 42 L132 54 L140 26 L148 54 L158 42 L166 64 Q140 56 114 64 Z"
              fill="url(#goldMetal)"
              stroke="#78350F"
              strokeWidth="2"
            />

            {/* Kalgi / Gemstone Finial */}
            <circle cx="140" cy="26" r="4.5" fill="#DC2626" stroke="#FEF08A" strokeWidth="1.2" />
            {/* Sparkling Sunbeam on Crown */}
            <circle cx="140" cy="44" r="4" fill="#67E8F9" stroke="#0891B2" strokeWidth="1" />
          </g>
        ) : (
          /* Simple small golden headdress */
          <g id="simple-cap">
            <path
              d="M120 72 L140 48 L160 72 Q140 66 120 72 Z"
              fill="url(#goldMetal)"
              stroke="#B45309"
              strokeWidth="1.5"
            />
            <circle cx="140" cy="48" r="2.5" fill="#DC2626" />
          </g>
        )}

        {/* Decoration 3: Pushpa Haar (Rich Marigold Flower Garland) */}
        {decorations.hasGarland && (
          <g id="garland-active">
            {/* Marigold flower chain hanging over shoulders */}
            {[
              { x: 92, y: 144, r: 8, col: '#F59E0B' },
              { x: 98, y: 160, r: 8.5, col: '#FBBF24' },
              { x: 108, y: 176, r: 9, col: '#EA580C' },
              { x: 122, y: 188, r: 9.5, col: '#F59E0B' },
              { x: 140, y: 194, r: 10.5, col: '#DC2626' }, // Central big pendant flower
              { x: 158, y: 188, r: 9.5, col: '#F59E0B' },
              { x: 172, y: 176, r: 9, col: '#EA580C' },
              { x: 182, y: 160, r: 8.5, col: '#FBBF24' },
              { x: 188, y: 144, r: 8, col: '#F59E0B' },
            ].map((flower, idx) => (
              <g key={idx}>
                <circle cx={flower.x} cy={flower.y} r={flower.r} fill={flower.col} stroke="#92400E" strokeWidth="1" />
                <circle cx={flower.x} cy={flower.y} r={flower.r * 0.45} fill="#FEF08A" />
              </g>
            ))}
          </g>
        )}

        {/* Decoration 4: Golden Plate of Sacred Modaks at Feet */}
        {decorations.hasModakPlate && (
          <g id="modak-plate-active">
            {/* Silver / Gold Thali */}
            <ellipse cx="140" cy="286" rx="42" ry="11" fill="url(#goldMetal)" stroke="#78350F" strokeWidth="1.5" />
            <ellipse cx="140" cy="286" rx="36" ry="8" fill="#FBBF24" opacity="0.6" />
            {/* Mound of Golden Modaks */}
            {[
              { x: 126, y: 284, s: 0.8 },
              { x: 154, y: 284, s: 0.8 },
              { x: 133, y: 281, s: 0.9 },
              { x: 147, y: 281, s: 0.9 },
              { x: 140, y: 275, s: 1.0 },
            ].map((m, idx) => (
              <g key={idx} transform={`translate(${m.x - 12 * m.s}, ${m.y - 12 * m.s}) scale(${m.s * 0.25})`}>
                <path
                  d="M50 14 C36 34 20 54 22 72 C24 86 36 90 50 90 C64 90 76 86 78 72 C80 54 64 34 50 14 Z"
                  fill="#FEF08A"
                  stroke="#D97706"
                  strokeWidth="3"
                />
                <circle cx="50" cy="14" r="4" fill="#DC2626" />
              </g>
            ))}
          </g>
        )}
      </svg>
    </motion.div>
  );
};
