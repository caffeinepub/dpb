import { useState } from 'react';
import { Heart } from 'lucide-react';
import { usePwaInstall } from '../../pwa/usePwaInstall';
import InstallHelpDialog from './InstallHelpDialog';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

export default function InstallHeartButton() {
  const { isInstallable, isIOS, isStandalone, promptInstall } = usePwaInstall();
  const [showHelp, setShowHelp] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  // Don't show if already installed/standalone
  if (isStandalone) {
    return null;
  }

  const handleClick = async () => {
    if (isInstallable) {
      // Native prompt is available (Android/Chrome) - trigger it directly
      await promptInstall();
    } else if (isIOS) {
      // iOS device - show install help dialog
      setShowHelp(true);
    } else {
      // Not installable and not iOS - show fallback message
      setShowFallback(true);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        aria-label="Install App"
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

      {/* iOS Install Help Dialog */}
      <InstallHelpDialog open={showHelp} onOpenChange={setShowHelp} />

      {/* Fallback Alert for unsupported browsers */}
      <AlertDialog open={showFallback} onOpenChange={setShowFallback}>
        <AlertDialogContent className="max-w-sm bg-gray-900 border-pink-700/50 text-gray-100">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-pink-400">Install App</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              Installation is not currently available in this browser. To install the app, please use your browser's menu and look for "Add to Home Screen" or "Install App" option.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-pink-600 hover:bg-pink-700 text-white">
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
