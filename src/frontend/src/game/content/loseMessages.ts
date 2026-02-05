const LOSE_MESSAGES = [
  "Awww mazi chiuuuu 😘 harle ka?\nKahi nahi hot, punha try kar 💕",
  "Thoda miss zala, pan tu aahech perfect ❤️",
  "Arre bunny! 🐰 Ek vaar aani try kar na 💖",
  "Kahi nahi, everyone makes mistakes 🌸\nTu kar shaktos! 💪",
  "Oops! 😊 Thoda focus kar aani try again 💝",
  "Almost there, my love! 💕\nOne more time? 🎯",
  "Don't worry chiuu 🥰\nTu definitely kar shaktos! ✨",
  "Arre! So close! 💫\nNext time pakka! 🌟",
];

export function getRandomLoseMessage(): string {
  const index = Math.floor(Math.random() * LOSE_MESSAGES.length);
  return LOSE_MESSAGES[index];
}

export { LOSE_MESSAGES };
