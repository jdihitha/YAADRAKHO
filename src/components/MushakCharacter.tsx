import React from 'react';
import { motion } from 'motion/react';

interface MushakCharacterProps {
  isMoving?: boolean;
  message?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const MushakCharacter: React.FC<MushakCharacterProps> = ({
  isMoving = false,
  message,
  className = '',
  size = 'md',
}) => {
  const sizeMap = {
    sm: 'w-12 h-10',
    md: 'w-20 h-16',
    lg: 'w-28 h-22',
  };

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Playful speech bubble when message provided */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="mb-1 bg-amber-100 border border-amber-400 text-amber-950 font-bold px-3 py-1 rounded-full text-xs shadow-md flex items-center gap-1.5 whitespace-nowrap"
        >
          <span>🐭</span>
          <span>{message}</span>
        </motion.div>
      )}

      {/* Mushak Vector SVG with cute bounce animation */}
      <motion.div
        animate={
          isMoving
            ? {
                y: [-3, 3, -3],
                rotate: [-4, 4, -4],
              }
            : {
                y: [0, -2, 0],
              }
        }
        transition={{
          duration: isMoving ? 0.35 : 1.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={sizeMap[size]}
      >
        <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-md" fill="none">
          {/* Animated Tail */}
          <motion.path
            d="M18 52 Q6 48 10 32 Q14 20 8 12"
            stroke="#78716C"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            animate={{ d: ['M18 52 Q6 48 10 32 Q14 20 8 12', 'M18 52 Q8 44 14 36 Q18 24 12 16', 'M18 52 Q6 48 10 32 Q14 20 8 12'] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />

          {/* Plump Mouse Body */}
          <ellipse cx="44" cy="50" rx="26" ry="20" fill="#A8A29E" stroke="#57534E" strokeWidth="2.5" />
          {/* Soft Cream Belly */}
          <ellipse cx="48" cy="54" rx="16" ry="12" fill="#F5F5F4" />

          {/* Back Foot */}
          <ellipse cx="28" cy="66" rx="8" ry="4" fill="#78716C" stroke="#57534E" strokeWidth="1.5" />
          {/* Front Foot */}
          <ellipse cx="58" cy="66" rx="7" ry="3.5" fill="#78716C" stroke="#57534E" strokeWidth="1.5" />

          {/* Cute Snout / Head */}
          <ellipse cx="70" cy="38" rx="18" ry="15" fill="#A8A29E" stroke="#57534E" strokeWidth="2.5" />

          {/* Left Large Round Ear */}
          <circle cx="62" cy="20" r="9.5" fill="#A8A29E" stroke="#57534E" strokeWidth="2" />
          <circle cx="62" cy="20" r="5.5" fill="#F472B6" />

          {/* Right Ear */}
          <circle cx="76" cy="22" r="8" fill="#A8A29E" stroke="#57534E" strokeWidth="2" />
          <circle cx="76" cy="22" r="4.5" fill="#F472B6" />

          {/* Nose Tip */}
          <ellipse cx="87" cy="42" rx="3.5" ry="3" fill="#1C1917" />

          {/* Big Inquisitive Eye */}
          <ellipse cx="72" cy="34" rx="3.5" ry="4" fill="#1C1917" />
          <circle cx="73" cy="32.5" r="1.3" fill="#FFFFFF" />

          {/* Whiskers */}
          <line x1="82" y1="42" x2="94" y2="38" stroke="#57534E" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="82" y1="44" x2="94" y2="45" stroke="#57534E" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="82" y1="46" x2="93" y2="52" stroke="#57534E" strokeWidth="1.5" strokeLinecap="round" />

          {/* Festive Saffron Sash */}
          <path d="M38 38 Q50 34 62 44 Q50 50 38 38 Z" fill="#EA580C" stroke="#C2410C" strokeWidth="1" />

          {/* Little Modak Held in Paws */}
          <path
            d="M74 54 C70 60 67 64 73 66 C79 66 77 60 74 54 Z"
            fill="#FBBF24"
            stroke="#D97706"
            strokeWidth="1.2"
          />
          <circle cx="74" cy="54" r="1.2" fill="#DC2626" />
        </svg>
      </motion.div>
    </div>
  );
};
