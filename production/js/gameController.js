class GameController {

  cellLeftClick(playField) {
    let listener = {
      on: 'click',
      callback: (event) => {
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

    playField.clickListener = listener;
    playField.field.addEventListener(listener.on, listener.callback);
  }

  cellRightClick(playField) {
    let listener = {
      on: 'contextmenu',
      callback: (event) => {
        event.preventDefault();
        let target = event.target;

        if (target.classList.contains('cell')) {
          if (target.classList.contains('closed')) {
            target.classList.add('flagged');
            target.innerHTML = `<img src='img/flag.png'>`;
            target.style.backgroundColor = '#e5e04a';

            this.checkForWin(playField);
          }
        }

        if (target.parentNode.classList.contains('flagged')) {
          target.parentNode.classList.remove('flagged');
          target.parentNode.style.backgroundColor = '';
          target.parentNode.innerHTML = '';
        }
      }
    }

    playField.contextmenuListener = listener;
    playField.field.addEventListener(listener.on, listener.callback);
  }

  gameOver(playField) {
    playField.field.removeEventListener(playField.clickListener.on,
                                        playField.clickListener.callback);

    playField.field.removeEventListener(playField.contextmenuListener.on,
                                        playField.contextmenuListener.callback);

    Smile.showDemon();
    Timer.stop(playField.timerId);

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

    console.clear();
    console.log("RIGHT FLAGS " + rightFlagsCount);
    console.log("OPENED CELLS " + openedCells);

    console.log("BOOMBS COUNT " + bombs.length);
    console.log("CLEAR CELLS " + clearCells);

    // console.log(playField);

    if(bombs.length == rightFlagsCount &&
       openedCells == clearCells) {
      this.win(playField);
    }
  }

  win(playField) {
    playField.field.removeEventListener(playField.clickListener.on,
                                        playField.clickListener.callback);

    playField.field.removeEventListener(playField.contextmenuListener.on,
                                        playField.contextmenuListener.callback);

    Timer.stop(playField.timerId);

    let modal = new Modal('550px', '300px', 'Победа!', 'win-modal');

    modal.tune();
    modal.show();

    let newGameButton = document.querySelector('.win-modal__buttons .restart'),
        buttonsController = new ButtonsController();

    buttonsController.restartGame(newGameButton, modal, playField);
  }

}
