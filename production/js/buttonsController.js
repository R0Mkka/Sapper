import GameController from './gameController.js';
import FlagsCounter from './flagsCounter.js';
import RecordsTable from './recordsTable.js';
import Modal from './modal.js';
import Check from './check.js';
import Smile from './smile.js';
import Timer from './timer.js';
import Alert from './alert.js';

import Constants from './constants.js';

export default class ButtonsController {

  menuToggle(button) {
    let menu = document.querySelector('.menu-list');
    menu.style.display = 'none';

    button.onclick = function() {
      menu.style.display = (menu.style.display == 'none') ? 'block' : 'none';
    }
  }

  resetGame(button, playField) {
    button.onclick = () => {
      let resetModal = new Modal('500px',
                                 '500px',
                                 Constants.settings,
                                 'start-modal');

      resetModal.tune();
      resetModal.show();

      let startButton = document.querySelector('.start-modal__buttons .start');

      this.startGame(startButton, resetModal, playField);
    }
  }

  startGame(button, modal, playField) {
    let message = 'Новая игра.';

    let startGameAlert = new Alert('250px',
                                   '100px',
                                   Constants.alert,
                                   message,
                                   'alert');

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

        startGameAlert.show();
      }
    }
  }

  restartGame(button, modal, playField) {
    let message = 'Новая игра.';

    let restartGameAlert = new Alert('250px',
                                     '100px',
                                     Constants.alert,
                                     message,
                                     'alert');

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

      restartGameAlert.show();
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
    let message = 'Рекорды были очищены!';

    let clearedRecordsAlert = new Alert('250px',
                                        '100px',
                                        Constants.alert,
                                        message,
                                        'alert');

    button.onclick = () => {
      localStorage.clear();
      this.hideMenu();
      clearedRecordsAlert.show();
    }
  }

  saveResults(button) {
    let gameSettings = this.getGameSettings();

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
