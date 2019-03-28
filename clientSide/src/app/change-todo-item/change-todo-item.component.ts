import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { doesNotThrow } from 'assert';
import { HttpClient } from '@angular/common/http';
import { IPerson, ITodoItem } from '../app.component';

@Component({
  selector: 'app-change-todo-item',
  templateUrl: './change-todo-item.component.html',
  styleUrls: ['./change-todo-item.component.css']
})
export class ChangeTodoItemComponent implements OnInit {

  public people: IPerson[] = [];
  public minDate = new Date();
  public id: number;
  public assignedTo = '';
  public description = '';
  public done = false;
  public dueDate: Date;
  public showButton;
  constructor(private http: HttpClient, private dialogRef: MatDialogRef<ChangeTodoItemComponent>) {
    this.loadPeople();
  }

  ngOnInit() {
  }

  async loadPeople() {
    this.people = await this.http.get<IPerson[]>('http://localhost:8080/api/people/').toPromise();
    this.people.push({
      name: 'none'
    });
  }

  public async saveTodo() {
    if (this.id !== undefined) {
      if (this.assignedTo === 'none') {
        if (this.done) {
          await this.http.patch<ITodoItem[]>('http://localhost:8080/api/todos/' + this.id,
            {
              description: this.description,
              done: true,
              dueDate: this.dueDate
            }).toPromise();
        } else {
          await this.http.patch<ITodoItem[]>('http://localhost:8080/api/todos/' + this.id,
            {
              description: this.description,
              done: false,
              dueDate: this.dueDate
            }).toPromise();
        }
      } else {
        if (this.done) {
          await this.http.patch<ITodoItem[]>('http://localhost:8080/api/todos/' + this.id,
            {
              assignedTo: this.assignedTo,
              description: this.description,
              done: true,
              dueDate: this.dueDate
            }).toPromise();
        } else {
          await this.http.patch<ITodoItem[]>('http://localhost:8080/api/todos/' + this.id,
            {
              assignedTo: this.assignedTo,
              description: this.description,
              done: false,
              dueDate: this.dueDate
            }).toPromise();
        }
      }
    } else {
      if (this.assignedTo === 'none') {
        if (this.done) {
          await this.http.post<ITodoItem[]>('http://localhost:8080/api/todos/',
            {
              description: this.description,
              done: true,
              dueDate: this.dueDate
            }).toPromise();
        } else {
          await this.http.post<ITodoItem[]>('http://localhost:8080/api/todos/',
            {
              description: this.description,
              dueDate: this.dueDate
            }).toPromise();
        }
      } else {
        if (this.done) {
          await this.http.post<ITodoItem[]>('http://localhost:8080/api/todos/',
            {
              assignedTo: this.assignedTo,
              description: this.description,
              done: true,
              dueDate: this.dueDate
            }).toPromise();
        } else {
          await this.http.post<ITodoItem[]>('http://localhost:8080/api/todos/',
            {
              assignedTo: this.assignedTo,
              description: this.description,
              dueDate: this.dueDate
            }).toPromise();
        }
      }
    }
    this.dialogRef.close('ok');
  }

  public endDialog() {
    this.dialogRef.close('cancel');
  }
}
