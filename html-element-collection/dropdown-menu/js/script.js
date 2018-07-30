'use strict';

const btnDropDown = document.getElementsByClassName('wrapper-dropdown')[0];
const dropdown = document.getElementsByClassName('dropdown')[0];
const items = dropdown.getElementsByTagName('li');

function toggleDropDown() {
  this.classList.toggle('active');
}

btnDropDown.onclick = toggleDropDown;

for (let item of items) {
  item.onclick = toggleDropDown;
}