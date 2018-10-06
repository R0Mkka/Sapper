class RecordsTable {

  static show() {
    let table = document.querySelector('.records-table'),
        backdrop = document.querySelector('.backdrop');

    table.style.display = 'block';
    backdrop.style.display = 'block';
  }

  static hide() {
    let table = document.querySelector('.records-table'),
        backdrop = document.querySelector('.backdrop');

    table.style.display = 'none';
    backdrop.style.display = 'none';
  }

  static update() {
    let records = document.querySelector('.records-table .records__list'),
        storage = localStorage,
        result = '';

    for (let key in storage) {
      let newRecord = '';

      if (typeof(storage[key]) == 'string') {
        let split = storage[key].split(' ');

        newRecord += `<div>${key}</div>`;

        for (let i = 0; i < split.length; i++) {
          newRecord += `<div>${split[i]}</div>`;
        }

        newRecord = `<div class="records__item">${newRecord}</div>`;
      }

      result += newRecord;
    }

    if (result == '') {
      records.innerHTML = '<div class="empty">Список пуст.</div>';
    } else {
      records.innerHTML = result;
    }
  }

  static clear() {
    let records = document.querySelector('.records-table .records');

    while (records.children.length > 0) {
      records.parentNode.removeChild(records.children[0]);
    }
  }

}
