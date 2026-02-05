import { useState, useEffect } from 'react';
import { loadProgress, saveProgress, markLevelComplete, skipToNextLevel, resetProgressData, type ProgressData } from './progressStorage';
import { useActor } from '../../hooks/useActor';
import { type GameId } from '../constants';

export function useProgress(gameId: GameId) {
  const { actor } = useActor();
  const [progress, setProgress] = useState<ProgressData>(loadProgress(gameId));
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const loadInitialProgress = async () => {
      setIsLoading(true);
      try {
        if (actor) {
          const backendState = await actor.getLevelState(gameId);
          const backendProgress: ProgressData = {
            completedLevels: backendState.completedLevels.map(n => Number(n)),
            currentLevel: Number(backendState.lastUnlockedLevel),
            lastUnlockedLevel: Number(backendState.lastUnlockedLevel),
          };
          setProgress(backendProgress);
          saveProgress(gameId, backendProgress);
        } else {
          const localProgress = loadProgress(gameId);
          setProgress(localProgress);
        }
      } catch (error) {
        console.error('Failed to load progress:', error);
        const localProgress = loadProgress(gameId);
        setProgress(localProgress);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialProgress();
  }, [actor, gameId]);

  const completeLevel = async (levelNumber: number) => {
    setIsSyncing(true);
    try {
      const newProgress = markLevelComplete(gameId, levelNumber);
      setProgress(newProgress);

      if (actor) {
        try {
          await actor.saveCompletedLevel(gameId, BigInt(levelNumber));
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
      const newProgress = skipToNextLevel(gameId, levelNumber);
      setProgress(newProgress);

      if (actor) {
        try {
          await actor.unlockLevel(gameId, BigInt(newProgress.lastUnlockedLevel));
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
      resetProgressData(gameId);
      const defaultProgress = loadProgress(gameId);
      setProgress(defaultProgress);

      if (actor) {
        try {
          await actor.resetProgress(gameId);
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
