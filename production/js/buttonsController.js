class ButtonsController {

  menuToggle(button) {
    let menu = document.querySelector('.menu-list');
    menu.style.display = 'none';

    button.onclick = function() {
      menu.style.display = (menu.style.display == 'none') ? 'block' : 'none';
    }
  }

  resetGame(button, playField) {
    button.onclick = () => {
      let resetModal = new Modal('500px', '500px', 'Настройки', 'start-modal');

      resetModal.tune();
      resetModal.show();

      let startButton = document.querySelector('.start-modal__buttons .start');

      this.startGame(startButton, resetModal, playField);
    }
  }

  startGame(button, modal, playField) {
    button.onclick = () => {
      if (Check.checkForGameStarting()) {
        if (modal) modal.hide();
        this.hideMenu();
        Smile.showSmile();

        let settings = this.getGameSettings();

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
      }
    }
  }

  restartGame(button, modal, playField) {
    button.onclick = () => {
      if (modal) modal.hide();
      this.hideMenu();
      Smile.showSmile();

      let settings = this.getGameSettings();

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
    }
  }

  showRecordsTable(button) {
    button.onclick = () => {
      RecordsTable.update();
      RecordsTable.show();
      this.hideMenu();
    }
  }

  closeRecordsTable(button) {
    button.onclick = () => {
      RecordsTable.hide();
    }
  }

  clearRecords(button) {
    button.onclick = () => {
      localStorage.clear();
      this.hideMenu();
      alert( 'Рекорды были очищены!' );
    }
  }

  saveResults(button) {
    button.onclick = () => {
      let gameSettings = this.getGameSettings();

      let minutes = document.querySelector('.timer .timer__minutes'),
          seconds = document.querySelector('.timer .timer__seconds');

      let gameTime = `${minutes.innerHTML}:${seconds.innerHTML}`,
          fieldSize = `${gameSettings.rows}x${gameSettings.columns}`;

      let results = `${gameTime} ${fieldSize} ${gameSettings.bombsAmount}`;

      localStorage.setItem(gameSettings.nickName, results);

      alert( `Результат для игрока ${gameSettings.nickName} сохранен.` );
    }
  }

  hideMenu() {
    document.querySelector('.menu-list').style.display = 'none';
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
}
