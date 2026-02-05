import { useState, useRef } from 'react';
import { Sun, Moon } from 'lucide-react';

interface Level002Props {
  onWin: () => void;
  onLose: () => void;
}

export default function Level002({ onWin, onLose }: Level002Props) {
  const [sunPosition, setSunPosition] = useState(20);
  const [isNight, setIsNight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging && e.type !== 'touchmove') return;
    
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const y = ((clientY - rect.top) / rect.height) * 100;
    const clampedY = Math.max(10, Math.min(90, y));
    
    setSunPosition(clampedY);

    if (clampedY > 75) {
      setIsNight(true);
      setTimeout(() => onWin(), 800);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-200">
          Make it night
        </h2>
        <p className="text-sm text-gray-400 mt-2">
          (Hint: Drag the sun down! 🌅)
        </p>
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleDrag}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchMove={handleDrag}
        onTouchEnd={handleDragEnd}
        className={`relative w-full h-96 rounded-xl border-2 transition-all duration-700 ${
          isNight
            ? 'bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-950 border-indigo-700'
            : 'bg-gradient-to-b from-sky-300 via-sky-200 to-orange-100 border-sky-300'
        }`}
      >
        <div
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          className="absolute left-1/2 -translate-x-1/2 cursor-move touch-none"
          style={{ top: `${sunPosition}%`, transform: 'translate(-50%, -50%)' }}
        >
          {isNight ? (
            <Moon className="w-20 h-20 text-yellow-100 fill-yellow-100" />
          ) : (
            <Sun className="w-20 h-20 text-yellow-400 fill-yellow-400 animate-pulse" />
          )}
        </div>

        {isNight && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
