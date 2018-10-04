// view

let playField = document.querySelector('.play-field');

let positions = [];
let BOMBS_COUNT;
let bombs;
let timerId;

// openPlayField(15, 13, positions);

function getPositions(sizeX, sizeY, bombs) {
  let currentPosition = 0;
  let positions = [];

  for (let i = 0; i < sizeX; i++) {
    let positionsRow = [];

    for (let j = 0; j < sizeY; j++) {
      let cell = document.createElement('div');

      if (~bombs.indexOf(currentPosition)) {
        cell.classList.add('cell');
        cell.classList.add('bomb');
        cell.classList.add('closed');
      } else {
        cell.classList.add('cell');
        cell.classList.add('clear');
        cell.classList.add('closed');
      }

      positionsRow.push(cell);
      currentPosition++;
    }

    positions.push(positionsRow);
  }

  return positions;
}

function getBombs(bombsAmount) {
  let bombs = [];

  for (let i = 0; i < bombsAmount; i++) {
    let randomInt = getRandomInteger(0, 195);

    if (!isNewNumber(randomInt, bombs)) {
      bombsAmount++;
      continue;
    }

    bombs.push(randomInt);
  }

  return bombs;
}

function getRandomInteger(min, max) {
  let rand = 0;

  rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);

  return rand;
}

function isNewNumber(number, array) {
  if (array.indexOf(number) != -1) {
    return false;
  }
  return true;
}

function drowPlayField(field, sizeX, sizeY, positions) {
  for (let i = 0; i < sizeX; i++) {
    for (let j = 0; j < sizeY; j++) {
      field.appendChild(positions[i][j]);
    }
  }
}

function clearPlayField(field, sizeX, sizeY, positions) {
  for (let i = 0; i < sizeX; i++) {
    for (let j = 0; j < sizeY; j++) {
      field.removeChild(positions[i][j]);
    }
  }
}

function openPlayField(sizeX, sizeY, positions) {
  for (let i = 0; i < sizeX; i++) {
    for (let j = 0; j < sizeY; j++) {
      if (positions[i][j].classList.contains('bomb')) {
        positions[i][j].innerHTML = `<img src='img/bomb.png'>`;
        positions[i][j].style.backgroundColor = 'red';
      } else {
        positions[i][j].style.backgroundColor = 'teal';
      }
    }
  }
}

playField.addEventListener('click', function(event) {
  let target = event.target;

  if (target.classList.contains('cell')) {
    if (target.classList.contains('bomb')) {
      target.innerHTML = `<img src='img/bomb.png'>`;
      target.style.backgroundColor = 'red';

      killTimer(timerId);
      openPlayField(15, 13, positions);
      showDemon();

      let modalEnd = document.querySelector('.modal-end'),
          backdrop = document.querySelector('.backdrop');

      backdrop.style.display = 'block';
      modalEnd.style.display = 'block';
    } else {
      target.style.backgroundColor = 'teal';
      target.classList.add('clicked');

      openCells();
    }
  }
});

function showDemon() {
  let smile = document.querySelector('.window__header-smile img');

  smile.src = 'img/demon.png';
}

let smile = document.querySelector('.window__header-smile img');

smile.addEventListener('mousedown', function() {
  if (!~smile.src.indexOf('demon')) {
    smile.src = 'img/with_tongue.png';
  }
});

document.body.addEventListener('mouseup', function() {
  if (!~smile.src.indexOf('demon')) {
    smile.src = 'img/smiling.png';
  }
});

let bombsLeft;

function showBombsLeft() {
  let bombsLeftField = document.querySelector('.bombs-left');
  bombsLeftField.innerHTML = bombsLeft;
}

let restart = document.querySelectorAll('.restart-button');

restart[0].addEventListener('click', restartFunction);
restart[1].addEventListener('click', restartFunction);

function restartFunction() {
  start();
  let smile = document.querySelector('.window__header-smile img');

  smile.src = 'img/smiling.png';

  let modalEnd = document.querySelector('.modal-end'),
      modalWin = document.querySelector('.modal-win'),
      backdrop = document.querySelector('.backdrop');

  backdrop.style.display = 'none';
  modalWin.style.display = 'none';
  modalEnd.style.display = 'none';
}

playField.addEventListener('contextmenu', function(event) {
  event.preventDefault();
  let target = event.target;

  let bombsLeftField = document.querySelector('.bombs-left');

  if (target.classList.contains('cell')) {
    if (target.classList.contains('closed')) {
      target.classList.add('flagged');
      target.innerHTML = `<img src='img/flag.png'>`;
      target.style.backgroundColor = '#e5e04a';

      bombsLeftField.innerHTML = --bombsLeft;
    }
  }

  checkForWin(15, 13, positions, bombs);

  if (target.parentNode.classList.contains('flagged')) {
    target.parentNode.classList.remove('flagged');
    target.parentNode.style.backgroundColor = '';
    target.parentNode.innerHTML = '';

    bombsLeftField.innerHTML = ++bombsLeft;
  }

});

function checkForWin(sizeX, sizeY, positions, bombs) {
  let rightFlagsCount = 0;

  for (let i = 0; i < sizeX; i++) {
    for (let j = 0; j < sizeY; j++) {
      if(positions[i][j].classList.contains('bomb') &&
         positions[i][j].classList.contains('flagged')) {
        rightFlagsCount++;
      }
    }
  }

  if(bombs.length == rightFlagsCount) {
    win();
  }
}





function openCells() {
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 13; j++) {
      if (positions[i][j].classList.contains('clicked')) {
        positions[i][j].classList.remove('clicked');

        openLeftCell(i, j - 1, positions);
        openRightCell(i, j + 1, positions);
        openUpperCell(i - 1, j, positions);
        openLowerCell(i + 1, j, positions);
      }
    }
  }
}

function openLeftCell(i, j, poses) {
  if ( i >= 0 && j >= 0 && i < 15 && j < 13 ) {
    if (poses[i][j].classList.contains('closed')) {
      poses[i][j].classList.remove('closed');

      if (poses[i][j].classList.contains('bomb') ||
          poses[i][j].classList.contains('flagged')) {
        poses[i][j].classList.add('closed');

        let bombsInCurrentCell = getBombsNumber(i, j + 1, poses);

        if (bombsInCurrentCell > 0) {
          poses[i][j + 1].style.color = getNumberColor(bombsInCurrentCell);
          poses[i][j + 1].innerHTML = `<p>${bombsInCurrentCell}</p>`;
        }

      } else {
        poses[i][j].style.backgroundColor = 'teal';

        let bombsInCurrentCell = getBombsNumber(i, j + 1, poses);

        if (bombsInCurrentCell > 0) {
          poses[i][j + 1].style.color = getNumberColor(bombsInCurrentCell);
          poses[i][j + 1].innerHTML = `<p>${bombsInCurrentCell}</p>`;

          openUpperCell(i - 1, j, poses);
          openLowerCell(i + 1, j, poses);
          return;
        }

        openUpperCell(i - 1, j, poses);
        openLowerCell(i + 1, j, poses);
        openLeftCell(i, j - 1, poses);
      }

    }
  }
}

function openRightCell(i, j, poses) {
  if ( i >= 0 && j >= 0 && i < 15 && j < 13 ) {
    if (poses[i][j].classList.contains('closed')) {
      poses[i][j].classList.remove('closed');

      if (poses[i][j].classList.contains('bomb') ||
          poses[i][j].classList.contains('flagged')) {
        poses[i][j].classList.add('closed');

        let bombsInCurrentCell = getBombsNumber(i, j - 1, poses);

        if (bombsInCurrentCell > 0) {
          poses[i][j - 1].style.color = getNumberColor(bombsInCurrentCell);
          poses[i][j - 1].innerHTML = `<p>${bombsInCurrentCell}</p>`;
        }

      } else {
        poses[i][j].style.backgroundColor = 'teal';

        let bombsInCurrentCell = getBombsNumber(i, j - 1, poses);

        if (bombsInCurrentCell > 0) {
          poses[i][j - 1].style.color = getNumberColor(bombsInCurrentCell);
          poses[i][j - 1].innerHTML = `<p>${bombsInCurrentCell}</p>`;

          openUpperCell(i - 1, j, poses);
          openLowerCell(i + 1, j, poses);
          return;
        }

        openUpperCell(i - 1, j, poses);
        openLowerCell(i + 1, j, poses);
        openRightCell(i, j + 1, poses);
      }

    }
  }
}

function openUpperCell(i, j, poses) {
  if ( i >= 0 && j >= 0 && i < 15 && j < 13 ) {
    if (poses[i][j].classList.contains('closed')) {
      poses[i][j].classList.remove('closed');

      if (poses[i][j].classList.contains('bomb') ||
          poses[i][j].classList.contains('flagged')) {
        poses[i][j].classList.add('closed');

        let bombsInCurrentCell = getBombsNumber(i + 1, j, poses);

        if (bombsInCurrentCell > 0) {
          poses[i + 1][j].style.color = getNumberColor(bombsInCurrentCell);
          poses[i + 1][j].innerHTML = `<p>${bombsInCurrentCell}</p>`;
        }

      } else {
        poses[i][j].style.backgroundColor = 'teal';

        let bombsInCurrentCell = getBombsNumber(i + 1, j, poses);

        if (bombsInCurrentCell > 0) {
          poses[i + 1][j].style.color = getNumberColor(bombsInCurrentCell);
          poses[i + 1][j].innerHTML = `<p>${bombsInCurrentCell}</p>`;

          openLeftCell(i, j - 1, poses);
          openRightCell(i, j + 1, poses);
          return;
        }

        openLeftCell(i, j - 1, poses);
        openRightCell(i, j + 1, poses);
        openUpperCell(i - 1, j, poses);
      }

    }
  }
}

function openLowerCell(i, j, poses) {
  if ( i >= 0 && j >= 0 && i < 15 && j < 13 ) {
    if (poses[i][j].classList.contains('closed')) {
      poses[i][j].classList.remove('closed');

      if (poses[i][j].classList.contains('bomb') ||
          poses[i][j].classList.contains('flagged')) {
        poses[i][j].classList.add('closed');

        let bombsInCurrentCell = getBombsNumber(i - 1, j, poses);

        if (bombsInCurrentCell > 0) {
          poses[i - 1][j].style.color = getNumberColor(bombsInCurrentCell);
          poses[i - 1][j].innerHTML = `<p>${bombsInCurrentCell}</p>`;
        }

      } else {
        poses[i][j].style.backgroundColor = 'teal';

        let bombsInCurrentCell = getBombsNumber(i - 1, j, poses);

        if (bombsInCurrentCell > 0) {
          poses[i - 1][j].style.color = getNumberColor(bombsInCurrentCell);
          poses[i - 1][j].innerHTML = `<p>${bombsInCurrentCell}</p>`;

          openLeftCell(i, j - 1, poses);
          openRightCell(i, j + 1, poses);
          return;
        }

        openLeftCell(i, j - 1, poses);
        openRightCell(i, j + 1, poses);
        openLowerCell(i + 1, j, poses);
      }

    }
  }
}

function getNumberColor(bombsAround) {
  if (bombsAround == 1) {
    return 'lime';
  }

  if (bombsAround == 2 || bombsAround == 3) {
    return 'orange';
  }

  return 'skyblue';
}

function getBombsNumber(i, j, positions) {
  let bombsCounter = 0;

  if (i >= 0 && j >= 0 && i < 15 && j < 13) {
    if (i + 1 < 15 &&
        positions[i+1][j].classList.contains('bomb')) bombsCounter++;

    if (i - 1 >= 0 &&
        positions[i-1][j].classList.contains('bomb')) bombsCounter++;

    if (j + 1 < 13 &&
        positions[i][j+1].classList.contains('bomb')) bombsCounter++;

    if (j - 1 >= 0 &&
        positions[i][j-1].classList.contains('bomb')) bombsCounter++;

    if (i + 1 < 15 && j + 1 < 13 &&
        positions[i+1][j+1].classList.contains('bomb')) bombsCounter++;

    if (i + 1 < 15 && j - 1 >= 0 &&
        positions[i+1][j-1].classList.contains('bomb')) bombsCounter++;

    if (i - 1 >= 0 && j + 1 < 13 &&
        positions[i-1][j+1].classList.contains('bomb')) bombsCounter++;

    if (i - 1 >= 0 && j - 1 >= 0 &&
        positions[i-1][j-1].classList.contains('bomb')) bombsCounter++;
  }

  return bombsCounter;
}



// TIMER

function startTimer() {
  let timer = document.querySelector('.time'),
      timerMinutes = timer.querySelector('.time__minutes'),
      timerSeconds = timer.querySelector('.time__seconds');

  let seconds = 0,
      minutes = '00';

  let timerId = setInterval(function() {
    seconds++;
    if(seconds == 60) {
      minutes++;
      if(minutes < 10) minutes = '0' + minutes;
      seconds = 0;
    }

    update();

    function update() {
      if (seconds < 10) seconds = '0' + seconds;
      timerSeconds.innerHTML = seconds;
      timerMinutes.innerHTML = minutes;
    }
  }, 1000);

  return timerId;
}

function killTimer(timerId) {
  clearInterval(timerId);
}

function clearTimer() {
  let timer = document.querySelector('.time'),
      timerMinutes = timer.querySelector('.time__minutes'),
      timerSeconds = timer.querySelector('.time__seconds');

  timerMinutes.innerHTML = '00';
  timerSeconds.innerHTML = '00';
}

// MODAL

let startButton = document.querySelector('.start');

let nickName = document.querySelector('.modal-start__input input[type="text"]'),
    bombsField = document.querySelector('.modal-start__input input[type="number"]');

nickName.value = '';
bombsField.value = '';

startButton.addEventListener('click', function() {
  if (checkFields()) {
    start();
  }

  function checkFields() {
    if (nickName.value.length > 0 &&
        bombsField.value.length > 0 &&
        bombsField.value < 121 &&
        bombsField.value >= 1) {
        BOMBS_COUNT = bombsField.value;
        bombsLeft = BOMBS_COUNT;
        return true;
    }

    if (nickName.value.length == 0 ||
        bombsField.value.length == 0) {
        alert( 'Одно из полей не заполнено!' );
        return;
    }

    if (bombsField.value > 120) {
      alert( 'Слишком много бомб! \nМаксимум 120.' );
    }

    if (bombsField.value < 1) {
      alert( 'Должна быть хотя бы 1 бомба!' );
    }

    return false;
  }
});

function start() {
  if(positions.length != 0) clearPlayField(playField, 15, 13, positions);
  if(timerId) killTimer(timerId);
  clearTimer();
  positions = [];
  bombs = null;
  bombsLeft = BOMBS_COUNT;

  let backdrop = document.querySelector('.backdrop'),
      modalStart = document.querySelector('.modal-start');

  backdrop.hidden = true;
  modalStart.hidden = true;

  timerId = startTimer();
  showBombsLeft();

  bombs = getBombs(BOMBS_COUNT);
  positions = getPositions(15, 13, bombs);

  drowPlayField(playField, 15, 13, positions);
}

function win() {
  killTimer(timerId);

  let modalWin = document.querySelector('.modal-win'),
      backdrop = document.querySelector('.backdrop');

  backdrop.style.display = 'block';
  modalWin.style.display = 'block';
}




// SAVING TO LOCALE STORAGE
