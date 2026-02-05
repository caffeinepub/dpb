import { useState, useRef } from 'react';
import { Heart } from 'lucide-react';

interface Level001Props {
  onWin: () => void;
  onLose: () => void;
}

export default function Level001({ onWin, onLose }: Level001Props) {
  const [heartPosition, setHeartPosition] = useState({ x: 50, y: 50 });
  const [attempts, setAttempts] = useState(0);
  const heartRef = useRef<HTMLDivElement>(null);

  const handleHeartClick = () => {
    setAttempts((prev) => prev + 1);
    
    const newX = Math.random() * 60 + 20;
    const newY = Math.random() * 60 + 20;
    setHeartPosition({ x: newX, y: newY });

    if (attempts >= 2) {
      setTimeout(() => onLose(), 500);
    }
  };

  const handleInstructionClick = () => {
    onWin();
  };

  return (
    <div className="space-y-8">
      <div
        onClick={handleInstructionClick}
        className="text-center cursor-pointer hover:scale-105 transition-transform"
      >
        <h2 className="text-2xl font-bold text-rose-800">
          Tap the heart
        </h2>
        <p className="text-sm text-rose-600 mt-2">
          (Hint: Think differently! 💭)
        </p>
      </div>

      <div className="relative w-full h-96 bg-rose-50/50 rounded-xl border-2 border-rose-200">
        <div
          ref={heartRef}
          onClick={handleHeartClick}
          className="absolute cursor-pointer transition-all duration-300 hover:scale-110"
          style={{
            left: `${heartPosition.x}%`,
            top: `${heartPosition.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Heart className="w-16 h-16 text-red-600 fill-red-600 animate-pulse" />
        </div>
      </div>

      <p className="text-center text-sm text-rose-700">
        Attempts: {attempts}/3
      </p>
    </div>
  );
}
