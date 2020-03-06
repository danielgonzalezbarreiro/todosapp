'use strict';
import AppData from "/js/appData.js"
import AppUi from "/js/appUi.js"

const todoAppData = new AppData({
  dbName: "todo-db"
});

const todoAppUi = new AppUi({
  element: document.querySelector('#todos'),
  db: todoAppData
});

