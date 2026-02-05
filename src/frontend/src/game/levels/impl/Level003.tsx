import { useState, useRef, useEffect } from 'react';
import { Mail, MailOpen } from 'lucide-react';

interface Level003Props {
  onWin: () => void;
  onLose: () => void;
}

export default function Level003({ onWin, onLose }: Level003Props) {
  const [isPressed, setIsPressed] = useState(false);
  const [pressTime, setPressTime] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pressStartRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handlePressStart = () => {
    setIsPressed(true);
    pressStartRef.current = Date.now();
    
    timerRef.current = setTimeout(() => {
      setIsOpen(true);
      setTimeout(() => onWin(), 500);
    }, 1500);
  };

  const handlePressEnd = () => {
    setIsPressed(false);
    const duration = Date.now() - pressStartRef.current;
    setPressTime(duration);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (duration < 1500 && !isOpen) {
      setAttempts((prev) => prev + 1);
      if (attempts >= 2) {
        setTimeout(() => onLose(), 500);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-200">
          Open the letter
        </h2>
        <p className="text-sm text-gray-400 mt-2">
          (Hint: Hold it gently... 💌)
        </p>
      </div>

      <div className="flex flex-col items-center justify-center space-y-6">
        <div
          onMouseDown={handlePressStart}
          onMouseUp={handlePressEnd}
          onMouseLeave={handlePressEnd}
          onTouchStart={handlePressStart}
          onTouchEnd={handlePressEnd}
          className={`cursor-pointer transition-all duration-300 ${
            isPressed ? 'scale-110' : 'scale-100'
          } ${isOpen ? 'animate-bounce' : ''}`}
        >
          {isOpen ? (
            <MailOpen className="w-32 h-32 text-red-600 fill-red-600" />
          ) : (
            <Mail className="w-32 h-32 text-red-600 fill-red-600" />
          )}
        </div>

        {isPressed && !isOpen && (
          <div className="w-64 bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-red-600 transition-all duration-150"
              style={{ width: `${(pressTime / 1500) * 100}%` }}
            />
          </div>
        )}

        {isOpen && (
          <div className="bg-gray-800/50 p-6 rounded-xl max-w-md border border-gray-700">
            <p className="text-gray-200 text-center">
              You opened it with patience! 💕
            </p>
          </div>
        )}

        <p className="text-center text-sm text-gray-400">
          {isPressed ? 'Keep holding...' : `Attempts: ${attempts}/3`}
        </p>
      </div>
    </div>
  );
}
