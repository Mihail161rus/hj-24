'use strict';

const btnDropDown = document.getElementsByClassName('wrapper-dropdown')[0];

function toggleDropDown() {
  this.classList.toggle('active');
}

btnDropDown.onclick = toggleDropDown;