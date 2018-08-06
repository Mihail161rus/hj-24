'use strict';

function addToCart(event) {
  let price = event.target.dataset.price;
  const totalProducts = document.querySelector('.cart #cart-count');
  const totalPrice = document.querySelector('.cart #cart-total-price');


  totalProducts.innerHTML++;
  price++;
  totalPrice.innerHTML = price;
  console.log(totalProducts);
}

function init() {
  const buttons = document.querySelectorAll('.box button.add');

  for (let button of buttons) {
    button.addEventListener('click', addToCart);
  }
}

document.addEventListener('DOMContentLoaded', init);