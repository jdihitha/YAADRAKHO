import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, VolumeX, Sparkles, Trophy } from 'lucide-react';
import {
  GameCard,
  GamePhase,
  CardItem,
  VinayakDecorations,
  SwapAction,
} from './types';
import { FESTIVE_ITEMS } from './data/items';
import { FestiveEnvironment } from './components/FestiveEnvironment';
import { GaneshaIllustration, TreatType } from './components/GaneshaIllustration';
import { CardView } from './components/CardView';
import { MushakCharacter } from './components/MushakCharacter';
import { DecorateVinayak } from './components/DecorateVinayak';
import { CelebrationMoment } from './components/CelebrationMoment';
import { GameOverModal } from './components/GameOverModal';
import { ItemArtwork } from './components/ItemArtwork';
import { sound } from './sound';

const STORAGE_KEY_BEST_SCORE = 'yaadrakho_best_score';
const STORAGE_KEY_DECORATIONS = 'yaadrakho_vinayak_decorations';

export default function App() {
  // Game State
  const [phase, setPhase] = useState<GamePhase>('home');
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(() => {
    try {
      return (
        Number(localStorage.getItem(STORAGE_KEY_BEST_SCORE)) ||
        Number(localStorage.getItem('judam_best_score')) ||
        0
      );
    } catch {
      return 0;
    }
  });
  const [lives, setLives] = useState<number>(3);
  const [level, setLevel] = useState<number>(1);
  const [streak, setStreak] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Cards & 2 Target Items (cards scale from 6 up to 10 by level)
  const [cards, setCards] = useState<GameCard[]>([]);
  const [targetItems, setTargetItems] = useState<[CardItem, CardItem] | null>(null);
  const [foundTargetItemIds, setFoundTargetItemIds] = useState<string[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [swappedIndices, setSwappedIndices] = useState<SwapAction | null>(null);
  const [mushakMessage, setMushakMessage] = useState<string>('');

  // Watch timer countdown (5 seconds)
  const [watchProgress, setWatchProgress] = useState<number>(100);

  // Vinayak Decorations earned
  const [decorations, setDecorations] = useState<VinayakDecorations>(() => {
    try {
      const saved =
        localStorage.getItem(STORAGE_KEY_DECORATIONS) ||
        localStorage.getItem('judam_vinayak_decorations');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      hasCrown: false,
      hasGarland: false,
      hasTilak: false,
      hasModakPlate: false,
    };
  });

  // Level celebration stats
  const [lastScoreGained, setLastScoreGained] = useState<number>(0);

  // Home Screen Ganesha Eating Animation State (Modak or Undralu)
  const [homeTreatType, setHomeTreatType] = useState<TreatType>('modak');
  const [showYumBubble, setShowYumBubble] = useState<boolean>(false);

  const handleFeedGanesha = (type?: TreatType) => {
    const selected = type || (homeTreatType === 'modak' ? 'undralu' : 'modak');
    setHomeTreatType(selected);
    sound.playMunch();
    setShowYumBubble(true);
    setTimeout(() => setShowYumBubble(false), 2400);
  };

  // Timer reference
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Save decorations whenever changed
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DECORATIONS, JSON.stringify(decorations));
    } catch {}
  }, [decorations]);

  // Audio & Music toggle
  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  // Card count scales level by level from 6 up to 10 only (Level 1: 6, Level 2: 7, Level 3: 8, Level 4: 9, Level 5+: 10)
  const getCardCountForLevel = (lvl: number): number => {
    return Math.min(10, 6 + Math.max(0, lvl - 1));
  };

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      sound.stopMusic();
    };
  }, []);

  // Try to start music on first user interaction anywhere
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!isMuted && !sound.isMusicPlaying) {
        sound.startMusic();
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isMuted]);

  // Periodic eating sound while on the home screen (synchronized with chewing bite)
  useEffect(() => {
    if (phase !== 'home' || isMuted) return;

    // First bite sound after the initial modak reaches the mouth (~2.6s)
    const initialBiteTimer = setTimeout(() => {
      sound.playMunch();
    }, 2600);

    // Subsequent bite sounds every 3.8s eating cycle
    const eatingLoop = setInterval(() => {
      sound.playMunch();
    }, 3800);

    return () => {
      clearTimeout(initialBiteTimer);
      clearInterval(eatingLoop);
    };
  }, [phase, isMuted]);

  // =========================================================================
  // ROUND SETUP & PHASES
  // =========================================================================
  const startNewRound = useCallback((targetLevel: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

    setSelectedCardId(null);
    setSwappedIndices(null);
    setMushakMessage('');
    const cardCount = getCardCountForLevel(targetLevel);

    // Pick unique festive items from pool (pool expands up to 14 items)
    const availablePool = FESTIVE_ITEMS.slice(
      0,
      Math.min(FESTIVE_ITEMS.length, Math.max(cardCount + 2, 10))
    );
    const shuffledItems = [...availablePool].sort(() => 0.5 - Math.random());
    const selectedItems = shuffledItems.slice(0, cardCount);

    // Create cards (6 up to 10 depending on level)
    const initialCards: GameCard[] = selectedItems.map((item, idx) => ({
      instanceId: `card-${idx}-${item.id}-${Date.now()}`,
      item,
      positionIndex: idx,
      isFlipped: true, // Face up in WATCH phase
      isMatched: false,
    }));

    setCards(initialCards);

    // Pick TWO distinct items as targets to find
    const target1 = selectedItems[Math.floor(Math.random() * selectedItems.length)];
    let target2 = selectedItems[Math.floor(Math.random() * selectedItems.length)];
    while (target2.id === target1.id) {
      target2 = selectedItems[Math.floor(Math.random() * selectedItems.length)];
    }
    setTargetItems([target1, target2]);
    setFoundTargetItemIds([]);

    // Begin WATCH Phase (5 Seconds Duration)
    setPhase('watch');
    sound.playCardFlip();

    const watchDuration = 5000;
    setWatchProgress(100);

    const startTime = Date.now();
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remainingPct = Math.max(0, 100 - (elapsed / watchDuration) * 100);
      setWatchProgress(remainingPct);
      if (remainingPct <= 0 && progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    }, 50);

    // End of watch phase -> flip cards down -> trigger Mushak
    timerRef.current = setTimeout(() => {
      // Flip cards face down
      setCards((prev) =>
        prev.map((c) => ({
          ...c,
          isFlipped: false,
          isMatched: false,
        }))
      );
      sound.playCardFlip();

      // Enter MUSHAK phase
      setPhase('mushak');
      triggerMushakMischief(initialCards);
    }, watchDuration);
  }, []);

  // =========================================================================
  // MUSHAK TRICK & CARD SWAPPING
  // =========================================================================
  const triggerMushakMischief = (currentDeck: GameCard[]) => {
    setMushakMessage('Mushak is looking for modaks...');
    sound.playMushakScurry();

    // After brief delay, Mushak picks two cards and swaps them!
    timerRef.current = setTimeout(() => {
      const total = currentDeck.length;
      const idxA = Math.floor(Math.random() * total);
      let idxB = Math.floor(Math.random() * total);
      while (idxB === idxA) {
        idxB = Math.floor(Math.random() * total);
      }

      setSwappedIndices({ fromIndex: idxA, toIndex: idxB });
      setMushakMessage('Look! Mushak swapped two cards!');
      sound.playSwapSwoosh();

      // Physically swap cards in the array
      setCards((prev) => {
        const next = [...prev];
        const temp = next[idxA];
        next[idxA] = next[idxB];
        next[idxB] = temp;
        return next.map((card, i) => ({ ...card, positionIndex: i }));
      });

      // Clear swap highlight and transition to FIND phase
      timerRef.current = setTimeout(() => {
        setSwappedIndices(null);
        setMushakMessage('');
        setPhase('find');
        sound.playTempleBell();
      }, 1600);
    }, 1200);
  };

  // =========================================================================
  // PLAYER INTERACTION & CARD SELECTION (FIND 2 ITEMS)
  // =========================================================================
  const handleCardClick = (card: GameCard) => {
    if (phase !== 'find' || !targetItems) return;
    if (card.isFlipped || card.isMatched) return; // Ignore already revealed or matched cards

    setSelectedCardId(card.instanceId);

    const isMatchA =
      card.item.id === targetItems[0].id && !foundTargetItemIds.includes(targetItems[0].id);
    const isMatchB =
      card.item.id === targetItems[1].id && !foundTargetItemIds.includes(targetItems[1].id);
    const isCorrect = isMatchA || isMatchB;

    if (isCorrect) {
      // Correct choice!
      sound.playCorrect();
      const updatedFound = [...foundTargetItemIds, card.item.id];
      setFoundTargetItemIds(updatedFound);

      // Flip clicked card and mark matched
      setCards((prev) =>
        prev.map((c) =>
          c.instanceId === card.instanceId
            ? { ...c, isFlipped: true, isMatched: true }
            : c
        )
      );

      // Check if BOTH targets are now found!
      if (updatedFound.length >= 2) {
        // Round Complete! Both items found!
        setPhase('reveal');
        const newStreak = streak + 1;
        setStreak(newStreak);
        const pointsGained = 150 * level + newStreak * 30;
        setLastScoreGained(pointsGained);

        const newScore = score + pointsGained;
        setScore(newScore);

        if (newScore > bestScore) {
          setBestScore(newScore);
          try {
            localStorage.setItem(STORAGE_KEY_BEST_SCORE, String(newScore));
          } catch {}
        }

        // Enter celebration moment
        timerRef.current = setTimeout(() => {
          setPhase('celebrate');
          sound.playLevelFanfare();

          timerRef.current = setTimeout(() => {
            // Check if it's time for DECORATE VINAYAK (every 2 levels: level 2, 4, 6...)
            if (level % 2 === 0) {
              setPhase('decorate');
            } else {
              // Proceed to next level directly
              const nextLvl = level + 1;
              setLevel(nextLvl);
              startNewRound(nextLvl);
            }
          }, 1800);
        }, 800);
      } else {
        // 1 of 2 found: remains in 'find' phase so player can select the second item!
      }
    } else {
      // Wrong guess!
      setPhase('reveal');
      sound.playWrong();
      setStreak(0);
      const remainingLives = lives - 1;
      setLives(remainingLives);

      // Flip the wrong card to show what it was
      setCards((prev) =>
        prev.map((c) =>
          c.instanceId === card.instanceId
            ? { ...c, isFlipped: true, isMatched: false }
            : c
        )
      );

      // Reveal where the target cards were so player can see
      timerRef.current = setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            targetItems &&
            (c.item.id === targetItems[0].id || c.item.id === targetItems[1].id)
              ? { ...c, isFlipped: true }
              : c
          )
        );

        // Check if game over
        timerRef.current = setTimeout(() => {
          if (remainingLives <= 0) {
            setPhase('gameover');
          } else {
            // Player still has lives: restart round for this level
            startNewRound(level);
          }
        }, 1800);
      }, 700);
    }
  };

  // Start game from Home or Play Again
  const handleStartGame = () => {
    sound.startMusic();
    sound.playTempleBell();
    setScore(0);
    setLives(3);
    setLevel(1);
    setStreak(0);
    startNewRound(1);
  };

  // Decorate Vinayak completion handler
  const handleDecorationContinue = () => {
    const nextLvl = level + 1;
    setLevel(nextLvl);
    startNewRound(nextLvl);
  };

  // Return to Mandapam (Home)
  const handleGoHome = () => {
    sound.playTempleBell();
    setPhase('home');
  };

  return (
    <FestiveEnvironment level={level}>
      {/* Sound & Music Toggle Button (Floating in Mandapam Corner) */}
      <button
        type="button"
        id="sound-toggle-btn"
        onClick={toggleSound}
        aria-label={isMuted ? 'Unmute festival music' : 'Mute festival music'}
        className={`fixed top-2 sm:top-3 right-2 sm:right-5 z-40 border p-2.5 rounded-full shadow-md cursor-pointer transition-all active:scale-90 flex items-center gap-1.5 ${
          isMuted
            ? 'bg-amber-100/90 border-amber-300 text-amber-950'
            : 'bg-amber-200/95 border-amber-400 text-amber-950 shadow-amber-300/40'
        }`}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4" />
        ) : (
          <div className="flex items-center gap-1">
            <Music className="w-4 h-4 text-amber-900 animate-pulse" />
            <span className="text-[10px] font-extrabold uppercase tracking-wider hidden sm:inline text-amber-950">
              Music
            </span>
          </div>
        )}
      </button>

      {/* =================================================================== */}
      {/* 1. HOME SCREEN — YAADRAKHO                                         */}
      {/* =================================================================== */}
      {phase === 'home' && (
        <div className="w-full flex flex-col items-center justify-center text-center py-2 px-3 animate-fade-in my-auto">
          {/* Main Focus: Cute Ganesha with Eating Modak / Undralu Animation */}
          <div className="relative mb-2 sm:mb-3 flex flex-col items-center justify-center">
            {/* Soft Warm Halo behind Ganesha */}
            <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-radial from-amber-300/40 via-orange-200/20 to-transparent blur-xl pointer-events-none" />

            {/* Yum Speech Bubble when Ganesha is fed */}
            <AnimatePresence>
              {showYumBubble && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.85 }}
                  className="absolute -top-3 z-30 bg-amber-50/95 border-2 border-amber-400 text-amber-950 px-3.5 py-1 rounded-full shadow-md text-xs font-black font-serif flex items-center gap-1.5 pointer-events-none select-none"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                  <span>
                    {homeTreatType === 'modak'
                      ? '😋 Yummy Modakam! 🥟'
                      : '😋 Delicious Undrallu! ⚪'}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="button"
              onClick={() => handleFeedGanesha()}
              className="cursor-pointer transition-transform active:scale-95 focus:outline-none"
              title="Tap to feed Ganapathi!"
            >
              <GaneshaIllustration
                size="lg"
                decorations={decorations}
                animateEntrance={true}
                isEating={true}
                treatType={homeTreatType}
                className="relative z-10"
              />
            </button>

            {/* Prasad Offering Selector: Modak or Undralu */}
            <div className="relative z-20 mt-1 flex flex-col items-center gap-1">
              <div className="flex items-center justify-center gap-1.5 bg-amber-100/90 border border-amber-300/90 px-3 py-1 rounded-full shadow-xs">
                <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-amber-900/90 mr-1 flex items-center gap-1">
                  <span>Offer Prasad:</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleFeedGanesha('modak')}
                  className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-black transition-all flex items-center gap-1 cursor-pointer border ${
                    homeTreatType === 'modak'
                      ? 'bg-amber-600 text-white border-amber-400 shadow-sm scale-105'
                      : 'bg-white/80 text-amber-900 border-amber-200 hover:bg-amber-100'
                  }`}
                  title="Feed Ganesha Modak with crunch munch sound!"
                >
                  <span>🥟</span>
                  <span>Modak</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleFeedGanesha('undralu')}
                  className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-black transition-all flex items-center gap-1 cursor-pointer border ${
                    homeTreatType === 'undralu'
                      ? 'bg-orange-600 text-white border-orange-400 shadow-sm scale-105'
                      : 'bg-white/80 text-amber-900 border-amber-200 hover:bg-amber-100'
                  }`}
                  title="Feed Ganesha Undralu with crunch munch sound!"
                >
                  <span>⚪</span>
                  <span>Undralu</span>
                </button>
              </div>
              <p className="text-[10px] text-amber-800/80 font-medium">
                Tap treat or Ganapathi to feed &amp; hear munching sound 🔊
              </p>
            </div>
          </div>

          {/* YAADRAKHO Branding */}
          <div className="flex flex-col items-center max-w-md mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black font-serif tracking-tight text-amber-950 drop-shadow-sm flex items-center justify-center gap-2"
            >
              <span>YAADRAKHO</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm sm:text-base font-serif font-bold text-amber-800 tracking-wider mt-0.5"
            >
              Watch. Remember. Find.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xs sm:text-sm text-amber-900/80 mt-1 max-w-xs sm:max-w-sm leading-relaxed"
            >
              A festive memory challenge where every card can change.
            </motion.p>

            {/* Best Score Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-3 inline-flex items-center gap-2 bg-amber-100/90 border border-amber-300 text-amber-900 px-4 py-1.5 rounded-full text-xs font-bold shadow-xs"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span>BEST SCORE:</span>
              <span className="font-extrabold text-amber-950 font-serif text-sm">
                {bestScore}
              </span>
            </motion.div>

            {/* Large Attractive PLAY Button */}
            <motion.button
              type="button"
              id="play-button"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ delay: 0.5 }}
              onClick={handleStartGame}
              className="mt-5 w-full sm:w-64 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 hover:from-amber-700 hover:to-orange-700 text-white font-black py-3.5 px-8 rounded-2xl shadow-xl hover:shadow-orange-500/30 border-2 border-yellow-200 text-lg sm:text-xl tracking-wide flex items-center justify-center gap-3 cursor-pointer transition-all"
            >
              <span>PLAY</span>
              <span className="text-2xl leading-none">→</span>
            </motion.button>

            {/* Direct Festive Music Toggle on Home */}
            <motion.button
              type="button"
              id="home-music-toggle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              onClick={toggleSound}
              className={`mt-2.5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer shadow-xs ${
                isMuted
                  ? 'bg-amber-100/90 border-amber-300 text-amber-900 hover:bg-amber-200'
                  : 'bg-gradient-to-r from-amber-200 to-yellow-200 border-amber-400 text-amber-950 hover:from-amber-300 hover:to-yellow-300'
              }`}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-amber-700" />
                  <span>Music: Off (Tap to play music)</span>
                </>
              ) : (
                <>
                  <Music className="w-3.5 h-3.5 text-amber-800 animate-pulse" />
                  <span>Festive Music: Playing 🎵</span>
                </>
              )}
            </motion.button>

            {/* Small Compact HOW TO PLAY */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-4 bg-amber-50/90 border border-amber-300/80 rounded-xl p-2.5 sm:p-3 w-full max-w-sm shadow-xs"
            >
              <span className="block text-[11px] font-extrabold uppercase tracking-wider text-amber-800 mb-1.5">
                HOW TO PLAY (6 TO 10 CARDS · FIND 2 ITEMS)
              </span>
              <div className="flex flex-col gap-1 text-[11px] sm:text-xs text-amber-950 text-left font-medium">
                <div className="flex items-center gap-2">
                  <span>👀</span>
                  <span><strong>Watch</strong> — Remember cards for 5s (6 to 10 cards)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🐭</span>
                  <span><strong>Remember</strong> — Mushak swaps cards when face-down</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✨</span>
                  <span><strong>Find 2</strong> — Find both requested items to clear the level</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 2. GAMEPLAY SCREEN (WATCH, MUSHAK, FIND, REVEAL)                   */}
      {/* =================================================================== */}
      {(phase === 'watch' ||
        phase === 'mushak' ||
        phase === 'find' ||
        phase === 'reveal' ||
        phase === 'celebrate') && (
        <div className="w-full flex flex-col items-center py-1 sm:py-2">
          {/* GAMEPLAY HEADER: SCORE | ❤️ LIVES | LEVEL */}
          <div className="w-full max-w-md bg-gradient-to-r from-amber-100/90 via-amber-50/90 to-amber-100/90 border border-amber-300/80 rounded-2xl px-4 py-2 sm:py-2.5 shadow-sm flex items-center justify-between backdrop-blur-xs select-none mb-3">
            {/* Score */}
            <div className="flex flex-col items-start">
              <span className="text-[10px] sm:text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                SCORE
              </span>
              <span className="text-lg sm:text-xl font-black text-amber-950 font-serif leading-tight">
                {score}
              </span>
            </div>

            {/* Lives ❤️ */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] sm:text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                LIVES
              </span>
              <div className="flex items-center gap-1 mt-0.5 text-base sm:text-lg">
                {[1, 2, 3].map((heartIndex) => (
                  <span
                    key={heartIndex}
                    className={`transition-transform duration-200 ${
                      heartIndex <= lives ? 'scale-100 text-rose-600' : 'opacity-25 grayscale scale-90'
                    }`}
                  >
                    ❤️
                  </span>
                ))}
              </div>
            </div>

            {/* Level */}
            <div className="flex flex-col items-end">
              <span className="text-[10px] sm:text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                LEVEL
              </span>
              <span className="text-lg sm:text-xl font-black text-amber-950 font-serif leading-tight">
                {level}
              </span>
            </div>
          </div>

          {/* FIND BANNER (2 ITEMS) OR WATCH COUNTDOWN */}
          <div className="w-full max-w-md min-h-[56px] flex flex-col items-center justify-center mb-2 px-2 select-none">
            {phase === 'watch' && (
              <div className="w-full flex flex-col items-center">
                <div className="flex items-center gap-1.5 text-sm sm:text-base font-extrabold text-amber-900 mb-1">
                  <span>👀</span>
                  <span>WATCH & REMEMBER ({cards.length} CARDS · 5s)</span>
                  <span>👀</span>
                </div>
                {/* Countdown Bar */}
                <div className="w-full max-w-xs h-2.5 bg-amber-200/80 rounded-full overflow-hidden border border-amber-300">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 transition-all duration-75"
                    style={{ width: `${watchProgress}%` }}
                  />
                </div>
              </div>
            )}

            {phase === 'mushak' && (
              <div className="flex items-center gap-2">
                <MushakCharacter
                  isMoving={true}
                  message={mushakMessage || "Mushak is shuffling cards!"}
                  size="sm"
                />
              </div>
            )}

            {(phase === 'find' || phase === 'reveal' || phase === 'celebrate') && targetItems && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full flex flex-col items-center gap-1.5"
              >
                <div className="flex items-center gap-1.5 sm:gap-2.5 flex-wrap justify-center">
                  <span className="text-[11px] sm:text-xs font-black tracking-wider uppercase text-amber-950 bg-amber-100/90 border border-amber-300 px-2.5 py-1 rounded-full">
                    FIND BOTH ({foundTargetItemIds.length}/2):
                  </span>
                  {targetItems.map((target, idx) => {
                    const isFound = foundTargetItemIds.includes(target.id);
                    return (
                      <motion.div
                        key={`${target.id}-${idx}`}
                        animate={isFound ? { scale: [1, 1.08, 1] } : {}}
                        className={`px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border-2 flex items-center gap-1.5 sm:gap-2 shadow-xs transition-all duration-200 ${
                          isFound
                            ? 'bg-emerald-600 border-emerald-300 text-white shadow-emerald-500/30'
                            : 'bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 border-yellow-200 text-white shadow-sm'
                        }`}
                      >
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full p-0.5 shadow-xs flex items-center justify-center">
                          <ItemArtwork id={target.id} className="w-full h-full" />
                        </div>
                        <span className="text-xs sm:text-sm font-black font-serif tracking-wide">
                          {target.name}
                        </span>
                        {isFound ? (
                          <span className="bg-white/30 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-black">
                            ✓
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-yellow-200">
                            #{idx + 1}
                          </span>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>

          {/* CARD BOARD: Dynamically adapts to 6, 7, 8, 9, or 10 cards */}
          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg flex flex-wrap justify-center items-center gap-2 sm:gap-3 p-1.5 sm:p-2">
            {cards.map((card, idx) => {
              const isMushakTarget =
                swappedIndices !== null &&
                (swappedIndices.fromIndex === idx || swappedIndices.toIndex === idx);

              const isSelected = selectedCardId === card.instanceId;
              const isTargetCard = Boolean(
                targetItems &&
                  (card.item.id === targetItems[0].id || card.item.id === targetItems[1].id)
              );
              const isRevealedWrong = Boolean(
                phase === 'reveal' && isSelected && !isTargetCard
              );
              const isRevealedCorrect = Boolean(
                card.isMatched || (phase === 'reveal' && isTargetCard)
              );

              // Responsive width based on card count
              let widthClass = 'w-[calc(33.333%-8px)] max-w-[110px]';
              if (cards.length === 7 || cards.length === 8) {
                widthClass = 'w-[calc(25%-8px)] max-w-[95px]';
              } else if (cards.length >= 9) {
                widthClass = 'w-[calc(20%-8px)] min-w-[62px] max-w-[86px]';
              }

              return (
                <div
                  key={card.instanceId}
                  className={`${widthClass} aspect-square`}
                >
                  <CardView
                    card={card}
                    onClick={() => handleCardClick(card)}
                    isInteractable={phase === 'find'}
                    isMushakTarget={isMushakTarget}
                    isCorrect={isRevealedCorrect}
                    isWrong={isRevealedWrong}
                  />
                </div>
              );
            })}
          </div>

          {/* Bottom subtle guidance note */}
          <div className="mt-3 text-center text-xs text-amber-800/75 font-serif select-none flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>
              {phase === 'watch' && `Memorize the ${cards.length} cards in 5 seconds!`}
              {phase === 'mushak' && 'Watch closely! Mushak is swapping cards...'}
              {phase === 'find' &&
                (foundTargetItemIds.length === 0
                  ? 'Tap either of the 2 target cards you remember!'
                  : 'Superb! Now tap the 2nd target card!')}
              {phase === 'reveal' && 'Checking cards...'}
              {phase === 'celebrate' && 'Auspicious memory! Both items found!'}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 3. LEVEL COMPLETE CELEBRATION MOMENT (Joyful short fanfare)         */}
      {/* =================================================================== */}
      <AnimatePresence>
        {phase === 'celebrate' && (
          <CelebrationMoment
            level={level}
            scoreGained={lastScoreGained}
            streak={streak}
          />
        )}
      </AnimatePresence>

      {/* =================================================================== */}
      {/* 4. AFTER TWO LEVELS — DECORATE VINAYAK INTERACTION                  */}
      {/* =================================================================== */}
      {phase === 'decorate' && (
        <DecorateVinayak
          currentDecorations={decorations}
          onDecorate={(updated) => setDecorations(updated)}
          onContinue={handleDecorationContinue}
        />
      )}

      {/* =================================================================== */}
      {/* 5. GAME OVER MODAL                                                 */}
      {/* =================================================================== */}
      {phase === 'gameover' && (
        <GameOverModal
          score={score}
          bestScore={bestScore}
          level={level}
          decorations={decorations}
          onPlayAgain={handleStartGame}
          onGoHome={handleGoHome}
        />
      )}
    </FestiveEnvironment>
  );
}
