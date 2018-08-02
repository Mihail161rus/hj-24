'use strict';

const audioList = [
  'LA Chill Tour',
  'This is it band',
  'LA Fusion Jam'
];

const playerWrap = document.getElementsByClassName('mediaplayer')[0];
const player = playerWrap.getElementsByTagName('audio')[0];
const controls = playerWrap.getElementsByTagName('button');
const songTitle = playerWrap.getElementsByClassName('title')[0];
let songNum = 0;

player.src = changeSrc(audioList[songNum]);

function changeSrc(songName) {
  return `mp3/${songName}.mp3`;
}

function playstate() {
  if (!playerWrap.classList.contains('play')) {
    player.play();
  } else {
    player.pause();
  }

  playerWrap.classList.toggle('play');
}

function stop() {
  if (player.currentTime > 0) {
    player.pause();
    player.currentTime = 0;
    playerWrap.classList.remove('play');
  }
}

function changeSong() {
  if (this.className === 'back') {
    songNum--;

    if (songNum === -1) {
      songNum = audioList.length - 1;
    }
  } else {
    songNum++;

    if (songNum > (audioList.length - 1)) {
      songNum = 0;
    }
  }

  player.src = changeSrc(audioList[songNum]);
  songTitle.title = audioList[songNum];

  if (playerWrap.classList.contains('play')) {
    player.play();
  }
}

for (let btn of controls) {
  if (btn.className === 'playstate') {
    btn.onclick = playstate;
  } else if (btn.className === 'stop') {
    btn.onclick = stop;
  } else if (btn.className === 'back' || btn.className === 'next') {
    btn.onclick = changeSong;
  }
}