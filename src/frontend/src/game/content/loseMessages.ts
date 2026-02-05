import { type GameId, GAME_IDS } from '../constants';
import { getRandomPromises100LoseMessage } from '../promises100/content/loseMessages';

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

export function getRandomLoseMessage(gameId: GameId = GAME_IDS.DEFAULT): string {
  if (gameId === GAME_IDS.PROMISES_100) {
    return getRandomPromises100LoseMessage();
  }
  const index = Math.floor(Math.random() * LOSE_MESSAGES.length);
  return LOSE_MESSAGES[index];
}

export { LOSE_MESSAGES };
