class PlayField {

  constructor(rows, columns, bombsCount) {
    this.rows = rows;
    this.columns = columns;
    this.bombsCount = bombsCount;

    this.width = 27 * (columns - 1) + 30 + 'px';

    this.created = false;

    this.field = document.querySelector('.play-field');
    this.positions = [];
    this.bombs = [];
  }

  create() {
    let otherFunctions = new OtherFunctions();

    this.bombs = otherFunctions.getBombs(this.bombsCount, this.rows, this.columns);
    this.positions = otherFunctions.getPositions(this.bombs, this.rows, this.columns);

    this.field.style.width = this.width;

    this.created = true;
  }

  draw() {
    if (this.created) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.field.appendChild(this.positions[i][j]);
        }
      }

      return;
    }

    alert( '[Error]:Поле не создано!' );
  }

  open() {

  }



}
