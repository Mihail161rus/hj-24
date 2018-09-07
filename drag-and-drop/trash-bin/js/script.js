'use strict';

let movedImg = null,
  shiftX = 0,
  shiftY = 0;

function dragStart(event) {
  if (event.target.classList.contains('logo')) {
    event.preventDefault();
    movedImg = event.target;

    const bounds = movedImg.getBoundingClientRect();
    shiftX = ( bounds.right - bounds.left ) / 2;
    shiftY = ( bounds.bottom - bounds.top) / 2;

    movedImg.classList.add('moving');
    movedImg.style.position = 'absolute';

    drag(event);
  }
}


function drag(event) {
  if (movedImg) {
    movedImg.style.left = event.pageX - shiftX + 'px';
    movedImg.style.top = event.pageY - shiftY + 'px';
  }
}

function drop(event) {
  if (movedImg) {
    movedImg.style.visibility = 'hidden';

    const check = document.elementFromPoint(event.clientX, event.clientY).closest('#trash_bin');

    movedImg.style.visibility = 'visible';
    movedImg.classList.remove('moving');

    if (check) {
      document.body.appendChild(movedImg);
      movedImg.style.display = 'none';
    }
    movedImg = null;
  }
}

document.addEventListener('mousedown', dragStart);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', drop);