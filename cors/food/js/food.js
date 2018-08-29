'use strict';

const container = document.querySelector('.food');

function randName() {
  return 'cb' + String(Math.random()).slice(-6);
}

function loadData(url, urlHandler) {
  const functionName = randName();

  if (typeof urlHandler === 'function') {
    return new Promise((done, fail) => {
      window[functionName] = urlHandler;

      const script = document.createElement('script');
      script.src = `${url}?jsonp=${functionName}`;
      document.body.appendChild(script);
    });
  }
}

function loadReceipt(receipt) {
  container.querySelector('[data-title]').innerText = receipt.title;
  container.querySelector('[data-ingredients]').innerText = receipt.ingredients.join(', ');
  container.querySelector('[data-pic]').style.backgroundImage = `url(${receipt.pic})`;

  loadData(`https://neto-api.herokuapp.com/food/${receipt.id}/rating`, (rating) => {
    container.querySelector('[data-rating]').innerText = rating.rating.toFixed(2);
    container.querySelector('[data-star]').style.width = `${rating.rating * 10}px`;
    container.querySelector('[data-votes]').innerText = `(${rating.votes} оценок)`;
  });

  loadData(`https://neto-api.herokuapp.com/food/${receipt.id}/consumers`, (consumers) => {
    if (Array.isArray(consumers.consumers)) {
      let consumersHtml = '';

      consumers.consumers.forEach(consumer => {
        consumersHtml += `<img src="${consumer.pic}" title="${consumer.name}">`;
      });

      consumersHtml += `<span>(+${consumers.total - consumers.consumers.length})</span>`;
      container.querySelector('[data-consumers]').innerHTML = consumersHtml;
    }
  });
}

loadData(`https://neto-api.herokuapp.com/food/42`, loadReceipt);