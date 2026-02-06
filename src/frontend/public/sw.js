// Version-based cache naming for proper cache busting
// IMPORTANT: Increment this version number to force cache refresh
const CACHE_VERSION = '3';
const CACHE_NAME = `dpb-v${CACHE_VERSION}`;
const RUNTIME_CACHE = `dpb-runtime-v${CACHE_VERSION}`;

// Core app shell files to cache on install
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/assets/generated/pwa-icon-192.dim_192x192.png',
  '/assets/generated/pwa-icon-maskable-192.dim_192x192.png',
  '/assets/generated/pwa-icon-512.dim_512x512.png',
  '/assets/generated/pwa-icon-maskable-512.dim_512x512.png',
  '/assets/generated/apple-touch-icon.dim_180x180.png',
  '/assets/generated/favicon.dim_32x32.png',
  '/assets/generated/romantic-pattern.dim_1024x1024.png'
];

// Install event - cache core files
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker v' + CACHE_VERSION);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching app shell files');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => {
        console.log('[SW] App shell cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Failed to cache app shell:', error);
      })
  );
});

// Activate event - clean up ALL old caches and claim clients immediately
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker v' + CACHE_VERSION);
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      // Delete ALL caches that don't match current version
      return Promise.all(
        cacheNames
          .filter((name) => {
            // Keep only current version caches
            return name !== CACHE_NAME && name !== RUNTIME_CACHE;
          })
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => {
      console.log('[SW] Service worker activated, claiming all clients');
      return self.clients.claim();
    })
  );
});

// Fetch event - network first for critical PWA files, cache first for assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip Internet Computer canister calls (they need network)
  if (url.hostname.includes('.ic0.app') || url.hostname.includes('.icp0.io')) {
    return;
  }

  // CRITICAL: Network-first for manifest.webmanifest to avoid stale manifest
  if (url.pathname === '/manifest.webmanifest') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
    return;
  }

  // CRITICAL: Network-first for PWA icons to ensure fresh icons
  if (url.pathname.includes('/assets/generated/pwa-icon-') || 
      url.pathname.includes('/assets/generated/apple-touch-icon')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
    return;
  }

  // For navigation requests, try network first, fallback to cache
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful responses
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(request).then((cachedResponse) => {
            return cachedResponse || caches.match('/index.html') || caches.match('/');
          });
        })
    );
    return;
  }

  // For other requests (assets, scripts), cache first, fallback to network
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then((response) => {
        // Cache successful responses from same origin
        if (response.ok && url.origin === location.origin) {
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      });
    })
  );
});
