class OtherFunctions {

  getBombs(bombsCount, rows, columns) {
    let bombs = [];

    for (let i = 0; i < bombsCount; i++) {
      let randomPos = getRandomPosition(0, rows * columns);

      if (!isNewPosition(randomPos, bombs)) {
        bombsCount++;
        continue;
      }

      bombs.push(randomPos);
    }

    return bombs;

    // LOCAL FUNCTIONS
    function getRandomPosition(min, max) {
      let rand = 0;

      rand = min + Math.random() * (max + 1 - min);
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
      let positionsRow = [];

      for (let j = 0; j < columns; j++) {
        let cell = document.createElement('div');

        if (~bombs.indexOf(currentPosition)) {
          cell.classList.add('bomb');
        }

        cell.classList.add('cell');
        cell.classList.add('closed');

        positionsRow.push(cell);
        currentPosition++;
      }

      positions.push(positionsRow);
    }

    return positions;
  }

  getNumberColor(bombsAround) {
    if (bombsAround == 1) {
      return 'lime';
    }

    if (bombsAround == 2 || bombsAround == 3) {
      return 'orange';
    }

    return 'skyblue';
  }

  getBombsNumber(i, j, positions, rows, columns) {
    let bombsCounter = 0;

    if (i >= 0 && j >= 0 && i < rows && j < columns) {
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
    }

    return bombsCounter;
  }

}
