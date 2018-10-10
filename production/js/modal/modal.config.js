export const selectors = {
  backdrop: '.backdrop',
  modal: '.modal',
  header: '.modal__header',
  close: '.modal__close',
  content: '.modal__content',
  buttons: '.modal__buttons'
}

export const defaultSettings = {
  width: '500px',
  height: '400px',
  header: {
    images: ['./img/smiling.png', './img/smiling.png'],
    text: 'Модальное окно'
  },
  content: {
    inputs: null,
    text: 'Текст модального окна'
  },
  buttons: [
    '<div class="ok btn">Ок</div>',
    '<div class="close btn">Закрыть</div>'
  ],
  showClose: true
}
