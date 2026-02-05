/**
 * Generates a per-level background configuration with distinct themes per game
 * that harmonize with level progression while maintaining readability
 */

import { type GameId, GAME_IDS } from '../constants';

export interface LevelBackgroundConfig {
  gradient: string;
  overlayOpacity: number;
  accentColor: string;
}

export function getLevelBackground(levelNumber: number, gameId: GameId = GAME_IDS.DEFAULT): LevelBackgroundConfig {
  // Divide 100 levels into color zones for variety
  const zone = Math.floor((levelNumber - 1) / 20); // 0-4 zones
  
  // Define distinct palettes per game
  if (gameId === GAME_IDS.PROMISES_100) {
    // Promises 100: Soft pastel romantic theme (pink, lavender, peach)
    const palettes = [
      // Zone 1 (Levels 1-20): Soft pink and rose
      {
        gradient: 'linear-gradient(135deg, oklch(0.92 0.04 340 / 1) 0%, oklch(0.88 0.05 350 / 1) 100%)',
        accentColor: 'oklch(0.70 0.12 345)',
      },
      // Zone 2 (Levels 21-40): Lavender and lilac
      {
        gradient: 'linear-gradient(135deg, oklch(0.90 0.05 310 / 1) 0%, oklch(0.86 0.06 320 / 1) 100%)',
        accentColor: 'oklch(0.68 0.13 315)',
      },
      // Zone 3 (Levels 41-60): Peach and coral
      {
        gradient: 'linear-gradient(135deg, oklch(0.88 0.06 30 / 1) 0%, oklch(0.84 0.07 20 / 1) 100%)',
        accentColor: 'oklch(0.72 0.14 25)',
      },
      // Zone 4 (Levels 61-80): Soft magenta and rose
      {
        gradient: 'linear-gradient(135deg, oklch(0.86 0.07 330 / 1) 0%, oklch(0.82 0.08 340 / 1) 100%)',
        accentColor: 'oklch(0.66 0.15 335)',
      },
      // Zone 5 (Levels 81-100): Blush and pink
      {
        gradient: 'linear-gradient(135deg, oklch(0.84 0.08 350 / 1) 0%, oklch(0.80 0.09 0 / 1) 100%)',
        accentColor: 'oklch(0.74 0.16 355)',
      },
    ];

    const palette = palettes[zone] || palettes[0];
    const levelInZone = (levelNumber - 1) % 20;
    const overlayOpacity = 0.75 + (levelInZone / 20) * 0.15;

    return {
      gradient: palette.gradient,
      overlayOpacity,
      accentColor: palette.accentColor,
    };
  } else {
    // Default game: Warm vibrant theme (orange, amber, gold)
    const palettes = [
      // Zone 1 (Levels 1-20): Warm orange and amber
      {
        gradient: 'linear-gradient(135deg, oklch(0.65 0.15 40 / 1) 0%, oklch(0.55 0.18 30 / 1) 100%)',
        accentColor: 'oklch(0.75 0.20 35)',
      },
      // Zone 2 (Levels 21-40): Golden and honey
      {
        gradient: 'linear-gradient(135deg, oklch(0.70 0.14 60 / 1) 0%, oklch(0.60 0.16 50 / 1) 100%)',
        accentColor: 'oklch(0.78 0.18 55)',
      },
      // Zone 3 (Levels 41-60): Sunset orange and coral
      {
        gradient: 'linear-gradient(135deg, oklch(0.62 0.16 25 / 1) 0%, oklch(0.52 0.19 15 / 1) 100%)',
        accentColor: 'oklch(0.72 0.21 20)',
      },
      // Zone 4 (Levels 61-80): Amber and rust
      {
        gradient: 'linear-gradient(135deg, oklch(0.58 0.17 35 / 1) 0%, oklch(0.48 0.20 25 / 1) 100%)',
        accentColor: 'oklch(0.68 0.22 30)',
      },
      // Zone 5 (Levels 81-100): Deep gold and bronze
      {
        gradient: 'linear-gradient(135deg, oklch(0.55 0.18 45 / 1) 0%, oklch(0.45 0.21 35 / 1) 100%)',
        accentColor: 'oklch(0.65 0.23 40)',
      },
    ];

    const palette = palettes[zone] || palettes[0];
    const levelInZone = (levelNumber - 1) % 20;
    const overlayOpacity = 0.75 + (levelInZone / 20) * 0.15;

    return {
      gradient: palette.gradient,
      overlayOpacity,
      accentColor: palette.accentColor,
    };
  }
}
