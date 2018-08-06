'use strict';

let totalPrice = 0;

function addToCart(event) {
  totalPrice += Number(event.target.dataset.price);
  document.querySelector('.cart #cart-count').innerHTML++;
  document.querySelector('.cart #cart-total-price').innerHTML = getPriceFormatted(totalPrice);
}

function init() {
  const buttons = document.querySelectorAll('.box button.add');

  for (let button of buttons) {
    button.addEventListener('click', addToCart);
  }
}

document.addEventListener('DOMContentLoaded', init);