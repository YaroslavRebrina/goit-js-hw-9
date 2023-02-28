import Notiflix from 'notiflix';
// Додатковий імпорт стилів
import 'notiflix/dist/notiflix-3.2.6.min.css';

const form = document.querySelector('.form');

let data = {};

const onInput = e => {
  data[e.target.name] = Number(e.target.value);
};

form.addEventListener('input', onInput);
form.addEventListener('submit', onSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSubmit(e) {
  e.preventDefault();

  for (let i = 0; i <= data.amount; i += 1) {
    createPromise(i + 1, Number(data.delay) + Number(data.step) * i)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}
