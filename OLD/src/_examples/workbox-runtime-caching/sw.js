importScripts('https://unpkg.com/workbox-runtime-caching@0.0.2/build/importScripts/workbox-runtime-caching.dev.v0.0.2.js');

/**
 * You can extend the base Handler class to implement your own strategies.
 */
class CustomHandler extends workbox.runtimeCaching.Handler {
  /**
   * handle() is passed an Object with an event property, and should return a
   * Promise for a Response.
   */
  handle({event}) {
    console.log('CustomHandler is handling', event);
    // this.requestWrapper is a RequestWrapper instance:
    // https://workboxjs.org/reference-docs/latest/module-workbox-runtime-caching.RequestWrapper.html#main
    return this.requestWrapper.fetch({
      request: event.request,
    }).catch(() => new Response('Oops! The fetch() failed.'));
  }
}

/**
 * Initialize all of the different strategies using the default settings.
 */
const strategies = {
  networkOnly: new workbox.runtimeCaching.NetworkOnly(),
  networkFirst: new workbox.runtimeCaching.NetworkFirst(),
  // CacheOnly will always fail, because we don't have the URL precached.
  cacheOnly: new workbox.runtimeCaching.CacheOnly(),
  cacheFirst: new workbox.runtimeCaching.CacheFirst(),
  staleWhileRevalidate: new workbox.runtimeCaching.StaleWhileRevalidate(),
  custom: new CustomHandler(),
};

/**
 * Set up a fetch handler that uses caching strategy corresponding to the value
 * of the `strategy` URL parameter.
 */
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const strategyToUse = url.searchParams.get('strategy');
  if (strategyToUse in strategies) {
    event.respondWith(
      strategies[strategyToUse].handle({event})
    );
  }
});

/**
 * This is boilerplate, instructing the service worker to take control as soon
 * as it can.
 */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
