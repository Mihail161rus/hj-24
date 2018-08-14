const navLinks = document.querySelectorAll('nav > a');
const activeTab = document.querySelector('nav > a.active');

for (let navLink of navLinks) {
  navLink.addEventListener('click', tabClick);
}

function switchOnLoader() {
  document.getElementById('preloader').classList.remove('hidden');
}

function switchOffLoader() {
  setTimeout(() => document.getElementById('preloader').classList.add('hidden'), 200);
}

function loadTabHtml(currentTab) {
  const request = new XMLHttpRequest();
  request.addEventListener('loadstart', switchOnLoader);
  request.addEventListener('loadend', switchOffLoader);
  request.addEventListener('load', loadResult);
  request.open('GET', currentTab.href, true);
  request.send();
}

function tabClick(event) {
  event.preventDefault();

  Array.from(navLinks).forEach(navLink => navLink.classList.remove('active'));
  event.currentTarget.classList.add('active');

  loadTabHtml(event.currentTarget);
}

function loadResult(event) {
  const content = document.getElementById('content');

  if (event.currentTarget.status === 200) {
    content.innerHTML = event.currentTarget.responseText;
  }
}

loadTabHtml(activeTab);