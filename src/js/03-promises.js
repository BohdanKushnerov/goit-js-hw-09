import { Notify } from 'notiflix/build/notiflix-notify-aio';

const firstDelayRef = document.querySelector('input[name = delay]');
const delayStepRef = document.querySelector('input[name = step]');
const amountRef = document.querySelector('input[name = amount]');
const btnRef = document.querySelector('button[type = submit]');

let firstDelay = 2000;
const delayStep = 1000;
let amount = 6;
// let value = 0;

btnRef.addEventListener('click', onStart);

function onStart(e) {
  e.preventDefault();

  for (let i = 0; i < amount; i += 1) {
    setTimeout(() => {
      waitFor(i + 1, firstDelay + delayStep * i);
    }, firstDelay + delayStep * i);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}

function waitFor(position, delay) {
  createPromise(position, delay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}

// createPromise(position, delay)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });

// ----------------------------------------------------
