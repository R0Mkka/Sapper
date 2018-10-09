import Algorithm from './algorithm/algorithm.js';
import ButtonsController from './buttonsController/buttonsController.js';
import FlagsCounter from './flagsCounter.js';
import Modal from './modal/modal.js';
import Smile from './smile.js';
import Timer from './timer.js';
import Helpers from './helpers.js';

export default class GameController {

  cellLeftClick(playField) {
    playField.field.onclick = (event) => {
      const target = event.target;

      if (target.classList.contains('cell')) {
        if (target.classList.contains('bomb')) {
          target.innerHTML = `<img src='img/bomb.png'>`;
          target.style.backgroundColor = 'red';

          playField.open();
          this._gameOver(playField);
        } else {
          target.style.backgroundColor = 'teal';
          target.classList.add('clicked');

          let algorithm = new Algorithm();
          algorithm.openCells(playField);

          this._checkForWin(playField);
        }
      }
    }
  }

  _gameOver(playField) {
    Smile.showDemon();
    Timer.stop();

    const modalSettings = {
      width: '450px',
      height: '300px',
      title: 'Буууум!',
      className: 'loss-modal'
    }

    let modal = new Modal(modalSettings);

    modal.tune();
    modal.show();

    let restartButton = document.querySelector('.loss-modal__buttons .restart'),
        buttonsController = new ButtonsController();

    buttonsController.restartGame(restartButton, modal, playField);
  }

  _checkForWin(playField) {
    let rightFlagsCount = 0,
        openedCells = 0;

    for (let i = 0; i < playField.rows; i++) {
      for (let j = 0; j < playField.columns; j++) {
        if (playField.positions[i][j].classList.contains('bomb') &&
           playField.positions[i][j].classList.contains('flagged')) {
          rightFlagsCount++;
        }

        if (!playField.positions[i][j].classList.contains('closed') &&
            !playField.positions[i][j].classList.contains('bomb') &&
            !playField.positions[i][j].classList.contains('flagged')) {
          openedCells++;
        }
      }
    }

    let bombs = playField.bombs,
        clearCells = playField.rows * playField.columns - bombs.length;

    if (bombs.length == rightFlagsCount &&
       openedCells == clearCells) {
      this._win(playField);
    }
  }

  cellRightClick(playField) {
    playField.field.oncontextmenu = (event) => {
      event.preventDefault();

      const target = event.target;

      if (target.classList.contains('cell')) {
        if (target.classList.contains('closed')) {
          if (FlagsCounter.getFlags() > 0) {
            target.classList.add('flagged');
            target.innerHTML = `<img src='img/flag.png'>`;
            target.style.backgroundColor = '#e5e04a';

            let currentFlags = FlagsCounter.getFlags();
            FlagsCounter.setFlags(--currentFlags, playField.bombs.length);

            this._checkForWin(playField);
          }
        }
      }

      if (target.parentNode.classList.contains('flagged')) {
        target.parentNode.classList.remove('flagged');
        target.parentNode.style.backgroundColor = '';
        target.parentNode.innerHTML = '';

        let currentFlags = FlagsCounter.getFlags();
        FlagsCounter.setFlags(++currentFlags, playField.bombs.length);
      }
    }
  }

  _win(playField) {
    Timer.stop();

    const modalSettings = {
      width: '550px',
      height: '300px',
      title: 'Победа!',
      className: 'win-modal'
    }

    const modal = new Modal(modalSettings);

    modal.tune();
    modal.show();

    const restartButton = document.querySelector('.win-modal__buttons .restart');
    const saveButton = document.querySelector('.win-modal__buttons .save');
    const buttonsController = new ButtonsController();

    buttonsController.restartGame(restartButton, modal, playField);
    buttonsController.saveResults(saveButton, modal, playField);
  }
}
