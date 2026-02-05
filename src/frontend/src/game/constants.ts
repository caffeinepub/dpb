export const REQUIRED_PASSWORD = 'dikshubhagat';
export const TOTAL_LEVELS = 100;

// Game IDs for multi-game support
export const GAME_IDS = {
  DEFAULT: 'default',
  PROMISES_100: 'promises-100',
} as const;

export type GameId = typeof GAME_IDS[keyof typeof GAME_IDS];

export const STORAGE_KEYS = {
  PASSWORD_UNLOCKED: 'dpb_password_unlocked',
  PROGRESS: 'dpb_progress',
  COMPLETED_LEVELS: 'dpb_completed_levels',
  CURRENT_LEVEL: 'dpb_current_level',
} as const;

// Helper to get per-game storage key
export function getGameStorageKey(gameId: GameId, baseKey: string): string {
  return `${baseKey}_${gameId}`;
}
