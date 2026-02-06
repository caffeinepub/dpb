export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((registration) => {
          console.log('[PWA] Service Worker registered successfully');
          console.log('[PWA] Scope:', registration.scope);
          console.log('[PWA] Active:', !!registration.active);
          console.log('[PWA] Installing:', !!registration.installing);
          console.log('[PWA] Waiting:', !!registration.waiting);

          // Log controller status
          if (navigator.serviceWorker.controller) {
            console.log('[PWA] Page is controlled by SW:', navigator.serviceWorker.controller.scriptURL);
          } else {
            console.log('[PWA] Page is NOT controlled by SW yet (may need refresh)');
          }

          // Force update check on registration
          registration.update().catch((err) => {
            console.log('[PWA] Update check failed:', err);
          });

          // Check for updates periodically (every 60 seconds)
          setInterval(() => {
            registration.update().catch((err) => {
              console.log('[PWA] Periodic update check failed:', err);
            });
          }, 60000);

          // Check for updates on visibility change
          document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
              registration.update().catch((err) => {
                console.log('[PWA] Visibility update check failed:', err);
              });
            }
          });

          // Handle update found
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            console.log('[PWA] Update found, new worker installing...');
            
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                console.log('[PWA] New worker state:', newWorker.state);
                
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('[PWA] New service worker available. Will activate on next visit.');
                  // Optionally reload to activate immediately
                  // window.location.reload();
                }
                
                if (newWorker.state === 'activated') {
                  console.log('[PWA] New service worker activated');
                }
              });
            }
          });

          // Listen for controller change
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log('[PWA] Controller changed, page now controlled by SW');
          });

          // Wait for service worker to be ready and controlling
          navigator.serviceWorker.ready.then((reg) => {
            console.log('[PWA] Service worker is ready and active');
            if (navigator.serviceWorker.controller) {
              console.log('[PWA] Page is now controlled by service worker');
            }
          });
        })
        .catch((error) => {
          console.error('[PWA] Service Worker registration failed:', error);
        });
    });
  } else {
    console.warn('[PWA] Service Workers not supported in this browser');
  }
}
