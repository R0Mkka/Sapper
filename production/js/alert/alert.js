import { defaultSettings } from './alert.config.js';
import { selectors } from './alert.config.js';
import { images } from './alert.config.js';

export default class Alert {

  constructor(alertSettings) {
    this.alertSettings = alertSettings || defaultSettings;
    this.timerId = null;

    this.alert = document.querySelector('.alert');
  }

  show() {
    this._killTimer();

    this._tune();

    this.alert.style.display = 'block';

    this.timerId = setTimeout(() => { this.hide(); }, 3000);
  }

  _killTimer() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

  _tune() {
    this.alert.style.width = this.alertSettings.width;
    this.alert.style.height = this.alertSettings.height;

    const imagePath = this._getAlertImageByType();
    const headline = this.alert.querySelector(selectors.headline);
    const message = this.alert.querySelector(selectors.message);

    headline.innerHTML = this._formHeadline(imagePath);
    message.innerHTML = this.alertSettings.message;
  }

  _getAlertImageByType() {
    return (this._checkAlert())
      ? images.ok
      : images.error;
  }

  _checkAlert() {
    return this.alertSettings.type == 'alert';
  }

  _formHeadline(imagePath) {
    let headline = imagePath;

    headline += `<p>${this.alertSettings.headline}</p>`;

    return headline;
  }

  hide() {
    this.alert.style.display = 'none';
  }

  setMessage(message) {
    this.message = message;
  }

}
