'use strict';

/**
 * Отправляет запросы на сервер через fetch
 * @param url
 * @param responseHandler
 * @param method
 * @param body
 */
function sendRequest(url = '', responseHandler = (data) => data, method = 'GET', body = '') {
  const requestParams = {
    method: method,
  };

  if (method !== 'GET') {
    requestParams.body = body;
  }

  fetch (url, requestParams)
    .then((res) => {
      if (res.status < 200 || res.status >= 300) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then((data) => {
      responseHandler(data);
    })
    .catch((err) => console.log(err.message));
}

/**
 * Выводит html элементы цветов и размеров
 * @param elements
 * @param type
 */
function showElements(elements = [], type = 'color') {
  const elementsContainer = document.getElementById(`${type}Swatch`);
  let htmlElements = '';
  let alreadyChecked = false;
  const checkedElement = getValueLS(type);

  elements.forEach((element) => {
    if (!alreadyChecked && element.isAvailable && (!checkedElement || checkedElement === element.type)) {
      alreadyChecked = true;
      htmlElements += (type === 'color') ? getColorSnippetHtml(element, true) : getSizeSnippetHtml(element, true);
    } else {
      htmlElements += (type === 'color') ? getColorSnippetHtml(element) : getSizeSnippetHtml(element);
    }
  });

  elementsContainer.innerHTML = htmlElements;
  elementsContainer.querySelectorAll(`input[name="${type}"]`).forEach((element) => {
    element.addEventListener('change', (event) => {
      event.target.setAttribute('checked', '');
      saveValueLS(type, event.target.getAttribute('value'));
    });
  });

  saveValueLS(type, elementsContainer.querySelector('input[checked]').getAttribute('value'));
}

/**
 * Выводит сниппет корзины
 * @param goods
 */
function showCart(goods = []) {
  const cartContainer = document.getElementById('quick-cart');
  let htmlGoods = '';
  let totalPrice = 0;

  goods.forEach((good) => {
    htmlGoods += getCartGoodSnippetHtml(good);
    totalPrice += good.price * good.quantity;
  });

  htmlGoods += getCartSnippetHtml(Boolean(goods.length > 0), totalPrice);

  cartContainer.innerHTML = htmlGoods;
  document.querySelectorAll('.quick-cart-product-remove.remove').forEach((element) => {
    element.addEventListener('click', (event) => updateCart(event, 'delete'));
  });
}

/**
 * Обновление корзины
 * @param event
 * @param action
 */
function updateCart(event, action = 'delete') {
  event.preventDefault();
  const addToCartForm = document.getElementById('AddToCartForm');
  const form = new FormData(addToCartForm);
  let url = (action === 'delete') ? 'https://neto-api.herokuapp.com/cart/remove' : 'https://neto-api.herokuapp.com/cart';

  form.append('productId', (action === 'delete') ? event.target.dataset.id : addToCartForm.dataset.productId);

  sendRequest(url, (response) => {
    if (response.error) console.log (response.message);
    init();
  }, 'POST', form);
}

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
 * Формирует сниппет для цвета
 * @param color
 * @param checked
 * @returns {string}
 */
function getColorSnippetHtml(color, checked = false) {
  return `
    <div data-value="${color.type}" class="swatch-element color ${color.type} ${(color.isAvailable) ? 'available' : 'soldout'}">
      <div class="tooltip">${color.title}</div>
      <input quickbeam="color" id="swatch-1-${color.type}" type="radio" name="color" value="${color.type}" 
        ${(checked) ? 'checked' : ''} ${(color.isAvailable) ? '' : 'disabled'}>
      <label for="swatch-1-${color.type}" style="border-color: ${color.type};">
        <span style="background-color: ${color.code};"></span>
        <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
      </label>
    </div>
  `;
}

/**
 * Формирует сниппет размеров
 * @param size
 * @param checked
 * @returns {string}
 */
function getSizeSnippetHtml(size, checked = false) {
  return `
    <div data-value="${size.type}" class="swatch-element plain ${size.type} ${(size.isAvailable) ? 'available' : 'soldout'}">
      <input id="swatch-0-${size.type}" type="radio" name="size" value="${size.type}" ${(checked) ? 'checked' : ''} ${(size.isAvailable) ? '' : 'disabled'}>
      <label for="swatch-0-${size.type}">
        ${size.title}
        <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
      </label>
    </div>
  `;
}

/**
 * Формирует сниппет товаров в корзине
 * @param good
 * @returns {string}
 */
function getCartGoodSnippetHtml(good) {
  return `
    <div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${good.id}" style="opacity: 1;">
      <div class="quick-cart-product-wrap">
        <img src="${good.pic}" title="${good.title}">
        <span class="s1" style="background-color: #000; opacity: .5">$${good.price}</span>
        <span class="s2"></span>
      </div>
      <span class="count hide fadeUp" id="quick-cart-product-count-${good.id}">${good.quantity}</span>
      <span class="quick-cart-product-remove remove" data-id="${good.id}"></span>
    </div>
  `;
}

/**
 * Формирует сниппет корзины
 * @param isOpen
 * @param totalPrice
 * @returns {string}
 */
function getCartSnippetHtml(isOpen, totalPrice) {
  return `
    <a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico ${(isOpen) ? 'open' : ''}">
      <span>
        <strong class="quick-cart-text">Оформить заказ<br></strong>
        <span id="quick-cart-price">$${totalPrice}</span>
      </span>
    </a>
  `;
}

/**
 * Функция начальной инициализации
 */
function init() {
  sendRequest('https://neto-api.herokuapp.com/cart/colors', (elements) => showElements(elements, 'color'));
  sendRequest('https://neto-api.herokuapp.com/cart/sizes', (elements) => showElements(elements, 'size'));
  sendRequest('https://neto-api.herokuapp.com/cart', showCart);
}

document.getElementById('AddToCart').addEventListener('click', (event) => updateCart(event, 'add'));

init();