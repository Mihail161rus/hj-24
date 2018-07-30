'use strict';

const drumList = document.getElementsByClassName('drum-kit')[0];
const buttons = drumList.getElementsByClassName('drum-kit__drum');

function playAudio() {
  const player = this.getElementsByTagName('audio')[0];
  player.play();
}

for (let button of buttons) {
  button.onclick = playAudio;
}