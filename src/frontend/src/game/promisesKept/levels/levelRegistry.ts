import React, { ComponentType } from 'react';
import PromisesKeptPuzzleLevel from './impl/PromisesKeptPuzzleLevel';
import { getPromisesKeptLevelConfig } from './impl/levelConfigs';

interface LevelProps {
  onWin: () => void;
  onLose: () => void;
}

export function getPromisesKeptLevelComponent(levelNumber: number): ComponentType<LevelProps> {
  // All levels use the same puzzle component with different configs
  const LevelWrapper = (props: LevelProps) => {
    const config = getPromisesKeptLevelConfig(levelNumber);
    return React.createElement(PromisesKeptPuzzleLevel, { config, ...props });
  };
  return LevelWrapper;
}
