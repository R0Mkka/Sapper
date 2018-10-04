class OpenCells {
  constructor() {}

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
}
