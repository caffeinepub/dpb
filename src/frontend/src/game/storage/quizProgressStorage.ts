import { STORAGE_KEYS } from '../constants';

export interface ProgressData {
  completedLevels: number[];
  currentLevel: number;
  lastUnlockedLevel: number;
}

export function loadProgress(): ProgressData {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.QUIZ_PROGRESS);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load quiz progress:', error);
  }
  return {
    completedLevels: [],
    currentLevel: 1,
    lastUnlockedLevel: 1,
  };
}

export function saveProgress(progress: ProgressData): void {
  try {
    localStorage.setItem(STORAGE_KEYS.QUIZ_PROGRESS, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save quiz progress:', error);
  }
}

export function markLevelComplete(levelNumber: number): ProgressData {
  const current = loadProgress();
  
  if (!current.completedLevels.includes(levelNumber)) {
    current.completedLevels.push(levelNumber);
  }
  
  if (levelNumber >= current.lastUnlockedLevel) {
    current.lastUnlockedLevel = levelNumber + 1;
    current.currentLevel = levelNumber + 1;
  }
  
  saveProgress(current);
  return current;
}

export function skipToNextLevel(levelNumber: number): ProgressData {
  const current = loadProgress();
  
  const nextLevel = levelNumber + 1;
  current.lastUnlockedLevel = nextLevel;
  current.currentLevel = nextLevel;
  
  saveProgress(current);
  return current;
}

export function resetProgressData(): void {
  const defaultProgress: ProgressData = {
    completedLevels: [],
    currentLevel: 1,
    lastUnlockedLevel: 1,
  };
  saveProgress(defaultProgress);
}
