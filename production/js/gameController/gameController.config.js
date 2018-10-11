export const selectors = {
  restart: '.modal__buttons .restart',
  save: '.modal__buttons .save'
}

export const images = {
  bomb: `<img src='img/bomb.png'>`,
  flag: `<img src='img/flag.png'>`
}

export const lossModalSettings = {
  width: '500px',
  height: '280px',
  header: {
    images: [
      './img/demon.png',
      './img/demon.png'
    ],
    text: 'Буууум!'
  },
  content: {
    inputs: null,
    text: [
      'Ничего :)',
      'В следующий раз все получится!'
    ]
  },
  buttons: [
    '<div class="restart btn">Переиграть!</div>'
  ]
}

export const winModalSettings = {
  width: '500px',
  height: '280px',
  header: {
    images: [
      './img/with_tongue.png',
      './img/with_tongue.png'
    ],
    text: 'Победа!'
  },
  content: {
    inputs: null,
    text: [
      'Молодец! :)',
      'Это было нелегко, но ты справился!'
    ]
  },
  buttons: [
    '<div class="restart btn">Новая игра!</div>',
    '<div class="save btn">Сохранить результат</div>'
  ]
}
