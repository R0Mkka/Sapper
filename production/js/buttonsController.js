class ButtonsController {

  resetGame() {

  }

  startGame(button, modal) {
    this.removeClickListener(button);

    let listener = {
      on: 'click',
      callback: () => {
        let check = new Check();

        if (check.checkForGameStarting()) {
          modal.hide();
          Smile.showSmile();

          let gameController = new GameController();

          let playField = this.newPlayField();

          let timer = new Timer();
          timer.start();
          playField.timerId = timer.getTimerId();

          gameController.cellLeftClick(playField);
          gameController.cellRightClick(playField);
        }
      }
    }

    button.clickListener = listener;
    button.addEventListener(listener.on, listener.callback);
  }

  restartGame(button, modal, oldPlayField) {
    this.removeClickListener(button);

    let listener = {
      on: 'click',
      callback: () => {
        oldPlayField.hide();
        oldPlayField.remove();
        oldPlayField = null;

        modal.hide();
        Smile.showSmile();

        let gameController = new GameController();

        let playField = this.newPlayField();

        Timer.clear();

        let timer = new Timer();
        timer.start();
        playField.timerId = timer.getTimerId();

        gameController.cellLeftClick(playField);
        gameController.cellRightClick(playField);
      }
    }

    button.clickListener = listener;
    button.addEventListener(listener.on, listener.callback);
  }

  showRecords() {

  }

  saveResults() {

  }

  newPlayField() {
    let settings = this.getGameSettings();

    let playField = new PlayField(settings.rows,
                                  settings.columns,
                                  settings.bombsAmount);

    playField.tune();
    playField.draw();

    return playField;
  }

  getGameSettings() {
    let nickName = document.querySelector('.start-modal__inputs .nick-name'),
        bombsAmount = document.querySelector('.start-modal__inputs .bombs-amount'),
        rows = document.querySelector('.start-modal__inputs .rows'),
        columns = document.querySelector('.start-modal__inputs .columns');

    return {
      nickName: nickName.value,
      bombsAmount: bombsAmount.value,
      rows: rows.value,
      columns: columns.value
    }
  }

  removeClickListener(button) {
    if (button.clickListener) {
      button.removeEventListener(button.clickListener.on,
                                 button.clickListener.callback);
    }
  }

}
