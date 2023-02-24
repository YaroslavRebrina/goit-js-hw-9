const bodyRef = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const colorChange = () => {
  bodyRef.style.backgroundColor = getRandomHexColor();
};

let timerId = null;

const onClick = e => {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  if (Object.keys(e.target.dataset).includes('start')) {
    e.target.setAttribute('disabled', 'disabled');
    timerId = setInterval(colorChange, 1000);
  } else {
    document
      .querySelector('button[data-start]')
      .removeAttribute('disabled', 'disabled');
    clearInterval(timerId);
  }
};

bodyRef.addEventListener('click', onClick);
