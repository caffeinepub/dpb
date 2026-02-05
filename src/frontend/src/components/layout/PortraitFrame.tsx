import { type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { lockPassword } from '../../game/storage/passwordGate';

interface PortraitFrameProps {
  children: ReactNode;
  showPattern?: boolean;
  onRelock?: () => void;
}

export default function PortraitFrame({ children, showPattern = true, onRelock }: PortraitFrameProps) {
  const handleRelock = () => {
    lockPassword();
    if (onRelock) {
      onRelock();
    }
  };

  return (
    <div className="min-h-screen w-full bg-black">
      <div 
        className="mx-auto max-w-2xl min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 shadow-romantic relative"
        style={showPattern ? {
          backgroundImage: 'url(/assets/generated/romantic-pattern.dim_1024x1024.png)',
          backgroundSize: '400px 400px',
          backgroundRepeat: 'repeat',
          backgroundBlendMode: 'overlay',
          opacity: 0.95,
        } : undefined}
      >
        {onRelock && (
          <div className="absolute top-4 right-4 z-50">
            <Button
              onClick={handleRelock}
              variant="outline"
              size="sm"
              className="bg-gray-900/90 backdrop-blur-sm border-gray-700 hover:bg-gray-800 text-gray-300"
            >
              <Lock className="w-4 h-4 mr-2" />
              Relock
            </Button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
