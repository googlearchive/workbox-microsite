window.addEventListener('load', function() {
  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js')
    .catch(() => {
      // NOOP
    });
  }
});
