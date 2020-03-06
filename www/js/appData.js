'use strict';

class AppData {
  constructor({ dbName }) {
    this.dbName = dbName;

    this.state = {
      todos: []
    }

    const storedStage = window.localStorage.getItem(this.dbName);
    if (storedStage) {
      this.state = JSON.parse(storedStage);
    }
  }
  // Engadir un novo todo o estado
  addTodo(text) {
    const cleanText = text.trim();

    const existingTodo = this.state.todos.find(todo => todo.task.toLowerCase() === cleanText.toLowerCase());
    if (existingTodo) {
      throw new Error('O todo xa esta na lista');
    }

    if (cleanText.length === 0 || cleanText.length > 256) {
      throw new Error('O texto do todo debe ter entre 1 e 256 caracteres')
    }

    const newTodo = {
      task: cleanText,
      done: false
    }

    this.state.todos.unshift(newTodo);

    this.sync();
  }
  // Marcar un todo como feito/pendente
  toggleTodoStatus(index) {
    if (typeof index !== 'number') {
      throw new Error('O indice do todo debe ser numero')
    }

    if (index < 0) {
      throw new Error('O indice do todo debe ser positivo')
    }

    if (index >= this.state.todos.length) {
      throw new Error('O todo non existe');
    }

    const todo = this.state.todos[index];
    todo.done = !todo.done;

    this.sync();
  }
  // Borra todos os todos marcados como feitos
  cleanTodoList() {
    const cleanList = this.state.todos.filter(todo => todo.done === false);

    this.state.todos = cleanList;

    this.sync();
  }
  // Borra a lista completa
  deleteAllTodos() {
    this.state.todos = [];

    this.sync();
  }
  // Devolve todos os todos
  getTodos() {
    return this.state.todos
  }

  sync() {
    const stateAsString = JSON.stringify(this.state);
    window.localStorage.setItem(this.dbName, stateAsString)
  }
}

export default AppData;
