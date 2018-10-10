import GameController from '../gameController.js';
import FlagsCounter from '../flagsCounter.js';
import RecordsTable from '../recordsTable.js';
import Checker from '../checker/checker.js';
import Modal from '../modal/newModal.js';
import Alert from '../alert/alert.js';
import Smile from '../smile.js';
import Timer from '../timer.js';

import { newGameAlertSettings } from './buttonsController.config.js';
import { selectors } from './buttonsController.config.js';
import { resetModalSettings } from './buttonsController.config.js';

import { displayType } from '../displayType.js';

export default class ButtonsController {

  constructor() {
    this.modal = new Modal();
    this.alert = new Alert();
  }

  menuToggle(button) {
    const menuItems = document.querySelector(selectors.menuItems);

    menuItems.style.display = displayType.hidden;

    button.onclick = () => {
      menuItems.style.display = (menuItems.style.display == displayType.hidden)
      ? displayType.visible
      : displayType.hidden;
    }
  }

  resetGame(button, playField) {
    button.onclick = () => {

      this._showResetModal();

      const startButton = document.querySelector(selectors.start);
      const closeButton = document.querySelector(selectors.close);

      this.startGame(startButton, this.modal, playField);
      this._setCloseButton(closeButton);
    }
  }

  _showResetModal() {
    this.modal.setSettings(resetModalSettings);
    this.modal.tune();
    this.modal.show();
  }

  _setCloseButton(closeButton) {
    closeButton.onclick = () => {
      this.modal.hide();

      this._hideMenuItems();
    }
  }

  startGame(button, modal, playField) {
    this.alert.setSettings(newGameAlertSettings);

    const checker = new Checker();

    button.onclick = () => {
      if (checker.checkForGameStarting()) {
        if (modal) modal.hide();
        this._hideMenuItems();
        Smile.showSmile();

        let settings = this._getGameSettings();

        playField.hide();
        playField.clear();
        playField.setSettings(settings.rows,
                              settings.columns,
                              settings.bombsAmount);
        playField.draw();

        Timer.stop();
        Timer.clear();
        Timer.start();

        FlagsCounter.setFlags(playField.bombs.length, playField.bombs.length);

        let gameController = new GameController();

        gameController.cellLeftClick(playField);
        gameController.cellRightClick(playField);

        this.alert.show();
      }
    }
  }

  restartGame(button, modal, playField) {
    this.alert.setSettings(newGameAlertSettings);

    button.onclick = () => {
      if (modal) modal.hide();
      this._hideMenuItems();
      Smile.showSmile();

      let settings = this._getGameSettings();

      playField.hide();
      playField.clear();
      playField.setSettings(settings.rows,
                            settings.columns,
                            settings.bombsAmount);
      playField.draw();

      Timer.stop();
      Timer.clear();
      Timer.start();

      FlagsCounter.setFlags(playField.bombs.length, playField.bombs.length);

      let gameController = new GameController();

      gameController.cellLeftClick(playField);
      gameController.cellRightClick(playField);

      this.alert.show();
    }
  }



  showRecordsTable(button) {
    button.onclick = () => {
      RecordsTable.update();
      RecordsTable.show();
      this._hideMenuItems();
    }
  }

  closeRecordsTable(button) {
    button.onclick = () => {
      RecordsTable.hide();
    }
  }

  clearRecords(button) {
    const alertSettings = {
      width: '250px',
      height: '100px',
      headline: 'Оповещение',
      message: 'Рекорды были очищены!',
      type: 'alert'
    }

    let message = 'Рекорды были очищены!';

    let clearedRecordsAlert = new Alert(alertSettings);

    button.onclick = () => {
      localStorage.clear();
      this._hideMenuItems();
      clearedRecordsAlert.show();
    }
  }

  saveResults(button) {
    let gameSettings = this._getGameSettings();

    let message = `Результат для игрока ${gameSettings.nickName} сохранен.`;

    let savedResultsAlert = new Alert('310px',
                                      '130px',
                                      Constants.alert,
                                      message,
                                      'alert');

    button.onclick = () => {
      let minutes = document.querySelector('.timer .timer__minutes'),
          seconds = document.querySelector('.timer .timer__seconds');

      let gameTime = `${minutes.innerHTML}:${seconds.innerHTML}`,
          fieldSize = `${gameSettings.rows}x${gameSettings.columns}`;

      let results = `${gameTime} ${fieldSize} ${gameSettings.bombsAmount}`;

      localStorage.setItem(gameSettings.nickName, results);

      savedResultsAlert.show();
    }
  }

  _hideMenuItems() {
    document.querySelector('.menu-list').style.display = 'none';
  }

  _getGameSettings() {
    const nickName = document.querySelector(selectors.nickName);
    const bombsAmount = document.querySelector(selectors.bombsAmount);
    const rows = document.querySelector(selectors.rows);
    const columns = document.querySelector(selectors.columns);

    return {
      nickName: nickName.value,
      bombsAmount: bombsAmount.value,
      rows: rows.value,
      columns: columns.value
    }
  }
}
