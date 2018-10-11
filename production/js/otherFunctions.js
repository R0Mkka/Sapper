import Helpers from './helpers.js';

import { colors } from './colors.js';
import { classes } from './classes.js';

export default class OtherFunctions {

  getBombs(bombsAmount, rows, columns) {
    const bombs = [];

    for (let i = 0; i < bombsAmount; i++) {
      const randomPos = this._getRandomPosition(rows * columns);

      if (!this._isNewPosition(randomPos, bombs)) {
        i--;
        continue;
      }

      bombs.push(randomPos);
    }

    return bombs;
  }

  _getRandomPosition(max) {
    let rand = 0;

    rand = Math.random() * max;
    rand = Math.floor(rand);

    return rand;
  }

  _isNewPosition(position, array) {
    return array.indexOf(position) == -1;
  }

  getPositions(bombs, rows, columns) {
    const positions = [];
    const currentPos = {
      index: 0
    }

    for (let i = 0; i < rows; i++) {
      const positionsRow = this._createPositionsRow(bombs, columns, currentPos);

      positions.push(positionsRow);
    }

    return positions;
  }

  _createPositionsRow(bombs, columns, currentPos) {
    const positionsRow = [];

    for (let j = 0; j < columns; j++) {
      const cell = this._createCell(bombs, currentPos);

      positionsRow.push(cell);

      currentPos.index++;
    }

    return positionsRow;
  }

  _createCell(bombs, currentPos) {
    const cell = document.createElement('div');

    if (~bombs.indexOf(currentPos.index)) {
      Helpers.addClass(cell, classes.bomb);
    }

    Helpers.addClass(cell, classes.cell);
    Helpers.addClass(cell, classes.closed);

    return cell;
  }

  getNumberColor(bombsAround) {
    if (bombsAround == 1) {
      return colors.one;
    }

    if (bombsAround == 2 || bombsAround == 3) {
      return colors.twoOrThree;
    }

    return colors.moreThanThree;
  }

  getBombsNumber(i, j, positions, rows, columns) {
    let bombsAmount = 0;

    // Это лучшее, что я придумал для того, чтобы сократить код..
    if (this._cellExists(i + 1, j, positions)) {
      bombsAmount += this._bombCheck(positions[i + 1][j]);
    }

    if (this._cellExists(i - 1, j, positions)) {
      bombsAmount += this._bombCheck(positions[i - 1][j]);
    }

    if (this._cellExists(i, j + 1, positions)) {
      bombsAmount += this._bombCheck(positions[i][j + 1]);
    }

    if (this._cellExists(i, j - 1, positions)) {
      bombsAmount += this._bombCheck(positions[i][j - 1]);
    }

    if (this._cellExists(i + 1, j + 1, positions)) {
      bombsAmount += this._bombCheck(positions[i + 1][j + 1]);
    }

    if (this._cellExists(i + 1, j - 1, positions)) {
      bombsAmount += this._bombCheck(positions[i + 1][j - 1]);
    }

    if (this._cellExists(i - 1, j + 1, positions)) {
      bombsAmount += this._bombCheck(positions[i - 1][j + 1]);
    }

    if (this._cellExists(i - 1, j - 1, positions)) {
      bombsAmount += this._bombCheck(positions[i - 1][j - 1]);
    }

    return bombsAmount;
  }

  _cellExists(i, j, positions) {
    try {
      positions[i][j].className;

      return true;
    } catch(error) {

      return false;
    }
  }

  _bombCheck(elem) {
    return elem.classList.contains(classes.bomb);
  }
}
