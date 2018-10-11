import { defaultSettings } from './modal.config.js';
import { selectors } from './modal.config.js';
import { displayType } from '../displayType.js';

export default class Modal {

  constructor() {
    this._backdrop = document.querySelector(selectors.backdrop);
    this._modal = document.querySelector(selectors.modal);

    this._modalHeader = document.querySelector(selectors.header);
    this._modalContent = document.querySelector(selectors.content);
    this._modalButtons = document.querySelector(selectors.buttons);
  }

  setSettings(modalSettings) {
    this._modalSettings = modalSettings || defaultSettings;
  }

  tune() {
    this._modal.style.width = this._modalSettings.width;
    this._modal.style.height = this._modalSettings.height;

    this._modal.style.top = this._countTopOffset();
    this._modal.style.left = this._countLeftOffset();

    this._modalHeader.innerHTML = this._formHeader();
    this._modalContent.innerHTML = this._formContent();
    this._modalButtons.innerHTML = this._formButtons();
  }

  _countTopOffset() {
    const windowHeight = document.documentElement.clientHeight;
    const modalHeight = this._modalSettings.height;

    const topOffset = (windowHeight / 3) - (parseInt(modalHeight) / 3) + 'px';

    return topOffset;
  }

  _countLeftOffset() {
    const windowWidth = document.documentElement.clientWidth;
    const modalWidth = this._modalSettings.width;

    const leftOffset = (windowWidth / 2) - (parseInt(modalWidth) / 2) + 'px';

    return leftOffset;
  }

  _formHeader() {
    let resultHeader = '';

    const headerImages = this._modalSettings.header.images;
    const headerText = this._modalSettings.header.text;

    resultHeader += `<img src=${headerImages[0]}>`;
    resultHeader += `<h1>${headerText}</h1>`;
    resultHeader += `<img src=${headerImages[1]}>`;

    return resultHeader;
  }

  _formContent() {
    let resultContent = '';

    if (this._modalSettings.content.inputs) {
      const inputs = this._modalSettings.content.inputs;

      for (let i = 0; i < inputs.length; i++) {
        resultContent += this._addInput(inputs[i]);
      }

      return resultContent;
    }

    const text = this._modalSettings.content.text;

    resultContent += this._formText(text);

    return resultContent;
  }

  _formText(text) {
    let resultText = '<div class="text">';

    for (let i = 0; i < text.length; i++) {
      resultText += `<p class="text-line">${text[i]}</p>`;
    }

    resultText += '</div>';

    return resultText;
  }

  _addInput(input) {
    let resultInput = '';

    const wrapper = input.wrapper;
    const hint = input.hint;
    const type = input.type;
    const classes = input.classes;
    const value = input.value;

    if (hint) resultInput += `<p>${hint}</p>`;

    if (wrapper) resultInput += '<div>';

    resultInput += `<input`;
    resultInput += ` type=${type}`;
    resultInput += ` class=${classes}`;
    resultInput += ` value=${value}>`;

    if (!wrapper) resultInput += '</div>';

    return resultInput;
  }

  _formButtons() {
    let resultButtons = '';

    const buttons = this._modalSettings.buttons;

    for (let i = 0; i < buttons.length; i++) {
      resultButtons += buttons[i];
    }

    return resultButtons;
  }

  show() {
    this._backdrop.style.display = displayType.visible;
    this._modal.style.display = displayType.visible;
  }

  hide() {
    this._backdrop.style.display = displayType.hidden;
    this._modal.style.display = displayType.hidden;
  }

}
