import { useState, useEffect } from 'react';
import { getLevelComponent } from '../game/levels/levelRegistry';
import { getLevelBackground } from '../game/ui/levelBackground';
import { Button } from '@/components/ui/button';
import { SkipForward } from 'lucide-react';
import { type GameId, GAME_IDS } from '../game/constants';

interface LevelPlayScreenProps {
  levelNumber: number;
  gameId?: GameId;
  onWin: () => void;
  onLose: () => void;
  onSkip: () => void;
}

export default function LevelPlayScreen({ levelNumber, gameId = GAME_IDS.DEFAULT, onWin, onLose, onSkip }: LevelPlayScreenProps) {
  const [isVisible, setIsVisible] = useState(false);
  const LevelComponent = getLevelComponent(levelNumber, gameId);
  const bgConfig = getLevelBackground(levelNumber, gameId);

  const isPromises100 = gameId === GAME_IDS.PROMISES_100;

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, [levelNumber]);

  // Disable skip on final level to prevent navigation issues
  const canSkip = levelNumber < 100;

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: bgConfig.gradient,
      }}
    >
      {/* Romantic pattern overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: 'url(/assets/generated/romantic-pattern.dim_1024x1024.png)',
          backgroundSize: '400px 400px',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Soft readability overlay (non-dark for both games) */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: isPromises100
            ? 'radial-gradient(ellipse at center, transparent 0%, oklch(0.92 0.02 330 / 0.2) 50%, oklch(0.88 0.03 340 / 0.4) 100%)'
            : 'radial-gradient(ellipse at center, transparent 0%, oklch(0.35 0.08 20 / 0.3) 50%, oklch(0.25 0.10 10 / 0.5) 100%)',
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header - Ensure high z-index and proper stacking */}
        <div className="relative z-50 p-4 flex items-center justify-between bg-gradient-to-b from-black/10 to-transparent">
          <div className={`font-semibold text-lg drop-shadow-lg ${isPromises100 ? 'text-pink-700' : 'text-orange-100'}`}>
            Level {levelNumber}
          </div>
          <Button
            onClick={onSkip}
            variant="ghost"
            size="sm"
            disabled={!canSkip}
            className={`${
              isPromises100 
                ? 'text-pink-600 hover:text-pink-700 hover:bg-pink-100/50' 
                : 'text-orange-200 hover:text-white hover:bg-orange-900/30'
            } disabled:opacity-30 disabled:cursor-not-allowed font-medium shadow-sm`}
            title={canSkip ? 'Skip this level' : 'Cannot skip final level'}
          >
            <SkipForward className="w-4 h-4 mr-1" />
            Skip
          </Button>
        </div>

        {/* Level Content */}
        <div 
          className={`flex-1 flex items-center justify-center p-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <LevelComponent onWin={onWin} onLose={onLose} />
        </div>
      </div>
    </div>
  );
}
