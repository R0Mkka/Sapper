function start() {
  let startModal = new Modal('500px', '500px', 'Начало игры!', 'start-modal');

  startModal.tune();
  startModal.show();

  Smile.set();

  let buttonsController = new ButtonsController(),
      recordsTable = new RecordsTable(),
      playField = new PlayField(),
      timer = new Timer();

  setMenuButtons(playField, buttonsController);

  let startButton = document.querySelector('.start-modal__buttons .start'),
      menuButton = document.querySelector('.menu');

  buttonsController.startGame(startButton, startModal, playField);
  buttonsController.menuToggle(menuButton);

  // LOCAL FUNCTION
  function setMenuButtons(playField, buttonsController) {
    let restartButton = document.querySelector('.menu-list .restart'),
        resetButton = document.querySelector('.menu-list .reset'),
        showRecordsButton = document.querySelector('.menu-list .show-records'),
        closeButton = document.querySelector('.table-close'),
        clearRecordsButton = document.querySelector('.menu-list .clear-records');

    buttonsController.restartGame(restartButton, null, playField);
    buttonsController.resetGame(resetButton, playField);
    buttonsController.showRecordsTable(showRecordsButton);
    buttonsController.closeRecordsTable(closeButton);
    buttonsController.clearRecords(clearRecordsButton);
  }
}

start();
