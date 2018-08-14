const request = new XMLHttpRequest();
request.addEventListener('load', onLoad);
request.open('GET', 'https://netology-fbb-store-api.herokuapp.com/weather', true);
request.send();

function onLoad(event) {
  if (event.target.status === 200) {
    const response = JSON.parse(event.target.responseText);
    setData(response);
  }
}

/*Проверяем работу события по клику пока грузится виджет*/
document.addEventListener('click', onClick);
function onClick() {
  console.log('Выполнен клик');
}