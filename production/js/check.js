class Check {

  static checkForGameStarting() {
    let nickName = document.querySelector('.start-modal__inputs .nick-name'),
        bombsAmount = document.querySelector('.start-modal__inputs .bombs-amount'),
        rows = document.querySelector('.start-modal__inputs .rows'),
        columns = document.querySelector('.start-modal__inputs .columns');

    if (checkNickName(nickName) &&
        checkRowsAndColumns(rows, columns) &&
        checkBombsAmount(bombsAmount, rows, columns)) {
        return true;
    }

    return false;

    // LOCAL FUNCTIONS
    function checkNickName(nickName) {
      if (nickName.value.length < 1) {
        alert( 'Не заполнено имя!' );
        return false;
      }

      if (nickName.value.length > 25) {
        alert( 'Слишком длинное имя!\nМаксимальный размер: 25 симоволов.' );
        return false;
      }

      return true;
    }

    function checkRowsAndColumns(rows, columns) {
      if (rows.value.length < 0 || columns.value.length < 0) {
        alert( 'Не заполнен размер поля!' );
        return false;
      }

      if (rows.value < 5 || columns.value < 5) {
        alert( 'Сликшом маленькое поле!\nМинимум 5x5.' );
        return false;
      }

      if (rows.value > 20 || columns.value > 20) {
        alert( 'Сликшом большое поле!\nМаксимум 20x20.' );
        return false;
      }

      return true;
    }

    function checkBombsAmount(bombsAmount, rows, columns) {
      if (bombsAmount.value.length < 0) {
        alert( 'Не заполнено количество бомб!' );
        return false;
      }

      if (bombsAmount.value < 1) {
        alert( 'Должна быть хотя бы одна бомба!' );
        return false;
      }

      let maxBombsAmount = Math.round((rows.value * columns.value) * 0.7);

      if (bombsAmount.value > maxBombsAmount) {
        alert( 'Слишком много бомб!\nМаксимальное количество: ' + maxBombsAmount );
        return false;
      }

      return true;
    }
  }

}
