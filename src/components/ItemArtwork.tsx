import React from 'react';
import { CardItemId } from '../types';

interface ItemArtworkProps {
  id: CardItemId;
  className?: string;
}

export const ItemArtwork: React.FC<ItemArtworkProps> = ({ id, className = 'w-12 h-12' }) => {
  switch (id) {
    case 'diya':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          {/* Flame Glow */}
          <circle cx="32" cy="20" r="14" fill="#F59E0B" fillOpacity="0.2" />
          {/* Flame Outer */}
          <path
            d="M32 8 C35 17 40 22 32 30 C24 22 29 17 32 8 Z"
            fill="#EA580C"
          />
          {/* Flame Inner Core */}
          <path
            d="M32 15 C34 20 37 23 32 28 C27 23 30 20 32 15 Z"
            fill="#FDE047"
          />
          {/* Brass Diya Body */}
          <path
            d="M12 36 C12 48 21 54 32 54 C43 54 52 48 52 36 C46 40 38 42 32 42 C26 42 18 40 12 36 Z"
            fill="#D97706"
            stroke="#92400E"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Base Stand */}
          <path d="M26 54 L27 58 L37 58 L38 54 Z" fill="#B45309" />
          <line x1="22" y1="58" x2="42" y2="58" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'modak':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          {/* Modak Body */}
          <path
            d="M32 10 C22 25 14 38 16 49 C18 57 24 59 32 59 C40 59 46 57 48 49 C50 38 42 25 32 10 Z"
            fill="#FBBF24"
            stroke="#D97706"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* 3 Simple Clean Pleat Lines */}
          <path d="M32 10 Q28 35 23 55" stroke="#B45309" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <path d="M32 10 Q32 36 32 59" stroke="#B45309" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <path d="M32 10 Q36 35 41 55" stroke="#B45309" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          {/* Saffron Tip */}
          <circle cx="32" cy="10" r="2.5" fill="#DC2626" />
        </svg>
      );

    case 'flower':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          {/* 5 Bold Red Petals */}
          <g fill="#E11D48" stroke="#9F1239" strokeWidth="1.5">
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <circle
                key={i}
                cx={32 + Math.cos((angle * Math.PI) / 180) * 15}
                cy={32 + Math.sin((angle * Math.PI) / 180) * 15}
                r="11"
              />
            ))}
          </g>
          {/* Center Golden Core */}
          <circle cx="32" cy="32" r="8" fill="#FACC15" stroke="#D97706" strokeWidth="1.5" />
          <circle cx="32" cy="32" r="3" fill="#EA580C" />
        </svg>
      );

    case 'durva':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          {/* Sacred 3 Green Grass Blades */}
          {/* Left Blade */}
          <path
            d="M32 52 Q18 36 15 20 Q24 26 31 46"
            fill="#22C55E"
            stroke="#15803D"
            strokeWidth="1.5"
          />
          {/* Center Blade */}
          <path
            d="M32 52 Q30 28 32 12 Q34 28 32 52"
            fill="#16A34A"
            stroke="#14532D"
            strokeWidth="1.5"
          />
          {/* Right Blade */}
          <path
            d="M32 52 Q46 36 49 20 Q40 26 33 46"
            fill="#22C55E"
            stroke="#15803D"
            strokeWidth="1.5"
          />
          {/* Red Auspicious Tie */}
          <rect x="27" y="47" width="10" height="9" rx="2" fill="#DC2626" stroke="#991B1B" strokeWidth="1" />
          <line x1="27" y1="51" x2="37" y2="51" stroke="#FDE047" strokeWidth="1.5" />
        </svg>
      );

    case 'ganesha':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          {/* Big Ears */}
          <circle cx="17" cy="31" r="10" fill="#FDE047" stroke="#D97706" strokeWidth="1.5" />
          <circle cx="47" cy="31" r="10" fill="#FDE047" stroke="#D97706" strokeWidth="1.5" />
          {/* Face */}
          <ellipse cx="32" cy="32" rx="16" ry="17" fill="#FDE047" stroke="#D97706" strokeWidth="1.5" />
          {/* Crown */}
          <path d="M24 19 L32 7 L40 19 Z" fill="#EA580C" stroke="#B45309" strokeWidth="1.5" />
          <circle cx="32" cy="14" r="2" fill="#FEF08A" />
          {/* Eyes */}
          <ellipse cx="25" cy="28" rx="2" ry="1.5" fill="#1C1917" />
          <ellipse cx="39" cy="28" rx="2" ry="1.5" fill="#1C1917" />
          {/* Red Tilak */}
          <path d="M30 22 Q32 26 34 22" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="32" cy="25" r="1" fill="#DC2626" />
          {/* Trunk with Modak */}
          <path
            d="M30 35 C30 45 35 49 42 47 C44 45 43 42 40 43 C37 42 34 40 34 35 Z"
            fill="#FDE047"
            stroke="#D97706"
            strokeWidth="1.5"
          />
          <circle cx="42" cy="45" r="2" fill="#EA580C" />
        </svg>
      );

    case 'mushak':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          {/* Curved Tail */}
          <path
            d="M14 44 Q6 40 9 28 Q12 20 8 15"
            stroke="#78716C"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Body */}
          <ellipse cx="30" cy="42" rx="17" ry="13" fill="#A8A29E" stroke="#57534E" strokeWidth="1.5" />
          <ellipse cx="32" cy="44" rx="10" ry="8" fill="#F5F5F4" />
          {/* Head */}
          <ellipse cx="45" cy="34" rx="11" ry="9" fill="#A8A29E" stroke="#57534E" strokeWidth="1.5" />
          {/* Ears */}
          <circle cx="41" cy="23" r="6" fill="#A8A29E" stroke="#57534E" strokeWidth="1.5" />
          <circle cx="41" cy="23" r="3.5" fill="#F472B6" />
          {/* Nose & Eye */}
          <circle cx="56" cy="36" r="2" fill="#1C1917" />
          <circle cx="47" cy="31" r="1.8" fill="#1C1917" />
          {/* Little Modak */}
          <circle cx="52" cy="46" r="3" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
        </svg>
      );

    case 'garland':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          {/* Garland Ring Loop */}
          <ellipse cx="32" cy="34" rx="20" ry="18" fill="none" stroke="#EA580C" strokeWidth="4" />
          {/* Marigold Blossom Beads */}
          {[
            { cx: 32, cy: 16, r: 4.5, fill: '#F59E0B' },
            { cx: 44, cy: 22, r: 4.5, fill: '#FBBF24' },
            { cx: 52, cy: 34, r: 5, fill: '#F59E0B' },
            { cx: 44, cy: 46, r: 4.5, fill: '#EA580C' },
            { cx: 32, cy: 52, r: 6.5, fill: '#DC2626' }, // Center big flower
            { cx: 20, cy: 46, r: 4.5, fill: '#EA580C' },
            { cx: 12, cy: 34, r: 5, fill: '#F59E0B' },
            { cx: 20, cy: 22, r: 4.5, fill: '#FBBF24' },
          ].map((b, i) => (
            <circle key={i} cx={b.cx} cy={b.cy} r={b.r} fill={b.fill} stroke="#B45309" strokeWidth="1" />
          ))}
        </svg>
      );

    case 'kalash':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          {/* Coconut on Top */}
          <circle cx="32" cy="20" r="9" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />
          <circle cx="32" cy="20" r="2" fill="#DC2626" />
          {/* Mango Leaves Spreading */}
          <path d="M32 25 Q20 20 16 16 Q24 28 32 28 Z" fill="#16A34A" stroke="#14532D" strokeWidth="1" />
          <path d="M32 25 Q44 20 48 16 Q40 28 32 28 Z" fill="#16A34A" stroke="#14532D" strokeWidth="1" />
          {/* Brass Pot */}
          <path
            d="M22 28 L42 28 L46 42 C46 51 40 56 32 56 C24 56 18 51 18 42 Z"
            fill="#F59E0B"
            stroke="#92400E"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Swastika / Red Mark */}
          <line x1="28" y1="42" x2="36" y2="42" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
          <line x1="32" y1="38" x2="32" y2="46" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'coconut':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          {/* Brown Shell */}
          <ellipse cx="32" cy="34" rx="20" ry="22" fill="#78350F" stroke="#451A03" strokeWidth="2" />
          {/* Top Husk tuft */}
          <path d="M30 12 L32 7 L34 12 Z" fill="#78350F" />
          {/* 3 Coconut Eyes */}
          <circle cx="27" cy="28" r="2.5" fill="#381D0B" />
          <circle cx="37" cy="28" r="2.5" fill="#381D0B" />
          <circle cx="32" cy="35" r="3" fill="#381D0B" />
          {/* Sacred Red Thread */}
          <path d="M14 42 Q32 48 50 42" stroke="#DC2626" strokeWidth="2.5" fill="none" />
        </svg>
      );

    case 'dhol':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          {/* Drum Barrel */}
          <rect x="18" y="20" width="28" height="26" rx="6" fill="#9A3412" stroke="#431407" strokeWidth="2" />
          {/* Left & Right Drum Heads */}
          <ellipse cx="18" cy="33" rx="5" ry="13" fill="#FEF08A" stroke="#B45309" strokeWidth="1.5" />
          <ellipse cx="46" cy="33" rx="5" ry="13" fill="#FEF08A" stroke="#B45309" strokeWidth="1.5" />
          {/* Zig-Zag Tension Cord */}
          <path d="M18 22 L46 33 L18 44 M46 22 L18 33 L46 44" stroke="#FEF3C7" strokeWidth="1.5" />
          {/* Drumstick */}
          <line x1="10" y1="12" x2="22" y2="24" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="10" cy="12" r="2" fill="#DC2626" />
        </svg>
      );

    case 'banana':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          {/* Green Stem */}
          <rect x="29" y="10" width="6" height="7" rx="2" fill="#15803D" stroke="#14532D" strokeWidth="1" />
          {/* Banana 1 */}
          <path
            d="M30 15 C34 26 38 42 16 52 C32 50 48 38 34 15 Z"
            fill="#FACC15"
            stroke="#CA8A04"
            strokeWidth="1.5"
          />
          {/* Banana 2 */}
          <path
            d="M33 15 C42 26 50 42 32 54 C46 50 56 36 36 15 Z"
            fill="#FDE047"
            stroke="#CA8A04"
            strokeWidth="1.5"
          />
          {/* Tips */}
          <circle cx="16" cy="52" r="1.5" fill="#713F12" />
          <circle cx="32" cy="54" r="1.5" fill="#713F12" />
        </svg>
      );

    case 'marigold':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          {/* Outer Layer Petals */}
          <g fill="#F59E0B" stroke="#D97706" strokeWidth="1">
            {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((angle, i) => (
              <circle
                key={i}
                cx={32 + Math.cos((angle * Math.PI) / 180) * 16}
                cy={32 + Math.sin((angle * Math.PI) / 180) * 16}
                r="8"
              />
            ))}
          </g>
          {/* Mid Layer Petals */}
          <g fill="#FBBF24">
            {[18, 54, 90, 126, 162, 198, 234, 270, 306, 342].map((angle, i) => (
              <circle
                key={i}
                cx={32 + Math.cos((angle * Math.PI) / 180) * 10}
                cy={32 + Math.sin((angle * Math.PI) / 180) * 10}
                r="6"
              />
            ))}
          </g>
          {/* Core */}
          <circle cx="32" cy="32" r="6" fill="#B45309" />
          <circle cx="32" cy="32" r="3" fill="#FDE047" />
        </svg>
      );

    case 'rangoli':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          {/* Concentric Circle */}
          <circle cx="32" cy="32" r="23" fill="#FEF08A" stroke="#E11D48" strokeWidth="1.5" />
          {/* 8-Point Star */}
          <path
            d="M32 12 L36 26 L50 26 L38 35 L43 49 L32 40 L21 49 L26 35 L14 26 L28 26 Z"
            fill="#C026D3"
            stroke="#9333EA"
            strokeWidth="1.2"
          />
          <circle cx="32" cy="32" r="7" fill="#F43F5E" />
          <circle cx="32" cy="32" r="3.5" fill="#FBBF24" />
        </svg>
      );

    case 'leaf':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          {/* Fresh Green Banana Leaf */}
          <path
            d="M14 50 C12 28 28 14 52 12 C53 34 42 54 14 50 Z"
            fill="#16A34A"
            stroke="#14532D"
            strokeWidth="1.5"
          />
          {/* Central Stem */}
          <path d="M12 54 Q32 35 52 12" stroke="#86EFAC" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    default:
      return null;
  }
};
