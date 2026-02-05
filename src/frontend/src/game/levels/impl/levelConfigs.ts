export interface LevelConfig {
  instruction: string;
  solution: 
    // Levels 1-10
    | 'tap-instruction' | 'drag-sun' | 'long-press' | 'count-hearts' | 'drag-button-up' 
    | 'drag-pillow' | 'double-tap-bulb' | 'drag-smile' | 'swipe-clean' | 'hold-love'
    // Levels 11-20
    | 'remove-pillow-alarm' | 'fix-broken-heart' | 'find-real-gift' | 'hold-toggle' 
    | 'erase-sadness' | 'drag-keyhole' | 'place-umbrella' | 'feed-cat' | 'swipe-left-page' 
    | 'slow-drag-heart'
    // Levels 21-30
    | 'tap-background' | 'wait-yes-stops' | 'swipe-popup-down' | 'drag-volume-icon' 
    | 'drag-instruction-away' | 'tap-ui-heart' | 'tap-page-number' | 'tap-pause-icon' 
    | 'drag-frame-border' | 'long-press-corner'
    // Levels 31-40
    | 'give-flower' | 'drag-hands-tears' | 'drag-shield-flame' | 'remove-distractions' 
    | 'balance-weights' | 'hold-anywhere' | 'tap-correct-promise' | 'wait-no-touch' 
    | 'drag-shadow-away' | 'rub-screen'
    // Levels 41-50
    | 'wait-auto-win' | 'tap-exact-second' | 'wait-storm-stops' | 'one-slow-tap' 
    | 'wait-objects-still' | 'wait-timer' | 'hold-button-2s' | 'one-tap-timing' 
    | 'tap-after-blink' | 'wait-mute-appears'
    // Levels 51-60
    | 'wait-ok-appears' | 'drag-lock' | 'pinch-ui' | 'drag-text-label' 
    | 'long-press-bg' | 'remove-overlay' | 'rotate-ui' | 'scroll-invisible' 
    | 'tap-checkmark' | 'tap-undo'
    // Levels 61-70
    | 'remove-rain-then-light' | 'calm-then-tap' | 'combine-then-use' | 'disable-noise-solve' 
    | 'fix-error-continue' | 'charge-then-tap' | 'rotate-key-unlock' | 'clean-reveal-button' 
    | 'arrange-confirm' | 'prepare-act'
    // Levels 71-80
    | 'opposite-action' | 'wait-to-win' | 'tap-wrong-after-delay' | 'fail-first' 
    | 'tap-lose-screen-button' | 'tap-specific-word' | 'tap-empty-area' | 'delayed-win' 
    | 'tap-background-element' | 'tap-screen-edge'
    // Levels 81-90
    | 'drag-photos-collage' | 'drag-letters-slots' | 'merge-photo-pieces' | 'choose-true-promise' 
    | 'block-falling-objects' | 'hold-hands-together' | 'minimal-tap' | 'slow-swipe' 
    | 'hold-without-moving' | 'drag-memory-heart'
    // Levels 91-100
    | 'multi-step-patience' | 'ui-timing' | 'emotional-logic' | 'fake-ending' 
    | 'trust-wait' | 'perfect-timing-tap' | 'everything-movable' | 'only-text-works' 
    | 'minimal-one-tap' | 'no-instruction-learned';
  data?: Record<string, unknown>;
}

export const LEVEL_CONFIGS: Record<number, LevelConfig> = {
  4: { instruction: "Count the hearts", solution: 'count-hearts', data: { count: 5 } },
  5: { instruction: "Press Start", solution: 'drag-button-up', data: { distance: 100 } },
  6: { instruction: "Wake her up", solution: 'drag-pillow', data: {} },
  7: { instruction: "Turn off the light", solution: 'double-tap-bulb', data: {} },
  8: { instruction: "Fix the smile", solution: 'drag-smile', data: {} },
  9: { instruction: "Clean the screen", solution: 'swipe-clean', data: { threshold: 80 } },
  10: { instruction: "Hold Love", solution: 'hold-love', data: { duration: 2000 } },
  
  11: { instruction: "Wake the alarm", solution: 'remove-pillow-alarm', data: {} },
  12: { instruction: "Fix the broken heart", solution: 'fix-broken-heart', data: {} },
  13: { instruction: "Find the real gift", solution: 'find-real-gift', data: { count: 3 } },
  14: { instruction: "Turn on love", solution: 'hold-toggle', data: { duration: 1500 } },
  15: { instruction: "Erase sadness", solution: 'erase-sadness', data: {} },
  16: { instruction: "Open the door", solution: 'drag-keyhole', data: {} },
  17: { instruction: "Stop the rain", solution: 'place-umbrella', data: {} },
  18: { instruction: "Feed the cat", solution: 'feed-cat', data: {} },
  19: { instruction: "Turn the page", solution: 'swipe-left-page', data: {} },
  20: { instruction: "Touch gently", solution: 'slow-drag-heart', data: { maxSpeed: 50 } },
  
  21: { instruction: "Tap Continue", solution: 'tap-background', data: {} },
  22: { instruction: "Select YES", solution: 'wait-yes-stops', data: { duration: 3000 } },
  23: { instruction: "Close the popup", solution: 'swipe-popup-down', data: {} },
  24: { instruction: "Increase volume", solution: 'drag-volume-icon', data: {} },
  25: { instruction: "Read carefully", solution: 'drag-instruction-away', data: {} },
  26: { instruction: "Accept love", solution: 'tap-ui-heart', data: {} },
  27: { instruction: "Turn the page", solution: 'tap-page-number', data: {} },
  28: { instruction: "Stop animation", solution: 'tap-pause-icon', data: {} },
  29: { instruction: "Fix alignment", solution: 'drag-frame-border', data: {} },
  30: { instruction: "Open menu", solution: 'long-press-corner', data: { duration: 1500 } },
  
  31: { instruction: "Make her happy", solution: 'give-flower', data: {} },
  32: { instruction: "Stop the tears", solution: 'drag-hands-tears', data: {} },
  33: { instruction: "Light the candle", solution: 'drag-shield-flame', data: {} },
  34: { instruction: "Fix the relationship", solution: 'remove-distractions', data: { count: 3 } },
  35: { instruction: "Balance the hearts", solution: 'balance-weights', data: {} },
  36: { instruction: "Calm down", solution: 'hold-anywhere', data: { duration: 3000 } },
  37: { instruction: "Choose the promise", solution: 'tap-correct-promise', data: {} },
  38: { instruction: "Build trust", solution: 'wait-no-touch', data: { duration: 3000 } },
  39: { instruction: "Remove the fear", solution: 'drag-shadow-away', data: {} },
  40: { instruction: "Warm the hands", solution: 'rub-screen', data: { count: 10 } },
  
  41: { instruction: "Don't touch", solution: 'wait-auto-win', data: { duration: 3000 } },
  42: { instruction: "Catch the moment", solution: 'tap-exact-second', data: { target: 3 } },
  43: { instruction: "Calm the storm", solution: 'wait-storm-stops', data: { duration: 4000 } },
  44: { instruction: "Stop rushing", solution: 'one-slow-tap', data: { minDelay: 2000 } },
  45: { instruction: "Let it settle", solution: 'wait-objects-still', data: { duration: 3000 } },
  46: { instruction: "Patience test", solution: 'wait-timer', data: { duration: 3000 } },
  47: { instruction: "Hold the button", solution: 'hold-button-2s', data: { duration: 2000 } },
  48: { instruction: "One chance", solution: 'one-tap-timing', data: {} },
  49: { instruction: "Blink", solution: 'tap-after-blink', data: {} },
  50: { instruction: "Silence", solution: 'wait-mute-appears', data: { duration: 2000 } },
  
  51: { instruction: "Press OK", solution: 'wait-ok-appears', data: { duration: 2000 } },
  52: { instruction: "Unlock the heart", solution: 'drag-lock', data: {} },
  53: { instruction: "Resize UI", solution: 'pinch-ui', data: {} },
  54: { instruction: "Remove obstacle", solution: 'drag-text-label', data: {} },
  55: { instruction: "Hidden option", solution: 'long-press-bg', data: { duration: 1500 } },
  56: { instruction: "Enable button", solution: 'remove-overlay', data: {} },
  57: { instruction: "Broken UI", solution: 'rotate-ui', data: {} },
  58: { instruction: "Scroll down", solution: 'scroll-invisible', data: {} },
  59: { instruction: "Confirm", solution: 'tap-checkmark', data: {} },
  60: { instruction: "Undo", solution: 'tap-undo', data: {} },
  
  61: { instruction: "Remove rain → Light candle", solution: 'remove-rain-then-light', data: {} },
  62: { instruction: "Calm character → Tap", solution: 'calm-then-tap', data: {} },
  63: { instruction: "Combine items → Use", solution: 'combine-then-use', data: {} },
  64: { instruction: "Disable noise → Solve", solution: 'disable-noise-solve', data: {} },
  65: { instruction: "Fix error → Continue", solution: 'fix-error-continue', data: {} },
  66: { instruction: "Charge heart → Tap", solution: 'charge-then-tap', data: {} },
  67: { instruction: "Rotate key → Unlock", solution: 'rotate-key-unlock', data: {} },
  68: { instruction: "Clean screen → Reveal button", solution: 'clean-reveal-button', data: {} },
  69: { instruction: "Arrange objects → Confirm", solution: 'arrange-confirm', data: {} },
  70: { instruction: "Prepare → Act", solution: 'prepare-act', data: {} },
  
  71: { instruction: "Tap to continue", solution: 'opposite-action', data: {} },
  72: { instruction: "Do something!", solution: 'wait-to-win', data: { duration: 3000 } },
  73: { instruction: "Tap the circle", solution: 'tap-wrong-after-delay', data: { delay: 2000 } },
  74: { instruction: "Don't fail", solution: 'fail-first', data: {} },
  75: { instruction: "Try again", solution: 'tap-lose-screen-button', data: {} },
  76: { instruction: "Find the word 'love' and tap it", solution: 'tap-specific-word', data: { word: 'love' } },
  77: { instruction: "Something is here", solution: 'tap-empty-area', data: {} },
  78: { instruction: "Wait for it...", solution: 'delayed-win', data: { duration: 3000 } },
  79: { instruction: "Look at the background", solution: 'tap-background-element', data: {} },
  80: { instruction: "Edge of love", solution: 'tap-screen-edge', data: {} },
  
  81: { instruction: "Build our memory", solution: 'drag-photos-collage', data: { count: 4 } },
  82: { instruction: "Match the letters", solution: 'drag-letters-slots', data: { word: 'LOVE' } },
  83: { instruction: "Fix the torn photo", solution: 'merge-photo-pieces', data: { pieces: 2 } },
  84: { instruction: "Choose your promise", solution: 'choose-true-promise', data: {} },
  85: { instruction: "Protect the heart", solution: 'block-falling-objects', data: { duration: 5000 } },
  86: { instruction: "Warm moment", solution: 'hold-hands-together', data: {} },
  87: { instruction: "Calm screen", solution: 'minimal-tap', data: {} },
  88: { instruction: "Gentle touch", solution: 'slow-swipe', data: {} },
  89: { instruction: "Soft hold", solution: 'hold-without-moving', data: { duration: 3000 } },
  90: { instruction: "Keep the memory", solution: 'drag-memory-heart', data: {} },
  
  91: { instruction: "Multi-step patience", solution: 'multi-step-patience', data: {} },
  92: { instruction: "UI + Timing", solution: 'ui-timing', data: {} },
  93: { instruction: "Emotional logic", solution: 'emotional-logic', data: {} },
  94: { instruction: "Congratulations! You won!", solution: 'fake-ending', data: {} },
  95: { instruction: "Trust the process", solution: 'trust-wait', data: { duration: 4000 } },
  96: { instruction: "Perfect timing", solution: 'perfect-timing-tap', data: {} },
  97: { instruction: "Everything is movable", solution: 'everything-movable', data: { count: 5 } },
  98: { instruction: "Only text works", solution: 'only-text-works', data: {} },
  99: { instruction: "Minimal screen", solution: 'minimal-one-tap', data: {} },
  100: { instruction: "", solution: 'no-instruction-learned', data: {} },
};

export function getLevelConfig(levelNumber: number): LevelConfig {
  return LEVEL_CONFIGS[levelNumber] || { instruction: "Complete the challenge", solution: 'tap-instruction' };
}
