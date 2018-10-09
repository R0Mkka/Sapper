import GameController from '../gameController.js';
import FlagsCounter from '../flagsCounter.js';
import RecordsTable from '../recordsTable.js';
import Modal from '../modal/modal.js';
import Check from '../check/check.js';
import Alert from '../alert/alert.js';
import Smile from '../smile.js';
import Timer from '../timer.js';

import Constants from '../constants.js';

import { startAlert } from './buttonsController.config.js';

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
      const modalSettings = {
        width: '500px',
        height: '500px',
        title: 'Настройки',
        className: 'start-modal'
      }

      let resetModal = new Modal(modalSettings);

      resetModal.tune();
      resetModal.show();
      resetModal.showCross();

      let startButton = document.querySelector('.start-modal__buttons .start');

      this.startGame(startButton, resetModal, playField);
      this.closeModal(resetModal.cross, resetModal);
    }
  }

  startGame(button, modal, playField) {
    const startGameAlert = new Alert(startAlert);

    const check = new Check();

    button.onclick = () => {
      if (check.checkForGameStarting()) {
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
    const restartGameAlert = new Alert(startAlert);

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

  closeModal(cross, modal) {
    cross.onclick = () => {
      modal.hide();
      this.hideMenu();
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
