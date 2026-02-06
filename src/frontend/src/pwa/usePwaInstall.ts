import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISS_KEY = 'pwa-install-dismissed';

export function usePwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [hasServiceWorkerController, setHasServiceWorkerController] = useState(false);
  const [manifestUrl, setManifestUrl] = useState<string>('');
  const [beforeInstallPromptCaptured, setBeforeInstallPromptCaptured] = useState(false);

  useEffect(() => {
    // Check if running on iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    // Check if already installed/running in standalone mode
    const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                       (window.navigator as any).standalone === true;
    setIsStandalone(standalone);
    
    // Check service worker controller status
    const checkController = () => {
      setHasServiceWorkerController(!!navigator.serviceWorker?.controller);
    };
    checkController();
    
    // Listen for controller changes
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', checkController);
    }

    // Get manifest URL
    const manifestLink = document.querySelector('link[rel="manifest"]') as HTMLLinkElement;
    if (manifestLink) {
      const resolvedUrl = new URL(manifestLink.href, window.location.href).href;
      setManifestUrl(resolvedUrl);
    }
    
    if (standalone) {
      return; // Already installed, don't show prompt
    }

    // Check if user previously dismissed the install prompt
    const dismissed = localStorage.getItem(DISMISS_KEY) === 'true';
    setIsDismissed(dismissed);

    if (dismissed) {
      return; // User dismissed, don't show prompt
    }

    // Listen for beforeinstallprompt event (Chrome, Edge, Samsung Internet)
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('[PWA] beforeinstallprompt event fired');
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
      setIsInstallable(true);
      setBeforeInstallPromptCaptured(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.removeEventListener('controllerchange', checkController);
      }
    };
  }, []);

  const promptInstall = async () => {
    if (!deferredPrompt) {
      return false;
    }

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('[PWA] User accepted the install prompt');
        setIsInstallable(false);
        return true;
      } else {
        console.log('[PWA] User dismissed the install prompt');
        // Treat native prompt dismissal as a dismissal
        localStorage.setItem(DISMISS_KEY, 'true');
        setIsDismissed(true);
        return false;
      }
    } catch (error) {
      console.error('[PWA] Error prompting install:', error);
      return false;
    } finally {
      setDeferredPrompt(null);
    }
  };

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, 'true');
    setIsDismissed(true);
  };

  return {
    isInstallable,
    isIOS,
    isDismissed,
    isStandalone,
    hasServiceWorkerController,
    manifestUrl,
    beforeInstallPromptCaptured,
    promptInstall,
    dismiss,
  };
}
