import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const myInput = document.getElementById("datetime-picker");
const btnRef = document.querySelector('button[data-start]')

const daysRef = document.querySelector('span[data-days]');
const hoursRef = document.querySelector('span[data-hours]');
const minutesRef = document.querySelector('span[data-minutes]');
const secondsRef = document.querySelector('span[data-seconds]');
// console.log(secondsRef);
btnRef.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const chooseTime = selectedDates[0].getTime();
    const currentTime = options.defaultDate.getTime();
    const selectedTime = chooseTime - currentTime;

    if(chooseTime <= currentTime) {
      window.alert("Please choose a date in the future");
    } else {
      // console.log(selectedTime);
      btnRef.disabled = false;
      // convertMs(selectedTime);

      const { days, hours, minutes, seconds } = convertMs(selectedTime);

      daysRef.textContent = `${days}`;
      hoursRef.textContent = `${hours}`;
      minutesRef.textContent = `${minutes}`;
      secondsRef.textContent = `${seconds}`;

      console.log(daysRef);
    }
  },
};

const fp = flatpickr(myInput, options);  // flatpickr



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


// Відлік часу
// Натисканням на кнопку «Start» скрипт повинен обчислювати раз на секунду, скільки часу залишилось до вказаної дати, і оновлювати інтерфейс таймера, показуючи чотири цифри: дні, години, хвилини і секунди у форматі xx:xx:xx:xx.

// Кількість днів може складатися з більше, ніж двох цифр.
// Таймер повинен зупинятися, коли дійшов до кінцевої дати, тобто 00:00:00:00.
// НЕ БУДЕМО УСКЛАДНЮВАТИ
// Якщо таймер запущений, для того щоб вибрати нову дату і перезапустити його - необхідно перезавантажити сторінку.

// Для підрахунку значень використовуй готову функцію convertMs, де ms - різниця між кінцевою і поточною датою в мілісекундах.

