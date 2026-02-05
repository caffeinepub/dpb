const PROMISES_100_LOSE_MESSAGES = [
  "Awww mazi dikshu mazi chiuuuu 🥺❤️\nAsa ka re pillu?\nKahi nahi hot, punha try kar 😘",
  "My sweet love 💕\nIt's okay to make mistakes\nThat's how we learn\nTry again, gently 🌸",
  "Ohhh chiuuu 🥰\nAlmost there!\nJust a little more patience\nYou can do this 💪",
  "Don't worry, my darling 😊\nLove isn't about perfection\nIt's about trying\nOne more time? 💖",
  "Aww baby 🥺\nSo close!\nTake a breath\nAnd try again with love 💝",
  "My precious one 💕\nEveryone stumbles\nWhat matters is getting up\nI believe in you 🌟",
  "Chiuuu mazi 😘\nThoda patience\nThoda love\nAani try again 💖",
  "Sweet heart 💗\nIt's okay\nLove is patient\nLove is kind\nTry once more 🌸"
];

export function getRandomPromises100LoseMessage(): string {
  const index = Math.floor(Math.random() * PROMISES_100_LOSE_MESSAGES.length);
  return PROMISES_100_LOSE_MESSAGES[index];
}

export { PROMISES_100_LOSE_MESSAGES };
