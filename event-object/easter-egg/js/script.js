'use strict';

const keysEntered = [];
const secretKey = 'ytnjkjubz';

function keysHandler(event) {
  if (event.ctrlKey && event.altKey && event.code === 'KeyT') {
    const navMenu = document.getElementsByTagName('nav')[0];

    navMenu.classList.toggle('visible');
  }

  let keyEntered = event.code.replace('Key', '').toLowerCase();
  keysEntered.push(keyEntered);

  if (keysEntered.length === 9 && keysEntered.join('') === secretKey) {
    document.getElementsByClassName('secret')[0].classList.add('visible');
  } else {
    keysEntered.splice(0, keysEntered.length)
  }
}

document.addEventListener('keydown', keysHandler);