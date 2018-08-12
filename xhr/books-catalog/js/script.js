const content = document.getElementById('content');
content.innerHTML = '';
const request = new XMLHttpRequest();
request.addEventListener('load', loadResult);
request.addEventListener('loadstart', showPreloadText);
request.open('GET', 'https://neto-api.herokuapp.com/book/ ', true);
request.send();

function loadResult(event) {
  if (event.currentTarget.status === 200) {
    content.innerHTML = '';

    let books = JSON.parse(event.currentTarget.responseText);

    books.forEach(book => {
      content.innerHTML += `
        <li
          data-title="${book.title}"
          data-author="${book.author.name}"
          data-info="${book.info}"
          data-price="${book.price}">
          <img src="${book.cover.small}">
        </li>
      `;
    });
  }
}

function showPreloadText() {
  content.innerHTML = '<h4>Пожалуйста, подождите! Идет загрузка...</h4>';
}