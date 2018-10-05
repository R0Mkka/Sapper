class PlayField {

  constructor(rows, columns, bombsCount) {
    this.rows = rows;
    this.columns = columns;
    this.bombsCount = bombsCount;

    this.isTuned = false;

    this.field = document.querySelector('.play-field');
    this.positions = [];
    this.bombs = [];
  }

  tune() {
    let otherFunctions = new OtherFunctions();

    this.bombs = otherFunctions.getBombs(this.bombsCount, this.rows, this.columns);
    this.positions = otherFunctions.getPositions(this.bombs, this.rows, this.columns);

    this.field.style.width = 27 * (this.columns - 1) + 30 + 'px';

    this.isTuned = true;
  }

  draw() {
    if (this.isTuned) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.field.appendChild(this.positions[i][j]);
        }
      }

      this.field.style.display = 'flex';
      return;
    }

    alert( '[Error:draw]:Поле не настроено!' );
  }

  open() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (this.positions[i][j].classList.contains('bomb')) {
          this.positions[i][j].innerHTML = `<img src='img/bomb.png'>`;
          this.positions[i][j].style.backgroundColor = 'red';
        } else {
          this.positions[i][j].style.backgroundColor = 'teal';
        }
      }
    }
  }

  hide() {
    if (this.isTuned) {
      this.field.style.display = 'none';
      return;
    }

    alert( '[Error:hide]:Поле не настроено!' );
  }

  remove() {
    if (this.isTuned) {

      while (this.field.children.length > 0) {
        this.field.removeChild(this.field.children[0]);
      }

      this.positions = [];
      this.bombs = [];
      this.isTuned = false;

      return;
    }

    alert( '[Error:remove]:Поле не настроено!' );
  }

}
