import { colors } from './colors.js';

export default class OtherFunctions {

  getBombs(bombsCount, rows, columns) {
    let bombs = [];

    for (let i = 0; i < bombsCount; i++) {
      let randomPos = getRandomPosition(rows * columns);

      if (!isNewPosition(randomPos, bombs)) {
        bombsCount++;
        continue;
      }

      bombs.push(randomPos);
    }

    return bombs;

    // LOCAL FUNCTIONS
    function getRandomPosition(max) {
      let rand = 0;

      rand = Math.random() * max;
      rand = Math.floor(rand);

      return rand;
    }

    function isNewPosition(number, array) {
      if (array.indexOf(number) != -1) {
        return false;
      }
      return true;
    }
  }

  getPositions(bombs, rows, columns) {
    let currentPosition = 0;
    let positions = [];

    for (let i = 0; i < rows; i++) {
      let positionsRow = createPositionsRow();

      positions.push(positionsRow);
    }

    return positions;

    // LOCAL FUNCTIONS
    function createCell() {
      let cell = document.createElement('div');

      if (~bombs.indexOf(currentPosition)) {
        cell.classList.add('bomb');
      }

      cell.classList.add('cell');
      cell.classList.add('closed');

      return cell;
    }

    function createPositionsRow() {
      let positionsRow = [];

      for (let j = 0; j < columns; j++) {
        let cell = createCell();

        positionsRow.push(cell);
        currentPosition++;
      }

      return positionsRow;
    }
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
    let bombsCounter = 0;

    if (i + 1 < rows && isBomb(positions[i+1][j]))
      bombsCounter++;

    if (i - 1 >= 0 && isBomb(positions[i-1][j]))
      bombsCounter++;

    if (j + 1 < columns && isBomb(positions[i][j+1]))
      bombsCounter++;

    if (j - 1 >= 0 && isBomb(positions[i][j-1]))
      bombsCounter++;

    if (i + 1 < rows && j + 1 < columns && isBomb(positions[i+1][j+1]))
      bombsCounter++;

    if (i + 1 < rows && j - 1 >= 0 && isBomb(positions[i+1][j-1]))
      bombsCounter++;

    if (i - 1 >= 0 && j + 1 < columns && isBomb(positions[i-1][j+1]))
      bombsCounter++;

    if (i - 1 >= 0 && j - 1 >= 0 && isBomb(positions[i-1][j-1]))
      bombsCounter++;

    function isBomb(elem) {
      return (elem.classList.contains('bomb')) ? true : false;
    }

    return bombsCounter;
  }
}
