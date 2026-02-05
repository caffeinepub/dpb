import { useState, useEffect } from 'react';
import { loadProgress, saveProgress, markLevelComplete, skipToNextLevel, resetProgressData, type ProgressData } from './quizProgressStorage';
import { useActor } from '../../hooks/useActor';

export function useQuizProgress() {
  const { actor } = useActor();
  const [progress, setProgress] = useState<ProgressData>(loadProgress());
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const loadInitialProgress = async () => {
      setIsLoading(true);
      try {
        if (actor) {
          const backendState = await actor.getQuizLevelState();
          const lastUnlocked = Math.min(Math.max(Number(backendState.lastUnlockedLevel), 1), 10);
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
            currentLevel: Math.min(Math.max(localProgress.currentLevel, 1), 10),
            lastUnlockedLevel: Math.min(Math.max(localProgress.lastUnlockedLevel, 1), 10),
          };
          setProgress(clampedProgress);
        }
      } catch (error) {
        console.error('Failed to load quiz progress:', error);
        const localProgress = loadProgress();
        const clampedProgress = {
          ...localProgress,
          currentLevel: Math.min(Math.max(localProgress.currentLevel, 1), 10),
          lastUnlockedLevel: Math.min(Math.max(localProgress.lastUnlockedLevel, 1), 10),
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
          await actor.saveQuizLevelCompleted(BigInt(levelNumber));
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
          await actor.unlockQuizLevel(BigInt(newProgress.lastUnlockedLevel));
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
          await actor.resetQuizProgress();
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
    return levelNumber <= progress.lastUnlockedLevel;
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
