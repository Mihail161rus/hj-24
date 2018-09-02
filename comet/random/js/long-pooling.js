'use strict';

const longPooling = document.querySelector('.long-pooling');

function getLongPoolingRequest() {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', (event) => {
    const oldEl = longPooling.querySelector('.flip-it');

    if (event.target.status === 202) {
      const el = searchElement(event.target.response, longPooling);
      selectElement(el, oldEl);
    } else {
      console.log(`Выбран прежний элемент ${oldEl.innerText}, т.к. сервер ответил: ${event.target.status}: ${event.target.statusText}`);
    }

    getLongPoolingRequest();
  });

  xhr.addEventListener('error', (event) => {
    console.log('Произошла ошибка', event);
  });

  xhr.open("GET", 'https://neto-api.herokuapp.com/comet/long-pooling', true);
  xhr.send();
}

document.addEventListener('DOMContentLoaded', () => {
  getLongPoolingRequest();
});