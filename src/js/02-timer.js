import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const refs = {
    startBtn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

let selectedDate = null
// const inputEl = document.querySelector('#datetime-picker');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0]
        if (selectedDates[0] > options.defaultDate) {
            refs.startBtn.removeAttribute('disabled');
            const difference = selectedDates[0] - Date.now();
            const convertedMs = convertMs(difference);
            turnDateIntoText(convertedMs);
        } else {
            refs.startBtn.setAttribute('disabled', 'disabled');
            Notiflix.Notify.warning("Please choose a date in the future");
        }
        
        
    },
};

refs.startBtn.addEventListener('click', timer);

flatpickr('#datetime-picker', options)

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
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function turnDateIntoText({ days, hours, minutes, seconds }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
} 

function addLeadingZero(value) {
    return `${value}`.padStart(2, '0');
}

function timer() {
    const intreval = setInterval(() => {
        if(selectedDate - Date.now() < 300 && selectedDate - Date.now() > -300) {
            clearInterval(intreval)
            Notiflix.Notify.success("Time's up!")
    }
        const difference = selectedDate - Date.now();
    const convertedMs = convertMs(difference);
        turnDateIntoText(convertedMs);
}, 1000)
}