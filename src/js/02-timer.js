import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

let timerId = null;
let targetDate = null;
const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  span: document.querySelector('.value'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (new Date() < new Date(selectedDates[0])) {
      refs.btnStart.removeAttribute('disabled');
      targetDate = new Date(selectedDates[0]);
    } else {
      refs.btnStart.setAttribute('disabled', '');
      window.alert('Please choose a date in the future');
    }

    console.log(new Date(selectedDates[0]) < new Date());
  },
};

flatpickr('#datetime-picker', options);

refs.btnStart.addEventListener('click', () => {
  timerId = setInterval(() => {
    const currentDate = new Date();

    const diff = targetDate - currentDate;
    if (diff < 0) {
      clearInterval(timerId);
      return;
    }
    const result = convertMs(diff);
    refs.days.innerHTML = result.days.toString().padStart(2, '0');
    refs.hours.innerHTML = result.hours.toString().padStart(2, '0');
    refs.minutes.innerHTML = result.minutes.toString().padStart(2, '0');
    refs.seconds.innerHTML = result.seconds.toString().padStart(2, '0');
  }, 1000);
});

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
