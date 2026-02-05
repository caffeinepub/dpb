import { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import RomanticDecor from '@/components/decor/RomanticDecor';
import { UPLOADED_IMAGES } from '@/game/assets/uploadedImages';

interface TogetherForeverEventScreenProps {
  onBack: () => void;
}

const CONVINCING_MESSAGES = [
  "Dikshu, think one more time... 💭",
  "Please reconsider, my love... 💕",
  "Are you sure? Think about us... 💖",
  "Dikshu, we're perfect together... 🌹",
  "Give us a chance, please... 💝",
  "My heart belongs to you, Dikshu... ❤️",
  "Forever starts with a yes... 💫"
];

export default function TogetherForeverEventScreen({ onBack }: TogetherForeverEventScreenProps) {
  const [noClickCount, setNoClickCount] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });

  const handleNoClick = () => {
    setNoClickCount(prev => prev + 1);
    
    // Calculate new random position within safe bounds
    const container = document.getElementById('button-container');
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const buttonWidth = 100;
      const buttonHeight = 50;
      
      // Safe area calculations
      const maxX = containerRect.width - buttonWidth - 20;
      const maxY = containerRect.height - buttonHeight - 20;
      
      const newX = Math.random() * maxX;
      const newY = Math.random() * maxY;
      
      setNoButtonPosition({ x: newX, y: newY });
    }
  };

  const handleYesClick = () => {
    setAccepted(true);
  };

  if (accepted) {
    // Celebration screen
    const celebrationPhotos = [
      UPLOADED_IMAGES[8],
      UPLOADED_IMAGES[15],
      UPLOADED_IMAGES[22],
      UPLOADED_IMAGES[30]
    ];

    return (
      <div 
        className="min-h-screen relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, oklch(0.88 0.12 280 / 1) 0%, oklch(0.92 0.10 300 / 1) 50%, oklch(0.90 0.11 290 / 1) 100%)',
        }}
      >
        <RomanticDecor variant="mixed" />
        
        <div className="relative z-10 p-6 max-w-4xl mx-auto">
          <Button
            onClick={onBack}
            variant="outline"
            className="mb-6 bg-white/80 border-purple-300 text-purple-700 hover:bg-white"
          >
            ← Back to Events
          </Button>

          <div className="space-y-8 animate-in fade-in duration-1000">
            {/* Celebration Header */}
            <div className="text-center space-y-4">
              <div className="flex justify-center gap-3 text-5xl animate-bounce">
                💜 ✨ 💕 ⭐ 💖
              </div>
              <h1 
                className="text-4xl md:text-5xl font-bold text-purple-700 drop-shadow-lg"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Yay! Dikshu, now you are mine and I am yours forever! 💫
              </h1>
              <div className="flex justify-center gap-3 text-4xl">
                🌟 💝 🌈 💞 ✨
              </div>
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-2 gap-4">
              {celebrationPhotos.map((photo, index) => (
                <div 
                  key={index}
                  className="rounded-lg overflow-hidden shadow-2xl border-4 border-purple-300 animate-in zoom-in duration-700"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <img 
                    src={`/assets/${photo}`}
                    alt={`Memory ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Promise Letter */}
            <Card className="bg-white/95 backdrop-blur-md border-purple-300 shadow-2xl p-8 animate-in slide-in-from-bottom duration-1000">
              <div className="flex items-center justify-center mb-6">
                <Heart className="w-10 h-10 text-purple-600 fill-purple-600 animate-pulse" />
              </div>
              
              <h2 className="text-3xl font-bold text-center text-purple-700 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                My Forever Promise to You, Dikshu 💜
              </h2>

              <div className="space-y-4 text-gray-800 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                <p className="text-lg">
                  My dearest Dikshu, today you've made me the happiest person in the world by choosing forever with me. This is not just a promise—it's a commitment from the depths of my heart.
                </p>
                <p className="text-lg">
                  I promise to be there for you through every sunrise and sunset, through every joy and challenge. I promise to hold your hand when you need support, to celebrate your victories as my own, and to comfort you in moments of doubt.
                </p>
                <p className="text-lg">
                  I promise to love you not just for who you are today, but for who you will become tomorrow. I promise to grow with you, to learn with you, and to build a beautiful life together filled with laughter, adventure, and endless love.
                </p>
                <p className="text-lg">
                  I promise to be your safe place, your biggest cheerleader, and your partner in everything. Whether we're sharing momos, watching movies, playing badminton, or simply enjoying each other's company, I promise to cherish every single moment.
                </p>
                <p className="text-lg">
                  I promise to never let a day go by without reminding you how special you are, how much you mean to me, and how grateful I am to have you in my life.
                </p>
                <p className="text-lg font-semibold text-purple-700">
                  You are mine, and I am yours—forever and always. This is my solemn promise to you, my Dikshu. 💜
                </p>
                <p className="text-right text-lg italic text-purple-600 mt-6">
                  Eternally yours,<br />
                  Your Bunny 🐰💕
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-purple-300 text-center">
                <div className="flex justify-center gap-2 text-3xl mb-3">
                  💜 💫 ✨ 💕 🌟
                </div>
                <p className="text-sm text-gray-600 italic">
                  Together forever, no matter what 💜
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Question screen
  const currentMessage = noClickCount > 0 ? CONVINCING_MESSAGES[Math.min(noClickCount - 1, CONVINCING_MESSAGES.length - 1)] : null;

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex items-center justify-center p-6"
      style={{
        background: 'linear-gradient(135deg, oklch(0.88 0.12 280 / 1) 0%, oklch(0.92 0.10 300 / 1) 50%, oklch(0.90 0.11 290 / 1) 100%)',
      }}
    >
      <RomanticDecor variant="mixed" />
      
      <div className="relative z-10 w-full max-w-2xl">
        <Button
          onClick={onBack}
          variant="outline"
          className="absolute top-0 left-0 bg-white/80 border-purple-300 text-purple-700 hover:bg-white"
        >
          ← Back
        </Button>

        <Card className="bg-white/95 backdrop-blur-md border-purple-300 shadow-2xl p-8 md:p-12 mt-16">
          <div className="text-center space-y-8">
            {/* Romantic decorative elements */}
            <div className="flex justify-center gap-3 text-4xl animate-pulse">
              💜 💫 💜
            </div>

            {/* The Question */}
            <h1 
              className="text-3xl md:text-5xl font-bold text-purple-700 leading-tight"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Dikshu, will you be mine forever? 💫
            </h1>

            <div className="flex justify-center gap-3 text-3xl">
              ✨ 💕 ✨
            </div>

            {/* Convincing message */}
            {currentMessage && (
              <div className="animate-in fade-in slide-in-from-top duration-500">
                <p className="text-xl text-purple-600 font-semibold italic">
                  {currentMessage}
                </p>
              </div>
            )}

            {/* Buttons Container */}
            <div 
              id="button-container"
              className="relative pt-6"
              style={{ minHeight: '200px' }}
            >
              <div className="flex items-center justify-center gap-6">
                <Button
                  onClick={handleYesClick}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xl px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Yes! 💜
                </Button>

                <Button
                  onClick={handleNoClick}
                  variant="outline"
                  className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold absolute transition-all duration-300"
                  style={{
                    left: noClickCount === 0 ? 'auto' : `${noButtonPosition.x}px`,
                    top: noClickCount === 0 ? 'auto' : `${noButtonPosition.y}px`,
                    position: noClickCount === 0 ? 'relative' : 'absolute',
                  }}
                >
                  No
                </Button>
              </div>
            </div>

            <div className="flex justify-center gap-2 text-2xl pt-4">
              <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
              <Heart className="w-6 h-6 text-purple-600 fill-purple-600 animate-pulse" />
              <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
