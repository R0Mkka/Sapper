export const defaultSettings = {
  width: '300px',
  height: '150px',
  headline: 'Оповещение',
  message: 'Что-то произошло',
  type: 'alert'
}

export const selectors = {
  alert: '.alert',
  headline: '.alert__headline',
  message: '.alert__message p'
}

export const images = {
  ok: '<img src="./img/ok.png" />',
  error: '<img src="./img/error.png" />'
}
