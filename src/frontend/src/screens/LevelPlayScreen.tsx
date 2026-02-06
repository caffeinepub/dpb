import { useState, useEffect } from 'react';
import { Heart, Eye, EyeOff, SkipForward, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getLevelComponent } from '../game/levels/levelRegistry';
import { getPromisesKeptLevelComponent } from '../game/promisesKept/levels/levelRegistry';
import { getHintForLevel } from '../game/content/levelHints';
import { getPromisesKeptHint } from '../game/promisesKept/content/levelHints';
import { getLevelBackground } from '../game/ui/levelBackground';

interface LevelPlayScreenProps {
  levelNumber: number;
  gameEventId: 'event-1' | 'event-4';
  onWin: () => void;
  onLose: () => void;
  onSkip?: () => void;
  onBackToEvents?: () => void;
}

export default function LevelPlayScreen({ levelNumber, gameEventId, onWin, onLose, onSkip, onBackToEvents }: LevelPlayScreenProps) {
  const [key, setKey] = useState(0);
  const [showHint, setShowHint] = useState(false);
  
  const isPromisesKept = gameEventId === 'event-4';
  const hint = isPromisesKept ? getPromisesKeptHint(levelNumber) : getHintForLevel(levelNumber);
  const bgConfig = getLevelBackground(levelNumber);

  useEffect(() => {
    setKey((prev) => prev + 1);
    setShowHint(false);
  }, [levelNumber]);

  const LevelComponent = isPromisesKept 
    ? getPromisesKeptLevelComponent(levelNumber)
    : getLevelComponent(levelNumber);

  const gameTitle = isPromisesKept 
    ? '100 Promises I Kept'
    : 'DPB- THE WORLD OF LOVE FOR MY GIRL';

  const gameSubtitle = isPromisesKept
    ? 'A calm, emotional journey of love'
    : 'A journey of love and puzzles';

  // Light romantic theme for Event 4
  if (isPromisesKept) {
    return (
      <div 
        className="min-h-screen p-4 relative"
        style={{
          background: 'linear-gradient(135deg, oklch(0.95 0.03 350) 0%, oklch(0.92 0.04 10) 50%, oklch(0.94 0.03 30) 100%)',
        }}
      >
        {/* Soft romantic pattern overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'url(/assets/generated/romantic-pattern.dim_1024x1024.png)',
            backgroundSize: '400px 400px',
            backgroundRepeat: 'repeat',
            opacity: 0.06,
            mixBlendMode: 'multiply',
          }}
        />

        <div className="max-w-2xl mx-auto py-8 space-y-6 relative z-10">
          {/* Back to Events button */}
          {onBackToEvents && (
            <div className="mb-4">
              <Button
                onClick={onBackToEvents}
                variant="outline"
                className="flex items-center gap-2 bg-white/80 border-rose-300 text-rose-700 hover:bg-rose-50 backdrop-blur-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Events
              </Button>
            </div>
          )}

          <div className="text-center mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-rose-700 mb-1">
              {gameTitle}
            </h1>
            <p className="text-sm text-rose-600">{gameSubtitle}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-rose-600 fill-rose-600" />
              <span className="text-lg font-semibold text-rose-800">
                Level {levelNumber}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setShowHint(!showHint)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 border-rose-300 bg-white/80 text-rose-700 hover:bg-rose-50 backdrop-blur-sm"
              >
                {showHint ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showHint ? 'Hide Hint' : 'See Hint'}
              </Button>
              {levelNumber < 100 && onSkip && (
                <Button
                  onClick={onSkip}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 border-amber-400 bg-amber-50/80 text-amber-700 hover:bg-amber-100 backdrop-blur-sm"
                >
                  <SkipForward className="w-4 h-4" />
                  Skip
                </Button>
              )}
            </div>
          </div>

          {showHint && (
            <Card className="p-4 bg-amber-50/90 border-amber-300 animate-fade-in backdrop-blur-sm">
              <p className="text-sm text-amber-900">
                {hint}
              </p>
            </Card>
          )}

          <Card className="p-8 bg-white/90 backdrop-blur-md border-rose-200 shadow-romantic">
            <LevelComponent key={key} onWin={onWin} onLose={onLose} />
          </Card>
        </div>
      </div>
    );
  }

  // Brighter romantic theme for Event 1
  return (
    <div 
      className="min-h-screen p-4 relative"
      style={{
        background: bgConfig.gradient,
      }}
    >
      {/* Romantic pattern overlay with dynamic opacity */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/assets/generated/romantic-pattern.dim_1024x1024.png)',
          backgroundSize: '300px 300px',
          backgroundRepeat: 'repeat',
          opacity: 0.08,
          mixBlendMode: 'overlay',
        }}
      />
      
      {/* Light overlay for readability */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, oklch(0.98 0.01 350 / 0.3) 0%, transparent 100%)',
          opacity: bgConfig.overlayOpacity,
        }}
      />

      <div className="max-w-2xl mx-auto py-8 space-y-6 relative z-10">
        {/* Back to Events button */}
        {onBackToEvents && (
          <div className="mb-4">
            <Button
              onClick={onBackToEvents}
              variant="outline"
              className="flex items-center gap-2 bg-white/80 border-rose-300 text-rose-700 hover:bg-rose-50 backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Events
            </Button>
          </div>
        )}

        <div className="text-center mb-4">
          <h1 className="text-xl md:text-2xl font-bold text-rose-700 mb-1 drop-shadow-sm">
            {gameTitle}
          </h1>
          <p className="text-xs text-rose-600">{gameSubtitle}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-600 fill-rose-600" />
            <span className="text-lg font-semibold text-rose-800">
              Level {levelNumber}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setShowHint(!showHint)}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-rose-300 bg-white/80 text-rose-700 hover:bg-rose-50 backdrop-blur-sm"
            >
              {showHint ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showHint ? 'Hide Hint' : 'See Hint'}
            </Button>
            {levelNumber < 100 && onSkip && (
              <Button
                onClick={onSkip}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 border-amber-400 bg-amber-50/80 text-amber-700 hover:bg-amber-100 backdrop-blur-sm"
              >
                <SkipForward className="w-4 h-4" />
                Skip
              </Button>
            )}
          </div>
        </div>

        {showHint && (
          <Card className="p-4 bg-amber-50/90 border-amber-300 animate-fade-in backdrop-blur-sm">
            <p className="text-sm text-amber-900">
              {hint}
            </p>
          </Card>
        )}

        <Card className="p-8 bg-white/95 backdrop-blur-md border-rose-200 shadow-romantic">
          <LevelComponent key={key} onWin={onWin} onLose={onLose} />
        </Card>
      </div>
    </div>
  );
}
