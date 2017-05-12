window.addEventListener('load', function() {
  if (navigator.serviceWorker) {
    if (window.BroadcastChannel) {
      const updateChannel = new window.BroadcastChannel('precache-updates');
      updateChannel.addEventListener('message', (event) => {
        console.log(event);
        window.__workbox.toast.show(
          'This page has been updated. Please refresh the page.');
      });
    }
    navigator.serviceWorker.register('/sw.js')
    .catch(() => {
      // NOOP
    });
  }
});
