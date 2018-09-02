'use strict';

const webSocketNode = document.querySelector('.websocket');

function getWebSocketRequest() {
  const ws = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');

  ws.addEventListener('message', (event) => {
    const oldEl = webSocketNode.querySelector('.flip-it');
    const el = searchElement(event.data, webSocketNode);

    selectElement(el, oldEl);
  });

  ws.addEventListener('close', (event) => {
    getWebSocketRequest();

    console.log(`WebSocket соединение закрылось (код закрытия: ${event.code}) и открылось повторно`);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  getWebSocketRequest();
});