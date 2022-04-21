const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]')
}

let interval = null;

refs.startBtn.addEventListener('click', onStartBtnClick)
refs.stopBtn.addEventListener('click', onStopBtnClick)

function onStartBtnClick() {
    interval = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor()
    }, 1000);
    
    refs.startBtn.setAttribute('disabled', 'disabled');
    refs.stopBtn.removeAttribute('disabled');
}

function onStopBtnClick() {
    clearInterval(interval);
       refs.stopBtn.setAttribute('disabled', 'disabled');
    refs.startBtn.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}