importScripts('https://unpkg.com/sw-routing@0.0.22');

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

const crossOriginExpressRoute = new goog.routing.ExpressRoute({
  path: 'https://httpbin.org/(.*)',
  handler: ({request}) => {
    console.log('Request made to httpbin.org.');
    return fetch(request);
  },
});

const localRegExpRoute = new goog.routing.RegExpRoute({
  regExp: /\.jpg$/,
  handler: ({request}) => {
    console.log('Request made for a local .jpg file.');
    return fetch(request);
  },
});

const router = new goog.routing.Router();
router.registerRoutes({
  routes: [crossOriginExpressRoute, localRegExpRoute],
});
