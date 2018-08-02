'use strict';

const imgFull = document.getElementById('view');
const imgsPreview = document.getElementById('nav').getElementsByTagName('a');

function changeImg(event) {
  event.preventDefault();

  Array.from(imgsPreview).forEach(img => img.classList.remove('gallery-current'));

  this.classList.add('gallery-current');

  imgFull.src = event.currentTarget.href;
}

for (const img of imgsPreview) {
  img.addEventListener('click', changeImg);
}