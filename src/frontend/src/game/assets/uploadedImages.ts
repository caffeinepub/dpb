export const UPLOADED_IMAGES = [
  '1738760735261.jpg',
  '1739242524171.jpg',
  'IMG-20240918-WA0043.jpg',
  'IMG-20240918-WA0045.jpg',
  'IMG-20241014-WA0000.jpg',
  'IMG-20241014-WA0001.jpg',
  'IMG-20241021-WA0000.jpg',
  'IMG-20241021-WA0001.jpg',
  'IMG-20241021-WA0003.jpg',
  'IMG-20241102-WA0016.jpg',
  'IMG-20250210-WA0005.jpg',
  'IMG-20250210-WA0018.jpg',
  'IMG-20250210-WA0168.jpg',
  'IMG-20250210-WA0186.jpg',
  'IMG-20250210-WA0192.jpg',
  'IMG-20250210-WA0195.jpg',
  'IMG-20250210-WA0207.jpg',
  'IMG-20250210-WA0225.jpg',
  'IMG-20250210-WA0253(1).jpg',
  'IMG-20250210-WA0257.jpg',
  'IMG-20250210-WA0258_1.jpg',
  'IMG-20250210-WA0259.jpg',
  'IMG-20250210-WA0260.jpg',
  'IMG-20250210-WA0287.jpg',
  'IMG-20250210-WA0291.jpg',
  'IMG-20250211-WA0024.jpg',
  'IMG-20250211-WA0033.jpg',
  'IMG-20250211-WA0038.jpg',
  'IMG-20250211-WA0040.jpg',
  'IMG-20250211-WA0113.jpg',
  'IMG-20250323-WA0006.jpg',
  'IMG-20250409-WA0006.jpg',
  'IMG-20250409-WA0013.jpg',
  'IMG-20250409-WA0015.jpg',
  'IMG-20250409-WA0017.jpg',
  'IMG-20250409-WA0024.jpg',
  'IMG-20250503-WA0002-1.jpg',
  'IMG-20250503-WA0002.jpg',
  'IMG-20250503-WA0004.jpg',
  'IMG-20250617-WA0005.jpg',
  'IMG-20250617-WA0021.jpg',
  'IMG-20250617-WA0022.jpg',
  'IMG-20250617-WA0023.jpg',
  'IMG_20250205_184732.jpg',
  'IMG_20250406_163947.jpg',
  'file_0000000042045230aa71a663d2a1a5ff_conversation_id=67ea425e-b7a8-8000-b0de-c3f1ba5031bf_message_id=b7047d67-3e52-4e2e-8c6e-1738c55bffc5 (2)_1.webp',
  'file_0000000058e052308b0330347469868a_conversation_id=67ea4905-2ee0-8000-b6c4-9d2aed64c0b7_message_id=251faeee-1dd1-4d66-b75b-90f9e19a8244.webp',
] as const;

export function getImageForLevel(levelNumber: number): string {
  const index = (levelNumber - 1) % UPLOADED_IMAGES.length;
  return `/assets/${UPLOADED_IMAGES[index]}`;
}

// Track last used image index per level to avoid immediate repeats
const lastUsedImageIndex = new Map<number, number>();

export function getRandomImageForSecretLetter(levelNumber: number): string {
  const lastIndex = lastUsedImageIndex.get(levelNumber);
  let newIndex: number;
  
  // If we have multiple images, avoid the last one used
  if (UPLOADED_IMAGES.length > 1 && lastIndex !== undefined) {
    do {
      newIndex = Math.floor(Math.random() * UPLOADED_IMAGES.length);
    } while (newIndex === lastIndex);
  } else {
    newIndex = Math.floor(Math.random() * UPLOADED_IMAGES.length);
  }
  
  lastUsedImageIndex.set(levelNumber, newIndex);
  return `/assets/${UPLOADED_IMAGES[newIndex]}`;
}
