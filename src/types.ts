export type CardItemId =
  | 'diya'
  | 'modak'
  | 'flower'
  | 'durva'
  | 'ganesha'
  | 'mushak'
  | 'garland'
  | 'kalash'
  | 'coconut'
  | 'dhol'
  | 'banana'
  | 'marigold'
  | 'rangoli'
  | 'leaf';

export interface CardItem {
  id: CardItemId;
  name: string; // SHORT ENGLISH NAME (e.g., 'DIYA', 'MODAK')
}

export interface GameCard {
  instanceId: string;
  item: CardItem;
  positionIndex: number;
  isFlipped: boolean;
  isMatched?: boolean;
}

export type GamePhase =
  | 'home'
  | 'watch'       // Player memorizes cards (3-4 seconds)
  | 'mushak'      // Mushak arrives and swaps/changes cards
  | 'find'        // Target displayed, player picks card
  | 'reveal'      // Card reveals answer
  | 'celebrate'   // Level completion celebration
  | 'decorate'    // Decorate Vinayak interaction (after every 2 levels)
  | 'gameover';   // 0 lives left

export interface VinayakDecorations {
  hasCrown: boolean;
  hasGarland: boolean;
  hasTilak: boolean;
  hasModakPlate: boolean;
}

export interface SwapAction {
  fromIndex: number;
  toIndex: number;
}
