export default class FlagsCounter {

  static setFlags(bombsAmount, maxBombs) {
    const flagsLeft = document.querySelector('.flags-left');

    if (!maxBombs) {
      flagsLeft.innerHTML = bombsAmount;

      return;
    }

    if (bombsAmount >= 0 && bombsAmount <= maxBombs) {
      flagsLeft.innerHTML = bombsAmount;
    }
  }

  static getFlags() {
    const flagsLeft = document.querySelector('.flags-left');

    return flagsLeft.innerHTML;
  }
}
