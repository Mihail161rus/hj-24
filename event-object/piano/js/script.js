'use strict';

/**
 * Возвращает путь до аудиофайла
 * @param soundMode
 * @param soundNum
 * @returns {string}
 */
function getSoundSrc(soundMode, soundNum) {
  const soundNames = ['first', 'second', 'third', 'fourth', 'fifth'];
  const soundModes = ['lower', 'middle', 'higher'];
  const soundName = soundNames[soundNum];

  if (soundModes.includes(soundMode)) {
    return `sounds/${soundMode}/${soundName}.mp3`;
  }
}

/**
 * Возвращает текущий режим пианино
 * @param event
 * @returns {string}
 */
function getCurrentMode(event) {
  let currentMode = 'middle';

  if (event.shiftKey) {
    currentMode = 'lower';
  } else if (event.altKey) {
    currentMode = 'higher';
  }

  return currentMode;
}

/**
 * Устанавливает класс, соответствующий режиму работы
 * @param event
 */
function changeMode(event) {
  const btnsContainer = document.getElementsByClassName('set')[0];

  btnsContainer.classList.remove('middle');
  btnsContainer.classList.remove('lower');
  btnsContainer.classList.remove('higher');
  btnsContainer.classList.add(getCurrentMode(event));
}

/**
 * Воспроизводит нужный звук
 * @param event
 */
function playSound(event) {
  const buttons = document.getElementsByClassName('set')[0].getElementsByTagName('li');
  const buttonNum = Array.from(buttons).indexOf(event.target);
  const player = this.getElementsByTagName('audio')[0];

  player.src = getSoundSrc(getCurrentMode(event), buttonNum);
  player.play();
}

const btnsContainer = document.getElementsByClassName('set')[0];
const buttons = btnsContainer.getElementsByTagName('li');

for (const button of buttons) {
  button.addEventListener('click', playSound);
}

document.addEventListener('keydown', changeMode);
document.addEventListener('keyup', changeMode);