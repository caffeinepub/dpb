import { STORAGE_KEYS, TOTAL_LEVELS, type GameId, getGameStorageKey } from '../constants';

export interface ProgressData {
  completedLevels: number[];
  currentLevel: number;
  lastUnlockedLevel: number;
}

export function getDefaultProgress(): ProgressData {
  return {
    completedLevels: [],
    currentLevel: 1,
    lastUnlockedLevel: 1,
  };
}

export function loadProgress(gameId: GameId): ProgressData {
  try {
    const key = getGameStorageKey(gameId, STORAGE_KEYS.PROGRESS);
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load progress:', error);
  }
  return getDefaultProgress();
}

export function saveProgress(gameId: GameId, progress: ProgressData): void {
  try {
    const key = getGameStorageKey(gameId, STORAGE_KEYS.PROGRESS);
    localStorage.setItem(key, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
}

export function markLevelComplete(gameId: GameId, levelNumber: number): ProgressData {
  const progress = loadProgress(gameId);
  
  if (!progress.completedLevels.includes(levelNumber)) {
    progress.completedLevels.push(levelNumber);
    progress.completedLevels.sort((a, b) => a - b);
  }
  
  const nextLevel = Math.min(levelNumber + 1, TOTAL_LEVELS);
  progress.currentLevel = nextLevel;
  progress.lastUnlockedLevel = Math.max(progress.lastUnlockedLevel, nextLevel);
  
  saveProgress(gameId, progress);
  return progress;
}

export function skipToNextLevel(gameId: GameId, currentLevelNumber: number): ProgressData {
  const progress = loadProgress(gameId);
  
  const nextLevel = Math.min(currentLevelNumber + 1, TOTAL_LEVELS);
  progress.currentLevel = nextLevel;
  progress.lastUnlockedLevel = Math.max(progress.lastUnlockedLevel, nextLevel);
  
  saveProgress(gameId, progress);
  return progress;
}

export function resetProgressData(gameId: GameId): void {
  const key = getGameStorageKey(gameId, STORAGE_KEYS.PROGRESS);
  localStorage.removeItem(key);
}
