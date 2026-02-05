const PROMISES_KEPT_LOSE_MESSAGES = [
  "Awww mazi dikshu mazi chiuuuu 🥺❤️\nAsa ka re pillu?\nKahi nahi hot, punha try kar 😘",
  "It's okay, my love. 💕\nTake a breath and try again.\nYou've got this.",
  "Almost there, sweetheart! 🌸\nDon't give up.\nI believe in you.",
  "No worries, darling. 💖\nEven the best need practice.\nTry once more?",
  "Aww, that's alright! 😊\nLove takes patience.\nLet's try again together.",
  "Don't be discouraged, love. 💝\nYou're doing great.\nOne more time?",
  "It happens to everyone! 🌹\nTake your time.\nYou'll get it.",
  "So close, my dear! ✨\nI know you can do this.\nTry again.",
  "That's okay, sweetheart. 💕\nLove is about trying.\nLet's go again!",
  "Arre mazi chiuuu 🥺\nKahi tension nahi gheu.\nTu kar saktos! 💪❤️",
  "My sweet love 😘\nIt's okay to make mistakes.\nThat's how we learn. Try again! 💖",
  "Chotu, it's fine! 🥰\nEven promises take practice.\nOne more try, my love.",
  "Dikshita, don't worry! 💕\nYou're learning.\nI'm here with you. Try again!",
  "Mazi pillu 🥺❤️\nKahi problem nahi.\nPunha ek vaar try kar!",
  "My darling 💖\nYou're so close!\nJust one more try.",
];

export function getRandomPromisesKeptLoseMessage(): string {
  const index = Math.floor(Math.random() * PROMISES_KEPT_LOSE_MESSAGES.length);
  return PROMISES_KEPT_LOSE_MESSAGES[index];
}

export { PROMISES_KEPT_LOSE_MESSAGES };
