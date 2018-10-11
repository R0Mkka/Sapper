import GameController from '../gameController/gameController.js';
import RecordsTable from '../recordsTable/recordsTable.js';
import FlagsCounter from '../flagsCounter.js';
import Checker from '../checker/checker.js';
import Modal from '../modal/modal.js';
import Alert from '../alert/alert.js';
import Smile from '../smile/smile.js';
import Timer from '../timer.js';

import { clearRecordsAlertSettings } from './buttonsController.config.js';
import { newGameAlertSettings } from './buttonsController.config.js';
import { resetModalSettings } from './buttonsController.config.js';
import { selectors } from './buttonsController.config.js';

import { displayType } from '../displayType.js';

export default class ButtonsController {
  constructor() {
    this.modal = new Modal();
    this.alert = new Alert();
    this.gameController = new GameController();
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
      this._setModalFieldsCheckers();
      this._setNewDefaultSettings();

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

  _setModalFieldsCheckers() {
    const rowsField = document.querySelector(selectors.rows);
    const columnsField = document.querySelector(selectors.columns);
    const bombsField = document.querySelector(selectors.bombsAmount);

    Checker.checkNumberInput(rowsField);
    Checker.checkNumberInput(columnsField);
    Checker.checkNumberInput(bombsField);
  }

  _setNewDefaultSettings() {
    const settings = this._getSettingsFromSessionStorage();

    const nickName = document.querySelector(selectors.nickName);
    const bombsAmount = document.querySelector(selectors.bombsAmount);
    const rows = document.querySelector(selectors.rows);
    const columns = document.querySelector(selectors.columns);

    nickName.value = settings.nickName;
    rows.value = settings.rows;
    columns.value = settings.columns;
    bombsAmount.value = settings.bombsAmount;
  }

  _setCloseButton(closeButton) {
    closeButton.onclick = () => {
      this.modal.hide();

      this._hideMenuItems();
    }
  }

  _hideMenuItems() {
    const menuItems = document.querySelector(selectors.menuItems);

    menuItems.style.display = displayType.hidden;
  }

  startGame(button, modal, playField) {
    button.onclick = () => {
      if (Checker.checkForGameStarting()) {
        this._prepareGameScreen(modal, playField);

        this.alert.setSettings(newGameAlertSettings);
        this.alert.show();
      }
    }
  }

  _prepareGameScreen(modal, playField) {
    if (modal) {
      modal.hide();
    }

    Smile.showSmile();

    this._hideMenuItems();

    this._redrawPlayField(playField);
    this._restartTimer();

    FlagsCounter.setFlags(playField.bombs.length);

    this.gameController.cellLeftClick(playField);
    this.gameController.cellRightClick(playField);
  }

  _redrawPlayField(playField) {
    const settings = this._getGameSettings();

    playField.hide();
    playField.clear();

    playField.setSettings(settings);
    playField.draw();
  }

  _getGameSettings() {
    let settings = {};

    if (document.querySelector(selectors.nickName)) {
      const nickName = document.querySelector(selectors.nickName);
      const bombsAmount = document.querySelector(selectors.bombsAmount);
      const rows = document.querySelector(selectors.rows);
      const columns = document.querySelector(selectors.columns);

      settings = {
        nickName: nickName.value,
        bombsAmount: bombsAmount.value,
        rows: rows.value,
        columns: columns.value
      }

      this._setToSessionStorage(settings);
    } else {
      settings = this._getSettingsFromSessionStorage();
    }

    return settings;
  }

  _setToSessionStorage(settings) {
    let settingsString = '';

    settingsString += `${settings.nickName}`;
    settingsString += ` ${settings.bombsAmount}`;
    settingsString += ` ${settings.rows}`;
    settingsString += ` ${settings.columns}`;

    sessionStorage.setItem('settings', settingsString);
  }

  _getSettingsFromSessionStorage() {
    const split = sessionStorage.getItem('settings').split(' ');

    const settings = {
      nickName: split[0],
      bombsAmount: +split[1],
      rows: +split[2],
      columns: +split[3]
    }

    return settings;
  }

  _restartTimer() {
    Timer.stop();
    Timer.clear();

    Timer.start();
  }

  restartGame(button, modal, playField) {
    button.onclick = () => {
      this._prepareGameScreen(modal, playField);

      this.alert.setSettings(newGameAlertSettings);
      this.alert.show();
    }
  }

  showRecordsTable(button) {
    button.onclick = () => {
      this._hideMenuItems();

      RecordsTable.update();
      RecordsTable.show();
    }
  }

  hideRecordsTable(button) {
    button.onclick = () => {
      RecordsTable.hide();
    }
  }

  clearRecords(button) {
    button.onclick = () => {
      localStorage.clear();

      this._hideMenuItems();

      this.alert.setSettings(clearRecordsAlertSettings);
      this.alert.show();
    }
  }

  saveResults(button) {
    button.onclick = () => {
      const settings = this._getGameSettings();

      const resultRecord = this._getResultRecord(settings);

      localStorage.setItem(settings.nickName, resultRecord);

      this._configurateSaveResultsAlert(settings);
      this.alert.show();
    }
  }

  _getResultRecord(settings) {
    const minutes = document.querySelector(selectors.timerMinutes);
    const seconds = document.querySelector(selectors.timerSeconds);

    const gameTime = `${minutes.innerHTML}:${seconds.innerHTML}`;
    const fieldSize = `${settings.rows}x${settings.columns}`;

    const resultRecord = `${gameTime} ${fieldSize} ${settings.bombsAmount}`;

    return resultRecord;
  }

  _configurateSaveResultsAlert(settings) {
    const alertSettings = {
      width: '310px',
      height: '130px',
      headline: 'Оповещение',
      message: `Результат для игрока ${settings.nickName} сохранен.`,
      type: 'alert'
    }

    this.alert.setSettings(alertSettings);
  }
}
