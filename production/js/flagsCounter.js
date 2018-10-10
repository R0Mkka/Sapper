export default class FlagsCounter {

  static setFlags(bombsCount, maxBombs) {
    const flagsLeft = document.querySelector('.flags-left');

    if (!maxBombs) {
      flagsLeft.innerHTML = bombsCount;
      return;
    }

    if (bombsCount >= 0 && bombsCount <= maxBombs) {
      flagsLeft.innerHTML = bombsCount;
    }
  }

  static getFlags() {
    const flagsLeft = document.querySelector('.flags-left');

    return flagsLeft.innerHTML;
  }
}
