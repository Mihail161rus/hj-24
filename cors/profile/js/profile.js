'use strict';

function randName() {
  return 'cb' + String(Math.random()).slice(-6);
}

function loadDataToProfile(data) {
  document.querySelector('.content [data-name]').innerText = data.name;
  document.querySelector('.content [data-description]').innerText = data.description;
  document.querySelector('.content [data-pic]').src = data.pic;
  document.querySelector('.content [data-position]').innerText = data.position;

  loadData(`https://neto-api.herokuapp.com/profile/${data.id}/technologies`, loadTechsToProfile);

  document.querySelector('.content').style.display = 'initial';
}

function loadTechsToProfile(techs) {
  if (Array.isArray(techs)) {
    let techsHtml = '';

    techs.forEach(tech => {
      techsHtml += `<span class="devicons devicons-${tech}"></span>`;
    });

    document.querySelector('.content [data-technologies]').innerHTML = techsHtml;
  }
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

loadData('https://neto-api.herokuapp.com/profile/me', loadDataToProfile);