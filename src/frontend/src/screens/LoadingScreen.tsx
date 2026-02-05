import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
  message?: string;
}

export default function LoadingScreen({ onComplete, message }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3000;
    const interval = 30;
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-8">
      <div className="text-center space-y-8 max-w-md">
        <div className="relative">
          <Heart className="w-24 h-24 text-red-600 fill-red-600 animate-pulse mx-auto" />
          <Heart className="w-24 h-24 text-red-500 fill-red-500 absolute top-0 left-1/2 -translate-x-1/2 animate-ping opacity-75" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-200 animate-fade-in">
            Loading...
          </h1>
          
          <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-red-600 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <p className="text-sm text-gray-300 animate-pulse leading-relaxed">
            {message || (progress < 100 ? 'Preparing your journey...' : 'Ready! 💕')}
          </p>
        </div>
      </div>
    </div>
  );
}
