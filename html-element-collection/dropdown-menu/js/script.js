'use strict';

const btnDropDown = document.getElementsByClassName('wrapper-dropdown')[0];
const dropdown = document.getElementsByClassName('dropdown')[0];
const items = dropdown.getElementsByTagName('li');

function toogleDropDown() {
  this.classList.toggle('active');
}

btnDropDown.onclick = toogleDropDown;

for (let item of items) {
  item.onclick = toogleDropDown;
}