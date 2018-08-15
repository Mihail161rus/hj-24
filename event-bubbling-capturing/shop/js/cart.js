'use strict';

const itemsContainer = document.querySelector('.items-list');
itemsContainer.addEventListener('click', clickAddToCart);

function clickAddToCart(event) {
  if (event.target.classList.contains('add-to-cart')) {
    event.preventDefault();
    
    let item = {
      title: event.target.dataset.title,
      price: event.target.dataset.price
    };

    addToCart(item);
  }
}