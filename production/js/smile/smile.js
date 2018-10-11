import { selectors } from './smile.config.js';
import { images } from './smile.config.js';

export default class Smile {

  static set() {
    const smile = document.querySelector(selectors.smileImg);
    const demon = 'demon';

    smile.addEventListener('mousedown', () => {
      if (!~smile.src.indexOf(demon)) {
        smile.src = images.withTongue;
      }
    });

    smile.addEventListener('click', () => {
      if (!~smile.src.indexOf(demon)) {
        smile.src = images.smiling;
      }
    });

    smile.addEventListener('mouseout', () => {
      if (!~smile.src.indexOf(demon)) {
        smile.src = images.smiling;
      }
    });
  }

  static showDemon() {
    const smile = document.querySelector(selectors.smileImg);

    smile.src = images.demon;
  }

  static showSmile() {
    const smile = document.querySelector(selectors.smileImg);

    smile.src = images.smiling;
  }
}
