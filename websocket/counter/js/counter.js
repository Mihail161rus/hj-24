'use strict';

const counterOutput = document.querySelector('.counter');
const errorOutput = document.querySelector('output.errors');
const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');

connection.addEventListener('message', (event) => {
  let response = JSON.parse(event.data);
  
  counterOutput.innerText = response.connections;
  errorOutput.innerText = response.errors;
});

window.addEventListener('beforeunload', () => {
  connection.close(1000, 'Пользователь покинул страницу');
});