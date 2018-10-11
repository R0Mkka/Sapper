export default class Timer {

  constructor() {
    Timer.timerMinutes = document.querySelector('.timer .timer__minutes');
    Timer.timerSeconds = document.querySelector('.timer .timer__seconds');

    Timer.timerId = null;
  }

  static start() {
    let seconds = 0;
    let minutes = '00';

    Timer.timerId = setInterval(() => {
      seconds++;

      if (seconds == 60) {
        minutes++;

        minutes = Timer._correctMinutes(minutes);

        seconds = 0;
      }

      Timer._updateTime(minutes, seconds);
    }, 1000);
  }

  static _correctMinutes(minutes) {
    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    return minutes;
  }

  static _updateTime(minutes, seconds) {
    seconds = Timer._correctSeconds(seconds);

    Timer.timerSeconds.innerHTML = seconds;
    Timer.timerMinutes.innerHTML = minutes;
  }

  static _correctSeconds(seconds) {
    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    return seconds;
  }

  static stop() {
    if (Timer.timerId) {
      clearInterval(Timer.timerId);
    }
  }

  static clear() {
    Timer.timerSeconds.innerHTML = '00';
    Timer.timerMinutes.innerHTML = '00';
  }
}
