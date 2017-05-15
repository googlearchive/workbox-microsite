function log(level, message) {
  console[level](message);
  const li = document.createElement('li');
  li.textContent = message;
  li.className = level;
  document.querySelector('#example-log').appendChild(li);
  return Promise.resolve();
}

async function logCachedFiles(cacheName) {
  const cache = await caches.open(cacheName);
  const requests = await cache.keys();
  const urls = requests.map((request) => request.url.split('/').pop());
  log('info', `Entries cached in ${cacheName}: ${JSON.stringify(urls)}`);
}

if ('serviceWorker' in navigator) {
  const swUrl = new URL('sw.js', location).href;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register(swUrl).catch((error) => {
      log('warn', `Service worker registration failed: ${error}`);
    });

    const currentController = navigator.serviceWorker.controller;
    if (currentController && currentController.scriptURL === swUrl) {
      log('info', 'The example service worker is controlling this page.');
    } else {
      navigator.serviceWorker.oncontrollerchange = (event) => {
        if (event.target.controller.scriptURL === swUrl) {
          log('info', 'The example service worker is controlling this page.');
        }
      };
    }
  });
} else {
  log('warn', 'Your browser does not support service workers.');
}
