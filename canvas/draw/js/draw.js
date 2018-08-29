'use strict';

const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');
let drawing = false,
  curve = [],
  hue = 0,
  previous = 100,
  current = 100;

/**
 * Очищает холст и изменяет размер canvas
 */
function resizeCanvas() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  canvas.height = document.documentElement.clientHeight;
  canvas.width = document.documentElement.clientWidth;
}

/**
 * Запускает рисование при вжатой левой кнопке мыши
 * @param event
 */
function startDraw(event) {
  if(event.button === 0) {
    curve = [];
    drawing = true;
    curve.push(event.clientX, event.clientY);
  }
}

/**
 * Останавливает рисование при отжатии кнопки мыши
 */
function stopDraw() {
  drawing = false;
}

/**
 * Рисует линию
 * @param event
 */
function drawLine(event) {
  if(drawing) {
    curve.push(event.offsetX, event.offsetY);
    ctx.beginPath();
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.moveTo(curve[0], curve[1]);

    for(let i = 0; i < curve.length; i += 2) {
      if(event.shiftKey) {
        hue--;
        if(hue < 0) {
          hue = 359;
        }
      } else {
        hue++;
        if(hue > 359) {
          hue = 0;
        }
      }

      ctx.lineWidth = current;

      if(ctx.lineWidth === 100) {
        previous = current;
        current--;
      } else if(ctx.lineWidth === 5) {
        previous = 5;
        current++;
      } else if(previous > current) {
        previous--;
        current--;
      } else {
        previous++;
        current++;
      }

      ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.lineTo(curve[i], curve[i+1]);
      ctx.stroke();
    }

    if(curve.length > 4) {
      curve.splice(0, 2);
    }
  }
}

/**
 * Отменяет рисование линиии в случае когда курсор мыши вышел за пределы экрана
 */
function notDraw() {
  curve = [];
  drawing = false;
}

/**
 * Очищает холст
 */
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mouseup', stopDraw);
canvas.addEventListener('mousemove', drawLine);
canvas.addEventListener('mouseleave', notDraw);
canvas.addEventListener('dblclick', clearCanvas);
window.addEventListener('resize', resizeCanvas);

resizeCanvas();