'use strict';

const leftEye = document.querySelector('.cat_position_for_left_eye');
const rightEye = document.querySelector('.cat_position_for_right_eye');
const bound = leftEye.getBoundingClientRect();

function moveEye(eye, val, position){
  if (position === 'left') {
    eye.firstElementChild.style.left = `${val}%`;
  } else if (position === 'top'){
    eye.firstElementChild.style.top = `${val}%`;
  }
}

function init(event, bound, eye) {
  if (event.pageX > bound.right) {
    moveEye(eye, 50, 'left');
  } else if (event.pageX < bound.left) {
    moveEye(eye, 0, 'left');
  } else {
    moveEye(eye, 25, 'left');
  }

  if (event.pageY < bound.top) {
    moveEye(eye, 0, 'top');
  } else if (event.pageY > bound.bottom) {
    moveEye(eye, 50, 'top');
  } else {
    moveEye(eye, 25, 'top');
  }
}

document.addEventListener('mousemove', (event) => {
  init(event, bound, leftEye);
  init(event, bound, rightEye);
});