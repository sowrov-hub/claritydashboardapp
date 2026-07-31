const CACHE_NAME = 'clarity-dashboard-v6';

// 1. Double-check exact asset file names in your repo
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './ChatGPT Image May 19, 2026, 03_02_46 PM.png' // Ensure exact filename match
];

// Install Event - Pre-cache core shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Use Promise.allSettled or cache individually so 1 missing image doesn't break offline mode
      return Promise.all(
        APP_SHELL.map((url) =>
          cache.add(url).catch((err) => console.warn(`Failed to cache ${url}:`, err))
        )
      );
    })
  );
  self.skipWaiting();
});

// Activate Event - Clean up old cache versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch Event - Dynamic caching for smooth offline experience
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // 1. Return cached asset immediately if available
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // If offline and navigating to a page, fall back to root index.html
          if (event.request.mode === 'navigate') {
            return caches.match('./') || caches.match('./index.html');
          }
        });

      return cachedResponse || fetchPromise;
    })
  );
});
