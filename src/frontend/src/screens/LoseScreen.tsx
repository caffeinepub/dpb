import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getRandomLoseMessage } from '../game/content/loseMessages';
import { getRandomPromisesKeptLoseMessage } from '../game/promisesKept/content/loseMessages';

interface LoseScreenProps {
  gameEventId: 'event-1' | 'event-4';
  onRetry: () => void;
}

export default function LoseScreen({ gameEventId, onRetry }: LoseScreenProps) {
  const [isShaking, setIsShaking] = useState(false);
  const isPromisesKept = gameEventId === 'event-4';
  const [message] = useState(
    isPromisesKept ? getRandomPromisesKeptLoseMessage() : getRandomLoseMessage()
  );

  useEffect(() => {
    setIsShaking(true);
    const timer = setTimeout(() => setIsShaking(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Light romantic theme for Event 4
  if (isPromisesKept) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          background: 'linear-gradient(135deg, oklch(0.95 0.03 350) 0%, oklch(0.92 0.04 10) 100%)',
        }}
      >
        <Card
          className={`max-w-md w-full p-8 bg-white/95 backdrop-blur-sm border-rose-200 shadow-romantic ${
            isShaking ? 'animate-shake' : ''
          }`}
        >
          <div className="space-y-6 text-center">
            <div className="relative">
              <Heart className="w-20 h-20 text-rose-500 fill-rose-500 mx-auto opacity-75" />
            </div>

            <h1 className="text-2xl font-bold text-rose-700">
              Try Again 💕
            </h1>

            <div className="relative w-full aspect-square max-w-xs mx-auto rounded-2xl overflow-hidden shadow-romantic">
              <img
                src="/assets/IMG-20250210-WA0195.jpg"
                alt="Try again"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23fce7f3" width="300" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="48" fill="%23be123c"%3E🥺%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>

            <div className="bg-rose-50 p-6 rounded-xl border border-rose-200">
              <p className="text-rose-800 whitespace-pre-line leading-relaxed">
                {message}
              </p>
            </div>

            <Button
              onClick={onRetry}
              size="lg"
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-6 text-lg shadow-romantic"
            >
              Retry
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Original dark theme for Event 1
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Card
        className={`max-w-md w-full p-8 bg-gray-900/90 backdrop-blur-sm border-gray-800 shadow-romantic ${
          isShaking ? 'animate-shake' : ''
        }`}
      >
        <div className="space-y-6 text-center">
          <div className="relative">
            <Heart className="w-20 h-20 text-red-700 fill-red-700 mx-auto opacity-75" />
          </div>

          <h1 className="text-2xl font-bold text-red-600">
            Oops! 💕
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

          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <p className="text-gray-200 whitespace-pre-line leading-relaxed">
              {message}
            </p>
          </div>

          <Button
            onClick={onRetry}
            size="lg"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-6 text-lg shadow-romantic"
          >
            Try Again
          </Button>
        </div>
      </Card>
    </div>
  );
}
