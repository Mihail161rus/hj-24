const demoTab = document.querySelector('#tabs .tabs-nav li');
demoTab.parentElement.removeChild(demoTab);

const navPanel = document.querySelector('#tabs .tabs-nav');
const articlesSection = document.querySelector('#tabs .tabs-content');

for (let article of articlesSection.children) {
  const newElement = demoTab.cloneNode(true);
  newElement.firstChild.classList.add(article.dataset.tabIcon);
  newElement.firstChild.innerText = article.dataset.tabTitle;
  newElement.firstChild.dataset.tabTitle = article.dataset.tabTitle;

  newElement.addEventListener('click', clickTab);

  article.classList.add('hidden');
  navPanel.appendChild(newElement);
}

function changeActiveTab(tab) {
  const prevActiveTab = navPanel.querySelector('.ui-tabs-active');

  if (tab) {
    if (prevActiveTab) {
      prevActiveTab.classList.remove('ui-tabs-active');
      const prevActiveContent = articlesSection.querySelector(`[data-tab-title="${prevActiveTab.dataset.tabTitle}"]`);

      if (prevActiveContent) {
        prevActiveContent.classList.add('hidden');
      }
    }

    tab.firstChild.classList.add('ui-tabs-active');

    const newActiveContent = articlesSection.querySelector(`[data-tab-title="${tab.firstChild.dataset.tabTitle}"]`);
    if (newActiveContent) {
      newActiveContent.classList.remove('hidden');
    }
  }
}

function clickTab(event) {
  changeActiveTab(event.target.parentElement);
}

changeActiveTab(navPanel.children[0]);