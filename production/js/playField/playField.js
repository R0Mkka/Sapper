import OtherFunctions from '../otherFunctions.js';

import { displayType } from '../displayType.js';
import { classes } from '../classes.js';
import { colors } from '../colors';

import { selectors } from './playField.config.js';
import { images } from './playField.config.js';

export default class PlayField {

  constructor() {
    this.field = document.querySelector(selectors.playField);

    this.bombs = [];
    this.positions = [];
    this._isTuned = false;

    this.otherFunctions = new OtherFunctions();
  }

  setSettings({rows, columns, bombsAmount}) {
    this.rows = rows;
    this.columns = columns;
    this.bombsAmount = bombsAmount;

    this.bombs = this.otherFunctions
      .getBombs(this.bombsAmount, this.rows, this.columns);

    this.positions = this.otherFunctions
      .getPositions(this.bombs, this.rows, this.columns);

    this.field.style.width = this._countFieldWidth();

    this._isTuned = true;
  }

  _countFieldWidth() {
    const pixelsForOneCell = 27;

    const result = pixelsForOneCell * this.columns + 'px';

    return result;
  }

  draw() {
    if (this._isTuned) {
      for (let i = 0; i < this.rows; i++) {
        this._goThroughTheRow((j) => {
          this.field.appendChild(this.positions[i][j]);
        });
      }

      this.field.style.display = displayType.flex;
    }
  }

  _goThroughTheRow(callback) {
    for (let j = 0; j < this.columns; j++) {
      callback(j);
    }
  }

  open() {
    for (let i = 0; i < this.rows; i++) {
      this._goThroughTheRow((j) => {
        const cell = this.positions[i][j];

        if (cell.classList.contains(classes.bomb)) {
          cell.innerHTML = images.bomb;

          cell.style.backgroundColor = colors.bomb;
        } else {
          cell.style.backgroundColor = colors.clearCell;
        }
      });
    }
  }

  hide() {
    if (this._isTuned) {
      this.field.style.display = displayType.hidden;

      return true;
    }

    return false;
  }

  clear() {
    if (this._isTuned) {
      while (this.field.children.length > 0) {
        this.field.removeChild(this.field.children[0]);
      }

      return true;
    }

    return false;
  }

}
