export default class Smile {

  static set() {
    let smile = document.querySelector('.sapper__header-smile img');

    smile.addEventListener('mousedown', () => {
      if (!~smile.src.indexOf('demon')) {
        smile.src = 'img/with_tongue.png';
      }
    });

    smile.addEventListener('click', () => {
      if (!~smile.src.indexOf('demon')) {
        smile.src = 'img/smiling.png';
      }
    });

    smile.addEventListener('mouseout', () => {
      if (!~smile.src.indexOf('demon')) {
        smile.src = 'img/smiling.png';
      }
    });
  }

  static showDemon() {
    let smile = document.querySelector('.sapper__header-smile img');

    smile.src = 'img/demon.png';
  }

  static showSmile() {
    let smile = document.querySelector('.sapper__header-smile img');

    smile.src = 'img/smiling.png';
  }
}
