import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');
const firstDelayRef = document.querySelector('input[name = delay]');
const delayStepRef = document.querySelector('input[name = step]');
const amountRef = document.querySelector('input[name = amount]');
// const btnRef = document.querySelector('button[type = submit]');

formRef.addEventListener('submit', onStart);

function onStart(e) {
  e.preventDefault();

  const firstDelay = Number(firstDelayRef.value);
  const delayStep = Number(delayStepRef.value);
  const amount = Number(amountRef.value);

  for (let i = 0; i < amount; i += 1) {
    const step = i + 1;
    const currentDelay = firstDelay + delayStep * i

    setTimeout(() => {
      waitForRun(step, currentDelay);
    }, currentDelay);
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

function waitForRun(position, delay) {
  createPromise(position, delay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
