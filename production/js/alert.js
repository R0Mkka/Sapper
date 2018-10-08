export default class Alert {

  constructor(width='300px',
              height='150px',
              headline='Headline',
              message='Message',
              type='alert') {
    this.width = width;
    this.height = height;
    this.headline = headline;
    this.message = message;
    this.type = type;

    this.timerId = null;

    this.alert = alert = document.querySelector('.alert');
  }

  show() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.tune();

    this.alert.style.display = 'block';

    this.timerId = setTimeout(() => { this.hide(); }, 3000);
  }

  tune() {
    let headline = this.alert.querySelector('.alert__headline'),
        message = this.alert.querySelector('.alert__message p');

    this.alert.style.width = this.width;
    this.alert.style.height = this.height;

    let img = (checkAlert(this.type)) ?
      '<img src="./img/ok.png" />'
      :
      '<img src="./img/error.png" />';

      headline.innerHTML = `${img}<p>${this.headline}</p>`;
      message.innerHTML = `${this.message}`;

    // LOCAL FUNCTION
    function checkAlert(type) {
      return type == 'alert';
    }
  }

  hide() {
    this.alert.style.display = 'none';
  }

  setMessage(message) {
    this.message = message;
  }

}
