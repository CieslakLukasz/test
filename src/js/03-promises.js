import Notiflix, { Notify } from 'notiflix';

const submit = document.querySelector('.form');

const createPromise = (position, delay) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
};

const submitHandler = event => {
  let InitDelay = Number(document.querySelector('input[name="delay"]').value);
  let step = Number(document.querySelector('input[name="step"]').value);
  let amount = Number(document.querySelector('input[name="amount"]').value);
  event.preventDefault();
  for (let i = 1; i <= amount; i++) {
    createPromise(i, InitDelay)
      .then(({ position, InitDelay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${InitDelay}ms`);
        console.log(`✅ Fulfilled promise ${position} in ${InitDelay}ms`);
      })
      .catch(({ position, InitDelay }) => {
        Notify.warning(`❌ Rejected promise ${position} in ${InitDelay}ms`);
      });
    InitDelay += step;
  }
};
submit.addEventListener('submit', submitHandler);
