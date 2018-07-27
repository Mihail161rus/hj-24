'use strict';

const imgSrc = [
  'i/breuer-building.jpg',
  'i/guggenheim-museum.jpg',
  'i/headquarters.jpg',
  'i/IAC.jpg',
  'i/new-museum.jpg'
];

let srcIndex = 0;

const img = document.getElementById('currentPhoto');
img.src = imgSrc[srcIndex];

const buttonNext = document.getElementById('nextPhoto');

function nextPhoto() {
  srcIndex++;

  if (srcIndex > (imgSrc.length - 1)) {
    srcIndex = 0;
  }

  img.src = imgSrc[srcIndex];
}

buttonNext.onclick = nextPhoto;

const buttonPrev = document.getElementById('prevPhoto');

function prevPhoto() {
  srcIndex--;

  if (srcIndex === -1) {
    srcIndex = imgSrc.length - 1;
  }
  
  img.src = imgSrc[srcIndex];
}

buttonPrev.onclick = prevPhoto;