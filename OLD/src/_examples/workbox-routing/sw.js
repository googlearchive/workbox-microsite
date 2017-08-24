importScripts('https://unpkg.com/workbox-routing@0.0.2/build/importScripts/workbox-routing.dev.v0.0.2.js');

const router = new workbox.routing.Router();

// This route uses Express-style path matching.
// Because we're using a path that starts with with 'https', it will also match
// cross-origin requests.
const crossOriginExpressRoute = new workbox.routing.ExpressRoute({
  path: 'https://httpbin.org/(.*)',
  handler: ({event}) => {
    console.log('Routed through the httpbin.org handler.');
    return fetch(event.request);
  },
});

// This route uses RegExp matching.
// If the RegExp matches any part of the request URL, then the route will be
// triggered.
const localRegExpRoute = new workbox.routing.RegExpRoute({
  regExp: /\.json$/,
  handler: ({event}) => {
    console.log('Routed through the /\.json$/ handler.');
    return fetch(event.request);
  },
});

// The routes are not active until we register them.
router.registerRoutes({
  routes: [crossOriginExpressRoute, localRegExpRoute],
});

// You can also create an optional default handler that can respond to requests
// that don't match anything.
// If you don't create a default handler, then requests that don't match will
// just be passed along to the network without service worker involvement.
router.setDefaultHandler({
  handler: ({event}) => {
    console.log('Routed through the default handler.');
    return fetch(event.request);
  },
});

// Finally, you can create an optional "catch" handler that will be triggered
// whenever there's an exception thrown that prevents a handler from
// responding. It gives you a chance to provide a generic response.
router.setCatchHandler({
  handler: () => {
    console.log('Routed through the catch handler.');
    return new Response('Catch handler response.');
  },
});

/**
 * This is boilerplate, instructing the service worker to take control as soon
 * as it can.
 */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
