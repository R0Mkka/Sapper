class RecordsTable {

  constructor() {
    RecordsTable.table = document.querySelector('.records-table');
    RecordsTable.backdrop = document.querySelector('.backdrop');
  }

  static show() {
    RecordsTable.table.style.display = 'block';
    RecordsTable.backdrop.style.display = 'block';
  }

  static hide() {
    RecordsTable.table.style.display = 'none';
    RecordsTable.backdrop.style.display = 'none';
  }

  static update() {
    let storage = localStorage,
        result = '';

    for (let key in storage) {
      if (typeof(storage[key]) == 'string') {
        let newRecord = createNewRecord(key, storage[key]);

        result += newRecord;
      }
    }

    setRecords(result);

    // LOCAL FUNCTIONS
    function createNewRecord(key, info) {
      let newRecord = '';

      let split = info.split(' ');

      newRecord += `<div>${key}</div>`;

      for (let i = 0; i < split.length; i++) {
        newRecord += `<div>${split[i]}</div>`;
      }

      newRecord = `<div class="records__item">${newRecord}</div>`;

      return newRecord;
    }

    function setRecords(records) {
      let recordsList = document.querySelector('.records-table .records__list');

      if (records) {
        recordsList.innerHTML = records;
      } else {
        recordsList.innerHTML = '<div class="empty">Список пуст.</div>';
      }
    }
  }

  static clear() {
    let currentRecords = document.querySelector('.records-table .records');

    while (currentRecords.children.length > 0) {
      currentRecords.parentNode.removeChild(currentRecords.children[0]);
    }
  }

}
