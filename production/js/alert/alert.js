import { defaultSettings } from './alert.config.js';
import { selectors } from './alert.config.js';
import { images } from './alert.config.js';

import { displayType } from '../displayType.js';

export default class Alert {

  constructor() {
    this._timerId = null;
    this._alert = document.querySelector(selectors.alert);
  }

  setSettings(alertSettings) {
    this._alertSettings = alertSettings || defaultSettings;
  }

  show() {
    this._killTimer();

    this._tune();

    this._alert.style.display = displayType.visible;

    this._timerId = setTimeout(() => { this._hide(); }, 3000);
  }

  _killTimer() {
    if (this._timerId) {
      clearTimeout(this._timerId);
    }
  }

  _tune() {
    this._alert.style.width = this._alertSettings.width;
    this._alert.style.height = this._alertSettings.height;

    const imagePath = this._getAlertImageByType();
    const headline = this._alert.querySelector(selectors.headline);
    const message = this._alert.querySelector(selectors.message);

    headline.innerHTML = this._formHeadline(imagePath);
    message.innerHTML = this._alertSettings.message;
  }

  _getAlertImageByType() {
    return (this._checkAlert())
      ? images.ok
      : images.error;
  }

  _checkAlert() {
    return this._alertSettings.type == 'alert';
  }

  _formHeadline(imagePath) {
    let headline = imagePath;

    headline += `<p>${this._alertSettings.headline}</p>`;

    return headline;
  }

  _hide() {
    this._alert.style.display = displayType.hidden;
  }

  setMessage(message) {
    this.message = message;
  }

}
