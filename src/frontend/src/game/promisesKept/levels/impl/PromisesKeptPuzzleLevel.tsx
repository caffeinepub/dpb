import { useState, useEffect, useRef, useCallback } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { PromisesKeptLevelConfig } from './levelConfigs';

interface PromisesKeptPuzzleLevelProps {
  config: PromisesKeptLevelConfig;
  onWin: () => void;
  onLose: () => void;
}

export default function PromisesKeptPuzzleLevel({ config, onWin }: PromisesKeptPuzzleLevelProps) {
  const [hasWon, setHasWon] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [showYesButton, setShowYesButton] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [opacity, setOpacity] = useState(1);
  const [heartFillPercent, setHeartFillPercent] = useState(0);
  const [timerValue, setTimerValue] = useState(5);
  const [restartCount, setRestartCount] = useState(0);
  const [flashCount, setFlashCount] = useState(0);
  const [occurrenceCount, setOccurrenceCount] = useState(0);
  const [glowIntensity, setGlowIntensity] = useState(1);
  const [breathingScale, setBreathingScale] = useState(1);
  const [showHintText, setShowHintText] = useState(true);
  const [soundPlayed, setSoundPlayed] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [heartScale, setHeartScale] = useState(1);
  
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const waitTimerRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastTapTimeRef = useRef<number>(0);
  const holdStartTimeRef = useRef<number>(0);

  const params = config.params;

  // Auto-win for wait-based levels
  useEffect(() => {
    if (params.doNothing && params.waitDuration) {
      waitTimerRef.current = setTimeout(() => {
        setHasWon(true);
      }, params.waitDuration as number);
    }

    // Level 2: Show YES button after 5 seconds
    if (params.waitDuration === 5000 && !params.doNothing) {
      waitTimerRef.current = setTimeout(() => {
        setShowYesButton(true);
      }, 5000);
    }

    // Level 7, 17, 87, 97: Countdown timer
    if (params.doNothing && [5000].includes(params.waitDuration as number)) {
      let count = 5;
      const interval = setInterval(() => {
        count--;
        setCountdown(count);
        if (count <= 0) {
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }

    // Level 23: Heart filling animation
    if (params.waitUntilFilled) {
      let percent = 0;
      const interval = setInterval(() => {
        percent += 2;
        setHeartFillPercent(percent);
        if (percent >= 100) {
          clearInterval(interval);
        }
      }, 60);
      return () => clearInterval(interval);
    }

    // Level 38: Timer restarting
    if (params.restartCount) {
      let restarts = 0;
      let timer = 3;
      const interval = setInterval(() => {
        timer--;
        setTimerValue(timer);
        if (timer <= 0) {
          restarts++;
          setRestartCount(restarts);
          timer = 3;
          if (restarts >= (params.restartCount as number)) {
            clearInterval(interval);
            setTimeout(() => setHasWon(true), 500);
          }
        }
      }, 1000);
      return () => clearInterval(interval);
    }

    // Level 28: Button flashing
    if (params.nthOccurrence === 2 && params.tapTarget === 'button-second-flash') {
      let flashes = 0;
      const interval = setInterval(() => {
        flashes++;
        setFlashCount(flashes);
      }, 1500);
      return () => clearInterval(interval);
    }

    // Level 50: Button fading
    if (params.tapTarget === 'center' && config.promise === "I act at the right moment.") {
      let op = 1;
      const interval = setInterval(() => {
        op -= 0.02;
        setOpacity(Math.max(0.1, op));
      }, 100);
      return () => clearInterval(interval);
    }

    // Level 61: Hint text disappears
    if (params.tapTarget === 'after-hint-disappears') {
      setTimeout(() => {
        setShowHintText(false);
      }, 3000);
    }

    // Level 67: Buttons fade then return
    if (params.chooseOption === 'correct-button-after-return') {
      setTimeout(() => {
        setButtonsVisible(false);
      }, 1000);
      setTimeout(() => {
        setButtonsVisible(true);
      }, 3000);
    }

    // Level 68: Sound plays after delay
    if (params.tapTarget === 'after-sound') {
      setTimeout(() => {
        setSoundPlayed(true);
      }, 2000);
    }

    // Level 76: Glow fading in and out
    if (params.tapAtDimmest) {
      let intensity = 1;
      let direction = -1;
      const interval = setInterval(() => {
        intensity += direction * 0.05;
        if (intensity <= 0.2) direction = 1;
        if (intensity >= 1) direction = -1;
        setGlowIntensity(intensity);
      }, 100);
      return () => clearInterval(interval);
    }

    // Level 79: Breathing animation
    if (params.tapWhenExpanded) {
      let scale = 1;
      let direction = 1;
      const interval = setInterval(() => {
        scale += direction * 0.02;
        if (scale >= 1.3) direction = -1;
        if (scale <= 1) direction = 1;
        setBreathingScale(scale);
      }, 50);
      return () => clearInterval(interval);
    }

    // Level 75: Heart enlarging on hold
    if (params.longPressToEnlarge) {
      // Handled in hold logic
    }

    return () => {
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
      if (waitTimerRef.current) clearTimeout(waitTimerRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [config, params]);

  useEffect(() => {
    if (hasWon) {
      onWin();
    }
  }, [hasWon, onWin]);

  const handleTap = useCallback((target?: string) => {
    const now = Date.now();
    
    // Double-tap detection (Level 40)
    if (params.doubleTapBottomRight) {
      if (now - lastTapTimeRef.current < 500) {
        setHasWon(true);
      }
      lastTapTimeRef.current = now;
      return;
    }

    // Level-specific tap logic
    if (params.tapTarget === 'heart' && params.waitDuration === 3000) {
      // Level 1: Wait 3 seconds then tap
      if (now > 3000) {
        setHasWon(true);
      }
    } else if (params.tapTarget === 'text') {
      // Level 6: Tap the text
      if (target === 'text') {
        setHasWon(true);
      }
    } else if (params.tapTarget === 'background') {
      // Level 11, 41: Tap background not button
      if (target === 'background') {
        setHasWon(true);
      }
    } else if (params.tapTarget === 'fading-heart') {
      // Level 8: Tap fading heart
      setHasWon(true);
    } else if (params.tapTarget === 'smallest-heart') {
      // Level 13: Tap smallest heart
      if (target === 'smallest') {
        setHasWon(true);
      }
    } else if (params.tapTarget === 'center' && params.waitDuration === 2000) {
      // Level 16: Tap slowly (after 2 seconds)
      if (now > 2000) {
        setHasWon(true);
      }
    } else if (params.tapTarget === 'edge-left') {
      // Level 45, 53: Tap edge
      if (target === 'edge') {
        setHasWon(true);
      }
    } else if (params.tapTarget === 'button-second') {
      // Level 48: Tap second button after 2 seconds
      if (now > 2000 && target === 'button2') {
        setHasWon(true);
      }
    } else if (params.tapTarget === 'hidden-corner-heart') {
      // Level 35: Tap hidden heart
      if (target === 'corner') {
        setHasWon(true);
      }
    } else if (params.tapTarget === 'calm-emoji') {
      // Level 37: Tap calm emoji when stopped
      setHasWon(true);
    } else if (params.tapTarget === 'dull-heart') {
      // Level 66: Tap dull heart
      if (target === 'dull') {
        setHasWon(true);
      }
    } else if (params.tapTarget === 'bottom-left-edge') {
      // Level 88, 98: Tap bottom-left edge
      if (target === 'bottom-left') {
        setHasWon(true);
      }
    } else if (params.tapTarget === 'behind-text') {
      // Level 83, 93: Tap behind text
      if (target === 'behind') {
        setHasWon(true);
      }
    } else if (params.tapTarget === 'center' && !params.waitDuration) {
      // Generic center tap
      setHasWon(true);
    } else if (params.tapTarget === 'after-hint-disappears' && !showHintText) {
      // Level 61: Tap after hint disappears
      setHasWon(true);
    } else if (params.tapTarget === 'after-sound' && soundPlayed) {
      // Level 68: Tap after sound
      setHasWon(true);
    } else if (params.chooseOption === 'hug') {
      // Level 32: Choose hug
      if (target === 'hug') {
        setHasWon(true);
      }
    } else if (params.nthOccurrence) {
      // Nth occurrence levels
      const newCount = occurrenceCount + 1;
      setOccurrenceCount(newCount);
      if (newCount >= (params.nthOccurrence as number)) {
        setHasWon(true);
      }
    } else if (params.tapBetweenBeats) {
      // Level 39, 54: Tap between beats (simplified)
      setHasWon(true);
    } else if (params.tapAtDimmest && glowIntensity < 0.3) {
      // Level 76: Tap at dimmest
      setHasWon(true);
    } else if (params.tapWhenExpanded && breathingScale > 1.25) {
      // Level 79: Tap when expanded
      setHasWon(true);
    } else if (params.tapTarget === 'heart-instant') {
      // Level 85, 95: Instant tap
      setHasWon(true);
    } else if (params.tapTarget === 'center-when-stop') {
      // Level 86, 96: Tap center when distractions stop
      setHasWon(true);
    } else if (params.tapLastTear) {
      // Level 22, 59: Tap last tear
      const newCount = tapCount + 1;
      setTapCount(newCount);
      if (newCount >= 3) {
        setHasWon(true);
      }
    } else if (params.tapMuteWait) {
      // Level 30: Tap mute then wait
      if (tapCount === 0) {
        setTapCount(1);
        setTimeout(() => setHasWon(true), 2000);
      }
    }
  }, [params, tapCount, occurrenceCount, showHintText, soundPlayed, glowIntensity, breathingScale]);

  const handleHoldStart = useCallback(() => {
    setIsHolding(true);
    holdStartTimeRef.current = Date.now();
    
    const duration = (params.holdDuration as number) || 2000;
    
    holdTimerRef.current = setTimeout(() => {
      setHasWon(true);
    }, duration);

    // Level 75: Enlarge heart on hold
    if (params.longPressToEnlarge) {
      const interval = setInterval(() => {
        setHeartScale(prev => Math.min(prev + 0.05, 2));
      }, 50);
      if (holdTimerRef.current) {
        const originalTimer = holdTimerRef.current;
        holdTimerRef.current = setTimeout(() => {
          clearInterval(interval);
          setHasWon(true);
        }, duration);
      }
    }
  }, [params]);

  const handleHoldEnd = useCallback(() => {
    setIsHolding(false);
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    setHeartScale(1);
  }, []);

  const handleDrag = useCallback(() => {
    if (params.dragTarget) {
      setHasWon(true);
    }
  }, [params]);

  const renderPuzzle = () => {
    const { promise, emojiHint } = config;

    // Level 2: YES/NO buttons
    if (params.waitDuration === 5000 && !params.doNothing) {
      return (
        <div className="space-y-6 text-center">
          <div className="text-5xl mb-4">{emojiHint}</div>
          <p className="text-rose-800 text-lg font-medium mb-6">{promise}</p>
          <div className="flex gap-4 justify-center">
            <Button
              disabled={!showYesButton}
              onClick={() => setHasWon(true)}
              className="px-8 py-6 text-lg bg-rose-500 hover:bg-rose-600 disabled:opacity-30"
            >
              YES
            </Button>
            <Button
              disabled
              className="px-8 py-6 text-lg bg-gray-400 opacity-30"
            >
              NO
            </Button>
          </div>
        </div>
      );
    }

    // Level 3: Follow emoji
    if (params.followWithFinger) {
      return (
        <div className="space-y-6 text-center">
          <div className="text-5xl mb-4">{emojiHint}</div>
          <p className="text-rose-800 text-lg font-medium mb-6">{promise}</p>
          <div className="text-6xl animate-pulse">🥺</div>
          <p className="text-rose-600 text-sm">Follow with your finger, don't tap</p>
          <Button onClick={() => setHasWon(true)} className="mt-8 bg-rose-500 hover:bg-rose-600">
            Continue
          </Button>
        </div>
      );
    }

    // Level 6: Tap the text
    if (params.tapTarget === 'text') {
      return (
        <div className="space-y-6 text-center">
          <div className="text-5xl mb-4">{emojiHint}</div>
          <p className="text-rose-800 text-lg font-medium mb-6">{promise}</p>
          <div 
            onClick={() => handleTap('text')}
            className="text-2xl text-rose-600 cursor-pointer hover:text-rose-700 transition-colors p-4 border-2 border-dashed border-rose-300 rounded-lg"
          >
            Tap anywhere
          </div>
        </div>
      );
    }

    // Level 7, 17, 87, 97: Countdown
    if (params.doNothing && [5000].includes(params.waitDuration as number)) {
      return (
        <div className="space-y-6 text-center">
          <div className="text-5xl mb-4">{emojiHint}</div>
          <p className="text-rose-800 text-lg font-medium mb-6">{promise}</p>
          <div className="text-7xl font-bold text-rose-600">{countdown}</div>
          <p className="text-rose-600 text-sm">Wait patiently...</p>
        </div>
      );
    }

    // Level 8: Fading heart
    if (params.tapTarget === 'fading-heart') {
      return (
        <div className="space-y-6 text-center">
          <div className="text-5xl mb-4">{emojiHint}</div>
          <p className="text-rose-800 text-lg font-medium mb-6">{promise}</p>
          <div className="flex gap-8 justify-center">
            <div className="text-6xl">❤️</div>
            <div 
              onClick={() => handleTap()}
              className="text-6xl opacity-50 cursor-pointer hover:opacity-70 transition-opacity"
            >
              💖
            </div>
          </div>
        </div>
      );
    }

    // Level 9: Drag umbrella
    if (params.dragTarget === 'umbrella') {
      return (
        <div className="space-y-6 text-center">
          <div className="text-5xl mb-4">{emojiHint}</div>
          <p className="text-rose-800 text-lg font-medium mb-6">{promise}</p>
          <div 
            draggable
            onDragEnd={handleDrag}
            onTouchEnd={handleDrag}
            className="text-6xl cursor-move"
          >
            ☂️
          </div>
          <div className="text-4xl mt-8">❤️</div>
          <p className="text-rose-600 text-sm">Drag umbrella to protect</p>
        </div>
      );
    }

    // Level 11, 41: Tap background not button
    if (params.tapTarget === 'background') {
      return (
        <div 
          onClick={() => handleTap('background')}
          className="space-y-6 text-center cursor-pointer min-h-[400px] flex flex-col items-center justify-center"
        >
          <div className="text-5xl mb-4">{emojiHint}</div>
          <p className="text-rose-800 text-lg font-medium mb-6">{promise}</p>
          <Button
            onClick={(e) => { e.stopPropagation(); }}
            className="px-8 py-6 text-lg bg-rose-500 hover:bg-rose-600 animate-pulse pointer-events-auto"
          >
            {config.promise.includes("mistakes") ? "RETRY" : "START"}
          </Button>
          <p className="text-rose-600 text-sm mt-4">Think carefully...</p>
        </div>
      );
    }

    // Level 13: Many hearts
    if (params.tapTarget === 'smallest-heart') {
      return (
        <div className="space-y-6 text-center">
          <div className="text-5xl mb-4">{emojiHint}</div>
          <p className="text-rose-800 text-lg font-medium mb-6">{promise}</p>
          <div className="flex gap-4 justify-center items-center flex-wrap">
            <div className="text-6xl">❤️</div>
            <div className="text-5xl">💖</div>
            <div 
              onClick={() => handleTap('smallest')}
              className="text-3xl cursor-pointer hover:scale-110 transition-transform"
            >
              💕
            </div>
            <div className="text-7xl">💗</div>
            <div className="text-5xl">💓</div>
          </div>
        </div>
      );
    }

    // Level 14, 44: Drag text off
    if (params.dragTarget === 'text-off') {
      return (
        <div className="space-y-6 text-center">
          <div className="text-5xl mb-4">{emojiHint}</div>
          <p className="text-rose-800 text-lg font-medium mb-6">{promise}</p>
          <div 
            draggable
            onDragEnd={handleDrag}
            onTouchEnd={handleDrag}
            className="text-2xl text-rose-600 cursor-move inline-block p-4 border-2 border-rose-300 rounded-lg"
          >
            {config.promise.includes("beyond") ? "Instruction Text" : "Floating Text"}
          </div>
          <p className="text-rose-600 text-sm mt-4">Drag it away...</p>
        </div>
      );
    }

    // Level 23: Heart filling
    if (params.waitUntilFilled) {
      return (
        <div className="space-y-6 text-center">
          <div className="text-5xl mb-4">{emojiHint}</div>
          <p className="text-rose-800 text-lg font-medium mb-6">{promise}</p>
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 text-6xl opacity-20">❤️</div>
            <div 
              className="absolute inset-0 text-6xl overflow-hidden"
              style={{ height: `${heartFillPercent}%`, bottom: 0, top: 'auto' }}
            >
              ❤️
            </div>
          </div>
          <p className="text-rose-600 text-sm">{heartFillPercent}% filled</p>
          {heartFillPercent >= 100 && (
            <Button onClick={() => handleTap()} className="bg-rose-500 hover:bg-rose-600">
              Tap Heart
            </Button>
          )}
        </div>
      );
    }

    // Level 32: Choose hug
    if (params.chooseOption === 'hug') {
      return (
        <div className="space-y-6 text-center">
          <div className="text-5xl mb-4">{emojiHint}</div>
          <p className="text-rose-800 text-lg font-medium mb-6">{promise}</p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => handleTap('gift')}
              className="px-8 py-6 text-4xl bg-amber-500 hover:bg-amber-600"
            >
              🎁
            </Button>
            <Button
              onClick={() => handleTap('hug')}
              className="px-8 py-6 text-4xl bg-rose-500 hover:bg-rose-600"
            >
              🤗
            </Button>
          </div>
        </div>
      );
    }

    // Level 38: Timer restarting
    if (params.restartCount) {
      return (
        <div className="space-y-6 text-center">
          <div className="text-5xl mb-4">{emojiHint}</div>
          <p className="text-rose-800 text-lg font-medium mb-6">{promise}</p>
          <div className="text-7xl font-bold text-rose-600">{timerValue}</div>
          <p className="text-rose-600 text-sm">Restarts: {restartCount}/{String(params.restartCount)}</p>
        </div>
      );
    }

    // Level 61: Hint disappears
    if (params.tapTarget === 'after-hint-disappears') {
      return (
        <div 
          onClick={() => handleTap()}
          className="space-y-6 text-center cursor-pointer min-h-[400px] flex flex-col items-center justify-center"
        >
          <div className="text-5xl mb-4">{emojiHint}</div>
          <p className="text-rose-800 text-lg font-medium mb-6">{promise}</p>
          {showHintText && (
            <div className="text-2xl text-rose-600 animate-pulse">
              Tap now
            </div>
          )}
          {!showHintText && (
            <p className="text-rose-600 text-sm">Now tap anywhere...</p>
          )}
        </div>
      );
    }

    // Level 66: Two hearts
    if (params.tapTarget === 'dull-heart') {
      return (
        <div className="space-y-6 text-center">
          <div className="text-5xl mb-4">{emojiHint}</div>
          <p className="text-rose-800 text-lg font-medium mb-6">{promise}</p>
          <div className="flex gap-8 justify-center">
            <div className="text-6xl animate-pulse">✨❤️✨</div>
            <div 
              onClick={() => handleTap('dull')}
              className="text-6xl opacity-60 cursor-pointer hover:opacity-80 transition-opacity"
            >
              🤎
            </div>
          </div>
        </div>
      );
    }

    // Level 75: Enlarge heart
    if (params.longPressToEnlarge) {
      return (
        <div className="space-y-6 text-center">
          <div className="text-5xl mb-4">{emojiHint}</div>
          <p className="text-rose-800 text-lg font-medium mb-6">{promise}</p>
          <div 
            onMouseDown={handleHoldStart}
            onMouseUp={handleHoldEnd}
            onMouseLeave={handleHoldEnd}
            onTouchStart={handleHoldStart}
            onTouchEnd={handleHoldEnd}
            className="text-6xl cursor-pointer select-none transition-transform"
            style={{ transform: `scale(${heartScale})` }}
          >
            ❤️
          </div>
          <p className="text-rose-600 text-sm">Hold to grow...</p>
        </div>
      );
    }

    // Level 76: Tap at dimmest
    if (params.tapAtDimmest) {
      return (
        <div 
          onClick={() => handleTap()}
          className="space-y-6 text-center cursor-pointer"
        >
          <div className="text-5xl mb-4">{emojiHint}</div>
          <p className="text-rose-800 text-lg font-medium mb-6">{promise}</p>
          <div 
            className="text-6xl transition-opacity"
            style={{ opacity: glowIntensity }}
          >
            ✨
          </div>
          <p className="text-rose-600 text-sm">Tap at the dimmest moment...</p>
        </div>
      );
    }

    // Level 79: Breathing icon
    if (params.tapWhenExpanded) {
      return (
        <div 
          onClick={() => handleTap()}
          className="space-y-6 text-center cursor-pointer"
        >
          <div className="text-5xl mb-4">{emojiHint}</div>
          <p className="text-rose-800 text-lg font-medium mb-6">{promise}</p>
          <div 
            className="text-6xl transition-transform"
            style={{ transform: `scale(${breathingScale})` }}
          >
            🌬️
          </div>
          <p className="text-rose-600 text-sm">Tap when fully expanded...</p>
        </div>
      );
    }

    // Level 100: Final level
    if (config.promise === "Forever." && params.doNothing) {
      return (
        <div className="space-y-6 text-center">
          <div className="text-5xl mb-4">{emojiHint}</div>
          <div className="text-rose-800 text-lg font-medium leading-relaxed whitespace-pre-line">
            You didn't solve puzzles.{'\n'}
            You kept promises.
          </div>
          <p className="text-rose-600 text-sm mt-8">Just be present...</p>
        </div>
      );
    }

    // Hold-based levels (4, 5, 10, 21, 42, 43, 55, 57, 65, 70, 73, 89, 99)
    if (params.holdDuration && !params.longPressToEnlarge && !params.longPressWhenTimerReaches) {
      return (
        <div className="space-y-6 text-center">
          <div className="text-5xl mb-4">{emojiHint}</div>
          <p className="text-rose-800 text-lg font-medium mb-6">{promise}</p>
          <div 
            onMouseDown={handleHoldStart}
            onMouseUp={handleHoldEnd}
            onMouseLeave={handleHoldEnd}
            onTouchStart={handleHoldStart}
            onTouchEnd={handleHoldEnd}
            className={`text-6xl cursor-pointer select-none transition-transform ${isHolding ? 'scale-110' : ''}`}
          >
            {params.tapTarget === 'heart' ? '❤️' : 
             params.tapTarget === 'text' ? '📜' :
             params.tapTarget === 'center' ? '🤍' : '💖'}
          </div>
          <p className="text-rose-600 text-sm">
            {isHolding ? `Hold steady... (${((params.holdDuration as number) / 1000).toFixed(0)}s)` : 'Hold to continue...'}
          </p>
        </div>
      );
    }

    // Wait-based levels (do nothing)
    if (params.doNothing) {
      return (
        <div className="space-y-6 text-center">
          <div className="text-5xl mb-4">{emojiHint}</div>
          <p className="text-rose-800 text-lg font-medium mb-6">{promise}</p>
          <div className="text-6xl animate-pulse">🤫</div>
          <p className="text-rose-600 text-sm">Patience...</p>
        </div>
      );
    }

    // Default: Simple tap
    return (
      <div 
        onClick={() => handleTap()}
        className="space-y-6 text-center cursor-pointer"
      >
        <div className="text-5xl mb-4">{emojiHint}</div>
        <p className="text-rose-800 text-lg font-medium mb-6">{promise}</p>
        <Heart className="w-16 h-16 text-rose-600 fill-rose-600 mx-auto animate-pulse" />
        <p className="text-rose-600 text-sm">Tap to continue...</p>
      </div>
    );
  };

  return (
    <div className="min-h-[400px] flex items-center justify-center p-8">
      {renderPuzzle()}
    </div>
  );
}
