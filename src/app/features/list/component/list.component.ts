import { Component, OnInit } from '@angular/core';
import {Task} from '../../../Models/Task';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {AngularFirestore} from '@angular/fire/firestore';
import {CdkDragDrop, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  todo = this.store.collection('todo').valueChanges({idField: 'task_id'}) as unknown as Observable<Task[]>;
  inProgress = this.store.collection('inProgress').valueChanges({idField: 'task_id'}) as unknown as Observable<Task[]>;
  done = this.store.collection('done').valueChanges({idField: 'task_id'}) as unknown as Observable<Task[]>;

  constructor(private dialog: MatDialog, private store: AngularFirestore) { }

  tempoTask: Task = {
    description: 'a task to do something like idk code a project for example',
    name: 'task',
    task_id: '0',
    user_id: '1',
  };

  listTasks: Task[] = [];

  drop(event: CdkDragDrop<Task[] | null>): void {
    console.log(event);
    if (event.previousContainer === event.container) {
      return;
    }
    // @ts-ignore
    const item = event.previousContainer.data[event.previousIndex];
    this.store.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.store.collection(event.previousContainer.id).doc(item.task_id).delete(),
        this.store.collection(event.container.id).add(item),
      ]);
      return promise;
    });
    transferArrayItem(
      // @ts-ignore
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  ngOnInit(): void {
    this.listTasks.push(this.tempoTask);
    this.listTasks.push(this.tempoTask);
    this.listTasks.push(this.tempoTask);
  }

  addTask(task: Task): void {
    this.store.collection('todo').add(task);
  }

  removeTask(id: string): Observable<Task> {
    return new Observable<Task>();
  }

  editTask(id: string, task: Task): Observable<Task>{
    return new Observable<Task>();
  }
}
