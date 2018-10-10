import { selectors } from './recordsTable.config.js';

import { displayType } from '../displayType.js';

export default class RecordsTable {

  constructor() {
    RecordsTable.table = document.querySelector(selectors.table);
    RecordsTable.backdrop = document.querySelector(selectors.backdrop);
  }

  static show() {
    RecordsTable.table.style.display = displayType.visible;
    RecordsTable.backdrop.style.display = displayType.visible;
  }

  static hide() {
    RecordsTable.table.style.display = displayType.hidden;
    RecordsTable.backdrop.style.display = displayType.hidden;
  }

  static update() {
    const storage = localStorage;
    let result = '';

    for (let key in storage) {
      if (typeof(storage[key]) == 'string') {
        const newRecord = RecordsTable._createNewRecord(key, storage[key]);

        result += newRecord;
      }
    }

    RecordsTable._setRecords(result);
  }

  static _createNewRecord(key, info) {
    let newRecord = '';

    const split = info.split(' ');

    newRecord += `<div>${key}</div>`;

    for (let i = 0; i < split.length; i++) {
      newRecord += `<div>${split[i]}</div>`;
    }

    newRecord = `<div class="records__item">${newRecord}</div>`;

    return newRecord;
  }

  static _setRecords(records) {
    const recordsList = document.querySelector(selectors.recordsList);

    recordsList.innerHTML = records || '<div class="empty">Список пуст.</div>';
  }

  static clear() {
    const currentRecords = document.querySelector(selectors.currentRecords);

    while (currentRecords.children.length > 0) {
      currentRecords.parentNode.removeChild(currentRecords.children[0]);
    }
  }

}
