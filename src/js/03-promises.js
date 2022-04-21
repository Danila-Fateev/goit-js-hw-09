import Notiflix from 'notiflix';


const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  startBtn: document.querySelector('button[type="submit"]')
}
let pos = 0;


refs.form.addEventListener('submit', (e) => {
  const stepTextContent = refs.step.value;
  const amountTextContent = refs.amount.value;
  e.preventDefault();

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
    const interval = setInterval((stepTextContent, amountTextContent) => {
      pos += 1;
      if (pos > refs.amount.value) {
        clearInterval(interval)
        pos = 0;
        return
      }

      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
         Notiflix.Notify.success(`Fulfilled promise ${amountTextContent} in ${stepTextContent}ms`)

      } else {
        Notiflix.Notify.failure(`Rejected promise ${amountTextContent} in ${stepTextContent}ms`)
      }
    }, stepTextContent)}, refs.delay.value)
  }
  )
})