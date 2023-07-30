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

const refs = {
  form: document.querySelector('.form'),
  firstDelay: document.querySelector('[name="delay"]'),
  stepDelay: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};

refs.form.addEventListener('submit', evt => {
  evt.preventDefault();
  let steps = 0;
  let step = Number(refs.stepDelay.value);
  let firstDelay = Number(refs.firstDelay.value);
  let amount = Number(refs.amount.value);
  for (let i = 0; i < amount; i += 1, steps += step) {
    let delay = firstDelay + steps;
    let position = i;
    createPromise(i, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});
