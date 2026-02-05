import { useState, useEffect } from 'react';
import { loadProgress, saveProgress, markLevelComplete, skipToNextLevel, resetProgressData, type ProgressData } from './promisesKeptProgressStorage';
import { useActor } from '../../hooks/useActor';

export function usePromisesKeptProgress() {
  const { actor } = useActor();
  const [progress, setProgress] = useState<ProgressData>(loadProgress());
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const loadInitialProgress = async () => {
      setIsLoading(true);
      try {
        if (actor) {
          const backendState = await actor.getPromisesKeptLevelState();
          const lastUnlocked = Math.min(Math.max(Number(backendState.lastUnlockedLevel), 1), 100);
          const backendProgress: ProgressData = {
            completedLevels: backendState.completedLevels.map(n => Number(n)),
            currentLevel: lastUnlocked,
            lastUnlockedLevel: lastUnlocked,
          };
          setProgress(backendProgress);
          saveProgress(backendProgress);
        } else {
          const localProgress = loadProgress();
          const clampedProgress = {
            ...localProgress,
            currentLevel: Math.min(Math.max(localProgress.currentLevel, 1), 100),
            lastUnlockedLevel: Math.min(Math.max(localProgress.lastUnlockedLevel, 1), 100),
          };
          setProgress(clampedProgress);
        }
      } catch (error) {
        console.error('Failed to load promises kept progress:', error);
        const localProgress = loadProgress();
        const clampedProgress = {
          ...localProgress,
          currentLevel: Math.min(Math.max(localProgress.currentLevel, 1), 100),
          lastUnlockedLevel: Math.min(Math.max(localProgress.lastUnlockedLevel, 1), 100),
        };
        setProgress(clampedProgress);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialProgress();
  }, [actor]);

  const completeLevel = async (levelNumber: number) => {
    setIsSyncing(true);
    try {
      const newProgress = markLevelComplete(levelNumber);
      setProgress(newProgress);

      if (actor) {
        try {
          await actor.savePromisesKeptLevelCompleted(BigInt(levelNumber));
        } catch (error) {
          console.error('Failed to sync with backend:', error);
        }
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const skipLevel = async (levelNumber: number) => {
    setIsSyncing(true);
    try {
      const newProgress = skipToNextLevel(levelNumber);
      setProgress(newProgress);

      if (actor) {
        try {
          await actor.unlockPromisesKeptLevel(BigInt(newProgress.lastUnlockedLevel));
        } catch (error) {
          console.error('Failed to sync skip with backend:', error);
        }
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const resetProgress = async () => {
    setIsSyncing(true);
    try {
      resetProgressData();
      const defaultProgress = loadProgress();
      setProgress(defaultProgress);

      if (actor) {
        try {
          await actor.resetPromisesKeptProgress();
        } catch (error) {
          console.error('Failed to reset backend progress:', error);
        }
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const isLevelCompleted = (levelNumber: number): boolean => {
    return progress.completedLevels.includes(levelNumber);
  };

  const isLevelUnlocked = (levelNumber: number): boolean => {
    // Level is unlocked if:
    // 1. It's level 1 (always unlocked)
    // 2. It's within the lastUnlockedLevel range
    // 3. The previous level has been completed
    if (levelNumber === 1) return true;
    if (levelNumber > progress.lastUnlockedLevel) return false;
    
    // Additional check: previous level must be completed
    const previousLevelCompleted = progress.completedLevels.includes(levelNumber - 1);
    return levelNumber <= progress.lastUnlockedLevel && (levelNumber === progress.lastUnlockedLevel || previousLevelCompleted);
  };

  return {
    currentLevel: progress.currentLevel,
    completedLevels: progress.completedLevels,
    lastUnlockedLevel: progress.lastUnlockedLevel,
    isLoading,
    isSyncing,
    completeLevel,
    skipLevel,
    resetProgress,
    isLevelCompleted,
    isUnlocked: isLevelUnlocked,
  };
}
