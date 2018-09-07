'use strict';

const body = document.querySelector('body');
let movedImg = null,
  shiftX = 0,
  shiftY = 0;
let minY, minX, maxX, maxY;

//Принудительно задаем высоту body, т.к. изначально она равна нулю
body.style.height = '800px';
body.style.border = '2px solid red';

function dragStart(event) {
  if (event.target.classList.contains('logo')) {
    event.preventDefault();
    movedImg = event.target;
    minY = body.offsetTop;
    minX = body.offsetLeft;
    maxX = body.offsetLeft + body.offsetWidth - movedImg.offsetWidth;
    maxY = body.offsetTop + body.offsetHeight - movedImg.offsetHeight;

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
    let x = event.pageX - shiftX;
    let y = event.pageY - shiftY;
    x = Math.min(x, maxX);
    y = Math.min(y, maxY);
    x = Math.max(x, minX);
    y = Math.max(y, minY);
    movedImg.style.left = x + 'px';
    movedImg.style.top = y + 'px';
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