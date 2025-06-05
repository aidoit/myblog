// service-worker.js

const CACHE_NAME = 'myblog-cache-v1';
const urlsToCache = ['/'];

// Install a service worker and cache static resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Cache and return requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }
      // Clone the request since requests are streams and can only be consumed once
      const fetchRequest = event.request.clone();
      return fetch(fetchRequest).then((fetchResponse) => {
        // Check if we received a valid response
        if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
          return fetchResponse;
        }
        // Clone the response since responses are streams and can only be consumed once
        const responseToCache = fetchResponse.clone();
        // Cache the fetched response
        caches.open(CACHE_NAME).then((cache) => {
          if (event.request.url.includes('.next/')) {
            cache.put(event.request, responseToCache);
          }
        });
        return fetchResponse;
      });
    })
  );
});

// Update a service worker and delete old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
