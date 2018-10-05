class Modal {
  constructor(width = '100px',
              height = '100px',
              title = 'Default title',
              className = 'modal') {
    this._width = width;
    this._height = height;
    this._title = title;
    this._className = className;

    this._tuned = false;
    this._showed = false;

    this._backdrop = document.querySelector('.backdrop');
    this._modal = document.querySelector(`.${this._className}`);
  }

  tune() { // Настроить
    let header = document.querySelector(`.${this._className}__header h1`);
    header.innerHTML = this._title;

    this._modal.style.width = this._width;
    this._modal.style.height = this._height;

    let leftOffset =
      (document.documentElement.clientWidth / 2) - (parseInt(this._width) / 2) + 'px';

    this._modal.style.left = leftOffset;

    this._tuned = true;
  }

  show() {
    if(this._tuned) {
      this._backdrop.style.display = 'block';
      this._modal.style.display = 'block';

      this._showed = true;

      return;
    }

    alert( '[Error]:Модальное окно не настроено!' );
  }

  hide() {
    if(this._showed) {
      this._backdrop.style.display = 'none';
      this._modal.style.display = 'none';

      this._showed = false;

      return;
    }

    alert( '[Error]:Модальное окно и так скрыто!' );
  }
}
