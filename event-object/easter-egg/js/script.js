'use strict';

function keysHandler(event) {
  if (event.ctrlKey && event.altKey && event.code === 'KeyT') {
    const navMenu = document.getElementsByTagName('nav')[0];

    navMenu.classList.toggle('visible');
  }

  if (typeof event.code === 'string') {
    let keyEntered = event.code.replace('Key', '').toLowerCase();
    keysEntered.push(keyEntered);
  }

  if (keysEntered.length === 9 && keysEntered.join('') === secretKey) {
    document.getElementsByClassName('secret')[0].classList.add('visible');
  } else if (keysEntered.length >= 9) {
    keysEntered.splice(0, keysEntered.length)
  }
}

const keysEntered = [];
const secretKey = 'ytnjkjubz';

document.addEventListener('keydown', keysHandler);