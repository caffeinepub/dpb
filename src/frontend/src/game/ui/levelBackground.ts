/**
 * Generates a per-level background configuration with romantic light tints
 * that harmonize with level progression while maintaining readability
 */

export interface LevelBackgroundConfig {
  gradient: string;
  overlayOpacity: number;
  accentColor: string;
}

export function getLevelBackground(levelNumber: number): LevelBackgroundConfig {
  // Divide 100 levels into color zones for variety
  const zone = Math.floor((levelNumber - 1) / 20); // 0-4 zones
  
  // Define romantic color palettes for each zone - brighter, lighter tones
  const palettes = [
    // Zone 1 (Levels 1-20): Soft rose and pink
    {
      gradient: 'linear-gradient(135deg, oklch(0.92 0.08 350 / 1) 0%, oklch(0.95 0.06 10 / 1) 100%)',
      accentColor: 'oklch(0.65 0.15 350)',
    },
    // Zone 2 (Levels 21-40): Light lavender and blush
    {
      gradient: 'linear-gradient(135deg, oklch(0.93 0.07 320 / 1) 0%, oklch(0.96 0.05 340 / 1) 100%)',
      accentColor: 'oklch(0.62 0.14 330)',
    },
    // Zone 3 (Levels 41-60): Warm peach and coral
    {
      gradient: 'linear-gradient(135deg, oklch(0.94 0.09 30 / 1) 0%, oklch(0.97 0.07 20 / 1) 100%)',
      accentColor: 'oklch(0.68 0.16 25)',
    },
    // Zone 4 (Levels 61-80): Soft pink and mauve
    {
      gradient: 'linear-gradient(135deg, oklch(0.91 0.08 340 / 1) 0%, oklch(0.94 0.06 0 / 1) 100%)',
      accentColor: 'oklch(0.64 0.15 345)',
    },
    // Zone 5 (Levels 81-100): Romantic rose and cream
    {
      gradient: 'linear-gradient(135deg, oklch(0.95 0.10 355 / 1) 0%, oklch(0.98 0.08 15 / 1) 100%)',
      accentColor: 'oklch(0.70 0.18 5)',
    },
  ];

  const palette = palettes[zone] || palettes[0];
  
  // Subtle variation within zone based on level
  const levelInZone = (levelNumber - 1) % 20;
  const overlayOpacity = 0.25 + (levelInZone / 20) * 0.15; // 0.25 to 0.40

  return {
    gradient: palette.gradient,
    overlayOpacity,
    accentColor: palette.accentColor,
  };
}
