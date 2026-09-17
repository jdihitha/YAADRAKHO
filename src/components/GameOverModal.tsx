import React from 'react';
import { motion } from 'motion/react';
import { VinayakDecorations } from '../types';
import { GaneshaIllustration } from './GaneshaIllustration';

interface GameOverModalProps {
  score: number;
  bestScore: number;
  level: number;
  decorations: VinayakDecorations;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  score,
  bestScore,
  level,
  decorations,
  onPlayAgain,
  onGoHome,
}) => {
  const isNewBest = score > 0 && score >= bestScore;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md mx-auto bg-gradient-to-b from-[#FFFDF9] to-[#FFF7ED] border-2 border-amber-500/80 rounded-3xl p-5 sm:p-7 shadow-2xl text-center relative overflow-hidden my-auto"
    >
      {/* Decorative top scallop border */}
      <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-red-600 via-amber-500 to-red-600" />

      {/* Mini Ganesha with all earned decorations */}
      <div className="flex justify-center mb-1">
        <GaneshaIllustration
          size="sm"
          decorations={decorations}
          className="scale-110"
        />
      </div>

      <div className="text-amber-800 font-bold text-xs uppercase tracking-widest mt-1">
        Ganesh Chaturthi Blessings
      </div>
      <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-amber-950 mt-0.5">
        Festival Round Over
      </h2>

      <p className="text-xs text-amber-900/70 mt-1">
        Vinayak is pleased with your remembrance!
      </p>

      {/* Score Summary Box */}
      <div className="my-4 bg-amber-100/70 border border-amber-300 rounded-2xl p-3.5 flex justify-around items-center">
        <div>
          <span className="block text-[11px] font-bold text-amber-800 uppercase tracking-wider">
            Final Score
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-serif">
            {score}
          </span>
        </div>

        <div className="h-8 w-px bg-amber-300" />

        <div>
          <span className="block text-[11px] font-bold text-amber-800 uppercase tracking-wider">
            Level Reached
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-serif">
            {level}
          </span>
        </div>

        <div className="h-8 w-px bg-amber-300" />

        <div>
          <span className="block text-[11px] font-bold text-amber-800 uppercase tracking-wider">
            Best Score
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-amber-700 font-serif">
            {bestScore}
          </span>
        </div>
      </div>

      {isNewBest && (
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mb-4 inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-sm"
        >
          🏆 New Festive Best Score!
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-2.5">
        <button
          type="button"
          id="play-again-btn"
          onClick={onPlayAgain}
          className="w-full bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 hover:from-amber-700 hover:to-orange-700 text-white font-extrabold py-3 px-6 rounded-xl shadow-lg hover:shadow-amber-500/30 transition-all text-base sm:text-lg flex items-center justify-center gap-2 cursor-pointer border border-amber-300 active:scale-98"
        >
          <span>Play Again</span>
          <span>↺</span>
        </button>

        <button
          type="button"
          id="go-home-btn"
          onClick={onGoHome}
          className="w-full bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold py-2.5 px-4 rounded-xl transition-colors text-sm cursor-pointer border border-amber-300"
        >
          Return to Mandapam
        </button>
      </div>
    </motion.div>
  );
};
