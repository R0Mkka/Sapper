export const selectors = {
  start: '.modal__buttons .start',
  menu: '.menu',
  restart: '.menu-list .restart',
  reset: '.menu-list .reset',
  showRecords: '.menu-list .show-records',
  clearRecords: '.menu-list .clear-records',
  closeTable: '.close-table',
  rows: '.modal__content .rows',
  columns: '.modal__content .columns',
  bombsAmount: '.modal__content .bombs-amount'
}

export const startModalSettings = {
  width: '500px',
  height: '440px',
  header: {
    images: [
      './img/smiling.png',
      './img/with_tongue.png'
    ],
    text: 'Начало игры!'
  },
  content: {
    inputs: [
      {
        hint: 'Имя:',
        type: 'text',
        classes: 'nick-name',
        value: 'Player'
      },
      {
        wrapper: true,
        hint: 'Размер поля:',
        type: 'number',
        classes: 'rows',
        value: 12
      },
      {
        wrapper: false,
        hint: null,
        type: 'number',
        classes: 'columns',
        value: 12
      },
      {
        hint: 'Количество бомб:',
        type: 'number',
        classes: 'bombs-amount',
        value: 50
      }
    ],
    text: null
  },
  buttons: [
    '<div class="start btn">Поехали!</div>'
  ]
}
