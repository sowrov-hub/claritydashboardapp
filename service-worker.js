const CACHE_NAME = 'clarity-dashboard-v3';
const APP_SHELL = [
  './Clarity%20Dashboard.html',
  './manifest.webmanifest',
  './ChatGPT%20Image%20May%2019%2C%202026%2C%2003_02_46%20PM.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      const network = fetch(event.request)
        .then(response => {
          if (response.ok && new URL(event.request.url).origin === self.location.origin) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached || (event.request.mode === 'navigate'
          ? caches.match('./Clarity%20Dashboard.html')
          : Response.error()));
      return cached || network;
    })
  );
});
