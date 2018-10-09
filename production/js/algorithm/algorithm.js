import OtherFunctions from '../otherFunctions.js';
import Helpers from '../helpers.js';

import { classes } from '../classes.js';

export default class Algorithm {

  openCells({rows, columns, positions}) {
    for (let i = 0; i < rows; i++) {
      this._goThroughTheRow(i, rows, columns, positions)
    }
  }

  _goThroughTheRow(i, rows, columns, positions) {
    for (let j = 0; j < columns; j++) {
      const cell = positions[i][j];

      if (Helpers.clickedCheck(cell)) {
        Helpers.removeClass(cell, classes.clicked);
        Helpers.removeClass(cell, classes.closed);

        this._setBombsNumber(i, j, positions, rows, columns);

        this._openLeftCell(i, j - 1, positions, rows, columns);
        this._openRightCell(i, j + 1, positions, rows, columns);
        this._openUpperCell(i - 1, j, positions, rows, columns);
        this._openLowerCell(i + 1, j, positions, rows, columns);
      }
    }
  }

  _setBombsNumber(i, j, positions, rows, columns) {
    const otherFunctions = new OtherFunctions();

    const bombsInCurrentCell = otherFunctions
      .getBombsNumber(i, j, positions, rows, columns);

    if (bombsInCurrentCell > 0) {
      positions[i][j].style.color = otherFunctions
        .getNumberColor(bombsInCurrentCell);

      positions[i][j].innerHTML = `<p>${bombsInCurrentCell}</p>`;
    }

    return bombsInCurrentCell;
  }

  _openLeftCell(i, j, positions, rows, columns) {
    if (this._isIndexInRow(i, rows) && this._isIndexInColumn(j, columns)) {
      const cell = positions[i][j];
      const prevCell = positions[i][j + 1];

      if (Helpers.closedCheck(cell)) {
        Helpers.removeClass(prevCell, classes.closed);
        Helpers.removeClass(cell, classes.closed);

        if (Helpers.bombCheck(cell) ||
            Helpers.flaggedCheck(cell)) {
          Helpers.addClass(cell, classes.closed);

          this._setBombsNumber(i, j + 1, positions, rows, columns);
        } else {
          positions[i][j].style.backgroundColor = 'teal';

          this._openUpperCell(i - 1, j, positions, rows, columns);
          this._openLowerCell(i + 1, j, positions, rows, columns);

          if (this._setBombsNumber(i, j, positions, rows, columns) == 0) {
            this._openLeftCell(i, j - 1, positions, rows, columns);
          }
        }
      }
    }
  }

  _isIndexInRow(i, rows) {
    return i >= 0 && i < rows;
  }

  _isIndexInColumn(j, columns) {
    return j >= 0 && j < columns;
  }

  _openRightCell(i, j, positions, rows, columns) {
    if (this._isIndexInRow(i, rows) && this._isIndexInColumn(j, columns)) {
      const cell = positions[i][j];
      const prevCell = positions[i][j - 1];

      if (Helpers.closedCheck(cell)) {
        Helpers.removeClass(prevCell, classes.closed);
        Helpers.removeClass(cell, classes.closed);

        if (Helpers.bombCheck(cell) ||
            Helpers.flaggedCheck(cell)) {
          Helpers.addClass(cell, classes.closed);

          this._setBombsNumber(i, j - 1, positions, rows, columns);
        } else {
          positions[i][j].style.backgroundColor = 'teal';

          this._openUpperCell(i - 1, j, positions, rows, columns);
          this._openLowerCell(i + 1, j, positions, rows, columns);

          if (this._setBombsNumber(i, j, positions, rows, columns) == 0) {
            this._openRightCell(i, j + 1, positions, rows, columns);
          }
        }
      }
    }
  }

  _openUpperCell(i, j, positions, rows, columns) {
    if (this._isIndexInRow(i, rows) && this._isIndexInColumn(j, columns)) {
      const cell = positions[i][j];
      const prevCell = positions[i + 1][j];

      if (Helpers.closedCheck(cell)) {
        Helpers.removeClass(prevCell, classes.closed);
        Helpers.removeClass(cell, classes.closed);

        if (Helpers.bombCheck(cell) ||
            Helpers.flaggedCheck(cell)) {
          Helpers.addClass(cell, classes.closed);

          this._setBombsNumber(i + 1, j, positions, rows, columns);
        } else {
          positions[i][j].style.backgroundColor = 'teal';

          this._openLeftCell(i, j - 1, positions, rows, columns);
          this._openRightCell(i, j + 1, positions, rows, columns);

          if (this._setBombsNumber(i, j, positions, rows, columns) == 0) {
            this._openUpperCell(i - 1, j, positions, rows, columns);
          }
        }
      }
    }
  }

  _openLowerCell(i, j, positions, rows, columns) {
    if (this._isIndexInRow(i, rows) && this._isIndexInColumn(j, columns)) {
      const cell = positions[i][j];
      const prevCell = positions[i - 1][j];

      if (Helpers.closedCheck(cell)) {
        Helpers.removeClass(prevCell, classes.closed);
        Helpers.removeClass(cell, classes.closed);

        if (Helpers.bombCheck(cell) ||
            Helpers.flaggedCheck(cell)) {
          Helpers.addClass(cell, classes.closed);

          this._setBombsNumber(i - 1, j, positions, rows, columns);
        } else {
          positions[i][j].style.backgroundColor = 'teal';

          this._openLeftCell(i, j - 1, positions, rows, columns);
          this._openRightCell(i, j + 1, positions, rows, columns);

          if (this._setBombsNumber(i, j, positions, rows, columns) == 0) {
            this._openLowerCell(i + 1, j, positions, rows, columns);
          }
        }
      }
    }
  }
}
