'use strict';

const counterView = document.getElementById('counter'),
  plusBtn = document.getElementById('increment'),
  minusBtn = document.getElementById('decrement'),
  clearBtn = document.getElementById('reset');

function updateCounter(value = 0) {
  localStorage.setItem('counter', value);
  counterView.innerText = getCounter();
}

function getCounter() {
  let currentValue = localStorage.getItem('counter');
  return (currentValue) ? Number.parseInt(currentValue) : 0;
}

function increment() {
  updateCounter(getCounter() + 1);
}

function decrement() {
  if (getCounter() > 0) {
    updateCounter(getCounter() - 1);
  }
}

function clear() {
  updateCounter(0);
}

document.addEventListener('DOMContentLoaded', () => updateCounter(getCounter()));
plusBtn.addEventListener('click', increment);
minusBtn.addEventListener('click', decrement);
clearBtn.addEventListener('click', clear);