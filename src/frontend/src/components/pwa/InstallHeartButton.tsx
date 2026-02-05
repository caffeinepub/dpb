import { useState } from 'react';
import { Heart } from 'lucide-react';
import { usePwaInstall } from '../../pwa/usePwaInstall';
import InstallHelpDialog from './InstallHelpDialog';

export default function InstallHeartButton() {
  const { isInstallable, isIOS, isDismissed, promptInstall, dismiss } = usePwaInstall();
  const [showHelpDialog, setShowHelpDialog] = useState(false);

  // Check if already installed/standalone
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                       (window.navigator as any).standalone === true;

  // Don't show if dismissed, already installed, or not installable and not iOS
  if (isDismissed || isStandalone || (!isInstallable && !isIOS)) {
    return null;
  }

  const handleClick = async () => {
    if (isIOS) {
      // On iOS, show help dialog
      setShowHelpDialog(true);
    } else if (isInstallable) {
      // On other platforms, trigger install prompt
      const installed = await promptInstall();
      if (!installed) {
        // If user dismissed the prompt, show help dialog as fallback
        setShowHelpDialog(true);
      }
    }
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    dismiss();
  };

  return (
    <>
      <button
        onClick={handleClick}
        aria-label="Install DPB App"
        className="group relative inline-flex items-center justify-center"
      >
        {/* Main heart button */}
        <div className="relative">
          <Heart 
            className="w-12 h-12 sm:w-14 sm:h-14 text-black fill-black transition-transform group-hover:scale-110 group-active:scale-95" 
          />
          {/* Subtle glow effect on hover */}
          <Heart 
            className="w-12 h-12 sm:w-14 sm:h-14 text-red-600 fill-red-600 absolute top-0 left-0 opacity-0 group-hover:opacity-30 transition-opacity blur-sm" 
          />
        </div>
        
        {/* Install text label */}
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Install App
        </span>

        {/* Dismiss button (small X) */}
        <button
          onClick={handleDismiss}
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors text-xs"
          aria-label="Dismiss install prompt"
        >
          ×
        </button>
      </button>

      <InstallHelpDialog 
        open={showHelpDialog} 
        onOpenChange={setShowHelpDialog} 
      />
    </>
  );
}
