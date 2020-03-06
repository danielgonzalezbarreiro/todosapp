'use strict';

class AppUi {
  constructor({ element, db }) {
    this.element = element;
    this.db = db;

    this.form = this.element.querySelector('form.add');
    this.clean = this.element.querySelector('button.clean');
    this.destroy = this.element.querySelector('button.destroy');
    this.list = this.element.querySelector('ul.todolist');

    if (!this.form || !this.clean || !this.destroy || !this.list) {
      throw new Error('Faltan elementos. Comproba o HTML')
    }

    this.addEvents()
    this.render()
  }

  //Asignar eventos os elementos do UI
  addEvents() {
    // O enviar o formulairo debe engadirse un todo o db
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      const todoInput = this.form.elements.todotext;

      this.db.addTodo(todoInput.value);

      todoInput.value = "";

      this.render()
    })
    //O clickar en limpar completados debe executarse o metodo da db correspondente
    this.clean.addEventListener('click', event => {
      this.db.cleanTodoList();
      this.render()
    })

    //O clickar en boorar todo debe executarse o metodo da db correspondente
    this.destroy.addEventListener('click', event => {
      const confirmation = window.prompt("Escribe BORRAR para borrar todos os ToDo's")
      if (confirmation && confirmation.toUpperCase() === 'BORRAR') {
        this.db.deleteAllTodos();
        this.render()
      };
    });

    // O clickar no ul si clicko nun checkbox marcar o todo correspondente como done 
    this.list.addEventListener('click', event => {
      const target = event.target;

      if (target.matches('input[type=checkbox]')) {
        const index = Number(target.getAttribute("data-index"));
        this.db.toggleTodoStatus(index);
        this.render()
      };
    })
  };

  render() {
    this.list.innerHTML = "";
    const todos = this.db.getTodos();

    const fragment = document.createDocumentFragment();

    let index = 0

    for (const todo of todos) {
      const todoItem = document.createElement("li");

      // Creamos os texto do todo
      const todoText = document.createElement('p');
      todoText.textContent = todo.task;

      // Creamos o checkbox
      const todoCheck = document.createElement('input');
      todoCheck.setAttribute('type', 'checkbox');
      todoCheck.setAttribute('data-index', index)

      if (todo.done) {
        todoCheck.setAttribute('checked', 'true');
        todoItem.classList.add('done');
      }

      todoItem.append(todoCheck);
      todoItem.append(todoText);

      fragment.append(todoItem);
      index++;
    }

    this.list.append(fragment);
  }
}

export default AppUi;