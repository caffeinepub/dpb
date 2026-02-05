import { useState, useEffect } from 'react';
import { loadProgress, saveProgress, markLevelComplete, skipToNextLevel, resetProgressData, type ProgressData } from './progressStorage';
import { useActor } from '../../hooks/useActor';

export function useProgress() {
  const { actor } = useActor();
  const [progress, setProgress] = useState<ProgressData>(loadProgress());
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const loadInitialProgress = async () => {
      setIsLoading(true);
      try {
        if (actor) {
          const backendState = await actor.getLevelState();
          const backendProgress: ProgressData = {
            completedLevels: backendState.completedLevels.map(n => Number(n)),
            currentLevel: Number(backendState.lastUnlockedLevel),
            lastUnlockedLevel: Number(backendState.lastUnlockedLevel),
          };
          setProgress(backendProgress);
          saveProgress(backendProgress);
        } else {
          const localProgress = loadProgress();
          setProgress(localProgress);
        }
      } catch (error) {
        console.error('Failed to load progress:', error);
        const localProgress = loadProgress();
        setProgress(localProgress);
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
          await actor.saveCompletedLevel(BigInt(levelNumber));
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
          await actor.unlockLevel(BigInt(newProgress.lastUnlockedLevel));
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
          await actor.resetProgress();
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
