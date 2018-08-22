'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/chat');
const chatContainer = document.querySelector('.chat');
const chatStatus = chatContainer.querySelector('.chat-status');
const buttonSubmit = chatContainer.querySelector('.message-submit');
const messagesContent = chatContainer.querySelector('.messages-content');

/**
 * Возвращает текущее время
 * @returns {string}
 */
function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString('ru-RU', { hour12: false }).substring(0, 5);
}

/**
 * Возвращает узел с шаблоном нужного сообщения
 * @param messageType
 * @returns {Node}
 */
function getMessageTemplate(messageType = 'other') {
  const templates = chatContainer.querySelector('.messages-templates');

  switch (messageType) {
    case 'personal':
      return templates.querySelector('.message.message-personal').cloneNode(true);
    case 'status':
      return templates.querySelector('.message.message-status').cloneNode(true);
    case 'loading':
      return templates.querySelector('.message.loading').cloneNode(true);
    default:
      return Array.from(templates.querySelectorAll('.message')).find(template => {
        if (template.classList.length === 1) return template;
      }).cloneNode(true);
  }
}

/**
 * Добавляет новое сообщение в чат
 * @param message
 * @param messageType
 * @param time
 */
function newMessage(message = '', messageType, time = getCurrentTime()) {
  const messageTemplate = getMessageTemplate(messageType);

  messageTemplate.querySelector('.message-text').innerText = message;

  if (messageType !== 'status') {
    messageTemplate.querySelector('.timestamp').innerText = time;
  }

  messagesContent.appendChild(messageTemplate);
}

/**
 * Обрабатывает клик по кнопке, отправляет сообщение на сервер
 * @param event
 */
function submitButton(event) {
  event.preventDefault();
  const messageInput = chatContainer.querySelector('.message-input');
  const message = messageInput.value;

  if (message !== '') {
    newMessage(message, 'personal');
    connection.send(message);

    messageInput.value = '';
  }
}

connection.addEventListener('open', () => {
  chatStatus.innerText = chatStatus.dataset.online;
  buttonSubmit.removeAttribute('disabled');
  newMessage('Пользователь появился в сети', 'status');
});

connection.addEventListener('message', (event) => {
  if (event.data !== '...') {
    const loadingMessage = messagesContent.querySelector('.message.loading');

    if (loadingMessage) {
      messagesContent.removeChild(loadingMessage);
    }

    newMessage(event.data, 'other');
  } else {
    messagesContent.appendChild(getMessageTemplate('loading'));
  }
});

buttonSubmit.addEventListener('click', submitButton);

connection.addEventListener('close', () =>{
  chatStatus.innerText = chatStatus.dataset.offline;
  buttonSubmit.disabled = true;
  newMessage('Пользователь не в сети', 'status');
});

window.addEventListener('beforeunload', () => {
  connection.close(1000, 'Пользователь вышел');
});