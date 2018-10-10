export default class Timer {

  constructor() {
    Timer.timerMinutes = document.querySelector('.timer .timer__minutes');
    Timer.timerSeconds = document.querySelector('.timer .timer__seconds');
    Timer.timerId = null;
  }

  static start() {
    let seconds = 0,
        minutes = '00';

    Timer.timerId = setInterval(() => {
      seconds++;
      if (seconds == 60) {
        minutes++;
        if (minutes < 10) minutes = '0' + minutes;
        seconds = 0;
      }

      let update = () => {
        if (seconds < 10) seconds = '0' + seconds;
        Timer.timerSeconds.innerHTML = seconds;
        Timer.timerMinutes.innerHTML = minutes;
      }

      update();
    }, 1000);
  }

  static stop() {
    if (Timer.timerId) clearInterval(Timer.timerId);
  }

  static clear() {
    Timer.timerSeconds.innerHTML = '00';
    Timer.timerMinutes.innerHTML = '00';
  }
}
