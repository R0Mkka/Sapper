class Modal {
  constructor(width = '100px',
              height = '100px',
              title = 'Default title',
              className = 'modal') {
    this.width = width;
    this.height = height;
    this.title = title;
    this.className = className;

    this.tuned = false;
    this.showed = false;

    this.backdrop = document.querySelector('.backdrop');
    this.modal = document.querySelector(`.${this.className}`);
  }

  tune() { // Настроить
    let header = document.querySelector(`.${this.className}__header h1`);
    header.innerHTML = this.title;

    this.modal.style.width = this.width;
    this.modal.style.height = this.height;

    let leftOffset =
      (document.documentElement.clientWidth / 2) - (parseInt(this.width) / 2) + 'px';

    this.modal.style.left = leftOffset;

    this.tuned = true;
  }

  show() {
    if(this.tuned) {
      this.backdrop.style.display = 'block';
      this.modal.style.display = 'block';

      this.showed = true;

      return;
    }

    alert( '[Error]:Модальное окно не настроено!' );
  }

  hide() {
    if(this.showed) {
      this.backdrop.style.display = 'none';
      this.modal.style.display = 'none';

      this.showed = false;

      return;
    }

    alert( '[Error]:Модальное окно и так скрыто!' );
  }
}
