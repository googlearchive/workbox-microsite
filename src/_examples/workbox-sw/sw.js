importScripts('https://unpkg.com/workbox-sw@0.0.1/build/importScripts/workbox-sw.dev.v0.0.1.js');

/**
 * Create an instance of WorkboxSW.
 * Setting clientsClaims to true tells our service worker to take control as
 * soon as it's activated.
 */
const workboxSW = new goog.SWLib({clientsClaim: true});

/**
 * precache() is passed a manifest of URLs and versions, and does the following
 * each time the service worker starts up:
 *   - Adds all new URLs to a cache.
 *   - Refreshes the previously cached response if the URL isn't new, but the
 *     revision changes. This will also trigger a BroadcastChannel API message
 *     sent to the channel 'precache-updates'.
 *   - Removes entries for URLs that used to be in the list, but aren't anymore.
 *   - Sets up a fetch handler to respond to any requests for URLs in this
 *     list using a cache-first strategy.
 *
 * DO NOT CREATE OR UPDATE THIS LIST BY HAND!
 * Instead, add one of our tools (workbox-cli, workbox-webpack-plugin, or
 * workbox-build) to your existing build process, and have that regenerate the
 * manifest at the end of every build.
 */
workboxSW.precache([{
  url: 'precached.txt',
  revision: '43011922c2aef5ed5ee3731b11d3c2cb',
}]);

/**
 * registerNavigationRoute() is used for sites that follow the App Shell Model,
 * https://developers.google.com/web/fundamentals/architecture/app-shell
 * It tells the service worker that whenever there's a navigation request for
 * a new URL, instead of returning the HTML for that URL, return a previously
 * cached "shell" HTML file instead.
 *
 * If you want more control over which navigations use the "shell" HTML, you
 * can provide an optional array of regular expressions:
 *   - whitelist (which defaults to [/./])
 *   - blacklist (which defaults to [])
 *
 * (For the purposes of this demo, which doesn't follow the App Shell Model,
 * registerNavigationRoute() is commented out.)
 */
// workboxSW.router.registerNavigationRoute('app-shell.html', {
//   whitelist: [/./],
//   blacklist: [],
// });

/**
 * Requests for URLs that aren't precached can be handled by runtime caching.
 * Workbox has a flexible routing system, giving you control over which caching
 * strategies to use for which kind of requests.
 *
 * registerRoute() takes a RegExp or a string as its first parameter.
 *   - RegExps can match any part of the request URL.
 *   - Strings are Express-style routes, parsed by
 *     https://github.com/nightwolfz/path-to-regexp
 *
 * registerRoute() takes a caching strategy as its second parameter.
 * The built-in strategies are:
 *   - cacheFirst
 *   - cacheOnly
 *   - networkFirst
 *   - networkOnly
 *   - staleWhileRevalidate
 * Advice about which strategies to use for various assets can be found at
 * https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/
 *
 * Each strategy can be configured with additional options, controlling the
 * name of the cache that's used, cache expiration policies, which response
 * codes are considered valid (useful when you want to cache opaque responses)
 * and whether updates to previously cached responses should trigger a message
 * using the BroadcastChannel API.
 *
 * The following routes show this flexibility put to use.
 */

/**
 * Set up a route that will match any URL requested that ends in .txt.
 * Handle those requests using a network-first strategy.
 */
workboxSW.router.registerRoute(
  /\.txt$/,
  workboxSW.strategies.networkFirst()
);

/**
 * Set up a route that will match any URL requested that starts with
 * https://httpbin.org/delay/.
 * Handle those requests using a network-first strategy, but with a timeout.
 * If there's no network response before the timeout, then return the previous
 * response from the cache instead.
 */
workboxSW.router.registerRoute(
  'https://httpbin.org/delay/(.*)',
  workboxSW.strategies.networkFirst({networkTimeoutSeconds: 3})
);

/**
 * Set up a route that will match any URL requested that starts with
 * https://httpbin.org/image/.
 * Handle those requests using a cache-first strategy, storing them in a
 * dedicated cache named 'images'.
 * That cache has a maximum size of 2 entries,
 * and once that's reached, the least-recently used entry will be deleted.
 * Additionally, any entries older than 7 * 24 * 60 * 60 seconds (1 week) will
 * be deleted.
 * Because the image responses are cross-domain and don't use CORS, they will
 * be "opaque", and have a status code of 0. When using a cache-first strategy,
 * we need to explicitly opt-in to caching responses with a status of 0.
 */
workboxSW.router.registerRoute(
  'https://httpbin.org/image/(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'images',
    cacheExpiration: {
      maxEntries: 2,
      maxAgeSeconds: 7 * 24 * 60 * 60,
    },
    cacheableResponse: {statuses: [0, 200]},
  })
);
