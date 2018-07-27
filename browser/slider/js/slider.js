'use strict';

const imgSrc = [
  'i/airmax-jump.png',
  'i/airmax-on-foot.png',
  'i/airmax-playground.png',
  'i/airmax-top-view.png',
  'i/airmax.png'
];

const img = document.getElementById('slider');
img.src = imgSrc[0];

let index = 0;

setInterval(() => {
  img.src = imgSrc[index];
  index++;

if (index > (imgSrc.length - 1)) {
  index = 0;
}
}, 5000);