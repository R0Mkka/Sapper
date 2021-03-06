export const newGameAlertSettings = {
  width: '250px',
  height: '100px',
  headline: 'Оповещение',
  message: 'Новая игра.',
  type: 'alert'
}

export const clearRecordsAlertSettings = {
  width: '250px',
  height: '100px',
  headline: 'Оповещение',
  message: 'Рекорды были очищены!',
  type: 'alert'
}

export const selectors = {
  menuItems: '.menu-list',

  start: '.modal__buttons .start',
  close: '.modal__buttons .close',

  nickName: '.modal__content .nick-name',
  bombsAmount: '.modal__content .bombs-amount',
  rows: '.modal__content .rows',
  columns: '.modal__content .columns',

  timerMinutes: '.timer .timer__minutes',
  timerSeconds: '.timer .timer__seconds',
}

export const resetModalSettings = {
  width: '500px',
  height: '440px',

  header: `<img src='img/smiling.png'>
           <h1>Настройки</h1>
           <img src='img/with_tongue.png'>`,

  content: `<p>Имя:</p>
            <input class='nick-name' value='Player' type='text'>
            <p>Размер поля:</p>
            <div>
              <input class='rows' value='12' type='number'>
              <input class='columns' value='12' type='number'>
            </div>
            <p>Количество бомб:</p>
            <input class='bombs-amount' value='40' type='number'>`,

  buttons: `<div class="start btn">Сохранить</div>
            <div class="close btn">Закрыть</div>`
}

// export const resetModalSettings = {
//   width: '500px',
//   height: '440px',
//   header: {
//     images: [
//       './img/smiling.png',
//       './img/with_tongue.png'
//     ],
//     text: 'Настройки'
//   },
//   content: {
//     inputs: [
//       {
//         hint: 'Имя:',
//         type: 'text',
//         classes: 'nick-name',
//         value: 'Player'
//       },
//       {
//         wrapper: true,
//         hint: 'Размер поля:',
//         type: 'number',
//         classes: 'rows',
//         value: 12
//       },
//       {
//         wrapper: false,
//         hint: null,
//         type: 'number',
//         classes: 'columns',
//         value: 12
//       },
//       {
//         hint: 'Количество бомб:',
//         type: 'number',
//         classes: 'bombs-amount',
//         value: 50
//       }
//     ],
//     text: null
//   },
//   buttons: [
//     '<div class="start btn">Сохранить</div>',
//     '<div class="close btn">Закрыть</div>'
//   ]
// }
