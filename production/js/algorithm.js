import OtherFunctions from './otherFunctions.js';

export default class Algorithm {

  openCells(playField) {
    let rows = playField.rows,
        columns = playField.columns,
        positions = playField.positions;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (positions[i][j].classList.contains('clicked')) {
          positions[i][j].classList.remove('clicked');
          positions[i][j].classList.remove('closed');

          this.setBombsNumber(i, j, positions, rows, columns);

          this.openLeftCell(i, j - 1, positions, rows, columns);
          this.openRightCell(i, j + 1, positions, rows, columns);
          this.openUpperCell(i - 1, j, positions, rows, columns);
          this.openLowerCell(i + 1, j, positions, rows, columns);
        }
      }
    }
  }

  openLeftCell(i, j, positions, rows, columns) {
    if ( i >= 0 && j >= 0 && i < rows && j < columns ) {
      if (this.isClosed(positions[i][j])) {
        positions[i][j + 1].classList.remove('closed');
        positions[i][j].classList.remove('closed');

        if (this.isBomb(positions[i][j]) || this.isFlagged(positions[i][j])) {
          positions[i][j].classList.add('closed');

          this.setBombsNumber(i, j + 1, positions, rows, columns);
        } else {
          positions[i][j].style.backgroundColor = 'teal';

          if (this.setBombsNumber(i, j, positions, rows, columns) > 0) {
            this.openUpperCell(i - 1, j, positions, rows, columns);
            this.openLowerCell(i + 1, j, positions, rows, columns);
            return;
          }

          this.openUpperCell(i - 1, j, positions, rows, columns);
          this.openLowerCell(i + 1, j, positions, rows, columns);
          this.openLeftCell(i, j - 1, positions, rows, columns);
        }

      }
    }
  }

  openRightCell(i, j, positions, rows, columns) {
    if ( i >= 0 && j >= 0 && i < rows && j < columns ) {
      if (this.isClosed(positions[i][j])) {
        positions[i][j - 1].classList.remove('closed');
        positions[i][j].classList.remove('closed');

        if (this.isBomb(positions[i][j]) || this.isFlagged(positions[i][j])) {
          positions[i][j].classList.add('closed');

          this.setBombsNumber(i, j - 1, positions, rows, columns);
        } else {
          positions[i][j].style.backgroundColor = 'teal';

          if (this.setBombsNumber(i, j, positions, rows, columns) > 0) {
            this.openUpperCell(i - 1, j, positions, rows, columns);
            this.openLowerCell(i + 1, j, positions, rows, columns);
            return;
          }

          this.openUpperCell(i - 1, j, positions, rows, columns);
          this.openLowerCell(i + 1, j, positions, rows, columns);
          this.openRightCell(i, j + 1, positions, rows, columns);
        }
      }
    }
  }

  openUpperCell(i, j, positions, rows, columns) {
    if ( i >= 0 && j >= 0 && i < rows && j < columns ) {
      if (this.isClosed(positions[i][j])) {
        positions[i + 1][j].classList.remove('closed');
        positions[i][j].classList.remove('closed');

        if (this.isBomb(positions[i][j]) || this.isFlagged(positions[i][j])) {
          positions[i][j].classList.add('closed');

          this.setBombsNumber(i + 1, j, positions, rows, columns);
        } else {
          positions[i][j].style.backgroundColor = 'teal';

          if (this.setBombsNumber(i, j, positions, rows, columns) > 0) {
            this.openLeftCell(i, j - 1, positions, rows, columns);
            this.openRightCell(i, j + 1, positions, rows, columns);
            return;
          }

          this.openLeftCell(i, j - 1, positions, rows, columns);
          this.openRightCell(i, j + 1, positions, rows, columns);
          this.openUpperCell(i - 1, j, positions, rows, columns);
        }

      }
    }
  }

  openLowerCell(i, j, positions, rows, columns) {
    if ( i >= 0 && j >= 0 && i < rows && j < columns ) {
      if (this.isClosed(positions[i][j])) {
        positions[i - 1][j].classList.remove('closed');
        positions[i][j].classList.remove('closed');

        if (this.isBomb(positions[i][j]) || this.isFlagged(positions[i][j])) {
          positions[i][j].classList.add('closed');

          this.setBombsNumber(i - 1, j, positions, rows, columns);
        } else {
          positions[i][j].style.backgroundColor = 'teal';

          if (this.setBombsNumber(i, j, positions, rows, columns) > 0) {
            this.openLeftCell(i, j - 1, positions, rows, columns);
            this.openRightCell(i, j + 1, positions, rows, columns);
            return;
          }

          this.openLeftCell(i, j - 1, positions, rows, columns);
          this.openRightCell(i, j + 1, positions, rows, columns);
          this.openLowerCell(i + 1, j, positions, rows, columns);
        }

      }
    }
  }

  isClosed(elem) {
    return (elem.classList.contains('closed')) ? true : false;
  }

  isBomb(elem) {
    return (elem.classList.contains('bomb')) ? true : false;
  }

  isFlagged(elem) {
    return (elem.classList.contains('flagged')) ? true : false;
  }

  setBombsNumber(i, j, positions, rows, columns) {
    let otherFunctions = new OtherFunctions();

    let bombsInCurrentCell =
      otherFunctions.getBombsNumber(i, j, positions, rows, columns);

    if (bombsInCurrentCell > 0) {
      positions[i][j].style.color =
        otherFunctions.getNumberColor(bombsInCurrentCell);

      positions[i][j].innerHTML = `<p>${bombsInCurrentCell}</p>`;
    }

    return bombsInCurrentCell;
  }
}
