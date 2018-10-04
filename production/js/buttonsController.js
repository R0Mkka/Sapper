class ButtonsController {

  resetGame() {

  }

  startGame(element, startModal) {
    element.addEventListener('click', function() {
      let check = new Check();

      if (check.checkForGameStarting()) {
        startModal.hide();

        let gameController = new GameController();

        gameController.cellClick(newPlayField());
      }
    });

    function newPlayField() {
      let nickName = document.querySelector('.start-modal__inputs input[type="text"]'),
          bombsField = document.querySelector('.start-modal__inputs input[type="number"]');

      let playField = new PlayField(18, 18, bombsField.value);

      playField.create();
      playField.draw();

      return playField;
    }
  }

  restartGame() {

  }

  showRecords() {

  }

  saveResults() {

  }



}
