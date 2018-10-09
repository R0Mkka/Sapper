import ButtonsController from './buttonsController/buttonsController.js';
import Modal from './modal/modal.js';
import PlayField from './playField.js';
import RecordsTable from './recordsTable.js';
import Smile from './smile.js';
import Timer from './timer.js';
import Alert from './alert/alert.js';

import Constants from './constants.js';

import Check from './check/check.js';

function start() {
  const modalSettings = {
    width: '500px',
    height: '500px',
    title: 'Начало игры!',
    className: 'start-modal'
  }

  let startModal = new Modal(modalSettings);

  startModal.tune();
  startModal.show();

  Smile.set();

  let buttonsController = new ButtonsController(),
      recordsTable = new RecordsTable(),
      playField = new PlayField(),
      timer = new Timer();

  setMenuButtons(playField, buttonsController);
  setChecks();

  let startButton = document.querySelector('.start-modal__buttons .start'),
      menuButton = document.querySelector('.menu');

  buttonsController.startGame(startButton, startModal, playField);
  buttonsController.menuToggle(menuButton);

  // LOCAL FUNCTIONS
  function setMenuButtons(playField, buttonsController) {
    let restartButton = document.querySelector('.menu-list .restart'),
        resetButton = document.querySelector('.menu-list .reset'),
        showRecordsButton = document.querySelector('.menu-list .show-records'),
        tableCloseButton = document.querySelector('.table-close'),
        clearRecordsButton = document.querySelector('.menu-list .clear-records');

    buttonsController.restartGame(restartButton, null, playField);
    buttonsController.resetGame(resetButton, playField);
    buttonsController.showRecordsTable(showRecordsButton);
    buttonsController.closeRecordsTable(tableCloseButton);
    buttonsController.clearRecords(clearRecordsButton);
  }

  function setChecks() {
    let check = new Check();

    let rowsField = document.querySelector('.start-modal__inputs .rows'),
        columnsField = document.querySelector('.start-modal__inputs .columns'),
        bombsField = document.querySelector('.start-modal__inputs .bombs-amount');

    check.checkNumberInput(rowsField);
    check.checkNumberInput(columnsField);
    check.checkNumberInput(bombsField);
  }
}

start();
