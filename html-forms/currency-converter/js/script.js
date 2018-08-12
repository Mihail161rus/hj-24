'use strict';

function successLoad(event) {
  if (event.target.status === 200) {
    switchLoader();
    currencies = JSON.parse(event.target.responseText);

    Array.from(currencies).forEach(currentCurrency => {
      const currency = document.createElement('option');
      currency.setAttribute('value', currentCurrency.value);
      currency.innerText = currentCurrency.code;

      convertFrom.appendChild(currency);
      convertTo.appendChild(currency.cloneNode(true));
    });

    convertFrom.querySelector('option').selected = true;
    convertTo.querySelector('option').selected = true;

    document.getElementById('content').classList.remove('hidden');
    showResult();
  }
}

function switchLoader() {
  document.getElementById('loader').classList.toggle('hidden');
}

function showResult() {
  const sourceValue = parseFloat(source.value);
  const result = document.getElementById('result');

  if (!isNaN(sourceValue)) {
    result.value = (sourceValue * convertFrom.value / convertTo.value).toFixed(2);
  } else {
    result.value = 'Невозможно выполнить расчет. Проверьте введенное количество.';
  }
}

const curRequest = new XMLHttpRequest();
curRequest.addEventListener('load', successLoad);
curRequest.addEventListener('loadstart', switchLoader);
curRequest.open('GET', 'https://neto-api.herokuapp.com/currency', true);
curRequest.send();

let currencies;

const convertFrom = document.getElementById('from');
convertFrom.addEventListener('change', showResult);

const convertTo = document.getElementById('to');
convertTo.addEventListener('change', showResult);

const source = document.getElementById('source');
source.addEventListener('input', showResult);