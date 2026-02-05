import { STORAGE_KEYS, TOTAL_LEVELS } from '../constants';

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

export function loadProgress(): ProgressData {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PROMISES_KEPT_PROGRESS);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load promises kept progress:', error);
  }
  return getDefaultProgress();
}

export function saveProgress(progress: ProgressData): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROMISES_KEPT_PROGRESS, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save promises kept progress:', error);
  }
}

export function markLevelComplete(levelNumber: number): ProgressData {
  const progress = loadProgress();
  
  if (!progress.completedLevels.includes(levelNumber)) {
    progress.completedLevels.push(levelNumber);
    progress.completedLevels.sort((a, b) => a - b);
  }
  
  const nextLevel = Math.min(levelNumber + 1, TOTAL_LEVELS);
  progress.currentLevel = nextLevel;
  progress.lastUnlockedLevel = Math.max(progress.lastUnlockedLevel, nextLevel);
  
  saveProgress(progress);
  return progress;
}

export function skipToNextLevel(currentLevelNumber: number): ProgressData {
  const progress = loadProgress();
  
  const nextLevel = Math.min(currentLevelNumber + 1, TOTAL_LEVELS);
  progress.currentLevel = nextLevel;
  progress.lastUnlockedLevel = Math.max(progress.lastUnlockedLevel, nextLevel);
  
  saveProgress(progress);
  return progress;
}

export function resetProgressData(): void {
  localStorage.removeItem(STORAGE_KEYS.PROMISES_KEPT_PROGRESS);
}
