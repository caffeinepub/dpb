// Complete 100-level specification for "100 Promises I Kept"
// Each level has: SCENE, PROMISE, ACTION_TO_WIN, EMOJI_HINT, plus deterministic parameters

export interface Event4LevelData {
  levelNumber: number;
  scene: string;
  promise: string;
  actionToWin: string;
  emojiHint: string;
  // Deterministic parameters for gameplay
  params: {
    waitDuration?: number; // milliseconds
    holdDuration?: number; // milliseconds for long press
    tapTarget?: 'heart' | 'text' | 'center' | 'background' | 'edge-left' | 'edge-right' | 'edge-top' | 'edge-bottom' | 'corner-top-left' | 'corner-top-right' | 'corner-bottom-left' | 'corner-bottom-right' | 'fading-heart' | 'smallest-heart' | 'dull-heart' | 'hidden-corner-heart' | 'calm-emoji' | 'button-second' | 'door-third' | 'button-second-flash' | 'after-hint-disappears' | 'after-sound' | 'different-area-fourth' | 'behind-text' | 'bottom-left-edge' | 'heart-full-glow' | 'heart-instant' | 'center-when-stop';
    dragTarget?: 'umbrella' | 'text-off' | 'lightbulb-off' | 'brightness-up' | 'shadow-away' | 'word-down' | 'swipe-down';
    nthOccurrence?: number; // tap on nth occurrence
    ignoreElement?: boolean; // must not tap certain elements
    doNothing?: boolean; // win by doing nothing
    tapBetweenBeats?: boolean; // tap between heartbeats
    tapAtDimmest?: boolean; // tap glow at dimmest moment
    tapWhenExpanded?: boolean; // tap when breathing icon expanded
    followWithFinger?: boolean; // follow emoji without tapping
    tapLastTear?: boolean; // tap only the last falling tear
    waitUntilFilled?: boolean; // wait until heart fills 100%
    dragPuzzlePieces?: boolean; // drag 4 pieces into position
    tapCenterWhenAligned?: boolean; // tap center when moon aligns
    eraseBroken?: boolean; // swipe to erase word "Broken"
    longPressTopLeft?: boolean; // long press top-left corner
    doubleTapBottomRight?: boolean; // double-tap bottom-right corner
    repeatLevel10Action?: boolean; // repeat exact action from level 10
    longPressToEnlarge?: boolean; // long press to enlarge heart
    waitForSoundEnd?: boolean; // wait until sound ends
    tapMuteWait?: boolean; // tap mute then wait 2s
    chooseOption?: 'hug' | 'second-button' | 'dull-heart' | 'correct-button-after-return';
    ignoreCount?: number; // number of things to ignore
    restartCount?: number; // number of timer restarts to wait
    longPressWhenTimerReaches?: number; // long press when timer = X
  };
}

export const EVENT_4_LEVELS: Event4LevelData[] = [
  // LEVEL 1
  {
    levelNumber: 1,
    scene: "Black screen with one softly glowing heart in center",
    promise: "I will notice you",
    actionToWin: "Wait 3 seconds, then tap the heart",
    emojiHint: "👀❤️",
    params: { waitDuration: 3000, tapTarget: 'heart' }
  },
  // LEVEL 2
  {
    levelNumber: 2,
    scene: "Two buttons YES and NO, both inactive",
    promise: "I won't rush",
    actionToWin: "Do nothing for 5 seconds until YES activates",
    emojiHint: "⏳",
    params: { waitDuration: 5000, doNothing: false }
  },
  // LEVEL 3
  {
    levelNumber: 3,
    scene: "Crying emoji slowly moving left to right",
    promise: "I'll understand you",
    actionToWin: "Follow emoji with finger, do not tap",
    emojiHint: "🥺",
    params: { followWithFinger: true }
  },
  // LEVEL 4
  {
    levelNumber: 4,
    scene: "Locked heart with small timer",
    promise: "I'll be patient",
    actionToWin: "Long press heart for 7 seconds",
    emojiHint: "🔐",
    params: { holdDuration: 7000, tapTarget: 'heart' }
  },
  // LEVEL 5
  {
    levelNumber: 5,
    scene: "Screen shakes gently",
    promise: "I'll stay calm",
    actionToWin: "Hold finger steady anywhere",
    emojiHint: "🧘‍♂️",
    params: { holdDuration: 3000 }
  },
  // LEVEL 6
  {
    levelNumber: 6,
    scene: "Text says 'Tap anywhere'",
    promise: "I'll read carefully",
    actionToWin: "Tap the text itself",
    emojiHint: "📖",
    params: { tapTarget: 'text' }
  },
  // LEVEL 7
  {
    levelNumber: 7,
    scene: "Countdown from 5 to 0",
    promise: "I can wait",
    actionToWin: "Let timer finish without touching",
    emojiHint: "⏱️",
    params: { waitDuration: 5000, doNothing: true }
  },
  // LEVEL 8
  {
    levelNumber: 8,
    scene: "Two hearts, one fades slowly",
    promise: "I choose you",
    actionToWin: "Tap the fading heart",
    emojiHint: "💞",
    params: { tapTarget: 'fading-heart' }
  },
  // LEVEL 9
  {
    levelNumber: 9,
    scene: "Rain starts falling, umbrella icon above",
    promise: "I'll protect you",
    actionToWin: "Drag umbrella before rain hits heart",
    emojiHint: "☔",
    params: { dragTarget: 'umbrella' }
  },
  // LEVEL 10
  {
    levelNumber: 10,
    scene: "Completely silent dark screen",
    promise: "I'll be present",
    actionToWin: "Long press anywhere",
    emojiHint: "🤍",
    params: { holdDuration: 3000 }
  },
  // LEVEL 11
  {
    levelNumber: 11,
    scene: "Big START button blinking",
    promise: "I won't fall for tricks",
    actionToWin: "Tap background, not button",
    emojiHint: "🧠",
    params: { tapTarget: 'background' }
  },
  // LEVEL 12
  {
    levelNumber: 12,
    scene: "Angry emoji shaking",
    promise: "I'll wait for calm",
    actionToWin: "Wait until emoji stops",
    emojiHint: "😤➡️😌",
    params: { waitDuration: 3000, doNothing: true }
  },
  // LEVEL 13
  {
    levelNumber: 13,
    scene: "Many hearts floating",
    promise: "I choose carefully",
    actionToWin: "Tap smallest heart",
    emojiHint: "🔍❤️",
    params: { tapTarget: 'smallest-heart' }
  },
  // LEVEL 14
  {
    levelNumber: 14,
    scene: "Moving instruction text",
    promise: "I look beyond words",
    actionToWin: "Drag text off screen",
    emojiHint: "📝❌",
    params: { dragTarget: 'text-off' }
  },
  // LEVEL 15
  {
    levelNumber: 15,
    scene: "Disabled button with shadow",
    promise: "I remove doubts",
    actionToWin: "Drag shadow away",
    emojiHint: "🌫️",
    params: { dragTarget: 'shadow-away' }
  },
  // LEVEL 16
  {
    levelNumber: 16,
    scene: "Instruction says 'Tap fast'",
    promise: "I trust myself",
    actionToWin: "Tap slowly",
    emojiHint: "🐢",
    params: { waitDuration: 2000, tapTarget: 'center' }
  },
  // LEVEL 17
  {
    levelNumber: 17,
    scene: "Fast timer counting",
    promise: "No pressure",
    actionToWin: "Ignore timer",
    emojiHint: "😌",
    params: { waitDuration: 3000, doNothing: true }
  },
  // LEVEL 18
  {
    levelNumber: 18,
    scene: "Loud sound icons",
    promise: "I bring silence",
    actionToWin: "Mute all icons",
    emojiHint: "🔇",
    params: { ignoreCount: 3 }
  },
  // LEVEL 19
  {
    levelNumber: 19,
    scene: "Two paths, short and long",
    promise: "I take effort",
    actionToWin: "Choose longer path",
    emojiHint: "🛤️",
    params: { chooseOption: 'second-button' }
  },
  // LEVEL 20
  {
    levelNumber: 20,
    scene: "Screen vibrates",
    promise: "I stay steady",
    actionToWin: "Don't touch screen",
    emojiHint: "🧘‍♀️",
    params: { waitDuration: 3000, doNothing: true }
  },
  // LEVEL 21
  {
    levelNumber: 21,
    scene: "Black background. A candle in center. Wind lines move left to right.",
    promise: "I will protect you even when things are unstable.",
    actionToWin: "Drag finger over candle and HOLD to block wind for 4 seconds until flame glows.",
    emojiHint: "🕯️💨❤️",
    params: { holdDuration: 4000, tapTarget: 'center' }
  },
  // LEVEL 22
  {
    levelNumber: 22,
    scene: "Heart at top. Tears fall one by one.",
    promise: "I'll be there even for your last tear.",
    actionToWin: "Ignore first tears. Tap ONLY the last falling tear.",
    emojiHint: "💧❤️",
    params: { tapLastTear: true }
  },
  // LEVEL 23
  {
    levelNumber: 23,
    scene: "Empty heart outline slowly filling from bottom.",
    promise: "I'll wait till your heart is full.",
    actionToWin: "Do nothing until heart is 100% filled, then tap heart.",
    emojiHint: "❤️⏳",
    params: { waitUntilFilled: true, tapTarget: 'heart' }
  },
  // LEVEL 24
  {
    levelNumber: 24,
    scene: "Photo broken into 4 pieces floating slowly.",
    promise: "I'll fix what's broken.",
    actionToWin: "Drag pieces into correct position slowly; wrong order resets.",
    emojiHint: "🧩💔➡️❤️",
    params: { dragPuzzlePieces: true }
  },
  // LEVEL 25
  {
    levelNumber: 25,
    scene: "Loading bar at 30%, blinking 'Tap to speed up'.",
    promise: "I won't force things.",
    actionToWin: "Ignore text. Wait till loading completes naturally.",
    emojiHint: "⏳🤍",
    params: { waitDuration: 4000, doNothing: true }
  },
  // LEVEL 26
  {
    levelNumber: 26,
    scene: "Moon moving left to right in sky.",
    promise: "I'll find you even when you move away.",
    actionToWin: "Tap EXACT center of screen when moon aligns with center.",
    emojiHint: "🌙🎯",
    params: { tapCenterWhenAligned: true }
  },
  // LEVEL 27
  {
    levelNumber: 27,
    scene: "Door opens and closes repeatedly.",
    promise: "I'll enter at the right time.",
    actionToWin: "Tap door ONLY on the 3rd open.",
    emojiHint: "🚪⏱️",
    params: { nthOccurrence: 3, tapTarget: 'door-third' }
  },
  // LEVEL 28
  {
    levelNumber: 28,
    scene: "Button flashes ON and OFF.",
    promise: "I won't react too fast.",
    actionToWin: "Ignore first flash. Tap button on second flash only.",
    emojiHint: "✨🧠",
    params: { nthOccurrence: 2, tapTarget: 'button-second-flash' }
  },
  // LEVEL 29
  {
    levelNumber: 29,
    scene: "Heart visible only in shadow. Light bulb icon present.",
    promise: "I see you even in darkness.",
    actionToWin: "Drag light bulb OFF screen to reveal heart.",
    emojiHint: "💡🖤❤️",
    params: { dragTarget: 'lightbulb-off' }
  },
  // LEVEL 30
  {
    levelNumber: 30,
    scene: "Music note icons floating, soft sound playing.",
    promise: "I value peace.",
    actionToWin: "Tap mute icon, then wait 2 seconds.",
    emojiHint: "🎵🔇",
    params: { tapMuteWait: true }
  },
  // LEVEL 31
  {
    levelNumber: 31,
    scene: "Angry emoji shaking violently.",
    promise: "I won't react to anger.",
    actionToWin: "Do nothing until emoji calms down.",
    emojiHint: "😠➡️😌",
    params: { waitDuration: 3000, doNothing: true }
  },
  // LEVEL 32
  {
    levelNumber: 32,
    scene: "Gift box and Hug icon appear.",
    promise: "I choose love over things.",
    actionToWin: "Tap Hug icon, not gift.",
    emojiHint: "🎁❌🤗✅",
    params: { chooseOption: 'hug' }
  },
  // LEVEL 33
  {
    levelNumber: 33,
    scene: "Question appears, disappears, appears again.",
    promise: "I listen twice.",
    actionToWin: "Answer only when question appears second time.",
    emojiHint: "❓❓",
    params: { nthOccurrence: 2, tapTarget: 'center' }
  },
  // LEVEL 34
  {
    levelNumber: 34,
    scene: "Completely silent screen with timer hidden.",
    promise: "I respect silence.",
    actionToWin: "Wait exactly 10 seconds without touching.",
    emojiHint: "🤫⏳",
    params: { waitDuration: 10000, doNothing: true }
  },
  // LEVEL 35
  {
    levelNumber: 35,
    scene: "'YOU WIN' screen appears quickly.",
    promise: "I look deeper.",
    actionToWin: "Ignore text. Tap tiny heart hidden in corner.",
    emojiHint: "🎭❤️",
    params: { tapTarget: 'hidden-corner-heart' }
  },
  // LEVEL 36
  {
    levelNumber: 36,
    scene: "Text reads 'Broken Promise'.",
    promise: "I fix words, not hearts.",
    actionToWin: "Erase word 'Broken' by swiping.",
    emojiHint: "✏️❤️",
    params: { eraseBroken: true }
  },
  // LEVEL 37
  {
    levelNumber: 37,
    scene: "Happy, Sad, Angry emojis rotating.",
    promise: "I choose calm.",
    actionToWin: "Tap calm emoji only when others stop moving.",
    emojiHint: "😌",
    params: { tapTarget: 'calm-emoji' }
  },
  // LEVEL 38
  {
    levelNumber: 38,
    scene: "Timer keeps restarting at 3.",
    promise: "I don't panic.",
    actionToWin: "Let timer restart twice without touching.",
    emojiHint: "🔁⏳",
    params: { restartCount: 2, doNothing: true }
  },
  // LEVEL 39
  {
    levelNumber: 39,
    scene: "Heart beating slowly.",
    promise: "I move with you.",
    actionToWin: "Tap screen BETWEEN heartbeats, not on beat.",
    emojiHint: "❤️🎵",
    params: { tapBetweenBeats: true }
  },
  // LEVEL 40
  {
    levelNumber: 40,
    scene: "Blank screen.",
    promise: "I find you anywhere.",
    actionToWin: "Double-tap bottom-right corner.",
    emojiHint: "📐✨",
    params: { doubleTapBottomRight: true }
  },
  // LEVEL 41
  {
    levelNumber: 41,
    scene: "Big 'Retry' button blinking.",
    promise: "I don't repeat mistakes.",
    actionToWin: "Tap background, not button.",
    emojiHint: "🔁❌",
    params: { tapTarget: 'background' }
  },
  // LEVEL 42
  {
    levelNumber: 42,
    scene: "Instructions flash once then vanish.",
    promise: "I remember you.",
    actionToWin: "Perform shown action from memory (tap + hold).",
    emojiHint: "🧠❤️",
    params: { holdDuration: 2000, tapTarget: 'center' }
  },
  // LEVEL 43
  {
    levelNumber: 43,
    scene: "Objects moving randomly.",
    promise: "I bring stillness.",
    actionToWin: "Long press screen to freeze all objects.",
    emojiHint: "✋❄️",
    params: { holdDuration: 2000 }
  },
  // LEVEL 44
  {
    levelNumber: 44,
    scene: "Only floating text visible.",
    promise: "I move words aside.",
    actionToWin: "Drag text off screen.",
    emojiHint: "📝➡️",
    params: { dragTarget: 'text-off' }
  },
  // LEVEL 45
  {
    levelNumber: 45,
    scene: "Border blinking softly.",
    promise: "I notice edges.",
    actionToWin: "Tap border, not center.",
    emojiHint: "⬛✨",
    params: { tapTarget: 'edge-left' }
  },
  // LEVEL 46
  {
    levelNumber: 46,
    scene: "Timer rushing.",
    promise: "I ignore pressure.",
    actionToWin: "Ignore timer completely.",
    emojiHint: "⏱️❌",
    params: { waitDuration: 3000, doNothing: true }
  },
  // LEVEL 47
  {
    levelNumber: 47,
    scene: "Screen dark. Brightness icon visible.",
    promise: "I bring light.",
    actionToWin: "Drag brightness slider up fully.",
    emojiHint: "🌑➡️🌕",
    params: { dragTarget: 'brightness-up' }
  },
  // LEVEL 48
  {
    levelNumber: 48,
    scene: "Two correct buttons.",
    promise: "I choose wisely.",
    actionToWin: "Tap second button after 2 seconds.",
    emojiHint: "2️⃣❤️",
    params: { waitDuration: 2000, tapTarget: 'button-second' }
  },
  // LEVEL 49
  {
    levelNumber: 49,
    scene: "Heart cracking slowly.",
    promise: "I don't interrupt healing.",
    actionToWin: "Do nothing until cracks disappear.",
    emojiHint: "💔➡️❤️",
    params: { waitDuration: 4000, doNothing: true }
  },
  // LEVEL 50
  {
    levelNumber: 50,
    scene: "Button fading slowly.",
    promise: "I act at the right moment.",
    actionToWin: "Tap when opacity is very low.",
    emojiHint: "👁️✨",
    params: { tapTarget: 'center' }
  },
  // LEVELS 51-60
  {
    levelNumber: 51,
    scene: "Dark screen. A small loading circle rotates very slowly.",
    promise: "I won't leave just because it's slow.",
    actionToWin: "Do not touch the screen for 15 seconds until circle glows.",
    emojiHint: "⏳🤍",
    params: { waitDuration: 15000, doNothing: true }
  },
  {
    levelNumber: 52,
    scene: "Crying emoji loops again and again.",
    promise: "I stay until you finish crying.",
    actionToWin: "Wait until the crying animation completes fully one time.",
    emojiHint: "😢➡️😌",
    params: { waitDuration: 4000, doNothing: true }
  },
  {
    levelNumber: 53,
    scene: "Completely blank screen except thin border.",
    promise: "I'll find you even when you hide.",
    actionToWin: "Tap exactly on the left edge of the screen.",
    emojiHint: "📐👀",
    params: { tapTarget: 'edge-left' }
  },
  {
    levelNumber: 54,
    scene: "Heart beats very slowly with sound.",
    promise: "I'll match your rhythm.",
    actionToWin: "Tap screen exactly between two beats.",
    emojiHint: "❤️🎶",
    params: { tapBetweenBeats: true }
  },
  {
    levelNumber: 55,
    scene: "Promise text slowly fading away.",
    promise: "I won't let words disappear.",
    actionToWin: "Long press text until it becomes fully visible again.",
    emojiHint: "✋📜",
    params: { holdDuration: 3000, tapTarget: 'text' }
  },
  {
    levelNumber: 56,
    scene: "Comfort button appears instantly.",
    promise: "I give space when needed.",
    actionToWin: "Do not tap comfort button. Wait until it fades.",
    emojiHint: "🫂➡️🌫️",
    params: { waitDuration: 3000, doNothing: true }
  },
  {
    levelNumber: 57,
    scene: "Loud vibration waves from center.",
    promise: "I'll protect calm.",
    actionToWin: "Place finger on center and hold to block waves.",
    emojiHint: "🌊✋",
    params: { holdDuration: 3000, tapTarget: 'center' }
  },
  {
    levelNumber: 58,
    scene: "Cracks appear on screen glass.",
    promise: "I won't panic.",
    actionToWin: "Ignore cracks completely until they vanish.",
    emojiHint: "🪟😌",
    params: { waitDuration: 3000, doNothing: true }
  },
  {
    levelNumber: 59,
    scene: "Tears fall faster and faster.",
    promise: "I won't miss the last one.",
    actionToWin: "Tap only the final tear.",
    emojiHint: "💧🎯",
    params: { tapLastTear: true }
  },
  {
    levelNumber: 60,
    scene: "Calm dark screen with soft glow.",
    promise: "I know when to stop.",
    actionToWin: "Do nothing for 10 seconds.",
    emojiHint: "🤍🌌",
    params: { waitDuration: 10000, doNothing: true }
  },
  // LEVELS 61-70
  {
    levelNumber: 61,
    scene: "Hint text appears saying 'Tap now'.",
    promise: "I don't trust everything.",
    actionToWin: "Ignore hint. Tap screen after hint disappears.",
    emojiHint: "🚫📝",
    params: { tapTarget: 'after-hint-disappears' }
  },
  {
    levelNumber: 62,
    scene: "Screen shows 'YOU LOST'.",
    promise: "I accept failure.",
    actionToWin: "Press Retry once. Losing is required.",
    emojiHint: "🔄💔",
    params: { tapTarget: 'center' }
  },
  {
    levelNumber: 63,
    scene: "Retry button appears again.",
    promise: "I don't fear trying again.",
    actionToWin: "Tap Retry immediately to win.",
    emojiHint: "🔁❤️",
    params: { tapTarget: 'center' }
  },
  {
    levelNumber: 64,
    scene: "Trust text fades in and out.",
    promise: "I trust without proof.",
    actionToWin: "Do nothing at all.",
    emojiHint: "🕊️🤍",
    params: { waitDuration: 4000, doNothing: true }
  },
  {
    levelNumber: 65,
    scene: "Screen corners slightly glow one by one.",
    promise: "I notice small signs.",
    actionToWin: "Long press top-left corner.",
    emojiHint: "🔍✨",
    params: { longPressTopLeft: true, holdDuration: 2000 }
  },
  {
    levelNumber: 66,
    scene: "Two hearts. One shiny, one dull.",
    promise: "I choose real over flashy.",
    actionToWin: "Tap dull heart.",
    emojiHint: "❤️✨❌",
    params: { tapTarget: 'dull-heart' }
  },
  {
    levelNumber: 67,
    scene: "Choice buttons fade out quickly.",
    promise: "I wait for clarity.",
    actionToWin: "Wait until buttons return, then tap correct one.",
    emojiHint: "⏳👁️",
    params: { chooseOption: 'correct-button-after-return' }
  },
  {
    levelNumber: 68,
    scene: "Silent screen, then soft bell sound.",
    promise: "I listen carefully.",
    actionToWin: "Tap screen only after sound plays.",
    emojiHint: "🔔👂",
    params: { tapTarget: 'after-sound' }
  },
  {
    levelNumber: 69,
    scene: "Pattern repeats 3 times.",
    promise: "I break habits.",
    actionToWin: "On fourth repeat, tap different area.",
    emojiHint: "🔄❌",
    params: { nthOccurrence: 4, tapTarget: 'different-area-fourth' }
  },
  {
    levelNumber: 70,
    scene: "Same layout as Level 10.",
    promise: "I remember us.",
    actionToWin: "Repeat exact action from Level 10.",
    emojiHint: "🧠❤️",
    params: { repeatLevel10Action: true, holdDuration: 3000 }
  },
  // LEVELS 71-80
  {
    levelNumber: 71,
    scene: "Single white dot in center.",
    promise: "I focus on you.",
    actionToWin: "Wait 3 seconds, then tap dot.",
    emojiHint: "⚪👆",
    params: { waitDuration: 3000, tapTarget: 'center' }
  },
  {
    levelNumber: 72,
    scene: "One word floating slowly.",
    promise: "I move words gently.",
    actionToWin: "Drag word downward.",
    emojiHint: "📝⬇️",
    params: { dragTarget: 'word-down' }
  },
  {
    levelNumber: 73,
    scene: "Empty UI with faint pulse.",
    promise: "I feel presence.",
    actionToWin: "Long press center of screen.",
    emojiHint: "🤍✋",
    params: { holdDuration: 2000, tapTarget: 'center' }
  },
  {
    levelNumber: 74,
    scene: "Thin line drawing itself slowly.",
    promise: "I follow till the end.",
    actionToWin: "Tap where line finishes.",
    emojiHint: "📏➡️",
    params: { tapTarget: 'center' }
  },
  {
    levelNumber: 75,
    scene: "Very small heart icon.",
    promise: "I help you grow.",
    actionToWin: "Long press to enlarge heart.",
    emojiHint: "❤️📈",
    params: { longPressToEnlarge: true, holdDuration: 2000 }
  },
  {
    levelNumber: 76,
    scene: "Soft glow fading in and out.",
    promise: "I choose subtle love.",
    actionToWin: "Tap glow at dimmest moment.",
    emojiHint: "✨🌑",
    params: { tapAtDimmest: true }
  },
  {
    levelNumber: 77,
    scene: "Empty dark space.",
    promise: "I move with intention.",
    actionToWin: "Swipe downward slowly.",
    emojiHint: "⬇️🖤",
    params: { dragTarget: 'swipe-down' }
  },
  {
    levelNumber: 78,
    scene: "Calm background tone playing.",
    promise: "I let moments complete.",
    actionToWin: "Wait until sound ends fully.",
    emojiHint: "🎧⏳",
    params: { waitForSoundEnd: true }
  },
  {
    levelNumber: 79,
    scene: "Breathing icon expanding and shrinking.",
    promise: "I breathe with you.",
    actionToWin: "Tap screen when icon is fully expanded.",
    emojiHint: "🌬️❤️",
    params: { tapWhenExpanded: true }
  },
  {
    levelNumber: 80,
    scene: "Completely calm blank screen.",
    promise: "Peace needs nothing.",
    actionToWin: "Do nothing.",
    emojiHint: "🤍♾️",
    params: { waitDuration: 4000, doNothing: true }
  },
  // LEVELS 81-90
  {
    levelNumber: 81,
    scene: "No instructions, no hints.",
    promise: "I trust my heart.",
    actionToWin: "Tap screen once after 5 seconds.",
    emojiHint: "❤️🧭",
    params: { waitDuration: 5000, tapTarget: 'center' }
  },
  {
    levelNumber: 82,
    scene: "Multiple tricks from earlier levels combined.",
    promise: "I've learned.",
    actionToWin: "Observe first, act second.",
    emojiHint: "🧠✨",
    params: { waitDuration: 2000, tapTarget: 'center' }
  },
  {
    levelNumber: 83,
    scene: "'THE END' text appears.",
    promise: "I don't quit early.",
    actionToWin: "Tap behind the text.",
    emojiHint: "🎬❌",
    params: { tapTarget: 'behind-text' }
  },
  {
    levelNumber: 84,
    scene: "Timer + hold icon shown.",
    promise: "I balance time and touch.",
    actionToWin: "Long press exactly when timer reaches 2.",
    emojiHint: "⏱️✋",
    params: { longPressWhenTimerReaches: 2, holdDuration: 1000 }
  },
  {
    levelNumber: 85,
    scene: "Single heart blinking once.",
    promise: "I don't miss moments.",
    actionToWin: "Tap heart instantly when it appears.",
    emojiHint: "❤️⚡",
    params: { tapTarget: 'heart-instant' }
  },
  {
    levelNumber: 86,
    scene: "Fast-moving distractions around center.",
    promise: "I stay focused.",
    actionToWin: "Tap center only when distractions stop.",
    emojiHint: "🎯😌",
    params: { tapTarget: 'center-when-stop' }
  },
  {
    levelNumber: 87,
    scene: "Same logic as Level 7.",
    promise: "I remember patience.",
    actionToWin: "Let countdown finish without touching.",
    emojiHint: "⏳🧠",
    params: { waitDuration: 5000, doNothing: true }
  },
  {
    levelNumber: 88,
    scene: "Minimal UI with hidden edges.",
    promise: "I explore quietly.",
    actionToWin: "Tap bottom-left edge.",
    emojiHint: "📐👣",
    params: { tapTarget: 'bottom-left-edge' }
  },
  {
    levelNumber: 89,
    scene: "Heart glowing slowly in silence.",
    promise: "I hold on till it's real.",
    actionToWin: "Long press heart until full glow.",
    emojiHint: "❤️🔒",
    params: { tapTarget: 'heart-full-glow', holdDuration: 4000 }
  },
  {
    levelNumber: 90,
    scene: "Black screen with white text: 'You didn't solve puzzles. You kept promises.'",
    promise: "Forever.",
    actionToWin: "Do nothing.",
    emojiHint: "♾️💍",
    params: { waitDuration: 5000, doNothing: true }
  },
  // LEVELS 91-100 (Final 10 levels)
  {
    levelNumber: 91,
    scene: "No instructions, no hints.",
    promise: "I trust my heart.",
    actionToWin: "Tap screen once after 5 seconds.",
    emojiHint: "❤️🧭",
    params: { waitDuration: 5000, tapTarget: 'center' }
  },
  {
    levelNumber: 92,
    scene: "Multiple tricks from earlier levels combined.",
    promise: "I've learned.",
    actionToWin: "Observe first, act second.",
    emojiHint: "🧠✨",
    params: { waitDuration: 2000, tapTarget: 'center' }
  },
  {
    levelNumber: 93,
    scene: "'THE END' text appears.",
    promise: "I don't quit early.",
    actionToWin: "Tap behind the text.",
    emojiHint: "🎬❌",
    params: { tapTarget: 'behind-text' }
  },
  {
    levelNumber: 94,
    scene: "Timer + hold icon shown.",
    promise: "I balance time and touch.",
    actionToWin: "Long press exactly when timer reaches 2.",
    emojiHint: "⏱️✋",
    params: { longPressWhenTimerReaches: 2, holdDuration: 1000 }
  },
  {
    levelNumber: 95,
    scene: "Single heart blinking once.",
    promise: "I don't miss moments.",
    actionToWin: "Tap heart instantly when it appears.",
    emojiHint: "❤️⚡",
    params: { tapTarget: 'heart-instant' }
  },
  {
    levelNumber: 96,
    scene: "Fast-moving distractions around center.",
    promise: "I stay focused.",
    actionToWin: "Tap center only when distractions stop.",
    emojiHint: "🎯😌",
    params: { tapTarget: 'center-when-stop' }
  },
  {
    levelNumber: 97,
    scene: "Same logic as Level 7.",
    promise: "I remember patience.",
    actionToWin: "Let countdown finish without touching.",
    emojiHint: "⏳🧠",
    params: { waitDuration: 5000, doNothing: true }
  },
  {
    levelNumber: 98,
    scene: "Minimal UI with hidden edges.",
    promise: "I explore quietly.",
    actionToWin: "Tap bottom-left edge.",
    emojiHint: "📐👣",
    params: { tapTarget: 'bottom-left-edge' }
  },
  {
    levelNumber: 99,
    scene: "Heart glowing slowly in silence.",
    promise: "I hold on till it's real.",
    actionToWin: "Long press heart until full glow.",
    emojiHint: "❤️🔒",
    params: { tapTarget: 'heart-full-glow', holdDuration: 4000 }
  },
  {
    levelNumber: 100,
    scene: "Black screen with white text: 'You didn't solve puzzles. You kept promises.'",
    promise: "Forever.",
    actionToWin: "Do nothing.",
    emojiHint: "♾️💍",
    params: { waitDuration: 5000, doNothing: true }
  }
];

export function getEvent4LevelData(levelNumber: number): Event4LevelData | null {
  return EVENT_4_LEVELS.find(level => level.levelNumber === levelNumber) || null;
}
