import Alert from '../alert/alert.js';

import { selectors } from './checker.config.js';
import { alertSettings } from './checker.config.js';
import { errors } from './checker.config.js';

export default class Checker {

  static checkForGameStarting() {
    const nickName = document.querySelector(selectors.nickName);
    const bombsAmount = document.querySelector(selectors.bombsAmount);
    const rows = document.querySelector(selectors.rows);
    const columns = document.querySelector(selectors.columns);

    if (Checker._checkNickName(nickName) &&
        Checker._checkFieldSize(rows, columns) &&
        Checker._checkBombsAmount(bombsAmount, rows, columns)) {

        return true;
    }

    return false;
  }

  static _checkNickName(nickName) {
    if (nickName.value.length < 1) {
      Checker._setAlertMessage(errors.noName);
      Checker._showAlert();

      return false;
    }

    if (nickName.value.length > 20) {
      Checker._setAlertMessage(errors.bigName);
      Checker._showAlert();

      return false;
    }

    return true;
  }

  static _setAlertMessage(message) {
    alertSettings.message = message;
  }

  static _showAlert() {
    const errorAlert = new Alert();

    errorAlert.setSettings(alertSettings);
    errorAlert.show();
  }

  static _checkFieldSize(rows, columns) {
    switch (true) {
      case rows.value.length < 1 || columns.value.length < 1:
        Checker._setAlertMessage(errors.noFieldSize);
        Checker._showAlert();

        return false;
      case rows.value < 5 || columns.value < 5:
        Checker._setAlertMessage(errors.smallField);
        Checker._showAlert();

        return false;
      case rows.value > 20 || columns.value > 20:
        Checker._setAlertMessage(errors.bigField);
        Checker._showAlert();

        return false;
    }

    return true;
  }

  static _checkBombsAmount(bombsAmount, rows, columns) {
    if (bombsAmount.value.length < 1) {
      Checker._setAlertMessage(errors.noBombsAmount);
      Checker._showAlert();

      return false;
    }

    if (bombsAmount.value < 1) {
      Checker._setAlertMessage(errors.tooFewBombs);
      Checker._showAlert();

      return false;
    }

    const maxBombsAmount = Math.round((rows.value * columns.value) * 0.7);

    if (bombsAmount.value > maxBombsAmount) {
      Checker._setAlertMessage(errors.maxBombs + maxBombsAmount);
      Checker._showAlert();

      return false;
    }

    return true;
  }

  static checkNumberInput(field) {
    field.onkeydown = (event) => {
      const key = event.keyCode;

      if (key == 190 || key == 110 || key == 188) {
        event.preventDefault();
      }
    }
  }
}
