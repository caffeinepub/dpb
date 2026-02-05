import { getEvent4LevelData } from '../../content/event4Levels';

export interface PromisesKeptLevelConfig {
  promise: string;
  emojiHint: string;
  scene: string;
  actionToWin: string;
  params: Record<string, unknown>;
}

export function getPromisesKeptLevelConfig(levelNumber: number): PromisesKeptLevelConfig {
  const levelData = getEvent4LevelData(levelNumber);
  
  if (!levelData) {
    return {
      promise: "Follow your heart",
      emojiHint: "❤️",
      scene: "A moment of love",
      actionToWin: "Tap the heart",
      params: { tapTarget: 'heart' }
    };
  }
  
  return {
    promise: levelData.promise,
    emojiHint: levelData.emojiHint,
    scene: levelData.scene,
    actionToWin: levelData.actionToWin,
    params: levelData.params
  };
}
