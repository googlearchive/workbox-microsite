window.addEventListener('load', function() {
  if (navigator.serviceWorker) {
    if (window.BroadcastChannel) {
      const stripString = (input, strip) => {
        if(input.endsWith(strip)) {
          return input.substring(0, input.length - strip.length);
        }

        return input;
      };

      const noAction = (url) => url;
      const stripHtml = (url) => stripString(url, '.html');
      const stripIndex = (url) => stripString(url, 'index');

      const mutations = [noAction, stripHtml, stripIndex];

      const updateChannel = new window.BroadcastChannel('precache-updates');
      updateChannel.addEventListener('message', (event) => {
        let updatedUrl = event.data.payload.updatedUrl;
        mutations.forEach((mutationfunc) => {
          updatedUrl = mutationfunc(updatedUrl);
          if (updatedUrl === location.href) {
            window.__workbox.toast.show(
              'This page has been updated. Please refresh the page.');
          }
        });
      });
    }
    navigator.serviceWorker.register('/sw.js')
    .catch(() => {
      // NOOP
    });
  }
});
