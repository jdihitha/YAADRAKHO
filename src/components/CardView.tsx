import React from 'react';
import { motion } from 'motion/react';
import { GameCard } from '../types';
import { ItemArtwork } from './ItemArtwork';

interface CardViewProps {
  card: GameCard;
  onClick: () => void;
  isInteractable: boolean;
  isMushakTarget?: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
}

export const CardView: React.FC<CardViewProps> = ({
  card,
  onClick,
  isInteractable,
  isMushakTarget = false,
  isCorrect = false,
  isWrong = false,
}) => {
  return (
    <motion.div
      layout
      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
      className="relative aspect-square w-full select-none perspective-1000"
    >
      <button
        type="button"
        id={`card-${card.positionIndex}`}
        onClick={onClick}
        disabled={!isInteractable}
        aria-label={card.isFlipped ? card.item.name : `Card ${card.positionIndex + 1}`}
        className={`w-full h-full relative cursor-pointer focus:outline-none transition-transform active:scale-95 duration-150 rounded-2xl ${
          !isInteractable ? 'cursor-default' : 'hover:-translate-y-1 hover:shadow-lg'
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div
          animate={{
            rotateY: card.isFlipped ? 0 : 180,
            scale: isMushakTarget ? [1, 1.08, 1] : 1,
          }}
          transition={{
            duration: 0.4,
            ease: 'easeOut',
          }}
          className={`w-full h-full relative rounded-2xl shadow-md transition-all ${
            card.isMatched || isCorrect
              ? 'ring-4 ring-emerald-500 shadow-emerald-400/50 shadow-lg'
              : isWrong
              ? 'ring-4 ring-rose-500 shadow-rose-400/50 shadow-lg'
              : isMushakTarget
              ? 'ring-4 ring-amber-300 shadow-amber-300/80 shadow-md'
              : 'hover:ring-2 hover:ring-amber-500'
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* ================================================================= */}
          {/* CARD FRONT: Light, soft, luminous cream-gold (much less dark)    */}
          {/* ================================================================= */}
          <div
            className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-b from-[#FFFFFF] via-[#FFFDF7] to-[#FEF3C7] border-2 border-[#FCD34D] flex flex-col items-center justify-between py-1.5 sm:py-2 px-1 sm:px-1.5 overflow-hidden backface-hidden shadow-sm"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Subtle inner highlight rim */}
            <div className="absolute inset-1 border border-amber-200/40 rounded-xl pointer-events-none" />

            {/* Found / Matched Checkmark Badge */}
            {(card.isMatched || isCorrect) && (
              <div className="absolute top-1 right-1 z-20 bg-emerald-500 text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-[10px] sm:text-xs font-black shadow-xs">
                ✓
              </div>
            )}

            {/* Simple festival icon */}
            <div className="flex-1 w-full flex items-center justify-center p-0.5">
              <ItemArtwork
                id={card.item.id}
                className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 drop-shadow-xs"
              />
            </div>

            {/* Short clean name underneath in refined warm amber-brown */}
            <div className="w-full text-center pb-0.5 z-10 px-0.5">
              <span className="text-[11px] sm:text-xs md:text-sm font-extrabold text-[#78350F] tracking-wide uppercase font-serif truncate block">
                {card.item.name}
              </span>
            </div>
          </div>

          {/* ================================================================= */}
          {/* CARD BACK: Soft, bright festive vermilion & gold (lightened)      */}
          {/* ================================================================= */}
          <div
            className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-b from-[#DC2626] via-[#B91C1C] to-[#991B1B] border-2 border-[#FDE047] flex flex-col items-center justify-center p-2 overflow-hidden shadow-sm"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            {/* Subtle inner gold rim */}
            <div className="absolute inset-1.5 border border-amber-200/40 rounded-xl pointer-events-none" />

            {/* Diya / Festive Symbol */}
            <div className="w-7 h-7 sm:w-9 sm:h-9 mb-1 flex items-center justify-center text-amber-200">
              <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-xs" fill="currentColor">
                <path d="M12 2 C13.5 5 15.5 7 12 11 C8.5 7 10.5 5 12 2 Z" fill="#FEF08A" />
                <path d="M5 13 C5 18 8 20 12 20 C16 20 19 18 19 13 C17 15 14 15.5 12 15.5 C10 15.5 7 15 5 13 Z" fill="#FBBF24" />
              </svg>
            </div>

            {/* YAADRAKHO Game Name */}
            <span className="text-[11px] sm:text-xs font-black text-amber-100 tracking-wider uppercase font-serif drop-shadow-xs">
              YAADRAKHO
            </span>
          </div>
        </motion.div>
      </button>
    </motion.div>
  );
};
