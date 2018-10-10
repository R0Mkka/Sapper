import ButtonsController from './buttonsController/buttonsController.js';
import RecordsTable from './recordsTable/recordsTable.js';
import Checker from './checker/checker.js';
import PlayField from './playField.js';
import Modal from './modal/modal.js';
import Alert from './alert/alert.js';
import Smile from './smile.js';
import Timer from './timer.js';

import { startModalSettings } from './start.config.js';
import { selectors } from './start.config.js';

function start() {
  const buttonsController = new ButtonsController();
  const recordsTable = new RecordsTable();
  const playField = new PlayField();
  const modal = new Modal();
  const timer = new Timer();

  showModal(modal);
  setModalFieldsCheckers();

  const startButton = document.querySelector(selectors.start);
  const menuButton = document.querySelector(selectors.menu);

  buttonsController.startGame(startButton, modal, playField);
  buttonsController.menuToggle(menuButton);

  Smile.set();
  setMenuButtons(playField, buttonsController);
}

function showModal(modal) {
  modal.setSettings(startModalSettings);
  modal.tune();
  modal.show();
}

function setModalFieldsCheckers() {
  const rowsField = document.querySelector(selectors.rows);
  const columnsField = document.querySelector(selectors.columns);
  const bombsField = document.querySelector(selectors.bombsAmount);

  Checker.checkNumberInput(rowsField);
  Checker.checkNumberInput(columnsField);
  Checker.checkNumberInput(bombsField);
}

function setMenuButtons(playField, buttonsController) {
  const restartButton = document.querySelector(selectors.restart);
  const resetButton = document.querySelector(selectors.reset);
  const showRecordsButton = document.querySelector(selectors.showRecords);
  const closeTableButton = document.querySelector(selectors.closeTable);
  const clearRecordsButton = document.querySelector(selectors.clearRecords);

  buttonsController.restartGame(restartButton, null, playField);
  buttonsController.resetGame(resetButton, playField);
  buttonsController.showRecordsTable(showRecordsButton);
  buttonsController.hideRecordsTable(closeTableButton);
  buttonsController.clearRecords(clearRecordsButton);
}

start();
