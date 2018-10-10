export const selectors = {
  nickName: '.modal__content .nick-name',
  bombsAmount: '.modal__content .bombs-amount',
  rows: '.modal__content .rows',
  columns: '.modal__content .columns'
}

export const alertSettings = {
  width: '290px',
  height: '120px',
  headline: 'Ошибка!',
  message: 'Какая-то ошибка',
  type: 'error'
}

export const errors = {
  noName: 'Не заполнено имя!',
  bigName: 'Максимальный размер имени 20 симоволов.',
  noFieldSize: 'Не заполнен размер поля!',
  smallField: 'Минимальный размер поля 5х5!',
  bigField: 'Максимальный размер поля 20х20!',
  noBombsAmount: 'Не заполнено количество бомб!',
  tooFewBombs: 'Должна быть хотя бы одна бомба!',
  maxBombs: 'Максимальное количество бомб: '
}
