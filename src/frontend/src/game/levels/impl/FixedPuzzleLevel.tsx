import { useState, useEffect, useRef } from 'react';
import { Heart, Sun, Moon, Mail, MailOpen, AlarmClock, Gift, ToggleLeft, ToggleRight, Eraser, DoorOpen, Cloud, Umbrella, Cat, Book, Volume2, Pause, Frame, Menu, Flower, Shield, Flame, Scale, Clock, Eye, Lock, Check, Undo, CloudRain, Zap, Key, Camera, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LevelConfig } from './levelConfigs';

interface FixedPuzzleLevelProps {
  config: LevelConfig;
  onWin: () => void;
  onLose: () => void;
}

export default function FixedPuzzleLevel({ config, onWin, onLose }: FixedPuzzleLevelProps) {
  const [attempts, setAttempts] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 50, y: 50 });
  const [heartPositions, setHeartPositions] = useState<Array<{ x: number; y: number; moving: boolean }>>([]);
  const [userInput, setUserInput] = useState('');
  const [isPressed, setIsPressed] = useState(false);
  const [pressStartTime, setPressStartTime] = useState(0);
  const [cleanedArea, setCleanedArea] = useState(0);
  const [giftStates, setGiftStates] = useState<Array<{ visible: boolean; isFake: boolean }>>([]);
  const [step, setStep] = useState(0);
  const [swipeStart, setSwipeStart] = useState<{ x: number; y: number } | null>(null);
  const [lastTapTime, setLastTapTime] = useState(0);
  const [rubCount, setRubCount] = useState(0);
  const [lastMouseX, setLastMouseX] = useState(0);
  const [hasFailed, setHasFailed] = useState(false);
  const [showHiddenButton, setShowHiddenButton] = useState(false);
  const [dragSpeed, setDragSpeed] = useState(0);
  const [lastDragTime, setLastDragTime] = useState(0);
  const [lastDragPos, setLastDragPos] = useState({ x: 0, y: 0 });
  const [fallingObjects, setFallingObjects] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [blockedCount, setBlockedCount] = useState(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const heartIdleTimers = useRef<Array<NodeJS.Timeout | null>>([]);

  // Initialize hearts for level 4
  useEffect(() => {
    if (config.solution === 'count-hearts') {
      const count = typeof config.data?.count === 'number' ? config.data.count : 5;
      const hearts = Array.from({ length: count }, () => ({
        x: Math.random() * 70 + 15,
        y: Math.random() * 70 + 15,
        moving: false,
      }));
      setHeartPositions(hearts);
    }
  }, [config.solution]);

  // Initialize gifts for level 13
  useEffect(() => {
    if (config.solution === 'find-real-gift') {
      const count = typeof config.data?.count === 'number' ? config.data.count : 3;
      const gifts = Array.from({ length: count }, (_, i) => ({
        visible: true,
        isFake: i < count - 1, // Last one is real
      }));
      setGiftStates(gifts);
    }
  }, [config.solution]);

  // Timer for wait-based levels
  useEffect(() => {
    const waitLevels = ['wait-auto-win', 'wait-storm-stops', 'wait-objects-still', 'wait-timer', 'wait-no-touch', 'wait-to-win', 'delayed-win', 'wait-mute-appears', 'wait-ok-appears', 'trust-wait', 'hold-anywhere'];
    if (waitLevels.includes(config.solution)) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [config.solution]);

  // Auto-win after timer
  useEffect(() => {
    const duration = typeof config.data?.duration === 'number' ? config.data.duration / 1000 : 3;
    const waitLevels = ['wait-auto-win', 'wait-storm-stops', 'wait-objects-still', 'wait-timer', 'wait-no-touch', 'wait-to-win', 'delayed-win', 'wait-mute-appears', 'wait-ok-appears', 'trust-wait'];
    if (waitLevels.includes(config.solution) && timer >= duration) {
      handleWin();
    }
  }, [timer, config]);

  // Falling objects for level 85
  useEffect(() => {
    if (config.solution === 'block-falling-objects') {
      const interval = setInterval(() => {
        setFallingObjects((prev) => {
          const newObjects = [...prev];
          // Add new object
          if (Math.random() > 0.7) {
            newObjects.push({
              id: Date.now(),
              x: Math.random() * 80 + 10,
              y: 0,
            });
          }
          // Move objects down
          return newObjects.map((obj) => ({ ...obj, y: obj.y + 2 })).filter((obj) => obj.y < 100);
        });
      }, 100);

      const durationMs = typeof config.data?.duration === 'number' ? config.data.duration : 5000;
      const winTimer = setTimeout(() => {
        if (blockedCount >= 5) {
          handleWin();
        }
      }, durationMs);

      return () => {
        clearInterval(interval);
        clearTimeout(winTimer);
      };
    }
  }, [config.solution, blockedCount]);

  // Show hidden elements after delay
  useEffect(() => {
    if (['wait-mute-appears', 'wait-ok-appears', 'tap-wrong-after-delay'].includes(config.solution)) {
      const delay = typeof config.data?.delay === 'number' ? config.data.delay : (typeof config.data?.duration === 'number' ? config.data.duration : 2000);
      const timeout = setTimeout(() => {
        setShowHiddenButton(true);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [config.solution]);

  // Check win conditions based on drag position
  useEffect(() => {
    if (config.solution === 'drag-pillow' && (dragPosition.x < 20 || dragPosition.x > 80 || dragPosition.y < 20 || dragPosition.y > 80)) {
      handleWin();
    } else if (config.solution === 'drag-smile' && Math.abs(dragPosition.x - 50) < 10 && Math.abs(dragPosition.y - 33) < 10) {
      handleWin();
    } else if (config.solution === 'remove-pillow-alarm' && (dragPosition.x < 20 || dragPosition.x > 80)) {
      handleWin();
    } else if (config.solution === 'fix-broken-heart' && Math.abs(dragPosition.x - 25) < 15 && Math.abs(dragPosition.y - 50) < 15) {
      handleWin();
    } else if (config.solution === 'drag-keyhole' && dragPosition.x > 70) {
      handleWin();
    } else if (config.solution === 'place-umbrella' && Math.abs(dragPosition.x - 50) < 15 && dragPosition.y < 40) {
      handleWin();
    } else if (config.solution === 'feed-cat' && Math.abs(dragPosition.x - 50) < 15 && dragPosition.y > 70) {
      handleWin();
    } else if (config.solution === 'drag-volume-icon' && dragPosition.x > 70) {
      handleWin();
    } else if (config.solution === 'drag-instruction-away' && (dragPosition.x < 20 || dragPosition.x > 80 || dragPosition.y < 20 || dragPosition.y > 80)) {
      handleWin();
    } else if (config.solution === 'drag-frame-border' && Math.abs(dragPosition.x - 50) < 5) {
      handleWin();
    } else if (config.solution === 'drag-hands-tears' && dragPosition.y > 60) {
      handleWin();
    } else if (config.solution === 'drag-shield-flame' && Math.abs(dragPosition.x - 50) < 15 && Math.abs(dragPosition.y - 50) < 15) {
      handleWin();
    } else if (config.solution === 'drag-lock' && (dragPosition.x < 20 || dragPosition.x > 80)) {
      handleWin();
    } else if (config.solution === 'drag-text-label' && (dragPosition.x < 20 || dragPosition.x > 80)) {
      handleWin();
    } else if (config.solution === 'drag-shadow-away' && (dragPosition.x < 20 || dragPosition.x > 80)) {
      handleWin();
    } else if (config.solution === 'drag-memory-heart' && Math.abs(dragPosition.x - 50) < 15 && Math.abs(dragPosition.y - 50) < 15) {
      handleWin();
    }
  }, [dragPosition, config.solution]);

  // Check win conditions based on progress
  useEffect(() => {
    if (config.solution === 'remove-distractions' && progress >= 90) {
      handleWin();
    } else if (config.solution === 'balance-weights' && Math.abs(progress - 50) < 5) {
      handleWin();
    } else if (config.solution === 'rotate-ui' && progress >= 180) {
      handleWin();
    }
  }, [progress, config.solution]);

  const handleWin = () => {
    if (!isComplete) {
      setIsComplete(true);
      setTimeout(() => onWin(), 500);
    }
  };

  const handleFail = () => {
    setAttempts((prev) => prev + 1);
    if (attempts >= 2) {
      setTimeout(() => onLose(), 500);
    }
  };

  const handleHeartTap = (index: number) => {
    if (config.solution === 'count-hearts') {
      const newHearts = [...heartPositions];
      newHearts[index] = {
        x: Math.random() * 70 + 15,
        y: Math.random() * 70 + 15,
        moving: true,
      };
      setHeartPositions(newHearts);

      // Clear existing timer
      if (heartIdleTimers.current[index]) {
        clearTimeout(heartIdleTimers.current[index]!);
      }

      // Stop moving after 2s
      heartIdleTimers.current[index] = setTimeout(() => {
        const stoppedHearts = [...heartPositions];
        stoppedHearts[index].moving = false;
        setHeartPositions(stoppedHearts);
      }, 2000);
    }
  };

  const handleCountSubmit = () => {
    if (config.solution === 'count-hearts') {
      const count = typeof config.data?.count === 'number' ? config.data.count : 5;
      if (parseInt(userInput) === count) {
        handleWin();
      } else {
        handleFail();
        setUserInput('');
      }
    }
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setLastDragPos({ x: clientX, y: clientY });
    setLastDragTime(Date.now());
    setPressStartTime(Date.now());
  };

  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging && !['rub-screen', 'swipe-clean'].includes(config.solution)) return;
    
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    // Calculate speed
    const now = Date.now();
    const timeDiff = now - lastDragTime;
    if (timeDiff > 0) {
      const distance = Math.sqrt(Math.pow(clientX - lastDragPos.x, 2) + Math.pow(clientY - lastDragPos.y, 2));
      const speed = distance / timeDiff * 1000; // pixels per second
      setDragSpeed(speed);
      setLastDragPos({ x: clientX, y: clientY });
      setLastDragTime(now);

      // Check slow drag condition
      if (config.solution === 'slow-drag-heart') {
        const maxSpeed = typeof config.data?.maxSpeed === 'number' ? config.data.maxSpeed : 50;
        if (speed > maxSpeed) {
          handleFail();
          setIsDragging(false);
          return;
        } else if (y > 80) {
          handleWin();
          return;
        }
      }
    }

    setDragPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });

    // Level-specific drag logic
    if (config.solution === 'drag-button-up') {
      const distance = typeof config.data?.distance === 'number' ? config.data.distance : 100;
      if (y < 50 - (distance / rect.height * 100)) {
        handleWin();
      }
    } else if (config.solution === 'swipe-clean') {
      setCleanedArea((prev) => Math.min(prev + 2, 100));
      if (cleanedArea >= (typeof config.data?.threshold === 'number' ? config.data.threshold : 80)) {
        handleWin();
      }
    } else if (config.solution === 'rub-screen') {
      const deltaX = Math.abs(clientX - lastMouseX);
      if (deltaX > 10) {
        setRubCount((prev) => prev + 1);
        setLastMouseX(clientX);
        const requiredCount = typeof config.data?.count === 'number' ? config.data.count : 10;
        if (rubCount >= requiredCount) {
          handleWin();
        }
      }
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
    }
  };

  const handlePressStart = () => {
    setIsPressed(true);
    setPressStartTime(Date.now());

    const duration = typeof config.data?.duration === 'number' ? config.data.duration : 2000;
    
    if (['hold-love', 'hold-toggle', 'long-press-corner', 'hold-button-2s', 'long-press-bg', 'hold-anywhere', 'hold-without-moving'].includes(config.solution)) {
      pressTimerRef.current = setTimeout(() => {
        handleWin();
      }, duration);
    }
  };

  const handlePressEnd = () => {
    setIsPressed(false);
    const duration = Date.now() - pressStartTime;
    
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }

    const requiredDuration = typeof config.data?.duration === 'number' ? config.data.duration : 2000;
    if (['hold-love', 'hold-toggle', 'long-press-corner', 'hold-button-2s', 'long-press-bg', 'hold-anywhere', 'hold-without-moving'].includes(config.solution) && duration < requiredDuration) {
      handleFail();
    }
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTapTime < 500) {
      if (config.solution === 'double-tap-bulb') {
        handleWin();
      }
    }
    setLastTapTime(now);
  };

  const handleGiftTap = (index: number) => {
    if (config.solution === 'find-real-gift') {
      const newGifts = [...giftStates];
      if (newGifts[index].isFake) {
        newGifts[index].visible = false;
        setGiftStates(newGifts);
      } else {
        handleWin();
      }
    }
  };

  const handleSwipeStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setSwipeStart({ x: clientX, y: clientY });
  };

  const handleSwipeEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (!swipeStart) return;
    
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const clientY = 'changedTouches' in e ? e.changedTouches[0].clientY : e.clientY;
    const deltaX = clientX - swipeStart.x;
    const deltaY = clientY - swipeStart.y;

    if (config.solution === 'swipe-left-page' && deltaX < -50) {
      handleWin();
    } else if (config.solution === 'swipe-popup-down' && deltaY > 50) {
      handleWin();
    } else if (config.solution === 'slow-swipe' && Math.abs(deltaX) > 100 && Math.abs(deltaX) < 300) {
      handleWin();
    }

    setSwipeStart(null);
  };

  const handleStepAction = (stepNum: number) => {
    const multiStepLevels = ['remove-rain-then-light', 'calm-then-tap', 'combine-then-use', 'disable-noise-solve', 'fix-error-continue', 'charge-then-tap', 'rotate-key-unlock', 'clean-reveal-button', 'arrange-confirm', 'prepare-act', 'multi-step-patience'];
    
    if (multiStepLevels.includes(config.solution)) {
      if (stepNum === step + 1) {
        setStep(stepNum);
        if (stepNum === 2) {
          handleWin();
        }
      } else {
        handleFail();
        setStep(0);
      }
    }
  };

  const handleOppositeAction = () => {
    if (config.solution === 'opposite-action') {
      // Don't tap the button, tap elsewhere
      handleFail();
    }
  };

  const handleBackgroundTap = () => {
    if (['tap-background', 'opposite-action', 'tap-background-element', 'tap-empty-area'].includes(config.solution)) {
      handleWin();
    }
  };

  const handleFailFirst = () => {
    if (config.solution === 'fail-first') {
      if (!hasFailed) {
        setHasFailed(true);
        handleFail();
      } else {
        handleWin();
      }
    }
  };

  const handleTimingTap = () => {
    if (config.solution === 'tap-exact-second') {
      const target = typeof config.data?.target === 'number' ? config.data.target : 3;
      if (timer === target) {
        handleWin();
      } else {
        handleFail();
      }
    } else if (config.solution === 'one-tap-timing') {
      if (timer >= 2 && timer <= 4) {
        handleWin();
      } else {
        handleFail();
      }
    } else if (config.solution === 'perfect-timing-tap') {
      // Win if tapped during a specific window
      if (timer % 3 === 0) {
        handleWin();
      } else {
        handleFail();
      }
    }
  };

  const handleSlowTap = () => {
    const now = Date.now();
    const minDelay = typeof config.data?.minDelay === 'number' ? config.data.minDelay : 2000;
    
    if (config.solution === 'one-slow-tap') {
      if (now - lastTapTime > minDelay) {
        handleWin();
      } else {
        handleFail();
      }
    }
    setLastTapTime(now);
  };

  const handleObjectBlock = (objId: number) => {
    setFallingObjects((prev) => prev.filter((obj) => obj.id !== objId));
    setBlockedCount((prev) => prev + 1);
  };

  const renderPuzzle = () => {
    switch (config.solution) {
      // Level 4: Count Hearts
      case 'count-hearts':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div ref={containerRef} className="relative w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl">
              {heartPositions.map((pos, i) => (
                <div
                  key={i}
                  onClick={() => handleHeartTap(i)}
                  className={`absolute cursor-pointer transition-all ${pos.moving ? 'duration-500' : 'duration-0'}`}
                  style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <Heart className="w-12 h-12 text-rose-500 fill-rose-500" />
                </div>
              ))}
            </div>
            <div className="flex gap-2 justify-center items-center">
              <Input
                type="number"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="How many?"
                className="w-24 text-center"
              />
              <Button onClick={handleCountSubmit} className="bg-rose-500 hover:bg-rose-600">Submit</Button>
            </div>
          </div>
        );

      // Level 5: Drag Button Up
      case 'drag-button-up':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div
              ref={containerRef}
              onMouseMove={handleDrag}
              onMouseUp={handleDragEnd}
              onTouchMove={handleDrag}
              onTouchEnd={handleDragEnd}
              className="relative w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl"
            >
              <div
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
                className="absolute left-1/2 -translate-x-1/2 cursor-move touch-none"
                style={{ top: `${dragPosition.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <Button className="bg-gray-400 hover:bg-gray-500">Start</Button>
              </div>
            </div>
          </div>
        );

      // Level 6: Drag Pillow Away
      case 'drag-pillow':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div
              ref={containerRef}
              onMouseMove={handleDrag}
              onMouseUp={handleDragEnd}
              onTouchMove={handleDrag}
              onTouchEnd={handleDragEnd}
              className="relative w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center"
            >
              <div className="text-6xl">😴</div>
              <div
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
                className="absolute cursor-move touch-none text-6xl"
                style={{ left: `${dragPosition.x}%`, top: `${dragPosition.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                🛏️
              </div>
            </div>
          </div>
        );

      // Level 7: Double Tap Bulb
      case 'double-tap-bulb':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="flex justify-center">
              <div onClick={handleDoubleTap} className="cursor-pointer text-8xl">
                💡
              </div>
            </div>
          </div>
        );

      // Level 8: Drag Smile
      case 'drag-smile':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div
              ref={containerRef}
              onMouseMove={handleDrag}
              onMouseUp={handleDragEnd}
              onTouchMove={handleDrag}
              onTouchEnd={handleDragEnd}
              className="relative w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl"
            >
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-6xl">😐</div>
              <div
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-move touch-none text-4xl"
                style={{ left: `${dragPosition.x}%`, top: `${dragPosition.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                😊
              </div>
            </div>
          </div>
        );

      // Level 9: Swipe Clean
      case 'swipe-clean':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div
              ref={containerRef}
              onMouseMove={handleDrag}
              onMouseDown={handleDragStart}
              onMouseUp={handleDragEnd}
              onTouchMove={handleDrag}
              onTouchStart={handleDragStart}
              onTouchEnd={handleDragEnd}
              className="relative w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-gray-400/70 transition-opacity"
                style={{ opacity: 1 - cleanedArea / 100 }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-rose-900">
                ❤️
              </div>
            </div>
            <div className="text-center text-sm text-rose-700 dark:text-rose-300">
              Cleaned: {Math.round(cleanedArea)}%
            </div>
          </div>
        );

      // Level 10: Hold Love
      case 'hold-love':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="flex justify-center">
              <div
                onMouseDown={handlePressStart}
                onMouseUp={handlePressEnd}
                onMouseLeave={handlePressEnd}
                onTouchStart={handlePressStart}
                onTouchEnd={handlePressEnd}
                className="relative cursor-pointer"
              >
                <Heart className={`w-32 h-32 text-rose-500 fill-rose-500 ${isPressed ? 'scale-110' : 'scale-100'} transition-transform`} />
                {isPressed && (
                  <div className="absolute inset-0 rounded-full border-4 border-rose-500 animate-ping" />
                )}
              </div>
            </div>
          </div>
        );

      // Level 11: Remove Pillow from Alarm
      case 'remove-pillow-alarm':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div
              ref={containerRef}
              onMouseMove={handleDrag}
              onMouseUp={handleDragEnd}
              onTouchMove={handleDrag}
              onTouchEnd={handleDragEnd}
              className="relative w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center"
            >
              <AlarmClock className="w-24 h-24 text-rose-500" />
              <div
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
                className="absolute cursor-move touch-none text-6xl"
                style={{ left: `${dragPosition.x}%`, top: `${dragPosition.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                🛏️
              </div>
            </div>
          </div>
        );

      // Level 12: Fix Broken Heart
      case 'fix-broken-heart':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div
              ref={containerRef}
              onMouseMove={handleDrag}
              onMouseUp={handleDragEnd}
              onTouchMove={handleDrag}
              onTouchEnd={handleDragEnd}
              className="relative w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl"
            >
              <div className="absolute left-1/4 top-1/2 -translate-y-1/2 text-6xl">💔</div>
              <div
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
                className="absolute right-1/4 top-1/2 -translate-y-1/2 cursor-move touch-none text-6xl"
                style={{ left: `${dragPosition.x}%`, top: `${dragPosition.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                ❤️
              </div>
            </div>
          </div>
        );

      // Level 13: Find Real Gift
      case 'find-real-gift':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="flex gap-4 justify-center">
              {giftStates.map((gift, i) => (
                gift.visible && (
                  <div
                    key={i}
                    onClick={() => handleGiftTap(i)}
                    className="cursor-pointer hover:scale-110 transition-transform"
                  >
                    <Gift className="w-20 h-20 text-rose-500" />
                  </div>
                )
              ))}
            </div>
          </div>
        );

      // Level 14: Hold Toggle
      case 'hold-toggle':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="flex justify-center">
              <div
                onMouseDown={handlePressStart}
                onMouseUp={handlePressEnd}
                onMouseLeave={handlePressEnd}
                onTouchStart={handlePressStart}
                onTouchEnd={handlePressEnd}
                className="cursor-pointer"
              >
                {isPressed ? (
                  <ToggleRight className="w-32 h-32 text-rose-500" />
                ) : (
                  <ToggleLeft className="w-32 h-32 text-gray-400" />
                )}
              </div>
            </div>
          </div>
        );

      // Level 15: Erase Sadness
      case 'erase-sadness':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="flex flex-col items-center gap-4">
              <div className={`text-6xl font-bold ${cleanedArea > 50 ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
                SAD
              </div>
              <div
                onMouseMove={(e) => {
                  if (e.buttons === 1) {
                    setCleanedArea((prev) => Math.min(prev + 5, 100));
                    if (cleanedArea >= 80) handleWin();
                  }
                }}
                className="cursor-pointer"
              >
                <Eraser className="w-16 h-16 text-rose-500" />
              </div>
            </div>
          </div>
        );

      // Level 16: Drag Keyhole
      case 'drag-keyhole':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div
              ref={containerRef}
              onMouseMove={handleDrag}
              onMouseUp={handleDragEnd}
              onTouchMove={handleDrag}
              onTouchEnd={handleDragEnd}
              className="relative w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center"
            >
              <DoorOpen className="w-32 h-32 text-rose-500" />
              <div
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
                className="absolute cursor-move touch-none"
                style={{ left: `${dragPosition.x}%`, top: `${dragPosition.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <div className="w-8 h-8 bg-gray-800 rounded-full" />
              </div>
            </div>
          </div>
        );

      // Level 17: Place Umbrella
      case 'place-umbrella':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div
              ref={containerRef}
              onMouseMove={handleDrag}
              onMouseUp={handleDragEnd}
              onTouchMove={handleDrag}
              onTouchEnd={handleDragEnd}
              className="relative w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl"
            >
              <div className="absolute top-8 left-1/2 -translate-x-1/2">
                <CloudRain className="w-20 h-20 text-blue-500" />
              </div>
              <div
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-move touch-none"
                style={{ left: `${dragPosition.x}%`, top: `${dragPosition.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <div className="text-4xl">☂️</div>
              </div>
            </div>
          </div>
        );

      // Level 18: Feed Cat
      case 'feed-cat':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div
              ref={containerRef}
              onMouseMove={handleDrag}
              onMouseUp={handleDragEnd}
              onTouchMove={handleDrag}
              onTouchEnd={handleDragEnd}
              className="relative w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl"
            >
              <div
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
                className="absolute top-8 left-1/2 -translate-x-1/2 cursor-move touch-none text-4xl"
                style={{ left: `${dragPosition.x}%`, top: `${dragPosition.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                🍜
              </div>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-6xl">
                🐱
              </div>
            </div>
          </div>
        );

      // Level 19: Swipe Left
      case 'swipe-left-page':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div
              onTouchStart={handleSwipeStart}
              onTouchEnd={handleSwipeEnd}
              onMouseDown={handleSwipeStart}
              onMouseUp={handleSwipeEnd}
              className="w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center cursor-pointer"
            >
              <Book className="w-32 h-32 text-rose-500" />
            </div>
          </div>
        );

      // Level 20: Slow Drag
      case 'slow-drag-heart':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div
              ref={containerRef}
              onMouseMove={handleDrag}
              onMouseUp={handleDragEnd}
              onTouchMove={handleDrag}
              onTouchEnd={handleDragEnd}
              className="relative w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl"
            >
              <div
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
                className="absolute top-8 left-1/2 -translate-x-1/2 cursor-move touch-none"
                style={{ left: `${dragPosition.x}%`, top: `${dragPosition.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <Heart className="w-16 h-16 text-rose-500 fill-rose-500" />
              </div>
            </div>
            <div className="text-center text-sm text-rose-700 dark:text-rose-300">
              Speed: {Math.round(dragSpeed)} px/s {dragSpeed > 50 ? '(Too fast!)' : ''}
            </div>
          </div>
        );

      // Levels 21-30: UI Deception
      case 'tap-background':
        return (
          <div className="space-y-4" onClick={handleBackgroundTap}>
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="flex justify-center">
              <Button onClick={(e) => { e.stopPropagation(); handleFail(); }} className="bg-rose-500 hover:bg-rose-600 opacity-50">
                Continue (Fake)
              </Button>
            </div>
          </div>
        );

      case 'wait-yes-stops':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="flex justify-center">
              <Button
                onClick={handleWin}
                className="bg-rose-500 hover:bg-rose-600 transition-all"
                style={{
                  transform: timer < 3 ? `translateX(${Math.sin(timer * 2) * 50}px)` : 'translateX(0)',
                }}
              >
                YES
              </Button>
            </div>
          </div>
        );

      case 'swipe-popup-down':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div
              onTouchStart={handleSwipeStart}
              onTouchEnd={handleSwipeEnd}
              onMouseDown={handleSwipeStart}
              onMouseUp={handleSwipeEnd}
              className="w-full max-w-sm mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg cursor-pointer"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">Popup</h3>
                <div className="text-gray-400">✕</div>
              </div>
              <p className="text-sm">Swipe down to close</p>
            </div>
          </div>
        );

      case 'drag-volume-icon':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div
              ref={containerRef}
              onMouseMove={handleDrag}
              onMouseUp={handleDragEnd}
              onTouchMove={handleDrag}
              onTouchEnd={handleDragEnd}
              className="relative w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center"
            >
              <div
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
                className="cursor-move touch-none"
                style={{ transform: `translateX(${dragPosition.x - 50}px)` }}
              >
                <Volume2 className="w-16 h-16 text-rose-500" />
              </div>
            </div>
          </div>
        );

      case 'drag-instruction-away':
        return (
          <div className="space-y-4">
            <div
              ref={containerRef}
              onMouseMove={handleDrag}
              onMouseUp={handleDragEnd}
              onTouchMove={handleDrag}
              onTouchEnd={handleDragEnd}
              className="relative w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center"
            >
              <div
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
                className="cursor-move touch-none"
                style={{ transform: `translate(${dragPosition.x - 50}px, ${dragPosition.y - 50}px)` }}
              >
                <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100">{config.instruction}</h2>
              </div>
            </div>
          </div>
        );

      case 'tap-ui-heart':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center px-4">
              <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100">{config.instruction}</h2>
              <Heart onClick={handleWin} className="w-8 h-8 text-rose-500 fill-rose-500 cursor-pointer hover:scale-110 transition-transform" />
            </div>
          </div>
        );

      case 'tap-page-number':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center relative">
              <Book className="w-32 h-32 text-rose-500" />
              <div onClick={handleWin} className="absolute bottom-4 right-4 text-sm text-rose-700 dark:text-rose-300 cursor-pointer hover:underline">
                Page 27
              </div>
            </div>
          </div>
        );

      case 'tap-pause-icon':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center px-4">
              <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100">{config.instruction}</h2>
              <Pause onClick={handleWin} className="w-8 h-8 text-rose-500 cursor-pointer hover:scale-110 transition-transform" />
            </div>
            <div className="w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center">
              <div className="text-6xl animate-spin">🎨</div>
            </div>
          </div>
        );

      case 'drag-frame-border':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div
              ref={containerRef}
              onMouseMove={handleDrag}
              onMouseUp={handleDragEnd}
              onTouchMove={handleDrag}
              onTouchEnd={handleDragEnd}
              className="relative w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center"
            >
              <div
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
                className="border-4 border-rose-500 p-8 cursor-move touch-none"
                style={{ transform: `rotate(${(dragPosition.x - 50) / 2}deg)` }}
              >
                <Frame className="w-16 h-16 text-rose-500" />
              </div>
            </div>
          </div>
        );

      case 'long-press-corner':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="relative w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl">
              <div
                onMouseDown={handlePressStart}
                onMouseUp={handlePressEnd}
                onMouseLeave={handlePressEnd}
                onTouchStart={handlePressStart}
                onTouchEnd={handlePressEnd}
                className="absolute top-0 left-0 w-16 h-16 cursor-pointer hover:bg-rose-200 dark:hover:bg-rose-800 transition-colors rounded-tl-xl"
              >
                <Menu className="w-8 h-8 text-rose-500 m-2" />
              </div>
            </div>
          </div>
        );

      // Levels 31-40: Logic + Emotion
      case 'give-flower':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="flex gap-4 justify-center">
              <div onClick={handleFail} className="cursor-pointer hover:scale-110 transition-transform text-4xl">💍</div>
              <div onClick={handleWin} className="cursor-pointer hover:scale-110 transition-transform text-4xl">🌹</div>
              <div onClick={handleFail} className="cursor-pointer hover:scale-110 transition-transform text-4xl">🎁</div>
            </div>
          </div>
        );

      case 'drag-hands-tears':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div
              ref={containerRef}
              onMouseMove={handleDrag}
              onMouseUp={handleDragEnd}
              onTouchMove={handleDrag}
              onTouchEnd={handleDragEnd}
              className="relative w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center"
            >
              <div className="text-6xl">😢</div>
              <div
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
                className="absolute bottom-8 cursor-move touch-none text-4xl"
                style={{ left: `${dragPosition.x}%`, top: `${dragPosition.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                🤲
              </div>
            </div>
          </div>
        );

      case 'drag-shield-flame':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div
              ref={containerRef}
              onMouseMove={handleDrag}
              onMouseUp={handleDragEnd}
              onTouchMove={handleDrag}
              onTouchEnd={handleDragEnd}
              className="relative w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center"
            >
              <Flame className="w-16 h-16 text-orange-500" />
              <div className="absolute top-8 left-8 text-2xl">💨</div>
              <div
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
                className="absolute bottom-8 cursor-move touch-none"
                style={{ left: `${dragPosition.x}%`, top: `${dragPosition.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <Shield className="w-16 h-16 text-blue-500" />
              </div>
            </div>
          </div>
        );

      case 'remove-distractions':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="flex gap-4 justify-center flex-wrap">
              <div onClick={() => setProgress((p) => p + 33.33)} className="cursor-pointer text-4xl hover:opacity-0 transition-opacity">📱</div>
              <div onClick={() => setProgress((p) => p + 33.33)} className="cursor-pointer text-4xl hover:opacity-0 transition-opacity">💼</div>
              <div onClick={() => setProgress((p) => p + 33.33)} className="cursor-pointer text-4xl hover:opacity-0 transition-opacity">📺</div>
            </div>
          </div>
        );

      case 'balance-weights':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="flex justify-center items-end gap-8">
              <div onClick={() => setProgress(50)} className="cursor-pointer">
                <Scale className="w-24 h-24 text-rose-500" style={{ transform: `rotate(${progress - 50}deg)` }} />
              </div>
            </div>
          </div>
        );

      case 'hold-anywhere':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div
              onMouseDown={handlePressStart}
              onMouseUp={handlePressEnd}
              onMouseLeave={handlePressEnd}
              onTouchStart={handlePressStart}
              onTouchEnd={handlePressEnd}
              className="w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center cursor-pointer"
            >
              <div className="text-6xl">{isPressed ? '🧘' : '😰'}</div>
            </div>
            <div className="text-center text-sm text-rose-700 dark:text-rose-300">
              {isPressed ? `Hold for ${timer}s...` : 'Press and hold anywhere'}
            </div>
          </div>
        );

      case 'tap-correct-promise':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="space-y-2">
              <Button onClick={handleFail} variant="outline" className="w-full">I promise maybe</Button>
              <Button onClick={handleWin} className="w-full bg-rose-500 hover:bg-rose-600">I promise forever</Button>
              <Button onClick={handleFail} variant="outline" className="w-full">I promise sometimes</Button>
            </div>
          </div>
        );

      case 'wait-no-touch':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div
              onClick={handleFail}
              className="w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center"
            >
              <div className="text-6xl">🤝</div>
            </div>
            <div className="text-center text-sm text-rose-700 dark:text-rose-300">
              Wait {timer}s... (Don't touch!)
            </div>
          </div>
        );

      case 'drag-shadow-away':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div
              ref={containerRef}
              onMouseMove={handleDrag}
              onMouseUp={handleDragEnd}
              onTouchMove={handleDrag}
              onTouchEnd={handleDragEnd}
              className="relative w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center"
            >
              <div className="text-6xl">😊</div>
              <div
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
                className="absolute cursor-move touch-none text-6xl opacity-50"
                style={{ left: `${dragPosition.x}%`, top: `${dragPosition.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                👤
              </div>
            </div>
          </div>
        );

      case 'rub-screen':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div
              onMouseMove={handleDrag}
              onMouseDown={handleDragStart}
              className="w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center cursor-pointer"
            >
              <div className="text-6xl">🤲</div>
            </div>
            <div className="text-center text-sm text-rose-700 dark:text-rose-300">
              Rub count: {rubCount}/10
            </div>
          </div>
        );

      // Levels 41-50: Timing & Patience
      case 'wait-auto-win':
      case 'wait-storm-stops':
      case 'wait-objects-still':
      case 'wait-timer':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center">
              <div className="text-6xl animate-pulse">
                {config.solution === 'wait-storm-stops' ? '🌪️' : config.solution === 'wait-objects-still' ? '📦' : '⏰'}
              </div>
            </div>
            <div className="text-center text-sm text-rose-700 dark:text-rose-300">
              Wait... {timer}s
            </div>
          </div>
        );

      case 'tap-exact-second':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div onClick={handleTimingTap} className="w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center cursor-pointer">
              <div className="text-8xl font-bold text-rose-500">{timer}</div>
            </div>
            <div className="text-center text-sm text-rose-700 dark:text-rose-300">
              Tap when timer shows {typeof config.data?.target === 'number' ? config.data.target : 3}!
            </div>
          </div>
        );

      case 'one-slow-tap':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="flex justify-center">
              <Button onClick={handleSlowTap} size="lg" className="bg-rose-500 hover:bg-rose-600">
                Tap Slowly
              </Button>
            </div>
            <div className="text-center text-sm text-rose-700 dark:text-rose-300">
              Wait at least 2 seconds before tapping
            </div>
          </div>
        );

      case 'hold-button-2s':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="flex justify-center">
              <Button
                onMouseDown={handlePressStart}
                onMouseUp={handlePressEnd}
                onMouseLeave={handlePressEnd}
                onTouchStart={handlePressStart}
                onTouchEnd={handlePressEnd}
                size="lg"
                className={`bg-rose-500 hover:bg-rose-600 ${isPressed ? 'scale-110' : 'scale-100'} transition-transform`}
              >
                Hold Me
              </Button>
            </div>
          </div>
        );

      case 'one-tap-timing':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="flex justify-center">
              <Button onClick={handleTimingTap} size="lg" className="bg-rose-500 hover:bg-rose-600">
                Tap Now!
              </Button>
            </div>
            <div className="text-center text-sm text-rose-700 dark:text-rose-300">
              Timer: {timer}s (Tap between 2-4s)
            </div>
          </div>
        );

      case 'tap-after-blink':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div onClick={() => timer % 3 === 0 && handleWin()} className="w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center cursor-pointer">
              <div className="text-8xl">{timer % 3 === 0 ? '😉' : '👁️'}</div>
            </div>
          </div>
        );

      case 'wait-mute-appears':
      case 'wait-ok-appears':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center">
              {showHiddenButton ? (
                <Button onClick={handleWin} size="lg" className="bg-rose-500 hover:bg-rose-600">
                  {config.solution === 'wait-ok-appears' ? 'OK' : '🔇'}
                </Button>
              ) : (
                <div className="text-6xl animate-pulse">⏰</div>
              )}
            </div>
          </div>
        );

      // Levels 51-60: Advanced UI
      case 'drag-lock':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div
              ref={containerRef}
              onMouseMove={handleDrag}
              onMouseUp={handleDragEnd}
              onTouchMove={handleDrag}
              onTouchEnd={handleDragEnd}
              className="relative w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center"
            >
              <Heart className="w-24 h-24 text-rose-500 fill-rose-500" />
              <div
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
                className="absolute cursor-move touch-none"
                style={{ left: `${dragPosition.x}%`, top: `${dragPosition.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <Lock className="w-16 h-16 text-gray-700" />
              </div>
            </div>
          </div>
        );

      case 'pinch-ui':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="flex justify-center">
              <Button onClick={handleWin} size="lg" className="bg-rose-500 hover:bg-rose-600">
                Pinch or Click to Resize
              </Button>
            </div>
          </div>
        );

      case 'drag-text-label':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div
              ref={containerRef}
              onMouseMove={handleDrag}
              onMouseUp={handleDragEnd}
              onTouchMove={handleDrag}
              onTouchEnd={handleDragEnd}
              className="relative w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center"
            >
              <Button className="bg-rose-500 hover:bg-rose-600">Continue</Button>
              <div
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
                className="absolute cursor-move touch-none text-2xl font-bold text-gray-700"
                style={{ left: `${dragPosition.x}%`, top: `${dragPosition.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                BLOCKED
              </div>
            </div>
          </div>
        );

      case 'long-press-bg':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div
              onMouseDown={handlePressStart}
              onMouseUp={handlePressEnd}
              onMouseLeave={handlePressEnd}
              onTouchStart={handlePressStart}
              onTouchEnd={handlePressEnd}
              className="w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center cursor-pointer"
            >
              <div className="text-6xl">{isPressed ? '🔍' : '❓'}</div>
            </div>
          </div>
        );

      case 'remove-overlay':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="relative w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center">
              <Button className="bg-rose-500 hover:bg-rose-600">Continue</Button>
              <div
                onClick={() => { setProgress(100); handleWin(); }}
                className="absolute inset-0 bg-gray-900/50 flex items-center justify-center cursor-pointer"
              >
                <div className="text-white text-2xl">Tap to remove</div>
              </div>
            </div>
          </div>
        );

      case 'rotate-ui':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="flex justify-center">
              <div
                onClick={() => setProgress((p) => p + 45)}
                className="cursor-pointer transition-transform"
                style={{ transform: `rotate(${progress}deg)` }}
              >
                <Button className="bg-rose-500 hover:bg-rose-600">Rotate Me</Button>
              </div>
            </div>
          </div>
        );

      case 'scroll-invisible':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div
              onScroll={(e) => {
                const target = e.target as HTMLDivElement;
                if (target.scrollTop > 100) handleWin();
              }}
              className="w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl overflow-y-scroll"
            >
              <div className="h-96" />
              <div className="text-center text-rose-500 font-bold">You found it!</div>
            </div>
          </div>
        );

      case 'tap-checkmark':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="flex justify-center">
              <Check onClick={handleWin} className="w-24 h-24 text-rose-500 cursor-pointer hover:scale-110 transition-transform" />
            </div>
          </div>
        );

      case 'tap-undo':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="flex justify-center">
              <Undo onClick={handleWin} className="w-24 h-24 text-rose-500 cursor-pointer hover:scale-110 transition-transform" />
            </div>
          </div>
        );

      // Levels 61-70: Multi-Step
      case 'remove-rain-then-light':
      case 'calm-then-tap':
      case 'combine-then-use':
      case 'disable-noise-solve':
      case 'fix-error-continue':
      case 'charge-then-tap':
      case 'rotate-key-unlock':
      case 'clean-reveal-button':
      case 'arrange-confirm':
      case 'prepare-act':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="space-y-2">
              <Button
                onClick={() => handleStepAction(1)}
                variant={step >= 1 ? 'default' : 'outline'}
                className="w-full"
                disabled={step >= 1}
              >
                Step 1 {step >= 1 && '✓'}
              </Button>
              <Button
                onClick={() => handleStepAction(2)}
                variant={step >= 2 ? 'default' : 'outline'}
                className="w-full"
                disabled={step < 1}
              >
                Step 2 {step >= 2 && '✓'}
              </Button>
            </div>
            <div className="text-center text-sm text-rose-700 dark:text-rose-300">
              Complete in order!
            </div>
          </div>
        );

      // Levels 71-80: Hard Misdirection
      case 'opposite-action':
        return (
          <div className="space-y-4" onClick={handleBackgroundTap}>
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="flex justify-center">
              <Button onClick={(e) => { e.stopPropagation(); handleOppositeAction(); }} className="bg-rose-500 hover:bg-rose-600">
                Continue
              </Button>
            </div>
          </div>
        );

      case 'wait-to-win':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div onClick={handleFail} className="w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center cursor-pointer">
              <div className="text-6xl animate-pulse">⏰</div>
            </div>
            <div className="text-center text-sm text-rose-700 dark:text-rose-300">
              Don't do anything... {timer}s
            </div>
          </div>
        );

      case 'tap-wrong-after-delay':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="flex gap-4 justify-center">
              <div onClick={handleFail} className="w-24 h-24 bg-rose-500 rounded-full cursor-pointer" />
              {showHiddenButton && (
                <div onClick={handleWin} className="w-24 h-24 bg-blue-500 rounded-full cursor-pointer animate-pulse" />
              )}
            </div>
          </div>
        );

      case 'fail-first':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="flex justify-center">
              <Button onClick={handleFailFirst} className="bg-rose-500 hover:bg-rose-600">
                {hasFailed ? 'Try Again' : 'Continue'}
              </Button>
            </div>
          </div>
        );

      case 'tap-lose-screen-button':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="flex justify-center">
              <Button onClick={handleWin} className="bg-rose-500 hover:bg-rose-600">
                Hidden Continue
              </Button>
            </div>
          </div>
        );

      case 'tap-specific-word':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="text-center text-lg">
              Find the word{' '}
              <span onClick={handleWin} className="text-rose-500 font-bold cursor-pointer hover:underline">
                {typeof config.data?.word === 'string' ? config.data.word : 'love'}
              </span>
              {' '}and tap it
            </div>
          </div>
        );

      case 'tap-empty-area':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div onClick={handleBackgroundTap} className="w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl cursor-pointer" />
          </div>
        );

      case 'delayed-win':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center">
              <div className="text-6xl animate-pulse">⏰</div>
            </div>
            <div className="text-center text-sm text-rose-700 dark:text-rose-300">
              {timer}s...
            </div>
          </div>
        );

      case 'tap-background-element':
        return (
          <div className="space-y-4" onClick={handleBackgroundTap}>
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="w-full h-64 bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20 rounded-xl cursor-pointer" />
          </div>
        );

      case 'tap-screen-edge':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="relative w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl">
              <div onClick={handleWin} className="absolute top-0 left-0 w-full h-4 cursor-pointer hover:bg-rose-200 dark:hover:bg-rose-800" />
              <div onClick={handleWin} className="absolute bottom-0 left-0 w-full h-4 cursor-pointer hover:bg-rose-200 dark:hover:bg-rose-800" />
              <div onClick={handleWin} className="absolute top-0 left-0 w-4 h-full cursor-pointer hover:bg-rose-200 dark:hover:bg-rose-800" />
              <div onClick={handleWin} className="absolute top-0 right-0 w-4 h-full cursor-pointer hover:bg-rose-200 dark:hover:bg-rose-800" />
            </div>
          </div>
        );

      // Levels 81-90: Emotional / Calm
      case 'drag-photos-collage':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  onClick={() => {
                    setProgress((p) => p + 25);
                    if (progress >= 75) handleWin();
                  }}
                  className="w-full h-24 bg-rose-200 dark:bg-rose-800 rounded-lg cursor-pointer hover:scale-105 transition-transform flex items-center justify-center"
                >
                  <Camera className="w-12 h-12 text-rose-500" />
                </div>
              ))}
            </div>
          </div>
        );

      case 'drag-letters-slots':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="flex gap-2 justify-center">
              {['L', 'O', 'V', 'E'].map((letter, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setProgress((p) => p + 25);
                    if (progress >= 75) handleWin();
                  }}
                  className="w-16 h-16 bg-rose-500 rounded-lg cursor-pointer hover:scale-110 transition-transform flex items-center justify-center text-white font-bold text-2xl"
                >
                  {letter}
                </div>
              ))}
            </div>
          </div>
        );

      case 'merge-photo-pieces':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="flex gap-4 justify-center">
              <div onClick={() => setProgress(50)} className="w-32 h-32 bg-rose-200 dark:bg-rose-800 rounded-lg cursor-pointer">
                <ImageIcon className="w-full h-full text-rose-500 p-4" />
              </div>
              <div onClick={() => { if (progress >= 50) handleWin(); }} className="w-32 h-32 bg-rose-200 dark:bg-rose-800 rounded-lg cursor-pointer">
                <ImageIcon className="w-full h-full text-rose-500 p-4" />
              </div>
            </div>
          </div>
        );

      case 'choose-true-promise':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="space-y-2">
              <Button onClick={handleWin} className="w-full bg-rose-500 hover:bg-rose-600">I will always love you</Button>
              <Button onClick={handleWin} className="w-full bg-rose-500 hover:bg-rose-600">I will cherish every moment</Button>
              <Button onClick={handleWin} className="w-full bg-rose-500 hover:bg-rose-600">I will be there forever</Button>
            </div>
          </div>
        );

      case 'block-falling-objects':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="relative w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl overflow-hidden">
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-6xl">❤️</div>
              {fallingObjects.map((obj) => (
                <div
                  key={obj.id}
                  onClick={() => handleObjectBlock(obj.id)}
                  className="absolute cursor-pointer text-2xl"
                  style={{ left: `${obj.x}%`, top: `${obj.y}%` }}
                >
                  💔
                </div>
              ))}
            </div>
            <div className="text-center text-sm text-rose-700 dark:text-rose-300">
              Blocked: {blockedCount}/5
            </div>
          </div>
        );

      case 'hold-hands-together':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="flex gap-8 justify-center">
              <div
                onMouseDown={() => setProgress((p) => p + 50)}
                onTouchStart={() => setProgress((p) => p + 50)}
                className="text-6xl cursor-pointer"
              >
                🤚
              </div>
              <div
                onMouseDown={() => {
                  if (progress >= 50) handleWin();
                }}
                onTouchStart={() => {
                  if (progress >= 50) handleWin();
                }}
                className="text-6xl cursor-pointer"
              >
                🤚
              </div>
            </div>
          </div>
        );

      case 'minimal-tap':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div onClick={handleWin} className="w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center cursor-pointer">
              <div className="text-6xl">✨</div>
            </div>
          </div>
        );

      case 'slow-swipe':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div
              onTouchStart={handleSwipeStart}
              onTouchEnd={handleSwipeEnd}
              onMouseDown={handleSwipeStart}
              onMouseUp={handleSwipeEnd}
              className="w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center cursor-pointer"
            >
              <div className="text-6xl">👆</div>
            </div>
          </div>
        );

      case 'hold-without-moving':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div
              onMouseDown={handlePressStart}
              onMouseUp={handlePressEnd}
              onMouseMove={(e) => {
                if (isPressed && e.movementX !== 0 && e.movementY !== 0) {
                  handleFail();
                  setIsPressed(false);
                }
              }}
              onMouseLeave={handlePressEnd}
              onTouchStart={handlePressStart}
              onTouchEnd={handlePressEnd}
              className="w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center cursor-pointer"
            >
              <div className="text-6xl">{isPressed ? '🤫' : '🤲'}</div>
            </div>
            <div className="text-center text-sm text-rose-700 dark:text-rose-300">
              {isPressed ? 'Hold still...' : 'Press and hold without moving'}
            </div>
          </div>
        );

      case 'drag-memory-heart':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div
              ref={containerRef}
              onMouseMove={handleDrag}
              onMouseUp={handleDragEnd}
              onTouchMove={handleDrag}
              onTouchEnd={handleDragEnd}
              className="relative w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Heart className="w-24 h-24 text-rose-500 fill-rose-500" />
              </div>
              <div
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
                className="absolute bottom-8 left-8 cursor-move touch-none"
                style={{ left: `${dragPosition.x}%`, top: `${dragPosition.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <Sparkles className="w-12 h-12 text-yellow-500" />
              </div>
            </div>
          </div>
        );

      // Levels 91-100: Finale
      case 'multi-step-patience':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="space-y-2">
              <Button onClick={() => handleStepAction(1)} variant={step >= 1 ? 'default' : 'outline'} className="w-full" disabled={step >= 1}>
                Wait {step >= 1 && '✓'}
              </Button>
              <Button onClick={() => handleStepAction(2)} variant={step >= 2 ? 'default' : 'outline'} className="w-full" disabled={step < 1}>
                Then Act {step >= 2 && '✓'}
              </Button>
            </div>
          </div>
        );

      case 'ui-timing':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="flex justify-center">
              <Button onClick={() => timer % 2 === 0 && handleWin()} className="bg-rose-500 hover:bg-rose-600">
                Tap on even seconds
              </Button>
            </div>
            <div className="text-center text-sm text-rose-700 dark:text-rose-300">
              Timer: {timer}s
            </div>
          </div>
        );

      case 'emotional-logic':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="flex justify-center">
              <Heart onClick={handleWin} className="w-32 h-32 text-rose-500 fill-rose-500 cursor-pointer hover:scale-110 transition-transform animate-pulse" />
            </div>
          </div>
        );

      case 'fake-ending':
        return (
          <div className="space-y-4" onClick={handleBackgroundTap}>
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="text-center text-6xl">🎉</div>
            <p className="text-center text-sm text-rose-700 dark:text-rose-300">
              (But wait... tap anywhere to continue)
            </p>
          </div>
        );

      case 'trust-wait':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center">
              <div className="text-6xl animate-pulse">🤝</div>
            </div>
            <div className="text-center text-sm text-rose-700 dark:text-rose-300">
              Trust and wait... {timer}s
            </div>
          </div>
        );

      case 'perfect-timing-tap':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="flex justify-center">
              <Button onClick={handleTimingTap} size="lg" className="bg-rose-500 hover:bg-rose-600">
                Tap Now!
              </Button>
            </div>
            <div className="text-center text-sm text-rose-700 dark:text-rose-300">
              Tap when timer is divisible by 3: {timer}s
            </div>
          </div>
        );

      case 'everything-movable':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  onClick={() => {
                    setProgress((p) => p + 20);
                    if (progress >= 80) handleWin();
                  }}
                  className="w-full h-20 bg-rose-500 rounded-lg cursor-pointer hover:scale-110 transition-transform"
                />
              ))}
            </div>
          </div>
        );

      case 'only-text-works':
        return (
          <div className="space-y-4">
            <h2 onClick={handleWin} className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center cursor-pointer hover:underline">
              {config.instruction}
            </h2>
            <div className="flex justify-center">
              <Button onClick={handleFail} className="bg-rose-500 hover:bg-rose-600">
                Don't Click
              </Button>
            </div>
          </div>
        );

      case 'minimal-one-tap':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 text-center">{config.instruction}</h2>
            <div onClick={handleWin} className="w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center cursor-pointer">
              <div className="w-4 h-4 bg-rose-500 rounded-full" />
            </div>
          </div>
        );

      case 'no-instruction-learned':
        return (
          <div className="space-y-4">
            <div onClick={handleWin} className="w-full h-64 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center cursor-pointer">
              <Heart className="w-32 h-32 text-rose-500 fill-rose-500 animate-pulse" />
            </div>
            <p className="text-center text-sm text-rose-700 dark:text-rose-300">
              (Use what you've learned...)
            </p>
          </div>
        );

      default:
        return (
          <div className="space-y-4 text-center">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100">{config.instruction}</h2>
            <div className="text-rose-700 dark:text-rose-300">
              This level is not yet implemented.
            </div>
          </div>
        );
    }
  };

  return (
    <div ref={containerRef} className="space-y-8">
      {renderPuzzle()}
      {attempts > 0 && (
        <p className="text-center text-sm text-rose-700 dark:text-rose-300">
          Attempts: {attempts}/3
        </p>
      )}
    </div>
  );
}
