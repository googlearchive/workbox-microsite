const buttons = document.querySelectorAll('button');
for (let button of [...buttons]) {
  button.addEventListener('click', () => {
    const url = button.dataset.url;
    log('info', `Requesting ${url}...`)
      .then(() => fetch(button.dataset.url))
      .then((response) => log('info', `...request complete. ` +
        `Date header is '${response.headers.get('date')}'`))
      .catch((error) => log('warn', `...fetch failed due to '${error}'.`));
  });
}

// This code sets up a listener for messages broadcast to 'test-file-updates'.
// Those messages will come from the service worker if the response for a file
// received from the network is different from the previously cached response.
const updatesChannel = new BroadcastChannel('test-file-updates');
updatesChannel.addEventListener('message', (event) => {
  log('info', `The network response has a different Date: header than the ` +
    `cached response: ${JSON.stringify(event.data)}`);
});
