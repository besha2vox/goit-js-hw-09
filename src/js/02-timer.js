import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  timeValues: document.querySelectorAll('.value'),
  startButton: document.querySelector('button[data-start]'),
};

let currentTime = null;
let setTime = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (options.defaultDate.getTime() > selectedDates[0].getTime()) {
      Notify.failure('Please chose a date in the future');
      return;
    }
    setTime = selectedDates[0].getTime();

    if (options.defaultDate.getTime() < setTime) {
      toggleButton();
    }
  },
};

refs.startButton.addEventListener('click', onStartClick);

const date = flatpickr('input#datetime-picker', options);

function onStartClick() {
  Notify.success('The timer has been started');
  toggleButton();
  intervalId = setInterval(runTimer, 1000);
}

function toggleButton() {
  refs.startButton.toggleAttribute('disabled');
}

function stopInterval(deltaTime) {
  if (deltaTime < 1000) clearInterval(intervalId);
}

function runTimer() {
  const deltaTime = findDeltaTime();
  stopInterval(deltaTime);
  const convertTime = convertMs(deltaTime);
  changeHtmlValues(convertTime);
}

function findDeltaTime() {
  currentTime = Date.now();
  return setTime - currentTime;
}

function pad(prop) {
  return String(prop).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function changeHtmlValues({ days, hours, minutes, seconds }) {
  refs.timeValues.forEach(value => {
    if (value.hasAttribute('data-days')) value.innerHTML = days;
    if (value.hasAttribute('data-hours')) value.innerHTML = hours;
    if (value.hasAttribute('data-minutes')) value.innerHTML = minutes;
    if (value.hasAttribute('data-seconds')) value.innerHTML = seconds;
  });
}
