'use strict';

const container = document.querySelector('.list-block');
const checkList = container.querySelectorAll('input[type="checkbox"');
let outputField = container.querySelector('output');

function countChecked() {
  let doneCount = 0;

  for (let item of checkList) {
    if (item.checked === true) {
      doneCount++;
    }
  }

  if (doneCount === checkList.length) {
    container.classList.add('complete');
  } else {
    container.classList.remove('complete');
  }

  outputField.innerHTML = `${doneCount} из ${checkList.length}`;
}

for (let item of checkList) {
  item.addEventListener('change', countChecked);
}

document.addEventListener('DOMContentLoaded', countChecked);