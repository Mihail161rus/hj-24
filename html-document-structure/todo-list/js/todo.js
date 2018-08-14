const tasks = document.querySelectorAll('.todo-list .done input[type="checkbox"], .todo-list .undone input[type="checkbox"]');

for (let task of tasks) {
  task.addEventListener('click', clickTask);
}

function clickTask(event) {
  event.preventDefault();

  let moveSection;

  if (event.target.hasAttribute('checked')) {
    moveSection = document.querySelector('.todo-list .undone');
    event.target.removeAttribute('checked');
  } else {
    moveSection = document.querySelector('.todo-list .done');
    event.target.setAttribute('checked', '');
  }

  moveSection.appendChild(event.target.parentElement);
}