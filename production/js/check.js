class Check {

  checkForGameStarting() {
    let nickName = document.querySelector('.start-modal__inputs input[type="text"]'),
        bombsField = document.querySelector('.start-modal__inputs input[type="number"]');

    if (nickName.value.length > 0 &&
        bombsField.value.length > 0 &&
        bombsField.value < 121 &&
        bombsField.value >= 1) {
        return true;
    }

    if (nickName.value.length == 0 ||
        bombsField.value.length == 0) {
        alert( 'Одно из полей не заполнено!' );
        return false;
    }

    if (bombsField.value > 120) {
      alert( 'Слишком много бомб! \nМаксимум 120.' );
    }

    if (bombsField.value < 1) {
      alert( 'Должна быть хотя бы 1 бомба!' );
    }

    return false;
  }

}
