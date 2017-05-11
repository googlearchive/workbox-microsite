const buttons = document.querySelectorAll('button');
for (let button of [...buttons]) {
  button.addEventListener('click', () => fetch(button.dataset.url));
}
