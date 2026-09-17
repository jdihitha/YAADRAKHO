import React from 'react';
import { motion } from 'motion/react';

interface CelebrationMomentProps {
  level: number;
  scoreGained: number;
  streak: number;
}

export const CelebrationMoment: React.FC<CelebrationMomentProps> = ({
  level,
  scoreGained,
  streak,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none p-4"
    >
      <div className="bg-gradient-to-b from-[#FFFDF9] via-[#FFFBEB] to-[#FEF3C7] border-3 border-amber-500 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center text-center max-w-xs sm:max-w-sm w-full relative overflow-hidden">
        {/* Top Gold Swastika flourish */}
        <div className="text-amber-600 font-serif text-xs font-bold tracking-widest uppercase mb-1">
          卐 Mangal Murti Moraya 卐
        </div>

        {/* Level Complete Header */}
        <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-amber-950 tracking-tight">
          LEVEL {level} COMPLETE!
        </h3>

        {/* Small festive animation */}
        <div className="my-3 flex items-center justify-center gap-2 text-3xl">
          <span>🌸</span>
          <motion.span
            animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            🪔
          </motion.span>
          <span>🌼</span>
        </div>

        {/* Points earned */}
        <div className="bg-amber-500/15 border border-amber-400 rounded-full px-4 py-1.5 flex items-center gap-2">
          <span className="text-xs font-bold text-amber-900 uppercase">Score:</span>
          <span className="text-base font-extrabold text-amber-950 font-serif">
            +{scoreGained} pts
          </span>
          {streak > 1 && (
            <span className="text-[10px] bg-orange-500 text-white font-black px-1.5 py-0.5 rounded-full">
              {streak}x Streak!
            </span>
          )}
        </div>

        <p className="text-[11px] text-amber-800/80 font-medium mt-2">
          Ganesha is pleased! Next round preparing...
        </p>
      </div>
    </motion.div>
  );
};
