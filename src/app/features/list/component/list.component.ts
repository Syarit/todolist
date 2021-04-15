import {Component, DoCheck, OnInit} from '@angular/core';
import {Task} from '../../../Models/Task';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {AngularFirestore} from '@angular/fire/firestore';
import {CdkDragDrop, transferArrayItem} from '@angular/cdk/drag-drop';
import {DialogComponent} from '../../dialog/dialog.component';
import {TaskDialogResult} from '../../../Models/TaskDialogResult';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  connectedUser: any = null;

  todo = this.store.collection(`${this.connectedUser?.l}-todo`).valueChanges({idField: 'task_id'}) as unknown as Observable<Task[]>;
  inProgress = this.store.collection(`${this.connectedUser?.l}-inProgress`)
    .valueChanges({idField: 'task_id'}) as unknown as Observable<Task[]>;
  done = this.store.collection(`${this.connectedUser?.l}-done`).valueChanges({idField: 'task_id'}) as unknown as Observable<Task[]>;


  constructor(private dialog: MatDialog, private store: AngularFirestore, private authService: AuthService) {
    this.update();
  }

  update(): void {
    this.authService.getConnectedUser().then(res => {
      this.connectedUser = res;
      this.todo = this.store.collection(`${this.connectedUser?.l}-todo`)
        .valueChanges({idField: 'task_id'}) as unknown as Observable<Task[]>;
      this.inProgress = this.store.collection(`${this.connectedUser?.l}-inProgress`)
        .valueChanges({idField: 'task_id'}) as unknown as Observable<Task[]>;
      this.done = this.store.collection(`${this.connectedUser?.l}-done`)
        .valueChanges({idField: 'task_id'}) as unknown as Observable<Task[]>;
    });
  }

  drop(event: CdkDragDrop<Task[] | null>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    // @ts-ignore
    const item = event.previousContainer.data[event.previousIndex];
    this.store.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.store.collection(`${this.connectedUser?.l}-${event.previousContainer.id}`).doc(item.task_id).delete(),
        this.store.collection(`${this.connectedUser?.l}-${event.container.id}`).add(item),
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

  addTask(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '270px',
      data: {
        task: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult) => this.store.collection(`${this.connectedUser?.l}-todo`).add(result.task));
  }

  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
      if (result?.delete) {
        this.store.collection(`${this.connectedUser?.l}-${list}`).doc(task.task_id).delete();
      } else {
        this.store.collection(`${this.connectedUser?.l}-${list}`).doc(task.task_id).update(task);
      }
    });
  }
}
