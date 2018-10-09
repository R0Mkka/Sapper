export default class FlagsCounter {

  static setFlags(bombsCount, maxBombs) {
    let flagsLeft = document.querySelector('.flags-left');

    if (bombsCount >= 0 && bombsCount <= maxBombs) {
      flagsLeft.innerHTML = bombsCount;
    }
  }

  static getFlags() {
    let flagsLeft = document.querySelector('.flags-left');

    return flagsLeft.innerHTML;
  }
}
