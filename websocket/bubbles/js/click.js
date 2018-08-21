'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');

showBubbles(connection);

document.addEventListener('click', (event) => {
  connection.send(JSON.stringify({
    x: event.clientX, y: event.clientY
    })
  );
});

window.addEventListener('beforeunload', () => {
  connection.close(1000, 'Пользователь завершил работу со страницей')
});