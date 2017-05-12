function log(level, message) {
  console[level](message);
  const li = document.createElement('li');
  li.textContent = message;
  li.className = level;
  document.querySelector('#example-log').appendChild(li);
  return Promise.resolve();
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').then(() => {
      log('info', `This example's service worker has been registered.`);
    }).catch((error) => {
      log('warn', `Service worker registration failed: ${error}`);
    });
  });
} else {
  log('warn', 'Your browser does not support service workers.');
}
