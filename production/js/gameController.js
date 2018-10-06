class GameController {

  cellLeftClick(playField) {
    playField.field.onclick = (event) => {
      let target = event.target;

      if (target.classList.contains('cell')) {
        if (target.classList.contains('bomb')) {
          target.innerHTML = `<img src='img/bomb.png'>`;
          target.style.backgroundColor = 'red';

          playField.open();
          this.gameOver(playField);
        } else {
          target.style.backgroundColor = 'teal';
          target.classList.add('clicked');

          let algorithm = new Algorithm();
          algorithm.openCells(playField);

          this.checkForWin(playField);
        }
      }
    }
  }

  cellRightClick(playField) {
    playField.field.oncontextmenu = (event) => {
      event.preventDefault();
      let target = event.target;

      if (target.classList.contains('cell')) {
        if (target.classList.contains('closed')) {
          if (FlagsCounter.getFlags() > 0) {
            target.classList.add('flagged');
            target.innerHTML = `<img src='img/flag.png'>`;
            target.style.backgroundColor = '#e5e04a';

            let currentFlags = FlagsCounter.getFlags();
            FlagsCounter.setFlags(--currentFlags, playField.bombs.length);

            this.checkForWin(playField);
          }
        }
      }

      if (target.parentNode.classList.contains('flagged')) {
        target.parentNode.classList.remove('flagged');
        target.parentNode.style.backgroundColor = '';
        target.parentNode.innerHTML = '';

        let currentFlags = FlagsCounter.getFlags();
        FlagsCounter.setFlags(++currentFlags, playField.bombs.length);
      }
    }
  }

  gameOver(playField) {
    Smile.showDemon();
    Timer.stop();

    let modal = new Modal('450px', '300px', 'Буууум!', 'loss-modal');

    modal.tune();
    modal.show();

    let restartButton = document.querySelector('.loss-modal__buttons .restart'),
        buttonsController = new ButtonsController();

    buttonsController.restartGame(restartButton, modal, playField);
  }

  checkForWin(playField) {
    let rightFlagsCount = 0,
        openedCells = 0;

    for (let i = 0; i < playField.rows; i++) {
      for (let j = 0; j < playField.columns; j++) {
        if (playField.positions[i][j].classList.contains('bomb') &&
           playField.positions[i][j].classList.contains('flagged')) {
          rightFlagsCount++;
        }

        if (!playField.positions[i][j].classList.contains('closed') &&
            !playField.positions[i][j].classList.contains('bomb') &&
            !playField.positions[i][j].classList.contains('flagged')) {
          openedCells++;
        }
      }
    }

    let bombs = playField.bombs,
        clearCells = playField.rows * playField.columns - bombs.length;

    if (bombs.length == rightFlagsCount &&
       openedCells == clearCells) {
      this.win(playField);
    }
  }

  win(playField) {
    Timer.stop();

    let modal = new Modal('550px', '300px', 'Победа!', 'win-modal');

    modal.tune();
    modal.show();

    let restartButton = document.querySelector('.win-modal__buttons .restart'),
        saveButton = document.querySelector('.win-modal__buttons .save'),
        buttonsController = new ButtonsController();

    buttonsController.restartGame(restartButton, modal, playField);
    buttonsController.saveResults(saveButton, modal, playField);
  }
}
