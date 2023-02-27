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
  approptiation();

  timeUpdate = setInterval(() => {
    timeLeft = timeLeft - 1000;
    if (timeLeft > 1000) {
      approptiation();
    } else {
      timeLeft = timeLeft - timeLeft;
      approptiation();
      clearInterval(timeUpdate);
    }
  }, 1000);
};

function approptiation() {
  const { days, hours, minutes, seconds } = convertMs(timeLeft);

  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDate] = selectedDates) {
    if (selectedDate.getTime() - Date.now() <= 0) {
      refs.startButton.setAttribute('disabled', 'disabled');
      return Notiflix.Notify.failure('Please choose a date in the future');
    }

    refs.startButton.addEventListener('click', onClick);
    refs.startButton.removeAttribute('disabled');

    timeLeft = selectedDate.getTime() - options.defaultDate.getTime();
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
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

const fp = flatpickr(refs.input, options);
