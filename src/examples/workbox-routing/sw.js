importScripts('https://unpkg.com/sw-routing@0.0.22');

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

const crossOriginExpressRoute = new goog.routing.ExpressRoute({
  path: 'https://httpbin.org/(.*)',
  handler: ({event}) => {
    console.log('Request made to httpbin.org.');
    return fetch(event.request);
  },
});

const localRegExpRoute = new goog.routing.RegExpRoute({
  regExp: /\.json/,
  handler: ({event}) => {
    console.log('Request made for a local .json file.');
    return fetch(event.request);
  },
});

const router = new goog.routing.Router();
router.registerRoutes({
  routes: [crossOriginExpressRoute, localRegExpRoute],
});
