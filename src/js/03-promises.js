const form = document.querySelector('.form');

let data = {};
let delay = 0;

const onInput = e => {
  data[e.target.name] = Number(e.target.value);
};

form.addEventListener('input', onInput);
form.addEventListener('submit', onSubmit);

function createPromise(position, delay) {
  setTimeout(() => {
    const promise = new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    });

    promise
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }, delay);
}

function onSubmit(e) {
  e.preventDefault();

  for (let i = 1; i <= data.amount; i += 1) {
    createPromise(i, Number(data.delay) + Number(data.step) * i);
  }
}
