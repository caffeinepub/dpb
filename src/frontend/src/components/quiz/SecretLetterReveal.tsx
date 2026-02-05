import { useState } from 'react';
import { Heart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getRandomImageForSecretLetter } from '../../game/assets/uploadedImages';

interface SecretLetterRevealProps {
  levelNumber: number;
  letterText: string;
  onClose: () => void;
}

export default function SecretLetterReveal({ levelNumber, letterText, onClose }: SecretLetterRevealProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [imageUrl] = useState(() => getRandomImageForSecretLetter(levelNumber));

  const handleReveal = () => {
    setIsRevealed(true);
  };

  if (!isRevealed) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
        <div className="relative w-full max-w-md">
          <div className="relative bg-gradient-to-br from-rose-950/90 to-pink-950/90 backdrop-blur-md rounded-2xl p-8 border-2 border-rose-500/30 shadow-2xl">
            <div className="text-center space-y-6">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-rose-500/20 blur-xl rounded-full animate-pulse" />
                <Heart className="w-20 h-20 text-rose-500 fill-rose-500 relative animate-pulse" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-rose-100">
                  Secret Letter 🔐
                </h2>
                <p className="text-rose-300/80 text-sm">
                  A special message awaits you...
                </p>
              </div>

              <Button
                onClick={handleReveal}
                className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-semibold py-6 text-lg rounded-xl shadow-lg hover:shadow-rose-500/50 transition-all duration-300 hover:scale-105"
              >
                See Hidden Letter 💌
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in zoom-in duration-500">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="relative bg-gradient-to-br from-rose-950/95 to-pink-950/95 backdrop-blur-md rounded-3xl p-6 md:p-8 border-2 border-rose-400/40 shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-rose-300 hover:text-rose-100 transition-all duration-200 z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-6">
            <div className="text-center">
              <Heart className="w-12 h-12 text-rose-500 fill-rose-500 mx-auto mb-3 animate-pulse" />
              <h2 className="text-2xl md:text-3xl font-bold text-rose-100 mb-2">
                Level {levelNumber} Complete! 💖
              </h2>
            </div>

            <div className="relative rounded-2xl overflow-hidden border-4 border-rose-400/30 shadow-xl">
              <img
                src={imageUrl}
                alt="Special moment"
                className="w-full h-auto object-cover"
                style={{ maxHeight: '400px' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>

            <div className="bg-black/30 rounded-2xl p-6 border border-rose-400/20">
              <pre className="text-rose-100 text-base md:text-lg leading-relaxed whitespace-pre-wrap font-sans text-center">
                {letterText}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
