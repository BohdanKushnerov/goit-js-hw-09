import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const myInput = document.getElementById('datetime-picker');
const btnRef = document.querySelector('button[data-start]');

const daysRef = document.querySelector('span[data-days]');
const hoursRef = document.querySelector('span[data-hours]');
const minutesRef = document.querySelector('span[data-minutes]');
const secondsRef = document.querySelector('span[data-seconds]');

btnRef.addEventListener('click', () => {
  timer.start();
});

let userDate = 0;
btnRef.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      Notify.failure('Please choose a date in the future');
    } else {
      btnRef.disabled = false;
      userDate = selectedDates[0].getTime();
    }
  },
};

const fp = flatpickr(myInput, options); // flatpickr

class Timer  {
  constructor({onTextChange}) {
    this.intervalId = null,
    this.isActive = false,
    this.onTextChange = onTextChange
  }

  start() {
    btnRef.disabled = true;
    myInput.disabled = true;
    if(this.isActive) {
      return
    }

    this.isActive = true,

    this.intervalId = setInterval(() => {
    const currentTime = new Date().getTime();
    const selectedTime = userDate - currentTime;
    
    const time = this.convertMs(selectedTime);
    this.onTextChange(time);
    // console.log(time)

      if (selectedTime <= 1000) {
        this.stop();
      }
    }, 1000);
  };

  stop() {
    btnRef.disabled = false;
    myInput.disabled = false;
    this.isActive = false;

    const time = this.convertMs(0);
    this.onTextChange(time);

    clearInterval(this.intervalId);
    Notify.success('Timer is finised!');
    return;
  };

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );
  
    return { days, hours, minutes, seconds };
  };

  addLeadingZero(value) {
    return String(value).padStart(2, 0);
  }
};

const timer = new Timer({
  onTextChange: makeTextContent
});

function makeTextContent({ days, hours, minutes, seconds }) {
// const { days, hours, minutes, seconds } = timer.convertMs(time);

  daysRef.textContent = `${days}`;
  hoursRef.textContent = `${hours}`;
  minutesRef.textContent = `${minutes}`;
  secondsRef.textContent = `${seconds}`;
}




