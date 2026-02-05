import { useState, useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { type Promises100LevelConfig } from './levelConfigs';

interface Promises100LevelProps {
  config: Promises100LevelConfig;
  onWin: () => void;
  onLose: () => void;
}

export default function Promises100Level({ config, onWin, onLose }: Promises100LevelProps) {
  const [isComplete, setIsComplete] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [holdStart, setHoldStart] = useState<number | null>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [elementPosition, setElementPosition] = useState({ x: 0, y: 0 });
  const [waitTimer, setWaitTimer] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastTapRef = useRef<number>(0);

  useEffect(() => {
    // Auto-win solutions based on waiting
    if (['wait-quietly', 'ignore-angry', 'wait-tears-stop', 'dont-rush-timer', 'silence-wins',
         'stay-present', 'ignore-phone', 'dont-interrupt', 'wait-for-reply', 'quiet-support',
         'stay-steady', 'let-moment-pass', 'trust-no-proof', 'ignore-rumors', 'dont-check-phone',
         'wait-calmly', 'stay-confident', 'do-nothing', 'just-stay', 'breathe-together',
         'accept-silence', 'stay-strong', 'calm-storm', 'dont-break', 'ignore-temptation',
         'stay-loyal', 'keep-secret', 'hold-forever', 'peaceful-moment', 'no-instructions',
         'minimal-movement', 'perfect-patience', 'one-last-hold', 'final-screen'].includes(config.solution)) {
      const duration = (config.data?.duration as number) || 2500;
      timerRef.current = setInterval(() => {
        setWaitTimer(prev => {
          if (prev >= duration) {
            if (!isComplete) {
              setIsComplete(true);
              onWin();
            }
            return prev;
          }
          return prev + 100;
        });
      }, 100);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [config.solution, config.data, isComplete, onWin]);

  const handleTap = () => {
    const now = Date.now();
    const timeSinceLastTap = now - lastTapRef.current;
    lastTapRef.current = now;

    if (config.solution === 'slow-tap' && timeSinceLastTap < 500) {
      onLose();
      return;
    }

    if (['one-gentle-tap', 'choose-happy-emoji', 'pick-soft-words', 'choose-hug',
         'choose-patience', 'comfort-not-solve', 'heart-over-logic', 'accept-mistake',
         'say-sorry', 'gentle-smile', 'try-again', 'one-correct-action', 'dont-overdo',
         'balance-emotions', 'remove-jealousy', 'promise-fulfilled', 'give-space',
         'believe-words', 'choose-honesty', 'let-go-fear', 'trust-wins', 'stay-kind',
         'still-together', 'choose-forever', 'focus-one', 'promise-again', 'protect-bond',
         'choose-us', 'be-honest', 'stand-together', 'create-memory', 'save-photo',
         'frame-moment', 'stay-warm', 'soft-touch', 'gentle-care', 'love-safe',
         'use-instinct', 'one-calm-action', 'final-promise', 'everything-learned',
         'quiet-happiness'].includes(config.solution)) {
      setIsComplete(true);
      onWin();
    } else if (config.solution === 'tap-blinking-heart') {
      setTapCount(prev => prev + 1);
      if (tapCount >= 0) {
        setIsComplete(true);
        onWin();
      }
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setHoldStart(Date.now());
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStart && ['drag-smile-up', 'drag-blanket-down', 'block-stone', 'share-umbrella',
                      'block-rain', 'fix-cup', 'give-water', 'close-window', 'sit-together',
                      'light-candle', 'clean-room'].includes(config.solution)) {
      const deltaY = e.clientY - dragStart.y;
      setElementPosition({ x: 0, y: deltaY });
      
      if ((config.solution === 'drag-smile-up' && deltaY < -50) ||
          (config.solution === 'drag-blanket-down' && deltaY > 50) ||
          (config.solution === 'block-stone' && Math.abs(deltaY) > 30)) {
        setIsComplete(true);
        onWin();
      }
    }
  };

  const handlePointerUp = () => {
    if (holdStart && ['long-press-hands', 'hold-screen-calm', 'hold-shaking-heart',
                      'hold-softly', 'smile-slowly', 'hold-forever'].includes(config.solution)) {
      const holdDuration = Date.now() - holdStart;
      const requiredDuration = (config.data?.duration as number) || 2000;
      if (holdDuration >= requiredDuration) {
        setIsComplete(true);
        onWin();
      } else {
        onLose();
      }
    }
    setHoldStart(null);
    setDragStart(null);
  };

  const handleRub = () => {
    if (config.solution === 'warm-hands') {
      setTapCount(prev => {
        const newCount = prev + 1;
        if (newCount >= ((config.data?.count as number) || 5)) {
          setIsComplete(true);
          onWin();
        }
        return newCount;
      });
    }
  };

  const renderPuzzle = () => {
    const progress = waitTimer / ((config.data?.duration as number) || 2500);

    return (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Waiting-based puzzles */}
        {['wait-quietly', 'ignore-angry', 'wait-tears-stop', 'dont-rush-timer', 'silence-wins',
          'stay-present', 'ignore-phone', 'dont-interrupt', 'wait-for-reply', 'quiet-support',
          'stay-steady', 'let-moment-pass', 'trust-no-proof', 'ignore-rumors', 'dont-check-phone',
          'wait-calmly', 'stay-confident', 'do-nothing', 'just-stay', 'breathe-together',
          'accept-silence', 'stay-strong', 'calm-storm', 'dont-break', 'ignore-temptation',
          'stay-loyal', 'keep-secret', 'hold-forever', 'peaceful-moment', 'no-instructions',
          'minimal-movement', 'perfect-patience', 'one-last-hold', 'final-screen'].includes(config.solution) && (
          <div className="text-center space-y-6">
            <div className="text-6xl animate-pulse">🕊️</div>
            <div className="w-48 h-2 bg-pink-200/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-pink-400 to-rose-400 transition-all duration-100"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <p className="text-pink-200 text-sm">Be patient...</p>
          </div>
        )}

        {/* Tap-based puzzles */}
        {['one-gentle-tap', 'slow-tap', 'choose-happy-emoji', 'pick-soft-words', 'choose-hug',
          'tap-blinking-heart', 'choose-patience', 'comfort-not-solve', 'heart-over-logic',
          'accept-mistake', 'say-sorry', 'gentle-smile', 'try-again', 'one-correct-action',
          'dont-overdo', 'balance-emotions', 'remove-jealousy', 'promise-fulfilled'].includes(config.solution) && (
          <div 
            className="text-center space-y-4 cursor-pointer"
            onClick={handleTap}
          >
            <Heart className={`w-24 h-24 mx-auto text-pink-400 fill-pink-400 ${config.solution === 'tap-blinking-heart' ? 'animate-pulse' : ''}`} />
            <p className="text-pink-200">Tap gently</p>
          </div>
        )}

        {/* Hold-based puzzles */}
        {['long-press-hands', 'hold-screen-calm', 'hold-shaking-heart', 'hold-softly',
          'smile-slowly'].includes(config.solution) && (
          <div 
            className="text-center space-y-4"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
          >
            <div className="text-7xl">🤝</div>
            <p className="text-pink-200">Hold gently</p>
            {holdStart && (
              <div className="w-48 h-2 bg-pink-200/30 rounded-full overflow-hidden mx-auto">
                <div 
                  className="h-full bg-gradient-to-r from-pink-400 to-rose-400 transition-all"
                  style={{ width: `${Math.min(((Date.now() - holdStart) / ((config.data?.duration as number) || 2000)) * 100, 100)}%` }}
                />
              </div>
            )}
          </div>
        )}

        {/* Drag-based puzzles */}
        {['drag-smile-up', 'drag-blanket-down', 'block-stone', 'share-umbrella', 'block-rain',
          'fix-cup', 'give-water', 'close-window', 'sit-together', 'light-candle', 'clean-room'].includes(config.solution) && (
          <div 
            className="text-center space-y-4 cursor-move"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            style={{ transform: `translate(${elementPosition.x}px, ${elementPosition.y}px)` }}
          >
            <div className="text-7xl">
              {config.solution === 'drag-smile-up' && '😔'}
              {config.solution === 'drag-blanket-down' && '🛌'}
              {config.solution === 'block-stone' && '🪨'}
              {config.solution === 'share-umbrella' && '☔'}
              {config.solution === 'block-rain' && '🌧️'}
              {config.solution === 'fix-cup' && '☕'}
              {config.solution === 'give-water' && '💧'}
              {config.solution === 'close-window' && '🪟'}
              {config.solution === 'sit-together' && '🛋️'}
              {config.solution === 'light-candle' && '🕯️'}
              {config.solution === 'clean-room' && '🧹'}
            </div>
            <p className="text-pink-200">Drag gently</p>
          </div>
        )}

        {/* Rub-based puzzles */}
        {config.solution === 'warm-hands' && (
          <div 
            className="text-center space-y-4 cursor-pointer"
            onClick={handleRub}
          >
            <div className="text-7xl">🔥✋</div>
            <p className="text-pink-200">Rub to warm ({tapCount}/{(config.data?.count as number) || 5})</p>
          </div>
        )}

        {/* Exit prevention puzzle */}
        {config.solution === 'do-not-exit' && (
          <div className="text-center space-y-4">
            <div className="text-7xl">🚪</div>
            <p className="text-pink-200">Don't leave... just wait</p>
            <div className="w-48 h-2 bg-pink-200/30 rounded-full overflow-hidden mx-auto">
              <div 
                className="h-full bg-gradient-to-r from-pink-400 to-rose-400 transition-all duration-100"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Other simple tap solutions */}
        {['give-space', 'believe-words', 'choose-honesty', 'let-go-fear', 'trust-wins',
          'stay-kind', 'still-together', 'choose-forever', 'focus-one', 'promise-again',
          'protect-bond', 'choose-us', 'be-honest', 'stand-together', 'create-memory',
          'save-photo', 'frame-moment', 'stay-warm', 'soft-touch', 'gentle-care',
          'love-safe', 'use-instinct', 'one-calm-action', 'final-promise',
          'everything-learned', 'quiet-happiness'].includes(config.solution) && (
          <div 
            className="text-center space-y-4 cursor-pointer"
            onClick={handleTap}
          >
            <Heart className="w-24 h-24 mx-auto text-pink-400 fill-pink-400" />
            <p className="text-pink-200">Tap with love</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gradient-to-br from-pink-50/95 to-rose-50/95 backdrop-blur-md border-pink-200 shadow-2xl p-8">
        <div className="space-y-6">
          {config.instruction && (
            <h2 className="text-2xl font-serif text-center text-gray-800">
              {config.instruction}
            </h2>
          )}
          <div className="min-h-[300px]">
            {renderPuzzle()}
          </div>
        </div>
      </Card>
    </div>
  );
}
