import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getRandomLoseMessage } from '../game/content/loseMessages';
import { type GameId, GAME_IDS } from '../game/constants';

interface LoseScreenProps {
  gameId?: GameId;
  onRetry: () => void;
}

export default function LoseScreen({ gameId = GAME_IDS.DEFAULT, onRetry }: LoseScreenProps) {
  const [isShaking, setIsShaking] = useState(false);
  const [message] = useState(getRandomLoseMessage(gameId));

  const isPromises100 = gameId === GAME_IDS.PROMISES_100;

  useEffect(() => {
    setIsShaking(true);
    const timer = setTimeout(() => setIsShaking(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const bgStyle = isPromises100
    ? { background: 'linear-gradient(to bottom, oklch(0.95 0.02 330 / 1), oklch(0.92 0.03 340 / 1))' }
    : { background: 'linear-gradient(to bottom, oklch(0.70 0.12 40 / 1), oklch(0.60 0.15 30 / 1))' };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={bgStyle}>
      <Card
        className={`max-w-md w-full p-8 backdrop-blur-sm shadow-romantic ${
          isShaking ? 'animate-shake' : ''
        } ${isPromises100 ? 'bg-white/95 border-pink-200' : 'bg-amber-50/95 border-orange-300'}`}
      >
        <div className="space-y-6 text-center">
          <div className="relative">
            <Heart className={`w-20 h-20 mx-auto opacity-75 ${isPromises100 ? 'text-pink-400 fill-pink-400' : 'text-orange-500 fill-orange-500'}`} />
          </div>

          <h1 className={`text-2xl font-bold ${isPromises100 ? 'text-pink-600' : 'text-orange-700'}`}>
            {isPromises100 ? 'Almost there! 💕' : 'Oops! 💕'}
          </h1>

          <div className="relative w-full aspect-square max-w-xs mx-auto rounded-2xl overflow-hidden shadow-romantic">
            <img
              src="/assets/IMG-20250210-WA0195.jpg"
              alt="Try again"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23111" width="300" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="48" fill="%23dc2626"%3E🥺%3C/text%3E%3C/svg%3E';
              }}
            />
          </div>

          <div className={`p-6 rounded-xl ${isPromises100 ? 'bg-pink-50 border border-pink-200' : 'bg-orange-50 border border-orange-200'}`}>
            <p className={`whitespace-pre-line leading-relaxed ${isPromises100 ? 'text-gray-800' : 'text-gray-800'}`}>
              {message}
            </p>
          </div>

          <Button
            onClick={onRetry}
            size="lg"
            className={`w-full font-semibold py-6 text-lg shadow-romantic ${
              isPromises100
                ? 'bg-pink-500 hover:bg-pink-600 text-white'
                : 'bg-orange-600 hover:bg-orange-700 text-white'
            }`}
          >
            {isPromises100 ? 'Try Again' : 'Try Again 💪'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
