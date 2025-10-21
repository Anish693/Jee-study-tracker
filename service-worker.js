// A minimal service worker for caching
const CACHE_NAME = 'manzil-tracker-cache-v1';
const urlsToCache = [
  '/',
  '/manzil_tracker.html',
  '/manifest.json',
  // You would list your icon files here too: '/icon-192x192.png', '/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
