function disableButton(button, setDisabled = true) {
  if (setDisabled) {
    button.classList.add('disabled');
  } else {
    button.classList.remove('disabled');
  }

  button.disabled = setDisabled;

}

function getButton(type) {
  return Array.from(document.querySelectorAll('.slider-nav a')).find(button => {
    return button.dataset.action === type;
  });
}

function getSlide(type) {
  switch (type) {
    case 'active':
      return document.querySelector('.slides .slide.slide-current');
      break;

    case 'first':
      return document.querySelector('.slides').firstElementChild;
      break;

    case 'last':
      return document.querySelector('.slides').lastElementChild;
      break;
  }
}

function changeSlide(type) {
  const activeSlide = getSlide('active');
  const firstSlide = getSlide('first');
  const lastSlide = getSlide('last');
  let newActiveSlide = activeSlide;

  switch (type) {
    case 'prev':
      if (activeSlide.previousElementSibling) {
        newActiveSlide =  activeSlide.previousElementSibling;
      }
      break;
    case 'next':
      if (activeSlide.nextElementSibling) {
        newActiveSlide =  activeSlide.nextElementSibling;
      }
      break;
    case 'last':
      newActiveSlide = lastSlide;
      break;
    default:
      newActiveSlide = firstSlide;
      break;
  }

  if (activeSlide !== newActiveSlide) {
    if (activeSlide) {
      activeSlide.classList.remove('slide-current');
    }
    newActiveSlide.classList.add('slide-current');

    const prevButton = getButton('prev'),
      nextButton = getButton('next'),
      firstButton = getButton('first'),
      lastButton = getButton('last');
    
    if (newActiveSlide === firstSlide) {
      disableButton(prevButton);
      disableButton(firstButton);
    } else {
      disableButton(prevButton, false);
      disableButton(firstButton, false);
    }

    if (newActiveSlide === lastSlide) {
      disableButton(nextButton);
      disableButton(lastButton);
    } else {
      disableButton(nextButton, false);
      disableButton(lastButton, false);
    }
  }
}

function onSliderNavClick(event) {
  event.preventDefault();
  let action = event.target.dataset.action;
  changeSlide(action);
}

Array.from(document.querySelectorAll('.slider-nav a')).forEach(button => {
  button.addEventListener('click', onSliderNavClick);
});

changeSlide('first');