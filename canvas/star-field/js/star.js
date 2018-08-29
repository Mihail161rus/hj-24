'use strict';

const canvas = document.querySelector('canvas');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

/**
 * Возвращает случайное число в заданном диапазоне
 * @param min
 * @param max
 * @returns {string}
 */
function rand(min = 0, max = 1) {
  return (min + Math.random() * max).toFixed(3);
}

/**
 * Рисуем бекграунд на всю ширину и высоту canvas
 * @param ctx
 * @param coordinates
 * @param color
 */
function drawBackground(ctx, coordinates, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(...coordinates);
  ctx.closePath();
}

/**
 * Рисуем звезды
 * @param canvas
 */
function drawStars(canvas) {
  const ctx = canvas.getContext('2d');

  drawBackground(ctx, [0, 0, canvas.width, canvas.height], '#000000');
  const numberOfStars = rand(200, 400);
  const starsColors = ['#ffffff', '#ffe9c4', '#d4fbff'];

  for (let i = 1; i <= numberOfStars; i++) {
    const starSize = rand(0, 1.1);

    const starStyle = {
      color: starsColors[Math.round(rand(0, 3))],
      intensity: rand(0.8, 1)
    };

    const coordinates = {
      x: rand(0, canvas.width),
      y: rand(0, canvas.height)
    };

    ctx.beginPath();
    ctx.fillStyle = starStyle.color;
    ctx.globalAlpha = starStyle.intensity;
    ctx.arc(coordinates.x, coordinates.y, starSize, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  }
}

document.addEventListener('DOMContentLoaded', () => drawStars(canvas));
canvas.addEventListener('click', () => drawStars(canvas));