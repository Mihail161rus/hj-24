'use strict';

const textInput = document.querySelector('.textarea'),
  message = document.querySelector('.message'),
  bull = document.querySelector('.block');


function debounce(callback, delay) {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      callback();
    }, delay);
  };
}


textInput.addEventListener('focus', () => {
  bull.classList.add('active')
});

textInput.addEventListener('input', () => {
  bull.classList.add('active');
  message.classList.remove('view');
});

textInput.addEventListener('blur', () => {
  bull.classList.remove('active');
  message.classList.remove('view');
});

textInput.addEventListener('keydown', debounce(() => {
  message.classList.add('view');
  bull.classList.remove('active');
}, 2000));

//Очищаем значение поля после перезагрузки страницы
document.addEventListener('DOMContentLoaded', () => {
  textInput.value = '';
});