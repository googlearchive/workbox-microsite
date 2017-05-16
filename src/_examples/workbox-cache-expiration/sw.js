importScripts('https://unpkg.com/workbox-cache-expiration@0.0.2/build/importScripts/workbox-cache-expiration.dev.v0.0.2.js');

const cacheName = 'cache-expiration-example';

// You can set maxEntries, maxAgeSeconds, or both.
const cacheExpiration = new workbox.cacheExpiration.CacheExpiration({
  maxEntries: 2,
  maxAgeSeconds: 10,
});

const testFileHandler = async (request) => {
  const networkResponse = await fetch(request);
  const cache = await caches.open(cacheName);

  // You **must** to call updateTimestamp() following each call to put() or
  // add(), or else CacheExpiration will not know what to expire.
  await cache.put(request, networkResponse.clone());
  await cacheExpiration.updateTimestamp({
    url: request.url,
    cacheName,
  });

  // Once the timestamps have been updated, call expireEntries() to actually
  // perform the cache cleanup. You can optionally wait for the cleanup to
  // complete before returning the response.
  await cacheExpiration.expireEntries({cacheName});

  return networkResponse;
};

/**
 * Set up a fetch handler that only responds to requests for .txt files.
 */
self.addEventListener('fetch', (event) => {
  if (event.request.url.endsWith('.txt')) {
    event.respondWith(testFileHandler(event.request));
  }
});

/**
 * This is boilerplate, instructing the service worker to take control as soon
 * as it can.
 */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
