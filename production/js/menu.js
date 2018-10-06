class Menu {

  constructor() {
    this.menu = document.querySelector('.menu-list');
  }

  static show() {
    this.menu.style.display = 'block';
  }

  static hide() {
    this.menu.style.display = 'none';
  }

}
