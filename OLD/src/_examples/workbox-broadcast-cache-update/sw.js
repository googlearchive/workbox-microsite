importScripts('https://unpkg.com/workbox-broadcast-cache-update@0.0.2/build/importScripts/workbox-broadcast-cache-update.dev.v0.0.2.js');

// Set up some constants used later on.
const testFileUrl = new URL('test.txt', location).toString();
const cacheName = 'workbox-broadcast-cache-update-example';

const broadcastCacheUpdate =
  new workbox.broadcastCacheUpdate.BroadcastCacheUpdate({
  // Choose whatever channel name you'd like. You can also set up multiple
  // instances that broadcast to different channel names.
  channelName: 'test-file-updates',
  // The default headers are ['content-length', 'etag', 'last-modified'].
  // None of those headers will be different when we refetch our test file,
  // though, so we'll check for 'date', which will change eventually.
  headersToCheck: ['date'],
  // You can use any identifying string here.
  source: 'broadcast-cache-update-example',
});

const testFileHandler = async () => {
  const networkResponse = await fetch(testFileUrl);
  const cache = await caches.open(cacheName);
  const cacheResponse = await cache.match(testFileUrl);

  // If there isn't a response already in the cache, then skip checking to see
  // if there's an update.
  if (cacheResponse) {
    broadcastCacheUpdate.notifyIfUpdated({
      first: cacheResponse,
      second: networkResponse,
      url: testFileUrl,
      cacheName,
    });
  }

  await cache.put(testFileUrl, networkResponse.clone());

  return networkResponse;
};

/**
 * Set up a fetch handler that only responds to requests for the test file.
 */
self.addEventListener('fetch', (event) => {
  if (event.request.url === testFileUrl) {
    event.respondWith(testFileHandler());
  }
});

/**
 * This is boilerplate, instructing the service worker to take control as soon
 * as it can.
 */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
