import { classes } from './classes.js';

export default class Helpers {

  static cellCheck(elem) {
    return elem.classList.contains(classes.cell);
  }

  static clickedCheck(elem) {
    return elem.classList.contains(classes.clicked);
  }

  static closedCheck(elem) {
    return elem.classList.contains(classes.closed);
  }

  static bombCheck(elem) {
    return elem.classList.contains(classes.bomb);
  }

  static flaggedCheck(elem) {
    return elem.classList.contains(classes.flagged);
  }

  static removeClass(elem, className) {
    elem.classList.remove(className);
  }

  static addClass(elem, className) {
    elem.classList.add(className);
  }

}
