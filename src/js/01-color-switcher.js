function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyRef = document.querySelector('body');


const colorSwitcher = {
  intervalId: null,
  isActive: false,

  start() {
    if(this.isActive) {
      return;
    }

    this.isActive = true;

    this.intervalId = setInterval(() => {
        bodyRef.style.backgroundColor = getRandomHexColor();
      }, 1000);
      console.log(this.intervalId)
  },

  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  }
}

startBtn.addEventListener('click', ()=> {
  colorSwitcher.start()
});
stopBtn.addEventListener('click', ()=> {
  colorSwitcher.stop()
})

// console.log(colorSwitcher.intervalId)




