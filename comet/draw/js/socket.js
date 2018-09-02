'use strict';

const websocket = new WebSocket('wss://neto-api.herokuapp.com/draw');

window.editor.addEventListener('update', event => {
  event.canvas.toBlob(blob => websocket.send(blob));
});