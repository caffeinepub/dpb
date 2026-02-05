export interface Promises100LevelConfig {
  instruction: string;
  solution: 
    | 'wait-quietly' | 'slow-tap' | 'long-press-hands' | 'drag-smile-up' | 'do-not-exit'
    | 'drag-blanket-down' | 'tap-blinking-heart' | 'block-stone' | 'hold-screen-calm' | 'one-gentle-tap'
    | 'choose-happy-emoji' | 'ignore-angry' | 'wait-tears-stop' | 'pick-soft-words' | 'dont-rush-timer'
    | 'hold-shaking-heart' | 'silence-wins' | 'read-full-text' | 'choose-hug' | 'stay-present'
    | 'share-umbrella' | 'block-rain' | 'warm-hands' | 'fix-cup' | 'give-water'
    | 'close-window' | 'sit-together' | 'light-candle' | 'clean-room' | 'stay-awake'
    | 'choose-patience' | 'ignore-phone' | 'comfort-not-solve' | 'heart-over-logic' | 'dont-interrupt'
    | 'wait-for-reply' | 'accept-mistake' | 'say-sorry' | 'gentle-smile' | 'quiet-support'
    | 'try-again' | 'one-correct-action' | 'perfect-timing-hug' | 'dont-overdo' | 'balance-emotions'
    | 'remove-jealousy' | 'stay-steady' | 'dont-react-fast' | 'let-moment-pass' | 'promise-fulfilled'
    | 'trust-no-proof' | 'ignore-rumors' | 'dont-check-phone' | 'give-space' | 'believe-words'
    | 'choose-honesty' | 'wait-calmly' | 'let-go-fear' | 'stay-confident' | 'trust-wins'
    | 'do-nothing' | 'just-stay' | 'breathe-together' | 'hold-softly' | 'accept-silence'
    | 'stay-strong' | 'calm-storm' | 'dont-break' | 'stay-kind' | 'still-together'
    | 'choose-forever' | 'ignore-temptation' | 'focus-one' | 'promise-again' | 'protect-bond'
    | 'choose-us' | 'stay-loyal' | 'keep-secret' | 'be-honest' | 'stand-together'
    | 'create-memory' | 'save-photo' | 'frame-moment' | 'smile-slowly' | 'hold-forever'
    | 'stay-warm' | 'soft-touch' | 'gentle-care' | 'peaceful-moment' | 'love-safe'
    | 'no-instructions' | 'use-instinct' | 'one-calm-action' | 'minimal-movement' | 'perfect-patience'
    | 'final-promise' | 'everything-learned' | 'quiet-happiness' | 'one-last-hold' | 'final-screen';
  data?: Record<string, unknown>;
}

export const PROMISES_100_LEVEL_CONFIGS: Record<number, Promises100LevelConfig> = {
  1: { instruction: "I will listen 👂❤️", solution: 'wait-quietly', data: { duration: 3000 } },
  2: { instruction: "Wake gently 😴🤍", solution: 'slow-tap', data: { maxSpeed: 30 } },
  3: { instruction: "Hold hand 🤝❤️", solution: 'long-press-hands', data: { duration: 2000 } },
  4: { instruction: "Make smile 😔➡️😊", solution: 'drag-smile-up', data: {} },
  5: { instruction: "Stay 🏠❤️", solution: 'do-not-exit', data: { duration: 3000 } },
  6: { instruction: "Care 🛌💖", solution: 'drag-blanket-down', data: {} },
  7: { instruction: "Notice 👀💓", solution: 'tap-blinking-heart', data: {} },
  8: { instruction: "Protect 🛡️❤️", solution: 'block-stone', data: {} },
  9: { instruction: "Stay calm 🧘‍♀️💞", solution: 'hold-screen-calm', data: { duration: 2500 } },
  10: { instruction: "Simple love 💖", solution: 'one-gentle-tap', data: {} },
  
  11: { instruction: "Choose joy 😊", solution: 'choose-happy-emoji', data: {} },
  12: { instruction: "Ignore anger 😠", solution: 'ignore-angry', data: { duration: 2000 } },
  13: { instruction: "Wait for healing 😢➡️🙂", solution: 'wait-tears-stop', data: { duration: 3000 } },
  14: { instruction: "Soft words 💬❤️", solution: 'pick-soft-words', data: {} },
  15: { instruction: "Don't rush ⏰", solution: 'dont-rush-timer', data: { duration: 3000 } },
  16: { instruction: "Steady heart 💓", solution: 'hold-shaking-heart', data: { duration: 2000 } },
  17: { instruction: "Silence 🤫", solution: 'silence-wins', data: { duration: 2500 } },
  18: { instruction: "Read fully 📖", solution: 'read-full-text', data: {} },
  19: { instruction: "Hug over gift 🤗", solution: 'choose-hug', data: {} },
  20: { instruction: "Be present 🧍‍♂️❤️", solution: 'stay-present', data: { duration: 2000 } },
  
  21: { instruction: "Share ☔❤️", solution: 'share-umbrella', data: {} },
  22: { instruction: "Shield 🌧️", solution: 'block-rain', data: {} },
  23: { instruction: "Warm 🔥✋", solution: 'warm-hands', data: { count: 5 } },
  24: { instruction: "Fix ☕", solution: 'fix-cup', data: {} },
  25: { instruction: "Quench 💧", solution: 'give-water', data: {} },
  26: { instruction: "Peace 🪟", solution: 'close-window', data: {} },
  27: { instruction: "Together 🛋️", solution: 'sit-together', data: {} },
  28: { instruction: "Light 🕯️", solution: 'light-candle', data: {} },
  29: { instruction: "Tidy 🧹", solution: 'clean-room', data: {} },
  30: { instruction: "Awake 🌙", solution: 'stay-awake', data: { duration: 2500 } },
  
  31: { instruction: "Patience 🕊️", solution: 'choose-patience', data: {} },
  32: { instruction: "Focus 🚫📱", solution: 'ignore-phone', data: { duration: 2000 } },
  33: { instruction: "Comfort 🤍", solution: 'comfort-not-solve', data: {} },
  34: { instruction: "Heart ❤️🧠", solution: 'heart-over-logic', data: {} },
  35: { instruction: "Listen 🤐", solution: 'dont-interrupt', data: { duration: 2500 } },
  36: { instruction: "Wait 📩", solution: 'wait-for-reply', data: { duration: 3000 } },
  37: { instruction: "Accept 🙏", solution: 'accept-mistake', data: {} },
  38: { instruction: "Sorry 🥺", solution: 'say-sorry', data: {} },
  39: { instruction: "Smile 🙂", solution: 'gentle-smile', data: {} },
  40: { instruction: "Support 🤝", solution: 'quiet-support', data: { duration: 2000 } },
  
  41: { instruction: "Try 🔁❤️", solution: 'try-again', data: {} },
  42: { instruction: "Act 🎯", solution: 'one-correct-action', data: {} },
  43: { instruction: "Time ⏱️🤗", solution: 'perfect-timing-hug', data: {} },
  44: { instruction: "Balance ⚖️", solution: 'dont-overdo', data: {} },
  45: { instruction: "Equilibrium ⚖️❤️", solution: 'balance-emotions', data: {} },
  46: { instruction: "Trust 💔❌", solution: 'remove-jealousy', data: {} },
  47: { instruction: "Steady 🧍‍♂️", solution: 'stay-steady', data: { duration: 2500 } },
  48: { instruction: "Think 🐢", solution: 'dont-react-fast', data: { delay: 2000 } },
  49: { instruction: "Release 🌬️", solution: 'let-moment-pass', data: { duration: 2000 } },
  50: { instruction: "Fulfill 💝", solution: 'promise-fulfilled', data: {} },
  
  51: { instruction: "Faith 🔐", solution: 'trust-no-proof', data: { duration: 2500 } },
  52: { instruction: "Ignore 🚫🗣️", solution: 'ignore-rumors', data: { duration: 2000 } },
  53: { instruction: "Privacy 📵", solution: 'dont-check-phone', data: { duration: 2500 } },
  54: { instruction: "Space 🌌", solution: 'give-space', data: {} },
  55: { instruction: "Believe 🗣️❤️", solution: 'believe-words', data: {} },
  56: { instruction: "Truth 🪞", solution: 'choose-honesty', data: {} },
  57: { instruction: "Calm 🕰️", solution: 'wait-calmly', data: { duration: 3000 } },
  58: { instruction: "Courage 😌", solution: 'let-go-fear', data: {} },
  59: { instruction: "Secure 💪", solution: 'stay-confident', data: { duration: 2000 } },
  60: { instruction: "Trust 💍", solution: 'trust-wins', data: {} },
  
  61: { instruction: "Be 🫂", solution: 'do-nothing', data: { duration: 3000 } },
  62: { instruction: "Stay 🧍‍♂️❤️", solution: 'just-stay', data: { duration: 2500 } },
  63: { instruction: "Breathe 🌬️", solution: 'breathe-together', data: { duration: 2000 } },
  64: { instruction: "Gentle 🤍", solution: 'hold-softly', data: { duration: 2000 } },
  65: { instruction: "Quiet 🤫", solution: 'accept-silence', data: { duration: 3000 } },
  66: { instruction: "Strong 💪", solution: 'stay-strong', data: { duration: 2000 } },
  67: { instruction: "Calm ⛈️➡️🌤️", solution: 'calm-storm', data: { duration: 3000 } },
  68: { instruction: "Endure 🧱", solution: 'dont-break', data: { duration: 2500 } },
  69: { instruction: "Kind 🌸", solution: 'stay-kind', data: {} },
  70: { instruction: "Together 💞", solution: 'still-together', data: {} },
  
  71: { instruction: "Forever ♾️", solution: 'choose-forever', data: {} },
  72: { instruction: "Faithful 🚫", solution: 'ignore-temptation', data: { duration: 2000 } },
  73: { instruction: "One 👁️❤️", solution: 'focus-one', data: {} },
  74: { instruction: "Renew ✨", solution: 'promise-again', data: {} },
  75: { instruction: "Guard 🔗", solution: 'protect-bond', data: {} },
  76: { instruction: "Us 👫", solution: 'choose-us', data: {} },
  77: { instruction: "Loyal 🛡️", solution: 'stay-loyal', data: { duration: 2500 } },
  78: { instruction: "Secret 🤐", solution: 'keep-secret', data: { duration: 2000 } },
  79: { instruction: "Honest 🪞", solution: 'be-honest', data: {} },
  80: { instruction: "United 👫", solution: 'stand-together', data: {} },
  
  81: { instruction: "Remember 📸", solution: 'create-memory', data: {} },
  82: { instruction: "Save 💾", solution: 'save-photo', data: {} },
  83: { instruction: "Honor 🖼️", solution: 'frame-moment', data: {} },
  84: { instruction: "Savor 🙂", solution: 'smile-slowly', data: { duration: 2000 } },
  85: { instruction: "Eternal ♾️🤍", solution: 'hold-forever', data: { duration: 3000 } },
  86: { instruction: "Warmth 🔥", solution: 'stay-warm', data: {} },
  87: { instruction: "Tender ✨", solution: 'soft-touch', data: {} },
  88: { instruction: "Gentle 🌸", solution: 'gentle-care', data: {} },
  89: { instruction: "Peace 🕊️", solution: 'peaceful-moment', data: { duration: 2500 } },
  90: { instruction: "Safe 🏡❤️", solution: 'love-safe', data: {} },
  
  91: { instruction: "", solution: 'no-instructions', data: { duration: 2000 } },
  92: { instruction: "", solution: 'use-instinct', data: {} },
  93: { instruction: "", solution: 'one-calm-action', data: {} },
  94: { instruction: "", solution: 'minimal-movement', data: { duration: 2500 } },
  95: { instruction: "", solution: 'perfect-patience', data: { duration: 3500 } },
  96: { instruction: "", solution: 'final-promise', data: {} },
  97: { instruction: "", solution: 'everything-learned', data: {} },
  98: { instruction: "", solution: 'quiet-happiness', data: {} },
  99: { instruction: "", solution: 'one-last-hold', data: { duration: 2000 } },
  100: { instruction: "", solution: 'final-screen', data: { duration: 3000 } },
};

export function getPromises100LevelConfig(levelNumber: number): Promises100LevelConfig {
  return PROMISES_100_LEVEL_CONFIGS[levelNumber] || { instruction: "Feel with your heart", solution: 'wait-quietly', data: { duration: 2000 } };
}
