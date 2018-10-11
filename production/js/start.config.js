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

  header: `<img src='img/smiling.png'>
           <h1>Начало игры!</h1>
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

  buttons: `<div class="start btn">Поехали!</div>`
}

// export const startModalSettings = {
//   width: '500px',
//   height: '440px',
//   header: {
//     images: [
//       './img/smiling.png',
//       './img/with_tongue.png'
//     ],
//     text: 'Начало игры!'
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
//     '<div class="start btn">Поехали!</div>'
//   ]
// }
