import { defaultSettings } from './modal.config.js';
import { selectors } from './modal.config.js';

export default class Modal {
  constructor(modalSettings) {
    this.modalSettings = modalSettings || defaultSettings;

    this.tuned = false;
    this.showed = false;

    this.backdrop = document.querySelector(selectors.backdrop);
    this.cross = document.querySelector(selectors.close);

    this.modal = document.querySelector(`.${this.modalSettings.className}`);
  }

  tune() {
    const header = document.querySelector(`.${this.modalSettings.className}__header h1`);
    header.innerHTML = this.modalSettings.title;

    this.modal.style.width = this.modalSettings.width;
    this.modal.style.height = this.modalSettings.height;

    const leftOffset =
      (document.documentElement.clientWidth / 2) - (parseInt(this.modalSettings.width) / 2) + 'px';

    this.modal.style.left = leftOffset;

    this.tuned = true;
  }

  show() {
    if (this.tuned) {
      this.backdrop.style.display = 'block';
      this.modal.style.display = 'block';

      this.showed = true;
    }
  }

  hide() {
    if (this.showed) {
      this.backdrop.style.display = 'none';
      this.modal.style.display = 'none';

      this.showed = false;
    }
  }

  showCross() {
    if (this.tuned) {
      this.cross.style.display = 'block';
    }
  }
}
