import Alert from './alert.js';

import Constants from './constants.js';

export default class Check {

  static checkForGameStarting() {
    let nickName = document.querySelector('.start-modal__inputs .nick-name'),
        bombsAmount = document.querySelector('.start-modal__inputs .bombs-amount'),
        rows = document.querySelector('.start-modal__inputs .rows'),
        columns = document.querySelector('.start-modal__inputs .columns');

    let errorAlert = new Alert('300px',
                               '120px',
                               Constants.error,
                               '',
                               'error');

    if (checkNickName(nickName) &&
        checkRowsAndColumns(rows, columns) &&
        checkBombsAmount(bombsAmount, rows, columns)) {
        return true;
    }

    return false;

    // LOCAL FUNCTIONS
    function checkNickName(nickName) {
      if (nickName.value.length < 1) {
        errorAlert.setMessage('Не заполнено имя!');
        errorAlert.show();
        return false;
      }

      if (nickName.value.length > 20) {
        errorAlert.setMessage('Максимальный размер имени 20 симоволов.');
        errorAlert.show();
        return false;
      }

      return true;
    }

    function checkRowsAndColumns(rows, columns) {
      if (rows.value.length < 0 || columns.value.length < 0) {
        errorAlert.setMessage('Не заполнен размер поля!');
        errorAlert.show();
        return false;
      }

      if (rows.value < 5 || columns.value < 5) {
        errorAlert.setMessage('Минимальный размер поля 5х5!');
        errorAlert.show();
        return false;
      }

      if (rows.value > 20 || columns.value > 20) {
        errorAlert.setMessage('Максимальный размер поля 20х20!');
        errorAlert.show();
        return false;
      }

      return true;
    }

    function checkBombsAmount(bombsAmount, rows, columns) {
      if (bombsAmount.value.length < 0) {
        errorAlert.setMessage('Не заполнено количество бомб!');
        errorAlert.show();
        return false;
      }

      if (bombsAmount.value < 1) {
        errorAlert.setMessage('Должна быть хотя бы одна бомба!');
        errorAlert.show();
        return false;
      }

      let maxBombsAmount = Math.round((rows.value * columns.value) * 0.7);

      if (bombsAmount.value > maxBombsAmount) {
        errorAlert.setMessage(`Максимальное количество бомб: ${maxBombsAmount}`);
        errorAlert.show();
        return false;
      }

      return true;
    }
  }

}
