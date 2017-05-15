function log(level, message) {
  console[level](message);
  const li = document.createElement('li');
  li.textContent = message;
  li.className = level;
  document.querySelector('#example-log').appendChild(li);
  return Promise.resolve();
}

if ('serviceWorker' in navigator) {
  const swUrl = new URL('sw.js', location).href;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register(swUrl).catch((error) => {
      log('warn', `Service worker registration failed: ${error}`);
    });
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
} else {
  log('warn', 'Your browser does not support service workers.');
}
