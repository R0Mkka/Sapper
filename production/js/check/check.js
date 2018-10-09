import Alert from '../alert/alert.js';

import { selectors } from './check.config.js';
import { alertSettings } from './check.config.js';
import { errors } from './check.config.js';

export default class Check {

  checkForGameStarting() {
    const nickName = document.querySelector(selectors.nickName);
    const bombsAmount = document.querySelector(selectors.bombsAmount);
    const rows = document.querySelector(selectors.rows);
    const columns = document.querySelector(selectors.columns);

    if (this._checkNickName(nickName) &&
        this._checkRowsAndColumns(rows, columns) &&
        this._checkBombsAmount(bombsAmount, rows, columns)) {

        return true;
    }

    return false;
  }

  _checkNickName(nickName) {
    if (nickName.value.length < 1) {
      this._setMessageAndShowAlert(errors.noName);

      return false;
    }

    if (nickName.value.length > 20) {
      this._setMessageAndShowAlert(errors.bigName);

      return false;
    }

    return true;
  }

  _setMessageAndShowAlert(message) {
    alertSettings.message = message;

    const errorAlert = new Alert(alertSettings);

    errorAlert.show();
  }

  _checkRowsAndColumns(rows, columns) {
    // switch(true) {
    //   case rows.value.length < 1 || columns.value.length < 1:
    //     return false;
    //   case rows.value.length < 1 || columns.value.length < 1:
    //       break;
    //       case rows.value.length < 1 || columns.value.length < 1:
    //         break;
    //         case rows.value.length < 1 || columns.value.length < 1:
    //           break;
    // }

    if (rows.value.length < 1 || columns.value.length < 1) {
      this._setMessageAndShowAlert(errors.noFieldSize);

      return false;
    }

    if (rows.value < 5 || columns.value < 5) {
      this._setMessageAndShowAlert(errors.smallField);

      return false;
    }

    if (rows.value > 20 || columns.value > 20) {
      this._setMessageAndShowAlert(errors.bigField);

      return false;
    }

    return true;
  }

  _checkBombsAmount(bombsAmount, rows, columns) {
    if (bombsAmount.value.length < 1) {
      this._setMessageAndShowAlert(errors.noBombsAmount);

      return false;
    }

    if (bombsAmount.value < 1) {
      this._setMessageAndShowAlert(errors.tooFewBombs);

      return false;
    }

    let maxBombsAmount = Math.round((rows.value * columns.value) * 0.7);

    if (bombsAmount.value > maxBombsAmount) {
      this._setMessageAndShowAlert(errors.maxBombs + maxBombsAmount);

      return false;
    }

    return true;
  }

  checkNumberInput(field) {
    field.onkeydown = (event) => {
      let key = event.keyCode;

      if (key == 190 || key == 110 || key == 188) {
        event.preventDefault();
      }
    }
  }
}
