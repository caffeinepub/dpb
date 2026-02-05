import { useState, useEffect } from 'react';
import { Heart, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getWinLetterForLevel } from '../game/content/winLetters';
import { getImageForLevel } from '../game/assets/uploadedImages';
import { type GameId, GAME_IDS } from '../game/constants';
import RomanticDecor from '../components/decor/RomanticDecor';

interface WinScreenProps {
  levelNumber: number;
  gameId?: GameId;
  onNextLevel: () => void;
  onBackToEvents?: () => void;
}

export default function WinScreen({ levelNumber, gameId = GAME_IDS.DEFAULT, onNextLevel, onBackToEvents }: WinScreenProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const letter = getWinLetterForLevel(levelNumber, gameId);
  const imagePath = getImageForLevel(levelNumber, gameId);
  
  // Fallback images if primary fails
  const fallbackImages = [
    getImageForLevel(levelNumber + 1, gameId),
    getImageForLevel(levelNumber + 2, gameId),
    getImageForLevel(1, gameId),
  ];

  const isPromises100 = gameId === GAME_IDS.PROMISES_100;
  const nextButtonText = isPromises100 ? 'Next Promise ❤️' : 'Next Level';

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
    setImageError(false);
    setCurrentImageIndex(0);
  }, [levelNumber]);

  const handleImageError = () => {
    if (currentImageIndex < fallbackImages.length) {
      setCurrentImageIndex(prev => prev + 1);
    } else {
      setImageError(true);
    }
  };

  const currentImage = currentImageIndex === 0 ? imagePath : fallbackImages[currentImageIndex - 1];

  const bgStyle = isPromises100 
    ? { background: 'linear-gradient(to bottom, oklch(0.95 0.02 330 / 1), oklch(0.92 0.03 340 / 1))' }
    : { background: 'linear-gradient(to bottom, oklch(0.75 0.12 40 / 1), oklch(0.65 0.15 30 / 1))' };

  const vignetteStyle = isPromises100
    ? { background: 'radial-gradient(ellipse at center, transparent 0%, oklch(0.90 0.02 330 / 0.3) 70%, oklch(0.88 0.03 340 / 0.5) 100%)' }
    : { background: 'radial-gradient(ellipse at center, transparent 0%, oklch(0.60 0.12 35 / 0.3) 50%, oklch(0.50 0.15 25 / 0.5) 100%)' };

  return (
    <div 
      className="min-h-screen p-6 relative overflow-hidden"
      style={bgStyle}
    >
      {/* Romantic decor for Promises 100 */}
      {isPromises100 && <RomanticDecor variant="hearts" />}

      {/* Vignette overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={vignetteStyle}
      />

      <div
        className={`max-w-2xl mx-auto space-y-6 relative z-10 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center space-y-3">
          <Heart className={`w-16 h-16 mx-auto animate-pulse ${isPromises100 ? 'text-pink-500 fill-pink-500' : 'text-orange-600 fill-orange-600'}`} />
          <h1 className={`text-3xl md:text-4xl font-bold drop-shadow-lg ${isPromises100 ? 'text-pink-600' : 'text-orange-800'}`}>
            Level {levelNumber} Complete! 🎉
          </h1>
          <p className={`text-lg ${isPromises100 ? 'text-gray-700' : 'text-orange-900'}`}>
            {isPromises100 ? 'Promise kept! 💕' : 'You did it, my love!'}
          </p>
        </div>

        {!imageError && (
          <div className={`rounded-lg overflow-hidden shadow-2xl ${isPromises100 ? 'border-4 border-pink-200' : 'border-4 border-orange-300'}`}>
            <img 
              src={currentImage}
              alt={`Memory ${levelNumber}`}
              className="w-full h-auto object-cover"
              onError={handleImageError}
            />
          </div>
        )}

        <Card className={`backdrop-blur-md shadow-romantic p-6 md:p-8 ${isPromises100 ? 'bg-white/95 border-pink-200' : 'bg-amber-50/95 border-orange-300'}`}>
          <div className="space-y-4 text-gray-800 leading-relaxed">
            <h2 className="text-xl md:text-2xl font-bold text-center text-gray-900 mb-4 font-serif">
              {isPromises100 ? 'My Promise 💕' : 'Love Letter 💕'}
            </h2>
            <p className="text-base md:text-lg font-serif whitespace-pre-line">
              {letter.loveLetter}
            </p>
            <div className={`pt-4 mt-6 ${isPromises100 ? 'border-t border-pink-200' : 'border-t border-orange-300'}`}>
              <h3 className="text-lg md:text-xl font-bold text-center text-gray-900 mb-3 font-serif">
                {isPromises100 ? 'The Promise 💖' : 'My Promise to You 💖'}
              </h3>
              <p className="text-base md:text-lg font-serif whitespace-pre-line">
                {letter.promiseLetter}
              </p>
            </div>
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row gap-3">
          {onBackToEvents && (
            <Button
              onClick={onBackToEvents}
              variant="outline"
              className={`flex-1 flex items-center justify-center gap-2 backdrop-blur-sm py-6 text-lg ${
                isPromises100 
                  ? 'bg-white/80 border-pink-300 text-pink-700 hover:bg-pink-50' 
                  : 'bg-white/80 border-orange-300 text-orange-700 hover:bg-orange-50'
              }`}
            >
              <Home className="w-5 h-5" />
              Back to Events
            </Button>
          )}
          {levelNumber < 100 && (
            <Button
              onClick={onNextLevel}
              className={`flex-1 font-semibold py-6 text-lg shadow-romantic flex items-center justify-center gap-2 ${
                isPromises100
                  ? 'bg-pink-500 hover:bg-pink-600 text-white'
                  : 'bg-orange-600 hover:bg-orange-700 text-white'
              }`}
            >
              {nextButtonText}
              <ArrowRight className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
