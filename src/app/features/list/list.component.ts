import { Component, OnInit } from '@angular/core';
import {Task} from '../../Models/Task';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor() { }

  tempoTask: Task = {
    completed: false,
    description: 'a task to do something like idk code a project for example',
    name: 'task',
    task_id: 0,
    user_id: 1,
  };

  listTasks: Task[] = [];

  ngOnInit(): void {
    this.listTasks.push(this.tempoTask);
    this.listTasks.push(this.tempoTask);
    this.listTasks.push(this.tempoTask);
  }

  addTask(task: Task): void {

  }

  removeTask(id: number): Observable<Task> {
    return new Observable<Task>();
  }

  editTask(id: number, task: Task): Observable<Task>{
    return new Observable<Task>();
  }
}
