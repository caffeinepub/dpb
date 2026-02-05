import React, { ComponentType } from 'react';
import Level001 from './impl/Level001';
import Level002 from './impl/Level002';
import Level003 from './impl/Level003';
import FixedPuzzleLevel from './impl/FixedPuzzleLevel';
import { getLevelConfig } from './impl/levelConfigs';
import { getPromises100LevelConfig } from '../promises100/levels/levelConfigs';
import Promises100Level from '../promises100/levels/Promises100Level';
import { type GameId, GAME_IDS } from '../constants';

interface LevelProps {
  onWin: () => void;
  onLose: () => void;
}

export function getLevelComponent(levelNumber: number, gameId: GameId = GAME_IDS.DEFAULT): ComponentType<LevelProps> {
  // Route to Promises 100 game levels
  if (gameId === GAME_IDS.PROMISES_100) {
    const LevelWrapper = (props: LevelProps) => {
      const config = getPromises100LevelConfig(levelNumber);
      return React.createElement(Promises100Level, { config, ...props });
    };
    return LevelWrapper;
  }

  // Default game levels
  switch (levelNumber) {
    case 1:
      return Level001;
    case 2:
      return Level002;
    case 3:
      return Level003;
    default:
      const LevelWrapper = (props: LevelProps) => {
        const config = getLevelConfig(levelNumber);
        return React.createElement(FixedPuzzleLevel, { config, ...props });
      };
      return LevelWrapper;
  }
}
