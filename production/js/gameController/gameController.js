import ButtonsController from '../buttonsController/buttonsController.js';
import Algorithm from '../algorithm/algorithm.js';
import FlagsCounter from '../flagsCounter.js';
import Modal from '../modal/modal.js';
import Helpers from '../helpers.js';
import Smile from '../smile.js';
import Timer from '../timer.js';

import { classes } from '../classes.js';
import { colors } from '../colors.js';

import { lossModalSettings } from './gameController.config.js';
import { winModalSettings } from './gameController.config.js';
import { selectors } from './gameController.config.js';

export default class GameController {
  constructor() {
    this.algorithm = new Algorithm();
    this.modal = new Modal();
  }

  cellLeftClick(playField) {
    playField.field.onclick = (event) => {
      const target = event.target;

      if (Helpers.cellCheck(target)) {
        this._workWithCell(target, playField);
      }
    }
  }

  _workWithCell(target, playField) {
    if (Helpers.bombCheck(target)) {
      this._putBomb(target);

      playField.open();

      this._gameOver(playField);
    } else {
      this._openCurrentCell(target);

      this.algorithm.openCells(playField);

      this._checkForWin(playField);
    }
  }

  _putBomb(target) {
    target.style.backgroundColor = colors.bomb;

    target.innerHTML = `<img src='img/bomb.png'>`;
  }

  _gameOver(playField) {
    Timer.stop();

    Smile.showDemon();

    this._showLossModal();

    const restartButton = document.querySelector(selectors.restart);
    const buttonsController = new ButtonsController();

    buttonsController.restartGame(restartButton, this.modal, playField);
  }

  _showLossModal() {
    this.modal.setSettings(lossModalSettings);
    this.modal.tune();
    this.modal.show();
  }

  _openCurrentCell(target) {
    target.style.backgroundColor = colors.clearCell;

    Helpers.addClass(target, classes.clicked);
  }

  _checkForWin(playField) {
    let rightFlagsSet = 0;
    let openedCells = 0;

    for (let i = 0; i < playField.rows; i++) {
      const tempResults = this._goThroughTheRow(i, playField);

      rightFlagsSet += tempResults.tempRightFlagsSet;
      openedCells += tempResults.tempOpenedCells;
    }

    const bombsAmount = playField.bombs.length;
    const clearCells = this._countClearCellsAmount(playField);

    if (bombsAmount == rightFlagsSet &&
        clearCells == openedCells) {
      this._win(playField);
    }
  }

  _goThroughTheRow(i, playField) {
    let tempRightFlagsSet = 0;
    let tempOpenedCells = 0;

    for (let j = 0; j < playField.columns; j++) {
      const cell = playField.positions[i][j];

      if (Helpers.bombCheck(cell) && Helpers.flaggedCheck(cell)) {
        tempRightFlagsSet++;
      }

      if (this._openedCellCheck(cell)) {
        tempOpenedCells++;
      }
    }

    return {
      tempRightFlagsSet: tempRightFlagsSet,
      tempOpenedCells: tempOpenedCells
    }
  }

  _openedCellCheck(cell) {
    switch (true) {
      case Helpers.closedCheck(cell):
        return false;
      case Helpers.bombCheck(cell):
        return false;
      case Helpers.flaggedCheck(cell):
        return false;
    }

    return true;
  }

  _countClearCellsAmount(playField) {
    const bombsAmount = playField.bombs.length;

    const cellsAmount = playField.rows * playField.columns;
    const clearCellsAmount = cellsAmount - bombsAmount;

    return clearCellsAmount;
  }

  cellRightClick(playField) {
    playField.field.oncontextmenu = (event) => {
      event.preventDefault();

      const target = event.target;

      if (Helpers.closedCheck(target)) {
        this._putFlag(target, playField);
      }

      if (Helpers.flaggedCheck(target.parentNode)) {
        this._removeFlag(target.parentNode);
      }
    }
  }

  _putFlag(target, playField) {
    if (FlagsCounter.getFlags() > 0) {
      Helpers.addClass(target, classes.flagged);

      target.innerHTML = `<img src='img/flag.png'>`;
      target.style.backgroundColor = colors.flag;

      this._updateFlagsCount(-1, playField);

      this._checkForWin(playField);
    }
  }

  _removeFlag(target) {
    Helpers.removeClass(target, classes.flagged);

    target.style.backgroundColor = '';
    target.innerHTML = '';

    this._updateFlagsCount(+1, playField);
  }

  _updateFlagsCount(diffetence, playField) {
    const currentFlags = FlagsCounter.getFlags() + diffetence;

    FlagsCounter.setFlags(currentFlags, playField.bombs.length);
  }

  _win(playField) {
    Timer.stop();

    this._showWinModal();

    const restartButton = document.querySelector(selectors.restart);
    const saveButton = document.querySelector(selectors.save);
    const buttonsController = new ButtonsController();

    buttonsController.restartGame(restartButton, this.modal, playField);
    buttonsController.saveResults(saveButton, this.modal, playField);
  }

  _showWinModal() {
    this.modal.setSettings(winModalSettings);
    this.modal.tune();
    this.modal.show();
  }
}
