export const selectors = {
  nickName: '.start-modal__inputs .nick-name',
  bombsAmount: '.start-modal__inputs .bombs-amount',
  rows: '.start-modal__inputs .rows',
  columns: '.start-modal__inputs .columns'
}

export const alertSettings = {
  width: '300px',
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
