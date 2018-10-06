class PlayField {

  constructor() {
    this.field = document.querySelector('.play-field');
    this.positions = [];
    this.bombs = [];
    this.isTuned = false;
  }

  setSettings(rows, columns, bombsAmount) {
    this.rows = rows;
    this.columns = columns;
    this.bombsAmount = bombsAmount;

    let otherFunctions = new OtherFunctions();

    this.bombs = otherFunctions.getBombs(this.bombsAmount, this.rows, this.columns);
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
      return true;
    }

    return false;
  }

  clear() {
    if (this.isTuned) {
      while (this.field.children.length > 0) {
        this.field.removeChild(this.field.children[0]);
      }
      return true;
    }

    return false;
  }

}
