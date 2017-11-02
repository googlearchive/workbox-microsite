/* eslint-env node */

const functions = require('firebase-functions');

const DEBUG = false;

module.exports = {
  app: functions.https.onRequest((req, res) => {
    if (req.url === '/sw.js') {
      // Reset our service worker to an empty file.
      res.type('.js');
      res.send('self.registration.unregister();');
      return;
    }

    let newURL = `https://developers.google.com/web/tools/workbox${req.url}`;
    if (req.url.startsWith('/examples/')) {
      // Original examples were hosted on workboxjs.org as
      // /examples/<example name>. Now they are on glitch - so redirect to
      // examples index path
      newURL = `https://developers.google.com/web/tools/workbox/examples/`;
    } else if (req.url.startsWith('/how_tos/')) {
      // how tos don't exist on developers.google.com cos everything is out of
      // date, so redirect to home page.
      newURL = `https://developers.google.com/web/tools/workbox/`;
    }
    if (DEBUG) {
      res.send(newURL.toString());
    } else {
      res.redirect(301, newURL.toString());
    }
  }),
};
