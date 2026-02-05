import React, { ComponentType } from 'react';
import Level001 from './impl/Level001';
import Level002 from './impl/Level002';
import Level003 from './impl/Level003';
import FixedPuzzleLevel from './impl/FixedPuzzleLevel';
import { getLevelConfig } from './impl/levelConfigs';

interface LevelProps {
  onWin: () => void;
  onLose: () => void;
}

export function getLevelComponent(levelNumber: number): ComponentType<LevelProps> {
  switch (levelNumber) {
    case 1:
      return Level001;
    case 2:
      return Level002;
    case 3:
      return Level003;
    default:
      // For levels 4-100, return a wrapper component that renders FixedPuzzleLevel as JSX
      const LevelWrapper = (props: LevelProps) => {
        const config = getLevelConfig(levelNumber);
        return React.createElement(FixedPuzzleLevel, { config, ...props });
      };
      return LevelWrapper;
  }
}
