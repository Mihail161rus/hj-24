'use strict';

function onChangeField(event) {
  if (event.target.getAttribute('name') === 'zip') {
    let matchedResults = event.target.value.match(/\d+/g);
    event.target.value = (matchedResults) ? matchedResults.join('') : '';
  }

  sendButton.disabled = fieldsNotFilled();
}

function fieldsNotFilled() {
  let allFieldsFilled = true;

  Array.from(textFields).forEach(textField => {
    if (textField.value === '') {
      allFieldsFilled = false;
    }
  });

  return !allFieldsFilled;
}

function onButtonClick(event) {
  event.preventDefault();

  sendButton.disabled = fieldsNotFilled();
  if (sendButton.disabled) return;

  contentForm.classList.toggle('hidden');
  outputForm.classList.toggle('hidden');

  if (event.target === sendButton) {

    Array.from(textFields).forEach(textField => {

      if(textField.name === 'message') {
        outputForm.querySelector('h2').innerText = textField.value;
      } else {
        let outputElement = outputForm.querySelector(`#${textField.name}`);
        if (outputElement) {
          outputElement.innerText = textField.value;
        }
      }

    });

  }
}

const contentForm = document.querySelector('.contentform');
const outputForm = document.getElementById('output');
const textFields = contentForm.querySelectorAll('input, textarea');

const sendButton = contentForm.querySelector('.button-contact');
sendButton.addEventListener('click', onButtonClick);

const editButton = outputForm.querySelector('.button-contact');
editButton.addEventListener('click', onButtonClick);


Array.from(textFields).forEach(textField => {
  textField.addEventListener('input', onChangeField);
});