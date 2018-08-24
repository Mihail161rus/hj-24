'use strict';

function randName() {
  return 'cb' + String(Math.random()).slice(-6);
}

function loadDataToProfile(data) {
  document.querySelector('.container [data-wallpaper]').src = data.wallpaper;
  document.querySelector('.container [data-username]').innerText = data.username;
  document.querySelector('.container [data-description]').innerText = data.description;
  document.querySelector('.container [data-pic]').src = data.pic;
  document.querySelector('.container [data-tweets]').innerText = data.tweets;
  document.querySelector('.container [data-followers]').innerText = data.followers;
  document.querySelector('.container [data-following]').innerText = data.following;
}

function loadData(url) {
  const functionName = randName();

  return new Promise((done, fail) => {
    window[functionName] = loadDataToProfile;

    const script = document.createElement('script');
    script.src = `${url}?jsonp=${functionName}`;
    document.body.appendChild(script);
  });
}

loadData('https://neto-api.herokuapp.com/twitter/jsonp');