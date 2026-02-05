import { useState, useEffect } from 'react';
import { Heart, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getWinLetterForLevel } from '../game/content/winLetters';
import { getPromisesKeptWinLetter } from '../game/promisesKept/content/winLetters';
import { getImageForLevel } from '../game/assets/uploadedImages';

interface WinScreenProps {
  levelNumber: number;
  gameEventId: 'event-1' | 'event-4';
  onNextLevel: () => void;
  onBackToEvents?: () => void;
}

export default function WinScreen({ levelNumber, gameEventId, onNextLevel, onBackToEvents }: WinScreenProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const isPromisesKept = gameEventId === 'event-4';
  const letter = isPromisesKept 
    ? getPromisesKeptWinLetter(levelNumber)
    : getWinLetterForLevel(levelNumber);
  const imagePath = getImageForLevel(levelNumber);
  
  // Fallback images if primary fails
  const fallbackImages = [
    getImageForLevel(levelNumber + 1),
    getImageForLevel(levelNumber + 2),
    getImageForLevel(1),
  ];

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

  const buttonText = isPromisesKept ? 'Next Promise ❤️' : 'Next Level';

  // Light romantic theme for Event 4
  if (isPromisesKept) {
    return (
      <div 
        className="min-h-screen p-6 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, oklch(0.96 0.03 350) 0%, oklch(0.94 0.04 10) 50%, oklch(0.95 0.03 30) 100%)',
        }}
      >
        {/* Soft heart animation overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <Heart className="absolute top-10 left-10 w-8 h-8 text-rose-400/30 fill-rose-400/30 animate-pulse" style={{ animationDelay: '0s' }} />
          <Heart className="absolute top-32 right-16 w-6 h-6 text-pink-400/30 fill-pink-400/30 animate-pulse" style={{ animationDelay: '0.5s' }} />
          <Heart className="absolute bottom-24 left-20 w-10 h-10 text-rose-400/30 fill-rose-400/30 animate-pulse" style={{ animationDelay: '1s' }} />
          <Heart className="absolute bottom-40 right-12 w-7 h-7 text-pink-400/30 fill-pink-400/30 animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>

        <div
          className={`max-w-2xl mx-auto space-y-6 relative z-10 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center space-y-3">
            <Heart className="w-16 h-16 text-rose-600 fill-rose-600 mx-auto animate-pulse" />
            <h1 className="text-3xl md:text-4xl font-bold text-rose-700">
              Level {levelNumber} Complete! 🎉
            </h1>
            <p className="text-rose-600 text-lg">
              Promise kept! 💖
            </p>
          </div>

          {!imageError && (
            <div className="rounded-lg overflow-hidden shadow-2xl border-4 border-rose-300/60">
              <img 
                src={currentImage}
                alt={`Memory ${levelNumber}`}
                className="w-full h-auto object-cover"
                onError={handleImageError}
              />
            </div>
          )}

          <Card className="bg-white/95 backdrop-blur-md border-rose-200 shadow-romantic p-6 md:p-8">
            <div className="space-y-4 text-gray-800 leading-relaxed">
              <h2 className="text-xl md:text-2xl font-bold text-center text-rose-800 mb-4 font-serif">
                Love Letter 💕
              </h2>
              <p className="text-base md:text-lg font-serif whitespace-pre-line text-gray-700">
                {letter.loveLetter}
              </p>
              <div className="border-t border-rose-200 pt-4 mt-6">
                <h3 className="text-lg md:text-xl font-bold text-center text-rose-800 mb-3 font-serif">
                  My Promise to You 💖
                </h3>
                <p className="text-base md:text-lg font-serif whitespace-pre-line text-gray-700">
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
                className="flex-1 flex items-center justify-center gap-2 bg-white/80 border-rose-300 text-rose-700 hover:bg-rose-50 backdrop-blur-sm py-6 text-lg"
              >
                <Home className="w-5 h-5" />
                Back to Events
              </Button>
            )}
            {levelNumber < 100 && (
              <Button
                onClick={onNextLevel}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-semibold py-6 text-lg shadow-romantic flex items-center justify-center gap-2"
              >
                {buttonText}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Original dark theme for Event 1
  return (
    <div 
      className="min-h-screen p-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, oklch(0.08 0.02 0 / 1), oklch(0.05 0.01 0 / 1))',
      }}
    >
      {/* Dark romantic vignette overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, oklch(0.03 0.01 0 / 0.6) 50%, oklch(0.02 0.01 0 / 0.9) 100%)',
        }}
      />

      {/* Soft heart animation overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Heart className="absolute top-10 left-10 w-8 h-8 text-red-600/20 fill-red-600/20 animate-pulse" style={{ animationDelay: '0s' }} />
        <Heart className="absolute top-32 right-16 w-6 h-6 text-pink-600/20 fill-pink-600/20 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <Heart className="absolute bottom-24 left-20 w-10 h-10 text-red-600/20 fill-red-600/20 animate-pulse" style={{ animationDelay: '1s' }} />
        <Heart className="absolute bottom-40 right-12 w-7 h-7 text-pink-600/20 fill-pink-600/20 animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div
        className={`max-w-2xl mx-auto space-y-6 relative z-10 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center space-y-3">
          <Heart className="w-16 h-16 text-red-600 fill-red-600 mx-auto animate-pulse" />
          <h1 className="text-3xl md:text-4xl font-bold text-red-600 drop-shadow-lg">
            Level {levelNumber} Complete! 🎉
          </h1>
          <p className="text-gray-300 text-lg">
            You did it, my love!
          </p>
        </div>

        {!imageError && (
          <div className="rounded-lg overflow-hidden shadow-2xl border-4 border-red-900/40">
            <img 
              src={currentImage}
              alt={`Memory ${levelNumber}`}
              className="w-full h-auto object-cover"
              onError={handleImageError}
            />
          </div>
        )}

        <Card className="bg-amber-50/95 backdrop-blur-md border-amber-800 shadow-romantic p-6 md:p-8">
          <div className="space-y-4 text-gray-800 leading-relaxed">
            <h2 className="text-xl md:text-2xl font-bold text-center text-gray-900 mb-4 font-serif">
              Love Letter 💕
            </h2>
            <p className="text-base md:text-lg font-serif whitespace-pre-line">
              {letter.loveLetter}
            </p>
            <div className="border-t border-amber-800/30 pt-4 mt-6">
              <h3 className="text-lg md:text-xl font-bold text-center text-gray-900 mb-3 font-serif">
                My Promise to You 💖
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
              className="flex-1 flex items-center justify-center gap-2 bg-gray-900/80 border-gray-700 text-gray-300 hover:bg-gray-800 backdrop-blur-sm py-6 text-lg"
            >
              <Home className="w-5 h-5" />
              Back to Events
            </Button>
          )}
          {levelNumber < 100 && (
            <Button
              onClick={onNextLevel}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-6 text-lg shadow-romantic flex items-center justify-center gap-2"
            >
              Next Level
              <ArrowRight className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
