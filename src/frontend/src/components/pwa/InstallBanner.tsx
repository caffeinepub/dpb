import { useState } from 'react';
import { Download, X, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePwaInstall } from '../../pwa/usePwaInstall';
import InstallHelpDialog from './InstallHelpDialog';

export default function InstallBanner() {
  const { isInstallable, isIOS, isDismissed, isStandalone, promptInstall, dismiss } = usePwaInstall();
  const [showHelp, setShowHelp] = useState(false);

  // Don't show if already installed/standalone
  if (isStandalone) {
    return null;
  }

  // Don't show if dismissed or not installable and not iOS
  if (isDismissed || (!isInstallable && !isIOS)) {
    return null;
  }

  const handleInstall = async () => {
    if (isInstallable) {
      await promptInstall();
    }
  };

  return (
    <>
      <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto">
        <div className="bg-gradient-to-r from-pink-900/95 to-purple-900/95 backdrop-blur-md rounded-lg shadow-2xl border border-pink-700/50 p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 p-2 bg-pink-600/30 rounded-full">
              <Download className="w-5 h-5 text-pink-200" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white mb-1">
                Install App
              </h3>
              
              {isIOS ? (
                <p className="text-xs text-gray-300 mb-3">
                  Tap <span className="font-semibold">Share</span> → <span className="font-semibold">Add to Home Screen</span>
                </p>
              ) : (
                <p className="text-xs text-gray-300 mb-3">
                  Install this app for quick access and offline support
                </p>
              )}
              
              <div className="flex gap-2">
                {isInstallable && (
                  <Button
                    size="sm"
                    onClick={handleInstall}
                    className="bg-pink-600 hover:bg-pink-700 text-white text-xs h-8"
                  >
                    Install
                  </Button>
                )}
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowHelp(true)}
                  className="border-pink-600/50 text-pink-200 hover:bg-pink-800/30 text-xs h-8"
                >
                  <HelpCircle className="w-3 h-3 mr-1" />
                  How to Install
                </Button>
              </div>
            </div>
            
            <button
              onClick={dismiss}
              className="flex-shrink-0 p-1 hover:bg-white/10 rounded transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4 text-gray-300" />
            </button>
          </div>
        </div>
      </div>

      <InstallHelpDialog open={showHelp} onOpenChange={setShowHelp} />
    </>
  );
}
