import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VinayakDecorations } from '../types';
import { GaneshaIllustration } from './GaneshaIllustration';
import { sound } from '../sound';

interface DecorateVinayakProps {
  currentDecorations: VinayakDecorations;
  onDecorate: (decorations: VinayakDecorations) => void;
  onContinue: () => void;
}

interface DecorationChoice {
  key: keyof VinayakDecorations;
  name: string;
  hindi: string;
  icon: string;
  description: string;
}

const DECORATION_OPTIONS: DecorationChoice[] = [
  {
    key: 'hasCrown',
    name: 'Royal Mukut',
    hindi: 'स्वर्ण मुकुट',
    icon: '👑',
    description: 'Golden crown with gems & kalgi',
  },
  {
    key: 'hasGarland',
    name: 'Marigold Haar',
    hindi: 'गेंदा पुष्प हार',
    icon: '🌼',
    description: 'Fresh yellow-orange marigold garland',
  },
  {
    key: 'hasTilak',
    name: 'Chandan Tilak',
    hindi: 'चंदन तिलक',
    icon: '✨',
    description: 'Sacred red and sandalwood blessing',
  },
  {
    key: 'hasModakPlate',
    name: 'Modak Thali',
    hindi: 'मोदक थाली',
    icon: '🥟',
    description: 'Golden plate of fresh sweet modaks',
  },
];

export const DecorateVinayak: React.FC<DecorateVinayakProps> = ({
  currentDecorations,
  onDecorate,
  onContinue,
}) => {
  const [decorations, setDecorations] = useState<VinayakDecorations>({ ...currentDecorations });
  const [justAdorned, setJustAdorned] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelectDecoration = (key: keyof VinayakDecorations, name: string) => {
    if (decorations[key]) {
      // Already selected, still can give pleasant chime
      sound.playTempleBell();
      return;
    }

    const updated = { ...decorations, [key]: true };
    setDecorations(updated);
    setJustAdorned(name);
    sound.playBlessingChime();
    onDecorate(updated);

    // After brief delight, mark complete
    setTimeout(() => {
      setIsCompleted(true);
    }, 1200);

    // Automatically transition to next round after celebrating
    setTimeout(() => {
      onContinue();
    }, 2800);
  };

  // Find if all are decorated or get first available default
  const allDecorated = Object.values(decorations).every(Boolean);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center py-2 px-3 animate-fade-in">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-2"
      >
        <span className="text-xs uppercase tracking-widest text-amber-700 font-extrabold bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300">
          Festival Milestone
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-amber-950 mt-1 tracking-tight">
          DECORATE VINAYAK
        </h2>
        <p className="text-xs sm:text-sm text-amber-900/80 max-w-md mx-auto">
          Offer a sacred decoration to Ganesha. It will stay adorned throughout your journey!
        </p>
      </motion.div>

      {/* Close-Up Ganesha Center Stage */}
      <div className="relative my-2 sm:my-3 flex items-center justify-center">
        {/* Divine Aura Glow */}
        <motion.div
          animate={{
            scale: justAdorned ? [1, 1.25, 1.1] : [1, 1.06, 1],
            opacity: justAdorned ? [0.6, 1, 0.7] : [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-72 h-72 sm:w-88 sm:h-88 rounded-full bg-radial from-amber-300/60 via-orange-300/30 to-transparent blur-xl pointer-events-none"
        />

        <GaneshaIllustration
          size="lg"
          decorations={decorations}
          className="relative z-10"
        />

        {/* Celebration Petals & Message Badge */}
        <AnimatePresence>
          {justAdorned && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute -bottom-3 z-30 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white px-5 py-2 rounded-full shadow-xl border-2 border-yellow-200 font-bold text-sm sm:text-base flex items-center gap-2"
            >
              <span>🌸</span>
              <span>Vinayak is ready!</span>
              <span>✨</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decoration Choices Tray */}
      <div className="w-full mt-4 bg-amber-50/90 border border-amber-300/80 rounded-2xl p-3 sm:p-4 shadow-md backdrop-blur-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900/70 mb-2">
          Select an offering for Vinayak:
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {DECORATION_OPTIONS.map((item) => {
            const isAdorned = decorations[item.key];

            return (
              <button
                key={item.key}
                type="button"
                id={`decorate-btn-${item.key}`}
                disabled={isAdorned}
                onClick={() => handleSelectDecoration(item.key, item.name)}
                className={`group relative p-2.5 rounded-xl border flex flex-col items-center justify-between text-center transition-all ${
                  isAdorned
                    ? 'bg-amber-100/60 border-amber-300 opacity-80 cursor-default'
                    : 'bg-white hover:bg-amber-50 border-amber-400 hover:border-amber-600 shadow-xs hover:shadow-md cursor-pointer active:scale-95'
                }`}
              >
                <span className="text-2xl sm:text-3xl mb-1 group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>

                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold text-amber-950 leading-tight">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-amber-800 font-serif">
                    {item.hindi}
                  </span>
                </div>

                <div className="mt-1.5">
                  {isAdorned ? (
                    <span className="inline-flex items-center text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                      ✓ Adorned
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-[10px] font-extrabold text-amber-800 bg-amber-200/80 group-hover:bg-amber-300 px-2.5 py-0.5 rounded-full">
                      Offer +
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Continue Button */}
        {(isCompleted || allDecorated) && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex justify-center"
          >
            <button
              type="button"
              id="continue-after-decorate"
              onClick={onContinue}
              className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 hover:from-amber-700 hover:to-orange-700 text-white font-extrabold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-amber-500/30 transition-all flex items-center gap-2 cursor-pointer text-sm sm:text-base border border-amber-300"
            >
              <span>Continue Memory Game</span>
              <span>→</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
