export default class FlagsCounter {

  static setFlags(bombsCount, maxBombs) {
    let bombsLeft = document.querySelector('.flags-left');

    if (bombsCount >= 0 && bombsCount <= maxBombs) {
      bombsLeft.innerHTML = bombsCount;
    }
  }

  static getFlags() {
    let bombsLeft = document.querySelector('.flags-left');

    return bombsLeft.innerHTML;
  }
}
