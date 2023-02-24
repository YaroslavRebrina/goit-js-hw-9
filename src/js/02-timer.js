import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
// Додатковий імпорт стилів
import 'notiflix/dist/notiflix-3.2.6.min.css';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let timeLeft = null;
let timeLeftConverted = null;
let timeUpdate = null;

refs.startButton.setAttribute('disabled', 'disabled');

const onClick = () => {
  refs.days.textContent = timeLeftConverted.days;
  refs.hours.textContent = timeLeftConverted.hours;
  refs.minutes.textContent = timeLeftConverted.minutes;
  refs.seconds.textContent = timeLeftConverted.seconds;

  timeUpdate = setInterval(() => {
    if (timeLeft >= 1000) {
      timeLeft = timeLeft - 1000;

      approptiation();
    } else {
      timeLeft = timeLeft - timeLeft;
      clearInterval(timeUpdate);
    }
  }, 1000);
};

function approptiation() {
  ({ days, hours, minutes, seconds } = convertMs(timeLeft));

  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() - options.defaultDate.getTime() < 0) {
      return Notiflix.Notify.failure('Please choose a date in the future');
    }

    refs.startButton.removeAttribute('disabled');

    timeLeft = selectedDates[0].getTime() - options.defaultDate.getTime();

    timeLeftConverted = convertMs(timeLeft);
  },
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

const fp = flatpickr(refs.input, options);
refs.startButton.addEventListener('click', onClick);
