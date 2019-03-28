import { Component, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ChangeTodoItemComponent } from './change-todo-item/change-todo-item.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TodoList';
  people: IPerson[] = [];
  todos: ITodoItem[] = [];
  allTodos: ITodoItem[] = [];
  showUndone = false;
  asignee = '';

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.loadPeople();
    this.loadTodos();
  }

  public taskChange() {
    this.filterTodo();
  }


  public async filterTodoByName(name: string) {
    this.asignee = name;
    this.filterTodo();
  }
  public async filterTodo() {
    const filteredTodos = await this.allTodos.filter((value) => {
      return value.assignedTo === undefined ? this.asignee === '' ?
        true : false : value.assignedTo.toLowerCase().includes(this.asignee.toLowerCase());
    });
    if (this.showUndone) {
      this.todos.splice(0, this.todos.length);
      for (const todo in filteredTodos) {
        if (filteredTodos.hasOwnProperty(todo)) {
          const element = filteredTodos[todo];
          if (!element.done) {
            this.todos.push(element);
          }
        }
      }
    } else {
      this.todos = Object.assign([], filteredTodos);
    }
  }

  async loadPeople() {
    this.people = await this.http.get<IPerson[]>('http://localhost:8080/api/people/').toPromise();
  }

  async loadTodos() {
    this.allTodos = await this.http.get<ITodoItem[]>('http://localhost:8080/api/todos/').toPromise();
    for (const todo of this.allTodos) {
      todo.dueDate = new Date(todo.dueDate);
      if (todo.done === undefined) {
        todo.done = false;
      }
    }
    this.todos = Object.assign([], this.allTodos);
    this.filterTodo();
  }
  async addDemoData() {
    const dialogRef = this.createDialog();
  }

  async doneTodo(id: number) {
    const currentItem = this.allTodos.find(value => (value.id === id));
    currentItem.done = !currentItem.done;
    await this.http.patch<ITodoItem[]>('http://localhost:8080/api/todos/' + currentItem.id,
      {
        assignedTo: currentItem.assignedTo,
        description: currentItem.description,
        done: currentItem.done
      }).toPromise();
    this.filterTodo();
  }

  async deleteTodo(id: number) {
    await this.http.delete<ITodoItem[]>(`http://localhost:8080/api/todos/${id}`).toPromise();
    this.loadTodos();
  }

  async editTodo(id: number) {
    const currentItem = this.allTodos.find(value => (value.id === id));
    const dialogRef = this.createDialog();
    dialogRef.componentInstance.id = id;
    dialogRef.componentInstance.assignedTo = currentItem.assignedTo === undefined ? 'none' : currentItem.assignedTo;
    dialogRef.componentInstance.description = currentItem.description;
    dialogRef.componentInstance.done = currentItem.done;
    dialogRef.componentInstance.dueDate = currentItem.dueDate;

  }
  public createDialog() {
    const dialogRef = this.dialog.open(ChangeTodoItemComponent, {
      width: '600px',
      height: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result !== 'cancel') {
        this.loadTodos();
        this.filterTodo();
      }
      console.log(result);
    });
    return dialogRef;
  }

}

export interface IPerson {
  name: string;
}

export interface ITodoItem {
  id: number;
  assignedTo: string;
  description: string;
  done: boolean;
  dueDate: Date;
}
