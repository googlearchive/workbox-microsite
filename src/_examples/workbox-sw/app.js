const fetchAndLog = async (url) => {
  log('info', `Requesting ${url}...`);
  try {
    const response = await fetch(url);
    const text = await response.text();
    log('info', `...the response is '${text}'.`);
  } catch(error) {
    log('warn', `...fetch failed due to '${error}'.`);
  }
};

const randomBytesUpdates = new BroadcastChannel('random-bytes-updated');
randomBytesUpdates.addEventListener('message', (event) => {
  log('info', `${event.data.payload.updatedUrl} was updated.
      The new value will be used the next time a request is made.`);
});

const httpBinImgElement = document.querySelector('#httpbinimage');
const httpBinImageFormats = ['jpeg', 'png', 'webp'];

const buttonHandlers = {
  precached: () => fetchAndLog('precached.txt'),
  hello: () => fetchAndLog('hello.txt'),
  notmatched: () => fetchAndLog('not-matched.dat'),
  delay: () => fetchAndLog(
    `https://httpbin.org/delay/${Math.floor(Math.random() * 10) + 1}`),
  image: () => {
    const nextImageFormat = httpBinImageFormats.shift(httpBinImageFormats);
    httpBinImageFormats.push(nextImageFormat);
    httpBinImgElement.src = `https://httpbin.org/image/${nextImageFormat}`;
  },
  random: () => fetchAndLog('https://httpbin.org/bytes/5'),
};

const buttons = document.querySelectorAll('button');
for (let button of [...buttons]) {
  button.addEventListener('click', buttonHandlers[button.id]);
}
