'use strict';

const signInForm = document.querySelector('.sign-in-htm');
const signUpForm = document.querySelector('.sign-up-htm');

/**
 * Получаем значение поля из local storage
 * @param fieldName
 * @returns {string}
 */
function getValueLS(fieldName) {
  if (fieldName) {
    let fieldValue = localStorage.getItem(fieldName);
    if (fieldValue) return fieldValue;
  }
  return '';
}

/**
 * Сохраняем значение поля в local storage
 * @param fieldName
 * @param fieldValue
 */
function saveValueLS(fieldName, fieldValue = '') {
  if (fieldName) {
    localStorage.setItem(fieldName, fieldValue);
  }
}

/**
 * Подгружаем в соответствующие формы значения полей из local storage
 */
function loadValuesToField() {
  signInForm.getElementById('email').value = getValueLS('email');
  signUpForm.getElementById('email').value = getValueLS('email');
  signUpForm.querySelector('input[name="name"]').value = getValueLS('name');
}

/**
 * Отправляет данные из формы на сервер
 * @param requestObj
 * @param requestUrl
 */
function sendData(requestObj, requestUrl) {
  const xhr = new XMLHttpRequest();
  const isSignUpForm = requestObj.has('name');

  xhr.addEventListener('load', (event) => {
    const responseObj = JSON.parse(xhr.response);

    if (responseObj.error) {
      showRequestResult(responseObj.message, isSignUpForm);
    } else if (isSignUpForm) {
      showRequestResult(`Пользователь ${responseObj.name} успешно зарегистрирован`, isSignUpForm);
    } else {
      showRequestResult(`Пользователь ${responseObj.name} успешно авторизован`, isSignUpForm);
    }
  });

  xhr.open('POST', requestUrl);
  xhr.setRequestHeader('Content-Type', 'application/json');

  let formObj = {};
  for (let [key, value] of requestObj) {
    formObj[key] = value;
  }

  xhr.send(JSON.stringify(formObj));
}

/**
 * Выводит результат ответа сервера в тег output
 * @param response
 * @param isSignUpForm
 */
function showRequestResult(response, isSignUpForm = false) {
  let currentForm = (isSignUpForm) ? signUpForm : signInForm;
  currentForm.querySelector('output.error-message').innerText = response;
}

/**
 * Обрабатывает форму авторизации при нажатии на кнопку
 * @param event
 */
function signIn(event) {
  event.preventDefault();
  let emailValue = signInForm.querySelector('#email').value;
  saveValueLS('email', emailValue);

  sendData(new FormData(signInForm), 'https://neto-api.herokuapp.com/signin');
}

/**
 * Обрабатывает форму регистрации при нажатии на кнопку
 * @param event
 */
function signUp(event) {
  event.preventDefault();
  let emailValue = signUpForm.querySelector('#email').value,
    nameValue = signUpForm.querySelector('input[name="name"]').value;
  saveValueLS('email', emailValue);
  saveValueLS('name', nameValue);

  sendData(new FormData(signUpForm), 'https://neto-api.herokuapp.com/signup');
}

document.addEventListener('DOMContentLoaded', loadValuesToField);
signInForm.querySelector('.button').addEventListener('click', signIn);
signUpForm.querySelector('.button').addEventListener('click', signUp);