import React from 'react';
import { motion } from 'motion/react';

interface FestiveEnvironmentProps {
  level?: number;
  children: React.ReactNode;
}

export const FestiveEnvironment: React.FC<FestiveEnvironmentProps> = ({ level = 1, children }) => {
  // Richness progression
  const showMoreFlowers = level >= 2;
  const showMoreDiyas = level >= 3;
  const showMoreGarlands = level >= 4;
  const showGrandMandapam = level >= 5;

  return (
    <div className="relative w-full min-h-screen bg-[#FFFDF7] text-[#422006] overflow-x-hidden flex flex-col justify-between selection:bg-amber-200">
      {/* Background Soft Festive Radiance */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft upper golden wash */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-radial from-amber-200/40 via-orange-100/20 to-transparent blur-3xl" />
        {/* Traditional subtle rangoli watermark at center-bottom */}
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-120 h-120 opacity-15 pointer-events-none">
          <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-slow">
            <circle cx="100" cy="100" r="90" fill="none" stroke="#B45309" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="#DC2626" strokeWidth="1" />
            <circle cx="100" cy="100" r="50" fill="none" stroke="#F59E0B" strokeWidth="1.5" />
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
              <circle
                key={i}
                cx={100 + Math.cos((deg * Math.PI) / 180) * 80}
                cy={100 + Math.sin((deg * Math.PI) / 180) * 80}
                r="3"
                fill="#F59E0B"
              />
            ))}
          </svg>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TOP MANDAPAM & TORAN (Auspicious Mango leaves, Marigold strings & Lights) */}
      {/* ========================================================================= */}
      <header className="relative w-full z-20 pointer-events-none select-none">
        {/* Mandapam Golden Arch Canopy Beam */}
        <div className="w-full h-3.5 sm:h-5 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700 border-b-2 border-amber-900/30 shadow-md flex items-center justify-around px-4">
          <div className="w-full flex justify-between items-center text-[10px] sm:text-xs text-amber-950 font-bold opacity-75 tracking-widest">
            <span>卐 ॐ 卐</span>
            <span>SHREE GANESHAYA NAMAH</span>
            <span>卐 ॐ 卐</span>
          </div>
        </div>

        {/* Traditional Toran Hanging (Mango leaves + Marigolds) */}
        <div className="relative w-full overflow-hidden flex justify-center">
          <svg
            viewBox="0 0 1200 70"
            preserveAspectRatio="none"
            className="w-full h-10 sm:h-14 drop-shadow-sm"
          >
            {/* Scalloped Garland Strings */}
            <path
              d="M0,0 Q100,38 200,0 Q300,38 400,0 Q500,38 600,0 Q700,38 800,0 Q900,38 1000,0 Q1100,38 1200,0"
              fill="none"
              stroke="#EA580C"
              strokeWidth="4"
            />
            {/* Hanging Marigold flowers & Mango leaves at dips */}
            {[100, 300, 500, 700, 900, 1100].map((cx, idx) => (
              <g key={idx}>
                {/* Mango Leaf */}
                <path
                  d={`M${cx} 24 C${cx - 9} 38 ${cx - 7} 54 ${cx} 64 C${cx + 7} 54 ${cx + 9} 38 ${cx} 24 Z`}
                  fill="#15803D"
                  stroke="#14532D"
                  strokeWidth="1"
                />
                {/* Marigold flower */}
                <circle cx={cx} cy="26" r="7" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
                <circle cx={cx} cy="26" r="3.5" fill="#EF4444" />
              </g>
            ))}

            {/* Additional Garlands if Level >= 4 */}
            {showMoreGarlands && (
              <path
                d="M0,8 Q100,48 200,8 Q300,48 400,8 Q500,48 600,8 Q700,48 800,8 Q900,48 1000,8 Q1100,48 1200,8"
                fill="none"
                stroke="#FACC15"
                strokeWidth="2.5"
                strokeDasharray="4 3"
              />
            )}
          </svg>
        </div>

        {/* Small warm fairy lights strung across */}
        <div className="absolute top-3 w-full flex justify-around px-2 sm:px-6">
          {[...Array(14)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: [0.4, 1, 0.5],
                scale: [0.9, 1.2, 0.9],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                delay: (i * 0.18) % 1.5,
              }}
              className={`w-2 h-2 rounded-full ${
                i % 3 === 0
                  ? 'bg-amber-300 shadow-[0_0_8px_#FDE047]'
                  : i % 3 === 1
                  ? 'bg-orange-400 shadow-[0_0_8px_#FB923C]'
                  : 'bg-yellow-200 shadow-[0_0_8px_#FEF08A]'
              }`}
            />
          ))}
        </div>
      </header>

      {/* ========================================================================= */}
      {/* BANANA TREE SAPLINGS (Framing Left & Right of the Screen)                 */}
      {/* ========================================================================= */}

      {/* Left Banana Tree Sapling */}
      <div
        id="banana-tree-left"
        className="fixed left-0 bottom-0 pointer-events-none z-10 w-24 sm:w-44 md:w-56 lg:w-64 max-h-[85vh] select-none"
      >
        <motion.div
          animate={{ rotate: [-0.6, 0.8, -0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="origin-bottom-left w-full h-full"
        >
          <svg viewBox="0 0 200 480" fill="none" className="w-full h-auto drop-shadow-lg">
            {/* Banana Plant Trunk */}
            <path
              d="M30 480 Q45 320 55 180 L75 180 Q62 320 45 480 Z"
              fill="url(#trunkGrad)"
              stroke="#15803D"
              strokeWidth="1.5"
            />
            {/* Left Arching Leaf 1 (Lower) */}
            <path
              d="M50 360 C-10 320 -25 240 10 190 C30 220 50 290 54 360 Z"
              fill="url(#bananaLeafDark)"
              stroke="#14532D"
              strokeWidth="1.5"
            />
            <path d="M50 360 Q10 240 10 190" stroke="#86EFAC" strokeWidth="2.5" />

            {/* Left Arching Leaf 2 (Mid-High) */}
            <path
              d="M58 260 C-30 200 -20 100 60 70 C55 120 70 190 60 260 Z"
              fill="url(#bananaLeafMid)"
              stroke="#14532D"
              strokeWidth="2"
            />
            <path d="M58 260 Q-10 140 60 70" stroke="#86EFAC" strokeWidth="3" />

            {/* Top Tender Sprout Leaf (Inward framing) */}
            <path
              d="M62 180 C50 80 90 20 145 10 C120 60 90 120 66 180 Z"
              fill="url(#bananaLeafLight)"
              stroke="#166534"
              strokeWidth="2"
            />
            <path d="M62 180 Q85 70 145 10" stroke="#BBF7D0" strokeWidth="2.5" />

            {/* Additional lower lush leaf */}
            <path
              d="M44 420 C0 380 -10 320 20 290 C34 320 46 380 44 420 Z"
              fill="url(#bananaLeafDark)"
              stroke="#14532D"
              strokeWidth="1.2"
            />

            <defs>
              <linearGradient id="trunkGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3F6212" />
                <stop offset="50%" stopColor="#4D7C0F" />
                <stop offset="100%" stopColor="#65A30D" />
              </linearGradient>
              <linearGradient id="bananaLeafDark" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#15803D" />
                <stop offset="100%" stopColor="#14532D" />
              </linearGradient>
              <linearGradient id="bananaLeafMid" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22C55E" />
                <stop offset="60%" stopColor="#16A34A" />
                <stop offset="100%" stopColor="#15803D" />
              </linearGradient>
              <linearGradient id="bananaLeafLight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ADE80" />
                <stop offset="100%" stopColor="#16A34A" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>

      {/* Right Banana Tree Sapling */}
      <div
        id="banana-tree-right"
        className="fixed right-0 bottom-0 pointer-events-none z-10 w-24 sm:w-44 md:w-56 lg:w-64 max-h-[85vh] select-none"
      >
        <motion.div
          animate={{ rotate: [0.6, -0.8, 0.6] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="origin-bottom-right w-full h-full"
        >
          <svg viewBox="0 0 200 480" fill="none" className="w-full h-auto drop-shadow-lg scale-x-[-1]">
            {/* Banana Plant Trunk */}
            <path
              d="M30 480 Q45 320 55 180 L75 180 Q62 320 45 480 Z"
              fill="url(#trunkGradR)"
              stroke="#15803D"
              strokeWidth="1.5"
            />
            {/* Arching Leaf 1 */}
            <path
              d="M50 360 C-10 320 -25 240 10 190 C30 220 50 290 54 360 Z"
              fill="url(#bananaLeafDarkR)"
              stroke="#14532D"
              strokeWidth="1.5"
            />
            <path d="M50 360 Q10 240 10 190" stroke="#86EFAC" strokeWidth="2.5" />

            {/* Arching Leaf 2 */}
            <path
              d="M58 260 C-30 200 -20 100 60 70 C55 120 70 190 60 260 Z"
              fill="url(#bananaLeafMidR)"
              stroke="#14532D"
              strokeWidth="2"
            />
            <path d="M58 260 Q-10 140 60 70" stroke="#86EFAC" strokeWidth="3" />

            {/* Top Tender Sprout */}
            <path
              d="M62 180 C50 80 90 20 145 10 C120 60 90 120 66 180 Z"
              fill="url(#bananaLeafLightR)"
              stroke="#166534"
              strokeWidth="2"
            />
            <path d="M62 180 Q85 70 145 10" stroke="#BBF7D0" strokeWidth="2.5" />

            <defs>
              <linearGradient id="trunkGradR" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3F6212" />
                <stop offset="50%" stopColor="#4D7C0F" />
                <stop offset="100%" stopColor="#65A30D" />
              </linearGradient>
              <linearGradient id="bananaLeafDarkR" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#15803D" />
                <stop offset="100%" stopColor="#14532D" />
              </linearGradient>
              <linearGradient id="bananaLeafMidR" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22C55E" />
                <stop offset="60%" stopColor="#16A34A" />
                <stop offset="100%" stopColor="#15803D" />
              </linearGradient>
              <linearGradient id="bananaLeafLightR" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ADE80" />
                <stop offset="100%" stopColor="#16A34A" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* FLICKERING DIYAS (Base Brass Lamps with glowing halo)                     */}
      {/* ========================================================================= */}

      {/* Diya Left */}
      <div className="fixed left-3 sm:left-10 bottom-4 sm:bottom-8 z-20 pointer-events-none select-none">
        <DiyaWithGlow scale={1.1} />
      </div>

      {/* Diya Right */}
      <div className="fixed right-3 sm:right-10 bottom-4 sm:bottom-8 z-20 pointer-events-none select-none">
        <DiyaWithGlow scale={1.1} />
      </div>

      {/* Progression Extra Diyas */}
      {showMoreDiyas && (
        <>
          <div className="fixed left-20 sm:left-28 bottom-6 sm:bottom-12 z-20 pointer-events-none select-none hidden xs:block">
            <DiyaWithGlow scale={0.8} />
          </div>
          <div className="fixed right-20 sm:right-28 bottom-6 sm:bottom-12 z-20 pointer-events-none select-none hidden xs:block">
            <DiyaWithGlow scale={0.8} />
          </div>
        </>
      )}

      {/* Floating Petals in the breeze */}
      <FloatingPetals count={showMoreFlowers ? 14 : 7} />

      {/* Central Content (Game Area or Home Screen) */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-3 sm:px-6 py-2">
        {children}
      </main>

      {/* ========================================================================= */}
      {/* RANGOLI & MANDAPAM PEDESTAL FOOTER                                        */}
      {/* ========================================================================= */}
      <footer className="relative w-full z-10 pointer-events-none flex flex-col items-center justify-end pb-1 select-none">
        {/* Flower garland festoon border on floor */}
        <div className="w-full flex justify-center items-center gap-1 sm:gap-2 opacity-80 overflow-hidden px-4">
          {[...Array(24)].map((_, i) => (
            <span key={i} className="text-sm sm:text-base text-amber-500">
              {i % 2 === 0 ? '🌼' : '🌸'}
            </span>
          ))}
        </div>
        {/* Subtle base board */}
        <div className="w-full h-2 bg-gradient-to-r from-amber-800 via-amber-600 to-amber-800 opacity-60" />
      </footer>
    </div>
  );
};

// Single Diya with animated flickering flame & warm halo
const DiyaWithGlow: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  return (
    <div
      className="relative flex flex-col items-center"
      style={{ transform: `scale(${scale})` }}
    >
      {/* Glowing Warm Halo */}
      <motion.div
        animate={{
          scale: [0.92, 1.14, 0.92],
          opacity: [0.55, 0.9, 0.55],
        }}
        transition={{
          duration: 1.4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-3 w-10 h-10 rounded-full bg-amber-400/40 blur-md pointer-events-none"
      />

      {/* Flame */}
      <motion.div
        animate={{
          scaleY: [1, 1.25, 0.95, 1],
          skewX: [-2, 3, -1, 0],
        }}
        transition={{
          duration: 0.7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative z-10 w-3 h-5 mb-[-2px] flex items-end justify-center"
      >
        <div className="w-2.5 h-4 bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 rounded-full rounded-t-full shadow-[0_0_6px_#F59E0B]" />
      </motion.div>

      {/* Brass Lamp Bowl */}
      <svg viewBox="0 0 40 18" className="w-10 h-4.5 drop-shadow">
        <path
          d="M4 4 C4 14 14 17 20 17 C26 17 36 14 36 4 C32 7 26 8 20 8 C14 8 8 7 4 4 Z"
          fill="#D97706"
          stroke="#78350F"
          strokeWidth="1"
        />
        <ellipse cx="20" cy="17" rx="6" ry="1.5" fill="#92400E" />
      </svg>
    </div>
  );
};

// Gentle Floating Flower Petals
const FloatingPetals: React.FC<{ count: number }> = ({ count }) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {[...Array(count)].map((_, i) => {
        const startX = 10 + ((i * 17) % 80);
        const duration = 7 + (i % 6);
        const delay = (i * 0.8) % 5;
        const isMarigold = i % 2 === 0;

        return (
          <motion.div
            key={i}
            initial={{ y: -40, x: `${startX}vw`, opacity: 0, rotate: 0 }}
            animate={{
              y: '105vh',
              x: [`${startX}vw`, `${startX + (i % 2 === 0 ? 5 : -5)}vw`, `${startX}vw`],
              opacity: [0, 0.85, 0.85, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: 'linear',
            }}
            className="absolute"
          >
            {isMarigold ? (
              // Yellow-Orange Marigold petal
              <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-sm opacity-80" />
            ) : (
              // Rose Petal
              <div className="w-3.5 h-4 rounded-tl-full rounded-br-full bg-gradient-to-br from-rose-400 to-red-600 shadow-sm opacity-80" />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
