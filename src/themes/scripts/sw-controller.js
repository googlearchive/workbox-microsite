window.addEventListener('load', function() {
  if (navigator.serviceWorker) {
    if (window.BroadcastChannel) {
      const updateChannel = new window.BroadcastChannel('precache-updates');
      updateChannel.addEventListener('message', (event) => {
        if (event.data.payload.updatedUrl === location.href) {
          window.__workbox.toast.show(
            'This page has been updated. Please refresh the page.');
        } else {
          console.log('Precache has updated in the background: ', event);
        }
      });
    }
    navigator.serviceWorker.register('/sw.js')
    .catch(() => {
      // NOOP
    });
  }
});
