import { useState } from 'react';
import { Heart } from 'lucide-react';
import { usePwaInstall } from '../../pwa/usePwaInstall';
import InstallHelpDialog from './InstallHelpDialog';

export default function InstallHeartButton() {
  const { isInstallable, isStandalone, promptInstall } = usePwaInstall();
  const [showHelpDialog, setShowHelpDialog] = useState(false);

  // Don't show if already installed/standalone
  if (isStandalone) {
    return null;
  }

  const handleClick = async () => {
    if (isInstallable) {
      // Native prompt is available - trigger it
      const installed = await promptInstall();
      if (!installed) {
        // If user dismissed the native prompt, show help dialog as fallback
        setShowHelpDialog(true);
      }
    } else {
      // No native prompt available (iOS or other platforms) - show help dialog
      setShowHelpDialog(true);
    }
  };

  return (
    <>
      {/* Heart-shaped install button - always visible, no dismiss */}
      <button
        onClick={handleClick}
        aria-label="Install DPB App"
        className="group relative inline-flex items-center justify-center"
      >
        {/* Animated heart with pulsing effect */}
        <div className="relative">
          <Heart className="w-14 h-14 sm:w-16 sm:h-16 text-red-600 fill-red-600 transition-transform duration-200 group-hover:scale-110 group-active:scale-95 drop-shadow-lg" />
          <Heart className="w-14 h-14 sm:w-16 sm:h-16 text-red-500 fill-red-500 absolute top-0 left-0 animate-ping opacity-75" />
          
          {/* Install text overlay on heart */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] sm:text-xs font-bold text-white drop-shadow-md leading-tight text-center px-1">
              Install<br/>App
            </span>
          </div>
        </div>
      </button>

      <InstallHelpDialog 
        open={showHelpDialog} 
        onOpenChange={setShowHelpDialog} 
      />
    </>
  );
}
