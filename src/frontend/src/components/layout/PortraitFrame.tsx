import { type ReactNode } from 'react';
import InstallBanner from '../pwa/InstallBanner';

interface PortraitFrameProps {
  children: ReactNode;
  showPattern?: boolean;
  showInstallUI?: boolean;
}

export default function PortraitFrame({ children, showPattern = true, showInstallUI = false }: PortraitFrameProps) {
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
        {children}
        {showInstallUI && <InstallBanner />}
      </div>
    </div>
  );
}
