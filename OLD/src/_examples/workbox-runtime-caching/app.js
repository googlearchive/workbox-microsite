const buttons = document.querySelectorAll('button');
for (let button of [...buttons]) {
  button.addEventListener('click', () => {
    const url = button.dataset.url;
    log('info', `Requesting ${url}...`)
      .then(() => fetch(button.dataset.url))
      .then((fetchResponse) => fetchResponse.text())
      .then((bytes) => log('info', `...fetch() returned '${bytes}'`))
      .then(() => caches.match(button.dataset.url))
      .then((cacheResponse) => cacheResponse ? cacheResponse.text() : null)
      .then((bytes) => log('info', bytes ?
        `...the cached entry is '${bytes}'` :
        `...there's no entry in the cache.`))
      .catch((error) => log('warn', `...fetch failed due to '${error}'.`));
  });
}
