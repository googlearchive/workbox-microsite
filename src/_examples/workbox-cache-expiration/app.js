const buttons = document.querySelectorAll('button');
for (let button of [...buttons]) {
  button.addEventListener('click', () => {
    const url = button.dataset.url;
    log('info', `Requesting ${url}...`)
      .then(() => fetch(button.dataset.url))
      .then(() => log('info', '...request complete.'))
      .then(() => logCachedFiles('cache-expiration-example'))
      .catch((error) => log('warn', `...fetch failed due to '${error}'.`));
  });
}
