function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  startButton: document.querySelector('[data-start]'),
  stopButton: document.querySelector('[data-stop]'),
};

let intervalId = null;

refs.startButton.addEventListener('click', onStartClick);
refs.stopButton.addEventListener('click', onStopClick);

function onStartClick() {
  toggleButtom();
  intervalId = setInterval(changeBgc, 1000);
}

function onStopClick() {
  toggleButtom();
  clearInterval(intervalId);
}

function toggleButtom() {
  refs.startButton.toggleAttribute('disabled');
  refs.stopButton.toggleAttribute('disabled');
}

function changeBgc() {
  document.body.style.backgroundColor = getRandomHexColor();
}
