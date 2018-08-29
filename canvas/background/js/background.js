'use strict';

const canvas = document.querySelector('#wall');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let objArray = [];
const ctx = canvas.getContext('2d'),
  x = canvas.width,
  y = canvas.height,
  numberObjects = Math.floor(50 + Math.random() * 150),
  move = [timeFunction1 , timeFunction2];

function timeFunction1(x, y, time) {
  return {
    x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
    y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
  };
}

function timeFunction2(x, y, time) {
  return {
    x: x + Math.sin((x + (time / 10)) / 100) * 5,
    y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
  }
}

for(let i = 0 ; i < numberObjects; i++) {
  let size = Number((0.1 + Math.random() * 0.5).toFixed(1));

  let obj = {
    x: Math.round(Math.random() * x),
    y: Math.round(Math.random() * y),
    size: size,
    thick: 5 * size,
    move: move[Math.round(Math.random())]
  };

  if(i % 2 === 0) {
    obj.radius = Number((12 * size).toFixed(1));
  } else {
    obj.side = Number((20 * size).toFixed(1));
    obj.angle = Math.round(Math.random() * 360);
    obj.speed = Number((-0.2 + Math.random() * 0.4).toFixed(1));
  }

  objArray.push(obj);
}

function draw() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  for(let obj of objArray) {
    if(obj.radius) {
      const coord = obj.move(obj.x, obj.y, Date.now());

      ctx.beginPath();
      ctx.lineWidth = obj.thick;
      ctx.imageSmoothingEnabled = false;
      ctx.strokeStyle = '#ffffff';
      ctx.arc(coord.x, coord.y, obj.radius, 0, 2 * Math.PI);
      ctx.stroke();
    } else {
      const coord = obj.move(obj.x, obj.y, Date.now());

      ctx.beginPath();
      ctx.lineWidth = obj.thick;
      obj.angle += obj.speed;

      if(obj.angle > 360) {
        obj.angle -= 360;
      }

      if(obj.angle < 0) {
        obj.angle += 360;
      }

      const x1 = obj.side * Math.cos(obj.angle),
        y1 = obj.side * Math.sin(obj.angle),
        x2 = y1,
        y2 = x1;

      ctx.strokeStyle = '#ffffff';

      ctx.moveTo(coord.x + x1, coord.y + y1);
      ctx.lineTo(coord.x - x1, coord.y - y1);
      ctx.moveTo(coord.x + x2, coord.y - y2);
      ctx.lineTo(coord.x - x2, coord.y + y2);
      ctx.stroke();
    }
  }
}

setInterval(function(){
  draw();
}, 1000 / 20);