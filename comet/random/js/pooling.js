'use strict';

/*Функции searchElement и selectElement используются для каждого из типов соединения*/
function searchElement(num, container) {
  num = Number.parseInt(num);

  if (num < 1 || num > 10) return;

  return Array.from(container.querySelectorAll('div')).find(divNode => {
    if (Number.parseInt(divNode.innerText) === num) {
      return divNode;
    }
  });
}

function selectElement(el, oldEl) {
  if (oldEl) {
    oldEl.classList.remove('flip-it');
  }

  el.classList.add('flip-it');
}

/*Реализация частых опросов*/
const pooling = document.querySelector('.pooling');

function getPoolingRequest() {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', (event) => {
    const oldEl = pooling.querySelector('.flip-it');

    if (event.target.status === 200) {
      const el = searchElement(event.target.response, pooling);
      selectElement(el, oldEl);
    } else {
      console.log(`Выбран прежний элемент ${oldEl.innerText}, т.к. сервер ответил: ${event.target.status}: ${event.target.statusText}`);
    }
  });

  xhr.addEventListener('error', (event) => {
    console.log('Произошла ошибка', event);
  });

  xhr.open("GET", 'https://neto-api.herokuapp.com/comet/pooling', true);
  xhr.send();
}

let timer;

document.addEventListener('DOMContentLoaded', () => {
  timer = setInterval(getPoolingRequest, 1000);
});